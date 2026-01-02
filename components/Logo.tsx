'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
  dark?: boolean
}

const Logo = ({ size = 'md', className = '', showText = true, dark = false }: LogoProps) => {
  const [imageError, setImageError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  }

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  }

  const iconSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  const imageSizes = {
    sm: 64,
    md: 80,
    lg: 96
  }

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-3'
  }

  return (
    <div className={`flex items-center ${gapClasses[size]} ${className}`}>
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        {!imageError ? (
          <Image
            src="/logo.png"
            alt="SwastikPharma Logo"
            width={imageSizes[size]}
            height={imageSizes[size]}
            className="object-contain w-full h-full"
            priority
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className={`${iconSizeClasses[size]} ${dark ? 'bg-white' : 'bg-primary'} rounded-full flex items-center justify-center`}>
            <span className={`${dark ? 'text-primary' : 'text-white'} text-xl font-bold`}>S</span>
          </div>
        )}
      </div>
      {showText && (
        <div className="flex flex-col justify-center">
          <h1 className={`${textSizeClasses[size]} font-bold ${dark ? 'text-white' : 'text-primary'} leading-tight`}>
            SwastikPharma
          </h1>
          <p className={`text-xs ${dark ? 'text-white text-opacity-80' : 'text-gray-700'} leading-tight`}>
            Veterinary Pharma
          </p>
        </div>
      )}
    </div>
  )
}

export default Logo

