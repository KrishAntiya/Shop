'use client'

import React from 'react'

const WhyChooseUs = () => {
  const features = [
    {
      name: 'Genuine Products',
      icon: '✅',
      description: '100% authentic & verified products'
    },
    {
      name: 'Fast Delivery',
      icon: '🚚',
      description: 'Quick & reliable shipping'
    },
    {
      name: 'Cold Chain Maintained',
      icon: '❄️',
      description: 'Temperature controlled storage'
    },
    {
      name: 'Trusted by Vets',
      icon: '👨‍⚕️',
      description: 'Recommended by professionals'
    },
    {
      name: 'PAN India Shipping',
      icon: '🇮🇳',
      description: 'Deliveries across India'
    }
  ]

  return (
    <div className="bg-secondary-light py-8 sm:py-10 md:py-12">
      <div className="max-w-container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-text mb-6 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-3 md:p-4 hover:shadow-md transition-all duration-200 ease-in-out flex flex-col gap-2 items-center text-center border border-neutral-border"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary-light rounded-lg flex items-center justify-center text-secondary flex-shrink-0 text-2xl md:text-3xl">
                {feature.icon}
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="text-xs md:text-sm font-semibold text-neutral-text leading-tight">{feature.name}</h3>
                <p className="text-xs text-neutral-text-secondary leading-snug hidden md:block">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs

