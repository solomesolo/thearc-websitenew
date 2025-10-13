# Supabase Troubleshooting Guide

## Current Issue: Network Error / No Data Loading

The application is showing "Network Error" because it can't connect to your Supabase database or the required tables don't exist.

## Step-by-Step Fix:

### 1. Check Your Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Open your project: `wybfjytfwnpjztswoeyh`

### 2. Create the Required Tables

#### Table 1: Providers_Table
Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE "Providers_Table" (
    id SERIAL PRIMARY KEY,
    "Company_Name" TEXT NOT NULL,
    "Company_Description" TEXT,
    "Company_Location" TEXT,
    "Website_Link" TEXT,
    "Reviews_and_Mentions" TEXT,
    logo TEXT,
    "Tag" TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table 2: products
Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    available BOOLEAN DEFAULT true,
    provider_id INTEGER REFERENCES "Providers_Table"(id),
    tags TEXT[] DEFAULT '{}',
    biomarkers JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Enable Row Level Security (RLS)

Run this SQL to enable RLS and create policies:

```sql
-- Enable RLS on both tables
ALTER TABLE "Providers_Table" ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to providers" ON "Providers_Table"
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to products" ON products
    FOR SELECT USING (true);
```

### 4. Add Sample Data

Run this SQL to add some sample data:

```sql
-- Insert sample providers
INSERT INTO "Providers_Table" ("Company_Name", "Company_Description", "Company_Location", "Website_Link", "Tag") VALUES
('HealthTest Pro', 'Leading provider of comprehensive health testing services', 'United Kingdom', 'https://healthtestpro.com', ARRAY['blood_tests', 'genetic_testing', 'premium']),
('BioLab Solutions', 'Specialized in biomarker testing and analysis', 'Germany', 'https://biolabsolutions.de', ARRAY['biomarkers', 'research', 'certified_lab']),
('Wellness Diagnostics', 'At-home testing kits for preventive care', 'United States', 'https://wellnessdiagnostics.com', ARRAY['at-home_kit', 'preventive_care', 'fast_delivery']);

-- Insert sample products
INSERT INTO products (name, description, price, available, provider_id, tags, biomarkers) VALUES
('Comprehensive Blood Panel', 'Complete blood count and metabolic panel', 89.99, true, 1, ARRAY['blood_tests', 'comprehensive'], '[{"name": "CBC", "code": "CBC001"}, {"name": "Metabolic Panel", "code": "MET001"}]'),
('Genetic Health Screening', 'DNA analysis for health risks', 199.99, true, 1, ARRAY['genetic_testing', 'premium'], '[{"name": "BRCA1", "code": "BRCA001"}, {"name": "BRCA2", "code": "BRCA002"}]'),
('Biomarker Analysis Kit', 'Advanced biomarker testing', 149.99, true, 2, ARRAY['biomarkers', 'research'], '[{"name": "CRP", "code": "CRP001"}, {"name": "ESR", "code": "ESR001"}]');
```

### 5. Test the Connection

After setting up the tables and data:

1. Refresh your browser at `http://localhost:3000/marketplace`
2. Open the browser's Developer Tools (F12)
3. Check the Console tab for any error messages
4. You should see "Supabase connection successful!" in the console

### 6. Common Issues

#### Issue: "relation does not exist"
- **Solution**: Make sure you created the tables exactly as shown above
- **Check**: Go to Supabase Dashboard → Table Editor → Verify tables exist

#### Issue: "permission denied"
- **Solution**: Make sure RLS policies are created and enabled
- **Check**: Go to Supabase Dashboard → Authentication → Policies

#### Issue: "invalid input syntax"
- **Solution**: Check that your data types match the schema
- **Check**: Verify JSON arrays are properly formatted

### 7. Verify Your Setup

After completing the steps above, you should see:
- ✅ No more "Network Error" messages
- ✅ Provider cards displaying in the marketplace
- ✅ Filter options populated with data
- ✅ "View Details" buttons working

## Need Help?

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your Supabase project URL and API key in the `.env` file
3. Make sure your Supabase project is active and not paused 