"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAS } from "@/lib/persona";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Use persona config to ensure consistency
  const personaLinks = [
    { label: PERSONAS.women.name, href: PERSONAS.women.route },
    { label: PERSONAS.traveler.name, href: PERSONAS.traveler.route },
    { label: PERSONAS.rebuilder.name, href: PERSONAS.rebuilder.route },
  ];

  return (
    <header className={`premium-nav-header ${isScrolled ? "premium-nav-scrolled" : ""}`}>
      <div className="premium-nav-container">
        {/* Logo */}
        <Link href="/" className="premium-nav-logo">
          <span>TheArc</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="premium-nav-desktop">
          <div className="premium-nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              className="premium-nav-item premium-nav-dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              Find Your Path
              <svg
                className={`premium-nav-chevron ${isDropdownOpen ? "premium-nav-chevron-open" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="premium-nav-dropdown"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {personaLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="premium-nav-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/marketplace" className="premium-nav-item">
            Marketplace
          </Link>
          <Link href="/about" className="premium-nav-item">
            About The Arc
          </Link>
          <Link href="/events" className="premium-nav-item">
            Events
          </Link>
        </nav>

        {/* Login Button */}
        <Link href="/login" className="premium-nav-login">
          Login / Sign Up
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="premium-nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`premium-nav-hamburger ${isMobileMenuOpen ? "premium-nav-hamburger-open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="premium-nav-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="premium-nav-mobile-content">
              <MobileDropdown
                title="Find Your Path"
                items={personaLinks}
                onClose={() => setIsMobileMenuOpen(false)}
              />
              <Link
                href="/marketplace"
                className="premium-nav-mobile-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/about"
                className="premium-nav-mobile-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About The Arc
              </Link>
              <Link
                href="/events"
                className="premium-nav-mobile-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/login"
                className="premium-nav-mobile-login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Mobile Dropdown Component
function MobileDropdown({
  title,
  items,
  onClose,
}: {
  title: string;
  items: Array<{ label: string; href: string }>;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="premium-nav-mobile-dropdown">
      <button
        className="premium-nav-mobile-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg
          className={`premium-nav-mobile-chevron ${isOpen ? "premium-nav-mobile-chevron-open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="premium-nav-mobile-dropdown-content">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="premium-nav-mobile-dropdown-item"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
