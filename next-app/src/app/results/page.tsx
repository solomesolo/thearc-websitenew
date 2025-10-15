"use client";

import { useEffect } from "react";

export default function ResultsPage() {
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.replace('/results.html');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Health Results</h1>
        <p className="text-lg mb-4">Redirecting to your personalized screening plan...</p>
        <p className="text-sm text-gray-400">
          If you're not redirected automatically,{" "}
          <a href="/results.html" className="text-purple-400 hover:text-purple-300 underline">
            click here to view results
          </a>
        </p>
      </div>
    </div>
  );
}