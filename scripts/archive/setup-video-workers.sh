#!/bin/bash

echo "🎬 AI Video Builder - Cloudflare Workers Setup"
echo "=============================================="
echo ""
echo "This script will help you set up Cloudflare Workers for the AI Video Builder."
echo ""
echo "📋 What you need:"
echo "  1. Cloudflare account (free)"
echo "  2. API Token with Workers permissions"
echo "  3. Your Account ID"
echo ""
echo "⏱️  Estimated time: 15-20 minutes"
echo ""
read -p "Ready to start? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup cancelled."
    exit 0
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Get Cloudflare API Token"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open: https://dash.cloudflare.com/profile/api-tokens"
echo "2. Click 'Create Token'"
echo "3. Use 'Edit Cloudflare Workers' template"
echo "4. Add permissions:"
echo "   - Workers R2 Storage (Edit)"
echo "   - Workers Scripts (Edit)"
echo "5. Click 'Continue to summary' then 'Create Token'"
echo "6. Copy the token"
echo ""
read -p "Press Enter when you have your API token..."
echo ""
read -p "Paste your API token: " CLOUDFLARE_API_TOKEN
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Get Account ID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open: https://dash.cloudflare.com"
echo "2. Click 'Workers & Pages' in left sidebar"
echo "3. Look for 'Account ID' on the right side"
echo "4. Copy the Account ID (32-character hex string)"
echo ""
read -p "Press Enter when you have your Account ID..."
echo ""
read -p "Paste your Account ID: " CLOUDFLARE_ACCOUNT_ID
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Save Credentials"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Save to .env file
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Update or add Cloudflare credentials
if grep -q "CLOUDFLARE_API_TOKEN" .env; then
    sed -i "s|CLOUDFLARE_API_TOKEN=.*|CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN|" .env
else
    echo "CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN" >> .env
fi

if grep -q "CLOUDFLARE_ACCOUNT_ID" .env; then
    sed -i "s|CLOUDFLARE_ACCOUNT_ID=.*|CLOUDFLARE_ACCOUNT_ID=$CLOUDFLARE_ACCOUNT_ID|" .env
else
    echo "CLOUDFLARE_ACCOUNT_ID=$CLOUDFLARE_ACCOUNT_ID" >> .env
fi

echo "✅ Credentials saved to .env file"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Install Wrangler CLI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if command -v wrangler &> /dev/null; then
    echo "✅ Wrangler already installed: $(wrangler --version)"
else
    echo "Installing wrangler..."
    npm install -g wrangler
    echo "✅ Wrangler installed"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 5: Authenticate Wrangler"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Opening browser for Cloudflare authentication..."
echo ""
wrangler login
echo ""
echo "✅ Wrangler authenticated"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 6: Deploy Workers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Deploying 3 workers..."
echo ""

cd workers

echo "1/3 Deploying Video Worker..."
wrangler deploy --config wrangler-video.toml
echo ""

echo "2/3 Deploying Template Sync Worker..."
wrangler deploy --config wrangler-template-sync.toml
echo ""

echo "3/3 Deploying Media Download Worker..."
wrangler deploy --config wrangler-media-download.toml
echo ""

cd ..

echo "✅ All workers deployed!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 7: Test System"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Testing video generation system..."
echo ""

cd server
npx tsx test-video-generation.ts
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 Your AI Video Builder is ready!"
echo ""
echo "📍 Access it at:"
echo "   Local: http://localhost:3000/staff/aivideo-builder"
echo "   Production: https://elevateconnectsdirectory.org/staff/aivideo-builder"
echo ""
echo "📚 Documentation:"
echo "   - VIDEO_SYSTEM_COMPLETE.md - Complete overview"
echo "   - VIDEO_QUICK_START.md - Quick reference"
echo "   - DEPLOY_INSTRUCTIONS.md - Deployment guide"
echo ""
echo "🚀 Next steps:"
echo "   1. Visit the AI Video Builder"
echo "   2. Browse video templates"
echo "   3. Generate your first video!"
echo ""
