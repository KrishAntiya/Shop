'use client'

import React from 'react'
import UniversalCard from './UniversalCard'

const ShopByAnimal = () => {
  const animals = [
    {
      name: 'Large Animals',
      image: '/Large Animals.png',
      href: '/animals/large-animals'
    },
    {
      name: 'Sheep & Goat',
      image: '/Sheep & Goat.png',
      href: '/animals/sheep-goat'
    },
    {
      name: 'Dog',
      image: '/Dog.png',
      href: '/animals/dog'
    },
    {
      name: 'Cat',
      image: '/Cat.png',
      href: '/animals/cat'
    },
    {
      name: 'Poultry',
      image: '/Poultry.jpg',
      href: '/animals/poultry'
    },
    {
      name: 'Horse',
      image: '/Horse.png',
      href: '/animals/horse'
    }
  ]

  return (
    <div className="bg-neutral-bg py-4 sm:py-6 md:py-8">
      <div className="max-w-container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Shop by Animal</h2>
        <div className="flex justify-start items-start gap-7 md:gap-10 lg:gap-12 flex-nowrap overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-4 md:px-6">
          {animals.map((animal, index) => (
            <UniversalCard
              key={index}
              image={animal.image}
              title={animal.name}
              href={animal.href}
              className="text-sm"
              circular={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopByAnimal

