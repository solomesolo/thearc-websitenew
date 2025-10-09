"use client";

import { useEffect } from "react";

export default function LoadingPage() {
  useEffect(() => {
    // Redirect to the static loading HTML file
    window.location.href = '/loading.html';
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Processing Results</h1>
        <p className="text-lg mb-4">Loading your personalized health assessment...</p>
        <p className="text-sm text-gray-400">
          If you're not redirected automatically,{" "}
          <a href="/loading.html" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
            click here to continue
          </a>
        </p>
      </div>
    </div>
  );
}