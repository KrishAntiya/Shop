import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    if (authResult instanceof NextResponse) {
      return authResult
    }

    return NextResponse.json({
      user: authResult.user,
    })
  } catch (error: any) {
    console.error('Auth me error:', error.message)
    return NextResponse.json(
      { error: 'Database connection failed. Please ensure MySQL is running.' },
      { status: 500 }
    )
  }
}

