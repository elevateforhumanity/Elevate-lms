#!/bin/bash
echo "=== CHECKING ALL PRIMARY FEATURES ==="
echo ""

# 1. Portals
echo "1. PORTALS:"
for portal in admin staff-portal employer partner program-holder lms parent-portal; do
  if [ -f "app/$portal/page.tsx" ]; then
    echo "  ✅ $portal"
  else
    echo "  ❌ $portal MISSING"
  fi
done
echo ""

# 2. Onboarding
echo "2. ONBOARDING:"
for page in start staff employer partner; do
  if [ -f "app/onboarding/$page/page.tsx" ]; then
    echo "  ✅ onboarding/$page"
  else
    echo "  ❌ onboarding/$page MISSING"
  fi
done
echo ""

# 3. Shop/Store
echo "3. SHOP/STORE:"
for page in "" cart licenses subscriptions; do
  if [ -f "app/store/$page/page.tsx" ] || [ -f "app/store/page.tsx" ]; then
    echo "  ✅ store/$page"
  else
    echo "  ❌ store/$page MISSING"
  fi
done
echo ""

# 4. AI Features
echo "4. AI FEATURES:"
for page in ai-tutor ai-chat ai-studio ai; do
  if [ -f "app/$page/page.tsx" ]; then
    echo "  ✅ $page"
  else
    echo "  ❌ $page MISSING"
  fi
done
echo ""

# 5. Partner Integrations
echo "5. PARTNER INTEGRATIONS:"
for partner in careersafe hsi nrf; do
  if [ -f "app/courses/$partner/page.tsx" ]; then
    echo "  ✅ courses/$partner"
  else
    echo "  ❌ courses/$partner MISSING"
  fi
done
if [ -f "app/jri/page.tsx" ]; then
  echo "  ✅ jri"
else
  echo "  ❌ jri MISSING"
fi
echo ""

# 6. Core Features
echo "6. CORE FEATURES:"
for feature in messages reports courses hub; do
  if [ -f "app/$feature/page.tsx" ]; then
    echo "  ✅ $feature"
  else
    echo "  ❌ $feature MISSING"
  fi
done
echo ""

# 7. API Routes
echo "7. KEY API ROUTES:"
api_count=$(find app/api -name "route.ts" | wc -l)
echo "  ✅ $api_count API routes found"
echo ""

# 8. Environment Variables
echo "8. ENVIRONMENT VARIABLES:"
if [ -f ".env.local" ]; then
  env_count=$(grep -c "=" .env.local)
  echo "  ✅ $env_count environment variables configured"
else
  echo "  ❌ .env.local MISSING"
fi
echo ""

echo "=== CHECK COMPLETE ==="
