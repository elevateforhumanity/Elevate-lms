#!/bin/bash
# Cancel stuck "Autonomous Netlify Deploy" workflows
# These workflows have been running for 17-20 hours and are blocking all CI/CD

set -e

echo "🔍 Cancelling 20 stuck workflows..."
echo ""

# Workflow IDs that are stuck
WORKFLOW_IDS=(
  19126819858
  19125595834
  19124963003
  19124769805
  19124698824
  19123739156
  19123677382
  19123635012
  19123600619
  19123585023
  19123577304
  19123577380
  19123529027
  19123471997
  19123398451
  19123341809
  19123322014
  19123321592
  19123312786
  19123097685
)

CANCELLED=0
FAILED=0

for ID in "${WORKFLOW_IDS[@]}"; do
  echo "Cancelling workflow run $ID..."
  
  if gh run cancel "$ID" 2>/dev/null; then
    echo "  ✅ Cancelled"
    ((CANCELLED++))
  else
    echo "  ❌ Failed (may require authentication)"
    ((FAILED++))
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Summary:"
echo "  ✅ Cancelled: $CANCELLED"
echo "  ❌ Failed: $FAILED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAILED -gt 0 ]; then
  echo ""
  echo "⚠️  Some workflows could not be cancelled."
  echo ""
  echo "Manual cancellation required:"
  echo "1. Go to: https://github.com/elevateforhumanity/fix2/actions"
  echo "2. Filter by 'Autonomous Netlify Deploy' and status 'In progress'"
  echo "3. Click each workflow and select 'Cancel workflow'"
  echo ""
  echo "Or authenticate gh CLI:"
  echo "  gh auth login"
  echo "  ./cancel-stuck-workflows.sh"
fi
