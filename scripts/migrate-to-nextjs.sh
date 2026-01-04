#!/bin/bash
set -e

echo "🚀 Starting React to Next.js Migration"
echo "======================================"

# Step 1: Create Next.js app structure
echo "📁 Creating Next.js app structure..."
cd /workspaces/fix2/nextjs-site

# Step 2: Create directories for all pages
echo "📂 Creating page directories..."
mkdir -p app/programs
mkdir -p app/lms/courses
mkdir -p app/lms/lessons
mkdir -p app/certificates
mkdir -p app/verify
mkdir -p app/about
mkdir -p app/partners
mkdir -p app/support
mkdir -p app/community
mkdir -p app/connect
mkdir -p app/auth/login
mkdir -p app/auth/signup
mkdir -p app/legal
mkdir -p app/dashboard

# Step 3: Copy public assets
echo "📦 Copying public assets..."
cp -r ../public/* ./public/ 2>/dev/null || true

# Step 4: Create environment file
echo "⚙️  Creating environment configuration..."
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://api.elevateforhumanity.org
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
BACKEND_API_URL=https://api.elevateforhumanity.org
EOF

echo "✅ Next.js structure created"
echo "📝 Next step: Migrate React components to Next.js pages"
echo ""
echo "Pages to migrate: 67"
echo "Location: /workspaces/fix2/src/pages/*.tsx"
echo "Target: /workspaces/fix2/nextjs-site/app/**/page.tsx"
