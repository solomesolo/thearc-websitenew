"use client";

import React from "react";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
}

export default function Hero({ title, subtitle, primaryCTA, secondaryCTA }: HeroProps) {
  return (
    <section className="hero-wrapper bg-black">
      <div className="relative w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-36 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-tight text-white max-w-[12ch]">
            {title}
          </h1>

          <p className="mt-6 text-lg lg:text-xl leading-relaxed text-gray-300 max-w-[55ch]">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* Primary CTA */}
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 bg-white text-black text-base font-medium tracking-tight transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              {primaryCTA.label}
            </Link>

            {/* Secondary CTA */}
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium tracking-tight border border-white/30 text-white bg-transparent transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              {secondaryCTA.label}
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN IMAGE */}
        <div className="relative w-full">
          <div className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
            <img
              src="/my-hero-image.webp"
              alt="The Arc portrait visual"
              className="w-full h-auto object-cover object-[70%_40%]"
              style={{
                filter: "saturate(0.95) contrast(1.05) brightness(0.96)"
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
}
