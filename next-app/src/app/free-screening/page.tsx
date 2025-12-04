"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStoredPersona, getPersonaFromRoute } from "@/lib/persona";

// Redirect to welcome page with persona
export default function FreeScreeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get persona from URL param, stored value, or route
    const personaParam = searchParams.get('persona');
    const storedPersona = getStoredPersona();
    
    // Try to get route persona if available
    let routePersona = null;
    if (typeof window !== 'undefined') {
      routePersona = getPersonaFromRoute(window.location.pathname);
    }

    const persona = personaParam || storedPersona || routePersona || 'rebuilder';
    
    console.log('FreeScreening: Detected persona:', { personaParam, storedPersona, routePersona, final: persona });

    // For women, go directly to their specific welcome page
    // Use replace to avoid showing intermediate page
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

