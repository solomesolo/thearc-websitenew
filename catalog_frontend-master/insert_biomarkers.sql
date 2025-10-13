-- Insert Biomarkers data into Supabase
-- Run this in your Supabase SQL editor

INSERT INTO "public"."Biomarkers" ("id", "created_at", "biomarker name", "biomarker info", "biomarker code") VALUES 
('1', '2025-08-19 13:21:09.294292+00', 'C-Reactive Protein (CRP)', 'What it measures: A protein made by the liver when there''s inflammation in the body.
Why it matters: High CRP can mean your body is fighting an infection, you''ve had an injury, or there''s ongoing inflammation that may raise your risk for heart disease.
Who might consider testing: People with unexplained fatigue, joint pain, chronic conditions (like arthritis), or who want to check inflammation as part of heart health screening.
Who should not rely only on this test: Anyone with fever, severe pain, or other clear infection signs — CRP won''t tell you where the problem is.', '1988-5'),

('2', '2025-08-19 13:21:52.966434+00', 'High-sensitivity CRP (hs-CRP)', 'What it measures: Same protein as CRP but with a more precise test.
Why it matters: Detects lower levels of inflammation that are linked to future risk of heart attack or stroke.
Who might consider testing: People curious about their long-term heart health risk, especially if they have family history, high blood pressure, or high cholesterol.
Who should not rely only on this test: People who are sick with a cold, flu, or infection at the time — results will be misleading.', '30522-7'),

('3', '2025-08-19 13:22:22.961838+00', 'Erythrocyte Sedimentation Rate (ESR)', 'What it measures: How quickly red blood cells settle in a tube — faster settling = more inflammation.
Why it matters: General indicator of inflammation. Useful for tracking autoimmune or chronic conditions like lupus or rheumatoid arthritis.
Who might consider testing: People with unexplained fatigue, weight loss, joint stiffness, or monitoring known autoimmune conditions.
Who should not rely only on this test: Anyone looking for a specific diagnosis — ESR just says "inflammation is present" but not why.', '4537-7'),

('4', '2025-08-19 13:23:08.758547+00', 'Interleukin-6 (IL-6)', 'What it measures: A signaling molecule (cytokine) released during inflammation and immune response.
Why it matters: High IL-6 levels are linked to infections, autoimmune conditions, and increased risk of chronic diseases like heart disease and type 2 diabetes.
Who might consider testing: People tracking immune health, recovering from infection, or exploring chronic inflammation causes.
Who should not rely only on this test: Anyone trying to diagnose themselves — IL-6 is a research-heavy marker and not a stand-alone clinical test.', '26881-3'),

('5', '2025-08-19 13:23:33.347434+00', 'Homocysteine', 'What it measures: An amino acid in the blood.
Why it matters: High levels may damage blood vessels and raise the risk of heart disease, stroke, and dementia. They can also mean your body isn''t getting enough vitamin B12, B6, or folate.
Who might consider testing: People with family history of heart disease, cognitive decline, or those on a vegetarian/vegan diet (risk of B12 deficiency).
Who should not rely only on this test: Anyone who thinks a single "high" result means they''ll definitely have a heart attack — it''s a risk marker, not a diagnosis.', '13965-9'),

('6', '2025-08-19 13:24:00.892274+00', 'Fasting Glucose', 'What it measures: The level of sugar (glucose) in your blood after not eating for at least 8 hours.
Why it matters: Shows how your body handles sugar when at rest. High levels can mean prediabetes or diabetes.
Who might consider testing: Anyone with family history of diabetes, unexplained thirst/urination, fatigue, or as part of a routine health check.
Who should not rely only on this test: People who want a full picture of blood sugar — one snapshot isn''t enough, and stress or even poor sleep can raise glucose temporarily.', '1558-6'),

('7', '2025-08-19 13:24:20.342144+00', 'HbA1c (Hemoglobin A1c)', 'What it measures: The percentage of sugar attached to your red blood cells, reflecting average blood sugar over the past 2–3 months.
Why it matters: Gold-standard marker for long-term blood sugar control. Used to diagnose and monitor diabetes.
Who might consider testing: People at risk of diabetes, those already diagnosed, or anyone curious about long-term sugar control.
Who should not rely only on this test: People with certain blood disorders (like anemia) — HbA1c can be misleading.', '4548-4'),

('8', '2025-08-19 13:24:44.338476+00', 'Insulin', 'What it measures: The hormone that moves sugar from blood into cells for energy.
Why it matters: High insulin with normal glucose can mean your body is working harder to keep sugars controlled (early insulin resistance).
Who might consider testing: People with weight gain around the belly, family history of diabetes, or polycystic ovary syndrome (PCOS).
Who should not rely only on this test: Anyone using insulin medication (values will not reflect natural levels).', '27898-6'),

('9', '2025-08-19 13:25:12.844853+00', 'HOMA-IR (calculated)', 'What it measures: A calculation using fasting glucose + insulin to estimate insulin resistance.
Why it matters: Early warning sign for type 2 diabetes and metabolic syndrome.
Who might consider testing: Anyone at risk of diabetes or struggling with weight and energy issues.
Who should not rely only on this test: People with type 1 diabetes or on insulin therapy.', null),

('10', '2025-08-19 13:25:37.174309+00', 'Total Cholesterol', 'What it measures: The total amount of cholesterol in your blood.
Why it matters: High total cholesterol can increase risk for heart disease, but by itself doesn''t tell the full story.
Who might consider testing: Everyone as part of routine heart health checks.
Who should not rely only on this test: Anyone assessing true heart risk — total cholesterol doesn''t separate "good" from "bad."', '2093-3'),

('11', '2025-08-19 13:25:59.534527+00', 'LDL Cholesterol', 'What it measures: Cholesterol carried in low-density lipoproteins, which can deposit in artery walls.
Why it matters: Higher LDL = higher risk of heart attack or stroke.
Who might consider testing: Anyone checking heart health, especially with family history.
Who should not rely only on this test: People with metabolic syndrome or diabetes — triglycerides and ApoB often matter more than LDL alone.', '18262-6'),

('12', '2025-08-19 13:26:21.668496+00', 'HDL Cholesterol', 'What it measures: Cholesterol carried in high-density lipoproteins, which help clear cholesterol from the bloodstream.
Why it matters: Higher HDL is generally protective, but very high values can sometimes be less helpful than thought.
Who might consider testing: Anyone doing routine heart screening.
Who should not rely only on this test: People who think "high HDL cancels out high LDL" — risk still remains.', '48090-5'),

('13', '2025-08-19 13:26:39.29273+00', 'Triglycerides', 'What it measures: Fats in the blood from food or produced by the liver.
Why it matters: High triglycerides increase risk for heart disease and pancreatitis.
Who might consider testing: People with obesity, diabetes, high-carb diets, or family history of lipid issues.
Who should not rely only on this test: Anyone testing after a recent meal — results will be falsely high.', '2571-8'),

('14', '2025-08-19 13:27:00.913997+00', 'Apolipoprotein B (ApoB)', 'What it measures: The number of LDL particles (each LDL has one ApoB).
Why it matters: Considered more accurate than LDL cholesterol for predicting heart risk, since it counts particle number, not just cholesterol amount.
Who might consider testing: People with metabolic syndrome, diabetes, or high LDL despite "normal" cholesterol values.
Who should not rely only on this test: People expecting diet alone to rapidly change ApoB — it usually takes significant lifestyle or medication changes.', '35468-3'),

('15', '2025-08-19 13:27:37.437225+00', 'Lipoprotein(a)', 'What it measures: A type of LDL-like particle with an extra protein attached.
Why it matters: Strong genetic risk factor for heart disease and stroke. Doesn''t usually change with lifestyle.
Who might consider testing: Anyone with family history of early heart disease or stroke. Usually tested once in life.
Who should not rely only on this test: People who think lowering LDL automatically lowers Lp(a) — it doesn''t.', '10839-9'),

('16', '2025-08-19 13:28:00.000000+00', 'Testosterone', 'What it measures: The primary male sex hormone, also present in smaller amounts in women.
Why it matters: Low testosterone can cause fatigue, low libido, muscle loss, and mood changes. High levels in women can cause irregular periods and other symptoms.
Who might consider testing: Men with low energy, low libido, or women with irregular periods, acne, or excess hair growth.
Who should not rely only on this test: Anyone on hormone therapy — results will reflect treatment, not natural levels.', '2986-8'),

('17', '2025-08-19 13:28:30.000000+00', 'Prostate-specific antigen (PSA)', 'What it measures: A protein produced by the prostate gland.
Why it matters: Elevated PSA can indicate prostate inflammation, enlargement, or cancer. Used for prostate cancer screening.
Who might consider testing: Men over 50, or younger men with family history of prostate cancer or urinary symptoms.
Who should not rely only on this test: Anyone with recent prostate procedures or infections — PSA will be temporarily elevated.', '2857-1'),

('18', '2025-08-19 13:29:00.000000+00', 'Creatinine', 'What it measures: A waste product filtered by the kidneys.
Why it matters: High creatinine indicates poor kidney function. Used to assess kidney health and function.
Who might consider testing: People with diabetes, high blood pressure, or family history of kidney disease.
Who should not rely only on this test: Athletes or people with high muscle mass — creatinine may be naturally higher.', '2160-0'),

('19', '2025-08-19 13:29:30.000000+00', 'Uric Acid', 'What it measures: A waste product from the breakdown of purines (found in certain foods).
Why it matters: High uric acid can cause gout and kidney stones. May also indicate metabolic issues.
Who might consider testing: People with joint pain, kidney stones, or those on certain medications.
Who should not rely only on this test: Anyone with recent alcohol consumption or high-purine meals — results may be temporarily elevated.', '3084-1'),

('20', '2025-08-19 13:30:00.000000+00', 'Cortisol', 'What it measures: The body''s main stress hormone, produced by the adrenal glands.
Why it matters: High cortisol can indicate stress, Cushing''s syndrome, or adrenal tumors. Low levels can indicate adrenal insufficiency.
Who might consider testing: People with unexplained weight changes, fatigue, mood issues, or blood pressure problems.
Who should not rely only on this test: Anyone under extreme stress or with irregular sleep patterns — cortisol varies throughout the day.', '2143-6'); 