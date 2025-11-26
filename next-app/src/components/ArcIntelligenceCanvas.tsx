"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import styles from "./ArcIntelligenceCanvas.module.css";

interface NodeItem {
  number: string;
  title: string;
  description: string;
}

const baseNodes: NodeItem[] = [
  { number: "01", title: "Unified health identity", description: "Your data normalized across borders." },
  { number: "02", title: "Personal risk radar", description: "The 3 areas your body is quietly struggling with." },
  { number: "03", title: "Predisposition map", description: "Where your long-term risks live before symptoms." },
  { number: "04", title: "Precision screening plan", description: "Stop guessing. Know exactly which tests matter." },
  { number: "05", title: "Monthly adaptive strategy", description: "Your plan updates as your life changes." },
  { number: "06", title: "Global health marketplace", description: "At-home tests, diagnostics, labs, and services." },
  { number: "07", title: "Community & real medical knowledge", description: "Live sessions, offline events, applied science." },
  { number: "08", title: "Largest preventive dataset", description: "Powering ARC’s intelligence." },
];

const gridSlots = [
  { top: 6, left: 15 },
  { top: 6, left: 50 },
  { top: 6, left: 85 },
  { top: 38, left: 15 },
  { top: 38, left: 50 },
  { top: 38, left: 85 },
  { top: 70, left: 15 },
  { top: 70, left: 50 },
];

interface PositionedNode extends NodeItem {
  position: { top: number; left: number };
}

const nodes: PositionedNode[] = baseNodes.map((node, index) => ({
  ...node,
  position: gridSlots[index],
}));

const NodeCard: React.FC<{
  node: PositionedNode;
  index: number;
  onActivate: (idx: number) => void;
}> = ({ node, index, onActivate }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <motion.div
      ref={ref}
      className={`${styles.nodeCard} ${inView ? styles.nodeActive : ""}`}
      style={{ top: `${node.position.top}%`, left: `${node.position.left}%` }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className={styles.nodeHeader}>
        <span className={`${styles.nodeNumber} ${inView ? styles.nodeNumberActive : ""}`}>{node.number}</span>
        <span className={styles.nodeIndicator} />
      </div>
      <h3 className={styles.nodeTitle}>{node.title}</h3>
      <p className={styles.nodeDescription}>{node.description}</p>
    </motion.div>
  );
};

export function ArcIntelligenceCanvas() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sphereY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  const [activeMap, setActiveMap] = useState<Record<number, boolean>>({});
  const [pulseKey, setPulseKey] = useState(0);

  const handleActivate = (index: number) => {
    setActiveMap((prev) => {
      if (prev[index]) return prev;
      const next = { ...prev, [index]: true };
      return next;
    });
  };

  useEffect(() => {
    if (Object.keys(activeMap).length) setPulseKey((prev) => prev + 1);
  }, [activeMap]);

  const connectors = useMemo(() => {
    const center = { x: 600, y: 450 };
    return nodes.map((node, idx) => {
      const x = (node.position.left / 100) * 1200;
      const y = (node.position.top / 100) * 900;
      const controlX = (x + center.x) / 2;
      const controlY = (y + center.y) / 2 + (y < center.y ? -90 : 90);
      const path = `M ${center.x} ${center.y} Q ${controlX} ${controlY} ${x} ${y}`;
      return { path, idx };
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headline}>
          <p className={styles.pretitle}>INTELLIGENCE</p>
          <h2 className={styles.title}>Other products give data. ARC gives you a health intelligence system.</h2>
          <p className={styles.subtitle}>Apps track steps. Wearables show numbers. Clinics give one-time results.</p>
        </div>

        <div className={styles.canvas}>
          <motion.div className={styles.sphereWrapper} style={{ y: sphereY }}>
            <div className={styles.sphereCore}>
              <div className={styles.sphereInnerRing} />
              <motion.div
                key={pulseKey}
                className={styles.sphereGlow}
                initial={{ scale: 0.95, opacity: 0.4 }}
                animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <div className={styles.nodesLayer}>
            {nodes.map((node, index) => (
              <NodeCard key={node.title} node={node} index={index} onActivate={handleActivate} />
            ))}
          </div>

          <svg className={styles.connectorSvg} viewBox="0 0 1200 900" preserveAspectRatio="none">
            {connectors.map(({ path, idx }) => (
              <motion.path
                key={path}
                d={path}
                className={styles.connectorPath}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: activeMap[idx] ? 1 : 0, opacity: activeMap[idx] ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                fill="none"
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

export default ArcIntelligenceCanvas;
