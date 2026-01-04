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
