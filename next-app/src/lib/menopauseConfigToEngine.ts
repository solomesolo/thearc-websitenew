/**
 * Convert menopause/women questionnaire config JSON to engine format
 */

import config from './arc_questionnaire_config.json';
import { QuestionnaireConfig, QuestionConfig, QuestionOptionWithComposites, CompositeWeight } from './arcMenopauseEngine';

/**
 * Convert the JSON config to the engine's QuestionnaireConfig format
 */
export function convertMenopauseConfigToEngineFormat(): QuestionnaireConfig {
  const scales: Record<string, string[]> = {};
  
  // Copy scales from config and normalize names
  Object.entries(config.scales).forEach(([key, value]) => {
    scales[key] = value as string[];
  });
  
  // Map scale names if needed (e.g., "frequency" -> "frequency_5")
  if (scales["frequency"] && !scales["frequency_5"]) {
    scales["frequency_5"] = scales["frequency"];
  }
  if (scales["severity"] && !scales["impact_5"]) {
    scales["impact_5"] = scales["severity"];
  }
  if (scales["consistency"] && !scales["consistency_5"]) {
    scales["consistency_5"] = scales["consistency"];
  }

  // Convert questions
  const questions: QuestionConfig[] = config.questions.map((q: any) => {
    const question: QuestionConfig = {
      id: q.id,
      section: q.section,
      text: q.text,
      type: q.type || "single_choice", // Default to single_choice if not specified
      scaleId: q.scaleId,
      reverse: q.reverse,
      isImmediateConcern: q.isImmediateConcern,
      setsFlag: q.setsFlag,
    };

    // Convert composites - map MENO and SUP to appropriate composites
    if (q.composites && Array.isArray(q.composites)) {
      const mappedComposites: CompositeWeight[] = [];
      
      q.composites.forEach((c: any) => {
        // Map MENO (menopause-specific) to sleep and stress composites
        if (c.name === "MENO") {
          // MENO affects sleep, stress, and cognitive recovery
          mappedComposites.push(
            { name: "SLP" as any, weight: c.weight },
            { name: "SLD" as any, weight: c.weight * 0.5 } // Partial stress contribution
          );
        }
        // Map SUP (supplement gap) - skip as it's not a composite score
        else if (c.name === "SUP") {
          // Skip SUP - it's used for gap scoring, not composite scoring
        }
        // Keep other composites as-is
        else {
          mappedComposites.push({
            name: c.name as any,
            weight: c.weight,
          });
        }
      });
      
      if (mappedComposites.length > 0) {
        question.composites = mappedComposites;
      }
    }

    // Convert options with composites (for multi_select)
    if (q.options && Array.isArray(q.options)) {
      question.options = q.options.map((opt: any) => {
        const option: QuestionOptionWithComposites = {
          label: typeof opt === "string" ? opt : opt.label,
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
    } else if (question.type === 'single_choice' && q.scaleId && scales[q.scaleId]) {
      // For single_choice questions, use scale values as options if not provided
      if (!question.options) {
        question.options = scales[q.scaleId].map((label: string) => ({
          label,
        }));
      }
    }

    return question;
  });

  return {
    scales,
    questions,
  };
}

