#!/usr/bin/env bash
# efh-bundle-audit.sh
# Usage: bash efh-bundle-audit.sh <bundle.tar.gz>

set -euo pipefail

FILE="${1:-}"
if [[ -z "$FILE" || ! -f "$FILE" ]]; then
  echo "Usage: $0 <bundle.tar.gz>"; exit 1
fi

WORKDIR="$(mktemp -d)"
REPORT="bundle-audit-report.md"
START="$(date -Iseconds)"

log() { echo "[$(date +%H:%M:%S)] $*"; }

# ---------- 0) Preamble ----------
echo "# Bundle Audit Report" > "$REPORT"
{
  echo
  echo "- Started: $START"
  echo "- Bundle:  $FILE"
  echo
} >> "$REPORT"

# ---------- 1) Integrity & extraction ----------
log "Checking gzip/tar integrity..."
if gzip -t "$FILE"; then
  echo "✅ Gzip integrity: OK" >> "$REPORT"
else
  echo "❌ Gzip integrity: FAILED" >> "$REPORT"
fi

log "Extracting to $WORKDIR ..."
tar -xzf "$FILE" -C "$WORKDIR"

# Top dir (supports archives with/without a single root folder)
ROOT="$(find "$WORKDIR" -mindepth 1 -maxdepth 1 -type d | head -n1)"
[[ -z "$ROOT" ]] && ROOT="$WORKDIR"

# ---------- 2) File inventory ----------
log "Building file inventory..."
INVENTORY="$WORKDIR/_inventory.txt"
( cd "$ROOT" && find . -type f | sort ) > "$INVENTORY"

echo "## 1) File Inventory" >> "$REPORT"
echo "" >> "$REPORT"
echo '```' >> "$REPORT"
sed -n '1,500p' "$INVENTORY" >> "$REPORT"
[[ $(wc -l < "$INVENTORY") -gt 500 ]] && echo "... (truncated)" >> "$REPORT"
echo '```' >> "$REPORT"
echo "" >> "$REPORT"

# ---------- 3) Structure validation ----------
log "Validating expected structure..."
EXPECT_ERRORS=()

has() { grep -qE "$1" "$INVENTORY"; }

# Expected items (adjusted for actual structure)
req_paths=(
  "^./migrations/.*\.sql$"
  "^./edge-functions/email-dispatch/index.ts$"
  "^./edge-functions/webhook-dispatch/index.ts$"
  "^./edge-functions/ai-course-create/index.ts$"
  "^./edge-functions/grade-ai/index.ts$"
  "^./admin-pages/Launchpad.tsx$"
  "^./admin-pages/Community.tsx$"
  "^./admin-pages/Marketing.tsx$"
  "^./admin-pages/Assessments.tsx$"
  "^./admin-pages/Analytics.tsx$"
  "^./admin-pages/Integrations.tsx$"
  "^./utilities/assessments.ts$"
  "^./utilities/analyticsTracking.ts$"
)

# Migrations directory
MIGDIR=""
for d in ./migrations ./supabase/migrations ./db/migrations; do
  if grep -q "^$d/" "$INVENTORY"; then MIGDIR="$d"; break; fi
done
if [[ -z "$MIGDIR" ]]; then
  EXPECT_ERRORS+=("Migrations directory not found (expected ./migrations or similar).")
fi

# Verify expected files
for pat in "${req_paths[@]}"; do
  if ! grep -Eq "$pat" "$INVENTORY"; then
    EXPECT_ERRORS+=("Missing expected file matching pattern: $pat")
  fi
done

echo "## 2) Structure Validation" >> "$REPORT"
if [[ ${#EXPECT_ERRORS[@]} -eq 0 ]]; then
  echo "- ✅ Structure: All expected top-level files found." >> "$REPORT"
else
  for e in "${EXPECT_ERRORS[@]}"; do echo "- ❌ $e" >> "$REPORT"; done
fi
echo "" >> "$REPORT"

# ---------- 4) SQL migrations & RLS count ----------
echo "## 3) Migration Order & RLS Policies" >> "$REPORT"
if [[ -n "$MIGDIR" ]]; then
  MIGLIST="$WORKDIR/_migs.txt"
  ( cd "$ROOT" && find "$MIGDIR" -type f -name "*.sql" | sort ) > "$MIGLIST"
  COUNT=$(wc -l < "$MIGLIST" || echo 0)
  echo "- Found $COUNT migration file(s)." >> "$REPORT"

  RLS_TOTAL=0

  while read -r mig; do
    echo "  - $(basename "$mig")" >> "$REPORT"
    SQL="$ROOT/${mig#./}"
    # Count "create policy" statements
    RLS_THIS=$(grep -Eio "create[[:space:]]+policy" "$SQL" | wc -l | tr -d ' ')
    RLS_TOTAL=$(( RLS_TOTAL + RLS_THIS ))
  done < "$MIGLIST"

  echo "- RLS policies (counted by 'CREATE POLICY'): **$RLS_TOTAL**" >> "$REPORT"
  if [[ "$RLS_TOTAL" -lt 55 ]]; then
    echo "- ⚠️ Expected ~55 RLS policies; found $RLS_TOTAL. Verify completeness." >> "$REPORT"
  else
    echo "- ✅ RLS policy coverage looks complete (>=55)." >> "$REPORT"
  fi
else
  echo "- ❌ No migrations scanned." >> "$REPORT"
fi
echo "" >> "$REPORT"

# ---------- 5) Edge Functions sanity (Deno) ----------
echo "## 4) Edge Functions (Error Handling & Config)" >> "$REPORT"
EF_ERRORS=0
for fn in email-dispatch webhook-dispatch ai-course-create grade-ai; do
  FN="edge-functions/$fn/index.ts"
  if grep -q "^./$FN$" "$INVENTORY"; then
    echo "- $fn:" >> "$REPORT"
    FULL="$ROOT/$FN"
    # Error handling check: must have try/catch or robust .catch
    if grep -Eqi "try[[:space:]]*\{" "$FULL" && grep -Eqi "catch[[:space:]]*\(" "$FULL"; then
      echo "  - ✅ contains try/catch" >> "$REPORT"
    else
      if grep -Eqi "\.catch\(" "$FULL"; then
        echo "  - ✅ uses .catch handlers" >> "$REPORT"
      else
        echo "  - ❌ missing explicit error handling (try/catch or .catch)" >> "$REPORT"
        EF_ERRORS=$((EF_ERRORS+1))
      fi
    fi
    # Secrets check: block obvious leaked keys
    if grep -Eiq "(sk_live_|sk-test|whsec_|OPENAI_API_KEY|ANTHROPIC_API_KEY|RESEND_API_KEY|SENDGRID_API_KEY).{0,4}=" "$FULL"; then
      echo "  - ❌ potential hardcoded secrets" >> "$REPORT"
      EF_ERRORS=$((EF_ERRORS+1))
    else
      echo "  - ✅ no obvious hardcoded secrets" >> "$REPORT"
    fi
  else
    echo "- ❌ Missing function: $fn" >> "$REPORT"
    EF_ERRORS=$((EF_ERRORS+1))
  fi
done
echo "" >> "$REPORT"

# ---------- 6) Scripts executable & safe ----------
echo "## 5) Deployment Scripts (.sh) & Docs" >> "$REPORT"
SCRIPTS="$(grep -E "^./.*\.sh$" "$INVENTORY" || true)"
if [[ -n "$SCRIPTS" ]]; then
  echo "- Found shell scripts:" >> "$REPORT"
  echo "$SCRIPTS" | while read -r s; do
    P="$ROOT/${s#./}"
    PERM="$(stat -c "%A" "$P" 2>/dev/null || stat -f "%Sp" "$P" 2>/dev/null || echo "")"
    SHEBANG="$(head -n1 "$P" 2>/dev/null | grep -cE '^#!/' || echo 0)"
    ERRCHK="$(grep -cE 'set -euo pipefail|set -e' "$P" 2>/dev/null || echo 0)"
    echo "  - $s ${PERM:+($PERM)} $( [[ "$SHEBANG" -gt 0 ]] && echo '[shebang]' || echo '[no shebang]' ) $( [[ "$ERRCHK" -gt 0 ]] && echo '[safe flags]' || echo '[no safe flags]' )" >> "$REPORT"
  done
else
  echo "- ❌ No .sh scripts found (expected 6)" >> "$REPORT"
fi

DOCS_COUNT="$(grep -E "^./.*\.md$" "$INVENTORY" | wc -l | tr -d ' ')"
if [[ "$DOCS_COUNT" -ge 6 ]]; then
  echo "- ✅ Documentation files present ($DOCS_COUNT found)" >> "$REPORT"
else
  echo "- ⚠️ Documentation count lower than expected ($DOCS_COUNT < 6)" >> "$REPORT"
fi
echo "" >> "$REPORT"

# ---------- 7) Secrets & config scan ----------
echo "## 6) Configuration Issues & Secret Scan" >> "$REPORT"
SECRETS=$(grep -RniE "(sk_live_|sk_test|whsec_|password.*=.*['\"][^'\"]{10})" "$ROOT" 2>/dev/null | head -20 || true)
if [[ -n "$SECRETS" ]]; then
  echo "- ⚠️ Potential hardcoded credentials found:" >> "$REPORT"
  echo '```' >> "$REPORT"
  echo "$SECRETS" >> "$REPORT"
  echo '```' >> "$REPORT"
else
  echo "- ✅ No obvious hardcoded secrets" >> "$REPORT"
fi
echo "" >> "$REPORT"

# ---------- 8) Potential blockers summary ----------
echo "## 7) Potential Blockers" >> "$REPORT"
BLOCKERS=()

[[ ${#EXPECT_ERRORS[@]} -gt 0 ]] && BLOCKERS+=("Structure validation failed.")
[[ -n "$MIGDIR" ]] || BLOCKERS+=("Migrations dir missing.")
[[ "$EF_ERRORS" -gt 0 ]] && BLOCKERS+=("Edge Functions missing or lack error handling / secrets issues.")

if [[ ${#BLOCKERS[@]} -eq 0 ]]; then
  echo "- ✅ No critical blockers detected." >> "$REPORT"
else
  for b in "${BLOCKERS[@]}"; do echo "- ❌ $b" >> "$REPORT"; done
fi
echo "" >> "$REPORT"

# ---------- 9) Final verdict ----------
echo "## 8) Final Verdict" >> "$REPORT"
if [[ ${#BLOCKERS[@]} -eq 0 ]]; then
  echo "**✅ READY TO DEPLOY**" >> "$REPORT"
else
  echo "**❌ NEEDS FIXES**" >> "$REPORT"
fi

END="$(date -Iseconds)"
{
  echo
  echo "- Finished: $END"
} >> "$REPORT"

log "Audit complete -> $REPORT"
echo "Open $REPORT to view the results."
