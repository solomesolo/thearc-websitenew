"use client";

import { useEffect } from "react";

export default function QuestionnairePage() {
  useEffect(() => {
    // Check if consent has been given
    const consentGiven = localStorage.getItem("consentGiven");
    const consentTimestamp = localStorage.getItem("consentTimestamp");
    
    if (consentGiven === "true" && consentTimestamp) {
      const consentDate = new Date(consentTimestamp);
      const now = new Date();
      const hoursDiff = (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        // Consent is valid, proceed to questionnaire
        window.open('/questionnaire.html', '_blank');
        return;
      }
    }
    
    // No valid consent, redirect to consent form
    window.open('/consent.html', '_blank');
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Health Questionnaire</h1>
        <p className="text-lg mb-4">Checking consent and loading your personalized health assessment...</p>
        <p className="text-sm text-gray-400">
          If you're not redirected automatically,{" "}
          <a href="/consent.html" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
            click here to start
          </a>
        </p>
      </div>
    </div>
  );
}