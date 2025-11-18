"use client";

import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ children, subtitle, className = "" }: SectionTitleProps) {
  return (
    <div className={className}>
      <h2 
        className="font-bold text-white mb-0"
        style={{
          fontSize: 'clamp(32px, 4vw, 42px)',
          lineHeight: '1.2'
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p 
          className="text-[#CCCCCC]"
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            marginTop: '12px'
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

