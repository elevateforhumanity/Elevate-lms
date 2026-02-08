#!/bin/bash

# Route Status Table Generator
# Tests all critical routes for the barber apprenticeship flow

BASE_URL="${1:-http://localhost:3000}"

echo "# Route Status Table"
echo "Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo ""
echo "| Route | Status | Redirect | Notes |"
echo "|-------|--------|----------|-------|"

check_route() {
  local route="$1"
  local result=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" -L --max-redirs 0 "$BASE_URL$route" 2>/dev/null || echo "000|")
  local status=$(echo "$result" | cut -d'|' -f1)
  local redirect=$(echo "$result" | cut -d'|' -f2)
  
  if [ "$status" = "000" ]; then
    echo "| $route | TIMEOUT | - | Connection failed |"
  elif [ "$status" = "302" ] || [ "$status" = "307" ] || [ "$status" = "308" ]; then
    echo "| $route | $status | $redirect | Redirect |"
  elif [ "$status" = "200" ]; then
    echo "| $route | $status | - | OK |"
  elif [ "$status" = "401" ]; then
    echo "| $route | $status | - | Auth required |"
  elif [ "$status" = "403" ]; then
    echo "| $route | $status | - | Forbidden |"
  elif [ "$status" = "404" ]; then
    echo "| $route | $status | - | NOT FOUND |"
  else
    echo "| $route | $status | - | Other |"
  fi
}

# Program routes
check_route "/programs/barber-apprenticeship"
check_route "/programs/barber-apprenticeship/apply"
check_route "/inquiry?program=barber-apprenticeship"
check_route "/programs/barber-apprenticeship/enrollment-success"
check_route "/programs/barber-apprenticeship/orientation"
check_route "/programs/barber-apprenticeship/documents"

# Apprentice portal routes
check_route "/apprentice"
check_route "/apprentice/dashboard"
check_route "/apprentice/timeclock"
check_route "/apprentice/hours"
check_route "/apprentice/documents"
check_route "/apprentice/profile"

# PWA routes
check_route "/pwa/barber/checkin"
check_route "/pwa/checkin"

# API routes (should return 401 without auth, not 404)
echo ""
echo "## API Endpoints (unauthenticated)"
echo "| Endpoint | Method | Status | Notes |"
echo "|----------|--------|--------|-------|"

check_api() {
  local method="$1"
  local route="$2"
  local status=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$BASE_URL$route" 2>/dev/null || echo "000")
  
  if [ "$status" = "000" ]; then
    echo "| $route | $method | TIMEOUT | Connection failed |"
  elif [ "$status" = "401" ]; then
    echo "| $route | $method | $status | Auth required (expected) |"
  elif [ "$status" = "404" ]; then
    echo "| $route | $method | $status | NOT FOUND - MISSING |"
  elif [ "$status" = "405" ]; then
    echo "| $route | $method | $status | Method not allowed |"
  else
    echo "| $route | $method | $status | - |"
  fi
}

check_api "POST" "/api/inquiry"
check_api "POST" "/api/applications"
check_api "POST" "/api/barber/checkout"
check_api "POST" "/api/webhooks/stripe"
check_api "POST" "/api/enrollment/complete-orientation"
check_api "POST" "/api/enrollment/upload-document"
check_api "POST" "/api/enrollment/submit-documents"
check_api "GET" "/api/timeclock/context"
check_api "POST" "/api/timeclock/action"
check_api "POST" "/api/checkin"
check_api "POST" "/api/admin/enrollment-override"

