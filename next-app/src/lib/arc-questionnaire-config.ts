import { QuestionnaireConfig } from "./arc-scoring-engine";

export const arcQuestionnaireConfig: QuestionnaireConfig = {
  scales: {
    severity: [
      "Not at all",
      "A little",
      "Moderately",
      "Quite a lot",
      "Extremely"
    ],
    frequency: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Almost always"
    ],
    rested: [
      "Very rested",
      "Mostly rested",
      "Neutral",
      "Slightly unrested",
      "Very unrested"
    ],
    consistency: [
      "Very consistent",
      "Mostly consistent",
      "Somewhat variable",
      "Quite variable",
      "Very inconsistent"
    ],
    quality_5: [
      "Excellent",
      "Good",
      "Fair",
      "Poor",
      "Very poor"
    ],
    quality_5_inverse: [
      "Very good",
      "Good",
      "Acceptable",
      "Quite poor",
      "Very poor"
    ],
    yes_no: [
      "No",
      "Yes"
    ],
    sedentary_hours: [
      "<2 hours",
      "2–4 hours",
      "4–6 hours",
      "6–8 hours",
      "8+ hours"
    ],
    alcohol_per_day: [
      "None",
      "1 drink",
      "2 drinks",
      "3 drinks",
      "4 or more drinks"
    ],
    freq_food: [
      "Never / almost never",
      "1–3× per month",
      "1–3× per week",
      "4–6× per week",
      "Daily or more"
    ]
  },
  questions: [
    {
      id: "V1",
      section: "A1_Vasomotor",
      text: "How much do hot flashes bother you?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 2 },
        { name: "SLP", weight: 2 }
      ]
    },
    {
      id: "V2",
      section: "A1_Vasomotor",
      text: "How much do night sweats disturb your comfort or sleep?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 3 },
        { name: "SLP", weight: 3 }
      ]
    },
    {
      id: "V3",
      section: "A1_Vasomotor",
      text: "How much are you bothered by waking up overheated or sweaty?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 2 },
        { name: "SLP", weight: 2 }
      ]
    },
    {
      id: "V4",
      section: "A1_Vasomotor",
      text: "How much do flushing or sudden waves of heat affect you?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 1 }
      ]
    },
    {
      id: "V5",
      section: "A1_Vasomotor",
      text: "How much do chills or shivers after hot episodes bother you?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 1 }
      ]
    },
    {
      id: "P1",
      section: "A2_Psychosocial",
      text: "How much more irritable or \"on edge\" do you feel than usual?",
      scaleId: "severity",
      composites: [
        { name: "SLD", weight: 2 },
        { name: "CRT", weight: 2 },
        { name: "MENO", weight: 2 }
      ]
    },
    {
      id: "P2",
      section: "A2_Psychosocial",
      text: "How often do you feel low in mood?",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 2 },
        { name: "MENO", weight: 2 }
      ]
    },
    {
      id: "P3",
      section: "A2_Psychosocial",
      text: "How much have you lost interest or pleasure in things you usually enjoy?",
      scaleId: "severity",
      composites: [
        { name: "CRV", weight: 2 },
        { name: "SLD", weight: 2 }
      ]
    },
    {
      id: "P4",
      section: "A2_Psychosocial",
      text: "How often do you feel tense or unable to relax?",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 3 },
        { name: "CRT", weight: 3 }
      ]
    },
    {
      id: "P5",
      section: "A2_Psychosocial",
      text: "How often do you worry more about your health or future?",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 1 },
        { name: "CRV", weight: 1 }
      ]
    },
    {
      id: "P6",
      section: "A2_Psychosocial",
      text: "How often do you feel less confident or self-assured?",
      scaleId: "frequency",
      composites: [
        { name: "CRV", weight: 1 },
        { name: "SLD", weight: 1 }
      ]
    },
    {
      id: "P7",
      section: "A2_Psychosocial",
      text: "How much are these emotional changes affecting your wellbeing?",
      scaleId: "severity",
      composites: [
        { name: "LIF", weight: 2 },
        { name: "MENO", weight: 2 }
      ]
    },
    {
      id: "S1",
      section: "A3_Physical",
      text: "How much do muscle or joint aches affect you?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 1 },
        { name: "LIF", weight: 1 }
      ]
    },
    {
      id: "S2",
      section: "A3_Physical",
      text: "How much do headaches or head pressure affect you?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 1 },
        { name: "SLD", weight: 1 }
      ]
    },
    {
      id: "S3",
      section: "A3_Physical",
      text: "How often do you feel unusually tired or low in energy?",
      scaleId: "frequency",
      composites: [
        { name: "CRV", weight: 3 },
        { name: "SLP", weight: 3 },
        { name: "LIF", weight: 3 }
      ]
    },
    {
      id: "S4",
      section: "A3_Physical",
      text: "How much do heart-pounding or palpitations bother you?",
      scaleId: "severity",
      composites: [
        { name: "RFB", weight: 2 },
        { name: "MENO", weight: 2 }
      ]
    },
    {
      id: "S5",
      section: "A3_Physical",
      text: "How much do bloating or abdominal discomfort affect you?",
      scaleId: "severity",
      composites: [
        { name: "NUT", weight: 1 },
        { name: "MENO", weight: 1 }
      ]
    },
    {
      id: "S6",
      section: "A3_Physical",
      text: "How often do you feel short of breath with usual activities?",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 3 },
        { name: "MOB", weight: 3 }
      ]
    },
    {
      id: "S7",
      section: "A3_Physical",
      text: "How noticeable have weight or body shape changes been to you recently?",
      scaleId: "severity",
      composites: [
        { name: "NUT", weight: 2 },
        { name: "LIF", weight: 2 }
      ]
    },
    {
      id: "S8",
      section: "A3_Physical",
      text: "How much does breast tenderness affect you?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 1 }
      ]
    },
    {
      id: "U1",
      section: "A4_Urogenital",
      text: "How much does vaginal dryness or irritation bother you?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 2 }
      ]
    },
    {
      id: "U2",
      section: "A4_Urogenital",
      text: "How much does pain or discomfort with sexual activity affect you?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 2 }
      ]
    },
    {
      id: "U3",
      section: "A4_Urogenital",
      text: "How much has your interest in sexual activity changed?",
      scaleId: "severity",
      composites: [
        { name: "MENO", weight: 1 }
      ]
    },
    {
      id: "U4",
      section: "A4_Urogenital",
      text: "How often do you feel sudden urinary urgency?",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 1 },
        { name: "MENO", weight: 1 }
      ]
    },
    {
      id: "U5",
      section: "A4_Urogenital",
      text: "How often do you experience urinary leakage?",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 1 }
      ]
    },
    {
      id: "U6",
      section: "A4_Urogenital",
      text: "How much do these symptoms affect your quality of life?",
      scaleId: "severity",
      composites: [
        { name: "LIF", weight: 2 },
        { name: "MENO", weight: 2 }
      ]
    },
    {
      id: "M1",
      section: "B_Mood",
      text: "How often do you find less pleasure in usual activities?",
      scaleId: "frequency",
      composites: [
        { name: "CRV", weight: 2 },
        { name: "SLD", weight: 2 }
      ]
    },
    {
      id: "M2",
      section: "B_Mood",
      text: "How often do you feel hopeless or discouraged?",
      scaleId: "frequency",
      composites: [
        { name: "CRV", weight: 3 },
        { name: "SLD", weight: 3 }
      ]
    },
    {
      id: "M3",
      section: "B_Mood",
      text: "How often do you feel excessively worried or anxious?",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 3 },
        { name: "CRT", weight: 3 }
      ]
    },
    {
      id: "M4",
      section: "B_Mood",
      text: "How often do you have sudden episodes of intense fear or panic?",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 3 },
        { name: "RFB", weight: 3 }
      ]
    },
    {
      id: "M5",
      section: "B_Mood",
      text: "How often do you feel tearful or emotionally sensitive?",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 2 }
      ]
    },
    {
      id: "M6",
      section: "B_Mood",
      text: "How often do you experience rapid mood swings?",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 2 },
        { name: "CRT", weight: 2 }
      ]
    },
    {
      id: "M7",
      section: "B_Mood",
      text: "How often do you withdraw from social interactions?",
      scaleId: "frequency",
      composites: [
        { name: "CRV", weight: 2 },
        { name: "SLD", weight: 2 }
      ]
    },
    {
      id: "M8",
      section: "B_Mood",
      text: "How often do mood or anxiety symptoms interfere with daily functioning?",
      scaleId: "frequency",
      composites: [
        { name: "LIF", weight: 3 },
        { name: "RFB", weight: 3 }
      ]
    },
    {
      id: "C1",
      section: "C_Cognition",
      text: "How often do you have difficulty concentrating?",
      scaleId: "frequency",
      composites: [
        { name: "CRY", weight: 3 },
        { name: "CRV", weight: 3 }
      ]
    },
    {
      id: "C2",
      section: "C_Cognition",
      text: "How often do you have trouble remembering recent things?",
      scaleId: "frequency",
      composites: [
        { name: "CRY", weight: 3 },
        { name: "CRV", weight: 3 }
      ]
    },
    {
      id: "C3",
      section: "C_Cognition",
      text: "How often do you lose track of tasks or conversations?",
      scaleId: "frequency",
      composites: [
        { name: "CRY", weight: 2 },
        { name: "CRV", weight: 2 }
      ]
    },
    {
      id: "C4",
      section: "C_Cognition",
      text: "How often do you feel mentally foggy or slowed down?",
      scaleId: "frequency",
      composites: [
        { name: "CRY", weight: 3 },
        { name: "CRV", weight: 3 }
      ]
    },
    {
      id: "C5",
      section: "C_Cognition",
      text: "How often does mental tiredness limit your productivity?",
      scaleId: "frequency",
      composites: [
        { name: "CRV", weight: 2 },
        { name: "SLP", weight: 2 }
      ]
    },
    {
      id: "C6",
      section: "C_Cognition",
      text: "How often do these cognitive symptoms affect your responsibilities?",
      scaleId: "frequency",
      composites: [
        { name: "CRY", weight: 2 },
        { name: "LIF", weight: 2 }
      ]
    },
    {
      id: "SL1",
      section: "D_Sleep",
      text: "Difficulty falling asleep at your planned bedtime",
      scaleId: "frequency",
      composites: [
        { name: "SLP", weight: 3 },
        { name: "CRT", weight: 3 }
      ]
    },
    {
      id: "SL2",
      section: "D_Sleep",
      text: "Waking during the night and struggling to fall back asleep",
      scaleId: "frequency",
      composites: [
        { name: "SLP", weight: 3 }
      ]
    },
    {
      id: "SL3",
      section: "D_Sleep",
      text: "Waking earlier than planned and unable to return to sleep",
      scaleId: "frequency",
      composites: [
        { name: "SLP", weight: 2 },
        { name: "CRT", weight: 2 }
      ]
    },
    {
      id: "SL4",
      section: "D_Sleep",
      text: "How rested do you feel when you wake up?",
      scaleId: "rested",
      composites: [
        { name: "SLP", weight: 3 },
        { name: "CRV", weight: 3 }
      ]
    },
    {
      id: "SL5",
      section: "D_Sleep",
      text: "Waking due to feeling too hot or too cold",
      scaleId: "frequency",
      composites: [
        { name: "SLP", weight: 2 },
        { name: "MENO", weight: 2 }
      ]
    },
    {
      id: "SL6",
      section: "D_Sleep",
      text: "How consistent is your bedtime?",
      scaleId: "consistency",
      composites: [
        { name: "CRY", weight: 2 },
        { name: "SLP", weight: 2 }
      ]
    },
    {
      id: "SL7",
      section: "D_Sleep",
      text: "How consistent is your wake-up time?",
      scaleId: "consistency",
      composites: [
        { name: "CRY", weight: 2 },
        { name: "SLP", weight: 2 }
      ]
    },
    {
      id: "SL8",
      section: "D_Sleep",
      text: "Screen use in the hour before bed",
      scaleId: "frequency",
      composites: [
        { name: "SLP", weight: 1 },
        { name: "CRT", weight: 1 }
      ]
    },
    {
      id: "SL9",
      section: "D_Sleep",
      text: "Caffeine intake after midday",
      scaleId: "frequency",
      composites: [
        { name: "SLP", weight: 1 }
      ]
    },
    {
      id: "SL10",
      section: "D_Sleep",
      text: "Daytime impact of poor sleep",
      scaleId: "frequency",
      composites: [
        { name: "LIF", weight: 3 },
        { name: "SLP", weight: 3 }
      ]
    },
    {
      id: "N1",
      section: "E_Nutrition",
      text: "Vegetable intake",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: -2 },
        { name: "ENV", weight: -2 }
      ]
    },
    {
      id: "N2",
      section: "E_Nutrition",
      text: "Fruit intake",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: -1 }
      ]
    },
    {
      id: "N3",
      section: "E_Nutrition",
      text: "Whole grains",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: -1 }
      ]
    },
    {
      id: "N4",
      section: "E_Nutrition",
      text: "Legumes",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: -1 }
      ]
    },
    {
      id: "N5",
      section: "E_Nutrition",
      text: "Oily fish",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: -2 },
        { name: "ENV", weight: -2 }
      ]
    },
    {
      id: "N6",
      section: "E_Nutrition",
      text: "Red or processed meat",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: 2 }
      ]
    },
    {
      id: "N7",
      section: "E_Nutrition",
      text: "Sugary drinks",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: 3 }
      ]
    },
    {
      id: "N8",
      section: "E_Nutrition",
      text: "Sweets or baked goods",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: 2 }
      ]
    },
    {
      id: "N9",
      section: "E_Nutrition",
      text: "Fast food or take-away meals",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: 3 },
        { name: "ENV", weight: 3 }
      ]
    },
    {
      id: "N10",
      section: "E_Nutrition",
      text: "Nuts and seeds",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: -1 }
      ]
    },
    {
      id: "N11",
      section: "E_Nutrition",
      text: "Olive oil as main added fat",
      scaleId: "freq_food",
      composites: [
        { name: "NUT", weight: -1 }
      ]
    },
    {
      id: "N12",
      section: "E_Nutrition",
      text: "Typical alcohol intake (per drinking day)",
      scaleId: "alcohol_per_day",
      composites: [
        { name: "NUT", weight: 2 },
        { name: "SLP", weight: 2 }
      ]
    },
    {
      id: "SU1",
      section: "F_Supplements",
      text: "Do you take any vitamins or minerals?",
      scaleId: "yes_no",
      composites: [
        { name: "SUP", weight: -1 }
      ]
    },
    {
      id: "SU2",
      section: "F_Supplements",
      text: "Do you take any herbal or botanical supplements?",
      scaleId: "yes_no",
      composites: [
        { name: "SUP", weight: 1 },
        { name: "RFB", weight: 1 }
      ]
    },
    {
      id: "SU3",
      section: "F_Supplements",
      text: "Do you take omega-3 or fish oil?",
      scaleId: "yes_no",
      composites: [
        { name: "SUP", weight: -1 },
        { name: "NUT", weight: -1 }
      ]
    },
    {
      id: "SU4",
      section: "F_Supplements",
      text: "Do you take probiotics?",
      scaleId: "yes_no",
      composites: [
        { name: "SUP", weight: -1 }
      ]
    },
    {
      id: "SU5",
      section: "F_Supplements",
      text: "Supplements specifically for sleep or stress?",
      scaleId: "yes_no",
      composites: [
        { name: "SUP", weight: -1 },
        { name: "SLD", weight: -1 },
        { name: "SLP", weight: -1 }
      ]
    },
    {
      id: "SU6",
      section: "F_Supplements",
      text: "How consistently do you follow supplement directions?",
      scaleId: "frequency",
      composites: [
        { name: "SUP", weight: -1 }
      ]
    },
    {
      id: "SU7",
      section: "F_Supplements",
      text: "Have you noticed side effects possibly related to supplements?",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 2 }
      ]
    },
    {
      id: "L1",
      section: "G_Lifestyle",
      text: "Feeling overwhelmed by responsibilities",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 3 },
        { name: "CRT", weight: 3 }
      ]
    },
    {
      id: "L2",
      section: "G_Lifestyle",
      text: "Feeling little control over time",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: 2 }
      ]
    },
    {
      id: "L3",
      section: "G_Lifestyle",
      text: "Feeling pressure to stay connected late into the evening",
      scaleId: "frequency",
      composites: [
        { name: "SLP", weight: 2 },
        { name: "SLD", weight: 2 }
      ]
    },
    {
      id: "L4",
      section: "G_Lifestyle",
      text: "Time spent sitting on a typical day",
      scaleId: "sedentary_hours",
      composites: [
        { name: "MOB", weight: 3 },
        { name: "LIF", weight: 3 }
      ]
    },
    {
      id: "L5",
      section: "G_Lifestyle",
      text: "Moderate/vigorous activity ≥20 minutes",
      scaleId: "frequency",
      composites: [
        { name: "MOB", weight: -2 }
      ]
    },
    {
      id: "L6",
      section: "G_Lifestyle",
      text: "Strength training or resistance exercise",
      scaleId: "frequency",
      composites: [
        { name: "MOB", weight: -2 }
      ]
    },
    {
      id: "L7",
      section: "G_Lifestyle",
      text: "Stress-reduction practices (breathing, meditation, yoga)",
      scaleId: "frequency",
      composites: [
        { name: "SLD", weight: -2 },
        { name: "CRT", weight: -2 }
      ]
    },
    {
      id: "L8",
      section: "G_Lifestyle",
      text: "Home air quality (ventilation, odors, humidity)",
      scaleId: "quality_5",
      composites: [
        { name: "ENV", weight: 2 }
      ]
    },
    {
      id: "L9",
      section: "G_Lifestyle",
      text: "Exposure to strong fragrances/cleaning chemicals",
      scaleId: "frequency",
      composites: [
        { name: "ENV", weight: 2 }
      ]
    },
    {
      id: "L10",
      section: "G_Lifestyle",
      text: "Bedroom darkness and quiet",
      scaleId: "quality_5_inverse",
      composites: [
        { name: "SLP", weight: 2 },
        { name: "ENV", weight: 2 }
      ]
    },
    {
      id: "R1",
      section: "H_RedFlags",
      text: "Chest pain, pressure, or discomfort",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 4 }
      ]
    },
    {
      id: "R2",
      section: "H_RedFlags",
      text: "Unexplained shortness of breath",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 4 }
      ]
    },
    {
      id: "R3",
      section: "H_RedFlags",
      text: "Sudden weakness, numbness, or speech difficulty",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 4 }
      ]
    },
    {
      id: "R4",
      section: "H_RedFlags",
      text: "Dizziness or near-fainting",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 3 }
      ]
    },
    {
      id: "R5",
      section: "H_RedFlags",
      text: "Unintentional weight change",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 2 }
      ]
    },
    {
      id: "R6",
      section: "H_RedFlags",
      text: "Fever, night sweats, or chills without clear cause",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 2 }
      ]
    },
    {
      id: "R7",
      section: "H_RedFlags",
      text: "Mood symptoms severely affecting daily function",
      scaleId: "frequency",
      composites: [
        { name: "RFB", weight: 4 },
        { name: "SLD", weight: 4 }
      ]
    },
    {
      id: "R8",
      section: "H_RedFlags",
      text: "Thoughts of self-harm or that life is not worth living",
      scaleId: "yes_no",
      composites: [
        { name: "RFB", weight: 999 }
      ],
      isImmediateRedFlag: true
    }
  ]
};
