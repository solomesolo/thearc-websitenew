/**
 * Traveler (Global Mover) Questionnaire Scoring System
 * 
 * Implements deterministic scoring logic based on composite calculations
 * Each composite is calculated as: composite_raw += (answer_value 0–4 or 0/1) × weight
 * Then normalized to 0–100
 */

import config from './traveler-questionnaire-config.json';

export interface QuestionnaireAnswers {
  [questionId: string]: any;
}

export interface CalculatedScores {
  // Composite scores (0-100)
  SLD: number;  // Stress Load
  CRT: number;  // Cortisol Regulation
  SLP: number;  // Sleep Quality
  CRV: number;  // Cognitive Recovery
  CRY: number;  // Cognitive Rhythm
  MOB: number;  // Movement / Recovery
  NUT: number;  // Nutrition Risk
  ENV: number;  // Environment Risk (minimal)
  RFB: number;  // Red Flag Burden
  LIF: number;  // Lifestyle Load
  MET: number;  // Metabolic Risk Tendency
  TRV: number;  // Travel Strain index
  
  // Flags
  upcoming_travel_within_6w: boolean;
  has_immediate_concern: boolean;
  
  // Raw scores for reference
  rawScores: Record<string, number>;
  compositeRawScores: Record<string, number>;
}

/**
 * Map answer value to numeric based on scale
 */
function mapAnswerToNumeric(answer: any, scaleId: string | undefined, reverse: boolean = false): number {
  if (answer === null || answer === undefined || answer === '') return 0;
  
  // Handle number type directly
  if (typeof answer === 'number') {
    return reverse ? (4 - answer) : answer;
  }
  
  if (typeof answer !== 'string') return 0;
  
  // Handle yes/no scale
  if (scaleId === 'yes_no') {
    const yesNoScale = config.scales.yes_no;
    const index = yesNoScale.indexOf(answer);
    if (index === -1) {
      // Try lowercase/uppercase variations
      const lowerAnswer = answer.toLowerCase();
      if (lowerAnswer === 'yes' || lowerAnswer === 'true' || lowerAnswer === '1') return 1;
      if (lowerAnswer === 'no' || lowerAnswer === 'false' || lowerAnswer === '0') return 0;
      return 0;
    }
    return index; // 0 = No, 1 = Yes
  }
  
  // Handle other scales
  if (scaleId && config.scales[scaleId as keyof typeof config.scales]) {
    const scale = config.scales[scaleId as keyof typeof config.scales];
    const index = scale.indexOf(answer);
    if (index === -1) {
      // Try case-insensitive match
      const lowerAnswer = answer.toLowerCase();
      const matchedIndex = scale.findIndex(s => s.toLowerCase() === lowerAnswer);
      if (matchedIndex !== -1) {
        const value = reverse ? (scale.length - 1 - matchedIndex) : matchedIndex;
        return value;
      }
      return 0;
    }
    return reverse ? (scale.length - 1 - index) : index;
  }
  
  // Try to parse as number
  const num = parseInt(answer, 10);
  if (!isNaN(num)) {
    return reverse ? (4 - num) : num;
  }
  
  return 0;
}

/**
 * Map form field names to question IDs and values
 * The HTML form uses names like "BG1_age", "BG2_gender", "BG7_medical_history", etc.
 * We need to map them to question IDs like "BG1", "BG2", "BG7", etc.
 * Also map checkbox values to option labels from config
 */
function mapFormAnswersToQuestionIds(formData: QuestionnaireAnswers): QuestionnaireAnswers {
  const mapped: QuestionnaireAnswers = {};
  
  // Value mapping for checkboxes (form values -> config labels)
  const bg7ValueMap: Record<string, string> = {
    'high_blood_pressure': 'High blood pressure',
    'high_cholesterol': 'High cholesterol',
    'prediabetes_diabetes': 'Prediabetes or diabetes',
    'thyroid_condition': 'Thyroid condition',
    'anxiety_depression': 'Anxiety or depression',
    'autoimmune_condition': 'Autoimmune condition',
    'none': 'None of the above',
  };
  
  const bg8ValueMap: Record<string, string> = {
    'heart_disease_stroke': 'Heart disease or stroke',
    'diabetes': 'Diabetes',
    'dementia': 'Dementia or significant memory decline',
    'none': 'None of the above',
  };
  
  // Map all form fields
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    if (value === null || value === undefined || value === '') return;
    
    // Handle BG questions with suffixes
    if (key.startsWith('BG')) {
      const parts = key.split('_');
      const questionId = parts[0]; // BG1, BG2, etc.
      
      // Handle multi-select checkboxes (BG7, BG8)
      if (questionId === 'BG7' && key === 'BG7_medical_history') {
        const selectedValues = Array.isArray(value) ? value : [value];
        const mappedValues = selectedValues
          .filter(v => v && v !== 'none' && v !== '') // Filter out 'none' and empty if other options selected
          .map(v => bg7ValueMap[v] || v);
        // If only 'none' was selected or no other options, include it
        if (mappedValues.length === 0 || selectedValues.includes('none')) {
          mapped[questionId] = ['None of the above'];
        } else {
          mapped[questionId] = mappedValues;
        }
      } else if (questionId === 'BG8' && key === 'BG8_family_history') {
        const selectedValues = Array.isArray(value) ? value : [value];
        const mappedValues = selectedValues
          .filter(v => v && v !== 'none' && v !== '')
          .map(v => bg8ValueMap[v] || v);
        if (mappedValues.length === 0 || selectedValues.includes('none')) {
          mapped[questionId] = ['None of the above'];
        } else {
          mapped[questionId] = mappedValues;
        }
      } else if (questionId === 'BG7' || questionId === 'BG8') {
        // Skip - already handled above
        return;
      } else {
        // For single value questions (BG1_age, BG2_gender, BG3_height, BG4_weight, BG9_upcoming_travel, BG10_travel_seating)
        // Map gender values
        if (questionId === 'BG2' && typeof value === 'string') {
          const genderMap: Record<string, string> = {
            'woman': 'Woman',
            'man': 'Man',
            'non_binary': 'Non-binary',
            'prefer_not_to_say': 'Prefer not to say',
          };
          mapped[questionId] = genderMap[value.toLowerCase()] || value;
        } else {
          mapped[questionId] = value;
        }
      }
    } else {
      // For other questions (F1, S1, ST1, M1, M2, P1, P2, PF1, PF2, C1, C2, G1, IMM1, L1, L2, R1, R2, R3)
      // Map form field names to question IDs
      // Form uses names like "F1_worn_out", "S1_struggle_fall_asleep", etc.
      // But also handle direct question IDs
      if (key.match(/^[A-Z]+\d+$/)) {
        // Direct question ID (F1, S1, etc.)
        mapped[key] = value;
      } else {
        // Field name with suffix (F1_worn_out -> F1)
        const questionId = key.split('_')[0];
        mapped[questionId] = value;
      }
    }
  });
  
  return mapped;
}

/**
 * Calculate all scores from questionnaire answers
 */
export function calculateTravelerQuestionnaireScores(
  answers: QuestionnaireAnswers
): CalculatedScores {
  // Map form field names to question IDs
  const mappedAnswers = mapFormAnswersToQuestionIds(answers);
  // Initialize composite raw scores
  const compositeRaw: Record<string, number> = {
    SLD: 0,
    CRT: 0,
    SLP: 0,
    CRV: 0,
    CRY: 0,
    MOB: 0,
    NUT: 0,
    ENV: 0,
    RFB: 0,
    LIF: 0,
    MET: 0,
    TRV: 0,
  };
  
  // Track max and min possible scores for normalization
  const maxPossibleScores: Record<string, number> = {
    SLD: 0,
    CRT: 0,
    SLP: 0,
    CRV: 0,
    CRY: 0,
    MOB: 0,
    NUT: 0,
    ENV: 0,
    RFB: 0,
    LIF: 0,
    MET: 0,
    TRV: 0,
  };
  
  const minPossibleScores: Record<string, number> = {
    SLD: 0,
    CRT: 0,
    SLP: 0,
    CRV: 0,
    CRY: 0,
    MOB: 0,
    NUT: 0,
    ENV: 0,
    RFB: 0,
    LIF: 0,
    MET: 0,
    TRV: 0,
  };
  
  const rawScores: Record<string, number> = {};
  let upcoming_travel_within_6w = false;
  let has_immediate_concern = false;
  
  // Process each question
  config.questions.forEach(question => {
    const answer = mappedAnswers[question.id];
    if (answer === null || answer === undefined || answer === '') return;
    
    // Handle multi-select questions (BG7, BG8)
    if (question.type === 'multi_select' && Array.isArray(question.options)) {
      const selectedOptions = Array.isArray(answer) ? answer : [answer];
      
      question.options.forEach(option => {
        if (selectedOptions.includes(option.label)) {
          // Apply composites for this option
          option.composites.forEach(comp => {
            const weight = Math.abs(comp.weight);
            compositeRaw[comp.name] += weight; // Multi-select uses weight directly (0/1 * weight)
            maxPossibleScores[comp.name] += weight;
          });
        }
      });
      
      return;
    }
    
    // Handle single choice questions
    if (question.type === 'single_choice') {
      const isReverse = question.reverse === true;
      // Get numeric value (0-4 for scales, 0/1 for yes/no)
      const numericValue = mapAnswerToNumeric(answer, question.scaleId, false);
      rawScores[question.id] = numericValue;
      
      // Apply composites
      question.composites.forEach(comp => {
        // For reverse questions, the weight is already negative in config
        // So we use the numeric value as-is and multiply by the (negative) weight
        // This means: higher answer (4) * negative weight = lower (more negative) contribution
        const contribution = numericValue * comp.weight;
        compositeRaw[comp.name] += contribution;
        
        // For max/min calculation
        const maxValue = question.scaleId === 'yes_no' ? 1 : 4;
        const minValue = 0;
        
        if (comp.weight > 0) {
          // Positive weight: max contribution is maxValue * weight, min is 0
          maxPossibleScores[comp.name] += maxValue * comp.weight;
          minPossibleScores[comp.name] += minValue * comp.weight;
        } else {
          // Negative weight: min contribution is maxValue * weight (most negative), max is 0
          minPossibleScores[comp.name] += maxValue * comp.weight; // This will be negative
          maxPossibleScores[comp.name] += minValue * comp.weight; // This stays 0
        }
      });
      
      // Handle flags
      if (question.setsFlag === 'upcoming_travel_within_6w') {
        upcoming_travel_within_6w = answer === 'Yes' || answer === 'yes' || answer === true || answer === 1;
      }
      
      if (question.isImmediateConcern && (answer === 'Yes' || answer === 'yes' || answer === true || answer === 1)) {
        has_immediate_concern = true;
      }
    }
    
    // Handle number type questions (BG1, BG3, BG4)
    if (question.type === 'number') {
      const numValue = typeof answer === 'number' ? answer : parseFloat(String(answer).replace(/[^0-9.]/g, ''));
      if (!isNaN(numValue)) {
        rawScores[question.id] = numValue;
      }
    }
  });
  
  // Normalize composite scores to 0-100
  // 0 = best/lowest risk, 100 = worst/highest risk
  const normalizedScores: Record<string, number> = {};
  
  Object.keys(compositeRaw).forEach(composite => {
    const raw = compositeRaw[composite];
    const max = maxPossibleScores[composite];
    const min = minPossibleScores[composite];
    
    if (max > min) {
      // Normalize: (raw - min) / (max - min) * 100
      // This handles both positive and negative contributions
      const normalized = ((raw - min) / (max - min)) * 100;
      normalizedScores[composite] = Math.max(0, Math.min(100, normalized));
    } else if (max === min && max !== 0) {
      // All questions have same weight (edge case)
      normalizedScores[composite] = 50;
    } else {
      // No questions contributed to this composite
      normalizedScores[composite] = 0;
    }
  });
  
  return {
    SLD: normalizedScores.SLD,
    CRT: normalizedScores.CRT,
    SLP: normalizedScores.SLP,
    CRV: normalizedScores.CRV,
    CRY: normalizedScores.CRY,
    MOB: normalizedScores.MOB,
    NUT: normalizedScores.NUT,
    ENV: normalizedScores.ENV,
    RFB: normalizedScores.RFB,
    LIF: normalizedScores.LIF,
    MET: normalizedScores.MET,
    TRV: normalizedScores.TRV,
    upcoming_travel_within_6w,
    has_immediate_concern,
    rawScores,
    compositeRawScores: compositeRaw,
  };
}

