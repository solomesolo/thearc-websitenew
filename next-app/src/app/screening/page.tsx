"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ScreeningPage() {
  useEffect(() => {
    // Redirect to the questionnaire page
    window.location.href = '/questionnaire';
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Health Screening</h1>
        <p className="text-lg mb-4">Redirecting to health questionnaire...</p>
        <p className="text-sm text-gray-400 mb-8">
          If you're not redirected automatically,{" "}
          <Link href="/questionnaire" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
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