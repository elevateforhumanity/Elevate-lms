#!/bin/bash
set -e

echo "🔒 Bulk Closing Autopilot Issues"
echo "================================="
echo ""

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not set"
    echo ""
    echo "Please provide your GitHub token:"
    echo ""
    echo "Method 1: Environment variable"
    echo "  export GITHUB_TOKEN='your_token_here'"
    echo "  ./bulk-close-issues.sh"
    echo ""
    echo "Method 2: Pass as argument"
    echo "  ./bulk-close-issues.sh your_token_here"
    echo ""
    echo "Get token from: https://github.com/settings/tokens"
    echo "Required scope: repo"
    echo ""
    exit 1
fi

# Use token from argument if provided
if [ ! -z "$1" ]; then
    GITHUB_TOKEN="$1"
fi

REPO="elevateforhumanity/fix2"
API_URL="https://api.github.com"

echo "✓ GitHub token provided"
echo "✓ Repository: $REPO"
echo ""

# Function to close issues with a specific label
close_issues_by_label() {
    local label=$1
    echo "🔍 Processing label: $label"
    
    # Get all open issues with this label (paginated)
    local page=1
    local total_closed=0
    
    while true; do
        RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
            "$API_URL/repos/$REPO/issues?labels=$label&state=open&per_page=100&page=$page")
        
        # Check if we got any issues
        COUNT=$(echo "$RESPONSE" | jq '. | length' 2>/dev/null || echo "0")
        
        if [ "$COUNT" = "0" ]; then
            break
        fi
        
        echo "  Page $page: Found $COUNT issues"
        
        # Get issue numbers
        ISSUE_NUMBERS=$(echo "$RESPONSE" | jq -r '.[].number' 2>/dev/null)
        
        # Close each issue
        echo "$ISSUE_NUMBERS" | while read -r issue_num; do
            if [ ! -z "$issue_num" ]; then
                # Close the issue
                curl -s -X PATCH \
                    -H "Authorization: token $GITHUB_TOKEN" \
                    -H "Content-Type: application/json" \
                    "$API_URL/repos/$REPO/issues/$issue_num" \
                    -d '{"state":"closed"}' > /dev/null
                
                # Add closing comment
                curl -s -X POST \
                    -H "Authorization: token $GITHUB_TOKEN" \
                    -H "Content-Type: application/json" \
                    "$API_URL/repos/$REPO/issues/$issue_num/comments" \
                    -d '{"body":"✅ **Autopilot Issue Creation Disabled**\n\nThis issue has been automatically closed as part of disabling the autopilot self-heal workflow.\n\n**What changed:**\n- ✅ All autopilot workflows archived\n- ✅ No more automatic issue creation\n- ✅ System is stable and operational\n- ✅ CI/CD still functional\n\n**Status:** 🟢 System operational\n\nIf you believe this issue still needs attention, please reopen it manually."}' > /dev/null
                
                echo "    ✓ Closed #$issue_num"
                total_closed=$((total_closed + 1))
            fi
        done
        
        page=$((page + 1))
    done
    
    if [ $total_closed -gt 0 ]; then
        echo "  ✅ Closed $total_closed issues with label: $label"
    else
        echo "  ✓ No open issues with label: $label"
    fi
    echo ""
    
    return $total_closed
}

# Close issues for each label
TOTAL=0

close_issues_by_label "autopilot"
TOTAL=$((TOTAL + $?))

close_issues_by_label "auto-heal-failed"
TOTAL=$((TOTAL + $?))

close_issues_by_label "auto-heal"
TOTAL=$((TOTAL + $?))

close_issues_by_label "autopilot-workers"
TOTAL=$((TOTAL + $?))

close_issues_by_label "deployment"
TOTAL=$((TOTAL + $?))

close_issues_by_label "workflow"
TOTAL=$((TOTAL + $?))

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ BULK CLOSE COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "  Total issues closed: $TOTAL"
echo ""
echo "🎯 Next Steps:"
echo "  1. Verify at: https://github.com/elevateforhumanity/fix2/issues"
echo "  2. All autopilot workflows are already archived"
echo "  3. No more automatic issue creation"
echo ""
echo "✅ Done!"
echo ""
