# Remove ALL Placeholders - Action Plan

## What Needs to Be Done

### 1. Replace ALL Lucide Icons with Real Images
- **Current:** 1,622 uses of lucide-react icons across the site
- **Target:** Replace with actual images from `/public/media/programs/`
- **Scope:** Every page, every component

### 2. Add Video Hero Banners to ALL Program Pages
- **Videos Available:**
  - `/videos/barber-hero-final.mp4`
  - `/videos/cna-hero.mp4`
  - `/videos/cdl-hero.mp4`
  - `/videos/hvac-hero-final.mp4`
  - `/videos/hero-home.mp4`
  - `/videos/getting-started-hero.mp4`
  - `/videos/programs-overview-video-with-narration.mp4`
  - `/videos/training-providers-video-with-narration.mp4`
  - `/videos/apply-section-video.mp4`

### 3. Apply Old Repo Templates
- Use video hero sections like `/tmp/fix2/app/programs/barber-apprenticeship/page.tsx`
- Replace generic content with specific program details
- Add proper images for each section

### 4. Make ALL Pages Discoverable
- Add to navigation menus
- Add to landing pages
- Create proper sitemap

---

## Image Mapping

### Program Images Available
```
/media/programs/efh-barber-hero.jpg
/media/programs/efh-cna-hero.jpg
/media/programs/efh-hvac-hero.jpg (use hvac-highlight-3.jpg)
/media/programs/cdl-hero.jpg
/media/programs/efh-beauty-career-educator-hero.jpg
/media/programs/efh-building-tech-hero.jpg
/media/programs/efh-business-startup-marketing-hero.jpg
/media/programs/efh-cpr-aed-first-aid-hero.jpg
/media/programs/efh-esthetician-client-services-hero.jpg
/media/programs/efh-public-safety-reentry-hero.jpg
/media/programs/efh-tax-office-startup-hero.jpg
/media/programs/cpr-group-training-hd.jpg
/media/programs/cpr-individual-practice-hd.jpg
/media/programs/cpr-certification-group-hd.jpg
/media/programs/workforce-readiness-hero.jpg
/media/programs/medical-esthetics-training-hd.jpg
```

---

## Pages That Need Video Heroes

### Current Program Pages
1. `/programs/barber-apprenticeship` - ✅ Has video (barber-hero-final.mp4)
2. `/programs/cna` - ❌ Needs video (cna-hero.mp4)
3. `/programs/hvac` - ❌ Needs video (hvac-hero-final.mp4)
4. `/programs/cdl` - ❌ Needs video (cdl-hero.mp4)
5. `/programs/healthcare` - ❌ Needs video
6. `/programs/skilled-trades` - ❌ Needs video
7. `/programs/business` - ❌ Needs video (just created)
8. `/programs/technology` - ❌ Needs video (just created)

### New Pages Created Today
9. `/employers` - ❌ Needs hero image
10. `/employers/post-job` - ❌ Needs hero image
11. `/employers/apprenticeships` - ❌ Needs hero image
12. `/employers/benefits` - ❌ Needs hero image
13. `/success` - ❌ Needs hero images
14. `/news` - ❌ Needs hero image

---

## Icon Replacement Strategy

### Replace These Patterns:

#### Before (Generic Icons):
```tsx
import { CheckCircle, Users, Briefcase } from 'lucide-react';

<CheckCircle className="h-6 w-6 text-orange-600" />
<Users className="h-10 w-10 text-orange-600" />
<Briefcase className="h-8 w-8 text-orange-600" />
```

#### After (Real Images):
```tsx
import Image from 'next/image';

<Image 
  src="/media/programs/cpr-group-training-hd.jpg" 
  alt="Training"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

---

## Video Hero Template

Use this template for ALL program pages:

```tsx
<section className="relative w-full -mt-[72px]">
  <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/videos/PROGRAM-hero.mp4" type="video/mp4" />
    </video>
    
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/40" />
    
    {/* Content */}
    <div className="relative z-10 flex items-center justify-center min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh]">
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Program Title
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Program description
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/apply">
            <Button size="lg" variant="secondary">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Execution Plan

### Phase 1: Program Pages (HIGH PRIORITY)
- [ ] Add video heroes to all program pages
- [ ] Replace icon sections with image galleries
- [ ] Use actual program images

### Phase 2: Employer Pages (HIGH PRIORITY)
- [ ] Replace all icons with images
- [ ] Add hero images
- [ ] Use real photos of employers/workplaces

### Phase 3: Success/News Pages (MEDIUM PRIORITY)
- [ ] Replace placeholder testimonials with real images
- [ ] Add hero images
- [ ] Use actual student/staff photos

### Phase 4: All Other Pages (MEDIUM PRIORITY)
- [ ] Audit every page for lucide icons
- [ ] Replace with appropriate images
- [ ] Ensure no generic placeholders remain

### Phase 5: Navigation (HIGH PRIORITY)
- [ ] Add all pages to navigation
- [ ] Create mega menus if needed
- [ ] Ensure discoverability

---

## Files to Update

### Program Pages
- `app/programs/cna/page.tsx`
- `app/programs/hvac/page.tsx`
- `app/programs/cdl/page.tsx`
- `app/programs/healthcare/page.tsx`
- `app/programs/skilled-trades/page.tsx`
- `app/programs/business/page.tsx`
- `app/programs/technology/page.tsx`

### Employer Pages
- `app/employers/page.tsx`
- `app/employers/post-job/page.tsx`
- `app/employers/apprenticeships/page.tsx`
- `app/employers/benefits/page.tsx`

### Other Pages
- `app/success/page.tsx`
- `app/news/page.tsx`
- `app/page.tsx` (homepage)

---

## Next Steps

1. Start with program pages (highest visibility)
2. Add video heroes systematically
3. Replace icon sections with image galleries
4. Update navigation to show all pages
5. Verify no placeholders remain

---

**Status:** Ready to execute
**Priority:** CRITICAL - User demanded immediate action
**Estimated Time:** 2-3 hours for complete replacement
