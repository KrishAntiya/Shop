'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Brand {
  id: number
  name: string
  slug: string
  logo: string | null
  created_at: string
  updated_at: string
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [formData, setFormData] = useState({ name: '', logo: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      const res = await fetch('/api/admin/brands')
      const data = await res.json()
      if (data.success) {
        setBrands(data.brands)
      }
    } catch (err) {
      console.error('Failed to fetch brands:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (brand?: Brand) => {
    if (brand) {
      setEditingBrand(brand)
      setFormData({ name: brand.name, logo: brand.logo || '' })
    } else {
      setEditingBrand(null)
      setFormData({ name: '', logo: '' })
    }
    setError('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingBrand(null)
    setFormData({ name: '', logo: '' })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const url = editingBrand
        ? `/api/admin/brands/${editingBrand.id}`
        : '/api/admin/brands'
      const method = editingBrand ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to save brand')
        return
      }

      handleCloseModal()
      fetchBrands()
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this brand?')) return

    try {
      const res = await fetch(`/api/admin/brands/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Failed to delete brand')
        return
      }

      fetchBrands()
    } catch (err) {
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-neutral-text mb-2">
            Brand Management
          </h1>
          <p className="font-sans text-neutral-text-secondary">
            Manage product brands in your inventory
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="h-12 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          Add New Brand
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-neutral-text-secondary">Loading...</div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-bg border-b border-neutral-border">
                <tr>
                  <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                    Logo
                  </th>
                  <th className="px-6 py-4 text-right font-heading text-sm font-semibold text-neutral-text">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-border">
                {brands.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-neutral-text-secondary">
                      No brands found. Add your first brand to get started.
                    </td>
                  </tr>
                ) : (
                  brands.map((brand) => (
                    <tr key={brand.id} className="hover:bg-neutral-bg/50">
                      <td className="px-6 py-4 font-sans font-medium text-neutral-text">
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 font-sans text-sm text-neutral-text-secondary">
                        {brand.slug}
                      </td>
                      <td className="px-6 py-4">
                        {brand.logo ? (
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <span className="text-neutral-text-secondary text-sm">No logo</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(brand)}
                            className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(brand.id)}
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
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="font-heading text-xl font-semibold text-neutral-text mb-4">
              {editingBrand ? 'Edit Brand' : 'Add New Brand'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-text mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-text mb-2">
                  Logo URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-neutral-border text-neutral-text font-medium rounded-lg hover:bg-neutral-bg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {editingBrand ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

