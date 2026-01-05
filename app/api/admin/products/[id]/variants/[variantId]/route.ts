import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'

// PUT - Update variant
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; variantId: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const body = await request.json()
    const { name, weight, unit, price, mrp, stock, is_default, sku, status } = body

    if (!name || !price || !mrp) {
      return NextResponse.json(
        { error: 'Name, price, and MRP are required' },
        { status: 400 }
      )
    }

    // If this is set as default, unset other defaults
    if (is_default) {
      await query(
        'UPDATE product_variants SET is_default = FALSE WHERE product_id = ? AND id != ?',
        [params.id, params.variantId]
      )
    }

    await query(
      `UPDATE product_variants SET
       name = ?, weight = ?, unit = ?, price = ?, mrp = ?, stock = ?,
       sku = ?, is_default = ?, status = ?
       WHERE id = ? AND product_id = ?`,
      [
        name.trim(),
        weight?.trim() || null,
        unit?.trim() || null,
        price,
        mrp,
        stock || 0,
        sku?.trim() || null,
        is_default || false,
        status || 'active',
        params.variantId,
        params.id,
      ]
    )

    const updated = await query(
      'SELECT * FROM product_variants WHERE id = ?',
      [params.variantId]
    ) as any[]

    return NextResponse.json({
      success: true,
      variant: updated[0],
    })
  } catch (error: any) {
    console.error('Update variant error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Delete variant
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; variantId: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    await query(
      'DELETE FROM product_variants WHERE id = ? AND product_id = ?',
      [params.variantId, params.id]
    )

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error('Delete variant error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

