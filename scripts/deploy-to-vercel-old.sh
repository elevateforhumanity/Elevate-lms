#!/bin/bash

# Deploy to Vercel - fix2-1c7w project
# This script helps deploy the PWA changes to the correct Vercel project

set -e

echo "🚀 Deploying PWA to Vercel"
echo "Target: fix2-1c7w-git-main-gitpod.vercel.app"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo "Please run this script from the project root"
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes${NC}"
    echo ""
    echo "Would you like to commit all changes? (y/n)"
    read -r response
    
    if [ "$response" = "y" ]; then
        echo ""
        echo -e "${BLUE}📝 Committing changes...${NC}"
        
        git add .
        git commit -m "🎨 Add complete PWA implementation with mobile optimization

- Add service worker with offline support
- Implement push notifications with VAPID
- Create mobile-optimized UI components
- Add all icon sizes (72px to 512px) with maskable variants
- Configure app shortcuts and share target
- Add offline functionality with IndexedDB
- Implement background sync
- Create mobile navigation and video player
- Add PWA test page and verification script
- Update documentation

PWA Verification: 31/31 checks passed ✅

Co-authored-by: Ona <no-reply@ona.com>"
        
        echo -e "${GREEN}✅ Changes committed${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping commit${NC}"
    fi
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo ""
echo -e "${BLUE}Current branch: ${CURRENT_BRANCH}${NC}"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  You're not on the main branch${NC}"
    echo "Would you like to switch to main? (y/n)"
    read -r response
    
    if [ "$response" = "y" ]; then
        git checkout main
        echo -e "${GREEN}✅ Switched to main branch${NC}"
    fi
fi

# Push to GitHub
echo ""
echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
git push origin main

echo ""
echo -e "${GREEN}✅ Pushed to GitHub${NC}"
echo ""
echo "Vercel will automatically deploy from GitHub"
echo ""
echo -e "${BLUE}📊 Deployment Status:${NC}"
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Find project: fix2-1c7w"
echo "3. Check Deployments tab"
echo ""
echo -e "${BLUE}🔗 Deployment URL:${NC}"
echo "https://fix2-1c7w-git-main-gitpod.vercel.app"
echo ""
echo -e "${YELLOW}⏳ Deployment usually takes 2-5 minutes${NC}"
echo ""
echo -e "${BLUE}📋 After deployment:${NC}"
echo "1. Generate VAPID keys: npm run generate:vapid"
echo "2. Add keys to Vercel environment variables"
echo "3. Test PWA: https://fix2-1c7w-git-main-gitpod.vercel.app/pwa-test"
echo "4. Run Lighthouse audit"
echo ""
echo -e "${GREEN}✅ Deployment initiated!${NC}"
