#!/bin/bash

# Setup Local Environment Variables
# This script helps set up .env.local for local development

echo "🔧 Setting up local environment variables..."
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists"
    read -p "Do you want to backup and recreate it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        mv .env.local .env.local.backup.$(date +%Y%m%d-%H%M%S)
        echo "✅ Backed up existing .env.local"
    else
        echo "❌ Cancelled"
        exit 0
    fi
fi

echo ""
echo "📋 You need the following from Supabase Dashboard:"
echo "   1. Go to https://supabase.com/dashboard"
echo "   2. Select your project"
echo "   3. Go to Settings → API"
echo ""

# Get Supabase URL
read -p "Enter NEXT_PUBLIC_SUPABASE_URL: " SUPABASE_URL
if [ -z "$SUPABASE_URL" ]; then
    echo "❌ Supabase URL is required"
    exit 1
fi

# Get Supabase Anon Key
read -p "Enter NEXT_PUBLIC_SUPABASE_ANON_KEY: " SUPABASE_ANON_KEY
if [ -z "$SUPABASE_ANON_KEY" ]; then
    echo "❌ Supabase Anon Key is required"
    exit 1
fi

# Get Supabase Service Role Key (optional for local dev)
read -p "Enter SUPABASE_SERVICE_ROLE_KEY (optional, press Enter to skip): " SUPABASE_SERVICE_KEY

# Create .env.local
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
EOF

if [ ! -z "$SUPABASE_SERVICE_KEY" ]; then
    echo "SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_KEY" >> .env.local
fi

# Add other common variables
cat >> .env.local << EOF

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
EOF

echo ""
echo "✅ Created .env.local successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Run: npm run dev"
echo "   2. Visit: http://localhost:3000"
echo "   3. Test portal pages work locally"
echo ""
echo "⚠️  Note: .env.local is in .gitignore and won't be committed"
