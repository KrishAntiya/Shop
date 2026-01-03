import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'
import { generateSlug } from '@/lib/utils'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

// POST - Bulk upload products from CSV/Excel
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    let rows: any[] = []

    // Parse file based on extension
    if (fileExtension === 'csv') {
      const text = buffer.toString('utf-8')
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      })
      rows = parsed.data as any[]
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const workbook = XLSX.read(buffer, { type: 'buffer' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      rows = XLSX.utils.sheet_to_json(worksheet) as any[]
    } else {
      return NextResponse.json(
        { error: 'Unsupported file format. Please upload CSV or Excel file.' },
        { status: 400 }
      )
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'File is empty or could not be parsed' },
        { status: 400 }
      )
    }

    // Normalize column names (handle various formats from Marg ERP)
    const normalizedRows = rows.map((row) => {
      const normalized: any = {}
      const keys = Object.keys(row)

      // Map common column name variations
      const columnMap: { [key: string]: string } = {
        item_code: 'item_code',
        'item code': 'item_code',
        itemcode: 'item_code',
        sku: 'item_code',
        'item_code': 'item_code',
        name: 'name',
        'product name': 'name',
        productname: 'name',
        'product_name': 'name',
        brand: 'brand',
        brandname: 'brand',
        'brand name': 'brand',
        'brand_name': 'brand',
        category: 'category',
        'product category': 'category',
        'product_category': 'category',
        mrp: 'mrp',
        'max retail price': 'mrp',
        'max_retail_price': 'mrp',
        price: 'price',
        'selling price': 'price',
        'selling_price': 'price',
        stock: 'stock',
        quantity: 'stock',
        qty: 'stock',
        'available stock': 'stock',
        'available_stock': 'stock',
        description: 'description',
      }

      keys.forEach((key) => {
        const normalizedKey = columnMap[key.toLowerCase()] || key.toLowerCase()
        normalized[normalizedKey] = row[key]
      })

      return normalized
    })

    // Validate required fields
    const errors: string[] = []
    const validRows: any[] = []

    normalizedRows.forEach((row, index) => {
      if (!row.item_code || !row.name || !row.mrp || !row.price) {
        errors.push(`Row ${index + 2}: Missing required fields (item_code, name, mrp, price)`)
        return
      }

      // Convert to proper types
      const mrp = parseFloat(row.mrp)
      const price = parseFloat(row.price)
      const stock = parseInt(row.stock) || 0

      if (isNaN(mrp) || isNaN(price)) {
        errors.push(`Row ${index + 2}: Invalid price values`)
        return
      }

      validRows.push({
        item_code: String(row.item_code).trim(),
        name: String(row.name).trim(),
        brand: row.brand ? String(row.brand).trim() : null,
        category: row.category ? String(row.category).trim() : null,
        mrp,
        price,
        stock,
        description: row.description ? String(row.description).trim() : null,
      })
    })

    if (errors.length > 0 && validRows.length === 0) {
      return NextResponse.json(
        { error: 'All rows have errors', errors },
        { status: 400 }
      )
    }

    // Process valid rows
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
      createdBrands: [] as string[],
    }

    for (const row of validRows) {
      try {
        // Get or create brand
        let brandId = null
        if (row.brand) {
          const brandSlug = generateSlug(row.brand)
          let brandResult = await query(
            'SELECT id FROM brands WHERE slug = ?',
            [brandSlug]
          ) as any[]

          if (brandResult.length === 0) {
            // Create brand
            const insertResult = await query(
              'INSERT INTO brands (name, slug) VALUES (?, ?)',
              [row.brand, brandSlug]
            ) as any
            brandId = insertResult.insertId
            results.createdBrands.push(row.brand)
          } else {
            brandId = brandResult[0].id
          }
        }

        // Check if product exists
        const existing = await query(
          'SELECT id FROM products WHERE item_code = ?',
          [row.item_code]
        ) as any[]

        const slug = generateSlug(row.name)

        if (existing.length > 0) {
          // Update existing product
          await query(
            `UPDATE products SET
             name = ?, slug = ?, brand_id = ?, category = ?,
             mrp = ?, price = ?, stock = ?, description = ?
             WHERE item_code = ?`,
            [
              row.name,
              slug,
              brandId,
              row.category,
              row.mrp,
              row.price,
              row.stock,
              row.description,
              row.item_code,
            ]
          )
        } else {
          // Insert new product
          await query(
            `INSERT INTO products 
             (item_code, name, slug, brand_id, category, mrp, price, stock, description, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
            [
              row.item_code,
              row.name,
              slug,
              brandId,
              row.category,
              row.mrp,
              row.price,
              row.stock,
              row.description,
            ]
          )
        }

        results.success++
      } catch (error: any) {
        results.failed++
        results.errors.push(`${row.item_code}: ${error.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      results: {
        total: validRows.length,
        success: results.success,
        failed: results.failed,
        createdBrands: results.createdBrands.length,
        errors: results.errors.slice(0, 20), // Limit errors returned
      },
    })
  } catch (error: any) {
    console.error('Bulk upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

