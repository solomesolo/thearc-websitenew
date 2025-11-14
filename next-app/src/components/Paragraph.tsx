"use client";

import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: boolean;
  style?: React.CSSProperties;
}

export default function Paragraph({ children, className = "", maxWidth = true, style }: ParagraphProps) {
  const defaultStyle: React.CSSProperties = {
    lineHeight: '1.7',
    ...(maxWidth ? { maxWidth: '700px' } : {}),
    ...style
  };
  
  return (
    <p 
      className={`text-[#CCCCCC] ${className}`}
      style={defaultStyle}
    >
      {children}
    </p>
  );
}

