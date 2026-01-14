"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps {
  accentColor?: string;
}

export default function Footer({ accentColor = '#4DE4C1' }: FooterProps) {
  const pathname = usePathname();
  const isOverlay = ["/contact", "/privacy-policy", "/terms"].includes(pathname);

  return (
    <footer 
      className={`w-full px-6 md:px-10 py-16 md:py-20 ${isOverlay ? 'hidden md:block' : 'block'} mt-auto flex-shrink-0`}
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Product */}
          <div>
            <h3 
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--muted-2)' }}
            >
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/marketplace" 
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }}
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link 
                  href="/method" 
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }}
                >
                  Our Method
                </Link>
              </li>
              <li>
                <Link 
                  href="/personas" 
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }}
                >
                  Find Your Path
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--muted-2)' }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }}
                >
                  About The Arc
                </Link>
              </li>
              <li>
                <Link 
                  href="/events" 
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--muted-2)' }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--muted-2)' }}
            >
              Connect
            </h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/company/thearchealth" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors" 
                aria-label="LinkedIn"
                style={{ color: 'var(--muted-2)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted-2)';
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/thearc.origin?igsh=MTc2NXc4dDdoemJxYg%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors" 
                aria-label="Instagram"
                style={{ color: 'var(--muted-2)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted-2)';
                }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61554963191647" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors" 
                aria-label="Facebook"
                style={{ color: 'var(--muted-2)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted-2)';
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Logo and Copyright */}
        <div className="pt-8 border-t border-token flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-semibold" style={{ color: accentColor }}>TheArc</div>
          <p 
            className="text-sm"
            style={{ color: 'var(--muted-2)' }}
          >
            © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
