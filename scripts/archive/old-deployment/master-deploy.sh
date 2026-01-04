#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Master Deployment Script"
echo "==========================="
echo ""
echo "This script will:"
echo "1. Verify full setup configuration"
echo "2. Clean and rebuild from scratch"
echo "3. Verify build output"
echo "4. Commit and push to trigger deployment"
echo ""

read -p "Continue? (y/N): " CONTINUE
if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 0
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Full Setup Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
./scripts/verify-full-setup.sh

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Setup verification failed. Fix errors and try again."
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Clean Build"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
./scripts/autopilot-build-web.sh

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Build failed. Check errors above."
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Build Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
./scripts/autopilot-verify-build.sh

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Build verification failed."
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Git Status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if git diff --quiet && git diff --cached --quiet; then
  echo "✅ No changes to commit"
  echo ""
  read -p "Force push anyway to trigger deployment? (y/N): " FORCE_PUSH
  
  if [[ ! "$FORCE_PUSH" =~ ^[Yy]$ ]]; then
    echo "Deployment not triggered."
    exit 0
  fi
  
  # Create empty commit to trigger deployment
  git commit --allow-empty -m "Trigger deployment - verified build

All checks passed:
✅ Full setup verification
✅ Clean build
✅ Build output verification

[watch-render]

Co-authored-by: Ona <no-reply@ona.com>"
else
  echo "📝 Changes detected:"
  git status --short
  echo ""
  
  read -p "Commit and push these changes? (y/N): " COMMIT_CHANGES
  
  if [[ ! "$COMMIT_CHANGES" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
  fi
  
  git add -A
  git commit -m "Deploy verified build

All checks passed:
✅ Full setup verification
✅ Clean build
✅ Build output verification

[watch-render]

Co-authored-by: Ona <no-reply@ona.com>"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 5: Push to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

BRANCH=$(git branch --show-current)
echo "Pushing to: $BRANCH"
echo ""

git push origin "$BRANCH"

echo ""
echo "✅ Pushed successfully!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 6: Deployment Monitoring"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Deployment triggered!"
echo ""
echo "Monitor deployment:"
echo "1. GitHub Actions: https://github.com/elevateforhumanity/fix2/actions"
echo "2. Render Dashboard: https://dashboard.render.com"
echo ""
echo "Check status:"
echo "  ./check-deployment-status.sh"
echo ""
echo "Watch deployment:"
echo "  ./monitor-deployment.sh"
echo ""

if [ -n "${RENDER_API_KEY:-}" ] && [ -n "${RENDER_SERVICE_ID:-}" ]; then
  echo "🔍 Render API configured, starting watcher..."
  echo ""
  
  read -p "Monitor Render deployment now? (y/N): " MONITOR
  
  if [[ "$MONITOR" =~ ^[Yy]$ ]]; then
    export GITHUB_TOKEN="${GITHUB_TOKEN:-}"
    export GITHUB_REPOSITORY="elevateforhumanity/fix2"
    node scripts/render/poll-render.js
  fi
else
  echo "💡 To enable automatic monitoring, set:"
  echo "  export RENDER_API_KEY=rnd_xxxxx"
  echo "  export RENDER_SERVICE_ID=srv-xxxxx"
fi

echo ""
echo "🎉 Master deployment complete!"
