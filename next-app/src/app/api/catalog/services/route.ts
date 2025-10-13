import { NextRequest, NextResponse } from 'next/server';

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
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '12');
    const tags = searchParams.get('tags');
    const category = searchParams.get('category');

    // For now, return static data based on country
    // In the future, this will connect to the Django backend
    const allServices = {
      "United States": [
        {
          id: 1,
          name: "HealthSpan Diagnostics",
          description: "Comprehensive biomarker testing for longevity optimization",
          bio: "Leading provider of advanced health diagnostics with focus on preventive medicine and longevity biomarkers.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 1, name: "Lab Testing" }, { id: 2, name: "Longevity" }],
          categories: [{ id: 1, name: "Health Screening" }],
          countries: [{ id: 1, name: "United States" }],
          ratings: [{ id: 1, rating: 4.5, source: "Trustpilot" }],
          features: [{ id: 1, name: "Home Testing", description: "Convenient home sample collection" }]
        },
        {
          id: 2,
          name: "Vitality Labs",
          description: "Advanced metabolic and cardiovascular health testing",
          bio: "Specialized in metabolic health assessment and cardiovascular risk evaluation.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 3, name: "Metabolic Health" }, { id: 4, name: "Cardiovascular" }],
          categories: [{ id: 2, name: "Lab Testing" }],
          countries: [{ id: 1, name: "United States" }],
          ratings: [{ id: 2, rating: 4.2, source: "Google" }],
          features: [{ id: 2, name: "Fast Results", description: "Results within 48 hours" }]
        },
        {
          id: 3,
          name: "Longevity Institute",
          description: "Personalized longevity protocols and health optimization",
          bio: "Comprehensive longevity programs combining testing, coaching, and personalized protocols.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 5, name: "Longevity" }, { id: 6, name: "Coaching" }],
          categories: [{ id: 3, name: "Health Coaching" }],
          countries: [{ id: 1, name: "United States" }],
          ratings: [{ id: 3, rating: 4.8, source: "Trustpilot" }],
          features: [{ id: 3, name: "Personal Coach", description: "Dedicated health coach" }]
        },
        {
          id: 4,
          name: "Genetic Insights",
          description: "Comprehensive genetic testing and analysis",
          bio: "Advanced genetic testing for disease prevention and health optimization.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 7, name: "Genetic Testing" }, { id: 8, name: "Prevention" }],
          categories: [{ id: 4, name: "Genetic Testing" }],
          countries: [{ id: 1, name: "United States" }],
          ratings: [{ id: 4, rating: 4.3, source: "Google" }],
          features: [{ id: 4, name: "Comprehensive Report", description: "Detailed genetic analysis" }]
        },
        {
          id: 5,
          name: "Microbiome Health",
          description: "Gut health analysis and personalized nutrition",
          bio: "Advanced microbiome testing with personalized nutrition recommendations.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 9, name: "Microbiome" }, { id: 10, name: "Nutrition" }],
          categories: [{ id: 5, name: "Gut Health" }],
          countries: [{ id: 1, name: "United States" }],
          ratings: [{ id: 5, rating: 4.6, source: "Trustpilot" }],
          features: [{ id: 5, name: "Nutrition Plan", description: "Personalized meal plans" }]
        },
        {
          id: 6,
          name: "Precision Medicine",
          description: "Personalized medicine based on comprehensive health profiling",
          bio: "Cutting-edge precision medicine approach combining multiple health assessments.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 11, name: "Precision Medicine" }, { id: 12, name: "Personalized" }],
          categories: [{ id: 6, name: "Precision Medicine" }],
          countries: [{ id: 1, name: "United States" }],
          ratings: [{ id: 6, rating: 4.7, source: "Google" }],
          features: [{ id: 6, name: "AI Analysis", description: "AI-powered health insights" }]
        }
      ],
      "United Kingdom": [
        {
          id: 7,
          name: "UK Health Diagnostics",
          description: "Comprehensive health screening and biomarker testing",
          bio: "Leading UK provider of advanced health diagnostics and preventive medicine.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 1, name: "Lab Testing" }, { id: 2, name: "Longevity" }],
          categories: [{ id: 1, name: "Health Screening" }],
          countries: [{ id: 2, name: "United Kingdom" }],
          ratings: [{ id: 7, rating: 4.4, source: "Trustpilot" }],
          features: [{ id: 7, name: "NHS Integration", description: "Works with NHS providers" }]
        },
        {
          id: 8,
          name: "British Longevity",
          description: "Personalized longevity and health optimization services",
          bio: "Specialized longevity programs tailored for UK residents.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 5, name: "Longevity" }, { id: 6, name: "Coaching" }],
          categories: [{ id: 3, name: "Health Coaching" }],
          countries: [{ id: 2, name: "United Kingdom" }],
          ratings: [{ id: 8, rating: 4.6, source: "Google" }],
          features: [{ id: 8, name: "UK Specialists", description: "UK-based health specialists" }]
        }
      ],
      "Germany": [
        {
          id: 9,
          name: "Deutsche Gesundheitsdiagnostik",
          description: "Advanced health diagnostics and preventive medicine",
          bio: "Leading German provider of comprehensive health assessments.",
          link: "https://example.com",
          logo: "/api/placeholder/120/80",
          tags: [{ id: 1, name: "Lab Testing" }, { id: 2, name: "Longevity" }],
          categories: [{ id: 1, name: "Health Screening" }],
          countries: [{ id: 3, name: "Germany" }],
          ratings: [{ id: 9, rating: 4.3, source: "Trustpilot" }],
          features: [{ id: 9, name: "German Quality", description: "German engineering precision" }]
        }
      ]
    };

    let services = country ? (allServices[country as keyof typeof allServices] || []) : [];
    
    // Apply category filter if specified
    if (category) {
      services = services.filter(service => 
        service.categories.some(cat => cat.id.toString() === category)
      );
    }
    
    // Apply tags filter if specified
    if (tags) {
      const tagIds = tags.split(',').map(id => parseInt(id));
      services = services.filter(service => 
        service.tags.some(tag => tagIds.includes(tag.id))
      );
    }

    // Calculate pagination
    const totalCount = services.length;
    const totalPages = Math.ceil(totalCount / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedServices = services.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      results: paginatedServices,
      total_pages: totalPages,
      count: totalCount,
      page: page,
      per_page: perPage
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in catalog/services:', error);
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
