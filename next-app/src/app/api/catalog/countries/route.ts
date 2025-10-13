import { NextRequest, NextResponse } from 'next/server';
import { SupabaseService } from '../../../../lib/supabaseService';

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

export async function GET(request: NextRequest) {
  try {
    // Define all possible countries/regions
    const allCountries = [
      "Germany", "United States", "United Kingdom", "France", "Canada", 
      "Australia", "Netherlands", "Switzerland", "Sweden", "Norway", 
      "Denmark", "Finland", "Austria", "Belgium", "Ireland", "Spain", 
      "Italy", "Japan", "Singapore", "Brazil"
    ];

    // Fetch all providers from Supabase
    const providers = await SupabaseService.getProviders();
    
    // Count providers by country
    const countryCounts: { [key: string]: number } = {};
    allCountries.forEach(country => {
      countryCounts[country] = 0;
    });

    providers.forEach(provider => {
      const location = provider['Company Location'];
      if (location && countryCounts.hasOwnProperty(location)) {
        countryCounts[location]++;
      }
    });

    // Create countries array with real counts
    const countries = allCountries.map((country, index) => ({
      id: index + 1,
      name: country,
      service_count: countryCounts[country]
    }));

    // Sort countries: Germany first, then by provider count (highest to lowest)
    const sortedCountries = countries.sort((a, b) => {
      // Germany always comes first
      if (a.name === "Germany") return -1;
      if (b.name === "Germany") return 1;
      
      // Then sort by service count (highest to lowest)
      return b.service_count - a.service_count;
    });

    return NextResponse.json({
      success: true,
      countries: sortedCountries
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in catalog/countries:', error);
    
    // Fallback to static data if Supabase fails
    const fallbackCountries = [
      { id: 1, name: "Germany", service_count: 0 },
      { id: 2, name: "United States", service_count: 0 },
      { id: 3, name: "United Kingdom", service_count: 0 },
      { id: 4, name: "France", service_count: 0 },
      { id: 5, name: "Canada", service_count: 0 },
      { id: 6, name: "Australia", service_count: 0 },
      { id: 7, name: "Netherlands", service_count: 0 },
      { id: 8, name: "Switzerland", service_count: 0 },
      { id: 9, name: "Sweden", service_count: 0 },
      { id: 10, name: "Norway", service_count: 0 },
    ];

    return NextResponse.json({
      success: true,
      countries: fallbackCountries
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}
