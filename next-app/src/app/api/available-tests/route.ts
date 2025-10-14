import { NextRequest, NextResponse } from 'next/server';
import { ScreeningToCatalogMapper } from '../../../lib/screeningToCatalogMapper';

export async function GET(request: NextRequest) {
  try {
    // Get available test names grouped by category
    const testNamesByCategory = await ScreeningToCatalogMapper.getTestNamesByCategory();
    
    // Also get flat list of all test names
    const allTestNames = await ScreeningToCatalogMapper.getAvailableTestNames();
    
    return NextResponse.json({
      success: true,
      data: {
        testNamesByCategory,
        allTestNames,
        totalTests: allTestNames.length
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error fetching available tests:', error);
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
