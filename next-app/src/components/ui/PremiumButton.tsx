"use client";

import React from "react";
import Link from "next/link";

interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function PremiumButton({
  children,
  href,
  onClick,
  className = "",
}: PremiumButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-full
    h-[56px] md:h-[60px]
    px-10 md:px-12
    text-white
    font-medium
    tracking-[0.02em]
    text-base md:text-lg
    relative
    overflow-hidden
    transition-all duration-300 ease-out
    hover:scale-[1.02]
    bg-gradient-to-r from-[#14F195] to-[#7CFFB2]
    shadow-[0_0_20px_rgba(20,241,149,0.15),0_0_40px_rgba(20,241,149,0.08)]
    hover:shadow-[0_0_30px_rgba(20,241,149,0.25),0_0_60px_rgba(20,241,149,0.12)]
    hover:from-[#16F8A0] hover:to-[#84FFC5]
  `;

  const innerGlowClasses = `
    absolute inset-[1px]
    rounded-full
    bg-gradient-to-r from-[#14F195]/30 to-[#7CFFB2]/30
    blur-[8px]
    opacity-70
    pointer-events-none
  `;

  const contentClasses = `relative z-10`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
      >
        <span className={innerGlowClasses}></span>
        <span className={contentClasses}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      <span className={innerGlowClasses}></span>
      <span className={contentClasses}>{children}</span>
    </button>
  );
}

