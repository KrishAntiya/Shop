import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ReturnsAndRefunds = () => {
  return (
    <main className="min-h-screen bg-neutral-bg">
      <Header />
      <div className="py-8 sm:py-12 md:py-16">
        <div className="max-w-container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8">Returns & Refunds Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-700 leading-relaxed">
                At SwastikPharma, we are committed to providing you with high-quality veterinary medicines and products. 
                We understand that sometimes you may need to return or exchange a product. This policy outlines our 
                return and refund procedures to ensure a smooth experience.
              </p>
            </section>

            {/* Return Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Return Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Eligibility for Returns</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Items must be returned within <strong>7 days</strong> of delivery</li>
                    <li>Products must be in their original, unopened packaging with seals intact</li>
                    <li>Prescription medicines and temperature-sensitive products (vaccines, certain antibiotics) cannot be returned</li>
                    <li>Products that have been opened, used, or damaged by the customer are not eligible for return</li>
                    <li>Free samples and promotional items are non-returnable</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Non-Returnable Items</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Prescription medicines (unless damaged or incorrectly shipped)</li>
                    <li>Vaccines and temperature-sensitive products</li>
                    <li>Opened or used products</li>
                    <li>Products without original packaging or invoice</li>
                    <li>Personalized or custom-ordered items</li>
                    <li>Products damaged due to misuse or negligence</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">How to Initiate a Return</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-3 ml-4">
                <li>
                  <strong>Contact Customer Support:</strong> Email us at{' '}
                  <a href="mailto:returns@swastikpharma.in" className="text-primary hover:underline">
                    returns@swastikpharma.in
                  </a>{' '}
                  or call our toll-free number <strong>1800-SWASTIK</strong> within 7 days of delivery
                </li>
                <li>
                  <strong>Provide Details:</strong> Include your order number, product details, and reason for return
                </li>
                <li>
                  <strong>Return Authorization:</strong> Our team will review your request and provide a Return Authorization (RA) number
                </li>
                <li>
                  <strong>Package the Product:</strong> Pack the item securely in its original packaging along with the invoice
                </li>
                <li>
                  <strong>Return Shipping:</strong> We will arrange for pickup of the product. In some cases, you may need to ship it back to our warehouse
                </li>
              </ol>
            </section>

            {/* Refund Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Refund Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Refund Eligibility</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Refunds will be processed once we receive and verify the returned product. Refunds are applicable in the following cases:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Defective or damaged products received</li>
                    <li>Wrong product delivered</li>
                    <li>Expired products received</li>
                    <li>Products not matching the description on the website</li>
                    <li>Cancelled orders before shipment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Refund Processing Time</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Refunds will be processed within <strong>7-10 business days</strong> after we receive the returned product</li>
                    <li>The refund will be credited to the original payment method used for the purchase</li>
                    <li>For Cash on Delivery (COD) orders, refunds will be processed via bank transfer or wallet</li>
                    <li>You will receive a confirmation email once the refund is processed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Partial Refunds</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In case of partial returns (multiple items in an order), only the returned items will be refunded. 
                    Shipping charges are non-refundable unless the return is due to our error.
                  </p>
                </div>
              </div>
            </section>

            {/* Exchange Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Exchange Policy</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We offer exchanges for products that are defective, damaged, or incorrectly shipped. Exchanges are subject to product availability.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Exchanges must be requested within 7 days of delivery</li>
                  <li>Product must be in original, unopened condition</li>
                  <li>Exchange requests are subject to product availability</li>
                  <li>If the replacement product is unavailable, we will process a full refund</li>
                  <li>Shipping charges for exchanges may apply unless it's due to our error</li>
                </ul>
              </div>
            </section>

            {/* Damaged or Defective Products */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Damaged or Defective Products</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  If you receive a damaged or defective product, please contact us immediately. We will arrange for a replacement or full refund at no additional cost.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Report the issue within 24 hours of delivery</li>
                  <li>Provide photographs of the damaged/defective product</li>
                  <li>Keep the product in its original packaging</li>
                  <li>We will arrange for pickup and replacement/refund</li>
                </ul>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Order Cancellation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">Before Shipment</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You can cancel your order before it is shipped by contacting our customer support team. 
                    Full refund will be processed within 3-5 business days.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-text mb-2">After Shipment</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Once the order is shipped, you cannot cancel it. However, you can return the product after 
                    receiving it, subject to our return policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-primary-bg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-primary mb-4">Need Help?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about our Returns & Refunds Policy, please contact our customer support team:
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
                    <a href="mailto:returns@swastikpharma.in" className="text-primary hover:underline">returns@swastikpharma.in</a>
                    <p className="text-sm text-gray-600">For return requests</p>
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

export default ReturnsAndRefunds

