"use client";

import React from "react";

interface ImagePlaceholderProps {
  height?: string | number;
  width?: string | number;
  className?: string;
  label?: string;
}

export default function ImagePlaceholder({ 
  height = "400px", 
  width = "100%", 
  className = "",
  label = "Image placeholder"
}: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-[#111111] flex items-center justify-center ${className}`}
      style={{
        width: width,
        height: height,
        borderRadius: '8px'
      }}
    >
      <span className="text-gray-500 text-sm text-center px-4">
        {label}
      </span>
    </div>
  );
}

