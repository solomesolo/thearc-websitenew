"use client";

import React from "react";

interface WhyItWorksProps {
  title?: string;
  subtitle?: string;
  items?: string[];
  backgroundImage?: string;
}

const defaultItems = [
  "One medical system that follows you",
  "Portability across countries",
  "Routines that stabilise your biology",
  "Stronger immunity on the move",
  "Predictable screenings and health monitoring",
  "At-home medical services worldwide",
  "A lifespan strategy built for global living",
];

export default function WhyItWorks({
  title = "Why It Works for Travellers",
  subtitle = "One medical partner. One continuity plan. Wherever you live next.",
  items = defaultItems,
  backgroundImage = "/why it works for travellers.jpg",
}: WhyItWorksProps) {
  const isMenopause = title?.toLowerCase().includes("menopause");
  const isTraveler = title?.toLowerCase().includes("traveller") || title?.toLowerCase().includes("traveler");
  const isRebuilder = title?.toLowerCase().includes("rebuilder");
  
  // Two-column layout with portrait for all personas
  if (isMenopause || isTraveler || isRebuilder) {
    // Determine persona-specific content
    let portraitImage = "/images/menopause-portrait.jpg";
    let portraitLabel = "Women in Menopause";
    let portraitText = "One continuous health system for the most important transition since puberty.";
    let sectionId = "why-it-works-menopause";

    if (isTraveler) {
      portraitImage = "/images/traveler-portrait.jpg";
      portraitLabel = "Digital Nomads & Travelers";
      portraitText = "One medical partner. One continuity plan. Wherever you live next.";
      sectionId = "why-it-works-traveler";
    } else if (isRebuilder) {
      portraitImage = "/images/rebuilder-portrait.jpg";
      portraitLabel = "Health Rebuilders";
      portraitText = "A clear, structured path to rebuild stability, energy, and confidence.";
      sectionId = "why-it-works-rebuilder";
    }

    return (
      <section
        id={sectionId}
        className="py-24 md:py-28"
      >
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/55">
              Why It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              {title}
            </h2>
            <p className="text-base md:text-lg text-white/70">
              {subtitle}
            </p>
          </div>

          {/* Content layout: left = benefits, right = portrait tile */}
          <div className="mt-12 md:mt-14 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
            {/* LEFT: Benefit pills */}
            <div className="grid gap-4 md:gap-5 md:grid-cols-2">
              {items.map((item, index) => (
                <div 
                  key={index}
                  className="rounded-2xl bg-white/5 border border-white/6 px-5 py-4 md:px-6 md:py-5"
                >
                  <p className="text-sm md:text-base font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT: Portrait tile */}
            <div className="flex md:justify-end">
              <div
                className="
                  relative
                  w-full max-w-xs md:max-w-sm
                  aspect-[3/4]
                  rounded-3xl
                  overflow-hidden
                  border border-white/10
                  bg-white/5
                  bg-gradient-to-b from-white/10 via-white/3 to-transparent
                  shadow-[0_30px_80px_rgba(0,0,0,0.75)]
                  backdrop-blur-xl
                "
              >
                {/* image */}
                <img
                  src={portraitImage}
                  alt={portraitLabel}
                  className="h-full w-full object-cover"
                />

                {/* soft dark mask for blending into background */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />

                {/* label + microcopy */}
                <div className="pointer-events-none absolute inset-x-5 bottom-5">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/70">
                    {portraitLabel}
                  </p>
                  <p className="mt-1 text-sm text-white/85 leading-snug">
                    {portraitText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // Default layout for other personas
  return (
    <section className="py-20 md:py-24">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/60">
            Why It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold">
            {title}
          </h2>
          <p className="text-base md:text-lg text-white/70">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <div 
              key={index}
              className="rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-6"
            >
              <p className="text-white/90 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


