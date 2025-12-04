"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStoredPersona, getPersonaFromRoute } from "@/lib/persona";

// Redirect to welcome page with persona
export default function FreeScreeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // PRIORITY: URL param is most reliable, check it first
    const personaParam = searchParams.get('persona');
    
    console.log('FreeScreening: URL searchParams persona:', personaParam);
    console.log('FreeScreening: Full URL:', typeof window !== 'undefined' ? window.location.href : 'SSR');
    
    // If persona is explicitly in URL, use it (highest priority)
    if (personaParam) {
      console.log('FreeScreening: Using persona from URL param:', personaParam);
      if (personaParam === 'women') {
        router.replace('/screening/welcome/women');
        return;
      } else {
        router.replace(`/screening/welcome?persona=${personaParam}`);
        return;
      }
    }
    
    // Fallback: check stored persona and route
    const storedPersona = getStoredPersona();
    let routePersona = null;
    if (typeof window !== 'undefined') {
      routePersona = getPersonaFromRoute(window.location.pathname);
    }

    const persona = storedPersona || routePersona || 'rebuilder';
    
    console.log('FreeScreening: Fallback persona detection:', { storedPersona, routePersona, final: persona });

    // For women, go directly to their specific welcome page
    if (persona === 'women') {
      console.log('FreeScreening: Redirecting to /screening/welcome/women');
      router.replace('/screening/welcome/women');
    } else {
      // For other personas, go to general welcome page
      console.log('FreeScreening: Redirecting to general welcome page');
      router.replace(`/screening/welcome?persona=${persona}`);
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center">
      <div className="text-white text-center">
        <p>Redirecting to screening...</p>
      </div>
    </div>
  );
}

