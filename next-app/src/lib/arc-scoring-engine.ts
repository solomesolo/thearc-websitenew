import { arcQuestionnaireConfig } from "./arc-questionnaire-config";

export type CompositeName =
  | "SLD" | "CRT" | "SLP" | "CRY" | "CRV"
  | "MOB" | "NUT" | "ENV" | "SUP" | "RFB"
  | "LIF" | "MENO";

export interface CompositeWeight {
  name: CompositeName;
  weight: number;
}

export interface QuestionConfig {
  id: string;
  scaleId: string;
  composites: CompositeWeight[];
  isImmediateRedFlag?: boolean;
}

export interface QuestionnaireConfig {
  scales: Record<string, string[]>;
  questions: QuestionConfig[];
}

export interface UserResponses {
  [questionId: string]: string;
}

export interface CompositeScores {
  [name: string]: {
    raw: number;
    normalized: number;
  };
}

export interface ScoringResult {
  composites: CompositeScores;
  r8Immediate: boolean;
  mappedScores: {
    stress_load_score: number;
    cortisol_regulation_score: number;
    sleep_quality_score: number;
    cognitive_recovery_score: number;
    movement_recovery_gap_score: number;
    nutrition_risk_score: number;
    environment_risk_score: number;
    supplement_gap_score: number;
    red_flag_burden_score: number;
    lifestyle_load_score: number;
    menopause_symptom_burden: number;
  };
}

/**
 * Maps a user's answer label to a numeric value (0-4)
 */
function valueFromScale(scale: string[], answer: string): number {
  const idx = scale.indexOf(answer);
  return idx >= 0 ? idx : 0;
}

/**
 * Computes composite scores from user responses
 */
export function computeCompositeScores(
  responses: UserResponses
): ScoringResult {
  const questionnaireConfig = arcQuestionnaireConfig;
  const compositesRaw: Record<string, number> = {};
  const compositesDenom: Record<string, number> = {};
  let r8Immediate = false;

  // Initialize all composite scores
  const allComposites: CompositeName[] = [
    "SLD", "CRT", "SLP", "CRY", "CRV",
    "MOB", "NUT", "ENV", "SUP", "RFB",
    "LIF", "MENO"
  ];

  allComposites.forEach(name => {
    compositesRaw[name] = 0;
    compositesDenom[name] = 0;
  });

  // Process each question
  for (const q of questionnaireConfig.questions) {
    const answerLabel = responses[q.id];
    if (answerLabel == null || answerLabel === "") continue;

    const scale = questionnaireConfig.scales[q.scaleId];
    if (!scale) {
      console.warn(`Scale ${q.scaleId} not found for question ${q.id}`);
      continue;
    }

    const value = valueFromScale(scale, answerLabel);

    // Check for R8 immediate red flag
    if (q.id === "R8" && q.isImmediateRedFlag && answerLabel === "Yes") {
      r8Immediate = true;
      // Set RFB to maximum if R8 is yes
      compositesRaw["RFB"] = 999;
      compositesDenom["RFB"] = 1;
    }

    // Skip processing if R8 is triggered (already set RFB to 999)
    if (r8Immediate && q.id !== "R8") {
      continue;
    }

    // Apply weights to composites
    for (const comp of q.composites) {
      if (!(comp.name in compositesRaw)) {
        compositesRaw[comp.name] = 0;
        compositesDenom[comp.name] = 0;
      }

      // For negative weights (protective factors), we still add to denominator
      // but the value contribution is value * weight (which will be negative)
      compositesRaw[comp.name] += value * comp.weight;
      compositesDenom[comp.name] += Math.abs(comp.weight) * 4; // max contribution (0–4 scale)
    }
  }

  // Normalize scores to 0-100
  const composites: CompositeScores = {};
  for (const name of Object.keys(compositesRaw)) {
    const raw = compositesRaw[name];
    const denom = compositesDenom[name] || 1;
    
    let normalized = (raw / denom) * 100;
    
    // Handle negative scores (protective factors can result in negative raw scores)
    if (normalized < 0) normalized = 0;
    if (normalized > 100) normalized = 100;
    
    // Special handling for RFB if R8 is triggered
    if (name === "RFB" && r8Immediate) {
      normalized = 100;
    }
    
    composites[name] = { raw, normalized: Math.round(normalized * 10) / 10 };
  }

  // Map composite scores to named scores
  const mappedScores = {
    stress_load_score: composites["SLD"]?.normalized || 0,
    cortisol_regulation_score: composites["CRT"]?.normalized || 0,
    sleep_quality_score: composites["SLP"]?.normalized || 0,
    cognitive_recovery_score: composites["CRV"]?.normalized || 0,
    movement_recovery_gap_score: composites["MOB"]?.normalized || 0,
    nutrition_risk_score: composites["NUT"]?.normalized || 0,
    environment_risk_score: composites["ENV"]?.normalized || 0,
    supplement_gap_score: composites["SUP"]?.normalized || 0,
    red_flag_burden_score: composites["RFB"]?.normalized || 0,
    lifestyle_load_score: composites["LIF"]?.normalized || 0,
    menopause_symptom_burden: composites["MENO"]?.normalized || 0,
  };

  return {
    composites,
    r8Immediate,
    mappedScores,
  };
}

/**
 * Helper to get all question IDs from config
 */
export function getAllQuestionIds(): string[] {
  const questionnaireConfig = config as QuestionnaireConfig;
  return questionnaireConfig.questions.map(q => q.id);
}

/**
 * Helper to validate that all required questions are answered
 */
export function validateResponses(responses: UserResponses): {
  valid: boolean;
  missing: string[];
} {
  const allIds = getAllQuestionIds();
  const missing: string[] = [];

  for (const id of allIds) {
    if (!responses[id] || responses[id] === "") {
      missing.push(id);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

