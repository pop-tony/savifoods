// src/components/MenuGrid.jsx
import MenuCard from './MenuCard';
import { useState } from 'react';

const sampleMenu = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1932",
    name: "Jollof Risotto",
    price: "18",
    description: "Smoky jollof spices meet creamy arborio rice. Served with grilled prawns.",
    category: "Mains",
    tag: "Chef's Pick"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=2070",
    name: "Suya Beef Skewers",
    price: "14",
    description: "Tender beef coated in yaji spice, flame-grilled. Served with sliced onions.",
    category: "Starters"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1981",
    name: "Plantain Cheesecake",
    price: "9",
    description: "Caramelized plantain swirl on vanilla cheesecake base.",
    category: "Desserts",
    tag: "New"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069",
    name: "Zobo Spritz",
    price: "7",
    description: "Hibiscus, ginger, and sparkling wine. Ghanaian aperitif.",
    category: "Drinks"
  },
];

export default function MenuGrid({ category = "All", onAddToOrder }) {
  const filtered = category === "All"
  ? sampleMenu
    : sampleMenu.filter(item => item.category === category);

  return (
    <section id="menu" className="bg-zinc-50 px-4 py-20 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-center text-4xl font-bold">Our Menu</h2>
        <p className="mb-12 text-center text-zinc-600 dark:text-zinc-400">
          Crafted with local ingredients, served with global flair
        </p>

        {filtered.length === 0? (
          <p className="text-center text-zinc-500">No dishes in this category yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(dish => (
              <MenuCard key={dish.id} {...dish} onBook={onAddToOrder} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}