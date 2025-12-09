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
    id: "basic-info",
    title: "Basic Info",
    questions: [
      {
        id: "0.1",
        text: "Age",
        whyMatters: "Age helps us understand where you may be in the menopausal transition.",
        type: "text",
      },
      {
        id: "0.2",
        text: "Height & Weight",
        whyMatters: "Used to understand metabolism, energy needs, and recovery patterns.",
        type: "text",
      },
      {
        id: "0.3",
        text: "Menstrual Status",
        whyMatters: "Your cycle pattern helps determine whether symptoms are hormonal or lifestyle-driven.",
        type: "select",
        options: [
          "Regular periods",
          "Irregular periods",
          "No period 12+ months",
          "Hormonal contraception",
          "Hysterectomy",
        ],
      },
      {
        id: "0.4",
        text: "Hormone Therapy Use (HRT)",
        whyMatters: "HRT changes symptoms and action recommendations.",
        type: "select",
        options: ["No", "Estrogen", "Progesterone", "Combined", "Testosterone/DHEA"],
      },
      {
        id: "0.5",
        text: "Diagnosed Conditions",
        whyMatters: "Certain conditions change nutrition, stress, and screening recommendations.",
        type: "checkbox",
        options: [
          "Thyroid condition",
          "High blood pressure",
          "High cholesterol",
          "Diabetes/prediabetes",
          "Anxiety/depression",
          "None",
        ],
      },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition",
    questions: [
      {
        id: "1.1",
        text: "How often do you eat highly processed foods?",
        whyMatters: "Highly processed foods increase inflammation and energy swings.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Multiple/day" },
      },
      {
        id: "1.2",
        text: "How often do you eat omega-3 rich foods?",
        whyMatters: "Omega-3s reduce inflammation, improve mood, and support hormone balance.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Daily" },
      },
      {
        id: "1.3",
        text: "How often do you drink caffeine after 14:00?",
        whyMatters: "Afternoon caffeine can disrupt sleep and worsen stress levels.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Multiple cups" },
      },
      {
        id: "1.4",
        text: "How many servings of vegetables do you eat daily?",
        whyMatters: "Vegetables support digestion, energy, and anti-inflammatory balance.",
        type: "scale",
        scaleLabels: { min: "<1", max: "8+" },
      },
      {
        id: "1.5",
        text: "How often do meals leave you bloated or sluggish?",
        whyMatters: "Digestive symptoms can reflect gut stress, food triggers, or hormone shifts.",
        type: "scale",
        scaleLabels: { min: "Not at all", max: "Extremely" },
      },
    ],
  },
  {
    id: "supplements",
    title: "Supplements",
    questions: [
      {
        id: "2.1",
        text: "Are you currently taking Vitamin D consistently?",
        whyMatters: "Vitamin D affects energy, immunity, and hormone balance.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Always" },
      },
      {
        id: "2.2",
        text: "Are you taking Magnesium in the evening?",
        whyMatters: "Magnesium supports sleep quality and stress resilience.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Always" },
      },
      {
        id: "2.3",
        text: "Are you taking Omega-3 supplements consistently?",
        whyMatters: "Omega-3s reduce inflammation and support cognitive function.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Always" },
      },
    ],
  },
  {
    id: "movement",
    title: "Movement & Recovery",
    questions: [
      {
        id: "3.1",
        text: "How many days per week do you exercise for 30+ minutes?",
        whyMatters: "Regular movement stabilizes energy, mood, and metabolism.",
        type: "scale",
        scaleLabels: { min: "None", max: "Daily" },
      },
      {
        id: "3.2",
        text: "How many strength training sessions per week?",
        whyMatters: "Strength training supports metabolism, bone health, and longevity.",
        type: "scale",
        scaleLabels: { min: "None", max: "5+" },
      },
      {
        id: "3.3",
        text: "How often do you take short movement breaks during the day?",
        whyMatters: "Movement breaks prevent energy crashes and lower stress load.",
        type: "scale",
        scaleLabels: { min: "Never", max: "4+ times/day" },
      },
      {
        id: "3.4",
        text: "Do you do any stretching or mobility in the evening?",
        whyMatters: "Evening mobility helps recovery and supports better sleep.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Daily" },
      },
    ],
  },
  {
    id: "screenings",
    title: "Screenings / Checks",
    questions: [
      {
        id: "4.1",
        text: "When was your last full blood panel?",
        whyMatters: "Knowing your baseline helps detect early metabolic or hormonal shifts.",
        type: "scale",
        scaleLabels: { min: "Never", max: "<6 months" },
      },
      {
        id: "4.2",
        text: "Have you completed cortisol rhythm testing?",
        whyMatters: "Cortisol patterns reveal underlying stress and fatigue issues.",
        type: "scale",
        scaleLabels: { min: "No", max: "Yes within 1 year" },
      },
      {
        id: "4.3",
        text: "Do you have recent labs available to upload?",
        whyMatters: "Your current results help personalize recommendations.",
        type: "select",
        options: ["No", "Yes"],
      },
      {
        id: "4.4",
        text: "Vitamin D blood test status",
        whyMatters: "Low Vitamin D worsens sleep, mood, and inflammation.",
        type: "select",
        options: [
          "Not tested",
          "Tested >1 year ago",
          "Tested within 1 year – abnormal",
          "Tested within 1 year – normal",
        ],
      },
      {
        id: "4.5",
        text: "Blood sugar (HbA1c or fasting glucose) test status",
        whyMatters: "Blood sugar stability affects energy, mood, weight, and sleep.",
        type: "select",
        options: [
          "Not tested",
          "Tested >1 year ago",
          "Tested within 1 year – abnormal",
          "Tested within 1 year – normal",
        ],
      },
      {
        id: "4.6",
        text: "Lipid panel test status",
        whyMatters: "Menopause increases cardiovascular risk — lipids matter early.",
        type: "select",
        options: [
          "Not tested",
          "Tested >1 year ago",
          "Tested within 1 year – abnormal",
          "Tested within 1 year – normal",
        ],
      },
    ],
  },
  {
    id: "environment",
    title: "Environment",
    questions: [
      {
        id: "5.1",
        text: "How bright is your environment 2 hours before bed?",
        whyMatters: "Evening light directly impacts sleep quality and circadian rhythm.",
        type: "scale",
        scaleLabels: { min: "Very dim", max: "Very bright" },
      },
      {
        id: "5.2",
        text: "How often do you use screens in the hour before bed?",
        whyMatters: "Screen light suppresses melatonin and disrupts sleep.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Constantly" },
      },
    ],
  },
  {
    id: "red-flags",
    title: "Red Flags",
    questions: [
      {
        id: "6.1",
        text: "Do you experience midday energy crashes?",
        whyMatters: "Midday crashes are early signs of hormonal, stress, or glucose issues.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Daily" },
      },
      {
        id: "6.2",
        text: "Do you experience intermittent headaches?",
        whyMatters: "Headaches can reflect dehydration, hormones, stress, or sleep issues.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Frequent" },
      },
    ],
  },
  {
    id: "key-metrics",
    title: "Key Metrics Inputs",
    questions: [
      {
        id: "7.1",
        text: "Do you feel under pressure most days?",
        whyMatters: "Persistent pressure raises stress load and impacts recovery.",
        type: "scale",
        scaleLabels: { min: "Not at all", max: "Extremely" },
      },
      {
        id: "7.2",
        text: "Does stress linger in your body after stressful events?",
        whyMatters: "This reveals how well your nervous system resets.",
        type: "scale",
        scaleLabels: { min: "Not at all", max: "Extremely" },
      },
      {
        id: "7.3",
        text: "Do you feel 'wired but tired' at night?",
        whyMatters: "A classic sign of cortisol rhythm imbalance.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Always" },
      },
      {
        id: "7.4",
        text: "Do you wake between 3–5 AM?",
        whyMatters: "Early waking often reflects cortisol or glucose instability.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Always" },
      },
      {
        id: "7.5",
        text: "Do you struggle to fall asleep?",
        whyMatters: "Indicates circadian or lifestyle disruption.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Always" },
      },
      {
        id: "7.6",
        text: "How refreshed do you feel on waking?",
        whyMatters: "The clearest indicator of sleep depth and recovery.",
        type: "scale",
        scaleLabels: { min: "Very refreshed", max: "Very unrefreshed" },
      },
      {
        id: "7.7",
        text: "Do you experience mental fatigue by the end of the day?",
        whyMatters: "Signals cognitive load and recovery deficits.",
        type: "scale",
        scaleLabels: { min: "None", max: "Severe" },
      },
      {
        id: "7.8",
        text: "Do you struggle to focus or think clearly?",
        whyMatters: "Cognitive symptoms often link to sleep, stress, or inflammation.",
        type: "scale",
        scaleLabels: { min: "Never", max: "Daily" },
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
      // Save answers to localStorage as backup
      localStorage.setItem("questionnaireAnswers", JSON.stringify(answers));
      localStorage.setItem("questionnairePersona", "traveler");
      
      // Check if user is logged in by trying to save to backend
      let isLoggedIn = false;
      try {
        const response = await fetch("/api/questionnaire/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            persona: "traveler",
            responseData: answers,
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
      setError("Failed to submit questionnaire. Please try again.");
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
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm font-medium placeholder-gray-400 focus:border-[#6FFFC3] focus:ring-1 focus:ring-[#6FFFC3] outline-none transition-all hover:border-white/20"
            placeholder="Enter your answer"
          />
        );

      case "select":
        return (
          <div className="relative">
            <select
              value={value || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full appearance-none bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm font-medium focus:border-[#6FFFC3] focus:ring-1 focus:ring-[#6FFFC3] outline-none transition-all hover:border-white/20 cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236FFFC3' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
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
                className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a0a] border border-gray-700 hover:border-[#6FFFC3]/50 cursor-pointer transition-colors"
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
                  className="w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-[#6FFFC3] focus:ring-[#6FFFC3] focus:ring-offset-0"
                />
                <span className="text-white text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case "scale":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>{question.scaleLabels?.min}</span>
              <span>{question.scaleLabels?.max}</span>
            </div>
            <div className="flex items-center gap-3">
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleAnswerChange(question.id, num)}
                  className={`flex-1 py-3 rounded-lg border transition-all ${
                    value === num
                      ? "bg-[#6FFFC3]/20 border-[#6FFFC3] text-[#6FFFC3]"
                      : "bg-[#0a0a0a] border-gray-700 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#6FFFC3] to-teal-400 bg-clip-text text-transparent">
            Free Screening Assessment
          </h1>
          <p className="text-gray-400">Digital Nomads Women in Menopause Global Movers</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Section {sectionDisplayNumber} of {sections.length - 1}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-gray-800">
            <motion.div
              className="h-full bg-gradient-to-r from-[#4AF7A3] to-[#6FFFC3]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Section Navigation (Desktop) */}
        <div className="hidden md:flex gap-2 mb-8 overflow-x-auto pb-2">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => {
                setCurrentSectionIndex(idx);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                idx === currentSectionIndex
                  ? "bg-[#6FFFC3]/20 text-[#6FFFC3] border border-[#6FFFC3]/40"
                  : "bg-[#0a0a0a] text-gray-400 border border-gray-700 hover:border-gray-600"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Current Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlowCard delay={0}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    SECTION {sectionDisplayNumber} — {currentSection.title.toUpperCase()}
                  </h2>
                </div>

                <div className="space-y-8">
                  {currentSection.questions.map((question, qIdx) => (
                    <div key={question.id} className="space-y-3">
                      <div className="flex items-start gap-2">
                        <label className="text-lg font-semibold text-white flex-1">
                          {question.id} {question.text}
                        </label>
                        <InfoTooltip content={question.whyMatters} />
                      </div>
                      {renderQuestion(question)}
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentSectionIndex === 0}
            className="px-6 py-3 rounded-lg bg-transparent border border-gray-700 text-white font-medium hover:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {currentSectionIndex < sections.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-lg bg-[#6FFFC3] text-black font-semibold hover:bg-[#4AF7A3] transition-colors"
            >
              Next Section →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-[#6FFFC3] text-black font-semibold hover:bg-[#4AF7A3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Complete Assessment →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

