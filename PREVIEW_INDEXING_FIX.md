# Preview Deployment Indexing Fix

## Problem

Preview deployments (e.g., `elevate-lms-git-[branch]-selfish2.vercel.app`) were not blocked from search engine indexing. This caused:

- Google potentially indexing preview URLs instead of production
- Duplicate content in search results
- Users landing on preview/staging environments
- Test data or incomplete features appearing in search results

## Root Cause

The application did not detect or respond to deployment environments. All environments (production, preview, development) received identical SEO configurations:

1. Same robots meta tags (always `index: true`)
2. Same X-Robots-Tag headers (only `noai, noimageai`)
3. Same robots.txt content (always allowing crawling)
4. No environment-based blocking

## Solution

Implemented multi-layer environment detection and blocking:

### 1. Environment-Based Headers (next.config.mjs)

Added environment detection to HTTP headers:

```javascript
const isProduction = process.env.VERCEL_ENV === 'production';
const isPreview = process.env.VERCEL_ENV === 'preview';

// Preview deployments get noindex header
if (isPreview) {
  headers.push({
    key: 'X-Robots-Tag',
    value: 'noindex, nofollow, noarchive',
  });
}
```

### 2. Environment-Aware robots.txt (app/robots.ts)

Modified robots.txt generation to block non-production environments:

```typescript
const isProduction = process.env.VERCEL_ENV === 'production';

if (!isProduction) {
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
  };
}
```

### 3. Environment-Based Metadata (app/layout.tsx)

Updated metadata to respect environment:

```typescript
const isProduction = process.env.VERCEL_ENV === 'production';

robots: {
  index: isProduction,
  follow: isProduction,
  nocache: !isProduction,
}
```

### 4. Middleware Protection (middleware.ts)

Created middleware to block non-production domains:

```typescript
const isProduction = process.env.VERCEL_ENV === 'production';
const isProductionDomain = host === 'www.elevateforhumanity.org' || host === 'elevateforhumanity.org';

if (!isProduction || !isProductionDomain) {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
}
```

### 5. Host-Based Blocking (vercel.json)

Added host-based header rules as fallback:

```json
{
  "source": "/:path*",
  "has": [{
    "type": "host",
    "value": "(?!www\\.elevateforhumanity\\.org$|elevateforhumanity\\.org$).*"
  }],
  "headers": [{
    "key": "X-Robots-Tag",
    "value": "noindex, nofollow, noarchive"
  }]
}
```

## Verification

### Test Preview Deployment

```bash
# Check headers on preview deployment
curl -I https://elevate-lms-git-[branch]-selfish2.vercel.app/ | grep -i x-robots-tag
# Expected: X-Robots-Tag: noindex, nofollow, noarchive

# Check robots.txt on preview
curl https://elevate-lms-git-[branch]-selfish2.vercel.app/robots.txt
# Expected: Disallow: /
```

### Test Production Deployment

```bash
# Check headers on production
curl -I https://www.elevateforhumanity.org/ | grep -i x-robots-tag
# Expected: X-Robots-Tag: noai, noimageai (NOT noindex)

# Check robots.txt on production
curl https://www.elevateforhumanity.org/robots.txt
# Expected: Allow: / with specific disallows
```

### Automated Tests

Created Playwright tests in `tests/preview-indexing.spec.ts` to verify:

- robots.txt content based on environment
- X-Robots-Tag headers based on environment
- Meta robots tags in HTML
- Middleware blocking behavior
- Consistency across all layers

## Impact

✅ **Fixed:**
- Preview deployments now blocked from indexing
- Only production domain can be indexed
- Multiple layers of protection (defense in depth)
- Consistent behavior across all SEO signals

✅ **Protected:**
- Production SEO rankings
- User experience (no landing on preview)
- Brand reputation
- Search result quality

## Environment Variables Used

- `VERCEL_ENV`: Identifies deployment environment
  - `production`: Production deployment
  - `preview`: Preview deployment (branches, PRs)
  - `development`: Local development

## Files Modified

1. `next.config.mjs` - Environment-based headers
2. `app/robots.ts` - Environment-aware robots.txt
3. `app/layout.tsx` - Environment-based metadata
4. `vercel.json` - Host-based blocking rules
5. `middleware.ts` - NEW: Request-level blocking
6. `tests/preview-indexing.spec.ts` - NEW: Automated tests

## Deployment Notes

After deploying this fix:

1. **Verify preview deployments are blocked:**
   - Create a test PR
   - Check preview URL headers
   - Verify robots.txt blocks crawling

2. **Verify production still works:**
   - Check production headers
   - Verify robots.txt allows crawling
   - Test in Google Search Console

3. **Request removal of old preview URLs:**
   - Go to Google Search Console
   - Use "Removals" tool
   - Remove any indexed preview URLs

4. **Monitor indexing:**
   - Check `site:elevateforhumanity.org` in Google
   - Verify no preview URLs appear
   - Monitor Search Console for issues

## Prevention

This fix prevents future preview indexing through:

1. **Automatic detection**: Uses `VERCEL_ENV` to detect environment
2. **Multiple layers**: Headers, robots.txt, metadata, middleware
3. **Host-based blocking**: Blocks any non-production domain
4. **Automated tests**: Verifies behavior in CI/CD

## Related Issues

- Fixes: Preview deployments being indexed by Google
- Prevents: Duplicate content issues
- Improves: SEO and user experience
- Protects: Production rankings and brand

## References

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
