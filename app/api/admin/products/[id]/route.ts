import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'
import { generateSlug } from '@/lib/utils'

// GET - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const results = await query(
      `SELECT p.*, b.name as brand_name, b.slug as brand_slug
       FROM products p
       LEFT JOIN brands b ON p.brand_id = b.id
       WHERE p.id = ?`,
      [params.id]
    ) as any[]

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product: results[0],
    })
  } catch (error: any) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      mrp,
      price,
      stock,
      description,
      image,
      status,
    } = body

    if (!item_code || !name || !mrp || !price) {
      return NextResponse.json(
        { error: 'Item code, name, MRP, and price are required' },
        { status: 400 }
      )
    }

    const slug = generateSlug(name)

    // Check if item_code already exists for another product
    const existing = await query(
      'SELECT id FROM products WHERE item_code = ? AND id != ?',
      [item_code, params.id]
    ) as any[]
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Product with this item code already exists' },
        { status: 400 }
      )
    }

    await query(
      `UPDATE products SET
       item_code = ?, name = ?, slug = ?, brand_id = ?, category = ?,
       mrp = ?, price = ?, stock = ?, description = ?, image = ?, status = ?
       WHERE id = ?`,
      [
        item_code,
        name.trim(),
        slug,
        brand_id || null,
        category || null,
        mrp,
        price,
        stock || 0,
        description || null,
        image || null,
        status || 'active',
        params.id,
      ]
    )

    const results = await query(
      `SELECT p.*, b.name as brand_name 
       FROM products p 
       LEFT JOIN brands b ON p.brand_id = b.id 
       WHERE p.id = ?`,
      [params.id]
    ) as any[]

    return NextResponse.json({
      success: true,
      product: results[0],
    })
  } catch (error: any) {
    console.error('Update product error:', error)
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

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    await query('DELETE FROM products WHERE id = ?', [params.id])

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

