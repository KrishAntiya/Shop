import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ShippingPolicy = () => {
  return (
    <main className="min-h-screen bg-neutral-bg">
      <Header />
      <div className="py-8 sm:py-12 md:py-16">
        <div className="max-w-container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8">Shipping Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-700 leading-relaxed">
                At SwastikPharma, we understand the importance of timely delivery when it comes to veterinary medicines 
                and animal healthcare products. We are committed to delivering your orders safely and promptly across India, 
                including rural areas. This policy outlines our shipping procedures, timelines, and special handling requirements.
              </p>
            </section>

            {/* Shipping Areas */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Shipping Areas</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We ship to all locations across India, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>All major cities and metros</li>
                  <li>Tier 2 and Tier 3 cities</li>
                  <li>Rural areas and villages</li>
                  <li>Remote locations (subject to carrier availability)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Please note that delivery times may vary for remote locations. For international shipping, please contact our customer support team.
                </p>
              </div>
            </section>

            {/* Order Processing Time */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Order Processing Time</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  All orders are processed within <strong>1-2 business days</strong> from the date of order confirmation. 
                  Processing time may vary based on:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Product availability</li>
                  <li>Prescription verification (for prescription medicines)</li>
                  <li>Payment confirmation</li>
                  <li>Order value and complexity</li>
                </ul>
                <div className="bg-primary-bg rounded-lg p-4 mt-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Same-Day Dispatch:</strong> Orders placed before 12:00 PM IST on weekdays are processed 
                    the same day (subject to product availability and payment confirmation).
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery Timeframes */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Delivery Timeframes</h2>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-neutral-border">
                    <thead>
                      <tr className="bg-primary-bg">
                        <th className="border border-neutral-border p-3 text-left font-semibold text-neutral-text">Location Type</th>
                        <th className="border border-neutral-border p-3 text-left font-semibold text-neutral-text">Estimated Delivery Time</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="border border-neutral-border p-3">Metro Cities (Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune)</td>
                        <td className="border border-neutral-border p-3">2-4 business days</td>
                      </tr>
                      <tr className="bg-neutral-bg">
                        <td className="border border-neutral-border p-3">Tier 1 Cities</td>
                        <td className="border border-neutral-border p-3">3-5 business days</td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-border p-3">Tier 2 & Tier 3 Cities</td>
                        <td className="border border-neutral-border p-3">4-7 business days</td>
                      </tr>
                      <tr className="bg-neutral-bg">
                        <td className="border border-neutral-border p-3">Rural Areas & Remote Locations</td>
                        <td className="border border-neutral-border p-3">5-10 business days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 italic">
                  *Delivery times are estimates and may vary due to weather conditions, carrier delays, or other unforeseen circumstances. 
                  Business days exclude Sundays and public holidays.
                </p>
              </div>
            </section>

            {/* Shipping Charges */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Shipping Charges</h2>
              <div className="space-y-4">
                <div className="bg-primary-bg rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-neutral-text mb-3">Free Shipping</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Orders above <strong>₹999</strong> qualify for free standard shipping</li>
                    <li>Applicable to all locations across India</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-3">Standard Shipping Charges</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Metro & Tier 1 Cities: <strong>₹49</strong> for orders below ₹999</li>
                    <li>Tier 2 & Tier 3 Cities: <strong>₹79</strong> for orders below ₹999</li>
                    <li>Rural Areas: <strong>₹99</strong> for orders below ₹999</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-3">Express Shipping (Optional)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    For urgent orders, express shipping is available at an additional charge:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Metro Cities: <strong>₹149</strong> (1-2 business days)</li>
                    <li>Other Cities: <strong>₹199</strong> (2-3 business days)</li>
                    <li>Subject to product availability and carrier service</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Special Handling */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Special Handling for Veterinary Products</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Temperature-Sensitive Products</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Vaccines and certain antibiotics require cold chain storage and transportation:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Products are packed with ice packs or cold gel packs</li>
                    <li>Insulated packaging is used to maintain temperature (2-8°C)</li>
                    <li>Additional handling charges may apply</li>
                    <li>Express shipping recommended for such products</li>
                    <li>Please check product temperature upon delivery</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Prescription Medicines</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Prescription medicines are handled with extra care:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Original prescription is verified before dispatch</li>
                    <li>Secure packaging to prevent tampering</li>
                    <li>Prescription copy included in shipment (if required)</li>
                    <li>Requires signature upon delivery</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Fragile Items</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Glass containers and delicate equipment are packed with extra protection:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Bubble wrap and protective padding</li>
                    <li>Marked as "Fragile" on the package</li>
                    <li>Careful handling by our logistics partners</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Delivery Process */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Delivery Process</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-3 ml-4">
                <li>
                  <strong>Order Confirmation:</strong> You will receive an email/SMS confirmation with your order number
                </li>
                <li>
                  <strong>Order Processing:</strong> We verify and pack your order with care
                </li>
                <li>
                  <strong>Shipment Notification:</strong> You will receive tracking details via email/SMS once your order is shipped
                </li>
                <li>
                  <strong>In-Transit Updates:</strong> Track your order in real-time using the tracking number
                </li>
                <li>
                  <strong>Delivery:</strong> Our delivery partner will contact you before delivery. Please ensure someone is available to receive the package
                </li>
                <li>
                  <strong>Verification:</strong> Please verify the package contents before signing. Report any discrepancies immediately
                </li>
              </ol>
            </section>

            {/* Order Tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Track Your Order</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Once your order is shipped, you can track its status:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Use the tracking number sent via email/SMS</li>
                  <li>Visit the "Track Order" page on our website</li>
                  <li>Contact customer support with your order number</li>
                  <li>Receive real-time updates on shipment status</li>
                </ul>
              </div>
            </section>

            {/* Delivery Issues */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Delivery Issues & Support</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Failed Delivery Attempts</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Delivery partner will attempt delivery up to 3 times</li>
                    <li>Please provide accurate contact information and address</li>
                    <li>If delivery fails, the package will be returned to our warehouse</li>
                    <li>Additional shipping charges may apply for re-delivery</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Damaged Package</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    If you receive a damaged package:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Do not accept the package if it appears severely damaged</li>
                    <li>Take photos of the damaged package</li>
                    <li>Contact customer support immediately</li>
                    <li>We will arrange for a replacement or refund</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Missing or Delayed Orders</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    If your order is delayed or missing:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Check tracking status first</li>
                    <li>Contact customer support with your order number</li>
                    <li>We will investigate and provide updates</li>
                    <li>Refund or replacement will be arranged if order is lost</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cash on Delivery */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Cash on Delivery (COD)</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We offer Cash on Delivery for orders across India with the following terms:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>COD available for orders up to <strong>₹10,000</strong></li>
                  <li>Additional COD charges of <strong>₹49</strong> apply</li>
                  <li>Please keep exact change ready for faster delivery</li>
                  <li>Payment must be made in cash at the time of delivery</li>
                  <li>Not available for international orders</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-primary-bg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-primary mb-4">Shipping Inquiries</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For any questions about shipping, delivery, or tracking, please contact our customer support:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral-text">Phone</p>
                    <a href="tel:1800-SWASTIK" className="text-primary hover:underline">1800-SWASTIK (Toll Free)</a>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral-text">Email</p>
                    <a href="mailto:shipping@swastikpharma.in" className="text-primary hover:underline">shipping@swastikpharma.in</a>
                    <p className="text-sm text-gray-600">For shipping inquiries</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <div className="text-sm text-gray-500 pt-4 border-t border-neutral-border">
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ShippingPolicy

