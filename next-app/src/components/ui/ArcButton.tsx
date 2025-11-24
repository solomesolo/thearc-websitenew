"use client";

import React from "react";
import Link from "next/link";

interface ArcButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function ArcButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  ...props
}: ArcButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    px-8 py-3.5
    rounded-full
    bg-black
    text-[#4DEECD]
    border
    border-white/20
    text-base
    font-medium
    tracking-tight
    transition-all
    duration-200
    ease-out
    hover:border-white/30
    hover:text-[#4DEECD]
    hover:bg-black
  `;

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

