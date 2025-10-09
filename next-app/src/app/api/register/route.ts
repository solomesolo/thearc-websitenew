import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 REGISTER API CALLED');
    console.log('🔍 Notion Environment check:');
    console.log('NOTION_TOKEN exists:', !!process.env.NOTION_TOKEN);
    console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID);
    
    // Initialize Notion client inside the handler
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
    
    const data = await req.json();
    console.log('📧 Received registration data:', data);
    
    // Try to get database schema first
    let database;
    try {
      database = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID!,
      });
      console.log('📋 Database properties:', Object.keys(database.properties));
    } catch (dbError) {
      console.error('❌ Error retrieving database:', dbError);
      throw new Error("Notion database ID not set or invalid");
    }
    
    // Create a page with dynamically detected field types
    const properties: any = {};
    
    // Handle each property based on its ACTUAL type from Notion
    Object.keys(database?.properties || {}).forEach(propName => {
      const prop = database.properties[propName];
      console.log(`🔍 Processing property: ${propName}, type: ${prop.type}`);
      
      // Map registration data to appropriate properties
      let content = "";
      if (propName.toLowerCase().includes("email")) {
        content = data.email || "";
      } else if (propName.toLowerCase().includes("first") || propName.toLowerCase().includes("name")) {
        content = data.firstName || "";
      } else if (propName.toLowerCase().includes("last")) {
        content = data.lastName || "";
      } else if (propName.toLowerCase().includes("message") || propName.toLowerCase().includes("reason")) {
        content = data.reason || "";
      }
      
      switch (prop.type) {
        case 'title':
          properties[propName] = {
            title: [
              {
                text: {
                  content: content,
                },
              },
            ],
          };
          break;
          
        case 'rich_text':
          properties[propName] = {
            rich_text: [
              {
                text: {
                  content: content,
                },
              },
            ],
          };
          break;
          
        case 'email':
          properties[propName] = {
            email: data.email || "",
          };
          break;
          
        default:
          console.log(`⚠️ Unknown property type: ${prop.type} for ${propName}`);
          // Skip unknown types
          break;
      }
    });
    
    // If no properties were set, use a default title with email
    if (Object.keys(properties).length === 0) {
      properties["Name"] = {
        title: [
          {
            text: {
              content: data.email || "Registration",
            },
          },
        ],
      };
    }
    
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties,
    });
    
    console.log('✅ Registration saved to Notion:', response.id);
    
    return NextResponse.json({
      success: true,
      message: "Registration successful!",
      notionId: response.id
    });
  } catch (error) {
    console.error('❌ Error saving registration to Notion:', error);
    return NextResponse.json({
      success: false,
      message: "Registration failed.",
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 