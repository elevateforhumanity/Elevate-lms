# Autopilot Status Dashboard

**Last Updated:** $(date)

## 🤖 Active Autopilots (Run Automatically)

### Build-Time Autopilots
These run automatically during `pnpm build`:

1. ✅ **Route Generator** - Auto-generates routes from pages
   - Trigger: `prebuild` hook
   - File: `scripts/generate-routes.mjs`

2. ✅ **Autopilot Checks** - Security and config validation
   - Trigger: `predev` and `prebuild` hooks
   - File: `tools/autopilot.mjs`

3. ✅ **Dynamic Sitemap Generator** - Creates SEO sitemaps
   - Trigger: `postbuild` hook
   - File: `scripts/generate-dynamic-sitemap.mjs`

4. ✅ **Sitemap Splitter** - Splits large sitemaps
   - Trigger: `postbuild` hook
   - File: `scripts/split-sitemap.mjs`

5. ✅ **Broken Links Fixer** - Fixes internal links
   - Trigger: `postbuild` hook
   - File: `scripts/fix-broken-links.mjs`

6. ✅ **Domain URL Normalizer** - Standardizes URLs
   - Trigger: `postbuild` hook
   - File: `scripts/fix-domain-urls.js`

7. ✅ **Canonical URL Updater** - SEO optimization
   - Trigger: `postbuild` hook
   - File: `scripts/update-canonical-urls.js`

8. ✅ **Source Maps Remover** - Production security
   - Trigger: `postbuild` hook
   - File: `scripts/no-source-maps.cjs`

9. ✅ **Build Verifier** - Validates build output
   - Trigger: `postbuild` hook
   - File: `scripts/autopilot-verify-build.sh`

10. ✅ **Security Compliance** - Military-grade checks
    - Trigger: `postbuild` hook
    - File: `scripts/security-compliance-autopilot.mjs`

### GitHub Actions Autopilots
These run automatically on schedule or events:

1. ✅ **CI Autopilot** - Runs on every push/PR
   - Trigger: Push to main, Pull requests
   - File: `.github/workflows/ci.yml`

2. ✅ **Autopilot Checks** - Validation on push
   - Trigger: Push to main, Pull requests
   - File: `.github/workflows/autopilot.yml`

3. ✅ **Daily Content Generation** - Social media content
   - Trigger: Daily at 6 AM EST
   - File: `.github/workflows/daily-content-generation.yml`

4. ✅ **Health Check** - System monitoring
   - Trigger: Every hour
   - File: `.github/workflows/health-check.yml`

5. ✅ **Scheduled Social Posts** - Auto-posting
   - Trigger: 3x daily (9 AM, 1 PM, 7 PM EST)
   - File: `.github/workflows/scheduled-social-posts.yml`

## 🔧 Manual Autopilots (Run On-Demand)

These can be run manually when needed:

1. **Full Setup Orchestrator**
   ```bash
   bash scripts/autopilot-full-setup.sh
   ```

2. **Netlify Configuration**
   ```bash
   bash scripts/autopilot-configure-netlify.sh
   ```

3. **Advanced Autopilot** - Continuous testing
   ```bash
   bash scripts/advanced-autopilot.sh
   ```

4. **Autopilot Loop** - Continuous monitoring
   ```bash
   bash scripts/autopilot-loop.sh
   ```

5. **LMS Fixer** - LMS-specific fixes
   ```bash
   node scripts/autopilot-fix-lms.mjs
   ```

## 📊 Quick Commands

### Check Autopilot Status
```bash
node scripts/check-autopilots.mjs
```

### Run All Auto-Fixes
```bash
pnpm run autopilot:fix
```

### Run All Checks
```bash
pnpm run autopilot:check
```

### Pre-Push Validation
```bash
pnpm run autopilot:prepush
```

## 🚀 Activation Status

- ✅ All shell scripts executable
- ✅ GitHub Actions workflows active
- ✅ Package.json scripts configured
- ✅ Prebuild autopilots active
- ✅ Postbuild autopilots active
- ✅ Netlify build hooks configured

## 📝 Notes

- **Active autopilots** run automatically - no action needed
- **Manual autopilots** are available when you need them
- **GitHub Actions** handle scheduled tasks in production
- **Local development** uses prebuild/postbuild hooks

---

**Status:** 🟢 ALL SYSTEMS OPERATIONAL

To update this dashboard, run:
```bash
bash scripts/activate-all-autopilots.sh
```
