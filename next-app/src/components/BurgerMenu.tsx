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
      {/* Burger Button - Improved Design */}
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Menu - Completely Redesigned */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-80 sm:w-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl transform transition-all duration-300 ease-in-out z-50 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header - Enhanced */}
          <div className="flex items-center justify-between p-6 border-b border-gradient-to-r from-fuchsia-500/30 to-blue-500/30 bg-gradient-to-r from-gray-800/50 to-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="text-xl font-bold text-white drop-shadow-lg">TheArc</div>
            </div>
            <button
              onClick={toggleMenu}
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links - Improved */}
          <nav className="flex-1 px-6 py-6 bg-gradient-to-b from-gray-800/30 to-gray-900/30">
            <div className="space-y-1">
              <Link 
                href="/" 
                className="group flex items-center text-base font-medium text-white hover:text-fuchsia-300 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-fuchsia-500/10 hover:to-blue-500/10 border-l-4 border-transparent hover:border-fuchsia-500 hover:shadow-lg"
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home
              </Link>
              <Link 
                href="/about" 
                className="group flex items-center text-base font-medium text-gray-200 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-fuchsia-500/10 hover:to-blue-500/10 border-l-4 border-transparent hover:border-fuchsia-500 hover:shadow-lg"
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About TheArc
              </Link>
              <Link 
                href="/knowledgebase" 
                className="group flex items-center text-base font-medium text-gray-200 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-fuchsia-500/10 hover:to-blue-500/10 border-l-4 border-transparent hover:border-fuchsia-500 hover:shadow-lg"
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Knowledgebase
              </Link>
              <Link 
                href="/catalog" 
                className="group flex items-center text-base font-medium text-gray-200 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-fuchsia-500/10 hover:to-blue-500/10 border-l-4 border-transparent hover:border-fuchsia-500 hover:shadow-lg"
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Catalog of Services
              </Link>
              <Link 
                href="/events" 
                className="group flex items-center text-base font-medium text-gray-200 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-fuchsia-500/10 hover:to-blue-500/10 border-l-4 border-transparent hover:border-fuchsia-500 hover:shadow-lg"
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Events
              </Link>
            </div>
          </nav>

          {/* Action Buttons - Enhanced */}
          <div className="p-6 border-t border-gradient-to-r from-fuchsia-500/20 to-blue-500/20 bg-gradient-to-r from-gray-800/50 to-gray-700/50 space-y-4">
            <Link 
              href="/screening" 
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full text-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white shadow-xl border border-blue-400/30 hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-sm px-4 py-3 rounded-xl tracking-wide relative overflow-hidden"
              onClick={toggleMenu}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Free Health Screening
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Link>
            <Link 
              href="/contact" 
              className="group block w-full text-center bg-gradient-to-r from-fuchsia-600 via-fuchsia-500 to-fuchsia-400 text-white shadow-xl border border-fuchsia-400/30 hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-sm px-4 py-3 rounded-xl tracking-wide relative overflow-hidden"
              onClick={toggleMenu}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Apply to Join
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-400 to-fuchsia-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
