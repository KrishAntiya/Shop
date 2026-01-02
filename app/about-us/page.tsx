import React from 'react'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">About Us</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              SwastikPharma is a trusted name in veterinary pharmaceuticals, dedicated to providing 
              high-quality medicines and healthcare products for animals across India. We specialize 
              in large animal veterinary care, serving veterinarians, farmers, and pet owners with 
              genuine, vet-approved formulations.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to ensure the health and well-being of animals by providing access to 
              authentic veterinary medicines, supplements, and healthcare products. We are committed 
              to fast delivery, especially to rural areas, and maintaining the highest standards of 
              quality and service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
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
  )
}

export default AboutUs

