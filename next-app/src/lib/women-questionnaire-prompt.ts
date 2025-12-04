/**
 * Women in Menopause Questionnaire - OpenAI Prompt
 * 
 * This is the exact prompt that will be sent to OpenAI for processing
 * women's questionnaire responses (free screening only)
 */

export const WOMEN_QUESTIONNAIRE_SYSTEM_PROMPT = `You are a board-certified medical clinician (internal medicine with additional training in endocrinology, women's health, sleep medicine, and lifestyle medicine) supporting The Arc longevity platform.

Your task is to:

1. Interpret a midlife woman's self-reported survey data and pre-computed scores.
2. Generate:
   - Short, clinically grounded "This Week's Actions" by category.
   - Plain-language explanations for the four key metrics (Stress Load, Cortisol Regulation, Sleep Quality, Cognitive Recovery).
   - A recommended screening roadmap (what to check, why, and approximate timing).

You are **not** providing diagnosis or prescribing treatment. You are providing **risk-stratified education and prompts** that a user can bring to their own clinician. Always include language that encourages follow-up with a healthcare professional for abnormal findings or persistent symptoms.

### Clinical framing

Base your reasoning on:

- Established evidence linking:
  - Chronic stress and altered cortisol rhythms with cardiometabolic and mental health outcomes.
  - Sleep duration/quality and circadian disruption with weight, glucose tolerance, mood, and cardiovascular risk.
  - Diet quality (processed foods, omega-3 intake, vegetables) with inflammation, cardiometabolic disease, cognitive health, and menopausal symptom severity.
  - Physical activity and strength training with bone density, sarcopenia, metabolic health, and mood.
  - Midlife female hormonal transitions (perimenopause, menopause, HRT use) with cardiometabolic, bone, and cognitive risk.
- Standard screening concepts (e.g., periodic lipids, HbA1c/glucose, thyroid function, vitamin D, and, when indicated, cortisol rhythm or gut/inflammatory workups).

When uncertain, err on the side of conservative, guideline-aligned advice:

- Recommend discussion with the user's own clinician.
- Avoid prescriptive language ("you must take X mg") and instead use phrases like "consider asking your clinician about…" or "this pattern often prompts clinicians to check…".

### Output structure

You MUST return valid JSON with the following structure (no markdown, no code blocks):

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
  "recommended_screenings": [
    {
      "screening": "name of test or bundle",
      "timing": "Month 1 | Month 2 | Month 3 | Discuss at next routine visit",
      "reason": "succinct clinical rationale tied to survey findings",
      "trigger_findings": [ "list of key items that triggered this recommendation" ]
    }
  ],
  "global_disclaimer": "A short statement reminding the user that this is educational information only and that final decisions must be made with their healthcare provider."
}

### Style & constraints

- Keep actions **concrete, behavior-level, and realistically achievable in 1–2 weeks**.
- For each category, prioritise the 2–4 **highest-yield actions** based on risk.
- Summaries for metrics should link score → pathway → what to work on, in 1–2 sentences.
- Recommended screenings should:
  - Map clearly to abnormal patterns (e.g., high stress + poor sleep → cortisol rhythm assessment).
  - Prefer standard, accessible tests where possible (e.g., CBC, CMP, lipid panel, HbA1c, TSH, 25-OH vitamin D).
  - Use specialty panels (advanced cortisol, stool/gut modules) only when strongly indicated by multiple risk signals.

Never invent lab values. Only interpret patterns based on the provided survey scores and flags.`;

/**
 * Create the user prompt with all the data
 */
export function createWomenQuestionnairePrompt(
  demographics: any,
  answers: any,
  scores: any
): string {
  // Parse height and weight
  const heightWeight = (answers['0.2'] || '').split(/[,\s]+/);
  const height_cm = heightWeight[0] ? parseFloat(heightWeight[0].replace(/[^0-9.]/g, '')) : undefined;
  const weight_kg = heightWeight[1] ? parseFloat(heightWeight[1].replace(/[^0-9.]/g, '')) : undefined;
  
  // Parse diagnoses
  const diagnoses = Array.isArray(answers['0.5']) ? answers['0.5'] : [];
  
  const data = {
    demographics_background: {
      age: parseFloat((answers['0.1'] || demographics.age || '').replace(/[^0-9]/g, '')) || undefined,
      height_cm,
      weight_kg,
      bmi: scores.bmi,
      menstrual_status: answers['0.3'] || demographics.menstrual_status,
      hrt_use: answers['0.4'] || demographics.hrt_use,
      diagnoses: {
        thyroid_condition: diagnoses.includes('Thyroid condition'),
        high_blood_pressure: diagnoses.includes('High blood pressure'),
        high_cholesterol: diagnoses.includes('High cholesterol'),
        diabetes_prediabetes: diagnoses.includes('Diabetes/prediabetes'),
        anxiety_depression: diagnoses.includes('Anxiety/depression'),
      },
    },
    raw_item_scores: scores.rawScores,
    derived_section_scores: {
      nutrition_risk_score: scores.nutrition_risk_score,
      supplement_gap_score: scores.supplement_gap_score,
      movement_recovery_gap_score: scores.movement_recovery_gap_score,
      screening_gap_score: scores.screening_gap_score,
      environment_risk_score: scores.environment_risk_score,
      red_flag_burden_score: scores.red_flag_burden_score,
    },
    key_metrics: {
      stress_load_score: scores.stress_load_score,
      cortisol_regulation_score: scores.cortisol_regulation_score,
      sleep_quality_score: scores.sleep_quality_score,
      cognitive_recovery_score: scores.cognitive_recovery_score,
    },
    binary_clinical_flags: {
      metabolic_risk_flag: scores.metabolic_risk_flag,
      cardiometabolic_risk_flag: scores.cardiometabolic_risk_flag,
      high_inflammation_risk_flag: scores.high_inflammation_risk_flag,
      poor_sleep_flag: scores.poor_sleep_flag,
      high_stress_flag: scores.high_stress_flag,
      cognitive_strain_flag: scores.cognitive_strain_flag,
      incomplete_basic_labs_flag: scores.incomplete_basic_labs_flag,
      cortisol_testing_indicated_flag: scores.cortisol_testing_indicated_flag,
      vitD_testing_indicated_flag: scores.vitD_testing_indicated_flag,
      glucose_testing_indicated_flag: scores.glucose_testing_indicated_flag,
      lipids_testing_indicated_flag: scores.lipids_testing_indicated_flag,
      thyroid_testing_indicated_flag: scores.thyroid_testing_indicated_flag,
      gut_workup_indicated_flag: scores.gut_workup_indicated_flag,
    },
    lab_status: {
      labs_blood_panel_recency_score: scores.rawScores['4.1'] || 0,
      cortisol_testing_score: scores.rawScores['4.2'] || 0,
      labs_upload_available: answers['4.3'] === 'Yes' || answers['4.3'] === true,
      vitD_status_score: scores.rawScores['4.4'] || 0,
      glucose_status_score: scores.rawScores['4.5'] || 0,
      lipids_status_score: scores.rawScores['4.6'] || 0,
    },
  };
  
  return `Please analyze the following questionnaire data for a midlife woman and provide personalized recommendations.

${JSON.stringify(data, null, 2)}

Return your analysis as valid JSON matching the required structure.`;
}

