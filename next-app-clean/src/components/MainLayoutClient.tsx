"use client";
import React from "react";
import HeroWithOverlay from "./HeroWithOverlay";
import { usePathname } from "next/navigation";

export default function MainLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOverlay = ["/contact", "/privacy-policy", "/terms"].includes(pathname);
  // Pages with footers: persona pages, main page, and about/method pages
  const hasFooter = pathname === "/" || pathname.startsWith("/women") || pathname.startsWith("/traveler") || pathname.startsWith("/rebuilder") || pathname === "/about" || pathname === "/method";

  return (
    <main className={`flex-1 flex flex-col relative z-10 ${!isOverlay && !hasFooter ? 'pb-32' : ''}`}>
      {/* <HeroWithOverlay /> */}
      {children}
    </main>
  );
} 