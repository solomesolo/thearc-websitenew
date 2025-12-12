"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setPersona } from "@/lib/persona";

// Read URL params directly from window.location - no useSearchParams needed
export default function FreeScreeningPage() {
  const router = useRouter();

  useEffect(() => {
    // Read persona directly from window.location.search (most reliable)
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const personaParam = urlParams.get('persona');
    
    console.log('🔍 FreeScreening: window.location.search:', window.location.search);
    console.log('🔍 FreeScreening: personaParam from URL:', personaParam);
    
    // If no persona in URL, default to rebuilder
    const persona = personaParam || 'rebuilder';
    
    console.log('✅ FreeScreening: Final persona decision:', persona);
    
    // Store the persona for future use
    if (persona) {
      setPersona(persona as 'women' | 'traveler' | 'rebuilder');
    }
    
    // Route to persona-specific welcome pages
    if (persona === 'women') {
      console.log('🚀 FreeScreening: Redirecting to /screening/welcome/women');
      router.replace('/screening/welcome/women');
    } else if (persona === 'traveler') {
      console.log('🚀 FreeScreening: Redirecting to /screening/welcome/traveler');
      router.replace('/screening/welcome/traveler');
    } else if (persona === 'rebuilder') {
      console.log('🚀 FreeScreening: Redirecting to /screening/welcome/rebuilder');
      router.replace('/screening/welcome/rebuilder');
    } else {
      console.log('🚀 FreeScreening: Redirecting to general welcome page with persona:', persona);
      router.replace(`/screening/welcome?persona=${persona}`);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center">
      <div className="text-white text-center">
        <p>Redirecting to screening...</p>
      </div>
    </div>
  );
}

