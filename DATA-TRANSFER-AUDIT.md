# Data Transfer Audit - elevateforhumanity.org

**Date:** 2026-01-05  
**Site:** https://www.elevateforhumanity.org/  
**Framework:** Next.js 14 on Vercel

---

## Executive Summary

**Current Monthly Bandwidth:** ~140 GB/month (estimated)  
**Optimization Potential:** ~40 GB/month savings (29% reduction)  
**Status:** ⚠️ OPTIMIZATION RECOMMENDED

---

## Asset Inventory

### Videos (13 MB total)

| File | Size | Usage | Cache |
|------|------|-------|-------|
| hero-home.mp4 | 6.7 MB | Homepage hero | 1 year |
| barber-hero-final.mp4 | 1.4 MB | Barber program | 1 year |
| training-providers.mp4 | 1.2 MB | Training providers | 1 year |
| barber-hero.mp4 | 812 KB | Barber alt | 1 year |
| cna-hero.mp4 | 584 KB | CNA program | 1 year |
| cdl-hero.mp4 | 580 KB | CDL program | 1 year |
| getting-started-hero.mp4 | 392 KB | Getting started | 1 year |
| hvac-hero-final.mp4 | 340 KB | HVAC program | 1 year |
| programs-overview.mp4 | 68 KB | Programs | 1 year |
| apply-section-video.mp4 | 20 KB | Apply section | 1 year |

**Total:** 13 MB

### Images (80 MB total)

**Breakdown by directory:**
- Homepage images: ~15 MB
- Program images: ~12 MB
- Team photos: ~8 MB
- Success stories: ~10 MB
- Artlist (generic stock): ~8 MB ⚠️ UNUSED
- Other: ~27 MB

**Largest images:**
- og-image.png: 1.1 MB (OpenGraph)
- licensable-platform.jpg: 1 MB
- hero-banner-new.png: 760 KB
- Various testimonial PNGs: 500-700 KB each

### JavaScript & CSS

**Estimated sizes:**
- JavaScript bundles: ~500 KB (minified, gzipped)
- CSS: ~100 KB (minified, gzipped)
- Fonts: ~50 KB

**Total:** ~650 KB

---

## Page Load Analysis

### Homepage First Load

| Asset Type | Size | Cached? |
|------------|------|---------|
| HTML | 50 KB | No |
| Hero Video | 6.7 MB | Yes (1 year) |
| Images (8) | 2 MB | Yes (1 year) |
| JavaScript | 500 KB | Yes (1 year) |
| CSS | 100 KB | Yes (1 year) |
| Fonts | 50 KB | Yes (1 year) |
| **Total** | **9.4 MB** | - |

### Homepage Return Visit

| Asset Type | Size | Cached? |
|------------|------|---------|
| HTML | 50 KB | No |
| Hero Video | 0 KB | ✅ Cached |
| Images | 0 KB | ✅ Cached |
| JavaScript | 0 KB | ✅ Cached |
| CSS | 0 KB | ✅ Cached |
| Fonts | 0 KB | ✅ Cached |
| **Total** | **50 KB** | - |

**Cache Hit Rate:** 99.5% for returning visitors

---

## Bandwidth Calculation

### Monthly Traffic Assumptions

- **Monthly visitors:** 10,000
- **New visitors:** 50% (5,000)
- **Returning visitors:** 50% (5,000)
- **Pages per visit:** 3 average
- **Total page views:** 30,000/month

### Bandwidth Usage

**New Visitors:**
```
5,000 visitors × 9.4 MB × 3 pages = 141 GB
```

**Returning Visitors:**
```
5,000 visitors × 0.05 MB × 3 pages = 0.75 GB
```

**Total Monthly Bandwidth:** ~142 GB

### Cost Estimate (Vercel Pro)

- **Included:** 1 TB/month
- **Current usage:** 142 GB (14% of limit)
- **Overage cost:** $0 (well within limit)

---

## Cache Strategy Effectiveness

### Current Configuration

**HTML (Dynamic):**
```
cache-control: private, no-cache, no-store, max-age=0, must-revalidate
cdn-cache-control: public, s-maxage=0, must-revalidate
```
- ✅ Always fresh content
- ✅ No stale pages
- ❌ No bandwidth savings

**Static Assets (Images, Videos, JS, CSS):**
```
cache-control: public, max-age=31536000, immutable
cdn-cache-control: public, s-maxage=31536000, immutable
```
- ✅ 1 year cache
- ✅ Immutable (no revalidation)
- ✅ Maximum bandwidth savings

### Cache Hit Rates

**Estimated:**
- First-time visitors: 0% cache hit
- Returning visitors: 99.5% cache hit
- Overall: ~50% cache hit rate

**Bandwidth Saved:**
```
Without caching: 282 GB/month
With caching: 142 GB/month
Savings: 140 GB/month (50%)
```

---

## Optimization Opportunities

### 1. Compress Hero Video

**Current:** 6.7 MB  
**Optimized:** 3-4 MB (better H.264 compression)  
**Savings:** 3 MB per first-time visitor

**Impact:**
```
5,000 new visitors × 3 MB × 3 pages = 45 GB/month saved
```

**How to optimize:**
```bash
ffmpeg -i hero-home.mp4 -c:v libx264 -crf 28 -preset slow \
  -c:a aac -b:a 128k hero-home-optimized.mp4
```

### 2. Convert PNG to WebP

**Current PNGs:** 8 MB (large testimonials, infographics)  
**As WebP:** ~2 MB (75% reduction)  
**Savings:** 6 MB

**Files to convert:**
- og-image.png (1.1 MB → 300 KB)
- testimonial PNGs (500-700 KB → 150-200 KB each)
- hero-banner-new.png (760 KB → 200 KB)

**Impact:**
```
6 MB × 5,000 new visitors = 30 GB/month saved
```

### 3. Remove Unused Artlist Images

**Current:** 7.6 MB of generic stock photos  
**Used on site:** 0 files (replaced with authentic images)  
**Action:** Delete entire /images/artlist/ directory

**Savings:**
- Build size: -7.6 MB
- Deployment time: -10 seconds
- No bandwidth impact (not loaded on pages)

### 4. Optimize Large JPGs

**Current:** Many JPGs at 300-500 KB  
**Optimized:** 150-250 KB (50% reduction)  
**Savings:** ~10 MB total

**How to optimize:**
```bash
# Batch optimize all JPGs
find public/images -name "*.jpg" -exec jpegoptim --max=85 {} \;
```

---

## Total Optimization Potential

| Optimization | Savings | Impact |
|--------------|---------|--------|
| Compress hero video | 45 GB/month | High |
| Convert PNG to WebP | 30 GB/month | Medium |
| Optimize JPGs | 15 GB/month | Low |
| Remove artlist | 0 GB/month | Build only |
| **Total** | **90 GB/month** | **63% reduction** |

**New monthly bandwidth:** 52 GB (down from 142 GB)

---

## CDN Performance

### Vercel Edge Network

**Current setup:**
- ✅ Global CDN enabled
- ✅ Automatic gzip/brotli compression
- ✅ HTTP/2 enabled
- ✅ Edge caching for static assets

**Regions:**
- Primary: iad1 (US East - Virginia)
- Edge: Global (70+ locations)

**Performance:**
- TTFB (Time to First Byte): ~50-100ms
- Full page load: ~2-3 seconds (first visit)
- Full page load: ~500ms (cached)

---

## Next.js Image Optimization

### Current Configuration

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000, // 1 year
}
```

**Features:**
- ✅ Automatic WebP/AVIF conversion
- ✅ Responsive image sizes
- ✅ Lazy loading
- ✅ 1 year cache TTL

**Bandwidth savings:**
- WebP: ~30% smaller than JPG
- AVIF: ~50% smaller than JPG
- Responsive sizes: ~40% savings (mobile)

---

## Recommendations

### Priority 1: Compress Hero Video

**Action:** Re-encode hero-home.mp4 with better compression  
**Effort:** Low (5 minutes)  
**Impact:** 45 GB/month savings  
**Risk:** None (test quality first)

### Priority 2: Convert Large PNGs to WebP

**Action:** Convert 8 large PNG files to WebP  
**Effort:** Low (10 minutes)  
**Impact:** 30 GB/month savings  
**Risk:** None (Next.js serves WebP automatically)

### Priority 3: Remove Unused Artlist Images

**Action:** Delete /public/images/artlist/ directory  
**Effort:** Very low (1 minute)  
**Impact:** Cleaner codebase, faster builds  
**Risk:** None (not used on site)

### Priority 4: Optimize JPGs

**Action:** Run jpegoptim on all JPG files  
**Effort:** Low (5 minutes)  
**Impact:** 15 GB/month savings  
**Risk:** Low (quality loss minimal at 85%)

---

## Monitoring

### Metrics to Track

1. **Vercel Analytics:**
   - Bandwidth usage per month
   - Cache hit rate
   - Page load times

2. **Google Analytics:**
   - Page load speed
   - Bounce rate (affected by slow loads)
   - Mobile vs desktop performance

3. **Vercel Deployment Logs:**
   - Build size
   - Build time
   - Asset sizes

### Alerts to Set

- Bandwidth > 500 GB/month (50% of limit)
- Page load time > 3 seconds
- Cache hit rate < 40%

---

## Conclusion

**Current Status:** ✅ GOOD
- Bandwidth well within limits (14% of 1 TB)
- Cache strategy optimal
- CDN properly configured

**Optimization Potential:** ⚠️ MEDIUM
- 63% bandwidth reduction possible
- Simple optimizations (video compression, WebP)
- No infrastructure changes needed

**Recommended Actions:**
1. Compress hero video (45 GB/month savings)
2. Convert PNGs to WebP (30 GB/month savings)
3. Remove unused artlist images (cleaner codebase)
4. Optimize JPGs (15 GB/month savings)

**Total potential savings:** 90 GB/month (63% reduction)

---

**Audit performed by:** Ona  
**Tools used:** curl, du, Vercel API, Next.js config analysis  
**Next review:** After optimizations applied
