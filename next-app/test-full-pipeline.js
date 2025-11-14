// Test script for the full questionnaire to PDF pipeline
const testData = {
    user: {
        name: "Test User",
        age: 35,
        sex: "male",
        email: "test@example.com"
    },
    family_history: {
        cvd: {
            present: true,
            first_degree: true,
            onset: '<60'
        },
        diabetes: {
            present: false,
            first_degree: false
        },
        cancer: []
    },
    physiological_patterns: {
        lightheaded_standing: 'sometimes',
        skin_color_changes: false,
        temperature_sensitivity: 'normal'
    },
    lifestyle_load: {
        overwhelmed: 'sometimes',
        confidence_handling: 'usually',
        in_control: 'usually'
    },
    biological_signals: {
        age: 35,
        gender: 'male',
        location: 'urban',
        education: 'university',
        work_status: 'employed'
    },
    cognitive_rhythm: {
        upset_annoyed: 'sometimes',
        tense_nervous: 'sometimes',
        too_many_demands: 'sometimes'
    },
    symptoms: {
        fatigue: true,
        sleep_issues: false,
        digestive_issues: false
    },
    preferences: {
        budget: 'moderate',
        equipment: 'basic',
        diet: 'flexible'
    }
};

async function testFullPipeline() {
    try {
        console.log('🧪 Testing Full Questionnaire to PDF Pipeline...\n');
        
        // Step 1: Test the process-personalization API
        console.log('1️⃣ Testing process-personalization API...');
        const response = await fetch('http://localhost:3000/api/process-personalization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status} ${response.statusText}`);
        }
        
        const results = await response.json();
        console.log('✅ API Response received');
        console.log('📊 Scores:', results.scores);
        console.log('🎯 Personalization:', results.personalize);
        console.log('🤖 LLM Content:', results.llm ? 'Generated' : 'Not generated');
        console.log('📄 PDF URL:', results.pdfUrl ? 'Generated' : 'Not generated');
        
        // Step 2: Test PDF generation directly
        console.log('\n2️⃣ Testing PDF generation API...');
        const pdfResponse = await fetch('http://localhost:3000/api/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: testData.user,
                scores: results.scores,
                explanations: results.llm?.explanations || {
                    explanations: {
                        family_risk: "Test explanation for family risk",
                        physiological: "Test explanation for physiological",
                        lifestyle_load: "Test explanation for lifestyle load",
                        biological: "Test explanation for biological",
                        cognitive: "Test explanation for cognitive"
                    }
                },
                screenings: results.personalize?.screenings || ["CRP", "Lipid panel"],
                nutrition: {
                    archetype: "Anti-inflammatory Mediterranean",
                    principles: ["Anti-inflammatory foods", "Glucose stability", "Nutrient density"],
                    days: [
                        {
                            day: 1,
                            breakfast: "Greek yoghurt + berries + walnuts",
                            lunch: "Lentil salad with feta",
                            dinner: "Salmon with quinoa",
                            snacks: ["Apple + almonds", "Green tea"]
                        }
                    ]
                },
                supplements: results.personalize?.supplements?.map(name => ({
                    name,
                    dose: "As directed",
                    timing: "With meals",
                    why: "Test rationale",
                    safety: "Consult healthcare provider"
                })) || [],
                breath_recovery: results.personalize?.breath_recovery?.map(name => ({
                    name,
                    how: "Test instructions"
                })) || [],
                phase_order: results.personalize?.phase_order || ["Decode", "Rebalance"],
                months: [
                    {
                        name: "Rebalance",
                        goal: "Restore sleep and stress rhythm",
                        why: "Recovery precedes performance",
                        daily: ["Morning light + water", "10-minute walk after lunch", "Screens off 60 minutes before bed"],
                        weekly_reflection: "What helped you fall asleep faster this week?"
                    }
                ],
                executive_summary: results.llm?.executive_summary || "Your personalized longevity blueprint is designed to optimize your health and longevity based on your unique profile.",
                disclaimer: "This report is educational and for informational purposes only."
            })
        });
        
        if (!pdfResponse.ok) {
            throw new Error(`PDF generation failed: ${pdfResponse.status} ${pdfResponse.statusText}`);
        }
        
        const pdfBuffer = await pdfResponse.arrayBuffer();
        console.log('✅ PDF generated successfully');
        console.log('📄 PDF size:', pdfBuffer.byteLength, 'bytes');
        
        console.log('\n🎉 Full Pipeline Test Completed Successfully!');
        console.log('📊 All APIs working correctly');
        console.log('📄 PDF generation functional');
        console.log('🔗 Ready for questionnaire integration');
        
    } catch (error) {
        console.error('❌ Pipeline test failed:', error.message);
        process.exit(1);
    }
}

// Run the test
testFullPipeline();


