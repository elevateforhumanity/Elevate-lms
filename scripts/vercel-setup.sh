#!/bin/bash

# Vercel Project Setup Script
# This script helps automate parts of the Vercel deployment setup

set -e

echo "=========================================="
echo "Vercel Project Setup Helper"
echo "=========================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "Current repository status:"
git log --oneline -1
echo ""

echo "Latest commit should be: 7d710cc4 or newer"
echo ""

# Check if .vercel directory exists
if [ -d ".vercel" ]; then
    echo "⚠️  Found existing .vercel configuration"
    echo "Removing old configuration..."
    rm -rf .vercel
fi

echo ""
echo "=========================================="
echo "MANUAL STEPS REQUIRED"
echo "=========================================="
echo ""
echo "I cannot access the Vercel dashboard directly."
echo "Please complete these steps manually:"
echo ""
echo "1. Go to: https://vercel.com/gitpod/fix2-1c7w"
echo ""
echo "2. Settings → Git → Connect Git Repository"
echo "   - Repository: elevateforhumanity/fix2"
echo "   - Branch: main"
echo ""
echo "3. Settings → Environment Variables → Add these 6 variables:"
echo ""
echo "   SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co"
echo "   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ"
echo "   SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard]"
echo "   NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ"
echo "   NEXT_PUBLIC_SITE_URL=https://www.elevateconnectsdirectory.org"
echo ""
echo "4. Get SUPABASE_SERVICE_ROLE_KEY:"
echo "   - Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api"
echo "   - Find 'service_role' key (marked as secret)"
echo "   - Click 'Reveal' and copy the value"
echo ""
echo "5. Deploy:"
echo "   - Go to Deployments tab"
echo "   - Click 'Deploy' or 'Redeploy'"
echo "   - Uncheck 'Use existing build cache'"
echo "   - Click 'Deploy'"
echo ""
echo "=========================================="
echo "VERIFICATION"
echo "=========================================="
echo ""
echo "After deployment, verify:"
echo "✓ Build logs show NO deprecation warnings"
echo "✓ Build completes successfully"
echo "✓ Site loads without 500 errors"
echo "✓ Test pages: /, /lms/dashboard, /programs, /login"
echo ""
echo "=========================================="
echo ""
echo "For detailed instructions, see:"
echo "  - WORKER_TASK_VERCEL_CONNECT.md"
echo "  - AUTOPILOT_VERCEL_LINK.md"
echo ""
