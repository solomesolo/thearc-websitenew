import { NextRequest, NextResponse } from "next/server";
import { calculateTravelerQuestionnaireScores } from "@/lib/traveler-questionnaire-scoring";
import { runTravellerEngine, UserResponses } from "@/lib/arcTravellerEngine";
import { convertConfigToEngineFormat } from "@/lib/travelerConfigToEngine";
import { fetchTravellerCatalogData } from "@/lib/travellerSupabaseData";

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

    console.log("🚀 Processing questionnaire for traveler...");
    console.log("Response data keys:", Object.keys(responseData));

    // Calculate scores using traveler-specific scoring system (for backward compatibility)
    const scores = calculateTravelerQuestionnaireScores(responseData);
    console.log("✅ Traveler scores calculated:", {
      SLD: scores.SLD,
      CRT: scores.CRT,
      SLP: scores.SLP,
      CRV: scores.CRV,
      TRV: scores.TRV,
      RFB: scores.RFB,
    });

    // Convert responseData to UserResponses format for engine
    const userResponses: UserResponses = {};
    Object.entries(responseData).forEach(([key, value]) => {
      userResponses[key] = value as any;
    });

    // Convert config to engine format
    const questionnaireConfig = convertConfigToEngineFormat();

    // Fetch products and supplements from Supabase
    console.log("📦 Fetching products and supplements from Supabase...");
    const { testProducts, supplementProducts } = await fetchTravellerCatalogData();
    console.log(`✅ Fetched ${testProducts.length} test products and ${supplementProducts.length} supplements`);

    // Run the traveller engine
    console.log("⚙️  Running traveller engine...");
    const engineOutput = runTravellerEngine(
      questionnaireConfig,
      userResponses,
      testProducts,
      supplementProducts
    );

    console.log("✅ Engine output generated:", {
      profile: {
        key_metrics: engineOutput.profile.key_metrics,
        risk_flags: engineOutput.profile.risk_flags,
      },
      screenings: engineOutput.screenings.length,
      selectedTests: engineOutput.selectedTests.length,
      selectedSupplements: engineOutput.selectedSupplements.length,
      weeklyActions: Object.keys(engineOutput.weeklyActions).length,
    });

    // Combine scores and engine output
    const results = {
      scores: {
        stress_load_score: scores.SLD,
        cortisol_regulation_score: scores.CRT,
        sleep_quality_score: scores.SLP,
        cognitive_recovery_score: scores.CRV,
        cognitive_rhythm_score: scores.CRY,
        movement_recovery_score: scores.MOB,
        nutrition_risk_score: scores.NUT,
        environment_risk_score: scores.ENV,
        red_flag_burden_score: scores.RFB,
        lifestyle_load_score: scores.LIF,
        metabolic_risk_score: scores.MET,
        travel_strain_score: scores.TRV,
      },
      flags: {
        upcoming_travel_within_6w: scores.upcoming_travel_within_6w,
        has_immediate_concern: scores.has_immediate_concern,
      },
      rawScores: scores.rawScores,
      compositeRawScores: scores.compositeRawScores,
      // Engine output for dashboard
      engine: {
        profile: engineOutput.profile,
        screenings: engineOutput.screenings,
        selectedTests: engineOutput.selectedTests,
        selectedSupplements: engineOutput.selectedSupplements,
        weeklyActions: engineOutput.weeklyActions,
      },
    };

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("❌ Error processing questionnaire:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process questionnaire" },
      { status: 500 }
    );
  }
}

