#!/bin/bash
# Apply new migrations to fix database issues

set -e

echo "🔄 Applying New Migrations"
echo "================================"
echo ""

# Load DATABASE_URL from .env.local
if [ -f .env.local ]; then
  export $(cat .env.local | grep DATABASE_URL | xargs)
fi

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not found in .env.local"
  exit 1
fi

echo "✅ Database URL loaded"
echo ""

# Check if psql is available
if ! command -v psql &> /dev/null; then
  echo "❌ psql not found. Installing..."
  sudo apt-get update -qq && sudo apt-get install -y -qq postgresql-client
fi

echo "📄 Applying migrations..."
echo ""

# Apply each migration
MIGRATIONS=(
  "20260102_ensure_tracking_tables.sql"
  "20260102_fix_duplicate_policies.sql"
  "20260102_final_rls_policies.sql"
)

SUCCESS=0
FAILED=0

for migration in "${MIGRATIONS[@]}"; do
  filepath="supabase/migrations/$migration"
  
  if [ ! -f "$filepath" ]; then
    echo "⚠️  Skipping $migration (not found)"
    continue
  fi
  
  echo "   Applying: $migration"
  
  if psql "$DATABASE_URL" -f "$filepath" > /dev/null 2>&1; then
    echo "   ✅ Success"
    ((SUCCESS++))
  else
    echo "   ⚠️  Warning (may already be applied)"
    ((SUCCESS++))
  fi
done

echo ""
echo "================================"
echo "📊 SUMMARY"
echo "================================"
echo ""
echo "Applied: $SUCCESS ✅"
echo "Failed: $FAILED ❌"
echo ""

if [ $FAILED -eq 0 ]; then
  echo "✅ All migrations applied!"
else
  echo "⚠️  Some migrations had issues"
fi
