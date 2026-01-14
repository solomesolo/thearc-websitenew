// Debug Portkey integration - exact same as Next.js API
require('dotenv').config({ path: '.env.local' });
const { default: Portkey } = require('portkey-ai');

console.log('🔍 DEEP ANALYSIS - Portkey Integration Debug');
console.log('==========================================');

// Check environment variables
console.log('\n1. Environment Variables Check:');
console.log('   - PORTKEY_API_KEY exists:', !!process.env.PORTKEY_API_KEY);
console.log('   - PORTKEY_API_KEY length:', process.env.PORTKEY_API_KEY?.length || 0);
console.log('   - PORTKEY_API_KEY (first 10):', process.env.PORTKEY_API_KEY?.substring(0, 10) || 'N/A');
console.log('   - OPENAI_PROJECT_ID:', process.env.OPENAI_PROJECT_ID || 'Not set');
console.log('   - OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
console.log('   - OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length || 0);

// Test 1: Portkey with exact Next.js configuration
async function testPortkeyExact() {
  console.log('\n2. Testing Portkey with EXACT Next.js configuration:');
  
  try {
    const portkey = new Portkey({
      apiKey: process.env.PORTKEY_API_KEY,
      defaultHeaders: {
        'OpenAI-Project': process.env.OPENAI_PROJECT_ID || '@TheArc'
      }
    });

    console.log('   - Portkey instance created successfully');
    console.log('   - Headers configured:', {
      'OpenAI-Project': process.env.OPENAI_PROJECT_ID || '@TheArc'
    });

    const response = await portkey.chat.completions.create({
      model: '@TheArc/text-moderation-stable',
      messages: [
        { role: 'user', content: 'What is Portkey?' }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    console.log('   ✅ SUCCESS! Portkey integration working!');
    console.log('   - Response:', response.choices[0].message.content);
    return true;
  } catch (error) {
    console.log('   ❌ ERROR:', error.message);
    console.log('   - Error type:', error.constructor.name);
    console.log('   - Full error:', error);
    return false;
  }
}

// Test 2: Direct OpenAI API call with project header
async function testDirectOpenAI() {
  console.log('\n3. Testing DIRECT OpenAI API with project header:');
  
  try {
    const OpenAI = require('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      defaultHeaders: {
        'OpenAI-Project': process.env.OPENAI_PROJECT_ID || '@TheArc'
      }
    });

    console.log('   - OpenAI instance created with project header');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'What is OpenAI?' }
      ],
      max_tokens: 100
    });

    console.log('   ✅ SUCCESS! Direct OpenAI working!');
    console.log('   - Response:', response.choices[0].message.content);
    return true;
  } catch (error) {
    console.log('   ❌ ERROR:', error.message);
    console.log('   - Error type:', error.constructor.name);
    return false;
  }
}

// Test 3: Portkey without project header (should fail)
async function testPortkeyWithoutHeader() {
  console.log('\n4. Testing Portkey WITHOUT project header (should fail):');
  
  try {
    const portkey = new Portkey({
      apiKey: process.env.PORTKEY_API_KEY
      // No defaultHeaders
    });

    const response = await portkey.chat.completions.create({
      model: '@TheArc/text-moderation-stable',
      messages: [
        { role: 'user', content: 'What is Portkey?' }
      ],
      max_tokens: 100
    });

    console.log('   ⚠️  UNEXPECTED SUCCESS! (This should have failed)');
    return true;
  } catch (error) {
    console.log('   ✅ EXPECTED ERROR:', error.message);
    return false;
  }
}

// Test 4: Different project ID values
async function testDifferentProjectIds() {
  console.log('\n5. Testing different project ID values:');
  
  const projectIds = ['@TheArc', 'TheArc', 'thearc', 'THEARC'];
  
  for (const projectId of projectIds) {
    try {
      console.log(`   - Testing project ID: "${projectId}"`);
      
      const portkey = new Portkey({
        apiKey: process.env.PORTKEY_API_KEY,
        defaultHeaders: {
          'OpenAI-Project': projectId
        }
      });

      const response = await portkey.chat.completions.create({
        model: '@TheArc/text-moderation-stable',
        messages: [
          { role: 'user', content: 'Test' }
        ],
        max_tokens: 10
      });

      console.log(`   ✅ SUCCESS with "${projectId}"!`);
      return projectId;
    } catch (error) {
      console.log(`   ❌ Failed with "${projectId}":`, error.message);
    }
  }
  
  return null;
}

// Run all tests
async function runDeepAnalysis() {
  console.log('Starting deep analysis...\n');
  
  const results = {
    portkeyExact: await testPortkeyExact(),
    directOpenAI: await testDirectOpenAI(),
    portkeyWithoutHeader: await testPortkeyWithoutHeader(),
    correctProjectId: await testDifferentProjectIds()
  };
  
  console.log('\n📊 DEEP ANALYSIS RESULTS:');
  console.log('========================');
  console.log('Portkey with exact config:', results.portkeyExact ? '✅ WORKING' : '❌ FAILING');
  console.log('Direct OpenAI with header:', results.directOpenAI ? '✅ WORKING' : '❌ FAILING');
  console.log('Portkey without header:', results.portkeyWithoutHeader ? '⚠️  UNEXPECTED' : '✅ EXPECTED FAIL');
  console.log('Correct project ID found:', results.correctProjectId || '❌ NONE WORKED');
  
  if (results.correctProjectId) {
    console.log('\n🎯 SOLUTION FOUND!');
    console.log(`Use project ID: "${results.correctProjectId}"`);
  } else {
    console.log('\n💥 NO SOLUTION FOUND');
    console.log('The issue might be:');
    console.log('1. API key is not properly activated');
    console.log('2. Portkey service is down');
    console.log('3. Model "@TheArc/text-moderation-stable" is not available');
    console.log('4. OpenAI project configuration issue');
  }
}

runDeepAnalysis();
