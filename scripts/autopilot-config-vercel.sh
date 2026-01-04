#!/bin/bash

# 🤖 AUTOPILOT: Configure Vercel Environment for Elevate
# Can be run from GitHub Actions, Gitpod, or any CI worker.

set -e

echo "=================================================="
echo "🤖 AUTOPILOT: Vercel Environment Configuration"
echo "=================================================="
echo ""

# ---------- CONFIG REQUIRED (via env or GitHub Secrets) ----------
# These MUST be provided from outside (GitHub Secrets, etc.)
# Do NOT hardcode real secrets into this file.

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN is missing (export it or add as GitHub Secret)"
  exit 1
fi

if [ -z "$VERCEL_ORG_ID" ]; then
  echo "❌ VERCEL_ORG_ID is missing (export it or add as GitHub Secret)"
  exit 1
fi

if [ -z "$VERCEL_PROJECT_ID" ]; then
  echo "❌ VERCEL_PROJECT_ID is missing (export it or add as GitHub Secret)"
  exit 1
fi

if [ -z "$SUPABASE_URL" ]; then
  # Fallback to correct Elevate Supabase instance
  SUPABASE_URL="https://cuxzzpsyufcewtmicszk.supabase.co"
fi

if [ -z "$SUPABASE_ANON_KEY" ]; then
  echo "❌ SUPABASE_ANON_KEY is missing (add as GitHub Secret)"
  exit 1
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "❌ SUPABASE_SERVICE_ROLE_KEY is missing (add as GitHub Secret)"
  exit 1
fi

APP_URL_DEFAULT="https://elevateconnectsdirectory.org"

if [ -z "$APP_URL" ]; then
  APP_URL="$APP_URL_DEFAULT"
fi

echo "✅ Config values loaded (tokens & IDs present)"
echo ""

# ---------- Install Vercel CLI ----------
if ! command -v vercel &>/dev/null; then
  echo "⚙️  Installing Vercel CLI..."
  npm install -g vercel
  echo "✅ Vercel CLI installed"
else
  echo "✅ Vercel CLI already installed"
fi

# ---------- Helper: set Vercel env var for all environments ----------
set_vercel_env() {
  local NAME="$1"
  local VALUE="$2"

  echo ""
  echo "🔧 Setting env: $NAME"

  # Production
  vercel env rm "$NAME" production --yes >/dev/null 2>&1 || true
  echo "$VALUE" | vercel env add "$NAME" production --yes

  # Preview
  vercel env rm "$NAME" preview --yes >/dev/null 2>&1 || true
  echo "$VALUE" | vercel env add "$NAME" preview --yes

  # Development
  vercel env rm "$NAME" development --yes >/dev/null 2>&1 || true
  echo "$VALUE" | vercel env add "$NAME" development --yes

  echo "✅ $NAME set for production / preview / development"
}

# ---------- Login / link project ----------
echo ""
echo "🔐 Logging into Vercel (non-interactive)..."
export VERCEL_ORG_ID
export VERCEL_PROJECT_ID
export VERCEL_TOKEN

# Link without prompts
vercel link --yes --scope "$VERCEL_ORG_ID" || true

echo ""
echo "📦 Project linked:"
echo "   ORG:    $VERCEL_ORG_ID"
echo "   PROJECT:$VERCEL_PROJECT_ID"

# ---------- Set core Supabase env vars ----------
set_vercel_env "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
set_vercel_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"
set_vercel_env "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_ROLE_KEY"

# ---------- Site URL env vars ----------
set_vercel_env "NEXT_PUBLIC_APP_URL" "$APP_URL"
set_vercel_env "NEXT_PUBLIC_SITE_URL" "$APP_URL"
set_vercel_env "NEXT_PUBLIC_BASE_URL" "$APP_URL"
set_vercel_env "NODE_ENV" "production"

# ---------- Optional integrations (email, stripe, etc.) ----------
if [ -n "$RESEND_API_KEY" ]; then
  set_vercel_env "RESEND_API_KEY" "$RESEND_API_KEY"
fi

if [ -n "$STRIPE_SECRET_KEY" ]; then
  set_vercel_env "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY"
fi

if [ -n "$STRIPE_PUBLISHABLE_KEY" ]; then
  set_vercel_env "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$STRIPE_PUBLISHABLE_KEY"
fi

if [ -n "$STRIPE_WEBHOOK_SECRET" ]; then
  set_vercel_env "STRIPE_WEBHOOK_SECRET" "$STRIPE_WEBHOOK_SECRET"
fi

# ---------- PWA / Push Notification vars ----------
if [ -n "$VAPID_PUBLIC_KEY" ]; then
  set_vercel_env "NEXT_PUBLIC_VAPID_PUBLIC_KEY" "$VAPID_PUBLIC_KEY"
fi

if [ -n "$VAPID_PRIVATE_KEY" ]; then
  set_vercel_env "VAPID_PRIVATE_KEY" "$VAPID_PRIVATE_KEY"
fi

if [ -n "$VAPID_SUBJECT" ]; then
  set_vercel_env "VAPID_SUBJECT" "$VAPID_SUBJECT"
fi

# ---------- AWS / S3 vars ----------
if [ -n "$AWS_ACCESS_KEY_ID" ]; then
  set_vercel_env "AWS_ACCESS_KEY_ID" "$AWS_ACCESS_KEY_ID"
fi

if [ -n "$AWS_SECRET_ACCESS_KEY" ]; then
  set_vercel_env "AWS_SECRET_ACCESS_KEY" "$AWS_SECRET_ACCESS_KEY"
fi

if [ -n "$AWS_REGION" ]; then
  set_vercel_env "AWS_REGION" "$AWS_REGION"
fi

if [ -n "$AWS_S3_BUCKET" ]; then
  set_vercel_env "AWS_S3_BUCKET" "$AWS_S3_BUCKET"
fi

# ---------- OpenAI / AI vars ----------
if [ -n "$OPENAI_API_KEY" ]; then
  set_vercel_env "OPENAI_API_KEY" "$OPENAI_API_KEY"
fi

# ---------- Google Cloud vars ----------
if [ -n "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
  set_vercel_env "GOOGLE_APPLICATION_CREDENTIALS" "$GOOGLE_APPLICATION_CREDENTIALS"
fi

echo ""
echo "=================================================="
echo "✅ Vercel environment configuration complete"
echo "=================================================="
echo "If you want the worker to also trigger a deploy, run:"
echo "  vercel --prod --token \$VERCEL_TOKEN"
echo "=================================================="
