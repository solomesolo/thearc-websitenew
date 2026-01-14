"use client";

import React from "react";

interface TwoColumnProps {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
  className?: string;
  gap?: "mobile" | "desktop";
}

export default function TwoColumn({ 
  left, 
  right, 
  reverse = false, 
  className = "",
  gap = "desktop"
}: TwoColumnProps) {
  const gapDesktop = gap === "desktop" ? "80px" : "40px";
  const gapMobile = "40px";
  
  return (
    <div 
      className={`grid grid-cols-1 lg:grid-cols-2 ${reverse ? 'lg:grid-flow-dense' : ''} ${className}`}
      style={{
        gap: `clamp(${gapMobile}, 5vw, ${gapDesktop})`
      }}
    >
      <div className={reverse ? "lg:col-start-2" : ""}>
        {left}
      </div>
      <div className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
        {right}
      </div>
    </div>
  );
}

