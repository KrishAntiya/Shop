import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { calculateDiscount } from '@/lib/utils'

// GET - Get products for public website (no authentication required)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const brand_id = searchParams.get('brand_id')
    const animal = searchParams.get('animal')
    const featured = searchParams.get('featured') === 'true'
    const sort = searchParams.get('sort') || 'created_at' // created_at, price_asc, price_desc

    let sql = `
      SELECT 
        p.id,
        p.item_code,
        p.name,
        p.slug,
        p.category,
        p.animal,
        p.mrp,
        p.price,
        p.stock,
        p.image,
        p.status,
        p.created_at,
        b.name as brand_name
      FROM products p
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.status = 'active'
    `
    const params: any[] = []

    if (category) {
      sql += ` AND p.category = ?`
      params.push(category)
    }

    if (brand_id) {
      sql += ` AND p.brand_id = ?`
      params.push(parseInt(brand_id))
    }

    if (animal) {
      sql += ` AND p.animal = ?`
      params.push(animal)
    }

    // Sort by
    switch (sort) {
      case 'price_asc':
        sql += ` ORDER BY p.price ASC`
        break
      case 'price_desc':
        sql += ` ORDER BY p.price DESC`
        break
      case 'created_at':
      default:
        sql += ` ORDER BY p.created_at DESC`
        break
    }

    sql += ` LIMIT ?`
    params.push(limit)

    const products = await query(sql, params) as any[]

    // Get product IDs to fetch variants
    const productIds = products.map((p: any) => p.id)
    let variantsMap: { [key: number]: any[] } = {}
    
    if (productIds.length > 0) {
      const placeholders = productIds.map(() => '?').join(',')
      const variantsSql = `
        SELECT 
          id, product_id, name, weight, unit, price, mrp, stock, is_default, status
        FROM product_variants
        WHERE product_id IN (${placeholders}) AND status = 'active'
        ORDER BY is_default DESC, name ASC
      `
      const variants = await query(variantsSql, productIds) as any[]
      
      // Group variants by product_id
      variants.forEach((variant) => {
        if (!variantsMap[variant.product_id]) {
          variantsMap[variant.product_id] = []
        }
        variantsMap[variant.product_id].push({
          id: variant.id,
          name: variant.name,
          weight: variant.weight,
          unit: variant.unit,
          price: Number(variant.price),
          mrp: Number(variant.mrp),
          stock: Number(variant.stock),
          is_default: Boolean(variant.is_default),
        })
      })
    }

    // Transform products to include calculated fields and variants
    const transformedProducts = products.map((product: any) => {
      const variants = variantsMap[product.id] || []
      const defaultVariant = variants.find((v: any) => v.is_default) || variants[0]
      
      // Use variant price if available, otherwise use product price
      const displayPrice = defaultVariant ? defaultVariant.price : product.price
      const displayMrp = defaultVariant ? defaultVariant.mrp : product.mrp
      const discount = displayMrp > displayPrice 
        ? calculateDiscount(displayMrp, displayPrice) 
        : 0

      return {
        id: product.id,
        item_code: product.item_code,
        name: product.name,
        slug: product.slug,
        category: product.category,
        brand_name: product.brand_name,
        price: displayPrice,
        mrp: displayMrp,
        discount,
        stock: defaultVariant ? defaultVariant.stock : product.stock,
        image: product.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
        status: product.status,
        href: `/products/${product.slug}`,
        rating: 4.5,
        reviews: 0,
        variants: variants.length > 0 ? variants : [
          {
            id: 0,
            name: 'Standard',
            price: product.price,
            mrp: product.mrp,
            stock: product.stock,
            is_default: true,
          }
        ],
      }
    })

    return NextResponse.json({
      success: true,
      products: transformedProducts,
      count: transformedProducts.length,
    })
  } catch (error: any) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

