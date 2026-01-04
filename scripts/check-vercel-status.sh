#!/usr/bin/env bash
# Quick Vercel Status Check
# Shows current Vercel configuration and provides cleanup instructions

set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Vercel Deployment Status Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check config file
if [ -f .vercel-autopilot-config.json ]; then
  echo "📄 Current Configuration:"
  cat .vercel-autopilot-config.json | jq '.' 2>/dev/null || cat .vercel-autopilot-config.json
  echo ""
  
  PROJECT_NAME=$(cat .vercel-autopilot-config.json | grep -o '"vercel_project_name": "[^"]*"' | cut -d'"' -f4)
  echo "Current Project: $PROJECT_NAME"
else
  echo "⚠️  No Vercel configuration found"
  PROJECT_NAME="unknown"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Expected Setup:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ ONE Vercel project:"
echo "   • Name: fix2-one (or similar)"
echo "   • Connected to: elevateforhumanity/fix2"
echo "   • Domain: www.elevateconnectsdirectory.org"
echo "   • Environment variables: 6+ configured"
echo ""
echo "❌ NO duplicate projects:"
echo "   • fix2-i3z8"
echo "   • fix2-1c7w"
echo "   • fix2-tlr1"
echo "   • Any other fix2-* projects"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 Action Required:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Check your Vercel dashboard:"
echo "    https://vercel.com/dashboard"
echo ""
echo "2️⃣  Count how many 'fix2' or 'elevate' projects you see"
echo ""
echo "3️⃣  If you see MORE THAN ONE project:"
echo ""
echo "    Option A - Automated (Recommended):"
echo "    ────────────────────────────────────"
echo "    export VERCEL_TOKEN=\"your_token\""
echo "    node scripts/workers/auto-cleanup-vercel.mjs"
echo ""
echo "    Option B - Manual:"
echo "    ──────────────────"
echo "    ./scripts/workers/cleanup-vercel-duplicates.sh"
echo ""
echo "4️⃣  If you see ONLY ONE project:"
echo "    ✅ You're good! No cleanup needed."
echo "    Just verify it has:"
echo "    • Custom domain configured"
echo "    • Environment variables set"
echo "    • Recent successful deployment"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 Documentation:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "• VERCEL_DUPLICATE_CHECK_REPORT.md"
echo "• VERCEL_SINGLE_SOURCE_OF_TRUTH.md"
echo "• scripts/workers/README.md"
echo ""
