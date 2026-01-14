import { Likert5, TravelerSurveyAnswers } from './types';

/**
 * Maps question answer strings to severity scores (0-4) for traveler engine
 */
export function toSeverityTraveler(questionId: keyof TravelerSurveyAnswers, option: string): Likert5 {
  // Standard Likert frequency mapping
  const likertFreqMap: Record<string, Likert5> = {
    "Never": 0,
    "Rarely": 1,
    "Sometimes": 2,
    "Often": 3,
    "Almost always": 4,
  };

  // Refreshed scale (reverse-coded for fatigue burden)
  const refreshedMap: Record<string, Likert5> = {
    "Very refreshed": 0,
    "Somewhat refreshed": 1,
    "Neutral": 2,
    "Somewhat unrefreshed": 3,
    "Very unrefreshed": 4,
  };

  // Consistency scale
  const consistencyMap: Record<string, Likert5> = {
    "Very consistent": 0,
    "Somewhat consistent": 1,
    "Neutral": 2,
    "Somewhat inconsistent": 3,
    "Very inconsistent": 4,
  };

  // Difficulty scale
  const difficultyMap: Record<string, Likert5> = {
    "Not difficult": 0,
    "Slightly difficult": 1,
    "Moderately difficult": 2,
    "Very difficult": 3,
    "Extremely difficult": 4,
  };

  // Check standard Likert frequency first
  if (likertFreqMap[option] !== undefined) {
    return likertFreqMap[option];
  }

  // Check question-specific mappings
  switch (questionId) {
    case "F3_refreshedOnWaking":
      return refreshedMap[option] ?? 0;
    
    case "S3_bedtimeConsistency":
      return consistencyMap[option] ?? 0;
    
    case "PF1_difficultyStayActiveTravelDays":
      return difficultyMap[option] ?? 0;
    
    case "S6_caffeineAfter14":
      const caffeineMap: Record<string, Likert5> = {
        "Never": 0,
        "Rarely": 1,
        "Sometimes (1–2×/week)": 2,
        "Often (most days)": 3,
        "Multiple servings daily": 4,
      };
      return caffeineMap[option] ?? 0;
    
    case "BG10_sittingDuration":
      const sittingMap: Record<string, Likert5> = {
        "<2 hours": 0,
        "2–4 hours": 1,
        "4–6 hours": 2,
        "6–8 hours": 3,
        ">8 hours": 4,
      };
      return sittingMap[option] ?? 0;
    
    case "L2_20minMovement":
      // Reverse-coded (protective behavior)
      const movementMap: Record<string, Likert5> = {
        "Almost always": 0,
        "Often": 1,
        "Sometimes": 2,
        "Rarely": 3,
        "Never": 4,
      };
      return movementMap[option] ?? 0;
    
    default:
      return 0;
  }
}

/**
 * Get traveler tags from answers
 */
export function getTravelerTags(answers: TravelerSurveyAnswers): Array<"upcoming_travel" | "long_sit" | "cardiometabolic_dx"> {
  const tags: Array<"upcoming_travel" | "long_sit" | "cardiometabolic_dx"> = [];
  
  if (answers.BG9_upcomingTravel6w === "Yes") {
    tags.push("upcoming_travel");
  }
  
  if (answers.BG10_sittingDuration === "6–8 hours" || answers.BG10_sittingDuration === ">8 hours") {
    tags.push("long_sit");
  }
  
  if (
    answers.BG7_dx.includes("High blood pressure") ||
    answers.BG7_dx.includes("High cholesterol") ||
    answers.BG7_dx.includes("Prediabetes or diabetes")
  ) {
    tags.push("cardiometabolic_dx");
  }
  
  return tags;
}

/**
 * Sentence templates for causes by metric
 */
export const TRAVELER_CAUSE_SENTENCES: Record<string, Record<string, string>> = {
  stress_load: {
    ST1_overwhelmed: "You reported feeling mentally overwhelmed {option}.",
    ST2_unableToRelax: "You said you're unable to relax {option}.",
    M2_stressHardToFocus: "Stress makes it hard to focus {option}.",
    M1_lowMood: "Low mood occurs {option}.",
    S5_poorSleepAffectsNextDay: "Poor sleep affects your next day {option}.",
  },
  sleep_circadian: {
    S4_scheduleDisruptsSleep: "Travel or schedule changes disrupt your sleep {option}.",
    S1_fallAsleepDifficulty: "Falling asleep is difficult {option}.",
    S2_wakeNightStayAwake: "Night waking occurs {option}.",
    S3_bedtimeConsistency: "Your bedtime consistency is {option}.",
    F3_refreshedOnWaking: "You feel {option} refreshed on waking.",
  },
  energy_recovery: {
    F2_lowEnergyLimits: "Low energy limits your day {option}.",
    F1_wornOutAfternoon: "You feel worn out by early afternoon {option}.",
    F3_refreshedOnWaking: "You feel {option} refreshed on waking.",
    S5_poorSleepAffectsNextDay: "Poor sleep affects your mood/thinking {option}.",
    IMM1_proneToSickDuringTravel: "You feel run-down or more prone to sickness during travel {option}.",
  },
  mobility_physical: {
    PF2_sittingCausesStiffness: "Long sitting causes stiffness or soreness {option}.",
    PF1_difficultyStayActiveTravelDays: "Staying active on travel days feels {option}.",
    P1_painLimitsActivities: "Aches or pains limit activities {option}.",
    P2_avoidMovementDueDiscomfort: "You avoid movement due to discomfort {option}.",
    BG10_sittingDuration: "Your seated time during travel is {option}.",
  },
};






