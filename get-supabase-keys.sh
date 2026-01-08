#!/bin/bash
# Extract Supabase keys from production and add to .env.local
# This script fetches keys without exposing them in chat

set -e

echo "🔐 Fetching Supabase credentials from production..."

# Check if we have Vercel access
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Try to get environment variables
echo "📥 Pulling environment variables from Vercel..."
if vercel env pull .env.local.temp 2>&1 | grep -q "No existing credentials"; then
    echo ""
    echo "⚠️  Need to authenticate with Vercel first"
    echo ""
    echo "Run these commands:"
    echo "  1. vercel login"
    echo "  2. vercel link"
    echo "  3. ./get-supabase-keys.sh"
    echo ""
    exit 1
fi

# Extract only Supabase keys
if [ -f .env.local.temp ]; then
    echo "✅ Got environment variables"
    
    # Extract Supabase keys
    SUPABASE_URL=$(grep "NEXT_PUBLIC_SUPABASE_URL=" .env.local.temp | cut -d'=' -f2-)
    SUPABASE_ANON=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local.temp | cut -d'=' -f2-)
    SUPABASE_SERVICE=$(grep "SUPABASE_SERVICE_ROLE_KEY=" .env.local.temp | cut -d'=' -f2-)
    
    if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON" ]; then
        echo "❌ Could not find Supabase keys in environment variables"
        rm .env.local.temp
        exit 1
    fi
    
    # Update .env.local with real keys
    if [ -f .env.local ]; then
        echo "📝 Updating .env.local with Supabase credentials..."
        
        # Backup current .env.local
        cp .env.local .env.local.backup.$(date +%s)
        
        # Replace placeholder keys with real ones
        sed -i "s|NEXT_PUBLIC_SUPABASE_URL=.*|NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL|" .env.local
        sed -i "s|NEXT_PUBLIC_SUPABASE_ANON_KEY=.*|NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON|" .env.local
        sed -i "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE|" .env.local
        
        echo "✅ Supabase credentials added to .env.local"
    else
        echo "❌ .env.local not found"
        exit 1
    fi
    
    # Clean up temp file
    rm .env.local.temp
    
    echo ""
    echo "✅ Done! Supabase auth is now enabled."
    echo ""
    echo "Next steps:"
    echo "  1. Restart dev server: npm run dev"
    echo "  2. Check console - should see no Supabase warnings"
    echo "  3. Test login at /login"
    echo ""
else
    echo "❌ Failed to pull environment variables"
    exit 1
fi
