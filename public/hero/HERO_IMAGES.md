# Hero Banner Images

## Current Status

❌ **All hero images are tiny placeholders (746 bytes each)**

These need to be replaced with real, high-quality images.

---

## Required Images

### 1. efh-hero.jpg (Base Resolution)

**Dimensions**: 1600px wide (maintain aspect ratio)
**File Size**: <300KB
**Format**: JPG (optimized)
**Usage**: Standard displays

### 2. efh-hero@2x.jpg (Retina)

**Dimensions**: 3200px wide (maintain aspect ratio)
**File Size**: <600KB
**Format**: JPG (optimized)
**Usage**: Retina/high-DPI displays

### 3. efh-hero@3x.jpg (Ultra High-DPI)

**Dimensions**: 4800px wide (maintain aspect ratio)
**File Size**: <900KB
**Format**: JPG (optimized)
**Usage**: 4K displays, future-proofing

---

## Image Content Recommendations

**Ideal Content**:

- Diverse group of students in training
- Modern training facility
- Students engaged in hands-on learning
- Professional, well-lit environment
- Smiling, confident students
- Visible training equipment

**Avoid**:

- Stock photo "feel"
- Overly staged scenes
- Poor lighting
- Cluttered backgrounds
- Outdated equipment

---

## Where to Find Images

### Option 1: Professional Photoshoot (Best)

**Cost**: $500-2000
**Timeline**: 1-2 weeks
**Benefits**: Custom, authentic, on-brand

**Hire**:

- Local photographer
- Fiverr Pro photographers
- Upwork professionals

---

### Option 2: Stock Photos (Quick)

**Cost**: Free or $10-50
**Timeline**: Immediate
**Benefits**: Fast, professional quality

**Sources**:

- **Pexels**: https://www.pexels.com/search/vocational%20training/
- **Unsplash**: https://unsplash.com/s/photos/diverse-students
- **Pixabay**: https://pixabay.com/images/search/training/

**Search Terms**:

- "diverse students training"
- "vocational education"
- "career training facility"
- "hands-on learning"
- "technical training"
- "workforce development"

---

### Option 3: AI-Generated (Modern)

**Cost**: $10-20/month (subscription)
**Timeline**: Minutes
**Benefits**: Custom, no licensing issues

**Tools**:

- **Midjourney**: https://midjourney.com/
- **DALL-E 3**: https://openai.com/dall-e-3
- **Adobe Firefly**: https://firefly.adobe.com/

**Prompt Example**:

```
"Diverse group of students in modern vocational training facility,
hands-on learning, bright natural lighting, professional equipment,
smiling and engaged, photorealistic, high quality, 16:9 aspect ratio"
```

---

## Image Processing Steps

### 1. Download/Create Base Image

- Get high-resolution image (at least 4800px wide)
- Ensure good composition and lighting

### 2. Resize for Multiple Resolutions

```bash
# Using ImageMagick
convert original.jpg -resize 1600x efh-hero.jpg
convert original.jpg -resize 3200x efh-hero@2x.jpg
convert original.jpg -resize 4800x efh-hero@3x.jpg
```

### 3. Optimize File Sizes

- Use TinyPNG: https://tinypng.com/
- Or Squoosh: https://squoosh.app/
- Target: <300KB (1x), <600KB (2x), <900KB (3x)

### 4. Test on Site

- Replace files in `public/hero/`
- Test on different devices
- Verify loading speed
- Check image quality

---

## Quick Solution (Today)

**Immediate Action**:

1. Visit Pexels: https://www.pexels.com/search/diverse%20students/
2. Download 1 high-quality image (free)
3. Resize to 3 versions (1600px, 3200px, 4800px)
4. Compress with TinyPNG
5. Replace placeholder files
6. Test on site

**Time Required**: 30 minutes

---

## Responsive Image Implementation

The hero component should use srcSet for responsive loading:

```jsx
<img
  src="/hero/efh-hero.jpg"
  srcSet="
    /hero/efh-hero.jpg 1600w,
    /hero/efh-hero@2x.jpg 3200w,
    /hero/efh-hero@3x.jpg 4800w
  "
  sizes="100vw"
  alt="Elevate for Humanity Training Programs"
  className="w-full h-full object-cover"
/>
```

---

## Recommended Free Images

### From Pexels:

1. **"Diverse Students"**: https://www.pexels.com/search/diverse%20students/
2. **"Vocational Training"**: https://www.pexels.com/search/vocational%20training/
3. **"Career Development"**: https://www.pexels.com/search/career%20development/

### From Unsplash:

1. **"Training Facility"**: https://unsplash.com/s/photos/training-facility
2. **"Hands-on Learning"**: https://unsplash.com/s/photos/hands-on-learning
3. **"Technical Education"**: https://unsplash.com/s/photos/technical-education

---

## Alternative: Video Background

Instead of static images, consider using a video background:

**Benefits**:

- More engaging
- Shows action/movement
- Modern feel

**Implementation**:

```jsx
<video autoPlay muted loop playsInline className="w-full h-full object-cover">
  <source src="/videos/hero-video.mp4" type="video/mp4" />
</video>
```

---

## Current Files to Replace

```
public/hero/
├── efh-hero.jpg (746 bytes) ❌ REPLACE
├── efh-hero@1x.jpg (746 bytes) ❌ REPLACE
├── efh-hero@2x.jpg (746 bytes) ❌ REPLACE
└── efh-hero@3x.jpg (746 bytes) ❌ REPLACE
```

---

## Priority: HIGH

Hero images are the first thing visitors see. Replacing these placeholders should be a top priority before any marketing or public launch.

**Action**: Download and replace within 24 hours
