import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { comparePassword, generateToken, hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find admin user
    const results = await query(
      'SELECT id, email, password, role FROM admins WHERE email = ?',
      [email.toLowerCase()]
    ) as any[]

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const admin = results[0]

    // Verify password
    const isValid = await comparePassword(password, admin.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    })

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    })

    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Internal server error'
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Database connection failed. Please ensure MySQL is running.'
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      errorMessage = 'Database not found. Please create the database first.'
    } else if (error.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = 'Database tables not found. Please run the database setup script.'
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

