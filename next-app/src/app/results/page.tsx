"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TestRecommendation {
  test: string;
  name: string;
  explanation: string;
  status: string;
}

// Fallback data - defined outside component to avoid hydration issues
const getFallbackData = (): TestRecommendation[] => [
  {
    test: "Blood Sugar Test (HbA1c)",
    name: "Blood Sugar Test (HbA1c)",
    explanation: "Regular monitoring of blood sugar levels is crucial for managing diabetes and preventing complications. Based on your age and lifestyle factors, an HbA1c test is particularly important for you. This test measures your average blood sugar levels over the past 2-3 months, providing a more comprehensive picture than a single glucose reading.",
    status: "urgent"
  },
  {
    test: "Cholesterol & Lipids Test",
    name: "Cholesterol & Lipids Test",
    explanation: "Your family history of heart disease makes this crucial for assessing your cardiovascular health. This comprehensive lipid panel will measure your total cholesterol, LDL, HDL, and triglycerides to assess your heart disease risk and guide preventive care strategies.",
    status: "urgent"
  },
  {
    test: "Liver Function Test",
    name: "Liver Function Test",
    explanation: "Regular alcohol consumption can affect liver health. This test will check if your liver is functioning properly by measuring key enzymes and proteins that indicate liver function and potential damage.",
    status: "urgent"
  }
];

export default function ResultsPage() {
  const [recommendations, setRecommendations] = useState<TestRecommendation[]>(getFallbackData());
  const router = useRouter();

  useEffect(() => {
    // Load test data from localStorage or use fallback
    let tests = getFallbackData();
    
    try {
      const storedData = localStorage.getItem('healthAssessmentResults');
      if (storedData) {
        const data = JSON.parse(storedData);
        
        if (data.urgentTests && Array.isArray(data.urgentTests)) {
          tests = data.urgentTests;
        } else if (data.recommendations && Array.isArray(data.recommendations)) {
          tests = data.recommendations;
        } else if (Array.isArray(data)) {
          tests = data;
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    
    setRecommendations(tests);
  }, []);

  const openProviderModal = (testName: string) => {
    const catalogUrl = `/marketplace?search=${encodeURIComponent(testName)}`;
    console.log('Navigating to:', catalogUrl);
    router.push(catalogUrl);
  };

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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        
        {/* Assessment Summary Section */}
        <div className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 border border-purple-500/20 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">ASSESSMENT SUMMARY</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Based on your responses, we recommend a comprehensive health screening approach. Your age and lifestyle factors suggest focusing on cardiovascular health, metabolic markers, and preventive care. We've identified several key areas that would benefit from testing to optimize your health and longevity.
          </p>
        </div>

        {/* Urgent Tests Section */}
        <div className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 border border-purple-500/20 rounded-3xl p-8 mb-8">
          {/* Section Header */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">!</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">URGENT TESTS (TOP PRIORITY)</h2>
              <p className="text-gray-300">Tests that should be completed within the next month</p>
            </div>
          </div>

          {/* Test Cards */}
          <div className="space-y-6">
            {recommendations.length === 0 ? (
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-center">
                <p className="text-gray-300">No recommendations available at this time.</p>
              </div>
            ) : (
              recommendations.map((test, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Test Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {test.test || test.name || 'Health Test'}
                        </h3>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                          URGENT
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-white mb-2">WHY THIS TEST MATTERS</h4>
                        <p className="text-gray-300 leading-relaxed">
                          {test.explanation || 'This test is important for your health monitoring.'}
                        </p>
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
            )}
          </div>
        </div>

        {/* Recommended Tests Section */}
        <div className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 border border-purple-500/20 rounded-3xl p-8 mb-8">
          {/* Section Header */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">+</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">RECOMMENDED TESTS</h2>
              <p className="text-gray-300">Additional tests to consider for comprehensive health monitoring</p>
            </div>
          </div>

          {/* Recommended Test Cards */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Test Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">Complete Blood Count (CBC)</h3>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white mb-2">WHY THIS TEST MATTERS</h4>
                    <p className="text-gray-300 leading-relaxed">
                      A CBC provides a comprehensive overview of your blood health, checking for anemia, infections, and other blood-related conditions. This baseline test is essential for understanding your overall health status.
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => openProviderModal('Complete Blood Count')}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 min-w-[200px] justify-center"
                  >
                    View in Catalog →
                  </button>
                  <p className="text-sm text-gray-400 italic">Click to find providers</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Test Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">Thyroid Function Test</h3>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white mb-2">WHY THIS TEST MATTERS</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Thyroid function affects your metabolism, energy levels, and overall well-being. This test helps identify thyroid disorders that can impact your quality of life and require proper management.
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => openProviderModal('Thyroid Function Test')}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 min-w-[200px] justify-center"
                  >
                    View in Catalog →
                  </button>
                  <p className="text-sm text-gray-400 italic">Click to find providers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
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