#!/bin/bash
echo "=== FINDING ALL 500/404 ERRORS ==="
echo ""

# Test all critical endpoints
endpoints=(
  "GET:/"
  "GET:/login"
  "GET:/apply"
  "GET:/lms/dashboard"
  "GET:/admin/dashboard"
  "GET:/staff-portal/dashboard"
  "POST:/api/enroll/apply:{\"firstName\":\"Test\",\"lastName\":\"User\",\"email\":\"test@test.com\",\"preferredProgramId\":\"hvac-tech\"}"
  "GET:/api/messages"
  "POST:/api/messages:{\"recipientId\":\"test\",\"subject\":\"test\",\"body\":\"test\"}"
)

for endpoint in "${endpoints[@]}"; do
  IFS=':' read -r method path data <<< "$endpoint"
  
  if [ "$method" = "GET" ]; then
    status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$path")
  else
    status=$(curl -s -o /dev/null -w "%{http_code}" -X POST "http://localhost:3000$path" -H "Content-Type: application/json" -d "$data")
  fi
  
  if [ "$status" = "500" ] || [ "$status" = "404" ]; then
    echo "❌ $method $path - $status"
  elif [ "$status" = "200" ] || [ "$status" = "307" ] || [ "$status" = "401" ]; then
    echo "✅ $method $path - $status"
  else
    echo "⚠️  $method $path - $status"
  fi
done
