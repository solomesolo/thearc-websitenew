-- Insert Biomarkers data that exactly match your product codes
-- Run this in your Supabase SQL editor

INSERT INTO "public"."Biomarkers" ("id", "created_at", "biomarker name", "biomarker info", "biomarker code") VALUES 

-- HDL Cholesterol - Code: 48090-5
('1', '2025-08-19 13:26:21.668496+00', 'HDL Cholesterol', 'What it measures: Cholesterol carried in high-density lipoproteins, which help clear cholesterol from the bloodstream.
Why it matters: Higher HDL is generally protective, but very high values can sometimes be less helpful than thought.
Who might consider testing: Anyone doing routine heart screening.
Who should not rely only on this test: People who think "high HDL cancels out high LDL" — risk still remains.', '48090-5'),

-- LDL Cholesterol - Code: 18262-6
('2', '2025-08-19 13:25:59.534527+00', 'LDL Cholesterol', 'What it measures: Cholesterol carried in low-density lipoproteins, which can deposit in artery walls.
Why it matters: Higher LDL = higher risk of heart attack or stroke.
Who might consider testing: Anyone checking heart health, especially with family history.
Who should not rely only on this test: People with metabolic syndrome or diabetes — triglycerides and ApoB often matter more than LDL alone.', '18262-6'),

-- Triglycerides - Code: 2571-8
('3', '2025-08-19 13:26:39.29273+00', 'Triglycerides', 'What it measures: Fats in the blood from food or produced by the liver.
Why it matters: High triglycerides increase risk for heart disease and pancreatitis.
Who might consider testing: People with obesity, diabetes, high-carb diets, or family history of lipid issues.
Who should not rely only on this test: Anyone testing after a recent meal — results will be falsely high.', '2571-8'),

-- Testosterone - Code: 2986-8
('4', '2025-08-19 13:28:00.000000+00', 'Testosterone', 'What it measures: The primary male sex hormone, also present in smaller amounts in women.
Why it matters: Low testosterone can cause fatigue, low libido, muscle loss, and mood changes. High levels in women can cause irregular periods and other symptoms.
Who might consider testing: Men with low energy, low libido, or women with irregular periods, acne, or excess hair growth.
Who should not rely only on this test: Anyone on hormone therapy — results will reflect treatment, not natural levels.', '2986-8'),

-- Prostate-specific antigen (PSA) - Code: 2857-1
('5', '2025-08-19 13:28:30.000000+00', 'Prostate-specific antigen (PSA)', 'What it measures: A protein produced by the prostate gland.
Why it matters: Elevated PSA can indicate prostate inflammation, enlargement, or cancer. Used for prostate cancer screening.
Who might consider testing: Men over 50, or younger men with family history of prostate cancer or urinary symptoms.
Who should not rely only on this test: Anyone with recent prostate procedures or infections — PSA will be temporarily elevated.', '2857-1'),

-- Creatinine - Code: 2160-0
('6', '2025-08-19 13:29:00.000000+00', 'Creatinine', 'What it measures: A waste product filtered by the kidneys.
Why it matters: High creatinine indicates poor kidney function. Used to assess kidney health and function.
Who might consider testing: People with diabetes, high blood pressure, or family history of kidney disease.
Who should not rely only on this test: Athletes or people with high muscle mass — creatinine may be naturally higher.', '2160-0'),

-- Uric Acid - Code: 3084-1
('7', '2025-08-19 13:29:30.000000+00', 'Uric Acid', 'What it measures: A waste product from the breakdown of purines (found in certain foods).
Why it matters: High uric acid can cause gout and kidney stones. May also indicate metabolic issues.
Who might consider testing: People with joint pain, kidney stones, or those on certain medications.
Who should not rely only on this test: Anyone with recent alcohol consumption or high-purine meals — results may be temporarily elevated.', '3084-1'),

-- Cortisol - Code: 2143-6
('8', '2025-08-19 13:30:00.000000+00', 'Cortisol', 'What it measures: The body''s main stress hormone, produced by the adrenal glands.
Why it matters: High cortisol can indicate stress, Cushing''s syndrome, or adrenal tumors. Low levels can indicate adrenal insufficiency.
Who might consider testing: People with unexplained weight changes, fatigue, mood issues, or blood pressure problems.
Who should not rely only on this test: Anyone under extreme stress or with irregular sleep patterns — cortisol varies throughout the day.', '2143-6'),

-- HbA1c (Long-term blood sugar) - Code: 4548-4
('9', '2025-08-19 13:24:20.342144+00', 'HbA1c (Hemoglobin A1c)', 'What it measures: The percentage of sugar attached to your red blood cells, reflecting average blood sugar over the past 2–3 months.
Why it matters: Gold-standard marker for long-term blood sugar control. Used to diagnose and monitor diabetes.
Who might consider testing: People at risk of diabetes, those already diagnosed, or anyone curious about long-term sugar control.
Who should not rely only on this test: People with certain blood disorders (like anemia) — HbA1c can be misleading.', '4548-4'); 