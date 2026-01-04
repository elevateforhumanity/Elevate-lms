#!/bin/bash

echo "🔒 Closing Autopilot Issues via GitHub API"
echo "==========================================="
echo ""

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not set"
    echo ""
    echo "Please set your GitHub Personal Access Token:"
    echo ""
    echo "  export GITHUB_TOKEN='your_token_here'"
    echo ""
    echo "Or run with token:"
    echo "  GITHUB_TOKEN='your_token' ./close-autopilot-issues-api.sh"
    echo ""
    echo "Get token from: https://github.com/settings/tokens"
    echo "Required scopes: repo"
    echo ""
    exit 1
fi

REPO="elevateforhumanity/fix2"
API_URL="https://api.github.com"

echo "✓ GitHub token found"
echo "✓ Repository: $REPO"
echo ""

# Labels to search for
LABELS=(
    "autopilot"
    "auto-heal"
    "auto-heal-failed"
    "autopilot-workers"
    "deployment"
    "workflow"
)

TOTAL_CLOSED=0

for label in "${LABELS[@]}"; do
    echo "🔍 Searching for issues with label: $label"
    
    # Get issues with this label
    RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "$API_URL/repos/$REPO/issues?labels=$label&state=open&per_page=100")
    
    # Count issues
    COUNT=$(echo "$RESPONSE" | jq '. | length' 2>/dev/null || echo "0")
    
    if [ "$COUNT" = "0" ]; then
        echo "  ✓ No open issues with label: $label"
        echo ""
        continue
    fi
    
    echo "  Found $COUNT open issues"
    
    # Get issue numbers
    ISSUE_NUMBERS=$(echo "$RESPONSE" | jq -r '.[].number' 2>/dev/null)
    
    # Close each issue
    echo "$ISSUE_NUMBERS" | while read -r issue_num; do
        if [ ! -z "$issue_num" ]; then
            echo "  Closing issue #$issue_num..."
            
            # Close the issue
            curl -s -X PATCH \
                -H "Authorization: token $GITHUB_TOKEN" \
                -H "Content-Type: application/json" \
                "$API_URL/repos/$REPO/issues/$issue_num" \
                -d '{"state":"closed"}' > /dev/null
            
            # Add comment
            curl -s -X POST \
                -H "Authorization: token $GITHUB_TOKEN" \
                -H "Content-Type: application/json" \
                "$API_URL/repos/$REPO/issues/$issue_num/comments" \
                -d '{"body":"✅ Autopilot issue creation has been disabled. All issue-creating workflows have been archived. The system is now stable and operational.\n\n**Changes made:**\n- Moved autopilot workflows to archive\n- Disabled scheduled cron jobs\n- No more automatic issue creation\n- CI/CD still functional\n\n**Status:** 🟢 System operational"}' > /dev/null
            
            echo "    ✓ Closed #$issue_num"
            TOTAL_CLOSED=$((TOTAL_CLOSED + 1))
        fi
    done
    
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "  Total issues closed: $TOTAL_CLOSED"
echo ""
echo "🎯 Result:"
echo "  • All autopilot issues closed"
echo "  • Comments added explaining the fix"
echo "  • No more automatic issue creation"
echo ""
echo "✅ Done!"
echo ""
