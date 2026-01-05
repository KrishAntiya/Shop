'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

const AboutUs = () => {
  const founders = [
    {
      name: 'Pravinbhai Antiya',
      role: 'Co-Founder & Head of Finance',
      description: 'Managing financial operations, budgeting, and ensuring the financial health of the company.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    {
      name: 'Mahesbhai Antiya',
      role: 'Co-Founder & Head of Operations',
      description: 'Managing supply chain, logistics, and ensuring quality control for all products.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop'
    },
    {
      name: 'Rajubhai Antiya',
      role: 'Co-Founder & Head of Warehousing',
      description: 'Managing inventory, storage, and distribution of products to ensure timely delivery.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Nareshbhai Antiya',
      role: 'Co-Founder & Head of Marketing',
      description: 'Developing marketing strategies and promoting our products to veterinary professionals and farmers.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
    }
  ]

  return (
    <main className="min-h-screen bg-neutral-bg">
      <Header />
      <div className="py-16">
        <div className="max-w-container mx-auto px-4">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-text mb-8 md:mb-12">
            About Us
          </h1>
          
          {/* Brand Story Section */}
          <div className="bg-white rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow duration-200 p-8 sm:p-10 md:p-12 mb-8 md:mb-12">
            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Who We Are</h2>
              <div className="space-y-4">
                <p className="font-sans text-neutral-text leading-relaxed font-normal">
                  Founded by a team of four professionals with a shared vision, SwastikPharma was created to make quality veterinary medicines and animal healthcare products easily accessible across India.
                </p>
                <p className="font-sans text-neutral-text leading-relaxed font-normal">
                  With a strong focus on cattle, buffalo, sheep, goat, poultry, and pets, we aim to support farmers, veterinarians, and animal caretakers with trusted products and reliable service.
                </p>
              </div>
            </section>
          </div>

          {/* Our Mission Section */}
          <div className="bg-white rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow duration-200 p-8 sm:p-10 md:p-12 mb-8 md:mb-12">
            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Our Mission</h2>
              <p className="font-sans text-neutral-text leading-relaxed font-normal">
                Our mission is to ensure the health and well-being of animals by providing access to 
                authentic veterinary medicines, supplements, and healthcare products. We are committed 
                to fast delivery, especially to rural areas, and maintaining the highest standards of 
                quality and service.
              </p>
            </section>
          </div>

          {/* Founders Section */}
          <div className="mb-8 md:mb-12">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-6 md:mb-8 text-center">
              Our Founders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {founders.map((founder, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-center text-center"
                >
                  {/* Founder Photo */}
                  <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-neutral-border">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                  
                  {/* Founder Name */}
                  <h3 className="font-heading text-lg font-semibold text-neutral-text mb-1">
                    {founder.name}
                  </h3>
                  
                  {/* Role */}
                  <p className="font-sans text-sm font-medium text-secondary mb-3">
                    {founder.role}
                  </p>
                  
                  {/* Description */}
                  <p className="font-sans text-sm text-neutral-text leading-relaxed font-normal">
                    {founder.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow duration-200 p-8 sm:p-10 md:p-12 mb-8 md:mb-12">
            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4 text-center">
                Team
              </h2>
              <p className="font-sans text-neutral-text leading-relaxed font-normal mb-8 text-center max-w-3xl mx-auto">
                Our talented team of website developers has brought SwastikPharma to life with cutting-edge technology, 
                user-friendly design, and seamless functionality. They have built a robust platform that makes 
                veterinary products easily accessible to customers across India.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-neutral-bg rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-center text-center">
                  {/* Team Member Photo */}
                  <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-neutral-border">
                    <Image
                      src="/Krish antiya.jpeg"
                      alt="Krish Antiya"
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center 65%' }}
                      loading="lazy"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                  
                  {/* Team Member Name */}
                  <h3 className="font-heading text-lg font-semibold text-neutral-text mb-1">
                    Krish Antiya
                  </h3>
                  
                  {/* Role */}
                  <p className="font-sans text-sm font-medium text-secondary">
                    Website Developer
                  </p>
                </div>

                <div className="bg-neutral-bg rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-center text-center">
                  {/* Team Member Photo */}
                  <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-neutral-border">
                    <Image
                      src="/vansh antiya.jpeg"
                      alt="Vansh Antiya"
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center 65%' }}
                      loading="lazy"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                  
                  {/* Team Member Name */}
                  <h3 className="font-heading text-lg font-semibold text-neutral-text mb-1">
                    Vansh Antiya
                  </h3>
                  
                  {/* Role */}
                  <p className="font-sans text-sm font-medium text-secondary">
                    Website Developer
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow duration-200 p-8 sm:p-10 md:p-12">
            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-text mb-4">Why Choose Us</h2>
              <ul className="font-sans text-neutral-text space-y-3 list-disc list-inside ml-4 font-normal">
                <li>Vet-approved formulations from trusted brands</li>
                <li>Fast delivery to rural and urban areas</li>
                <li>Genuine products with quality assurance</li>
                <li>Bulk order support for farmers</li>
                <li>Licensed veterinary products</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default AboutUs
