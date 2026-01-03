'use client'

import { useState } from 'react'

export default function StockSyncPage() {
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

      const res = await fetch('/api/admin/products/sync', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Sync failed')
        if (data.results) {
          setResult(data.results)
        }
        setLoading(false)
        return
      }

      setResult(data.results)
      setFile(null)
      
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
          Stock & Price Sync
        </h1>
        <p className="font-sans text-neutral-text-secondary">
          Update stock and prices from Marg ERP (only updates existing products)
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-text mb-2">
              Upload Sync File (CSV or Excel)
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
              This will update only stock and price fields. Products are matched by item_code.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Sync Complete!</h3>
              <div className="space-y-1 text-sm text-green-700">
                <p>Total rows: {result.total}</p>
                <p>Updated: {result.updated}</p>
                <p>Not found: {result.notFound}</p>
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
              className="h-12 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Syncing...' : 'Sync Stock & Prices'}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-neutral-border">
          <h3 className="font-heading text-lg font-semibold text-neutral-text mb-4">
            Important Notes
          </h3>
          <div className="bg-neutral-bg rounded-lg p-4 space-y-2 text-sm text-neutral-text-secondary">
            <p>• Products are matched using <strong>item_code</strong></p>
            <p>• Only <strong>price</strong> and <strong>stock</strong> fields are updated</p>
            <p>• Product images, descriptions, and other details remain unchanged</p>
            <p>• Products not found in the system will be skipped</p>
          </div>
        </div>
      </div>
    </div>
  )
}

