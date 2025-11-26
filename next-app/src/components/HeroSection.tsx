"use client";

import React from "react";
import { ArcButton } from "./ui/ArcButton";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  bullets?: string[];
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  image?: { src: string; alt?: string };
}

export function HeroSection({
  title,
  subtitle,
  bullets = [],
  primaryCTA,
  secondaryCTA,
  image = { src: "/header main page.png", alt: "ARC hero visual" },
}: HeroSectionProps) {
  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: `url('${image.src.replace(/ /g, "%20")}')`,
        backgroundSize: "cover",
        backgroundPosition: "center 85%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#050505",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.25),rgba(0,0,0,0.65))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 py-24 md:py-28 lg:py-32 min-h-[80vh] flex flex-col items-center justify-center gap-10 text-center">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed tracking-tight">
            {subtitle}
          </p>

          {bullets.length > 0 && (
            <div className="space-y-1 text-lg text-gray-200 leading-relaxed">
              {bullets.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <ArcButton href={primaryCTA.href}>{primaryCTA.label}</ArcButton>
            {secondaryCTA && (
              <ArcButton
                href={secondaryCTA.href}
                className="border border-white/30 text-[#4DEECD] bg-transparent"
              >
                {secondaryCTA.label}
              </ArcButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

