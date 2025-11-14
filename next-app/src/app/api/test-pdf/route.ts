import { NextRequest, NextResponse } from 'next/server';
import { PDFGenerator } from '../../../lib/pdfGenerator';

export async function GET(request: NextRequest) {
  try {
    // Load test data
    const testData = {
      user: {
        name: "Test User",
        age: 35,
        sex: "female",
        email: "test@example.com"
      },
      scores: {
        family_risk: 75,
        physiological: 45,
        lifestyle_load: 60,
        biological: 25,
        cognitive: 55
      },
      explanations: {
        explanations: {
          family_risk: "Your family history shows moderate genetic predisposition to cardiovascular disease and diabetes.",
          physiological: "Your physiological patterns suggest some autonomic dysfunction, likely related to stress and sleep quality.",
          lifestyle_load: "Your lifestyle load indicates moderate stress levels with room for improvement in sleep, exercise, and stress management practices.",
          biological: "Your biological markers show good metabolic health with low inflammation.",
          cognitive: "Your cognitive health shows some fatigue-related concerns. Prioritize sleep quality and stress reduction techniques."
        }
      },
      screenings: [
        {
          name: "CRP (C-Reactive Protein)",
          why: "Given your family history of cardiovascular disease, monitoring inflammation markers is crucial for early detection and prevention.",
          when: "Get tested now, then every 6-12 months to track inflammation trends."
        }
      ],
      nutrition: {
        archetype: "Anti-inflammatory Mediterranean",
        principles: [
          "Emphasize whole, unprocessed foods rich in antioxidants",
          "Include omega-3 fatty acids from fish and nuts",
          "Limit refined sugars and processed foods"
        ],
        days: [
          {
            day: 1,
            breakfast: "Greek yogurt with berries, walnuts, and honey",
            lunch: "Mediterranean quinoa salad with chickpeas, tomatoes, cucumber, and olive oil",
            dinner: "Grilled salmon with roasted vegetables and brown rice",
            snacks: ["Apple slices with almond butter", "Green tea"]
          }
        ]
      },
      supplements: [
        {
          name: "Omega-3 EPA/DHA",
          dose: "1000-2000 mg daily",
          timing: "With meals",
          why: "Supports cardiovascular health, reduces inflammation, and may help with mood regulation.",
          safety: "Generally safe. May interact with blood thinners. Consult healthcare provider if taking anticoagulants."
        }
      ],
      breath_recovery: [
        {
          name: "4-7-8 Breathing",
          how: "Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat 4-8 cycles. Practice morning and evening."
        }
      ],
      phase_order: ["Decode", "Rebalance", "Strengthen", "Nourish", "Refine", "Sustain"],
      months: [
        {
          name: "Decode",
          goal: "Gain deep understanding of your baseline health, habits, and key biomarkers.",
          why: "Accurate insight into starting points allows targeted, personalized interventions instead of guesswork.",
          daily: [
            "Track sleep, mood, and energy daily using journal or app.",
            "Complete baseline labs and self-assessments.",
            "Note dietary patterns and stress triggers without judgment."
          ],
          weekly_reflection: "What patterns are emerging in your sleep, energy, or stress that surprise you?"
        }
      ],
      executive_summary: "This is a test PDF generation to verify the system is working correctly. The system includes comprehensive health assessment, personalized recommendations, and actionable steps for longevity optimization.",
      disclaimer: "This report is educational and for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment."
    };

    // Generate PDF
    const pdfGenerator = new PDFGenerator();
    const pdfBuffer = await pdfGenerator.generatePDF(testData);
    await pdfGenerator.close();

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="test-blueprint.pdf"'
      }
    });

  } catch (error) {
    console.error('Test PDF Generation Error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Test PDF generation failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
