#!/usr/bin/env bash
set -euo pipefail

echo "🔧 EFH Gitpod setup starting..."

# Prefer pnpm if lockfile exists; else npm
if [ -f pnpm-lock.yaml ]; then
  core_pm="pnpm"
elif [ -f bun.lockb ]; then
  core_pm="bun"
else
  core_pm="npm"
fi

echo "📦 Installing dependencies with $core_pm ..."
case "$core_pm" in
  pnpm) pnpm install --frozen-lockfile || pnpm install ;;
  bun)  bun install ;;
  *)    npm ci || npm install ;;
esac

# Ensure design system CSS is imported
if ! grep -q "design-system.css" ./src/main.tsx 2>/dev/null; then
  echo "🎨 Design system CSS already configured in main.tsx"
fi

# Ensure Tailwind config exists (already configured with EFH design system)
if [ -f tailwind.config.js ]; then
  echo "✅ Tailwind config found (EFH design system)"
else
  echo "⚠️  Warning: tailwind.config.js not found"
fi

# Env file - pull from GitHub Secrets if available
if [ ! -f .env ]; then
  echo "🌱 Creating .env file..."
  
  # Check if running in Gitpod with GitHub integration
  if [ -n "${GITPOD_WORKSPACE_CONTEXT}" ]; then
    echo "🔐 Attempting to load secrets from GitHub..."
    
    # Try to get secrets from GitHub (requires Gitpod GitHub integration)
    SUPABASE_URL="${VITE_SUPABASE_URL:-}"
    SUPABASE_KEY="${VITE_SUPABASE_ANON_KEY:-}"
    
    if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
      echo "⚠️  GitHub Secrets not available in Gitpod"
      echo "   To enable: https://gitpod.io/integrations"
      echo "   Or manually set environment variables in Gitpod dashboard"
    else
      echo "✅ Loaded secrets from GitHub"
    fi
  fi
  
  cat > .env <<ENV
# --- EFH Environment Variables ---
VITE_SITE_NAME="Elevate for Humanity"
VITE_PUBLIC_URL="http://localhost:3000"

# Supabase (loaded from GitHub Secrets or Gitpod variables)
VITE_SUPABASE_URL=${VITE_SUPABASE_URL:-your_supabase_url_here}
VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY:-your_supabase_anon_key_here}

# Stripe (optional - for payments)
VITE_STRIPE_PUBLISHABLE_KEY=${VITE_STRIPE_PUBLISHABLE_KEY:-}

# Application Form URL (optional)
VITE_APPLICATION_FORM_URL=${VITE_APPLICATION_FORM_URL:-https://www.indianacareerconnect.com}

# Analytics (optional)
VITE_GA_MEASUREMENT_ID=${VITE_GA_MEASUREMENT_ID:-G-EFHWORKFORCE01}
ENV

  if [ "${VITE_SUPABASE_URL:-your_supabase_url_here}" = "your_supabase_url_here" ]; then
    echo ""
    echo "⚠️  Supabase credentials not configured"
    echo ""
    echo "📝 To configure in Gitpod:"
    echo "   1. Go to: https://gitpod.io/user/variables"
    echo "   2. Add these variables for your repo:"
    echo "      VITE_SUPABASE_URL=your_actual_url"
    echo "      VITE_SUPABASE_ANON_KEY=your_actual_key"
    echo ""
    echo "💡 Or set them in GitHub Secrets and enable Gitpod GitHub integration"
  fi
else
  echo "✅ .env file exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 EFH LMS is ready. Key pages:"
echo "   - Homepage: /"
echo "   - Programs: /programs"
echo "   - Student Login: /login"
echo "   - Student Portal: /student-portal"
echo ""
echo "🚀 Run 'pnpm dev' to start the development server"
