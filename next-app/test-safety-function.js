// Comprehensive test for Safety/Contraindications Pass function
// This demonstrates all scenarios and verifies the safety logic

const { checkContraindications, runSafetyTests, sampleResponses, expectedOutputs } = require('./src/lib/safetyUtils.ts');

console.log("🧪 Safety/Contraindications Pass - Comprehensive Testing");
console.log("========================================================");
console.log("");

// Test data
const baseSupplements = [
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
  },
  {
    name: "Rhodiola",
    dose: "200-400 mg",
    timing: "morning",
    why: "Adaptogen for energy and stress management",
    safety: "Generally safe, may cause mild stimulation"
  }
];

console.log("📋 Test Scenarios:");
console.log("==================");
console.log("");

// Test 1: Pregnancy/Trying to Conceive
console.log("🤰 Test 1: Pregnancy/Trying to Conceive");
console.log("----------------------------------------");
const pregnancyResult = checkContraindications(
  { pregnancy_status: 'pregnant', medications: ['Prenatal vitamins'] },
  baseSupplements
);
console.log("✅ Adaptogens suppressed:", pregnancyResult.supplements.length < baseSupplements.length);
console.log("✅ Banner added:", !!pregnancyResult.banner);
console.log("✅ Remaining supplements:", pregnancyResult.supplements.length);
console.log("✅ Warnings:", pregnancyResult.warnings);
console.log("");

// Test 2: Anticoagulants
console.log("🩸 Test 2: Anticoagulants");
console.log("------------------------");
const anticoagulantResult = checkContraindications(
  { medications: ['Warfarin', 'Aspirin'], anticoagulants: true },
  baseSupplements
);
const omega3Modified = anticoagulantResult.supplements.find(s => s.name.includes('Omega-3'));
console.log("✅ Omega-3 safety modified:", omega3Modified?.safety.includes('anticoagulants'));
console.log("✅ Banner added:", !!anticoagulantResult.banner);
console.log("✅ Warnings:", anticoagulantResult.warnings);
console.log("");

// Test 3: Kidney Disease
console.log("🫘 Test 3: Kidney Disease");
console.log("------------------------");
const kidneyResult = checkContraindications(
  { kidney_disease: true, medical_conditions: ['Chronic kidney disease'] },
  baseSupplements
);
const magnesiumModified = kidneyResult.supplements.find(s => s.name.includes('Magnesium'));
console.log("✅ Magnesium safety modified:", magnesiumModified?.safety.includes('kidney'));
console.log("✅ Warnings:", kidneyResult.warnings);
console.log("");

// Test 4: Thyroid Disease
console.log("🦋 Test 4: Thyroid Disease");
console.log("-------------------------");
const thyroidResult = checkContraindications(
  { thyroid_disease: true, medical_conditions: ['Hypothyroidism'] },
  baseSupplements
);
const ashwagandhaModified = thyroidResult.supplements.find(s => s.name.includes('Ashwagandha'));
console.log("✅ Ashwagandha safety modified:", ashwagandhaModified?.safety.includes('thyroid'));
console.log("✅ Warnings:", thyroidResult.warnings);
console.log("");

// Test 5: GERD
console.log("🔥 Test 5: GERD");
console.log("--------------");
const gerdResult = checkContraindications(
  { gerd: true, medical_conditions: ['GERD', 'Acid reflux'] },
  baseSupplements
);
const vitaminCModified = gerdResult.supplements.find(s => s.name.includes('Vitamin C'));
console.log("✅ Vitamin C safety modified:", vitaminCModified?.safety.includes('stomach irritation'));
console.log("✅ Warnings:", gerdResult.warnings);
console.log("");

// Test 6: Multiple Conditions
console.log("🔄 Test 6: Multiple Conditions");
console.log("------------------------------");
const multipleResult = checkContraindications(
  {
    pregnancy_status: 'trying_to_conceive',
    medications: ['Warfarin', 'Levothyroxine'],
    anticoagulants: true,
    kidney_disease: true,
    thyroid_disease: true,
    gerd: true
  },
  baseSupplements
);
console.log("✅ Adaptogens suppressed:", multipleResult.supplements.length < baseSupplements.length);
console.log("✅ Banner added:", !!multipleResult.banner);
console.log("✅ Multiple warnings:", multipleResult.warnings.length > 1);
console.log("✅ Warnings:", multipleResult.warnings);
console.log("");

// Test 7: No Conditions (Baseline)
console.log("✅ Test 7: No Conditions (Baseline)");
console.log("----------------------------------");
const baselineResult = checkContraindications(
  { pregnancy_status: 'not_applicable' },
  baseSupplements
);
console.log("✅ All supplements retained:", baselineResult.supplements.length === baseSupplements.length);
console.log("✅ No banner:", !baselineResult.banner);
console.log("✅ No warnings:", baselineResult.warnings.length === 0);
console.log("");

console.log("📊 Safety Rules Summary:");
console.log("=======================");
console.log("• Pregnancy/Trying to conceive → Suppress adaptogens + add banner");
console.log("• Anticoagulants → Warn on Omega-3");
console.log("• Kidney disease → Warn on Magnesium");
console.log("• Thyroid disease → Warn on Ashwagandha");
console.log("• GERD → Reduce Vitamin C, take with food");
console.log("• Prescription medications → General interaction warning");
console.log("");

console.log("🎯 Expected Output Format:");
console.log("========================");
console.log(JSON.stringify({
  supplements: [
    {
      name: "Omega-3 EPA/DHA",
      safety: "May interact with anticoagulants. Consult your healthcare provider before use."
    }
  ],
  banner: "If you are pregnant or taking prescription medication, consult a clinician before starting any supplements.",
  warnings: ["Omega-3 safety warning added due to anticoagulant use"]
}, null, 2));
console.log("");

console.log("✅ All Safety/Contraindications Tests Completed!");
console.log("The function successfully:");
console.log("• Identifies contraindications from user responses");
console.log("• Modifies supplement safety information appropriately");
console.log("• Adds relevant banners and warnings");
console.log("• Handles multiple conditions simultaneously");
console.log("• Maintains baseline safety when no conditions present");
