"use client";
import React from "react";
import HeroWithOverlay from "./HeroWithOverlay";
import { usePathname } from "next/navigation";

export default function MainLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOverlay = ["/about", "/contact", "/privacy-policy", "/terms"].includes(pathname);
  // Pages with footers: persona pages and main page
  const hasFooter = pathname === "/" || pathname.startsWith("/women") || pathname.startsWith("/traveler") || pathname.startsWith("/rebuilder");

  return (
    <main className={`flex-1 flex flex-col relative z-10 ${!isOverlay && !hasFooter ? 'pb-32' : ''}`}>
      {/* <HeroWithOverlay /> */}
      {children}
    </main>
  );
} 