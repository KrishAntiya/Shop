'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  stock: number
  category: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Vetmedin 5mg Tablets',
      image: '/api/placeholder/120/120',
      price: 1250,
      quantity: 2,
      stock: 50,
      category: 'Cardiac Care'
    },
    {
      id: '2',
      name: 'Royal Canin Dog Food 15kg',
      image: '/api/placeholder/120/120',
      price: 2890,
      quantity: 1,
      stock: 30,
      category: 'Prescription Diets'
    },
    {
      id: '3',
      name: 'Drontal Plus Dewormer',
      image: '/api/placeholder/120/120',
      price: 450,
      quantity: 3,
      stock: 100,
      category: 'Deworming'
    }
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 2000 ? 0 : 100
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping + tax

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb Header Section */}
      <div className="bg-primary py-6 md:py-8">
        <div className="max-w-container mx-auto px-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase">SHOPPING CART</h1>
            <nav className="text-sm md:text-base text-gray-900 uppercase">
              <a href="/" className="hover:text-white transition-colors">HOME</a>
              <span className="mx-2">/</span>
              <span className="text-gray-800">CART</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="py-8 sm:py-10 md:py-12">
        <div className="max-w-container mx-auto px-4">
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3 md:space-y-4">
                {/* Cart Header */}
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Cart Items ({cartItems.length})
                    </h2>
                    <button className="text-sm text-primary hover:text-primary-dark font-medium">
                      Clear Cart
                    </button>
                  </div>
                </div>

                {/* Cart Items List */}
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Image</span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                            <p className="text-lg font-bold text-primary">₹{item.price.toLocaleString()}</p>
                            <p className="text-xs text-gray-500 mt-1">Stock: {item.stock} available</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                disabled={item.quantity <= 1}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-900 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                disabled={item.quantity >= item.stock}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                              aria-label="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Item Total</span>
                            <span className="text-lg font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </a>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:sticky lg:top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (GST 18%)</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    {subtotal < 2000 && (
                      <div className="text-sm text-primary bg-primary-bg p-3 rounded-lg">
                        Add ₹{(2000 - subtotal).toLocaleString()} more for free shipping!
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold text-base sm:text-lg mb-4 min-h-[48px]">
                    Proceed to Checkout
                  </button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure Checkout</span>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">We Accept:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded">UPI</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded">Cards</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded">Net Banking</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded">COD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

