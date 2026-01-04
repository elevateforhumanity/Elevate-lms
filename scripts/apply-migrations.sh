#!/bin/bash

# Apply Critical Migrations to Supabase
# Run this script to apply migrations 001-009 to your Supabase project

set -e

echo "🚀 Applying Critical Migrations to Supabase"
echo "==========================================="
echo ""

# Check for required env vars
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "❌ Error: Missing Supabase credentials"
  echo "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  exit 1
fi

# Extract project ref from URL
PROJECT_REF=$(echo $NEXT_PUBLIC_SUPABASE_URL | sed 's/https:\/\///' | cut -d'.' -f1)
echo "📍 Project: $PROJECT_REF"
echo ""

# Migrations to apply (in order)
MIGRATIONS=(
  "../002_multi_tenant_foundation.sql"
  "../003_workforce_reporting_views.sql"
  "../004_org_invites.sql"
  "../005_org_subscriptions.sql"
)

echo "📋 Migrations to apply:"
for migration in "${MIGRATIONS[@]}"; do
  echo "   - $migration"
done
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

echo ""
echo "🔧 Applying migrations..."
echo ""

for migration in "${MIGRATIONS[@]}"; do
  MIGRATION_FILE="supabase/$migration"
  
  if [ ! -f "$MIGRATION_FILE" ]; then
    echo "⚠️  Skipping $migration (file not found)"
    continue
  fi
  
  echo "📝 Applying: $migration"
  
  # Apply via Supabase Management API
  SQL_CONTENT=$(cat "$MIGRATION_FILE")
  
  # Use Supabase SQL Editor API
  curl -X POST "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/rpc/exec_sql" \
    -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"query\": $(echo "$SQL_CONTENT" | jq -Rs .)}" \
    --fail-with-body || {
      echo "   ❌ Failed to apply $migration"
      echo "   Apply manually via Supabase Dashboard SQL Editor"
      continue
    }
  
  echo "   ✅ Applied successfully"
done

echo ""
echo "==========================================="
echo "✅ Migration script complete"
echo ""
echo "Next steps:"
echo "1. Verify tables in Supabase Dashboard:"
echo "   https://supabase.com/dashboard/project/$PROJECT_REF/editor"
echo ""
echo "2. Check for these tables:"
echo "   - organizations"
echo "   - organization_users"
echo "   - organization_settings"
echo "   - org_invites"
echo "   - organization_subscriptions"
echo ""
echo "3. Verify RLS policies are enabled"
echo ""
echo "4. Run: pnpm build"
echo ""
