import { supabase } from './supabase';

export async function testBiomarkersTable() {
	console.log('🧪 Testing Biomarkers table access...');
	
	try {
		// Test 1: Check if we can connect to Supabase
		console.log('1. Testing Supabase connection...');
		const { data: testData, error: testError } = await supabase
			.from('Providers_Table')
			.select('id')
			.limit(1);
		
		if (testError) {
			console.error('❌ Supabase connection failed:', testError);
			return false;
		}
		console.log('✅ Supabase connection successful');
		
		// Test 2: Check if Biomarkers table exists
		console.log('2. Testing Biomarkers table access...');
		const { data: biomarkers, error: biomarkersError } = await supabase
			.from('Biomarkers')
			.select('*')
			.limit(5);
		
		if (biomarkersError) {
			console.error('❌ Biomarkers table access failed:', biomarkersError);
			console.error('Error details:', {
				message: biomarkersError.message,
				details: biomarkersError.details,
				hint: biomarkersError.hint,
				code: biomarkersError.code
			});
			return false;
		}
		
		console.log('✅ Biomarkers table access successful');
		console.log('📊 Found', biomarkers?.length || 0, 'biomarkers');
		
		if (biomarkers && biomarkers.length > 0) {
			console.log('📋 Sample biomarker:', biomarkers[0]);
			console.log('🔍 Available columns:', Object.keys(biomarkers[0]));
			
			// Test 3: Check specific codes
			const testCodes = ['48090-5', '18262-6', '2571-8'];
			console.log('3. Testing specific biomarker codes:', testCodes);
			
			const { data: specificBiomarkers, error: specificError } = await supabase
				.from('Biomarkers')
				.select('*')
				.in('biomarker code', testCodes);
			
			if (specificError) {
				console.error('❌ Specific codes query failed:', specificError);
			} else {
				console.log('✅ Found', specificBiomarkers?.length || 0, 'matching biomarkers');
				if (specificBiomarkers && specificBiomarkers.length > 0) {
					console.log('📋 Matching biomarkers:', specificBiomarkers.map((b: any) => `${b['biomarker name']} (${b['biomarker code']})`));
				}
			}
		}
		
		return true;
		
	} catch (error) {
		console.error('❌ Test failed with exception:', error);
		return false;
	}
}

// Export for use in browser console
(window as any).testBiomarkersTable = testBiomarkersTable; 