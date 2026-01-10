# Drake Software Audit & Cleanup Plan
**Date:** January 10, 2026  
**Issue:** Drake integration incorrectly placed in stipend portal, should be in Supersonic Fast Cash only

---

## Audit Findings

### Drake References Found

#### 1. Main Site (SHOULD BE REMOVED)
- `app/calculator/revenue-share/page.tsx` - Mentions Drake Software
- `app/(dashboard)/client-portal/page.tsx` - "Drake Portals Alternative" marketing

#### 2. Supersonic Fast Cash (CORRECT LOCATION)
- `app/supersonic-fast-cash/tools/drake-download/` - Drake tools
- `app/api/supersonic-fast-cash/ocr-extract/route.ts` - Drake OCR integration
- `app/api/supersonic-fast-cash/jotform-webhook/route.ts` - Drake return creation
- `app/api/supersonic-fast-cash/clients/route.ts` - Drake return tracking
- `app/api/supersonic-fast-cash/file-return/route.ts` - Drake e-file
- `app/api/supersonic-fast-cash/sync-jotform/route.ts` - Drake sync
- `app/api/test-supersonic-fast-cash/route.ts` - Drake API testing

#### 3. Integration Library
- `lib/integrations/drake-software.ts` - Drake API wrapper

#### 4. Database
- `supabase/migrations/20260101_drake_training_system.sql` - Drake training
- `supabase/migrations/20260101_seed_drake_lessons.sql` - Drake lessons

#### 5. Scripts
- `scripts/generate-drake-lessons.ts` - Drake lesson generator

---

## Portal Audit

### Found Portals

#### Student/Client Portals
1. **app/(dashboard)/client-portal/** - Client portal (mentions Drake)
2. **app/platform/student-portal/** - Student portal
3. **app/parent-portal/** - Parent portal

#### Partner Portals
1. **app/partner/** - Partner portal
2. **app/onboarding/partner/** - Partner onboarding
3. **app/platform/partner-portal/** - Platform partner portal
4. **app/snap-et-partner/** - SNAP-ET partner
5. **app/workforce-partners/** - Workforce partners
6. **app/courses/partners/** - Course partners

#### Program Holder Portals
1. **app/program-holder/** - Program holder main
2. **app/program-holder/portal/** - Program holder portal
3. **app/apply/program-holder/** - Program holder application

#### Employer Portals
1. **app/platform/employer-portal/** - Employer portal

#### Staff Portals
1. **app/staff-portal/** - Staff portal
2. **app/programs/admin/portal/** - Program admin portal

---

## Issues Identified

### 1. Drake in Wrong Location
**Problem:** Drake references in main site and client portal  
**Should be:** Only in Supersonic Fast Cash

**Files to clean:**
- `app/calculator/revenue-share/page.tsx`
- `app/(dashboard)/client-portal/page.tsx`

### 2. Multiple Portal Locations
**Problem:** Unclear portal structure

**Program Holder Portals:**
- `app/program-holder/` (main)
- `app/program-holder/portal/` (nested)
- `app/apply/program-holder/` (application)

**Partner Portals:**
- `app/partner/` (main)
- `app/platform/partner-portal/` (platform)
- `app/onboarding/partner/` (onboarding)

### 3. Potential Slug Mismatches
Need to verify routes match intended access patterns.

---

## Cleanup Plan

### Phase 1: Remove Drake from Main Site

#### File: app/calculator/revenue-share/page.tsx
**Remove:**
- Drake Software mentions
- Drake-specific features

**Keep:**
- General revenue share calculator
- Generic software integration mentions

#### File: app/(dashboard)/client-portal/page.tsx
**Remove:**
- "Drake Portals Alternative" marketing
- Drake Tax integration mentions
- Drake comparison table

**Replace with:**
- Generic "Professional Tax Software Integration"
- Focus on Elevate features

### Phase 2: Consolidate Drake in Supersonic Fast Cash

**Keep (already correct):**
- All `/app/api/supersonic-fast-cash/*` Drake integrations
- `lib/integrations/drake-software.ts`
- Drake training migrations
- Drake tools in supersonic-fast-cash

**Verify:**
- All Drake API calls go through supersonic-fast-cash routes
- No direct Drake calls from main site

### Phase 3: Portal Consolidation

#### Program Holder Portal
**Recommended structure:**
```
app/program-holder/
├── page.tsx (dashboard)
├── students/
├── programs/
├── reports/
└── settings/
```

**Remove:**
- `app/program-holder/portal/` (redundant)
- Move to main program-holder directory

#### Partner Portal
**Recommended structure:**
```
app/partner/
├── page.tsx (dashboard)
├── onboarding/ (move from app/onboarding/partner/)
├── programs/
├── students/
└── reports/
```

**Consolidate:**
- Merge `app/platform/partner-portal/` into `app/partner/`
- Move `app/onboarding/partner/` to `app/partner/onboarding/`

---

## Implementation Steps

### Step 1: Remove Drake from Main Site

```bash
# Remove Drake mentions from revenue share calculator
# Remove Drake mentions from client portal
```

### Step 2: Update Environment Variables

**Supersonic Fast Cash only:**
```env
# Drake Software API (Supersonic Fast Cash only)
DRAKE_API_KEY=
DRAKE_ACCOUNT_NUMBER=
DRAKE_SERIAL_NUMBER=
DRAKE_EFILE_PASSWORD=
```

### Step 3: Update Documentation

**Add to Supersonic Fast Cash README:**
- Drake integration is exclusive to Supersonic Fast Cash
- Main site does not use Drake
- All tax software integrations go through Supersonic Fast Cash

### Step 4: Portal Redirects

**Set up redirects for old portal URLs:**
```javascript
// next.config.mjs
{
  source: '/program-holder/portal/:path*',
  destination: '/program-holder/:path*',
  permanent: true,
},
{
  source: '/platform/partner-portal/:path*',
  destination: '/partner/:path*',
  permanent: true,
},
```

---

## Verification Checklist

### Drake Cleanup
- [ ] No Drake mentions in main site pages
- [ ] No Drake mentions in client portal
- [ ] All Drake code in supersonic-fast-cash
- [ ] Drake integration tests pass
- [ ] Environment variables documented

### Portal Access
- [ ] Program holder portal accessible at `/program-holder`
- [ ] Partner portal accessible at `/partner`
- [ ] Student portal accessible at `/platform/student-portal`
- [ ] Employer portal accessible at `/platform/employer-portal`
- [ ] Staff portal accessible at `/staff-portal`
- [ ] All old URLs redirect correctly

### Dashboard Slugs
- [ ] No duplicate routes
- [ ] All slugs match intended access
- [ ] Breadcrumbs work correctly
- [ ] Navigation menus updated

---

## Recommended Portal Structure

### Final Structure

```
app/
├── program-holder/          # Program Holder Portal
│   ├── page.tsx            # Dashboard
│   ├── students/           # Student management
│   ├── programs/           # Program management
│   └── reports/            # Reports
│
├── partner/                # Partner Portal
│   ├── page.tsx            # Dashboard
│   ├── onboarding/         # Partner onboarding
│   ├── programs/           # Available programs
│   └── referrals/          # Referral tracking
│
├── platform/
│   ├── student-portal/     # Student Portal
│   ├── employer-portal/    # Employer Portal
│   └── parent-portal/      # Parent Portal (move from root)
│
├── staff-portal/           # Staff Portal
│
└── supersonic-fast-cash/   # Supersonic Fast Cash (Drake here)
    ├── tools/
    │   └── drake-download/ # Drake tools
    └── api/                # Drake integrations
```

---

## Files to Modify

### Remove Drake References
1. `app/calculator/revenue-share/page.tsx`
2. `app/(dashboard)/client-portal/page.tsx`

### Keep Drake (Supersonic Fast Cash)
1. `app/supersonic-fast-cash/**/*`
2. `app/api/supersonic-fast-cash/**/*`
3. `lib/integrations/drake-software.ts`
4. `supabase/migrations/*drake*`

### Portal Consolidation
1. Move `app/program-holder/portal/*` → `app/program-holder/*`
2. Move `app/onboarding/partner/*` → `app/partner/onboarding/*`
3. Move `app/platform/partner-portal/*` → `app/partner/*`
4. Move `app/parent-portal/*` → `app/platform/parent-portal/*`

---

## Next Steps

1. ✅ Audit complete
2. ⚠️ Remove Drake from main site
3. ⚠️ Consolidate portal structure
4. ⚠️ Add redirects for old URLs
5. ⚠️ Update documentation
6. ⚠️ Test all portal access
7. ⚠️ Verify Drake only in Supersonic Fast Cash

---

## Summary

**Drake Software:**
- ✅ Correctly integrated in Supersonic Fast Cash
- ❌ Incorrectly mentioned in main site
- 🔧 Need to remove from revenue calculator and client portal

**Portals:**
- ✅ Multiple portals exist
- ❌ Some have redundant/nested structures
- 🔧 Need consolidation and clear routing

**Action Required:**
1. Remove Drake mentions from main site
2. Consolidate portal directories
3. Add redirects for old portal URLs
4. Update navigation and documentation
