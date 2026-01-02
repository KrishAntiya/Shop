'use client'

import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="relative overflow-hidden min-h-[450px] md:min-h-[500px]">
      {/* Fallback Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-green-50 to-green-100 z-0"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Large Animal Veterinary Medicines Background"
          fill
          className="object-cover"
          priority
          quality={90}
          unoptimized
          onError={(e) => {
            // Fallback to gradient if image not found
            const target = e.target as HTMLImageElement
            if (target.parentElement) {
              target.parentElement.style.display = 'none'
            }
          }}
        />
        {/* Darker overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50"></div>
      </div>
      
      {/* Text positioned to look integrated with image */}
      <div className="relative z-10 max-w-container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
            Your Trusted Partner in Large Animal Veterinary Medicines
          </h1>
          
          {/* Body Text */}
          <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl leading-relaxed mb-6 font-medium">
            High-quality medicines & supplements for Cattle, Buffalo, Goat & Sheep — trusted by veterinarians and farmers across India.
          </p>
          
          {/* Call-to-Action Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/large-animals"
              className="inline-flex items-center justify-center px-5 md:px-6 py-2.5 md:py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl min-h-[44px] text-sm md:text-base"
            >
              Shop Large Animal Medicines
              <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Features Section at Bottom - Integrated into image */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-t border-white/30">
        <div className="max-w-container mx-auto px-4 py-4 md:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Feature 1: Vet Approved Formulations */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mb-2 shadow-md">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Vet Approved Formulations</h3>
            </div>
            
            {/* Feature 2: Fast Delivery to Rural Areas */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mb-2 shadow-md">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Fast Delivery to Rural Areas</h3>
            </div>
            
            {/* Feature 3: Genuine & Trusted Brands */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mb-2 shadow-md">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Genuine & Trusted Brands</h3>
            </div>
            
            {/* Feature 4: Bulk Orders for Farmers */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mb-2 shadow-md">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Bulk Orders for Farmers</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

