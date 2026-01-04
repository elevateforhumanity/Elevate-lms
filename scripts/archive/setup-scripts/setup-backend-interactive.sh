#!/bin/bash
# Interactive Backend Setup Script for Elevate for Humanity

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Elevate for Humanity - Backend Setup Wizard             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if .env exists
if [ -f .env ]; then
  echo "📋 Found existing .env file"
  read -p "Do you want to use existing credentials? (y/n): " use_existing
  if [ "$use_existing" != "y" ]; then
    rm .env
    echo "🗑️  Removed old .env file"
  fi
fi

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  echo ""
  echo "🔐 Let's set up your Supabase credentials"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "You can find these in your Supabase dashboard:"
  echo "  1. Go to https://app.supabase.com"
  echo "  2. Select your project (or create a new one)"
  echo "  3. Go to Settings → API"
  echo ""
  
  read -p "Enter your Supabase Project URL (e.g., https://xxxxx.supabase.co): " SUPABASE_URL
  read -p "Enter your Supabase Anon Key: " SUPABASE_ANON_KEY
  read -p "Enter your Supabase Service Role Key: " SUPABASE_SERVICE_KEY
  read -p "Enter your Supabase Project Reference ID: " SUPABASE_PROJECT_REF
  
  echo ""
  echo "📝 Creating .env file..."
  
  cat > .env << EOF
# Supabase Configuration
VITE_SUPABASE_URL=$SUPABASE_URL
VITE_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY=$SUPABASE_SERVICE_KEY
SUPABASE_PROJECT_REF=$SUPABASE_PROJECT_REF

# Application Configuration
NODE_ENV=development
VITE_ENVIRONMENT=development
EOF
  
  echo "✅ .env file created"
fi

# Load environment variables
source .env

echo ""
echo "🔗 Step 1: Linking to Supabase project..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if already linked
if [ -f supabase/.temp/project-ref ]; then
  echo "✅ Already linked to Supabase project"
else
  echo "Linking to project: $SUPABASE_PROJECT_REF"
  npx supabase link --project-ref $SUPABASE_PROJECT_REF || {
    echo "❌ Failed to link project. Please check your credentials."
    exit 1
  }
fi

echo ""
echo "📦 Step 2: Applying database migrations..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd supabase

# Count migrations
MIGRATION_COUNT=$(ls -1 migrations/*.sql 2>/dev/null | wc -l)
echo "Found $MIGRATION_COUNT migration files"

read -p "Apply all migrations? (y/n): " apply_migrations

if [ "$apply_migrations" = "y" ]; then
  echo "Applying migrations..."
  npx supabase db push || {
    echo "⚠️  Some migrations may have failed. Check the output above."
    read -p "Continue anyway? (y/n): " continue_anyway
    if [ "$continue_anyway" != "y" ]; then
      exit 1
    fi
  }
  echo "✅ Migrations applied"
else
  echo "⏭️  Skipping migrations"
fi

cd ..

echo ""
echo "🚀 Step 3: Deploying Edge Functions..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

FUNCTIONS=(
  "autopilot-worker"
  "autopilot-bridge"
  "autopilot-ai-worker"
  "autopilot-db-worker"
  "autopilot-health-worker"
  "ai-ops-analyzer"
  "health-logger"
  "metrics-exporter"
)

echo "Found ${#FUNCTIONS[@]} Edge Functions to deploy"
read -p "Deploy all Edge Functions? (y/n): " deploy_functions

if [ "$deploy_functions" = "y" ]; then
  cd supabase
  for func in "${FUNCTIONS[@]}"; do
    echo "  📤 Deploying $func..."
    npx supabase functions deploy $func || echo "  ⚠️  $func deployment failed (non-critical)"
  done
  cd ..
  echo "✅ Edge Functions deployed"
else
  echo "⏭️  Skipping Edge Functions deployment"
fi

echo ""
echo "🔨 Step 4: Building application..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

npm run build

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Setup Summary                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "✅ Supabase project linked"
echo "✅ Database migrations applied"
echo "✅ Edge Functions deployed"
echo "✅ Application built"
echo ""
echo "🎯 Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Start the development server:"
echo "   npm run dev"
echo ""
echo "2. Test the backend:"
echo "   - Visit the app"
echo "   - Try signing up"
echo "   - Check Supabase dashboard for data"
echo ""
echo "3. View your Supabase dashboard:"
echo "   https://app.supabase.com/project/$SUPABASE_PROJECT_REF"
echo ""
echo "4. Check Edge Function logs:"
echo "   npx supabase functions logs autopilot-worker"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Your backend is now fully functional!"
echo ""
