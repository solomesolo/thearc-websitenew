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
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-lg border-l border-white/10 transform transition-transform duration-300 z-50 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="text-2xl font-bold text-white">TheArc</div>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-fuchsia-300 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-6">
              <Link 
                href="/about" 
                className="block text-lg font-medium text-white hover:text-fuchsia-300 transition-colors"
                onClick={toggleMenu}
              >
                About TheArc
              </Link>
              <Link 
                href="/knowledgebase" 
                className="block text-lg font-medium text-gray-400 hover:text-white transition-colors"
                onClick={toggleMenu}
              >
                Knowledgebase
              </Link>
              <Link 
                href="/catalog" 
                className="block text-lg font-medium text-gray-400 hover:text-white transition-colors"
                onClick={toggleMenu}
              >
                Catalog of Services
              </Link>
              <Link 
                href="/events" 
                className="block text-lg font-medium text-gray-400 hover:text-white transition-colors"
                onClick={toggleMenu}
              >
                Events
              </Link>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="p-6 border-t border-white/10 space-y-4">
            <Link 
              href="/screening" 
              className="block w-full text-center border border-blue-400 text-blue-200 bg-transparent hover:bg-blue-900/10 hover:text-blue-300 hover:ring-2 hover:ring-blue-400/40 backdrop-blur-sm transition-all font-semibold text-base px-6 py-3 rounded-full tracking-wide"
              onClick={toggleMenu}
            >
              Health Screening
            </Link>
            <Link 
              href="/contact" 
              className="block w-full text-center border border-fuchsia-400 text-fuchsia-200 bg-transparent hover:bg-fuchsia-900/10 hover:text-fuchsia-300 hover:ring-2 hover:ring-fuchsia-400/40 backdrop-blur-sm transition-all font-semibold text-base px-6 py-3 rounded-full tracking-wide"
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
