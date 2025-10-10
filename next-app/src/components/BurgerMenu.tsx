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
      {/* Burger Button - Elegant Design */}
      <button
        onClick={toggleMenu}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 group"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col items-center justify-center w-5 h-5">
          <span 
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></span>
          <span 
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1 ${
              isOpen ? 'opacity-0 scale-0' : ''
            }`}
          ></span>
          <span 
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></span>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu - Elegant Slide-in */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="text-2xl font-bold text-white">TheArc</div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            <div className="space-y-2">
              {[
                { href: '/', text: 'Home', icon: '🏠' },
                { href: '/about', text: 'About TheArc', icon: 'ℹ️' },
                { href: '/knowledgebase', text: 'Knowledgebase', icon: '📚' },
                { href: '/catalog', text: 'Catalog of Services', icon: '📋' },
                { href: '/events', text: 'Events', icon: '📅' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-4 p-4 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                  onClick={closeMenu}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium text-lg">{item.text}</span>
                  <svg className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="p-6 border-t border-white/10 bg-gray-800/50 space-y-4">
            <Link
              href="/screening"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              onClick={closeMenu}
            >
              <span className="mr-2">🔍</span>
              Health Screening
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 hover:from-fuchsia-700 hover:to-fuchsia-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              onClick={closeMenu}
            >
              <span className="mr-2">✨</span>
              Apply to Join
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
