
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition ${
      scrolled
      ? 'bg-white/80 backdrop-blur dark:bg-black/80'
        : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-zinc-900 dark:text-white">
        <a href="#" className="text-2xl font-bold">
          Savi<span className="text-amber-500">Foods</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#menu" className="hover:text-amber-500">Menu</a>
          <a href="#about" className="hover:text-amber-500">About</a>
          <a href="#reserve" className="hover:text-amber-500">Reserve</a>
          <a href="#contact" className="hover:text-amber-500">Contact</a>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-black">
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
}