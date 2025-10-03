"use client";

import { useEffect } from "react";

export default function LoadingPage() {
  useEffect(() => {
    // Redirect to the static loading HTML file
    window.location.href = '/loading.html';
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <p>Redirecting to loading...</p>
    </div>
  );
}
