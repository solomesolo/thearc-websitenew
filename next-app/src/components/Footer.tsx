"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps {
  accentColor?: string;
}

export default function Footer({ accentColor = '#4DE4C1' }: FooterProps) {
  const pathname = usePathname();
  const isOverlay = ["/about", "/contact", "/privacy-policy", "/terms"].includes(pathname);
  // On desktop: always show. On mobile/tablet: show only if not overlay.
  return (
    <footer className={`w-full px-6 md:px-12 py-12 bg-black border-t border-gray-800 ${isOverlay ? 'hidden md:block' : 'block'} mt-auto`}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Logo and copyright */}
          <div>
            <div className="text-2xl font-bold mb-4" style={{ color: accentColor }}>TheArc</div>
            <p className="text-[#E0E0E0] text-sm">© 2025. All rights reserved.</p>
          </div>
          
          {/* Right: Links and Social */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-end gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Link href="/about" className="text-[#E0E0E0] transition-colors text-sm hover:opacity-80" style={{ color: '#E0E0E0', '--hover-color': accentColor } as React.CSSProperties & { '--hover-color': string }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'}>About</Link>
              <Link href="/method" className="text-[#E0E0E0] transition-colors text-sm hover:opacity-80" style={{ color: '#E0E0E0', '--hover-color': accentColor } as React.CSSProperties & { '--hover-color': string }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'}>Method</Link>
              <Link href="/personas" className="text-[#E0E0E0] transition-colors text-sm hover:opacity-80" style={{ color: '#E0E0E0', '--hover-color': accentColor } as React.CSSProperties & { '--hover-color': string }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'}>Personas</Link>
              <Link href="/contact" className="text-[#E0E0E0] transition-colors text-sm hover:opacity-80" style={{ color: '#E0E0E0', '--hover-color': accentColor } as React.CSSProperties & { '--hover-color': string }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'}>Contact</Link>
              <Link href="/privacy-policy" className="text-[#E0E0E0] transition-colors text-sm hover:opacity-80" style={{ color: '#E0E0E0', '--hover-color': accentColor } as React.CSSProperties & { '--hover-color': string }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'}>Privacy</Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/thearc" target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0] transition-colors hover:opacity-80" style={{ color: '#E0E0E0' }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'} aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/thearc_me" target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0] transition-colors hover:opacity-80" style={{ color: '#E0E0E0' }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'} aria-label="Instagram">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@thearc" target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0] transition-colors hover:opacity-80" style={{ color: '#E0E0E0' }} onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'} aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 