"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import "./styles.css";
import Core from "./Core";
import Node from "./Node";

const nodeDefinitions = [
  { number: "01", title: "Unified health identity", description: "Your data normalized across borders." },
  { number: "02", title: "Personal risk radar", description: "The 3 areas your body is quietly struggling with." },
  { number: "03", title: "Predisposition map", description: "Where your long-term risks live before symptoms." },
  { number: "04", title: "Precision screening plan", description: "Stop guessing. Know exactly which tests matter." },
  { number: "05", title: "Adaptive strategy", description: "Your plan updates as your life changes." },
  { number: "06", title: "Global health marketplace", description: "At-home tests, diagnostics, labs, and services." },
  { number: "07", title: "Community & medical knowledge", description: "Live sessions, offline events, applied science." },
  { number: "08", title: "Largest preventive dataset", description: "Powering ARC’s intelligence." },
];

const polarPositions = [
  { x: 20, y: 15 },
  { x: 50, y: 5 },
  { x: 80, y: 18 },
  { x: 15, y: 48 },
  { x: 85, y: 48 },
  { x: 25, y: 82 },
  { x: 50, y: 95 },
  { x: 78, y: 80 },
];

const thresholds = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75];

export const HealthOSSection: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = thresholds.reduce((acc, threshold, index) => (latest >= threshold ? index : acc), 0);
    setActiveIndex(idx);
  });

  const connectorPaths = useMemo(() => {
    const center = { x: 300, y: 300 };
    return polarPositions.map((pos) => {
      const x = (pos.x / 100) * 600;
      const y = (pos.y / 100) * 600;
      const controlX = (center.x + x) / 2;
      const controlY = (center.y + y) / 2;
      return `M ${center.x} ${center.y} Q ${controlX} ${controlY} ${x} ${y}`;
    });
  }, []);

  const coreOpacity = useTransform(scrollYProgress, [0.0, 0.1], [0, 1]);

  return (
    <section ref={ref} className="healthint-section">
      <div className="healthint-inner">
        <div className="healthint-label">INTELLIGENCE</div>
        <h2 className="healthint-title">Other products give data. ARC gives you a health intelligence system.</h2>
        <p className="healthint-subtitle">Apps track steps. Wearables show numbers. Clinics give one-time results.</p>

        <div className="healthint-layout">
          <div className="healthint-radial">
            <svg className="connector-svg" viewBox="0 0 600 600" preserveAspectRatio="none">
              {connectorPaths.map((path, idx) => (
                <motion.path
                  key={path}
                  d={path}
                  stroke="rgba(110,242,193,0.45)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: activeIndex === idx ? 1 : 0, opacity: activeIndex === idx ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                />
              ))}
            </svg>

            <motion.div style={{ opacity: coreOpacity }}>
              <Core />
            </motion.div>

            {nodeDefinitions.map((node, idx) => (
              <Node
                key={node.number}
                index={idx}
                numberLabel={node.number}
                label={node.title}
                position={polarPositions[idx]}
                active={activeIndex === idx}
                onSelect={setActiveIndex}
              />
            ))}
          </div>

          <motion.div
            className="description-panel"
            key={activeIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <h5>{nodeDefinitions[activeIndex].number}</h5>
            <h3>{nodeDefinitions[activeIndex].title}</h3>
            <p>{nodeDefinitions[activeIndex].description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HealthOSSection;

