# Image Requirements for Production

## Program Images

**Location:** `/public/programs/`

Required images (1600px wide minimum, 16:9 aspect ratio):

- `cna.jpg` - CNA/HHA training photo
- `welding.jpg` - Welding lab/AWS SENSE
- `nails.jpg` - Nail technology/salon
- `cdl.jpg` - CDL training/truck
- `office.jpg` - Office technology/computer
- `osha.jpg` - OSHA safety training

**Specs:**

- Dimensions: 1600x900px minimum (16:9 ratio)
- Format: JPG (optimized)
- File size: <200KB each
- Quality: High-resolution, professional
- Content: Real students/training (not stock photos)

## Testimonial Avatars

**Location:** `/public/people/`

Required images (square format):

- `sharon.jpg` - Sharon P. (CNA Graduate)
- `marcus.jpg` - Marcus R. (Welding Apprentice)
- `alicia.jpg` - Alicia D. (Nail Technology)

**Specs:**

- Dimensions: 256x256px or 512x512px
- Format: JPG
- File size: <50KB each
- Quality: Professional headshot
- Content: Real students with permission

## Hero Images

**Location:** `/public/hero/`

Required images (already configured in Hero component):

- `efh-hero.jpg` - Base image (1600px wide)
- `efh-hero@2x.jpg` - Retina 2x (3200px wide)
- `efh-hero@3x.jpg` - High-DPI 3x (4800px wide)

**Specs:**

- Aspect ratio: Flexible (component uses object-cover)
- Format: JPG (optimized)
- File size: <300KB for @1x, <600KB for @2x, <900KB for @3x
- Quality: High-resolution, professional
- Content: Students in training or graduation

## Partner Logos

**Location:** `/public/logos/`

Required logos (already configured in TrustStrip):

- `dwd.svg` - Department of Workforce Development
- `dol.svg` - Department of Labor
- `workone.svg` - WorkOne Indiana
- `supabase.svg` - Supabase (or other tech partners)

**Specs:**

- Format: SVG preferred (or PNG at 2x size)
- Height: 32px display height (h-8 class)
- Color: Monochrome or brand colors
- Background: Transparent

## Quick Export Guide

### For Program Images:

1. Export at 1600x900px
2. Compress with TinyPNG or ImageOptim
3. Aim for <200KB file size
4. Test on mobile and desktop for sharpness

### For Avatars:

1. Crop to square (1:1 ratio)
2. Export at 512x512px
3. Compress to <50KB
4. Ensure faces are clearly visible

### For Hero Images:

1. Export base at 1600px wide
2. Export @2x at 3200px wide
3. Export @3x at 4800px wide
4. Use srcSet for responsive loading

## Fallback Behavior

If images are missing:

- **Program cards:** Will show broken image icon (add images before production)
- **Testimonial avatars:** Will show broken image icon (add images before production)
- **Hero:** Will show broken image icon (add images before production)
- **Logos:** Will show broken image icon (add images before production)

⚠️ **All images must be added before production deployment**

## Testing Checklist

- [ ] All 6 program images added and displaying correctly
- [ ] All 3 testimonial avatars added and displaying correctly
- [ ] Hero images added with @1x, @2x, @3x variants
- [ ] Partner logos added (SVG or PNG)
- [ ] Images compressed and optimized
- [ ] Images tested on mobile and desktop
- [ ] Images tested on retina displays
- [ ] Alt text updated for accessibility
