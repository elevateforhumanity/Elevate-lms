#!/bin/bash
# scripts/pull-vercel-env.sh
# Automatically pull Vercel environment variables and create .env.local

set -e

echo "🔧 Pulling Vercel Environment Variables..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Pull environment variables
echo "⬇️  Pulling environment variables from Vercel..."
vercel env pull .env.local

if [ -f .env.local ]; then
    echo "✅ Environment variables saved to .env.local"
    echo ""
    echo "📋 Variables found:"
    grep -E "^(NEXT_PUBLIC_SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY|NEXT_PUBLIC_SUPABASE_ANON_KEY)" .env.local | sed 's/=.*/=***/' || echo "⚠️  No Supabase variables found"
    echo ""
    echo "🎉 Done! You can now run: node check-database.mjs"
else
    echo "❌ Failed to create .env.local"
    exit 1
fi
