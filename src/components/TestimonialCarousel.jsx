// src/components/TestimonialCarousel.jsx
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Ama K.",
    role: "Accra Foodie",
    quote: "The Jollof Risotto at Savi Foods shouldn’t work, but it absolutely does. I’ve been back 3 times this month.",
    avatar: "https://i.pravatar.cc/100?img=32"
  },
  {
    id: 2,
    name: "Kwame B.",
    role: "Local Guide",
    quote: "Finally, a spot in Osu that feels international but still tastes like home. Service is 10/10.",
    avatar: "https://i.pravatar.cc/100?img=12"
  },
  {
    id: 3,
    name: "Sarah O.",
    role: "Visitor from London",
    quote: "Best Zobo Spritz I’ve ever had. The whole vibe is just *chef’s kiss*. Book ahead!",
    avatar: "https://i.pravatar.cc/100?img=45"
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="bg-white px-4 py-20 text-zinc-900 dark:bg-black dark:text-white">
      <div
        className="mx-auto max-w-3xl text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <h2 className="mb-12 text-4xl font-bold">What People Say</h2>

        <div className="relative h-64 overflow-hidden">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === current? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="mx-auto mb-6 h-16 w-16 rounded-full object-cover"
              />
              <p className="mb-6 text-xl italic text-zinc-700 dark:text-zinc-200">"{t.quote}"</p>
              <p className="font-semibold text-amber-500">{t.name}</p>
              <p className="text-sm text-zinc-500">{t.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 w-8 rounded-full transition ${
                idx === current? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}