import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      OPENAI_API_KEY_EXISTS: !!process.env.OPENAI_API_KEY,
      OPENAI_API_KEY_LENGTH: process.env.OPENAI_API_KEY?.length || 0,
      NOTION_TOKEN_EXISTS: !!process.env.NOTION_TOKEN,
      NOTION_DATABASE_ID_EXISTS: !!process.env.NOTION_DATABASE_ID,
      SENDGRID_API_KEY_EXISTS: !!process.env.SENDGRID_API_KEY,
      SENDGRID_FROM_EMAIL_EXISTS: !!process.env.SENDGRID_FROM_EMAIL,
      SENDGRID_FROM_EMAIL_VALUE: process.env.SENDGRID_FROM_EMAIL,
    }, { status: 200 });
  } catch (error) {
    console.error('Error in test-env:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
