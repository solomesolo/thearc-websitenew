import { SupabaseService } from './supabaseService';
import { Product } from './types';

export interface ScreeningRecommendation {
  name: string;
  explanation: string;
  timeframe: string;
  status: 'NEVER DONE' | 'MISSING' | 'DUE SOON' | 'RECOMMENDED' | 'URGENT';
}

export interface MappedRecommendation extends ScreeningRecommendation {
  catalogProduct?: Product;
  matchScore: number;
  matchReason: string;
}

export class ScreeningToCatalogMapper {
  /**
   * Map screening recommendations to actual catalog products
   */
  static async mapRecommendationsToProducts(
    recommendations: ScreeningRecommendation[]
  ): Promise<MappedRecommendation[]> {
    try {
      // Get all available products from catalog
      const allProducts = await SupabaseService.getProducts({ available: true });
      
      const mappedRecommendations: MappedRecommendation[] = [];
      
      for (const recommendation of recommendations) {
        const mapped = await this.mapSingleRecommendation(recommendation, allProducts);
        mappedRecommendations.push(mapped);
      }
      
      return mappedRecommendations;
    } catch (error) {
      console.error('Error mapping recommendations to products:', error);
      // Return original recommendations without mapping if error occurs
      return recommendations.map(rec => ({
        ...rec,
        matchScore: 0,
        matchReason: 'Unable to map to catalog products'
      }));
    }
  }

  /**
   * Map a single recommendation to the best matching catalog product
   */
  private static async mapSingleRecommendation(
    recommendation: ScreeningRecommendation,
    allProducts: Product[]
  ): Promise<MappedRecommendation> {
    const bestMatch = this.findBestProductMatch(recommendation, allProducts);
    
    return {
      ...recommendation,
      catalogProduct: bestMatch.product,
      matchScore: bestMatch.score,
      matchReason: bestMatch.reason
    };
  }

  /**
   * Find the best matching product for a recommendation
   */
  private static findBestProductMatch(
    recommendation: ScreeningRecommendation,
    products: Product[]
  ): { product?: Product; score: number; reason: string } {
    let bestMatch: { product?: Product; score: number; reason: string } = {
      score: 0,
      reason: 'No suitable match found'
    };

    for (const product of products) {
      const match = this.calculateProductMatch(recommendation, product);
      
      if (match.score > bestMatch.score) {
        bestMatch = {
          product,
          score: match.score,
          reason: match.reason
        };
      }
    }

    // Only return matches with at least 30% similarity
    if (bestMatch.score < 0.3) {
      return { score: 0, reason: 'No suitable match found' };
    }

    return bestMatch;
  }

  /**
   * Calculate how well a product matches a recommendation
   */
  private static calculateProductMatch(
    recommendation: ScreeningRecommendation,
    product: Product
  ): { score: number; reason: string } {
    const recName = recommendation.name.toLowerCase();
    const productName = product.name.toLowerCase();
    const productDescription = product.description.toLowerCase();

    // Exact name match (highest priority)
    if (productName === recName) {
      return { score: 1.0, reason: 'Exact name match' };
    }

    // Check if recommendation name is contained in product name
    if (productName.includes(recName) || recName.includes(productName)) {
      return { score: 0.9, reason: 'Name contains recommendation' };
    }

    // Check for biomarker matches
    const biomarkerMatch = this.checkBiomarkerMatch(recommendation, product);
    if (biomarkerMatch.score > 0) {
      return biomarkerMatch;
    }

    // Check for keyword matches in description
    const keywordMatch = this.checkKeywordMatch(recommendation, product);
    if (keywordMatch.score > 0) {
      return keywordMatch;
    }

    // Check for tag matches
    const tagMatch = this.checkTagMatch(recommendation, product);
    if (tagMatch.score > 0) {
      return tagMatch;
    }

    return { score: 0, reason: 'No significant match found' };
  }

  /**
   * Check if product biomarkers match recommendation
   */
  private static checkBiomarkerMatch(
    recommendation: ScreeningRecommendation,
    product: Product
  ): { score: number; reason: string } {
    if (!product.biomarkers) {
      return { score: 0, reason: 'No biomarkers data' };
    }

    const productBiomarkers = SupabaseService.extractProductBiomarkers(product.biomarkers);
    const recName = recommendation.name.toLowerCase();

    // Check if any biomarker name matches the recommendation
    for (const biomarker of productBiomarkers) {
      const biomarkerName = biomarker.name.toLowerCase();
      
      if (biomarkerName.includes(recName) || recName.includes(biomarkerName)) {
        return { 
          score: 0.8, 
          reason: `Biomarker match: ${biomarker.name}` 
        };
      }
    }

    return { score: 0, reason: 'No biomarker match' };
  }

  /**
   * Check for keyword matches in product description
   */
  private static checkKeywordMatch(
    recommendation: ScreeningRecommendation,
    product: Product
  ): { score: number; reason: string } {
    const recName = recommendation.name.toLowerCase();
    const productDescription = product.description.toLowerCase();
    const productName = product.name.toLowerCase();

    // Common test name mappings
    const testMappings: { [key: string]: string[] } = {
      'hba1c': ['hemoglobin a1c', 'a1c', 'glycated hemoglobin'],
      'lipid panel': ['cholesterol', 'lipids', 'ldl', 'hdl', 'triglycerides'],
      'thyroid': ['tsh', 't3', 't4', 'thyroid stimulating hormone'],
      'vitamin d': ['25-oh vitamin d', 'vitamin d3', 'cholecalciferol'],
      'vitamin b12': ['cobalamin', 'b12'],
      'iron': ['ferritin', 'iron panel', 'iron studies'],
      'cortisol': ['stress hormone', 'cortisol'],
      'testosterone': ['testosterone', 'male hormone'],
      'estrogen': ['estradiol', 'female hormone'],
      'inflammation': ['crp', 'c-reactive protein', 'inflammatory markers'],
      'liver': ['liver function', 'alt', 'ast', 'liver enzymes'],
      'kidney': ['creatinine', 'kidney function', 'egfr'],
      'diabetes': ['glucose', 'insulin', 'diabetes screening'],
      'heart': ['cardiovascular', 'heart health', 'cardiac'],
      'hormone': ['hormonal', 'endocrine', 'hormone panel']
    };

    // Check direct mappings
    for (const [key, variations] of Object.entries(testMappings)) {
      if (recName.includes(key)) {
        for (const variation of variations) {
          if (productDescription.includes(variation) || productName.includes(variation)) {
            return { 
              score: 0.7, 
              reason: `Keyword match: ${variation}` 
            };
          }
        }
      }
    }

    // Check for partial word matches
    const recWords = recName.split(' ').filter(word => word.length > 3);
    let matchCount = 0;
    
    for (const word of recWords) {
      if (productDescription.includes(word) || productName.includes(word)) {
        matchCount++;
      }
    }

    if (matchCount > 0) {
      const score = Math.min(0.6, (matchCount / recWords.length) * 0.6);
      return { 
        score, 
        reason: `Partial keyword match (${matchCount}/${recWords.length} words)` 
      };
    }

    return { score: 0, reason: 'No keyword match' };
  }

  /**
   * Check for tag matches
   */
  private static checkTagMatch(
    recommendation: ScreeningRecommendation,
    product: Product
  ): { score: number; reason: string } {
    if (!product.tags) {
      return { score: 0, reason: 'No tags data' };
    }

    const productTags = SupabaseService.extractProductTags(product.tags);
    const recName = recommendation.name.toLowerCase();

    // Check if any tag matches the recommendation
    for (const tag of productTags) {
      const tagLower = tag.toLowerCase();
      
      if (tagLower.includes(recName) || recName.includes(tagLower)) {
        return { 
          score: 0.5, 
          reason: `Tag match: ${tag}` 
        };
      }
    }

    return { score: 0, reason: 'No tag match' };
  }

  /**
   * Get all available test names from catalog for AI prompt
   */
  static async getAvailableTestNames(): Promise<string[]> {
    try {
      const products = await SupabaseService.getProducts({ available: true });
      return products.map(product => product.name);
    } catch (error) {
      console.error('Error getting available test names:', error);
      return [];
    }
  }

  /**
   * Get test names grouped by category for better AI recommendations
   */
  static async getTestNamesByCategory(): Promise<{ [category: string]: string[] }> {
    try {
      const products = await SupabaseService.getProducts({ available: true });
      const categories: { [category: string]: string[] } = {};

      for (const product of products) {
        const tags = SupabaseService.extractProductTags(product.tags);
        
        // Determine category based on tags and biomarkers
        const category = this.determineProductCategory(product, tags);
        
        if (!categories[category]) {
          categories[category] = [];
        }
        
        categories[category].push(product.name);
      }

      return categories;
    } catch (error) {
      console.error('Error getting test names by category:', error);
      return {};
    }
  }

  /**
   * Determine product category based on tags and biomarkers
   */
  private static determineProductCategory(product: Product, tags: string[]): string {
    const productName = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const allText = `${productName} ${description} ${tags.join(' ')}`.toLowerCase();

    if (allText.includes('heart') || allText.includes('cardiovascular') || allText.includes('cholesterol') || allText.includes('lipid')) {
      return 'Cardiovascular Health';
    }
    
    if (allText.includes('diabetes') || allText.includes('glucose') || allText.includes('insulin') || allText.includes('hba1c')) {
      return 'Metabolic Health';
    }
    
    if (allText.includes('hormone') || allText.includes('testosterone') || allText.includes('estrogen') || allText.includes('thyroid') || allText.includes('cortisol')) {
      return 'Hormonal Health';
    }
    
    if (allText.includes('vitamin') || allText.includes('mineral') || allText.includes('iron') || allText.includes('b12') || allText.includes('folate')) {
      return 'Nutritional Status';
    }
    
    if (allText.includes('inflammation') || allText.includes('crp') || allText.includes('inflammatory')) {
      return 'Inflammation & Immune';
    }
    
    if (allText.includes('liver') || allText.includes('kidney') || allText.includes('creatinine') || allText.includes('alt') || allText.includes('ast')) {
      return 'Organ Function';
    }
    
    if (allText.includes('gut') || allText.includes('microbiome') || allText.includes('stool')) {
      return 'Gut Health';
    }
    
    if (allText.includes('genetic') || allText.includes('dna') || allText.includes('genetic')) {
      return 'Genetic Testing';
    }
    
    if (allText.includes('longevity') || allText.includes('biological age') || allText.includes('aging')) {
      return 'Longevity Biomarkers';
    }

    return 'General Health';
  }
}
