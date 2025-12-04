"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f]">
      <main className="flex flex-col items-center justify-center gap-8 p-8 text-center">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            The Arc
          </h1>
          <p className="text-xl text-gray-400">
            Your Personalized Longevity Platform
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
          {/* Dashboard Card */}
          <Link
            href="/dashboard"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-8 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"
          >
            <div className="space-y-3">
              <div className="text-4xl">🎯</div>
              <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
              <p className="text-gray-400">
                View your personalized blueprint and weekly actions
              </p>
            </div>
            <div className="absolute bottom-4 right-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </div>
          </Link>

          {/* Signup Card */}
          <Link
            href="/signup"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-8 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"
          >
            <div className="space-y-3">
              <div className="text-4xl">✨</div>
              <h2 className="text-2xl font-semibold text-white">Sign Up</h2>
              <p className="text-gray-400">
                Create your account and start your longevity journey
              </p>
            </div>
            <div className="absolute bottom-4 right-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </div>
          </Link>

          {/* Login Card */}
          <Link
            href="/login"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-8 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"
          >
            <div className="space-y-3">
              <div className="text-4xl">🔐</div>
              <h2 className="text-2xl font-semibold text-white">Login</h2>
              <p className="text-gray-400">
                Access your account and personalized health data
              </p>
            </div>
            <div className="absolute bottom-4 right-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <Link
            href="/account"
            className="text-gray-400 hover:text-teal-500 transition-colors"
          >
            Account Settings
          </Link>
          <span className="text-gray-600">•</span>
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-teal-500 transition-colors"
          >
            Privacy
          </Link>
          <span className="text-gray-600">•</span>
          <Link
            href="/settings"
            className="text-gray-400 hover:text-teal-500 transition-colors"
          >
            Settings
          </Link>
        </div>

        {/* Info Text */}
        <p className="mt-8 text-sm text-gray-500 max-w-md">
          The Arc Dashboard provides personalized health insights, weekly actions,
          and a comprehensive longevity blueprint tailored to your unique profile.
        </p>
      </main>
    </div>
  );
}
