# Assets Guide

## Required Images for Production

### Hero Images

Location: `/public/hero/`

- `efh-hero.jpg` - Base hero image (1600-2000px wide)
- `efh-hero@2x.jpg` - 2x resolution for retina displays
- `efh-hero@3x.jpg` - 3x resolution for high-DPI displays

**Tips:**

- Use high-quality photos of real students/training
- Avoid stock photos that look generic
- Export at 1600px minimum width
- Optimize with tools like TinyPNG or ImageOptim

### Partner Logos

Location: `/public/logos/`

- `dwd.svg` - Department of Workforce Development
- `dol.svg` - Department of Labor
- `workone.svg` - WorkOne Indiana
- `supabase.svg` - Supabase (or other tech partners)

**Tips:**

- Use SVG format for crisp scaling
- Keep logos monochrome or use brand colors
- Export at native size (don't upscale in CSS)

### Testimonial Images (Optional)

Location: `/public/testimonials/`

- `maria.jpg`
- `james.jpg`
- `aisha.jpg`

**Tips:**

- Use real student photos with permission
- Square format (400x400px minimum)
- Professional but approachable

### Favicon & OG Image

Location: `/public/`

- `favicon.svg` - Site favicon (SVG preferred)
- `og-image.jpg` - Open Graph image for social sharing (1200x630px)

**Tips:**

- Favicon should be simple and recognizable at small sizes
- OG image should include logo + tagline
- Test OG image with Facebook Debugger and Twitter Card Validator

## Current Status

- ✅ Hero component ready (awaiting images)
- ✅ TrustStrip component ready (awaiting logos)
- ✅ Testimonials component ready (using initials as fallback)
- ⚠️ Add real images before production deployment

## Quick Export Checklist

1. Export hero at 1600px, 3200px, 4800px → rename to @1x, @2x, @3x
2. Export partner logos as SVG (or PNG at 2x size)
3. Compress all images (aim for <200KB per image)
4. Test on mobile and desktop for sharpness
5. Update alt text in components for accessibility
