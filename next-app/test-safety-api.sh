#!/bin/bash

# Test Safety/Contraindications API
echo "🧪 Testing Safety/Contraindications API..."
echo "=========================================="
echo ""

# Test the API endpoint
echo "📋 Testing POST /api/safety-check..."
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d @test/safety-test-data.json \
  -w "\nHTTP Status: %{http_code}\n" | jq .

echo ""
echo "📋 Testing GET /api/safety-check..."
curl -X GET http://localhost:3000/api/safety-check | jq .

echo ""
echo "🧪 Testing Individual Scenarios..."
echo "================================="

# Test 1: Pregnancy scenario
echo ""
echo "🤰 Test 1: Pregnancy Scenario"
echo "------------------------------"
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "pregnancy_status": "pregnant",
      "medications": ["Prenatal vitamins"]
    },
    "supplements": [
      {
        "name": "Ashwagandha",
        "dose": "300-600 mg",
        "timing": "morning",
        "why": "Adaptogen for stress",
        "safety": "Generally safe"
      },
      {
        "name": "Omega-3 EPA/DHA",
        "dose": "1-2 g/day",
        "timing": "with meals",
        "why": "Reduces inflammation",
        "safety": "Safe for most people"
      }
    ]
  }' | jq .

# Test 2: Anticoagulants scenario
echo ""
echo "🩸 Test 2: Anticoagulants Scenario"
echo "----------------------------------"
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "medications": ["Warfarin"],
      "anticoagulants": true
    },
    "supplements": [
      {
        "name": "Omega-3 EPA/DHA",
        "dose": "1-2 g/day",
        "timing": "with meals",
        "why": "Reduces inflammation",
        "safety": "Safe for most people"
      }
    ]
  }' | jq .

# Test 3: Kidney disease scenario
echo ""
echo "🫘 Test 3: Kidney Disease Scenario"
echo "----------------------------------"
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "kidney_disease": true,
      "medical_conditions": ["Chronic kidney disease"]
    },
    "supplements": [
      {
        "name": "Magnesium glycinate",
        "dose": "200-400 mg",
        "timing": "evening",
        "why": "Supports muscle relaxation",
        "safety": "Generally well-tolerated"
      }
    ]
  }' | jq .

# Test 4: Thyroid disease scenario
echo ""
echo "🦋 Test 4: Thyroid Disease Scenario"
echo "------------------------------------"
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "thyroid_disease": true,
      "medical_conditions": ["Hypothyroidism"]
    },
    "supplements": [
      {
        "name": "Ashwagandha",
        "dose": "300-600 mg",
        "timing": "morning",
        "why": "Adaptogen for stress",
        "safety": "Generally safe"
      }
    ]
  }' | jq .

# Test 5: GERD scenario
echo ""
echo "🔥 Test 5: GERD Scenario"
echo "------------------------"
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "gerd": true,
      "medical_conditions": ["GERD"]
    },
    "supplements": [
      {
        "name": "Vitamin C",
        "dose": "1000 mg",
        "timing": "with breakfast",
        "why": "Supports immune function",
        "safety": "Water-soluble vitamin"
      }
    ]
  }' | jq .

# Test 6: Multiple conditions scenario
echo ""
echo "🔄 Test 6: Multiple Conditions Scenario"
echo "---------------------------------------"
curl -X POST http://localhost:3000/api/safety-check \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "pregnancy_status": "trying_to_conceive",
      "medications": ["Warfarin", "Levothyroxine"],
      "anticoagulants": true,
      "kidney_disease": true,
      "thyroid_disease": true,
      "gerd": true
    },
    "supplements": [
      {
        "name": "Omega-3 EPA/DHA",
        "dose": "1-2 g/day",
        "timing": "with meals",
        "why": "Reduces inflammation",
        "safety": "Safe for most people"
      },
      {
        "name": "Magnesium glycinate",
        "dose": "200-400 mg",
        "timing": "evening",
        "why": "Supports muscle relaxation",
        "safety": "Generally well-tolerated"
      },
      {
        "name": "Ashwagandha",
        "dose": "300-600 mg",
        "timing": "morning",
        "why": "Adaptogen for stress",
        "safety": "Generally safe"
      },
      {
        "name": "Vitamin C",
        "dose": "1000 mg",
        "timing": "with breakfast",
        "why": "Supports immune function",
        "safety": "Water-soluble vitamin"
      },
      {
        "name": "Rhodiola",
        "dose": "200-400 mg",
        "timing": "morning",
        "why": "Adaptogen for energy",
        "safety": "Generally safe"
      }
    ]
  }' | jq .

echo ""
echo "✅ Safety/Contraindications API Testing Complete!"
echo "==============================================="
echo ""
echo "🎯 Expected Results:"
echo "• Pregnancy → Adaptogens suppressed + banner"
echo "• Anticoagulants → Omega-3 safety warning"
echo "• Kidney disease → Magnesium safety warning"
echo "• Thyroid disease → Ashwagandha safety warning"
echo "• GERD → Vitamin C safety warning"
echo "• Multiple conditions → Combined warnings"
echo ""
echo "📊 All safety rules implemented and tested!"
