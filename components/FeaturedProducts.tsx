'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

interface Variant {
  id: number
  name: string
  weight?: string | null
  unit?: string | null
  price: number
  mrp: number
  stock: number
  is_default?: boolean
}

interface Product {
  id: number
  name: string
  image: string
  category: string
  price: number
  mrp: number
  discount: number
  rating: number
  reviews: number
  href: string
  variants?: Variant[]
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?limit=10&sort=created_at')
      const data = await res.json()
      if (data.success && data.products) {
        setProducts(data.products.slice(0, 10))
      }
    } catch (err) {
      console.error('Failed to fetch featured products:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white py-4 sm:py-6 md:py-8">
        <div className="max-w-container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">Featured Products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-neutral-bg animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary">Featured Products</h2>
          <a
            href="/products"
            className="text-primary hover:text-primary-dark font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              category={product.category || 'Uncategorized'}
              price={product.price}
              originalPrice={product.mrp > product.price ? product.mrp : undefined}
              discount={product.discount}
              rating={product.rating}
              reviews={product.reviews}
              href={product.href}
              variants={product.variants || []}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts

