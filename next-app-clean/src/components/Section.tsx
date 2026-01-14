"use client";

import React from "react";
import Container from "./Container";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: "black" | "dark";
}

export default function Section({ id, children, className = "", background = "black" }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`bg-black ${className}`}
    >
      <Container applySectionSpacing={true}>
        {children}
      </Container>
    </section>
  );
}

