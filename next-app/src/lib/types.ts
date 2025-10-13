// Supabase Schema Types
export type Biomarker = {
    id: number;
    created_at: string;
    "biomarker name": string;
    "biomarker info": string;
    "biomarker code": string;
}

export type Review = {
    id: number;
    title: string;
    link: string;
    source: string;
    date?: string;
}

// Updated Provider type to match Supabase Providers_Table
export type Provider = {
    id: number;
    created_at: string;
    "Company Name": string;
    "Company Location": string;
    "Company Description": string;
    "Reviews": string;
    "Tag": any[]; // JSON array of objects with {tag, category}
    "Website Link": string;
    "logo": string;
    "Mentions": string;
    "Pros": string;
    "Cons": string;
}

// Updated Product type to match Supabase products table
export type Product = {
    id: number;
    provider_id: number;
    name: string;
    description: string;
    price: string;
    tags: any; // JSON object with type, audience, features arrays
    biomarkers: any; // JSON object with biomarkers array
    available: boolean;
    created_at: string;
    "about this test": string;
    "What can it help check or prevent?": string;
    "Who is this most important for?": string;
}

// Provider with products relationship
export type ProviderWithProducts = Provider & {
    products?: Product[];
}

// Filter types
export type ProviderFilters = {
    locations: string[];
    tags: string[];
    hasProducts: boolean;
}

export type ProductFilters = {
    tags: string[];
    biomarkers: string[];
    available: boolean;
}
