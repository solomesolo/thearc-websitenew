"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./styles.css";
import Core from "./Core";

const pointDefinitions = [
  {
    number: "01",
    title: "Unified Health Identity",
    description: "All your data, finally in one place.",
    details: [
      "72% faster detection of risk patterns.",
      "No missing labs. No lost reports. No app chaos.",
    ],
  },
  {
    number: "02",
    title: "Personal Risk Radar",
    description: "Your top 2–3 biological risks, revealed instantly.",
    details: [
      "Early insights cut long-term complications by up to 40%.",
      "Detects stress, inflammation, metabolic drift before symptoms.",
    ],
  },
  {
    number: "03",
    title: "Predisposition Map",
    description: "See your long-term risks years before they activate.",
    details: [
      "Predictive modelling identifies elevation 5–10 years earlier.",
      "Prevents the silent drift most people miss until too late.",
    ],
  },
  {
    number: "04",
    title: "Precision Screening Plan",
    description: "Only the tests that matter for your biology.",
    details: [
      "Removes 60–70% of unnecessary testing.",
      "Up to 3× higher diagnostic accuracy vs standard checkups.",
    ],
  },
  {
    number: "05",
    title: "Adaptive Strategy",
    description: "Your plan updates every month automatically.",
    details: [
      "Users see gains in energy, sleep & biomarkers within 6–12 weeks.",
      "Adjusts instantly to stress, hormones, travel, and life changes.",
    ],
  },
  {
    number: "06",
    title: "Global Health Marketplace",
    description: "Vetted diagnostics and specialists in one place.",
    details: [
      "Over 300 validated labs, tests, and clinicians.",
      "Results return 2–4× faster than traditional clinics.",
    ],
  },
  {
    number: "07",
    title: "Medical Knowledge Engine",
    description: "Clear, evidence-based guidance without noise.",
    details: [
      "Cuts misinformation exposure by 90%.",
      "Understand your biomarkers in minutes.",
    ],
  },
  {
    number: "08",
    title: "Largest Preventive Dataset",
    description: "ARC learns from millions of real-world patterns.",
    details: [
      "Becomes more accurate every month.",
      "Models trained on preventive outcomes, not trends.",
    ],
  },
];

// Positioning for points around silhouette
// Symmetric distances: left/right and top/bottom are equal
// Silhouette is centered at ~50% horizontally and vertically
const pointPositions = [
  { x: 12, y: 10 },   // 01 - top-left (symmetric with right side)
  { x: 88, y: 10 },   // 02 - top-right (symmetric with left side)
  { x: 88, y: 38 },   // 03 - mid-right (symmetric with left side)
  { x: 12, y: 38 },   // 04 - mid-left (symmetric with right side)
  { x: 88, y: 66 },   // 05 - bottom-right (symmetric with left side)
  { x: 12, y: 66 },   // 06 - bottom-left (symmetric with right side)
  { x: 50, y: 85 },   // 07 - bottom-center (higher, but below silhouette)
  { x: 50, y: 8 },    // 08 - top-center (symmetric with bottom)
];

export const HealthOSSection: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [isInView, setIsInView] = useState(false);

  const sectionOpacity = useTransform(scrollYProgress, [0.0, 0.15], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      className="healthint-section"
      style={{ opacity: sectionOpacity }}
    >
      <div className="healthint-inner">
        <div className="healthint-label">INTELLIGENCE</div>
        <h2 className="healthint-title">
          Other products give data. ARC gives you a health intelligence system.
        </h2>
        <p className="healthint-subtitle">
          Apps track steps. Wearables show numbers. Clinics give one-time results.
        </p>

        <div className="healthint-layout">
          <div className="healthint-radial">
            <motion.div
              className="silhouette-motion-wrapper"
              style={{ opacity: sectionOpacity }}
            >
              <Core />
            </motion.div>

            {pointDefinitions.map((point, idx) => {
              const position = pointPositions[idx];
              const delay = idx * 0.1;

              return (
                <motion.div
                  key={point.number}
                  className={`intelligence-point point-${point.number}`}
                  style={{
                    // Only set top via inline style, left is controlled by CSS for symmetry
                    top: `${position.y}%`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: delay,
                    ease: "easeOut",
                  }}
                >
                  {/* Text content */}
                  <div className="point-content">
                    <h4 className="point-title">{point.title}</h4>
                    <p className="point-description">{point.description}</p>
                    <ul className="point-details">
                      {point.details.map((detail, detailIdx) => (
                        <li key={detailIdx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HealthOSSection;
