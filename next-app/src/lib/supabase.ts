import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug logging (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Supabase Config Check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlValid: supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseUrl.startsWith('http'),
    keyValid: supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
  });
}

// Only create Supabase client if both URL and key are provided
export const supabase = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
  supabaseUrl.startsWith('http')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Log if Supabase client is not initialized
if (!supabase && typeof window !== 'undefined') {
  console.warn('Supabase client not initialized. Check environment variables:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseAnonKey ? 'Set' : 'Missing'
  });
}

// Database table names
export const TABLES = {
    PROVIDERS: 'Providers_Table',
    PRODUCTS: 'products',
    BIOMARKERS: 'Biomarkers'
} as const;
