#!/bin/bash
# Gitpod Environment Setup for Supabase Integration

echo "🔧 Setting up environment variables for Gitpod..."

# Check if .env.local exists
if [ -f ".env.local" ]; then
  echo "✅ .env.local already exists"
else
  echo "📝 Creating .env.local from .env.example..."
  
  if [ -f ".env.example" ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local"
  else
    echo "⚠️  .env.example not found, creating minimal .env.local..."
    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://3000-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}
NEXTAUTH_URL=https://3000-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}

# Node Environment
NODE_ENV=development
EOF
  fi
fi

# Set Gitpod-specific URLs if in Gitpod
if [ -n "$GITPOD_WORKSPACE_ID" ]; then
  echo "🌐 Detected Gitpod environment"
  
  # Get the workspace URL
  WORKSPACE_URL="https://3000-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
  
  echo "📍 Workspace URL: $WORKSPACE_URL"
  
  # Update .env.local with Gitpod URLs
  if grep -q "NEXT_PUBLIC_SITE_URL" .env.local; then
    sed -i "s|NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=$WORKSPACE_URL|" .env.local
    sed -i "s|NEXTAUTH_URL=.*|NEXTAUTH_URL=$WORKSPACE_URL|" .env.local
    echo "✅ Updated URLs for Gitpod"
  fi
fi

# Check for required Supabase variables
echo ""
echo "🔍 Checking Supabase configuration..."

if grep -q "NEXT_PUBLIC_SUPABASE_URL=$" .env.local || ! grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
  echo "⚠️  NEXT_PUBLIC_SUPABASE_URL is not set"
  echo "   Add your Supabase URL to .env.local"
fi

if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY=$" .env.local || ! grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
  echo "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"
  echo "   Add your Supabase anon key to .env.local"
fi

if grep -q "SUPABASE_SERVICE_ROLE_KEY=$" .env.local || ! grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
  echo "⚠️  SUPABASE_SERVICE_ROLE_KEY is not set"
  echo "   Add your Supabase service role key to .env.local"
fi

echo ""
echo "📖 To configure Supabase:"
echo "   1. Get your credentials from https://supabase.com/dashboard"
echo "   2. Edit .env.local and add your keys"
echo "   3. Restart the dev server"
echo ""
echo "✅ Environment setup complete!"
