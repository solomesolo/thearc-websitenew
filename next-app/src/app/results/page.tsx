"use client";

import { useEffect } from "react";

export default function ResultsPage() {
  useEffect(() => {
    // Redirect to the static results HTML file
    window.location.href = '/results.html';
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <p>Redirecting to results...</p>
    </div>
  );
}
