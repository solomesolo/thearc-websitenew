import { NextRequest, NextResponse } from 'next/server';
import { ScreeningToCatalogMapper, ScreeningRecommendation } from '../../../lib/screeningToCatalogMapper';

export async function POST(request: NextRequest) {
  try {
    const { recommendations } = await request.json();
    
    if (!recommendations || !Array.isArray(recommendations)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid recommendations data'
      }, { status: 400 });
    }

    // Map recommendations to catalog products
    const mappedRecommendations = await ScreeningToCatalogMapper.mapRecommendationsToProducts(recommendations);
    
    return NextResponse.json({
      success: true,
      data: {
        mappedRecommendations,
        totalRecommendations: recommendations.length,
        mappedCount: mappedRecommendations.filter(rec => rec.catalogProduct).length
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error mapping screening results:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
