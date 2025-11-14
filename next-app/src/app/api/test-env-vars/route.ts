import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envVars = {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Set (length: ' + process.env.OPENAI_API_KEY.length + ')' : 'Not set',
      NOTION_TOKEN: process.env.NOTION_TOKEN ? 'Set (length: ' + process.env.NOTION_TOKEN.length + ')' : 'Not set',
      NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID ? 'Set (length: ' + process.env.NOTION_DATABASE_ID.length + ')' : 'Not set',
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? 'Set (length: ' + process.env.SENDGRID_API_KEY.length + ')' : 'Not set',
      SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL ? 'Set: ' + process.env.SENDGRID_FROM_EMAIL : 'Not set',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set (length: ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ')' : 'Not set',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set: ' + process.env.NEXT_PUBLIC_SUPABASE_URL : 'Not set'
    };

    return NextResponse.json({
      ok: true,
      environment: envVars
    });
  } catch (error) {
    return NextResponse.json(
      { 
        ok: false, 
        error: "Failed to check environment variables",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
