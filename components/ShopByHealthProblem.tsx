'use client'

import React, { useRef, useState, useEffect } from 'react'
import UniversalCard from './UniversalCard'

const ShopByHealthProblem = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const healthProblems = [
    {
      name: 'Mastitis',
      icon: '🐄',
      href: '/health-problems/mastitis'
    },
    {
      name: 'Fever',
      icon: '🌡️',
      href: '/health-problems/fever'
    },
    {
      name: 'Digestive Problems',
      icon: '🫄',
      href: '/health-problems/digestive'
    },
    {
      name: 'Skin Infections',
      icon: '🦠',
      href: '/health-problems/skin'
    },
    {
      name: 'Fertility & Reproduction',
      icon: '👶',
      href: '/health-problems/fertility'
    },
    {
      name: 'Respiratory Issues',
      icon: '🫁',
      href: '/health-problems/respiratory'
    },
    {
      name: 'Calcium Deficiency',
      icon: '🦴',
      href: '/health-problems/calcium'
    }
  ]

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
      // Card width (160px) + gap (12px) = 172px
      const scrollAmount = 172
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Shop by Health Problem</h2>
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
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {healthProblems.map((problem, index) => (
              <div key={index} className="flex-shrink-0 w-[160px]">
                <UniversalCard
                  icon={problem.icon}
                  title={problem.name}
                  href={problem.href}
                  className="text-sm"
                />
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

export default ShopByHealthProblem

