-- Debug script to check what's in your Biomarkers table
-- Run this in your Supabase SQL Editor

-- 1. Check if the table exists and its structure
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Biomarkers' OR table_name = 'biomarkers';

-- 2. Check how many rows are in the Biomarkers table
SELECT COUNT(*) as total_rows FROM "public"."Biomarkers";

-- 3. Show the first few rows to see the actual data structure
SELECT * FROM "public"."Biomarkers" LIMIT 5;

-- 4. Check if there are any rows with the specific codes we're looking for
SELECT "biomarker code", "biomarker name" 
FROM "public"."Biomarkers" 
WHERE "biomarker code" IN ('48090-5', '18262-6', '2571-8', '2986-8', '2857-1');

-- 5. Check for any case sensitivity issues
SELECT "biomarker code", "biomarker name" 
FROM "public"."Biomarkers" 
WHERE LOWER("biomarker code") IN ('48090-5', '18262-6', '2571-8', '2986-8', '2857-1');

-- 6. List all unique biomarker codes in the table
SELECT DISTINCT "biomarker code" FROM "public"."Biomarkers" ORDER BY "biomarker code"; 