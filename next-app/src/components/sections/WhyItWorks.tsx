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
  return (
    <section className="why-works-section">
      <div 
        className="why-works-bg"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      <div className="why-works-content">
        <h2 className="why-works-title">
          {title}
          <span className="why-works-underline"></span>
        </h2>

        <p className="why-works-subtitle">
          {subtitle}
        </p>

        <ul className="why-works-list">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}


