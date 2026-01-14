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
      <div className="relative w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-36 grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 items-center">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col lg:-ml-10">
          <h1 className="text-4xl lg:text-5xl font-semibold leading-[1.06] tracking-tight text-white w-full max-w-none">
            {title}
          </h1>

          <p className="mt-6 text-lg lg:text-xl leading-relaxed text-gray-300 max-w-[55ch] whitespace-pre-line">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* Primary CTA */}
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
            >
              {primaryCTA.label}
            </Link>

            {/* Secondary CTA */}
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium tracking-tight border border-white/20 bg-black text-[#4DEECD] transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
            >
              {secondaryCTA.label}
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN IMAGE */}
        <div className="relative w-full lg:w-[150%] lg:justify-self-end lg:pr-0 lg:pl-4">
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
