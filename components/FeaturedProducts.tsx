'use client'

import React from 'react'
import ProductCard from './ProductCard'

const FeaturedProducts = () => {
  const products = [
    {
      name: 'Calcium Supplement for Cattle',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Supplements',
      price: 599,
      originalPrice: 799,
      discount: 25,
      rating: 4.8,
      reviews: 1234,
      href: '/products/calcium-supplement'
    },
    {
      name: 'Liver Tonic Syrup',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Medicines',
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.7,
      reviews: 856,
      href: '/products/liver-tonic'
    },
    {
      name: 'Mineral Mixture Powder',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Supplements',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      rating: 4.9,
      reviews: 2108,
      href: '/products/mineral-mixture'
    },
    {
      name: 'Energy Booster Injection',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      category: 'Medicines',
      price: 449,
      originalPrice: 599,
      discount: 25,
      rating: 4.6,
      reviews: 642,
      href: '/products/energy-booster'
    }
  ]

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

export default FeaturedProducts

