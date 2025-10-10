import { NextRequest, NextResponse } from 'next/server';
import { portkeyService } from '../../../lib/portkey';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing Portkey integration...');
    
    // Get Portkey status
    const status = portkeyService.getStatus();
    
    if (!status.enabled) {
      return NextResponse.json({
        success: false,
        error: 'Portkey monitoring is not enabled',
        status: status,
        message: 'Add PORTKEY_API_KEY to .env.local to enable monitoring'
      }, { status: 400 });
    }

    // Test basic Portkey functionality
    try {
      const testResponse = await portkeyService.createMonitoredCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'What is Portkey?' }
        ],
        max_tokens: 100,
        temperature: 0.7
      });

      return NextResponse.json({
        success: true,
        message: 'Portkey integration test successful',
        status: status,
        testResponse: {
          content: testResponse.choices[0].message.content,
          usage: testResponse.usage,
          model: testResponse.model
        }
      });

    } catch (portkeyError) {
      console.error('❌ Portkey test failed:', portkeyError);
      return NextResponse.json({
        success: false,
        error: 'Portkey test failed',
        status: status,
        portkeyError: portkeyError instanceof Error ? portkeyError.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Test endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testType = 'basic' } = await request.json();
    
    console.log(`🧪 Running Portkey test: ${testType}`);
    
    const status = portkeyService.getStatus();
    
    if (!status.enabled) {
      return NextResponse.json({
        success: false,
        error: 'Portkey monitoring is not enabled',
        status: status
      }, { status: 400 });
    }

    let testResponse;
    
    switch (testType) {
      case 'health_analysis':
        // Test health analysis functionality
        testResponse = await portkeyService.createHealthAnalysis({
          questionnaireResponses: [
            { question: 'age', answer: '26-35' },
            { question: 'diabetes_family', answer: 'yes' },
            { question: 'exercise_frequency', answer: 'rarely' }
          ],
          userEmail: 'test@example.com',
          userId: 'test_user'
        });
        break;
        
      case 'basic':
      default:
        // Test basic completion
        testResponse = await portkeyService.createMonitoredCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: 'Hello, this is a test message.' }
          ],
          max_tokens: 50
        });
        break;
    }

    return NextResponse.json({
      success: true,
      message: `Portkey ${testType} test successful`,
      status: status,
      testResponse: {
        content: testResponse.choices[0].message.content,
        usage: testResponse.usage,
        model: testResponse.model
      }
    });

  } catch (error) {
    console.error('❌ Portkey test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: portkeyService.getStatus()
    }, { status: 500 });
  }
}
