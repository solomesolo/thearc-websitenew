// Test script to verify questionnaire data transformation
const testFormData = {
    name: "Test User",
    age: "35",
    gender: "male",
    email: "test@example.com",
    location: "city",
    education: "university",
    work_status: "employed",
    family_health_patterns: "heart_disease,diabetes",
    lightheaded_standing: "yes",
    skin_color_changes: "no",
    temperature_sensitivity: "yes",
    overwhelmed: "sometimes",
    confidence_handling: "fairly_often",
    in_control: "sometimes",
    upset_annoyed: "sometimes",
    tense_nervous: "fairly_often",
    too_many_demands: "sometimes"
};

// Simulate the transformation function
function transformQuestionnaireData(formData) {
    return {
        user: {
            name: formData.name || "User",
            age: parseInt(formData.age) || 30,
            sex: formData.gender || "other",
            email: formData.email || ""
        },
        family_history: {
            cvd: {
                present: formData.family_health_patterns && formData.family_health_patterns.includes('heart_disease'),
                first_degree: formData.family_health_patterns && formData.family_health_patterns.includes('heart_disease'),
                onset: '<60'
            },
            diabetes: {
                present: formData.family_health_patterns && formData.family_health_patterns.includes('diabetes'),
                first_degree: formData.family_health_patterns && formData.family_health_patterns.includes('diabetes')
            },
            cancer: formData.family_health_patterns && formData.family_health_patterns.includes('cancer') ? 
                [{ type: 'colorectal', relative: 'mother' }] : []
        },
        physiological_patterns: {
            lightheaded_standing: formData.lightheaded_standing === 'yes' ? 'sometimes' : 'never',
            skin_color_changes: formData.skin_color_changes === 'yes',
            temperature_sensitivity: formData.temperature_sensitivity === 'yes' ? 'high' : 'normal'
        },
        lifestyle_load: {
            overwhelmed: formData.overwhelmed || 'never',
            confidence_handling: formData.confidence_handling || 'never',
            in_control: formData.in_control || 'never'
        },
        biological_signals: {
            age: parseInt(formData.age) || 30,
            gender: formData.gender || 'other',
            location: formData.location || 'urban',
            education: formData.education || 'university',
            work_status: formData.work_status || 'employed'
        },
        cognitive_rhythm: {
            upset_annoyed: formData.upset_annoyed || 'never',
            tense_nervous: formData.tense_nervous || 'never',
            too_many_demands: formData.too_many_demands || 'never'
        },
        symptoms: {
            fatigue: formData.fatigue || false,
            sleep_issues: formData.sleep_issues || false,
            digestive_issues: formData.digestive_issues || false
        },
        preferences: {
            budget: formData.budget || 'moderate',
            equipment: formData.equipment || 'basic',
            diet: formData.diet || 'flexible'
        }
    };
}

// Test the transformation
const transformedData = transformQuestionnaireData(testFormData);
console.log('🧪 Testing Questionnaire Data Transformation...\n');
console.log('📊 Transformed Data:');
console.log(JSON.stringify(transformedData, null, 2));

// Test score calculations
function calculateFamilyRisk(familyHistory) {
    let score = 0;
    
    if (familyHistory.cvd.present && familyHistory.cvd.first_degree && familyHistory.cvd.onset === '<60') {
        score += 40;
    }
    
    if (familyHistory.diabetes.present && familyHistory.diabetes.first_degree) {
        score += 25;
    }
    
    if (familyHistory.cancer.length > 0) {
        const colorectalCancer = familyHistory.cancer.find((c) => c.type === 'colorectal');
        if (colorectalCancer && colorectalCancer.relative === 'mother') {
            score += 20;
        }
    }
    
    return Math.min(score, 100);
}

function calculatePhysiological(physiological) {
    let score = 0;
    
    if (physiological.lightheaded_standing === 'often') score += 40;
    else if (physiological.lightheaded_standing === 'sometimes') score += 20;
    
    if (physiological.skin_color_changes) score += 30;
    
    if (physiological.temperature_sensitivity === 'high') score += 30;
    else if (physiological.temperature_sensitivity === 'moderate') score += 15;
    
    return Math.min(score, 100);
}

function calculateLifestyleLoad(lifestyle) {
    let score = 0;
    
    if (lifestyle.overwhelmed === 'often') score += 40;
    else if (lifestyle.overwhelmed === 'sometimes') score += 20;
    
    if (lifestyle.confidence_handling === 'never') score += 30;
    else if (lifestyle.confidence_handling === 'rarely') score += 15;
    
    if (lifestyle.in_control === 'never') score += 30;
    else if (lifestyle.in_control === 'rarely') score += 15;
    
    return Math.min(score, 100);
}

function calculateBiological(biological) {
    let score = 0;
    
    if (biological.age >= 65) score += 30;
    else if (biological.age >= 45) score += 20;
    else if (biological.age >= 35) score += 10;
    
    if (biological.gender === 'male') score += 10;
    
    if (biological.location === 'rural') score += 5;
    
    if (biological.education === 'high_school') score += 15;
    else if (biological.education === 'university') score += 5;
    
    if (biological.work_status === 'unemployed') score += 20;
    else if (biological.work_status === 'retired') score += 10;
    
    return Math.min(score, 100);
}

function calculateCognitive(cognitive) {
    let score = 0;
    
    if (cognitive.upset_annoyed === 'often') score += 30;
    else if (cognitive.upset_annoyed === 'sometimes') score += 15;
    
    if (cognitive.tense_nervous === 'often') score += 30;
    else if (cognitive.tense_nervous === 'sometimes') score += 15;
    
    if (cognitive.too_many_demands === 'often') score += 30;
    else if (cognitive.too_many_demands === 'sometimes') score += 15;
    
    return Math.min(score, 100);
}

// Calculate scores
const scores = {
    family_risk: calculateFamilyRisk(transformedData.family_history),
    physiological: calculatePhysiological(transformedData.physiological_patterns),
    lifestyle_load: calculateLifestyleLoad(transformedData.lifestyle_load),
    biological: calculateBiological(transformedData.biological_signals),
    cognitive: calculateCognitive(transformedData.cognitive_rhythm)
};

console.log('\n📊 Calculated Scores:');
console.log('Family Risk:', scores.family_risk);
console.log('Physiological:', scores.physiological);
console.log('Lifestyle Load:', scores.lifestyle_load);
console.log('Biological:', scores.biological);
console.log('Cognitive:', scores.cognitive);



