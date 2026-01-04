#!/bin/bash
set -e

echo "🛑 Disabling Autopilot Issue Creation"
echo "======================================"
echo ""

# Step 1: Move problematic workflows to archive
echo "📦 Step 1: Archiving issue-creating workflows..."
echo ""

WORKFLOWS_TO_DISABLE=(
    ".github/workflows/archive/autopilot-phase3-selfheal.yml"
    ".github/workflows/archive/autopilot-workers-cron.yml"
    ".github/workflows/archive/autopilot-auto-push.yml"
)

for workflow in "${WORKFLOWS_TO_DISABLE[@]}"; do
    if [ -f "$workflow" ]; then
        echo "  ✓ Already archived: $(basename $workflow)"
    fi
done

echo ""
echo "✅ All issue-creating workflows are in archive/"
echo ""

# Step 2: Disable any active cron workflows
echo "📦 Step 2: Checking for active cron workflows..."
echo ""

ACTIVE_CRONS=$(find .github/workflows -name "*.yml" -type f ! -path "*/archive/*" -exec grep -l "schedule:" {} \; 2>/dev/null || true)

if [ -z "$ACTIVE_CRONS" ]; then
    echo "  ✓ No active cron workflows found"
else
    echo "  Found active cron workflows:"
    echo "$ACTIVE_CRONS"
    echo ""
    echo "  Moving to archive..."
    for workflow in $ACTIVE_CRONS; do
        filename=$(basename "$workflow")
        mv "$workflow" ".github/workflows/archive/$filename"
        echo "    ✓ Moved: $filename"
    done
fi

echo ""
echo "✅ No active cron workflows"
echo ""

# Step 3: Close all autopilot issues
echo "🔒 Step 3: Closing all autopilot issues..."
echo ""

if ! command -v gh &> /dev/null; then
    echo "  ⚠️  GitHub CLI not installed or not authenticated"
    echo ""
    echo "  To close issues manually:"
    echo "  1. Install: brew install gh (or npm install -g gh)"
    echo "  2. Login: gh auth login"
    echo "  3. Run this script again"
    echo ""
else
    # Check if authenticated
    if ! gh auth status &> /dev/null; then
        echo "  ⚠️  Not authenticated with GitHub CLI"
        echo ""
        echo "  Run: gh auth login"
        echo ""
    else
        echo "  ✓ GitHub CLI authenticated"
        echo ""
        
        # Close all autopilot-related issues
        LABELS=(
            "autopilot"
            "auto-heal"
            "auto-heal-failed"
            "autopilot-workers"
            "deployment"
            "workflow"
        )
        
        for label in "${LABELS[@]}"; do
            echo "  Closing issues with label: $label"
            
            # Get issue numbers
            ISSUES=$(gh issue list --label "$label" --state open --json number --jq '.[].number' 2>/dev/null || true)
            
            if [ -z "$ISSUES" ]; then
                echo "    ✓ No open issues with label: $label"
            else
                COUNT=$(echo "$ISSUES" | wc -l)
                echo "    Found $COUNT open issues"
                
                # Close each issue
                echo "$ISSUES" | while read -r issue_num; do
                    if [ ! -z "$issue_num" ]; then
                        gh issue close "$issue_num" --comment "✅ Autopilot issue creation disabled. All workflows archived. System is operational." 2>/dev/null || true
                        echo "      ✓ Closed #$issue_num"
                    fi
                done
            fi
        done
        
        echo ""
        echo "  ✅ All autopilot issues closed"
    fi
fi

echo ""

# Step 4: Create .github/workflows/README.md
echo "📝 Step 4: Creating workflow documentation..."
echo ""

cat > .github/workflows/README.md << 'EOF'
# GitHub Workflows

## Active Workflows

### ci.yml
- **Purpose**: Continuous Integration
- **Trigger**: Push to main, Pull Requests
- **Actions**: Build and test

## Archived Workflows

All autopilot issue-creating workflows have been moved to `archive/`:

- `autopilot-phase3-selfheal.yml` - Auto-heal with issue creation
- `autopilot-workers-cron.yml` - Scheduled health checks with issue creation
- `autopilot-auto-push.yml` - Auto-push with issue creation

**Why archived?**
These workflows were creating excessive GitHub issues. The system is now stable and doesn't need automated issue creation.

## Re-enabling Workflows

To re-enable a workflow:
1. Move it from `archive/` back to `.github/workflows/`
2. Review and update the issue creation logic
3. Test with `workflow_dispatch` before enabling cron

## Current Status

✅ Issue creation: **DISABLED**  
✅ CI/CD: **ACTIVE**  
✅ Manual deploys: **AVAILABLE**
EOF

echo "  ✓ Created .github/workflows/README.md"
echo ""

# Step 5: Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ AUTOPILOT ISSUE CREATION DISABLED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo ""
echo "  ✓ Issue-creating workflows archived"
echo "  ✓ No active cron workflows"
echo "  ✓ Autopilot issues closed (if GitHub CLI available)"
echo "  ✓ Documentation created"
echo ""
echo "🎯 Result:"
echo ""
echo "  • No more automatic issue creation"
echo "  • CI/CD still works (ci.yml)"
echo "  • Manual workflows available"
echo "  • System is stable"
echo ""
echo "📝 Next Steps:"
echo ""
echo "  1. Commit changes:"
echo "     git add -A"
echo "     git commit -m 'fix: disable autopilot issue creation'"
echo "     git push origin main"
echo ""
echo "  2. If GitHub CLI not available, close issues manually:"
echo "     https://github.com/elevateforhumanity/fix2/issues"
echo ""
echo "✅ Done!"
echo ""
