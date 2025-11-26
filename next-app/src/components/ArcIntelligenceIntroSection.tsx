"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "A unified health identity",
    subtitle: "Your data normalized across borders.",
  },
  {
    title: "A personal risk radar",
    subtitle: "The 3 areas your body is quietly struggling with.",
  },
  {
    title: "A predisposition map",
    subtitle: "Where your long-term risks live before symptoms.",
  },
  {
    title: "A precision screening plan",
    subtitle: "Stop guessing. Know exactly which tests matter.",
  },
  {
    title: "A monthly adaptive strategy",
    subtitle: "Your plan updates as your life changes.",
  },
  {
    title: "A global health marketplace",
    subtitle: "At-home tests, labs, diagnostics, and services.",
  },
  {
    title: "A community of real medical knowledge",
    subtitle: "Live sessions, offline events, applied science.",
  },
  {
    title: "The largest preventive health dataset",
    subtitle: "Powering ARC’s intelligence — and soon open to the community.",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ArcIntelligenceIntroSection() {
  return (
    <section className="relative bg-black text-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(39,130,110,0.25),rgba(0,0,0,0.95))]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center space-y-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Intelligence</p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Other products give data. ARC gives you a health intelligence system.
          </h2>
          <p className="text-base md:text-lg text-white/75">
            Apps track steps. Wearables show numbers. Clinics give one-time results.
          </p>
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#1A3C34] via-[#0F0F0F] to-transparent" aria-hidden="true" />

          <div className="flex flex-col gap-20">
            {steps.map((step, index) => {
              const alignRight = index % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  className={`relative flex flex-col md:flex-row ${alignRight ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center gap-8 md:gap-16`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={textVariants}
                >
                  <div className={`flex-1 space-y-3 ${alignRight ? "md:text-right md:items-end md:pr-16" : "md:text-left md:pl-16"} text-left`}>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#61F2C8]/80">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="text-base text-white/75 leading-relaxed max-w-lg">{step.subtitle}</p>
                  </div>

                  <div className="relative flex justify-center md:w-0" aria-hidden="true">
                    <motion.span
                      className="relative w-4 h-4 rounded-full bg-gradient-to-r from-[#61F2C8] to-[#34D8A5] shadow-[0_0_18px_rgba(79,242,200,0.5)]"
                      initial={{ scale: 0.7, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      {index < steps.length - 1 && (
                        <motion.span
                          className="absolute left-1/2 top-full w-px bg-gradient-to-b from-[#61F2C8] to-transparent"
                          initial={{ height: 0, opacity: 0 }}
                          whileInView={{ height: "140px", opacity: 0.6 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        />
                      )}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArcIntelligenceIntroSection;
