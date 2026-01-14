# Program Subpages Layout & Structure Guide

**Date:** January 11, 2026  
**Purpose:** Document the layout, structure, and design patterns for all program category subpages

---

## 📋 Overview

Program subpages (category pages) follow a consistent layout pattern to provide a uniform user experience across all program categories.

---

## 🗂️ Program Category Pages

### Existing Category Pages

1. **Healthcare** - `/app/programs/healthcare/page.tsx`
2. **Technology** - `/app/programs/technology/page.tsx`
3. **Business** - `/app/programs/business/page.tsx`
4. **Skilled Trades** - `/app/programs/skilled-trades/page.tsx`
5. **CDL & Transportation** - `/app/programs/cdl-transportation/page.tsx`
6. **Barber Apprenticeship** - `/app/programs/barber-apprenticeship/page.tsx` (if exists)

---

## 🎨 Standard Layout Structure

### 1. Hero Banner (Top Section)

**Component:** `VideoHeroBanner` or `ModernLandingHero`

**Current Implementation:**
```tsx
<VideoHeroBanner
  videoSrc="/videos/category-hero.mp4"
  headline="Category Name Programs"
  subheadline="Descriptive tagline about the category"
  primaryCTA={{ text: 'Apply Now', href: '/apply' }}
  secondaryCTA={{ text: 'View All Programs', href: '/programs' }}
/>
```

**Specifications:**
- **Height:** 60-70vh
- **Video/Image:** Category-specific
- **Overlay:** Dark gradient for text readability
- **CTAs:** Two buttons (primary + secondary)

**Hero Content:**
- Badge/Tag (optional)
- Main headline (category name)
- Subheadline (value proposition)
- Brief description
- Two call-to-action buttons

---

### 2. At-a-Glance Section

**Purpose:** Quick overview of program details

**Layout:** 4-column grid (responsive)

**Content Blocks:**
1. **Duration**
   - Icon: Clock
   - Example: "4-12 weeks"

2. **Cost**
   - Icon: Dollar
   - Example: "Free with funding when eligible"

3. **Format**
   - Icon: Shield/Book
   - Example: "Hybrid" or "Online & hands-on labs"

4. **Outcome**
   - Icon: Award/Certificate
   - Example: "CNA, MA, Phlebotomy certification"

**Code Structure:**
```tsx
<section className="bg-white py-16">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="text-3xl font-bold text-black mb-8">At-a-Glance</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 4 info blocks */}
    </div>
  </div>
</section>
```

**Icons Used:**
- `/images/icons/clock.png` - Duration
- `/images/icons/dollar.png` - Cost
- `/images/icons/shield.png` - Format
- `/images/icons/award.png` - Outcome

**Icon Specifications:**
- Size: 24x24px
- Format: PNG
- Loading: lazy
- Alt text: Descriptive

---

### 3. About the Program Section

**Purpose:** Detailed program description

**Layout:** Single column, centered, max-width container

**Content:**
- Program overview (2-3 paragraphs)
- What students will learn
- Career outcomes
- Industry relevance

**Code Structure:**
```tsx
<section className="bg-gray-50 py-16">
  <div className="mx-auto max-w-4xl px-6">
    <h2 className="text-3xl font-bold text-black mb-6">
      About the Program
    </h2>
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <p className="text-gray-700 mb-4">
        {/* Program description */}
      </p>
    </div>
  </div>
</section>
```

---

### 4. Who This Program Is For Section

**Purpose:** Target audience identification

**Layout:** Single column with bullet list

**Content:**
- Ideal candidates
- Prerequisites (or lack thereof)
- Special considerations
- Barrier support information

**Code Structure:**
```tsx
<section className="bg-white py-16">
  <div className="mx-auto max-w-4xl px-6">
    <h2 className="text-3xl font-bold text-black mb-6">
      Who This Program Is For
    </h2>
    <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
      <ul className="space-y-4 list-disc list-inside">
        <li className="text-gray-700">
          {/* Audience point */}
        </li>
      </ul>
    </div>
  </div>
</section>
```

---

### 5. Funding Options Section

**Purpose:** Explain available funding sources

**Layout:** 2-column grid (responsive)

**Content Blocks:**
1. **WIOA**
   - Description
   - Eligibility
   - Link to check eligibility

2. **WRG (Workforce Ready Grant)**
   - Description
   - Eligibility
   - Application process

3. **JRI (Justice Reinvestment Initiative)**
   - Description
   - Eligibility
   - Special considerations

4. **Employer Sponsorship**
   - Description
   - How it works
   - Benefits

**Code Structure:**
```tsx
<section className="bg-white py-16">
  <div className="mx-auto max-w-4xl px-6">
    <h2 className="text-3xl font-bold text-black mb-6">
      Funding Options
    </h2>
    <p className="text-gray-700 mb-6">You may qualify for:</p>
    <div className="grid md:grid-cols-2 gap-4">
      {/* Funding option cards */}
    </div>
  </div>
</section>
```

---

### 6. What You'll Learn Section

**Purpose:** Curriculum overview

**Layout:** Single column with organized list

**Content:**
- Core skills
- Technical competencies
- Soft skills
- Certification preparation

**Code Structure:**
```tsx
<section className="bg-gray-50 py-16">
  <div className="mx-auto max-w-4xl px-6">
    <h2 className="text-3xl font-bold text-black mb-6">
      What You'll Learn
    </h2>
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <ul className="space-y-3 list-disc list-inside">
        <li className="text-gray-700">
          {/* Learning outcome */}
        </li>
      </ul>
    </div>
  </div>
</section>
```

---

### 7. Career Outcomes Section

**Purpose:** Job opportunities and salary information

**Layout:** Mixed (stats + job titles)

**Content:**
- Average starting salary
- Job placement rate
- Common job titles
- Career advancement paths
- Employer partners

**Code Structure:**
```tsx
<section className="bg-white py-16">
  <div className="mx-auto max-w-4xl px-6">
    <h2 className="text-3xl font-bold text-black mb-6">
      Career Outcomes
    </h2>
    <div className="bg-blue-50 rounded-xl p-8 shadow-sm">
      {/* Stats and job titles */}
    </div>
  </div>
</section>
```

---

### 8. Support Services Section

**Purpose:** Highlight available student support

**Layout:** Grid or list

**Content:**
- Career counseling
- Resume assistance
- Interview preparation
- Job placement support
- Barrier removal services
- Transportation assistance
- Childcare referrals

**Code Structure:**
```tsx
<section className="bg-gray-50 py-16">
  <div className="mx-auto max-w-4xl px-6">
    <h2 className="text-3xl font-bold text-black mb-6">
      Support Services
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {/* Support service cards */}
    </div>
  </div>
</section>
```

---

### 9. Next Steps / CTA Section

**Purpose:** Guide users to take action

**Layout:** Centered, prominent CTAs

**Content:**
- Primary CTA: "Apply Now"
- Secondary CTA: "Schedule Advising Call"
- Tertiary: "Download Program Guide"
- Contact information

**Code Structure:**
```tsx
<section className="bg-orange-600 py-16">
  <div className="mx-auto max-w-4xl px-6 text-center">
    <h2 className="text-3xl font-bold text-white mb-6">
      Ready to Get Started?
    </h2>
    <p className="text-white/90 mb-8">
      {/* Motivational text */}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {/* CTA buttons */}
    </div>
  </div>
</section>
```

---

## 🎨 Design System

### Color Palette

**Backgrounds:**
- White: `bg-white`
- Light Gray: `bg-gray-50`
- Orange (CTA): `bg-orange-600`
- Blue (Info): `bg-blue-50`

**Text:**
- Headings: `text-black` or `text-gray-900`
- Body: `text-gray-700`
- Light: `text-gray-600`
- White: `text-white`

**Accents:**
- Orange: `text-orange-600`, `bg-orange-600`
- Blue: `text-blue-600`, `bg-blue-50`
- Green: `text-green-600`, `bg-green-50`

---

### Typography

**Headings:**
```tsx
// H1 (Hero)
className="text-5xl md:text-6xl font-black"

// H2 (Section)
className="text-3xl font-bold text-black mb-6"

// H3 (Subsection)
className="text-xl font-bold text-black mb-2"

// H4 (Card title)
className="font-bold text-black mb-1"
```

**Body Text:**
```tsx
// Regular
className="text-gray-700"

// Large
className="text-lg text-gray-700"

// Small
className="text-sm text-gray-600"
```

---

### Spacing

**Section Padding:**
```tsx
// Standard
className="py-16"

// Large
className="py-20"

// Small
className="py-12"
```

**Container:**
```tsx
// Standard
className="mx-auto max-w-7xl px-6"

// Narrow (content)
className="mx-auto max-w-4xl px-6"

// Wide
className="mx-auto max-w-screen-2xl px-6"
```

**Element Spacing:**
```tsx
// Between sections
className="mb-8"

// Between elements
className="mb-6"

// Between items
className="mb-4"

// Tight
className="mb-2"
```

---

### Cards & Containers

**Standard Card:**
```tsx
className="bg-white rounded-xl p-8 shadow-sm"
```

**Info Card:**
```tsx
className="bg-blue-50 rounded-lg p-6"
```

**Highlight Card:**
```tsx
className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6"
```

---

## 📱 Responsive Design

### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** ≥ 1024px

### Grid Layouts

**4-Column (At-a-Glance):**
```tsx
className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
```

**2-Column (Funding):**
```tsx
className="grid md:grid-cols-2 gap-4"
```

**3-Column (Programs):**
```tsx
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Mobile Adjustments

**Hero:**
- Reduce height: `h-[60vh]` on mobile
- Smaller text: `text-4xl` instead of `text-6xl`
- Stack CTAs vertically

**Grids:**
- Single column on mobile
- 2 columns on tablet
- Full grid on desktop

**Padding:**
- Reduce section padding: `py-12` instead of `py-16`
- Reduce container padding: `px-4` instead of `px-6`

---

## 🖼️ Image Guidelines

### Hero Images/Videos

**Specifications:**
- Dimensions: 1920x1080px (16:9)
- File Size: < 300KB (images), < 5MB (videos)
- Format: JPG/WebP (images), MP4 (videos)
- Loading: priority={true}

**Naming Convention:**
```
/videos/category-hero.mp4
/hero-images/category-hero.jpg

Examples:
- healthcare-hero.mp4
- technology-hero.mp4
- skilled-trades-hero.mp4
```

### Icon Images

**Specifications:**
- Dimensions: 24x24px or 32x32px
- File Size: < 10KB
- Format: PNG or SVG
- Loading: lazy

**Location:**
```
/images/icons/
- clock.png
- dollar.png
- shield.png
- award.png
- check.png
- star.png
```

### Program Images

**Specifications:**
- Dimensions: 800x600px (4:3)
- File Size: < 100KB
- Format: JPG/WebP
- Loading: lazy

---

## ✅ Content Checklist

### Required Sections (All Pages)

- [ ] Hero banner with video/image
- [ ] At-a-Glance (4 key facts)
- [ ] About the Program
- [ ] Who This Program Is For
- [ ] Funding Options
- [ ] What You'll Learn
- [ ] Career Outcomes
- [ ] Support Services
- [ ] Next Steps / CTA

### Optional Sections

- [ ] Success Stories
- [ ] Program Comparison
- [ ] FAQ
- [ ] Testimonials
- [ ] Partner Logos
- [ ] Accreditation Info

---

## 🔧 Implementation Template

### Basic Page Structure

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';

export const metadata: Metadata = {
  title: 'Category Programs | Elevate for Humanity',
  description: 'Program category description',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/category',
  },
};

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Banner */}
      <VideoHeroBanner
        videoSrc="/videos/category-hero.mp4"
        headline="Category Programs"
        subheadline="Tagline"
        primaryCTA={{ text: 'Apply Now', href: '/apply' }}
        secondaryCTA={{ text: 'View All Programs', href: '/programs' }}
      />

      {/* 2. At-a-Glance */}
      <section className="bg-white py-16">
        {/* Content */}
      </section>

      {/* 3. About the Program */}
      <section className="bg-gray-50 py-16">
        {/* Content */}
      </section>

      {/* 4. Who This Program Is For */}
      <section className="bg-white py-16">
        {/* Content */}
      </section>

      {/* 5. Funding Options */}
      <section className="bg-gray-50 py-16">
        {/* Content */}
      </section>

      {/* 6. What You'll Learn */}
      <section className="bg-white py-16">
        {/* Content */}
      </section>

      {/* 7. Career Outcomes */}
      <section className="bg-gray-50 py-16">
        {/* Content */}
      </section>

      {/* 8. Support Services */}
      <section className="bg-white py-16">
        {/* Content */}
      </section>

      {/* 9. Next Steps / CTA */}
      <section className="bg-orange-600 py-16">
        {/* Content */}
      </section>
    </div>
  );
}
```

---

## 📊 Current Status

### Completed Pages

1. ✅ **Healthcare** - Full layout implemented
2. ✅ **Technology** - Full layout implemented
3. ✅ **Business** - Full layout implemented
4. ⚠️ **Skilled Trades** - Needs review
5. ⚠️ **CDL & Transportation** - Needs review
6. ⚠️ **Barber Apprenticeship** - Needs review

### Needs Attention

- [ ] Standardize all hero banners
- [ ] Ensure all icons are images (not symbols)
- [ ] Add consistent CTAs across all pages
- [ ] Verify responsive design on all pages
- [ ] Add real photos (not placeholders)
- [ ] Update content for accuracy

---

## 🎯 Best Practices

### DO ✅

- Use consistent section order
- Include all required sections
- Use real images (not placeholders)
- Add descriptive alt text
- Optimize images before upload
- Test on mobile devices
- Use semantic HTML
- Include clear CTAs
- Provide accurate information
- Link to relevant pages

### DON'T ❌

- Skip required sections
- Use inconsistent layouts
- Use placeholder images
- Forget alt text
- Upload unoptimized images
- Ignore mobile users
- Use non-semantic markup
- Hide CTAs
- Provide outdated info
- Create dead-end pages

---

## 📚 Related Documentation

- **PROGRAM_PAGES_IMAGE_GUIDE.md** - Image specifications
- **PROGRAMS_HERO_UPDATED.md** - Hero banner details
- **PROGRAMS_PAGE_FIXED.md** - Main programs page
- **RESPONSIVE_DESIGN_AUDIT.md** - Responsive guidelines

---

## 🔗 Quick Links

**Category Pages:**
- `/app/programs/healthcare/page.tsx`
- `/app/programs/technology/page.tsx`
- `/app/programs/business/page.tsx`
- `/app/programs/skilled-trades/page.tsx`
- `/app/programs/cdl-transportation/page.tsx`

**Components:**
- `/components/home/VideoHeroBanner.tsx`
- `/components/landing/ModernLandingHero.tsx`

**Assets:**
- `/videos/` - Hero videos
- `/hero-images/` - Hero images
- `/images/icons/` - Icon images

---

**Status:** ✅ Complete Layout Guide  
**Last Updated:** January 11, 2026  
**Created By:** Ona AI
