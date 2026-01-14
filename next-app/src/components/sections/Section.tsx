"use client";

import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "editorial" | "two-column" | "grid";
}

/**
 * Base Section wrapper with consistent padding and background
 * Enforces consistent section templates to eliminate random text placement
 */
export default function Section({ 
  id, 
  children, 
  className = "",
  variant = "default"
}: SectionProps) {
  return (
    <section 
      id={id}
      className={`
        relative z-10 
        py-24 md:py-32 
        px-6 md:px-10
        ${className}
      `}
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.05) 0%, transparent 60%)',
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
}


