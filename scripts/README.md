# SEO Autopilot System

Automated SEO deployment with self-healing capabilities and chunked rollout.

## 🚀 Quick Start

```bash
# Run full autopilot deployment
./scripts/seo-autopilot.sh

# Quick validation check
./scripts/validate-seo.sh

# Start continuous monitoring (runs in background)
./scripts/seo-monitor.sh &
```

## 📋 Scripts Overview

### 1. `seo-autopilot.sh` - Main Deployment Script

**Purpose:** Deploy SEO improvements in chunks of 50 pages with automatic rollback on failure.

**Features:**

- ✅ Chunked deployment (50 pages at a time)
- ✅ Automatic backup before each chunk
- ✅ Health checks after each deployment
- ✅ Self-healing on failure
- ✅ Automatic rollback if healing fails
- ✅ Comprehensive logging
- ✅ Final coverage report

**Usage:**

```bash
./scripts/seo-autopilot.sh
```

**What it does:**

1. Creates initial backup
2. Runs health check
3. Deploys changes in chunks of 50 pages
4. After each chunk:
   - Runs health check
   - Attempts self-healing if issues detected
   - Rolls back if healing fails
5. Generates final SEO coverage report

**Logs:**

- Main log: `logs/seo-autopilot/deployment_TIMESTAMP.log`
- Error log: `logs/seo-autopilot/errors_TIMESTAMP.log`
- Backups: `backups/seo-autopilot/backup_TIMESTAMP.tar.gz`

### 2. `validate-seo.sh` - Quick Validation

**Purpose:** Fast validation of SEO implementation and coverage.

**Features:**

- ✅ Component existence check
- ✅ Integration verification
- ✅ Build validation
- ✅ Coverage analysis
- ✅ Overall SEO score

**Usage:**

```bash
./scripts/validate-seo.sh
```

**Output:**

```
📊 SEO Coverage Report:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total HTML Files:     97 (100%)
Canonical URLs:       97 (100%)
Open Graph Tags:      97 (100%)
Twitter Cards:        97 (100%)
Meta Descriptions:    97 (100%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall SEO Score: 100% ✅ EXCELLENT
```

### 3. `seo-monitor.sh` - Continuous Monitoring

**Purpose:** Continuous health monitoring with auto-healing.

**Features:**

- ✅ Runs checks every 5 minutes
- ✅ Tracks failure count
- ✅ Auto-heals after 3 consecutive failures
- ✅ Alert system (extensible)
- ✅ Statistics tracking

**Usage:**

```bash
# Run in foreground
./scripts/seo-monitor.sh

# Run in background
./scripts/seo-monitor.sh &

# Stop monitoring
pkill -f seo-monitor.sh
```

**Checks performed:**

1. Component existence
2. Integration verification
3. Build health
4. SEO coverage percentage

**Auto-healing triggers:**

- Restores missing files from git
- Cleans build cache
- Rebuilds project
- Resets failure count on success

**Logs:**

- Monitor log: `logs/seo-monitor/monitor_TIMESTAMP.log`

## 🏗️ Architecture

### UniversalSEO Component

Located at: `src/components/UniversalSEO.tsx`

**Features:**

- Automatic title generation from route
- Canonical URL generation
- Open Graph tags
- Twitter Card tags
- Meta descriptions and keywords
- Customizable per-page via props

**Integration:**

```tsx
// In SiteLayout.tsx
import UniversalSEO from '../components/UniversalSEO';

// In component
<UniversalSEO />  // Uses defaults

// Or with custom props
<UniversalSEO
  title="Custom Title"
  description="Custom description"
  image="/custom-image.jpg"
/>
```

### How It Works

1. **UniversalSEO** component is imported in `SiteLayout.tsx`
2. **SiteLayout** wraps all pages in the application
3. **React Helmet Async** injects meta tags into `<head>`
4. **Route-based titles** are auto-generated from URL paths
5. **Canonical URLs** are auto-generated from current location
6. **All pages** get SEO automatically without individual edits

## 🔧 Configuration

### Chunk Size

Edit `seo-autopilot.sh`:

```bash
CHUNK_SIZE=50  # Change to desired chunk size
```

### Monitoring Interval

Edit `seo-monitor.sh`:

```bash
CHECK_INTERVAL=300  # Seconds between checks (default: 5 minutes)
```

### Alert Threshold

Edit `seo-monitor.sh`:

```bash
ALERT_THRESHOLD=3  # Failures before auto-heal
```

## 📊 Coverage Targets

| Metric            | Target | Current                    |
| ----------------- | ------ | -------------------------- |
| Canonical URLs    | 100%   | Check with validate script |
| Open Graph Tags   | 100%   | Check with validate script |
| Twitter Cards     | 100%   | Check with validate script |
| Meta Descriptions | 100%   | Check with validate script |

## 🔍 Troubleshooting

### Build Fails

```bash
# Clean and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### UniversalSEO Not Working

```bash
# Verify component exists
ls -la src/components/UniversalSEO.tsx

# Verify integration
grep -n "UniversalSEO" src/layouts/SiteLayout.tsx

# Check for syntax errors
npm run build
```

### Low SEO Coverage

```bash
# Run validation to see details
./scripts/validate-seo.sh

# Check specific HTML file
grep -A5 "og:title" dist/index.html

# Verify React Helmet is working
npm list react-helmet-async
```

### Self-Healing Fails

```bash
# Manual restore from backup
cd backups/seo-autopilot
tar -xzf backup_TIMESTAMP.tar.gz -C ../..

# Or restore from git
git checkout HEAD -- src/components/UniversalSEO.tsx
git checkout HEAD -- src/layouts/SiteLayout.tsx
```

## 🎯 Best Practices

1. **Always run validation before deployment:**

   ```bash
   ./scripts/validate-seo.sh
   ```

2. **Monitor logs during autopilot:**

   ```bash
   tail -f logs/seo-autopilot/deployment_*.log
   ```

3. **Keep backups for 30 days:**

   ```bash
   find backups/seo-autopilot -mtime +30 -delete
   ```

4. **Test in development first:**

   ```bash
   npm run dev
   # Check meta tags in browser DevTools
   ```

5. **Verify with external tools:**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 📈 Monitoring Dashboard

Create a simple dashboard to track SEO health:

```bash
# Add to crontab for daily reports
0 9 * * * cd /workspaces/fix2 && ./scripts/validate-seo.sh > daily-seo-report.txt
```

## 🚨 Alerts

The monitoring script supports integration with:

- Slack webhooks
- Email notifications
- PagerDuty
- Discord webhooks

Edit `seo-monitor.sh` function `send_alert()` to add your notification service.

## 📝 Logs Location

```
logs/
├── seo-autopilot/
│   ├── deployment_TIMESTAMP.log
│   ├── errors_TIMESTAMP.log
│   └── seo_coverage_report_TIMESTAMP.md
└── seo-monitor/
    └── monitor_TIMESTAMP.log

backups/
└── seo-autopilot/
    └── backup_TIMESTAMP.tar.gz
```

## ✅ Pre-Deployment Checklist

- [ ] Run `./scripts/validate-seo.sh`
- [ ] Verify score is ≥95%
- [ ] Check sample pages in browser DevTools
- [ ] Test social media sharing preview
- [ ] Review error logs
- [ ] Ensure backups are created
- [ ] Start monitoring script
- [ ] Run autopilot deployment
- [ ] Verify final coverage report

## 🎓 Understanding the Scores

- **100%**: Perfect - All pages have complete SEO
- **95-99%**: Excellent - Minor gaps acceptable
- **80-94%**: Good - Some pages need attention
- **<80%**: Needs Improvement - Run autopilot again

## 🔄 Rollback Procedure

If deployment fails:

```bash
# Automatic rollback (handled by autopilot)
# Or manual rollback:
cd backups/seo-autopilot
ls -lt  # Find latest backup
tar -xzf backup_TIMESTAMP.tar.gz -C ../..
cd ../..
npm run build
```

## 📞 Support

For issues or questions:

1. Check logs in `logs/seo-autopilot/`
2. Run validation script for diagnostics
3. Review this README
4. Check component integration in SiteLayout.tsx

---

**Version:** 1.0  
**Last Updated:** $(date)  
**Maintained by:** SEO Autopilot System
