# Images Directory

## Required Images

Place these images in this directory for the landing page to work:

### 1. Hero Image

**File:** `efh-barber-hero.jpg`  
**Size:** 1200×900 (4:3 aspect ratio)  
**Usage:** Main hero banner on homepage  
**Source:** Your barber apprenticeship flyer

### 2. Barber Program Card

**File:** `efh-barber-card.jpg`  
**Size:** 1600×900 (16:9 aspect ratio)  
**Usage:** Barber Apprenticeship program card  
**Content:** Barber collage (fades, braids, line-ups)

### 3. Building Technician Card

**File:** `efh-building-card.jpg`  
**Size:** 1600×900 (16:9 aspect ratio)  
**Usage:** Building Technician program card  
**Content:** Electrical, Construction, HVAC collage

### 4. Social Preview (Root Level)

**File:** `../og.jpg` (in public/ root)  
**Size:** 1200×630 pixels  
**Usage:** Facebook, Twitter, LinkedIn previews  
**Content:** Can use the barber flyer or custom design

## Image Optimization Tips

1. **Format:** Use WebP for smaller file sizes

   ```bash
   # Convert JPG to WebP
   cwebp -q 85 efh-barber-hero.jpg -o efh-barber-hero.webp
   ```

2. **Compression:** Keep under 500KB per image
   - Use [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)

3. **Responsive Images:** Create multiple sizes
   ```
   efh-barber-hero.jpg      (1200×900)
   efh-barber-hero@2x.jpg   (2400×1800)
   efh-barber-hero-mobile.jpg (800×600)
   ```

## Current Status

- [ ] efh-barber-hero.jpg - **NEEDED**
- [ ] efh-barber-card.jpg - **NEEDED**
- [ ] efh-building-card.jpg - **NEEDED**
- [ ] ../og.jpg - **NEEDED**

## Fallback

Until images are added, the landing page shows gray placeholder boxes with text labels.

## Path Usage

Always use **rooted paths** in code:

✅ **Correct:**

```tsx
<img src="/images/efh-barber-hero.jpg" alt="..." />
```

❌ **Wrong (breaks on deep links):**

```tsx
<img src="./images/efh-barber-hero.jpg" alt="..." />
<img src="../images/efh-barber-hero.jpg" alt="..." />
```

## Testing

After adding images:

1. Test on homepage: `/`
2. Test on deep link: `/programs`
3. Test on nested route: `/programs/barber`
4. All should show images correctly
