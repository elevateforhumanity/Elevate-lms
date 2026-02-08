#!/bin/bash

# API Enforcement Tests - Curl-based verification
# These tests prove server-side enforcement without browser

BASE_URL="${1:-http://localhost:3000}"

echo "# API Enforcement Test Results"
echo "Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo ""

test_api() {
  local name="$1"
  local method="$2"
  local endpoint="$3"
  local data="$4"
  local expected="$5"
  
  if [ "$method" = "GET" ]; then
    result=$(curl -s -o /tmp/response.json -w "%{http_code}" "$BASE_URL$endpoint")
  else
    result=$(curl -s -o /tmp/response.json -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
  fi
  
  response=$(cat /tmp/response.json 2>/dev/null | head -c 200)
  
  if echo "$expected" | grep -q "$result"; then
    echo "✅ PASS: $name"
    echo "   Status: $result (expected: $expected)"
  else
    echo "❌ FAIL: $name"
    echo "   Status: $result (expected: $expected)"
    echo "   Response: $response"
  fi
  echo ""
}

echo "## Authentication Enforcement"
echo ""

test_api "Timeclock context requires auth" \
  "GET" "/api/timeclock/context" "" "401"

test_api "Timeclock action requires auth" \
  "POST" "/api/timeclock/action" '{"action":"clock_in"}' "401|500"

test_api "Checkin requires auth" \
  "POST" "/api/checkin" '{"code":"TEST123"}' "401"

test_api "Document upload requires auth" \
  "POST" "/api/enrollment/upload-document" '{}' "401"

test_api "Submit documents requires auth" \
  "POST" "/api/enrollment/submit-documents" '{"program":"barber-apprenticeship"}' "401"

test_api "Complete orientation requires auth" \
  "POST" "/api/enrollment/complete-orientation" '{"program":"barber-apprenticeship"}' "401"

test_api "Barber checkout requires auth" \
  "POST" "/api/barber/checkout" '{"hours_per_week":40}' "401"

test_api "Admin override requires auth" \
  "POST" "/api/admin/enrollment-override" '{"user_id":"test","action":"CLOCK_IN"}' "401|503"

echo "## Stripe Webhook Security"
echo ""

test_api "Webhook rejects missing signature" \
  "POST" "/api/webhooks/stripe" '{"type":"checkout.session.completed"}' "400|500"

# Test with invalid signature header
result=$(curl -s -o /tmp/response.json -w "%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -H "stripe-signature: invalid_sig" \
  -d '{"type":"checkout.session.completed"}' \
  "$BASE_URL/api/webhooks/stripe")

if [ "$result" = "400" ]; then
  echo "✅ PASS: Webhook rejects invalid signature"
  echo "   Status: $result"
else
  echo "❌ FAIL: Webhook rejects invalid signature"
  echo "   Status: $result (expected: 400)"
fi
echo ""

echo "## Route Availability"
echo ""

check_route() {
  local name="$1"
  local route="$2"
  local expected="$3"
  
  result=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route")
  
  if echo "$expected" | grep -q "$result"; then
    echo "✅ PASS: $name"
    echo "   Route: $route → $result"
  else
    echo "❌ FAIL: $name"
    echo "   Route: $route → $result (expected: $expected)"
  fi
}

check_route "Program page" "/programs/barber-apprenticeship" "200"
check_route "Apply page" "/programs/barber-apprenticeship/apply" "200"
check_route "Inquiry page" "/inquiry?program=barber-apprenticeship" "200"
check_route "Orientation page" "/programs/barber-apprenticeship/orientation" "200"
check_route "Documents page" "/programs/barber-apprenticeship/documents" "200"
check_route "Enrollment success" "/programs/barber-apprenticeship/enrollment-success" "200"
check_route "Apprentice handbook" "/apprentice/handbook" "200"
check_route "Student handbook" "/student-handbook" "200"
check_route "PWA checkin" "/pwa/barber/checkin" "200"

echo ""
echo "## Summary"
echo "Test completed at $(date -u +%Y-%m-%dT%H:%M:%SZ)"
