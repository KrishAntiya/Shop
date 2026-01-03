import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { query } from '@/lib/db'
import { generateSlug } from '@/lib/utils'

// GET - Get single brand
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
      'SELECT id, name, slug, logo, created_at, updated_at FROM brands WHERE id = ?',
      [params.id]
    ) as any[]

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      brand: results[0],
    })
  } catch (error: any) {
    console.error('Get brand error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update brand
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if slug already exists for another brand
    const existing = await query(
      'SELECT id FROM brands WHERE slug = ? AND id != ?',
      [slug, params.id]
    ) as any[]
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Brand with this name already exists' },
        { status: 400 }
      )
    }

    await query(
      'UPDATE brands SET name = ?, slug = ?, logo = ? WHERE id = ?',
      [name.trim(), slug, logo || null, params.id]
    )

    const results = await query(
      'SELECT id, name, slug, logo, created_at, updated_at FROM brands WHERE id = ?',
      [params.id]
    ) as any[]

    return NextResponse.json({
      success: true,
      brand: results[0],
    })
  } catch (error: any) {
    console.error('Update brand error:', error)
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

// DELETE - Delete brand
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    // Check if brand has products
    const products = await query(
      'SELECT COUNT(*) as count FROM products WHERE brand_id = ?',
      [params.id]
    ) as any[]

    if (products[0].count > 0) {
      return NextResponse.json(
        { error: 'Cannot delete brand with associated products' },
        { status: 400 }
      )
    }

    await query('DELETE FROM brands WHERE id = ?', [params.id])

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error('Delete brand error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

