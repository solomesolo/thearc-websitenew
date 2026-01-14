"use client";

import React from "react";

interface NodeProps {
  index: number;
  numberLabel: string;
  label: string;
  position: { x: number; y: number };
  active: boolean;
  onSelect: (index: number) => void;
  isMobile?: boolean;
}

// Position mapping for radial labels
const positionClasses = [
  "intel-label-top-left",      // 01
  "intel-label-top-right",     // 02
  "intel-label-mid-right",     // 03
  "intel-label-mid-left",      // 04
  "intel-label-bottom-right",  // 05
  "intel-label-bottom-left",   // 06
  "intel-label-bottom-center", // 07
  "intel-label-top-center",    // 08
];

export const Node: React.FC<NodeProps> = ({
  index,
  numberLabel,
  label,
  position,
  active,
  onSelect,
  isMobile,
}) => {
  const positionClass = positionClasses[index] || "";

  return (
    <div
      className={`intel-label ${positionClass} ${active ? "active" : ""}`}
      data-step={numberLabel}
      onClick={() => onSelect(index)}
    >
      <span className="intel-badge">{numberLabel}</span>
      <span className="intel-text">{label}</span>
    </div>
  );
};

export default Node;

