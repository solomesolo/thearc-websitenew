/**
 * API Endpoint: Process Women's Questionnaire with OpenAI
 * 
 * This endpoint:
 * 1. Calculates all scores and flags from questionnaire answers
 * 2. Sends data to OpenAI with the exact clinical prompt
 * 3. Returns structured results for the free screening dashboard
 * 
 * Only for: Women in Menopause persona, Free Screening
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { calculateWomenQuestionnaireScores } from "@/lib/women-questionnaire-scoring";
import { 
  WOMEN_QUESTIONNAIRE_SYSTEM_PROMPT,
  createWomenQuestionnairePrompt 
} from "@/lib/women-questionnaire-prompt";

export async function POST(req: NextRequest) {
  try {
    const { persona, responseData } = await req.json();
    
    // Only process women in menopause persona
    if (persona !== "women") {
      return NextResponse.json(
        { error: "This endpoint is only for women in menopause questionnaire" },
        { status: 400 }
      );
    }
    
    // Check OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not configured");
      return NextResponse.json(
        { 
          error: "OpenAI API key not configured",
          details: "Please add OPENAI_API_KEY to environment variables"
        },
        { status: 500 }
      );
    }
    
    // Extract demographics from answers
    const demographics = {
      age: responseData['0.1'],
      height: responseData['0.2']?.split(/[,\s]+/)[0],
      weight: responseData['0.2']?.split(/[,\s]+/)[1],
      menstrual_status: responseData['0.3'],
      hrt_use: responseData['0.4'],
      diagnoses: Array.isArray(responseData['0.5']) ? responseData['0.5'] : [],
    };
    
    // Calculate all scores and flags
    console.log("Calculating scores and flags...");
    const scores = calculateWomenQuestionnaireScores(responseData, demographics);
    console.log("Scores calculated:", {
      stress_load: scores.stress_load_score,
      sleep_quality: scores.sleep_quality_score,
      nutrition_risk: scores.nutrition_risk_score,
    });
    
    // Create prompt for OpenAI
    const userPrompt = createWomenQuestionnairePrompt(demographics, responseData, scores);
    
    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Call OpenAI with the exact prompt
    console.log("Calling OpenAI...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Use gpt-4o for JSON response format support
      messages: [
        {
          role: "system",
          content: WOMEN_QUESTIONNAIRE_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.3, // Lower temperature for more consistent, clinical responses
      max_tokens: 3000,
      response_format: { type: "json_object" }, // Request JSON response
    });
    
    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error("No response from OpenAI");
    }
    
    // Parse JSON response
    let aiResults;
    try {
      // Remove any markdown code blocks if present
      const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      aiResults = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      console.error("Response was:", aiResponse);
      throw new Error("Failed to parse AI response as JSON");
    }
    
    // Combine calculated scores with AI-generated content
    const results = {
      scores: {
        nutrition_risk_score: scores.nutrition_risk_score,
        supplement_gap_score: scores.supplement_gap_score,
        movement_recovery_gap_score: scores.movement_recovery_gap_score,
        screening_gap_score: scores.screening_gap_score,
        environment_risk_score: scores.environment_risk_score,
        red_flag_burden_score: scores.red_flag_burden_score,
        stress_load_score: scores.stress_load_score,
        cortisol_regulation_score: scores.cortisol_regulation_score,
        sleep_quality_score: scores.sleep_quality_score,
        cognitive_recovery_score: scores.cognitive_recovery_score,
      },
      flags: {
        metabolic_risk_flag: scores.metabolic_risk_flag,
        cardiometabolic_risk_flag: scores.cardiometabolic_risk_flag,
        high_inflammation_risk_flag: scores.high_inflammation_risk_flag,
        poor_sleep_flag: scores.poor_sleep_flag,
        high_stress_flag: scores.high_stress_flag,
        cognitive_strain_flag: scores.cognitive_strain_flag,
        incomplete_basic_labs_flag: scores.incomplete_basic_labs_flag,
        cortisol_testing_indicated_flag: scores.cortisol_testing_indicated_flag,
        vitD_testing_indicated_flag: scores.vitD_testing_indicated_flag,
        glucose_testing_indicated_flag: scores.glucose_testing_indicated_flag,
        lipids_testing_indicated_flag: scores.lipids_testing_indicated_flag,
        thyroid_testing_indicated_flag: scores.thyroid_testing_indicated_flag,
        gut_workup_indicated_flag: scores.gut_workup_indicated_flag,
      },
      ai_analysis: aiResults, // Key metrics, weekly actions, recommended screenings
      demographics: {
        age: demographics.age,
        bmi: scores.bmi,
        postmenopausal: scores.postmenopausal,
        on_estrogen_or_combined: scores.on_estrogen_or_combined,
      },
    };
    
    console.log("Processing complete. Results generated.");
    
    return NextResponse.json({
      success: true,
      results,
    });
    
  } catch (error) {
    console.error("Error processing women's questionnaire:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      {
        error: "Failed to process questionnaire",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

