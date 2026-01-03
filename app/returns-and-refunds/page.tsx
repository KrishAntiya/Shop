import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ReturnsAndRefunds = () => {
  return (
    <main className="min-h-screen bg-neutral-bg">
      <Header />
      <div className="py-16">
        <div className="max-w-container mx-auto px-4">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-text mb-8 md:mb-12">
            Returns & Refunds Policy
          </h1>
          
          <div className="bg-white rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow duration-200 p-8 sm:p-10 md:p-12 space-y-8">
            {/* Introduction */}
            <section>
              <p className="font-sans text-neutral-text leading-relaxed font-normal">
                At SwastikPharma, we are committed to providing you with high-quality veterinary medicines and products. 
                We understand that sometimes you may need to return or exchange a product. This policy outlines our 
                return and refund procedures to ensure a smooth experience.
              </p>
            </section>

            {/* Return Policy */}
            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Return Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-neutral-text mb-2">Eligibility for Returns</h3>
                  <ul className="font-sans list-disc list-inside text-neutral-text space-y-2 ml-4 font-normal">
                    <li>Items must be returned within <strong>7 days</strong> of delivery</li>
                    <li>Products must be in their original, unopened packaging with seals intact</li>
                    <li>Prescription medicines and temperature-sensitive products (vaccines, certain antibiotics) cannot be returned</li>
                    <li>Products that have been opened, used, or damaged by the customer are not eligible for return</li>
                    <li>Free samples and promotional items are non-returnable</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-neutral-text mb-2">Non-Returnable Items</h3>
                  <ul className="font-sans list-disc list-inside text-neutral-text space-y-2 ml-4 font-normal">
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
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">How to Initiate a Return</h2>
              <ol className="font-sans list-decimal list-inside text-neutral-text space-y-3 ml-4 font-normal">
                <li>
                  <strong>Contact Customer Support:</strong> Email us at{' '}
                  <a href="mailto:returns@swastikpharma.in" className="text-secondary hover:underline font-medium">
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
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Refund Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-neutral-text mb-2">Refund Eligibility</h3>
                  <p className="font-sans text-neutral-text leading-relaxed mb-3 font-normal">
                    Refunds will be processed once we receive and verify the returned product. Refunds are applicable in the following cases:
                  </p>
                  <ul className="font-sans list-disc list-inside text-neutral-text space-y-2 ml-4 font-normal">
                    <li>Defective or damaged products received</li>
                    <li>Wrong product delivered</li>
                    <li>Expired products received</li>
                    <li>Products not matching the description on the website</li>
                    <li>Cancelled orders before shipment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-neutral-text mb-2">Refund Processing Time</h3>
                  <ul className="font-sans list-disc list-inside text-neutral-text space-y-2 ml-4 font-normal">
                    <li>Refunds will be processed within <strong>7-10 business days</strong> after we receive the returned product</li>
                    <li>The refund will be credited to the original payment method used for the purchase</li>
                    <li>For Cash on Delivery (COD) orders, refunds will be processed via bank transfer or wallet</li>
                    <li>You will receive a confirmation email once the refund is processed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-neutral-text mb-2">Partial Refunds</h3>
                  <p className="font-sans text-neutral-text leading-relaxed font-normal">
                    In case of partial returns (multiple items in an order), only the returned items will be refunded. 
                    Shipping charges are non-refundable unless the return is due to our error.
                  </p>
                </div>
              </div>
            </section>

            {/* Exchange Policy */}
            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Exchange Policy</h2>
              <div className="space-y-4">
                <p className="font-sans text-neutral-text leading-relaxed font-normal">
                  We offer exchanges for products that are defective, damaged, or incorrectly shipped. Exchanges are subject to product availability.
                </p>
                <ul className="font-sans list-disc list-inside text-neutral-text space-y-2 ml-4 font-normal">
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
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Damaged or Defective Products</h2>
              <div className="space-y-4">
                <p className="font-sans text-neutral-text leading-relaxed font-normal">
                  If you receive a damaged or defective product, please contact us immediately. We will arrange for a replacement or full refund at no additional cost.
                </p>
                <ul className="font-sans list-disc list-inside text-neutral-text space-y-2 ml-4 font-normal">
                  <li>Report the issue within 24 hours of delivery</li>
                  <li>Provide photographs of the damaged/defective product</li>
                  <li>Keep the product in its original packaging</li>
                  <li>We will arrange for pickup and replacement/refund</li>
                </ul>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Order Cancellation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-neutral-text mb-2">Before Shipment</h3>
                  <p className="font-sans text-neutral-text leading-relaxed font-normal">
                    You can cancel your order before it is shipped by contacting our customer support team. 
                    Full refund will be processed within 3-5 business days.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-neutral-text mb-2">After Shipment</h3>
                  <p className="font-sans text-neutral-text leading-relaxed font-normal">
                    Once the order is shipped, you cannot cancel it. However, you can return the product after 
                    receiving it, subject to our return policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-secondary-light rounded-xl border border-neutral-border p-8">
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Need Help?</h2>
              <p className="font-sans text-neutral-text leading-relaxed mb-6 font-normal">
                If you have any questions about our Returns & Refunds Policy, please contact our customer support team:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="font-sans font-semibold text-neutral-text">Phone</p>
                    <a href="tel:1800-SWASTIK" className="font-sans text-secondary hover:text-secondary/80 hover:underline font-medium">
                      1800-SWASTIK (Toll Free)
                    </a>
                    <p className="font-sans text-sm text-neutral-text-secondary font-normal">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="font-sans font-semibold text-neutral-text">Email</p>
                    <a href="mailto:returns@swastikpharma.in" className="font-sans text-secondary hover:text-secondary/80 hover:underline font-medium">
                      returns@swastikpharma.in
                    </a>
                    <p className="font-sans text-sm text-neutral-text-secondary font-normal">For return requests</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <div className="font-sans text-sm text-neutral-text-secondary pt-4 border-t border-neutral-border font-normal">
              <p><strong className="font-semibold">Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ReturnsAndRefunds

