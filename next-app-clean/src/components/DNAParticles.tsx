"use client";

import React, { useEffect, useRef, useState } from "react";

const NUM_PARTICLES = 180;
function getAmplitudeRatio(width: number) {
  if (width < 600) return 0.32; // mobile
  if (width < 900) return 0.26; // tablet
  return 0.22; // desktop
}
const SPEED = 0.0005;
const COLOR = "#d946ef";

export default function DNAParticles() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let frame: number;
    const svg = ref.current;
    if (!svg) return;
    const particles = Array.from(svg.querySelectorAll("circle"));
    const width = dimensions.width;
    const height = dimensions.height;
    const amplitude = height * getAmplitudeRatio(width);
    const yOffset = height / 2;
    const xStart = 0;
    const xEnd = width;
    function animate(time: number) {
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const t = (i / NUM_PARTICLES) * Math.PI * 4 + time * SPEED;
        const x = xStart + (i / NUM_PARTICLES) * (xEnd - xStart);
        const y = yOffset + Math.sin(t) * amplitude;
        if (particles[i]) {
          particles[i].setAttribute("cx", x.toString());
          particles[i].setAttribute("cy", y.toString());
        }
        const y2 = yOffset + Math.cos(t) * amplitude * 0.95;
        if (particles[i + NUM_PARTICLES]) {
          particles[i + NUM_PARTICLES].setAttribute("cx", x.toString());
          particles[i + NUM_PARTICLES].setAttribute("cy", y2.toString());
        }
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [dimensions, mounted]);

  if (!mounted) return null;

  const width = dimensions.width;
  const height = dimensions.height;

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.45,
        background: "transparent",
        transition: "width 0.2s, height 0.2s",
        display: "block",
        objectFit: "cover",
      }}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <clipPath id="dna-clip">
          <rect x="0" y="0" width={width} height={height} />
        </clipPath>
      </defs>
      <g clipPath="url(#dna-clip)">
        {Array.from({ length: NUM_PARTICLES * 2 }).map((_, i) => (
          <circle
            key={i}
            r="3.5"
            fill={COLOR}
            opacity="0.7"
          />
        ))}
      </g>
    </svg>
  );
} 