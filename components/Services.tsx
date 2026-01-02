'use client'

import React from 'react'

const Services = () => {
  const services = [
    {
      title: 'Same Day Dispatch',
      description: 'Orders placed before 2 PM are dispatched the same business day.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      title: 'Vet Support',
      description: 'Free consultation with licensed veterinarians for product guidance.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-grade security protection.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Easy Returns',
      description: 'Hassle-free returns within 7 days if products are damaged or expired.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: '100% Genuine Products',
      description: 'All products are sourced directly from licensed manufacturers and distributors.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Pan-India Delivery',
      description: 'Fast and reliable shipping to every corner of India, even rural areas.',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
  ]

  return (
    <div className="bg-primary-bg py-8 sm:py-10 md:py-12">
      <div className="max-w-container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-3 md:p-4 hover:shadow-md transition-all duration-200 ease-in-out flex flex-col gap-2 items-center text-center border border-gray-100"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-bg rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="text-xs md:text-sm font-semibold text-primary leading-tight">{service.title}</h3>
                <p className="text-xs text-gray-600 leading-snug hidden md:block">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services

