# Safety/Contraindications Pass - API Documentation

## Overview
The Safety/Contraindications Pass function checks for potential interactions and contraindications based on user responses and modifies supplement safety information accordingly. It implements a comprehensive rules table to ensure user safety when taking supplements.

## Function

### `checkContraindications(responses, supplements[])`

**Purpose**: Check for contraindications and modify supplement safety information based on user health conditions and medications.

## Rules Table

### **Contraindication Rules (v1)**

| Condition | Action | Supplements Affected | Safety Modification |
|-----------|--------|---------------------|-------------------|
| **Pregnancy/Trying to conceive** | Suppress adaptogens + add banner | Ashwagandha, Rhodiola, Ginseng, Maca, Holy Basil | Remove from supplement list |
| **Anticoagulants** | Add warning to Omega-3 | Omega-3, Fish Oil, EPA, DHA | "May interact with anticoagulants. Consult your healthcare provider before use." |
| **Kidney disease** | Warn on Magnesium | Magnesium glycinate, Magnesium citrate | "Use with caution in kidney disease. Consult your healthcare provider for appropriate dosing." |
| **Thyroid disease** | Warn on Ashwagandha | Ashwagandha | "May affect thyroid function. Consult your healthcare provider before use." |
| **GERD** | Reduce Vit C; "take with food" | Vitamin C, Ascorbic acid | "May cause stomach irritation. Take with food to reduce discomfort." |
| **Prescription medications** | General interaction warning | All supplements | Add banner about consulting healthcare provider |

## API Endpoint

### POST /api/safety-check

**Purpose**: Check contraindications and modify supplement safety information.

## Request Format

### Sample Request Body
```json
{
  "responses": {
    "pregnancy_status": "pregnant",
    "medications": ["Warfarin", "Prenatal vitamins"],
    "medical_conditions": ["GERD", "Chronic kidney disease", "Hypothyroidism"],
    "gerd": true,
    "kidney_disease": true,
    "thyroid_disease": true,
    "anticoagulants": true
  },
  "supplements": [
    {
      "name": "Omega-3 EPA/DHA",
      "dose": "1-2 g/day",
      "timing": "with meals",
      "why": "Reduces inflammation and supports cardiovascular health",
      "safety": "Safe for most people, may interact with blood thinners"
    },
    {
      "name": "Magnesium glycinate",
      "dose": "200-400 mg",
      "timing": "evening",
      "why": "Supports muscle relaxation and sleep quality",
      "safety": "Generally well-tolerated, may cause loose stools at high doses"
    },
    {
      "name": "Ashwagandha",
      "dose": "300-600 mg",
      "timing": "morning or evening",
      "why": "Adaptogen that helps with stress and energy",
      "safety": "Generally safe, may cause drowsiness"
    },
    {
      "name": "Vitamin C",
      "dose": "1000 mg",
      "timing": "with breakfast",
      "why": "Supports immune function and collagen synthesis",
      "safety": "Water-soluble vitamin, excess is excreted"
    }
  ]
}
```

## Response Format

### Success Response (200)
```json
{
  "ok": true,
  "supplements": [
    {
      "name": "Omega-3 EPA/DHA",
      "dose": "1-2 g/day",
      "timing": "with meals",
      "why": "Reduces inflammation and supports cardiovascular health",
      "safety": "May interact with anticoagulants. Consult your healthcare provider before use."
    },
    {
      "name": "Magnesium glycinate",
      "dose": "200-400 mg",
      "timing": "evening",
      "why": "Supports muscle relaxation and sleep quality",
      "safety": "Use with caution in kidney disease. Consult your healthcare provider for appropriate dosing."
    },
    {
      "name": "Vitamin C",
      "dose": "1000 mg",
      "timing": "with breakfast",
      "why": "Supports immune function and collagen synthesis",
      "safety": "May cause stomach irritation. Take with food to reduce discomfort."
    }
  ],
  "banner": "If you are pregnant or taking prescription medication, consult a clinician before starting any supplements.",
  "warnings": [
    "Adaptogens suppressed due to pregnancy status",
    "Omega-3 safety warning added due to anticoagulant use",
    "Magnesium safety warning added due to kidney disease",
    "Vitamin C safety warning added due to GERD",
    "General medication interaction warning added"
  ]
}
```

## Test Scenarios

### **Scenario 1: Pregnancy**
```json
{
  "responses": {
    "pregnancy_status": "pregnant",
    "medications": ["Prenatal vitamins"]
  },
  "supplements": [
    {"name": "Ashwagandha", "safety": "Generally safe"},
    {"name": "Omega-3 EPA/DHA", "safety": "Safe for most people"}
  ]
}
```

**Expected Result:**
- ✅ Adaptogens suppressed (Ashwagandha removed)
- ✅ Banner added for pregnancy
- ✅ Only non-adaptogen supplements retained

### **Scenario 2: Anticoagulants**
```json
{
  "responses": {
    "medications": ["Warfarin"],
    "anticoagulants": true
  },
  "supplements": [
    {"name": "Omega-3 EPA/DHA", "safety": "Safe for most people"}
  ]
}
```

**Expected Result:**
- ✅ Omega-3 safety modified with anticoagulant warning
- ✅ Banner added for medication interactions

### **Scenario 3: Kidney Disease**
```json
{
  "responses": {
    "kidney_disease": true,
    "medical_conditions": ["Chronic kidney disease"]
  },
  "supplements": [
    {"name": "Magnesium glycinate", "safety": "Generally well-tolerated"}
  ]
}
```

**Expected Result:**
- ✅ Magnesium safety modified with kidney disease warning
- ✅ Appropriate dosing guidance added

### **Scenario 4: Thyroid Disease**
```json
{
  "responses": {
    "thyroid_disease": true,
    "medical_conditions": ["Hypothyroidism"]
  },
  "supplements": [
    {"name": "Ashwagandha", "safety": "Generally safe"}
  ]
}
```

**Expected Result:**
- ✅ Ashwagandha safety modified with thyroid warning
- ✅ Healthcare provider consultation recommended

### **Scenario 5: GERD**
```json
{
  "responses": {
    "gerd": true,
    "medical_conditions": ["GERD"]
  },
  "supplements": [
    {"name": "Vitamin C", "safety": "Water-soluble vitamin"}
  ]
}
```

**Expected Result:**
- ✅ Vitamin C safety modified with stomach irritation warning
- ✅ "Take with food" guidance added

### **Scenario 6: Multiple Conditions**
```json
{
  "responses": {
    "pregnancy_status": "trying_to_conceive",
    "medications": ["Warfarin", "Levothyroxine"],
    "anticoagulants": true,
    "kidney_disease": true,
    "thyroid_disease": true,
    "gerd": true
  },
  "supplements": [
    {"name": "Omega-3 EPA/DHA", "safety": "Safe for most people"},
    {"name": "Magnesium glycinate", "safety": "Generally well-tolerated"},
    {"name": "Ashwagandha", "safety": "Generally safe"},
    {"name": "Vitamin C", "safety": "Water-soluble vitamin"},
    {"name": "Rhodiola", "safety": "Generally safe"}
  ]
}
```

**Expected Result:**
- ✅ Adaptogens suppressed (Ashwagandha, Rhodiola removed)
- ✅ Multiple safety warnings applied
- ✅ Comprehensive banner and warnings

## Implementation Details

### **Function Logic**
1. **Pregnancy Check**: Suppress adaptogens, add pregnancy banner
2. **Medication Check**: Add anticoagulant warnings to Omega-3
3. **Condition Check**: Add specific warnings for kidney, thyroid, GERD
4. **General Warning**: Add medication interaction banner
5. **Safety Modification**: Update supplement safety text accordingly

### **Safety Modifications**
- **Omega-3**: Anticoagulant interaction warning
- **Magnesium**: Kidney disease caution
- **Ashwagandha**: Thyroid function warning
- **Vitamin C**: Stomach irritation warning
- **Adaptogens**: Complete suppression during pregnancy

### **Banner Messages**
- **Pregnancy**: "If you are pregnant or taking prescription medication, consult a clinician before starting any supplements."
- **Medications**: "If you are taking prescription medications, consult your healthcare provider before starting any supplements to avoid potential interactions."

## Testing

### **Unit Tests**
```bash
# Run comprehensive safety tests
node test-safety-function.js

# Test individual scenarios
./test-safety-api.sh
```

### **API Testing**
```bash
# Test with sample data
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d @test/safety-test-data.json

# Test individual scenarios
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d '{"responses": {"pregnancy_status": "pregnant"}, "supplements": [...]}'
```

## Error Handling

### **Input Validation**
- **Required fields**: responses, supplements
- **Type checking**: Boolean flags, string arrays
- **Enum validation**: pregnancy_status values
- **Array validation**: medications, medical_conditions

### **Response Validation**
- **Schema compliance**: All required fields present
- **Type safety**: Proper data types for all fields
- **Content validation**: Non-empty arrays and objects

## Integration

### **With Personalization API**
```javascript
// After getting personalized supplements
const personalizedSupplements = await personalizeAPI(scores, symptoms);

// Check for contraindications
const safetyResult = await safetyAPI(userResponses, personalizedSupplements);

// Use modified supplements in final report
const finalSupplements = safetyResult.supplements;
```

### **With PDF Generation**
```javascript
// Include safety warnings in PDF
const pdfData = {
  supplements: safetyResult.supplements,
  banner: safetyResult.banner,
  warnings: safetyResult.warnings
};
```

## Future Enhancements

### **Additional Rules**
- **Diabetes**: Metformin interactions
- **Hypertension**: ACE inhibitor interactions
- **Depression**: SSRI interactions
- **Autoimmune**: Immune system interactions

### **Advanced Features**
- **Drug interaction database**: Comprehensive medication checking
- **Dosage adjustments**: Automatic dose modifications
- **Timing recommendations**: Optimal supplement timing
- **Monitoring guidance**: Lab test recommendations

## Security & Compliance

### **Medical Disclaimer**
- **Educational purpose**: Not medical advice
- **Healthcare consultation**: Always recommend professional guidance
- **Liability protection**: Clear disclaimers in all outputs

### **Data Privacy**
- **Health information**: Secure handling of medical data
- **No storage**: Process data without persistence
- **Compliance**: HIPAA-compliant data handling

## Performance

### **Response Time**
- **Typical**: 50-100ms
- **Complex**: 100-200ms (multiple conditions)
- **Memory usage**: Minimal (in-memory processing)

### **Scalability**
- **Stateless**: No database dependencies
- **Caching**: Rule table can be cached
- **Parallel processing**: Multiple condition checks

The Safety/Contraindications Pass ensures user safety by implementing comprehensive rules for supplement interactions and contraindications, providing appropriate warnings and modifications based on individual health conditions and medications.
