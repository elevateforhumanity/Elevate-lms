#!/bin/bash

# One-Command Deployment
# Deploys the entire video generation system

echo "🚀 Video Generation System Deployment"
echo "======================================"
echo ""
echo "This will deploy:"
echo "  ✅ Template Sync Worker"
echo "  ✅ Media Download Worker"
echo "  ✅ Video Generation Worker"
echo ""
echo "Prerequisites:"
echo "  - Cloudflare account"
echo "  - OpenAI API key"
echo "  - Wrangler CLI installed"
echo ""
echo "Time: ~15 minutes"
echo ""
read -p "Ready to start? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

cd workers
./deploy-interactive.sh
