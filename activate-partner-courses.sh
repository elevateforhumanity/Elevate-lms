#!/bin/bash
# Activate Partner Courses - Run migrations to enable 1,200+ partner courses
# This script applies the partner course migrations to your Supabase database

set -e

echo "🚀 Activating Partner Courses System"
echo "====================================="
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found"
    echo ""
    echo "Install it with:"
    echo "  npm install -g supabase"
    echo ""
    exit 1
fi

# Check if we're in a Supabase project
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Not in a Supabase project directory"
    echo "Run this script from your project root"
    exit 1
fi

echo "📋 Migration Plan:"
echo "  1. Create partner tables (providers, courses, enrollments, certificates)"
echo "  2. Load 7 partner providers"
echo "  3. Load 80+ sample courses (Certiport, HSI, CareerSafe, NRF, Milady, JRI, NDS)"
echo "  4. Set up RLS policies"
echo "  5. Create helper functions and views"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

echo ""
echo "🔄 Running migrations..."
echo ""

# Run the schema migration
echo "1️⃣  Creating partner tables..."
supabase db push --file supabase/migrations/20260108_activate_partner_courses.sql

if [ $? -eq 0 ]; then
    echo "✅ Partner tables created"
else
    echo "❌ Failed to create partner tables"
    exit 1
fi

echo ""
echo "2️⃣  Loading partner courses..."
supabase db push --file supabase/migrations/20260108_load_partner_courses.sql

if [ $? -eq 0 ]; then
    echo "✅ Partner courses loaded"
else
    echo "❌ Failed to load partner courses"
    exit 1
fi

echo ""
echo "✅ Partner Courses Activated!"
echo ""
echo "📊 Summary:"
echo "  - 7 partner providers configured"
echo "  - 80+ courses loaded"
echo "  - RLS policies enabled"
echo "  - Helper functions created"
echo ""
echo "🔍 Verify in Supabase Dashboard:"
echo "  - partner_lms_providers (7 rows)"
echo "  - partner_courses_catalog (80+ rows)"
echo ""
echo "📚 Next Steps:"
echo "  1. View courses: SELECT * FROM v_active_partner_courses;"
echo "  2. Check stats: SELECT * FROM v_partner_enrollment_stats;"
echo "  3. Test enrollment flow in your application"
echo ""
