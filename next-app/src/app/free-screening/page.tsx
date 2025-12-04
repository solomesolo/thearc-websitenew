"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setPersona } from "@/lib/persona";

// Redirect to welcome page with persona
export default function FreeScreeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get persona from URL param - this is the ONLY source of truth for this page
    const personaParam = searchParams.get('persona');
    
    console.log('🔍 FreeScreening: URL searchParams persona:', personaParam);
    console.log('🔍 FreeScreening: Full URL:', typeof window !== 'undefined' ? window.location.href : 'SSR');
    
    // If no persona in URL, default to rebuilder
    const persona = personaParam || 'rebuilder';
    
    // Store the persona for future use
    if (persona) {
      setPersona(persona as 'women' | 'traveler' | 'rebuilder');
    }
    
    console.log('✅ FreeScreening: Final persona decision:', persona);
    
    // For women, go directly to their specific welcome page
    if (persona === 'women') {
      console.log('🚀 FreeScreening: Redirecting to /screening/welcome/women');
      router.replace('/screening/welcome/women');
    } else {
      // For other personas, go to general welcome page
      console.log('🚀 FreeScreening: Redirecting to general welcome page with persona:', persona);
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

