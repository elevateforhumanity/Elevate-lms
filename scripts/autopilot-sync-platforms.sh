#!/bin/bash

# 🤖 AUTOPILOT: Sync Environment Variables Between Netlify and Vercel
# Ensures both platforms have identical configuration

set -e

echo "=================================================="
echo "🤖 AUTOPILOT: Platform Environment Sync"
echo "=================================================="
echo ""

# ---------- CONFIG VALIDATION ----------
MISSING_SECRETS=0

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN is missing"
  MISSING_SECRETS=$((MISSING_SECRETS + 1))
fi

if [ -z "$VERCEL_ORG_ID" ]; then
  echo "❌ VERCEL_ORG_ID is missing"
  MISSING_SECRETS=$((MISSING_SECRETS + 1))
fi

if [ -z "$VERCEL_PROJECT_ID" ]; then
  echo "❌ VERCEL_PROJECT_ID is missing"
  MISSING_SECRETS=$((MISSING_SECRETS + 1))
fi

if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
  echo "❌ NETLIFY_AUTH_TOKEN is missing"
  MISSING_SECRETS=$((MISSING_SECRETS + 1))
fi

if [ -z "$NETLIFY_SITE_ID" ]; then
  echo "❌ NETLIFY_SITE_ID is missing"
  MISSING_SECRETS=$((MISSING_SECRETS + 1))
fi

if [ $MISSING_SECRETS -gt 0 ]; then
  echo ""
  echo "❌ $MISSING_SECRETS required secret(s) missing"
  echo "Cannot sync platforms without all credentials"
  exit 1
fi

echo "✅ All platform credentials present"
echo ""

# ---------- Install CLIs ----------
echo "⚙️  Installing platform CLIs..."

if ! command -v vercel &>/dev/null; then
  npm install -g vercel
  echo "✅ Vercel CLI installed"
else
  echo "✅ Vercel CLI already installed"
fi

if ! command -v netlify &>/dev/null; then
  npm install -g netlify-cli
  echo "✅ Netlify CLI installed"
else
  echo "✅ Netlify CLI already installed"
fi

echo ""

# ---------- Define environment variables to sync ----------
declare -A ENV_VARS=(
  # Core Application
  ["NEXT_PUBLIC_SITE_URL"]="${APP_URL:-https://elevateconnectsdirectory.org}"
  ["NEXT_PUBLIC_APP_URL"]="${APP_URL:-https://elevateconnectsdirectory.org}"
  ["NEXT_PUBLIC_BASE_URL"]="${APP_URL:-https://elevateconnectsdirectory.org}"
  
  # Supabase
  ["NEXT_PUBLIC_SUPABASE_URL"]="${SUPABASE_URL:-https://cuxzzpsyufcewtmicszk.supabase.co}"
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]="${SUPABASE_ANON_KEY}"
  ["SUPABASE_SERVICE_ROLE_KEY"]="${SUPABASE_SERVICE_ROLE_KEY}"
  
  # Node Environment
  ["NODE_ENV"]="production"
)

# Add optional variables if they exist
if [ -n "$RESEND_API_KEY" ]; then
  ENV_VARS["RESEND_API_KEY"]="$RESEND_API_KEY"
fi

if [ -n "$STRIPE_SECRET_KEY" ]; then
  ENV_VARS["STRIPE_SECRET_KEY"]="$STRIPE_SECRET_KEY"
fi

if [ -n "$STRIPE_PUBLISHABLE_KEY" ]; then
  ENV_VARS["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"]="$STRIPE_PUBLISHABLE_KEY"
fi

if [ -n "$STRIPE_WEBHOOK_SECRET" ]; then
  ENV_VARS["STRIPE_WEBHOOK_SECRET"]="$STRIPE_WEBHOOK_SECRET"
fi

if [ -n "$VAPID_PUBLIC_KEY" ]; then
  ENV_VARS["NEXT_PUBLIC_VAPID_PUBLIC_KEY"]="$VAPID_PUBLIC_KEY"
fi

if [ -n "$VAPID_PRIVATE_KEY" ]; then
  ENV_VARS["VAPID_PRIVATE_KEY"]="$VAPID_PRIVATE_KEY"
fi

if [ -n "$VAPID_SUBJECT" ]; then
  ENV_VARS["VAPID_SUBJECT"]="$VAPID_SUBJECT"
fi

if [ -n "$AWS_ACCESS_KEY_ID" ]; then
  ENV_VARS["AWS_ACCESS_KEY_ID"]="$AWS_ACCESS_KEY_ID"
fi

if [ -n "$AWS_SECRET_ACCESS_KEY" ]; then
  ENV_VARS["AWS_SECRET_ACCESS_KEY"]="$AWS_SECRET_ACCESS_KEY"
fi

if [ -n "$AWS_REGION" ]; then
  ENV_VARS["AWS_REGION"]="$AWS_REGION"
fi

if [ -n "$AWS_S3_BUCKET" ]; then
  ENV_VARS["AWS_S3_BUCKET"]="$AWS_S3_BUCKET"
fi

if [ -n "$OPENAI_API_KEY" ]; then
  ENV_VARS["OPENAI_API_KEY"]="$OPENAI_API_KEY"
fi

if [ -n "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
  ENV_VARS["GOOGLE_APPLICATION_CREDENTIALS"]="$GOOGLE_APPLICATION_CREDENTIALS"
fi

# ---------- Sync to Vercel ----------
echo "🔄 Syncing to Vercel..."
export VERCEL_ORG_ID
export VERCEL_PROJECT_ID
export VERCEL_TOKEN

vercel link --yes --scope "$VERCEL_ORG_ID" || true

VERCEL_COUNT=0
for KEY in "${!ENV_VARS[@]}"; do
  VALUE="${ENV_VARS[$KEY]}"
  
  if [ -n "$VALUE" ]; then
    echo "  → $KEY"
    
    # Remove existing
    vercel env rm "$KEY" production --yes >/dev/null 2>&1 || true
    vercel env rm "$KEY" preview --yes >/dev/null 2>&1 || true
    vercel env rm "$KEY" development --yes >/dev/null 2>&1 || true
    
    # Add new
    echo "$VALUE" | vercel env add "$KEY" production --yes >/dev/null 2>&1
    echo "$VALUE" | vercel env add "$KEY" preview --yes >/dev/null 2>&1
    echo "$VALUE" | vercel env add "$KEY" development --yes >/dev/null 2>&1
    
    VERCEL_COUNT=$((VERCEL_COUNT + 1))
  fi
done

echo "✅ Synced $VERCEL_COUNT variables to Vercel"
echo ""

# ---------- Sync to Netlify ----------
echo "🔄 Syncing to Netlify..."
export NETLIFY_AUTH_TOKEN
export NETLIFY_SITE_ID

NETLIFY_COUNT=0
for KEY in "${!ENV_VARS[@]}"; do
  VALUE="${ENV_VARS[$KEY]}"
  
  if [ -n "$VALUE" ]; then
    echo "  → $KEY"
    
    # Netlify CLI: set env var
    netlify env:set "$KEY" "$VALUE" --context production >/dev/null 2>&1 || true
    netlify env:set "$KEY" "$VALUE" --context deploy-preview >/dev/null 2>&1 || true
    netlify env:set "$KEY" "$VALUE" --context branch-deploy >/dev/null 2>&1 || true
    
    NETLIFY_COUNT=$((NETLIFY_COUNT + 1))
  fi
done

echo "✅ Synced $NETLIFY_COUNT variables to Netlify"
echo ""

# ---------- Summary ----------
echo "=================================================="
echo "✅ Platform Sync Complete"
echo "=================================================="
echo ""
echo "📊 Summary:"
echo "  Vercel:  $VERCEL_COUNT variables synced"
echo "  Netlify: $NETLIFY_COUNT variables synced"
echo ""
echo "Both platforms now have identical configuration for:"
echo "  - Production"
echo "  - Preview/Deploy Preview"
echo "  - Development/Branch Deploy"
echo ""
echo "=================================================="
