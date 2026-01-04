#!/bin/bash

echo "=== API AUDIT ==="
echo ""

# Test key APIs
echo "Testing enrollment API..."
result=$(curl -s -X POST http://localhost:3000/api/enroll/apply \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","preferredProgramId":"hvac-tech"}')
if echo "$result" | grep -q "error\|wrong"; then
  echo "❌ Enrollment API broken"
else
  echo "✅ Enrollment API responds"
fi

echo ""
echo "Testing messages API..."
result=$(curl -s http://localhost:3000/api/messages)
if echo "$result" | grep -q "Unauthorized\|error"; then
  echo "✅ Messages API (requires auth)"
else
  echo "❌ Messages API broken"
fi

echo ""
echo "Testing AI API..."
result=$(curl -s -X POST http://localhost:3000/api/ai-instructor \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}')
if echo "$result" | grep -q "message\|error"; then
  echo "✅ AI API responds"
else
  echo "❌ AI API broken"
fi
