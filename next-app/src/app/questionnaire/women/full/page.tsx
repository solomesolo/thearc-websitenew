"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { setPersona } from "@/lib/persona";

// Question data structure
interface Question {
  id: string;
  text: string;
  whyMatters: string;
  type: "text" | "select" | "scale" | "checkbox";
  options?: string[];
  scaleLabels?: { min: string; max: string };
}

interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

// Comprehensive sections for full questionnaire
const sections: Section[] = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Help us understand your current health status and background",
    questions: [
      {
        id: "0.1",
        text: "Age",
        whyMatters: "Age helps us understand where you may be in the menopausal transition and tailor recommendations accordingly.",
        type: "text",
      },
      {
        id: "0.2_h",
        text: "Height",
      },
      {
        id: "0.2_w",
        text: "Weight",
        whyMatters: "Used to understand metabolism, energy needs, and recovery patterns.",
        type: "text",
      },
      {
        id: "0.3",
        text: "Menstrual Status",
        whyMatters: "Your cycle pattern helps determine whether symptoms are hormonal or lifestyle-driven.",
        type: "select",
        options: [
          "Regular periods",
          "Irregular periods",
          "No period 12+ months",
          "Hormonal contraception",
          "Hysterectomy",
        ],
      },
      {
        id: "0.4",
        text: "Hormone Therapy Use (HRT)",
        whyMatters: "HRT changes symptoms and action recommendations.",
        type: "select",
        options: ["No", "Estrogen", "Progesterone", "Combined", "Testosterone/DHEA"],
      },
      {
        id: "0.5",
        text: "Diagnosed Conditions",
        whyMatters: "Certain conditions change nutrition, stress, and screening recommendations.",
        type: "checkbox",
        options: [
          "Thyroid condition",
          "High blood pressure",
          "High cholesterol",
          "Diabetes/prediabetes",
          "Anxiety/depression",
          "Autoimmune condition",
          "Osteoporosis",
          "None",
        ],
      },
      {
        id: "0.6",
        text: "Family Medical History",
        whyMatters: "Family history helps assess genetic risk factors for cardiovascular disease, diabetes, and other conditions.",
        type: "checkbox",
        options: [
          "Heart disease",
          "Diabetes",
          "Cancer",
          "Thyroid disorders",
          "Autoimmune conditions",
          "None significant",
        ],
      },
    ],
  },
  {
    id: "menopause-symptoms",
    title: "Menopause Symptoms & Quality of Life",
    description: "Understanding how menopause symptoms affect your daily life",
    questions: [
      // A1: Vasomotor Symptoms
      {
        id: "V1",
        text: "How much do hot flashes bother you?",
        whyMatters: "Hot flashes are a key indicator of hormonal fluctuations and can significantly impact quality of life.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "V2",
        text: "How much do night sweats disturb your comfort or sleep?",
        whyMatters: "Night sweats can severely disrupt sleep quality and recovery.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "V3",
        text: "How much are you bothered by waking up overheated or sweaty?",
        whyMatters: "Waking overheated indicates temperature dysregulation affecting sleep architecture.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "V4",
        text: "How much do flushing or sudden waves of heat affect you?",
        whyMatters: "Flushing episodes can indicate vasomotor instability and hormonal shifts.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "V5",
        text: "How much do chills or shivers after hot episodes bother you?",
        whyMatters: "Post-flash chills indicate autonomic nervous system dysregulation.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      // A2: Emotional & Psychosocial Wellbeing
      {
        id: "P1",
        text: "How much more irritable or 'on edge' do you feel than usual?",
        whyMatters: "Increased irritability can indicate hormonal fluctuations, stress overload, or sleep disruption.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "P2",
        text: "How often do you feel low in mood?",
        whyMatters: "Mood changes during menopause can be related to hormonal shifts, stress, or sleep issues.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "P3",
        text: "How much have you lost interest or pleasure in things you usually enjoy?",
        whyMatters: "Loss of interest can indicate depression, hormonal changes, or chronic stress.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "P4",
        text: "How often do you feel tense or unable to relax?",
        whyMatters: "Persistent tension indicates stress overload or anxiety that may need targeted support.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "P5",
        text: "How often do you worry more about your health or future?",
        whyMatters: "Health anxiety can be exacerbated by menopausal symptoms and uncertainty.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "P6",
        text: "How often do you feel less confident or self-assured?",
        whyMatters: "Confidence changes can reflect hormonal shifts, stress, or physical symptom burden.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "P7",
        text: "How much are these emotional changes affecting your wellbeing?",
        whyMatters: "Understanding the impact of emotional symptoms helps prioritize support strategies.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      // A3: Physical / Somatic Symptoms
      {
        id: "S1",
        text: "How much do muscle or joint aches affect you?",
        whyMatters: "Musculoskeletal symptoms can be related to hormonal changes, inflammation, or activity patterns.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "S2",
        text: "How much do headaches or head pressure affect you?",
        whyMatters: "Headaches can be related to hormonal fluctuations, stress, sleep, or inflammation.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "S3",
        text: "How often do you feel unusually tired or low in energy?",
        whyMatters: "Fatigue can indicate sleep disruption, stress overload, hormonal changes, or metabolic issues.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "S4",
        text: "How much do heart-pounding or palpitations bother you?",
        whyMatters: "Palpitations can be related to hormonal changes, stress, or cardiovascular health.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "S5",
        text: "How much do bloating or abdominal discomfort affect you?",
        whyMatters: "Digestive symptoms can indicate inflammation, food sensitivities, or gut health issues.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "S6",
        text: "How often do you feel short of breath with usual activities?",
        whyMatters: "Shortness of breath can indicate cardiovascular issues, stress, or deconditioning.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "S7",
        text: "How noticeable have weight or body shape changes been to you recently?",
        whyMatters: "Body composition changes during menopause can affect metabolism and self-perception.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "S8",
        text: "How much does breast tenderness affect you?",
        whyMatters: "Breast tenderness can indicate hormonal fluctuations or sensitivity patterns.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      // A4: Sexual & Urogenital Symptoms
      {
        id: "U1",
        text: "How much does vaginal dryness or irritation bother you?",
        whyMatters: "Vaginal dryness is a common menopausal symptom that can significantly impact quality of life.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "U2",
        text: "How much does pain or discomfort with sexual activity affect you?",
        whyMatters: "Sexual discomfort can be related to hormonal changes, dryness, or other factors.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "U3",
        text: "How much has your interest in sexual activity changed?",
        whyMatters: "Changes in libido can be related to hormonal shifts, stress, or physical symptoms.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
      {
        id: "U4",
        text: "How often do you feel sudden urinary urgency?",
        whyMatters: "Urinary urgency can indicate urogenital changes related to menopause.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "U5",
        text: "How often do you experience urinary leakage?",
        whyMatters: "Urinary leakage can affect quality of life and may need targeted support.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "U6",
        text: "How much do these symptoms affect your quality of life?",
        whyMatters: "Understanding the overall impact helps prioritize treatment and support strategies.",
        type: "select",
        options: ["Not at all", "A little", "Moderately", "Quite a lot", "Extremely"],
      },
    ],
  },
  {
    id: "mood-anxiety",
    title: "Mood, Anxiety & Resilience",
    description: "Understanding your emotional wellbeing and stress resilience",
    questions: [
      {
        id: "M1",
        text: "How often do you find less pleasure in usual activities?",
        whyMatters: "Loss of pleasure (anhedonia) can indicate depression or stress overload.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "M2",
        text: "How often do you feel hopeless or discouraged?",
        whyMatters: "Feelings of hopelessness can indicate depression that may need clinical support.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "M3",
        text: "How often do you feel excessively worried or anxious?",
        whyMatters: "Excessive worry can indicate anxiety disorders or chronic stress.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "M4",
        text: "How often do you have sudden episodes of intense fear or panic?",
        whyMatters: "Panic episodes can indicate anxiety disorders that may need targeted support.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "M5",
        text: "How often do you feel tearful or emotionally sensitive?",
        whyMatters: "Emotional sensitivity can be related to hormonal changes, stress, or mood disorders.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "M6",
        text: "How often do you experience rapid mood swings?",
        whyMatters: "Mood swings can indicate hormonal fluctuations, stress, or mood disorders.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "M7",
        text: "How often do you withdraw from social interactions?",
        whyMatters: "Social withdrawal can indicate depression, anxiety, or stress overload.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "M8",
        text: "How often do mood or anxiety symptoms interfere with daily functioning?",
        whyMatters: "Functional impairment indicates the severity of mood or anxiety symptoms.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
    ],
  },
  {
    id: "cognition",
    title: "Cognition, Focus & Mental Energy",
    description: "Understanding your cognitive function and mental clarity",
    questions: [
      {
        id: "C1",
        text: "How often do you have difficulty concentrating?",
        whyMatters: "Concentration difficulties can indicate sleep issues, stress, hormonal changes, or cognitive concerns.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "C2",
        text: "How often do you have trouble remembering recent things?",
        whyMatters: "Memory issues can be related to sleep, stress, hormonal changes, or cognitive health.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "C3",
        text: "How often do you lose track of tasks or conversations?",
        whyMatters: "Losing track can indicate attention issues, stress overload, or cognitive changes.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "C4",
        text: "How often do you feel mentally foggy or slowed down?",
        whyMatters: "Brain fog can indicate sleep disruption, stress, inflammation, or hormonal changes.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "C5",
        text: "How often does mental tiredness limit your productivity?",
        whyMatters: "Mental fatigue can indicate sleep issues, stress overload, or cognitive strain.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "C6",
        text: "How often do these cognitive symptoms affect your responsibilities?",
        whyMatters: "Functional impact of cognitive symptoms helps prioritize support strategies.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
    ],
  },
  {
    id: "sleep",
    title: "Sleep Quality & Circadian Rhythm",
    description: "Understanding your sleep patterns and circadian health",
    questions: [
      {
        id: "SL1",
        text: "Difficulty falling asleep at your planned bedtime",
        whyMatters: "Sleep onset difficulties can indicate stress, circadian misalignment, or anxiety.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "SL2",
        text: "Waking during the night and struggling to fall back asleep",
        whyMatters: "Night wakings can indicate stress, hormonal changes, or sleep disorders.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "SL3",
        text: "Waking earlier than planned and unable to return to sleep",
        whyMatters: "Early morning waking can indicate cortisol dysregulation, stress, or depression.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "SL4",
        text: "How rested do you feel when you wake up?",
        whyMatters: "Wake quality reflects sleep depth, duration, and circadian alignment.",
        type: "select",
        options: ["Very rested", "Mostly rested", "Neutral", "Slightly unrested", "Very unrested"],
      },
      {
        id: "SL5",
        text: "Waking due to feeling too hot or too cold",
        whyMatters: "Temperature-related wakings can indicate vasomotor symptoms or sleep environment issues.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "SL6",
        text: "How consistent is your bedtime?",
        whyMatters: "Bedtime consistency supports circadian rhythm regulation and sleep quality.",
        type: "select",
        options: ["Very consistent", "Mostly consistent", "Somewhat variable", "Quite variable", "Very inconsistent"],
      },
      {
        id: "SL7",
        text: "How consistent is your wake-up time?",
        whyMatters: "Wake time consistency helps maintain circadian rhythm stability.",
        type: "select",
        options: ["Very consistent", "Mostly consistent", "Somewhat variable", "Quite variable", "Very inconsistent"],
      },
      {
        id: "SL8",
        text: "Screen use in the hour before bed",
        whyMatters: "Evening screen use can suppress melatonin and disrupt sleep onset.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "SL9",
        text: "Caffeine intake after midday",
        whyMatters: "Afternoon caffeine can disrupt sleep quality and delay sleep onset.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "SL10",
        text: "Daytime impact of poor sleep",
        whyMatters: "Daytime impact reflects the severity of sleep disruption on daily function.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition Pattern",
    description: "Understanding your dietary habits and food frequency",
    questions: [
      {
        id: "N1",
        text: "Vegetable intake",
        whyMatters: "Vegetables provide essential nutrients, fiber, and antioxidants for hormonal health.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N2",
        text: "Fruit intake",
        whyMatters: "Fruits provide vitamins, antioxidants, and fiber that support metabolic health.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N3",
        text: "Whole grains",
        whyMatters: "Whole grains provide fiber and nutrients that support blood sugar stability.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N4",
        text: "Legumes",
        whyMatters: "Legumes provide protein, fiber, and nutrients that support metabolic health.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N5",
        text: "Oily fish",
        whyMatters: "Oily fish provides omega-3 fatty acids that reduce inflammation and support brain health.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N6",
        text: "Red or processed meat",
        whyMatters: "High intake of processed meat is associated with inflammation and cardiometabolic risk.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N7",
        text: "Sugary drinks",
        whyMatters: "Sugary drinks contribute to blood sugar instability and inflammation.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N8",
        text: "Sweets or baked goods",
        whyMatters: "High sugar intake can contribute to blood sugar swings and inflammation.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N9",
        text: "Fast food or take-away meals",
        whyMatters: "Fast food is typically high in processed ingredients and can increase inflammation.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N10",
        text: "Nuts and seeds",
        whyMatters: "Nuts and seeds provide healthy fats, protein, and nutrients that support metabolic health.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N11",
        text: "Olive oil as main added fat",
        whyMatters: "Olive oil provides anti-inflammatory monounsaturated fats that support cardiovascular health.",
        type: "select",
        options: ["Never / almost never", "1–3× per month", "1–3× per week", "4–6× per week", "Daily or more"],
      },
      {
        id: "N12",
        text: "Typical alcohol intake (per drinking day)",
        whyMatters: "Alcohol can affect sleep, hormones, and metabolic health.",
        type: "select",
        options: ["None", "1 drink", "2 drinks", "3 drinks", "4 or more drinks"],
      },
    ],
  },
  {
    id: "supplements",
    title: "Supplements",
    description: "Understanding your supplement usage and patterns",
    questions: [
      {
        id: "SU1",
        text: "Do you take any vitamins or minerals?",
        whyMatters: "Vitamins and minerals support various metabolic and hormonal functions.",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "SU2",
        text: "Do you take any herbal or botanical supplements?",
        whyMatters: "Herbal supplements can interact with medications and affect hormonal balance.",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "SU3",
        text: "Do you take omega-3 or fish oil?",
        whyMatters: "Omega-3 supplements provide concentrated anti-inflammatory support.",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "SU4",
        text: "Do you take probiotics?",
        whyMatters: "Probiotics support gut health, which affects inflammation and metabolic health.",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "SU5",
        text: "Supplements specifically for sleep or stress?",
        whyMatters: "Sleep and stress supplements can indicate areas needing additional support.",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "SU6",
        text: "How consistently do you follow supplement directions?",
        whyMatters: "Consistency affects supplement effectiveness and safety.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      },
      {
        id: "SU7",
        text: "Have you noticed side effects possibly related to supplements?",
        whyMatters: "Side effects can indicate interactions, dosages, or individual sensitivities.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
      },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle, Activity & Environment",
    description: "Understanding your daily habits, activity levels, and environmental factors",
    questions: [
      {
        id: "L1",
        text: "Feeling overwhelmed by responsibilities",
        whyMatters: "Overwhelm indicates stress overload that can affect hormones, sleep, and health.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "L2",
        text: "Feeling little control over time",
        whyMatters: "Lack of time control contributes to chronic stress and poor recovery.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "L3",
        text: "Feeling pressure to stay connected late into the evening",
        whyMatters: "Evening connectivity pressure can disrupt circadian rhythms and sleep.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "L4",
        text: "Time spent sitting on a typical day",
        whyMatters: "Sedentary time affects metabolic health, circulation, and recovery.",
        type: "select",
        options: ["<2 hours", "2–4 hours", "4–6 hours", "6–8 hours", "8+ hours"],
      },
      {
        id: "L5",
        text: "Moderate/vigorous activity ≥20 minutes",
        whyMatters: "Regular physical activity supports cardiovascular health, mood, and metabolic function.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "L6",
        text: "Strength training or resistance exercise",
        whyMatters: "Strength training is crucial for maintaining muscle mass and bone density during menopause.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "L7",
        text: "Stress-reduction practices (breathing, meditation, yoga)",
        whyMatters: "Stress-reduction practices support recovery, mood, and hormonal balance.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "L8",
        text: "Home air quality (ventilation, odors, humidity)",
        whyMatters: "Air quality affects respiratory health, sleep, and overall wellbeing.",
        type: "select",
        options: ["Excellent", "Good", "Fair", "Poor", "Very Poor"],
      },
      {
        id: "L9",
        text: "Exposure to strong fragrances/cleaning chemicals",
        whyMatters: "Chemical exposure can trigger inflammation, sensitivities, or respiratory issues.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "L10",
        text: "Bedroom darkness and quiet",
        whyMatters: "Sleep environment quality directly affects sleep depth and circadian alignment.",
        type: "select",
        options: ["Very good", "Good", "Acceptable", "Quite poor", "Very poor"],
      },
    ],
  },
  {
    id: "red-flags",
    title: "Safety & Red Flags",
    description: "Identifying symptoms that may need immediate medical attention",
    questions: [
      {
        id: "R1",
        text: "Chest pain, pressure, or discomfort",
        whyMatters: "Chest symptoms can indicate cardiovascular issues requiring immediate evaluation.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "R2",
        text: "Unexplained shortness of breath",
        whyMatters: "Shortness of breath can indicate cardiovascular or respiratory issues.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "R3",
        text: "Sudden weakness, numbness, or speech difficulty",
        whyMatters: "Neurological symptoms require immediate medical evaluation.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "R4",
        text: "Dizziness or near-fainting",
        whyMatters: "Dizziness can indicate cardiovascular, neurological, or metabolic issues.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "R5",
        text: "Unintentional weight change",
        whyMatters: "Unintentional weight changes can indicate metabolic, thyroid, or other health issues.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "R6",
        text: "Fever, night sweats, or chills without clear cause",
        whyMatters: "Unexplained fever or systemic symptoms may indicate infection or other conditions.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "R7",
        text: "Mood symptoms severely affecting daily function",
        whyMatters: "Severe mood symptoms may require clinical support and evaluation.",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "R8",
        text: "Thoughts of self-harm or that life is not worth living",
        whyMatters: "Suicidal thoughts require immediate professional support and crisis intervention.",
        type: "select",
        options: ["Yes", "No"],
      },
    ],
  },
];

export default function WomenFullQuestionnairePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPersona("women");
  }, []);

  const currentSection = sections[currentSectionIndex];
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Save answers to localStorage
    localStorage.setItem("fullQuestionnaireAnswers", JSON.stringify(answers));
    localStorage.setItem("questionnaireType", "full");

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to loading page, then full dashboard
    router.push(`/loading?persona=women&type=full`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            Complete Your Full ARC Blueprint
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            This comprehensive questionnaire will help us create your personalized longevity plan
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">
              Section {currentSectionIndex + 1} of {sections.length}
            </span>
            <span className="text-sm text-slate-400">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlowCard className="p-6 sm:p-8 mb-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {currentSection.title}
                </h2>
                {currentSection.description && (
                  <p className="text-slate-300 text-sm">
                    {currentSection.description}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {currentSection.questions.map((question, qIndex) => (
                  <div key={question.id} className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <label className="text-base font-medium text-white flex-1">
                        {question.text}
                      </label>
                      <InfoTooltip content={question.whyMatters} />
                    </div>

                    {question.type === "text" && (
                      <input
                        type="text"
                        value={answers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                      />
                    )}

                    {question.type === "select" && (
                      <select
                        value={answers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                      >
                        <option value="">Select an option</option>
                        {question.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {question.type === "checkbox" && (
                      <div className="space-y-2">
                        {question.options?.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={
                                Array.isArray(answers[question.id])
                                  ? answers[question.id].includes(option)
                                  : false
                              }
                              onChange={(e) => {
                                const current = Array.isArray(answers[question.id])
                                  ? answers[question.id]
                                  : [];
                                const updated = e.target.checked
                                  ? [...current, option]
                                  : current.filter((v) => v !== option);
                                handleAnswerChange(question.id, updated);
                              }}
                              className="w-5 h-5 rounded border-slate-700 bg-slate-900/50 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50"
                            />
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === "scale" && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>{question.scaleLabels?.min}</span>
                          <span>{question.scaleLabels?.max}</span>
                        </div>
                        <div className="flex gap-2">
                          {[0, 1, 2, 3, 4].map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleAnswerChange(question.id, value)}
                              className={`
                                flex-1 py-3 rounded-xl border transition-all
                                ${
                                  answers[question.id] === value
                                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                                    : "border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-600"
                                }
                              `}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentSectionIndex === 0}
            className="
              px-6 py-3
              rounded-full
              border border-slate-700
              bg-slate-900/50
              text-white
              font-medium
              hover:bg-slate-800/50
              transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Previous
          </button>

          {currentSectionIndex < sections.length - 1 ? (
            <button
              onClick={handleNext}
              className="
                px-6 py-3
                rounded-full
                bg-gradient-to-r from-emerald-400 to-teal-500
                text-slate-950
                font-semibold
                hover:from-emerald-300 hover:to-teal-400
                transition-all
                shadow-[0_4px_14px_rgba(16,185,129,0.4)]
              "
            >
              Next Section
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="
                px-8 py-3
                rounded-full
                bg-gradient-to-r from-emerald-400 to-teal-500
                text-slate-950
                font-semibold
                hover:from-emerald-300 hover:to-teal-400
                transition-all
                shadow-[0_4px_14px_rgba(16,185,129,0.4)]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? "Submitting..." : "Complete & Generate Blueprint"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
