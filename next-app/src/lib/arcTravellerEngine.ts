// arcTravellerEngine.ts
// Core logic engine for ARC Free Traveller / Global Movers Screening

// --------------------------------------------------
// 1. Types
// --------------------------------------------------

export type CompositeName =
  | "SLD"  // Stress Load
  | "CRT"  // Cortisol Regulation
  | "SLP"  // Sleep Quality
  | "CRV"  // Cognitive Recovery
  | "CRY"  // Cognitive Rhythm
  | "MOB"  // Movement / Recovery
  | "NUT"  // Nutrition Risk
  | "ENV"  // Environment Risk (reserved)
  | "RFB"  // Red Flag Burden
  | "LIF"  // Lifestyle Load
  | "MET"  // Metabolic Risk
  | "TRV"; // Travel Strain

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
  isImmediateConcern?: boolean;    // e.g. R1, R3
  setsFlag?: string;               // e.g. "upcoming_travel_within_6w"
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
  // you can add price, description, etc.
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
  immune_vulnerability_flag: boolean;
  travel_strain_flag: boolean;
  red_flag_burden_flag: boolean;
}

export interface KeyMetrics {
  stress_load_score: number;
  cortisol_regulation_score: number;
  sleep_quality_score: number;
  cognitive_recovery_score: number;
  travel_strain_score: number;
}

export interface TravellerProfile {
  composites: CompositeScores;
  key_metrics: KeyMetrics;
  risk_flags: RiskFlags;
  immediateConcerns: string[];
  booleanFlags: Record<string, boolean>;
  bmi?: number;
  age?: number;
}

export interface WeeklyActions {
  nutrition: string[];
  supplements: string[];
  movement_recovery: string[];
  screenings_checks: string[];
  environment: string[];
  red_flags: string[];
}

// Main engine output for free screening dashboard + LLM
export interface TravellerEngineOutput {
  profile: TravellerProfile;
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

function oftenOrMore(responses: UserResponses, id: string): boolean {
  const v = respStr(responses, id);
  return v === "Often" || v === "Almost always";
}

// --------------------------------------------------
// 3. Composite scoring engine
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

    // Immediate concerns (red flags that require prompt attention)
    if (q.isImmediateConcern && q.type === "single_choice" && q.scaleId === "yes_no") {
      const yesNoScale = config.scales["yes_no"];
      const label = String(response);
      const val = valueFromScale(yesNoScale, label);
      if (val === 1) immediateConcerns.push(q.id);
    }

    // Numeric questions not scored in composites here
    if (q.type === "number") continue;

    // Multi-select questions with per-option composites (BG7/BG8)
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
// 4. Build Traveller Profile: key metrics + risk flags
// --------------------------------------------------

export function buildTravellerProfile(
  scoring: ScoringResult,
  responses: UserResponses
): TravellerProfile {
  const c = scoring.composites;

  const get = (name: CompositeName): number =>
    c[name]?.normalized ?? 0;

  const stress_load_score = get("SLD");
  const cortisol_regulation_score = get("CRT");
  const sleep_quality_score = get("SLP");
  const cognitive_recovery_score = get("CRV");
  const travel_strain_score = get("TRV");

  // Numeric inputs
  const age = typeof responses["BG1"] === "number" ? (responses["BG1"] as number) : undefined;
  const height = typeof responses["BG3"] === "number" ? (responses["BG3"] as number) : undefined; // cm
  const weight = typeof responses["BG4"] === "number" ? (responses["BG4"] as number) : undefined; // kg
  const bmi =
    height && weight ? weight / Math.pow(height / 100, 2) : undefined;

  const poor_sleep_flag = sleep_quality_score >= 60;
  const high_stress_flag = stress_load_score >= 60;

  const metabolic_risk_flag =
    (get("MET") >= 50) ||
    (bmi !== undefined && bmi >= 27);

  const cardiometabolic_risk_flag =
    metabolic_risk_flag || (get("MET") >= 40 && get("MOB") >= 50);

  const movement_limitations_flag =
    get("MOB") >= 60 ||
    oftenOrMore(responses, "P1") ||
    oftenOrMore(responses, "P2");

  const gut_workup_indicated_flag =
    oftenOrMore(responses, "G1") ||
    (get("NUT") >= 60 && oftenOrMore(responses, "IMM1"));

  const immune_vulnerability_flag =
    oftenOrMore(responses, "IMM1");

  const travel_strain_flag =
    get("TRV") >= 50 ||
    (scoring.booleanFlags["upcoming_travel_within_6w"] && sleep_quality_score >= 50);

  const red_flag_burden_flag =
    (get("RFB") >= 40) || scoring.immediateConcerns.length > 0;

  const risk_flags: RiskFlags = {
    poor_sleep_flag,
    high_stress_flag,
    metabolic_risk_flag,
    cardiometabolic_risk_flag,
    movement_limitations_flag,
    gut_workup_indicated_flag,
    immune_vulnerability_flag,
    travel_strain_flag,
    red_flag_burden_flag
  };

  const key_metrics: KeyMetrics = {
    stress_load_score,
    cortisol_regulation_score,
    sleep_quality_score,
    cognitive_recovery_score,
    travel_strain_score
  };

  return {
    composites: scoring.composites,
    key_metrics,
    risk_flags,
    immediateConcerns: scoring.immediateConcerns,
    booleanFlags: scoring.booleanFlags,
    bmi,
    age
  };
}

// --------------------------------------------------
// 5. Biomarker families for tests
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
  inflammation: "nutrient_status" // or a dedicated Inflammation bundle later
};

interface BiomarkerTargets {
  wantedBiomarkersForTests: Set<string>;
  bundleTriggers: Partial<Record<ScreeningBundle["bundleId"], string[]>>;
}

// --------------------------------------------------
// 6. Derive biomarker targets for tests
// --------------------------------------------------

function MOVHigh(composites: CompositeScores): boolean {
  const v = composites["MOB"]?.normalized ?? 0;
  return v >= 60;
}

function deriveBiomarkerTargets(
  profile: TravellerProfile,
  responses: UserResponses
): BiomarkerTargets {
  const { risk_flags, composites, bmi, age } = profile;
  const get = (n: CompositeName) => composites[n]?.normalized ?? 0;

  const wantedBiomarkersForTests = new Set<string>();
  const bundleTriggers: Partial<Record<ScreeningBundle["bundleId"], string[]>> = {};

  const MET = get("MET");
  const NUT = get("NUT");
  const MOB = get("MOB");
  const TRV = get("TRV");
  const SLP = get("SLP");
  const CRV = get("CRV");
  const RFB = get("RFB");

  const bg7 = Array.isArray(responses["BG7"]) ? (responses["BG7"] as string[]) : [];
  const bg8 = Array.isArray(responses["BG8"]) ? (responses["BG8"] as string[]) : [];

  const hasDx = (label: string) => bg7.includes(label);
  const hasFH = (label: string) => bg8.includes(label);

  const highProcessed = respStr(responses, "L1") === "Often" || respStr(responses, "L1") === "Almost always";
  const lowActivity = respStr(responses, "L2") === "Never" || respStr(responses, "L2") === "Rarely";

  const wantFamily = (familyKey: keyof typeof BIOMARKERS, reason: string) => {
    const biomarkers = BIOMARKERS[familyKey];
    biomarkers.forEach(b => wantedBiomarkersForTests.add(b));
    const bundleId = FAMILY_BUNDLE[familyKey];
    if (!bundleId) return;
    if (!bundleTriggers[bundleId]) bundleTriggers[bundleId] = [];
    bundleTriggers[bundleId]!.push(reason);
  };

  // Metabolic / cardiometabolic risk
  let majorMetRiskFactors = 0;
  if (bmi !== undefined && bmi >= 27) majorMetRiskFactors++;
  if (hasDx("High blood pressure")) majorMetRiskFactors++;
  if (hasDx("High cholesterol")) majorMetRiskFactors++;
  if (hasDx("Prediabetes or diabetes")) majorMetRiskFactors++;
  if (hasFH("Heart disease or stroke")) majorMetRiskFactors++;
  if (hasFH("Diabetes")) majorMetRiskFactors++;
  if (NUT >= 60) majorMetRiskFactors++;
  if (lowActivity) majorMetRiskFactors++;

  const metabolic_domain_high =
    risk_flags.metabolic_risk_flag ||
    risk_flags.cardiometabolic_risk_flag ||
    MET >= 60 ||
    majorMetRiskFactors >= 2;

  if (metabolic_domain_high) {
    wantFamily("metabolic_glucose", "Multiple cardiometabolic risk indicators (history, BMI, lifestyle).");
    wantFamily("metabolic_lipids", "Multiple cardiometabolic risk indicators (history, BMI, lifestyle).");
  } else if (MET >= 40 && (age ?? 0) >= 40) {
    wantFamily("metabolic_glucose", "Moderate metabolic risk with age over 40.");
    wantFamily("metabolic_lipids", "Moderate metabolic risk with age over 40.");
  }

  if (MET >= 60 || (bmi ?? 0) >= 30) {
    wantFamily("metabolic_liver_kidney", "Higher metabolic load where liver and kidney markers may be informative.");
  }

  // Inflammation
  const inflammation_domain_high =
    (RFB >= 40 && oftenOrMore(responses, "P1")) ||
    hasDx("Autoimmune condition") ||
    risk_flags.gut_workup_indicated_flag;

  if (inflammation_domain_high) {
    wantFamily("inflammation", "Pain, gut or autoimmune features suggesting possible inflammatory load.");
  }

  // Nutrient / vitamin D / B / iron / magnesium
  const nutrient_deficit_risk =
    NUT >= 60 ||
    (SLP >= 60 && CRV >= 60) ||
    risk_flags.immune_vulnerability_flag;

  if (nutrient_deficit_risk || (age ?? 0) >= 50) {
    wantFamily("micronutrient_D", "Fatigue, immune strain or age where vitamin D deficiency is common.");
  }

  if (nutrient_deficit_risk) {
    wantFamily("micronutrient_B", "Fatigue/brain-fog pattern where B12/folate status may be informative.");
  }

  const fatigueHeavy =
    oftenOrMore(responses, "F1") || oftenOrMore(responses, "F2");

  if (fatigueHeavy && (risk_flags.immune_vulnerability_flag || highProcessed)) {
    wantFamily("micronutrient_iron", "Fatigue with diet and immune patterns where iron status may be relevant.");
  }

  if (risk_flags.poor_sleep_flag || risk_flags.high_stress_flag || MOVHigh(composites)) {
    wantFamily("micronutrient_magnesium", "Sleep, stress or muscle-tension concerns where magnesium may be relevant.");
  }

  // Thyroid
  const thyroid_domain_possible =
    fatigueHeavy &&
    oftenOrMore(responses, "M1") &&
    (risk_flags.poor_sleep_flag || lowActivity);

  if (thyroid_domain_possible || hasDx("Thyroid condition")) {
    wantFamily("thyroid", "Fatigue and mood pattern that warrants discussing thyroid testing with clinician.");
  }

  // Cortisol / HPA
  const HPA_domain_high =
    risk_flags.high_stress_flag &&
    risk_flags.poor_sleep_flag &&
    TRV >= 50;

  if (HPA_domain_high) {
    wantFamily("cortisol_HPA", "High stress, poor sleep and travel strain where cortisol pattern may be informative.");
  }

  // Gut / microbiome
  const gut_domain_high = risk_flags.gut_workup_indicated_flag;

  if (gut_domain_high) {
    wantFamily("gut_microbiome", "Persistent digestive discomfort or immune issues.");
    if (inflammation_domain_high) {
      wantFamily("gut_inflammation_barrier", "Digestive symptoms plus inflammatory features.");
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

  // Timing rules
  addBundle("metabolic_panel", "Comprehensive Metabolic Panel (glucose, lipids, liver, kidney)", 1);
  addBundle("vitamin_d", "Vitamin D Level", 1);
  addBundle("cortisol_rhythm", "Cortisol Rhythm Testing", 2);
  addBundle("gut_health", "Gut Health Assessment", 3);
  addBundle("thyroid_panel", "Thyroid Panel", 2);
  addBundle("nutrient_status", "Nutrient Status Panel (B12, iron, magnesium, inflammation)", 2);

  return { tests, bundles };
}

// --------------------------------------------------
// 8. Supplement selection logic
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
  profile: TravellerProfile,
  responses: UserResponses,
  products: SupplementProduct[]
): SelectedSupplement[] {
  const out: SelectedSupplement[] = [];
  const { risk_flags, composites, bmi } = profile;
  const get = (n: CompositeName) => composites[n]?.normalized ?? 0;

  const MET = get("MET");
  const NUT = get("NUT");
  const SLP = get("SLP");
  const CRV = get("CRV");
  const TRV = get("TRV");
  const SLD = get("SLD");
  const CRY = get("CRY");

  const highProcessed = respStr(responses, "L1") === "Often" || respStr(responses, "L1") === "Almost always";
  const lowActivity = respStr(responses, "L2") === "Never" || respStr(responses, "L2") === "Rarely";

  const metabolic_domain_high =
    risk_flags.metabolic_risk_flag ||
    risk_flags.cardiometabolic_risk_flag ||
    MET >= 60 ||
    (bmi !== undefined && bmi >= 27);

  const nutrient_deficit_risk =
    NUT >= 60 || (SLP >= 60 && CRV >= 60) || risk_flags.immune_vulnerability_flag;

  const gut_domain_high = risk_flags.gut_workup_indicated_flag;
  const HPA_domain_high =
    risk_flags.high_stress_flag && risk_flags.poor_sleep_flag && TRV >= 50;
  const cognition_strain = CRV >= 60 || CRY >= 50;

  const fatigueHeavy =
    oftenOrMore(responses, "F1") || oftenOrMore(responses, "F2");

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

  // Metabolic / cardiometabolic
  if (metabolic_domain_high) {
    add(
      "Fish Oil/Omega-3s",
      "Core",
      "Supports triglycerides and inflammation in the setting of cardiometabolic strain."
    );
    add(
      "Fiber Supplements",
      "Core",
      "Helps support cholesterol, glucose stability and gut health, especially on irregular travel days."
    );
    add(
      "Coenzyme Q10 (CoQ10)",
      "Optional",
      "Supports cellular energy; often considered when metabolic load or medication use is high."
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

  // Nutrition / micronutrient
  if (nutrient_deficit_risk) {
    add(
      "Multivitamins",
      "Core",
      "Provides broad micronutrient coverage when diet is irregular or travel is frequent."
    );
    add(
      "Vitamin D",
      "Core",
      "Supports bone, immune and mood health when vitamin D levels or sun exposure may be low."
    );
    add(
      "B Vitamins",
      "Core",
      "Support energy metabolism and stress resilience, especially when diet is low in whole foods."
    );
  }

  if (nutrient_deficit_risk || fatigueHeavy) {
    add(
      "Magnesium",
      "Core",
      "Supports nerve-muscle function, relaxation and sleep, and may help with travel-related muscle tension."
    );
  }

  if (fatigueHeavy && (risk_flags.immune_vulnerability_flag || highProcessed)) {
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

  // Sleep and circadian
  if (risk_flags.poor_sleep_flag) {
    add(
      "L-Theanine",
      "Core",
      "Can promote calm and smoother sleep onset without strong sedation."
    );
    add(
      "Melatonin",
      "Optional",
      "Helps shift body clock for jet lag; best used short-term with clinician guidance on timing and dose."
    );
  }

  // Stress / HPA
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
      "Combined adaptogenic formulas can support stress response but should be matched to your medical history by a clinician."
    );
  }

  // Gut / immune
  if (gut_domain_high) {
    add(
      "Probiotics/Prebiotics",
      "Core",
      "Support gut microbiome balance, especially with travel, irregular eating or antibiotic history."
    );
    add(
      "Fiber Supplements",
      "Core",
      "Support bowel regularity and beneficial gut bacteria."
    );
    add(
      "Vitamin C",
      "Optional",
      "Provides antioxidant and immune support, especially around frequent travel."
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
      "Antioxidant and immune support around travel or busy periods."
    );
    add(
      "Zinc",
      "Optional",
      "Immune support; ensure total zinc intake remains within recommended limits."
    );
  }

  // Joints / mobility
  if (risk_flags.movement_limitations_flag) {
    add(
      "Glucosamine & Chondroitin",
      "Optional",
      "Commonly used for joint comfort, especially in knees and hips."
    );
    add(
      "Collagen",
      "Optional",
      "Supports joint and connective-tissue health; easy to mix into drinks when travelling."
    );
    add(
      "Turmeric/Curcumin",
      "Discuss_with_clinician",
      "Anti-inflammatory herb that may help joint discomfort; can affect bleeding and gallbladder issues."
    );
  }

  // Cognition / brain fog
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

  // Performance / protein
  const moderatelyActive =
    !lowActivity &&
    (composites["MOB"]?.normalized ?? 0) < 60 &&
    (respStr(responses, "L2") === "Sometimes" || respStr(responses, "L2") === "Often");

  if (moderatelyActive) {
    add(
      "Protein Powders",
      "Optional",
      "Can help meet protein needs on travel days when whole-food options are limited."
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
  profile: TravellerProfile,
  screenings: ScreeningBundle[],
  supplements: SelectedSupplement[],
  responses: UserResponses
): WeeklyActions {
  const { risk_flags, composites, bmi } = profile;
  const get = (n: CompositeName) => composites[n]?.normalized ?? 0;

  const NUT = get("NUT");
  const MET = get("MET");
  const MOB = get("MOB");
  const SLP = get("SLP");
  const TRV = get("TRV");

  const highProcessed = respStr(responses, "L1") === "Often" || respStr(responses, "L1") === "Almost always";
  const lowActivity = respStr(responses, "L2") === "Never" || respStr(responses, "L2") === "Rarely";
  const digestiveOften = oftenOrMore(responses, "G1");

  const nutrition: string[] = [];
  const supplementsActions: string[] = [];
  const movement_recovery: string[] = [];
  const screenings_checks: string[] = [];
  const environment: string[] = [];
  const red_flags: string[] = [];

  // Nutrition actions
  if (NUT >= 50 || highProcessed) {
    nutrition.push(
      "Shift at least one main meal per day toward whole foods (vegetables, whole grains, lean protein).",
      "On busy or travel days, swap sugary snacks or drinks for options like nuts, fruit or yoghurt where possible."
    );
  }
  if (risk_flags.metabolic_risk_flag || (bmi ?? 0) >= 27) {
    nutrition.push(
      "Aim for a regular meal pattern (avoid long gaps followed by very large late meals) to support blood sugar and energy stability."
    );
  }
  if (digestiveOften) {
    nutrition.push(
      "Introduce one gut-friendly food most days (such as cooked vegetables, oats or plain yoghurt) and monitor how your digestion responds."
    );
  }

  // Supplements actions
  if (supplements.length > 0) {
    supplementsActions.push(
      "Review your current supplements with your clinician before adding new products, especially if you take prescription medications.",
      "Prioritise only a small number of well-matched supplements so your routine stays realistic when travelling."
    );
  }

  // Movement & recovery actions
  if (MOB >= 50 || risk_flags.movement_limitations_flag) {
    movement_recovery.push(
      "On long travel or work days, build in 5–10 minutes of walking or gentle mobility for every 2 hours of sitting.",
      "Use simple mobility exercises (ankle circles, calf raises, hip stretches) during or after long travel to reduce stiffness."
    );
  }
  if (lowActivity) {
    movement_recovery.push(
      "On at least 3 days this week, aim for a 20-minute brisk walk or similar moderate movement."
    );
  }
  if (TRV >= 50) {
    movement_recovery.push(
      "Avoid sitting continuously for more than 2 hours on travel days; stand to stretch or walk the corridor when safe to do so."
    );
  }

  // Screenings & checks actions
  if (screenings.length > 0) {
    screenings_checks.push(
      "At your next routine visit, share this risk profile with your clinician and discuss which of the suggested blood tests or assessments are most appropriate for you."
    );
    const hasMetabolic = screenings.some(b => b.bundleId === "metabolic_panel");
    if (hasMetabolic) {
      screenings_checks.push(
        "If not done recently, ask whether checking blood pressure, fasting glucose or HbA1c, and a lipid profile is appropriate."
      );
    }
    const hasThyroid = screenings.some(b => b.bundleId === "thyroid_panel");
    if (hasThyroid) {
      screenings_checks.push(
        "If fatigue, low mood or temperature sensitivity persist, discuss whether thyroid testing is indicated."
      );
    }
    const hasGut = screenings.some(b => b.bundleId === "gut_health");
    if (hasGut) {
      screenings_checks.push(
        "For ongoing digestive symptoms, ask your clinician about appropriate gut evaluation rather than relying only on supplements."
      );
    }
  }

  // Environment & travel actions
  if (risk_flags.poor_sleep_flag) {
    environment.push(
      "Create a 30–60 minute wind-down window before bed with dimmer light and no work, email or news.",
      "If light or noise interferes with sleep when travelling, consider using an eye mask and earplugs or noise-reducing headphones."
    );
  }
  if (risk_flags.travel_strain_flag) {
    environment.push(
      "If crossing time zones, start shifting your bedtime and wake time by 30–60 minutes toward your destination for 2–3 days before departure."
    );
  }

  // Red flags actions
  if (profile.immediateConcerns.length > 0) {
    red_flags.push(
      "You reported possible warning symptoms. Do not rely on this screening alone—seek prompt medical advice."
    );
  } else if (risk_flags.red_flag_burden_flag) {
    red_flags.push(
      "If chest discomfort, breathlessness, sudden dizziness, or mood changes that affect daily function worsen or persist, book a timely medical review."
    );
  }

  return { nutrition, supplements: supplementsActions, movement_recovery, screenings_checks, environment, red_flags };
}

// --------------------------------------------------
// 10. Main orchestration function
// --------------------------------------------------

export function runTravellerEngine(
  questionnaireConfig: QuestionnaireConfig,
  responses: UserResponses,
  testProducts: TestProduct[],
  supplementProducts: SupplementProduct[]
): TravellerEngineOutput {
  // 1) Score questionnaire
  const scoring = computeComposites(questionnaireConfig, responses);

  // 2) Build profile (key metrics + flags)
  const profile = buildTravellerProfile(scoring, responses);

  // 3) Decide which biomarkers / tests to consider
  const biomarkerTargets = deriveBiomarkerTargets(profile, responses);
  const { tests: selectedTests, bundles: screenings } =
    selectTestsFromCatalog(testProducts, biomarkerTargets);

  // 4) Select supplements
  const selectedSupplements = selectSupplementsFromCatalog(
    profile,
    responses,
    supplementProducts
  );

  // 5) Build weekly actions for dashboard
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

