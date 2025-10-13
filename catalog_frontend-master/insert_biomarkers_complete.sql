-- Insert ALL Biomarkers data that match your product codes
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
Who should not rely only on this test: People with certain blood disorders (like anemia) — HbA1c can be misleading.', '4548-4'),

-- Folic acid - Code: 2284-8
('10', '2025-08-19 13:31:00.000000+00', 'Folic acid', 'What it measures: Vitamin B9, essential for DNA synthesis and cell division.
Why it matters: Low levels can cause anemia and are critical during pregnancy to prevent neural tube defects.
Who might consider testing: Pregnant women, people with anemia, or those on certain medications.
Who should not rely only on this test: Anyone who recently started folic acid supplements — levels will be artificially elevated.', '2284-8'),

-- TSH (sensitive) - Code: 3016-3
('11', '2025-08-19 13:31:30.000000+00', 'TSH (sensitive)', 'What it measures: Thyroid-stimulating hormone, which controls thyroid function.
Why it matters: High TSH indicates underactive thyroid, low TSH indicates overactive thyroid.
Who might consider testing: People with fatigue, weight changes, mood issues, or family history of thyroid problems.
Who should not rely only on this test: Anyone on thyroid medication — results will reflect treatment, not natural function.', '3016-3'),

-- Prolactin - Code: 2842-1
('12', '2025-08-19 13:32:00.000000+00', 'Prolactin', 'What it measures: A hormone that stimulates milk production and affects reproductive function.
Why it matters: High levels can cause irregular periods, infertility, and milk production in non-pregnant women.
Who might consider testing: Women with irregular periods, infertility, or unexpected milk production.
Who should not rely only on this test: Anyone who recently breastfed or had chest stimulation — levels will be temporarily elevated.', '2842-1'),

-- Sex hormone-binding globulin (SHBG) - Code: 13979-2
('13', '2025-08-19 13:32:30.000000+00', 'Sex hormone-binding globulin (SHBG)', 'What it measures: A protein that binds to sex hormones, controlling their availability.
Why it matters: High SHBG can reduce available testosterone, low SHBG can increase it. Affects hormone balance.
Who might consider testing: People with hormonal imbalances, PCOS, or thyroid issues.
Who should not rely only on this test: Anyone on hormone therapy — results will be affected by treatment.', '13979-2'),

-- 25-OH-Vitamin-D3 - Code: 14635-7
('14', '2025-08-19 13:33:00.000000+00', '25-OH-Vitamin-D3', 'What it measures: The main form of vitamin D in the blood, indicating vitamin D status.
Why it matters: Low levels can cause bone problems, muscle weakness, and immune system issues.
Who might consider testing: People with limited sun exposure, dark skin, or bone health concerns.
Who should not rely only on this test: Anyone who recently started vitamin D supplements — levels will be artificially elevated.', '14635-7'),

-- Calcium - Code: 49765-1
('15', '2025-08-19 13:33:30.000000+00', 'Calcium', 'What it measures: The amount of calcium in the blood, essential for bones and muscle function.
Why it matters: High or low levels can indicate bone, kidney, or parathyroid problems.
Who might consider testing: People with bone problems, kidney issues, or muscle cramps.
Who should not rely only on this test: Anyone on calcium supplements — levels may be artificially elevated.', '49765-1'),

-- Magnesium - Code: 19123-9
('16', '2025-08-19 13:34:00.000000+00', 'Magnesium', 'What it measures: An essential mineral for muscle, nerve, and heart function.
Why it matters: Low levels can cause muscle cramps, heart rhythm problems, and fatigue.
Who might consider testing: People with muscle cramps, heart issues, or chronic fatigue.
Who should not rely only on this test: Anyone on magnesium supplements — levels may be artificially elevated.', '19123-9'),

-- Ferritin - Code: 2276-4
('17', '2025-08-19 13:34:30.000000+00', 'Ferritin', 'What it measures: A protein that stores iron, indicating iron status.
Why it matters: Low levels indicate iron deficiency, high levels can indicate inflammation or iron overload.
Who might consider testing: People with fatigue, anemia, or heavy menstrual periods.
Who should not rely only on this test: Anyone with recent infection or inflammation — levels may be falsely elevated.', '2276-4'),

-- Sodium - Code: 2947-0
('18', '2025-08-19 13:35:00.000000+00', 'Sodium', 'What it measures: An electrolyte that helps control fluid balance and blood pressure.
Why it matters: High or low levels can cause serious health problems including confusion and seizures.
Who might consider testing: People with dehydration, heart problems, or taking certain medications.
Who should not rely only on this test: Anyone who recently consumed a lot of salt or water — levels may be temporarily affected.', '2947-0'),

-- Transcobalamin - Code: 3032-0
('19', '2025-08-19 13:35:30.000000+00', 'Transcobalamin', 'What it measures: A protein that transports vitamin B12 in the blood.
Why it matters: Low levels can indicate B12 deficiency even when B12 levels appear normal.
Who might consider testing: People with B12 deficiency symptoms or absorption problems.
Who should not rely only on this test: Anyone who recently started B12 supplements — levels may be affected.', '3032-0'),

-- Vitamin B12 - Code: 2132-9
('20', '2025-08-19 13:36:00.000000+00', 'Vitamin B12', 'What it measures: An essential vitamin for nerve function and red blood cell production.
Why it matters: Low levels can cause anemia, nerve damage, and cognitive problems.
Who might consider testing: People with fatigue, numbness, or vegetarian/vegan diets.
Who should not rely only on this test: Anyone who recently started B12 supplements — levels will be artificially elevated.', '2132-9'),

-- Selenium - Code: 5724-0
('21', '2025-08-19 13:36:30.000000+00', 'Selenium', 'What it measures: A trace mineral important for thyroid function and antioxidant defense.
Why it matters: Low levels can affect thyroid function, high levels can be toxic.
Who might consider testing: People with thyroid problems or those in selenium-deficient areas.
Who should not rely only on this test: Anyone on selenium supplements — levels may be artificially elevated.', '5724-0'),

-- Manganese - Code: 5681-2
('22', '2025-08-19 13:37:00.000000+00', 'Manganese', 'What it measures: A trace mineral involved in bone formation and metabolism.
Why it matters: Low levels can affect bone health, high levels can be toxic to the nervous system.
Who might consider testing: People with bone problems or those exposed to manganese in work environments.
Who should not rely only on this test: Anyone on manganese supplements — levels may be artificially elevated.', '5681-2'),

-- Copper - Code: 5631-7
('23', '2025-08-19 13:37:30.000000+00', 'Copper', 'What it measures: A trace mineral essential for iron metabolism and nerve function.
Why it matters: Low levels can cause anemia and nerve problems, high levels can be toxic.
Who might consider testing: People with anemia, nerve problems, or Wilson''s disease.
Who should not rely only on this test: Anyone on copper supplements — levels may be artificially elevated.', '5631-7'),

-- Zinc - Code: 5768-5
('24', '2025-08-19 13:38:00.000000+00', 'Zinc', 'What it measures: An essential mineral for immune function and wound healing.
Why it matters: Low levels can weaken the immune system and slow healing.
Who might consider testing: People with frequent infections, slow wound healing, or poor appetite.
Who should not rely only on this test: Anyone on zinc supplements — levels may be artificially elevated.', '5768-5'); 