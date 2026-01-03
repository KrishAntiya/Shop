import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

// POST - Sync stock and prices from Marg ERP (updates existing products only)
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

    // Parse file
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
        { error: 'Unsupported file format' },
        { status: 400 }
      )
    }

    const results = {
      updated: 0,
      notFound: 0,
      errors: [] as string[],
    }

    // Normalize column names
    const columnMap: { [key: string]: string } = {
      item_code: 'item_code',
      'item code': 'item_code',
      itemcode: 'item_code',
      sku: 'item_code',
      price: 'price',
      'selling price': 'price',
      'selling_price': 'price',
      stock: 'stock',
      quantity: 'stock',
      qty: 'stock',
      'available stock': 'stock',
      'available_stock': 'stock',
    }

    for (const row of rows) {
      try {
        const normalized: any = {}
        Object.keys(row).forEach((key) => {
          const normalizedKey = columnMap[key.toLowerCase()] || key.toLowerCase()
          normalized[normalizedKey] = row[key]
        })

        if (!normalized.item_code) {
          results.notFound++
          continue
        }

        const itemCode = String(normalized.item_code).trim()
        const price = normalized.price ? parseFloat(normalized.price) : null
        const stock = normalized.stock ? parseInt(normalized.stock) : null

        // Find product by item_code
        const product = await query(
          'SELECT id FROM products WHERE item_code = ?',
          [itemCode]
        ) as any[]

        if (product.length === 0) {
          results.notFound++
          continue
        }

        // Update only price and stock (not images or descriptions)
        const updateFields: string[] = []
        const updateValues: any[] = []

        if (price !== null && !isNaN(price)) {
          updateFields.push('price = ?')
          updateValues.push(price)
        }

        if (stock !== null && !isNaN(stock)) {
          updateFields.push('stock = ?')
          updateValues.push(stock)
        }

        if (updateFields.length > 0) {
          updateValues.push(itemCode)
          await query(
            `UPDATE products SET ${updateFields.join(', ')} WHERE item_code = ?`,
            updateValues
          )
          results.updated++
        }
      } catch (error: any) {
        results.errors.push(`${row.item_code || 'Unknown'}: ${error.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      results: {
        total: rows.length,
        updated: results.updated,
        notFound: results.notFound,
        errors: results.errors.slice(0, 20),
      },
    })
  } catch (error: any) {
    console.error('Stock sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

