#!/bin/bash

echo "=== COMPLETE SITE AUDIT ==="
echo ""

# Test critical pages
pages=(
  "/"
  "/login"
  "/apply"
  "/courses"
  "/hub"
  "/admin"
  "/staff-portal"
  "/employer"
  "/partner"
  "/program-holder"
  "/lms"
  "/parent-portal"
  "/store"
  "/messages"
  "/reports"
  "/onboarding/start"
  "/courses/careersafe"
  "/courses/hsi"
  "/courses/nrf"
  "/ai-tutor"
)

broken=0
working=0

for page in "${pages[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$page")
  if [ "$status" = "200" ] || [ "$status" = "307" ]; then
    echo "✅ $page ($status)"
    ((working++))
  else
    echo "❌ $page ($status)"
    ((broken++))
  fi
done

echo ""
echo "Working: $working"
echo "Broken: $broken"
