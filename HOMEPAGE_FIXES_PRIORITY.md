# Homepage Performance Fixes - Priority Order

**Date**: January 12, 2026  
**Status**: Action Required  
**Estimated Total Time**: 6-8 hours

---

## 🔴 CRITICAL - Fix Immediately (2-3 hours)

### 1. Optimize Hero Video (1 hour)
**Impact**: 5-8s faster load time on mobile  
**Difficulty**: Easy

**Current**: 6.7MB MP4 file  
**Target**: <500KB for mobile, <2MB for desktop

**Steps:**
```bash
# Install ffmpeg if not available
brew install ffmpeg  # or apt-get install ffmpeg

# Create mobile version (360p, highly compressed)
ffmpeg -i public/videos/hero-home.mp4 \
  -vf scale=640:-2 \
  -c:v libx264 -crf 28 -preset slow \
  -c:a aac -b:a 64k \
  public/videos/hero-home-mobile.mp4

# Create desktop version (720p, compressed)
ffmpeg -i public/videos/hero-home.mp4 \
  -vf scale=1280:-2 \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  public/videos/hero-home-compressed.mp4

# Create poster image
ffmpeg -i public/videos/hero-home.mp4 \
  -ss 00:00:01 -vframes 1 \
  public/images/hero-poster.jpg
```

**Code Changes:**
```typescript
// components/home/VideoHeroBanner.tsx
<video
  ref={videoRef}
  poster="/images/hero-poster.jpg"  // ADD THIS
  preload="metadata"  // CHANGE from "none"
  autoPlay
  muted
  playsInline
>
  <source 
    src="/videos/hero-home-mobile.mp4" 
    type="video/mp4" 
    media="(max-width: 768px)" 
  />
  <source 
    src="/videos/hero-home-compressed.mp4" 
    type="video/mp4" 
  />
</video>
```

**Expected Result**: 
- Mobile: 6.7MB → 400KB (94% reduction)
- Desktop: 6.7MB → 1.5MB (78% reduction)
- Load time: 8-12s → 1-2s on 4G

---

### 2. Remove Cache Busting (15 minutes)
**Impact**: 50% faster for returning visitors  
**Difficulty**: Very Easy

**File**: `app/layout.tsx` lines 192-200

**Change:**
```typescript
// BEFORE (lines 192-200)
<meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0" />
<meta httpEquiv="Pragma" content="no-cache" />
<meta httpEquiv="Expires" content="0" />
<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
<meta name="cache-control" content="no-cache" />
<meta name="cache-control" content="no-store" />
<meta name="cache-control" content="must-revalidate" />
<meta name="expires" content="0" />
<meta name="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta name="pragma" content="no-cache" />

// AFTER (only in development)
{process.env.NODE_ENV === 'development' && (
  <>
    <meta httpEquiv="Cache-Control" content="no-cache" />
    <meta httpEquiv="Pragma" content="no-cache" />
  </>
)}
<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
```

**Expected Result**: Returning visitors load 2-3x faster

---

### 3. Fix Font Loading (15 minutes)
**Impact**: 200-400ms faster initial render  
**Difficulty**: Very Easy

**File**: `app/layout.tsx` lines 14-27

**Change:**
```typescript
// BEFORE
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif',
  ],
  preload: true, // ❌ DUPLICATE
  adjustFontFallback: true,
});

// AFTER
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // Non-blocking
  variable: '--font-inter',
  preload: true,  // ✅ Only once
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
});
```

**Expected Result**: Page renders 200-400ms faster

---

### 4. Remove Duplicate OpenGraph (10 minutes)
**Impact**: Cleaner code, slightly faster parsing  
**Difficulty**: Very Easy

**File**: `app/layout.tsx`

**Change:**
```typescript
// REMOVE lines 88-100 (first openGraph block)
// KEEP lines 120-130 (second openGraph block with images)
```

**Expected Result**: Cleaner metadata, no functional change

---

## 🟡 HIGH PRIORITY - Fix This Week (2-3 hours)

### 5. Memoize Navigation Transformation (15 minutes)
**Impact**: 5-10ms per render  
**Difficulty**: Easy

**File**: `components/layout/SiteHeader.tsx` lines 19-25

**Change:**
```typescript
// BEFORE
const navItems = navigation.map(section => ({
  name: section.label,
  href: section.href || '#',
  children: section.items?.map(item => ({
    name: item.label,
    href: item.href
  }))
}));

// AFTER
const navItems = useMemo(() => 
  navigation.map(section => ({
    name: section.label,
    href: section.href || '#',
    children: section.items?.map(item => ({
      name: item.label,
      href: item.href
    }))
  })),
  [navigation]
);
```

**Expected Result**: Eliminates unnecessary re-computation

---

### 6. Increase User Cache Duration (5 minutes)
**Impact**: 100-300ms saved on subsequent page loads  
**Difficulty**: Very Easy

**File**: `hooks/useUser.ts`

**Change:**
```typescript
// BEFORE
export function useUser() {
  const { data, error, isLoading } = useSWR<AuthResponse>(
    '/api/auth/me',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,  // 1 minute
    }
  );
  return { user: data?.user ?? null, isLoading, isError: !!error };
}

// AFTER
export function useUser() {
  const { data, error, isLoading } = useSWR<AuthResponse>(
    '/api/auth/me',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,  // 5 minutes
    }
  );
  return { user: data?.user ?? null, isLoading, isError: !!error };
}
```

**Expected Result**: Fewer API calls, faster navigation

---

### 7. Add Priority to Above-Fold Images (20 minutes)
**Impact**: 50-100ms faster LCP  
**Difficulty**: Easy

**File**: `app/page.tsx` lines 85-91

**Change:**
```typescript
// BEFORE
<Image
  src={feature.icon}
  alt={feature.title}
  fill
  className="object-contain"
/>

// AFTER
<Image
  src={feature.icon}
  alt={feature.title}
  fill
  priority  // ADD THIS
  className="object-contain"
/>
```

**Expected Result**: Icons load faster, better LCP score

---

### 8. Lazy Load Below-Fold Components (1 hour)
**Impact**: 300-600ms faster initial load  
**Difficulty**: Medium

**File**: `app/page.tsx` lines 5-13

**Change:**
```typescript
// BEFORE
const Intro = dynamic(() => import('@/components/home/Intro'), { 
  loading: () => <div className="h-96 bg-white" /> 
});
const Orientation = dynamic(() => import('@/components/home/Orientation'), { 
  loading: () => <div className="h-96 bg-white" /> 
});
// ... etc

// AFTER
const Intro = dynamic(() => import('@/components/home/Intro'), { 
  loading: () => <div className="h-96 bg-white" />,
  ssr: false  // ADD THIS
});
const Orientation = dynamic(() => import('@/components/home/Orientation'), { 
  loading: () => <div className="h-96 bg-white" />,
  ssr: false  // ADD THIS
});
// ... etc
```

**Expected Result**: Smaller initial bundle, faster TTI

---

### 9. Remove VideoHeroBanner Dynamic Import (10 minutes)
**Impact**: 20-40ms faster hero display  
**Difficulty**: Very Easy

**File**: `app/page.tsx` lines 5-7

**Change:**
```typescript
// BEFORE
const VideoHeroBanner = dynamic(() => import('@/components/home/VideoHeroBanner'), { 
  loading: () => <div className="h-screen bg-white" /> 
});

// AFTER
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
```

**Rationale**: Above-the-fold content should load immediately

**Expected Result**: Hero appears faster

---

### 10. Consolidate VideoHeroBanner useEffect Hooks (30 minutes)
**Impact**: Cleaner code, slightly better performance  
**Difficulty**: Medium

**File**: `components/home/VideoHeroBanner.tsx`

**Change:**
```typescript
// BEFORE (3 separate useEffect hooks)
useEffect(() => { /* mount logic */ }, []);
useEffect(() => { /* video load logic */ }, [shouldLoadVideo, withAudio, voiceoverSrc]);
useEffect(() => { /* event listeners */ }, [videoSrc]);

// AFTER (1 consolidated hook)
useEffect(() => {
  setIsMounted(true);
  setShouldLoadVideo(true);
  
  const video = videoRef.current;
  if (!video) return;

  const handleCanPlay = () => setIsLoaded(true);
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  video.addEventListener('canplay', handleCanPlay);
  video.addEventListener('error', handleError);

  // Autoplay logic
  if (voiceoverSrc && audioRef.current) {
    audioRef.current.muted = false;
    audioRef.current.play().catch(() => {});
  }
  
  if (withAudio && video) {
    video.muted = false;
  }

  return () => {
    video.removeEventListener('canplay', handleCanPlay);
    video.removeEventListener('error', handleError);
  };
}, [withAudio, voiceoverSrc, videoSrc]);
```

**Expected Result**: Cleaner code, fewer re-renders

---

## 🟢 MEDIUM PRIORITY - Fix This Month (2-3 hours)

### 11. Implement Intersection Observer (1.5 hours)
**Impact**: Only load content when visible  
**Difficulty**: Medium

**Create**: `hooks/useIntersectionObserver.ts`

```typescript
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible] as const;
}
```

**Usage in** `app/page.tsx`:
```typescript
const [introRef, introVisible] = useIntersectionObserver();
const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();

return (
  <>
    <div ref={introRef}>
      {introVisible && <Intro />}
    </div>
    <div ref={testimonialsRef}>
      {testimonialsVisible && <Testimonials />}
    </div>
  </>
);
```

**Expected Result**: Components only load when scrolled into view

---

### 12. Convert Icons to SVG (1 hour)
**Impact**: Smaller file sizes, better scaling  
**Difficulty**: Easy

**Steps:**
1. Convert PNG icons to SVG using online tool or Figma
2. Replace Image components with inline SVG
3. Remove PNG files

**Expected Result**: 50% smaller icon files, better quality

---

### 13. Add Bundle Analyzer (30 minutes)
**Impact**: Identify optimization opportunities  
**Difficulty**: Easy

**Install:**
```bash
npm install --save-dev @next/bundle-analyzer
```

**Configure** `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... existing config
});
```

**Run:**
```bash
ANALYZE=true npm run build
```

**Expected Result**: Visual map of bundle size

---

## Implementation Checklist

### Week 1 (Critical Fixes)
- [ ] Optimize hero video (mobile + desktop versions)
- [ ] Add video poster image
- [ ] Remove cache busting headers
- [ ] Fix font loading (remove duplicate preload)
- [ ] Remove duplicate OpenGraph metadata
- [ ] Test on mobile device (4G connection)

### Week 2 (High Priority)
- [ ] Memoize navigation transformation
- [ ] Increase user cache duration
- [ ] Add priority to above-fold images
- [ ] Lazy load below-fold components
- [ ] Remove VideoHeroBanner dynamic import
- [ ] Consolidate useEffect hooks
- [ ] Run Lighthouse audit

### Week 3 (Medium Priority)
- [ ] Implement intersection observer
- [ ] Convert icons to SVG
- [ ] Add bundle analyzer
- [ ] Analyze and optimize largest chunks
- [ ] Run final performance tests

---

## Expected Results

### Before Fixes
| Metric | Value | Grade |
|--------|-------|-------|
| Load Time (4G) | 8-12s | ❌ F |
| Load Time (WiFi) | 3.5s | ⚠️ C |
| Video Size | 6.7MB | ❌ F |
| JS Bundle | 1.8MB | ❌ F |
| Lighthouse Performance | 65-75 | ⚠️ C |

### After Critical Fixes
| Metric | Value | Grade |
|--------|-------|-------|
| Load Time (4G) | 2-4s | ✅ B |
| Load Time (WiFi) | 1-1.5s | ✅ A |
| Video Size | 400KB-1.5MB | ✅ A |
| JS Bundle | 1.8MB | ⚠️ C |
| Lighthouse Performance | 75-85 | ✅ B |

### After All Fixes
| Metric | Value | Grade |
|--------|-------|-------|
| Load Time (4G) | 1-2s | ✅ A |
| Load Time (WiFi) | 0.5-1s | ✅ A+ |
| Video Size | 400KB-1.5MB | ✅ A |
| JS Bundle | 1.2MB | ✅ B |
| Lighthouse Performance | 85-95 | ✅ A |

---

## Testing Plan

### After Each Fix
1. Run `npm run build`
2. Test locally with throttled network (Chrome DevTools)
3. Check Lighthouse score
4. Verify no regressions

### Final Testing
1. Test on real mobile device (4G)
2. Test on slow 3G connection
3. Test with cache disabled
4. Test as returning visitor (cache enabled)
5. Run full Lighthouse audit
6. Check Web Vitals (LCP, FID, CLS)

---

## Success Criteria

✅ **Must Have:**
- Load time under 3s on 4G
- Video under 2MB
- Lighthouse Performance > 80
- No layout shift (CLS < 0.1)

✅ **Nice to Have:**
- Load time under 2s on 4G
- Video under 1MB
- Lighthouse Performance > 90
- Perfect accessibility score

---

**Created**: January 12, 2026  
**Owner**: Development Team  
**Priority**: CRITICAL  
**Deadline**: Week 1 fixes by January 19, 2026
