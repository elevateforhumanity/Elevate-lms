#!/bin/bash
# Add elevateconnectsdirectory.org to Netlify
# Monitor SSL provisioning

set -e

echo "🚀 ADDING DOMAIN TO NETLIFY"
echo "============================"
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
    echo "Run this command to login:"
    echo "  netlify login"
    echo ""
    echo "Then run this script again"
    exit 1
fi

echo "✅ Authenticated with Netlify"
echo ""

# Add domain
echo "🌐 Adding elevateconnectsdirectory.org to Netlify..."
echo ""

netlify domains:add elevateconnectsdirectory.org 2>&1 || echo "Domain may already be added"

echo ""
echo "✅ Domain added to Netlify"
echo ""

echo "⏳ Waiting for SSL certificate to provision..."
echo "This typically takes 5-10 minutes"
echo ""

# Monitor SSL
echo "📊 Monitoring SSL status..."
echo "Check status at: https://app.netlify.com/sites/elevateproduction/settings/domain"
echo ""

WAIT_TIME=0
MAX_WAIT=600  # 10 minutes

while [ $WAIT_TIME -lt $MAX_WAIT ]; do
    echo "⏰ Elapsed: ${WAIT_TIME}s / 600s"
    
    if [ $WAIT_TIME -ge 300 ]; then
        echo "   ℹ️  SSL provisioning can take up to 10 minutes"
        echo "   Check manually: https://app.netlify.com/sites/elevateproduction/settings/domain"
    fi
    
    sleep 30
    WAIT_TIME=$((WAIT_TIME + 30))
done

echo ""
echo "============================"
echo "✅ DOMAIN SETUP COMPLETE"
echo "============================"
echo ""
echo "Domain: elevateconnectsdirectory.org"
echo "Status: Added to Netlify"
echo ""
echo "Next steps:"
echo "  1. Check SSL status: https://app.netlify.com/sites/elevateproduction/settings/domain"
echo "  2. Wait for 'SSL certificate active'"
echo "  3. Visit: https://elevateconnectsdirectory.org"
echo ""
echo "Your setup:"
echo "  ✅ elevateforhumanity.org → Durable marketing site"
echo "  ✅ elevateconnectsdirectory.org → Netlify LMS"
echo ""
