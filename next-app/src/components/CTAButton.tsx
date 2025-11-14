"use client";

import Link from "next/link";
import React from "react";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CTAButton({ href, children, variant = "primary", className = "" }: CTAButtonProps) {
  if (variant === "primary") {
    return (
      <Link
        href={href}
        className={`px-8 py-4 bg-[#4DE4C1] text-black font-semibold rounded-lg transition-all text-center hover:shadow-[0_0_20px_rgba(77,228,193,0.4)] ${className}`}
        style={{
          borderRadius: '8px'
        }}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link
      href={href}
      className={`px-8 py-4 border border-[#4DE4C1] text-white font-semibold rounded-lg transition-all text-center hover:bg-[#4DE4C1] hover:bg-opacity-10 hover:shadow-[0_0_20px_rgba(77,228,193,0.2)] ${className}`}
      style={{
        borderRadius: '8px',
        background: 'transparent',
        borderWidth: '1px'
      }}
    >
      {children}
    </Link>
  );
}

