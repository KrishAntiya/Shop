'use client'

import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <div className="bg-primary-bg py-12 sm:py-16 md:py-20">
      <div className="max-w-container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-4 md:gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-bg border-4 border-primary rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Stay Updated</h2>
          <p className="text-gray-700 text-base sm:text-lg max-w-prose-wide mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive offers, new product launches, and expert veterinary tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base min-h-[44px]"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-6 md:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 whitespace-nowrap shadow-md hover:shadow-lg min-h-[44px] text-sm md:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Newsletter

