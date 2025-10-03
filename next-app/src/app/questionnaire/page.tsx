"use client";

import { useEffect } from "react";

export default function QuestionnairePage() {
  useEffect(() => {
    // Redirect to the static questionnaire HTML file
    window.location.href = '/questionnaire.html';
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <p>Redirecting to questionnaire...</p>
    </div>
  );
}
