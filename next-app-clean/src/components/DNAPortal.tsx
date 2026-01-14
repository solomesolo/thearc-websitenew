import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import DNAParticles from "./DNAParticles";

export default function DNAPortal() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.top = "0";
      div.style.left = "0";
      div.style.width = "100vw";
      div.style.height = "100vh";
      div.style.zIndex = "-10";
      div.style.pointerEvents = "none";
      div.style.overflow = "hidden";
      div.style.background = "transparent";
      document.body.prepend(div);
      containerRef.current = div;
      return () => {
        if (containerRef.current) {
          document.body.removeChild(containerRef.current);
        }
      };
    }
  }, []);

  if (typeof window === "undefined" || !containerRef.current) return null;
  return createPortal(<DNAParticles />, containerRef.current);
} 