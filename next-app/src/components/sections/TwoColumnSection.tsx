"use client";

import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Panel from "./Panel";

interface TwoColumnSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: "40%" | "45%" | "50%";
  rightWidth?: "60%" | "55%" | "50%";
  rightIsPanel?: boolean;
  className?: string;
}

/**
 * Two-Column Section Template
 * Text left, visual/panel right
 * Use for content + visual, content + panel, etc.
 */
export default function TwoColumnSection({
  id,
  eyebrow,
  title,
  intro,
  leftContent,
  rightContent,
  leftWidth = "45%",
  rightWidth = "55%",
  rightIsPanel = false,
  className = "",
}: TwoColumnSectionProps) {
  return (
    <Section id={id} variant="two-column" className={className}>
      {/* Header - spans full width */}
      {(eyebrow || title || intro) && (
        <SectionHeader 
          eyebrow={eyebrow}
          title={title}
          intro={intro}
        />
      )}
      
      {/* Two-column grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start`}
      >
        {/* Left: Text content */}
        <div className="space-y-6">
          {leftContent}
        </div>

        {/* Right: Visual/Panel */}
        <div>
          {rightIsPanel ? (
            <Panel>
              {rightContent}
            </Panel>
          ) : (
            <div className="space-y-6">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

