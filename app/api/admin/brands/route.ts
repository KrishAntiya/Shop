import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'
import { generateSlug } from '@/lib/utils'

// GET - List all brands
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const results = await query(
      'SELECT id, name, slug, logo, created_at, updated_at FROM brands ORDER BY name ASC'
    ) as any[]

    return NextResponse.json({
      success: true,
      brands: results,
    })
  } catch (error: any) {
    console.error('Get brands error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new brand
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { name, logo } = await request.json()

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Brand name is required' },
        { status: 400 }
      )
    }

    const slug = generateSlug(name)

    // Check if slug already exists
    const existing = await query('SELECT id FROM brands WHERE slug = ?', [slug]) as any[]
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Brand with this name already exists' },
        { status: 400 }
      )
    }

    const result = await query(
      'INSERT INTO brands (name, slug, logo) VALUES (?, ?, ?)',
      [name.trim(), slug, logo || null]
    ) as any

    return NextResponse.json({
      success: true,
      brand: {
        id: result.insertId,
        name: name.trim(),
        slug,
        logo: logo || null,
      },
    })
  } catch (error: any) {
    console.error('Create brand error:', error)
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Brand with this name already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

