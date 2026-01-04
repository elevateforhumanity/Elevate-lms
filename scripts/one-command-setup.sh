#!/bin/bash
# ONE-COMMAND GITHUB SECRETS SETUP
# Run this script with your GitHub token to automatically configure all secrets

set -e

echo "🚀 ONE-COMMAND GITHUB SECRETS SETUP"
echo "===================================="
echo ""

REPO="elevateforhumanity/fix2"
CLOUDFLARE_API_TOKEN="Vr7RBd1RDQUSbly2jqjU2hvbC1SBk_1iDuSNIYOS"
CLOUDFLARE_ACCOUNT_ID="6ba1d2a52a3fa230972960db307ac7c0"

# Check if GH_TOKEN is set
if [ -z "$GH_TOKEN" ]; then
    echo "❌ GH_TOKEN environment variable not set"
    echo ""
    echo "To use this script, you need a GitHub Personal Access Token."
    echo ""
    echo "QUICK SETUP:"
    echo "------------"
    echo "1. Create token: https://github.com/settings/tokens/new"
    echo "   - Note: 'Cloudflare deployment secrets'"
    echo "   - Expiration: 90 days (or custom)"
    echo "   - Scopes: Check 'repo' (full control of private repositories)"
    echo ""
    echo "2. Copy the token and run:"
    echo "   export GH_TOKEN='your_token_here'"
    echo "   ./scripts/one-command-setup.sh"
    echo ""
    echo "OR run in one line:"
    echo "   GH_TOKEN='your_token_here' ./scripts/one-command-setup.sh"
    echo ""
    exit 1
fi

echo "✅ GitHub token found"
echo ""

# Function to set a secret using GitHub API
set_secret() {
    local secret_name=$1
    local secret_value=$2
    
    echo "Setting $secret_name..."
    
    # Get repository public key
    KEY_RESPONSE=$(curl -s -H "Authorization: token $GH_TOKEN" \
        "https://api.github.com/repos/$REPO/actions/secrets/public-key")
    
    KEY_ID=$(echo "$KEY_RESPONSE" | grep -o '"key_id":"[^"]*"' | cut -d'"' -f4)
    PUBLIC_KEY=$(echo "$KEY_RESPONSE" | grep -o '"key":"[^"]*"' | cut -d'"' -f4)
    
    if [ -z "$KEY_ID" ] || [ -z "$PUBLIC_KEY" ]; then
        echo "❌ Failed to get repository public key"
        echo "   Make sure your token has 'repo' scope"
        return 1
    fi
    
    # Encrypt the secret value using Python
    ENCRYPTED_VALUE=$(python3 << PYTHON
import base64
import json
from nacl import encoding, public

def encrypt(public_key: str, secret_value: str) -> str:
    public_key = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder())
    sealed_box = public.SealedBox(public_key)
    encrypted = sealed_box.encrypt(secret_value.encode("utf-8"))
    return base64.b64encode(encrypted).decode("utf-8")

print(encrypt("$PUBLIC_KEY", "$secret_value"))
PYTHON
)
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to encrypt secret (PyNaCl not installed)"
        echo "   Installing PyNaCl..."
        pip3 install --quiet PyNaCl 2>/dev/null || pip install --quiet PyNaCl 2>/dev/null
        
        # Retry encryption
        ENCRYPTED_VALUE=$(python3 << PYTHON
import base64
from nacl import encoding, public

def encrypt(public_key: str, secret_value: str) -> str:
    public_key = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder())
    sealed_box = public.SealedBox(public_key)
    encrypted = sealed_box.encrypt(secret_value.encode("utf-8"))
    return base64.b64encode(encrypted).decode("utf-8")

print(encrypt("$PUBLIC_KEY", "$secret_value"))
PYTHON
)
    fi
    
    # Set the secret
    RESPONSE=$(curl -s -X PUT \
        -H "Authorization: token $GH_TOKEN" \
        -H "Content-Type: application/json" \
        "https://api.github.com/repos/$REPO/actions/secrets/$secret_name" \
        -d "{\"encrypted_value\":\"$ENCRYPTED_VALUE\",\"key_id\":\"$KEY_ID\"}")
    
    if echo "$RESPONSE" | grep -q "error"; then
        echo "❌ Failed to set $secret_name"
        echo "   Response: $RESPONSE"
        return 1
    else
        echo "✅ $secret_name set successfully"
    fi
}

echo "## Setting Cloudflare secrets..."
echo ""

# Set CLOUDFLARE_API_TOKEN
set_secret "CLOUDFLARE_API_TOKEN" "$CLOUDFLARE_API_TOKEN"

# Set CLOUDFLARE_ACCOUNT_ID
set_secret "CLOUDFLARE_ACCOUNT_ID" "$CLOUDFLARE_ACCOUNT_ID"

# Get CLOUDFLARE_ZONE_ID
echo ""
echo "## Getting CLOUDFLARE_ZONE_ID..."
echo ""

ZONES=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json")

if echo "$ZONES" | grep -q '"success":true'; then
    # Try to extract zone ID
    ZONE_ID=$(echo "$ZONES" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ -n "$ZONE_ID" ]; then
        echo "✅ Found Zone ID: $ZONE_ID"
        set_secret "CLOUDFLARE_ZONE_ID" "$ZONE_ID"
    else
        echo "⚠️  No zones found in Cloudflare account"
        echo "   This is optional - workflow will work without it"
        echo ""
        echo "   If you have a domain in Cloudflare:"
        echo "   1. Get Zone ID from: https://dash.cloudflare.com/"
        echo "   2. Run: GH_TOKEN='$GH_TOKEN' ZONE_ID='your-zone-id' ./scripts/one-command-setup.sh"
    fi
else
    echo "⚠️  Could not fetch zones from Cloudflare"
    echo "   This is optional - workflow will work without it"
fi

echo ""
echo "## Verifying secrets..."
echo ""

# List secrets to verify
SECRETS=$(curl -s -H "Authorization: token $GH_TOKEN" \
    "https://api.github.com/repos/$REPO/actions/secrets")

if echo "$SECRETS" | grep -q "CLOUDFLARE_API_TOKEN"; then
    echo "✅ CLOUDFLARE_API_TOKEN verified"
fi

if echo "$SECRETS" | grep -q "CLOUDFLARE_ACCOUNT_ID"; then
    echo "✅ CLOUDFLARE_ACCOUNT_ID verified"
fi

if echo "$SECRETS" | grep -q "CLOUDFLARE_ZONE_ID"; then
    echo "✅ CLOUDFLARE_ZONE_ID verified"
fi

echo ""
echo "═══════════════════════════════════════"
echo "✅ SETUP COMPLETE!"
echo "═══════════════════════════════════════"
echo ""
echo "GitHub secrets have been configured for:"
echo "  Repository: $REPO"
echo ""
echo "Next steps:"
echo "1. Test the workflow:"
echo "   git commit --allow-empty -m 'test: Verify auto-deploy'"
echo "   git push origin main"
echo ""
echo "2. Check workflow status:"
echo "   https://github.com/$REPO/actions"
echo ""
echo "3. Verify deployment:"
echo "   https://elevateforhumanity.pages.dev/"
echo ""
echo "🎉 Auto-deploy is now enabled!"
