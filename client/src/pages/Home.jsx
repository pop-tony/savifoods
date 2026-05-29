
import React from 'react'
import HeroSection from '../components/HeroSection'
import MenuSection from '../components/MenuSection'
import { Reservation } from '../components/Reservation'
import TestimonialCarousel from '../components/TestimonialCarousel'

const Home = () => {
  return (
    <>
        <HeroSection />
        <section id="about" className="bg-zinc-50 px-4 py-20 text-zinc-900 dark:bg-black dark:text-white">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 text-4xl font-bold">The Savi Foods Story</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                  Savi Foods started with one idea: take the flavors we grew up with in Accra and
                  plate them like art. We source from Osu market in the morning and
                  serve it with live jazz at night.
              </p>
            </div>
        </section>
        <MenuSection />
       {/* All category + grid logic now in here */}
        <Reservation />
        <TestimonialCarousel />
    </>
  )
}

export default Home