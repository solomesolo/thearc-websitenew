// Test score calculations to verify they match expected values
const testData = {
  "user": {
    "id": "uuid-123",
    "name": "Anna",
    "age": 35,
    "sex": "female",
    "email": "anna@example.com"
  },
  "family_history": {
    "cvd": {
      "present": true,
      "first_degree": true,
      "onset": "<60"
    },
    "diabetes": {
      "present": true,
      "first_degree": true,
      "onset": "40-60"
    },
    "cancer": [
      {
        "type": "colorectal",
        "relative": "mother",
        "onset": "50-60"
      }
    ]
  },
  "physiological_patterns": {
    "compass31_raw": 32,
    "compass31_max": 62
  },
  "lifestyle_load": {
    "pss10_raw": 26,
    "pss10_max": 40,
    "sleep_hours": 7,
    "sleep_quality": "good"
  },
  "biological_signals": {
    "waist_cm": 65,
    "height_cm": 176,
    "smoking": "never",
    "activity_min_week": 140,
    "labs_optional": {
      "crp_mg_L": null,
      "hba1c_percent": null,
      "vitamin_d_ng_ml": null,
      "lipids": {
        "ldl": null,
        "hdl": null,
        "tg": null
      }
    }
  },
  "cognitive_rhythm": {
    "cfq_raw": 20,
    "cfq_max": 100,
    "who5_raw": 14,
    "who5_max": 25
  },
  "symptoms": {
    "gut": true,
    "skin": true,
    "fatigue": true
  },
  "preferences": {
    "diet": "flexible",
    "equipment": "minimal",
    "budget": "low"
  }
};

// Score calculation functions (copied from the API)
function calculateFamilyRisk(familyHistory) {
  let score = 0;
  
  // CVD first-degree & onset <60 → +40
  if (familyHistory.cvd?.present && familyHistory.cvd?.first_degree && familyHistory.cvd?.onset === "<60") {
    score += 40;
  }
  
  // Diabetes first-degree → +25
  if (familyHistory.diabetes?.present && familyHistory.diabetes?.first_degree) {
    score += 25;
  }
  
  // Colorectal cancer first-degree → +20
  if (familyHistory.cancer) {
    for (const cancer of familyHistory.cancer) {
      if (cancer.type === "colorectal" && cancer.relative === "mother") {
        score += 20;
        break;
      }
    }
  }
  
  // Cap at 100
  return Math.min(score, 100);
}

function calculatePhysiological(physiologicalPatterns) {
  const { compass31_raw, compass31_max } = physiologicalPatterns;
  return (compass31_raw / compass31_max) * 100;
}

function calculateLifestyleLoad(lifestyleLoad) {
  const { pss10_raw } = lifestyleLoad;
  return (pss10_raw / 40) * 100;
}

function calculateBiological(biologicalSignals) {
  let score = 0;
  
  // Waist/height ratio
  const waistHeightRatio = biologicalSignals.waist_cm / biologicalSignals.height_cm;
  if (waistHeightRatio < 0.4) {
    score += 0; // Good ratio
  } else if (waistHeightRatio < 0.5) {
    score += 10; // Moderate risk
  } else {
    score += 20; // High risk
  }
  
  // Smoking
  if (biologicalSignals.smoking === "never") {
    score += 0; // No penalty
  } else if (biologicalSignals.smoking === "former") {
    score += 5; // Slight penalty
  } else {
    score += 15; // High penalty
  }
  
  // Activity level
  if (biologicalSignals.activity_min_week >= 150) {
    score += 0; // Good activity
  } else if (biologicalSignals.activity_min_week >= 75) {
    score += 10; // Moderate activity
  } else {
    score += 20; // Low activity
  }
  
  return Math.min(score, 100);
}

function calculateCognitive(cognitiveRhythm) {
  const { cfq_raw, cfq_max, who5_raw, who5_max } = cognitiveRhythm;
  
  // CFQ score (higher is worse, so we invert it)
  const cfqScore = (cfq_raw / cfq_max) * 100;
  
  // WHO-5 score (higher is better, so we keep it as is)
  const who5Score = (who5_raw / who5_max) * 100;
  
  // Combined score: 60% CFQ (inverted) + 40% WHO-5
  return 0.6 * (100 - cfqScore) + 0.4 * who5Score;
}

// Calculate scores
const scores = {
  family_risk: calculateFamilyRisk(testData.family_history),
  physiological: calculatePhysiological(testData.physiological_patterns),
  lifestyle_load: calculateLifestyleLoad(testData.lifestyle_load),
  biological: calculateBiological(testData.biological_signals),
  cognitive: calculateCognitive(testData.cognitive_rhythm)
};

console.log("Score Calculations:");
console.log("==================");
console.log(`Family Risk: ${scores.family_risk} (Expected: 85)`);
console.log(`Physiological: ${scores.physiological.toFixed(2)} (Expected: 51.61)`);
console.log(`Lifestyle Load: ${scores.lifestyle_load} (Expected: 65)`);
console.log(`Biological: ${scores.biological} (Expected: 10)`);
console.log(`Cognitive: ${scores.cognitive.toFixed(1)} (Expected: 70.4)`);

console.log("\nDetailed Calculations:");
console.log("=====================");

// Family Risk breakdown
console.log("\nFamily Risk Breakdown:");
console.log(`- CVD first-degree <60: ${testData.family_history.cvd?.present && testData.family_history.cvd?.first_degree && testData.family_history.cvd?.onset === "<60" ? "+40" : "+0"}`);
console.log(`- Diabetes first-degree: ${testData.family_history.diabetes?.present && testData.family_history.diabetes?.first_degree ? "+25" : "+0"}`);
console.log(`- Colorectal cancer first-degree: ${testData.family_history.cancer?.some(c => c.type === "colorectal" && c.relative === "mother") ? "+20" : "+0"}`);
console.log(`- Total: 40 + 25 + 20 = 85 (capped at 100)`);

// Physiological breakdown
console.log("\nPhysiological Breakdown:");
console.log(`- COMPASS-31: ${testData.physiological_patterns.compass31_raw}/${testData.physiological_patterns.compass31_max} = ${(testData.physiological_patterns.compass31_raw / testData.physiological_patterns.compass31_max * 100).toFixed(2)}%`);

// Lifestyle Load breakdown
console.log("\nLifestyle Load Breakdown:");
console.log(`- PSS-10: ${testData.lifestyle_load.pss10_raw}/40 = ${(testData.lifestyle_load.pss10_raw / 40 * 100)}%`);

// Biological breakdown
const waistHeightRatio = testData.biological_signals.waist_cm / testData.biological_signals.height_cm;
console.log("\nBiological Breakdown:");
console.log(`- Waist/Height ratio: ${testData.biological_signals.waist_cm}/${testData.biological_signals.height_cm} = ${waistHeightRatio.toFixed(3)} (${waistHeightRatio < 0.4 ? "Good (+0)" : waistHeightRatio < 0.5 ? "Moderate (+10)" : "High risk (+20)"})`);
console.log(`- Smoking: ${testData.biological_signals.smoking} (+0)`);
console.log(`- Activity: ${testData.biological_signals.activity_min_week} min/week (${testData.biological_signals.activity_min_week >= 150 ? "Good (+0)" : testData.biological_signals.activity_min_week >= 75 ? "Moderate (+10)" : "Low (+20)"})`);
console.log(`- Labs: All null (+0)`);
console.log(`- Total: 0 + 0 + 10 + 0 = 10`);

// Cognitive breakdown
const cfqScore = (testData.cognitive_rhythm.cfq_raw / testData.cognitive_rhythm.cfq_max) * 100;
const who5Score = (testData.cognitive_rhythm.who5_raw / testData.cognitive_rhythm.who5_max) * 100;
console.log("\nCognitive Breakdown:");
console.log(`- CFQ: ${testData.cognitive_rhythm.cfq_raw}/${testData.cognitive_rhythm.cfq_max} = ${cfqScore}% (inverted: ${100 - cfqScore}%)`);
console.log(`- WHO-5: ${testData.cognitive_rhythm.who5_raw}/${testData.cognitive_rhythm.who5_max} = ${who5Score}%`);
console.log(`- Combined: 0.6 × ${(100 - cfqScore).toFixed(1)} + 0.4 × ${who5Score} = ${(0.6 * (100 - cfqScore) + 0.4 * who5Score).toFixed(1)}`);
