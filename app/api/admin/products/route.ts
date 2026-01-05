import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'
import { generateSlug } from '@/lib/utils'

// GET - List products with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    const brandId = searchParams.get('brand_id')
    const status = searchParams.get('status')
    const offset = (page - 1) * limit

    let sql = `
      SELECT p.*, b.name as brand_name, b.slug as brand_slug
      FROM products p
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE 1=1
    `
    const params: any[] = []

    if (search) {
      sql += ` AND (p.name LIKE ? OR p.item_code LIKE ?)`
      params.push(`%${search}%`, `%${search}%`)
    }

    if (brandId) {
      sql += ` AND p.brand_id = ?`
      params.push(brandId)
    }

    if (status) {
      sql += ` AND p.status = ?`
      params.push(status)
    }

    sql += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const products = await query(sql, params) as any[]

    // Get total count
    let countSql = `SELECT COUNT(*) as total FROM products p WHERE 1=1`
    const countParams: any[] = []

    if (search) {
      countSql += ` AND (p.name LIKE ? OR p.item_code LIKE ?)`
      countParams.push(`%${search}%`, `%${search}%`)
    }

    if (brandId) {
      countSql += ` AND p.brand_id = ?`
      countParams.push(brandId)
    }

    if (status) {
      countSql += ` AND p.status = ?`
      countParams.push(status)
    }

    const countResult = await query(countSql, countParams) as any[]
    const total = countResult[0]?.total || 0

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const body = await request.json()
    const {
      item_code,
      name,
      brand_id,
      category,
      animal,
      mrp,
      price,
      stock,
      description,
      image,
      status = 'active',
    } = body

    if (!item_code || !name || !mrp || !price) {
      return NextResponse.json(
        { error: 'Item code, name, MRP, and price are required' },
        { status: 400 }
      )
    }

    const slug = generateSlug(name)

    // Check if item_code already exists
    const existing = await query('SELECT id FROM products WHERE item_code = ?', [item_code]) as any[]
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Product with this item code already exists' },
        { status: 400 }
      )
    }

    const result = await query(
      `INSERT INTO products 
       (item_code, name, slug, brand_id, category, animal, mrp, price, stock, description, image, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item_code,
        name.trim(),
        slug,
        brand_id || null,
        category || null,
        animal || null,
        mrp,
        price,
        stock || 0,
        description || null,
        image || null,
        status,
      ]
    ) as any

    const newProduct = await query(
      `SELECT p.*, b.name as brand_name 
       FROM products p 
       LEFT JOIN brands b ON p.brand_id = b.id 
       WHERE p.id = ?`,
      [result.insertId]
    ) as any[]

    return NextResponse.json({
      success: true,
      product: newProduct[0],
    })
  } catch (error: any) {
    console.error('Create product error:', error)
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Product with this item code already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

