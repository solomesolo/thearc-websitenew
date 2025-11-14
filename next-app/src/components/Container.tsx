"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  applySectionSpacing?: boolean;
}

export default function Container({ 
  children, 
  className = "", 
  applySectionSpacing = false 
}: ContainerProps) {
  const spacingClass = applySectionSpacing ? "section-global" : "";
  
  return (
    <div className={`container-global ${spacingClass} ${className}`}>
      {children}
    </div>
  );
}

