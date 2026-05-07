
import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import HeroSection from './components/HeroSection'
import MenuGrid from './components/MenuGrid'
import ReservationForm from './components/ReservationForm'
import TestimonialCarousel from './components/TestimonialCarousel'
import Footer from './components/Footer'
import NavBar from './components/NavBar'

function AppContent() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [orderItems, setOrderItems] = useState([])
  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']

  const handleAddToOrder = (item) => {
    setOrderItems(prev => [...prev, item])
    alert(`${item.name} added to your pre-order!`)
  }

  const handleClearOrder = () => {
    setOrderItems([])
  }

  return (
    <div className="bg-white dark:bg-zinc-950">
      <NavBar />
      <main>
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

        <section className="bg-zinc-50 px-4 pt-20 text-zinc-900 dark:bg-zinc-950 dark:text-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    activeCategory === cat
                    ? 'bg-amber-500 text-black'
                      : 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
        <MenuGrid category={activeCategory} onAddToOrder={handleAddToOrder} />

        <ReservationForm orderItems={orderItems} onClearOrder={handleClearOrder} />
        <TestimonialCarousel />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App