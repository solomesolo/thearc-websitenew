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
    const routePersona = getPersonaFromRoute(window.location.pathname);

    const persona = personaParam || storedPersona || routePersona || 'rebuilder';

    // For women, go directly to their specific welcome page
    if (persona === 'women') {
      router.push('/screening/welcome/women');
    } else {
      // For other personas, go to general welcome page
      router.push(`/screening/welcome?persona=${persona}`);
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

