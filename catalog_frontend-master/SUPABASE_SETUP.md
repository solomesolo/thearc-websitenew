# Supabase Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "Project URL" and "anon public" key
4. Add them to your `.env` file

## Database Schema

Make sure your Supabase database has the following tables:

### Providers_Table
```sql
CREATE TABLE "Providers_Table" (
  id BIGSERIAL PRIMARY KEY,
  "Company_Name" TEXT NOT NULL,
  "Company_Location" TEXT NOT NULL,
  "Company_Description" TEXT,
  "Tag" JSONB,
  "Website_Link" TEXT,
  logo TEXT,
  "Reviews_and_Mentions" TEXT
);
```

### products
```sql
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  provider_id BIGINT REFERENCES "Providers_Table"(id),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  tags JSONB,
  biomarkers JSONB,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Row Level Security (RLS)

Enable RLS and create policies for public read access:

```sql
-- Enable RLS
ALTER TABLE "Providers_Table" ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to providers" ON "Providers_Table"
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);
```

## Sample Data

You can insert sample data to test the marketplace:

```sql
-- Insert sample providers
INSERT INTO "Providers_Table" ("Company_Name", "Company_Location", "Company_Description", "Tag", "Website_Link", logo) VALUES
('HealthCheck Pro', 'UK', 'Comprehensive health testing with at-home sample collection', '["blood tests", "genetics"]', 'https://healthcheckpro.com', 'https://example.com/logo1.png'),
('PharmaTest Plus', 'UK', 'Professional pharmacy-based testing services', '["blood tests", "preventive"]', 'https://pharmatestplus.com', 'https://example.com/logo2.png'),
('LabDirect', 'UK', 'Direct lab appointment booking with expert consultation', '["lab tests", "specialized"]', 'https://labdirect.com', 'https://example.com/logo3.png');

-- Insert sample products
INSERT INTO products (provider_id, name, description, price, tags, biomarkers, available) VALUES
(1, 'Complete Blood Panel', 'Comprehensive blood analysis', 99.99, '["blood test", "preventive"]', '[{"code": "CBC", "name": "Complete Blood Count"}]', true),
(1, 'Genetic Health Test', 'DNA analysis for health insights', 199.99, '["genetics", "preventive"]', '[{"code": "DNA", "name": "Genetic Markers"}]', true),
(2, 'Cholesterol Check', 'Lipid panel analysis', 79.99, '["blood test", "cardiovascular"]', '[{"code": "LIPID", "name": "Lipid Panel"}]', true);
```

## Testing the Integration

1. Start the development server: `npm start`
2. Navigate to `/marketplace`
3. You should see the providers loaded from Supabase
4. Test the filters to ensure they work correctly

## Troubleshooting

- **No data showing**: Check your Supabase credentials and ensure RLS policies allow public read access
- **Filter errors**: Verify that your JSONB columns contain valid JSON arrays
- **Image loading issues**: Ensure logo URLs are accessible or provide fallback images 