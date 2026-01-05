import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'

// GET - Get all variants for a product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const variants = await query(
      'SELECT * FROM product_variants WHERE product_id = ? ORDER BY is_default DESC, name ASC',
      [params.id]
    ) as any[]

    return NextResponse.json({
      success: true,
      variants,
    })
  } catch (error: any) {
    console.error('Get variants error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new variant
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const body = await request.json()
    const { name, weight, unit, price, mrp, stock, is_default, sku } = body

    if (!name || !price || !mrp) {
      return NextResponse.json(
        { error: 'Name, price, and MRP are required' },
        { status: 400 }
      )
    }

    // If this is set as default, unset other defaults
    if (is_default) {
      await query(
        'UPDATE product_variants SET is_default = FALSE WHERE product_id = ?',
        [params.id]
      )
    }

    const result = await query(
      `INSERT INTO product_variants 
       (product_id, name, weight, unit, price, mrp, stock, sku, is_default, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [
        params.id,
        name.trim(),
        weight?.trim() || null,
        unit?.trim() || null,
        price,
        mrp,
        stock || 0,
        sku?.trim() || null,
        is_default || false,
      ]
    ) as any

    return NextResponse.json({
      success: true,
      variant: {
        id: result.insertId,
        product_id: parseInt(params.id),
        name,
        weight,
        unit,
        price,
        mrp,
        stock: stock || 0,
        sku,
        is_default: is_default || false,
        status: 'active',
      },
    })
  } catch (error: any) {
    console.error('Create variant error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

