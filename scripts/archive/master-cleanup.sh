#!/bin/bash
# master-cleanup.sh
# COMPLETE REPOSITORY CLEANUP - NO MANUAL INTERVENTION

set -e

echo "🚀 STARTING MASTER CLEANUP"
echo "================================"
echo ""

# PHASE 1: Remove Durable.co Files
echo "Phase 1: Removing Durable.co files..."
rm -f durable durable-*.js
rm -f DURABLE_*.md DURABLE_*.html
rm -f src/pages/Durable*.jsx src/pages/Durable*.tsx src/pages/ProgramsDurable.jsx
rm -f public/durable-landing.html
rm -f workers/*durable*.ts
echo "✅ Phase 1 complete"
echo ""

# PHASE 2: Remove Conflicting CSS
echo "Phase 2: Removing conflicting CSS..."
rm -f src/styles/docebo.css src/styles/hero-banner.css
rm -rf extracted-styles/
echo "✅ Phase 2 complete"
echo ""

# PHASE 3: Remove Old Bundles
echo "Phase 3: Removing old bundles..."
rm -f *.zip *.tar.gz
echo "✅ Phase 3 complete"
echo ""

# PHASE 4: Archive Documentation
echo "Phase 4: Archiving documentation..."
mkdir -p docs/archive/{completion-reports,deployment-guides,checklists,durable-docs}
mv *_COMPLETE.md *_SUMMARY.md *_REPORT.md *_STATUS.md docs/archive/completion-reports/ 2>/dev/null || true
mv DEPLOY_*.md DEPLOYMENT_*.md *_DEPLOYMENT_*.md NETLIFY_*.md docs/archive/deployment-guides/ 2>/dev/null || true
mv *_CHECKLIST.md *_GUIDE.md *_INSTRUCTIONS.md docs/archive/checklists/ 2>/dev/null || true
echo "✅ Phase 4 complete"
echo ""

# PHASE 5: Archive Scripts
echo "Phase 5: Archiving scripts..."
mkdir -p scripts/archive/{fix-scripts,setup-scripts,autopilot-scripts}
mv fix-*.sh *-fix-*.sh scripts/archive/fix-scripts/ 2>/dev/null || true
mv setup-*.sh bootstrap_*.sh scripts/archive/setup-scripts/ 2>/dev/null || true
mv *-autopilot*.sh autopilot-*.sh scripts/archive/autopilot-scripts/ 2>/dev/null || true
echo "✅ Phase 5 complete"
echo ""

# PHASE 6: Remove Duplicates
echo "Phase 6: Removing duplicate configs..."
[ -f .eslintrc.json ] && [ -f .eslintrc.cjs ] && rm -f .eslintrc.cjs
[ -f .prettierrc.json ] && [ -f .prettierrc ] && rm -f .prettierrc
echo "✅ Phase 6 complete"
echo ""

# PHASE 7: Clean Build Artifacts
echo "Phase 7: Cleaning build artifacts..."
rm -rf dist/
rm -rf supabase/.temp/* 2>/dev/null || true
echo "✅ Phase 7 complete"
echo ""

# PHASE 8: Update Domain References
echo "Phase 8: Updating domain references..."
if [ -f scripts/social-media-automation.js ]; then
  sed -i 's|elevateforhumanity\.durable\.co|elevateforhumanity.org|g' scripts/social-media-automation.js
fi
echo "✅ Phase 8 complete"
echo ""

# PHASE 9: Update main.tsx (remove docebo.css import)
echo "Phase 9: Updating main.tsx..."
if [ -f src/main.tsx ]; then
  sed -i "/import '\.\/styles\/docebo\.css'/d" src/main.tsx
fi
echo "✅ Phase 9 complete"
echo ""

# PHASE 10: Update HeroBanner.tsx (remove hero-banner.css import)
echo "Phase 10: Updating HeroBanner.tsx..."
if [ -f src/components/HeroBanner.tsx ]; then
  sed -i "/import '\.\.\/styles\/hero-banner\.css'/d" src/components/HeroBanner.tsx
fi
echo "✅ Phase 10 complete"
echo ""

# PHASE 11: Rebuild
echo "Phase 11: Rebuilding..."
pnpm install
pnpm lint || echo "⚠️ Lint warnings (non-fatal)"
pnpm build
echo "✅ Phase 11 complete"
echo ""

# PHASE 12: Verify
echo "Phase 12: Verifying cleanup..."
echo ""
echo "Checking for Durable.co files..."
DURABLE_FILES=$(find . -name "*durable*" -o -name "*Durable*" 2>/dev/null | grep -v node_modules | grep -v dist | grep -v docs/archive | wc -l)
echo "Found: $DURABLE_FILES files"

echo ""
echo "Checking for Durable.co references..."
DURABLE_REFS=$(grep -r "durable\.co" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | grep -v node_modules | grep -v dist | grep -v docs/archive | wc -l)
echo "Found: $DURABLE_REFS references"

echo ""
echo "Checking build size..."
du -sh dist/

echo ""
echo "================================"
echo "✅ MASTER CLEANUP COMPLETE"
echo "================================"
echo ""
echo "Summary:"
echo "  - Durable.co files: $DURABLE_FILES (should be 0)"
echo "  - Durable.co references: $DURABLE_REFS (should be 0)"
echo "  - Build size: $(du -sh dist/ | cut -f1)"
echo ""
echo "Next steps:"
echo "  1. Review changes: git status"
echo "  2. Test application: pnpm preview"
echo "  3. Commit changes: git add . && git commit -m 'Complete repository cleanup'"
echo ""
