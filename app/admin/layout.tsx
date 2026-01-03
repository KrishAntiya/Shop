'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AdminUser {
  id: number
  email: string
  role: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    // Check authentication with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

    fetch('/api/admin/auth/me', {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId)
        if (data.user) {
          setUser(data.user)
        } else {
          router.push('/admin/login')
        }
        setLoading(false)
      })
      .catch((error) => {
        clearTimeout(timeoutId)
        console.error('Auth check failed:', error)
        router.push('/admin/login')
        setLoading(false)
      })
  }, [pathname, router])

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-bg flex items-center justify-center">
        <div className="text-neutral-text">Loading...</div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/brands', label: 'Brands', icon: '🏷️' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/upload', label: 'Bulk Upload', icon: '⬆️' },
    { href: '/admin/sync', label: 'Stock Sync', icon: '🔄' },
    { href: '/admin/orders', label: 'Orders', icon: '📋' },
  ]

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-neutral-border shadow-sm">
        <div className="p-6 border-b border-neutral-border">
          <h1 className="font-heading text-xl font-semibold text-neutral-text">
            SwastikPharma
          </h1>
          <p className="text-xs text-neutral-text-secondary mt-1">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-neutral-text hover:bg-neutral-bg'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-border">
          <div className="mb-3 px-4 py-2 text-sm">
            <div className="font-medium text-neutral-text">{user?.email}</div>
            <div className="text-xs text-neutral-text-secondary">{user?.role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

