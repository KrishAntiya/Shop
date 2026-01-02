'use client'

import React, { useRef, useState, useEffect } from 'react'

const ShopByAnimal = () => {
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
  const animals: Array<{ name: string; image: string; products: string }> = []

  return (
    <div className="bg-gray-50 py-8 sm:py-10 md:py-12">
      <div className="max-w-container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Shop by Animal</h2>
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
            {animals.length === 0 && (
              <div className="text-center text-gray-400 py-8 w-full">
                No cards added yet. Cards will be added here.
              </div>
            )}
            {animals.map((animal, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer group flex flex-col flex-shrink-0 w-full sm:w-64"
                style={{ height: '320px' }}
              >
                <div className="h-48 bg-gray-200 overflow-hidden relative flex-shrink-0">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200 ease-in-out"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=${encodeURIComponent(animal.name)}`
                    }}
                  />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1 min-h-[80px]">
                  <h3 className="text-lg font-semibold text-primary">{animal.name}</h3>
                  <p className="text-sm text-gray-700">{animal.products}</p>
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

export default ShopByAnimal

