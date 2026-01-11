# Program Pages & Image Sizing - Complete Guide

**Compiled:** January 11, 2026  
**Purpose:** Consolidate all comments and guidance about program pages setup and image sizing

---

## 📋 Summary of Findings

I've searched the entire repository for comments about program pages setup and image sizing. Here's what I found:

---

## 🖼️ Image Sizing Guidelines

### Program Images

**Location:** `/public/programs/`

**Current Status:**
- ✅ SVG placeholders exist (hero images)
- ⚠️ Need real photos

**Recommended Specifications:**
```
Format: JPG or WebP
Size: < 100KB (optimized)
Dimensions: 1200x800px
Aspect Ratio: 3:2
Quality: 80-85%
```

**File Naming:**
```
program-name.jpg
Examples:
- cna-training.jpg
- hvac-training.jpg
- barber-apprenticeship.jpg
```

**Content Guidelines:**
- ✅ Actual training in progress
- ✅ Students learning
- ✅ Instructors teaching
- ✅ Facilities and equipment
- ❌ No stock photos
- ❌ No placeholder images

---

## 📄 Program Page Structure

### Hero Banner (Top Section)

**Current Implementation:**
```tsx
<section className="relative w-full -mt-[72px]">
  <Image 
    src="/media/programs/workforce-readiness-hero.jpg"
    alt="Free Career Training Programs"
    fill
    priority
    className="object-cover"
  />
  <div className="bg-gradient-to-br from-orange-600/90 to-orange-700/90" />
  {/* Hero content */}
</section>
```

**Specifications:**
- **Height:** 70vh (responsive)
- **Image:** 1920x1080px minimum
- **Overlay:** Orange gradient (90% opacity)
- **Position:** Extends under header (-mt-[72px])

**Content Elements:**
1. Badge: "WIOA-Funded Career Training"
2. Headline: Large (5xl-6xl)
3. Subheadline: Medium (2xl-3xl)
4. Description: Body text (lg-xl)
5. CTAs: Two buttons (Apply Now + Browse)

---

## 🎨 Image Specifications by Type

### 1. Hero Images (Full Width)

**Used On:**
- Program landing pages
- Category pages
- Homepage

**Specs:**
```
Dimensions: 1920x1080px (16:9)
File Size: < 200KB
Format: JPG or WebP
Quality: 85%
Loading: priority={true}
Object-fit: cover
```

### 2. Program Card Images

**Used On:**
- Program listings
- Category grids
- Search results

**Specs:**
```
Dimensions: 800x600px (4:3)
File Size: < 100KB
Format: JPG or WebP
Quality: 80%
Loading: lazy
Object-fit: cover
```

### 3. Thumbnail Images

**Used On:**
- Navigation dropdowns
- Quick links
- Related programs

**Specs:**
```
Dimensions: 400x300px (4:3)
File Size: < 50KB
Format: JPG or WebP
Quality: 75%
Loading: lazy
Object-fit: cover
```

### 4. Icon Images

**Used On:**
- Feature lists
- Benefits sections
- Quick stats

**Specs:**
```
Dimensions: 64x64px or 128x128px (1:1)
File Size: < 10KB
Format: SVG (preferred) or PNG
Quality: N/A (vector)
Loading: eager
```

---

## 📁 File Organization

### Directory Structure

```
public/
├── programs/
│   ├── README.md (guidelines)
│   ├── barber-hero.svg (placeholder)
│   ├── cna-hero.svg (placeholder)
│   ├── hvac-hero.svg (placeholder)
│   └── [add real photos here]
│
├── media/
│   └── programs/
│       └── workforce-readiness-hero.jpg
│
└── images/
    ├── programs/ (card images)
    ├── icons/ (feature icons)
    └── heroes/ (hero backgrounds)
```

---

## 🔧 Implementation Examples

### Hero Banner with Image

```tsx
<section className="relative w-full h-[70vh] -mt-[72px]">
  {/* Background Image */}
  <Image
    src="/media/programs/healthcare-hero.jpg"
    alt="Healthcare Training Programs"
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-orange-700/90" />
  
  {/* Content */}
  <div className="relative z-10 h-full flex items-center">
    <div className="max-w-7xl mx-auto px-4">
      <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-bold mb-4">
        WIOA-Funded Career Training
      </span>
      <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
        Healthcare Training Programs
      </h1>
      <p className="text-2xl md:text-3xl text-white/90 mb-6">
        100% Free • No Tuition • No Debt
      </p>
      <div className="flex gap-4">
        <a href="/apply" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold">
          Apply Now
        </a>
        <a href="#programs" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold">
          Browse Programs
        </a>
      </div>
    </div>
  </div>
</section>
```

### Program Card with Image

```tsx
<div className="bg-white rounded-xl overflow-hidden shadow-lg">
  {/* Card Image */}
  <div className="relative h-48">
    <Image
      src="/images/programs/cna-training.jpg"
      alt="CNA Training Program"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
  
  {/* Card Content */}
  <div className="p-6">
    <h3 className="text-xl font-bold mb-2">CNA Training</h3>
    <p className="text-gray-600 mb-4">
      Become a Certified Nursing Assistant in 4-6 weeks
    </p>
    <a href="/programs/cna" className="text-orange-600 font-bold">
      Learn More →
    </a>
  </div>
</div>
```

---

## 📊 Responsive Image Sizing

### Next.js Image Component

**Always use Next.js Image component:**
```tsx
import Image from 'next/image';

// ✅ Good
<Image
  src="/programs/cna-training.jpg"
  alt="CNA Training"
  width={1200}
  height={800}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ❌ Bad
<img src="/programs/cna-training.jpg" alt="CNA Training" />
```

### Sizes Attribute

**Use appropriate sizes for responsive loading:**

```tsx
// Full width on mobile, half on desktop
sizes="(max-width: 768px) 100vw, 50vw"

// Full width on mobile, third on desktop
sizes="(max-width: 768px) 100vw, 33vw"

// Always full width
sizes="100vw"

// Fixed size
sizes="400px"
```

---

## 🎯 Image Optimization Checklist

### Before Upload

- [ ] Resize to correct dimensions
- [ ] Compress to target file size
- [ ] Convert to WebP (if supported)
- [ ] Add descriptive filename
- [ ] Test on different devices

### In Code

- [ ] Use Next.js Image component
- [ ] Add alt text (descriptive)
- [ ] Set appropriate sizes
- [ ] Use priority for above-fold
- [ ] Use lazy loading for below-fold
- [ ] Set object-fit (usually cover)

### After Deploy

- [ ] Test loading speed
- [ ] Check responsive behavior
- [ ] Verify image quality
- [ ] Test on slow connections
- [ ] Check accessibility

---

## 🚀 Performance Guidelines

### Loading Strategy

**Above the Fold (Hero):**
```tsx
<Image
  src="/hero.jpg"
  priority={true}  // Load immediately
  loading="eager"
/>
```

**Below the Fold (Cards):**
```tsx
<Image
  src="/card.jpg"
  priority={false}  // Lazy load
  loading="lazy"
/>
```

### File Size Targets

| Image Type | Target Size | Max Size |
|------------|-------------|----------|
| Hero | 150KB | 200KB |
| Card | 75KB | 100KB |
| Thumbnail | 30KB | 50KB |
| Icon | 5KB | 10KB |

### Format Recommendations

1. **WebP** - Best compression, modern browsers
2. **JPG** - Good compression, universal support
3. **PNG** - Transparency needed, larger files
4. **SVG** - Icons and logos, scalable

---

## 📝 Current Program Pages

### Existing Pages

1. **Main Programs Page** - `/app/programs/page.tsx`
   - ✅ Hero banner added
   - ✅ Orange gradient overlay
   - ✅ Responsive design
   - ✅ Dual CTAs

2. **Healthcare** - `/app/programs/healthcare/page.tsx`
   - Status: Needs review

3. **Skilled Trades** - `/app/programs/skilled-trades/page.tsx`
   - Status: Needs review

4. **Technology** - `/app/programs/technology/page.tsx`
   - Status: Needs review

5. **Business** - `/app/programs/business/page.tsx`
   - Status: Needs review

6. **CDL & Transportation** - `/app/programs/cdl-transportation/page.tsx`
   - Status: Needs review

7. **Barber Apprenticeship** - `/app/programs/barber-apprenticeship/page.tsx`
   - Status: Needs review

---

## 🔍 Issues Found

### From Repository Search

1. **Missing Real Photos**
   - Location: `/public/programs/`
   - Issue: Only SVG placeholders exist
   - Action: Add real training photos

2. **Image Size Not Optimized**
   - Issue: Some images may be too large
   - Action: Compress to < 100KB

3. **Inconsistent Dimensions**
   - Issue: Mixed aspect ratios
   - Action: Standardize to 1200x800px (3:2)

---

## ✅ Action Items

### Immediate (High Priority)

1. **Add Real Program Photos**
   - Take photos of actual training
   - Or source from training partners
   - Upload to `/public/programs/`

2. **Optimize Existing Images**
   - Compress to target sizes
   - Convert to WebP where possible
   - Add proper alt text

3. **Standardize Dimensions**
   - Resize all to 1200x800px
   - Maintain 3:2 aspect ratio
   - Ensure consistent quality

### Short Term (Medium Priority)

4. **Update Program Pages**
   - Add hero banners to all category pages
   - Use consistent layout
   - Add proper images

5. **Implement Lazy Loading**
   - Use Next.js Image component everywhere
   - Set appropriate loading strategies
   - Add sizes attributes

6. **Test Performance**
   - Check loading speeds
   - Verify responsive behavior
   - Test on mobile devices

### Long Term (Low Priority)

7. **Create Image Library**
   - Build collection of training photos
   - Organize by program category
   - Document usage guidelines

8. **Automate Optimization**
   - Set up image compression pipeline
   - Auto-convert to WebP
   - Generate responsive sizes

---

## 📚 Related Documentation

- **PROGRAMS_PAGE_FIXED.md** - Hero banner implementation
- **public/programs/README.md** - Image guidelines
- **VIDEO_ATTRIBUTES_FIXED.md** - Video hero usage
- **RESPONSIVE_DESIGN_AUDIT.md** - Responsive image guidelines
- **CSS_BACKGROUND_AUDIT.md** - Background image issues

---

## 🎓 Best Practices

### DO ✅

- Use Next.js Image component
- Optimize before upload
- Add descriptive alt text
- Use appropriate sizes attribute
- Lazy load below-fold images
- Test on multiple devices
- Compress to target sizes
- Use WebP when possible

### DON'T ❌

- Use regular `<img>` tags
- Upload unoptimized images
- Skip alt text
- Use fixed pixel sizes
- Load all images eagerly
- Forget mobile testing
- Exceed file size limits
- Use stock photos

---

## 🔗 Quick Links

**Files to Update:**
- `/public/programs/` - Add real photos here
- `/app/programs/page.tsx` - Main programs page
- `/app/programs/[category]/page.tsx` - Category pages

**Documentation:**
- This file: Complete guide
- `/public/programs/README.md` - Quick reference
- `/PROGRAMS_PAGE_FIXED.md` - Hero banner details

---

## 📞 Questions?

If you need clarification on:
- Image specifications
- Program page setup
- Optimization techniques
- Implementation details

Refer to this guide or check the related documentation files listed above.

---

**Status:** ✅ Complete Guide  
**Last Updated:** January 11, 2026  
**Compiled By:** Ona AI

---

## Summary

**Image Sizing:**
- Hero: 1920x1080px, < 200KB
- Cards: 800x600px, < 100KB
- Thumbnails: 400x300px, < 50KB
- Icons: 64x64px or 128x128px, < 10KB

**Program Pages:**
- All need hero banners
- Use orange gradient overlay
- Real photos required
- Consistent layout across all

**Next Steps:**
1. Add real training photos
2. Optimize all images
3. Update category pages
4. Test performance
