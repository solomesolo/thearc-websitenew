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
    px-10 py-4
    rounded-[3rem]
    bg-black
    text-[#7CFFB2]
    border-[1px]
    border-transparent
    text-[1.1rem]
    font-semibold
    transition-all
    duration-[250ms]
    ease-out
    hover:text-[#14F195]
    hover:shadow-[0_0_25px_rgba(20,241,149,0.25)]
    hover:-translate-y-[1px]
  `;

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(black, black), linear-gradient(135deg, #14F195, #7CFFB2)`,
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    WebkitBackgroundClip: "padding-box, border-box",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
        style={gradientStyle}
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
      style={gradientStyle}
      {...props}
    >
      {children}
    </button>
  );
}

