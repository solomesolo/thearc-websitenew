"use client";

import "./HealthOSLayers.css";
import React from "react";

const layers = [
  {
    overline: "Intake layer — ARC learns you",
    title: "ARC interprets your biology from the first interaction.",
    bullets: [
      ["3-minute screening", "Predisposition mapping"],
      ["Early pattern recognition", "No jargon, no friction"],
      ["The first version of your “health fingerprint”"],
    ],
    footer: "This is your biological entry point.",
  },
  {
    overline: "Intelligence layer — ARC builds your health graph",
    title: "ARC constructs a dynamic model of your biology using:",
    bullets: [
      ["your inputs", "optional lab work"],
      ["wearables", "health history"],
      ["environmental signals", "health graph + risk radar"],
      ["biological drivers", "long-term predisposition map"],
      ["precision screening plan"],
    ],
    footer: "This is the intelligence core of your HealthOS.",
  },
  {
    overline: "Strategy engine — ARC generates your adaptive plan",
    title: "ARC transforms your biological model into clear monthly guidance:",
    bullets: [
      ["what’s drifting", "what’s improving"],
      ["what to test", "what to change"],
      ["what to monitor", "what matters, what doesn’t"],
    ],
    footer: "This is your adaptive preventive engine.",
  },
  {
    overline: "Ecosystem layer — ARC connects you to real solutions",
    title: "Your OS connects directly to the world around you:",
    bullets: [
      ["at-home tests & diagnostics", "local screenings"],
      ["specialists", "labs"],
      ["vetted partner services", "ongoing community + live Q&A"],
      ["offline events", "(soon) anonymized global dataset insights"],
    ],
    footer: "This is health infrastructure — unified for the first time.",
  },
];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="11" stroke="rgba(78,242,200,0.4)" strokeWidth="1.3" />
    <path d="M16 9L11 15L8 12.5" stroke="#45F0C3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function HealthOSLayers() {
  return (
    <section className="healthos-section" id="arc-healthos-layers">
      <div className="healthos-wrapper">
        <div className="healthos-heading">
          <p className="healthos-tag">ARC HEALTHOS</p>
          <h2>The intelligence system that layers your biology step-by-step.</h2>
        </div>

        <div className="healthos-timeline">
          {layers.map((layer, index) => (
            <div key={layer.overline} className="healthos-row">
              <div className="healthos-rail">
                <span className="healthos-node" />
                {index < layers.length - 1 && <span className="healthos-line" />}
              </div>

              <div className="healthos-card">
                <p className="healthos-overline">{layer.overline}</p>
                <h3>{layer.title}</h3>
                <div className="healthos-bullets">
                  {layer.bullets.map((col, colIdx) => (
                    <ul key={`${layer.overline}-${colIdx}`}>
                      {col.map((item) => (
                        <li key={`${layer.overline}-${item}`}>
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <p className="healthos-footer">{layer.footer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HealthOSLayers;

