'use client'

import React, { useRef, useState, useEffect } from 'react'

const FeaturedProducts = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      window.addEventListener('resize', checkScrollability)
      return () => {
        container.removeEventListener('scroll', checkScrollability)
        window.removeEventListener('resize', checkScrollability)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Scroll by approximately one card width plus gap (256px + 16px = 272px)
      const scrollAmount = 272
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  // Cards will be added here one by one as per instructions
  const products: Array<{
    name: string
    category: string
    usage: string
    image: string
    rating: number
    reviews: number
    price: number
    originalPrice?: number
    badge?: string | null
    discount?: number | null
  }> = []

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-secondary fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-secondary fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    return stars
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-10 md:py-12">
      <div className="max-w-container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Featured Products</h2>
        <div className="relative">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 min-h-[48px] min-w-[48px]"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Cards will be added here one by one as per instructions */}
            {products.length === 0 && (
              <div className="text-center text-gray-400 py-8 w-full">
                No cards added yet. Cards will be added here.
              </div>
            )}
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/20 transition-all duration-200 ease-in-out cursor-pointer group flex flex-col flex-shrink-0 w-full sm:w-64"
                style={{ height: '320px' }}
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-secondary text-white px-2 py-0.5 rounded-full text-xs font-semibold z-10 shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-secondary text-white px-2 py-0.5 rounded-full text-xs font-semibold z-10 shadow-sm">
                      -{product.discount}%
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1 min-h-[80px]">
                  <p className="text-xs text-gray-600 uppercase font-medium tracking-wide h-4">{product.category}</p>
                  <h3 className="text-base font-bold text-primary leading-tight line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  <p className="text-xs text-gray-600 leading-snug line-clamp-2 min-h-[2.5rem] flex-1">{product.usage}</p>
                  <div className="flex items-center gap-1.5 h-5">
                    <div className="flex items-center">{renderStars(product.rating)}</div>
                    <span className="text-xs text-gray-700">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                    <div>
                      <span className="text-lg font-bold text-primary">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-600 line-through ml-1.5 text-xs">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <button className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 min-h-[36px] min-w-[36px] flex items-center justify-center shadow-sm hover:shadow-md flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 min-h-[48px] min-w-[48px]"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts

