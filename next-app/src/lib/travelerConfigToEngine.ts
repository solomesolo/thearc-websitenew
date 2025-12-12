/**
 * Convert traveler questionnaire config JSON to engine format
 */

import config from './traveler-questionnaire-config.json';
import { QuestionnaireConfig, QuestionConfig, QuestionOptionWithComposites, CompositeWeight } from './arcTravellerEngine';

/**
 * Convert the JSON config to the engine's QuestionnaireConfig format
 */
export function convertConfigToEngineFormat(): QuestionnaireConfig {
  const scales: Record<string, string[]> = {};
  
  // Copy scales from config and normalize names
  Object.entries(config.scales).forEach(([key, value]) => {
    scales[key] = value as string[];
  });
  
  // Ensure all expected scales exist
  // Map "impact_5" to match expected format if needed
  if (!scales["impact_5"] && scales["frequency_5"]) {
    // Use frequency_5 as fallback if impact_5 doesn't exist
    scales["impact_5"] = scales["frequency_5"];
  }

  // Convert questions
  const questions: QuestionConfig[] = config.questions.map((q: any) => {
    const question: QuestionConfig = {
      id: q.id,
      section: q.section,
      text: q.text,
      type: q.type,
      scaleId: q.scaleId,
      reverse: q.reverse,
      isImmediateConcern: q.isImmediateConcern,
      setsFlag: q.setsFlag,
    };

    // Convert composites
    if (q.composites && Array.isArray(q.composites)) {
      question.composites = q.composites.map((c: any) => ({
        name: c.name as any,
        weight: c.weight,
      }));
    }

    // Convert options with composites (for multi_select)
    if (q.options && Array.isArray(q.options)) {
      question.options = q.options.map((opt: any) => {
        const option: QuestionOptionWithComposites = {
          label: typeof opt === 'string' ? opt : opt.label,
        };

        // Handle composites in options
        if (opt.composites && Array.isArray(opt.composites)) {
          option.composites = opt.composites.map((c: any) => ({
            name: c.name as any,
            weight: c.weight,
          }));
        }

        return option;
      });
    } else if (q.type === 'single_choice' && Array.isArray(q.options)) {
      // Simple string array options
      question.options = q.options.map((opt: string) => ({
        label: opt,
      }));
    }

    return question;
  });

  return {
    scales,
    questions,
  };
}

