"use client";

import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Panel from "./Panel";

interface GridSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: Array<{
    title?: string;
    content: React.ReactNode;
  }>;
  columns?: 2 | 3 | 4;
  usePanels?: boolean;
  className?: string;
}

/**
 * Grid Cards Section Template
 * Use for features, capabilities, cards
 */
export default function GridSection({
  id,
  eyebrow,
  title,
  intro,
  items,
  columns = 3,
  usePanels = true,
  className = "",
}: GridSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[columns];

  return (
    <Section id={id} variant="grid" className={className}>
      {/* Header */}
      <SectionHeader 
        eyebrow={eyebrow}
        title={title}
        intro={intro}
      />

      {/* Grid */}
      <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
        {items.map((item, index) => (
          <div key={index}>
            {usePanels ? (
              <Panel>
                {item.title && (
                  <h3 className="typography-h3 mb-4">
                    {item.title}
                  </h3>
                )}
                {item.content}
              </Panel>
            ) : (
              <div className="space-y-4">
                {item.title && (
                  <h3 className="typography-h3 mb-4">
                    {item.title}
                  </h3>
                )}
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}


