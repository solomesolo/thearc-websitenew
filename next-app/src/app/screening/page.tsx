"use client";

import { useEffect } from "react";

export default function ScreeningPage() {
  useEffect(() => {
    // Redirect to the static screening HTML file
    window.location.href = '/screening.html';
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg mb-4">Redirecting to health screening...</p>
        <p className="text-sm text-gray-400">If you're not redirected automatically, <a href="/screening.html" className="text-fuchsia-400 hover:text-fuchsia-300 underline">click here</a></p>
      </div>
    </div>
  );
}
