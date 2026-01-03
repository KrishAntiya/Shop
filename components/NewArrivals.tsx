'use client'

import React from 'react'
import ProductCard from './ProductCard'

const NewArrivals = () => {
  const products = [
    {
      name: 'Advanced Probiotic for Cattle',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Supplements',
      price: 699,
      originalPrice: 899,
      discount: 22,
      rating: 4.7,
      reviews: 923,
      href: '/products/advanced-probiotic'
    },
    {
      name: 'Immune Booster Plus',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Medicines',
      price: 549,
      originalPrice: 699,
      discount: 21,
      rating: 4.8,
      reviews: 1456,
      href: '/products/immune-booster-plus'
    },
    {
      name: 'Fast Acting Antipyretic',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Medicines',
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.6,
      reviews: 678,
      href: '/products/fast-acting-antipyretic'
    },
    {
      name: 'Premium Vitamin Complex',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Supplements',
      price: 849,
      originalPrice: 1099,
      discount: 23,
      rating: 4.9,
      reviews: 1892,
      href: '/products/premium-vitamin-complex'
    },
    {
      name: 'Rapid Recovery Tonic',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Medicines',
      price: 449,
      originalPrice: 599,
      discount: 25,
      rating: 4.7,
      reviews: 1123,
      href: '/products/rapid-recovery-tonic'
    }
  ]

  return (
    <div className="bg-neutral-bg py-4 sm:py-6 md:py-8">
      <div className="max-w-container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary">New Arrivals</h2>
          <a
            href="/products/new-arrivals"
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
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviews={product.reviews}
              href={product.href}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewArrivals

