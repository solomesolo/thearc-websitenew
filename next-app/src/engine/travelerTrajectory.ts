import { TravelerKeyMetricResult, TravelerWeeklyAction, TrajectoryPoint, TrajectoryHorizon, TrajectoryLane } from './types';
import { TravelerPatternSummary } from './travelerPatterns';

/**
 * Calculate confidence level based on convergence of signals for travelers
 */
function calculateTravelerConfidence(patternSummary: TravelerPatternSummary, keyMetrics: TravelerKeyMetricResult[]): "LOW" | "MED" | "HIGH" {
  const activeTags = patternSummary.tags.filter(t => patternSummary.severity[t] >= 2);
  const domainCount = patternSummary.dominantDomains.length;
  const highBandMetrics = keyMetrics.filter(m => 
    m.band === "HIGH" || m.band === "POOR" || m.band === "ELEVATED"
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
 * Generate trajectory point for a specific horizon and lane (traveler-specific)
 */
function generateTravelerTrajectoryPoint(
  horizonMonths: TrajectoryHorizon,
  lane: TrajectoryLane,
  keyMetrics: TravelerKeyMetricResult[],
  patternSummary: TravelerPatternSummary,
  weeklyActions: TravelerWeeklyAction[],
  confidence: "LOW" | "MED" | "HIGH",
  roadmapModifiers?: Record<string, string>
): TrajectoryPoint {
  const dominantDomains = patternSummary.dominantDomains || [];
  const activeTags = patternSummary.tags.filter(t => patternSummary.severity[t] >= 2);
  
  // Helper to convert cardId to user-friendly name
  const cardIdToName = (cardId: string): string => {
    const mapping: Record<string, string> = {
      "sleep_circadian": "sleep and circadian rhythm",
      "movement_circulation": "movement and circulation",
      "nutrition_hydration": "nutrition and hydration",
      "stress_regulation": "stress regulation",
      "immune_gut": "immune and gut resilience",
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
    // Without-plan trajectory (negative, non-alarming, travel-specific)
    switch (horizonMonths) {
      case 3:
        title = "Travel strain patterns may intensify";
        description = `Without targeted support, the ${domainPair} patterns affecting your travel resilience may become more persistent. The compounding effects of disrupted routines, time zone changes, and extended sitting can make recovery harder between trips.`;
        break;
      case 6:
        title = "Reduced travel resilience and increased recovery time";
        description = `Over the next 6 months, you may notice it takes longer to recover from trips, with ${primaryDomain} strain becoming more predictable. The cumulative impact of travel stressors can reduce your baseline capacity, making each subsequent trip more challenging.`;
        break;
      case 9:
        title = "Travel patterns may become default stress response";
        description = `By 9 months, without intervention, travel-related strain may become your body's default response. The ${domainPair} systems may show less flexibility during and after travel, making it harder to maintain stability across time zones and routines.`;
        break;
      case 12:
        title = "Lower baseline capacity for travel demands";
        description = `At 12 months, you may experience reduced capacity for managing travel demands, with increased sensitivity to time zone changes, long flights, and disrupted routines. The ${primaryDomain} system may require more support to maintain stability during frequent travel.`;
        break;
    }
  } else {
    // With-plan trajectory (positive, tied to action pillars, travel-specific)
    const planPillars = weeklyActions.map(a => cardIdToName(a.cardId));
    const primaryPillars = planPillars.slice(0, 3);
    const firstPillar = primaryPillars[0] || "key interventions";
    const secondPillar = primaryPillars[1] || firstPillar;
    
    // Apply roadmap modifiers if available
    const sleepTrajectory = roadmapModifiers?.sleepTrajectory;
    const energyTrajectory = roadmapModifiers?.energyTrajectory;
    const mobilityTrajectory = roadmapModifiers?.mobilityTrajectory;
    
    // Get active pattern tags for personalization
    const activePatternTags = activeTags.slice(0, 3).map(t => t.replace(/_/g, " "));
    
    switch (horizonMonths) {
      case 3:
        title = "Improved travel recovery and stability";
        let desc3 = `With consistent focus on ${primaryPillars.length > 0 ? primaryPillars.join(", ") : "key"} interventions, you should begin to see improved recovery between trips and more stable ${primaryDomain} patterns during travel.`;
        if (sleepTrajectory === "volatile") {
          desc3 += " Better sleep anchors and stress management can make time zone transitions smoother.";
        } else if (activePatternTags.length > 0) {
          desc3 += ` Addressing ${activePatternTags[0]} and related patterns can help stabilize your ${primaryDomain} system during transitions.`;
        } else {
          desc3 += " Better sleep anchors and stress management can make time zone transitions smoother.";
        }
        description = desc3;
        break;
      case 6:
        title = "Enhanced travel resilience and faster adaptation";
        const patternRef6 = activePatternTags.length > 0 ? activePatternTags[0] : primaryDomain;
        description = `By 6 months, your travel resilience should improve, with faster adaptation to time zones and reduced impact from long flights. The ${firstPillar} and ${secondPillar} pillars will have created positive patterns that support your ${primaryDomain} system during travel, helping to stabilize ${patternRef6} patterns.`;
        break;
      case 9:
        title = "Sustained travel stability and confidence";
        const patternRef9 = activePatternTags.length > 1 
          ? activePatternTags.slice(0, 2).join(" and ") 
          : domainPair;
        description = `At 9 months, you'll likely experience greater stability during travel and confidence in managing trips. The integrated approach across ${primaryPillars.length > 0 ? primaryPillars.join(", ") : "key areas"} will have created sustainable patterns that support your ${patternRef9} systems across different time zones and routines.`;
        break;
      case 12:
        title = "Mastery of travel health patterns";
        const patternRef12 = activePatternTags.length > 0 ? activePatternTags[0] : primaryDomain;
        description = `By 12 months, you should have established mastery of travel health patterns, with consistent stability across trips. The comprehensive plan across all pillars will have created new default modes that support long-term resilience in your ${primaryDomain} and related systems, with ${patternRef12} patterns becoming more predictable, regardless of travel frequency.`;
        break;
    }
  }

  // Add drivers from key metrics
  keyMetrics.forEach(metric => {
    if (metric.band === "HIGH" || metric.band === "POOR" || metric.band === "ELEVATED") {
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
      (d === "sleep" && (tag.includes("sleep") || tag.includes("circadian"))) ||
      (d === "stress" && tag.includes("stress")) ||
      (d === "energy" && tag.includes("energy"))
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
 * Generate all trajectory points for all horizons and lanes (traveler-specific)
 * Can use roadmap modifiers from rules to customize trajectory
 */
export function generateTravelerTrajectory(
  keyMetrics: TravelerKeyMetricResult[],
  patternSummary: TravelerPatternSummary,
  weeklyActions: TravelerWeeklyAction[],
  roadmapModifiers?: Record<string, string>
): TrajectoryPoint[] {
  const confidence = calculateTravelerConfidence(patternSummary, keyMetrics);
  const horizons: TrajectoryHorizon[] = [3, 6, 9, 12];
  const lanes: TrajectoryLane[] = ["without_plan", "with_plan"];
  
  const trajectory: TrajectoryPoint[] = [];
  
  for (const horizon of horizons) {
    for (const lane of lanes) {
      trajectory.push(
        generateTravelerTrajectoryPoint(horizon, lane, keyMetrics, patternSummary, weeklyActions, confidence, roadmapModifiers)
      );
    }
  }
  
  return trajectory;
}






