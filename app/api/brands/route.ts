import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET - Get brands for public website (no authentication required)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')

    // Get brands that have at least one active product
    const sql = `
      SELECT DISTINCT
        b.id,
        b.name,
        b.slug,
        b.logo,
        COUNT(p.id) as product_count
      FROM brands b
      INNER JOIN products p ON b.id = p.brand_id
      WHERE p.status = 'active'
      GROUP BY b.id, b.name, b.slug, b.logo
      HAVING product_count > 0
      ORDER BY b.name ASC
      LIMIT ?
    `

    const brands = await query(sql, [limit]) as any[]

    // Transform brands
    const transformedBrands = brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      logo: brand.logo || 'https://via.placeholder.com/200x200/E5E7EB/6B7280?text=' + encodeURIComponent(brand.name.substring(0, 2).toUpperCase()),
      product_count: brand.product_count,
      href: `/brands/${brand.slug}`,
    }))

    return NextResponse.json({
      success: true,
      brands: transformedBrands,
      count: transformedBrands.length,
    })
  } catch (error: any) {
    console.error('Get brands error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

