'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Variant {
  id: number
  name: string
  weight?: string | null
  unit?: string | null
  price: number
  mrp: number
  stock: number
  is_default?: boolean
}

interface ProductCardProps {
  image: string
  name: string
  category: string
  price: number
  originalPrice?: number
  discount?: number
  rating?: number
  reviews?: number
  href: string
  variants?: Variant[]
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  category,
  price,
  originalPrice,
  discount,
  rating = 4.8,
  reviews = 0,
  href,
  variants = []
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants.find(v => v.is_default) || variants[0] || null
  )
  
  // Calculate current price and discount based on selected variant
  const currentPrice = selectedVariant ? selectedVariant.price : price
  const currentMrp = selectedVariant ? selectedVariant.mrp : (originalPrice || price)
  const currentDiscount = currentMrp > currentPrice 
    ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) 
    : (discount || 0)
  const hasVariants = variants.length > 1

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-border overflow-hidden hover:shadow-lg transition-all duration-200 group flex flex-col list-none" style={{ counterReset: 'none' }}>
      {/* Image Container with Badge */}
      <div className="relative bg-white aspect-[4/3] flex items-center justify-center p-2">
        {currentDiscount > 0 ? (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
            -{currentDiscount}%
          </div>
        ) : null}
        <Link href={href} className="w-full h-full flex items-center justify-center relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col h-full">
        <div className="space-y-1.5 flex-1">
          {/* Category Pill */}
          <span className="inline-block px-2 py-0.5 bg-neutral-bg text-neutral-text-secondary text-xs font-medium uppercase tracking-wide rounded-full w-fit">
            {category}
          </span>

          {/* Variant Selector */}
          {hasVariants && (
            <div className="mb-1.5">
              <label className="block text-xs font-semibold text-neutral-text mb-1.5 uppercase tracking-wide">
                Size
              </label>
              <div className="relative">
                <select
                  value={selectedVariant?.id || ''}
                  onChange={(e) => {
                    const variant = variants.find(v => v.id === parseInt(e.target.value))
                    if (variant) setSelectedVariant(variant)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full text-sm px-3 py-2 pr-8 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white font-medium text-neutral-text hover:border-primary/60 transition-all cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px 12px',
                  }}
                >
                  {variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-bold text-neutral-text">{formatPrice(currentPrice)}</span>
            {currentMrp > currentPrice && (
              <>
                <span className="text-xs text-neutral-text-secondary line-through">
                  {formatPrice(currentMrp)}
                </span>
                {currentDiscount > 0 ? (
                  <span className="text-xs font-semibold text-secondary">
                    ({currentDiscount}% OFF)
                  </span>
                ) : null}
              </>
            )}
          </div>

          {/* Product Name */}
          <Link href={href}>
            <h3 className="text-sm font-semibold text-neutral-text hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem] leading-tight">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          {rating > 0 && reviews > 0 && (
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-neutral-text">
                {rating.toFixed(1)} ({reviews.toLocaleString()} {reviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button and Wishlist */}
        <div className="flex items-center gap-2 pt-2 mt-auto">
          <Link
            href={href}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-semibold py-1.5 px-3 rounded-lg text-center text-sm transition-colors duration-200 shadow-sm"
          >
            Add to Cart
          </Link>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="p-1.5 border border-neutral-border hover:border-neutral-text-secondary hover:text-neutral-text-secondary rounded-lg transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <svg
              className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

