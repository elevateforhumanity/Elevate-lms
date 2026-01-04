#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 LMS AUDIT — HARD CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

test -d lms-data/courses || { echo "❌ Missing: lms-data/courses"; exit 1; }
test -f lms-data/courses/index.ts || { echo "❌ Missing: lms-data/courses/index.ts"; exit 1; }

# 1) Course file count vs imports
COURSE_FILES=$(find lms-data/courses -maxdepth 1 -type f -name "program-*.ts" | wc -l | tr -d ' ')
IMPORTED=$(grep -E "from \"\.\/program-" -n lms-data/courses/index.ts | wc -l | tr -d ' ')

echo "Course files (program-*.ts): $COURSE_FILES"
echo "Import lines in index.ts:    $IMPORTED"
echo ""

if [ "$IMPORTED" -lt "$COURSE_FILES" ]; then
  echo "❌ Not all course files appear imported in lms-data/courses/index.ts"
  echo "   Missing approx: $((COURSE_FILES - IMPORTED))"
  exit 1
fi
echo "✅ Import coverage looks OK"
echo ""

# 2) Run node-based deep audit
node scripts/lms-audit.mjs
