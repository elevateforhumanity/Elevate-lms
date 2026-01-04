#!/bin/bash
# Vercel Deployment Diagnostic Script

echo "🔍 VERCEL DEPLOYMENT DIAGNOSTIC"
echo "================================"
echo ""

# 1. Check Git Status
echo "1️⃣ Checking Git Status..."
git status --short
if [ $? -eq 0 ]; then
  echo "✅ Git is working"
else
  echo "❌ Git error detected"
fi
echo ""

# 2. Check Current Branch
echo "2️⃣ Current Branch..."
BRANCH=$(git branch --show-current)
echo "Branch: $BRANCH"
if [ "$BRANCH" = "main" ]; then
  echo "✅ On main branch"
else
  echo "⚠️  Not on main branch - Vercel may not deploy"
fi
echo ""

# 3. Check if changes are committed
echo "3️⃣ Checking for uncommitted changes..."
if [ -z "$(git status --porcelain)" ]; then
  echo "✅ All changes committed"
else
  echo "⚠️  Uncommitted changes found:"
  git status --short
fi
echo ""

# 4. Check last 3 commits
echo "4️⃣ Last 3 commits..."
git log --oneline -3
echo ""

# 5. Check if pushed to remote
echo "5️⃣ Checking remote sync..."
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
if [ "$LOCAL" = "$REMOTE" ]; then
  echo "✅ Local and remote are in sync"
else
  echo "⚠️  Local and remote are out of sync"
  echo "Local:  $LOCAL"
  echo "Remote: $REMOTE"
fi
echo ""

# 6. Check for missing image references
echo "6️⃣ Checking for missing image references..."
MISSING_IMAGES=0
while IFS= read -r line; do
  if [[ $line =~ src=\"([^\"]+)\" ]]; then
    IMG_PATH="${BASH_REMATCH[1]}"
    if [[ $IMG_PATH == /* ]]; then
      FULL_PATH="public${IMG_PATH}"
      if [ ! -f "$FULL_PATH" ]; then
        echo "❌ Missing: $IMG_PATH"
        ((MISSING_IMAGES++))
      fi
    fi
  fi
done < <(find app components -name "*.tsx" -o -name "*.jsx" 2>/dev/null | xargs grep -h "src=" 2>/dev/null)

if [ $MISSING_IMAGES -eq 0 ]; then
  echo "✅ No missing images detected"
else
  echo "⚠️  Found $MISSING_IMAGES missing image references"
fi
echo ""

# 7. Check for build errors
echo "7️⃣ Checking for potential build errors..."
if [ -f ".next/build-manifest.json" ]; then
  echo "✅ Previous build exists"
else
  echo "⚠️  No previous build found"
fi
echo ""

# 8. Check Vercel configuration
echo "8️⃣ Checking Vercel configuration..."
if [ -f ".vercel/project.json" ]; then
  echo "✅ Vercel project configured"
  cat .vercel/project.json
else
  echo "❌ No Vercel configuration found"
fi
echo ""

# 9. Check for route conflicts
echo "9️⃣ Checking for route conflicts..."
ROUTES=$(find app -name "page.tsx" -o -name "page.js" | sed 's|app/||' | sed 's|/page.tsx||' | sed 's|/page.js||')
echo "Found routes:"
echo "$ROUTES" | head -20
echo ""

# 10. Summary
echo "📊 SUMMARY"
echo "=========="
echo "Branch: $BRANCH"
echo "Uncommitted changes: $(git status --porcelain | wc -l)"
echo "Missing images: $MISSING_IMAGES"
echo ""
echo "🔧 RECOMMENDED ACTIONS:"
echo ""
if [ "$BRANCH" != "main" ]; then
  echo "1. Switch to main branch: git checkout main"
fi
if [ ! -z "$(git status --porcelain)" ]; then
  echo "2. Commit changes: git add . && git commit -m 'Update' && git push"
fi
if [ "$LOCAL" != "$REMOTE" ]; then
  echo "3. Push to remote: git push origin main"
fi
if [ $MISSING_IMAGES -gt 0 ]; then
  echo "4. Fix missing images or remove references"
fi
echo ""
echo "5. In Vercel Dashboard:"
echo "   - Go to Deployments"
echo "   - Click 'Redeploy' with 'Skip Build Cache' checked"
echo ""
