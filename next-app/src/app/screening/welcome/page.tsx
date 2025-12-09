"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PersonaType, PERSONAS, getStoredPersona, setPersona, getPersonaFromRoute } from "@/lib/persona";

export default function ScreeningWelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [persona, setPersonaState] = useState<PersonaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // PRIORITY 1: Check URL param first (most reliable)
    const personaParam = searchParams.get('persona') as PersonaType | null;
    
    console.log('🔍 ScreeningWelcomePage: URL param persona:', personaParam);
    console.log('🔍 ScreeningWelcomePage: Current URL:', typeof window !== 'undefined' ? window.location.href : 'SSR');
    
    // PRIORITY 2: Check stored persona (fallback)
    const storedPersona = getStoredPersona();
    let routePersona = null;
    if (typeof window !== 'undefined') {
      routePersona = getPersonaFromRoute(window.location.pathname);
    }

    const selectedPersona = personaParam || storedPersona || routePersona || 'rebuilder'; // Default to rebuilder

    console.log('🔍 ScreeningWelcomePage: Persona detection', { personaParam, storedPersona, routePersona, selectedPersona });

    // Redirect to persona-specific welcome page if we have one
    if (selectedPersona && ['women', 'traveler', 'rebuilder'].includes(selectedPersona)) {
      const welcomeRoute = `/screening/welcome/${selectedPersona}`;
      console.log(`🚀 ScreeningWelcomePage: Redirecting to ${welcomeRoute}`);
      router.replace(welcomeRoute);
      return;
    }

    if (selectedPersona && Object.keys(PERSONAS).includes(selectedPersona)) {
      setPersona(selectedPersona as PersonaType);
      setPersonaState(selectedPersona as PersonaType);
      setLoading(false);
    } else {
      // If no persona detected, redirect to homepage to select one
      router.replace('/');
    }
  }, [searchParams, router]);

  const handleStartScreening = () => {
    if (!persona) return;
    
    // Store persona
    setPersona(persona);
    
    // Navigate to persona-specific welcome page or questionnaire
    if (persona === 'women') {
      router.push('/screening/welcome/women');
    } else {
      const config = PERSONAS[persona];
      router.push(config.questionnaireRoute);
    }
  };

  // Show loading while redirect happens
  const personaParam = searchParams.get('persona') as PersonaType | null;
  const storedPersona = getStoredPersona();
  let routePersona = null;
  if (typeof window !== 'undefined') {
    routePersona = getPersonaFromRoute(window.location.pathname);
  }
  const detectedPersona = personaParam || storedPersona || routePersona;
  
  if (detectedPersona && ['women', 'traveler', 'rebuilder'].includes(detectedPersona)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white text-center">
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  if (loading || !persona) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const config = PERSONAS[persona];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Free Health Screening
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Personalized health assessment for {config.name}
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-teal-500/20 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.15)] p-8 md:p-12">
          {/* What You'll Get */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-teal-400">What You'll Get</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-teal-500 mt-1">✓</span>
                <span>Personalized health risk assessment based on your profile</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-500 mt-1">✓</span>
                <span>Recommended health screenings tailored to your needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-500 mt-1">✓</span>
                <span>Free dashboard with your results and insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-500 mt-1">✓</span>
                <span>Option to upgrade to full Executive Blueprint</span>
              </li>
            </ul>
          </div>

          {/* How It Works */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-teal-400">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Answer Questions</h3>
                  <p className="text-gray-400 text-sm">Complete a brief questionnaire tailored to {config.name.toLowerCase()}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Your Results</h3>
                  <p className="text-gray-400 text-sm">Receive personalized health insights and screening recommendations</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Save & Upgrade</h3>
                  <p className="text-gray-400 text-sm">Register to save your results and unlock the full Executive Blueprint</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={handleStartScreening}
              className="flex-1 bg-teal-500 text-white font-semibold py-4 px-8 rounded-lg hover:bg-teal-600 transition-colors text-lg"
            >
              Start Free Screening
            </button>
            <Link
              href="/"
              className="flex-1 bg-transparent border border-gray-700 text-white font-semibold py-4 px-8 rounded-lg hover:border-gray-600 transition-colors text-lg text-center"
            >
              Back to Home
            </Link>
          </div>

          {/* Privacy Note */}
          <p className="text-sm text-gray-500 text-center mt-8">
            Your responses are confidential and will only be used to generate your personalized health assessment.
          </p>
        </div>
      </div>
    </div>
  );
}

