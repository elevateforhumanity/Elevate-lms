# Complete Old Domain Cleanup Plan

**Goal:** Remove ALL references to `elevateforhumanity.org` and `portal.elevateforhumanity.org`  
**New Domain:** `www.elevateforhumanity.org`  
**Status:** 133 files found with old domain references

---

## Files Found (by Category)

### 1. Documentation Files (Root) - 60 files
**Action:** DELETE - These are historical audit/status reports

Files:
- ALTERNATIVE-SOLUTION.md
- BYPASS-OLD-ACCOUNT-SETUP.md
- CACHE-AUDIT-REPORT.md
- CANONICAL_URL_STRATEGY.md
- CHRONOLOGICAL-SUMMARY.md
- COMPLETE-RESET-GUIDE.md
- COMPLETE_DISCONNECTION_REPORT.md
- COMPREHENSIVE-AUDIT-COMPLETE.md
- CORE-WEB-VITALS-DIAGNOSIS.md
- DATA-TRANSFER-AUDIT.md
- DEPLOYMENT-COMPLETE.md
- DEPLOYMENT-VERIFICATION.md
- DEPLOYMENT_SUCCESS.md
- DETACH-VERCEL-GLOBALLY.md
- DISCONNECT-OLD-PROJECTS.md
- DOCUMENTATION_COMPLETE.md
- DOCUMENT_COMPLETION_SYSTEM.md
- DOMAIN_BREAKDOWN.md
- DOMAIN_REMOVAL_REPORT.md
- DOMAIN_URL_AUDIT.md
- EXACT-CLICKS-TO-MAKE.md
- EXACT-SITEMAP-INSTRUCTIONS.md
- EXECUTIVE-SUMMARY-122-PAGES.md
- FINAL-COMPREHENSIVE-STATUS.md
- FINAL_DEPLOYMENT_SUMMARY.md
- FINAL_PRODUCTION_PLAN.md
- FINAL_STATUS.md
- FIXES_APPLIED.md
- FIXES_SUMMARY.md
- GOOGLE-COMPLETE-RESET.md
- IS-EVERYTHING-FIXED.md
- MIGRATION_COMPARISON_REPORT.md
- MOBILE-GOOGLE-AUDIT.md
- MOBILE-STALE-CONTENT-AUDIT.md
- NUCLEAR-DELETE-VERCEL.md
- PREVIEW-BRANCH-DIAGNOSIS.md
- PREVIEW_INDEXING_FIX.md
- PRODUCTION_AUDIT_REPORT.md
- PWA-AUDIT-HOME-SCREEN.md
- PWA-ELIMINATION-PLAN.md
- QUICK-CLEANUP-STEPS.md
- QUICK-RECONNECT-GUIDE.md
- REMOVE-ALL-SITEMAPS-NOW.md
- RERUN-VERIFICATION-REPORT.md
- RESTORATION_COMPLETE.md
- ROBOTS-AUDIT-REPORT.md
- SEO_AUDIT_REPORT.md
- SEO_FIX_COMPLETE.md
- SEO_VERIFICATION_REPORT.md
- SETTINGS-AUDIT.md
- SIMPLE-PROJECT-REMOVAL.md
- SINGLE-PROJECT-DOMAIN-SETUP.md
- STATUS-REPORT.md
- SUCCESS.md
- VERCEL-COMPLETE-AUDIT.md
- VERCEL-DOMAIN-CLEANUP-GUIDE.md
- VERCEL_COMPLETE_REMOVAL.md
- VERCEL_DOMAIN_FIX.md
- VERIFICATION-RESULTS.md
- VERIFICATION_REPORT.md
- VISUAL-GSC-GUIDE.md
- WHAT-I-CAN-DO.md

**Recommendation:** DELETE ALL - These are historical audit reports, not needed for production

---

### 2. Public HTML Files - 20 files
**Action:** DELETE - Legacy static HTML that duplicates Next.js routes

Files:
- public/academic-calendar.html
- public/apply.html
- public/donate.html
- public/employers.html
- public/federal-apprenticeships.html
- public/flash-sale-store.html
- public/index-production.html
- public/og-placeholder.html
- public/pay.html
- public/run-sql.html
- public/search.html
- public/durable-pages/programs.html
- public/pages/READY_FOR_TRANSFER_index.html
- public/pages/account.html
- public/pages/blog.html
- public/pages/buy-license.html
- public/pages/connect.html
- public/pages/donate.html
- public/pages/flash-sale-success.html
- public/pages/funding-options.html
- public/pages/google-search-console-submit.html
- public/pages/hub.html
- public/pages/index.react.html
- public/pages/partners.html
- public/pages/pay.html
- public/pages/programs.html
- public/pages/redesigned-homepage.html
- public/pages/selfish-inc.html
- public/pages/seo-audit.html
- public/pages/student-outcomes.html
- public/pages/success.html

**Recommendation:** DELETE ALL - These duplicate Next.js app routes

---

### 3. Documentation (Keep & Update) - 30+ files
**Action:** UPDATE - Replace old domain with new domain

Files:
- docs/API_DOCUMENTATION.md
- docs/README.md
- docs/SETUP.md
- docs/USER_FLOWS.md
- public/docs/CERTIFICATION_PORTFOLIO.md
- public/docs/IRS_VITA_RESOURCES.md
- public/docs/PARTNER_MOU_TEMPLATE.md
- public/docs/PROGRAM_HOLDER_ONBOARDING_PACKET.md
- public/docs/revenue-sharing-policy.md
- public/docs/syllabi/*.md (18 files)
- public/workforce-partner-packet.md
- lms-content/COMPLETE_TRAINING_PORTFOLIO.md
- lms-content/JRI_SETUP_GUIDE.md
- lms-content/careersafe-osha/CAREERSAFE_OSHA_TRAINING.md
- lms-content/certifications/*.md (3 files)
- lms-content/milady-rise/MILADY_RISE_SETUP.md

**Recommendation:** UPDATE - These are actual documentation that should reference new domain

---

### 4. Email Templates - 2 files
**Action:** UPDATE

Files:
- lib/email-templates/application-confirmation.html
- lib/email-templates/contact-form.html

**Recommendation:** UPDATE - Active email templates

---

### 5. README Files - 6 files
**Action:** UPDATE

Files:
- app/blog/redirect-config.md
- cloudflare-workers/README.md
- lib/certificates/README.md
- lib/email-templates/README.md
- public/OG_IMAGE_INSTRUCTIONS.md
- public/digital-products/README.md
- public/logos/PARTNER_LOGOS.md
- scripts/README-AI-WORKERS.md

**Recommendation:** UPDATE - Active documentation

---

### 6. Video Scripts - 2 files
**Action:** UPDATE

Files:
- scripts/video-scripts/reel-barber-apprenticeship.md
- scripts/video-scripts/reel-elevate-enroll-today.md

**Recommendation:** UPDATE - Active content

---

## Cleanup Strategy

### Phase 1: Delete Historical Files (SAFE)
Delete 60 root-level audit/status markdown files - these are historical records

### Phase 2: Delete Legacy HTML (SAFE)
Delete 30 HTML files in public/ - these duplicate Next.js routes

### Phase 3: Update Active Documentation
Update ~40 files with new domain references

---

## Execution Plan

1. **Backup first** (git branch already created)
2. **Delete historical audit files** (60 files)
3. **Delete legacy HTML files** (30 files)
4. **Update active documentation** (40 files)
5. **Verify no references remain**
6. **Test build**
7. **Commit changes**

---

## Impact Assessment

### Safe to Delete:
- ✅ Historical audit reports (60 files) - not used in production
- ✅ Legacy HTML files (30 files) - duplicate Next.js routes

### Must Update:
- ⚠️ Active documentation (40 files) - used by developers/partners
- ⚠️ Email templates (2 files) - sent to users
- ⚠️ Video scripts (2 files) - content creation

---

## Size Reduction

**Current:** 101MB in public/  
**After cleanup:** ~50MB (estimated)  
**Savings:** ~50MB + cleaner codebase

---

## Next Steps

1. Confirm deletion strategy
2. Execute cleanup
3. Verify build
4. Commit changes
