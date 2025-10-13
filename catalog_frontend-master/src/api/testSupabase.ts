import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
    try {
        console.log('Testing Supabase connection...');
        console.log('URL:', process.env.REACT_APP_SUPABASE_URL);
        console.log('Key exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
        
        // Test basic connection
        const { data, error } = await supabase
            .from('Providers_Table')
            .select('count')
            .limit(1);
        
        if (error) {
            console.error('Supabase connection error:', error);
            return { success: false, error: error.message };
        }
        
        console.log('Supabase connection successful!');
        console.log('Data:', data);
        return { success: true, data };
    } catch (err) {
        console.error('Unexpected error:', err);
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
}; 