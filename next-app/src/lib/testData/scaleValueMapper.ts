/**
 * Scale Value Mapper
 * 
 * Maps string labels to numeric scale values (0-4) for test data.
 * Scale questions use 5 steps: 0 (min) to 4 (max)
 */

export type ScaleLabel = 
  | "Never" 
  | "Rarely" 
  | "Sometimes" 
  | "Often" 
  | "Almost always"
  | "Always"
  | "Not at all"
  | "Extremely"
  | "Daily";

/**
 * Map scale label strings to numeric values (0-4)
 */
export function mapScaleLabelToValue(label: string): number {
  const labelLower = label.toLowerCase().trim();
  
  // Never / Not at all = 0
  if (labelLower === "never" || labelLower === "not at all") {
    return 0;
  }
  
  // Rarely = 1
  if (labelLower === "rarely") {
    return 1;
  }
  
  // Sometimes = 2
  if (labelLower === "sometimes") {
    return 2;
  }
  
  // Often = 3
  if (labelLower === "often") {
    return 3;
  }
  
  // Almost always / Always / Extremely / Daily = 4
  if (labelLower === "almost always" || 
      labelLower === "always" || 
      labelLower === "extremely" ||
      labelLower === "daily") {
    return 4;
  }
  
  // Default to middle value if unknown
  console.warn(`Unknown scale label: "${label}", defaulting to 2 (Sometimes)`);
  return 2;
}

/**
 * Convert test answers with string scale values to numeric scale values
 */
export function convertScaleValuesToNumeric(answers: Record<string, any>): Record<string, any> {
  const converted: Record<string, any> = { ...answers };
  
  // Scale question IDs (questions that use scale type)
  const scaleQuestionIds = [
    'E1', 'E2', // Energy
    'S1', 'S2', 'S4', 'S5', // Sleep
    'ST1', 'ST2', 'ST3', 'ST4', // Stress
    'M3', 'M4', // Movement
    'G1', 'G2', // Digestive
    'N1', 'N3', // Nutrition
  ];
  
  scaleQuestionIds.forEach((questionId) => {
    if (questionId in converted) {
      const value = converted[questionId];
      // If it's a string (not already a number), convert it
      if (typeof value === 'string' && isNaN(Number(value))) {
        converted[questionId] = mapScaleLabelToValue(value);
      }
    }
  });
  
  return converted;
}






