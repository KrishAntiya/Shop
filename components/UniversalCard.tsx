'use client'

import React from 'react'
import Image from 'next/image'

interface UniversalCardProps {
  image?: string
  icon?: React.ReactNode
  title: string
  subtitle?: string
  badge?: string
  onClick?: () => void
  href?: string
  className?: string
  circular?: boolean
}

const UniversalCard: React.FC<UniversalCardProps> = ({
  image,
  icon,
  title,
  subtitle,
  badge,
  onClick,
  href,
  className = '',
  circular = false
}) => {
  const isSmall = className.includes('text-sm')
  
  // For circular cards, separate the circle from the title
  if (circular) {
    const circleContent = (
      <div
        className={`
          bg-white
          border border-neutral-border rounded-full shadow-sm
          group-hover:-translate-y-2 group-hover:shadow-lg group-hover:border-primary/50
          transition-all duration-200 ease-in-out
          cursor-pointer
          overflow-hidden
          flex items-center justify-center
          ${className}
        `}
        style={{
          height: isSmall ? '140px' : '200px',
          width: isSmall ? '140px' : '200px',
          minWidth: isSmall ? '140px' : '200px',
          minHeight: isSmall ? '140px' : '200px'
        }}
        onClick={onClick}
      >
        <div 
          className="relative w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center transition-all duration-300"
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain transition-transform duration-200 ease-in-out"
              loading="lazy"
              unoptimized
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          ) : icon ? (
            <div className="w-full h-full flex items-center justify-center text-secondary">
              <div className={isSmall ? 'text-3xl' : 'text-5xl'}>{icon}</div>
            </div>
          ) : (
            <div className="w-full h-full bg-neutral-bg flex items-center justify-center">
              <div className={`${isSmall ? 'text-3xl' : 'text-4xl'} text-neutral-text-secondary opacity-50`}>📦</div>
            </div>
          )}
          
          {badge && (
            <div className={`absolute top-2 right-2 bg-primary text-white ${isSmall ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'} font-semibold rounded-lg shadow-md z-10`}>
              {badge}
            </div>
          )}
        </div>
      </div>
    )

    const titleContent = (
      <div className="mt-3 text-center">
        <h3 className={`${isSmall ? 'text-sm' : 'text-base'} font-bold text-neutral-text line-clamp-1 group-hover:text-primary transition-colors duration-200`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`${isSmall ? 'text-[10px]' : 'text-xs'} text-neutral-text-secondary line-clamp-2 mt-1`}>
            {subtitle}
          </p>
        )}
      </div>
    )

    if (href) {
      return (
        <div className="flex flex-col items-center group">
          <a href={href} className="block">
            {circleContent}
          </a>
          {titleContent}
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center group">
        {circleContent}
        {titleContent}
      </div>
    )
  }

  // Regular (non-circular) card content
  const cardContent = (
    <div
      className={`
        flex flex-col
        bg-white
        border border-neutral-border rounded-2xl shadow-sm
        hover:-translate-y-1 hover:shadow-md hover:border-primary/50
        transition-all duration-200 ease-in-out
        cursor-pointer group
        w-full h-full
        overflow-hidden
        ${className}
      `}
      style={{
        height: isSmall ? '240px' : '320px',
        maxWidth: '100%'
      }}
      onClick={onClick}
    >
      {/* Image or Icon Section - Fixed Height */}
      <div 
        className="relative w-full bg-white overflow-hidden flex-shrink-0 flex items-center justify-center transition-all duration-300"
        style={{
          height: isSmall ? '180px' : '220px',
          minHeight: isSmall ? '180px' : '220px'
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
            loading="lazy"
            unoptimized
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : icon ? (
          <div className="w-full h-full flex items-center justify-center text-secondary">
            <div className={isSmall ? 'text-3xl' : 'text-5xl'}>{icon}</div>
          </div>
        ) : (
          <div className="w-full h-full bg-neutral-bg flex items-center justify-center">
            <div className={`${isSmall ? 'text-3xl' : 'text-4xl'} text-neutral-text-secondary opacity-50`}>📦</div>
          </div>
        )}
        
        {/* Badge */}
        {badge && (
          <div className={`absolute top-2 right-2 bg-primary text-white ${isSmall ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'} font-semibold rounded-lg shadow-md z-10`}>
            {badge}
          </div>
        )}
      </div>

      {/* Content Section - Fixed Height */}
      <div 
        className={`${isSmall ? 'p-2' : 'p-4'} flex flex-col items-center text-center flex-1 justify-center bg-white transition-all duration-200`}
        style={{
          minHeight: isSmall ? '60px' : '100px'
        }}
      >
        <h3 className={`${isSmall ? 'text-sm' : 'text-base'} font-bold text-neutral-text mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-200`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`${isSmall ? 'text-[10px]' : 'text-xs'} text-neutral-text-secondary line-clamp-2`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block h-full">
        {cardContent}
      </a>
    )
  }

  return cardContent
}

export default UniversalCard

