import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'

// GET - List orders with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status')
    const offset = (page - 1) * limit

    let sql = `
      SELECT o.*, 
             COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE 1=1
    `
    const params: any[] = []

    if (status) {
      sql += ` AND o.status = ?`
      params.push(status)
    }

    sql += ` GROUP BY o.id ORDER BY o.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const orders = await query(sql, params) as any[]

    // Get total count
    let countSql = `SELECT COUNT(*) as total FROM orders WHERE 1=1`
    const countParams: any[] = []

    if (status) {
      countSql += ` AND status = ?`
      countParams.push(status)
    }

    const countResult = await query(countSql, countParams) as any[]
    const total = countResult[0]?.total || 0

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

