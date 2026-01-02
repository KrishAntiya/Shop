import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ShopByAnimal from '@/components/ShopByAnimal'
import ShopByCategory from '@/components/ShopByCategory'
import FeaturedProducts from '@/components/FeaturedProducts'
import Services from '@/components/Services'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ShopByAnimal />
      <ShopByCategory />
      <FeaturedProducts />
      <Services />
      <Newsletter />
      <Footer />
    </main>
  )
}

