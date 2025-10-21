import { NextRequest, NextResponse } from 'next/server';
import { SupabaseService } from '../../../lib/supabaseService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const testType = searchParams.get('type');
    
    if (!testType) {
      return NextResponse.json({
        success: false,
        error: 'Test type parameter is required'
      }, { status: 400 });
    }

    // Get all available products
    const allProducts = await SupabaseService.getProducts({ available: true });
    
    // Find products that match the test type
    const matchingProducts = allProducts.filter(product => {
      const productName = product.name.toLowerCase();
      const productDescription = product.description.toLowerCase();
      const testTypeLower = testType.toLowerCase();
      
      // Check for exact matches or similar test types
      const testMappings: { [key: string]: string[] } = {
        'hba1c': ['hba1c', 'hemoglobin a1c', 'a1c', 'glycated hemoglobin', 'blood sugar', 'diabetes'],
        'lipid panel': ['cholesterol', 'lipids', 'ldl', 'hdl', 'triglycerides', 'lipid panel'],
        'vitamin d': ['25-oh vitamin d', 'vitamin d3', 'cholecalciferol', 'vitamin d'],
        'thyroid': ['tsh', 't3', 't4', 'thyroid stimulating hormone', 'thyroid'],
        'iron': ['ferritin', 'iron panel', 'iron studies', 'iron'],
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
        if (testTypeLower.includes(key)) {
          for (const variation of variations) {
            if (productName.includes(variation) || productDescription.includes(variation)) {
              return true;
            }
          }
        }
      }

      // Check for partial word matches
      const testWords = testTypeLower.split(' ').filter(word => word.length > 3);
      let matchCount = 0;
      
      for (const word of testWords) {
        if (productName.includes(word) || productDescription.includes(word)) {
          matchCount++;
        }
      }

      return matchCount > 0;
    });

    // Get provider information for each product
    const productsWithProviders = await Promise.all(
      matchingProducts.map(async (product) => {
        try {
          const provider = await SupabaseService.getProviderById(product.provider_id);
          return {
            ...product,
            provider: {
              id: provider.id,
              name: provider['Company Name'],
              location: provider['Company Location'],
              description: provider['Company Description'],
              logo: provider.logo
            }
          };
        } catch (error) {
          console.error(`Error fetching provider ${product.provider_id}:`, error);
          return {
            ...product,
            provider: {
              id: product.provider_id,
              name: 'Unknown Provider',
              location: 'Unknown',
              description: 'Provider information not available',
              logo: null
            }
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        testType,
        products: productsWithProviders,
        totalProducts: productsWithProviders.length
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error fetching tests by type:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

