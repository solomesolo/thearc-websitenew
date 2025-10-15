/**
 * Utility functions for safely working with biomarkers data
 */

export interface Biomarker {
  name: string;
  code: string;
}

/**
 * Safely extracts biomarkers from a product's biomarkers field
 * Handles cases where biomarkers might be null, undefined, or not an array
 */
export function safeExtractBiomarkers(biomarkers: any): Biomarker[] {
  if (!biomarkers) {
    return [];
  }

  // If it's already an array of biomarker objects
  if (Array.isArray(biomarkers)) {
    return biomarkers.filter(bio => 
      bio && 
      typeof bio === 'object' && 
      (bio.name || bio.code)
    ).map(bio => ({
      name: bio.name || bio.code || 'Unknown',
      code: bio.code || bio.name || 'Unknown'
    }));
  }

  // If it's an object with a biomarkers array
  if (typeof biomarkers === 'object' && biomarkers.biomarkers && Array.isArray(biomarkers.biomarkers)) {
    return biomarkers.biomarkers.filter(bio => 
      bio && 
      typeof bio === 'object' && 
      (bio.name || bio.code)
    ).map(bio => ({
      name: bio.name || bio.code || 'Unknown',
      code: bio.code || bio.name || 'Unknown'
    }));
  }

  // If it's an object with biomarker names as keys
  if (typeof biomarkers === 'object') {
    return Object.keys(biomarkers).map(key => ({
      name: key,
      code: key
    }));
  }

  return [];
}

/**
 * Safely checks if biomarkers array contains a specific biomarker
 */
export function safeBiomarkersSome(biomarkers: any, predicate: (biomarker: Biomarker) => boolean): boolean {
  const safeBiomarkers = safeExtractBiomarkers(biomarkers);
  return safeBiomarkers.some(predicate);
}

/**
 * Safely checks if biomarkers array includes a specific biomarker name
 */
export function safeBiomarkersIncludes(biomarkers: any, biomarkerName: string): boolean {
  const safeBiomarkers = safeExtractBiomarkers(biomarkers);
  return safeBiomarkers.some(bio => 
    bio.name.toLowerCase().includes(biomarkerName.toLowerCase()) ||
    bio.code.toLowerCase().includes(biomarkerName.toLowerCase())
  );
}
