#!/usr/bin/env bash
# Worker Task: Clean Up Duplicate Vercel Projects
# This script guides workers through identifying and deleting unused Vercel projects

set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧹 WORKER TASK: Clean Up Duplicate Vercel Projects"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This task will help you DELETE unused Vercel projects."
echo "⚠️  WARNING: This is PERMANENT. Make sure you know which to keep!"
echo ""

# Check current config
if [ -f .vercel-autopilot-config.json ]; then
  echo "📄 Current Vercel configuration:"
  cat .vercel-autopilot-config.json
  echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 1: Identify ALL Your Vercel Projects"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Go to: https://vercel.com/dashboard"
echo ""
echo "2️⃣  Look for ALL projects related to this repository:"
echo "    Common names to look for:"
echo "    • fix2"
echo "    • fix2-one"
echo "    • fix2-i3z8"
echo "    • fix2-1c7w"
echo "    • fix2-tlr1"
echo "    • elevate-lms"
echo "    • elevateconnectsdirectory"
echo ""
echo "3️⃣  For EACH project, write down:"
echo "    • Project name"
echo "    • Last deployment date"
echo "    • Has custom domain? (yes/no)"
echo "    • Has environment variables? (yes/no)"
echo ""

read -p "Press ENTER when you've reviewed all projects..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 2: Determine Which Project to KEEP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "You should KEEP the project that has:"
echo "  ✅ Custom domain: www.elevateconnectsdirectory.org"
echo "  ✅ Most recent deployment (within last 7 days)"
echo "  ✅ All environment variables configured"
echo "  ✅ Connected to: elevateforhumanity/fix2"
echo "  ✅ Latest build was successful"
echo ""
echo "You should DELETE projects that:"
echo "  ❌ No custom domain"
echo "  ❌ Old deployments (>30 days)"
echo "  ❌ Missing environment variables"
echo "  ❌ Failed builds"
echo "  ❌ Test/duplicate projects"
echo ""

read -p "Which project do you want to KEEP? (enter exact name): " KEEP_PROJECT

if [ -z "$KEEP_PROJECT" ]; then
  echo "❌ Error: Project name cannot be empty"
  exit 1
fi

echo ""
echo "✅ You chose to KEEP: $KEEP_PROJECT"
echo ""
echo "⚠️  ALL OTHER PROJECTS WILL BE DELETED"
echo ""

read -p "Are you ABSOLUTELY SURE? Type 'DELETE' to continue: " CONFIRM

if [ "$CONFIRM" != "DELETE" ]; then
  echo ""
  echo "❌ Cancelled. No projects were deleted."
  exit 0
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 3: Delete Duplicate Projects ONE BY ONE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For EACH project you want to delete (except $KEEP_PROJECT):"
echo ""

DELETED_COUNT=0

while true; do
  echo ""
  read -p "Enter project name to DELETE (or 'done' to finish): " DELETE_PROJECT
  
  if [ "$DELETE_PROJECT" = "done" ]; then
    break
  fi
  
  if [ -z "$DELETE_PROJECT" ]; then
    echo "⚠️  Empty name, skipping..."
    continue
  fi
  
  if [ "$DELETE_PROJECT" = "$KEEP_PROJECT" ]; then
    echo "❌ ERROR: You cannot delete the project you chose to keep!"
    echo "   Kept project: $KEEP_PROJECT"
    continue
  fi
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🗑️  DELETING: $DELETE_PROJECT"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "Follow these steps in Vercel dashboard:"
  echo ""
  echo "1. Go to: https://vercel.com/dashboard"
  echo "2. Click on project: $DELETE_PROJECT"
  echo "3. Click 'Settings' (left sidebar)"
  echo "4. Scroll to bottom → 'Advanced' section"
  echo "5. Click 'Delete Project'"
  echo "6. Type the project name: $DELETE_PROJECT"
  echo "7. Click 'Delete'"
  echo ""
  
  read -p "Have you deleted '$DELETE_PROJECT'? (y/N): " -n 1 -r
  echo
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "✅ Marked as deleted: $DELETE_PROJECT"
    DELETED_COUNT=$((DELETED_COUNT + 1))
    
    # Log deletion
    echo "$(date): Deleted project: $DELETE_PROJECT" >> .vercel-cleanup.log
  else
    echo "⏭️  Skipped: $DELETE_PROJECT"
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 4: Verify Environment Variables in Kept Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Now verify your kept project has all required variables:"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Click on: $KEEP_PROJECT"
echo "3. Go to: Settings → Environment Variables"
echo "4. Verify these 6 variables exist in ALL 3 environments:"
echo ""
echo "   Required Variables:"
echo "   • NEXT_PUBLIC_SUPABASE_URL"
echo "   • NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   • SUPABASE_SERVICE_ROLE_KEY"
echo "   • NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   • STRIPE_SECRET_KEY"
echo "   • NEXT_PUBLIC_SITE_URL"
echo ""
echo "   Each must be set for:"
echo "   • Production"
echo "   • Preview"
echo "   • Development"
echo ""

read -p "Are all 6 variables present in all 3 environments? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  echo "✅ Environment variables verified"
  ENV_STATUS="complete"
else
  echo ""
  echo "⚠️  Environment variables incomplete"
  echo ""
  echo "Run this script to add missing variables:"
  echo "  ./scripts/workers/get-vercel-credentials.sh"
  ENV_STATUS="incomplete"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 5: Test Production Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Test your production site:"
echo ""
echo "1. Visit: https://www.elevateconnectsdirectory.org"
echo "2. Check homepage loads"
echo "3. Try logging in"
echo "4. Check programs page"
echo "5. Verify images load"
echo "6. Check browser console for errors"
echo ""

read -p "Does the production site work correctly? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  echo "✅ Production site verified"
  SITE_STATUS="working"
else
  echo ""
  echo "❌ Production site has issues"
  echo ""
  echo "Check:"
  echo "  • Vercel deployment logs"
  echo "  • Browser console errors"
  echo "  • Environment variables"
  SITE_STATUS="issues"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 6: Update Configuration Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Update .vercel-autopilot-config.json
if [ -f .vercel-autopilot-config.json ]; then
  echo "Updating .vercel-autopilot-config.json..."
  
  # Backup
  cp .vercel-autopilot-config.json .vercel-autopilot-config.json.backup
  
  # Update project name
  cat > .vercel-autopilot-config.json << EOF
{
  "vercel_project_name": "$KEEP_PROJECT",
  "cleaned_up_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "deleted_projects": $DELETED_COUNT,
  "environment_variables": "$ENV_STATUS",
  "production_status": "$SITE_STATUS"
}
EOF
  
  echo "✅ Configuration updated"
else
  echo "⚠️  No config file found, creating new one..."
  
  cat > .vercel-autopilot-config.json << EOF
{
  "vercel_project_name": "$KEEP_PROJECT",
  "cleaned_up_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "deleted_projects": $DELETED_COUNT,
  "environment_variables": "$ENV_STATUS",
  "production_status": "$SITE_STATUS"
}
EOF
  
  echo "✅ Configuration created"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 CLEANUP COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "  • Kept project: $KEEP_PROJECT"
echo "  • Deleted projects: $DELETED_COUNT"
echo "  • Environment variables: $ENV_STATUS"
echo "  • Production status: $SITE_STATUS"
echo ""

if [ "$ENV_STATUS" = "incomplete" ]; then
  echo "⚠️  NEXT STEP: Add missing environment variables"
  echo "   Run: ./scripts/workers/get-vercel-credentials.sh"
  echo ""
fi

if [ "$SITE_STATUS" = "issues" ]; then
  echo "⚠️  NEXT STEP: Fix production site issues"
  echo "   Check Vercel deployment logs"
  echo "   Verify environment variables"
  echo ""
fi

if [ "$ENV_STATUS" = "complete" ] && [ "$SITE_STATUS" = "working" ]; then
  echo "✅ ALL DONE! Your Vercel setup is clean and working."
  echo ""
  echo "📝 What was accomplished:"
  echo "  1. Identified duplicate projects"
  echo "  2. Kept the correct production project"
  echo "  3. Deleted $DELETED_COUNT unused project(s)"
  echo "  4. Verified environment variables"
  echo "  5. Tested production deployment"
  echo "  6. Updated configuration files"
  echo ""
  echo "🎯 Result: Single source of truth established"
  echo ""
fi

echo "📚 Documentation:"
echo "  • Cleanup log: .vercel-cleanup.log"
echo "  • Config: .vercel-autopilot-config.json"
echo "  • See: VERCEL_SINGLE_SOURCE_OF_TRUTH.md"
echo ""
echo "🔗 Vercel Dashboard: https://vercel.com/dashboard"
echo ""
