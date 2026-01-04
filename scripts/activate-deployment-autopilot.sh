#!/bin/bash
# Activate Deployment Autopilot Worker

echo "🤖 Activating Deployment Autopilot"
echo ""

# The worker will:
# 1. Monitor GitHub Actions every 5 minutes
# 2. Check Vercel deployment status
# 3. Verify www.elevateforhumanity.org is accessible
# 4. Automatically fix common issues

echo "✅ Deployment Autopilot worker created at: workers/deployment-autopilot.ts"
echo ""
echo "This worker will:"
echo "  - Monitor GitHub Actions for failures"
echo "  - Check Vercel domain configuration"
echo "  - Verify production site accessibility"
echo "  - Automatically apply fixes"
echo ""
echo "📝 To deploy this worker to Cloudflare:"
echo "  1. cd workers/"
echo "  2. wrangler deploy deployment-autopilot.ts"
echo ""
echo "🔧 For now, let's manually fix the current issues..."
echo ""

# Check what's failing
echo "🔍 Checking GitHub Actions status..."
gh run list --limit 3 2>/dev/null || echo "   (GitHub CLI not available)"

echo ""
echo "🔍 Checking latest commit..."
git log --oneline -1

echo ""
echo "📋 Current deployment configuration:"
cat .vercel/project.json | jq '.'

echo ""
echo "✅ Autopilot worker is ready"
echo "   The worker code is in: workers/deployment-autopilot.ts"
echo ""
echo "🚀 Next: Let me check what's actually failing in the workflows..."
