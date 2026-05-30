// src/components/MenuCard.jsx
export default function MenuCard({ image, name, price, description, tag, onAddToOrder }) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white text-zinc-900 shadow-lg transition hover:scale-[1.02] dark:bg-zinc-900 dark:text-white sm:rounded-2xl">
      <div className="relative h-32 overflow-hidden sm:h-48">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
        />
        {tag && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text- font-bold text-black sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
            {tag}
          </span>
        )}
      </div>
      <div className="p-3 sm:p-5">
        <div className="mb-1 flex items-baseline justify-between gap-2 sm:mb-2">
          <h3 className="text-sm font-semibold leading-tight sm:text-xl">{name}</h3>
          <span className="text-sm font-bold text-amber-500 sm:text-lg">₵{price}</span>
        </div>
        <p className="mb-3 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-300 sm:mb-4 sm:text-sm">
          {description}
        </p>
        <button
          onClick={() => onAddToOrder({ id: name, name, price: Number(price) })}
          className="cursor-pointer w-full rounded-md bg-amber-500 py-1.5 text-xs font-semibold text-black transition hover:bg-amber-400 sm:rounded-lg sm:py-2 sm:text-base"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}