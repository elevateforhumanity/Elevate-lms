# Image Sources and Management

**Last Updated:** December 31, 2025

---

## Current Image Structure

```
public/images/
├── hero/                    # Hero/banner images
├── programs/                # Program-specific images
├── courses/                 # Course thumbnails
├── people/                  # Team photos
├── logos/                   # Partner logos
├── bio/                     # Biography photos
├── beauty/                  # Beauty program images
├── business/                # Business program images
├── culinary/                # Culinary program images
├── efh/                     # EFH branded images
└── artlist/                 # Stock images from Artlist
```

---

## High-Quality Stock Image Sources

### Free Stock Photos (Commercial Use)
1. **Unsplash** - https://unsplash.com/
   - License: Free for commercial use
   - Categories: Business, Education, Technology, People
   - Best for: Hero images, backgrounds, lifestyle

2. **Pexels** - https://www.pexels.com/
   - License: Free for commercial use
   - Categories: Workforce, Training, Professionals
   - Best for: Program images, team photos

3. **Pixabay** - https://pixabay.com/
   - License: Free for commercial use
   - Categories: Education, Career, Skills
   - Best for: Icons, illustrations, backgrounds

### Premium Stock Photos (Paid)
4. **Artlist** - https://artlist.io/ (Current subscription)
   - License: Paid subscription
   - High-quality professional images
   - Already in use (see artlist/ folder)

---

## Recommended Images to Add

### Hero/Banner Images
```
/public/images/hero/
├── homepage-hero.jpg          # Main homepage banner
├── programs-hero.jpg          # Programs catalog banner
├── about-hero.jpg             # About page banner
├── contact-hero.jpg           # Contact page banner
├── student-portal-hero.jpg    # Student portal banner
└── employer-hero.jpg          # Employer page banner
```

**Recommended sources:**
- Unsplash: Search "workforce training", "career development"
- Pexels: Search "professional training", "skilled trades"
- Dimensions: 1920x1080 (16:9) or 2560x1440 for high-res

### Program Category Images
```
/public/images/programs/
├── healthcare/
│   ├── cna-hero.jpg
│   ├── medical-assistant-hero.jpg
│   └── healthcare-overview.jpg
├── trades/
│   ├── hvac-hero.jpg
│   ├── welding-hero.jpg
│   ├── electrical-hero.jpg
│   └── plumbing-hero.jpg
├── beauty/
│   ├── barber-hero.jpg (exists)
│   ├── cosmetology-hero.jpg
│   └── esthetician-hero.jpg
├── business/
│   ├── entrepreneurship-hero.jpg
│   ├── retail-hero.jpg
│   └── office-admin-hero.jpg
└── technology/
    ├── it-support-hero.jpg
    ├── web-development-hero.jpg
    └── cybersecurity-hero.jpg
```

### Team/About Images
```
/public/images/people/
├── team/
│   ├── leadership-team.jpg
│   ├── instructors-group.jpg
│   └── staff-photo.jpg
├── students/
│   ├── student-success-1.jpg
│   ├── student-success-2.jpg
│   └── graduation-photo.jpg
└── partners/
    ├── partner-meeting.jpg
    └── employer-partnership.jpg
```

### Icons and Graphics
```
/public/images/icons/
├── programs/
│   ├── healthcare-icon.svg
│   ├── trades-icon.svg
│   ├── beauty-icon.svg
│   ├── business-icon.svg
│   └── technology-icon.svg
├── features/
│   ├── certification-icon.svg
│   ├── job-placement-icon.svg
│   ├── financial-aid-icon.svg
│   └── flexible-schedule-icon.svg
└── social/
    ├── facebook-icon.svg
    ├── linkedin-icon.svg
    ├── twitter-icon.svg
    └── instagram-icon.svg
```

---

## Image Specifications

### Hero Images
- **Dimensions:** 1920x1080 (minimum), 2560x1440 (preferred)
- **Format:** JPG (photos), WebP (optimized)
- **File size:** < 500KB (optimized)
- **Aspect ratio:** 16:9
- **Content:** Professional, diverse, action-oriented

### Program Images
- **Dimensions:** 1200x800 (minimum)
- **Format:** JPG, WebP
- **File size:** < 300KB
- **Aspect ratio:** 3:2 or 16:9
- **Content:** Relevant to program, showing skills/equipment

### Thumbnails
- **Dimensions:** 400x300 or 600x400
- **Format:** JPG, WebP
- **File size:** < 100KB
- **Aspect ratio:** 4:3 or 3:2
- **Content:** Clear, recognizable

### Icons
- **Dimensions:** 64x64, 128x128, 256x256 (multiple sizes)
- **Format:** SVG (preferred), PNG
- **File size:** < 10KB (SVG), < 50KB (PNG)
- **Style:** Consistent, simple, recognizable

---

## Image Optimization

### Tools
1. **Sharp** (already installed)
   ```bash
   pnpm add sharp
   ```

2. **ImageOptim** (Mac) or **Squoosh** (Web)
   - https://squoosh.app/

3. **Next.js Image Component**
   ```tsx
   import Image from 'next/image';
   
   <Image
     src="/images/hero/homepage-hero.jpg"
     alt="Workforce training"
     width={1920}
     height={1080}
     priority
   />
   ```

### Optimization Script
```bash
# Create optimization script
node scripts/optimize-images.js
```

---

## Current Images Inventory

### Existing Hero Images
- ✅ `barber-hero.jpg` - Barber program
- ✅ `cta-banner.jpg` - Call-to-action banner
- ⚠️ Using external Pexels URLs in some pages

### Existing Program Images
- ✅ Barber program images (multiple)
- ✅ Business program images
- ✅ Beauty program images
- ⚠️ Missing: HVAC, CDL, Medical Assistant (have .txt files with URLs)

### Existing People Images
- ✅ Multiple team member photos
- ✅ Student success photos
- ✅ Professional headshots

---

## Action Items

### Immediate
1. **Download missing program images:**
   - HVAC hero image
   - CDL hero image
   - Medical Assistant hero image
   - Welding hero image
   - Nail Tech hero image

2. **Create consistent hero images:**
   - Homepage hero
   - Programs catalog hero
   - About page hero

3. **Add program category icons:**
   - Healthcare icon
   - Trades icon
   - Beauty icon
   - Business icon

### Short-term
4. **Optimize existing images:**
   - Run through Sharp/ImageOptim
   - Convert to WebP where appropriate
   - Create responsive sizes

5. **Add missing program images:**
   - Each program needs hero image
   - Each program needs 2-3 highlight images
   - Each program needs thumbnail

6. **Create branded graphics:**
   - Social media images
   - Email templates
   - Marketing materials

---

## Image Naming Convention

### Format
```
{category}-{descriptor}-{size}.{ext}

Examples:
- homepage-hero-1920x1080.jpg
- hvac-program-hero.jpg
- barber-highlight-1.jpg
- team-leadership-photo.jpg
- healthcare-icon-64x64.svg
```

### Rules
- Use lowercase
- Use hyphens (not underscores or spaces)
- Be descriptive
- Include size for multiple versions
- Use semantic names (not IMG_1234.jpg)

---

## Copyright and Licensing

### Current Images
- **Artlist:** Paid subscription, commercial use allowed
- **Pexels:** Free, commercial use allowed
- **Unsplash:** Free, commercial use allowed
- **Custom photos:** Owned by Elevate for Humanity

### Attribution
- Not required for Pexels, Unsplash, Artlist
- Keep attribution file for reference
- Document source in this file

### Usage Rights
- All images can be used for:
  - Website
  - Marketing materials
  - Social media
  - Print materials
  - Email campaigns

---

## Quick Reference URLs

### Download Program Images
See individual DOWNLOAD_*.txt files for specific URLs:
- `DOWNLOAD_cdl.txt` - CDL program images
- `DOWNLOAD_hvac.txt` - HVAC program images
- `DOWNLOAD_medical-assistant.txt` - Medical Assistant images
- `DOWNLOAD_nail-tech.txt` - Nail Tech images
- `DOWNLOAD_welding.txt` - Welding images

### Stock Photo Search Terms
**Workforce Training:**
- "vocational training"
- "skilled trades"
- "career development"
- "professional training"
- "apprenticeship"

**Healthcare:**
- "medical assistant"
- "nursing student"
- "healthcare training"
- "CNA training"

**Trades:**
- "HVAC technician"
- "welding training"
- "electrical work"
- "construction training"

**Beauty:**
- "barber training"
- "cosmetology school"
- "beauty professional"
- "salon training"

---

## Next Steps

1. Download missing program hero images from URLs in .txt files
2. Optimize all images with Sharp
3. Convert large images to WebP
4. Create responsive image sizes
5. Update components to use Next.js Image component
6. Add alt text to all images for accessibility

---

**Maintained by:** Development Team  
**Last Review:** December 31, 2025  
**Next Review:** Quarterly
