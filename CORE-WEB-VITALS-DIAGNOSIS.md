# Core Web Vitals & Search Console Diagnosis

**Date:** 2026-01-05  
**Source:** Google Search Console Data  
**Status:** 🔴 CRITICAL ISSUES FOUND

---

## Executive Summary

| Metric | Status | Issue |
|--------|--------|-------|
| **Core Web Vitals** | 🔴 **NO DATA** | Not enough traffic or failing |
| **Indexing** | 🔴 **CRITICAL** | 614 pages NOT indexed (71%) |
| **Videos** | 🔴 **CRITICAL** | 5 videos NOT indexed |
| **Search Performance** | 🟡 **LOW** | Only 225 clicks total |
| **HTTPS** | ✅ **GOOD** | 39 pages secure |
| **Enhancements** | ✅ **GOOD** | Breadcrumbs, FAQ working |

---

## 1. Core Web Vitals - NO DATA

### Current Status

```
Mobile: No data
Desktop: No data
```

### Why "No Data"?

**Possible causes:**

1. **Not enough traffic** (most likely)
   - Need 28 days of data
   - Need minimum threshold of visits
   - Current: 225 clicks total (very low)

2. **Failing all metrics** (possible)
   - LCP > 4 seconds
   - INP > 500ms
   - CLS > 0.25

3. **Recently launched** (possible)
   - Google needs time to collect data
   - Wait 28 days after launch

### Diagnosis: Homepage Performance

**LCP (Largest Contentful Paint) - LIKELY POOR**

**Issue:** Hero video is 6.7 MB
```
Download time on 5 Mbps: ~10 seconds ❌ POOR
Download time on 3G: ~20 seconds ❌ VERY POOR
Target: < 2.5 seconds ✅ GOOD
```

**Fix:** Compress hero video
```bash
# Current: 6.7 MB
# Target: 2-3 MB
# Savings: 4 MB (60% reduction)
```

**INP (Interaction to Next Paint) - LIKELY GOOD**

**Current setup:**
- No heavy JavaScript on homepage
- Async loading enabled
- No blocking scripts

**Estimated:** < 200ms ✅ GOOD

**CLS (Cumulative Layout Shift) - NEEDS CHECK**

**Potential issues:**
- Video loading without dimensions
- Images without width/height
- Dynamic content insertion

**Need to verify:**
- Video has explicit dimensions
- Images have aspect ratio
- No layout shifts during load

---

## 2. Indexing - CRITICAL ISSUE

### Current Status

```
Indexed: 255 pages (29%)
Not indexed: 614 pages (71%)
Total: 869 pages
```

### Analysis

**This is VERY BAD:**
- 71% of pages are NOT indexed
- Google is rejecting most of your content
- Massive SEO problem

### Common Causes

**1. Duplicate Content (most likely)**
- Multiple URLs for same content
- Pagination issues
- Parameter variations

**2. Crawl Budget Issues**
- Too many pages
- Slow server response
- Redirect chains

**3. Quality Issues**
- Thin content
- Auto-generated pages
- Low-value pages

**4. Technical Issues**
- Canonical URL problems
- Noindex tags
- Robots.txt blocking

### Immediate Actions Needed

**Check Coverage Report:**
1. Go to Search Console → Pages
2. Click "Not indexed" (614 pages)
3. Look at reasons:
   - "Duplicate without user-selected canonical"
   - "Crawled - currently not indexed"
   - "Discovered - currently not indexed"
   - "Alternate page with proper canonical tag"
   - "Page with redirect"
   - "Soft 404"
   - "404 Not found"

**Most likely issues:**

1. **LMS pages being indexed** (should be blocked)
   - /lms/courses/*
   - /lms/lessons/*
   - /lms/admin/*
   - Solution: Already blocked in robots.txt ✅

2. **Dynamic routes creating too many URLs**
   - User profiles
   - Course variations
   - Search results
   - Solution: Add noindex to dynamic pages

3. **Old sitemap URLs** (already fixed)
   - 8 video pages returning 404
   - Solution: Fix deployed, waiting for reindex

---

## 3. Video Indexing - CRITICAL

### Current Status

```
Indexed: 1 video
Not indexed: 5 videos
```

### Why Videos Not Indexed

**Possible causes:**

1. **Video pages returning 404** ✅ FIXED
   - Fixed in commit c7f5a3c
   - Using relative imports now
   - Waiting for Google to recrawl

2. **Missing VideoObject schema**
   - Need to verify schema is present
   - Need to verify schema is valid

3. **Videos not on watch pages**
   - Videos must be primary content
   - Not background elements

4. **Video files too large**
   - Google may not crawl large videos
   - Hero video: 6.7 MB (may be too large)

### Verification Needed

**Check video pages:**
```bash
# Test if video pages work
curl -I https://www.elevateforhumanity.org/videos/hero-home
curl -I https://www.elevateforhumanity.org/videos/cna-hero
curl -I https://www.elevateforhumanity.org/videos/barber-hero
```

**Check VideoObject schema:**
```bash
# View page source and look for:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  ...
}
</script>
```

---

## 4. Search Performance - LOW TRAFFIC

### Current Metrics

```
Total clicks: 225
Period: 10/4/25 - 12/12/25 (69 days)
Average: 3.3 clicks/day
```

### Analysis

**This is VERY LOW for a website with 869 pages**

**Expected:**
- 869 pages × 1 click/day = 869 clicks/day
- Actual: 3.3 clicks/day
- Performance: 0.4% of expected

**Why so low?**

1. **71% of pages not indexed** (main issue)
   - Only 255 pages can get traffic
   - 614 pages invisible to Google

2. **Low rankings**
   - Pages may be indexed but not ranking
   - Need to check average position

3. **Low search volume**
   - Niche topics
   - Local market only

4. **New website**
   - Takes 6-12 months to build authority
   - Need backlinks and content

---

## 5. Specific Page Issues

### Founder Page - Losing Impressions

```
https://www.elevateforhumanity.org/founder
Impressions: Down 100%
```

**Possible causes:**
- Page removed from index
- Lost rankings
- Seasonal drop
- Competitor outranking

**Action:** Check if page is still indexed
```
site:www.elevateforhumanity.org/founder
```

### Barber Apprenticeship - Gaining Impressions

```
https://www.elevateforhumanity.org/programs/barber-apprenticeship
Impressions: Up significantly
```

**This is GOOD:**
- Page gaining visibility
- Rankings improving
- Content resonating

**Action:** Optimize further
- Add more content
- Get backlinks
- Update regularly

---

## 6. Enhancements - GOOD

### Working Features

**Breadcrumbs:** 76 valid ✅
- Helps navigation
- Improves SEO
- Good user experience

**FAQ:** 1 valid ✅
- Rich snippet eligible
- Increases visibility
- Answers user questions

**Review Snippets:** 37 valid, 2 invalid ⚠️
- Most working correctly
- 2 need fixing

**Action:** Fix 2 invalid review snippets
- Check which pages have invalid reviews
- Fix schema markup
- Resubmit for validation

---

## Priority Actions

### 🔴 CRITICAL (Do Immediately)

**1. Fix Indexing Issue (614 pages not indexed)**

**Action:**
```
1. Go to Search Console → Pages
2. Click "Not indexed" (614 pages)
3. Identify top reasons
4. Fix based on reason:
   - Duplicate: Add canonical URLs
   - Crawled not indexed: Improve content quality
   - 404: Fix broken links
   - Noindex: Remove noindex tags
```

**2. Fix Video Pages 404**

**Status:** Already fixed, waiting for deployment

**Verify:**
```bash
# After deployment, test:
curl -I https://www.elevateforhumanity.org/videos/hero-home
# Should return: HTTP/2 200
```

**3. Request Reindexing**

**Action:**
```
1. Go to Search Console → URL Inspection
2. Enter each video page URL
3. Click "Request Indexing"
4. Repeat for all 8 video pages
```

### 🟡 HIGH PRIORITY (Do This Week)

**4. Compress Hero Video**

**Current:** 6.7 MB  
**Target:** 2-3 MB  
**Impact:** Improves LCP by 5-8 seconds

**Command:**
```bash
ffmpeg -i hero-home.mp4 -c:v libx264 -crf 28 -preset slow \
  -c:a aac -b:a 128k hero-home-optimized.mp4
```

**5. Add Poster Image to Video**

**Why:** Improves LCP (image loads faster than video)

**Add to VideoHeroBanner:**
```typescript
<video poster="/images/heroes/hero-homepage.jpg">
```

**6. Fix 2 Invalid Review Snippets**

**Action:**
```
1. Search Console → Enhancements → Review snippets
2. Click "Invalid" (2)
3. See which pages have errors
4. Fix schema markup
5. Validate with Rich Results Test
```

### 🟢 MEDIUM PRIORITY (Do This Month)

**7. Improve Content Quality**

**For pages not indexed:**
- Add more unique content (300+ words)
- Add images and media
- Improve internal linking
- Update regularly

**8. Build Backlinks**

**Current:** Likely very few  
**Target:** 10-20 quality backlinks/month

**Methods:**
- Partner websites
- Local directories
- Industry associations
- Guest posts

**9. Monitor Core Web Vitals**

**Once you have data:**
- Check PageSpeed Insights weekly
- Monitor Search Console monthly
- Fix issues as they appear

---

## Expected Timeline

### Week 1 (Immediate)
- ✅ Fix video pages 404 (already done)
- ⏳ Request reindexing of video pages
- ⏳ Identify why 614 pages not indexed

### Week 2
- Compress hero video
- Add poster image
- Fix invalid review snippets

### Week 3-4
- Improve content on not-indexed pages
- Start backlink building
- Monitor reindexing progress

### Month 2-3
- Core Web Vitals data should appear
- Indexing should improve
- Traffic should increase

### Month 6
- Target: 500+ indexed pages (from 255)
- Target: 1000+ clicks/month (from 225)
- Target: Core Web Vitals all "Good"

---

## Monitoring Checklist

### Weekly
- [ ] Check Search Console for new issues
- [ ] Monitor indexed pages count
- [ ] Check video indexing status
- [ ] Review top queries and pages

### Monthly
- [ ] Run PageSpeed Insights
- [ ] Check Core Web Vitals (when data available)
- [ ] Review coverage report
- [ ] Analyze traffic trends
- [ ] Check for new enhancement errors

### Quarterly
- [ ] Full SEO audit
- [ ] Backlink analysis
- [ ] Content quality review
- [ ] Competitor analysis

---

## Questions to Answer

**From Search Console, please provide:**

1. **Not indexed reasons:**
   - Go to Pages → Not indexed
   - What are the top 3 reasons?
   - How many pages for each reason?

2. **Founder page:**
   - Is it still indexed? (search: site:www.elevateforhumanity.org/founder)
   - What's the current status in URL Inspection?

3. **Video pages:**
   - Are they showing as indexed now?
   - Any errors in URL Inspection?

4. **Average position:**
   - What's the average position in search results?
   - Performance → Average position

---

**Diagnosis performed by:** Ona  
**Priority:** 🔴 CRITICAL - 71% of pages not indexed  
**Next:** Identify specific reasons for non-indexing
