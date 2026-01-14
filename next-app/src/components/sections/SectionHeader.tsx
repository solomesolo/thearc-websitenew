"use client";

import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}

/**
 * Section Header component with consistent eyebrow + title + intro
 * Always left-aligned (no centered text blocks floating mid-screen)
 */
export default function SectionHeader({
  eyebrow,
  title,
  intro,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${className}`}>
      {eyebrow && (
        <p className="typography-eyebrow mb-6">
          {eyebrow}
        </p>
      )}
      <h2 className="typography-h2 mb-6">
        {title}
      </h2>
      {intro && (
        <p 
          className="typography-body"
          style={{ maxWidth: '60ch' }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}


