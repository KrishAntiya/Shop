'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalProducts: number
  totalBrands: number
  totalOrders: number
  lowStockProducts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalBrands: 0,
    totalOrders: 0,
    lowStockProducts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: '📦',
      href: '/admin/products',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Brands',
      value: stats.totalBrands,
      icon: '🏷️',
      href: '/admin/brands',
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '📋',
      href: '/admin/orders',
      color: 'bg-purple-500',
    },
    {
      title: 'Low Stock',
      value: stats.lowStockProducts,
      icon: '⚠️',
      href: '/admin/products?filter=low_stock',
      color: 'bg-orange-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-neutral-text mb-2">
          Dashboard
        </h1>
        <p className="font-sans text-neutral-text-secondary">
          Overview of your veterinary pharmacy operations
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-neutral-text-secondary">Loading...</div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => (
              <Link
                key={stat.title}
                href={stat.href}
                className="bg-white rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans text-sm text-neutral-text-secondary mb-1">
                      {stat.title}
                    </p>
                    <p className="font-heading text-3xl font-semibold text-neutral-text">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-6">
            <h2 className="font-heading text-xl font-semibold text-neutral-text mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/products/new"
                className="p-4 border border-neutral-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold text-neutral-text mb-1">➕ Add New Product</div>
                <div className="text-sm text-neutral-text-secondary">Manually add a single product</div>
              </Link>
              <Link
                href="/admin/upload"
                className="p-4 border border-neutral-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold text-neutral-text mb-1">⬆️ Bulk Upload</div>
                <div className="text-sm text-neutral-text-secondary">Upload products from Marg ERP</div>
              </Link>
              <Link
                href="/admin/sync"
                className="p-4 border border-neutral-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold text-neutral-text mb-1">🔄 Stock Sync</div>
                <div className="text-sm text-neutral-text-secondary">Sync stock and prices</div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

