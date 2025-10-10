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
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative flex flex-col justify-center items-center w-8 h-8 p-1 burger-button"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900 transform transition-transform duration-300 z-50 mobile-menu ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: 'min(320px, 85vw)', maxWidth: '85vw' }}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
            <div className="text-lg font-bold text-white">TheArc</div>
            <button
              onClick={closeMenu}
              className="text-white hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 bg-gray-900">
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white py-2" onClick={closeMenu}>
                Home
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white py-2" onClick={closeMenu}>
                About TheArc
              </Link>
              <Link href="/knowledgebase" className="block text-gray-300 hover:text-white py-2" onClick={closeMenu}>
                Knowledgebase
              </Link>
              <Link href="/catalog" className="block text-gray-300 hover:text-white py-2" onClick={closeMenu}>
                Catalog of Services
              </Link>
              <Link href="/events" className="block text-gray-300 hover:text-white py-2" onClick={closeMenu}>
                Events
              </Link>
            </div>
          </nav>

          {/* Action Buttons - MOBILE OPTIMIZED */}
          <div className="p-2 border-t border-gray-700 space-y-1 bg-gray-800">
            <Link
              href="/screening"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center rounded text-sm action-button"
              style={{ 
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                lineHeight: '1.25',
                minHeight: '2.5rem'
              }}
              onClick={closeMenu}
            >
              Health Screening
            </Link>
            <Link
              href="/contact"
              className="block w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-center rounded text-sm action-button"
              style={{ 
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                lineHeight: '1.25',
                minHeight: '2.5rem'
              }}
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