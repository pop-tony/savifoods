// src/components/MenuGrid.jsx
import { useNavigate } from 'react-router-dom'; // if using React Router
import { allDishes } from '../data/dishes';
import MenuCard from './MenuCard';

export default function MenuGrid({ category={activeCategory}, onAddToOrder, showLimit = 4 }) {
  
  const navigate = useNavigate();
  
  const filtered = category === "All"
   ? allDishes
    : allDishes.filter(item => item.category === category);

  const displayItems = filtered.slice(0, showLimit);
  const hasMore = filtered.length > showLimit;

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
          <>
            {/* Mobile: 2 cols, Tablet: 2 cols, Desktop: 3-4 cols */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {displayItems.map(dish => (
                <MenuCard key={dish.id} {...dish} onAddToOrder={onAddToOrder} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={()=>navigate("/dishes")}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border-2 border-amber-500 px-8 py-3 font-semibold text-amber-500 transition hover:bg-amber-500 hover:text-black"
                >
                  Show More Dishes
                  <span className="text-lg">→</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}