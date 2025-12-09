import { NextRequest, NextResponse } from "next/server";
import { computeCompositeScores } from "@/lib/arc-scoring-engine";
import { WOMEN_FULL_QUESTIONNAIRE_SYSTEM_PROMPT, createWomenFullQuestionnairePrompt } from "@/lib/women-full-questionnaire-prompt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { persona, responseData } = body;

    if (persona !== "rebuilder") {
      return NextResponse.json(
        { error: "This endpoint is only for rebuilder persona" },
        { status: 400 }
      );
    }

    if (!responseData) {
      return NextResponse.json(
        { error: "Missing responseData" },
        { status: 400 }
      );
    }

    console.log("Processing full questionnaire for rebuilder...");
    console.log("Response data keys:", Object.keys(responseData));

    // Compute composite scores using the same scoring engine
    const scoringResult = computeCompositeScores(responseData);
    console.log("Scores calculated:", scoringResult.mappedScores);
    console.log("R8 immediate flag:", scoringResult.r8Immediate);

    // Check for immediate red flag (R8)
    if (scoringResult.r8Immediate) {
      console.warn("⚠️ IMMEDIATE RED FLAG DETECTED: R8 (self-harm thoughts)");
    }

    // Prepare demographics (extract from answers)
    const demographics = {
      age: responseData['0.1'],
      menstrual_status: responseData['0.3'],
      hrt_use: responseData['0.4'],
    };

    // Create the prompt (using same prompt as women for now)
    const userPrompt = createWomenFullQuestionnairePrompt(
      demographics,
      responseData,
      scoringResult
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
          { role: "system", content: WOMEN_FULL_QUESTIONNAIRE_SYSTEM_PROMPT },
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
      scores: scoringResult.mappedScores,
      composites: scoringResult.composites,
      r8Immediate: scoringResult.r8Immediate,
      ai_analysis: aiAnalysis,
    };

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("Error processing full questionnaire:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process questionnaire" },
      { status: 500 }
    );
  }
}

