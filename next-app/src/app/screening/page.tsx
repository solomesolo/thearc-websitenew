"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ScreeningPage() {
  useEffect(() => {
    // Check if consent has already been given
    const consentGiven = localStorage.getItem("consentGiven");
    const consentTimestamp = localStorage.getItem("consentTimestamp");
    
    // If consent was given within the last 24 hours, go directly to questionnaire
    if (consentGiven === "true" && consentTimestamp) {
      const consentDate = new Date(consentTimestamp);
      const now = new Date();
      const hoursDiff = (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        window.open('/questionnaire.html', '_blank');
        return;
      }
    }
    
    // Otherwise, redirect to consent form
    window.open('/consent.html', '_blank');
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Health Screening</h1>
        <p className="text-lg mb-4">Redirecting to consent form...</p>
        <p className="text-sm text-gray-400 mb-8">
          If you're not redirected automatically,{" "}
          <Link href="/consent.html" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
            click here to start your health assessment
          </Link>
        </p>
        
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}