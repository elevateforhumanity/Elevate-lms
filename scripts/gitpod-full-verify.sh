#!/usr/bin/env bash
# ============================================================================
# GITPOD FULL VERIFICATION SCRIPT
# ============================================================================
# Enforces zero placeholders, zero TS errors, zero skips
# Hard-fail if anything is incomplete
# Run this before any deployment or handoff
# ============================================================================

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

RED=$'\033[0;31m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[1;33m'
BLUE=$'\033[0;34m'
NC=$'\033[0m'

PASS=0
FAIL=0
WARNINGS=0

hr() { echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
ok() { echo -e "${GREEN}✅ $*${NC}"; PASS=$((PASS+1)); }
warn() { echo -e "${YELLOW}⚠️  $*${NC}"; WARNINGS=$((WARNINGS+1)); }
bad() { echo -e "${RED}❌ $*${NC}"; FAIL=$((FAIL+1)); }

run() {
  local name="$1"
  shift
  echo -e "${BLUE}▶ ${name}${NC}"
  if "$@"; then
    ok "${name}"
  else
    bad "${name}"
    return 1
  fi
}

require_file() {
  local f="$1"
  if [[ ! -f "$f" ]]; then
    bad "Missing required file: $f"
    return 1
  fi
  return 0
}

require_dir() {
  local d="$1"
  if [[ ! -d "$d" ]]; then
    bad "Missing required directory: $d"
    return 1
  fi
  return 0
}

echo -e "${BLUE}🚀 Gitpod Full Verify (Hard-Fail)${NC}"
hr

# ============================================================================
# A) ENVIRONMENT CHECKS
# ============================================================================

echo -e "${BLUE}▶ Environment Checks${NC}"

run "Git repo present" test -d .git
run "pnpm available" command -v pnpm >/dev/null
run "Node available" command -v node >/dev/null

NODE_VERSION=$(node -v)
echo "  Node version: $NODE_VERSION"

# Env file must exist locally but never committed
if [[ ! -f ".env.local" ]]; then
  bad ".env.local is missing in this workspace. Run: bash scripts/setup-env-by-branch.sh"
  FAIL=$((FAIL+1))
else
  ok ".env.local exists"
fi

# Verify .env.local is gitignored
if grep -qE '(^|/)\.env\.local$' .gitignore; then
  ok ".env.local is gitignored"
else
  bad ".env.local not in .gitignore"
  FAIL=$((FAIL+1))
fi

# Optional: enforce branch env system if script exists
if [[ -f "scripts/setup-env-by-branch.sh" ]]; then
  ok "setup-env-by-branch.sh exists"
else
  warn "scripts/setup-env-by-branch.sh not found (ok if you don't use branch envs)"
fi

hr

# ============================================================================
# B) PLACEHOLDER DETECTION
# ============================================================================

echo -e "${BLUE}▶ Placeholder / Mock / TODO scan (hard-fail)${NC}"

# These are common "do not ship" markers
PATTERNS=(
  "G-XXXXXXXXXX"
  "PLACEHOLDER"
  "lorem ipsum"
  "example.com"
  "changeme"
  "YOUR_API_KEY"
  "YOUR_KEY"
  "GET_FROM_"
  "REPLACE_WITH_"
  "TODO:"
  "FIXME"
)

# We allow TODOs in docs, but NOT in app/components/lib (production code)
PROD_DIRS=(app components lib lms-data)

FOUND=0
for dir in "${PROD_DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    for p in "${PATTERNS[@]}"; do
      if grep -RIn --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist \
        --exclude='*.md' --exclude='*.txt' --exclude='*.log' --exclude='*.example' \
        -e "$p" "$dir" >/tmp/placeholder_hits.txt 2>/dev/null; then
        if [[ -s /tmp/placeholder_hits.txt ]]; then
          bad "Found forbidden pattern in ${dir}: '${p}'"
          cat /tmp/placeholder_hits.txt | head -10
          FOUND=1
          FAIL=$((FAIL+1))
          break
        fi
      fi
    done
  fi
  [[ "$FOUND" -eq 0 ]] || break
done

# Block mock/sample usage in production code
if [[ "$FOUND" -eq 0 ]]; then
  if grep -RIn --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist \
    --exclude='*.md' --exclude='*.txt' --exclude='*.log' --exclude='*.example' \
    -E "\bmock[A-Za-z0-9_]*\b|\bsample[A-Za-z0-9_]*\b" app components lib >/tmp/mock_hits.txt 2>/dev/null; then
    if [[ -s /tmp/mock_hits.txt ]]; then
      bad "Found mock/sample indicators in production code:"
      cat /tmp/mock_hits.txt | head -10
      FOUND=1
      FAIL=$((FAIL+1))
    fi
  fi
fi

if [[ "$FOUND" -eq 0 ]]; then
  ok "No placeholders/mock/sample/TODO found in production code"
fi

hr

# ============================================================================
# C) TEST/DEBUG ROUTES
# ============================================================================

echo "🧪 C) Test/Debug Route Detection"
echo "---------------------------------"

TEST_ROUTES=$(find app -type f -path "*/api/*" | grep -E "(test|dev|sandbox|tmp|debug)" || true)

if [ ! -z "$TEST_ROUTES" ]; then
    echo "⚠️  Found test/debug routes:"
    echo "$TEST_ROUTES"
    WARNINGS=$((WARNINGS + 1))
else
    echo "✓ No test/debug routes found"
fi

echo ""

# ============================================================================
# L) TYPESCRIPT + LINT + BUILD (NO SKIPPING)
# ============================================================================

echo -e "${BLUE}▶ TypeScript / Lint / Build (hard-fail)${NC}"

# Enforce ignoreBuildErrors is NOT true
if grep -q "ignoreBuildErrors:\s*true" next.config.mjs 2>/dev/null; then
  bad "next.config.mjs is set to ignoreBuildErrors: true (not allowed)"
  FAIL=$((FAIL+1))
else
  ok "TypeScript build errors are not ignored"
fi

echo -e "${BLUE}▶ Installing dependencies...${NC}"
if pnpm -s install 2>&1 | tee /tmp/install.log; then
  ok "Dependencies installed"
else
  bad "Dependency installation failed"
  tail -20 /tmp/install.log
  FAIL=$((FAIL+1))
fi

echo -e "${BLUE}▶ Running typecheck...${NC}"
if pnpm -s typecheck 2>&1 | tee /tmp/typecheck.log; then
  ok "TypeScript type check passed (0 errors)"
else
  bad "TypeScript type check failed"
  tail -30 /tmp/typecheck.log
  FAIL=$((FAIL+1))
fi

echo -e "${BLUE}▶ Running lint...${NC}"
if pnpm -s lint 2>&1 | tee /tmp/lint.log; then
  ok "Lint check passed (0 errors)"
else
  bad "Lint check failed"
  tail -30 /tmp/lint.log
  FAIL=$((FAIL+1))
fi

echo -e "${BLUE}▶ Running production build...${NC}"
if pnpm -s build 2>&1 | tee /tmp/build.log; then
  ok "Production build succeeded"
else
  bad "Production build failed"
  tail -50 /tmp/build.log
  FAIL=$((FAIL+1))
fi

hr

# ============================================================================
# G) COURSE DATA VERIFICATION
# ============================================================================

echo -e "${BLUE}▶ LMS Course completeness${NC}"

if require_dir "lms-data/courses" && require_file "lms-data/courses/index.ts"; then
  COURSE_FILES_COUNT="$(find lms-data/courses -maxdepth 1 -type f -name 'program-*.ts' | wc -l | tr -d ' ')"
  
  # count imports referencing program-* in index.ts
  IMPORTED_COUNT="$(grep -E "from \"\.\/program-" lms-data/courses/index.ts 2>/dev/null | wc -l | tr -d ' ')"
  
  echo "  Course files: ${COURSE_FILES_COUNT}"
  echo "  Imported lines: ${IMPORTED_COUNT}"
  
  if [[ "$COURSE_FILES_COUNT" -le 0 ]]; then
    bad "No course files found in lms-data/courses (program-*.ts)"
    FAIL=$((FAIL+1))
  elif [[ "$IMPORTED_COUNT" -lt "$COURSE_FILES_COUNT" ]]; then
    bad "Not all course files are imported into lms-data/courses/index.ts"
    echo "  Missing approx: $((COURSE_FILES_COUNT - IMPORTED_COUNT))"
    FAIL=$((FAIL+1))
  else
    ok "Course files appear fully imported"
  fi
  
  # Optional: verify index exports allCourses array exists
  if grep -q "allCourses" lms-data/courses/index.ts; then
    ok "allCourses array exists"
  else
    warn "allCourses array not found in index.ts"
  fi
fi

hr

# ============================================================================
# H) PWA VERIFICATION
# ============================================================================

echo -e "${BLUE}▶ PWA implementation checks${NC}"

if require_file "public/manifest.json"; then
  # Ensure manifest references icons that exist
  if require_file "public/icon-192.png" && require_file "public/icon-512.png"; then
    ok "Manifest + required icons exist"
  fi
  
  # Confirm maskable icons if manifest references them
  if grep -q "maskable" public/manifest.json; then
    if [[ -f "public/icon-192-maskable.png" ]] && [[ -f "public/icon-512-maskable.png" ]]; then
      ok "Maskable icons exist"
    else
      warn "Manifest references maskable icons but files missing"
    fi
  fi
fi

# True PWA requires a service worker strategy
PWA_OK=0

if grep -q "\"next-pwa\"" package.json 2>/dev/null; then PWA_OK=1; fi
if [[ -f "public/sw.js" || -f "public/service-worker.js" ]]; then PWA_OK=1; fi
if grep -RIn --exclude-dir=node_modules --exclude-dir=.next \
  -E "serviceWorker\.register|navigator\.serviceWorker" app components >/dev/null 2>&1; then
  PWA_OK=1
fi

if [[ "$PWA_OK" -ne 1 ]]; then
  warn "PWA service worker not detected (next-pwa, sw.js, or SW registration)"
  echo "  Fix options:"
  echo "    - Add next-pwa and configure in next.config.mjs"
  echo "    - Or add public/sw.js + register it in a client component"
else
  ok "PWA service worker implementation detected"
fi

hr

# ============================================================================
# I) SEO VERIFICATION
# ============================================================================

echo -e "${BLUE}▶ SEO essentials${NC}"

if require_file "public/robots.txt"; then
  ok "robots.txt exists"
fi

# sitemap can be in public or generated route
if [[ -f "public/sitemap.xml" ]]; then
  ok "public/sitemap.xml exists"
else
  # check for Next.js sitemap route
  if find app -maxdepth 3 -type f -name "sitemap.ts" -o -name "sitemap.xml" 2>/dev/null | grep -q "app"; then
    ok "Sitemap route found in app/"
  else
    warn "Missing sitemap (public/sitemap.xml or app sitemap route)"
  fi
fi

# robots should not reference missing sitemaps
if [[ -f "public/robots.txt" ]]; then
  if grep -q "sitemap-programs.xml" public/robots.txt && [[ ! -f "public/sitemap-programs.xml" ]]; then
    warn "robots.txt references sitemap-programs.xml but file is missing"
  fi
  if grep -q "sitemap-blog.xml" public/robots.txt && [[ ! -f "public/sitemap-blog.xml" ]]; then
    warn "robots.txt references sitemap-blog.xml but file is missing"
  fi
  ok "robots.txt sitemap references checked"
fi

hr

# ============================================================================
# J) SECURITY CHECKS
# ============================================================================

echo "🔒 J) Security Checks"
echo "---------------------"

# Check for exposed secrets
SECRET_PATTERNS=(
    "sk_live_"
    "sk_test_"
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    "-----BEGIN PRIVATE KEY-----"
)

SECRETS_FOUND=0

for pattern in "${SECRET_PATTERNS[@]}"; do
    RESULTS=$(grep -RIn --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
        --exclude="*.md" --exclude="*.example" \
        -e "$pattern" . 2>/dev/null || true)
    
    if [ ! -z "$RESULTS" ]; then
        echo "❌ Potential secret exposed: $pattern"
        SECRETS_FOUND=$((SECRETS_FOUND + 1))
    fi
done

if [ $SECRETS_FOUND -eq 0 ]; then
    echo "✓ No exposed secrets detected"
else
    echo "❌ Found $SECRETS_FOUND potential secret exposures"
    FAILED=$((FAILED + 1))
fi

echo ""

# ============================================================================
# K) DATABASE MIGRATIONS
# ============================================================================

echo "🗄️  K) Database Migrations"
echo "--------------------------"

MIGRATION_FILES=$(find supabase -name "*.sql" -type f 2>/dev/null | wc -l)
echo "✓ Found $MIGRATION_FILES SQL migration files"

if [ $MIGRATION_FILES -eq 0 ]; then
    echo "⚠️  No migration files found"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""

# ============================================================================
# FINAL REPORT
# ============================================================================

hr
echo -e "${GREEN}📊 VERIFICATION REPORT${NC}"
hr
echo ""
echo "Checks completed:"
echo "  - Environment checks"
echo "  - Placeholder detection"
echo "  - Test route detection"
echo "  - Course data verification"
echo "  - PWA verification"
echo "  - SEO verification"
echo "  - Security checks"
echo "  - Database migrations"
echo "  - TypeScript type check"
echo "  - Lint check"
echo "  - Production build"
echo ""
echo "Results:"
echo -e "  ${GREEN}✅ Passed: ${PASS}${NC}"
echo -e "  ${RED}❌ Failed: ${FAIL}${NC}"
echo -e "  ${YELLOW}⚠️  Warnings: ${WARNINGS}${NC}"
echo ""

if [ $FAIL -gt 0 ]; then
    echo -e "${RED}❌ VERIFICATION FAILED - Fix errors above before deployment${NC}"
    echo ""
    echo "Gitpod must:"
    echo "  1. Review each failure above"
    echo "  2. Fix within existing code structure (no rewrites)"
    echo "  3. Re-run: bash scripts/gitpod-full-verify.sh"
    echo "  4. Loop until all checks pass"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  VERIFICATION PASSED WITH WARNINGS - Review warnings above${NC}"
    exit 0
else
    echo -e "${GREEN}🎉 ALL CHECKS PASSED — PRODUCTION VERIFIED${NC}"
    echo -e "${GREEN}No skips. No placeholders. No TS errors. Build clean.${NC}"
    exit 0
fi
