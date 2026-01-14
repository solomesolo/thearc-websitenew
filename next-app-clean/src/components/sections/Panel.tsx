"use client";

import React from "react";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Panel component with consistent border, radius, and padding
 * Used for cards, sidebars, and visual containers
 */
export default function Panel({ 
  children, 
  className = "" 
}: PanelProps) {
  return (
    <div 
      className={`
        rounded-2xl 
        border border-token
        p-8 md:p-10
        relative overflow-hidden
        ${className}
      `}
      style={{ 
        backgroundColor: 'var(--panel-bg)',
      }}
    >
      {/* Optional subtle radial highlight */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(77, 228, 193, 0.2) 0%, transparent 70%)',
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}


