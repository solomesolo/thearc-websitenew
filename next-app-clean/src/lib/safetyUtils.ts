/**
 * Safety/Contraindications Pass
 * Checks for potential interactions and contraindications based on user responses
 * and modifies supplement safety information accordingly.
 */

export interface UserResponses {
  pregnancy_status?: 'pregnant' | 'trying_to_conceive' | 'not_applicable';
  medications?: string[];
  medical_conditions?: string[];
  gerd?: boolean;
  kidney_disease?: boolean;
  thyroid_disease?: boolean;
  anticoagulants?: boolean;
}

export interface Supplement {
  name: string;
  dose: string;
  timing: string;
  why: string;
  safety: string;
}

export interface SafetyResult {
  supplements: Supplement[];
  banner?: string;
  warnings: string[];
}

/**
 * Check contraindications and modify supplement safety information
 */
export function checkContraindications(
  responses: UserResponses,
  supplements: Supplement[]
): SafetyResult {
  const warnings: string[] = [];
  const modifiedSupplements: Supplement[] = [];
  let banner: string | undefined;

  // Check for pregnancy/trying to conceive
  if (responses.pregnancy_status === 'pregnant' || responses.pregnancy_status === 'trying_to_conceive') {
    banner = "If you are pregnant or taking prescription medication, consult a clinician before starting any supplements.";
    
    // Suppress adaptogens for pregnant/trying to conceive
    const adaptogens = ['Ashwagandha', 'Rhodiola', 'Ginseng', 'Maca', 'Holy Basil'];
    supplements.forEach(supplement => {
      if (!adaptogens.some(adaptogen => supplement.name.toLowerCase().includes(adaptogen.toLowerCase()))) {
        modifiedSupplements.push(supplement);
      }
    });
    
    warnings.push("Adaptogens suppressed due to pregnancy status");
  } else {
    modifiedSupplements.push(...supplements);
  }

  // Check for anticoagulants
  if (responses.anticoagulants || 
      responses.medications?.some(med => 
        med.toLowerCase().includes('warfarin') || 
        med.toLowerCase().includes('heparin') || 
        med.toLowerCase().includes('aspirin') ||
        med.toLowerCase().includes('clopidogrel')
      )) {
    
    modifiedSupplements.forEach(supplement => {
      if (supplement.name.toLowerCase().includes('omega-3') || 
          supplement.name.toLowerCase().includes('fish oil') ||
          supplement.name.toLowerCase().includes('epa') ||
          supplement.name.toLowerCase().includes('dha')) {
        supplement.safety = "May interact with anticoagulants. Consult your healthcare provider before use.";
        warnings.push("Omega-3 safety warning added due to anticoagulant use");
      }
    });
  }

  // Check for kidney disease
  if (responses.kidney_disease || 
      responses.medical_conditions?.some(condition => 
        condition.toLowerCase().includes('kidney') || 
        condition.toLowerCase().includes('renal')
      )) {
    
    modifiedSupplements.forEach(supplement => {
      if (supplement.name.toLowerCase().includes('magnesium')) {
        supplement.safety = "Use with caution in kidney disease. Consult your healthcare provider for appropriate dosing.";
        warnings.push("Magnesium safety warning added due to kidney disease");
      }
    });
  }

  // Check for thyroid disease
  if (responses.thyroid_disease || 
      responses.medical_conditions?.some(condition => 
        condition.toLowerCase().includes('thyroid') || 
        condition.toLowerCase().includes('hypothyroid') ||
        condition.toLowerCase().includes('hyperthyroid')
      )) {
    
    modifiedSupplements.forEach(supplement => {
      if (supplement.name.toLowerCase().includes('ashwagandha')) {
        supplement.safety = "May affect thyroid function. Consult your healthcare provider before use.";
        warnings.push("Ashwagandha safety warning added due to thyroid disease");
      }
    });
  }

  // Check for GERD
  if (responses.gerd || 
      responses.medical_conditions?.some(condition => 
        condition.toLowerCase().includes('gerd') || 
        condition.toLowerCase().includes('acid reflux') ||
        condition.toLowerCase().includes('heartburn')
      )) {
    
    modifiedSupplements.forEach(supplement => {
      if (supplement.name.toLowerCase().includes('vitamin c') || 
          supplement.name.toLowerCase().includes('ascorbic acid')) {
        supplement.safety = "May cause stomach irritation. Take with food to reduce discomfort.";
        warnings.push("Vitamin C safety warning added due to GERD");
      }
    });
  }

  // Add general medication warning if taking prescription medications
  if (responses.medications && responses.medications.length > 0) {
    if (!banner) {
      banner = "If you are taking prescription medications, consult your healthcare provider before starting any supplements to avoid potential interactions.";
    }
    warnings.push("General medication interaction warning added");
  }

  return {
    supplements: modifiedSupplements,
    banner,
    warnings
  };
}

/**
 * Unit test function to verify contraindication logic
 */
export function runSafetyTests(): void {
  console.log("🧪 Running Safety/Contraindications Tests");
  console.log("=========================================");

  const baseSupplements: Supplement[] = [
    {
      name: "Omega-3 EPA/DHA",
      dose: "1-2 g/day",
      timing: "with meals",
      why: "Reduces inflammation and supports cardiovascular health",
      safety: "Safe for most people, may interact with blood thinners"
    },
    {
      name: "Magnesium glycinate",
      dose: "200-400 mg",
      timing: "evening",
      why: "Supports muscle relaxation and sleep quality",
      safety: "Generally well-tolerated, may cause loose stools at high doses"
    },
    {
      name: "Ashwagandha",
      dose: "300-600 mg",
      timing: "morning or evening",
      why: "Adaptogen that helps with stress and energy",
      safety: "Generally safe, may cause drowsiness"
    },
    {
      name: "Vitamin C",
      dose: "1000 mg",
      timing: "with breakfast",
      why: "Supports immune function and collagen synthesis",
      safety: "Water-soluble vitamin, excess is excreted"
    }
  ];

  // Test 1: Pregnancy scenario
  console.log("\n📋 Test 1: Pregnancy Scenario");
  const pregnancyResponses: UserResponses = {
    pregnancy_status: 'pregnant',
    medications: ['Prenatal vitamins']
  };
  
  const pregnancyResult = checkContraindications(pregnancyResponses, baseSupplements);
  console.log("✅ Adaptogens suppressed:", pregnancyResult.supplements.length < baseSupplements.length);
  console.log("✅ Banner added:", !!pregnancyResult.banner);
  console.log("✅ Warnings:", pregnancyResult.warnings);

  // Test 2: Anticoagulants scenario
  console.log("\n📋 Test 2: Anticoagulants Scenario");
  const anticoagulantResponses: UserResponses = {
    medications: ['Warfarin', 'Aspirin'],
    anticoagulants: true
  };
  
  const anticoagulantResult = checkContraindications(anticoagulantResponses, baseSupplements);
  const omega3Modified = anticoagulantResult.supplements.find(s => s.name.includes('Omega-3'));
  console.log("✅ Omega-3 safety modified:", omega3Modified?.safety.includes('anticoagulants'));
  console.log("✅ Warnings:", anticoagulantResult.warnings);

  // Test 3: Kidney disease scenario
  console.log("\n📋 Test 3: Kidney Disease Scenario");
  const kidneyResponses: UserResponses = {
    kidney_disease: true,
    medical_conditions: ['Chronic kidney disease']
  };
  
  const kidneyResult = checkContraindications(kidneyResponses, baseSupplements);
  const magnesiumModified = kidneyResult.supplements.find(s => s.name.includes('Magnesium'));
  console.log("✅ Magnesium safety modified:", magnesiumModified?.safety.includes('kidney'));
  console.log("✅ Warnings:", kidneyResult.warnings);

  // Test 4: Thyroid disease scenario
  console.log("\n📋 Test 4: Thyroid Disease Scenario");
  const thyroidResponses: UserResponses = {
    thyroid_disease: true,
    medical_conditions: ['Hypothyroidism']
  };
  
  const thyroidResult = checkContraindications(thyroidResponses, baseSupplements);
  const ashwagandhaModified = thyroidResult.supplements.find(s => s.name.includes('Ashwagandha'));
  console.log("✅ Ashwagandha safety modified:", ashwagandhaModified?.safety.includes('thyroid'));
  console.log("✅ Warnings:", thyroidResult.warnings);

  // Test 5: GERD scenario
  console.log("\n📋 Test 5: GERD Scenario");
  const gerdResponses: UserResponses = {
    gerd: true,
    medical_conditions: ['Gastroesophageal reflux disease']
  };
  
  const gerdResult = checkContraindications(gerdResponses, baseSupplements);
  const vitaminCModified = gerdResult.supplements.find(s => s.name.includes('Vitamin C'));
  console.log("✅ Vitamin C safety modified:", vitaminCModified?.safety.includes('stomach irritation'));
  console.log("✅ Warnings:", gerdResult.warnings);

  // Test 6: Multiple conditions scenario
  console.log("\n📋 Test 6: Multiple Conditions Scenario");
  const multipleResponses: UserResponses = {
    pregnancy_status: 'trying_to_conceive',
    medications: ['Warfarin'],
    anticoagulants: true,
    kidney_disease: true,
    thyroid_disease: true,
    gerd: true
  };
  
  const multipleResult = checkContraindications(multipleResponses, baseSupplements);
  console.log("✅ Adaptogens suppressed:", multipleResult.supplements.length < baseSupplements.length);
  console.log("✅ Banner added:", !!multipleResult.banner);
  console.log("✅ Multiple warnings:", multipleResult.warnings.length > 1);
  console.log("✅ Warnings:", multipleResult.warnings);

  console.log("\n✅ All Safety Tests Completed!");
}

/**
 * Sample responses for testing different scenarios
 */
export const sampleResponses = {
  pregnancy: {
    pregnancy_status: 'pregnant' as const,
    medications: ['Prenatal vitamins', 'Folic acid']
  },
  
  anticoagulants: {
    medications: ['Warfarin', 'Aspirin'],
    anticoagulants: true
  },
  
  kidneyDisease: {
    kidney_disease: true,
    medical_conditions: ['Chronic kidney disease', 'Stage 3 CKD']
  },
  
  thyroidDisease: {
    thyroid_disease: true,
    medical_conditions: ['Hypothyroidism', 'Hashimoto\'s thyroiditis']
  },
  
  gerd: {
    gerd: true,
    medical_conditions: ['GERD', 'Acid reflux']
  },
  
  multipleConditions: {
    pregnancy_status: 'trying_to_conceive' as const,
    medications: ['Warfarin', 'Levothyroxine'],
    anticoagulants: true,
    kidney_disease: true,
    thyroid_disease: true,
    gerd: true
  }
};

/**
 * Expected output examples for each scenario
 */
export const expectedOutputs = {
  pregnancy: {
    supplements: [], // Adaptogens suppressed
    banner: "If you are pregnant or taking prescription medication, consult a clinician before starting any supplements.",
    warnings: ["Adaptogens suppressed due to pregnancy status"]
  },
  
  anticoagulants: {
    supplements: [
      {
        name: "Omega-3 EPA/DHA",
        safety: "May interact with anticoagulants. Consult your healthcare provider before use."
      }
    ],
    banner: "If you are taking prescription medications, consult your healthcare provider before starting any supplements to avoid potential interactions.",
    warnings: ["Omega-3 safety warning added due to anticoagulant use", "General medication interaction warning added"]
  }
};
