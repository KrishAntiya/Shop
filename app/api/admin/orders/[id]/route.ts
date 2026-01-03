import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'

// GET - Get single order with items
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const orderResult = await query(
      'SELECT * FROM orders WHERE id = ?',
      [params.id]
    ) as any[]

    if (orderResult.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const orderItems = await query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [params.id]
    ) as any[]

    return NextResponse.json({
      success: true,
      order: orderResult[0],
      items: orderItems,
    })
  } catch (error: any) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update order status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { status, payment_status } = await request.json()

    const updateFields: string[] = []
    const updateValues: any[] = []

    if (status) {
      updateFields.push('status = ?')
      updateValues.push(status)
    }

    if (payment_status) {
      updateFields.push('payment_status = ?')
      updateValues.push(payment_status)
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    updateValues.push(params.id)

    await query(
      `UPDATE orders SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    )

    const orderResult = await query(
      'SELECT * FROM orders WHERE id = ?',
      [params.id]
    ) as any[]

    return NextResponse.json({
      success: true,
      order: orderResult[0],
    })
  } catch (error: any) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

