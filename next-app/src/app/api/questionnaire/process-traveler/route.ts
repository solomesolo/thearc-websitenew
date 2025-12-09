import { NextRequest, NextResponse } from "next/server";
import { calculateWomenQuestionnaireScores } from "@/lib/women-questionnaire-scoring";
import { WOMEN_QUESTIONNAIRE_SYSTEM_PROMPT, createWomenQuestionnairePrompt } from "@/lib/women-questionnaire-prompt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { persona, responseData } = body;

    if (persona !== "traveler") {
      return NextResponse.json(
        { error: "This endpoint is only for traveler persona" },
        { status: 400 }
      );
    }

    if (!responseData) {
      return NextResponse.json(
        { error: "Missing responseData" },
        { status: 400 }
      );
    }

    console.log("Processing questionnaire for traveler...");
    console.log("Response data keys:", Object.keys(responseData));

    // Calculate scores and flags (using same logic as women for now)
    const scoresAndFlags = calculateWomenQuestionnaireScores(responseData);
    console.log("Scores calculated:", {
      stress_load: scoresAndFlags.scores.stress_load_score,
      sleep_quality: scoresAndFlags.scores.sleep_quality_score,
      nutrition_risk: scoresAndFlags.scores.nutrition_risk_score,
    });

    // Create the prompt (using same prompt as women for now)
    const userPrompt = createWomenQuestionnairePrompt(
      responseData,
      scoresAndFlags.scores,
      scoresAndFlags.flags
    );

    // Call OpenAI API
    console.log("Calling OpenAI...");
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: WOMEN_QUESTIONNAIRE_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const aiAnalysis = JSON.parse(openaiData.choices[0].message.content);

    console.log("Processing complete. Results generated.");

    // Combine scores and AI analysis
    const results = {
      scores: scoresAndFlags.scores,
      flags: scoresAndFlags.flags,
      ai_analysis: aiAnalysis,
      demographics: scoresAndFlags.demographics,
    };

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("Error processing questionnaire:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process questionnaire" },
      { status: 500 }
    );
  }
}

