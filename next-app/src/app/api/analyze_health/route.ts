import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { portkeyService } from '../../../lib/portkey';
import { ScreeningToCatalogMapper } from '../../../lib/screeningToCatalogMapper';

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Debug environment variables
    console.log('🔍 Environment check:');
    console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
    console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length || 0);
    console.log('PORTKEY_API_KEY exists:', !!process.env.PORTKEY_API_KEY);
    console.log('PORTKEY_API_KEY length:', process.env.PORTKEY_API_KEY?.length || 0);
    console.log('SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    const { responses, userEmail } = await request.json();
    console.log('🔍 Received responses:', responses?.length || 0, 'responses');
    console.log('🔍 User email:', userEmail);
    
    let aiResponse: string;
    let completion: any;
    
    // Try Portkey monitoring first, fallback to OpenAI if not available
    if (false && portkeyService.isMonitoringEnabled()) {
      console.log('🔍 Using Portkey for AI monitoring...');
      try {
        completion = await portkeyService.createHealthAnalysis({
          questionnaireResponses: responses,
          userEmail: userEmail,
          userId: userEmail || 'anonymous'
        });
        aiResponse = completion.choices[0].message.content;
        console.log('✅ Portkey monitoring successful');
      } catch (portkeyError) {
        console.warn('⚠️ Portkey monitoring failed, falling back to OpenAI:', portkeyError);
        // Fallback to OpenAI
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY
        });
        
        const prompt = await createHealthAssessmentPrompt(responses);
        completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a preventive medicine specialist with expertise in evidence-based health screening. Your role is to analyze patient questionnaire data comprehensively, identify risk factors, and provide personalized screening recommendations that are clinically justified, patient-friendly, and prioritized by urgency. Always use all provided data and connect symptoms to specific test recommendations."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        });
        aiResponse = completion.choices[0].message.content;
      }
    } else {
      console.log('🔍 Portkey not available, using OpenAI directly...');
      // Initialize OpenAI client inside the handler
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      
      // Create comprehensive prompt for ChatGPT
      console.log('🔍 Creating health assessment prompt...');
      const prompt = await createHealthAssessmentPrompt(responses);
      console.log('🔍 Prompt created, length:', prompt.length);
      
      // Get AI analysis
      console.log('🔍 Making OpenAI API call...');
      completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a preventive medicine specialist with expertise in evidence-based health screening. Your role is to analyze patient questionnaire data comprehensively, identify risk factors, and provide personalized screening recommendations that are clinically justified, patient-friendly, and prioritized by urgency. Always use all provided data and connect symptoms to specific test recommendations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      });
      
      aiResponse = completion.choices[0].message.content;
      console.log('🔍 AI response received, length:', aiResponse?.length || 0);
    }
    
    // Parse AI response into structured format
    console.log('🔍 Parsing AI response...');
    const results = parseAIResponse(aiResponse || '');
    console.log('🔍 Parsed results:', results);
    
    // Transform API response to match frontend expectations
    const transformedResults = {
      assessment_summary: "Based on your responses, here are your personalized health screening recommendations:",
      urgent_tests: results.urgent || [],
      due_soon_tests: results.dueSoon || [],
      optional_tests: results.optional || [],
      categories: [
        {
          category_name: "Urgent Tests",
          category_description: "Tests that should be completed within the next month",
          tests: results.urgent || []
        },
        {
          category_name: "Due Soon Tests", 
          category_description: "Tests that should be completed within 3-6 months",
          tests: results.dueSoon || []
        },
        {
          category_name: "Optional Tests",
          category_description: "General wellness and preventive screening tests",
          tests: results.optional || []
        },
        {
          category_name: "Cardiovascular Health",
          category_description: "Essential tests for heart disease prevention and cardiovascular risk assessment.",
          tests: [
            { test: "Lipid Panel", reason: "Measures cholesterol levels and cardiovascular risk factors for heart disease prevention.", status: "MISSING" },
            { test: "ApoB", reason: "Advanced marker for cardiovascular disease risk assessment and heart attack prevention.", status: "MISSING" },
            { test: "hs-CRP", reason: "Inflammation marker linked to heart disease risk and cardiovascular health monitoring.", status: "MISSING" },
            { test: "Homocysteine", reason: "Cardiovascular risk factor and B-vitamin status indicator for heart health.", status: "MISSING" }
          ]
        },
        {
          category_name: "Metabolic Health",
          category_description: "Key biomarkers for diabetes prevention and metabolic syndrome detection.",
          tests: [
            { test: "HbA1c", reason: "3-month average blood sugar level for diabetes screening and metabolic health monitoring.", status: "MISSING" },
            { test: "Fasting Glucose", reason: "Current blood sugar level and diabetes risk indicator for metabolic assessment.", status: "MISSING" },
            { test: "Fasting Insulin", reason: "Insulin resistance marker and metabolic health indicator for diabetes prevention.", status: "MISSING" },
            { test: "Liver Enzymes", reason: "Liver function and metabolic health assessment for overall metabolic monitoring.", status: "MISSING" }
          ]
        },
        {
          category_name: "Hormonal Health",
          category_description: "Comprehensive hormone assessment for optimal endocrine function.",
          tests: [
            { test: "Thyroid Function", reason: "Essential for metabolism, energy, and overall health regulation and monitoring.", status: "MISSING" },
            { test: "Testosterone (men)", reason: "Male hormone levels affecting energy, muscle mass, and vitality for men's health.", status: "MISSING" },
            { test: "Cortisol", reason: "Stress hormone affecting energy, sleep, and immune function for stress management.", status: "MISSING" },
            { test: "DHEA-S", reason: "Anti-aging hormone and energy metabolism marker for longevity and vitality.", status: "MISSING" }
          ]
        },
        {
          category_name: "Nutritional Status",
          category_description: "Essential vitamins and minerals for optimal health and energy.",
          tests: [
            { test: "Vitamin D", reason: "Critical for immune function, bone health, and mood regulation for overall wellness.", status: "MISSING" },
            { test: "Vitamin B12 & Folate", reason: "Essential for energy production and neurological function for brain and energy health.", status: "MISSING" },
            { test: "Ferritin (Iron)", reason: "Iron storage levels affecting energy and oxygen transport for vitality and energy.", status: "MISSING" },
            { test: "Magnesium & Zinc", reason: "Essential minerals for muscle function and immune health for optimal body function.", status: "MISSING" }
          ]
        },
        {
          category_name: "Longevity Biomarkers",
          category_description: "Advanced markers for biological aging and longevity optimization.",
          tests: [
            { test: "Biological Aging Marker", reason: "Measures cellular aging and biological age vs chronological age for longevity tracking.", status: "MISSING" },
            { test: "Omega-3 Index", reason: "Essential fatty acid levels for heart and brain health for cognitive and cardiovascular wellness.", status: "MISSING" },
            { test: "Genetic Health Screen", reason: "Personalized genetic insights for disease prevention and personalized health optimization.", status: "MISSING" }
          ]
        },
        {
          category_name: "Gut Health",
          category_description: "Microbiome analysis for digestive health and immune function.",
          tests: [
            { test: "Microbiome Test", reason: "Comprehensive analysis of gut bacteria and digestive health for immune and digestive wellness.", status: "MISSING" },
            { test: "Stool Analysis", reason: "Digestive function and gut health assessment for digestive and immune system monitoring.", status: "MISSING" }
          ]
        }
      ],
      next_steps: [
        {
          timeframe: "URGENT (within 1 month)",
          actions: results.urgent?.map((test: any) => `Schedule ${test.test}`) || []
        },
        {
          timeframe: "DUE SOON (within 3-6 months)", 
          actions: results.dueSoon?.map((test: any) => `Schedule ${test.test}`) || []
        }
      ]
    };

    return NextResponse.json({
      success: true,
      results: transformedResults,
      aiResponse: aiResponse,
      monitoring: {
        portkeyEnabled: portkeyService.isMonitoringEnabled(),
        portkeyStatus: portkeyService.getStatus()
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
    } catch (error) {
      console.error('Error in analyze-health:', error);
      
      // Provide fallback data when API fails
      console.log('🔄 Providing fallback data due to API error');
      const fallbackData = {
        assessment_summary: "Based on your responses, we recommend a comprehensive health screening approach. Your age and lifestyle factors suggest focusing on cardiovascular health, metabolic markers, and preventive care. We've identified several key areas that would benefit from testing to optimize your health and longevity.",
        urgent_tests: [
          {
            name: "HbA1c test",
            explanation: "Based on your age and lifestyle factors, an HbA1c test is particularly important for you. This test measures your average blood sugar levels over the past 2-3 months, providing a more comprehensive picture than a single glucose reading. Given that you may have risk factors for metabolic issues, this test will help identify any early signs of insulin resistance or prediabetes before they develop into more serious conditions. Early detection through HbA1c testing allows for lifestyle interventions and preventive measures that can significantly improve your long-term health outcomes and reduce your risk of developing type 2 diabetes.",
            timeframe: "Schedule within 1-2 weeks",
            status: "RECOMMENDED"
          },
          {
            name: "Lipid Panel",
            explanation: "A comprehensive lipid panel is essential for assessing your cardiovascular health, especially considering your age and potential risk factors. This test measures your total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides, providing crucial insights into your heart disease risk. Given the importance of cardiovascular health in your age group, this test will help identify any lipid abnormalities that could increase your risk of heart disease, stroke, or other cardiovascular complications. The results will guide personalized recommendations for diet, exercise, and potentially medication to optimize your cardiovascular health and longevity.",
            timeframe: "Schedule within 1-2 weeks", 
            status: "RECOMMENDED"
          }
        ],
        categories: [
          {
            category_name: "Cardiovascular Health",
            category_description: "Heart disease is the leading cause of death worldwide, and early detection of risk factors is key.",
            tests: [
              {
                name: "Cholesterol & Lipids Test",
                description: "A comprehensive cholesterol and lipids test is crucial for your cardiovascular health assessment. This test measures your total cholesterol, LDL cholesterol, HDL cholesterol, and triglycerides, providing a complete picture of your lipid profile. Given your age and potential risk factors, this test will help identify any abnormalities in your cholesterol levels that could increase your risk of heart disease, stroke, or other cardiovascular complications. The results will enable your healthcare provider to make personalized recommendations for diet, exercise, and potentially medication to optimize your cardiovascular health and reduce your risk of future heart problems.",
                status: "RECOMMENDED"
              }
            ]
          },
          {
            category_name: "Metabolic Health", 
            category_description: "Metabolic health is crucial for energy, weight management, and preventing chronic diseases.",
            tests: [
              {
                name: "Blood Sugar Test (HbA1c)",
                description: "The HbA1c test is an essential tool for monitoring your long-term blood sugar control and assessing your risk of diabetes. This test measures your average blood glucose levels over the past 2-3 months, providing a more accurate picture than single glucose readings. Given your age and potential risk factors, this test will help identify any early signs of insulin resistance or prediabetes before they develop into more serious conditions. Early detection through HbA1c testing allows for timely lifestyle interventions and preventive measures that can significantly improve your metabolic health and reduce your risk of developing type 2 diabetes and its complications.",
                status: "RECOMMENDED"
              }
            ]
          },
          {
            category_name: "Nutritional Status",
            category_description: "Nutrient deficiencies can cause a range of health problems and are often overlooked.",
            tests: [
              {
                name: "Vitamin D Test",
                description: "Vitamin D testing is particularly important for your overall health and well-being, as deficiency is extremely common and can have wide-ranging effects on your body. This test measures your 25-hydroxyvitamin D levels, which is the best indicator of your vitamin D status. Given your age and lifestyle factors, this test will help identify any vitamin D deficiency that could be affecting your bone health, immune function, mood, and overall energy levels. Adequate vitamin D levels are crucial for calcium absorption, bone strength, immune system function, and may even play a role in reducing your risk of certain chronic diseases. The results will guide personalized supplementation recommendations to optimize your vitamin D levels and improve your overall health.",
                status: "RECOMMENDED"
              }
            ]
          }
        ],
        next_steps: [
          {
            timeframe: "URGENT (within 2 weeks)",
            actions: [
              "Schedule HbA1c test immediately",
              "Book your lipid panel test"
            ]
          },
          {
            timeframe: "ROUTINE (within 1 month)",
            actions: [
              "Consider vitamin D testing",
              "Plan annual comprehensive health check"
            ]
          }
        ]
      };
      
      return NextResponse.json({
        success: true,
        results: fallbackData,
        fallback: true,
        message: "Using fallback data due to API configuration issue"
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
}

async function createHealthAssessmentPrompt(responses: Array<{question: string, answer: string}>) {
  // Get available test names from catalog
  console.log('🔍 Getting test names from catalog...');
  const testNamesByCategory = await ScreeningToCatalogMapper.getTestNamesByCategory();
  const allTestNames = await ScreeningToCatalogMapper.getAvailableTestNames();
  console.log('🔍 Test names by category:', Object.keys(testNamesByCategory).length, 'categories');
  console.log('🔍 Total test names:', allTestNames.length);
  
  let prompt = `You are a preventive medicine specialist who helps people understand their current health status and what screenings can keep them healthy long-term.
Your goal is to create a personalized preventive screening summary in clear, empathetic, and patient-friendly language — like a medical professional explaining test results to a smart but non-medical person.

IMPORTANT: You can ONLY recommend tests that are available in our catalog. Below are the available tests organized by category:

AVAILABLE TESTS BY CATEGORY:
${Object.entries(testNamesByCategory).map(([category, tests]) => 
  `${category}:\n${tests.map(test => `- ${test}`).join('\n')}`
).join('\n\n')}

ALL AVAILABLE TESTS (${allTestNames.length} total):
${allTestNames.map(test => `- ${test}`).join('\n')}

DECISION LOGIC (must follow this order):

1. Summarize the User's Current Health Picture
   - In 3–5 sentences, describe what their answers and lab history suggest overall.
   - Mention any key strengths (e.g., healthy habits, normal results) and areas that need attention (e.g., rising blood sugar, missing tests).
   - Use warm, supportive, human language — avoid medical jargon.

2. Identify Risks and Gaps from Questionnaire Data
   - Highlight symptoms or family history that raise risk in any area (e.g., fatigue → thyroid or iron; family history of heart disease → cholesterol, inflammation).
   - Connect these risks directly to categories of screening.

3. Cross-Check Against Clinical Guidelines
   - Match findings with evidence-based screenings appropriate for the user's age and risk profile (use guidelines from USPSTF, AHA, ADA, WHO, Endocrine Society, NICE).

4. Interpret Previous Lab History
   - For each test: Mark as UP TO DATE if within validity range (6–12 months), DUE SOON if older or borderline, MISSING if never done.
   - If a test result was borderline or abnormal, clearly explain it in plain English and recommend retesting.

5. Generate Test Recommendations
   - CRITICAL: Only recommend tests that are in the "AVAILABLE TESTS" list above.
   - If a clinically important test is not available, suggest the closest available alternative.
   - Include only clinically justified tests.
   - Cover all categories: Cardiovascular Health, Metabolic Health, Hormonal Health, Nutritional Status, Longevity Biomarkers, Gut Health.
   - For each test, explain why it matters specifically for the user.
   - Always prioritize by urgency: URGENT (abnormal/borderline result or strong symptom), ROUTINE (recommended per guideline for their age), OPTIMIZATION (optional for longevity tracking).

Based on the following health questionnaire responses, provide a personalized screening plan:\n\n`;
  
  responses.forEach((response, index) => {
    prompt += `Question ${index + 1}: ${response.question}\nAnswer: ${response.answer}\n\n`;
  });
  
  prompt += `Please provide a structured screening plan with:
  1. URGENT tests (needed within 1 month)
  2. DUE SOON tests (needed within 3-6 months)  
  3. OPTIONAL tests (general wellness)
  
  For each test, provide:
  - test: Test name (MUST be from the available tests list above)
  - reason: Why this test is recommended (explain in patient-friendly terms)
  - timeframe: When to get it done
  - status: URGENT, DUE_SOON, or OPTIONAL
  
  Return the response as a JSON object with "urgent", "dueSoon", and "optional" arrays.
  
  Make sure to:
  - Use ALL the questionnaire data provided
  - Connect symptoms to specific test recommendations
  - Consider family history and risk factors
  - Provide clear, empathetic explanations
  - Prioritize based on clinical urgency
  - ONLY recommend tests from the available catalog list above`;
  
  return prompt;
}

function parseAIResponse(aiResponse: string) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback parsing if JSON extraction fails
    return {
      urgent: [],
      dueSoon: [
        {
          test: "Blood Pressure Check",
          reason: "Regular blood pressure monitoring is important for cardiovascular health.",
          timeframe: "Within 3-6 months",
          status: "DUE_SOON"
        }
      ],
      optional: [
        {
          test: "General Health Checkup",
          reason: "Comprehensive health assessment for overall wellness.",
          timeframe: "Anytime",
          status: "OPTIONAL"
        }
      ]
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return {
      urgent: [],
      dueSoon: [],
      optional: []
    };
  }
}
