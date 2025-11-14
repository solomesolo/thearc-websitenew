"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";

function trackEvent(name: string, payload?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).mixpanel) {
    try {
      (window as any).mixpanel.track(name, payload);
    } catch (e) {
      console.log('Analytics error:', e);
    }
  }
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

// Timeline Roadmap Component with Scroll Animations
function TimelineRoadmap() {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const progressLineRef = React.useRef<HTMLDivElement>(null);
  const milestoneRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [activeMilestones, setActiveMilestones] = React.useState<Set<number>>(new Set());

  const milestones = [
    { month: 'Month 1', label: 'Baseline & Assessment', description: 'Understanding your travel rhythm and establishing health baselines.' },
    { month: 'Month 2', label: 'Adaptation & Protocols', description: 'Developing routines that adapt to timezone shifts and jet lag.' },
    { month: 'Month 3', label: 'Optimization', description: 'Fine-tuning your wellness plan for maximum effectiveness.' },
    { month: 'Month 4', label: 'Refinement', description: 'Adjusting protocols based on your body\'s responses and patterns.' },
    { month: 'Month 5', label: 'Integration', description: 'Making wellness practices a seamless part of your lifestyle.' },
    { month: 'Month 6', label: 'Mastery & Continuity', description: 'Achieving long-term balance and sustainable health habits.' }
  ];

  // Scroll handler for progress line and milestone activation
  React.useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !progressLineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calculate progress based on scroll position relative to timeline
      const timelineTop = rect.top + scrollY;
      const timelineBottom = timelineTop + rect.height;
      const currentScroll = scrollY + windowHeight;
      
      // Progress: 0 when timeline top reaches viewport, 1 when timeline bottom passes viewport
      const scrollProgress = Math.max(0, Math.min(1, 
        (currentScroll - timelineTop) / (timelineBottom - timelineTop + windowHeight)
      ));
      
      // Update progress line
      progressLineRef.current.style.height = `${scrollProgress * 100}%`;

      // Check which milestones are active (when they pass 75% down the viewport)
      const newActiveMilestones = new Set<number>();
      milestoneRefs.current.forEach((milestone, index) => {
        if (milestone) {
          const milestoneRect = milestone.getBoundingClientRect();
          const milestoneCenter = milestoneRect.top + milestoneRect.height / 2;
          const viewportCenter = windowHeight * 0.75; // 75% down the viewport
          
          if (milestoneCenter < viewportCenter) {
            newActiveMilestones.add(index);
          }
        }
      });
      setActiveMilestones(newActiveMilestones);
    };

    // Use requestAnimationFrame for smoother scrolling
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', optimizedScroll);
  }, []);

  // Intersection Observer for content animations
  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const milestoneIndex = milestoneRefs.current.findIndex(ref => ref === entry.target);
        if (milestoneIndex !== -1) {
          const content = entry.target.querySelector('.timeline-content') as HTMLElement;
          if (content) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              content.style.opacity = '1';
              content.style.transform = 'translateX(0)';
            } else {
              const opacity = Math.max(0, entry.intersectionRatio * 2);
              const translateX = entry.boundingClientRect.left < window.innerWidth / 2 
                ? (1 - entry.intersectionRatio) * -30 
                : (1 - entry.intersectionRatio) * 30;
              content.style.opacity = opacity.toString();
              content.style.transform = `translateX(${translateX}px)`;
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const timer = setTimeout(() => {
      milestoneRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      milestoneRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div 
      ref={timelineRef}
      className="timeline-roadmap"
      style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem 0'
      }}
    >
      {/* Background line */}
      <div 
        className="timeline-background-line"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'var(--border)',
          transform: 'translateX(-50%)',
          zIndex: 0
        }}
      />
      
      {/* Progress line */}
      <div
        ref={progressLineRef}
        className="timeline-progress-line"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '4px',
          height: '0%',
          background: 'linear-gradient(to bottom, var(--accent) 0%, color-mix(in srgb, var(--accent) 80%, transparent) 100%)',
          transform: 'translateX(-50%)',
          zIndex: 1,
          transition: 'height 0.1s ease-out',
          borderRadius: '2px'
        }}
      />

      {/* Milestones */}
      {milestones.map((milestone, i) => (
        <div
          key={i}
          ref={(el) => { milestoneRefs.current[i] = el; }}
          className="timeline-milestone"
          style={{
            position: 'relative',
            marginBottom: i < milestones.length - 1 ? '4rem' : '0',
            display: 'flex',
            alignItems: 'center',
            minHeight: '120px'
          }}
        >
          {/* Dot */}
          <div
            className={`timeline-dot ${activeMilestones.has(i) ? 'active' : ''}`}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '20px',
              height: '20px',
              background: activeMilestones.has(i) ? 'var(--accent)' : '#18181a',
              border: `4px solid ${activeMilestones.has(i) ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '50%',
              zIndex: 2,
              transition: 'all 0.3s ease-out',
              boxShadow: activeMilestones.has(i) 
                ? '0 0 20px color-mix(in srgb, var(--accent) 60%, transparent), 0 0 0 4px #18181a' 
                : '0 0 0 4px #18181a'
            }}
          />

          {/* Content */}
          <div
            className="timeline-content"
            style={{
              background: '#202025',
              padding: '1.5rem 2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              width: '45%',
              marginLeft: i % 2 === 0 ? '0' : 'auto',
              marginRight: i % 2 === 0 ? 'auto' : '0',
              border: `1px solid ${activeMilestones.has(i) ? 'var(--accent)' : 'var(--border)'}`,
              opacity: 0,
              transform: i % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease-out'
            }}
          >
            <div 
              className="caption" 
              style={{ 
                fontWeight: '600', 
                color: 'var(--accent)', 
                marginBottom: '8px',
                fontSize: '14px'
              }}
            >
              {milestone.month}
            </div>
            <h4 style={{ 
              margin: '0 0 8px 0', 
              color: 'var(--foreground)',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              {milestone.label}
            </h4>
            <p className="body-m" style={{ 
              color: 'var(--text-muted)',
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {milestone.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ExplorerPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-persona', 'explorer');
    return () => {
      document.documentElement.removeAttribute('data-persona');
    };
  }, []);

  // --- Smooth scroll progress handler ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      if (timelineProgressRef.current) {
        timelineProgressRef.current.style.height = `${progress}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Intersection Observer for active section + animation ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setActiveIndex(index);
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const heroBackground = 'linear-gradient(135deg, rgba(0,118,182,0.2) 0%, rgba(0,118,182,0.15) 50%, rgba(0,118,182,0.1) 100%), #18181a';
  const sectionsCount = 6;

  return (
    <div className="relative min-h-screen text-white overflow-hidden" style={{ background: heroBackground }}>
      {/* TIMELINE */}
      <div className="fixed left-[5%] top-[100px] bottom-0 w-[4px] z-40 pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[1px] w-[2px] bg-gray-600/70" />
        <div
          ref={timelineProgressRef}
          className="absolute top-0 left-0 w-[4px] h-[0%] bg-sky-500 rounded transition-all duration-300 ease-out shadow-[0_0_10px_rgba(56,189,248,0.4)]"
        />
        {/* Timeline dots */}
        {Array.from({ length: sectionsCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) dotsRef.current[i] = el;
            }}
            className={`absolute left-[-7px] w-4 h-4 rounded-full transition-all duration-500 ${
              i <= activeIndex ? "bg-sky-400 scale-110 shadow-[0_0_10px_rgba(56,189,248,0.5)]" : "bg-gray-500 scale-75"
            }`}
            style={{ top: `${(i / (sectionsCount - 1)) * 90}%` }}
          />
        ))}
      </div>

      {/* CONTENT SECTIONS */}
      <div className="ml-[12%] space-y-[60vh] pt-[120px] pr-8">
        {/* Section 1: Hero */}
        <section
          data-index={0}
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
          }}
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out visible-section relative overflow-hidden min-h-screen flex items-center justify-center"
        >
          <div className="container text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Find Your Balance Wherever the World Takes You
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Your health should travel with you. Discover how to stay energized and balanced wherever life leads.
            </p>
            <a
              href="/free-screening?persona=explorer"
              className="btn-primary"
              onClick={() => trackEvent('cta_click', { persona: 'explorer', location: 'hero', cta: 'free_check' })}
            >
              Take Your Free Health Check
            </a>
            <p className="caption mt-4 text-gray-400">
              3-minute test · Private · Simple results
            </p>
          </div>
        </section>

        {/* Section 2: Awareness */}
        <section
          data-index={1}
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out visible-section min-h-screen flex items-center"
        >
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Adventurous, Stay Well</h2>
                <p className="text-lg text-gray-300 mb-8">
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
              <div className="relative h-[400px] flex items-center justify-center">
                <ExplorerWorldMap />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Solution Intro */}
        <section
          data-index={2}
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
          }}
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out visible-section min-h-screen flex items-center"
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Global Wellness Companion</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
                <div key={i} className="card text-center">
                  <div className="text-5xl mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-semibold">{service.title}</h4>
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
        <section
          data-index={3}
          ref={(el) => {
            if (el) sectionsRef.current[3] = el;
          }}
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out visible-section min-h-screen flex items-center"
        >
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Test Result Mockup */}
                <div className="card">
                  <h4 className="text-xl font-semibold mb-6">Your Health Snapshot</h4>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Sleep Quality</span>
                      <span className="text-sm font-semibold text-sky-400">72%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[72%] h-full bg-sky-500 rounded-full" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Energy Levels</span>
                      <span className="text-sm font-semibold text-sky-400">65%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[65%] h-full bg-sky-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Stress Management</span>
                      <span className="text-sm font-semibold text-sky-400">58%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[58%] h-full bg-sky-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Understand Your Body on the Move</h2>
                <p className="text-lg text-gray-300 mb-8">
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
        <section
          data-index={4}
          ref={(el) => {
            if (el) sectionsRef.current[4] = el;
          }}
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out visible-section min-h-screen flex items-center"
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Six-Month Plan for Consistent Wellness</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Stay balanced wherever you are with our €89 plan. It adapts to your lifestyle and keeps you moving toward lasting wellbeing.
              </p>
              <div className="card inline-block mb-12">
                <div className="text-5xl font-bold text-sky-400 mb-2">
                  €89
                </div>
                <div className="text-sm text-gray-400">6 months</div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/checkout/self?persona=explorer"
                className="btn-primary"
                onClick={() => trackEvent('cta_click', { persona: 'explorer', location: 'progress', cta: 'start_plan' })}
              >
                Start My Plan
              </a>
              <p className="text-sm text-gray-400 mt-4">
                Less than €15 per month · Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Transformation */}
        <section
          data-index={5}
          ref={(el) => {
            if (el) sectionsRef.current[5] = el;
          }}
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out visible-section min-h-screen flex items-center text-center"
          style={{ background: heroBackground }}
        >
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Travel Freely. Live Fully.</h2>
            <p className="text-lg text-gray-300 mb-10">
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
              <Link 
                href="/"
                className="text-sm text-gray-400 underline hover:text-gray-300"
              >
                ← Choose another arc
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

