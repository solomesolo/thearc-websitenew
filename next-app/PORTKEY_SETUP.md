# Portkey AI Monitoring Integration

## Overview
Portkey AI monitoring has been integrated into TheArc health analysis system to provide comprehensive AI output monitoring, logging, and analytics.

## Environment Variables

Add the following to your `.env.local` file:

```bash
# Portkey AI Monitoring
PORTKEY_API_KEY=rh1EFJioiosWBOgkpDiUeZf3WqrI

# Existing OpenAI (fallback)
OPENAI_API_KEY=your_openai_api_key_here
```

## Features

### ✅ **AI Output Monitoring**
- **Real-time monitoring** of all AI health analysis requests
- **Comprehensive logging** of user interactions and AI responses
- **Metadata tracking** including user IDs, session IDs, and analysis types

### ✅ **Fallback System**
- **Automatic fallback** to OpenAI if Portkey is unavailable
- **Graceful degradation** ensures service continuity
- **Error handling** with detailed logging

### ✅ **Health Analysis Integration**
- **Specialized health analysis** using Portkey's text moderation model
- **Structured prompts** for consistent medical recommendations
- **User context tracking** for personalized analysis

## API Integration

### Health Analysis Endpoint
**POST** `/api/analyze_health`

**Request Body:**
```json
{
  "responses": [
    {
      "question": "age",
      "answer": "26-35"
    },
    {
      "question": "diabetes_family", 
      "answer": "yes"
    }
  ],
  "userEmail": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "assessment_summary": "...",
    "urgent_tests": [...],
    "categories": [...],
    "next_steps": [...]
  },
  "aiResponse": "...",
  "monitoring": {
    "portkeyEnabled": true,
    "portkeyStatus": {
      "enabled": true,
      "hasApiKey": true,
      "apiKeyLength": 32
    }
  }
}
```

## Portkey Service Features

### 🔍 **Monitoring Capabilities**
- **Request tracking** with unique session IDs
- **User identification** for personalized analysis
- **Metadata collection** for analytics and insights
- **Error monitoring** with detailed error logging

### 🏥 **Health Analysis Specialization**
- **Medical prompt engineering** for accurate health recommendations
- **Structured output** following clinical guidelines
- **Risk assessment** based on questionnaire responses
- **Personalized recommendations** tailored to user profile

### 🔄 **Fallback Mechanism**
- **Automatic detection** of Portkey availability
- **Seamless fallback** to OpenAI GPT-4
- **Consistent API** regardless of monitoring status
- **Error recovery** with detailed logging

## Configuration

### Portkey Model Configuration
```typescript
{
  model: '@TheArc/text-moderation-stable',
  max_tokens: 2000,
  temperature: 0.7,
  metadata: {
    userId: 'user@example.com',
    sessionId: 'health_analysis_1234567890',
    analysisType: 'health_screening',
    source: 'thearc_questionnaire'
  }
}
```

### Monitoring Metadata
- **User ID**: Email or anonymous identifier
- **Session ID**: Unique session identifier
- **Analysis Type**: Type of health analysis performed
- **Response Count**: Number of questionnaire responses
- **Timestamp**: Analysis request timestamp
- **Source**: Application source identifier

## Testing

### 1. Environment Check
```bash
curl -X POST http://localhost:3002/api/analyze_health \
  -H "Content-Type: application/json" \
  -d '{
    "responses": [
      {"question": "age", "answer": "26-35"},
      {"question": "diabetes_family", "answer": "yes"}
    ],
    "userEmail": "test@example.com"
  }'
```

### 2. Monitor Logs
Check console output for:
- `✅ Portkey AI monitoring initialized`
- `🔍 Using Portkey for AI monitoring...`
- `✅ Portkey monitoring successful`

### 3. Verify Response
Response should include:
```json
{
  "monitoring": {
    "portkeyEnabled": true,
    "portkeyStatus": {
      "enabled": true,
      "hasApiKey": true,
      "apiKeyLength": 32
    }
  }
}
```

## Troubleshooting

### Portkey Not Working
1. **Check API Key**: Verify `PORTKEY_API_KEY` is set correctly
2. **Check Logs**: Look for initialization messages in console
3. **Fallback**: System will automatically use OpenAI if Portkey fails
4. **Network**: Ensure network connectivity to Portkey services

### Common Issues
- **API Key Missing**: Add `PORTKEY_API_KEY` to `.env.local`
- **Network Errors**: Check internet connectivity
- **Model Errors**: Verify model name `@TheArc/text-moderation-stable`
- **Rate Limits**: Monitor Portkey usage limits

## Security Notes

- **API Key Protection**: Never commit API keys to version control
- **User Data**: All user data is handled securely through Portkey
- **Privacy**: User emails are used only for session tracking
- **Compliance**: Follow healthcare data privacy regulations

## Benefits

### 📊 **Analytics & Insights**
- **Usage tracking** for health analysis requests
- **Performance monitoring** of AI responses
- **User behavior analysis** for product improvement
- **Error tracking** for system reliability

### 🛡️ **Quality Assurance**
- **Content moderation** through Portkey's text moderation model
- **Consistent output** with structured prompts
- **Error detection** and automatic fallback
- **Audit trail** for all AI interactions

### 🚀 **Scalability**
- **Load balancing** through Portkey infrastructure
- **Rate limiting** and usage management
- **Global availability** with Portkey's CDN
- **Performance optimization** for faster responses

## Next Steps

1. **Monitor Usage**: Track Portkey analytics dashboard
2. **Optimize Prompts**: Refine health analysis prompts based on results
3. **Expand Monitoring**: Add monitoring to other AI endpoints
4. **User Analytics**: Analyze user behavior and preferences
5. **Performance Tuning**: Optimize response times and accuracy
