/**
 * Women in Menopause Full Questionnaire - OpenAI Prompt
 * 
 * This is the system prompt for processing the comprehensive full questionnaire
 */

export const WOMEN_FULL_QUESTIONNAIRE_SYSTEM_PROMPT = `You are a board-certified physician (internal medicine, with added training in cardiometabolic medicine, women's health, sleep medicine, and lifestyle medicine) working inside The Arc longevity platform.

You DO NOT diagnose or prescribe. You provide educational, prevention-focused guidance only.

You receive a single JSON object as input containing:
- demographics & background
- survey-derived composite scores (e.g., stress_load_score, sleep_quality_score, nutrition_risk_score, movement_recovery_gap_score, environment_risk_score, supplement_gap_score, red_flag_burden_score, lifestyle_load_score, menopause_symptom_burden)
- labs and flags (lipids_abnormal, glucose_abnormal, inflammation_high, thyroid_abnormal, vitD_low, etc.)
- derived risk scores (family_cardio_risk_score, lifestyle_load_score, biological_instability_score, cognitive_rhythm_score)
- precision screening flags (e.g., metabolic_risk_flag, cardiometabolic_risk_flag, high_inflammation_risk_flag, poor_sleep_flag, high_stress_flag, cognitive_strain_flag, gut_workup_indicated_flag, bone_density_scan_indicated_flag, etc.)

Your job is to:
1. Interpret patterns as RISK and OPPORTUNITY, not diagnoses.
2. Use the provided composite scores and flags (already calculated by the backend) to:
   - Prioritize domains (sleep/stress, metabolic, mobility, cognition, gut, environment).
   - Identify where multiple risks converge (strongly suggested actions).
   - Identify where mild signals suggest "worth discussing at next routine visit".

3. Generate a single JSON object with the following structure (all fields required):

{
  "key_metrics": {
    "stress_load": { "score": number, "summary": string },
    "cortisol_regulation": { "score": number, "summary": string },
    "sleep_quality": { "score": number, "summary": string },
    "cognitive_recovery": { "score": number, "summary": string }
  },
  "weekly_actions": {
    "nutrition": [ "short imperative action", ... ],
    "supplements": [ "short imperative action", ... ],
    "movement_recovery": [ "short imperative action", ... ],
    "screenings_checks": [ "short imperative action", ... ],
    "environment": [ "short imperative action", ... ],
    "red_flags": [ "short imperative action", ... ]
  },
  "biological_profile": {
    "predisposition_map": {
      "family_cardio_risk": { "score": number, "summary": string },
      "lifestyle_load": { "score": number, "summary": string },
      "biological_instability": { "score": number, "summary": string },
      "cognitive_rhythm": { "score": number, "summary": string }
    },
    "precision_screening_plan": [
      {
        "test_bundle": "string",
        "timing": "Month 1 | Month 2 | Month 3 | Next routine visit",
        "purpose": "string",
        "trigger_findings": [ "string", "..." ]
      }
    ]
  },
  "metrics_dashboard": {
    "sleep_stability": { "value_percent": number, "delta_percent": number, "summary": string },
    "glucose_variability": { "cv_percent": number, "delta_percent": number, "summary": string },
    "stress_load": { "score": number, "delta_points": number, "summary": string },
    "hrv_trend": { "value_ms": number, "delta_ms": number, "summary": string },
    "recovery_score": { "score": number, "delta_points": number, "summary": string },
    "inflammation_trend": { "qualitative": "Low|Moderate|High|Unknown", "summary": "string" },
    "lifestyle_load": { "qualitative": "Low|Moderate|High", "trend": "Improving|Worsening|Stable", "summary": "string" }
  },
  "six_month_modular_path": {
    "months": [
      {
        "month_number": 1,
        "title": "string",
        "primary_focus": [ "sleep_stress", "metabolic", "mobility", "cognition", "gut", "environment" ],
        "one_sentence_goal": "string"
      }
    ]
  },
  "performance_path_details": {
    "month_1": { "bullets": [ "• ...", "..." ] },
    "month_2": { "bullets": [ "..." ] },
    "month_3": { "bullets": [ "..." ] },
    "month_4": { "bullets": [ "..." ] },
    "month_5": { "bullets": [ "..." ] },
    "month_6": { "bullets": [ "..." ] }
  },
  "nutrition_protocol": {
    "core_principles_priority": [ "whole_unprocessed_foods", "anti_inflammatory_focus", "balanced_macros", "circadian_aligned_meals", "gut_supporting_fiber", "adequate_protein" ],
    "meal_plan_3_day": {
      "day_1": { "breakfast": "...", "lunch": "...", "dinner": "...", "snacks": ["..."] },
      "day_2": { "breakfast": "...", "lunch": "...", "dinner": "...", "snacks": ["..."] },
      "day_3": { "breakfast": "...", "lunch": "...", "dinner": "...", "snacks": ["..."] }
    }
  },
  "movement_recovery_protocols": [
    {
      "name": "string",
      "type": "breathing | movement | recovery",
      "description": "string",
      "duration_minutes": number,
      "frequency": "string",
      "priority": "High|Medium|Optional"
    }
  ],
  "supplement_protocol": [
    {
      "supplement": "string",
      "dose_range": "string",
      "timing": "string",
      "why": "string",
      "safety_note": "string",
      "priority": "Core|Optional|Discuss_with_clinician"
    }
  ],
  "environmental_reset_module": {
    "circadian_reset": [ "short action", "..." ],
    "bedroom_optimization": [ "short action", "..." ],
    "light_exposure_plan": [ "short action", "..." ],
    "toxin_reduction": [ "short action", "..." ]
  },
  "risk_focused_microplans": [
    {
      "name": "string",
      "active": true,
      "micro_actions": [ "short action", "..." ],
      "weekly_trigger_description": "string",
      "expected_benefits": "string"
    }
  ],
  "travel_protocol": {
    "is_recommended": boolean,
    "pre_travel": [ "short action", "..." ],
    "during_travel": [ "short action", "..." ],
    "post_travel": [ "short action", "..." ]
  },
  "red_flags_and_thresholds": [
    {
      "domain": "Inflammation Markers | Stress & Cortisol | Sleep Disruption | Metabolic Markers",
      "when_to_monitor": [ "string", "..." ],
      "when_to_retest": [ "string", "..." ],
      "when_to_seek_medical_review": [ "string", "..." ]
    }
  ],
  "implementation_calendar": {
    "months": [
      {
        "month_number": 1,
        "module_title": "string",
        "focus_areas": [ "sleep", "nutrition", "environment", "metabolic", "mobility", "cognition" ],
        "comment": "string"
      }
    ]
  },
  "global_disclaimer": "Concise statement that this information is educational and must be reviewed with a healthcare professional before acting."
}

You MUST:
- Use the composite scores and flags to decide which areas are strongly prioritized (multiple high-risk signals) vs. mild/monitor.
- Emphasize modifiable behaviors.
- Make all supplement and screening suggestions conditional on clinician review.
- Avoid fear; present risk as opportunity for action.
- Do not invent lab values or diagnoses; only interpret what is provided.
- Always output valid JSON with double-quoted keys and strings, no trailing commas.`;

/**
 * Create the user prompt with all the data for full questionnaire
 */
export function createWomenFullQuestionnairePrompt(
  demographics: any,
  answers: any,
  scoringResult: any
): string {
  // Parse height and weight - handle both old format (0.2 combined) and new format (0.2_h, 0.2_w separate)
  let height_cm: number | undefined;
  let weight_kg: number | undefined;
  
  if (answers['0.2_h'] || answers['0.2_height']) {
    height_cm = parseFloat(String(answers['0.2_h'] || answers['0.2_height']).replace(/[^0-9.]/g, ''));
  }
  if (answers['0.2_w'] || answers['0.2_weight']) {
    weight_kg = parseFloat(String(answers['0.2_w'] || answers['0.2_weight']).replace(/[^0-9.]/g, ''));
  }
  
  // Fallback to old combined format if new format not present
  if (!height_cm || !weight_kg) {
    const heightWeight = (answers['0.2'] || '').split(/[,\s]+/);
    height_cm = height_cm || (heightWeight[0] ? parseFloat(heightWeight[0].replace(/[^0-9.]/g, '')) : undefined);
    weight_kg = weight_kg || (heightWeight[1] ? parseFloat(heightWeight[1].replace(/[^0-9.]/g, '')) : undefined);
  }
  
  // Calculate BMI
  const bmi = height_cm && weight_kg ? (weight_kg / Math.pow(height_cm / 100, 2)) : undefined;
  
  // Parse diagnoses
  const diagnoses = Array.isArray(answers['0.5']) ? answers['0.5'] : [];
  const familyHistory = Array.isArray(answers['0.6']) ? answers['0.6'] : [];
  
  // Derive risk flags from scores
  const scores = scoringResult.mappedScores;
  const composites = scoringResult.composites;
  
  const metabolic_risk_flag = 
    diagnoses.includes('Diabetes/prediabetes') ||
    diagnoses.includes('High blood pressure') ||
    diagnoses.includes('High cholesterol') ||
    (bmi && bmi >= 30) ||
    (scores.red_flag_burden_score >= 60 && scores.nutrition_risk_score >= 60);
  
  const cardiometabolic_risk_flag = 
    metabolic_risk_flag ||
    (answers['0.3'] === 'No period 12+ months' && parseFloat((answers['0.1'] || '').replace(/[^0-9]/g, '')) >= 50);
  
  const high_inflammation_risk_flag = 
    scores.nutrition_risk_score >= 60 ||
    scores.environment_risk_score >= 60;
  
  const poor_sleep_flag = scores.sleep_quality_score >= 60;
  const high_stress_flag = scores.stress_load_score >= 60;
  const cognitive_strain_flag = scores.cognitive_recovery_score >= 60 || diagnoses.includes('Anxiety/depression');
  
  const data = {
    demographics_background: {
      age: parseFloat((answers['0.1'] || demographics.age || '').replace(/[^0-9]/g, '')) || undefined,
      height_cm,
      weight_kg,
      bmi: bmi ? Math.round(bmi * 10) / 10 : undefined,
      menstrual_status: answers['0.3'] || demographics.menstrual_status,
      hrt_use: answers['0.4'] || demographics.hrt_use,
      diagnoses: {
        thyroid_condition: diagnoses.includes('Thyroid condition'),
        high_blood_pressure: diagnoses.includes('High blood pressure'),
        high_cholesterol: diagnoses.includes('High cholesterol'),
        diabetes_prediabetes: diagnoses.includes('Diabetes/prediabetes'),
        anxiety_depression: diagnoses.includes('Anxiety/depression'),
        autoimmune_condition: diagnoses.includes('Autoimmune condition'),
        osteoporosis: diagnoses.includes('Osteoporosis'),
      },
      family_history: {
        heart_disease: familyHistory.includes('Heart disease'),
        diabetes: familyHistory.includes('Diabetes'),
        cancer: familyHistory.includes('Cancer'),
        thyroid_disorders: familyHistory.includes('Thyroid disorders'),
        autoimmune_conditions: familyHistory.includes('Autoimmune conditions'),
      },
    },
    survey_derived_composite_scores: {
      stress_load_score: scores.stress_load_score,
      cortisol_regulation_score: scores.cortisol_regulation_score,
      sleep_quality_score: scores.sleep_quality_score,
      cognitive_recovery_score: scores.cognitive_recovery_score,
      movement_recovery_gap_score: scores.movement_recovery_gap_score,
      nutrition_risk_score: scores.nutrition_risk_score,
      environment_risk_score: scores.environment_risk_score,
      supplement_gap_score: scores.supplement_gap_score,
      red_flag_burden_score: scores.red_flag_burden_score,
      lifestyle_load_score: scores.lifestyle_load_score,
      menopause_symptom_burden: scores.menopause_symptom_burden,
    },
    derived_risk_scores: {
      family_cardio_risk_score: familyHistory.includes('Heart disease') ? 70 : 30,
      lifestyle_load_score: scores.lifestyle_load_score,
      biological_instability_score: Math.round((scores.stress_load_score + scores.sleep_quality_score + scores.cognitive_recovery_score) / 3),
      cognitive_rhythm_score: composites["CRY"]?.normalized || 0,
    },
    precision_screening_flags: {
      metabolic_risk_flag,
      cardiometabolic_risk_flag,
      high_inflammation_risk_flag,
      poor_sleep_flag,
      high_stress_flag,
      cognitive_strain_flag,
      gut_workup_indicated_flag: scores.nutrition_risk_score >= 60 && answers['S5'] && ['Quite a lot', 'Extremely'].includes(answers['S5']),
      bone_density_scan_indicated_flag: answers['0.3'] === 'No period 12+ months' && parseFloat((answers['0.1'] || '').replace(/[^0-9]/g, '')) >= 50,
    },
    immediate_red_flag: scoringResult.r8Immediate,
  };
  
  return `Please analyze the following comprehensive questionnaire data for a midlife woman and provide a complete personalized longevity blueprint.

${JSON.stringify(data, null, 2)}

Return your analysis as valid JSON matching the required structure.`;
}

