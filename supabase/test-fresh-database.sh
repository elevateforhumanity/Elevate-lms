#!/bin/bash
# Test Fresh Database Setup
# Run this script to test migrations on a fresh Supabase project

set -e

echo "🗄️  Testing Fresh Database Setup"
echo "================================"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL not set"
  echo "   Set it with: export DATABASE_URL='postgresql://...'"
  exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Test database connection
echo "📡 Testing database connection..."
if psql "$DATABASE_URL" -c "SELECT version();" > /dev/null 2>&1; then
  echo "✅ Database connection successful"
else
  echo "❌ Database connection failed"
  exit 1
fi
echo ""

# Count migration files
MIGRATION_COUNT=$(find supabase/migrations -name "*.sql" -not -path "*/archive/*" | wc -l)
echo "📁 Found $MIGRATION_COUNT migration files"
echo ""

# Run migrations in order
echo "🔄 Running migrations..."
MIGRATION_ERRORS=0
MIGRATION_SUCCESS=0

for file in $(find supabase/migrations -name "*.sql" -not -path "*/archive/*" | sort); do
  filename=$(basename "$file")
  echo -n "   Processing $filename... "
  
  if psql "$DATABASE_URL" -f "$file" > /dev/null 2>&1; then
    echo "✅"
    ((MIGRATION_SUCCESS++))
  else
    echo "❌"
    ((MIGRATION_ERRORS++))
    echo "      Error in $filename"
  fi
done

echo ""
echo "📊 Migration Results:"
echo "   Success: $MIGRATION_SUCCESS"
echo "   Errors: $MIGRATION_ERRORS"
echo ""

# Check for duplicate policies
echo "🔍 Checking for duplicate policies..."
DUPLICATE_POLICIES=$(psql "$DATABASE_URL" -t -c "
  SELECT policyname, COUNT(*) as count
  FROM pg_policies
  GROUP BY policyname
  HAVING COUNT(*) > 1
  ORDER BY count DESC;
" | grep -v "^$" | wc -l)

if [ "$DUPLICATE_POLICIES" -gt 0 ]; then
  echo "⚠️  Found $DUPLICATE_POLICIES duplicate policy names"
  psql "$DATABASE_URL" -c "
    SELECT policyname, COUNT(*) as count
    FROM pg_policies
    GROUP BY policyname
    HAVING COUNT(*) > 1
    ORDER BY count DESC;
  "
else
  echo "✅ No duplicate policy names"
fi
echo ""

# Check RLS status
echo "🔒 Checking RLS status..."
RLS_ENABLED=$(psql "$DATABASE_URL" -t -c "
  SELECT COUNT(*)
  FROM pg_tables
  WHERE schemaname = 'public'
  AND rowsecurity = true;
")

TOTAL_TABLES=$(psql "$DATABASE_URL" -t -c "
  SELECT COUNT(*)
  FROM pg_tables
  WHERE schemaname = 'public';
")

echo "   Tables with RLS: $RLS_ENABLED / $TOTAL_TABLES"
echo ""

# Check for missing tables
echo "📋 Checking core tables..."
CORE_TABLES=("profiles" "tenants" "licenses" "enrollments" "courses" "programs" "audit_logs" "employment_tracking" "credential_verification")
MISSING_TABLES=0

for table in "${CORE_TABLES[@]}"; do
  if psql "$DATABASE_URL" -t -c "SELECT to_regclass('public.$table');" | grep -q "$table"; then
    echo "   ✅ $table"
  else
    echo "   ❌ $table (MISSING)"
    ((MISSING_TABLES++))
  fi
done

echo ""

# Run seed data (optional)
if [ "$1" == "--seed" ]; then
  echo "🌱 Running seed data..."
  if [ -f "supabase/seeds/000_master_seed.sql" ]; then
    if psql "$DATABASE_URL" -f "supabase/seeds/000_master_seed.sql" > /dev/null 2>&1; then
      echo "✅ Seed data loaded successfully"
    else
      echo "❌ Seed data failed"
    fi
  else
    echo "⚠️  Master seed file not found"
  fi
  echo ""
fi

# Summary
echo "================================"
echo "📊 SUMMARY"
echo "================================"
echo ""

if [ "$MIGRATION_ERRORS" -eq 0 ] && [ "$MISSING_TABLES" -eq 0 ] && [ "$DUPLICATE_POLICIES" -eq 0 ]; then
  echo "✅ ALL TESTS PASSED"
  echo ""
  echo "Database is ready for production!"
  exit 0
else
  echo "⚠️  ISSUES FOUND"
  echo ""
  [ "$MIGRATION_ERRORS" -gt 0 ] && echo "   - $MIGRATION_ERRORS migration errors"
  [ "$MISSING_TABLES" -gt 0 ] && echo "   - $MISSING_TABLES missing core tables"
  [ "$DUPLICATE_POLICIES" -gt 0 ] && echo "   - $DUPLICATE_POLICIES duplicate policies"
  echo ""
  echo "Review issues before deploying to production."
  exit 1
fi
