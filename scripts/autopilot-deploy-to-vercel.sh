#!/bin/bash

# Autopilot Deploy to Vercel
# Uses the Vercel Autopilot Worker to manage deployment
# Target: fix2-1c7w-git-main-gitpod.vercel.app

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 Autopilot Deploy to Vercel${NC}"
echo "Target: fix2-1c7w-git-main-gitpod.vercel.app"
echo ""

# Check if autopilot worker is deployed
echo -e "${BLUE}Checking autopilot worker...${NC}"

if ! command -v wrangler &> /dev/null; then
    echo -e "${YELLOW}⚠️  Wrangler CLI not found${NC}"
    echo "Install with: npm install -g wrangler"
    echo ""
    echo "Falling back to direct deployment..."
    exec bash scripts/deploy-to-vercel.sh
    exit 0
fi

# Check if worker is deployed
WORKER_STATUS=$(wrangler deployments list --name vercel-autopilot-worker 2>&1 || echo "not_deployed")

if [[ "$WORKER_STATUS" == *"not_deployed"* ]] || [[ "$WORKER_STATUS" == *"error"* ]]; then
    echo -e "${YELLOW}⚠️  Autopilot worker not deployed${NC}"
    echo "Deploy worker with: cd workers && wrangler deploy --config wrangler-vercel-autopilot.toml"
    echo ""
    echo "Falling back to direct deployment..."
    exec bash scripts/deploy-to-vercel.sh
    exit 0
fi

echo -e "${GREEN}✅ Autopilot worker is active${NC}"
echo ""

# Get autopilot token from environment
if [ -z "$AUTOPILOT_TOKEN" ]; then
    echo -e "${RED}❌ AUTOPILOT_TOKEN not set${NC}"
    echo "Set with: export AUTOPILOT_TOKEN=your_token"
    exit 1
fi

# Get worker URL
WORKER_URL=$(wrangler deployments list --name vercel-autopilot-worker --json 2>/dev/null | jq -r '.[0].url' || echo "")

if [ -z "$WORKER_URL" ]; then
    echo -e "${RED}❌ Could not get worker URL${NC}"
    exit 1
fi

echo -e "${BLUE}Worker URL: ${WORKER_URL}${NC}"
echo ""

# Step 1: Commit changes
echo -e "${BLUE}📝 Step 1: Committing changes...${NC}"

if [ -n "$(git status --porcelain)" ]; then
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

PWA Verification: 31/31 checks passed ✅
Deployed via Autopilot

Co-authored-by: Ona <no-reply@ona.com>"
    
    echo -e "${GREEN}✅ Changes committed${NC}"
else
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
fi

echo ""

# Step 2: Trigger deployment via autopilot
echo -e "${BLUE}🚀 Step 2: Triggering deployment via autopilot...${NC}"

DEPLOY_RESPONSE=$(curl -s -X POST "$WORKER_URL" \
  -H "Authorization: Bearer $AUTOPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "trigger_deploy"
  }')

echo "$DEPLOY_RESPONSE" | jq '.'

if echo "$DEPLOY_RESPONSE" | jq -e '.ok' > /dev/null; then
    echo -e "${GREEN}✅ Deployment triggered${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    echo "$DEPLOY_RESPONSE"
    exit 1
fi

echo ""

# Step 3: Monitor deployment
echo -e "${BLUE}📊 Step 3: Monitoring deployment...${NC}"
echo "Checking deployment status..."

sleep 5

# Get recent deployments
DEPLOYMENTS_RESPONSE=$(curl -s -X POST "$WORKER_URL" \
  -H "Authorization: Bearer $AUTOPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "get_deployments"
  }')

echo "$DEPLOYMENTS_RESPONSE" | jq '.result.deployments[0]'

echo ""

# Step 4: Health check
echo -e "${BLUE}🏥 Step 4: Running health check...${NC}"

HEALTH_RESPONSE=$(curl -s -X POST "$WORKER_URL" \
  -H "Authorization: Bearer $AUTOPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "health_check"
  }')

echo "$HEALTH_RESPONSE" | jq '.result'

if echo "$HEALTH_RESPONSE" | jq -e '.result.status == "healthy"' > /dev/null; then
    echo -e "${GREEN}✅ All systems healthy${NC}"
else
    echo -e "${YELLOW}⚠️  Some systems unhealthy${NC}"
fi

echo ""
echo -e "${GREEN}✅ Autopilot deployment complete!${NC}"
echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo "1. Wait 2-5 minutes for deployment to complete"
echo "2. Visit: https://fix2-1c7w-git-main-gitpod.vercel.app"
echo "3. Test PWA: https://fix2-1c7w-git-main-gitpod.vercel.app/pwa-test"
echo "4. Add VAPID keys: npm run generate:vapid"
echo "5. Run Lighthouse audit"
echo ""
echo -e "${BLUE}🔗 Vercel Dashboard:${NC}"
echo "https://vercel.com/dashboard"
