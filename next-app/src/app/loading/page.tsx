"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStoredPersona, PERSONAS } from "@/lib/persona";
import ResultsLoading from "@/components/ResultsLoading";

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
            console.log("Questionnaire processed successfully", data);
            console.log("Results data:", data.results);
            
            // Store results for dashboard - ensure it's saved before redirect
            const resultsString = JSON.stringify(data.results);
            localStorage.setItem("questionnaireResults", resultsString);
            
            // Verify it was saved
            const verify = localStorage.getItem("questionnaireResults");
            console.log("Results saved to localStorage:", !!verify);
            console.log("Results key exists:", verify ? "YES" : "NO");
            
            // Update status and progress
            setStatus("Preparing your dashboard...");
            setProgress(100);
            
            // Wait a bit longer to ensure localStorage is persisted
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Redirect after a short delay to show completion
            setTimeout(() => {
              console.log("Redirecting to dashboard...");
              router.push(`${config.dashboardRoute}/free`);
            }, 1000);
            
            return true; // Success
          } else {
            const errorData = await response.json().catch(() => ({}));
            console.warn("Failed to process questionnaire:", errorData);
            setStatus("Processing complete. Redirecting...");
            // Still redirect even if processing failed
            setTimeout(() => {
              router.push(`${config.dashboardRoute}/free`);
            }, 2000);
            return false;
          }
        } catch (error) {
          console.error("Error processing questionnaire:", error);
          setStatus("Processing complete. Redirecting...");
          // Still redirect on error
          setTimeout(() => {
            router.push(`${config.dashboardRoute}/free`);
          }, 2000);
          return false;
        }
      } else {
        // Not women persona or no answers, just redirect after delay
        setTimeout(() => {
          router.push(`${config.dashboardRoute}/free`);
        }, 3000);
        return false;
      }
    };

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          // Don't go to 100% until API completes
          return 95;
        }
        return prev + 1;
      });
    }, 150);

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
    }, 3000);

    // Start processing (this will handle redirect when done)
    processQuestionnaire().then((success) => {
      // Clean up intervals when processing completes
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    });

    // Fallback: redirect after 30 seconds max (in case API hangs)
    const fallbackTimer = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      console.warn("Processing timeout, redirecting anyway");
      router.push(`${config.dashboardRoute}/free`);
    }, 30000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      clearTimeout(fallbackTimer);
    };
  }, [router, searchParams]);

  const persona = getStoredPersona() || (searchParams.get("persona") as any) || "rebuilder";
  const config = PERSONAS[persona] || PERSONAS.rebuilder;

  // Map status messages to stage labels
  const getStageLabel = (currentStatus: string): string => {
    if (currentStatus.includes("Processing")) return "Processing your responses...";
    if (currentStatus.includes("Analyzing")) return "Analyzing your health profile...";
    if (currentStatus.includes("Calculating")) return "Calculating your risk factors...";
    if (currentStatus.includes("Generating")) return "Generating personalized recommendations...";
    if (currentStatus.includes("Preparing")) return "Preparing your dashboard...";
    return currentStatus;
  };

  return (
    <ResultsLoading
      progress={progress}
      personaLabel={config.name}
      stageLabel={getStageLabel(status)}
    />
  );
}
