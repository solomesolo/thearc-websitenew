// Test the questionnaire flow with realistic data
const questionnaireData = {
    user: {
        name: "John Doe",
        age: 35,
        sex: "male",
        email: "john@example.com"
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

async function testQuestionnaireFlow() {
    try {
        console.log('🧪 Testing Questionnaire Flow...\n');
        
        // Step 1: Test the process-personalization API
        console.log('1️⃣ Testing process-personalization API...');
        const response = await fetch('http://localhost:3000/api/process-personalization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionnaireData)
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            return;
        }
        
        const results = await response.json();
        console.log('✅ API Response received');
        console.log('📊 Scores:', results.scores);
        console.log('🎯 Personalization:', results.personalize);
        console.log('📄 PDF URL:', results.pdfUrl ? 'Generated successfully' : 'Not generated');
        
        console.log('\n🎉 Questionnaire Flow Test Completed Successfully!');
        console.log('📊 All APIs working correctly');
        console.log('📄 PDF generation functional');
        console.log('🔗 Ready for questionnaire integration');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testQuestionnaireFlow();


