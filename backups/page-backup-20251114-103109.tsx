"use client";

import Link from "next/link";
import DNAParticles from "../components/DNAParticles";
import Footer from "../components/Footer";
import React from "react";

// Persona Data Structure
const PERSONA_DATA = {
  achiever: {
    accent: "#00C9A7",
    gate: {
      title: "The Achiever — You carry responsibility, but not recovery.",
      tagline: "You manage outcomes. We manage your recovery.",
      icon: "briefcase-pulse"
    },
    sections: {
      why_here: {
        h2: "You optimize everything — except your recovery.",
        body: [
          "You're a builder, strategist, or leader. You ship, manage, solve — but your system has no reset loop. Sleep debt feels like a badge. Your back aches, your head races, and you tell yourself, \"After this project, I'll rest.\"",
          "You're not lazy. You're overloaded. Your brain optimizes even your fatigue. You don't need motivation hacks. You need structure for yourself.",
          "TheArc was built for people like you — system thinkers who need a health system that finally matches their logic."
        ]
      },
      why_help: {
        h2: "Structure isn't burnout — it's protection.",
        bullets: [
          "Evidence-based insights for stress, focus, recovery.",
          "Pinpoint energy leaks; stop performance decay.",
          "Private by design, EU-based, no ads."
        ],
        text: "TheArc translates your lifestyle into data — sleep, focus, stress, recovery. In three minutes, you'll see where your energy leaks — and how to seal them. It doesn't sell motivation. It gives you a map and measurable actions, so you can optimize performance without sacrificing health."
      },
      how_it_works: {
        h2: "Three steps to turn confusion into structure.",
        steps: [
          { title: "Baseline", desc: "Quick screening reveals stress & energy patterns." },
          { title: "Build Rhythm", desc: "6-month cadence aligned to real work cycles." },
          { title: "Evolve", desc: "Insights & experts keep performance sustainable." }
        ],
        cta: { label: "Start Free Screening", href: "/free-screening?persona=achiever" }
      },
      whats_included: {
        h2: "What's included",
        features: [
          { title: "Concept & Predisposition Map", desc: "Discover tendencies for stress and burnout risk." },
          { title: "Precision Screening", desc: "Evidence-based self-assessment modules." },
          { title: "Metrics Dashboard", desc: "Track recovery, posture, cognitive load." },
          { title: "Movement & Recovery Plan", desc: "Short, data-backed micro-break system." },
          { title: "Environmental Reset", desc: "Workspace & light exposure protocols." },
          { title: "Cognitive Load & Focus Hygiene", desc: "Reduce hidden drains on performance." }
        ]
      },
      pricing: {
        h2: "Invest in performance that lasts.",
        tiers: [
          {
            name: "Free Screening",
            price: "Free",
            duration: "Lifetime",
            bullets: [
              "3-minute digital snapshot revealing key focus areas",
              "Personalized Predisposition Map (top biological systems)",
              "Simple guidance on relevant screenings",
              "Access to essential self-care lessons",
              "Private and anonymous — no data sharing"
            ],
            cta: { label: "Start Free Screening", href: "/free-screening?persona=achiever" }
          },
          {
            name: "Self-Paced Program",
            price: "€79",
            duration: "6 Months",
            bullets: [
              "Modules: Concept, Predisposition Map, Screening, 6 Phases",
              "Nutrition, Movement, Recovery, Supplements",
              "Metrics Dashboard templates (no devices needed)",
              "Micro-Plans, Environmental Reset, Travel Protocol",
              "Red Flags & Implementation Calendar",
              "Lifetime content updates and community access"
            ],
            cta: { label: "Join Self-Paced", href: "/checkout/self?persona=achiever" }
          },
          {
            name: "Guided Program + Expert Access",
            price: "€299",
            duration: "6 Months",
            badge: "Most popular",
            bullets: [
              "Everything in Self-Paced plus:",
              "Exclusive member deals on tests",
              "Access to TheArc Events",
              "1-on-1 consultations",
              "Priority support",
              "Free knowledge updates"
            ],
            cta: { label: "Apply for Guided", href: "/apply/guided?persona=achiever" }
          }
        ]
      },
      final_cta: {
        h2: "You wouldn't launch without metrics. Don't live without them.",
        cta: { label: "Run My System Check", href: "/free-screening?persona=achiever" }
      }
    }
  },
  explorer: {
    accent: "#0076B6",
    gate: {
      title: "The Explorer — You move everywhere, but your health stays nowhere.",
      tagline: "Carry your health like your passport.",
      icon: "globe-route"
    },
    sections: {
      why_here: {
        h2: "You travel light — but your health keeps getting lost.",
        body: [
          "Every few months, you start again — new city, new timezone, new gym, same confusion. You track flights better than your sleep. You're not careless; you're disconnected.",
          "TheArc was built to keep continuity when your map keeps changing — so your health travels with you."
        ]
      },
      why_help: {
        h2: "Finally, a health system that travels with you.",
        bullets: [
          "A health base that travels with you.",
          "Adapts to timezone shifts and jet lag.",
          "Partner services where you land."
        ],
        text: "TheArc keeps your screenings, recommendations, and tests in one encrypted space — accessible anywhere. It reads your patterns, adjusts for travel fatigue, and helps you stabilize faster between shifts and timezones. No local doctor? No problem. You'll know what matters, wherever you land."
      },
      how_it_works: {
        h2: "Three steps to turn confusion into structure.",
        steps: [
          { title: "Baseline", desc: "Understand your travel rhythm." },
          { title: "Adapt Plan", desc: "6-month routine for jet lag & climate shifts." },
          { title: "Evolve Globally", desc: "One identity, one record, anywhere." }
        ],
        cta: { label: "Start Free Screening", href: "/free-screening?persona=explorer" }
      },
      whats_included: {
        h2: "What's included",
        features: [
          { title: "Portable Dashboard", desc: "Health data stored privately, accessible anywhere." },
          { title: "Travel Protocols", desc: "Jet lag management, hydration, and immune balance." },
          { title: "Environmental Reset", desc: "Adaptation to local climate and circadian rhythm." },
          { title: "Diagnostics Catalog", desc: "Partner tests in multiple cities." },
          { title: "Global Expert Access", desc: "Online consultations aligned with your Arc plan." },
          { title: "Travel Protocols & Local Services", desc: "Find trusted providers wherever you go." }
        ]
      },
      pricing: {
        h2: "Continuity, wherever you go.",
        tiers: [
          {
            name: "Free Screening",
            price: "Free",
            duration: "Lifetime",
            bullets: [
              "3-minute digital snapshot revealing key focus areas",
              "Personalized Predisposition Map (top biological systems)",
              "Simple guidance on relevant screenings",
              "Access to essential self-care lessons",
              "Private and anonymous — no data sharing"
            ],
            cta: { label: "Start Free Screening", href: "/free-screening?persona=explorer" }
          },
          {
            name: "Self-Paced Program",
            price: "€79",
            duration: "6 Months",
            bullets: [
              "Modules: Concept, Predisposition Map, Screening, 6 Phases",
              "Nutrition, Movement, Recovery, Supplements",
              "Metrics Dashboard templates (no devices needed)",
              "Micro-Plans, Environmental Reset, Travel Protocol",
              "Red Flags & Implementation Calendar",
              "Lifetime content updates and community access"
            ],
            cta: { label: "Join Self-Paced", href: "/checkout/self?persona=explorer" }
          },
          {
            name: "Guided Program + Expert Access",
            price: "€299",
            duration: "6 Months",
            badge: "Most popular",
            bullets: [
              "Everything in Self-Paced plus:",
              "Exclusive member deals on tests",
              "Access to TheArc Events",
              "1-on-1 consultations",
              "Priority support",
              "Free knowledge updates"
            ],
            cta: { label: "Apply for Guided", href: "/apply/guided?persona=explorer" }
          }
        ]
      },
      final_cta: {
        h2: "Your passport changes. Your body doesn't.",
        cta: { label: "Start Free Screening", href: "/free-screening?persona=explorer" }
      }
    }
  },
  seeker: {
    accent: "gradient",
    gate: {
      title: "The Seeker — You've faced the unknown. Now you want the truth.",
      tagline: "Replace fear with clarity.",
      icon: "heart-wave"
    },
    sections: {
      why_here: {
        h2: "You've felt uncertainty — now you want understanding.",
        body: [
          "A symptom, a scare, a search that spiraled. You've been told \"you're fine,\" but you don't feel fine. You're not obsessed — you're trying to make sense of your body.",
          "TheArc gives you that clarity, step by step, through calm science — not panic headlines."
        ]
      },
      why_help: {
        h2: "Clarity replaces fear when data replaces guesswork.",
        bullets: [
          "Science-based, jargon-free clarity.",
          "What's urgent vs normal — explained calmly.",
          "Your data, your control (EU/GDPR)."
        ],
        text: "TheArc helps you understand what's happening — with structure. Our screening translates your signals into plain, evidence-based insight. You'll see what's urgent, what's normal, and what can wait. No ads. No upsells. No noise."
      },
      how_it_works: {
        h2: "Three steps to turn confusion into structure.",
        steps: [
          { title: "Baseline", desc: "3-minute snapshot + red flags." },
          { title: "Guided Path", desc: "Gentle steps to rebuild balance." },
          { title: "Ongoing Support", desc: "Updates & sessions with experts." }
        ],
        cta: { label: "Start Free Screening", href: "/free-screening?persona=seeker" }
      },
      whats_included: {
        h2: "What's included",
        features: [
          { title: "Predisposition Map", desc: "Understand your body's tendencies." },
          { title: "Red Flag Indicators", desc: "Simple markers that show when to act." },
          { title: "Micro-Plans", desc: "Easy steps to regain balance and confidence." },
          { title: "Expert Library", desc: "Curated health knowledge translated into plain language." },
          { title: "Optional Consults", desc: "Access to verified professionals when you need reassurance." },
          { title: "Red Flag Indicators & Micro-Plans", desc: "Clear signals and actionable steps." }
        ]
      },
      pricing: {
        h2: "Understanding shouldn't cost peace of mind.",
        tiers: [
          {
            name: "Free Screening",
            price: "Free",
            duration: "Lifetime",
            bullets: [
              "3-minute digital snapshot revealing key focus areas",
              "Personalized Predisposition Map (top biological systems)",
              "Simple guidance on relevant screenings",
              "Access to essential self-care lessons",
              "Private and anonymous — no data sharing"
            ],
            cta: { label: "Start Free Screening", href: "/free-screening?persona=seeker" }
          },
          {
            name: "Self-Paced Program",
            price: "€79",
            duration: "6 Months",
            bullets: [
              "Modules: Concept, Predisposition Map, Screening, 6 Phases",
              "Nutrition, Movement, Recovery, Supplements",
              "Metrics Dashboard templates (no devices needed)",
              "Micro-Plans, Environmental Reset, Travel Protocol",
              "Red Flags & Implementation Calendar",
              "Lifetime content updates and community access"
            ],
            cta: { label: "Join Self-Paced", href: "/checkout/self?persona=seeker" }
          },
          {
            name: "Guided Program + Expert Access",
            price: "€299",
            duration: "6 Months",
            badge: "Most popular",
            bullets: [
              "Everything in Self-Paced plus:",
              "Exclusive member deals on tests",
              "Access to TheArc Events",
              "1-on-1 consultations",
              "Priority support",
              "Free knowledge updates"
            ],
            cta: { label: "Apply for Guided", href: "/apply/guided?persona=seeker" }
          }
        ]
      },
      final_cta: {
        h2: "Stop searching symptoms. Start understanding yourself.",
        cta: { label: "Start Free Screening", href: "/free-screening?persona=seeker" }
      }
    }
  }
};

// Analytics helper
function trackEvent(name: string, payload?: Record<string, any>) {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, payload || {});
    }
  } catch (e) {
    console.log('Analytics error:', e);
  }
}

export default function Home() {

  return (
    <div className="relative min-h-screen" style={{ background: '#18181a', color: '#ffffff' }}>
      <DNAParticles />
      {/* Top Bar / Navigation */}
      <header className="w-full flex items-center justify-between px-8 py-7 z-30 relative hero-section">
        <div className="text-2xl md:text-3xl font-bold gradient-text select-none tracking-tight" style={{background: 'linear-gradient(90deg,#8b5cf6,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>TheArc</div>
        <nav className="flex space-x-8 text-base font-normal">
          <a href="#screening" className="hover:text-blue-400 transition-colors">Screening</a>
          <a href="#programs" className="hover:text-blue-400 transition-colors">Programs</a>
          <a href="#ecosystem" className="hover:text-blue-400 transition-colors">Ecosystem</a>
          <a href="#audience" className="hover:text-blue-400 transition-colors">Who it's for</a>
          <a href="#apply" className="hover:text-blue-400 transition-colors">Apply</a>
          <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            </nav>
      </header>

      {/* HERO SECTION */}
      <section className="w-full bg-[#18181a] pb-2 pt-16 px-4 md:px-0 hero-section">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-14">
          <div className="flex-1 flex flex-col items-start">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-white leading-tight max-w-2xl">A scientific system to help you preserve health — not chase longevity.</h1>
            <div className="text-lg md:text-2xl text-gray-300 mb-6 max-w-lg">TheArc shows where your health needs attention, what to test, and how to act — before problems develop.</div>
            <div className="mb-7 w-full max-w-lg">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <div className="flex items-center gap-2 text-gray-200"><span className="text-blue-400"><svg width="22" height="22" fill="currentColor"><path fillRule="evenodd" d="M16.704 6.292a1 1 0 010 1.416l-6 6a1 1 0 01-1.408.026l-3-2.933a1 1 0 111.408-1.418l2.273 2.223 5.296-5.314a1 1 0 011.431 0z" clipRule="evenodd"/></svg></span>Personalized risk estimate</div>
                <div className="flex items-center gap-2 text-gray-200"><span className="text-blue-400"><svg width="22" height="22" fill="currentColor"><path fillRule="evenodd" d="M16.704 6.292a1 1 0 010 1.416l-6 6a1 1 0 01-1.408.026l-3-2.933a1 1 0 111.408-1.418l2.273 2.223 5.296-5.314a1 1 0 011.431 0z" clipRule="evenodd"/></svg></span>Guidance on proven preventive screenings</div>
                <div className="flex items-center gap-2 text-gray-200"><span className="text-blue-400"><svg width="22" height="22" fill="currentColor"><path fillRule="evenodd" d="M16.704 6.292a1 1 0 010 1.416l-6 6a1 1 0 01-1.408.026l-3-2.933a1 1 0 111.408-1.418l2.273 2.223 5.296-5.314a1 1 0 011.431 0z" clipRule="evenodd"/></svg></span>Education for long run health</div>
        </div>
        </div>
            {/* Trust bar with expert photos */}
            <div className="flex gap-3 items-center mb-8 bg-[#232334] px-5 py-2 rounded-lg">
              <span className="text-base font-medium text-gray-200 mr-3">Built by clinicians & researchers</span>
              <img src="https://placehold.co/40x40?text=Dr" className="rounded-full border border-white mr-1" alt="Dr. A" />
              <img src="https://placehold.co/40x40?text=PhD" className="rounded-full border border-white mr-1" alt="PhD" />
              <img src="https://placehold.co/40x40?text=MD" className="rounded-full border border-white" alt="MD" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center md:justify-end w-full">
            {/* Placeholder medical dashboard */}
            <div className="hidden md:block bg-white rounded-2xl shadow-lg w-72 h-60 flex items-center justify-center border border-gray-200 relative">
              <svg width="120" height="90" fill="none" viewBox="0 0 120 90"><rect x="10" y="18" width="100" height="64" rx="10" fill="#f3f6f9"/><rect x="20" y="28" width="80" height="20" rx="5" fill="#bdd4ff"/><rect x="20" y="56" width="34" height="14" rx="4" fill="#d4e3fd"/><rect x="58" y="56" width="42" height="14" rx="4" fill="#e9effb"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONA CARDS - Always visible under hero */}
      <PersonaGate />

      <Footer />
        </div>
  );
}

// Persona Gate Component
function PersonaGate() {
  const personas = [
    { key: 'achiever', data: PERSONA_DATA.achiever, href: '/achiever' },
    { key: 'explorer', data: PERSONA_DATA.explorer, href: '/explorer' },
    { key: 'seeker', data: PERSONA_DATA.seeker, href: '/seeker' }
  ];

  return (
    <section id="persona-gate" className="section">
      <div className="container">
        <h2 className="text-center mb-2">Every journey begins with who you are.</h2>
        <p className="text-center text-muted body-m mb-12">Choose your arc.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {personas.map(({ key, data, href }) => (
            <Link
              key={key}
              href={href}
              className="card card-persona text-left"
              style={{
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                outline: 'none',
                textDecoration: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid var(--accent)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <div style={{ height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '12px',
                  background: data.accent === 'gradient' 
                    ? 'linear-gradient(90deg, var(--accentFrom), var(--accentTo))'
                    : data.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  {data.gate.icon === 'briefcase-pulse' && <BriefcaseIcon />}
                  {data.gate.icon === 'globe-route' && <GlobeIcon />}
                  {data.gate.icon === 'heart-wave' && <HeartIcon />}
          </div>
              </div>

              <h3 className="mb-2">{data.gate.title}</h3>
              <p className="body-m text-muted mb-4">{data.gate.tagline}</p>
              
              <div className="caption" style={{ color: data.accent === 'gradient' ? 'var(--accentFrom)' : data.accent, marginTop: 'auto' }}>
                Start my story →
              </div>
            </Link>
          ))}
            </div>
          </div>
      </section>
  );
}

// Animated Dotted World Map Background Component for Explorer
function ExplorerWorldMapBackground() {
  const [svgContent, setSvgContent] = React.useState<string>('');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    // Dynamically import dotted-map only on client side
    if (typeof window !== 'undefined') {
      import('dotted-map').then((DottedMapModule) => {
        const DottedMap = DottedMapModule.default;
        
        // Create a larger map for background
        const map = new DottedMap({
          height: 100,
          grid: 'diagonal',
        });

        // Add travel destination pins
        const destinations = [
          { lat: 40.7128, lng: -74.0060, name: 'New York' },
          { lat: 51.5074, lng: -0.1278, name: 'London' },
          { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
          { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
          { lat: 48.8566, lng: 2.3522, name: 'Paris' },
        ];

        destinations.forEach((dest) => {
          map.addPin({
            lat: dest.lat,
            lng: dest.lng,
            svgOptions: { color: '#0076B6', radius: 0.5 },
          });
        });

        // Get the SVG with transparent background for overlay
        const svgString = map.getSVG({
          radius: 0.22,
          color: '#0076B6',
          shape: 'circle',
          backgroundColor: 'transparent',
        });

        setSvgContent(svgString);
      }).catch((err) => {
        console.error('Failed to load dotted-map:', err);
      });
    }
  }, []);

  // Animate the dots after SVG is rendered
  React.useEffect(() => {
    if (!mounted || !svgContent) return;

    let animationFrame: number | null = null;
    let timer: NodeJS.Timeout;

    // Wait for SVG to be in DOM
    timer = setTimeout(() => {
      const container = document.querySelector('[data-world-map-bg]');
      if (!container) return;

      const svg = container.querySelector('svg');
      if (!svg) return;

      const dots = svg.querySelectorAll('circle');
      if (dots.length === 0) return;

      let time = 0;
      const originalRadii: number[] = [];

      // Store original radii
      dots.forEach((dot) => {
        originalRadii.push(parseFloat(dot.getAttribute('r') || '0.22'));
      });

      const animate = () => {
        time += 0.02;
        
        dots.forEach((dot, index) => {
          const baseOpacity = 0.15; // Lower opacity for background
          const pulse = Math.sin(time + index * 0.05) * 0.2 + 0.8;
          const opacity = baseOpacity * pulse;
          dot.setAttribute('opacity', opacity.toString());
          
          // Make destination pins (larger dots) pulse subtly
          const originalRadius = originalRadii[index];
          if (originalRadius > 0.3) {
            const scale = 1 + Math.sin(time * 1.5 + index) * 0.15;
            dot.setAttribute('r', (originalRadius * scale).toString());
          }
        });

        animationFrame = requestAnimationFrame(animate);
      };

      animate();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mounted, svgContent]);

  if (!mounted || !svgContent) return null;

  React.useEffect(() => {
    if (!svgContent || typeof window === 'undefined') return;
    
    // Add styles for the SVG to cover full viewport
    const style = document.createElement('style');
    style.textContent = `
      [data-world-map-bg] svg {
        width: 100%;
        height: 100%;
        min-width: 100vw;
        min-height: 100vh;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [svgContent]);

  return (
    <div
      data-world-map-bg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.25,
        overflow: 'hidden'
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

// Animated Dotted World Map Component for Explorer (for the section)
function ExplorerWorldMap() {
  const [svgContent, setSvgContent] = React.useState<string>('');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    // Dynamically import dotted-map only on client side
    if (typeof window !== 'undefined') {
      import('dotted-map').then((DottedMapModule) => {
        const DottedMap = DottedMapModule.default;
        
        // Create the map
        const map = new DottedMap({
          height: 60,
          grid: 'diagonal',
        });

        // Add travel destination pins
        const destinations = [
          { lat: 40.7128, lng: -74.0060, name: 'New York' },
          { lat: 51.5074, lng: -0.1278, name: 'London' },
          { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
          { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
          { lat: 48.8566, lng: 2.3522, name: 'Paris' },
        ];

        destinations.forEach((dest) => {
          map.addPin({
            lat: dest.lat,
            lng: dest.lng,
            svgOptions: { color: '#0076B6', radius: 0.5 },
          });
        });

        // Get the SVG
        const svgString = map.getSVG({
          radius: 0.22,
          color: '#0076B6',
          shape: 'circle',
          backgroundColor: '#202025',
        });

        setSvgContent(svgString);
      }).catch((err) => {
        console.error('Failed to load dotted-map:', err);
      });
    }
  }, []);

  // Animate the dots after SVG is rendered
  React.useEffect(() => {
    if (!mounted || !svgContent) return;

    let animationFrame: number | null = null;
    let timer: NodeJS.Timeout;

    // Wait for SVG to be in DOM
    timer = setTimeout(() => {
      const container = document.querySelector('[data-world-map]');
      if (!container) return;

      const svg = container.querySelector('svg');
      if (!svg) return;

      const dots = svg.querySelectorAll('circle');
      if (dots.length === 0) return;

      let time = 0;
      const originalRadii: number[] = [];

      // Store original radii
      dots.forEach((dot) => {
        originalRadii.push(parseFloat(dot.getAttribute('r') || '0.22'));
      });

      const animate = () => {
        time += 0.02;
        
        dots.forEach((dot, index) => {
          const baseOpacity = 0.4;
          const pulse = Math.sin(time + index * 0.1) * 0.3 + 0.7;
          const opacity = baseOpacity * pulse;
          dot.setAttribute('opacity', opacity.toString());
          
          // Make destination pins (larger dots) pulse
          const originalRadius = originalRadii[index];
          if (originalRadius > 0.3) {
            const scale = 1 + Math.sin(time * 2 + index) * 0.2;
            dot.setAttribute('r', (originalRadius * scale).toString());
          }
        });

        animationFrame = requestAnimationFrame(animate);
      };

      animate();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mounted, svgContent]);

  if (!mounted) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        background: '#202025', 
        borderRadius: '16px', 
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading map...</span>
          </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      background: '#202025', 
      borderRadius: '16px', 
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {svgContent ? (
        <div
          data-world-map
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        />
      ) : (
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading map...</span>
      )}
        </div>
  );
}

// Explorer Story Component - Custom Design
function ExplorerStory({ onReset }: { onReset: () => void }) {

  const heroBackground = 'linear-gradient(135deg, rgba(0,118,182,0.2) 0%, rgba(0,118,182,0.15) 50%, rgba(0,118,182,0.1) 100%), #18181a';

  return (
    <article 
      id="story-explorer" 
      className="persona-story active"
      style={{ 
        background: heroBackground,
        color: '#ffffff',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
      {/* Section 1: Hero */}
      <section 
        className="section relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,118,182,0.7) 0%, rgba(0,118,182,0.5) 50%, rgba(0,118,182,0.3) 100%), url('/header-explorer.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          paddingTop: '120px',
          paddingBottom: '120px',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <h1 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              marginBottom: '24px',
              color: '#ffffff'
            }}
          >
            Find Your Balance Wherever the World Takes You
            </h1>
          <p 
            className="body-l"
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.6',
              marginBottom: '40px',
              color: 'var(--text-muted)',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Your health should travel with you. Discover how to stay energized and balanced wherever life leads.
          </p>
          <a
            href="/free-screening?persona=explorer"
            className="btn-primary"
            onClick={() => trackEvent('cta_click', { persona: 'explorer', location: 'hero', cta: 'free_check' })}
          >
            Take Your Free Health Check
          </a>
          <p 
            className="caption"
            style={{
              marginTop: '16px',
              color: 'var(--text-muted)'
            }}
          >
            3-minute test · Private · Simple results
          </p>
        </div>
      </section>

      {/* Section 2: Awareness */}
      <section className="section" style={{ background: heroBackground }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2>Stay Adventurous, Stay Well</h2>
              <p className="body-l mt-6 mb-8">
                You don't have to choose between exploring and feeling good. Our tools and at-home services help you stay balanced while you see the world.
              </p>
              <a
                href="/catalog/services"
                className="btn-secondary"
                onClick={() => trackEvent('cta_click', { persona: 'explorer', location: 'awareness', cta: 'explore_near' })}
              >
                Explore What's Near You
              </a>
          </div>
            <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Animated World Map */}
              <ExplorerWorldMap />
          </div>
        </div>
        </div>
      </section>

      {/* Section 3: Solution Intro */}
      <section className="section" style={{ background: heroBackground }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2>Your Global Wellness Companion</h2>
            <p className="body-l mt-6" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Wherever you land, find reliable professionals ready to help you feel at home in your body.
            </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Massage', icon: '💆' },
              { title: 'Nutrition', icon: '🥗' },
              { title: 'Fitness', icon: '💪' },
              { title: 'Recovery', icon: '🧘' }
            ].map((service, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {service.icon}
                    </div>
                <h4>{service.title}</h4>
                    </div>
            ))}
                  </div>
          
          <div className="text-center">
            <a
              href="/marketplace"
              className="btn-secondary"
              onClick={() => trackEvent('cta_click', { persona: 'explorer', location: 'solution', cta: 'browse_providers' })}
            >
              Browse Providers
            </a>
                  </div>
                </div>
      </section>

      {/* Section 4: Insight */}
      <section className="section" style={{ background: heroBackground }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Test Result Mockup */}
              <div className="card">
                <h4 className="mb-6">Your Health Snapshot</h4>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="caption" style={{ color: 'var(--text-muted)' }}>Sleep Quality</span>
                    <span className="caption" style={{ fontWeight: '600', color: 'var(--accent)' }}>72%</span>
                    </div>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '72%', height: '100%', background: 'var(--accent)', borderRadius: '4px' }} />
                    </div>
                  </div>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="caption" style={{ color: 'var(--text-muted)' }}>Energy Levels</span>
                    <span className="caption" style={{ fontWeight: '600', color: 'var(--accent)' }}>65%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', background: 'var(--accent)', borderRadius: '4px' }} />
                </div>
              </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="caption" style={{ color: 'var(--text-muted)' }}>Stress Management</span>
                    <span className="caption" style={{ fontWeight: '600', color: 'var(--accent)' }}>58%</span>
                    </div>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '58%', height: '100%', background: 'var(--accent)', borderRadius: '4px' }} />
                    </div>
                  </div>
                  </div>
                </div>
              <div>
              <h2>Understand Your Body on the Move</h2>
              <p className="body-l mt-6 mb-8">
                Our free health screening gives you quick insight into how travel affects your sleep, stress, and energy. It takes just a few minutes and gives you clear guidance.
              </p>
              <a
                href="/free-screening?persona=explorer"
                className="btn-primary"
                onClick={() => trackEvent('cta_click', { persona: 'explorer', location: 'insight', cta: 'free_test' })}
              >
                Take the Free Test
              </a>
              </div>
            </div>
          </div>
      </section>

      {/* Section 5: Progress */}
      <section className="section" style={{ background: heroBackground }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2>Your Six-Month Plan for Consistent Wellness</h2>
            <p className="body-l mt-6 mb-8" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Stay balanced wherever you are with our €89 plan. It adapts to your lifestyle and keeps you moving toward lasting wellbeing.
            </p>
            <div className="card" style={{ display: 'inline-block', marginBottom: '48px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent)', marginBottom: '4px' }}>
                €89
                </div>
              <div className="caption" style={{ color: 'var(--text-muted)' }}>6 months</div>
                </div>
              </div>

          {/* Timeline */}
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--border)', transform: 'translateX(-50%)' }} />
            {[
              { month: 'Month 1', label: 'Baseline & Assessment' },
              { month: 'Month 2', label: 'Adaptation & Protocols' },
              { month: 'Month 3', label: 'Optimization' },
              { month: 'Month 4', label: 'Refinement' },
              { month: 'Month 5', label: 'Integration' },
              { month: 'Month 6', label: 'Mastery & Continuity' }
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: i < 5 ? '48px' : '0',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    border: '4px solid #18181a',
                    boxShadow: '0 0 0 4px var(--border)',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2
                  }}
                />
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left', paddingRight: i % 2 === 0 ? '48px' : '0', paddingLeft: i % 2 === 0 ? '0' : '48px' }}>
                  <div className="caption" style={{ fontWeight: '600', color: 'var(--accent)', marginBottom: '4px' }}>
                    {step.month}
              </div>
                  <div className="body-m" style={{ color: 'var(--text-muted)' }}>
                    {step.label}
            </div>
                </div>
                <div style={{ width: '50%' }} />
                </div>
            ))}
              </div>

          <div className="text-center mt-12">
            <a
              href="/checkout/self?persona=explorer"
              className="btn-primary"
              onClick={() => trackEvent('cta_click', { persona: 'explorer', location: 'progress', cta: 'start_plan' })}
            >
              Start My Plan
            </a>
            <p className="caption mt-4" style={{ color: 'var(--text-muted)' }}>
              Less than €15 per month · Cancel anytime
            </p>
              </div>
            </div>
      </section>

      {/* Section 6: Transformation */}
      <section 
        className="section"
        style={{
          background: heroBackground,
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2>Travel Freely. Live Fully.</h2>
          <p className="body-l mt-6 mb-10">
            Wellness can move with you. Start today and feel grounded wherever you go.
          </p>
          <a
            href="/free-screening?persona=explorer"
            className="btn-primary"
            onClick={() => trackEvent('cta_click', { persona: 'explorer', location: 'transformation', cta: 'combo' })}
          >
            Try Free Screening + Plan Combo
          </a>
          <div className="mt-6">
            <button 
              onClick={onReset}
              className="caption"
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ← Choose another arc
            </button>
                </div>
                </div>
      </section>
              </div>
    </article>
  );
}

// Persona Story Component (all 6 sections)
function PersonaStory({ persona, onReset }: { persona: 'achiever' | 'explorer' | 'seeker', onReset: () => void }) {
  const data = PERSONA_DATA[persona];
  const isSeeker = persona === 'seeker';

  // Render custom Explorer design
  if (persona === 'explorer') {
    return <ExplorerStory onReset={onReset} />;
  }

  return (
      <article 
      id={`story-${persona}`} 
      className="persona-story active"
      style={{ 
        background: '#18181a',
        color: '#ffffff'
      }}
    >
      {/* Section 1: Why You're Here */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h2>{data.sections.why_here.h2}</h2>
              <div className="mt-6 space-y-4">
                {data.sections.why_here.body.map((para, i) => (
                  <p key={i} className="body-l">{para}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div style={{ 
                aspectRatio: '16/9', 
                background: '#1f1f23', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border)'
              }}>
                <span className="text-muted">[Illustration placeholder]</span>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why TheArc Might Help */}
      <section className="section" style={{ background: '#1a1a1d' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h2>{data.sections.why_help.h2}</h2>
              <ul className="mt-6 space-y-4" style={{ listStyle: 'none', padding: 0 }}>
                {data.sections.why_help.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ 
                      color: data.accent === 'gradient' ? 'var(--accentFrom)' : data.accent,
                      fontSize: '24px',
                      lineHeight: '1',
                      marginTop: '2px'
                    }}>✓</span>
                    <span className="body-l">{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="body-l mt-6">{data.sections.why_help.text}</p>
              <a href="#how-it-works" className="btn-secondary mt-6">How it works ↓</a>
            </div>
            <div className="lg:col-span-5">
              <div style={{ 
                aspectRatio: '16/9', 
                background: '#1f1f23', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border)'
              }}>
                <span className="text-muted">[Visual placeholder]</span>
              </div>
            </div>
          </div>
      </div>
    </section>

      {/* Section 3: How It Works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="text-center mb-12">{data.sections.how_it_works.h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {data.sections.how_it_works.steps.map((step, i) => (
              <div key={i} className="card">
                <div style={{ 
                  width: '48px', 
                  height: '48px',
                  borderRadius: '12px',
                  background: data.accent === 'gradient' 
                    ? 'linear-gradient(90deg, var(--accentFrom), var(--accentTo))'
                    : data.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '24px',
                  marginBottom: 'var(--space-4)'
                }}>
                  {i + 1}
              </div>
                <h4 className="mb-2">{step.title}</h4>
                <p className="body-m text-muted">{step.desc}</p>
        </div>
            ))}
          </div>
          <div className="text-center">
            <a 
              href={data.sections.how_it_works.cta.href} 
              className={`btn-primary ${isSeeker ? 'btn-primary--seeker' : ''}`}
              onClick={() => trackEvent('cta_click', { persona, location: 'how_it_works', cta: 'start_free' })}
            >
              {data.sections.how_it_works.cta.label}
              </a>
            </div>
          </div>
      </section>

      {/* Section 4: What's Included */}
      <section className="section" style={{ background: '#1a1a1d' }}>
        <div className="container">
          <h2 className="text-center mb-12">{data.sections.whats_included.h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.sections.whats_included.features.map((feature, i) => (
              <div key={i} className="card">
                <div style={{ 
                  width: '32px', 
                  height: '32px',
                  borderRadius: '8px',
                  background: data.accent === 'gradient' 
                    ? 'linear-gradient(90deg, var(--accentFrom), var(--accentTo))'
                    : data.accent,
                  marginBottom: 'var(--space-4)',
                  opacity: 0.2
                }} />
                <h4 className="mb-2">{feature.title}</h4>
                <p className="body-m text-muted">{feature.desc}</p>
          </div>
            ))}
          </div>
      </div>
    </section>

      {/* Section 5: Programs & Pricing */}
      <section id="programs" className="section">
        <div className="container">
          <h2 className="text-center mb-4">{data.sections.pricing.h2}</h2>
          <p className="text-center text-muted body-m mb-12">Choose the level of structure that fits how you manage your health.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {data.sections.pricing.tiers.map((tier, i) => (
              <div 
                key={i} 
                className="card"
                style={{ 
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '500px'
                }}
              >
                {tier.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: 'var(--space-6)',
                    background: data.accent === 'gradient' 
                      ? 'linear-gradient(90deg, var(--accentFrom), var(--accentTo))'
                      : data.accent,
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {tier.badge}
          </div>
                )}
                
                <h3 className="mb-2">{tier.name}</h3>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '700',
                  color: data.accent === 'gradient' ? 'var(--accentFrom)' : data.accent,
                  marginBottom: 'var(--space-2)'
                }}>
                  {tier.price}
        </div>
                <p className="caption text-muted mb-6">{tier.duration}</p>
                
                <ul className="space-y-2 mb-8" style={{ listStyle: 'none', padding: 0, flex: 1 }}>
                  {tier.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span style={{ 
                        color: data.accent === 'gradient' ? 'var(--accentFrom)' : data.accent,
                        fontSize: '18px',
                        lineHeight: '1',
                        marginTop: '2px'
                      }}>✓</span>
                      <span className="body-m">{bullet}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={tier.cta.href}
                  className={`btn-primary ${isSeeker ? 'btn-primary--seeker' : ''}`}
                  style={{ width: '100%', textAlign: 'center', marginTop: 'auto' }}
                  onClick={() => trackEvent('cta_click', { persona, location: 'pricing', tier: tier.name.toLowerCase().replace(/\s+/g, '_') })}
                >
                  {tier.cta.label}
                </a>
        </div>
            ))}
        </div>
          </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="section" style={{ background: '#1a1a1d', maxWidth: '800px', margin: '0 auto' }}>
        <div className="container">
          <h2 className="text-center mb-4">{data.sections.final_cta.h2}</h2>
          <div className="text-center">
            <a 
              href={data.sections.final_cta.cta.href}
              className={`btn-primary ${isSeeker ? 'btn-primary--seeker' : ''}`}
              onClick={() => trackEvent('cta_click', { persona, location: 'final', cta: 'primary' })}
            >
              {data.sections.final_cta.cta.label}
            </a>
            <div className="mt-6">
            <button 
                onClick={onReset}
                className="caption"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ← Choose another arc
            </button>
            </div>
          </div>
        </div>
    </section>
    </article>
  );
}

// Icon Components (placeholder SVG)
function BriefcaseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm4 4V4h-4v2h4z"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      <path d="M8 12h8M12 8v8" strokeWidth="1.5" stroke="currentColor" opacity="0.5"/>
    </svg>
  );
}
