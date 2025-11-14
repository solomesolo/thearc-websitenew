/**
 * Static Content Libraries for PDF Report Generation
 * 
 * This file contains all static content that serves as:
 * 1. Fallback content when LLM calls fail
 * 2. Deterministic content for personalization
 * 3. Base libraries for content generation
 */

// ============================================================================
// 1. SCREENING TESTS LIBRARY
// ============================================================================

export const TESTS = {
  "CRP": {
    name: "C-Reactive Protein (CRP)",
    why_default: "Inflammation marker linked to infection and cardiometabolic risk; helps monitor disease activity and treatment response",
    when_default: "When inflammation suspected; 4–12 wk to monitor"
  },
  "HbA1c": {
    name: "Hemoglobin A1c", 
    why_default: "Tracks 3‑month average blood sugar to detect diabetes and gauge control, predicting risks for nerve, kidney, eye, and heart disease",
    when_default: "Every 3–6 mo if at risk or managing diabetes"
  },
  "Lipid Panel": {
    name: "Complete Lipid Profile",
    why_default: "Measures 'bad' cholesterol driving plaque buildup; central to estimating ASCVD risk and guiding diet or statin therapy",
    when_default: "Annually; 6–12 wk after therapy changes"
  },
  "Vitamin D": {
    name: "25-OH Vitamin D",
    why_default: "Checks vitamin D status for bone strength, immunity, and mood; deficiency is common and reversible with supplements/sunlight",
    when_default: "Annually; 2–3 mo after starting supplements"
  },
  "TSH": {
    name: "Thyroid Stimulating Hormone",
    why_default: "Evaluates thyroid function affecting energy, weight, mood, and fertility; guides diagnosis and dosing of thyroid therapy",
    when_default: "Annually; 6–12 wk after med changes"
  },
  "B12": {
    name: "Vitamin B12",
    why_default: "Assesses vitamin B12 needed for nerves and blood cells; low levels cause anemia, neuropathy, and cognitive issues",
    when_default: "Annually; 2–3 mo after starting supplements"
  },
  "Ferritin": {
    name: "Ferritin",
    why_default: "Assesses iron balance to diagnose anemia or overload; guides treatment for fatigue, hair loss, and exercise tolerance",
    when_default: "Annually; sooner if fatigue or anemia"
  },
  "Cortisol": {
    name: "Cortisol (AM)",
    why_default: "Assesses hormonal health to detect problems early and guide prevention or treatment decisions",
    when_default: "Annually; sooner if abnormal or advised"
  },
  "Homocysteine": {
    name: "Homocysteine",
    why_default: "Elevated levels implicate B‑vitamin deficiency and higher cardiovascular and cognitive risk; modifiable with nutrition",
    when_default: "Annually; sooner if abnormal or symptomatic"
  },
  "Testosterone": {
    name: "Testosterone (Total)",
    why_default: "Assesses reproductive hormones impacting libido, cycles, fertility, mood, muscle mass, and work‑up of endocrine disorders",
    when_default: "As indicated by symptoms or fertility plans"
  },
  "ALT": {
    name: "Alanine Aminotransferase (ALT)",
    why_default: "Screens liver injury and cholestasis from fatty liver, alcohol, or medications; essential for therapy monitoring",
    when_default: "Annually; 6–12 wk if meds/alcohol change"
  },
  "Creatinine": {
    name: "Creatinine",
    why_default: "Monitors kidney filtration and waste handling; key for dosing medications and detecting chronic kidney disease early",
    when_default: "Annually; 3–6 mo if kidney risk"
  }
};

// ============================================================================
// 2. NUTRITION ARCHETYPES
// ============================================================================

export const ARCHETYPES = [
  "Anti-inflammatory Mediterranean",
  "Low-Carb Metabolic", 
  "Plant-Based Longevity",
  "Intermittent Fasting",
  "Ketogenic Therapeutic",
  "Mediterranean Plus"
];

// ============================================================================
// 3. MEAL PLANS LIBRARY (3-day fallback plans)
// ============================================================================

export const MEAL_PLANS = {
  "Anti-inflammatory Mediterranean": {
    principles: [
      "Choose omega-3 fish twice weekly; cook with extra-virgin olive oil",
      "Eat colorful vegetables and berries daily for antioxidants",
      "Avoid refined sugars and ultra-processed foods; pick whole grains"
    ],
    days: [
      {
        day: 1,
        breakfast: "Greek yogurt with berries, chia, and drizzle of olive oil",
        lunch: "Salmon salad with olives, cucumber, tomato, feta, whole grains",
        dinner: "Mediterranean chicken with lemon, herbs, roasted peppers and zucchini",
        snacks: [
          "Apple with almonds",
          "Carrot sticks with hummus",
          "Olives and cherry tomatoes"
        ]
      },
      {
        day: 2,
        breakfast: "Avocado toast on whole grain with cherry tomatoes and pumpkin seeds",
        lunch: "Lentil soup with spinach and herbs; side salad with olive oil",
        dinner: "Baked cod with lemon, capers, and sautéed greens",
        snacks: [
          "Greek yogurt cup",
          "Pear and walnuts"
        ]
      },
      {
        day: 3,
        breakfast: "Oatmeal with walnuts, blueberries, and cinnamon",
        lunch: "Quinoa bowl with chickpeas, roasted veggies, tahini",
        dinner: "Grilled sardines with tomato-cucumber salad and barley",
        snacks: [
          "Dark chocolate square",
          "Celery with tahini",
          "Orange"
        ]
      }
    ]
  },
  "Low-Carb Metabolic": {
    principles: [
      "Keep daily net carbs below 50 g; track portions",
      "Prioritize protein and healthy fats for satiety",
      "Load plates with non-starchy vegetables"
    ],
    days: [
      {
        day: 1,
        breakfast: "Scrambled eggs with spinach and mushrooms",
        lunch: "Grilled chicken salad with olive oil vinaigrette",
        dinner: "Seared salmon with asparagus and lemon butter",
        snacks: [
          "Cheese and cucumber",
          "Almonds"
        ]
      },
      {
        day: 2,
        breakfast: "Greek yogurt (unsweetened) with walnuts and cinnamon",
        lunch: "Turkey lettuce wraps with avocado and peppers",
        dinner: "Beef stir-fry with broccoli and bell peppers",
        snacks: [
          "Olives",
          "Celery with peanut butter"
        ]
      },
      {
        day: 3,
        breakfast: "Omelet with cheddar, tomatoes, and herbs",
        lunch: "Tuna salad over mixed greens with olive oil",
        dinner: "Roasted chicken thighs with Brussels sprouts",
        snacks: [
          "Pumpkin seeds",
          "Berries with cream"
        ]
      }
    ]
  },
  "Plant-Based Longevity": {
    principles: [
      "Center meals on whole plant foods, legumes, nuts, seeds, and grains",
      "Include fermented foods daily to support gut microbiome",
      "Choose deeply colored vegetables and herbs for phytonutrients"
    ],
    days: [
      {
        day: 1,
        breakfast: "Smoothie bowl with spinach, berries, soy yogurt, flaxseed",
        lunch: "Chickpea curry with tomatoes and spinach; brown rice",
        dinner: "Lentil bolognese over whole-grain pasta with basil",
        snacks: [
          "Apple with peanut butter",
          "Kimchi side",
          "Trail mix"
        ]
      },
      {
        day: 2,
        breakfast: "Overnight oats with chia, banana, and soy milk",
        lunch: "Quinoa salad with black beans, corn, cilantro, lime",
        dinner: "Tofu stir-fry with broccoli, peppers, and ginger",
        snacks: [
          "Hummus with carrots",
          "Kefir or kombucha"
        ]
      },
      {
        day: 3,
        breakfast: "Avocado toast on seeded bread with tomato and sprouts",
        lunch: "Lentil soup with kale; side whole-grain roll",
        dinner: "Stuffed bell peppers with brown rice, beans, herbs",
        snacks: [
          "Berries and almonds",
          "Sauerkraut cup",
          "Orange"
        ]
      }
    ]
  },
  "Intermittent Fasting": {
    principles: [
      "Practice a 16:8 fasting pattern; set an 8-hour eating window",
      "Pack meals with protein, fiber, and micronutrients",
      "Hydrate with water, tea, or black coffee during fasts"
    ],
    days: [
      {
        day: 1,
        breakfast: "Skipped; hydrate with water or tea",
        lunch: "Large salad with mixed greens, salmon, olive oil, seeds",
        dinner: "Salmon with roasted vegetables and lemon",
        snacks: [
          "Greek yogurt",
          "Cucumber slices"
        ]
      },
      {
        day: 2,
        breakfast: "Skipped; black coffee or herbal tea",
        lunch: "Quinoa bowl with chickpeas, veggies, tahini",
        dinner: "Grilled fish with greens and olive oil",
        snacks: [
          "Mixed nuts",
          "Apple"
        ]
      },
      {
        day: 3,
        breakfast: "Skipped; water and electrolytes as needed",
        lunch: "Lentil soup with side salad and olive oil",
        dinner: "Roast chicken with mixed vegetables",
        snacks: [
          "Cottage cheese",
          "Berries"
        ]
      }
    ]
  }
};

// ============================================================================
// 4. SUPPLEMENTS LIBRARY
// ============================================================================

export const SUPPS_CANONICAL = {
  "Vitamin D (D2 & D3)": {
    dose: "1,000–4,000 IU (25–100 µg) daily; adjust to 25‑OH vitamin D lab target (e.g., 75–125 nmol/L).",
    timing: "With the largest fat‑containing meal; daily or weekly equivalent.",
    why: "Supports bone, muscle, and immune function; corrects common deficiency due to low sun exposure or malabsorption.",
    safety: "Avoid excess (hypercalcemia, kidney stones). Caution with thiazide diuretics, sarcoidosis, hyperparathyroidism. Monitor calcium if high dose."
  },
  "Magnesium": {
    dose: "200–400 mg elemental/day (citrate or glycinate preferred; oxide may cause diarrhea).",
    timing: "Evening or divided doses with food; separate from thyroid/antibiotics by 2–4 h.",
    why: "Cofactor in energy, nerve, muscle, and glucose metabolism; may aid sleep, cramps, and blood pressure.",
    safety: "Diarrhea at higher doses; caution in kidney disease. Interacts with tetracyclines/fluoroquinolones and levothyroxine (lowers absorption)."
  },
  "Fish Oil / Omega-3 (including krill and algae oil)": {
    dose: "1–3 g/day combined EPA+DHA for general cardiometabolic support; 2–4 g under medical guidance for triglycerides.",
    timing: "With meals to reduce reflux; split doses if >1 g.",
    why: "EPA/DHA support triglyceride lowering, heart and brain health, and help balance inflammation.",
    safety: "May increase bleeding risk with anticoagulants/antiplatelets; fish allergy concerns (use algae oil). Stop before surgery if advised."
  },
  "CoQ10 (Ubiquinol, MitoQ)": {
    dose: "Ubiquinol 100–200 mg/day (older or on statins); CoQ10 100–300 mg/day; MitoQ 5–20 mg/day per label.",
    timing: "With fat‑containing meal for better absorption.",
    why: "Mitochondrial cofactor aiding cellular energy; may offset statin‑associated muscle symptoms and support cardiovascular health.",
    safety: "Generally well‑tolerated; may lower warfarin effect (↓INR). Possible GI upset or insomnia in rare cases."
  },
  "Multivitamin / Multimineral (including prenatal)": {
    dose: "Per label; choose formulas with methylfolate 400–800 µg (prenatal), iron 27 mg (if needed), iodine 150 µg, vitamin D 800–1,000 IU.",
    timing: "With food; separate iron/calcium from thyroid meds by 4 h.",
    why: "Backstops common nutrient gaps (folate, iodine, vitamin D, iron in pregnancy) and supports overall micronutrient adequacy.",
    safety: "Avoid excess fat‑soluble vitamins (A, D, E, K). Prenatal: avoid high preformed vitamin A (retinol). Iron may cause constipation/nausea."
  },
  "Vitamin C (including rose hips)": {
    dose: "200–1,000 mg/day; divide doses for better absorption; higher short‑term during illness as tolerated.",
    timing: "With or without food; split morning/evening if >500 mg.",
    why: "Antioxidant supporting immune function and collagen synthesis; enhances non‑heme iron absorption.",
    safety: "GI upset/diarrhea at high doses; kidney stone risk in predisposed individuals. Separate from iron if stomach upset occurs."
  },
  "Probiotics (e.g., Acidophilus, Lactobacillus)": {
    dose: "1×10⁹–1×10¹¹ CFU/day of evidence‑based strains; follow product strain and indication guidance.",
    timing: "Daily, consistently; many can be taken with food; follow label for specific strains.",
    why: "Helps restore/maintain gut microbiota balance; may aid IBS symptoms, antibiotic‑associated diarrhea, and immune support.",
    safety: "Immunocompromised or critically ill: use medical guidance due to rare infection risk. Gas/bloating may occur initially."
  },
  "Zinc": {
    dose: "8–15 mg/day maintenance; up to 25 mg/day short‑term for colds; include 1–2 mg copper if ≥25 mg/day chronically.",
    timing: "With food to reduce nausea; separate from antibiotics and thyroid meds by 2–4 h.",
    why: "Supports immune function, taste/smell, skin healing, and reproductive health.",
    safety: "Excess (>40 mg/day) can cause copper deficiency and anemia. Interacts with tetracyclines/quinolones and levothyroxine (absorption)."
  },
  "Turmeric / Curcumin": {
    dose: "500–1,000 mg/day curcuminoids; enhanced bioavailability formulas (with piperine or phospholipids) preferred.",
    timing: "With meals containing fat; split doses for tolerance.",
    why: "Curcuminoids modulate inflammatory pathways and may support joint comfort and metabolic health.",
    safety: "May irritate GERD; avoid with gallstones/bile duct obstruction. Theoretical bleeding risk with anticoagulants/antiplatelets."
  },
  "Vitamin B12 (Cobalamin)": {
    dose: "250–1,000 µg/day oral (cyanocobalamin or methylcobalamin); weekly 1,000–2,000 µg is an option.",
    timing: "With or without food; morning if energizing.",
    why: "Essential for red blood cells and nerves; supplementation offsets low intake (vegan) or malabsorption (metformin, PPIs).",
    safety: "Very safe; rare acne‑like rash or anxiety. Monitor if polycythemia. No known drug interactions of clinical significance."
  },
  "Vitamin B-Complex": {
    dose: "Per label; many use 50–100 mg of B1, B2, B3, B6; folate 400 µg; B12 250–1,000 µg.",
    timing: "With breakfast or lunch to avoid evening stimulation.",
    why: "Covers synergistic B‑vitamins for energy metabolism, homocysteine balance, and stress support.",
    safety: "Niacin may flush; B6 >100 mg/day long term can cause neuropathy; check interactions if on multiple meds."
  },
  "Calcium": {
    dose: "500–700 mg/day from supplements if dietary intake is low; total intake 1,000–1,200 mg/day from all sources.",
    timing: "Divide doses ≤500 mg; carbonate with meals; citrate with or without food.",
    why: "Supports bone/teeth and neuromuscular function; pairs with vitamin D, K2, and magnesium.",
    safety: "Kidney stone risk in susceptible people; possible vascular calcification with high doses. Separate from iron/thyroid/antibiotics."
  },
  "Melatonin": {
    dose: "0.5–3 mg for sleep onset; up to 5 mg short‑term; lower doses for circadian phase shifting.",
    timing: "30–60 min before bedtime; for jet lag, evening at destination.",
    why: "Regulates circadian rhythms and sleep onset; useful for jet lag, shift work, and delayed sleep phase.",
    safety: "Drowsiness, vivid dreams; avoid driving after use. Caution in pregnancy, epilepsy, and with sedatives or anticoagulants."
  },
  "Vitamin K (including K2, MK-7)": {
    dose: "K1: 100–200 µg/day; K2 (MK‑7): 90–200 µg/day.",
    timing: "With meals containing fat; take consistently.",
    why: "Activates proteins for calcium placement into bone and away from arteries; works with vitamin D and calcium.",
    safety: "Interacts with warfarin and other vitamin K antagonists—medical supervision required."
  },
  "Green Tea extract": {
    dose: "Providing 90–300 mg EGCG/day; do not exceed label limits.",
    timing: "With food to reduce GI upset and support liver safety.",
    why: "Polyphenols (EGCG) support antioxidant defenses, metabolic health, and mild thermogenesis.",
    safety: "Rare liver injury at high doses, especially fasting; limit caffeine if sensitive. Avoid with warfarin (vitamin K in teas varies)."
  },
  "Collagen (bovine, marine, and plant-derived)": {
    dose: "5–15 g/day hydrolyzed collagen peptides; consider vitamin C co‑ingestion.",
    timing: "Any time; mix into beverages; pre/rehab around exercise for joints.",
    why: "Provides amino acids (glycine, proline) supporting skin elasticity, joint comfort, and tendon/ligament repair.",
    safety: "Generally safe; allergen risk with fish/marine sources. Not a complete protein; balance total protein intake."
  },
  "Joint health formulas (Glucosamine, Chondroitin, MSM, Boswellia)": {
    dose: "Glucosamine sulfate 1,500 mg/day; Chondroitin 800–1,200 mg/day; MSM 1,000–3,000 mg/day; Boswellia (AKBA‑std.) 100–250 mg/day.",
    timing: "With meals; split doses for tolerance.",
    why: "Targets cartilage matrix support and inflammatory pathways to reduce joint stiffness and discomfort.",
    safety: "Shellfish allergy caution (glucosamine). Possible GI upset; chondroitin may interact with anticoagulants—monitor."
  },
  "Protein powders & nutrition drinks (whey, plant, meal replacements)": {
    dose: "20–30 g protein/serving; adjust to 1.2–2.0 g/kg/day total based on goals and kidney health.",
    timing: "Post‑exercise or to fill meal gaps; can split through the day.",
    why: "Convenient way to meet protein needs for muscle repair, satiety, and weight management.",
    safety: "Choose third‑party tested products; watch lactose if sensitive and added sugars. Kidney disease: consult clinician."
  },
  "Cocoa / Dark Chocolate extracts": {
    dose: "200–500 mg/day cocoa flavanols or 10–20 g high‑cocoa dark chocolate.",
    timing: "With or without food; avoid late evening if caffeine‑sensitive.",
    why: "Flavanols support endothelial function, blood pressure, and cognitive performance.",
    safety: "Caffeine/theobromine may cause jitteriness or reflux; check for added sugar/heavy metals in chocolates."
  },
  "Apple Cider Vinegar": {
    dose: "1–2 Tbsp (15–30 mL) diluted in water per day or with meals.",
    timing: "Before or with carbohydrate‑rich meals.",
    why: "May blunt post‑meal glucose rise and support satiety via delayed gastric emptying.",
    safety: "Always dilute to protect teeth/esophagus; GI upset possible. May lower potassium; caution with insulin or potassium‑lowering meds."
  },
  "Ashwagandha": {
    dose: "300–600 mg/day of root extract (≈5% withanolides).",
    timing: "With meals; evening if calming.",
    why: "Adaptogen that may reduce perceived stress, support sleep quality, and modestly aid thyroid function.",
    safety: "Avoid in pregnancy; autoimmune or hyperthyroid conditions require caution. Rare liver injury reports—use reputable brands."
  },
  "Fiber supplements (Psyllium, Beta Glucan)": {
    dose: "Psyllium 5–10 g/day; beta‑glucan 3 g/day for cholesterol support; increase fluids.",
    timing: "With water; separate meds by 2–4 h to avoid binding.",
    why: "Improves stool regularity, supports cholesterol and glycemic control, and feeds gut microbiota.",
    safety: "Start low to avoid gas/bloating; risk of choking if taken dry. Ensure adequate hydration."
  },
  "Digestive enzymes": {
    dose: "Per label based on enzyme units (e.g., amylase, lipase, protease).",
    timing: "Immediately before or with the first bites of meals.",
    why: "Assists macronutrient breakdown in pancreatic insufficiency or temporary support for heavy meals.",
    safety: "Allergy risk (porcine/plant sources). Mouth irritation if capsules opened. Consult clinician in pancreatitis."
  },
  "Alpha Lipoic Acid": {
    dose: "300–600 mg/day; consider R‑ALA forms for potency.",
    timing: "Empty stomach for absorption; split doses if needed.",
    why: "Antioxidant that may support nerve health in neuropathy and help glucose metabolism.",
    safety: "May lower blood sugar—monitor if on diabetes meds. Separate from thyroid meds. Rare GI upset or rash."
  },
  "Quercetin": {
    dose: "500–1,000 mg/day; often paired with vitamin C or bromelain.",
    timing: "With meals to enhance tolerance.",
    why: "Flavonoid with antioxidant and mast‑cell stabilizing effects; may aid allergy symptoms and metabolic health.",
    safety: "Generally safe short‑term; theoretical interactions via CYP enzymes and with certain antibiotics—check meds."
  },
  "Chia Seed": {
    dose: "1–2 Tbsp (10–20 g) daily; hydrate seeds for puddings.",
    timing: "Anytime; with fluids to form gel.",
    why: "Provides fiber, ALA omega‑3, and minerals; supports satiety, bowel regularity, and lipid profile.",
    safety: "Take with adequate water to avoid choking; may affect anticoagulants slightly via ALA. Watch calories in large amounts."
  },
  "Lutein / Zeaxanthin": {
    dose: "Lutein 10 mg + zeaxanthin 2 mg/day (typical AREDS2 proportions).",
    timing: "With meals containing fat for absorption.",
    why: "Macular pigments that filter blue light and support retinal health; used for AMD risk reduction.",
    safety: "Well‑tolerated; may cause harmless skin/yellowing at high intakes. Avoid excess beta‑carotene in smokers."
  },
  "N-Acetyl Cysteine (NAC)": {
    dose: "600–1,200 mg/day in divided doses; higher only with medical supervision.",
    timing: "With or without food; split morning/evening.",
    why: "Cysteine donor that raises glutathione; supports respiratory mucus clearance and antioxidant defenses.",
    safety: "May cause nausea or odor; potentiates nitroglycerin (hypotension, headache). Asthma: use caution. Separate from charcoal."
  },
  "Protein / Nutrition Bars": {
    dose: "Choose 10–20 g protein, ≥3 g fiber, ≤10 g added sugar per bar; fit into daily macros.",
    timing: "Snack or meal bridge; pre/post‑workout as needed.",
    why: "Portable option to increase protein and satiety when whole meals aren't practical.",
    safety: "Check allergens (nuts, soy, dairy) and sugar alcohols that may cause GI upset; avoid excessive added sugars."
  },
  "Coconut Oil": {
    dose: "1–2 Tbsp (15–30 mL) as part of total fat intake; not essential.",
    timing: "Use for sautéing or in recipes; replace, don't add, to avoid excess calories.",
    why: "Provides medium‑chain triglycerides for quick energy; culinary option for flavor and texture.",
    safety: "High in saturated fat—may raise LDL cholesterol. Not a substitute for omega‑3‑rich or unsaturated oils."
  }
};

// ============================================================================
// 5. BREATHWORK LIBRARY
// ============================================================================

export const BREATH_LIBRARY = {
  "Cardiac Coherence (5-5-5 breathing)": {
    name: "Cardiac Coherence (5-5-5 Breathing)",
    how_default: "Inhale through the nose for 5 seconds, exhale gently through the mouth for 5 seconds, and continue for 5 minutes. Keep a smooth, relaxed rhythm.",
    benefits: "Balances autonomic nervous system, improves emotional regulation, and enhances focus by synchronizing heart rate variability.",
    timing: "Use 1–2 sessions daily or before stressful events for calm and balance.",
    contraindications: "Generally safe; those with dizziness or anxiety from slow breathing should shorten duration or consult a clinician."
  },
  "Box Breathing (4-4-4-4)": {
    name: "Box Breathing (4-4-4-4)",
    how_default: "Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4 again. Repeat 4–8 cycles with steady posture and focus.",
    benefits: "Enhances concentration, reduces stress, and lowers blood pressure by stabilizing breathing and activating parasympathetic response.",
    timing: "Ideal before presentations, tests, or stressful moments; also effective before bed.",
    contraindications: "Avoid extended breath-holding if pregnant, with cardiac conditions, or prone to lightheadedness."
  },
  "4-7-8 Breathing (sleep induction)": {
    name: "4-7-8 Breathing (Relaxation and Sleep Induction)",
    how_default: "Inhale quietly through the nose for 4 seconds, hold for 7 seconds, and exhale audibly through the mouth for 8 seconds. Repeat up to 4 cycles.",
    benefits: "Promotes relaxation, lowers heart rate, and helps initiate sleep by extending exhalation and engaging the vagus nerve.",
    timing: "Use before bedtime or during anxiety episodes to calm the mind and slow breathing.",
    contraindications: "Avoid long holds if you have lung disease, asthma flare-ups, or low blood pressure causing dizziness."
  },
  "Wim Hof Method (advanced)": {
    name: "Wim Hof Method (Controlled Hyperventilation and Retention)",
    how_default: "Take 30–40 deep breaths, fully in and partially out. After last exhale, hold your breath as long as comfortable, then inhale deeply and hold 10–15 sec. Repeat 3 rounds.",
    benefits: "Can boost energy, cold tolerance, and mood; linked to reduced inflammation and improved resilience to stress.",
    timing: "Practice in the morning or before cold exposure; always seated or lying down.",
    contraindications: "Do NOT practice near water, while driving, or standing. Avoid if pregnant, epileptic, or with cardiac/respiratory disease."
  },
  "Alternate Nostril (Nadi Shodhana)": {
    name: "Alternate Nostril Breathing (Nadi Shodhana)",
    how_default: "Using right thumb, close right nostril and inhale left. Close both nostrils briefly, open right and exhale. Inhale right, close, exhale left. Repeat 5–10 rounds.",
    benefits: "Balances left–right brain hemispheres, reduces anxiety, and enhances mental clarity through nasal cycle harmonization.",
    timing: "Morning or before meditation for balance and focus; use during mild anxiety for grounding.",
    contraindications: "Avoid if congested, with acute sinusitis, or uncontrolled high blood pressure."
  },
  "Physiological Sighs (stress relief)": {
    name: "Physiological Sighs (Stress Relief Technique)",
    how_default: "Inhale deeply through the nose, take a second shorter inhale to fully expand lungs, then exhale slowly through the mouth. Repeat 3–5 times.",
    benefits: "Rapidly reduces stress, lowers CO₂ levels, and calms anxiety via vagal activation; proven in neuroscience research.",
    timing: "Use acutely during stress, after arguments, or before difficult tasks for quick emotional reset.",
    contraindications: "Safe for most; stop if feeling dizzy or short of breath."
  },
  "Diaphragmatic Breathing (belly breathing)": {
    name: "Diaphragmatic Breathing (Belly Breathing)",
    how_default: "Place one hand on chest, one on abdomen. Inhale through the nose to expand belly, keeping chest still. Exhale slowly through pursed lips. Repeat 5–10 minutes.",
    benefits: "Strengthens diaphragm, reduces stress hormones, improves oxygen exchange, and aids digestion.",
    timing: "Use daily or during anxiety, digestion discomfort, or as warm-up for meditation or exercise.",
    contraindications: "Generally safe; adjust posture if you have severe COPD or abdominal pain."
  },
  "Coherent Breathing (heart rate variability)": {
    name: "Coherent Breathing (HRV Optimization)",
    how_default: "Breathe slowly at ~5–6 breaths per minute (inhale 5.5 sec, exhale 5.5 sec). Maintain even rhythm for 5–10 minutes.",
    benefits: "Optimizes heart rate variability, stabilizes mood, and improves focus by synchronizing respiration and cardiac rhythms.",
    timing: "Daily practice for stress resilience or before sleep to down-regulate stress response.",
    contraindications: "Generally safe; those with dizziness or respiratory illness should start gradually and shorten sessions."
  }
};

// ============================================================================
// 6. PHASE TEMPLATES (Fallback content for each phase)
// ============================================================================

export const PHASE_TEMPLATES = {
  "Decode": {
    name: "Decode",
    goal: "Gain deep understanding of your baseline health, habits, and key biomarkers.",
    why: "Accurate insight into starting points allows targeted, personalized interventions instead of guesswork.",
    daily: [
      "Track sleep, mood, and energy daily using journal or app.",
      "Complete baseline labs and self-assessments.",
      "Note dietary patterns and stress triggers without judgment."
    ],
    weekly_reflection: "What patterns are emerging in your sleep, energy, or stress that surprise you?"
  },
  "Rebalance": {
    name: "Rebalance",
    goal: "Correct immediate imbalances in sleep, stress, and daily rhythm to restore stability.",
    why: "Physiological systems function best in equilibrium—restoring circadian balance and stress control supports healing.",
    daily: [
      "Follow consistent sleep-wake times and limit blue light after sunset.",
      "Practice daily breathing or mindfulness for 5–10 minutes.",
      "Ensure regular hydration and balanced meals with steady energy release."
    ],
    weekly_reflection: "What one habit improved your stability the most this week—and what still feels out of balance?"
  },
  "Strengthen": {
    name: "Strengthen",
    goal: "Build physical and mental resilience through movement, recovery, and nutrient support.",
    why: "Progressive strength and cardiovascular training enhance mitochondrial capacity and stress tolerance.",
    daily: [
      "Engage in structured movement—alternate strength, mobility, and cardio.",
      "Prioritize recovery: stretching, breathing, and quality sleep.",
      "Meet daily protein and micronutrient needs for muscle repair."
    ],
    weekly_reflection: "How has your energy and strength changed since starting, and what recovery tools help most?"
  },
  "Nourish": {
    name: "Nourish",
    goal: "Refine nutrition, supplementation, and lifestyle inputs to sustain metabolic health.",
    why: "Tailored nutrition supports energy metabolism, hormone balance, and inflammation control at the cellular level.",
    daily: [
      "Plan nutrient-dense meals emphasizing whole, colorful foods.",
      "Take supplements as guided by your protocol and meal timing.",
      "Monitor digestion, mood, and energy to spot what foods serve you best."
    ],
    weekly_reflection: "Which nutrition choices make you feel most steady and energized throughout the day?"
  },
  "Refine": {
    name: "Refine",
    goal: "Fine-tune your personalized protocol using feedback from data, biomarkers, and self-awareness.",
    why: "Small, data-driven adjustments amplify long-term progress and reduce plateau effects.",
    daily: [
      "Review metrics such as sleep quality, HRV, or glucose trends.",
      "Adjust nutrition, exercise, or recovery inputs based on outcomes.",
      "Continue journaling to connect behavior with performance or mood shifts."
    ],
    weekly_reflection: "What data-driven insight this week helped refine your plan or reveal a hidden barrier?"
  },
  "Sustain": {
    name: "Sustain",
    goal: "Maintain long-term health and performance through consistent habits and periodic recalibration.",
    why: "Sustainability ensures progress endures—regular check-ins and balanced routines prevent regression.",
    daily: [
      "Keep 80/20 consistency with nutrition, movement, and rest habits.",
      "Schedule moments for recovery, social connection, and play.",
      "Revisit goals quarterly and celebrate small wins."
    ],
    weekly_reflection: "Which habits now feel natural, and which need renewed focus to stay on track?"
  }
};

// ============================================================================
// 7. STATIC CONTENT
// ============================================================================

export const CONCEPT_TEXT = `The Arc represents a new paradigm in personalized health optimization. Rather than one-size-fits-all approaches, we recognize that each individual's path to longevity is unique. Our framework combines cutting-edge science with practical implementation, creating a sustainable approach to health that evolves with you. By understanding your genetic predispositions, current health status, and lifestyle factors, we can create a targeted blueprint for optimizing your healthspan and lifespan.`;

export const DISCLAIMER = `This report is for educational and informational purposes only. It is not intended as medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals before making changes to your diet, exercise routine, or supplement regimen. The information provided should not replace professional medical care or advice. Individual results may vary, and the recommendations should be adapted to your specific health needs and circumstances.`;

export const ARTICLES = [
  "The Science of Longevity: Understanding Biological Aging",
  "Metabolic Flexibility: The Key to Sustainable Health", 
  "Stress, Sleep, and Longevity: The Vital Connection",
  "Nutritional Strategies for Optimal Healthspan",
  "Exercise Prescription for Longevity",
  "The Gut-Brain Axis: How Your Microbiome Affects Your Health"
];

// ============================================================================
// 8. HELPER FUNCTIONS
// ============================================================================

export function getTestInfo(testName: string) {
  return TESTS[testName as keyof typeof TESTS] || TESTS["CRP"];
}

export function getMealPlan(archetype: string) {
  return MEAL_PLANS[archetype as keyof typeof MEAL_PLANS] || MEAL_PLANS["Anti-inflammatory Mediterranean"];
}

export function getSupplementInfo(supplementName: string) {
  return SUPPS_CANONICAL[supplementName as keyof typeof SUPPS_CANONICAL] || SUPPS_CANONICAL["Omega-3"];
}

export function getBreathworkInfo(techniqueName: string) {
  return BREATH_LIBRARY[techniqueName as keyof typeof BREATH_LIBRARY] || BREATH_LIBRARY["Cardiac Coherence"];
}

export function getPhaseTemplate(phaseName: string) {
  return PHASE_TEMPLATES[phaseName as keyof typeof PHASE_TEMPLATES] || PHASE_TEMPLATES["Decode"];
}
