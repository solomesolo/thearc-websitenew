/**
 * Fetch products and supplements from Supabase for Traveller Engine
 */

import { createClient } from '@supabase/supabase-js';
import { TestProduct, SupplementProduct } from './arcTravellerEngine';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Traveller engine will use empty product lists.');
}

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch test products from Supabase "products" table
 * Filters by biomarkers column
 */
export async function fetchTestProducts(): Promise<TestProduct[]> {
  if (!supabase) {
    console.warn('Supabase not initialized, returning empty test products');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, biomarkers')
      .eq('available', true);

    if (error) {
      console.error('Error fetching test products from Supabase:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('No products found in Supabase');
      return [];
    }

    // Transform Supabase products to TestProduct format
    const testProducts: TestProduct[] = [];

    for (const product of data) {
      // Handle biomarkers - could be string, array, or JSONB object
      let biomarkers: string[] = [];
      
      if (product.biomarkers) {
        if (typeof product.biomarkers === 'string') {
          try {
            const parsed = JSON.parse(product.biomarkers);
            if (Array.isArray(parsed)) {
              biomarkers = parsed.map((b: any) => 
                typeof b === 'string' ? b : (b.name || b.code || String(b))
              );
            } else if (parsed && typeof parsed === 'object') {
              // Handle object format { biomarkers: [...] }
              const bioArray = parsed.biomarkers || parsed;
              if (Array.isArray(bioArray)) {
                biomarkers = bioArray.map((b: any) => 
                  typeof b === 'string' ? b : (b.name || b.code || String(b))
                );
              }
            }
          } catch {
            // If not JSON, treat as single biomarker string
            biomarkers = [product.biomarkers];
          }
        } else if (Array.isArray(product.biomarkers)) {
          biomarkers = product.biomarkers.map((b: any) => 
            typeof b === 'string' ? b : (b.name || b.code || String(b))
          );
        }
      }

      // Create a TestProduct for each biomarker
      if (biomarkers.length > 0) {
        biomarkers.forEach(biomarker => {
          testProducts.push({
            id: `${product.id}-${biomarker}`,
            name: product.name,
            biomarker: biomarker,
          });
        });
      } else {
        // If no biomarkers, still add the product (might be a general test)
        testProducts.push({
          id: String(product.id),
          name: product.name,
          biomarker: product.name, // Use product name as biomarker fallback
        });
      }
    }

    console.log(`✅ Fetched ${testProducts.length} test products from Supabase`);
    return testProducts;
  } catch (error) {
    console.error('Error in fetchTestProducts:', error);
    return [];
  }
}

/**
 * Fetch supplements from Supabase "Supplements" table
 */
export async function fetchSupplementProducts(): Promise<SupplementProduct[]> {
  if (!supabase) {
    console.warn('Supabase not initialized, returning empty supplement products');
    return [];
  }

  try {
    // Try both "Supplements" and "supplements" table names
    let { data, error } = await supabase
      .from('Supplements')
      .select('*');
    
    // If "Supplements" doesn't exist, try lowercase
    if (error && error.message?.includes('does not exist')) {
      console.log('Trying lowercase "supplements" table...');
      const result = await supabase
        .from('supplements')
        .select('*');
      data = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Error fetching supplements from Supabase:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('No supplements found in Supabase');
      return [];
    }

    // Transform Supabase supplements to SupplementProduct format
    const supplementProducts: SupplementProduct[] = data.map((supp: any) => ({
      id: String(supp.id || supp.supplement_name),
      supplement_name: supp.supplement_name || supp.name || '',
      biomarker: supp.biomarker || undefined,
      category: supp.category || undefined,
      red_flags: supp.red_flags || supp.safety_notes || supp.safety_note || undefined,
    }));

    console.log(`✅ Fetched ${supplementProducts.length} supplements from Supabase`);
    return supplementProducts;
  } catch (error) {
    console.error('Error in fetchSupplementProducts:', error);
    return [];
  }
}

/**
 * Fetch both products and supplements in parallel
 */
export async function fetchTravellerCatalogData(): Promise<{
  testProducts: TestProduct[];
  supplementProducts: SupplementProduct[];
}> {
  const [testProducts, supplementProducts] = await Promise.all([
    fetchTestProducts(),
    fetchSupplementProducts(),
  ]);

  return {
    testProducts,
    supplementProducts,
  };
}

