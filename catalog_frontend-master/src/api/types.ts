// API Response Types
export type BlogPost = {
    image_url?: string;
    image?: string;
    text?: string;
    id: number;
    title: string;
    content: string;
    author?: string;
    published_date?: string;
    tags: string[];
    featured_image?: string;
    excerpt?: string;
}

export type ServiceTag = {
    id: number;
    name: string;
    description?: string;
    category?: string;
}

export type BriefServiceTag = {
    id: number;
    name: string;
}

export type Category = {
    id: number;
    name: string;
    description?: string;
    parent?: number;
}

export type BriefCategory = {
    id: number;
    name: string;
}

export type Country = {
    id: number;
    name: string;
    code: string;
    flag_url?: string;
}

export type ServiceScreenshot = {
    id: number;
    image_url: string;
    caption?: string;
    order: number;
}

export type CertificatesOrg = {
    id: number;
    name: string;
    description?: string;
    logo_url?: string;
}

export type Certificates = {
    specification?: string;
    image?: string;
    organisation_entity?: {
        image?: string;
    };
    id: number;
    name: string;
    description?: string;
    certificate_url?: string;
    organization: CertificatesOrg;
    issued_date?: string;
    expiry_date?: string;
}

export type Rating = {
    score?: number;
    id: number;
    rating: number;
    review_text?: string;
    reviewer_name?: string;
    review_date?: string;
    source?: string;
}

export type Email = {
    id: number;
    email: string;
    is_primary: boolean;
    is_verified: boolean;
}

export type ServiceRatingReview = {
    id: number;
    rating: number;
    review_text?: string;
    reviewer_name?: string;
    review_date?: string;
    source?: string;
    service: number;
}

export type ServiceMentionSerializer = {
    id: number;
    title: string;
    url: string;
    source: string;
    published_date?: string;
    excerpt?: string;
}

export type Feature = {
    id: number;
    name: string;
    description?: string;
    icon_url?: string;
}

export type Service = {
    id: number,
    name: string,
    description: string,
    bio: string,
    screenshots: ServiceScreenshot[],
    link: string,
    logo: string,
    tags: BriefServiceTag[],
    ratings: Rating[],
    countries: Country[],
    features: Feature[],
    mentions: ServiceMentionSerializer[],
    categories: BriefCategory[],
    certificates: Certificates[],
}

export type PageStat = {
    total_pages: number,
    count: number,
    page: number,
    per_page: number,
}

export type Paginated<Type> = PageStat & {
    results: Type[],
}

// Supabase Schema Types
export type Biomarker = {
    code: string;
    name: string;
    category?: string;
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
