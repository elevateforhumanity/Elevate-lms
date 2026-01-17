#!/bin/bash
set -e

echo "=== Netlify Build Script ==="
echo "Checking environment variables..."

# Check if NEXT_PUBLIC vars are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "ERROR: NEXT_PUBLIC_SUPABASE_URL is not set!"
  exit 1
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "ERROR: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set!"
  exit 1
fi

echo "✓ NEXT_PUBLIC_SUPABASE_URL is set"
echo "✓ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"

# Run the build with webpack (not Turbopack)
echo "Running pnpm build with webpack..."
NEXT_TURBOPACK=0 pnpm build

echo "=== Build Complete ==="
