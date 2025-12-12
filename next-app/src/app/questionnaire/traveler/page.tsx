"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { setPersona } from "@/lib/persona";

// Question data structure
interface Question {
  id: string;
  text: string;
  whyMatters: string;
  type: "text" | "select" | "scale" | "checkbox";
  options?: string[];
  scaleLabels?: { min: string; max: string };
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
}

const sections: Section[] = [
  {
    id: "background",
    title: "Personal Background & Health Context",
    questions: [
      {
        id: "BG1",
        text: "What is your age?",
        whyMatters: "Age helps us understand your health baseline and risk factors.",
        type: "text",
      },
      {
        id: "BG2",
        text: "What is your gender?",
        whyMatters: "Gender helps us tailor recommendations to your biological needs.",
        type: "select",
        options: ["Woman", "Man", "Non-binary", "Prefer not to say"],
      },
      {
        id: "BG3",
        text: "What is your height?",
        whyMatters: "Used to calculate BMI and understand metabolism, energy needs, and recovery patterns.",
        type: "text",
      },
      {
        id: "BG4",
        text: "What is your weight?",
        whyMatters: "Used to calculate BMI and understand metabolism, energy needs, and recovery patterns.",
        type: "text",
      },
      {
        id: "BG7",
        text: "Have you ever been told by a healthcare professional that you have any of the following?",
        whyMatters: "Existing conditions help us understand your health risks and tailor recommendations.",
        type: "checkbox",
        options: [
          "High blood pressure",
          "High cholesterol",
          "Prediabetes or diabetes",
          "Thyroid condition",
          "Anxiety or depression",
          "Autoimmune condition",
          "None of the above",
        ],
      },
      {
        id: "BG8",
        text: "Did any close family member develop the following before age 60?",
        whyMatters: "Family history helps assess genetic risk factors.",
        type: "checkbox",
        options: [
          "Heart disease or stroke",
          "Diabetes",
          "Dementia or significant memory decline",
          "None of the above",
        ],
      },
      {
        id: "BG9",
        text: "Do you have upcoming travel in the next 6 weeks?",
        whyMatters: "Upcoming travel affects immediate recommendations and screening priorities.",
        type: "select",
        options: ["No", "Yes"],
      },
      {
        id: "BG10",
        text: "On typical travel days, how long are you seated (car, train, flights)?",
        whyMatters: "Extended sitting affects circulation, metabolism, and recovery.",
        type: "select",
        options: ["<2 hours", "2–4 hours", "4–6 hours", "6–8 hours", "8+ hours"],
      },
    ],
  },
  {
    id: "energy",
    title: "Energy, Fatigue & Vitality",
    questions: [
      {
        id: "F1",
        text: "How often do you feel physically worn out by early afternoon?",
        whyMatters: "Afternoon fatigue can indicate sleep quality, stress load, or metabolic issues.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "F2",
        text: "How often does low energy limit what you can do during the day?",
        whyMatters: "Energy limitations affect daily function and quality of life.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "F3",
        text: "How refreshed do you feel when waking up?",
        whyMatters: "Morning refreshment indicates sleep quality and recovery.",
        type: "scale",
        scaleLabels: { min: "Extremely", max: "Not at all" },
      },
    ],
  },
  {
    id: "sleep",
    title: "Sleep & Circadian Rhythm",
    questions: [
      {
        id: "S1",
        text: "How often do you struggle to fall asleep within a reasonable time?",
        whyMatters: "Sleep onset issues can indicate circadian disruption or stress.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "S2",
        text: "How often do you wake during the night and stay awake longer than you want?",
        whyMatters: "Night wakings disrupt sleep quality and recovery.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "S3",
        text: "How consistent is your bedtime from day to day?",
        whyMatters: "Bedtime consistency supports circadian rhythm stability.",
        type: "scale",
        scaleLabels: { min: "Very consistent", max: "Very inconsistent" },
      },
      {
        id: "S4",
        text: "How often does travel, work, or schedule changes disrupt your sleep?",
        whyMatters: "Travel-related sleep disruption is common for global movers.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "S5",
        text: "How often does poor sleep affect your mood or thinking the next day?",
        whyMatters: "Sleep quality directly impacts cognitive function and emotional regulation.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
    ],
  },
  {
    id: "stress",
    title: "Stress & Emotional Wellbeing",
    questions: [
      {
        id: "ST1",
        text: "How often do you feel mentally overwhelmed by daily responsibilities?",
        whyMatters: "Mental overwhelm indicates high stress load and potential burnout risk.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "ST2",
        text: "How often do you feel unable to relax, even when you have downtime?",
        whyMatters: "Difficulty relaxing suggests chronic stress and nervous system dysregulation.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "M1",
        text: "How often do you feel down, discouraged, or low in mood?",
        whyMatters: "Mood patterns can reflect stress, sleep, or underlying health issues.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "M2",
        text: "How often do worry or stress make it hard to focus?",
        whyMatters: "Stress-related focus issues affect productivity and cognitive function.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
    ],
  },
  {
    id: "physical",
    title: "Pain, Physical Function & Mobility",
    questions: [
      {
        id: "P1",
        text: "How often do aches or pains limit your daily activities?",
        whyMatters: "Pain limitations affect mobility and quality of life.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "P2",
        text: "How often do you avoid movement or exercise because of discomfort?",
        whyMatters: "Avoiding movement due to pain can worsen physical function over time.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "PF1",
        text: "How difficult is it to stay active (walking, stairs, lifting) during travel days?",
        whyMatters: "Travel days often reduce activity levels, affecting health.",
        type: "scale",
        scaleLabels: { min: "Not difficult", max: "Extremely difficult" },
      },
      {
        id: "PF2",
        text: "How often do long periods of sitting (flights or trains) cause stiffness or soreness?",
        whyMatters: "Sitting-related stiffness is common for frequent travelers.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
    ],
  },
  {
    id: "cognition",
    title: "Cognition & Focus",
    questions: [
      {
        id: "C1",
        text: "How often do you lose track of tasks or conversations?",
        whyMatters: "Cognitive tracking issues can indicate stress, sleep, or brain health concerns.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "C2",
        text: "How often do you struggle to stay mentally sharp when tired or stressed?",
        whyMatters: "Mental sharpness under stress reflects cognitive resilience and recovery capacity.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
    ],
  },
  {
    id: "digestive",
    title: "Digestive & Immune Wellness",
    questions: [
      {
        id: "G1",
        text: "How often do you experience bloating, digestive discomfort, or irregularity?",
        whyMatters: "Digestive symptoms can reflect diet, stress, or gut health issues.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "IMM1",
        text: "How often do you feel run-down or more prone to getting sick during travel?",
        whyMatters: "Travel-related immune vulnerability is common for global movers.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle, Nutrition & Movement",
    questions: [
      {
        id: "L1",
        text: "How often do you consume highly processed or sugary foods on busy or travel days?",
        whyMatters: "Processed foods on travel days can affect energy, digestion, and inflammation.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Almost always" },
      },
      {
        id: "L2",
        text: "How often do you reach at least 20 minutes of moderate movement (walking, stairs, mobility drills)?",
        whyMatters: "Regular movement supports metabolism, circulation, and recovery.",
        type: "scale",
        scaleLabels: { min: "Almost always", max: "Never" },
      },
    ],
  },
  {
    id: "red-flags",
    title: "Safety / Medical Red Flags",
    questions: [
      {
        id: "R1",
        text: "Have you recently experienced chest discomfort, unexplained breathlessness, or sudden dizziness?",
        whyMatters: "These symptoms may require immediate medical attention.",
        type: "select",
        options: ["No", "Yes"],
      },
      {
        id: "R2",
        text: "In the past month, has stress or mood significantly affected your ability to function?",
        whyMatters: "Severe stress or mood issues may need professional support.",
        type: "select",
        options: ["No", "Yes"],
      },
      {
        id: "R3",
        text: "Are you experiencing any symptoms you feel may need prompt medical evaluation?",
        whyMatters: "Trust your instincts about symptoms that concern you.",
        type: "select",
        options: ["No", "Yes"],
      },
    ],
  },
];

export default function TravelerQuestionnairePage() {
  const router = useRouter();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPersona("traveler");
    console.log("✅ Traveler questionnaire page loaded - persona set to traveler");
    console.log("✅ Current URL:", typeof window !== 'undefined' ? window.location.href : 'SSR');
  }, []);

  const currentSection = sections[currentSectionIndex];
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;
  
  // Section display number (0-indexed for display)
  const sectionDisplayNumber = currentSectionIndex;

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Map answers to match backend expectations
      // Convert question IDs to match the config format
      const mappedAnswers: Record<string, any> = {};
      
      Object.entries(answers).forEach(([key, value]) => {
        // Handle BG2 gender mapping
        if (key === "BG2") {
          const genderMap: Record<string, string> = {
            "Woman": "Woman",
            "Man": "Man",
            "Non-binary": "Non-binary",
            "Prefer not to say": "Prefer not to say",
          };
          mappedAnswers[key] = genderMap[value] || value;
        }
        // Handle BG9 and BG10 - they should match scale options
        else if (key === "BG9") {
          mappedAnswers[key] = value === "Yes" ? "Yes" : "No";
        }
        // Handle BG10 - keep as is
        else if (key === "BG10") {
          mappedAnswers[key] = value;
        }
        // Handle R1, R2, R3 - yes/no questions
        else if (key.startsWith("R")) {
          mappedAnswers[key] = value === "Yes" ? "Yes" : "No";
        }
        // Handle numeric inputs (BG1, BG3, BG4)
        else if (key === "BG1" || key === "BG3" || key === "BG4") {
          const numValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
          mappedAnswers[key] = isNaN(numValue) ? undefined : numValue;
        }
        // Handle multi-select (BG7, BG8)
        else if (key === "BG7" || key === "BG8") {
          mappedAnswers[key] = Array.isArray(value) ? value : [value].filter(Boolean);
        }
        // Handle scale questions - map to scale values
        else {
          mappedAnswers[key] = value;
        }
      });
      
      // Save answers to localStorage as backup
      localStorage.setItem("questionnaireAnswers", JSON.stringify(mappedAnswers));
      localStorage.setItem("questionnairePersona", "traveler");
      
      // Check if user is logged in by trying to save to backend
      let isLoggedIn = false;
      try {
        const response = await fetch("/api/questionnaire/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            persona: "traveler",
            responseData: mappedAnswers,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Questionnaire saved to backend:", data.responseId);
          isLoggedIn = true;
        } else if (response.status === 401) {
          // User not logged in
          isLoggedIn = false;
        } else {
          console.warn("Failed to save to backend, using localStorage only");
        }
      } catch (error) {
        console.warn("Backend save failed, using localStorage:", error);
        // Continue with localStorage fallback
      }
      
      // Redirect based on login status
      if (isLoggedIn) {
        // User is logged in, go directly to loading page
        router.push("/loading?persona=traveler");
      } else {
        // User not logged in, redirect to signup with persona info
        router.push("/signup?persona=traveler&redirect=/loading");
      }
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: Question) => {
    const value = answers[question.id];

    switch (question.type) {
      case "text":
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm font-medium placeholder-gray-400 focus:border-[#40e0c2] focus:ring-1 focus:ring-[#40e0c2] outline-none transition-all hover:border-white/20"
            placeholder="Enter your answer"
          />
        );

      case "select":
        return (
          <div className="relative">
            <select
              value={value || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full appearance-none bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm font-medium focus:border-[#40e0c2] focus:ring-1 focus:ring-[#40e0c2] outline-none transition-all hover:border-white/20 cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2340e0c2' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem'
              }}
            >
              <option value="" disabled className="bg-[#0a0a0a] text-gray-400">
                Select an option
              </option>
              {question.options?.map((option) => (
                <option key={option} value={option} className="bg-[#0a0a0a] text-white py-2">
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "checkbox":
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a0a] border border-gray-700 hover:border-[#40e0c2]/50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...selectedValues, option]
                      : selectedValues.filter((v) => v !== option);
                    handleAnswerChange(question.id, newValues);
                  }}
                  className="w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-[#40e0c2] focus:ring-[#40e0c2] focus:ring-offset-0"
                />
                <span className="text-white text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case "scale":
        const scaleSteps = 5;
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>{question.scaleLabels?.min}</span>
              <span>{question.scaleLabels?.max}</span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: scaleSteps }).map((_, index) => {
                const stepValue = index;
                const isSelected = value === stepValue;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAnswerChange(question.id, stepValue)}
                    className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-[#40e0c2] bg-[#40e0c2]/10 text-[#40e0c2]"
                        : "border-white/10 bg-[#0a0a0a] text-white/60 hover:border-white/20"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Screening Questionnaire</h1>
          <p className="text-gray-400 text-lg">For Digital Nomads & Global Movers</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Section {sectionDisplayNumber + 1} of {sections.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-[#40e0c2] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlowCard className="p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentSection.title}</h2>
              
              <div className="space-y-8 mt-8">
                {currentSection.questions.map((question) => (
                  <div key={question.id} className="space-y-3">
                    <div className="flex items-start gap-2">
                      <label className="text-lg font-medium text-white flex-1">
                        {question.text}
                      </label>
                      <InfoTooltip content={question.whyMatters} />
                    </div>
                    {renderQuestion(question)}
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentSectionIndex === 0}
            className="px-6 py-3 rounded-lg border border-white/10 bg-[#0a0a0a] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#40e0c2]/50 transition-all"
          >
            Previous
          </button>

          {currentSectionIndex < sections.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-lg bg-[#40e0c2] text-slate-950 font-semibold hover:bg-[#40e0c2]/90 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-[#40e0c2] text-slate-950 font-semibold hover:bg-[#40e0c2]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
