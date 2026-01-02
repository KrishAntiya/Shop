'use client'

import React, { useRef, useState, useEffect } from 'react'

const ShopByCategory = () => {
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
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  // Cards will be added here one by one as per instructions
  const categories: Array<{
    name: string
    icon: React.ReactNode
    description: string
    products: string
  }> = []

  return (
    <div className="bg-white py-8 sm:py-10 md:py-12">
      <div className="max-w-container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Shop by Category</h2>
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
            {categories.length === 0 && (
              <div className="text-center text-gray-400 py-8 w-full">
                No cards added yet. Cards will be added here.
              </div>
            )}
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-bg via-white to-primary-bg/30 border-2 border-primary/20 rounded-xl shadow-lg hover:shadow-2xl p-4 hover:-translate-y-2 hover:border-primary/40 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col gap-3 flex-shrink-0 w-full sm:w-64 relative overflow-hidden"
                style={{ height: '320px' }}
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-300"></div>
                
                {/* Icon Section - Fixed height to match image area */}
                <div className="relative z-10 flex items-center justify-between h-12 mb-2">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <div className="w-7 h-7">
                      {category.icon}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-primary bg-white/80 px-2 py-1 rounded-full border border-primary/20">
                    {category.products}
                  </div>
                </div>
                
                {/* Content Section - Match other cards' content area */}
                <div className="flex flex-col gap-2 flex-1 relative z-10 min-h-[80px]">
                  <h3 className="text-lg font-bold text-primary group-hover:text-primary-dark transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug line-clamp-2">
                    {category.description}
                  </p>
                </div>
                
                {/* View More Link */}
                <a 
                  href="#" 
                  className="relative z-10 text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300 mt-auto pt-2 border-t border-primary/10"
                >
                  <span>Explore</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
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

export default ShopByCategory

