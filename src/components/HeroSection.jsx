// src/components/HeroSection.jsx
export default function HeroSection() {
    return (
      <section className="relative h- w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
          alt="Restaurant interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">
            Savi<span className="text-amber-500">Foods</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Modern flavors. Local ingredients. Unforgettable evenings in Accra.
          </p>
          <div className="flex gap-4">
            <a href="#menu" className="rounded-full bg-amber-500 px-8 py-3 font-semibold text-black transition hover:bg-amber-400">
              View Menu
            </a>
            <a href="#reserve" className="rounded-full border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
              Reserve Table
            </a>
          </div>
        </div>
      </section>
    );
  }