'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for smart sticky header scroll behavior
 * 
 * Prevents flickering by:
 * - Using requestAnimationFrame for smooth scroll handling
 * - Only updating state when scroll direction changes
 * - Using scroll threshold to ignore micro movements
 * - Tracking scroll direction to prevent unnecessary re-renders
 */
export const useHeaderScroll = (threshold: number = 10) => {
  // State: true = visible, false = hidden
  const [isVisible, setIsVisible] = useState(true)
  
  // Refs to persist values without causing re-renders
  const lastScrollY = useRef(0) // Last scroll position
  const ticking = useRef(false) // Prevents multiple RAF calls
  const scrollDirection = useRef<'up' | 'down' | null>(null) // Current scroll direction

  useEffect(() => {
    /**
     * Scroll handler using requestAnimationFrame
     * This ensures smooth performance and prevents flickering
     */
    const handleScroll = () => {
      // Get current scroll position (cross-browser compatible)
      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      
      // Always show when near top of page (within 50px) - check this first
      if (currentScrollY < 50) {
        setIsVisible((prev) => {
          if (!prev) {
            scrollDirection.current = null // Reset direction at top
            return true
          }
          return prev
        })
        lastScrollY.current = currentScrollY
        ticking.current = false
        return
      }

      // Calculate scroll difference
      const scrollDifference = currentScrollY - lastScrollY.current
      
      // Only process if we have a significant scroll movement (prevents micro-movements)
      if (Math.abs(scrollDifference) < threshold) {
        lastScrollY.current = currentScrollY
        ticking.current = false
        return
      }

      // Determine new scroll direction
      const newDirection: 'up' | 'down' = scrollDifference > 0 ? 'down' : 'up'

      // Only update state if direction changed (prevents flickering)
      if (scrollDirection.current !== newDirection) {
        scrollDirection.current = newDirection

        // Hide when scrolling DOWN (only if currently visible)
        if (newDirection === 'down') {
          setIsVisible(false)
        }
        // When scrolling UP, keep LogoHeader hidden (only show at very top)
        // LogoHeader will only show when currentScrollY < 50 (handled above)
        // So we don't need to show it here when scrolling up
      }

      // Update last scroll position
      lastScrollY.current = currentScrollY
      ticking.current = false // Allow next RAF call
    }

    /**
     * Wrapper function for requestAnimationFrame
     * Ensures we only process scroll events once per frame
     */
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          handleScroll()
        })
        ticking.current = true
      }
    }

    // Initialize scroll position on mount
    lastScrollY.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', onScroll, { passive: true })

    // Cleanup: remove event listener on unmount
    return () => {
      window.removeEventListener('scroll', onScroll)
      ticking.current = false
    }
  }, [threshold]) // Re-run if threshold changes

  return isVisible
}

