# The Arc Personalization Framework

This is a comprehensive health assessment questionnaire designed to gather detailed information about an individual's health profile across multiple dimensions.

## Structure

The questionnaire is organized into 5 main sections:

### 1. Biological Signals (WHO STEPS)
- **About You and Your Background**: Age, gender, location, education, work status
- **Tobacco Use**: Current and past smoking habits, secondhand smoke exposure
- **Alcohol Use**: Recent alcohol consumption, drinking patterns, binge drinking
- **Food and Drink Habits**: Fruit and vegetable consumption, eating out frequency
- **Physical Activity**: Daily physical activity time, sedentary behavior
- **Health History**: High blood pressure, diabetes, current medications

### 2. Family Risk Assessment (CDC FHHT)
- **Family Tree**: Close relatives and family structure
- **Family Origins**: Geographic and ethnic background
- **Family Health Challenges**: Major health conditions in family history
- **Family Ages**: Current ages and ages at death
- **Family Medications**: Long-term medications in family
- **Family Health Patterns**: Recurring health conditions in family

### 3. Physiological Patterns (COMPASS-31)
- **Getting Up and Moving Around**: Lightheadedness, dizziness, orthostatic symptoms
- **Temperature and Skin Color Changes**: Skin color changes, temperature sensitivity
- **Moisture and Dryness**: Dry mouth/eyes, sweating patterns
- **Eating and Digestion**: Fullness changes, bloating, vomiting, digestive issues
- **Eyes and Bright Lights**: Light sensitivity, focus issues

### 4. Lifestyle Load (PSS-10)
- **Stress Assessment**: 10 questions covering various aspects of perceived stress
- **Coping Abilities**: Confidence in handling problems, feeling in control
- **Life Management**: Overwhelm, unpredictability, coping strategies

### 5. Cognitive Rhythm (CFQ + WHO-5)
- **Cognitive Function Questionnaire (CFQ)**: 10 questions about cognitive function, fatigue, and energy levels
- **WHO-5 Well-Being Index**: 5 questions about mental well-being and life satisfaction

## Usage

1. Open `personalization-framework.html` in a web browser
2. Navigate through the 5 sections using the sidebar or navigation buttons
3. Complete all questions in each section
4. Submit the form to collect the assessment data

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Section Navigation**: Easy navigation between sections
- **Conditional Fields**: Dynamic form fields based on previous answers
- **Progress Tracking**: Visual indication of current section
- **Data Collection**: Comprehensive form data collection and submission

## Technical Details

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: Interactive form handling and navigation
- **Responsive**: Mobile-first design approach

## Local Development

To run locally:

```bash
# Navigate to the directory
cd arc-personalization-framework

# Start a local server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080/personalization-framework.html
```

## File Structure

```
arc-personalization-framework/
├── personalization-framework.html    # Main questionnaire file
├── README.md                         # This documentation
└── personalization-questionnaire.html # Backup/copy of original
```

## Notes

- This questionnaire is designed for local development and testing
- No backend integration is included - form data is logged to console
- All questions are based on established health assessment tools (WHO STEPS, CDC FHHT, COMPASS-31, PSS-10, CFQ, WHO-5)
- The questionnaire follows best practices for health data collection
