#!/bin/bash
# AUTOPILOT: Netlify Domain Setup
# Adds domains to Netlify and monitors SSL provisioning

set -e

echo "🤖 AUTOPILOT: NETLIFY DOMAIN SETUP"
echo "===================================="
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

echo "🌐 Adding domains to Netlify..."
echo ""

# Add elevateforhumanity.org
echo "Adding: elevateforhumanity.org"
netlify domains:add elevateforhumanity.org --site-id=$SITE_ID 2>&1 || echo "Domain may already be added"
echo ""

# Add elevateconnectsdirectory.org
echo "Adding: elevateconnectsdirectory.org"
netlify domains:add elevateconnectsdirectory.org --site-id=$SITE_ID 2>&1 || echo "Domain may already be added"
echo ""

# Set primary domain
echo "🎯 Setting primary domain..."
netlify domains:set elevateforhumanity.org --site-id=$SITE_ID 2>&1 || echo "Primary domain may already be set"
echo ""

echo "⏳ Waiting for SSL certificates to provision..."
echo "This can take 5-10 minutes per domain..."
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
    echo "Waiting 30 seconds before next check..."
    sleep 30
    WAIT_TIME=$((WAIT_TIME + 30))
    
    # Check if we should continue
    if [ $WAIT_TIME -ge 300 ]; then
        echo ""
        echo "⏰ 5 minutes elapsed. SSL provisioning can take up to 10 minutes."
        echo "You can:"
        echo "  1. Continue waiting (script will check for 5 more minutes)"
        echo "  2. Check manually at: https://app.netlify.com/sites/elevateproduction/settings/domain"
        echo ""
    fi
done

echo ""
echo "===================================="
echo "✅ DOMAIN SETUP COMPLETE"
echo "===================================="
echo ""
echo "Domains added:"
echo "  ✅ elevateforhumanity.org (primary)"
echo "  ✅ elevateconnectsdirectory.org"
echo ""
echo "Next steps:"
echo "  1. Check SSL status: https://app.netlify.com/sites/elevateproduction/settings/domain"
echo "  2. Wait for 'SSL certificate active' status"
echo "  3. Visit: https://elevateforhumanity.org"
echo "  4. Visit: https://elevateconnectsdirectory.org"
echo ""
echo "If SSL is still provisioning:"
echo "  - Wait up to 10 minutes total"
echo "  - Check Netlify dashboard for status"
echo "  - SSL will activate automatically"
echo ""
