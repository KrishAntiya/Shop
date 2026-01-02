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
    <div className="bg-primary-bg py-6 sm:py-8 md:py-10">
      <div className="max-w-container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-2 md:gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-bg border-2 border-primary rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-primary">Stay Updated</h2>
          <p className="text-gray-700 text-sm sm:text-base max-w-prose mx-auto leading-snug">
            Subscribe to our newsletter for exclusive offers, new product launches, and expert veterinary tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm min-h-[40px]"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 whitespace-nowrap shadow-sm hover:shadow-md min-h-[40px] text-sm"
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

