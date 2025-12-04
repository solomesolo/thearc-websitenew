"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredPersona, PERSONAS, PersonaType } from "@/lib/persona";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [persona, setPersona] = useState<PersonaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get persona from localStorage or URL
    const storedPersona = getStoredPersona();
    if (storedPersona) {
      setPersona(storedPersona);
    } else {
      // Default to rebuilder if no persona found
      setPersona('rebuilder');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white text-center">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const config = persona ? PERSONAS[persona] : PERSONAS.rebuilder;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Your Health Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Personalized insights for {config.name}
          </p>
        </div>

        {/* Persona Badge */}
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-teal-500/20 border border-teal-500/50 rounded-lg">
            <span className="text-teal-400 font-medium">{config.title}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Free Screening Results Card */}
          <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-teal-500/20 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.15)] p-8">
            <h2 className="text-2xl font-bold mb-4 text-teal-400">Free Screening Results</h2>
            <p className="text-gray-400 mb-6">
              Your personalized health assessment is ready. View your risk factors, recommended screenings, and next steps.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-gray-300">Risk assessment complete</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-gray-300">Screening recommendations ready</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-gray-300">Personalized insights available</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/dashboard/${persona}/free`}
                className="flex-1 text-center bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors"
              >
                View Free Results
              </Link>
              <Link
                href="/dashboard/full"
                className="flex-1 text-center bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
              >
                View Full Dashboard
              </Link>
            </div>
          </div>

          {/* Upgrade to Full Blueprint Card */}
          <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-teal-500/20 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.15)] p-8">
            <h2 className="text-2xl font-bold mb-4 text-teal-400">Executive Blueprint</h2>
            <p className="text-gray-400 mb-6">
              Unlock your complete personalized longevity plan with full access to all features and insights.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-gray-300">6-month performance path</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-gray-300">Nutrition & supplement protocols</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-gray-300">Movement & recovery plans</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-gray-300">Monthly recalibration</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="inline-block w-full text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-colors"
            >
              Upgrade to Full Blueprint
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href={`/questionnaire/${persona}`}
            className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Retake Assessment</h3>
            <p className="text-sm text-gray-400">Update your health questionnaire</p>
          </Link>

          <Link
            href="/results"
            className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">View Results</h3>
            <p className="text-sm text-gray-400">See your screening results</p>
          </Link>

          <Link
            href="/catalog"
            className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Browse Services</h3>
            <p className="text-sm text-gray-400">Explore health services</p>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-teal-500 hover:text-teal-400 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

