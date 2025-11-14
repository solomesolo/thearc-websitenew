"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 transition-all duration-300">
      <div className="mx-auto max-w-screen-xl flex justify-between items-center px-6 lg:px-12 py-6 lg:py-8">
        {/* Logo */}
        <Link
          href="/"
          className="h-10 lg:h-12 flex items-center text-2xl lg:text-3xl font-semibold tracking-tight text-white hover:text-gray-200 transition-colors"
        >
          <span className="object-contain">TheArc</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
          <a
            href="#how-it-works"
            className="text-[15px] font-medium tracking-tight text-gray-300 hover:text-white transition-all duration-200 px-3 py-2 rounded-md hover:bg-white/10 hover:-translate-y-0.5"
          >
            How It Works
          </a>
          <a
            href="#plans"
            className="text-[15px] font-medium tracking-tight text-gray-300 hover:text-white transition-all duration-200 px-3 py-2 rounded-md hover:bg-white/10 hover:-translate-y-0.5"
          >
            Plans
          </a>
          <a
            href="#personas"
            className="text-[15px] font-medium tracking-tight text-gray-300 hover:text-white transition-all duration-200 px-3 py-2 rounded-md hover:bg-white/10 hover:-translate-y-0.5"
          >
            Personas
          </a>
          <a
            href="/catalog"
            className="text-[15px] font-medium tracking-tight text-gray-300 hover:text-white transition-all duration-200 px-3 py-2 rounded-md hover:bg-white/10 hover:-translate-y-0.5"
          >
            Catalog
          </a>
          <Link
            href="/about"
            className="text-[15px] font-medium tracking-tight text-gray-300 hover:text-white transition-all duration-200 px-3 py-2 rounded-md hover:bg-white/10 hover:-translate-y-0.5"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[15px] font-medium tracking-tight text-gray-300 hover:text-white transition-all duration-200 px-3 py-2 rounded-md hover:bg-white/10 hover:-translate-y-0.5"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 shadow-lg py-6 transition-all duration-300 ease-out">
          <div className="mx-auto max-w-screen-xl px-6 space-y-4">
            <a
              href="#how-it-works"
              className="block text-lg px-4 py-3 text-white font-medium tracking-tight hover:bg-white/10 rounded-md transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#plans"
              className="block text-lg px-4 py-3 text-white font-medium tracking-tight hover:bg-white/10 rounded-md transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Plans
            </a>
            <a
              href="#personas"
              className="block text-lg px-4 py-3 text-white font-medium tracking-tight hover:bg-white/10 rounded-md transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Personas
            </a>
            <a
              href="/catalog"
              className="block text-lg px-4 py-3 text-white font-medium tracking-tight hover:bg-white/10 rounded-md transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Catalog
            </a>
            <Link
              href="/about"
              className="block text-lg px-4 py-3 text-white font-medium tracking-tight hover:bg-white/10 rounded-md transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-lg px-4 py-3 text-white font-medium tracking-tight hover:bg-white/10 rounded-md transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

