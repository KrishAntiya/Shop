'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface Product {
  id: number
  item_code: string
  name: string
  brand_name: string | null
  category: string | null
  mrp: number
  price: number
  stock: number
  status: string
  image: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchBrands()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [page, search, brandFilter, statusFilter])

  const fetchBrands = async () => {
    try {
      const res = await fetch('/api/admin/brands')
      const data = await res.json()
      if (data.success) {
        setBrands(data.brands)
      }
    } catch (err) {
      console.error('Failed to fetch brands:', err)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
      })
      if (search) params.append('search', search)
      if (brandFilter) params.append('brand_id', brandFilter)
      if (statusFilter) params.append('status', statusFilter)

      const res = await fetch(`/api/admin/products?${params}`)
      const data = await res.json()
      if (data.success) {
        setProducts(data.products)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Failed to delete product')
        return
      }

      fetchProducts()
    } catch (err) {
      alert('An error occurred. Please try again.')
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const product = products.find((p) => p.id === id)
      if (!product) return

      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          status: newStatus,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Failed to update product')
        return
      }

      fetchProducts()
    } catch (err) {
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-neutral-text mb-2">
            Product Management
          </h1>
          <p className="font-sans text-neutral-text-secondary">
            Manage your product inventory
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="h-12 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center"
        >
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={brandFilter}
              onChange={(e) => {
                setBrandFilter(e.target.value)
                setPage(1)
              }}
              className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPage(1)
              }}
              className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <Link
              href="/admin/upload"
              className="block w-full text-center px-4 py-2 border border-secondary text-secondary font-medium rounded-lg hover:bg-secondary/10 transition-colors"
            >
              Bulk Upload
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-neutral-text-secondary">Loading...</div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-neutral-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-bg border-b border-neutral-border">
                  <tr>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Item Code
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Brand
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right font-heading text-sm font-semibold text-neutral-text">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-neutral-text-secondary">
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-neutral-bg/50">
                        <td className="px-6 py-4 font-sans text-sm font-mono text-neutral-text">
                          {product.item_code}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-sans font-medium text-neutral-text">
                            {product.name}
                          </div>
                          {product.category && (
                            <div className="text-xs text-neutral-text-secondary">
                              {product.category}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-sans text-sm text-neutral-text-secondary">
                          {product.brand_name || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-sans font-semibold text-neutral-text">
                            {formatCurrency(product.price)}
                          </div>
                          {product.mrp > product.price && (
                            <div className="text-xs text-neutral-text-secondary line-through">
                              {formatCurrency(product.mrp)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-sans text-sm font-medium ${
                              product.stock < 10
                                ? 'text-orange-600'
                                : product.stock === 0
                                ? 'text-red-600'
                                : 'text-neutral-text'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={product.status}
                            onChange={(e) => handleStatusChange(product.id, e.target.value)}
                            className="text-sm border border-neutral-border rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="out_of_stock">Out of Stock</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-neutral-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-bg"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-neutral-text">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-neutral-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-bg"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

