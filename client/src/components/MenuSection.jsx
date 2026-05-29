// src/components/MenuSection.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import MenuGrid from './MenuGrid';

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  return (
    <>
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
      <MenuGrid category={activeCategory} onAddToOrder={addToCart} />
    </>
  );
}