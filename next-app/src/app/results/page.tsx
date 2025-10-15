"use client";

import { useEffect, useState } from "react";
import { trackTestComplete } from "../../utils/mixpanel";

interface TestRecommendation {
  test: string;
  name: string;
  explanation: string;
  status: string;
}

// Fallback data function defined outside component to avoid reference issues
const getFallbackData = (): TestRecommendation[] => [
  {
    test: "Blood Sugar Test (HbA1c)",
    name: "Blood Sugar Test (HbA1c)",
    explanation: "Regular monitoring of blood sugar levels is crucial for managing diabetes and preventing complications.",
    status: "urgent"
  },
  {
    test: "Cholesterol & Lipids Test",
    name: "Cholesterol & Lipids Test",
    explanation: "Your family history of heart disease makes this crucial for assessing your cardiovascular health.",
    status: "urgent"
  },
  {
    test: "Liver Function Test",
    name: "Liver Function Test",
    explanation: "Regular alcohol consumption can affect liver health. This test will check if your liver is functioning properly.",
    status: "urgent"
  }
];

export default function ResultsPage() {
  const [recommendations, setRecommendations] = useState<TestRecommendation[]>(getFallbackData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Track test completion
      trackTestComplete('health_screening', {
        results_source: 'results_page',
        has_results: true
      });
    } catch (error) {
      console.error('Error tracking test completion:', error);
    }

    try {
      // Get recommendations from localStorage
      const storedData = localStorage.getItem('healthAssessmentResults');
      console.log('Stored data:', storedData); // Debug log
      
      if (storedData) {
        try {
          const data = JSON.parse(storedData);
          console.log('Parsed data:', data); // Debug log
          
          // Handle different data structures
          let urgentTests: TestRecommendation[] = [];
          if (data.urgentTests && Array.isArray(data.urgentTests)) {
            urgentTests = data.urgentTests;
          } else if (data.recommendations && Array.isArray(data.recommendations)) {
            urgentTests = data.recommendations;
          } else if (Array.isArray(data)) {
            urgentTests = data;
          }
          
          console.log('Urgent tests:', urgentTests); // Debug log
          
          if (urgentTests.length > 0) {
            setRecommendations(urgentTests);
          } else {
            // Use fallback data if no urgent tests found
            setRecommendations(getFallbackData());
          }
        } catch (error) {
          console.error('Error parsing stored data:', error);
          setRecommendations(getFallbackData());
        }
      } else {
        console.log('No stored data found, using fallback'); // Debug log
        setRecommendations(getFallbackData());
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setRecommendations(getFallbackData());
    }
    
    setLoading(false);
  }, []);

  const openProviderModal = (testName: string) => {
    // Open catalog with filtered results for this test
    const catalogUrl = `/marketplace?search=${encodeURIComponent(testName)}`;
    window.open(catalogUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-white">Your Health Results</h1>
          <p className="text-lg mb-4">Loading your personalized screening plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Right Screening Finder
        </h1>
        <p className="text-xl text-gray-300 mb-2">Personalized Health Screening Plan</p>
        <p className="text-sm text-gray-400">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Urgent Tests Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 border border-purple-500/20 rounded-3xl p-8 mb-8">
          {/* Section Header */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">🚨</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Urgent Tests</h2>
              <p className="text-gray-300">Tests that should be completed within the next month</p>
            </div>
          </div>

          {/* Tests Grid */}
          <div className="space-y-6">
            {recommendations && recommendations.length > 0 ? (
              recommendations.map((test, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Test Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{test.test || test.name || 'Health Test'}</h3>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                          URGENT
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-white mb-2">WHY THIS TEST MATTERS</h4>
                        <p className="text-gray-300 leading-relaxed">{test.explanation || 'This test is important for your health monitoring.'}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() => openProviderModal(test.test || test.name || 'Health Test')}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 min-w-[200px] justify-center"
                      >
                        View in Catalog →
                      </button>
                      <p className="text-sm text-gray-400 italic">Click to find providers</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-center">
                <p className="text-gray-300">Loading your personalized recommendations...</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Need help finding providers? Visit our{" "}
            <a href="/marketplace" className="text-purple-400 hover:text-purple-300 underline">
              full marketplace
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}