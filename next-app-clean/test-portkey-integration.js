// Test script to verify Portkey integration
const { portkeyService } = require('./src/lib/portkey.ts');

console.log('🧪 Testing Portkey Integration...');

// Test 1: Check if Portkey service initializes
console.log('\n1. Testing Portkey Service Initialization:');
const status = portkeyService.getStatus();
console.log('Status:', status);

// Test 2: Check if monitoring is enabled
console.log('\n2. Testing Monitoring Status:');
console.log('Monitoring Enabled:', portkeyService.isMonitoringEnabled());

// Test 3: Simulate environment with API key
console.log('\n3. Testing with simulated API key:');
process.env.PORTKEY_API_KEY = 'rh1EFJioiosWBOgkpDiUeZf3WqrI';

// Re-import to get new instance with API key
delete require.cache[require.resolve('./src/lib/portkey.ts')];
const { portkeyService: newPortkeyService } = require('./src/lib/portkey.ts');

console.log('New Status:', newPortkeyService.getStatus());
console.log('New Monitoring Enabled:', newPortkeyService.isMonitoringEnabled());

console.log('\n✅ Portkey integration test completed!');
