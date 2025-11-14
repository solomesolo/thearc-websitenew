// Test personalization logic to verify all rules work correctly

// Test cases with different score combinations
const testCases = [
  {
    name: "High lifestyle stress + High family risk",
    input: {
      scores: { family_risk: 85, physiological: 75, lifestyle_load: 80, biological: 10, cognitive: 56 },
      symptoms: { gut: true, skin: true, fatigue: true },
      family_history: { cvd: { present: true, first_degree: true, onset: "<60" } },
      preferences: { diet: "flexible", equipment: "minimal", budget: "low" }
    },
    expected: {
      phase_order: ["Rebalance", "Decode", "Nourish", "Strengthen", "Refine", "Sustain"],
      nutrition_archetype: "Anti-inflammatory Mediterranean",
      should_include: ["AM Cortisol", "Ferritin", "Probiotic", "Creatine", "CoQ10", "Box breathing"]
    }
  },
  {
    name: "High cognitive score",
    input: {
      scores: { family_risk: 30, physiological: 40, lifestyle_load: 50, biological: 20, cognitive: 75 },
      symptoms: { gut: false, skin: false, fatigue: false },
      family_history: {},
      preferences: { diet: "flexible", equipment: "minimal", budget: "low" }
    },
    expected: {
      phase_order: ["Decode", "Rebalance", "Strengthen", "Refine", "Nourish", "Sustain"],
      nutrition_archetype: "Balanced Mediterranean",
      should_include: ["L-Theanine", "Alternate nostril breathing"]
    }
  },
  {
    name: "Metabolic focus",
    input: {
      scores: { family_risk: 20, physiological: 30, lifestyle_load: 40, biological: 75, cognitive: 25 },
      symptoms: { gut: false, skin: false, fatigue: false },
      family_history: {},
      preferences: { diet: "flexible", equipment: "minimal", budget: "low" }
    },
    expected: {
      phase_order: ["Decode", "Rebalance", "Nourish", "Strengthen", "Refine", "Sustain"],
      nutrition_archetype: "Metabolic-steady",
      should_include: ["B-Complex"]
    }
  }
];

// Import the logic functions (simplified versions for testing)
function calculatePhaseOrder(scores, symptoms) {
  const defaultPhases = ["Decode", "Rebalance", "Strengthen", "Nourish", "Refine", "Sustain"];
  let phases = [...defaultPhases];
  
  if (Math.max(scores.lifestyle_load, scores.physiological) >= 70) {
    phases = ["Rebalance", "Decode", "Strengthen", "Nourish", "Refine", "Sustain"];
  }
  
  if (Math.max(scores.family_risk, scores.biological) >= 70) {
    const nourishIndex = phases.indexOf("Nourish");
    const strengthenIndex = phases.indexOf("Strengthen");
    
    if (nourishIndex > strengthenIndex) {
      phases.splice(nourishIndex, 1);
      phases.splice(strengthenIndex, 0, "Nourish");
    }
  }
  
  if (scores.cognitive >= 70) {
    const refineIndex = phases.indexOf("Refine");
    if (refineIndex !== -1) {
      phases.splice(refineIndex, 1);
      phases.splice(3, 0, "Refine");
    }
  }
  
  return phases;
}

function selectNutritionArchetype(scores, symptoms, familyHistory) {
  if (scores.family_risk >= 70 || (symptoms?.gut || symptoms?.skin)) {
    return "Anti-inflammatory Mediterranean";
  }
  
  if (scores.biological >= 70) {
    return "Metabolic-steady";
  }
  
  if (symptoms?.gut || symptoms?.skin) {
    return "Gut-calming";
  }
  
  return "Balanced Mediterranean";
}

function selectSupplements(scores, symptoms, preferences) {
  const supplements = ["Omega-3", "Magnesium glycinate", "Vitamin D3 + K2"];
  
  if (symptoms?.gut) supplements.push("Probiotic");
  if (symptoms?.fatigue) supplements.push("Creatine");
  if (scores.family_risk >= 70) supplements.push("CoQ10");
  if (scores.physiological >= 70) supplements.push("B-Complex");
  if (scores.cognitive >= 70) supplements.push("L-Theanine");
  
  return supplements;
}

function selectScreenings(scores, symptoms, familyHistory) {
  const screenings = ["CRP", "Lipid panel", "HbA1c", "Vitamin D"];
  
  if (scores.lifestyle_load >= 60 || scores.physiological >= 60) {
    screenings.push("AM Cortisol");
  }
  
  if (symptoms?.fatigue) {
    screenings.push("Ferritin", "TSH");
  }
  
  return screenings.slice(0, 6);
}

function selectBreathwork(scores, symptoms) {
  const breathwork = ["Cardiac coherence", "Physiological sighs"];
  
  if (scores.lifestyle_load >= 60 || scores.physiological >= 60) {
    breathwork.push("Box breathing");
  }
  
  if (symptoms?.fatigue) {
    breathwork.push("4-7-8 breathing");
  }
  
  if (scores.cognitive >= 70) {
    breathwork.push("Alternate nostril breathing");
  }
  
  return breathwork;
}

// Run tests
console.log("Personalization Logic Tests");
console.log("==========================");

testCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}: ${testCase.name}`);
  console.log("Input scores:", testCase.input.scores);
  
  const phase_order = calculatePhaseOrder(testCase.input.scores, testCase.input.symptoms);
  const nutrition_archetype = selectNutritionArchetype(testCase.input.scores, testCase.input.symptoms, testCase.input.family_history);
  const supplements = selectSupplements(testCase.input.scores, testCase.input.symptoms, testCase.input.preferences);
  const screenings = selectScreenings(testCase.input.scores, testCase.input.symptoms, testCase.input.family_history);
  const breathwork = selectBreathwork(testCase.input.scores, testCase.input.symptoms);
  
  console.log("Results:");
  console.log(`- Phase Order: [${phase_order.join(", ")}]`);
  console.log(`- Nutrition: ${nutrition_archetype}`);
  console.log(`- Supplements: [${supplements.join(", ")}]`);
  console.log(`- Screenings: [${screenings.join(", ")}]`);
  console.log(`- Breathwork: [${breathwork.join(", ")}]`);
  
  // Verify expected results
  const phaseMatch = JSON.stringify(phase_order) === JSON.stringify(testCase.expected.phase_order);
  const nutritionMatch = nutrition_archetype === testCase.expected.nutrition_archetype;
  
  console.log(`\nVerification:`);
  console.log(`- Phase Order Match: ${phaseMatch ? "✅" : "❌"}`);
  console.log(`- Nutrition Match: ${nutritionMatch ? "✅" : "❌"}`);
  
  // Check if expected items are included
  testCase.expected.should_include?.forEach(item => {
    const included = supplements.includes(item) || screenings.includes(item) || breathwork.includes(item);
    console.log(`- Includes "${item}": ${included ? "✅" : "❌"}`);
  });
});

console.log("\n" + "=".repeat(50));
console.log("All tests completed!");
