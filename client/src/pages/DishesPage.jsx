// src/pages/DishesPage.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import MenuCard from '../components/MenuCard';
import { allDishes } from '../data/dishes'; // move array to separate file

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

export default function DishesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart(); // grab from context

  const filtered = activeCategory === "All"
   ? allDishes
    : allDishes.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-24 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-5xl font-bold">Full Menu</h1>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2 font-semibold transition ${
                activeCategory === cat
                 ? 'bg-amber-500 text-black'
                  : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-zinc-500">No dishes in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(dish => (
              <MenuCard key={dish.id} {...dish} onAddToOrder={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}