#!/bin/bash

# Cloudflare Cleanup Script for www.elevateforhumanity.org
# This script removes Cloudflare configuration so the domain can be hosted on Durable

set -e

echo "═══════════════════════════════════════════════════════════"
echo "  Cloudflare Cleanup: www.elevateforhumanity.org"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if CLOUDFLARE_API_TOKEN is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ ERROR: CLOUDFLARE_API_TOKEN environment variable not set"
    echo ""
    echo "To fix this:"
    echo "1. Go to: https://dash.cloudflare.com/profile/api-tokens"
    echo "2. Create a token with 'Zone.DNS' edit permissions"
    echo "3. Export it:"
    echo "   export CLOUDFLARE_API_TOKEN=\"your-token-here\""
    echo "4. Run this script again"
    echo ""
    exit 1
fi

echo "✅ Cloudflare API token found"
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed"
    echo "Please install Node.js to run this script"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKER_SCRIPT="$SCRIPT_DIR/remove-elevateforhumanity-from-cloudflare.mjs"

# Check if the worker script exists
if [ ! -f "$WORKER_SCRIPT" ]; then
    echo "❌ ERROR: Worker script not found at: $WORKER_SCRIPT"
    exit 1
fi

echo "🚀 Running Cloudflare cleanup worker..."
echo ""

# Run the Node.js worker script
node "$WORKER_SCRIPT"

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo "  ✅ Cleanup Complete!"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
    echo "📝 Next Steps:"
    echo ""
    echo "1. Configure in Durable:"
    echo "   - Go to: https://durablesites.co"
    echo "   - Add custom domain: www.elevateforhumanity.org"
    echo "   - Verify DNS"
    echo ""
    echo "2. Add LMS domain to Vercel:"
    echo "   - Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains"
    echo "   - Add domain: lms.elevateforhumanity.org"
    echo "   - Update DNS: CNAME lms → cname.vercel-dns.com"
    echo ""
    echo "3. Wait for DNS propagation (5-15 minutes)"
    echo ""
    echo "4. Test:"
    echo "   - Marketing: https://www.elevateforhumanity.org"
    echo "   - LMS: https://lms.elevateforhumanity.org"
    echo ""
else
    echo ""
    echo "❌ Cleanup failed with exit code: $EXIT_CODE"
    echo ""
    echo "Troubleshooting:"
    echo "1. Verify CLOUDFLARE_API_TOKEN is correct"
    echo "2. Ensure token has 'Zone.DNS' edit permissions"
    echo "3. Check that elevateforhumanity.org is in your Cloudflare account"
    echo ""
    exit $EXIT_CODE
fi
