#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔎 LMS + PARTNER INTEGRATION CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# A) course index exists + has imports
test -f lms-data/courses/index.ts || { echo "❌ Missing lms-data/courses/index.ts"; exit 1; }

IMPORTS=$(grep -E "from \"\.\/program-" -n lms-data/courses/index.ts | wc -l | tr -d ' ')
COURSE_FILES=$(find lms-data/courses -maxdepth 1 -type f -name "program-*.ts" | wc -l | tr -d ' ')

echo "Course files found: $COURSE_FILES"
echo "Index imports found: $IMPORTS"
if [[ "$IMPORTS" -lt "$COURSE_FILES" ]]; then
  echo "❌ CRITICAL: index.ts is missing imports. Generate it, then re-run."
  echo "   Run: node scripts/generate-lms-course-index.mjs"
  exit 1
fi
echo "✅ index.ts imports look good"
echo ""

# B) confirm launch page exists (required for partner-link courses)
if [[ -f "app/lms/courses/[slug]/launch/page.tsx" ]]; then
  echo "✅ Launch route exists: app/lms/courses/[slug]/launch/page.tsx"
else
  echo "⚠️ Launch route missing: app/lms/courses/[slug]/launch/page.tsx"
  echo "   Partner-link courses should have a dedicated launch route."
fi
echo ""

# C) Scan course files for partner integration fields
echo "Checking partner-integrated courses…"
PARTNER_LINES=$(grep -RIn --exclude-dir=node_modules --exclude-dir=.next \
  -E "partnerUrl\s*:\s*['\"\`]|launchMode\s*:\s*['\"\`]|allowIframe\s*:\s*(true|false)" \
  lms-data/courses/program-*.ts 2>/dev/null || true)

if [[ -z "${PARTNER_LINES}" ]]; then
  echo "⚠️ No partner integration fields found in course files."
  echo "   If your partner courses are link-based, add partnerUrl/launchMode."
else
  echo "✅ Found partner integration fields in these files:"
  echo "$PARTNER_LINES" | sed 's/^/  - /'
fi
echo ""

# D) Verify partnerUrl values are not empty and are https
echo "Validating partnerUrl values…"
BAD_URLS=$(grep -RIn --exclude-dir=node_modules --exclude-dir=.next \
  -E "partnerUrl\s*:\s*['\"\`]\s*['\"\`]" lms-data/courses/program-*.ts 2>/dev/null || true)

NON_HTTPS=$(grep -RIn --exclude-dir=node_modules --exclude-dir=.next \
  -E "partnerUrl\s*:\s*['\"\`](?!https:\/\/)" lms-data/courses/program-*.ts 2>/dev/null || true)

if [[ -n "${BAD_URLS}" ]]; then
  echo "❌ partnerUrl is empty in:"
  echo "$BAD_URLS" | sed 's/^/  - /'
  exit 1
fi

if [[ -n "${NON_HTTPS}" ]]; then
  echo "⚠️ partnerUrl not https (check if intended):"
  echo "$NON_HTTPS" | sed 's/^/  - /'
fi

echo "✅ partnerUrl values look populated"
echo ""

# E) Placeholder/TODO scan inside course files only
echo "Scanning courses for placeholder/TODO/mock…"
COURSE_PLACEHOLDERS=$(grep -RIn --exclude-dir=node_modules --exclude-dir=.next \
  -E "TODO:|placeholder|mock|sample|lorem" lms-data/courses/program-*.ts 2>/dev/null || true)

if [[ -n "${COURSE_PLACEHOLDERS}" ]]; then
  echo "⚠️ Found placeholder/TODO/mock text in:"
  echo "$COURSE_PLACEHOLDERS" | sed 's/^/  - /'
  echo ""
  echo "✅ Not blocking, but should be cleaned for cloning/sales."
else
  echo "✅ No placeholder/TODO/mock text in course files"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ LMS integration check complete."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
