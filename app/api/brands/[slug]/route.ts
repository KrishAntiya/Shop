import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET - Get brand by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const results = await query(
      'SELECT id, name, slug, logo FROM brands WHERE slug = ?',
      [params.slug]
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

