# Canonical URL Strategy - Fix Google Indexing Multiple Sites

## Problem
Google is indexing multiple versions of the same content:
- Different hostnames (www vs non-www)
- Different paths (/privacy vs /privacy-policy vs /policies/privacy)
- Old Vercel preview deployments
- HTTP vs HTTPS variants

## Solution: ONE Canonical URL for Everything

### 1. Canonical Domain
**ONLY:** `https://elevateforhumanity.org` (non-www, HTTPS)

### 2. Duplicate Path Redirects (301 Permanent)

#### Privacy Policy
- `/policies/privacy` → `/privacy-policy` (301)
- `/policies/privacy-notice` → `/privacy-policy` (301)
- **Canonical:** `/privacy-policy`

#### Terms of Service
- `/terms` → `/terms-of-service` (301)
- `/policies/terms` → `/terms-of-service` (301)
- **Canonical:** `/terms-of-service`

#### Other Duplicates to Fix
- `/what-we-do` → `/about` (301)
- `/what-we-offer` → `/services` (301)
- Add more as discovered

### 3. Implementation

#### A. Middleware Redirects (`app/middleware.ts`)
```typescript
const redirects = {
  '/policies/privacy': '/privacy-policy',
  '/policies/privacy-notice': '/privacy-policy',
  '/terms': '/terms-of-service',
  '/policies/terms': '/terms-of-service',
};
```

#### B. Canonical Tags (Every Page)
Every page MUST have:
```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.org/exact-path',
  },
};
```

#### C. Sitemap (Only Canonical URLs)
`app/sitemap.ts` should ONLY include canonical URLs:
- ✅ `/privacy-policy`
- ❌ `/policies/privacy`
- ❌ `/policies/privacy-notice`

### 4. Vercel Configuration

#### A. Domain Redirects (`vercel.json`)
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{"type": "host", "value": "www.elevateforhumanity.org"}],
      "destination": "https://elevateforhumanity.org/:path*",
      "permanent": true,
      "statusCode": 301
    },
    {
      "source": "/:path*",
      "has": [{"type": "host", "value": "(.*)\\.vercel\\.app"}],
      "destination": "https://elevateforhumanity.org/:path*",
      "permanent": false,
      "statusCode": 302
    }
  ]
}
```

#### B. Cache Headers
```json
{
  "headers": [
    {
      "source": "/:path*",
      "headers": [
        {"key": "Cache-Control", "value": "public, s-maxage=0, must-revalidate"}
      ]
    }
  ]
}
```

### 5. Google Search Console Actions

#### A. Submit Canonical Sitemap
1. Go to Google Search Console
2. Sitemaps → Add new sitemap
3. Submit: `https://elevateforhumanity.org/sitemap.xml`
4. Remove any old sitemaps

#### B. Request URL Removal
For each duplicate URL Google has indexed:
1. URL Inspection → Enter duplicate URL
2. Click "Request Removal"
3. Reason: "Duplicate, canonical is [canonical-url]"

#### C. Request Re-indexing
For canonical URLs:
1. URL Inspection → Enter canonical URL
2. Click "Request Indexing"

### 6. Verification Checklist

- [ ] All www URLs redirect to non-www (301)
- [ ] All HTTP URLs redirect to HTTPS (automatic via Vercel)
- [ ] All preview deployments redirect to production (302)
- [ ] All duplicate paths redirect to canonical (301)
- [ ] Every page has correct canonical tag
- [ ] Sitemap only contains canonical URLs
- [ ] Google Search Console has canonical sitemap
- [ ] Requested removal of duplicate URLs in GSC
- [ ] Requested re-indexing of canonical URLs

### 7. Timeline
- **Immediate:** Redirects and canonical tags active
- **24-48 hours:** Google starts re-crawling
- **1-2 weeks:** Old URLs removed from index
- **2-4 weeks:** Full consolidation complete

### 8. Monitoring
Check weekly:
- `site:elevateforhumanity.org` in Google
- Look for duplicate URLs
- Check Google Search Console → Coverage report
- Verify canonical URLs are indexed, duplicates are not

---

**Status:** In Progress
**Last Updated:** 2026-01-06
**Agent:** Ona
