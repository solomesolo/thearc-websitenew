import { KeyMetricResult, WeeklyAction, TrajectoryPoint, TrajectoryHorizon, TrajectoryLane, MetricBand } from './types';
import { PatternSummary } from './patterns';

/**
 * Calculate confidence level based on convergence of signals
 */
function calculateConfidence(patternSummary: PatternSummary, keyMetrics: KeyMetricResult[]): "LOW" | "MED" | "HIGH" {
  const activeTags = patternSummary.tags.filter(t => patternSummary.severity[t] >= 2);
  const domainCount = patternSummary.dominantDomains.length;
  const highBandMetrics = keyMetrics.filter(m => 
    m.band === "HIGH" || m.band === "POOR" || m.band === "DYSREGULATED"
  ).length;

  // HIGH: ≥3 domains OR ≥5 tags active OR 2+ metrics in highest band
  if (domainCount >= 3 || activeTags.length >= 5 || highBandMetrics >= 2) {
    return "HIGH";
  }
  
  // MED: 2 domains OR 3–4 tags
  if (domainCount >= 2 || activeTags.length >= 3) {
    return "MED";
  }
  
  // LOW: 1 domain OR 1–2 tags
  return "LOW";
}

/**
 * Generate trajectory point for a specific horizon and lane
 */
function generateTrajectoryPoint(
  horizonMonths: TrajectoryHorizon,
  lane: TrajectoryLane,
  keyMetrics: KeyMetricResult[],
  patternSummary: PatternSummary,
  weeklyActions: WeeklyAction[],
  confidence: "LOW" | "MED" | "HIGH"
): TrajectoryPoint {
  const dominantDomains = patternSummary.dominantDomains || [];
  const activeTags = patternSummary.tags.filter(t => patternSummary.severity[t] >= 2);
  
  // Helper to convert cardId to user-friendly name
  const cardIdToName = (cardId: string): string => {
    const mapping: Record<string, string> = {
      "nutrition": "nutrition",
      "supplements": "supplements",
      "movement": "movement and recovery",
      "screenings": "screenings and checks",
      "environment": "environment",
      "red_flags": "safety and red flags",
    };
    return mapping[cardId] || cardId.replace(/_/g, " ");
  };
  
  // Ensure we have at least one domain
  const primaryDomain = dominantDomains[0] || "key systems";
  const secondaryDomain = dominantDomains[1] || primaryDomain;
  const domainPair = dominantDomains.length >= 2 
    ? `${dominantDomains[0]} and ${dominantDomains[1]}`
    : primaryDomain;
  
  let title = "";
  let description = "";
  const drivers: Array<{ metricId: string; driverTag: string }> = [];

  if (lane === "without_plan") {
    // Without-plan trajectory (negative, non-alarming)
    switch (horizonMonths) {
      case 3:
        title = "Current patterns may become more persistent";
        description = `Without targeted support, the ${domainPair} patterns you're experiencing may become more frequent and harder to reset. The feedback loops between these systems can reinforce each other, making it more challenging to break cycles naturally.`;
        break;
      case 6:
        title = "Reduced resilience and increased variability";
        description = `Over the next 6 months, you may notice reduced baseline capacity and more variability in how you respond to daily stressors. The compounding effects of ${primaryDomain} strain can make recovery less predictable, with symptoms becoming more reactive to triggers.`;
        break;
      case 9:
        title = "Symptoms may become default mode under stress";
        description = `By 9 months, without intervention, the current patterns may become your body's default response under stress. The ${domainPair} systems may show less flexibility, making it harder to bounce back from challenging periods.`;
        break;
      case 12:
        title = "Lower baseline capacity and increased sensitivity";
        description = `At 12 months, you may experience a lower baseline capacity for managing daily demands, with increased sensitivity to triggers that previously didn't affect you as much. The ${primaryDomain} system may require more support to maintain stability.`;
        break;
    }
  } else {
    // With-plan trajectory (positive, tied to action pillars)
    const planPillars = weeklyActions.map(a => cardIdToName(a.cardId));
    const primaryPillars = planPillars.slice(0, 3);
    const firstPillar = primaryPillars[0] || "key interventions";
    const secondPillar = primaryPillars[1] || firstPillar;
    
    switch (horizonMonths) {
      case 3:
        title = "Stabilization and fewer spikes";
        description = `With consistent focus on ${primaryPillars.length > 0 ? primaryPillars.join(", ") : "key"} interventions, you should begin to see stabilization in your ${primaryDomain} patterns. Fewer spikes and more predictable responses to daily stressors become possible as your systems start to reset.`;
        break;
      case 6:
        title = "Improved baseline and easier recovery";
        description = `By 6 months, your baseline capacity should improve, with easier recovery from challenging periods. The ${firstPillar} and ${secondPillar} pillars will have created positive feedback loops, making your ${primaryDomain} system more resilient.`;
        break;
      case 9:
        title = "Resilience and consistency";
        description = `At 9 months, you'll likely experience greater resilience and consistency in how your body responds to stress. The integrated approach across ${primaryPillars.length > 0 ? primaryPillars.join(", ") : "key areas"} will have created sustainable patterns that support your ${domainPair} systems.`;
        break;
      case 12:
        title = "Sustained pattern control and confidence";
        description = `By 12 months, you should have sustained pattern control and increased confidence in managing your health. The comprehensive plan across all pillars will have established new default modes that support long-term stability in your ${primaryDomain} and related systems.`;
        break;
    }
  }

  // Add drivers from key metrics
  keyMetrics.forEach(metric => {
    if (metric.band === "HIGH" || metric.band === "POOR" || metric.band === "DYSREGULATED") {
      drivers.push({
        metricId: metric.id,
        driverTag: metric.band.toLowerCase(),
      });
    }
  });

  // Add drivers from active pattern tags
  activeTags.slice(0, 3).forEach(tag => {
    const domain = patternSummary.dominantDomains.find(d => 
      tag.includes(d) || 
      (d === "sleep" && (tag.includes("sleep") || tag.includes("wake"))) ||
      (d === "stress" && tag.includes("stress"))
    );
    if (domain) {
      drivers.push({
        metricId: patternSummary.dominantDomains[0] || "stress_load",
        driverTag: tag,
      });
    }
  });

  return {
    horizonMonths,
    lane,
    title,
    description,
    confidence,
    drivers: drivers.slice(0, 5), // Limit to top 5 drivers
  };
}

/**
 * Generate all trajectory points for all horizons and lanes
 */
export function generateTrajectory(
  keyMetrics: KeyMetricResult[],
  patternSummary: PatternSummary,
  weeklyActions: WeeklyAction[]
): TrajectoryPoint[] {
  const confidence = calculateConfidence(patternSummary, keyMetrics);
  const horizons: TrajectoryHorizon[] = [3, 6, 9, 12];
  const lanes: TrajectoryLane[] = ["without_plan", "with_plan"];
  
  const trajectory: TrajectoryPoint[] = [];
  
  for (const horizon of horizons) {
    for (const lane of lanes) {
      trajectory.push(
        generateTrajectoryPoint(horizon, lane, keyMetrics, patternSummary, weeklyActions, confidence)
      );
    }
  }
  
  return trajectory;
}






