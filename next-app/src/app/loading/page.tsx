"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getStoredPersona, PERSONAS } from "@/lib/persona";

export default function LoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Processing your responses...");

  useEffect(() => {
    const persona = getStoredPersona() || (searchParams.get("persona") as any) || "rebuilder";
    const config = PERSONAS[persona] || PERSONAS.rebuilder;

    // Get questionnaire answers from localStorage
    const questionnaireAnswers = localStorage.getItem("questionnaireAnswers");
    const answers = questionnaireAnswers ? JSON.parse(questionnaireAnswers) : null;

    // Process questionnaire if we have answers and it's women persona
    const processQuestionnaire = async () => {
      if (persona === "women" && answers) {
        try {
          setStatus("Processing your responses...");
          
          // Call the processing API
          const response = await fetch("/api/questionnaire/process-women", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              persona: "women",
              responseData: answers,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            // Store results for dashboard
            localStorage.setItem("questionnaireResults", JSON.stringify(data.results));
            console.log("Questionnaire processed successfully");
          } else {
            console.warn("Failed to process questionnaire, using fallback");
          }
        } catch (error) {
          console.error("Error processing questionnaire:", error);
          // Continue with fallback flow
        }
      }
    };

    // Start processing
    processQuestionnaire();

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Update status messages
    const statusMessages = [
      "Processing your responses...",
      "Analyzing your health profile...",
      "Calculating your risk factors...",
      "Generating personalized recommendations...",
      "Preparing your dashboard...",
    ];

    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      if (statusIndex < statusMessages.length - 1) {
        statusIndex++;
        setStatus(statusMessages[statusIndex]);
      }
    }, 2000);

    // Redirect after processing (5-6 seconds to allow API call)
    const redirectTimer = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      
      // Redirect to persona-specific free dashboard
      router.push(`${config.dashboardRoute}/free`);
    }, 6000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      clearTimeout(redirectTimer);
    };
  }, [router, searchParams]);

  const persona = getStoredPersona() || (searchParams.get("persona") as any) || "rebuilder";
  const config = PERSONAS[persona] || PERSONAS.rebuilder;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-teal-500/20 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.15)] p-12 text-center"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#6FFFC3] to-teal-400 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#6FFFC3] to-teal-400 bg-clip-text text-transparent"
          >
            Processing Your Results
          </motion.h1>

          {/* Status Message */}
          <motion.p
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-lg text-gray-300 mb-8 min-h-[28px]"
          >
            {status}
          </motion.p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-gray-800">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4AF7A3] to-[#6FFFC3]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">{progress}% Complete</p>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center gap-2 mb-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-[#6FFFC3]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Info Text */}
          <p className="text-sm text-gray-500">
            Your personalized health assessment for <span className="text-teal-400">{config.name}</span> is being generated...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
