#!/bin/bash
# DNS Optimization Script for elevateforhumanity.institute
# This script updates DNS records to Vercel's recommended configuration

set -e

echo "🔧 DNS Optimization Script"
echo "=========================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found${NC}"
    echo "Install it with: npm install -g vercel"
    exit 1
fi

echo -e "${GREEN}✅ Vercel CLI found${NC}"
echo ""

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel${NC}"
    echo "Please run: vercel login"
    exit 1
fi

echo -e "${GREEN}✅ Logged in to Vercel${NC}"
echo ""

# Domain to update
DOMAIN="elevateforhumanity.institute"
NEW_IP="76.76.21.21"
CNAME_TARGET="cname.vercel-dns.com"

echo "📋 Current DNS Configuration:"
echo "----------------------------"
vercel dns ls "$DOMAIN" 2>&1 || echo "Could not list DNS records"
echo ""

# Confirm before proceeding
echo -e "${YELLOW}⚠️  This will update DNS records for $DOMAIN${NC}"
echo ""
echo "Changes to be made:"
echo "  1. Update root domain (@) A record to: $NEW_IP"
echo "  2. Change www subdomain from A records to CNAME: $CNAME_TARGET"
echo ""
read -p "Do you want to proceed? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "❌ Aborted by user"
    exit 0
fi

echo "🚀 Starting DNS updates..."
echo ""

# Step 1: List current records to see what we're working with
echo "📝 Step 1: Checking current DNS records..."
CURRENT_RECORDS=$(vercel dns ls "$DOMAIN" 2>&1 || echo "")
echo "$CURRENT_RECORDS"
echo ""

# Step 2: Remove old A records for root domain
echo "🗑️  Step 2: Removing old A records for root domain..."
vercel dns rm "$DOMAIN" @ A 2>&1 || echo "No A records to remove for @"
echo ""

# Step 3: Add new A record for root domain
echo "➕ Step 3: Adding new A record for root domain..."
if vercel dns add "$DOMAIN" @ A "$NEW_IP" 2>&1; then
    echo -e "${GREEN}✅ Added A record: @ → $NEW_IP${NC}"
else
    echo -e "${RED}❌ Failed to add A record${NC}"
    exit 1
fi
echo ""

# Step 4: Remove old A records for www
echo "🗑️  Step 4: Removing old A records for www..."
vercel dns rm "$DOMAIN" www A 2>&1 || echo "No A records to remove for www"
echo ""

# Step 5: Add CNAME for www
echo "➕ Step 5: Adding CNAME record for www..."
if vercel dns add "$DOMAIN" www CNAME "$CNAME_TARGET" 2>&1; then
    echo -e "${GREEN}✅ Added CNAME record: www → $CNAME_TARGET${NC}"
else
    echo -e "${RED}❌ Failed to add CNAME record${NC}"
    exit 1
fi
echo ""

# Step 6: Verify new configuration
echo "✅ Step 6: Verifying new DNS configuration..."
echo ""
vercel dns ls "$DOMAIN" 2>&1 || echo "Could not verify DNS records"
echo ""

# Step 7: Test DNS resolution
echo "🧪 Step 7: Testing DNS resolution..."
echo ""

echo "Testing root domain..."
sleep 2
curl -s "https://dns.google/resolve?name=$DOMAIN&type=A" | python3 -c "import sys, json; data=json.load(sys.stdin); print('Root domain A record:', data.get('Answer', [{}])[0].get('data', 'Not found yet'))" 2>&1 || echo "DNS not propagated yet"
echo ""

echo "Testing www subdomain..."
sleep 2
curl -s "https://dns.google/resolve?name=www.$DOMAIN&type=CNAME" | python3 -c "import sys, json; data=json.load(sys.stdin); print('WWW CNAME record:', data.get('Answer', [{}])[0].get('data', 'Not found yet'))" 2>&1 || echo "DNS not propagated yet"
echo ""

echo -e "${GREEN}✅ DNS update complete!${NC}"
echo ""
echo "📊 Summary:"
echo "  ✅ Root domain (@) now points to: $NEW_IP"
echo "  ✅ WWW subdomain now uses CNAME: $CNAME_TARGET"
echo ""
echo "⏱️  DNS Propagation:"
echo "  - Local: 5-10 minutes"
echo "  - Global: 30 minutes (TTL)"
echo "  - Full propagation: Up to 48 hours"
echo ""
echo "🔍 Verify propagation:"
echo "  https://dnschecker.org/#A/$DOMAIN"
echo "  https://dnschecker.org/#CNAME/www.$DOMAIN"
echo ""
echo "🌐 Test your site:"
echo "  https://$DOMAIN"
echo "  https://www.$DOMAIN"
echo ""
echo -e "${GREEN}🎉 All done!${NC}"
