'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

interface Brand {
  id: number
  name: string
  slug: string
  logo: string | null
}

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

interface Product {
  id: number
  name: string
  image: string
  category: string
  price: number
  mrp: number
  discount: number
  rating: number
  reviews: number
  href: string
  variants?: Variant[]
}

export default function BrandProductsPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [brand, setBrand] = useState<Brand | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('created_at')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    if (slug) {
      fetchBrand()
      fetchProducts()
    }
  }, [slug])

  // Apply filters when they change
  useEffect(() => {
    applyFilters()
  }, [selectedCategory, sortBy, searchQuery, allProducts])

  const fetchBrand = async () => {
    try {
      const res = await fetch(`/api/brands/${slug}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Brand not found')
        setLoading(false)
        return
      }

      if (data.success && data.brand) {
        setBrand(data.brand)
      }
    } catch (err) {
      setError('Failed to load brand')
      console.error(err)
    }
  }

  const fetchProducts = async () => {
    try {
      // First get brand ID
      const brandRes = await fetch(`/api/brands/${slug}`)
      const brandData = await brandRes.json()

      if (!brandRes.ok || !brandData.success) {
        setLoading(false)
        return
      }

      // Then fetch products by brand
      const productsRes = await fetch(`/api/products?brand_id=${brandData.brand.id}&limit=100`)
      const productsData = await productsRes.json()

      if (productsData.success && productsData.products) {
        setAllProducts(productsData.products)
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(productsData.products.map((p: Product) => p.category).filter(Boolean))
        ) as string[]
        setCategories(uniqueCategories)
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...allProducts]

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.category && p.category.toLowerCase().includes(query))
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'created_at':
      default:
        // Already sorted by created_at from API
        break
    }

    setProducts(filtered)
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setSortBy('created_at')
    setSearchQuery('')
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !brand) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-text mb-4">Brand Not Found</h1>
            <p className="text-neutral-text-secondary mb-6">{error || 'The brand you are looking for does not exist.'}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-container mx-auto px-4">
          {/* Brand Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 pb-6 border-b border-neutral-border">
            {brand.logo && (
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 bg-white rounded-lg border border-neutral-border p-4 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-neutral-text mb-1">
                {brand.name}
              </h1>
              <p className="text-neutral-text-secondary">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
                {allProducts.length !== products.length && (
                  <span className="text-sm"> (filtered from {allProducts.length})</span>
                )}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-neutral-bg rounded-xl border border-neutral-border p-3 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-text mb-1.5">
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-text mb-1.5">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-neutral-text mb-1.5">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="created_at">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(selectedCategory || searchQuery || sortBy !== 'created_at') && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-text-secondary text-lg mb-4">
                No products available for this brand at the moment.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Browse Other Brands
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  category={product.category || 'Uncategorized'}
                  price={product.price}
                  originalPrice={product.mrp > product.price ? product.mrp : undefined}
                  discount={product.discount}
                  rating={product.rating}
                  reviews={product.reviews}
                  href={product.href}
                  variants={product.variants || []}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

