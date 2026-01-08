#!/bin/bash
# Validate SQL migration syntax

echo "🔍 Validating SQL Migration Syntax"
echo "===================================="
echo ""

ERRORS=0

# Function to check SQL file
check_sql_file() {
    local file=$1
    local name=$2
    
    echo "Checking: $name"
    
    # Check file exists
    if [ ! -f "$file" ]; then
        echo "  ❌ File not found"
        ERRORS=$((ERRORS + 1))
        return
    fi
    
    # Check for common syntax errors
    
    # 1. Unmatched parentheses
    OPEN=$(grep -o "(" "$file" | wc -l)
    CLOSE=$(grep -o ")" "$file" | wc -l)
    if [ "$OPEN" -ne "$CLOSE" ]; then
        echo "  ⚠️  Unmatched parentheses: $OPEN open, $CLOSE close"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✅ Parentheses balanced"
    fi
    
    # 2. Check for unterminated strings
    SINGLE_QUOTES=$(grep -o "'" "$file" | wc -l)
    if [ $((SINGLE_QUOTES % 2)) -ne 0 ]; then
        echo "  ⚠️  Odd number of single quotes (possible unterminated string)"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✅ Quotes balanced"
    fi
    
    # 3. Check for missing semicolons at statement ends
    if grep -q "CREATE TABLE.*[^;]$" "$file"; then
        echo "  ⚠️  Possible missing semicolon after CREATE TABLE"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✅ CREATE TABLE statements look good"
    fi
    
    # 4. Check for DO blocks
    if grep -q "DO \$\$" "$file"; then
        DO_COUNT=$(grep -c "DO \$\$" "$file")
        END_COUNT=$(grep -c "END \$\$" "$file")
        if [ "$DO_COUNT" -ne "$END_COUNT" ]; then
            echo "  ⚠️  Unmatched DO blocks: $DO_COUNT DO, $END_COUNT END"
            ERRORS=$((ERRORS + 1))
        else
            echo "  ✅ DO blocks balanced"
        fi
    fi
    
    # 5. Check for basic PostgreSQL keywords
    if ! grep -q "CREATE\|INSERT\|SELECT" "$file"; then
        echo "  ⚠️  No SQL statements found"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✅ Contains SQL statements"
    fi
    
    # 6. Count statements
    CREATE_COUNT=$(grep -c "CREATE TABLE\|CREATE POLICY\|CREATE FUNCTION\|CREATE INDEX" "$file")
    INSERT_COUNT=$(grep -c "INSERT INTO" "$file")
    echo "  📊 Statements: $CREATE_COUNT CREATE, $INSERT_COUNT INSERT"
    
    echo ""
}

# Check schema migration
check_sql_file "supabase/migrations/20260108_activate_partner_courses.sql" "Schema Migration"

# Check data migration
check_sql_file "supabase/migrations/20260108_load_partner_courses.sql" "Data Migration"

# Summary
echo "===================================="
if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "Migrations appear to be syntax-error free."
    echo "Ready to run in Supabase."
    echo ""
    exit 0
else
    echo "⚠️  Found $ERRORS potential issues"
    echo ""
    echo "Review the warnings above."
    echo "Most can be safely ignored if intentional."
    echo ""
    exit 1
fi
