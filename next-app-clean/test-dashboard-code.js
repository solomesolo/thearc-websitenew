// Exact code from Portkey dashboard
const { default: Portkey } = require('portkey-ai');

const portkey = new Portkey({
  apiKey: "rh1EFJioiosWBOgkpDiUeZf3Wqrl"
});

async function main() {
  try {
    console.log('🧪 Testing exact dashboard code...');
    const response = await portkey.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "What is Portkey" }
      ],
      model: "@TheArc/text-moderation-stable",
      max_tokens: 512
    });
    console.log('✅ SUCCESS!');
    console.log('Response:', response.choices[0].message.content);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.message.includes('OpenAI-Project header')) {
      console.log('\n🔧 This confirms we need the OpenAI-Project header fix!');
    }
  }
}

main();
