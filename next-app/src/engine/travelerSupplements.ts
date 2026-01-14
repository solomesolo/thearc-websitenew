import { TravelerSurveyAnswers, TravelerKeyMetricResult } from './types';
import { toSeverityTraveler } from './travelerMappings';
import { deriveTravelerRiskFlags } from './travelerScreening';

/**
 * Supplement definition
 */
export type Supplement = {
  supplement_name: string;
  priority: "Core" | "Optional" | "Discuss_with_clinician";
  why: string;
  safety_note?: string;
};

/**
 * Generate supplement recommendations based on risk flags and metrics
 */
export function generateTravelerSupplements(
  answers: TravelerSurveyAnswers,
  keyMetrics: TravelerKeyMetricResult[],
  riskFlags: ReturnType<typeof deriveTravelerRiskFlags>
): Supplement[] {
  const supplements: Supplement[] = [];
  const supplementMap = new Map<string, Supplement>();
  
  const stressMetric = keyMetrics.find(m => m.id === "stress_load");
  const sleepMetric = keyMetrics.find(m => m.id === "sleep_circadian");
  const energyMetric = keyMetrics.find(m => m.id === "energy_recovery");
  const mobilityMetric = keyMetrics.find(m => m.id === "mobility_physical");
  
  const sF1 = toSeverityTraveler("F1_wornOutAfternoon", answers.F1_wornOutAfternoon);
  const sF2 = toSeverityTraveler("F2_lowEnergyLimits", answers.F2_lowEnergyLimits);
  const sL2 = toSeverityTraveler("L2_20minMovement", answers.L2_20minMovement);
  
  // Metabolic / Cardiometabolic
  if (riskFlags.cardiometabolic_risk_flag) {
    addSupplement(supplementMap, {
      supplement_name: "Fish Oil / Omega-3",
      priority: "Core",
      why: "Supports cardiovascular health and reduces inflammation, especially important for travelers with cardiometabolic risk factors.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Fiber Supplements",
      priority: "Core",
      why: "Helps maintain digestive regularity and supports metabolic health during travel when diet may be inconsistent.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "CoQ10",
      priority: "Optional",
      why: "Supports cellular energy production and cardiovascular function, particularly relevant during travel stress.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Green Tea Extract",
      priority: "Discuss_with_clinician",
      why: "May support metabolic health, but discuss with clinician if taking medications or have caffeine sensitivity.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Garlic",
      priority: "Discuss_with_clinician",
      why: "May support cardiovascular health, but discuss with clinician regarding medication interactions.",
    });
  }
  
  // Nutrient Deficit / Travel Diet
  if (stressMetric && stressMetric.score >= 60 || riskFlags.immune_vulnerability_flag) {
    addSupplement(supplementMap, {
      supplement_name: "Multivitamin",
      priority: "Core",
      why: "Provides baseline micronutrient support when travel diet may be inconsistent or limited.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Vitamin D",
      priority: "Core",
      why: "Critical for immune function and energy, especially important for frequent travelers with limited sun exposure.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "B-Complex",
      priority: "Core",
      why: "Supports energy metabolism and stress resilience, often depleted during travel and high-stress periods.",
    });
  }
  
  // Fatigue / Sleep / Stress
  if (sF1 >= 3 || sF2 >= 3 || riskFlags.poor_sleep_flag || riskFlags.high_stress_flag) {
    addSupplement(supplementMap, {
      supplement_name: "Magnesium",
      priority: "Core",
      why: "Supports sleep quality, stress resilience, and muscle recovery, especially important for travelers with disrupted sleep.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "L-Theanine",
      priority: "Core",
      why: "Promotes calm focus and stress resilience without sedation, helpful for managing travel-related stress and sleep disruption.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Melatonin",
      priority: "Optional",
      why: "Short-term support for jet lag and sleep schedule adjustment. Use for 3-5 days during time zone transitions.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Ashwagandha",
      priority: "Discuss_with_clinician",
      why: "Adaptogen that may support stress resilience and sleep. Discuss with clinician, especially if taking thyroid medications.",
    });
  }
  
  // Gut / Immune
  if (riskFlags.gut_workup_indicated_flag) {
    addSupplement(supplementMap, {
      supplement_name: "Probiotics / Prebiotics",
      priority: "Core",
      why: "Supports gut microbiome resilience during travel, especially important if experiencing digestive discomfort or immune vulnerability.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Fiber Supplements",
      priority: "Core",
      why: "Supports digestive regularity and gut health, particularly important when travel diet is inconsistent.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Vitamin C",
      priority: "Optional",
      why: "Supports immune function and may help reduce travel-related illness risk.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Elderberry",
      priority: "Optional",
      why: "May support immune resilience during travel, especially during high-exposure periods.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Functional Mushrooms",
      priority: "Optional",
      why: "May support immune function and stress resilience. Choose reputable brands and discuss with clinician if on medications.",
    });
  }
  
  // Cognition / Brain Fog
  if (energyMetric && energyMetric.score >= 60) {
    addSupplement(supplementMap, {
      supplement_name: "Omega-3 / Fish Oil",
      priority: "Core",
      why: "Supports cognitive function and brain health, particularly important for maintaining mental clarity during travel.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Ginkgo",
      priority: "Discuss_with_clinician",
      why: "May support cognitive function and circulation. Discuss with clinician, especially if taking blood thinners.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Creatine",
      priority: "Discuss_with_clinician",
      why: "May support cognitive function and energy. Ensure adequate hydration and discuss with clinician if kidney concerns.",
    });
  }
  
  // Movement / Joints
  if (mobilityMetric && mobilityMetric.score >= 50) {
    addSupplement(supplementMap, {
      supplement_name: "Glucosamine & Chondroitin",
      priority: "Optional",
      why: "May support joint health and mobility, particularly relevant for travelers experiencing stiffness from long sitting.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Collagen",
      priority: "Optional",
      why: "May support joint and connective tissue health, helpful for maintaining mobility during travel.",
    });
    
    addSupplement(supplementMap, {
      supplement_name: "Turmeric / Curcumin",
      priority: "Discuss_with_clinician",
      why: "Anti-inflammatory support for joints and mobility. Discuss with clinician, especially if taking blood thinners or have gallbladder issues.",
    });
  }
  
  // Performance / Protein
  if (sL2 <= 2 && (mobilityMetric && mobilityMetric.score < 60)) {
    addSupplement(supplementMap, {
      supplement_name: "Protein Powders",
      priority: "Optional",
      why: "Convenient protein source during travel to support muscle maintenance and recovery when whole food options are limited.",
    });
  }
  
  // Safety downgrades
  const finalSupplements = Array.from(supplementMap.values());
  
  // Iron always Discuss_with_clinician unless ferritin known
  finalSupplements.forEach(s => {
    if (s.supplement_name.includes("Iron") && s.priority !== "Discuss_with_clinician") {
      s.priority = "Discuss_with_clinician";
      s.safety_note = "Iron supplementation should only be used if ferritin levels are known to be low. High iron can be harmful.";
    }
  });
  
  // Turmeric + Fish Oil bleeding risk note
  const hasTurmeric = finalSupplements.some(s => s.supplement_name.includes("Turmeric"));
  const hasFishOil = finalSupplements.some(s => s.supplement_name.includes("Fish Oil") || s.supplement_name.includes("Omega-3"));
  if (hasTurmeric && hasFishOil) {
    finalSupplements.forEach(s => {
      if (s.supplement_name.includes("Turmeric") || s.supplement_name.includes("Fish Oil") || s.supplement_name.includes("Omega-3")) {
        s.safety_note = (s.safety_note || "") + " Note: Combining with blood-thinning supplements may increase bleeding risk. Discuss with clinician.";
      }
    });
  }
  
  // Creatine hydration note
  finalSupplements.forEach(s => {
    if (s.supplement_name.includes("Creatine")) {
      s.safety_note = (s.safety_note || "") + " Ensure adequate hydration and discuss with clinician if kidney concerns.";
    }
  });
  
  // Limit to 7 supplements, prioritize Core > Optional > Discuss_with_clinician
  const priorityOrder = { Core: 3, Optional: 2, Discuss_with_clinician: 1 };
  finalSupplements.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  
  // If more than 7, deprioritize Optional items
  if (finalSupplements.length > 7) {
    const core = finalSupplements.filter(s => s.priority === "Core");
    const discuss = finalSupplements.filter(s => s.priority === "Discuss_with_clinician");
    const optional = finalSupplements.filter(s => s.priority === "Optional");
    
    const remaining = 7 - core.length - discuss.length;
    return [...core, ...optional.slice(0, Math.max(0, remaining)), ...discuss].slice(0, 7);
  }
  
  return finalSupplements;
}

/**
 * Helper to add supplement, handling conflicts (higher priority wins)
 */
function addSupplement(map: Map<string, Supplement>, supplement: Supplement): void {
  const existing = map.get(supplement.supplement_name);
  if (!existing) {
    map.set(supplement.supplement_name, supplement);
  } else {
    // Higher priority wins
    const priorityOrder = { Core: 3, Optional: 2, Discuss_with_clinician: 1 };
    if (priorityOrder[supplement.priority] > priorityOrder[existing.priority]) {
      map.set(supplement.supplement_name, supplement);
    }
  }
}






