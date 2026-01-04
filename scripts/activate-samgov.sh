#!/bin/bash

# Activate SAM.gov API on Vercel
# This script adds the SAM.gov API credentials to your Vercel project

set -e

echo "🚀 Activating SAM.gov API Integration"
echo "======================================"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Project details
PROJECT_ID="prj_mqHr6z23gRSqM5In6bLXtEo9cMGI"
ORG_ID="team_wnZ7iyQz1kUNni7yIDVUnhZf"

echo "📋 Project: fix2"
echo "🆔 Project ID: $PROJECT_ID"
echo ""

# SAM.gov credentials
SAM_GOV_API_KEY="Vyi2/MKIhgOcxxrjHzZMtAZUFeW3AqW5Pa1IOmFYEHo="
SAM_API_TOKEN="SAM-736d2153-2d8a-475a-ad02-9e4eee1d0e99"

echo "🔑 Adding SAM_GOV_API_KEY to Vercel..."
echo "$SAM_GOV_API_KEY" | vercel env add SAM_GOV_API_KEY production

echo "🔑 Adding SAM_API_TOKEN to Vercel..."
echo "$SAM_API_TOKEN" | vercel env add SAM_API_TOKEN production

echo ""
echo "✅ SAM.gov API credentials added successfully!"
echo ""
echo "📦 Triggering redeployment..."
vercel --prod --yes

echo ""
echo "✅ Deployment triggered!"
echo ""
echo "🎉 SAM.gov integration is now active!"
echo ""
echo "Test the integration:"
echo "  curl https://your-domain.com/api/grants/eligibility"
echo ""
