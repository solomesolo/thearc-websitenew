import Portkey from 'portkey-ai';

// Portkey configuration for AI monitoring
export class PortkeyService {
  private portkey: Portkey;
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = !!process.env.PORTKEY_API_KEY;
    
    if (this.isEnabled) {
      this.portkey = new Portkey({
        apiKey: process.env.PORTKEY_API_KEY!,
        // Add OpenAI project header to match the API key
        defaultHeaders: {
          'OpenAI-Project': process.env.OPENAI_PROJECT_ID || '@TheArc' // Use env var or default to '@TheArc'
        }
      });
      console.log('✅ Portkey AI monitoring initialized');
      console.log('   - PORTKEY_API_KEY (length):', process.env.PORTKEY_API_KEY?.length);
      console.log('   - PORTKEY_API_KEY (first 10 chars):', process.env.PORTKEY_API_KEY?.substring(0, 10));
      console.log('   - OPENAI_PROJECT_ID:', process.env.OPENAI_PROJECT_ID || '@TheArc');
      console.log('   - Portkey config headers:', {
        'OpenAI-Project': process.env.OPENAI_PROJECT_ID || '@TheArc'
      });
    } else {
      console.warn('⚠️ Portkey API key not found - AI monitoring disabled');
    }
  }

  /**
   * Create a monitored chat completion with Portkey
   * This wraps OpenAI calls with Portkey monitoring
   */
  async createMonitoredCompletion(params: {
    model: string;
    messages: Array<{ role: string; content: string }>;
    max_tokens?: number;
    temperature?: number;
    systemPrompt?: string;
    userId?: string;
    sessionId?: string;
    metadata?: Record<string, any>;
  }) {
    if (!this.isEnabled) {
      throw new Error('Portkey monitoring is not enabled - API key missing');
    }

    try {
      console.log('🔍 Portkey: Starting monitored AI completion...');
      
      // Prepare messages with system prompt if provided
      const messages = params.systemPrompt 
        ? [
            { role: 'system', content: params.systemPrompt },
            ...params.messages
          ]
        : params.messages;
      
      console.log('   - Model:', params.model);
      console.log('   - Messages count:', messages.length);
      console.log('   - Max tokens:', params.max_tokens || 2000);
      console.log('   - Temperature:', params.temperature || 0.7);

      // Create monitored completion using Portkey
      const response = await this.portkey.chat.completions.create({
        model: params.model,
        messages,
        max_tokens: params.max_tokens || 2000,
        temperature: params.temperature || 0.7
      });

      console.log('✅ Portkey: AI completion monitored successfully');
      return response;

    } catch (error) {
      console.error('❌ Portkey monitoring error:', error);
      throw error;
    }
  }

  /**
   * Create a health analysis with Portkey monitoring
   * Specifically designed for the health questionnaire analysis
   */
  async createHealthAnalysis(params: {
    questionnaireResponses: any[];
    userEmail?: string;
    userId?: string;
  }) {
    const systemPrompt = `You are a preventive medicine specialist with expertise in evidence-based health screening. Your role is to analyze patient questionnaire data comprehensively, identify risk factors, and provide personalized screening recommendations that are clinically justified, patient-friendly, and prioritized by urgency. Always use all provided data and connect symptoms to specific test recommendations.

⚠️ Requirements:
- All test recommendations must be aligned with the user's age and risk profile.
- Use only medical evidence and established clinical guidelines as the basis for recommendations.
- Always include recommendations for ALL categories: Cardiovascular Health, Metabolic Health, Hormonal Health, Nutritional Status, Longevity Biomarkers, Gut Health.
- Each test recommendation must include a short explanation of why it is needed for this specific user.
- Output ONLY valid JSON in the following schema (no commentary, no extra text):

{
  "assessment_summary": "string, short paragraph summarizing key risks, focus areas, and prevention priorities.",
  "urgent_tests": [
    {
      "name": "string, e.g. 'HbA1c (3-month average blood sugar)'",
      "explanation": "string, 1–2 sentences explaining why urgent",
      "timeframe": "string, e.g. 'Schedule within 1–2 weeks'",
      "status": "string, one of: 'NEVER DONE', 'MISSING', 'DUE SOON', 'RECOMMENDED'"
    }
  ],
  "categories": [
    {
      "category_name": "string, e.g. 'Cardiovascular Health'",
      "category_description": "string, 1 sentence why this category matters",
      "tests": [
        {
          "name": "string, e.g. 'Lipid Panel'",
          "description": "string, 1–2 sentences about test importance and why this person needs it",
          "status": "string, one of: 'MISSING', 'UP TO DATE', 'DUE SOON'"
        }
      ]
    }
  ],
  "next_steps": [
    {
      "timeframe": "string, e.g. 'URGENT (within 2 weeks)'",
      "actions": [
        "string, actionable recommendation (e.g., 'Schedule HbA1c test immediately')"
      ]
    }
  ]
}`;

    const userPrompt = this.createHealthAssessmentPrompt(params.questionnaireResponses);

    return await this.createMonitoredCompletion({
      model: '@TheArc/text-moderation-stable', // Using the correct Portkey model
      messages: [
        { role: 'user', content: userPrompt }
      ],
      systemPrompt,
      max_tokens: 2000,
      temperature: 0.7
    });
  }

  /**
   * Create the health assessment prompt from questionnaire responses
   * This matches the existing prompt structure
   */
  private createHealthAssessmentPrompt(responses: any[]): string {
    let prompt = "Based on the following questionnaire responses, provide a comprehensive health assessment:\n\n";
    
    responses.forEach((response, index) => {
      prompt += `${index + 1}. ${response.question}: ${response.answer}\n`;
    });
    
    prompt += "\nPlease analyze this data and provide personalized screening recommendations following the JSON schema provided in the system prompt.";
    
    return prompt;
  }

  /**
   * Check if Portkey monitoring is enabled
   */
  isMonitoringEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Get Portkey configuration status
   */
  getStatus() {
    return {
      enabled: this.isEnabled,
      hasApiKey: !!process.env.PORTKEY_API_KEY,
      apiKeyLength: process.env.PORTKEY_API_KEY?.length || 0,
      projectId: process.env.OPENAI_PROJECT_ID || '@TheArc',
      hasProjectId: !!process.env.OPENAI_PROJECT_ID
    };
  }
}

// Export singleton instance
export const portkeyService = new PortkeyService();
