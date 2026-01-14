"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArcButton } from "./ui/ArcButton";

interface StepItem {
  number: string;
  title: string;
  text: string;
}

interface HowItWorksSectionProps {
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaOnClick?: () => void;
  steps?: StepItem[];
}

const defaultSteps: StepItem[] = [
  {
    number: "01",
    title: "Start the free screening",
    text: "A three-minute clinical screening that starts mapping your biological patterns—no jargon, no friction.",
  },
  {
    number: "02",
    title: "Build your Health Graph",
    text: "ARC constructs your predisposition map, risk radar, and precision screening plan using your inputs + optional data.",
  },
  {
    number: "03",
    title: "See your biological drivers",
    text: "ARC reveals what's drifting, what's stable, and which systems need attention.",
  },
  {
    number: "04",
    title: "Receive your adaptive strategy",
    text: "Your plan updates automatically every month based on new data, patterns, and lifestyle changes.",
  },
  {
    number: "05",
    title: "Detect early drift",
    text: "ARC catches patterns long before symptoms appear.",
  },
  {
    number: "06",
    title: "Get precision screening guidance",
    text: "ARC tells you exactly what to test, when to test, and why it matters.",
  },
  {
    number: "07",
    title: "Use the global marketplace",
    text: "Access vetted diagnostics, specialists, and services directly within your OS.",
  },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function HowItWorksSection({
  title = "How ARC Works",
  description = "A simple, intelligent operating system for your biology.",
  ctaHref = "#personas",
  ctaLabel = "Start free screening",
  ctaOnClick,
  steps = defaultSteps,
}: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  
  // Initialize first step as active
  useEffect(() => {
    if (stepRefs.current[0]) {
      stepRefs.current[0].classList.add("step-visible");
      stepRefs.current[0].classList.remove("step-hidden");
    }
  }, []);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!sectionRef.current) return;
      canvas.width = window.innerWidth;
      
      // Use the section's actual height
      const sectionHeight = sectionRef.current.scrollHeight;
      canvas.height = sectionHeight;
      
      // Reposition particles if canvas height changed
      const oldHeight = particlesRef.current[0] ? canvas.height : 0;
      if (oldHeight && canvas.height !== oldHeight) {
        particlesRef.current.forEach((particle) => {
          if (particle.y > canvas.height) {
            particle.y = Math.random() * canvas.height;
          }
        });
      }
    };

    // Also resize when steps are rendered
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    // Initial resize and particle initialization
    const initParticles = () => {
      resizeCanvas();
      
      // Initialize particles after canvas is sized
      const particleCount = window.innerWidth < 768 ? 12 : 25;
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 1,
        opacity: 0.15 + Math.random() * 0.1,
      }));
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initParticles, 100);
    
    window.addEventListener("resize", resizeCanvas);

    // Animation loop
    const animate = () => {
      if (!sectionRef.current) return;
      
      // Resize canvas if needed
      const currentHeight = sectionRef.current.scrollHeight;
      if (canvas.height !== currentHeight) {
        resizeCanvas();
      }

      const rect = sectionRef.current.getBoundingClientRect();
      
      // Only animate if section is in viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position with slower drift
        particle.x += particle.vx * 0.5;
        particle.y += particle.vy * 0.5;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with subtle glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 200, ${particle.opacity})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgba(0, 255, 200, 0.2)";
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (sectionRef.current) {
        resizeObserver.unobserve(sectionRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // IntersectionObserver for step animations and active step detection
  useEffect(() => {
    const updateActiveStep = () => {
      if (!sectionRef.current) return;

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      stepRefs.current.forEach((stepEl, index) => {
        if (!stepEl) return;

        const rect = stepEl.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distance = Math.abs(stepCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveStep(closestIndex);
    };

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((stepEl, index) => {
      if (!stepEl) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              updateActiveStep();
            }
          });
        },
        {
          threshold: [0.1, 0.2, 0.3, 0.5, 0.7],
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      observer.observe(stepEl);
      observers.push(observer);
    });

    // Initial update
    updateActiveStep();

    // Update on scroll
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Only update if section is in viewport
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          updateActiveStep();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="arc-how-it-works"
      ref={sectionRef}
      className="scroll-steps w-full text-white relative how-it-works-section"
    >
      {/* Header */}
      <div className="w-full py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">OPERATING SYSTEM</p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">{title}</h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      {/* Particles Canvas */}
      <canvas
        id="particles-canvas"
        ref={canvasRef}
        className="particles-canvas"
      />

      {/* Vertical Timeline Spine */}
      <div className="timeline" />

      {/* Steps */}
      {steps.map((step, index) => {
        const isActive = activeStep === index;
        // Show 3 steps: current (fully visible), previous (blurred), next (blurred)
        // Always show 3 steps: active step + 1 before + 1 after (if they exist)
        const distance = Math.abs(index - activeStep);
        const isVisible = distance <= 1;
        const isBlurred = isVisible && !isActive;

        return (
          <div
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className={`step ${
              isActive 
                ? "step-visible" 
                : isBlurred 
                ? "step-blurred" 
                : "step-hidden"
            }`}
            data-step={step.number}
          >
            {/* Background Step Number */}
            <div
              className={`step-number ${isActive ? "step-number-active" : "step-number-inactive"}`}
            >
              {step.number}
            </div>

            {/* Step Content */}
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <div className="step-separator" />
              <p className="step-text">{step.text}</p>
            </div>
          </div>
        );
      })}

      {/* Final CTA */}
      <div className="py-16 lg:py-20 text-center border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ArcButton href={ctaOnClick ? undefined : ctaHref} onClick={ctaOnClick}>{ctaLabel}</ArcButton>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
