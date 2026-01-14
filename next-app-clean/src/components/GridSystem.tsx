"use client";

import React from "react";

interface GridSystemProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
  gap?: "small" | "medium" | "large";
}

export default function GridSystem({ 
  children, 
  columns = 3, 
  className = "",
  gap = "medium"
}: GridSystemProps) {
  const gapClass = gap === "small" ? "gap-4" : gap === "large" ? "gap-12" : "gap-8";
  const gridClass = columns === 2 ? "grid-two-column" : columns === 3 ? "grid-three-column" : "grid-four-column";
  
  return (
    <div className={`${gridClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
}

