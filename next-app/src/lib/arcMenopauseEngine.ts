// arcMenopauseEngine.ts
// Core logic engine for ARC Free Menopause Screening
// Uses the same Test/Supplement tables as the Traveller engine

// --------------------------------------------------
// 1. Types
// --------------------------------------------------

export type CompositeName =
  | "SLD"  // Stress Load
  | "CRT"  // Cortisol Regulation
  | "SLP"  // Sleep Quality
  | "CRV"  // Cognitive Recovery
  | "CRY"  // Cognitive Rhythm (unused here)
  | "MOB"  // Movement / Recovery Gap
  | "NUT"  // Nutrition Risk
  | "ENV"  // Environment Risk
  | "RFB"  // Red Flag Burden
  | "LIF"  // Lifestyle Load (derived if needed)
  | "MET"  // Metabolic Risk (derived if needed)
  | "TRV"; // Travel Strain (unused here, remains 0)

export interface CompositeWeight {
  name: CompositeName;
  weight: number; // can be negative (protective behaviours)
}

export interface QuestionOptionWithComposites {
  label: string;
  composites?: CompositeWeight[];
}

export interface QuestionConfig {
  id: string;
  section: string;
  text: string;
  type: "number" | "single_choice" | "multi_select";
  scaleId?: string;
  options?: QuestionOptionWithComposites[];
  composites?: CompositeWeight[];  // base composites (apply regardless of option)
  reverse?: boolean;               // reverse-graded questions
  isImmediateConcern?: boolean;    // e.g. for future red-flag yes/no
  setsFlag?: string;               // e.g. future booleans
}

export interface QuestionnaireConfig {
  scales: Record<string, string[]>;
  questions: QuestionConfig[];
}

// Raw responses from UI
export type UserResponseValue =
  | string        // single_choice label
  | string[]      // multi_select labels
  | number;       // numeric input

export interface UserResponses {
  [questionId: string]: UserResponseValue | undefined;
}

export interface CompositeScore {
  raw: number;
  maxPossible: number;
  normalized: number; // 0–100
}
export type CompositeScores = Partial<Record<CompositeName, CompositeScore>>;

export interface ScoringResult {
  composites: CompositeScores;
  immediateConcerns: string[];
  booleanFlags: Record<string, boolean>;
}

export interface TestProduct {
  id: string;
  name: string;
  biomarker: string;          // e.g. "HbA1c"
}

export interface SupplementProduct {
  id: string;
  supplement_name: string;    // must match rules below
  biomarker?: string;
  category?: string;
  red_flags?: string;         // safety notes from CSV
}

export type Priority = "Core" | "Optional" | "Discuss_with_clinician";

export interface SelectedSupplement {
  supplement_name: string;
  priority: Priority;
  why: string;
  safety_note: string;
}

export interface ScreeningBundle {
  bundleId:
    | "metabolic_panel"
    | "vitamin_d"
    | "cortisol_rhythm"
    | "gut_health"
    | "thyroid_panel"
    | "nutrient_status";
  title: string;
  month: 1 | 2 | 3;
  biomarkers: string[];
  triggeredBy: string[];
}

export interface RiskFlags {
  poor_sleep_flag: boolean;
  high_stress_flag: boolean;
  metabolic_risk_flag: boolean;
  cardiometabolic_risk_flag: boolean;
  movement_limitations_flag: boolean;
  gut_workup_indicated_flag: boolean;
  immune_vulnerability_flag: boolean;    // approximated from symptom burden
  travel_strain_flag: boolean;           // always false here (menopause persona)
  red_flag_burden_flag: boolean;

  // menopause-specific extras used for test logic
  bone_density_scan_indicated_flag: boolean;
  vitD_testing_indicated_flag: boolean;
  glucose_testing_indicated_flag: boolean;
  lipids_testing_indicated_flag: boolean;
  thyroid_testing_indicated_flag: boolean;
  cortisol_testing_indicated_flag: boolean;
  high_inflammation_risk_flag: boolean;
  screening_gap_high_flag: boolean;
}

export interface KeyMetrics {
  stress_load_score: number;
  cortisol_regulation_score: number;
  sleep_quality_score: number;
  cognitive_recovery_score: number;
}

export interface MenopauseProfile {
  composites: CompositeScores;
  key_metrics: KeyMetrics;
  risk_flags: RiskFlags;
  immediateConcerns: string[];
  booleanFlags: Record<string, boolean>;

  age?: number;
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;

  menstrual_status?: "Regular periods" | "Irregular periods" | "No period 12+ months" | "Hormonal contraception" | "Hysterectomy";
  hrt_use?: "No" | "Estrogen" | "Progesterone" | "Combined" | "Testosterone/DHEA";
  is_postmenopausal: boolean;
  is_perimenopausal: boolean;
  on_HRT: boolean;
}

export interface WeeklyActions {
  nutrition: string[];
  supplements: string[];
  movement_recovery: string[];
  screenings_checks: string[];
  environment: string[];
  red_flags: string[];
}

// Main engine output for free menopause dashboard + LLM
export interface MenopauseEngineOutput {
  profile: MenopauseProfile;
  screenings: ScreeningBundle[];
  selectedTests: TestProduct[];
  selectedSupplements: SelectedSupplement[];
  weeklyActions: WeeklyActions;
}

// --------------------------------------------------
// 2. Utility helpers
// --------------------------------------------------

function valueFromScale(scale: string[], answerLabel: string): number {
  const idx = scale.indexOf(answerLabel);
  return idx >= 0 ? idx : 0;
}

function applyCompositeContribution(
  compositesRaw: Partial<Record<CompositeName, number>>,
  compositesMax: Partial<Record<CompositeName, number>>,
  composites: CompositeWeight[],
  value: number
): void {
  composites.forEach(c => {
    const name = c.name;
    const currentRaw = compositesRaw[name] ?? 0;
    const currentMax = compositesMax[name] ?? 0;
    compositesRaw[name] = currentRaw + value * c.weight;
    // assume 0–4 scale for max effect
    compositesMax[name] = currentMax + Math.abs(c.weight) * 4;
  });
}

function respStr(responses: UserResponses, id: string): string | undefined {
  return typeof responses[id] === "string" ? (responses[id] as string) : undefined;
}

// if you use text scales like "Never","Rarely","Sometimes","Often","Almost always"
function oftenOrMore(responses: UserResponses, id: string): boolean {
  const v = respStr(responses, id);
  return v === "Often" || v === "Almost always";
}

// numeric helper (0–4)
function respNum(responses: UserResponses, id: string): number | undefined {
  const v = responses[id];
  return typeof v === "number" ? v : undefined;
}

// --------------------------------------------------
// 3. Composite scoring engine (generic)
// --------------------------------------------------

export function computeComposites(
  config: QuestionnaireConfig,
  responses: UserResponses
): ScoringResult {
  const compositesRaw: Partial<Record<CompositeName, number>> = {};
  const compositesMax: Partial<Record<CompositeName, number>> = {};
  const immediateConcerns: string[] = [];
  const booleanFlags: Record<string, boolean> = {};

  for (const q of config.questions) {
    const response = responses[q.id];
    if (response === undefined || response === null) continue;

    // Set boolean flags (yes/no)
    if (q.setsFlag && q.type === "single_choice" && q.scaleId === "yes_no") {
      const yesNoScale = config.scales["yes_no"];
      const label = String(response);
      const val = valueFromScale(yesNoScale, label); // 0 = No, 1 = Yes
      booleanFlags[q.setsFlag] = (val === 1);
    }

    // Immediate concerns (future red flags)
    if (q.isImmediateConcern && q.type === "single_choice" && q.scaleId === "yes_no") {
      const yesNoScale = config.scales["yes_no"];
      const label = String(response);
      const val = valueFromScale(yesNoScale, label);
      if (val === 1) immediateConcerns.push(q.id);
    }

    // Numeric questions not scored in composites here
    if (q.type === "number") continue;

    // Multi-select with per-option composites (e.g. diagnoses)
    if (q.type === "multi_select" && Array.isArray(response) && q.options) {
      const selectedLabels = response as string[];
      for (const opt of q.options) {
        if (!opt.composites || opt.composites.length === 0) continue;
        const selected = selectedLabels.includes(opt.label);
        if (!selected) continue;
        const value = 1; // 0/1 flag
        opt.composites.forEach(c => {
          const name = c.name;
          const currentRaw = compositesRaw[name] ?? 0;
          const currentMax = compositesMax[name] ?? 0;
          compositesRaw[name] = currentRaw + value * c.weight;
          compositesMax[name] = currentMax + Math.abs(c.weight);
        });
      }
      continue;
    }

    // Single-choice questions
    if (q.type === "single_choice" && q.scaleId) {
      const scale = config.scales[q.scaleId];
      if (!scale) continue;
      const label = String(response);
      let val = valueFromScale(scale, label);

      if (q.reverse) {
        const maxIndex = scale.length - 1;
        val = maxIndex - val;
      }

      // Option-specific composites (if any)
      if (q.options && q.options.length > 0) {
        const matchedOpt = q.options.find(o => o.label === label);
        if (matchedOpt && matchedOpt.composites) {
          applyCompositeContribution(compositesRaw, compositesMax, matchedOpt.composites, val);
        }
      }

      // Question-level composites
      if (q.composites && q.composites.length > 0) {
        applyCompositeContribution(compositesRaw, compositesMax, q.composites, val);
      }
    }
  }

  // Normalize composites to 0–100
  const composites: CompositeScores = {};
  (Object.keys(compositesRaw) as CompositeName[]).forEach(name => {
    const raw = compositesRaw[name] ?? 0;
    const max = compositesMax[name] || 1;
    let normalized = (raw / max) * 100;
    if (normalized < 0) normalized = 0;
    if (normalized > 100) normalized = 100;
    composites[name] = { raw, maxPossible: max, normalized };
  });

  return { composites, immediateConcerns, booleanFlags };
}

// --------------------------------------------------
// 4. Build Menopause Profile: key metrics + risk flags
// --------------------------------------------------

export function buildMenopauseProfile(
  scoring: ScoringResult,
  responses: UserResponses
): MenopauseProfile {
  const c = scoring.composites;

  const get = (name: CompositeName): number =>
    c[name]?.normalized ?? 0;

  const stress_load_score = get("SLD");
  const cortisol_regulation_score = get("CRT");
  const sleep_quality_score = get("SLP");
  const cognitive_recovery_score = get("CRV");

  // Numeric inputs - adjust field names based on actual questionnaire
  const age = typeof responses["Q0_1"] === "number" ? (responses["Q0_1"] as number) : 
              typeof responses["0.1"] === "number" ? (responses["0.1"] as number) :
              typeof responses["BG1"] === "number" ? (responses["BG1"] as number) : undefined;
  
  const height_cm = typeof responses["Q0_2_h"] === "number" ? (responses["Q0_2_h"] as number) :
                    typeof responses["0.2_h"] === "number" ? (responses["0.2_h"] as number) :
                    typeof responses["BG3"] === "number" ? (responses["BG3"] as number) : undefined;
  
  const weight_kg = typeof responses["Q0_2_w"] === "number" ? (responses["Q0_2_w"] as number) :
                    typeof responses["0.2_w"] === "number" ? (responses["0.2_w"] as number) :
                    typeof responses["BG4"] === "number" ? (responses["BG4"] as number) : undefined;
  
  const bmi =
    height_cm && weight_kg ? weight_kg / Math.pow(height_cm / 100, 2) : undefined;

  const menstrual_status = (responses["Q0_3"] || responses["0.3"] || responses["BG5"]) as MenopauseProfile["menstrual_status"];
  const hrt_use = (responses["Q0_4"] || responses["0.4"] || responses["BG6"]) as MenopauseProfile["hrt_use"];

  const diagnoses = Array.isArray(responses["Q0_5"]) ? (responses["Q0_5"] as string[]) :
                    Array.isArray(responses["0.5"]) ? (responses["0.5"] as string[]) :
                    Array.isArray(responses["BG7"]) ? (responses["BG7"] as string[]) : [];
  
  const has_dx_thyroid = diagnoses.includes("Thyroid condition") || diagnoses.some((d: string) => d.toLowerCase().includes("thyroid"));
  const has_dx_htn     = diagnoses.includes("High blood pressure") || diagnoses.some((d: string) => d.toLowerCase().includes("blood pressure") || d.toLowerCase().includes("hypertension"));
  const has_dx_chol    = diagnoses.includes("High cholesterol") || diagnoses.some((d: string) => d.toLowerCase().includes("cholesterol"));
  const has_dx_glucose = diagnoses.includes("Diabetes/prediabetes") || diagnoses.includes("Prediabetes or diabetes") || diagnoses.some((d: string) => d.toLowerCase().includes("diabetes") || d.toLowerCase().includes("prediabetes"));
  const has_dx_mood    = diagnoses.includes("Anxiety/depression") || diagnoses.includes("Anxiety or depression") || diagnoses.some((d: string) => d.toLowerCase().includes("anxiety") || d.toLowerCase().includes("depression"));

  const is_postmenopausal =
    menstrual_status === "No period 12+ months" ||
    menstrual_status === "Hysterectomy" ||
    ((age ?? 0) >= 55 && menstrual_status !== "Hormonal contraception");

  const is_perimenopausal =
    menstrual_status === "Irregular periods" && (age ?? 0) >= 40 && (age ?? 0) <= 55;

  const on_HRT = hrt_use && hrt_use !== "No";

  // composites used directly
  const NUT = get("NUT");
  const MOB = get("MOB");
  const ENV = get("ENV");
  const RFB = get("RFB");
  const SLD = get("SLD");
  const CRT = get("CRT");
  const SLP = get("SLP");
  const CRV = get("CRV");

  // Derived simple scores for supplements / screening gap
  // Try multiple possible field names
  const Q2_1 = respNum(responses, "Q2_1") ?? respNum(responses, "2.1") ?? respNum(responses, "F1") ?? 0;
  const Q2_2 = respNum(responses, "Q2_2") ?? respNum(responses, "2.2") ?? respNum(responses, "F2") ?? 0;
  const Q2_3 = respNum(responses, "Q2_3") ?? respNum(responses, "2.3") ?? respNum(responses, "F3") ?? 0;

  const Q4_1 = respNum(responses, "Q4_1") ?? respNum(responses, "4.1") ?? respNum(responses, "S1") ?? 0;
  const Q4_2 = respNum(responses, "Q4_2") ?? respNum(responses, "4.2") ?? respNum(responses, "S2") ?? 0;
  const Q4_3 = respNum(responses, "Q4_3") ?? respNum(responses, "4.3") ?? 0; // 0 = No, 1 = Yes
  const Q4_4 = respNum(responses, "Q4_4") ?? respNum(responses, "4.4") ?? 0; // 0–3
  const Q4_5 = respNum(responses, "Q4_5") ?? respNum(responses, "4.5") ?? 0;
  const Q4_6 = respNum(responses, "Q4_6") ?? respNum(responses, "4.6") ?? 0;

  // simple internal "gap" helpers
  const supplement_gap_score =
    (4 - Q2_1) * 2 +
    (4 - Q2_2) * 2 +
    (4 - Q2_3) * 2;

  const screening_gap_score =
    (4 - Q4_1) * 2 +
    (4 - Q4_2) * 1 +
    (Q4_3 === 0 ? 2 : 0) +      // no labs
    (Q4_4 === 0 ? 2 : Q4_4 === 1 ? 1 : Q4_4 === 2 ? 1 : 0) +
    (Q4_5 === 0 ? 2 : Q4_5 === 1 ? 1 : Q4_5 === 2 ? 1 : 0) +
    (Q4_6 === 0 ? 2 : Q4_6 === 1 ? 1 : Q4_6 === 2 ? 1 : 0);

  // Flags

  const poor_sleep_flag = SLP >= 60;
  const high_stress_flag = SLD >= 60;
  const cortisol_risk_flag = CRT >= 60 || (poor_sleep_flag && high_stress_flag);
  const cognitive_strain_flag = CRV >= 60;

  const metabolic_risk_flag =
    (bmi !== undefined && bmi >= 27) ||
    has_dx_glucose ||
    NUT >= 60 ||
    MOB >= 60;

  const cardiometabolic_risk_flag =
    metabolic_risk_flag ||
    has_dx_htn ||
    has_dx_chol ||
    (is_postmenopausal && (bmi ?? 0) >= 25);

  // approximate immune burden: frequent headaches + crashes + high stress
  const immune_vulnerability_flag =
    RFB >= 60 ||
    (high_stress_flag && poor_sleep_flag && cognitive_strain_flag);

  const movement_limitations_flag =
    MOB >= 60;

  const gut_workup_indicated_flag =
    (respNum(responses, "Q1_5") ?? respNum(responses, "1.5") ?? respNum(responses, "G1") ?? 0) >= 3 ||
    (NUT >= 60 && (respNum(responses, "Q1_5") ?? respNum(responses, "1.5") ?? respNum(responses, "G1") ?? 0) >= 2);

  const high_inflammation_risk_flag =
    cardiometabolic_risk_flag &&
    (NUT >= 60 || MOB >= 60 || RFB >= 60);

  const screening_gap_high_flag = screening_gap_score >= 20;

  const red_flag_burden_flag =
    RFB >= 60 ||
    (high_stress_flag && poor_sleep_flag && cognitive_strain_flag);

  // bone & vit D
  const bone_density_scan_indicated_flag =
    (age ?? 0) >= 65 ||
    (
      (age ?? 0) >= 50 &&
      is_postmenopausal &&
      ((bmi ?? 0) < 20 || MOB >= 60 || NUT >= 60)
    );

  const vitD_testing_indicated_flag =
    (Q4_4 === 0 || Q4_4 === 1 || Q4_4 === 2) &&
    ((age ?? 0) >= 50 || bone_density_scan_indicated_flag);

  const glucose_testing_indicated_flag =
    (Q4_5 === 0 || Q4_5 === 1 || Q4_5 === 2) &&
    (metabolic_risk_flag || (age ?? 0) >= 45);

  const lipids_testing_indicated_flag =
    (Q4_6 === 0 || Q4_6 === 1 || Q4_6 === 2) &&
    (cardiometabolic_risk_flag || (age ?? 0) >= 45);

  const fatigueHeavy =
    (respNum(responses, "Q7_7") ?? respNum(responses, "7.7") ?? respNum(responses, "F1") ?? 0) >= 3 ||
    (respNum(responses, "Q7_8") ?? respNum(responses, "7.8") ?? respNum(responses, "F2") ?? 0) >= 3;

  const thyroid_testing_indicated_flag =
    has_dx_thyroid ||
    (
      !has_dx_thyroid &&
      fatigueHeavy &&
      poor_sleep_flag &&
      cardiometabolic_risk_flag
    );

  const cortisol_testing_indicated_flag =
    cortisol_risk_flag &&
    !screening_gap_high_flag; // prefer basics first

  const risk_flags: RiskFlags = {
    poor_sleep_flag,
    high_stress_flag,
    metabolic_risk_flag,
    cardiometabolic_risk_flag,
    movement_limitations_flag,
    gut_workup_indicated_flag,
    immune_vulnerability_flag,
    travel_strain_flag: false, // not used for menopause persona
    red_flag_burden_flag,

    bone_density_scan_indicated_flag,
    vitD_testing_indicated_flag,
    glucose_testing_indicated_flag,
    lipids_testing_indicated_flag,
    thyroid_testing_indicated_flag,
    cortisol_testing_indicated_flag,
    high_inflammation_risk_flag,
    screening_gap_high_flag
  };

  const key_metrics: KeyMetrics = {
    stress_load_score,
    cortisol_regulation_score,
    sleep_quality_score,
    cognitive_recovery_score
  };

  return {
    composites: scoring.composites,
    key_metrics,
    risk_flags,
    immediateConcerns: scoring.immediateConcerns,
    booleanFlags: scoring.booleanFlags,
    age,
    height_cm,
    weight_kg,
    bmi,
    menstrual_status,
    hrt_use,
    is_postmenopausal,
    is_perimenopausal,
    on_HRT
  };
}

// --------------------------------------------------
// 5. Biomarker families for tests (same as traveller)
// --------------------------------------------------

const BIOMARKERS = {
  metabolic_glucose: [
    "Fasting glucose", "HbA1c", "OGTT", "Fasting insulin", "HOMA-IR"
  ],
  metabolic_lipids: [
    "Total cholesterol", "LDL-C", "HDL-C", "Triglycerides", "Non-HDL-C", "ApoB"
  ],
  metabolic_liver_kidney: [
    "ALT", "AST", "GGT", "Creatinine", "eGFR"
  ],
  inflammation: [
    "hs-CRP", "CRP", "ESR", "Fibrinogen"
  ],
  micronutrient_D: [
    "25(OH)D"
  ],
  micronutrient_B: [
    "Vitamin B12", "Folate", "Homocysteine"
  ],
  micronutrient_iron: [
    "Ferritin", "Serum iron", "Transferrin saturation"
  ],
  micronutrient_magnesium: [
    "Serum magnesium", "RBC magnesium"
  ],
  thyroid: [
    "TSH", "Free T4", "Free T3", "Anti-TPO"
  ],
  cortisol_HPA: [
    "AM cortisol", "PM cortisol", "Diurnal cortisol curve", "Salivary cortisol x4"
  ],
  gut_microbiome: [
    "Stool microbiome", "GI MAP", "Comprehensive stool analysis"
  ],
  gut_inflammation_barrier: [
    "Fecal calprotectin", "Fecal occult blood", "Zonulin"
  ]
};

const FAMILY_BUNDLE: Record<string, ScreeningBundle["bundleId"]> = {
  metabolic_glucose: "metabolic_panel",
  metabolic_lipids: "metabolic_panel",
  metabolic_liver_kidney: "metabolic_panel",
  micronutrient_D: "vitamin_d",
  cortisol_HPA: "cortisol_rhythm",
  gut_microbiome: "gut_health",
  gut_inflammation_barrier: "gut_health",
  thyroid: "thyroid_panel",
  micronutrient_B: "nutrient_status",
  micronutrient_iron: "nutrient_status",
  micronutrient_magnesium: "nutrient_status",
  inflammation: "nutrient_status"
};

interface BiomarkerTargets {
  wantedBiomarkersForTests: Set<string>;
  bundleTriggers: Partial<Record<ScreeningBundle["bundleId"], string[]>>;
}

// --------------------------------------------------
// 6. Derive biomarker targets for tests (menopause rules)
// --------------------------------------------------

function deriveBiomarkerTargets(
  profile: MenopauseProfile,
  responses: UserResponses
): BiomarkerTargets {
  const { risk_flags, composites, bmi, age } = profile;
  const get = (n: CompositeName) => composites[n]?.normalized ?? 0;

  const NUT = get("NUT");
  const SLP = get("SLP");
  const CRV = get("CRV");
  const RFB = get("RFB");

  const wantedBiomarkersForTests = new Set<string>();
  const bundleTriggers: Partial<Record<ScreeningBundle["bundleId"], string[]>> = {};

  const wantFamily = (familyKey: keyof typeof BIOMARKERS, reason: string) => {
    const biomarkers = BIOMARKERS[familyKey];
    biomarkers.forEach(b => wantedBiomarkersForTests.add(b));
    const bundleId = FAMILY_BUNDLE[familyKey];
    if (!bundleId) return;
    if (!bundleTriggers[bundleId]) bundleTriggers[bundleId] = [];
    bundleTriggers[bundleId]!.push(reason);
  };

  // --- Metabolic / cardiometabolic ---
  if (risk_flags.cardiometabolic_risk_flag || risk_flags.metabolic_risk_flag) {
    wantFamily(
      "metabolic_glucose",
      "Menopause-related cardiometabolic risk pattern (weight, glucose, blood pressure or sugar history)."
    );
    wantFamily(
      "metabolic_lipids",
      "Menopause-related cardiometabolic risk pattern (lipids and vascular risk)."
    );
  } else if ((age ?? 0) >= 45 && (bmi ?? 0) >= 25) {
    wantFamily(
      "metabolic_glucose",
      "Midlife weight and age where glucose markers are helpful for prevention."
    );
    wantFamily(
      "metabolic_lipids",
      "Midlife cardiovascular prevention context."
    );
  }

  if ((bmi ?? 0) >= 30 || risk_flags.metabolic_risk_flag) {
    wantFamily(
      "metabolic_liver_kidney",
      "Higher metabolic load where liver and kidney markers may guide preventive care."
    );
  }

  // --- Inflammation ---
  if (risk_flags.high_inflammation_risk_flag) {
    wantFamily(
      "inflammation",
      "Pain, cardiometabolic risk, or symptom burden where low-grade inflammation may be relevant."
    );
  }

  // --- Nutrient / vitamin D / B / iron / magnesium ---
  const nutrient_deficit_risk =
    NUT >= 60 ||
    (SLP >= 60 && CRV >= 60) ||
    risk_flags.immune_vulnerability_flag ||
    risk_flags.bone_density_scan_indicated_flag;

  if (risk_flags.vitD_testing_indicated_flag || nutrient_deficit_risk) {
    wantFamily(
      "micronutrient_D",
      "Midlife bone health, fatigue or mood pattern where vitamin D is commonly relevant."
    );
  }

  if (nutrient_deficit_risk) {
    wantFamily(
      "micronutrient_B",
      "Fatigue, brain fog or mood changes where B12 and folate status may matter."
    );
  }

  const fatigueHeavy =
    (respNum(responses, "Q7_7") ?? respNum(responses, "7.7") ?? respNum(responses, "F1") ?? 0) >= 3 ||
    (respNum(responses, "Q7_8") ?? respNum(responses, "7.8") ?? respNum(responses, "F2") ?? 0) >= 3;

  if (fatigueHeavy && (risk_flags.immune_vulnerability_flag || NUT >= 60)) {
    wantFamily(
      "micronutrient_iron",
      "Fatigue with diet and symptom patterns where iron status may be important."
    );
  }

  if (risk_flags.poor_sleep_flag || risk_flags.high_stress_flag) {
    wantFamily(
      "micronutrient_magnesium",
      "Sleep, stress or muscle-tension concerns where magnesium status can be informative."
    );
  }

  // --- Thyroid ---
  if (risk_flags.thyroid_testing_indicated_flag) {
    wantFamily(
      "thyroid",
      "Fatigue, mood or weight pattern where thyroid function may be relevant."
    );
  }

  // --- Cortisol / HPA ---
  if (risk_flags.cortisol_testing_indicated_flag) {
    wantFamily(
      "cortisol_HPA",
      "Persistent stress and sleep disturbance where cortisol rhythm testing may be considered."
    );
  }

  // --- Gut / microbiome ---
  if (risk_flags.gut_workup_indicated_flag) {
    wantFamily(
      "gut_microbiome",
      "Ongoing digestive symptoms in midlife where gut microbiome assessment may help."
    );
    if (risk_flags.high_inflammation_risk_flag) {
      wantFamily(
        "gut_inflammation_barrier",
        "Digestive symptoms plus inflammatory pattern."
      );
    }
  }

  return { wantedBiomarkersForTests, bundleTriggers };
}

// --------------------------------------------------
// 7. Select tests + build screening bundles
// --------------------------------------------------

function selectTestsFromCatalog(
  products: TestProduct[],
  targets: BiomarkerTargets
): { tests: TestProduct[]; bundles: ScreeningBundle[] } {
  const { wantedBiomarkersForTests, bundleTriggers } = targets;

  const tests = products.filter(p => wantedBiomarkersForTests.has(p.biomarker));

  const bundleBiomarkers: Record<ScreeningBundle["bundleId"], string[]> = {
    metabolic_panel: [],
    vitamin_d: [],
    cortisol_rhythm: [],
    gut_health: [],
    thyroid_panel: [],
    nutrient_status: []
  };

  // Map biomarker families into bundles
  for (const [familyKey, biomarkers] of Object.entries(BIOMARKERS)) {
    const bId = FAMILY_BUNDLE[familyKey];
    if (!bId) continue;
    const selected = biomarkers.filter(b => wantedBiomarkersForTests.has(b));
    if (selected.length > 0) {
      bundleBiomarkers[bId] = Array.from(new Set([...bundleBiomarkers[bId], ...selected]));
    }
  }

  const bundles: ScreeningBundle[] = [];

  const addBundle = (bundleId: ScreeningBundle["bundleId"], title: string, month: 1 | 2 | 3) => {
    const biomarkers = bundleBiomarkers[bundleId];
    if (!biomarkers || biomarkers.length === 0) return;
    const triggeredBy = Array.from(new Set(bundleTriggers[bundleId] ?? []));
    bundles.push({ bundleId, title, month, biomarkers, triggeredBy });
  };

  // Timing rules tuned for menopause
  addBundle("metabolic_panel", "Comprehensive Metabolic Panel (glucose, lipids, liver, kidney)", 1);
  addBundle("vitamin_d", "Vitamin D Level", 1);
  addBundle("thyroid_panel", "Thyroid Panel", 1);
  addBundle("nutrient_status", "Nutrient Status Panel (B12, iron, magnesium, inflammation)", 2);
  addBundle("cortisol_rhythm", "Cortisol Rhythm Testing", 2);
  addBundle("gut_health", "Gut Health Assessment", 3);

  return { tests, bundles };
}

// --------------------------------------------------
// 8. Supplement selection logic (menopause-specific)
// --------------------------------------------------

function dedupeSupplements(list: SelectedSupplement[]): SelectedSupplement[] {
  const priorityRank: Record<Priority, number> = {
    Core: 3,
    Optional: 2,
    Discuss_with_clinician: 1
  };
  const map = new Map<string, SelectedSupplement>();
  for (const s of list) {
    const existing = map.get(s.supplement_name);
    if (!existing) {
      map.set(s.supplement_name, s);
    } else {
      if (priorityRank[s.priority] > priorityRank[existing.priority]) {
        map.set(s.supplement_name, s);
      }
    }
  }
  return Array.from(map.values());
}

function selectSupplementsFromCatalog(
  profile: MenopauseProfile,
  responses: UserResponses,
  products: SupplementProduct[]
): SelectedSupplement[] {
  const out: SelectedSupplement[] = [];
  const { risk_flags, composites, bmi } = profile;
  const get = (n: CompositeName) => composites[n]?.normalized ?? 0;

  const NUT = get("NUT");
  const SLP = get("SLP");
  const CRV = get("CRV");

  const metabolic_domain_high =
    risk_flags.metabolic_risk_flag || risk_flags.cardiometabolic_risk_flag || (bmi ?? 0) >= 27;

  const nutrient_deficit_risk =
    NUT >= 60 ||
    (SLP >= 60 && CRV >= 60) ||
    risk_flags.immune_vulnerability_flag ||
    risk_flags.bone_density_scan_indicated_flag;

  const gut_domain_high = risk_flags.gut_workup_indicated_flag;
  const cognition_strain = CRV >= 60;
  const HPA_domain_high =
    risk_flags.high_stress_flag && risk_flags.poor_sleep_flag;

  const fatigueHeavy =
    (respNum(responses, "Q7_7") ?? respNum(responses, "7.7") ?? respNum(responses, "F1") ?? 0) >= 3 ||
    (respNum(responses, "Q7_8") ?? respNum(responses, "7.8") ?? respNum(responses, "F2") ?? 0) >= 3;

  const findSupp = (name: string): SupplementProduct | undefined =>
    products.find(p => p.supplement_name === name);

  const add = (name: string, priority: Priority, why: string) => {
    const row = findSupp(name);
    if (!row) return;
    out.push({
      supplement_name: name,
      priority,
      why,
      safety_note: row.red_flags ?? ""
    });
  };

  // --- Metabolic / cardiometabolic ---
  if (metabolic_domain_high) {
    add(
      "Fish Oil/Omega-3s",
      "Core",
      "Supports triglycerides, inflammation and cardiovascular health in midlife."
    );
    add(
      "Fiber Supplements",
      "Core",
      "Helps support cholesterol, glucose stability and gut health."
    );
    add(
      "Coenzyme Q10 (CoQ10)",
      "Optional",
      "Supports cellular energy; often considered when metabolic load or statin use is present."
    );
    add(
      "Green Tea Extract",
      "Discuss_with_clinician",
      "Sometimes used for metabolic and antioxidant support; suitability depends on liver health and medications."
    );
    add(
      "Garlic",
      "Discuss_with_clinician",
      "Traditionally used for lipid and blood-pressure support; may interact with blood-thinning medications."
    );
  }

  // --- Nutritional foundations / bone health ---
  if (nutrient_deficit_risk) {
    add(
      "Multivitamins",
      "Core",
      "Provides broad micronutrient coverage when diet is variable or appetite is changing around menopause."
    );
    add(
      "Vitamin D",
      "Core",
      "Supports bone, muscle and immune health where deficiency is common in midlife."
    );
    add(
      "B Vitamins",
      "Core",
      "Support energy metabolism, mood and stress resilience."
    );
  }

  if (nutrient_deficit_risk || fatigueHeavy) {
    add(
      "Magnesium",
      "Core",
      "Supports nerve-muscle function, relaxation and sleep, and may help with menopausal muscle tension."
    );
  }

  if (fatigueHeavy && (risk_flags.immune_vulnerability_flag || NUT >= 60)) {
    add(
      "Iron",
      "Discuss_with_clinician",
      "Iron is only appropriate when deficiency is confirmed; discuss testing and dosing with your clinician."
    );
    add(
      "Zinc",
      "Optional",
      "Provides immune support; avoid high long-term doses and overlapping with multivitamins."
    );
  }

  // --- Sleep & circadian ---
  if (risk_flags.poor_sleep_flag) {
    add(
      "L-Theanine",
      "Core",
      "Can promote calm and smoother sleep onset without strong sedation."
    );
    add(
      "Melatonin",
      "Optional",
      "Helps with circadian timing and may assist with sleep onset; best used short-term with clinician guidance."
    );
  }

  // --- Stress / HPA ---
  if (risk_flags.high_stress_flag) {
    add(
      "B Vitamins",
      "Core",
      "Support stress resilience and energy production under sustained mental load."
    );
    add(
      "Magnesium",
      "Core",
      "Helps calm the nervous system and can reduce stress-related muscle tension."
    );
    add(
      "L-Theanine",
      "Core",
      "Supports relaxed focus during the day and smoother unwinding in the evening."
    );
    add(
      "Ashwagandha",
      "Discuss_with_clinician",
      "An adaptogenic herb used for stress support; may not suit all thyroid, autoimmune or pregnancy contexts."
    );
  }

  if (HPA_domain_high) {
    add(
      "Adaptogen Blends",
      "Discuss_with_clinician",
      "Combined adaptogenic formulas can support stress response but should be matched to your medical history."
    );
  }

  // --- Gut / immune ---
  if (gut_domain_high) {
    add(
      "Probiotics/Prebiotics",
      "Core",
      "Support gut microbiome balance, especially with dietary changes or antibiotic history."
    );
    add(
      "Fiber Supplements",
      "Core",
      "Support bowel regularity and beneficial gut bacteria."
    );
    add(
      "Vitamin C",
      "Optional",
      "Provides antioxidant and immune support."
    );
    add(
      "Elderberry",
      "Optional",
      "Often used for immune support during cold and flu seasons; consider allergy history."
    );
    add(
      "Functional Mushrooms",
      "Optional",
      "May support immune resilience and stress adaptation in some individuals."
    );
  } else if (risk_flags.immune_vulnerability_flag) {
    add(
      "Vitamin C",
      "Optional",
      "Antioxidant and immune support during busy or stressful periods."
    );
    add(
      "Zinc",
      "Optional",
      "Immune support; ensure total zinc intake remains within recommended limits."
    );
  }

  // --- Joints / mobility ---
  if (risk_flags.movement_limitations_flag) {
    add(
      "Glucosamine & Chondroitin",
      "Optional",
      "Commonly used for joint comfort, especially in knees and hips."
    );
    add(
      "Collagen",
      "Optional",
      "Supports joint and connective-tissue health; easy to add to drinks."
    );
    add(
      "Turmeric/Curcumin",
      "Discuss_with_clinician",
      "Anti-inflammatory herb that may help joint discomfort; can affect bleeding and gallbladder issues."
    );
  }

  // --- Cognition / brain fog ---
  if (cognition_strain) {
    add(
      "Fish Oil/Omega-3s",
      "Core",
      "EPA and DHA support brain and mood health as well as cardiometabolic risk."
    );
    add(
      "Ginkgo Biloba",
      "Discuss_with_clinician",
      "Herb traditionally used for cognitive support and circulation; may interact with blood-thinning medications."
    );
    add(
      "Creatine",
      "Discuss_with_clinician",
      "Supports muscle and possibly cognitive performance; requires good hydration and kidney awareness."
    );
  }

  const deduped = dedupeSupplements(out);
  const MAX = 7;
  return deduped.slice(0, MAX);
}

// --------------------------------------------------
// 9. Weekly Actions builder (dashboard "This Week")
// --------------------------------------------------

function buildWeeklyActions(
  profile: MenopauseProfile,
  screenings: ScreeningBundle[],
  supplements: SelectedSupplement[],
  responses: UserResponses
): WeeklyActions {
  const { risk_flags, composites, bmi } = profile;
  const get = (n: CompositeName) => composites[n]?.normalized ?? 0;

  const NUT = get("NUT");
  const MOB = get("MOB");
  const SLP = get("SLP");

  const Q1_1 = respNum(responses, "Q1_1") ?? respNum(responses, "1.1") ?? respNum(responses, "L1") ?? 0; // processed foods
  const Q1_5 = respNum(responses, "Q1_5") ?? respNum(responses, "1.5") ?? respNum(responses, "G1") ?? 0; // bloated/sluggish

  const Q3_1 = respNum(responses, "Q3_1") ?? respNum(responses, "3.1") ?? respNum(responses, "L2") ?? 0; // exercise days
  const Q3_2 = respNum(responses, "Q3_2") ?? respNum(responses, "3.2") ?? 0; // strength

  const nutrition: string[] = [];
  const supplementsActions: string[] = [];
  const movement_recovery: string[] = [];
  const screenings_checks: string[] = [];
  const environment: string[] = [];
  const red_flags: string[] = [];

  // Nutrition actions
  if (NUT >= 50 || Q1_1 >= 2) {
    nutrition.push(
      "Shift at least one main meal per day toward whole foods (vegetables, whole grains, lean protein) and reduce ultra-processed items.",
      "Minimise very late, heavy meals and excess sugar in the evening to support sleep, weight and energy."
    );
  }
  if (risk_flags.metabolic_risk_flag || (bmi ?? 0) >= 27) {
    nutrition.push(
      "Aim for a regular meal pattern (avoid long fasting followed by very large meals) to support blood sugar stability in midlife."
    );
  }
  if (Q1_5 >= 2) {
    nutrition.push(
      "Track which meals leave you most bloated or sluggish for 3–5 days and bring this record to your clinician if symptoms persist."
    );
  }

  // Supplements actions
  if (supplements.length > 0) {
    supplementsActions.push(
      "Review your current supplements and these suggestions with your clinician, especially if you are on HRT or prescription medications.",
      "Focus on a small, realistic core supplement routine rather than starting many products at once."
    );
  }

  // Movement & recovery actions
  if (MOB >= 50 || Q3_2 === 0) {
    movement_recovery.push(
      "On at least 2 days this week, schedule short strength sessions (e.g. bodyweight or resistance bands) to support bone and muscle health.",
      "On days with a lot of sitting, stand up or walk for 3–5 minutes every 1–2 hours."
    );
  }
  if (Q3_1 <= 1) {
    movement_recovery.push(
      "Aim for a 20–30 minute brisk walk or similar moderate movement on at least 3 days this week."
    );
  }

  // Screenings & checks actions
  if (screenings.length > 0) {
    screenings_checks.push(
      "At your next routine visit, share this summary with your clinician and discuss which of the suggested blood tests or assessments are most appropriate for you."
    );
    const hasMetabolic = screenings.some(b => b.bundleId === "metabolic_panel");
    if (hasMetabolic) {
      screenings_checks.push(
        "Ask whether blood pressure, fasting glucose or HbA1c, and a lipid profile are up to date given your menopausal stage."
      );
    }
    const hasThyroid = screenings.some(b => b.bundleId === "thyroid_panel");
    if (hasThyroid) {
      screenings_checks.push(
        "If fatigue, low mood or temperature sensitivity persist, discuss whether thyroid testing or follow-up is indicated."
      );
    }
    const hasVitD = screenings.some(b => b.bundleId === "vitamin_d");
    if (hasVitD || risk_flags.bone_density_scan_indicated_flag) {
      screenings_checks.push(
        "If you are 50+ with menopause and limited strength training, ask about bone health and whether bone density testing (DXA) is appropriate."
      );
    }
    const hasGut = screenings.some(b => b.bundleId === "gut_health");
    if (hasGut) {
      screenings_checks.push(
        "For ongoing digestive symptoms, ask your clinician which gut investigations (if any) are suitable instead of relying only on supplements."
      );
    }
  }

  // Environment & sleep actions
  if (risk_flags.poor_sleep_flag || SLP >= 50) {
    environment.push(
      "Create a 30–60 minute wind-down routine before bed with dimmer lights and no work, news or email.",
      "Keep your bedroom cool, dark and quiet; if hot flushes or night sweats are an issue, experiment with a slightly cooler room and breathable bedding."
    );
  }

  // Red flags actions
  if (profile.immediateConcerns.length > 0) {
    red_flags.push(
      "You reported possible warning symptoms. Do not rely on this screening alone—seek prompt medical advice."
    );
  } else if (risk_flags.red_flag_burden_flag) {
    red_flags.push(
      "If chest discomfort, breathlessness, sudden dizziness or mood changes that affect daily life worsen or persist, book a timely medical review."
    );
  }

  return {
    nutrition,
    supplements: supplementsActions,
    movement_recovery,
    screenings_checks,
    environment,
    red_flags
  };
}

// --------------------------------------------------
// 10. Main orchestration function
// --------------------------------------------------

export function runMenopauseEngine(
  questionnaireConfig: QuestionnaireConfig,
  responses: UserResponses,
  testProducts: TestProduct[],
  supplementProducts: SupplementProduct[]
): MenopauseEngineOutput {
  // 1) Score questionnaire
  const scoring = computeComposites(questionnaireConfig, responses);

  // 2) Build menopause profile (key metrics + flags + context)
  const profile = buildMenopauseProfile(scoring, responses);

  // 3) Decide which biomarkers / tests to consider
  const biomarkerTargets = deriveBiomarkerTargets(profile, responses);
  const { tests: selectedTests, bundles: screenings } =
    selectTestsFromCatalog(testProducts, biomarkerTargets);

  // 4) Select supplements from full catalogue
  const selectedSupplements = selectSupplementsFromCatalog(
    profile,
    responses,
    supplementProducts
  );

  // 5) Build weekly actions for menopause dashboard
  const weeklyActions = buildWeeklyActions(
    profile,
    screenings,
    selectedSupplements,
    responses
  );

  return {
    profile,
    screenings,
    selectedTests,
    selectedSupplements,
    weeklyActions
  };
}

