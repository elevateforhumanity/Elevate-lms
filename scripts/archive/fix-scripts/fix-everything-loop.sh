#!/bin/bash

# COMPREHENSIVE FIX EVERYTHING LOOP
# Loops until 100% fixed with zero errors

set -e

LOOP_COUNT=0
MAX_LOOPS=50
ERRORS_FOUND=1

echo "🔄 STARTING COMPREHENSIVE FIX LOOP"
echo "=================================="

while [ $ERRORS_FOUND -ne 0 ] && [ $LOOP_COUNT -lt $MAX_LOOPS ]; do
    LOOP_COUNT=$((LOOP_COUNT + 1))
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🔄 LOOP $LOOP_COUNT of $MAX_LOOPS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    ERRORS_FOUND=0
    
    # 1. Clean everything
    echo "🧹 Step 1: Cleaning all cache and old builds..."
    rm -rf dist node_modules/.vite node_modules/.cache .cache .vite 2>/dev/null || true
    echo "✅ Clean complete"
    
    # 2. Install dependencies
    echo "📦 Step 2: Installing dependencies..."
    if ! pnpm install --frozen-lockfile 2>&1 | tee install.log; then
        echo "❌ Install failed"
        ERRORS_FOUND=$((ERRORS_FOUND + 1))
        cat install.log
    else
        echo "✅ Install complete"
    fi
    
    # 3. Fix TypeScript errors
    echo "🔧 Step 3: Checking TypeScript..."
    if ! pnpm typecheck 2>&1 | tee typecheck.log; then
        echo "⚠️  TypeScript errors found"
        ERROR_COUNT=$(grep -c "error TS" typecheck.log || echo 0)
        echo "   Found $ERROR_COUNT TypeScript errors"
        ERRORS_FOUND=$((ERRORS_FOUND + ERROR_COUNT))
    else
        echo "✅ TypeScript check passed"
    fi
    
    # 4. Fix ESLint errors
    echo "🔧 Step 4: Checking ESLint..."
    if ! pnpm lint 2>&1 | tee lint.log; then
        echo "⚠️  ESLint errors found"
        ERROR_COUNT=$(grep -c "error" lint.log || echo 0)
        echo "   Found $ERROR_COUNT ESLint errors"
        ERRORS_FOUND=$((ERRORS_FOUND + ERROR_COUNT))
        
        # Try auto-fix
        echo "   Attempting auto-fix..."
        pnpm lint:fix 2>&1 || true
    else
        echo "✅ ESLint check passed"
    fi
    
    # 5. Build
    echo "🏗️  Step 5: Building..."
    if ! pnpm build 2>&1 | tee build.log; then
        echo "❌ Build failed"
        ERRORS_FOUND=$((ERRORS_FOUND + 1))
        tail -50 build.log
    else
        echo "✅ Build complete"
        
        # Check build output
        if [ ! -f "dist/index.html" ]; then
            echo "❌ dist/index.html not found"
            ERRORS_FOUND=$((ERRORS_FOUND + 1))
        else
            echo "✅ dist/index.html exists"
            
            # Verify correct JS reference
            JS_REF=$(grep -o 'src="/assets/index[^"]*"' dist/index.html || echo "NOT_FOUND")
            echo "   JavaScript reference: $JS_REF"
            
            if [ "$JS_REF" = "NOT_FOUND" ]; then
                echo "❌ No JavaScript reference found in index.html"
                ERRORS_FOUND=$((ERRORS_FOUND + 1))
            fi
        fi
    fi
    
    # 6. Test preview
    echo "🧪 Step 6: Testing preview server..."
    pnpm preview &
    PREVIEW_PID=$!
    sleep 5
    
    if curl -s http://localhost:8080 > /dev/null; then
        echo "✅ Preview server responding"
        
        # Check if page loads
        PAGE_CONTENT=$(curl -s http://localhost:8080)
        if echo "$PAGE_CONTENT" | grep -q '<div id="root">'; then
            echo "✅ Root div found"
        else
            echo "❌ Root div not found"
            ERRORS_FOUND=$((ERRORS_FOUND + 1))
        fi
    else
        echo "❌ Preview server not responding"
        ERRORS_FOUND=$((ERRORS_FOUND + 1))
    fi
    
    kill $PREVIEW_PID 2>/dev/null || true
    
    # 7. Summary
    echo ""
    echo "📊 LOOP $LOOP_COUNT SUMMARY"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    if [ $ERRORS_FOUND -eq 0 ]; then
        echo "✅ ZERO ERRORS FOUND - 100% FIXED!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        break
    else
        echo "⚠️  Errors remaining: $ERRORS_FOUND"
        echo "   Continuing to next loop..."
    fi
    
    sleep 2
done

echo ""
echo "=================================="
if [ $ERRORS_FOUND -eq 0 ]; then
    echo "🎉 SUCCESS! Everything is 100% fixed!"
    echo "   Total loops: $LOOP_COUNT"
else
    echo "⚠️  Reached max loops ($MAX_LOOPS) with $ERRORS_FOUND errors remaining"
fi
echo "=================================="
