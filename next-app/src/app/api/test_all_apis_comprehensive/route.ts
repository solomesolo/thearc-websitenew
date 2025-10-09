import { NextRequest, NextResponse } from 'next/server';

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET() {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';

    const apiTests = {
      environment: {
        endpoint: '/api/test_env',
        method: 'GET',
        description: 'Test environment variables'
      },
      save_email: {
        endpoint: '/api/save_email',
        method: 'POST',
        description: 'Save email to Notion database',
        testData: {
          email: 'test@example.com',
          timestamp: new Date().toISOString(),
          consent: true,
          source: 'api_test'
        }
      },
      send_email: {
        endpoint: '/api/send_email',
        method: 'POST',
        description: 'Send email via SendGrid',
        testData: {
          to: 'test@example.com',
          subject: 'API Test Email',
          htmlContent: '<h1>Test Email</h1><p>This is a test email from TheArc API.</p>',
          textContent: 'Test Email - This is a test email from TheArc API.'
        }
      },
      register: {
        endpoint: '/api/register',
        method: 'POST',
        description: 'Register user in Notion database',
        testData: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          reason: 'API testing'
        }
      },
      analyze_health: {
        endpoint: '/api/analyze_health',
        method: 'POST',
        description: 'Analyze health data with OpenAI',
        testData: {
          responses: [
            { question: 'What is your age?', answer: '30' },
            { question: 'Do you have any health concerns?', answer: 'None' }
          ]
        }
      },
      test_email: {
        endpoint: '/api/test_email',
        method: 'POST',
        description: 'Test email functionality',
        testData: {
          to: 'test@example.com'
        }
      }
    };

    return NextResponse.json({
      success: true,
      message: 'Comprehensive API test endpoint',
      baseUrl: baseUrl,
      timestamp: new Date().toISOString(),
      apis: apiTests,
      instructions: {
        test_environment: `GET ${baseUrl}/api/test_env`,
        test_save_email: `POST ${baseUrl}/api/save_email with test data`,
        test_send_email: `POST ${baseUrl}/api/send_email with test data`,
        test_register: `POST ${baseUrl}/api/register with test data`,
        test_analyze_health: `POST ${baseUrl}/api/analyze_health with test data`,
        test_email: `POST ${baseUrl}/api/test_email with test data`
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testType } = await request.json();
    
    if (!testType) {
      return NextResponse.json({
        success: false,
        error: 'testType is required. Options: environment, save_email, send_email, register, analyze_health, test_email'
      }, { status: 400 });
    }

    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';

    let testResult;
    
    switch (testType) {
      case 'environment':
        const envResponse = await fetch(`${baseUrl}/api/test_env`);
        testResult = await envResponse.json();
        break;
        
      case 'save_email':
        const saveResponse = await fetch(`${baseUrl}/api/save_email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@example.com',
            timestamp: new Date().toISOString(),
            consent: true,
            source: 'api_test'
          })
        });
        testResult = await saveResponse.json();
        break;
        
      case 'send_email':
        const sendResponse = await fetch(`${baseUrl}/api/send_email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'test@example.com',
            subject: 'API Test Email',
            htmlContent: '<h1>Test Email</h1><p>This is a test email from TheArc API.</p>',
            textContent: 'Test Email - This is a test email from TheArc API.'
          })
        });
        testResult = await sendResponse.json();
        break;
        
      case 'register':
        const registerResponse = await fetch(`${baseUrl}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            reason: 'API testing'
          })
        });
        testResult = await registerResponse.json();
        break;
        
      case 'analyze_health':
        const analyzeResponse = await fetch(`${baseUrl}/api/analyze_health`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            responses: [
              { question: 'What is your age?', answer: '30' },
              { question: 'Do you have any health concerns?', answer: 'None' }
            ]
          })
        });
        testResult = await analyzeResponse.json();
        break;
        
      case 'test_email':
        const testEmailResponse = await fetch(`${baseUrl}/api/test_email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'test@example.com'
          })
        });
        testResult = await testEmailResponse.json();
        break;
        
      default:
        return NextResponse.json({
          success: false,
          error: `Unknown test type: ${testType}. Available: environment, save_email, send_email, register, analyze_health, test_email`
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      testType: testType,
      result: testResult,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}
