# Social Preview Image (og.jpg)

## Quick Setup Options

### Option 1: Use Canva (Easiest - 5 minutes)

1. Go to [canva.com](https://canva.com)
2. Create custom size: **1200 × 630 pixels**
3. Use this design:
   - **Background:** Gradient from `#0ea5e9` (sky blue) to `#7c3aed` (purple)
   - **Main Text:** "Elevate for Humanity" (72px, bold, white, centered)
   - **Subtitle:** "Empowering Dreams Through Education" (36px, white)
   - **Tagline:** "100% FREE Training • Marion County" (32px, green `#22c55e`)
   - **Footer:** "www.elevateforhumanity.org" (28px, white, bottom)
4. Download as JPG
5. Save as `public/og.jpg`

### Option 2: Use Figma (Professional)

1. Create frame: 1200 × 630
2. Apply brand colors from `branding/tokens.json`
3. Export as JPG (quality: 90%)

### Option 3: Use Existing Hero Image

```bash
# If you have a hero image, resize it:
# (requires imagemagick)
convert public/hero/efh-hero.jpg -resize 1200x630^ -gravity center -extent 1200x630 public/og.jpg
```

### Option 4: Open HTML Generator

1. Open `public/og-placeholder.html` in browser
2. Click "Download og.jpg"
3. Move downloaded file to `public/og.jpg`

## Design Specs

- **Dimensions:** 1200 × 630 pixels (required by Facebook/Twitter)
- **Format:** JPG (recommended) or PNG
- **File size:** Keep under 300 KB for fast loading
- **Safe zone:** Keep important text 100px from edges

## Brand Colors

```json
{
  "primary": "#0ea5e9", // Sky blue
  "secondary": "#7c3aed", // Purple
  "accent": "#22c55e", // Green
  "text": "#ffffff" // White
}
```

## Current Status

✅ Meta tag configured in `index.html`:

```html
<meta property="og:image" content="/og.jpg" />
```

⚠️ Image file missing: `public/og.jpg`

## Test Your Image

After adding `og.jpg`, test it:

1. Deploy to Netlify
2. Check with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
3. Check with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## SVG Template

A ready-to-use SVG is available at `public/og.svg` - you can:

1. Open in browser
2. Take screenshot (1200×630)
3. Save as `og.jpg`

Or convert with online tools like [CloudConvert](https://cloudconvert.com/svg-to-jpg)
