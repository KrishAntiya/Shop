'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  total_amount: number
  status: string
  payment_status: string
  created_at: string
  item_count: number
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [page, statusFilter])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
      })
      if (statusFilter) params.append('status', statusFilter)

      const res = await fetch(`/api/admin/orders?${params}`)
      const data = await res.json()
      if (data.success) {
        setOrders(data.orders)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-purple-100 text-purple-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-neutral-text mb-2">
          Orders Management
        </h1>
        <p className="font-sans text-neutral-text-secondary">
          View and manage customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
                      Order Number
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left font-heading text-sm font-semibold text-neutral-text">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right font-heading text-sm font-semibold text-neutral-text">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-neutral-text-secondary">
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-bg/50">
                        <td className="px-6 py-4 font-sans font-medium text-neutral-text">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-sans text-neutral-text">{order.customer_name}</div>
                          <div className="text-sm text-neutral-text-secondary">{order.customer_email}</div>
                        </td>
                        <td className="px-6 py-4 font-sans text-sm text-neutral-text">
                          {order.item_count} items
                        </td>
                        <td className="px-6 py-4 font-sans font-semibold text-neutral-text">
                          {formatCurrency(order.total_amount)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                            {order.payment_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-sans text-sm text-neutral-text-secondary">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            View
                          </Link>
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

