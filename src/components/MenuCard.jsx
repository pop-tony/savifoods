// src/components/MenuCard.jsx
export default function MenuCard({ image, name, price, description, tag, onBook }) {
    return (
      <div className="group overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-lg transition hover:scale-[1.02] dark:bg-zinc-900 dark:text-white">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          />
          {tag && (
            <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-black">
              {tag}
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-baseline justify-between">
            <h3 className="text-xl font-semibold">{name}</h3>
            <span className="text-lg font-bold text-amber-500">${price}</span>
          </div>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">{description}</p>
          <button
            onClick={() => onBook({ name, price })}
            className="w-full rounded-lg bg-amber-500 py-2 font-semibold text-black transition hover:bg-amber-400"
          >
            Add to Order
          </button>
        </div>
      </div>
    );
  }