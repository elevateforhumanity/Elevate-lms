#!/usr/bin/env bash
# Worker Task: Configure Vercel Deployment
# This script guides a human worker through setting up Vercel

set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 WORKER TASK: Configure Vercel Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This task will guide you through deploying to Vercel."
echo ""

echo "📋 STEP-BY-STEP INSTRUCTIONS:"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PART 1: Create Vercel Account & Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Go to: https://vercel.com"
echo ""
echo "2️⃣  Sign up or log in:"
echo "    • Click 'Sign Up' or 'Log In'"
echo "    • Use GitHub (recommended) or email"
echo "    • Authorize Vercel to access your GitHub"
echo ""
echo "3️⃣  Import your repository:"
echo "    • Click 'Add New...' → 'Project'"
echo "    • Select your GitHub repository: elevateforhumanity/fix2"
echo "    • Click 'Import'"
echo ""
echo "4️⃣  Configure project:"
echo "    • Framework Preset: Next.js (auto-detected)"
echo "    • Root Directory: ./ (leave as default)"
echo "    • Build Command: npm run build (auto-detected)"
echo "    • Output Directory: .next (auto-detected)"
echo "    • Install Command: npm install (auto-detected)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PART 2: Add Environment Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "5️⃣  Before clicking 'Deploy', add environment variables:"
echo "    • Scroll down to 'Environment Variables'"
echo "    • Add each variable below (copy from your .env.local)"
echo ""

# Check if .env.local exists and read values
if [ -f .env.local ]; then
  echo "📄 Reading from your .env.local file..."
  echo ""
  source .env.local 2>/dev/null || true
  
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "COPY THESE VALUES TO VERCEL:"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  
  echo "🔹 NEXT_PUBLIC_SUPABASE_URL"
  echo "   Value: $NEXT_PUBLIC_SUPABASE_URL"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  echo "🔹 NEXT_PUBLIC_SUPABASE_ANON_KEY"
  echo "   Value: $NEXT_PUBLIC_SUPABASE_ANON_KEY"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  echo "🔹 SUPABASE_SERVICE_ROLE_KEY"
  echo "   Value: $SUPABASE_SERVICE_ROLE_KEY"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  echo "🔹 NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  echo "   Value: $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  echo "🔹 STRIPE_SECRET_KEY"
  echo "   Value: $STRIPE_SECRET_KEY"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  echo "🔹 NEXT_PUBLIC_SITE_URL"
  echo "   Value: $NEXT_PUBLIC_SITE_URL"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  echo "🔹 RESEND_API_KEY"
  echo "   Value: $RESEND_API_KEY"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  echo "🔹 EMAIL_FROM"
  echo "   Value: $EMAIL_FROM"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  echo "🔹 NEXT_PUBLIC_GA_MEASUREMENT_ID"
  echo "   Value: ${NEXT_PUBLIC_GA_MEASUREMENT_ID:-G-EFHWORKFORCE01}"
  echo "   Environment: Production, Preview, Development (check all)"
  echo ""
  
  # Save to a file for easy copy-paste
  cat > .vercel-env-vars.txt << EOF
NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RESEND_API_KEY=$RESEND_API_KEY
EMAIL_FROM=$EMAIL_FROM
NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID:-G-EFHWORKFORCE01}
MOU_ARCHIVE_EMAIL=${MOU_ARCHIVE_EMAIL:-agreements@elevateforhumanity.org}
EOF
  
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ Environment variables saved to: .vercel-env-vars.txt"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
else
  echo "⚠️  Warning: .env.local not found!"
  echo "   Run scripts/workers/get-supabase-credentials.sh first"
  echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PART 3: Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "6️⃣  After adding all environment variables:"
echo "    • Click 'Deploy'"
echo "    • Wait 2-5 minutes for build"
echo "    • You'll get a URL like: https://fix2-xxx.vercel.app"
echo ""
echo "7️⃣  Configure custom domain (optional):"
echo "    • Go to Project Settings → Domains"
echo "    • Add: www.elevateconnectsdirectory.org"
echo "    • Follow DNS instructions"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PART 4: Verify Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "8️⃣  Test your deployment:"
echo "    • Visit your Vercel URL"
echo "    • Check homepage loads"
echo "    • Try signing up for an account"
echo "    • Check database connection works"
echo ""
echo "9️⃣  Monitor deployment:"
echo "    • Go to Vercel Dashboard → Your Project"
echo "    • Check 'Deployments' tab for status"
echo "    • Check 'Logs' tab for any errors"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Have you completed the Vercel setup? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  read -p "Enter your Vercel deployment URL: " VERCEL_URL
  
  if [ -n "$VERCEL_URL" ]; then
    echo ""
    echo "✅ Vercel URL recorded: $VERCEL_URL"
    echo "$VERCEL_URL" > .vercel-url.txt
    echo ""
    echo "🎉 TASK COMPLETE: Vercel deployment configured"
    echo ""
    echo "Your app is now live at: $VERCEL_URL"
    echo ""
  fi
else
  echo ""
  echo "⏸️  Task paused. Run this script again when ready."
  echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 HELPFUL RESOURCES:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "• Vercel Dashboard: https://vercel.com/dashboard"
echo "• Vercel Docs: https://vercel.com/docs"
echo "• Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs"
echo "• Environment Variables: https://vercel.com/docs/environment-variables"
echo ""
