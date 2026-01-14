"use client";
import { usePathname } from "next/navigation";
import Hero from "./Hero";

export default function HeroWithOverlay() {
  const pathname = usePathname();
  const isOverlay = ["/about", "/contact", "/privacy-policy", "/terms"].includes(pathname);
  return (
    <div className={isOverlay ? "transition-all duration-300 filter blur-md brightness-50" : "transition-all duration-300"}>
      <Hero />
    </div>
  );
} 