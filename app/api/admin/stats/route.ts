import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    // Get total products
    const productsResult = await query('SELECT COUNT(*) as count FROM products') as any[]
    const totalProducts = productsResult[0]?.count || 0

    // Get total brands
    const brandsResult = await query('SELECT COUNT(*) as count FROM brands') as any[]
    const totalBrands = brandsResult[0]?.count || 0

    // Get total orders
    const ordersResult = await query('SELECT COUNT(*) as count FROM orders') as any[]
    const totalOrders = ordersResult[0]?.count || 0

    // Get low stock products (stock < 10)
    const lowStockResult = await query('SELECT COUNT(*) as count FROM products WHERE stock < 10 AND status = "active"') as any[]
    const lowStockProducts = lowStockResult[0]?.count || 0

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalBrands,
        totalOrders,
        lowStockProducts,
      },
    })
  } catch (error: any) {
    console.error('Stats error:', error)
    
    let errorMessage = 'Internal server error'
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Database connection failed. Please ensure MySQL is running.'
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      errorMessage = 'Database not found. Please create the swastik_pharma database first.'
    } else if (error.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = 'Database tables not found. Please run the database setup script.'
    }
    
    return NextResponse.json(
      { error: errorMessage, details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    )
  }
}

