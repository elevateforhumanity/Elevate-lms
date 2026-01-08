#!/bin/bash
# Safe Activation Script - Checks before running migrations
# This script guides you through activation without duplicating tables

set -e

echo "🚀 Safe Partner Course Activation"
echo "=================================="
echo ""
echo "This script will guide you through:"
echo "  1. Checking existing database tables"
echo "  2. Creating tables only if needed"
echo "  3. Loading courses only if needed"
echo "  4. Verifying the setup"
echo ""

# Check if we have Supabase access
echo "📋 Step 1: Checking Supabase access..."
echo ""

if [ ! -f ".env.local" ]; then
    echo "❌ No .env.local file found"
    echo ""
    echo "You need Supabase credentials to continue."
    echo ""
    echo "Options:"
    echo "  1. Run: vercel env pull .env.local"
    echo "  2. Or manually create .env.local with Supabase credentials"
    echo "  3. See ACTIVATION_PLAN.md for detailed instructions"
    echo ""
    exit 1
fi

# Check if Supabase URL is set
SUPABASE_URL=$(grep "NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d'=' -f2)
if [ -z "$SUPABASE_URL" ]; then
    echo "❌ NEXT_PUBLIC_SUPABASE_URL not found in .env.local"
    echo ""
    echo "Add your Supabase credentials to .env.local"
    echo "See ACTIVATION_PLAN.md Step 5 for instructions"
    echo ""
    exit 1
fi

echo "✅ Supabase credentials found"
echo "   URL: $SUPABASE_URL"
echo ""

# Instructions for manual verification
echo "📋 Step 2: Check Existing Tables"
echo ""
echo "Before running migrations, check what exists in your database:"
echo ""
echo "1. Go to: https://supabase.com/dashboard"
echo "2. Select your project"
echo "3. Go to: SQL Editor"
echo "4. Copy and run: check-database-tables.sql"
echo ""
echo "This will show:"
echo "  - Which partner tables exist"
echo "  - How many courses are loaded"
echo "  - Whether it's safe to proceed"
echo ""

read -p "Have you checked the database? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Please check the database first, then run this script again."
    echo ""
    echo "Quick check:"
    echo "  1. Open: https://supabase.com/dashboard"
    echo "  2. Go to: Table Editor"
    echo "  3. Look for: partner_lms_providers, partner_courses_catalog"
    echo ""
    exit 0
fi

echo ""
echo "📋 Step 3: What did you find?"
echo ""
echo "Do the partner tables already exist?"
echo "  (partner_lms_providers, partner_courses_catalog, etc.)"
echo ""
read -p "Tables exist? (y/n) " -n 1 -r
echo ""

TABLES_EXIST=$REPLY

if [[ $TABLES_EXIST =~ ^[Yy]$ ]]; then
    echo ""
    echo "✅ Tables exist - will skip schema creation"
    echo ""
    
    echo "Do the tables have course data?"
    read -p "Courses already loaded? (y/n) " -n 1 -r
    echo ""
    
    COURSES_EXIST=$REPLY
    
    if [[ $COURSES_EXIST =~ ^[Yy]$ ]]; then
        echo ""
        echo "✅ Courses already loaded - activation complete!"
        echo ""
        echo "Your database already has:"
        echo "  - Partner tables"
        echo "  - Partner courses"
        echo ""
        echo "Next steps:"
        echo "  1. Configure .env.local (if not done)"
        echo "  2. Create test users"
        echo "  3. Test portals"
        echo ""
        echo "See: ACTIVATION_PLAN.md Steps 5-7"
        echo ""
        exit 0
    else
        echo ""
        echo "📦 Tables exist but no courses loaded"
        echo ""
        echo "Next step: Load courses"
        echo ""
        echo "To load courses:"
        echo "  1. Go to: Supabase Dashboard → SQL Editor"
        echo "  2. Copy: supabase/migrations/20260108_load_partner_courses.sql"
        echo "  3. Run the migration"
        echo "  4. Verify: SELECT COUNT(*) FROM partner_courses_catalog;"
        echo ""
        echo "Expected result: 80+ courses"
        echo ""
        exit 0
    fi
else
    echo ""
    echo "📦 Tables don't exist - need to create schema"
    echo ""
    echo "Next steps:"
    echo "  1. Create partner tables"
    echo "  2. Load partner courses"
    echo ""
    echo "To create tables:"
    echo "  1. Go to: Supabase Dashboard → SQL Editor"
    echo "  2. Copy: supabase/migrations/20260108_activate_partner_courses.sql"
    echo "  3. Run the migration"
    echo "  4. Verify in Table Editor"
    echo ""
    echo "Then to load courses:"
    echo "  1. Copy: supabase/migrations/20260108_load_partner_courses.sql"
    echo "  2. Run the migration"
    echo "  3. Verify: SELECT COUNT(*) FROM partner_courses_catalog;"
    echo ""
    echo "Or follow: ACTIVATION_PLAN.md Steps 2-3"
    echo ""
fi

echo ""
echo "📚 Full Guide: ACTIVATION_PLAN.md"
echo "🔍 Check Tables: check-database-tables.sql"
echo ""
