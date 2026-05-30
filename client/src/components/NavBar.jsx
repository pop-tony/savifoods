import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { cartCount } = useCart();

  const navLinks = [
    { href: "#menu", label: "Menu" },
    { href: "#about", label: "About" },
    { href: "#reserve", label: "Reserve" },
    { href: "#contact", label: "Contact" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    navigate('/');
    setMobileOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
           ? 'bg-white/90 backdrop-blur-md shadow-md dark:bg-black/90'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-zinc-900 dark:text-white">
          {/* Logo */}
          <a
            href="#"
            onClick={handleLinkClick}
            className="text-2xl font-bold transition hover:opacity-80"
          >
            Savi<span className="text-amber-500">Foods</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <a
              onClick={()=>navigate('/')}
                key={link.href}
                href={link.href}
                className="font-medium transition hover:text-amber-500"
              >
                {link.label}
              </a>
            ))}

            <a
              onClick={()=>navigate('/orders')}
              className="cursor-pointer relative rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                Orders
            </a>

            {/* Reserve button with cart badge */}
            <a
              onClick={()=>navigate('/cart')}
              className="cursor-pointer relative rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount > 9? '9+' : cartCount}
                </span>
              )}
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile buttons */}
          <div className="cursor-pointer flex items-center gap-4 md:hidden">
            {/* Cart badge on mobile */}
            <a onClick={()=>navigate('/cart')} className="relative">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-black">
                  {cartCount > 9? '9+' : cartCount}
                </span>
              )}
            </a>

            <ThemeToggle />

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-2xl leading-none"
              aria-label="Toggle menu"
            >
              {mobileOpen? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 pt-20 md:hidden">
          <div className="flex flex-col items-center gap-8 p-8 text-xl text-white">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="font-semibold transition hover:text-amber-500"
              >
                {link.label}
              </a>
            ))}
            <a
              onClick={()=>{handleLinkClick(); navigate('/orders')}}
              className="cursor-pointer relative rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                Orders
            </a>
            <a
              href="#reserve"
              onClick={handleLinkClick}
              className="mt-4 rounded-full bg-amber-500 px-8 py-3 font-semibold text-black transition hover:bg-amber-400"
            >
              Reserve Table {cartCount > 0 && `(${cartCount})`}
            </a>
          </div>
        </div>
      )}
    </>
  );
}