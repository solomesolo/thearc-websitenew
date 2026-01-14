/**
 * Test script for Women's Questionnaire Processing API
 * 
 * This script tests the /api/questionnaire/process-women endpoint
 * with sample questionnaire data.
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

// Sample questionnaire answers (women in menopause)
const sampleAnswers = {
  '0.1': '48', // Age
  '0.2': '165, 70', // Height (cm), Weight (kg)
  '0.3': 'Irregular periods', // Menstrual status
  '0.4': 'No', // HRT use
  '0.5': ['High blood pressure'], // Diagnoses
  
  // Nutrition (1.1-1.5)
  '1.1': 2, // Processed foods (0-4)
  '1.2': 1, // Omega-3 foods (0-4)
  '1.3': 2, // Caffeine after 14:00 (0-4)
  '1.4': 2, // Vegetables per day (0-4)
  '1.5': 2, // Bloating/sluggish (0-4)
  
  // Supplements (2.1-2.3)
  '2.1': 1, // Vitamin D (0-4)
  '2.2': 1, // Magnesium (0-4)
  '2.3': 0, // Omega-3 supplements (0-4)
  
  // Movement & Recovery (3.1-3.4)
  '3.1': 2, // Exercise days per week (0-4)
  '3.2': 1, // Strength training sessions (0-4)
  '3.3': 1, // Movement breaks (0-4)
  '3.4': 0, // Evening stretching (0-4)
  
  // Screenings (4.1-4.6)
  '4.1': 1, // Last blood panel (0-4)
  '4.2': 0, // Cortisol testing (0-4)
  '4.3': 'No', // Labs available
  '4.4': 1, // Vitamin D status (0-3)
  '4.5': 1, // Glucose status (0-3)
  '4.6': 1, // Lipids status (0-3)
  
  // Environment (5.1-5.2)
  '5.1': 2, // Brightness before bed (0-4)
  '5.2': 3, // Screens before bed (0-4)
  
  // Red Flags (6.1-6.2)
  '6.1': 2, // Midday crashes (0-4)
  '6.2': 1, // Headaches (0-4)
  
  // Key Metrics (7.1-7.8)
  '7.1': 3, // Pressure most days (0-4)
  '7.2': 2, // Stress lingers (0-4)
  '7.3': 2, // Wired but tired (0-4)
  '7.4': 2, // Wake 3-5 AM (0-4)
  '7.5': 2, // Struggle to fall asleep (0-4)
  '7.6': 2, // Unrefreshed on waking (0-4)
  '7.7': 2, // Mental fatigue (0-4)
  '7.8': 1, // Struggle to focus (0-4)
};

async function testQuestionnaireAPI() {
  console.log('🧪 Testing Women\'s Questionnaire Processing API\n');
  console.log(`📍 Endpoint: ${BASE_URL}/api/questionnaire/process-women\n`);
  
  try {
    console.log('📤 Sending request...');
    const startTime = Date.now();
    
    const response = await fetch(`${BASE_URL}/api/questionnaire/process-women`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        persona: 'women',
        responseData: sampleAnswers,
      }),
    });
    
    const duration = Date.now() - startTime;
    
    console.log(`⏱️  Response time: ${duration}ms`);
    console.log(`📊 Status: ${response.status} ${response.statusText}\n`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response:');
      console.error(errorText);
      return;
    }
    
    const data = await response.json();
    
    console.log('✅ Success! Response structure:\n');
    console.log(JSON.stringify(data, null, 2));
    
    // Validate response structure
    if (data.success && data.results) {
      console.log('\n📋 Response Validation:');
      console.log(`  ✅ Success flag: ${data.results ? '✓' : '✗'}`);
      console.log(`  ✅ Scores: ${data.results.scores ? '✓' : '✗'}`);
      console.log(`  ✅ Flags: ${data.results.flags ? '✓' : '✗'}`);
      console.log(`  ✅ AI Analysis: ${data.results.ai_analysis ? '✓' : '✗'}`);
      
      if (data.results.scores) {
        console.log('\n📊 Calculated Scores:');
        console.log(`  - Stress Load: ${data.results.scores.stress_load_score}`);
        console.log(`  - Sleep Quality: ${data.results.scores.sleep_quality_score}`);
        console.log(`  - Nutrition Risk: ${data.results.scores.nutrition_risk_score}`);
        console.log(`  - Cognitive Recovery: ${data.results.scores.cognitive_recovery_score}`);
      }
      
      if (data.results.ai_analysis) {
        console.log('\n🤖 AI Analysis:');
        console.log(`  - Key Metrics: ${data.results.ai_analysis.key_metrics ? '✓' : '✗'}`);
        console.log(`  - Weekly Actions: ${data.results.ai_analysis.weekly_actions ? '✓' : '✗'}`);
        console.log(`  - Recommended Screenings: ${data.results.ai_analysis.recommended_screenings ? '✓' : '✗'}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:');
    console.error(error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Make sure your Next.js dev server is running:');
      console.error('   cd next-app && npm run dev');
    }
  }
}

// Run the test
testQuestionnaireAPI();

