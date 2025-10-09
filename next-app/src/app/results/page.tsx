"use client";

import { useEffect } from "react";
import { trackTestComplete } from "../../utils/mixpanel";

export default function ResultsPage() {
  useEffect(() => {
    // Track test completion
    trackTestComplete('health_screening', {
      results_source: 'results_page',
      has_results: true
    });
    
    // Redirect to the static results HTML file
    window.location.href = '/results.html';
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Health Results</h1>
        <p className="text-lg mb-4">Loading your personalized screening plan...</p>
        <p className="text-sm text-gray-400">
          If you're not redirected automatically,{" "}
          <a href="/results.html" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
            click here to view results
          </a>
        </p>
      </div>
    </div>
  );
}