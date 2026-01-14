"use client";

import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

interface EditorialSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "narrow" | "medium" | "wide";
}

/**
 * Editorial Section Template
 * Single column, left-aligned layout
 * Use for narrative content, problem statements, thesis sections
 */
export default function EditorialSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  maxWidth = "medium",
}: EditorialSectionProps) {
  const maxWidthClass = {
    narrow: "max-w-[42ch]",
    medium: "max-w-[56ch]",
    wide: "max-w-[70ch]",
  }[maxWidth];

  return (
    <Section id={id} variant="editorial" className={className}>
      <div className={maxWidthClass}>
        <SectionHeader 
          eyebrow={eyebrow}
          title={title}
          intro={intro}
        />
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </Section>
  );
}


