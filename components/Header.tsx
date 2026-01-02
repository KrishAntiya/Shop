'use client'

import React, { useState, useEffect, useRef } from 'react'
import Logo from './Logo'
import { useHeaderScroll } from '../hooks/useHeaderScroll'

const Header = () => {
  const [deliveryLocation, setDeliveryLocation] = useState('Delhi, 110001')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isPetDropdownOpen, setIsPetDropdownOpen] = useState(false)
  const [isMobilePetDropdownOpen, setIsMobilePetDropdownOpen] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [isMobileProductsDropdownOpen, setIsMobileProductsDropdownOpen] = useState(false)
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false)
  const [isMobileBrandsDropdownOpen, setIsMobileBrandsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const productsDropdownRef = useRef<HTMLDivElement>(null)
  const brandsDropdownRef = useRef<HTMLDivElement>(null)
  const headerNavRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const productsCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const brandsCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [headerNavHeight, setHeaderNavHeight] = useState(0)
  
  // Custom hook handles all scroll logic with requestAnimationFrame
  // Returns true when LogoHeader should be visible, false when hidden
  const isLogoHeaderVisible = useHeaderScroll(10) // 10px threshold

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPetDropdownOpen(false)
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false)
      }
      if (brandsDropdownRef.current && !brandsDropdownRef.current.contains(event.target as Node)) {
        setIsBrandsDropdownOpen(false)
      }
    }

    if (isPetDropdownOpen || isProductsDropdownOpen || isBrandsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPetDropdownOpen, isProductsDropdownOpen, isBrandsDropdownOpen])

  // Calculate header nav height for dropdown positioning
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerNavRef.current) {
        const rect = headerNavRef.current.getBoundingClientRect()
        setHeaderNavHeight(rect.bottom)
      }
    }
    
    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    window.addEventListener('scroll', updateHeaderHeight)
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
      window.removeEventListener('scroll', updateHeaderHeight)
    }
  }, [isLogoHeaderVisible])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
      if (productsCloseTimeoutRef.current) {
        clearTimeout(productsCloseTimeoutRef.current)
      }
      if (brandsCloseTimeoutRef.current) {
        clearTimeout(brandsCloseTimeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-50" style={{ overflow: 'visible' }}>
      {/* LogoHeader: Logo, Search bar, Account/Cart icons, Contact info */}
      {/* Hides on scroll DOWN, shows on scroll UP using transform */}
      {/* When hidden: absolute positioning removes from flow (no gap), transform animates smoothly */}
      <div 
        id="header-top"
        className={`bg-white border-b border-neutral-border shadow-sm will-change-transform transition-transform duration-300 ease-in-out ${
          isLogoHeaderVisible ? 'relative' : 'absolute top-0 left-0 right-0 z-10'
        }`}
        style={{
          transform: isLogoHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
          overflow: 'visible',
        }}
      >
        {/* Contact Info Bar */}
      <div className="bg-neutral-bg border-b border-neutral-border py-2 px-4">
          <div className="max-w-container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-xs sm:text-sm">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <a href="tel:1800-SWASTIK" className="flex items-center gap-2 text-neutral-text hover:text-primary transition">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
                <span className="whitespace-nowrap">1800-SWASTIK</span>
              </a>
              <a href="#" className="hidden sm:flex items-center gap-1 text-neutral-text hover:text-primary transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>Support</span>
              </a>
          </div>
            <div className="hidden md:block text-center sm:text-right text-neutral-text-secondary">Free shipping on orders over ₹2,000</div>
          <div className="hidden lg:block text-neutral-text-secondary">Licensed Veterinary Products</div>
        </div>
      </div>

        {/* Logo, Search, Account, Cart Row */}
        <div className="max-w-container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-6 md:gap-8">
            {/* Logo */}
            <Logo 
              size="sm" 
              showText={true}
              className="flex-shrink-0"
            />

            {/* Delivery Address Selector */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-neutral-bg rounded-lg hover:bg-primary/5 transition-all duration-200 ease-in-out group border border-neutral-border">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-neutral-text group-hover:text-primary whitespace-nowrap">
                Deliver to {deliveryLocation}
              </span>
            </button>

            {/* Mobile Delivery Address */}
            <button className="md:hidden flex items-center gap-1 px-2 py-1.5 bg-neutral-bg rounded-lg hover:bg-primary/5 transition-all duration-200">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-neutral-text">{deliveryLocation.split(',')[0]}</span>
            </button>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search medicines, supplements, vaccines..."
                  className="w-full px-4 py-2.5 pl-4 pr-12 bg-neutral-bg rounded-lg border border-neutral-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-text-secondary hover:text-primary transition-all duration-200 ease-in-out hover:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 hover:bg-neutral-bg rounded-full transition-all duration-200"
              aria-label="Search"
            >
              <svg className="w-5 h-5 text-neutral-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account & Cart Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Login & Signup Buttons */}
              <div className="hidden sm:flex items-center gap-2 border-r border-gray-200 pr-3 mr-2">
                <a 
                  href="/login" 
                  className="px-3 py-2 text-sm font-medium text-neutral-text hover:text-primary transition-colors duration-200"
                >
                  Login
                </a>
                <a 
                  href="/signup" 
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                >
                  Sign Up
                </a>
              </div>
              
              {/* Mobile Login/Signup */}
              <div className="sm:hidden flex items-center gap-1">
                <a 
                  href="/login" 
                  className="p-2 hover:bg-neutral-bg rounded-full transition-all duration-200 ease-in-out min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Login"
                >
                  <svg className="w-5 h-5 text-neutral-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </a>
              </div>

              {/* User Profile Icon */}
              <a 
                href="/profile" 
                className="p-2 hover:bg-neutral-bg rounded-full transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Profile"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-neutral-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
              
              {/* Cart Icon */}
              <a
                href="/cart"
                className="relative p-2 hover:bg-neutral-bg rounded-full transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Shopping Cart"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-neutral-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute top-0 right-0 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">3</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden bg-white border-b border-neutral-border px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search medicines, supplements..."
              className="w-full px-4 py-2.5 pl-10 pr-4 bg-neutral-bg rounded-lg border border-neutral-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              autoFocus
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-text-secondary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* NavHeader: Navigation Menu (HOME, PHARMACY, PRESCRIPTION DIETS, DOG, CAT, etc.) */}
      {/* Always visible and sticky - never moves or flickers */}
      <div 
        ref={headerNavRef}
        id="header-nav"
        className="bg-white border-b border-neutral-border shadow-sm relative z-40"
        style={{ overflow: 'visible', overflowX: 'visible', overflowY: 'visible' }}
      >
        <div className="max-w-container mx-auto px-4" style={{ overflow: 'visible', overflowX: 'visible', overflowY: 'visible' }}>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-between py-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-neutral-bg rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6 text-neutral-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <span className="text-sm font-medium text-neutral-text">Menu</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block relative" style={{ overflow: 'visible', overflowY: 'visible' }}>
            <nav className="flex items-center gap-4 md:gap-6 py-2 md:py-2.5 overflow-x-auto scrollbar-hide" style={{ overflowY: 'visible', overflow: 'visible' }}>
              <a href="/" className="text-primary font-medium whitespace-nowrap relative pb-1 text-sm transition-all duration-200 ease-in-out">
                HOME
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            </a>
              {/* Shop by Products Dropdown */}
              <div 
                ref={productsDropdownRef}
                className="relative"
                style={{ 
                  overflow: 'visible', 
                  position: 'relative', 
                  zIndex: 50
                }}
                onMouseEnter={() => {
                  if (productsCloseTimeoutRef.current) {
                    clearTimeout(productsCloseTimeoutRef.current)
                    productsCloseTimeoutRef.current = null
                  }
                  setIsProductsDropdownOpen(true)
                }}
                onMouseLeave={() => {
                  productsCloseTimeoutRef.current = setTimeout(() => {
                    setIsProductsDropdownOpen(false)
                  }, 100)
                }}
              >
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsProductsDropdownOpen(!isProductsDropdownOpen)
                  }}
                  className="text-neutral-text hover:text-secondary font-medium whitespace-nowrap transition-all duration-200 ease-in-out relative group pb-1 text-sm flex items-center gap-1 cursor-pointer"
                >
                  SHOP BY PRODUCTS
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className={`absolute bottom-0 left-0 ${isProductsDropdownOpen ? 'w-full' : 'w-0'} h-0.5 bg-secondary group-hover:w-full transition-all duration-200 ease-in-out`}></span>
                </button>
                
                {/* Invisible hover bridge */}
                {isProductsDropdownOpen && (
                  <div 
                    className="absolute"
                    style={{ 
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      width: '100%',
                      height: '8px',
                      zIndex: 9999,
                      pointerEvents: 'auto'
                    }}
                  />
                )}
                
                {/* Products Dropdown Menu - Full-width mega-menu */}
                {isProductsDropdownOpen && (
                  <div 
                    className="absolute bg-white shadow-2xl border-t border-gray-200 overflow-hidden"
                    style={{ 
                      position: 'fixed',
                      top: `${headerNavHeight}px`,
                      left: '0',
                      right: '0',
                      zIndex: 10000,
                      display: 'block',
                      visibility: 'visible',
                      opacity: '1',
                      pointerEvents: 'auto',
                      width: '100vw',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    onMouseEnter={() => {
                      if (productsCloseTimeoutRef.current) {
                        clearTimeout(productsCloseTimeoutRef.current)
                        productsCloseTimeoutRef.current = null
                      }
                      setIsProductsDropdownOpen(true)
                    }}
                    onMouseLeave={() => {
                      productsCloseTimeoutRef.current = setTimeout(() => {
                        setIsProductsDropdownOpen(false)
                      }, 100)
                    }}
                  >
                    <div className="bg-gradient-to-r from-primary/5 to-secondary-light/30 border-b border-neutral-border px-6 py-2">
                      <h3 className="text-sm font-bold text-primary">Browse by Product Category</h3>
                    </div>
                    <div className="max-w-container mx-auto px-6 py-4 grid grid-cols-4 gap-x-6 gap-y-4 bg-white">
                      {/* Column 1 */}
                      <div className="space-y-3">
                        {/* 1. Medicines */}
                        <div>
                          <h3 className="font-bold text-secondary text-sm mb-2 uppercase tracking-wide">Medicines</h3>
                          <div className="space-y-0.5">
                            <a href="/products/antibiotics" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Antibiotics</a>
                            <a href="/products/antiparasitics" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Antiparasitics (Worms, Ticks, Mites)</a>
                            <a href="/products/anti-inflammatory" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Anti-inflammatory & Pain Relief</a>
                            <a href="/products/antipyretics" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Antipyretics (Fever)</a>
                            <a href="/products/hormonal-reproductive" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Hormonal & Reproductive</a>
                            <a href="/products/digestive-medicines" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Digestive Medicines</a>
                          </div>
                        </div>
                        
                        {/* 2. Vaccines */}
                        <div>
                          <h3 className="font-bold text-secondary text-sm mb-2 uppercase tracking-wide">Vaccines</h3>
                          <div className="space-y-0.5">
                            <a href="/products/dog-vaccines" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Dog Vaccines</a>
                            <a href="/products/cattle-vaccines" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Cattle Vaccines</a>
                            <a href="/products/buffalo-vaccines" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Buffalo Vaccines</a>
                            <a href="/products/goat-sheep-vaccines" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Goat & Sheep Vaccines</a>
                          </div>
                        </div>
                      </div>
                      
                      {/* Column 2 */}
                      <div className="space-y-3">
                        {/* 3. Supplements & Nutrition */}
                        <div>
                          <h3 className="font-bold text-secondary text-sm mb-2 uppercase tracking-wide">Supplements & Nutrition</h3>
                          <div className="space-y-0.5">
                            <a href="/products/mineral-mixtures" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Mineral Mixtures</a>
                            <a href="/products/calcium-phosphorus" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Calcium & Phosphorus</a>
                            <a href="/products/vitamins-tonics" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Vitamins & Tonics</a>
                            <a href="/products/liver-rumen-tonics" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Liver & Rumen Tonics</a>
                            <a href="/products/milk-yield-enhancers" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Milk Yield Enhancers</a>
                          </div>
                        </div>
                        
                        {/* 4. Dewormers & Parasite Control */}
                        <div>
                          <h3 className="font-bold text-secondary text-sm mb-2 uppercase tracking-wide">Dewormers & Parasite Control</h3>
                          <div className="space-y-0.5">
                            <a href="/products/dewormers" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Dewormers</a>
                            <a href="/products/tick-flea-control" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Tick & Flea Control</a>
                            <a href="/products/ectoparasiticides" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Ectoparasiticides</a>
                            <a href="/products/endoparasiticides" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Endoparasiticides</a>
                          </div>
                        </div>
                      </div>
                      
                      {/* Column 3 */}
                      <div className="space-y-3">
                        {/* 5. Reproductive & Lactation Care */}
                        <div>
                          <h3 className="font-bold text-secondary text-sm mb-2 uppercase tracking-wide">Reproductive & Lactation Care</h3>
                          <div className="space-y-0.5">
                            <a href="/products/heat-induction" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Heat Induction</a>
                            <a href="/products/fertility-boosters" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Fertility Boosters</a>
                            <a href="/products/post-calving-care" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Post-Calving Care</a>
                            <a href="/products/mastitis-care" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Mastitis Care</a>
                          </div>
                        </div>
                        
                        {/* 6. Feed Additives */}
                        <div>
                          <h3 className="font-bold text-secondary text-sm mb-2 uppercase tracking-wide">Feed Additives</h3>
                          <div className="space-y-0.5">
                            <a href="/products/probiotics" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Probiotics</a>
                            <a href="/products/enzymes" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Enzymes</a>
                            <a href="/products/growth-promoters" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Growth Promoters</a>
                            <a href="/products/immunity-boosters" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Immunity Boosters</a>
                          </div>
                        </div>
                      </div>
                      
                      {/* Column 4 */}
                      <div className="space-y-3">
                        {/* 7. Disinfectants & Hygiene */}
                        <div>
                          <h3 className="font-bold text-secondary text-sm mb-2 uppercase tracking-wide">Disinfectants & Hygiene</h3>
                          <div className="space-y-0.5">
                            <a href="/products/farm-disinfectants" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Farm Disinfectants</a>
                            <a href="/products/udder-wash-teat-dip" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Udder Wash & Teat Dip</a>
                            <a href="/products/wound-care" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Wound Care</a>
                            <a href="/products/floor-equipment-sanitizers" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Floor & Equipment Sanitizers</a>
                          </div>
                        </div>
                        
                        {/* 8. Veterinary Equipment */}
                        <div>
                          <h3 className="font-bold text-secondary text-sm mb-2 uppercase tracking-wide">Veterinary Equipment</h3>
                          <div className="space-y-0.5">
                            <a href="/products/syringes-needles" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Syringes & Needles</a>
                            <a href="/products/gloves-consumables" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Gloves & Consumables</a>
                            <a href="/products/drenching-guns" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Drenching Guns</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Shop by Brands Dropdown */}
              <div 
                ref={brandsDropdownRef}
                className="relative"
                style={{ 
                  overflow: 'visible', 
                  position: 'relative', 
                  zIndex: 50
                }}
                onMouseEnter={() => {
                  if (brandsCloseTimeoutRef.current) {
                    clearTimeout(brandsCloseTimeoutRef.current)
                    brandsCloseTimeoutRef.current = null
                  }
                  setIsBrandsDropdownOpen(true)
                }}
                onMouseLeave={() => {
                  brandsCloseTimeoutRef.current = setTimeout(() => {
                    setIsBrandsDropdownOpen(false)
                  }, 100)
                }}
              >
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsBrandsDropdownOpen(!isBrandsDropdownOpen)
                  }}
                  className="text-neutral-text hover:text-secondary font-medium whitespace-nowrap transition-all duration-200 ease-in-out relative group pb-1 text-sm flex items-center gap-1 cursor-pointer"
                >
                  SHOP BY BRANDS
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isBrandsDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-200 ease-in-out"></span>
                </button>
                
                {/* Invisible hover bridge */}
                {isBrandsDropdownOpen && (
                  <div 
                    className="absolute"
                    style={{ 
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      width: '100%',
                      height: '8px',
                      zIndex: 9999,
                      pointerEvents: 'auto'
                    }}
                  />
                )}
                
                {/* Brands Dropdown Menu - Full-width mega-menu */}
                {isBrandsDropdownOpen && (
                  <div 
                    className="absolute bg-white shadow-2xl border-t border-gray-200 overflow-hidden"
                    style={{ 
                      position: 'fixed',
                      top: `${headerNavHeight}px`,
                      left: '0',
                      right: '0',
                      zIndex: 10000,
                      display: 'block',
                      visibility: 'visible',
                      opacity: '1',
                      pointerEvents: 'auto',
                      width: '100vw',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    onMouseEnter={() => {
                      if (brandsCloseTimeoutRef.current) {
                        clearTimeout(brandsCloseTimeoutRef.current)
                        brandsCloseTimeoutRef.current = null
                      }
                      setIsBrandsDropdownOpen(true)
                    }}
                    onMouseLeave={() => {
                      brandsCloseTimeoutRef.current = setTimeout(() => {
                        setIsBrandsDropdownOpen(false)
                      }, 100)
                    }}
                  >
                    <div className="bg-gradient-to-r from-primary/5 to-secondary-light/30 border-b border-neutral-border px-6 py-2">
                      <h3 className="text-sm font-bold text-primary">Shop by Brand</h3>
                    </div>
                    <div className="max-w-container mx-auto px-6 py-4 grid grid-cols-5 gap-x-6 gap-y-3 bg-white">
                      <a href="/brands/indian-immunologicals" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Indian Immunologicals Ltd (IIL)</a>
                      <a href="/brands/intas-animal-health" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Intas Animal Health</a>
                      <a href="/brands/zydus-animal-health" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Zydus Animal Health</a>
                      <a href="/brands/sequent-scientific" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Sequent Scientific</a>
                      <a href="/brands/hester-biosciences" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Hester Biosciences</a>
                      <a href="/brands/virbac-animal-health" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Virbac Animal Health India</a>
                      <a href="/brands/boehringer-ingelheim" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Boehringer Ingelheim Animal Health</a>
                      <a href="/brands/zoetis-india" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Zoetis India</a>
                      <a href="/brands/elanco-animal-health" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Elanco Animal Health India</a>
                      <a href="/brands/vetoquinol-india" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Vetoquinol India</a>
                      <a href="/brands/alembic-animal-health" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Alembic Animal Health</a>
                      <a href="/brands/pfizer-animal-health" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Pfizer Animal Health (legacy)</a>
                      <a href="/brands/ashish-life-science" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Ashish Life Science</a>
                      <a href="/brands/vee-remedies" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Vee Remedies</a>
                      <a href="/brands/zenley-animal-health" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Zenley Animal Health</a>
                      <a href="/brands/vetnation-pharma" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Vetnation Pharma</a>
                      <a href="/brands/iskon-remedies" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Iskon Remedies</a>
                      <a href="/brands/mediwin-laboratories" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Mediwin Laboratories</a>
                      <a href="/brands/ani-healthcare" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Ani Healthcare</a>
                      <a href="/brands/petvet-healthcare" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Petvet Healthcare</a>
                      <a href="/brands/gmt-pharma" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">GMT Pharma International</a>
                      <a href="/brands/sarabhai-zydus" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Sarabhai Zydus Animal Health</a>
                      <a href="/brands/vivaldis-animal-health" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Vivaldis Animal Health</a>
                      <a href="/brands/neospark-drugs" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Neospark Drugs & Chemicals</a>
                      <a href="/brands/vetcare-pvt-ltd" className="block py-1 text-neutral-text hover:text-primary hover:font-medium transition-all duration-200 text-sm font-normal">Vetcare Pvt Ltd</a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Shop by Pet Name Dropdown */}
              {/* Parent container wraps both trigger and dropdown for unified hover area */}
              <div 
                ref={dropdownRef}
                className="relative"
                style={{ 
                  overflow: 'visible', 
                  position: 'relative', 
                  zIndex: 50
                }}
                onMouseEnter={() => {
                  // Clear any pending close timeout
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current)
                    closeTimeoutRef.current = null
                  }
                  setIsPetDropdownOpen(true)
                }}
                onMouseLeave={() => {
                  // Only close when mouse truly leaves the entire container (trigger + dropdown)
                  closeTimeoutRef.current = setTimeout(() => {
                    setIsPetDropdownOpen(false)
                  }, 100) // Small delay to handle fast mouse movements
                }}
              >
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPetDropdownOpen(!isPetDropdownOpen)
                  }}
                  className="text-neutral-text hover:text-secondary font-medium whitespace-nowrap transition-all duration-200 ease-in-out relative group pb-1 text-sm flex items-center gap-1 cursor-pointer"
                >
                  SHOP BY ANIMAL
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isPetDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-200 ease-in-out"></span>
                </button>
                
                {/* Invisible hover bridge - ensures continuous hover area between trigger and dropdown */}
                {isPetDropdownOpen && (
                  <div 
                    className="absolute"
                    style={{ 
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      width: '100%',
                      height: '8px',
                      zIndex: 9999,
                      pointerEvents: 'auto'
                    }}
                  />
                )}
                
                {/* Dropdown Menu - Full-width mega-menu */}
                {isPetDropdownOpen && (
                  <div 
                    className="absolute bg-white shadow-2xl border-t border-gray-200 overflow-hidden"
                    style={{ 
                      position: 'fixed',
                      top: `${headerNavHeight}px`,
                      left: '0',
                      right: '0',
                      zIndex: 10000,
                      display: 'block',
                      visibility: 'visible',
                      opacity: '1',
                      pointerEvents: 'auto',
                      width: '100vw',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    onMouseEnter={() => {
                      if (closeTimeoutRef.current) {
                        clearTimeout(closeTimeoutRef.current)
                        closeTimeoutRef.current = null
                      }
                      setIsPetDropdownOpen(true)
                    }}
                    onMouseLeave={() => {
                      closeTimeoutRef.current = setTimeout(() => {
                        setIsPetDropdownOpen(false)
                      }, 100)
                    }}
                  >
                    <div className="bg-gradient-to-r from-primary/5 to-primary-bg/30 border-b border-gray-100 px-6 py-2">
                      <h3 className="text-sm font-bold text-primary">Shop by Animal</h3>
                    </div>
                    <div className="max-w-container mx-auto px-6 py-4">
                      <div className="grid grid-cols-6 gap-3">
                        <a 
                          href="/dog" 
                          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                          onClick={() => setIsPetDropdownOpen(false)}
                        >
                          <div className="text-2xl mb-1.5">🐕</div>
                          <h4 className="text-xs font-bold text-primary group-hover:text-primary-dark">DOG</h4>
                        </a>
                        <a 
                          href="/cat" 
                          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                          onClick={() => setIsPetDropdownOpen(false)}
                        >
                          <div className="text-2xl mb-1.5">🐱</div>
                          <h4 className="text-xs font-bold text-primary group-hover:text-primary-dark">CAT</h4>
                        </a>
                        <a 
                          href="/large-animals" 
                          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                          onClick={() => setIsPetDropdownOpen(false)}
                        >
                          <div className="text-2xl mb-1.5">🐄</div>
                          <h4 className="text-xs font-bold text-primary group-hover:text-primary-dark">LARGE ANIMALS</h4>
                        </a>
                        <a 
                          href="/sheep-goat" 
                          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                          onClick={() => setIsPetDropdownOpen(false)}
                        >
                          <div className="text-2xl mb-1.5">🐑</div>
                          <h4 className="text-xs font-bold text-primary group-hover:text-primary-dark">SHEEP & GOAT</h4>
                        </a>
                        <a 
                          href="/poultry" 
                          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                          onClick={() => setIsPetDropdownOpen(false)}
                        >
                          <div className="text-2xl mb-1.5">🐔</div>
                          <h4 className="text-xs font-bold text-primary group-hover:text-primary-dark">POULTRY</h4>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <a href="/about-us" className="text-neutral-text hover:text-secondary font-medium whitespace-nowrap transition-all duration-200 ease-in-out relative group pb-1 text-sm">
                ABOUT US
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-200 ease-in-out"></span>
            </a>
          </nav>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <nav className="md:hidden border-t border-gray-200 py-4 space-y-2">
              <a href="/" className="block px-4 py-3 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors">HOME</a>
              
              {/* Mobile Shop by Products Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileProductsDropdownOpen(!isMobileProductsDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-neutral-text hover:bg-neutral-bg rounded-lg font-medium text-sm transition-colors"
                >
                  <span>SHOP BY PRODUCTS</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isMobileProductsDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mobile Products Dropdown Items */}
                {isMobileProductsDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-1 max-h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-primary text-sm mt-3 mb-2">Medicines</h4>
                        <a href="/products/antibiotics" className="block px-4 py-2 text-neutral-text-secondary hover:bg-neutral-bg rounded-lg font-normal text-sm transition-colors">Antibiotics</a>
                        <a href="/products/antiparasitics" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Antiparasitics (Worms, Ticks, Mites)</a>
                        <a href="/products/anti-inflammatory" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Anti-inflammatory & Pain Relief</a>
                        <a href="/products/antipyretics" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Antipyretics (Fever)</a>
                        <a href="/products/hormonal-reproductive" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Hormonal & Reproductive</a>
                        <a href="/products/digestive-medicines" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Digestive Medicines</a>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-primary text-sm mt-3 mb-2">Vaccines</h4>
                        <a href="/products/dog-vaccines" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Dog Vaccines</a>
                        <a href="/products/cattle-vaccines" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Cattle Vaccines</a>
                        <a href="/products/buffalo-vaccines" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Buffalo Vaccines</a>
                        <a href="/products/goat-sheep-vaccines" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Goat & Sheep Vaccines</a>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-primary text-sm mt-3 mb-2">Supplements & Nutrition</h4>
                        <a href="/products/mineral-mixtures" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Mineral Mixtures</a>
                        <a href="/products/calcium-phosphorus" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Calcium & Phosphorus</a>
                        <a href="/products/vitamins-tonics" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Vitamins & Tonics</a>
                        <a href="/products/liver-rumen-tonics" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Liver & Rumen Tonics</a>
                        <a href="/products/milk-yield-enhancers" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Milk Yield Enhancers</a>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-primary text-sm mt-3 mb-2">Dewormers & Parasite Control</h4>
                        <a href="/products/dewormers" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Dewormers</a>
                        <a href="/products/tick-flea-control" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Tick & Flea Control</a>
                        <a href="/products/ectoparasiticides" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Ectoparasiticides</a>
                        <a href="/products/endoparasiticides" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Endoparasiticides</a>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-primary text-sm mt-3 mb-2">Reproductive & Lactation Care</h4>
                        <a href="/products/heat-induction" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Heat Induction</a>
                        <a href="/products/fertility-boosters" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Fertility Boosters</a>
                        <a href="/products/post-calving-care" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Post-Calving Care</a>
                        <a href="/products/mastitis-care" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Mastitis Care</a>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-primary text-sm mt-3 mb-2">Feed Additives</h4>
                        <a href="/products/probiotics" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Probiotics</a>
                        <a href="/products/enzymes" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Enzymes</a>
                        <a href="/products/growth-promoters" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Growth Promoters</a>
                        <a href="/products/immunity-boosters" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Immunity Boosters</a>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-primary text-sm mt-3 mb-2">Disinfectants & Hygiene</h4>
                        <a href="/products/farm-disinfectants" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Farm Disinfectants</a>
                        <a href="/products/udder-wash-teat-dip" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Udder Wash & Teat Dip</a>
                        <a href="/products/wound-care" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Wound Care</a>
                        <a href="/products/floor-equipment-sanitizers" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Floor & Equipment Sanitizers</a>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-primary text-sm mt-3 mb-2">Veterinary Equipment</h4>
                        <a href="/products/syringes-needles" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Syringes & Needles</a>
                        <a href="/products/gloves-consumables" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Gloves & Consumables</a>
                        <a href="/products/drenching-guns" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-normal text-sm transition-colors">Drenching Guns</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile Shop by Brands Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileBrandsDropdownOpen(!isMobileBrandsDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-neutral-text hover:bg-neutral-bg rounded-lg font-medium text-sm transition-colors"
                >
                  <span>SHOP BY BRANDS</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isMobileBrandsDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mobile Brands Dropdown Items */}
                {isMobileBrandsDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-1 max-h-[400px] overflow-y-auto">
                    <a href="/brands/indian-immunologicals" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Indian Immunologicals Ltd (IIL)</a>
                    <a href="/brands/intas-animal-health" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Intas Animal Health</a>
                    <a href="/brands/zydus-animal-health" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Zydus Animal Health</a>
                    <a href="/brands/sequent-scientific" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Sequent Scientific</a>
                    <a href="/brands/hester-biosciences" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Hester Biosciences</a>
                    <a href="/brands/virbac-animal-health" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Virbac Animal Health India</a>
                    <a href="/brands/boehringer-ingelheim" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Boehringer Ingelheim Animal Health</a>
                    <a href="/brands/zoetis-india" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Zoetis India</a>
                    <a href="/brands/elanco-animal-health" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Elanco Animal Health India</a>
                    <a href="/brands/vetoquinol-india" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Vetoquinol India</a>
                    <a href="/brands/alembic-animal-health" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Alembic Animal Health</a>
                    <a href="/brands/pfizer-animal-health" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Pfizer Animal Health (legacy)</a>
                    <a href="/brands/ashish-life-science" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Ashish Life Science</a>
                    <a href="/brands/vee-remedies" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Vee Remedies</a>
                    <a href="/brands/zenley-animal-health" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Zenley Animal Health</a>
                    <a href="/brands/vetnation-pharma" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Vetnation Pharma</a>
                    <a href="/brands/iskon-remedies" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Iskon Remedies</a>
                    <a href="/brands/mediwin-laboratories" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Mediwin Laboratories</a>
                    <a href="/brands/ani-healthcare" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Ani Healthcare</a>
                    <a href="/brands/petvet-healthcare" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Petvet Healthcare</a>
                    <a href="/brands/gmt-pharma" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">GMT Pharma International</a>
                    <a href="/brands/sarabhai-zydus" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Sarabhai Zydus Animal Health</a>
                    <a href="/brands/vivaldis-animal-health" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Vivaldis Animal Health</a>
                    <a href="/brands/neospark-drugs" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Neospark Drugs & Chemicals</a>
                    <a href="/brands/vetcare-pvt-ltd" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Vetcare Pvt Ltd</a>
                  </div>
                )}
              </div>
              
              {/* Mobile Shop by Pet Name Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobilePetDropdownOpen(!isMobilePetDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-neutral-text hover:bg-neutral-bg rounded-lg font-medium text-sm transition-colors"
                >
                  <span>SHOP BY PET NAME</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isMobilePetDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mobile Dropdown Items */}
                {isMobilePetDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-1">
                    <a href="/dog" className="block px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">DOG</a>
                    <a href="/cat" className="block px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">CAT</a>
                    <a href="/large-animals" className="block px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">LARGE ANIMALS</a>
                    <a href="/sheep-goat" className="block px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">SHEEP & GOAT</a>
                    <a href="/poultry" className="block px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">POULTRY</a>
                  </div>
                )}
              </div>
              
              <a href="/about-us" className="block px-4 py-3 text-neutral-text hover:bg-neutral-bg rounded-lg font-medium text-sm transition-colors">ABOUT US</a>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

