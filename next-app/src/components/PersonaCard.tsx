"use client";

import Link from "next/link";
import React from "react";

interface PersonaCardProps {
  title: string;
  description: string;
  href: string;
  imagePlaceholder?: React.ReactNode;
}

export default function PersonaCard({ title, description, href }: PersonaCardProps) {
  return (
    <Link
      href={href}
      className="path-card group h-full flex flex-col justify-between rounded-2xl border border-white/20 bg-gradient-to-b from-[#0e1218] to-[#040609] p-6 transition-all duration-300 hover:border-teal-400/70 hover:shadow-[0_0_30px_-5px_rgba(45,255,210,0.3)]"
    >
      <div className="spotlight" aria-hidden="true" />
      <div className="space-y-4 text-left">
        <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
      <span className="text-[#4DE4C1] font-semibold inline-flex items-center gap-2 mt-6 group-hover:gap-3 transition-all">
        Explore this path →
      </span>
    </Link>
  );
}

