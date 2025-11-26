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

export const Node: React.FC<NodeProps> = ({
  index,
  numberLabel,
  label,
  position,
  active,
  onSelect,
  isMobile,
}) => {
  const style = isMobile
    ? undefined
    : {
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      };

  return (
    <button
      type="button"
      className={`node ${active ? "active" : ""}`}
      style={style}
      onClick={() => onSelect(index)}
    >
      <span className="node-circle">
        <span className="node-number-text">{numberLabel}</span>
      </span>
      <span className="node-label">{label}</span>
    </button>
  );
};

export default Node;

