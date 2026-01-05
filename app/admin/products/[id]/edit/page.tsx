'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: number
  item_code: string
  name: string
  brand_id: number | null
  category: string | null
  animal: string | null
  mrp: number
  price: number
  stock: number
  description: string | null
  image: string | null
  status: string
  brand_name: string | null
}

interface Brand {
  id: number
  name: string
}

interface Variant {
  id: number
  product_id: number
  name: string
  weight: string | null
  unit: string | null
  price: number
  mrp: number
  stock: number
  sku: string | null
  is_default: boolean
  status: string
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params?.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [brands, setBrands] = useState<Brand[]>([])
  const [variants, setVariants] = useState<Variant[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null)
  const [variantForm, setVariantForm] = useState({
    name: '',
    weight: '',
    unit: '',
    price: '',
    mrp: '',
    stock: '',
    sku: '',
    is_default: false,
  })

  const [formData, setFormData] = useState({
    item_code: '',
    name: '',
    brand_id: '',
    category: '',
    animal: '',
    mrp: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    status: 'active',
  })

  useEffect(() => {
    if (productId) {
      fetchProduct()
      fetchBrands()
      fetchVariants()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/admin/products/${productId}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to load product')
        setLoading(false)
        return
      }

      if (data.success && data.product) {
        const p = data.product
        setProduct(p)
        setFormData({
          item_code: p.item_code || '',
          name: p.name || '',
          brand_id: p.brand_id ? String(p.brand_id) : '',
          category: p.category || '',
          animal: p.animal || '',
          mrp: String(p.mrp || ''),
          price: String(p.price || ''),
          stock: String(p.stock || ''),
          description: p.description || '',
          image: p.image || '',
          status: p.status || 'active',
        })
      }
    } catch (err) {
      setError('An error occurred while loading the product')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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

  const fetchVariants = async () => {
    try {
      const res = await fetch(`/api/admin/products/${productId}/variants`)
      const data = await res.json()
      if (data.success) {
        setVariants(data.variants)
      }
    } catch (err) {
      console.error('Failed to fetch variants:', err)
    }
  }

  const handleOpenVariantModal = (variant?: Variant) => {
    if (variant) {
      setEditingVariant(variant)
      setVariantForm({
        name: variant.name || '',
        weight: variant.weight || '',
        unit: variant.unit || '',
        price: String(variant.price || ''),
        mrp: String(variant.mrp || ''),
        stock: String(variant.stock || ''),
        sku: variant.sku || '',
        is_default: variant.is_default || false,
      })
    } else {
      setEditingVariant(null)
      setVariantForm({
        name: '',
        weight: '',
        unit: '',
        price: '',
        mrp: '',
        stock: '',
        sku: '',
        is_default: false,
      })
    }
    setShowVariantModal(true)
  }

  const handleCloseVariantModal = () => {
    setShowVariantModal(false)
    setEditingVariant(null)
    setVariantForm({
      name: '',
      weight: '',
      unit: '',
      price: '',
      mrp: '',
      stock: '',
      sku: '',
      is_default: false,
    })
  }

  const handleSaveVariant = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const url = editingVariant
        ? `/api/admin/products/${productId}/variants/${editingVariant.id}`
        : `/api/admin/products/${productId}/variants`
      const method = editingVariant ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: variantForm.name.trim(),
          weight: variantForm.weight.trim() || null,
          unit: variantForm.unit.trim() || null,
          price: parseFloat(variantForm.price),
          mrp: parseFloat(variantForm.mrp),
          stock: parseInt(variantForm.stock) || 0,
          sku: variantForm.sku.trim() || null,
          is_default: variantForm.is_default,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to save variant')
        return
      }

      handleCloseVariantModal()
      fetchVariants()
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleDeleteVariant = async (variantId: number) => {
    if (!confirm('Are you sure you want to delete this variant?')) return

    try {
      const res = await fetch(`/api/admin/products/${productId}/variants/${variantId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Failed to delete variant')
        return
      }

      fetchVariants()
    } catch (err) {
      alert('An error occurred. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const payload = {
        item_code: formData.item_code.trim(),
        name: formData.name.trim(),
        brand_id: formData.brand_id ? parseInt(formData.brand_id) : null,
        category: formData.category.trim() || null,
        animal: formData.animal || null,
        mrp: parseFloat(formData.mrp),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        description: formData.description.trim() || null,
        image: formData.image.trim() || null,
        status: formData.status,
      }

      // Validate
      if (!payload.item_code || !payload.name || !payload.mrp || !payload.price) {
        setError('Item code, name, MRP, and price are required')
        setSaving(false)
        return
      }

      if (isNaN(payload.mrp) || isNaN(payload.price)) {
        setError('MRP and price must be valid numbers')
        setSaving(false)
        return
      }

      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to update product')
        setSaving(false)
        return
      }

      router.push('/admin/products')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-neutral-text-secondary">Loading product...</div>
      </div>
    )
  }

  if (error && !product) {
    return (
      <div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
        <Link
          href="/admin/products"
          className="inline-block px-4 py-2 border border-neutral-border rounded-lg hover:bg-neutral-bg"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-neutral-text mb-2">
          Edit Product
        </h1>
        <p className="font-sans text-neutral-text-secondary">
          Update product information
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                Item Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.item_code}
                onChange={(e) => setFormData({ ...formData, item_code: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                Brand
              </label>
              <select
                value={formData.brand_id}
                onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">No Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Medicines, Supplements"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                Animal
              </label>
              <select
                value={formData.animal}
                onChange={(e) => setFormData({ ...formData, animal: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Animal</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Large Animals">Large Animals</option>
                <option value="Sheep & Goat">Sheep & Goat</option>
                <option value="Poultry">Poultry</option>
                <option value="Horse">Horse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                MRP (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                Selling Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-text mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-text mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-text mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Product description..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="h-12 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href="/admin/products"
              className="h-12 px-6 border border-neutral-border text-neutral-text font-semibold rounded-lg hover:bg-neutral-bg transition-colors inline-flex items-center"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Variants Section */}
        <div className="mt-8 pt-8 border-t border-neutral-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-heading font-semibold text-neutral-text mb-1">
                Product Variants (Packaging Sizes)
              </h2>
              <p className="text-sm text-neutral-text-secondary">
                Add different packaging sizes (e.g., 250mg, 500mg, 1kg, 100ml, 500ml, 1L)
              </p>
            </div>
            <button
              onClick={() => handleOpenVariantModal()}
              className="h-10 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors text-sm"
            >
              Add Variant
            </button>
          </div>

          {variants.length === 0 ? (
            <div className="bg-neutral-bg rounded-lg p-8 text-center">
              <p className="text-neutral-text-secondary mb-4">No variants added yet.</p>
              <button
                onClick={() => handleOpenVariantModal()}
                className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors text-sm"
              >
                Add First Variant
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-bg border-b border-neutral-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text">MRP</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text">Default</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-text">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border">
                  {variants.map((variant) => (
                    <tr key={variant.id} className="hover:bg-neutral-bg/50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-neutral-text">
                          {variant.name}
                          {variant.weight && variant.unit && (
                            <span className="text-xs text-neutral-text-secondary ml-1">
                              ({variant.weight}{variant.unit})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-text">₹{Number(variant.price).toFixed(2)}</td>
                      <td className="px-4 py-3 text-neutral-text-secondary">₹{Number(variant.mrp).toFixed(2)}</td>
                      <td className="px-4 py-3 text-neutral-text">{variant.stock}</td>
                      <td className="px-4 py-3">
                        {variant.is_default ? (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                            Default
                          </span>
                        ) : (
                          <span className="text-neutral-text-secondary text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenVariantModal(variant)}
                            className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteVariant(variant.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Variant Modal */}
      {showVariantModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-border">
              <h3 className="text-xl font-heading font-semibold text-neutral-text">
                {editingVariant ? 'Edit Variant' : 'Add New Variant'}
              </h3>
            </div>
            <form onSubmit={handleSaveVariant} className="p-6">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-1.5">
                    Variant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={variantForm.name}
                    onChange={(e) => setVariantForm({ ...variantForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 500mg, 1kg, 500ml, 1L"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-1.5">
                    Weight/Volume
                  </label>
                  <input
                    type="text"
                    value={variantForm.weight}
                    onChange={(e) => setVariantForm({ ...variantForm, weight: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 500, 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-1.5">
                    Unit
                  </label>
                  <select
                    value={variantForm.unit}
                    onChange={(e) => setVariantForm({ ...variantForm, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Unit</option>
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="L">L</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-1.5">
                    SKU (Optional)
                  </label>
                  <input
                    type="text"
                    value={variantForm.sku}
                    onChange={(e) => setVariantForm({ ...variantForm, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Variant SKU"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-1.5">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={variantForm.price}
                    onChange={(e) => setVariantForm({ ...variantForm, price: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-1.5">
                    MRP (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={variantForm.mrp}
                    onChange={(e) => setVariantForm({ ...variantForm, mrp: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-1.5">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={variantForm.stock}
                    onChange={(e) => setVariantForm({ ...variantForm, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={variantForm.is_default}
                      onChange={(e) => setVariantForm({ ...variantForm, is_default: e.target.checked })}
                      className="w-4 h-4 text-primary border-neutral-border rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-neutral-text">Set as default variant</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-border">
                <button
                  type="submit"
                  className="flex-1 h-10 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {editingVariant ? 'Update Variant' : 'Add Variant'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseVariantModal}
                  className="h-10 px-4 border border-neutral-border text-neutral-text font-semibold rounded-lg hover:bg-neutral-bg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

