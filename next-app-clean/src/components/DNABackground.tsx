"use client";
import React from "react";

const WAVE_WIDTH = 1920;
const WAVE_HEIGHT = 1080;
const getAmplitude = () => (typeof window !== "undefined" && window.innerWidth < 768 ? 200 : 120);
const getYOffset = () => (typeof window !== "undefined" && window.innerWidth < 768 ? 350 : 600);
const FREQUENCY = 1; // Only one full arc across the width
const STROKE_WIDTH = 16;

// Generate a perfectly tiling sine wave path, starting and ending off-canvas
function generateSineWavePath(width: number, amplitude: number, frequency: number, yOffset: number) {
  const points = [];
  const steps = 120;
  // Start a half period before 0, end a half period after width
  for (let i = -steps / 2; i <= steps + steps / 2; i++) {
    const x = (i / steps) * width;
    const y = yOffset + amplitude * Math.sin((frequency * 2 * Math.PI * x) / width);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")}`;
}

const sinePath = typeof window !== "undefined"
  ? generateSineWavePath(WAVE_WIDTH, getAmplitude(), FREQUENCY, getYOffset())
  : generateSineWavePath(WAVE_WIDTH, 120, FREQUENCY, 600);

const DNABackground: React.FC = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
      background: "#000",
      margin: 0,
      padding: 0,
    }}
  >
    <svg
      width="200%"
      height="100%"
      viewBox={`0 0 ${WAVE_WIDTH * 2} ${WAVE_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        minWidth: "200vw",
        minHeight: "100vh",
        width: "200vw",
        height: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <defs>
        <linearGradient
          id="waveGradient"
          x1="0"
          y1="0"
          x2={`${WAVE_WIDTH * 2}`}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        style={{
          animation: `waveLoop 24s linear infinite`,
          filter: "url(#glow)",
          opacity: 0.7,
        }}
      >
        {/* First seamless sine wave */}
        <path
          d={sinePath}
          stroke="url(#waveGradient)"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {/* Second seamless sine wave, offset by one period */}
        <path
          d={
            // Shift the path by WAVE_WIDTH to the right
            sinePath.replace(/(\-?\d+(?:\.\d+)?),(\-?\d+(?:\.\d+)?)/g, (m, x, y) => `${parseFloat(x) + WAVE_WIDTH},${y}`)
          }
          stroke="url(#waveGradient)"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
      </g>
      <style>{`
        @keyframes waveLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${WAVE_WIDTH}px); }
        }
      `}</style>
    </svg>
  </div>
);

export default DNABackground; 