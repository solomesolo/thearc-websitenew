-- Fix RLS Policy for Biomarkers table
-- Run this in your Supabase SQL Editor

-- Option 1: Disable RLS completely (simplest solution)
ALTER TABLE "public"."Biomarkers" DISABLE ROW LEVEL SECURITY;

-- Option 2: Or create a policy that allows anonymous reads (more secure)
-- First, enable RLS if it's disabled
-- ALTER TABLE "public"."Biomarkers" ENABLE ROW LEVEL SECURITY;

-- Then create a policy for anonymous reads
-- CREATE POLICY "Allow anonymous reads on Biomarkers" ON "public"."Biomarkers"
--     FOR SELECT
--     TO anon
--     USING (true);

-- Verify the change
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'Biomarkers';

-- Test the access
SELECT COUNT(*) FROM "public"."Biomarkers"; 