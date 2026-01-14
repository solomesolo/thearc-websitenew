/**
 * Node Matcher
 * 
 * Matches user answers against medical node triggers.
 * Handles function-based, array-based, and simple value matching.
 */

import { MedicalNode } from './types';

/**
 * Check if a node's trigger matches the user's answer
 */
export function matchesNode(node: MedicalNode, userAnswer: any): boolean {
  const { questionId, optionValue } = node.trigger;
  
  // Get the user's answer for this question
  const answer = userAnswer[questionId];
  
  if (answer === undefined || answer === null) {
    return false;
  }
  
  // Handle function-based matching
  if (typeof optionValue === 'function') {
    return optionValue(answer);
  }
  
  // Handle array-based matching (for checkbox questions)
  if (Array.isArray(optionValue)) {
    if (Array.isArray(answer)) {
      return optionValue.some(opt => answer.includes(opt));
    }
    return optionValue.includes(answer);
  }
  
  // Handle simple value matching
  if (Array.isArray(answer)) {
    return answer.includes(optionValue);
  }
  
  return answer === optionValue;
}

/**
 * Find all matching nodes for a set of user answers
 */
export function findMatchingNodes(
  nodes: MedicalNode[],
  userAnswers: Record<string, any>
): MedicalNode[] {
  return nodes.filter(node => matchesNode(node, userAnswers));
}






