import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function POST(request: NextRequest) {
  try {
    // Add a unique identifier to confirm this is the new version
    console.log('🚀 NEW VERSION API CALLED - save-email route');
    console.log('🔍 Notion Environment check:');
    console.log('NOTION_TOKEN exists:', !!process.env.NOTION_TOKEN);
    console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID);
    
    // Initialize Notion client inside the handler
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
    
    const { email, timestamp, consent, source } = await request.json();
    
    console.log('📧 Received data:', { email, timestamp, consent, source });
    
    // Try to get database schema first
    let database;
    try {
      database = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID!,
      });
      console.log('📋 Database properties:', Object.keys(database.properties));
    } catch (dbError) {
      console.error('❌ Error retrieving database:', dbError);
      // If we can't get the database, just try to create a simple page
    }
    
    // Create a simple page with minimal properties
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        // Try different property types for email
        ...(database && Object.keys(database.properties).length > 0 ? {
          [Object.keys(database.properties)[0]]: {
            title: [
              {
                text: {
                  content: email,
                },
              },
            ],
          }
        } : {
          // Fallback: try common property names with different types
          "Email": {
            email: email,
          },
          "Name": {
            title: [
              {
                text: {
                  content: email,
                },
              },
            ],
          }
        }),
      },
    });
    
    console.log('✅ Email saved to Notion:', response.id);
    
    return NextResponse.json({
      success: true,
      message: 'Email saved successfully',
      notionId: response.id
    });
  } catch (error) {
    console.error('❌ Error saving email to Notion:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
