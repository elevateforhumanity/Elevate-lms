#!/usr/bin/env bash
# Worker Task: Check for Duplicate Vercel Deployments
# This script helps identify if you have multiple Vercel projects for the same repository

set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 WORKER TASK: Check for Duplicate Vercel Deployments"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we have Vercel config
if [ -f .vercel-autopilot-config.json ]; then
  echo "📄 Found Vercel configuration:"
  cat .vercel-autopilot-config.json | grep -E "project_name|project_id|org_id"
  echo ""
fi

echo "📋 STEP-BY-STEP INSTRUCTIONS:"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 1: Check Your Vercel Dashboard"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Go to: https://vercel.com/dashboard"
echo ""
echo "2️⃣  Look for projects related to 'fix2' or 'elevate':"
echo "    Common duplicate names:"
echo "    • fix2"
echo "    • fix2-one"
echo "    • fix2-i3z8"
echo "    • fix2-1c7w"
echo "    • fix2-tlr1"
echo "    • elevate-lms"
echo "    • elevateconnectsdirectory"
echo ""
echo "3️⃣  Count how many projects you see"
echo ""

read -p "How many Vercel projects do you see? (enter number): " PROJECT_COUNT

if [ -z "$PROJECT_COUNT" ]; then
  echo "❌ Error: Please enter a number"
  exit 1
fi

echo ""
if [ "$PROJECT_COUNT" -eq 1 ]; then
  echo "✅ GOOD: You have only 1 project (no duplicates)"
  echo ""
  read -p "What is the project name? " PROJECT_NAME
  echo ""
  echo "✅ Your single project: $PROJECT_NAME"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "NEXT: Verify Environment Variables"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "1. Click on your project: $PROJECT_NAME"
  echo "2. Go to Settings → Environment Variables"
  echo "3. Check if these variables exist:"
  echo "   • NEXT_PUBLIC_SUPABASE_URL"
  echo "   • NEXT_PUBLIC_SUPABASE_ANON_KEY"
  echo "   • SUPABASE_SERVICE_ROLE_KEY"
  echo "   • NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  echo "   • STRIPE_SECRET_KEY"
  echo "   • NEXT_PUBLIC_SITE_URL"
  echo ""
  read -p "Are all 6 variables present? (y/N): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "✅ Perfect! Your Vercel setup is correct."
    echo ""
    echo "📝 Summary:"
    echo "  • Single Vercel project: $PROJECT_NAME"
    echo "  • All environment variables present"
    echo "  • No duplicates found"
    echo ""
    echo "🎉 TASK COMPLETE: No cleanup needed"
  else
    echo ""
    echo "⚠️  Some variables are missing."
    echo ""
    echo "Run this script to add them:"
    echo "  ./scripts/workers/get-vercel-credentials.sh"
  fi
  
elif [ "$PROJECT_COUNT" -gt 1 ]; then
  echo "⚠️  WARNING: You have $PROJECT_COUNT projects (possible duplicates)"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "STEP 2: Identify Which Project to Keep"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "For each project, check:"
  echo "  1. Which GitHub repository it's connected to"
  echo "  2. When it was last deployed"
  echo "  3. If it has environment variables configured"
  echo "  4. If it has a custom domain"
  echo ""
  echo "📝 List your projects:"
  echo ""
  
  for i in $(seq 1 $PROJECT_COUNT); do
    read -p "Project $i name: " PROJECT_NAME
    echo "  • $PROJECT_NAME"
  done
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "STEP 3: Determine Which to Keep"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "Keep the project that:"
  echo "  ✅ Has the most recent deployment"
  echo "  ✅ Has environment variables configured"
  echo "  ✅ Has custom domain (www.elevateconnectsdirectory.org)"
  echo "  ✅ Is connected to: elevateforhumanity/fix2"
  echo ""
  echo "Delete projects that:"
  echo "  ❌ Haven't been deployed recently"
  echo "  ❌ Have no environment variables"
  echo "  ❌ Are test/duplicate projects"
  echo "  ❌ Are connected to wrong repository"
  echo ""
  
  read -p "Which project do you want to KEEP? (enter name): " KEEP_PROJECT
  
  echo ""
  echo "✅ You chose to keep: $KEEP_PROJECT"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "STEP 4: Delete Duplicate Projects"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "For each project you want to DELETE:"
  echo ""
  echo "1. Go to the project in Vercel dashboard"
  echo "2. Click Settings (left sidebar)"
  echo "3. Scroll to bottom → 'Delete Project'"
  echo "4. Type the project name to confirm"
  echo "5. Click 'Delete'"
  echo ""
  echo "⚠️  WARNING: This is permanent! Make sure you're deleting the right one."
  echo ""
  echo "Projects to DELETE (all except $KEEP_PROJECT):"
  echo ""
  
  for i in $(seq 1 $PROJECT_COUNT); do
    read -p "Delete project $i? (enter name or 'skip'): " DELETE_PROJECT
    if [ "$DELETE_PROJECT" != "skip" ] && [ "$DELETE_PROJECT" != "$KEEP_PROJECT" ]; then
      echo "  ❌ Mark for deletion: $DELETE_PROJECT"
      echo "     URL: https://vercel.com/dashboard → $DELETE_PROJECT → Settings → Delete"
    fi
  done
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "STEP 5: Verify Environment Variables in Kept Project"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "After deleting duplicates:"
  echo ""
  echo "1. Go to your kept project: $KEEP_PROJECT"
  echo "2. Click Settings → Environment Variables"
  echo "3. Verify these 6 variables exist:"
  echo "   • NEXT_PUBLIC_SUPABASE_URL"
  echo "   • NEXT_PUBLIC_SUPABASE_ANON_KEY"
  echo "   • SUPABASE_SERVICE_ROLE_KEY"
  echo "   • NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  echo "   • STRIPE_SECRET_KEY"
  echo "   • NEXT_PUBLIC_SITE_URL"
  echo ""
  echo "4. Each variable should be set for ALL 3 environments:"
  echo "   • Production"
  echo "   • Preview"
  echo "   • Development"
  echo ""
  
  read -p "Have you deleted the duplicate projects? (y/N): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "✅ Great! Duplicates removed."
    echo ""
    read -p "Are all environment variables present in $KEEP_PROJECT? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      echo ""
      echo "🎉 TASK COMPLETE: Vercel cleanup successful"
      echo ""
      echo "📝 Summary:"
      echo "  • Kept project: $KEEP_PROJECT"
      echo "  • Deleted: $(($PROJECT_COUNT - 1)) duplicate project(s)"
      echo "  • Environment variables: ✅ Configured"
      echo ""
    else
      echo ""
      echo "⚠️  Environment variables need to be added."
      echo ""
      echo "Run this script:"
      echo "  ./scripts/workers/get-vercel-credentials.sh"
    fi
  else
    echo ""
    echo "⏸️  Task paused. Delete duplicates and run this script again."
  fi
  
else
  echo "❌ Error: Invalid number. Please run the script again."
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 HELPFUL RESOURCES:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "• Vercel Dashboard: https://vercel.com/dashboard"
echo "• Delete Project: Settings → Advanced → Delete Project"
echo "• Environment Variables: Settings → Environment Variables"
echo "• Deployment History: Deployments tab"
echo ""
echo "📖 Documentation:"
echo "• See: VERCEL_CLEANUP_GUIDE.md"
echo "• See: VERCEL_ENV_AUDIT_CHECKLIST.md"
echo ""
