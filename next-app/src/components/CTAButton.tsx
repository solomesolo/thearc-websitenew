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
        className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black ${className}`}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black ${className}`}
    >
      {children}
    </Link>
  );
}

