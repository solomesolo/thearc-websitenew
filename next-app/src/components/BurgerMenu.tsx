"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 z-50 p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1 ${isOpen ? 'opacity-0 scale-0' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-72 bg-gray-900 shadow-2xl transform transition-all duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="text-xl font-bold text-white">TheArc</div>
            </div>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-fuchsia-300 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 px-4 py-4 bg-gray-800">
            <div className="space-y-1">
              {[
                { href: '/', text: 'Home', isActive: true },
                { href: '/about', text: 'About TheArc', isActive: false },
                { href: '/knowledgebase', text: 'Knowledgebase', isActive: false },
                { href: '/catalog', text: 'Catalog of Services', isActive: false },
                { href: '/events', text: 'Events', isActive: false },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-base font-medium transition-colors py-3 px-3 rounded-lg hover:bg-white/10 border-l-4 border-transparent hover:border-fuchsia-500 ${
                    item.isActive 
                      ? 'text-white hover:text-fuchsia-300' 
                      : 'text-gray-200 hover:text-white'
                  }`}
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-700 bg-gray-800 space-y-3">
            <Link
              href="/screening"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white transition-colors font-semibold text-sm px-3 py-2.5 rounded-lg"
              onClick={toggleMenu}
            >
              Health Screening
            </Link>
            <Link
              href="/contact"
              className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition-colors font-semibold text-sm px-3 py-2.5 rounded-lg"
              onClick={toggleMenu}
            >
              Apply to Join
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
