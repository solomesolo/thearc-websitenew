import { TravelerKeyMetricResult, TravelerWeeklyAction, TravelerSurveyAnswers, NarrativeBlocks, TrajectoryPoint } from './types';
import { TravelerPatternSummary, deriveTravelerPatternSummaryLegacy } from './travelerPatterns';
import { generateTravelerTrajectory } from './travelerTrajectory';
import { buildTravelerNarrativePrompt } from './travelerNarrativePrompt';
import { getTravelerTags } from './travelerMappings';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Convert key metrics to band-only format (no scores)
 */
function travelerKeyMetricsToBands(keyMetrics: TravelerKeyMetricResult[]): Record<string, string> {
  const bands: Record<string, string> = {};
  keyMetrics.forEach(metric => {
    bands[metric.id] = metric.band;
  });
  return bands;
}

/**
 * Convert weekly actions to plan pillars (topics only, no raw answers)
 * Merges rule-driven themes with action-derived themes
 */
function travelerWeeklyActionsToPillars(
  weeklyActions: TravelerWeeklyAction[],
  ruleThemes?: Array<{ category: string; theme: string; weight: number }>
): Array<{ category: string; bulletThemes: string[] }> {
  // Start with action-derived pillars
  const actionPillars = weeklyActions.map(action => ({
    category: action.title,
    bulletThemes: action.bullets.map(bullet => {
      // Extract theme from bullet (remove any specific details)
      return bullet.split(':')[0] || bullet.split('.')[0] || bullet;
    }),
  }));
  
  // Merge rule themes (higher priority)
  if (ruleThemes && ruleThemes.length > 0) {
    console.log("📊 Merging rule themes with action pillars:", {
      ruleThemesCount: ruleThemes.length,
      ruleThemes: ruleThemes.map(rt => `${rt.category}:${rt.theme}(${rt.weight})`),
      actionPillarsCount: actionPillars.length,
      actionPillarCategories: actionPillars.map(ap => ap.category),
    });
    
    const rulePillarsByCategory = new Map<string, string[]>();
    
    for (const ruleTheme of ruleThemes) {
      if (!rulePillarsByCategory.has(ruleTheme.category)) {
        rulePillarsByCategory.set(ruleTheme.category, []);
      }
      rulePillarsByCategory.get(ruleTheme.category)!.push(ruleTheme.theme);
    }
    
    // Merge: rule themes override action themes for same category
    const merged = new Map<string, { category: string; bulletThemes: string[] }>();
    
    // Add rule pillars first (higher priority)
    // Rule themes use categories like "sleep", "movement", "stress", "nutrition"
    // Action pillars use titles like "Sleep & Circadian", "Movement & Circulation"
    // We need to match them intelligently
    const categoryMapping: Record<string, string[]> = {
      "sleep": ["Sleep & Circadian", "Sleep"],
      "movement": ["Movement & Circulation", "Movement"],
      "stress": ["Stress Regulation", "Stress"],
      "nutrition": ["Nutrition & Hydration", "Nutrition"],
      "screening": ["Screenings & Checks", "Screening"],
    };
    
    for (const [ruleCategory, themes] of rulePillarsByCategory.entries()) {
      // Find matching action pillar by category mapping
      const matchingActionCategory = categoryMapping[ruleCategory.toLowerCase()]?.find(
        mapped => actionPillars.some(ap => ap.category.includes(mapped))
      );
      
      if (matchingActionCategory) {
        // Use the action pillar's category name but with rule themes
        const actionPillar = actionPillars.find(ap => ap.category.includes(matchingActionCategory));
        merged.set(actionPillar?.category || ruleCategory, { 
          category: actionPillar?.category || ruleCategory, 
          bulletThemes: themes 
        });
      } else {
        // No matching action pillar, create new category from rule
        merged.set(ruleCategory, { category: ruleCategory, bulletThemes: themes });
      }
    }
    
    // Add action pillars for categories not covered by rules
    for (const pillar of actionPillars) {
      const isCovered = Array.from(merged.keys()).some(key => 
        pillar.category.includes(key) || key.includes(pillar.category)
      );
      if (!isCovered) {
        merged.set(pillar.category, pillar);
      }
    }
    
    const result = Array.from(merged.values()).slice(0, 5);
    console.log("📊 Final merged plan pillars:", result.map(p => `${p.category}: [${p.bulletThemes.join(', ')}]`));
    return result;
  }
  
  // No rule themes, return action pillars (limit to 5)
  console.log("📊 No rule themes, using action pillars only:", actionPillars.map(ap => ap.category));
  return actionPillars.slice(0, 5);
}

/**
 * Call OpenAI to generate narrative JSON
 */
async function callLLMForJson(prompt: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a clinical wellness education writer. Always output valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content in OpenAI response");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error calling OpenAI for narrative:", error);
    throw error;
  }
}

/**
 * Validate and structure narrative JSON response
 */
function validateTravelerNarrative(
  json: any, 
  trajectoryPoints: TrajectoryPoint[],
  planPillars?: Array<{ category: string; bulletThemes: string[] }>,
  patternSummary?: TravelerPatternSummary
): NarrativeBlocks {
  // Ensure we always have a valid structure, even if LLM failed
  const whereYouAreNow = json?.whereYouAreNow || {
    headline: "Understanding Your Current Travel Health Patterns",
    body: "Based on your responses, we've identified several interconnected patterns affecting your health during travel and transitions.",
    patternSummaryBullets: [],
  };

  // Use LLM-generated plan if available, otherwise create personalized fallback
  let yourPersonalPlan = json?.yourPersonalPlan;
  if (!yourPersonalPlan || !yourPersonalPlan.planPillars || yourPersonalPlan.planPillars.length === 0) {
    // Create personalized fallback using pattern summary and plan pillars
    if (planPillars && planPillars.length > 0 && patternSummary) {
      console.log("⚠️ LLM did not generate plan pillars, creating personalized fallback from rules/actions");
      yourPersonalPlan = {
        headline: "Your Personalized Travel Health Plan",
        body: `Your plan is designed to address the key areas where support can make the most difference during travel and transitions. Based on your specific patterns (${patternSummary.dominantDomains.slice(0, 2).join(" and ")}), we've identified ${planPillars.length} priority areas.`,
        planPillars: planPillars.map(p => {
          // Create personalized title from bulletThemes
          let title: string;
          if (p.bulletThemes.length > 0) {
            const firstTheme = p.bulletThemes[0].replace(/_/g, " ");
            const themeToTitle: Record<string, string> = {
              "sleep anchors": "Stabilize sleep across time zones",
              "sleep_anchors": "Stabilize sleep across time zones",
              "circulation breaks": "Maintain mobility on long trips",
              "circulation_breaks": "Maintain mobility on long trips",
              "recovery practices": "Protect energy during travel",
              "recovery_practices": "Protect energy during travel",
              "micronutrient density": "Support immune resilience",
              "micronutrient_density": "Support immune resilience",
              "travel sleep prep": "Prepare for time zone transitions",
              "travel_sleep_prep": "Prepare for time zone transitions",
            };
            title = themeToTitle[firstTheme.toLowerCase()] || 
                    (firstTheme.charAt(0).toUpperCase() + firstTheme.slice(1));
          } else {
            title = p.category.charAt(0).toUpperCase() + p.category.slice(1).replace(/_/g, " ");
          }
          
          const themes = p.bulletThemes.length > 0 
            ? p.bulletThemes.join(", ")
            : `${p.category.toLowerCase()} interventions`;
          return {
            title,
            description: `Focus on ${themes} to support your travel health and address ${patternSummary.dominantDomains[0] || "key"} patterns.`
          };
        }),
      };
    } else {
      // Ultimate fallback if no plan pillars available
      yourPersonalPlan = {
        headline: "Your Personalized Travel Health Plan",
        body: "Your plan is designed to address the key areas where support can make the most difference during travel and transitions.",
        planPillars: [],
      };
    }
  }

  // CRITICAL: Ensure trajectory is always present and has 8 points
  // If trajectoryPoints is empty or invalid, this is a critical error
  if (!trajectoryPoints || trajectoryPoints.length === 0) {
    console.error("🚨 CRITICAL: validateTravelerNarrative received empty trajectoryPoints!");
    throw new Error("Trajectory points are required - cannot validate narrative without trajectory");
  }
  
  if (trajectoryPoints.length !== 8) {
    console.warn(`⚠️ Trajectory has ${trajectoryPoints.length} points, expected 8. Using as-is but this may cause dashboard issues.`);
  }

  // Use provided trajectory points (either LLM-generated or deterministic fallback)
  return {
    whereYouAreNow: {
      headline: whereYouAreNow.headline || "Understanding Your Current Travel Health Patterns",
      body: whereYouAreNow.body || "Based on your responses, we've identified several interconnected patterns affecting your health during travel and transitions.",
      patternSummaryBullets: Array.isArray(whereYouAreNow.patternSummaryBullets)
        ? whereYouAreNow.patternSummaryBullets
        : [],
    },
    yourPersonalPlan: {
      headline: yourPersonalPlan.headline || "Your Personalized Travel Health Plan",
      body: yourPersonalPlan.body || "Your plan is designed to address the key areas where support can make the most difference during travel and transitions.",
      planPillars: Array.isArray(yourPersonalPlan.planPillars)
        ? yourPersonalPlan.planPillars
        : [],
    },
    trajectory: trajectoryPoints, // Always use provided trajectory (should never be empty)
  };
}

/**
 * Main function to build narrative blocks for travelers
 */
export async function buildTravelerNarrativeBlocks(params: {
  keyMetrics: TravelerKeyMetricResult[];
  weeklyActions: TravelerWeeklyAction[];
  surveyAnswers: TravelerSurveyAnswers;
  ruleThemes?: Array<{ category: string; theme: string; weight: number }>;
  patternSummary?: TravelerPatternSummary; // Optional: if provided, use it instead of deriving
  trajectoryPoints?: TrajectoryPoint[]; // Optional: if provided, use it instead of generating
}): Promise<NarrativeBlocks> {
  // Step 1: Derive pattern summary (use provided or derive from legacy method)
  let patternSummary: TravelerPatternSummary;
  if (params.patternSummary) {
    patternSummary = params.patternSummary;
    console.log("📊 Using provided pattern summary from orchestrator");
  } else {
    // Fallback to legacy method for backward compatibility
    patternSummary = deriveTravelerPatternSummaryLegacy(
      params.keyMetrics,
      params.weeklyActions,
      params.surveyAnswers
    );
    console.log("📊 Using legacy pattern summary derivation");
  }

  // Step 2: Use provided trajectory or generate deterministic trajectory
  let trajectoryPoints: TrajectoryPoint[];
  if (params.trajectoryPoints && params.trajectoryPoints.length > 0) {
    trajectoryPoints = params.trajectoryPoints;
    console.log("📊 Using provided trajectory from orchestrator:", trajectoryPoints.length, "points");
  } else {
    trajectoryPoints = generateTravelerTrajectory(
      params.keyMetrics,
      patternSummary,
      params.weeklyActions
    );
    console.log("📊 Generated trajectory:", trajectoryPoints.length, "points");
  }

  // Step 3: Build plan pillars (merge rule themes if provided)
  // Note: This is now also done in orchestrator, but we keep it here for backward compatibility
  // The orchestrator should pass planPillarThemes in signals, but we'll use this as fallback
  const planPillars = travelerWeeklyActionsToPillars(params.weeklyActions, params.ruleThemes);
  
  console.log("📊 Plan pillars built:", planPillars.length, "pillars");
  console.log("📊 Rule themes provided:", params.ruleThemes?.length || 0);

  // Step 4: Get metric bands (no scores)
  const metricBands = travelerKeyMetricsToBands(params.keyMetrics);

  // Step 5: Get travel tags
  const travelTags = getTravelerTags(params.surveyAnswers);

  // Step 6: Build prompt
  // Use planPillars which already includes rule themes merged with action themes
  console.log("📊 Building LLM prompt with plan pillars:", planPillars.map(p => p.category));
  const prompt = buildTravelerNarrativePrompt({
    travelTags,
    metricBands,
    patterns: patternSummary.tags.map(t => ({
      tag: t,
      severity: patternSummary.severity[t] ?? 0,
    })),
    dominantDomains: patternSummary.dominantDomains,
    planPillars, // This includes rule-driven themes merged with action themes
  });

  // Step 7: Call LLM
  let narrativeJson: any = null;
  try {
    console.log("🤖 Calling OpenAI for traveler narrative...");
    console.log("📋 Prompt length:", prompt.length);
    console.log("📋 Travel tags:", travelTags);
    console.log("📋 Metric bands:", metricBands);
    console.log("📋 Pattern tags:", patternSummary.tags);
    console.log("📋 Dominant domains:", patternSummary.dominantDomains);
    console.log("📋 Plan pillars (personalized):", JSON.stringify(planPillars, null, 2));
    console.log("📋 Plan pillar categories:", planPillars.map(p => `${p.category}: [${p.bulletThemes.join(', ')}]`));
    
    narrativeJson = await callLLMForJson(prompt);
    console.log("✅ LLM response received:", {
      hasWhereYouAreNow: !!narrativeJson?.whereYouAreNow,
      hasYourPersonalPlan: !!narrativeJson?.yourPersonalPlan,
      planPillarsCount: narrativeJson?.yourPersonalPlan?.planPillars?.length || 0,
      planPillarTitles: narrativeJson?.yourPersonalPlan?.planPillars?.map((p: any) => p.title) || [],
      planPillarDescriptions: narrativeJson?.yourPersonalPlan?.planPillars?.map((p: any) => p.description?.substring(0, 50)) || [],
      trajectoryLength: narrativeJson?.trajectory?.length || 0,
      rawResponse: JSON.stringify(narrativeJson).substring(0, 500),
    });
    
    // Check if LLM generated personalized content
    if (narrativeJson?.yourPersonalPlan?.planPillars) {
      const isGeneric = narrativeJson.yourPersonalPlan.planPillars.some((p: any) => 
        p.title === "Sleep & Circadian" || 
        p.title === "Movement & Circulation" ||
        p.description?.includes("Focus on") && !p.description?.includes("sleep_anchors") && !p.description?.includes("circulation_breaks")
      );
      if (isGeneric) {
        console.warn("⚠️ LLM generated generic plan pillars - may need better prompt or fallback to personalized generation");
      } else {
        console.log("✅ LLM generated personalized plan pillars");
      }
    }
    
    // Validate that trajectory was generated by LLM
    if (!narrativeJson?.trajectory || !Array.isArray(narrativeJson.trajectory) || narrativeJson.trajectory.length !== 8) {
      console.warn("⚠️ LLM did not generate complete trajectory, using deterministic trajectory");
      console.warn("Trajectory received:", narrativeJson?.trajectory?.length || 0, "points");
      // Will use deterministic trajectory as fallback
    }
  } catch (error) {
    console.error("❌ Failed to generate narrative from LLM, using fallback:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    // Fallback to basic structure if LLM fails - USE PERSONALIZED DATA
    console.warn("⚠️ LLM call failed, creating personalized fallback from rules/patterns");
    narrativeJson = {
      whereYouAreNow: {
        headline: "Understanding Your Current Travel Health Patterns",
        body: `Based on your responses, we've identified several interconnected patterns affecting your health during travel and transitions. Your ${patternSummary.dominantDomains.slice(0, 2).join(" and ")} systems appear most affected. These patterns can impact your energy, sleep, stress regulation, and physical comfort during and after trips.`,
        patternSummaryBullets: patternSummary.tags.slice(0, 5).map(t => {
          const tagName = t.replace(/_/g, " ");
          return tagName.charAt(0).toUpperCase() + tagName.slice(1);
        }),
      },
      yourPersonalPlan: {
        headline: "Your Personalized Travel Health Plan",
        body: `Your plan is designed to address the key areas where support can make the most difference during travel and transitions. Based on your specific patterns (${patternSummary.dominantDomains.slice(0, 2).join(" and ")}), we've identified ${planPillars.length} priority areas.`,
        planPillars: planPillars.map(p => {
          // Create personalized title from bulletThemes
          let title: string;
          if (p.bulletThemes.length > 0) {
            const firstTheme = p.bulletThemes[0].replace(/_/g, " ");
            const themeToTitle: Record<string, string> = {
              "sleep anchors": "Stabilize sleep across time zones",
              "sleep_anchors": "Stabilize sleep across time zones",
              "circulation breaks": "Maintain mobility on long trips",
              "circulation_breaks": "Maintain mobility on long trips",
              "recovery practices": "Protect energy during travel",
              "recovery_practices": "Protect energy during travel",
              "micronutrient density": "Support immune resilience",
              "micronutrient_density": "Support immune resilience",
              "travel sleep prep": "Prepare for time zone transitions",
              "travel_sleep_prep": "Prepare for time zone transitions",
            };
            title = themeToTitle[firstTheme.toLowerCase()] || 
                    (firstTheme.charAt(0).toUpperCase() + firstTheme.slice(1));
          } else {
            title = p.category.charAt(0).toUpperCase() + p.category.slice(1).replace(/_/g, " ");
          }
          
          const themes = p.bulletThemes.length > 0 
            ? p.bulletThemes.join(", ")
            : `${p.category.toLowerCase()} interventions`;
          return {
            title,
            description: `Focus on ${themes} to support your travel health and address ${patternSummary.dominantDomains[0] || "key"} patterns.`
          };
        }),
      },
      trajectory: [], // Will be replaced with deterministic trajectory below
    };
  }
  
  // Ensure narrativeJson is never null
  if (!narrativeJson) {
    console.warn("⚠️ narrativeJson is null, creating default structure");
    narrativeJson = {
      whereYouAreNow: {
        headline: "Understanding Your Current Travel Health Patterns",
        body: "Based on your responses, we've identified several interconnected patterns affecting your health during travel and transitions.",
        patternSummaryBullets: patternSummary.tags.slice(0, 5).map(t => `Pattern: ${t.replace(/_/g, " ")}`),
      },
      yourPersonalPlan: {
        headline: "Your Personalized Travel Health Plan",
        body: `Your plan is designed to address the key areas where support can make the most difference during travel and transitions. Based on your specific patterns (${patternSummary.dominantDomains.slice(0, 2).join(" and ")}), we've identified ${planPillars.length} priority areas.`,
        planPillars: planPillars.map(p => {
          // Create personalized title from bulletThemes
          let title: string;
          if (p.bulletThemes.length > 0) {
            const firstTheme = p.bulletThemes[0].replace(/_/g, " ");
            const themeToTitle: Record<string, string> = {
              "sleep anchors": "Stabilize sleep across time zones",
              "sleep_anchors": "Stabilize sleep across time zones",
              "circulation breaks": "Maintain mobility on long trips",
              "circulation_breaks": "Maintain mobility on long trips",
              "recovery practices": "Protect energy during travel",
              "recovery_practices": "Protect energy during travel",
              "micronutrient density": "Support immune resilience",
              "micronutrient_density": "Support immune resilience",
              "travel sleep prep": "Prepare for time zone transitions",
              "travel_sleep_prep": "Prepare for time zone transitions",
            };
            title = themeToTitle[firstTheme.toLowerCase()] || 
                    (firstTheme.charAt(0).toUpperCase() + firstTheme.slice(1));
          } else {
            title = p.category.charAt(0).toUpperCase() + p.category.slice(1).replace(/_/g, " ");
          }
          
          const themes = p.bulletThemes.length > 0 
            ? p.bulletThemes.join(", ")
            : `${p.category.toLowerCase()} interventions`;
          return {
            title,
            description: `Focus on ${themes} to support your travel health and address ${patternSummary.dominantDomains[0] || "key"} patterns.`
          };
        }),
      },
      trajectory: [], // Will be replaced with deterministic trajectory below
    };
  }

  // Step 8: Validate and return
  // Priority: 1) Provided trajectoryPoints, 2) LLM-generated, 3) Deterministic fallback
  let finalTrajectory: TrajectoryPoint[] = trajectoryPoints; // Start with provided/deterministic
  
  // If LLM provided a valid trajectory (8 points), use it (unless trajectoryPoints was explicitly provided)
  if (!params.trajectoryPoints && 
      narrativeJson.trajectory && 
      Array.isArray(narrativeJson.trajectory) && 
      narrativeJson.trajectory.length === 8) {
    finalTrajectory = narrativeJson.trajectory.map((t: any) => ({
      horizonMonths: t.horizonMonths as 3 | 6 | 9 | 12,
      lane: t.lane as "without_plan" | "with_plan",
      title: t.title || "",
      description: t.description || "",
      confidence: (t.confidence === "LOW" || t.confidence === "MED" || t.confidence === "HIGH") 
        ? t.confidence 
        : "MED" as const,
      drivers: Array.isArray(t.drivers) 
        ? t.drivers.map((d: any) => ({
            metricId: d.metricId || "",
            driverTag: d.driverTag || "",
          }))
        : [],
    }));
    console.log("📊 Using LLM-generated trajectory");
  }
  
  // Ensure we always have trajectory (should be 8 points: 4 horizons × 2 lanes)
  if (finalTrajectory.length === 0) {
    console.warn("⚠️ No trajectory points available, generating fallback");
    finalTrajectory = generateTravelerTrajectory(
      params.keyMetrics,
      patternSummary,
      params.weeklyActions
    );
  }
  
  console.log("📊 buildTravelerNarrativeBlocks: Final trajectory length:", finalTrajectory.length);

  let validatedNarrative: NarrativeBlocks;
  try {
    validatedNarrative = validateTravelerNarrative(narrativeJson, finalTrajectory, planPillars, patternSummary);
  } catch (validationError) {
    console.error("❌ Error validating narrative, using fallback:", validationError);
    // Create a complete fallback narrative
    validatedNarrative = {
      whereYouAreNow: {
        headline: "Understanding Your Current Travel Health Patterns",
        body: "Based on your responses, we've identified several interconnected patterns affecting your health during travel and transitions. These patterns can impact your energy, sleep, stress regulation, and physical comfort during and after trips.",
        patternSummaryBullets: patternSummary.tags.slice(0, 5).map(t => {
          const tagName = t.replace(/_/g, " ");
          return tagName.charAt(0).toUpperCase() + tagName.slice(1);
        }),
      },
      yourPersonalPlan: {
        headline: "Your Personalized Travel Health Plan",
        body: `Your plan is designed to address the key areas where support can make the most difference during travel and transitions. Based on your specific patterns (${patternSummary.dominantDomains.slice(0, 2).join(" and ")}), we've identified ${planPillars.length} priority areas.`,
        planPillars: planPillars.map(p => {
          // Create personalized title from bulletThemes
          let title: string;
          if (p.bulletThemes.length > 0) {
            const firstTheme = p.bulletThemes[0].replace(/_/g, " ");
            const themeToTitle: Record<string, string> = {
              "sleep anchors": "Stabilize sleep across time zones",
              "sleep_anchors": "Stabilize sleep across time zones",
              "circulation breaks": "Maintain mobility on long trips",
              "circulation_breaks": "Maintain mobility on long trips",
              "recovery practices": "Protect energy during travel",
              "recovery_practices": "Protect energy during travel",
              "micronutrient density": "Support immune resilience",
              "micronutrient_density": "Support immune resilience",
              "travel sleep prep": "Prepare for time zone transitions",
              "travel_sleep_prep": "Prepare for time zone transitions",
            };
            title = themeToTitle[firstTheme.toLowerCase()] || 
                    (firstTheme.charAt(0).toUpperCase() + firstTheme.slice(1));
          } else {
            title = p.category.charAt(0).toUpperCase() + p.category.slice(1).replace(/_/g, " ");
          }
          
          const themes = p.bulletThemes.length > 0 
            ? p.bulletThemes.join(", ")
            : `${p.category.toLowerCase()} interventions`;
          return {
            title,
            description: `Focus on ${themes} to support your travel health and address ${patternSummary.dominantDomains[0] || "key"} patterns.`
          };
        }),
      },
      trajectory: finalTrajectory.length > 0 ? finalTrajectory : (trajectoryPoints.length > 0 ? trajectoryPoints : generateTravelerTrajectory(params.keyMetrics, patternSummary, params.weeklyActions)),
    };
  }
  
  // Final validation - ensure trajectory is always present and has 8 points
  if (!validatedNarrative.trajectory || validatedNarrative.trajectory.length === 0) {
    console.warn("⚠️ Trajectory is missing or empty, using generated trajectory");
    validatedNarrative.trajectory = trajectoryPoints;
  }
  
  // Ensure trajectory has exactly 8 points (4 horizons × 2 lanes)
  if (validatedNarrative.trajectory.length !== 8) {
    console.warn(`⚠️ Trajectory has ${validatedNarrative.trajectory.length} points, expected 8. Using generated trajectory.`);
    validatedNarrative.trajectory = trajectoryPoints;
  }
  
  console.log("✅ Traveler narrative built:", {
    hasWhereYouAreNow: !!validatedNarrative.whereYouAreNow,
    hasYourPersonalPlan: !!validatedNarrative.yourPersonalPlan,
    trajectoryLength: validatedNarrative.trajectory.length,
    trajectoryPoints: validatedNarrative.trajectory.map(t => ({
      horizon: t.horizonMonths,
      lane: t.lane,
      hasTitle: !!t.title,
      hasDescription: !!t.description,
    })),
    whereYouAreNowHeadline: validatedNarrative.whereYouAreNow.headline,
    yourPersonalPlanHeadline: validatedNarrative.yourPersonalPlan.headline,
    whereYouAreNowBullets: validatedNarrative.whereYouAreNow.patternSummaryBullets.length,
    planPillarsCount: validatedNarrative.yourPersonalPlan.planPillars.length,
  });
  
  // Final validation - ensure we're returning a valid NarrativeBlocks object
  if (!validatedNarrative || !validatedNarrative.whereYouAreNow || !validatedNarrative.yourPersonalPlan) {
    console.error("🚨 CRITICAL: Invalid narrative structure before return!");
    console.error("Validated narrative:", JSON.stringify(validatedNarrative, null, 2));
    throw new Error("Invalid narrative structure - missing required fields");
  }
  
  if (!validatedNarrative.trajectory || validatedNarrative.trajectory.length === 0) {
    console.error("🚨 CRITICAL: Trajectory is missing from narrative!");
    throw new Error("Invalid narrative structure - trajectory is required");
  }
  
  console.log("✅ Returning narrative from buildTravelerNarrativeBlocks with trajectory");
  return validatedNarrative;
}






