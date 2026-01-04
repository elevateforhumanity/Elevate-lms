#!/usr/bin/env bash
set -euo pipefail

SITE_URL="${1:-https://elevateforhumanityfix.netlify.app}"

echo "🔍 Verifying deployment at: $SITE_URL"
echo ""

# Test routes
routes=(
  "/"
  "/programs"
  "/about"
  "/support"
  "/community"
  "/connect"
  "/lms"
  "/certificates"
)

echo "→ Testing routes..."
failed=0
for route in "${routes[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL$route" || echo "000")
  if [ "$status" = "200" ]; then
    echo "  ✓ $route (200 OK)"
  else
    echo "  ✗ $route ($status)"
    ((failed++))
  fi
done

echo ""
echo "→ Testing SPA routing (deep link)..."
status=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/programs/barber" || echo "000")
if [ "$status" = "200" ]; then
  echo "  ✓ Deep link works (200 OK)"
else
  echo "  ✗ Deep link failed ($status)"
  ((failed++))
fi

echo ""
echo "→ Testing 404 page..."
status=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/nonexistent-page-test" || echo "000")
if [ "$status" = "200" ] || [ "$status" = "404" ]; then
  echo "  ✓ 404 handling works ($status)"
else
  echo "  ✗ 404 handling issue ($status)"
fi

echo ""
echo "→ Testing security headers..."
headers=$(curl -sI "$SITE_URL" | grep -i "content-security-policy\|strict-transport\|x-content-type" || echo "")
if [ -n "$headers" ]; then
  echo "  ✓ Security headers present"
else
  echo "  ⚠ Security headers missing"
fi

echo ""
echo "→ Testing static assets..."
status=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/favicon.svg" || echo "000")
if [ "$status" = "200" ]; then
  echo "  ✓ Static assets accessible"
else
  echo "  ⚠ Favicon not found ($status)"
fi

echo ""
if [ $failed -eq 0 ]; then
  echo "✅ All tests passed!"
  exit 0
else
  echo "❌ $failed test(s) failed"
  exit 1
fi
