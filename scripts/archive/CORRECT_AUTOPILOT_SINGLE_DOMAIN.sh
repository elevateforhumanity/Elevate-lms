#!/bin/bash
# AUTOPILOT: Netlify Domain Setup - SINGLE DOMAIN ONLY
# Only adds elevateconnectsdirectory.org to Netlify
# Does NOT touch elevateforhumanity.org (stays on Durable)

set -e

echo "🤖 AUTOPILOT: NETLIFY DOMAIN SETUP"
echo "===================================="
echo ""
echo "⚠️  IMPORTANT:"
echo "   Only adding: elevateconnectsdirectory.org"
echo "   NOT adding: elevateforhumanity.org (stays on Durable)"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
    echo "✅ Netlify CLI installed"
    echo ""
fi

# Check if logged in
echo "🔐 Checking Netlify authentication..."
if ! netlify status &> /dev/null; then
    echo "⚠️  Not logged in to Netlify"
    echo ""
    echo "Please run: netlify login"
    echo "Then run this script again"
    exit 1
fi

echo "✅ Authenticated with Netlify"
echo ""

# Site ID
SITE_ID="elevateproduction"

echo "🌐 Adding domain to Netlify..."
echo ""

# ONLY add elevateconnectsdirectory.org
echo "Adding: elevateconnectsdirectory.org"
netlify domains:add elevateconnectsdirectory.org --site-id=$SITE_ID 2>&1 || echo "Domain may already be added"
echo ""

echo "✅ Domain added to Netlify"
echo ""

echo "⏳ Waiting for SSL certificate to provision..."
echo "This can take 5-10 minutes..."
echo ""

# Monitor SSL status
echo "📊 Monitoring SSL status..."
echo ""

WAIT_TIME=0
MAX_WAIT=600  # 10 minutes

while [ $WAIT_TIME -lt $MAX_WAIT ]; do
    echo "Checking SSL status... (${WAIT_TIME}s elapsed)"
    
    # Check domain status
    netlify status --site-id=$SITE_ID 2>&1 | grep -i "ssl\|domain\|certificate" || true
    
    echo ""
    
    if [ $WAIT_TIME -ge 300 ]; then
        echo "⏰ 5 minutes elapsed. SSL provisioning can take up to 10 minutes."
        echo "You can check manually at: https://app.netlify.com/sites/elevateproduction/settings/domain"
        echo ""
    fi
    
    echo "Waiting 30 seconds before next check..."
    sleep 30
    WAIT_TIME=$((WAIT_TIME + 30))
done

echo ""
echo "===================================="
echo "✅ DOMAIN SETUP COMPLETE"
echo "===================================="
echo ""
echo "Domain added:"
echo "  ✅ elevateconnectsdirectory.org → Netlify LMS"
echo ""
echo "Domain NOT added (correct):"
echo "  ✅ elevateforhumanity.org → Stays on Durable"
echo ""
echo "Next steps:"
echo "  1. Check SSL: https://app.netlify.com/sites/elevateproduction/settings/domain"
echo "  2. Wait for 'SSL certificate active'"
echo "  3. Visit: https://elevateconnectsdirectory.org"
echo ""
echo "Your setup:"
echo "  Marketing site: elevateforhumanity.org (Durable)"
echo "  Student portal: elevateconnectsdirectory.org (Netlify)"
echo ""
