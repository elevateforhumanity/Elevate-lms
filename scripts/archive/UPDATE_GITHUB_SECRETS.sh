#!/bin/bash
# Update GitHub Secrets for Supabase Configuration
# This ensures GitHub Actions use the correct Supabase project

set -e

echo "🔐 GitHub Secrets Update Script"
echo "================================"
echo ""

# Load environment variables
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    exit 1
fi

source .env

# Extract values
PROJECT_REF="cuxzzpsyufcewtmicszk"
SUPABASE_URL="$VITE_SUPABASE_URL"
ANON_KEY="$VITE_SUPABASE_ANON_KEY"
SERVICE_KEY="$SUPABASE_SERVICE_KEY"

echo "📋 Current Configuration:"
echo "========================"
echo "Project Ref: $PROJECT_REF"
echo "Supabase URL: $SUPABASE_URL"
echo "Anon Key: ${ANON_KEY:0:20}..."
echo "Service Key: ${SERVICE_KEY:0:20}..."
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not installed"
    echo ""
    echo "Install with:"
    echo "  brew install gh  # macOS"
    echo "  sudo apt install gh  # Ubuntu/Debian"
    echo ""
    echo "Or manually update secrets at:"
    echo "https://github.com/elevateforhumanity/fix2/settings/secrets/actions"
    echo ""
    echo "Required secrets:"
    echo "  SUPABASE_PROJECT_REF = $PROJECT_REF"
    echo "  SUPABASE_DB_URL = postgres://postgres:[PASSWORD]@db.$PROJECT_REF.supabase.co:5432/postgres"
    echo "  SUPABASE_SERVICE_ROLE_KEY = $SERVICE_KEY"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub"
    echo ""
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""

# Confirm update
echo "This will update the following GitHub secrets:"
echo "  - SUPABASE_PROJECT_REF"
echo "  - SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "⚠️  Note: SUPABASE_DB_URL requires database password"
echo "    You'll need to set this manually with your password"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "🔄 Updating secrets..."

# Update SUPABASE_PROJECT_REF
echo "Setting SUPABASE_PROJECT_REF..."
echo "$PROJECT_REF" | gh secret set SUPABASE_PROJECT_REF
echo "✅ SUPABASE_PROJECT_REF updated"

# Update SUPABASE_SERVICE_ROLE_KEY
echo "Setting SUPABASE_SERVICE_ROLE_KEY..."
echo "$SERVICE_KEY" | gh secret set SUPABASE_SERVICE_ROLE_KEY
echo "✅ SUPABASE_SERVICE_ROLE_KEY updated"

echo ""
echo "⚠️  Manual Step Required:"
echo "========================"
echo ""
echo "You need to set SUPABASE_DB_URL manually with your database password:"
echo ""
echo "Run this command (replace [PASSWORD] with your actual password):"
echo ""
echo "echo 'postgres://postgres:[PASSWORD]@db.$PROJECT_REF.supabase.co:5432/postgres' | gh secret set SUPABASE_DB_URL"
echo ""
echo "Get your database password from:"
echo "https://supabase.com/dashboard/project/$PROJECT_REF/settings/database"
echo ""

echo "✅ GitHub secrets updated!"
echo ""
echo "📝 Verification:"
echo "==============="
echo ""
echo "Check secrets at:"
echo "https://github.com/elevateforhumanity/fix2/settings/secrets/actions"
echo ""
echo "You should see:"
echo "  ✅ SUPABASE_PROJECT_REF (updated)"
echo "  ✅ SUPABASE_SERVICE_ROLE_KEY (updated)"
echo "  ⚠️  SUPABASE_DB_URL (needs manual update with password)"
echo ""
echo "🎉 Done!"
