'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const WhyChoose = () => {
  const features = [
    {
      title: '100% Genuine Products',
      description: 'All products are sourced directly from licensed manufacturers and distributors.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Pan-India Delivery',
      description: 'Fast and reliable shipping to every corner of India, even rural areas.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-4 md:gap-6 mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Why Choose SwastikPharma?</h1>
            <p className="text-gray-700 text-base sm:text-lg max-w-prose-wide mx-auto leading-relaxed">
              India's most trusted online veterinary pharmacy with 10+ years of experience serving farmers and pet owners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-in-out flex flex-col gap-4 items-center text-center h-full border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary-bg rounded-lg flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default WhyChoose

