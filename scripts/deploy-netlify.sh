#!/bin/bash
# Deploy to Netlify
# Usage: ./scripts/deploy-netlify.sh [production|preview]

set -e

DEPLOY_TYPE="${1:-production}"

echo "🚀 Deploying to Netlify ($DEPLOY_TYPE)..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if logged in
if ! netlify status &> /dev/null; then
    echo "❌ Not logged in to Netlify. Please run: netlify login"
    exit 1
fi

# Run pre-deployment checks
echo "🔍 Running pre-deployment checks..."
npm run typecheck || echo "⚠️  Type errors found (continuing anyway)"
npm run lint || echo "⚠️  Lint errors found (continuing anyway)"

# Build the project
echo "📦 Building project..."
npm run build

# Deploy based on type
if [ "$DEPLOY_TYPE" = "production" ]; then
    echo "🌐 Deploying to production..."
    netlify deploy --prod --dir=.next
else
    echo "🔍 Creating preview deployment..."
    netlify deploy --dir=.next
fi

echo "✅ Deployment complete!"
