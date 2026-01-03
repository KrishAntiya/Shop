'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BulkUploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const extension = selectedFile.name.split('.').pop()?.toLowerCase()
      if (extension !== 'csv' && extension !== 'xlsx' && extension !== 'xls') {
        setError('Please upload a CSV or Excel file')
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError('')
      setResult(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/products/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Upload failed')
        if (data.errors) {
          setResult({ errors: data.errors })
        }
        setLoading(false)
        return
      }

      setResult(data.results)
      setFile(null)
      
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (err: any) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-neutral-text mb-2">
          Bulk Product Upload
        </h1>
        <p className="font-sans text-neutral-text-secondary">
          Upload products from Marg ERP CSV or Excel files
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-text mb-2">
              Upload File (CSV or Excel)
            </label>
            <input
              id="file-input"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <p className="mt-2 text-sm text-neutral-text-secondary">
              Supported formats: CSV, XLSX, XLS. Required columns: item_code, name, mrp, price, stock, brand (optional), category (optional)
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Upload Complete!</h3>
              <div className="space-y-1 text-sm text-green-700">
                <p>Total processed: {result.total}</p>
                <p>Success: {result.success}</p>
                <p>Failed: {result.failed}</p>
                {result.createdBrands > 0 && (
                  <p>Brands created: {result.createdBrands}</p>
                )}
              </div>
              {result.errors && result.errors.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-red-700 mb-1">Errors:</p>
                  <ul className="text-xs text-red-600 space-y-1 max-h-32 overflow-y-auto">
                    {result.errors.map((err: string, idx: number) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || !file}
              className="h-12 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Upload Products'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="h-12 px-6 border border-neutral-border text-neutral-text font-semibold rounded-lg hover:bg-neutral-bg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-neutral-border">
          <h3 className="font-heading text-lg font-semibold text-neutral-text mb-4">
            File Format Guide
          </h3>
          <div className="bg-neutral-bg rounded-lg p-4">
            <p className="text-sm text-neutral-text-secondary mb-2">
              Your CSV/Excel file should contain the following columns:
            </p>
            <ul className="text-sm text-neutral-text-secondary space-y-1 list-disc list-inside">
              <li><strong>item_code</strong> (required) - Product SKU/Item Code</li>
              <li><strong>name</strong> (required) - Product Name</li>
              <li><strong>mrp</strong> (required) - Maximum Retail Price</li>
              <li><strong>price</strong> (required) - Selling Price</li>
              <li><strong>stock</strong> (optional) - Available Stock Quantity</li>
              <li><strong>brand</strong> (optional) - Brand Name (will be created if doesn't exist)</li>
              <li><strong>category</strong> (optional) - Product Category</li>
              <li><strong>description</strong> (optional) - Product Description</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

