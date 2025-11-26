"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import styles from "./ArcHealthOSLayers.module.css";

const layers = [
  {
    label: "Layer 01 — Intake",
    title: "ARC interprets your biology from the first interaction.",
    bullets: ["3-minute screening", "Early pattern recognition", "Predisposition mapping", "First “health fingerprint”"],
  },
  {
    label: "Layer 02 — Intelligence Engine",
    title: "ARC constructs your dynamic biological model.",
    bullets: ["wearables", "biological drivers", "your inputs", "health graph + risk radar", "long-term predisposition map"],
  },
  {
    label: "Layer 03 — Strategy Engine",
    title: "ARC generates your adaptive plan.",
    bullets: ["what’s drifting", "what to test", "what to monitor", "what’s improving", "what to change"],
  },
  {
    label: "Layer 04 — Ecosystem",
    title: "Your OS connects you to real solutions.",
    bullets: ["at-home diagnostics", "specialists", "global screenings", "community + events", "vetted partner services"],
  },
];

const layerOffsets = [
  { x: -40, y: 40 },
  { x: -20, y: 20 },
  { x: 0, y: 0 },
  { x: 20, y: -20 },
] as const;

const ranges = [
  [0.0, 0.25],
  [0.2, 0.5],
  [0.45, 0.75],
  [0.7, 1],
];

export function ArcHealthOSLayers() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const updateMobile = (mq: MediaQueryList | MediaQueryListEvent) => {
      const matches = "matches" in mq ? mq.matches : mq.target?.matches ?? false;
      setIsMobile(matches);
    };
    const mql = window.matchMedia("(max-width: 768px)");
    updateMobile(mql);
    const handler = (event: MediaQueryListEvent) => updateMobile(event);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    const next = ranges.reduce((acc, [start], idx) => (latest >= start ? idx : acc), 0);
    setActiveIndex(next);
  });

  const layerStyles = ranges.map(([start, end], idx) => {
    const opacity = useTransform(scrollYProgress, [start - 0.1, start, end], [0, 1, 1]);
    const y = useTransform(scrollYProgress, [start - 0.1, start, end], [40, 0, 0]);
    const scale = useTransform(scrollYProgress, [start - 0.1, start, end], [0.9, 1, 1]);
    const isActive = activeIndex === idx;
    return { opacity, y, scale, isActive };
  });

  const handleSelect = (idx: number) => {
    if (isMobile) setActiveIndex(idx);
  };

  return (
    <section ref={ref} className={styles.section} id="arc-healthos-layers">
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <p className={styles.tag}>ARC HEALTHOS</p>
          <h2>The intelligence system that layers your biology step-by-step.</h2>
          <p>One OS composed of four engineered layers that build on top of each other as you move from intake to ecosystem.</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.stackColumn}>
            <div className={styles.stackFrame}>
              {layers.map((layer, idx) => {
                const { opacity, y, scale, isActive } = layerStyles[idx];
                const offset = layerOffsets[idx];
                return (
                  <div
                    key={layer.label}
                    className={styles.layerShell}
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, zIndex: idx + 1 + (isActive ? 10 : 0) }}
                  >
                    <motion.div
                      className={`${styles.layer} ${isActive ? styles.layerActive : ""}`}
                      style={{ opacity, y, scale }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      aria-hidden={!isActive}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.textColumn}>
            {layers.map((layer, idx) => (
              <button
                key={layer.label}
                type="button"
                className={`${styles.textBlock} ${activeIndex === idx ? styles.textBlockActive : ""}`}
                onClick={() => handleSelect(idx)}
              >
                <span className={styles.textOverline}>{layer.label}</span>
                <h3>{layer.title}</h3>
                <ul>
                  {layer.bullets.map((item) => (
                    <li key={`${layer.label}-${item}`}>{item}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArcHealthOSLayers;
