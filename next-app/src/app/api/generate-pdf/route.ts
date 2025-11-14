import { NextRequest, NextResponse } from 'next/server';
import Ajv from 'ajv';
import { PDFGenerator, PDFGenerationData } from '../../../lib/pdfGenerator';

// Input validation schema
const inputSchema = {
  type: "object",
  required: ["user", "scores", "explanations", "screenings", "nutrition", "supplements", "breath_recovery", "phase_order", "months", "executive_summary"],
  properties: {
    user: {
      type: "object",
      required: ["name", "age", "sex"],
      properties: {
        name: { type: "string" },
        age: { type: "number" },
        sex: { type: "string" }
      }
    },
    scores: {
      type: "object",
      required: ["family_risk", "physiological", "lifestyle_load", "biological", "cognitive"],
      properties: {
        family_risk: { type: "number" },
        physiological: { type: "number" },
        lifestyle_load: { type: "number" },
        biological: { type: "number" },
        cognitive: { type: "number" }
      }
    },
    explanations: {
      type: "object",
      required: ["explanations"],
      properties: {
        explanations: {
          type: "object",
          required: ["family_risk", "physiological", "lifestyle_load", "biological", "cognitive"],
          properties: {
            family_risk: { type: "string" },
            physiological: { type: "string" },
            lifestyle_load: { type: "string" },
            biological: { type: "string" },
            cognitive: { type: "string" }
          }
        }
      }
    },
    screenings: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "why", "when"],
        properties: {
          name: { type: "string" },
          why: { type: "string" },
          when: { type: "string" }
        }
      }
    },
    nutrition: {
      type: "object",
      required: ["archetype", "principles", "days"],
      properties: {
        archetype: { type: "string" },
        principles: { type: "array", items: { type: "string" } },
        days: {
          type: "array",
          items: {
            type: "object",
            required: ["day", "breakfast", "lunch", "dinner", "snacks"],
            properties: {
              day: { type: "number" },
              breakfast: { type: "string" },
              lunch: { type: "string" },
              dinner: { type: "string" },
              snacks: { type: "array", items: { type: "string" } }
            }
          }
        }
      }
    },
    supplements: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "dose", "timing", "why", "safety"],
        properties: {
          name: { type: "string" },
          dose: { type: "string" },
          timing: { type: "string" },
          why: { type: "string" },
          safety: { type: "string" }
        }
      }
    },
    breath_recovery: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "how"],
        properties: {
          name: { type: "string" },
          how: { type: "string" }
        }
      }
    },
    phase_order: {
      type: "array",
      items: { type: "string" }
    },
    months: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "goal", "why", "daily", "weekly_reflection"],
        properties: {
          name: { type: "string" },
          goal: { type: "string" },
          why: { type: "string" },
          daily: { type: "array", items: { type: "string" } },
          weekly_reflection: { type: "string" }
        }
      }
    },
    executive_summary: { type: "string" },
    disclaimer: { type: "string" }
  }
};

// Generate HTML template
function generateHTMLTemplate(data: any): string {
  const { user, scores, explanations, screenings, nutrition, supplements, breath_recovery, phase_order, months, executive_summary, disclaimer } = data;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personalised Longevity Blueprint - ${user.name}</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #333;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .cover {
            text-align: center;
            padding: 4cm 0;
        }
        
        .cover h1 {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 1cm;
            color: #2c3e50;
        }
        
        .cover h2 {
            font-size: 18pt;
            font-weight: normal;
            margin-bottom: 2cm;
            color: #7f8c8d;
        }
        
        .cover .user-info {
            font-size: 14pt;
            margin-bottom: 3cm;
        }
        
        .cover .date {
            font-size: 12pt;
            color: #7f8c8d;
        }
        
        h1 {
            font-size: 18pt;
            font-weight: bold;
            margin: 1cm 0 0.5cm 0;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 0.2cm;
        }
        
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 0.8cm 0 0.3cm 0;
            color: #34495e;
        }
        
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin: 0.5cm 0 0.2cm 0;
            color: #2c3e50;
        }
        
        p {
            margin-bottom: 0.3cm;
            text-align: justify;
        }
        
        .score-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5cm;
            margin: 0.5cm 0;
        }
        
        .score-item {
            border: 1px solid #bdc3c7;
            padding: 0.3cm;
            border-radius: 3px;
        }
        
        .score-label {
            font-weight: bold;
            font-size: 10pt;
            color: #7f8c8d;
            text-transform: uppercase;
        }
        
        .score-value {
            font-size: 16pt;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .score-explanation {
            font-size: 9pt;
            color: #7f8c8d;
            margin-top: 0.1cm;
        }
        
        .screening-item {
            margin-bottom: 0.4cm;
            padding: 0.3cm;
            border-left: 3px solid #3498db;
            background-color: #f8f9fa;
        }
        
        .screening-name {
            font-weight: bold;
            color: #2c3e50;
        }
        
        .screening-why {
            font-style: italic;
            color: #7f8c8d;
            margin: 0.1cm 0;
        }
        
        .screening-when {
            font-size: 9pt;
            color: #95a5a6;
        }
        
        .nutrition-principles {
            list-style: none;
            margin: 0.3cm 0;
        }
        
        .nutrition-principles li {
            margin-bottom: 0.2cm;
            padding-left: 0.5cm;
            position: relative;
        }
        
        .nutrition-principles li:before {
            content: "•";
            color: #3498db;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .meal-day {
            margin-bottom: 0.5cm;
            padding: 0.3cm;
            border: 1px solid #ecf0f1;
            border-radius: 3px;
        }
        
        .meal-day h4 {
            font-size: 11pt;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.2cm;
        }
        
        .meal-item {
            margin-bottom: 0.1cm;
            font-size: 10pt;
        }
        
        .supplement-item {
            margin-bottom: 0.4cm;
            padding: 0.3cm;
            border: 1px solid #ecf0f1;
            border-radius: 3px;
        }
        
        .supplement-name {
            font-weight: bold;
            color: #2c3e50;
        }
        
        .supplement-details {
            font-size: 9pt;
            color: #7f8c8d;
            margin: 0.1cm 0;
        }
        
        .breath-item {
            margin-bottom: 0.3cm;
            padding: 0.2cm;
            border-left: 2px solid #e74c3c;
        }
        
        .breath-name {
            font-weight: bold;
            color: #2c3e50;
        }
        
        .breath-how {
            font-size: 9pt;
            color: #7f8c8d;
            margin-top: 0.1cm;
        }
        
        .phase-item {
            margin-bottom: 0.5cm;
            padding: 0.4cm;
            border: 1px solid #bdc3c7;
            border-radius: 5px;
            background-color: #f8f9fa;
        }
        
        .phase-name {
            font-size: 12pt;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.2cm;
        }
        
        .phase-goal {
            font-weight: bold;
            color: #27ae60;
            margin-bottom: 0.1cm;
        }
        
        .phase-why {
            font-style: italic;
            color: #7f8c8d;
            margin-bottom: 0.2cm;
        }
        
        .phase-daily {
            margin: 0.2cm 0;
        }
        
        .phase-daily ul {
            list-style: none;
            margin-left: 0.5cm;
        }
        
        .phase-daily li {
            margin-bottom: 0.1cm;
            font-size: 9pt;
        }
        
        .phase-daily li:before {
            content: "→";
            color: #3498db;
            font-weight: bold;
            margin-right: 0.2cm;
        }
        
        .phase-reflection {
            font-size: 9pt;
            color: #7f8c8d;
            font-style: italic;
            margin-top: 0.2cm;
            padding-top: 0.2cm;
            border-top: 1px solid #ecf0f1;
        }
        
        .executive-summary {
            background-color: #f8f9fa;
            padding: 0.5cm;
            border-left: 4px solid #3498db;
            margin: 0.5cm 0;
        }
        
        .disclaimer {
            font-size: 8pt;
            color: #95a5a6;
            text-align: center;
            margin-top: 1cm;
            padding-top: 0.3cm;
            border-top: 1px solid #ecf0f1;
        }
        
        .empty-section {
            text-align: center;
            color: #bdc3c7;
            font-style: italic;
            padding: 1cm;
        }
        
        @media print {
            .page-break {
                page-break-before: always;
            }
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover">
        <h1>Personalised Longevity Blueprint</h1>
        <h2>Your Health Journey Starts Here</h2>
        <div class="user-info">
            <strong>${user.name}</strong><br>
            Age: ${user.age} | Sex: ${user.sex}
        </div>
        <div class="date">
            Generated on ${new Date().toLocaleDateString('en-GB', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}
        </div>
    </div>
    
    <!-- Executive Summary -->
    <div class="page-break">
        <h1>Executive Summary</h1>
        <div class="executive-summary">
            <p>${executive_summary}</p>
        </div>
    </div>
    
    <!-- Predisposition Map -->
    <div class="page-break">
        <h1>Your Health Predisposition Map</h1>
        <div class="score-grid">
            <div class="score-item">
                <div class="score-label">Family Risk</div>
                <div class="score-value">${scores.family_risk}</div>
                <div class="score-explanation">${explanations.family_risk}</div>
            </div>
            <div class="score-item">
                <div class="score-label">Physiological</div>
                <div class="score-value">${scores.physiological}</div>
                <div class="score-explanation">${explanations.physiological}</div>
            </div>
            <div class="score-item">
                <div class="score-label">Lifestyle Load</div>
                <div class="score-value">${scores.lifestyle_load}</div>
                <div class="score-explanation">${explanations.lifestyle_load}</div>
            </div>
            <div class="score-item">
                <div class="score-label">Biological</div>
                <div class="score-value">${scores.biological}</div>
                <div class="score-explanation">${explanations.biological}</div>
            </div>
            <div class="score-item">
                <div class="score-label">Cognitive</div>
                <div class="score-value">${scores.cognitive}</div>
                <div class="score-explanation">${explanations.cognitive}</div>
            </div>
        </div>
    </div>
    
    <!-- Screenings -->
    ${screenings && screenings.length > 0 ? `
    <div class="page-break">
        <h1>Recommended Screenings</h1>
        ${screenings.map(screening => `
            <div class="screening-item">
                <div class="screening-name">${screening.name}</div>
                <div class="screening-why">${screening.why}</div>
                <div class="screening-when">When: ${screening.when}</div>
            </div>
        `).join('')}
    </div>
    ` : '<div class="page-break"><h1>Recommended Screenings</h1><div class="empty-section">No screenings recommended at this time.</div></div>'}
    
    <!-- Nutrition Plan -->
    ${nutrition ? `
    <div class="page-break">
        <h1>Your Personalised Nutrition Plan</h1>
        <h2>${nutrition.archetype}</h2>
        <h3>Key Principles:</h3>
        <ul class="nutrition-principles">
            ${nutrition.principles.map(principle => `<li>${principle}</li>`).join('')}
        </ul>
        
        <h3>3-Day Meal Plan:</h3>
        ${nutrition.days.map(day => `
            <div class="meal-day">
                <h4>Day ${day.day}</h4>
                <div class="meal-item"><strong>Breakfast:</strong> ${day.breakfast}</div>
                <div class="meal-item"><strong>Lunch:</strong> ${day.lunch}</div>
                <div class="meal-item"><strong>Dinner:</strong> ${day.dinner}</div>
                <div class="meal-item"><strong>Snacks:</strong> ${day.snacks.join(', ')}</div>
            </div>
        `).join('')}
    </div>
    ` : '<div class="page-break"><h1>Nutrition Plan</h1><div class="empty-section">Nutrition plan not available.</div></div>'}
    
    <!-- Supplements -->
    ${supplements && supplements.length > 0 ? `
    <div class="page-break">
        <h1>Targeted Supplementation</h1>
        ${supplements.map(supplement => `
            <div class="supplement-item">
                <div class="supplement-name">${supplement.name}</div>
                <div class="supplement-details">
                    <strong>Dose:</strong> ${supplement.dose} | 
                    <strong>Timing:</strong> ${supplement.timing}
                </div>
                <div class="supplement-details">
                    <strong>Why:</strong> ${supplement.why}
                </div>
                <div class="supplement-details">
                    <strong>Safety:</strong> ${supplement.safety}
                </div>
            </div>
        `).join('')}
    </div>
    ` : '<div class="page-break"><h1>Supplements</h1><div class="empty-section">No supplements recommended at this time.</div></div>'}
    
    <!-- Breath & Recovery -->
    ${breath_recovery && breath_recovery.length > 0 ? `
    <div class="page-break">
        <h1>Breathwork & Recovery Techniques</h1>
        ${breath_recovery.map(breath => `
            <div class="breath-item">
                <div class="breath-name">${breath.name}</div>
                <div class="breath-how">${breath.how}</div>
            </div>
        `).join('')}
    </div>
    ` : '<div class="page-break"><h1>Breathwork & Recovery</h1><div class="empty-section">No breathwork techniques recommended at this time.</div></div>'}
    
    <!-- Monthly Phases -->
    ${months && months.length > 0 ? `
    ${months.map((month, index) => `
        <div class="page-break">
            <h1>Phase ${index + 1}: ${month.name}</h1>
            <div class="phase-item">
                <div class="phase-goal">Goal: ${month.goal}</div>
                <div class="phase-why">Why: ${month.why}</div>
                <div class="phase-daily">
                    <h3>Daily Actions:</h3>
                    <ul>
                        ${month.daily.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                </div>
                <div class="phase-reflection">
                    <strong>Weekly Reflection:</strong> ${month.weekly_reflection}
                </div>
            </div>
        </div>
    `).join('')}
    ` : '<div class="page-break"><h1>Monthly Phases</h1><div class="empty-section">No phases available.</div></div>'}
    
    <!-- Closing -->
    <div class="page-break">
        <h1>Your Journey Continues</h1>
        <p>This personalised longevity blueprint is your starting point. Remember that health is a journey, not a destination. Regular monitoring, adjustments, and professional guidance will help you achieve your longevity goals.</p>
        
        <h2>Next Steps</h2>
        <ul>
            <li>Begin with Phase 1: ${phase_order[0] || 'Decode'}</li>
            <li>Schedule your recommended screenings</li>
            <li>Start implementing your nutrition plan</li>
            <li>Practice your breathwork techniques daily</li>
            <li>Track your progress and adjust as needed</li>
        </ul>
        
        <div class="disclaimer">
            ${disclaimer || 'This report is educational and informational only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals before making significant changes to your health routine.'}
        </div>
    </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  const pdfGenerator = new PDFGenerator();
  
  try {
    const ajv = new Ajv();
    const body = await request.json();
    
    // Validate input
    const validate = ajv.compile(inputSchema);
    const valid = validate(body);
    
    if (!valid) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Invalid input data", 
          details: validate.errors 
        },
        { status: 400 }
      );
    }
    
    // Transform the data to match our PDFGenerationData interface
    const pdfData: PDFGenerationData = {
      user: body.user,
      scores: body.scores,
      explanations: body.explanations,
      screenings: body.screenings,
      nutrition: body.nutrition,
      supplements: body.supplements,
      breath_recovery: body.breath_recovery,
      months: body.months,
      executive_summary: body.executive_summary,
      disclaimer: body.disclaimer || "This report is educational and for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
    };

    // Generate the PDF using our new service
    const pdfBuffer = await pdfGenerator.generatePDF(pdfData);
    
    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="longevity-blueprint-${body.user.name.toLowerCase().replace(/\s+/g, '-')}.pdf"`
      }
    });
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  } finally {
    await pdfGenerator.close();
  }
}
