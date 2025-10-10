"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Compact Burger Button */}
      <button
        onClick={toggleMenu}
        className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col items-center justify-center w-4 h-4">
          <span 
            className={`block w-4 h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          ></span>
          <span 
            className={`block w-4 h-0.5 bg-white transition-all duration-300 ease-in-out mt-0.5 ${
              isOpen ? 'opacity-0 scale-0' : ''
            }`}
          ></span>
          <span 
            className={`block w-4 h-0.5 bg-white transition-all duration-300 ease-in-out mt-0.5 ${
              isOpen ? '-rotate-45 -translate-y-1' : ''
            }`}
          ></span>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Clean Mobile Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-64 bg-gray-900 border-l border-gray-700 shadow-xl transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#111827' }}
      >
        <div className="flex flex-col h-full">
          {/* Compact Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <div className="text-lg font-bold text-white">TheArc</div>
            </div>
            <button
              onClick={closeMenu}
              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto bg-gray-900" style={{ backgroundColor: '#111827' }}>
            <div className="space-y-1">
              {[
                { href: '/', text: 'Home' },
                { href: '/about', text: 'About TheArc' },
                { href: '/knowledgebase', text: 'Knowledgebase' },
                { href: '/catalog', text: 'Catalog of Services' },
                { href: '/events', text: 'Events' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 rounded transition-colors"
                  onClick={closeMenu}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </nav>

          {/* Compact Action Buttons - 50% Smaller Padding */}
          <div className="p-3 border-t border-gray-700 bg-gray-800 space-y-2" style={{ backgroundColor: '#1f2937' }}>
            <Link
              href="/screening"
              target="_blank"
              rel="noopener noreferrer"
              className="action-button block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-1 py-0.5 rounded transition-colors"
              onClick={closeMenu}
            >
              Health Screening
            </Link>
            <Link
              href="/contact"
              className="action-button block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-sm font-medium px-1 py-0.5 rounded transition-colors"
              onClick={closeMenu}
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
