"use client";

import { useEffect } from "react";

export default function EmailCollectionPage() {
  useEffect(() => {
    // Redirect to the static email collection HTML file
    window.location.href = '/email-collection.html';
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <p>Redirecting to email collection...</p>
    </div>
  );
}
