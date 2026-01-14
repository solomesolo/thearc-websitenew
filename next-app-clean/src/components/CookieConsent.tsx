"use client";

import React, { useState, useEffect } from 'react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowModal(false);
    setShowBanner(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm border-t border-white/10 p-4 md:p-6" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                We value your privacy
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                We use cookies to improve your experience, analyze website traffic, and personalize content. 
                You can accept all cookies, manage your preferences, or continue with essential cookies only.
                <br />
                <a href="/privacy-policy" className="text-[#40e0c2] hover:text-[#40e0c2]/80 underline">
                  For more details, see our Privacy Policy
                </a>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-[#40e0c2] text-black rounded-full font-medium hover:bg-[#40e0c2]/90 transition-all"
              >
                Accept all cookies
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-6 py-2 border border-white/20 text-white/80 rounded-full font-medium hover:bg-white/5 transition-all"
              >
                Reject non-essential cookies
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 text-[#40e0c2] hover:text-[#40e0c2]/80 font-medium transition-all"
              >
                Manage preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10" style={{ backgroundColor: 'var(--page-bg)' }}>
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Cookie Preferences</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Essential cookies</h3>
                    <p className="text-sm text-white/70">Required for site functionality (cannot be disabled)</p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-[#40e0c2] rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 border border-white/10 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Analytics cookies</h3>
                    <p className="text-sm text-white/70">Help us understand how our website is used</p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.analytics ? 'bg-[#40e0c2] justify-end' : 'bg-white/20 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 border border-white/10 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Marketing cookies</h3>
                    <p className="text-sm text-white/70">Used to deliver relevant offers and measure ad effectiveness</p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.marketing ? 'bg-[#40e0c2] justify-end' : 'bg-white/20 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                    </button>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-4 border border-white/10 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Functional cookies</h3>
                    <p className="text-sm text-white/70">Enable personalization and saved preferences</p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => togglePreference('functional')}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.functional ? 'bg-[#40e0c2] justify-end' : 'bg-white/20 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-[#40e0c2] text-black rounded-full font-medium hover:bg-[#40e0c2]/90 transition-all"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-white/20 text-white/80 rounded-full font-medium hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
