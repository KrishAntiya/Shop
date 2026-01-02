'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: 'Krish Antiya',
    email: 'krishantiya252@gmail.com',
    phone: '6355347924',
    dateOfBirth: '2004-03-29',
    gender: 'male'
  })

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Veterinary Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '456 Pharma Avenue',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      isDefault: false
    }
  ])

  const [orders] = useState([
    {
      id: 'ORD-12345',
      date: '2024-01-15',
      items: 3,
      total: 1250,
      status: 'Delivered',
      trackingNumber: 'TRK123456789',
      carrier: 'BlueDart',
      estimatedDelivery: '2024-01-18',
      actualDelivery: '2024-01-17',
      trackingHistory: [
        { status: 'Order Placed', date: '2024-01-15', time: '10:30 AM', location: 'Mumbai Warehouse' },
        { status: 'Processing', date: '2024-01-15', time: '11:45 AM', location: 'Mumbai Warehouse' },
        { status: 'Shipped', date: '2024-01-16', time: '09:15 AM', location: 'Mumbai Warehouse' },
        { status: 'In Transit', date: '2024-01-16', time: '02:30 PM', location: 'Delhi Hub' },
        { status: 'Out for Delivery', date: '2024-01-17', time: '08:00 AM', location: 'Delhi' },
        { status: 'Delivered', date: '2024-01-17', time: '03:45 PM', location: 'Delhi, 110001' }
      ]
    },
    {
      id: 'ORD-12346',
      date: '2024-01-10',
      items: 2,
      total: 890,
      status: 'In Transit',
      trackingNumber: 'TRK987654321',
      carrier: 'DTDC',
      estimatedDelivery: '2024-01-20',
      trackingHistory: [
        { status: 'Order Placed', date: '2024-01-10', time: '02:15 PM', location: 'Mumbai Warehouse' },
        { status: 'Processing', date: '2024-01-10', time: '03:30 PM', location: 'Mumbai Warehouse' },
        { status: 'Shipped', date: '2024-01-11', time: '10:00 AM', location: 'Mumbai Warehouse' },
        { status: 'In Transit', date: '2024-01-12', time: '11:20 AM', location: 'Pune Hub' }
      ]
    },
    {
      id: 'ORD-12347',
      date: '2024-01-05',
      items: 5,
      total: 2100,
      status: 'Processing',
      trackingNumber: 'TRK456789123',
      carrier: 'FedEx',
      estimatedDelivery: '2024-01-22',
      trackingHistory: [
        { status: 'Order Placed', date: '2024-01-05', time: '09:00 AM', location: 'Mumbai Warehouse' },
        { status: 'Processing', date: '2024-01-05', time: '10:30 AM', location: 'Mumbai Warehouse' }
      ]
    }
  ])

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic here
    console.log('Profile saved:', profileData)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'In Transit':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Out for Delivery':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownloadInvoice = (orderId: string) => {
    // In a real app, this would generate/download a PDF invoice
    console.log('Downloading invoice for:', orderId)
    // Simulate download
    alert(`Invoice for ${orderId} will be downloaded`)
  }

  const getTrackingStatusIndex = (status: string) => {
    const statusOrder = ['Order Placed', 'Processing', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered']
    return statusOrder.indexOf(status)
  }

  const isTrackingStepCompleted = (trackStatus: string, orderStatus: string) => {
    const statusOrder = ['Order Placed', 'Processing', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered']
    const trackIndex = statusOrder.indexOf(trackStatus)
    const orderIndex = statusOrder.indexOf(orderStatus)
    return trackIndex <= orderIndex
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb Header Section */}
      <div className="bg-primary py-6 md:py-8">
        <div className="max-w-container mx-auto px-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase">ACCOUNTS</h1>
            <nav className="text-sm md:text-base text-gray-900 uppercase">
              <a href="/" className="hover:text-white transition-colors">HOME</a>
              <span className="mx-2">/</span>
              <span className="text-gray-800">MY ACCOUNT</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="py-8 sm:py-10 md:py-12">
        <div className="max-w-container mx-auto px-4">
          <div className="max-w-7xl mx-auto">

            {/* Two Column Layout: Sidebar + Content */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Sidebar Navigation */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-primary-bg rounded-t-lg shadow-sm overflow-hidden">
                  <nav className="flex flex-col">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`px-6 py-4 text-left font-medium text-sm transition-colors ${
                        activeTab === 'profile'
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('addresses')}
                      className={`px-6 py-4 text-left font-medium text-sm transition-colors ${
                        activeTab === 'addresses'
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      Addresses
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`px-6 py-4 text-left font-medium text-sm transition-colors ${
                        activeTab === 'orders'
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`px-6 py-4 text-left font-medium text-sm transition-colors ${
                        activeTab === 'settings'
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      Settings
                    </button>
                  </nav>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex-1 min-w-0">

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-primary">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium min-h-[44px] w-full sm:w-auto"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium min-h-[44px]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium min-h-[44px]"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl font-bold">
                        {profileData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
                      <p className="text-gray-600">{profileData.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profileData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profileData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profileData.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={profileData.dateOfBirth}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                          {new Date(profileData.dateOfBirth).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={profileData.gender}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 capitalize">{profileData.gender}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">Saved Addresses</h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                    + Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-primary-bg text-primary text-sm font-medium rounded">
                            {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="ml-2 inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="text-primary hover:text-primary-dark text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 text-gray-700">
                        <p className="font-medium">{address.name}</p>
                        <p>{address.phone}</p>
                        <p>{address.address}</p>
                        <p>{address.city}, {address.state} - {address.pincode}</p>
                      </div>
                      {!address.isDefault && (
                        <button className="mt-4 text-sm text-primary hover:text-primary-dark font-medium">
                          Set as Default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">Order History & Tracking</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                          <React.Fragment key={order.id}>
                            <tr className="hover:bg-gray-50">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                              <td className="px-4 py-4 text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-600">{order.items} items</td>
                              <td className="px-4 py-4 text-sm font-semibold text-gray-900">₹{order.total}</td>
                              <td className="px-4 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                                    className="text-primary hover:text-primary-dark text-sm font-medium"
                                  >
                                    {selectedOrder === order.id ? 'Hide Details' : 'Track Order'}
                                  </button>
                                  <button
                                    onClick={() => handleDownloadInvoice(order.id)}
                                    className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Invoice
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {selectedOrder === order.id && (
                              <tr>
                                <td colSpan={6} className="px-4 py-6 bg-gray-50">
                                  <div className="space-y-6">
                                    {/* Tracking Information */}
                                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                        <div>
                                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tracking Information</h3>
                                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div>
                                              <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                                            </div>
                                            <div>
                                              <span className="font-medium">Carrier:</span> {order.carrier}
                                            </div>
                                            {order.estimatedDelivery && (
                                              <div>
                                                <span className="font-medium">Est. Delivery:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <button
                                          onClick={() => handleDownloadInvoice(order.id)}
                                          className="mt-4 md:mt-0 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center gap-2"
                                        >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                          Download Invoice (PDF)
                                        </button>
                                      </div>

                                      {/* Real-time Tracking Timeline */}
                                      <div className="relative">
                                        <h4 className="text-md font-semibold text-gray-900 mb-4">Delivery History</h4>
                                        <div className="space-y-4">
                                          {order.trackingHistory.map((track, index) => {
                                            const isLast = index === order.trackingHistory.length - 1
                                            const isCompleted = isTrackingStepCompleted(track.status, order.status)
                                            return (
                                              <div key={index} className="flex gap-4">
                                                {/* Timeline Line */}
                                                <div className="flex flex-col items-center">
                                                  <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-primary' : 'bg-gray-300'} border-2 border-white shadow-sm z-10`}></div>
                                                  {!isLast && (
                                                    <div className={`w-0.5 h-full min-h-[60px] ${isCompleted ? 'bg-primary' : 'bg-gray-300'}`}></div>
                                                  )}
                                                </div>
                                                {/* Timeline Content */}
                                                <div className="flex-1 pb-6">
                                                  <div className={`${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    <p className="font-semibold text-sm">{track.status}</p>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                      {new Date(track.date).toLocaleDateString()} at {track.time}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{track.location}</p>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates about your orders and offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-sm text-gray-600">Receive order updates via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                    <button className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

