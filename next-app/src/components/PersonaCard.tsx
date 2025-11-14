"use client";

import Link from "next/link";
import React from "react";

interface PersonaCardProps {
  title: string;
  description: string;
  href: string;
  imagePlaceholder?: React.ReactNode;
}

export default function PersonaCard({ title, description, href, imagePlaceholder }: PersonaCardProps) {
  return (
    <Link
      href={href}
      className="group relative h-[400px] rounded-lg overflow-hidden border-2 border-white hover:border-[#4DE4C1] transition-all block"
    >
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gray-900">
        {imagePlaceholder || (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500 text-sm text-center px-4">{description}</p>
          </div>
        )}
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-3xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-[#E0E0E0] mb-4 leading-relaxed">{description}</p>
        <span className="text-[#4DE4C1] font-semibold group-hover:underline inline-flex items-center gap-2">
          Explore this path →
        </span>
      </div>
    </Link>
  );
}

