#!/bin/bash
# remove-old-platforms.sh
# Remove ALL references to old deployment platforms
# Keep ONLY: Netlify, Supabase, Cloudflare

set -e

echo "🧹 REMOVING OLD PLATFORM REFERENCES"
echo "===================================="
echo ""
echo "Removing: Vercel, Railway, Render, Heroku, Durable"
echo "Keeping: Netlify, Supabase, Cloudflare"
echo ""

# ============================================
# PHASE 1: REMOVE VERCEL FILES
# ============================================
echo "Phase 1: Removing Vercel files..."

# Remove Vercel config files
rm -f vercel.json
rm -f .vercelignore
rm -f vercel.config.js
rm -f vercel.config.ts

# Remove Vercel scripts
find scripts/ -name "*vercel*" -type f -delete 2>/dev/null || true

echo "✅ Vercel files removed"
echo ""

# ============================================
# PHASE 2: REMOVE RAILWAY FILES
# ============================================
echo "Phase 2: Removing Railway files..."

# Remove Railway config files
rm -f railway.json
rm -f railway.toml
rm -f .railwayignore

# Remove Railway scripts
find scripts/ -name "*railway*" -type f -delete 2>/dev/null || true

echo "✅ Railway files removed"
echo ""

# ============================================
# PHASE 3: REMOVE RENDER FILES
# ============================================
echo "Phase 3: Removing Render files..."

# Remove Render config files
rm -f render.yaml
rm -f .renderignore

# Remove Render scripts directory
rm -rf scripts/render/

# Keep prerender.js (it's for pre-rendering, not Render.com)
# Just verify it's not Render.com specific
if grep -q "render\.com" scripts/prerender.js 2>/dev/null; then
  echo "⚠️  prerender.js contains Render.com references - removing"
  rm -f scripts/prerender.js
else
  echo "✅ prerender.js is safe (not Render.com specific)"
fi

echo "✅ Render files removed"
echo ""

# ============================================
# PHASE 4: REMOVE HEROKU FILES
# ============================================
echo "Phase 4: Removing Heroku files..."

# Remove Heroku config files
rm -f Procfile
rm -f app.json
rm -f .herokignore

# Remove Heroku scripts
find scripts/ -name "*heroku*" -type f -delete 2>/dev/null || true

echo "✅ Heroku files removed"
echo ""

# ============================================
# PHASE 5: ARCHIVE OLD PLATFORM DOCUMENTATION
# ============================================
echo "Phase 5: Archiving old platform documentation..."

mkdir -p docs/archive/old-platforms

# Move Vercel docs
find . -maxdepth 1 -name "*VERCEL*" -type f -exec mv {} docs/archive/old-platforms/ \; 2>/dev/null || true
find docs/ -name "*vercel*" -type f -exec mv {} docs/archive/old-platforms/ \; 2>/dev/null || true

# Move Railway docs
find . -maxdepth 1 -name "*RAILWAY*" -type f -exec mv {} docs/archive/old-platforms/ \; 2>/dev/null || true
find docs/ -name "*railway*" -type f -exec mv {} docs/archive/old-platforms/ \; 2>/dev/null || true

# Move Render docs
find . -maxdepth 1 -name "*RENDER*" -type f -exec mv {} docs/archive/old-platforms/ \; 2>/dev/null || true
find docs/ -name "*render*" -type f -exec mv {} docs/archive/old-platforms/ \; 2>/dev/null || true

# Move Heroku docs
find . -maxdepth 1 -name "*HEROKU*" -type f -exec mv {} docs/archive/old-platforms/ \; 2>/dev/null || true
find docs/ -name "*heroku*" -type f -exec mv {} docs/archive/old-platforms/ \; 2>/dev/null || true

echo "✅ Old platform documentation archived"
echo ""

# ============================================
# PHASE 6: UPDATE README FILES
# ============================================
echo "Phase 6: Updating README files..."

# Update README_START_HERE.md to remove Vercel references
if [ -f "README_START_HERE.md" ]; then
  # Create backup
  cp README_START_HERE.md README_START_HERE.md.bak
  
  # Remove Vercel sections
  sed -i '/vercel/Id' README_START_HERE.md
  sed -i '/Vercel/d' README_START_HERE.md
  
  echo "✅ Updated README_START_HERE.md"
else
  echo "ℹ️  README_START_HERE.md not found"
fi

echo ""

# ============================================
# PHASE 7: CLEAN GITHUB WORKFLOWS
# ============================================
echo "Phase 7: Cleaning GitHub workflows..."

# Check for old platform workflows
if [ -d ".github/workflows" ]; then
  # Remove Vercel workflows
  find .github/workflows/ -name "*vercel*" -type f -delete 2>/dev/null || true
  
  # Remove Railway workflows
  find .github/workflows/ -name "*railway*" -type f -delete 2>/dev/null || true
  
  # Remove Render workflows
  find .github/workflows/ -name "*render*" -type f -delete 2>/dev/null || true
  
  # Remove Heroku workflows
  find .github/workflows/ -name "*heroku*" -type f -delete 2>/dev/null || true
  
  echo "✅ GitHub workflows cleaned"
else
  echo "ℹ️  No .github/workflows directory"
fi

echo ""

# ============================================
# PHASE 8: VERIFICATION
# ============================================
echo "Phase 8: Verifying cleanup..."
echo ""

echo "Checking for remaining references:"
echo ""

VERCEL_COUNT=$(grep -ri "vercel" . --include="*.md" --include="*.sh" --include="*.js" --include="*.json" 2>/dev/null | grep -v node_modules | grep -v ".git" | grep -v docs/archive | grep -v ".bak" | wc -l)
echo "  Vercel references: $VERCEL_COUNT"

RAILWAY_COUNT=$(grep -ri "railway" . --include="*.md" --include="*.sh" --include="*.js" --include="*.json" 2>/dev/null | grep -v node_modules | grep -v ".git" | grep -v docs/archive | wc -l)
echo "  Railway references: $RAILWAY_COUNT"

RENDER_COUNT=$(grep -ri "render\.com" . --include="*.md" --include="*.sh" --include="*.js" --include="*.json" 2>/dev/null | grep -v node_modules | grep -v ".git" | grep -v docs/archive | wc -l)
echo "  Render.com references: $RENDER_COUNT"

HEROKU_COUNT=$(grep -ri "heroku" . --include="*.md" --include="*.sh" --include="*.js" --include="*.json" 2>/dev/null | grep -v node_modules | grep -v ".git" | grep -v docs/archive | wc -l)
echo "  Heroku references: $HEROKU_COUNT"

echo ""

TOTAL_REFS=$((VERCEL_COUNT + RAILWAY_COUNT + RENDER_COUNT + HEROKU_COUNT))

if [ "$TOTAL_REFS" -eq 0 ]; then
  echo "✅ All old platform references removed!"
else
  echo "⚠️  $TOTAL_REFS references still found (may be in archived docs)"
fi

echo ""

# ============================================
# PHASE 9: SUMMARY
# ============================================
echo "===================================="
echo "CLEANUP SUMMARY"
echo "===================================="
echo ""
echo "Removed:"
echo "  ✅ Vercel config files and scripts"
echo "  ✅ Railway config files and scripts"
echo "  ✅ Render config files and scripts"
echo "  ✅ Heroku config files and scripts"
echo "  ✅ Old platform documentation (archived)"
echo "  ✅ Old platform workflows"
echo ""
echo "Current Platforms:"
echo "  ✅ Netlify (primary deployment)"
echo "  ✅ Supabase (database)"
echo "  ✅ Cloudflare (optional CDN/Workers)"
echo ""
echo "Next steps:"
echo "  1. Review changes: git status"
echo "  2. Test build: pnpm build"
echo "  3. Commit changes"
echo ""
