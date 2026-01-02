import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ShopByAnimal from '@/components/ShopByAnimal'
import ShopByCategory from '@/components/ShopByCategory'
import ShopByBrand from '@/components/ShopByBrand'
import ShopByHealthProblem from '@/components/ShopByHealthProblem'
import BestSellers from '@/components/BestSellers'
import NewArrivals from '@/components/NewArrivals'
import WhyChooseUs from '@/components/WhyChooseUs'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ShopByAnimal />
      <ShopByCategory />
      <ShopByBrand />
      <ShopByHealthProblem />
      <BestSellers />
      <NewArrivals />
      <WhyChooseUs />
      <Newsletter />
      <Footer />
    </main>
  )
}

