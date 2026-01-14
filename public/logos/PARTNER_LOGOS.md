# Partner Logos

## Required Partner Logos

### 1. Department of Workforce Development (DWD)

**Filename**: `dwd.svg` or `dwd.png`
**Source**: https://www.in.gov/dwd/
**Contact**: Request official logo from DWD communications team
**Specs**: SVG preferred, transparent background, height 32-64px

---

### 2. U.S. Department of Labor (DOL)

**Filename**: `dol.svg` or `dol.png`
**Source**: https://www.dol.gov/
**Download**: https://www.dol.gov/general/aboutdol/logo
**Specs**: SVG or PNG, transparent background, official seal

---

### 3. WorkOne Indiana

**Filename**: `workone.svg` or `workone.png`
**Source**: https://www.in.gov/dwd/workone/
**Contact**: Request from WorkOne Indiana
**Specs**: SVG preferred, transparent background

---

### 4. EmployIndy

**Filename**: `employindy.svg` or `employindy.png`
**Source**: https://employindy.org/
**Contact**: info@employindy.org
**Specs**: SVG preferred, transparent background

---

### 5. WIOA (Workforce Innovation and Opportunity Act)

**Filename**: `wioa.svg` or `wioa.png`
**Source**: Official WIOA branding
**Note**: May need to create text-based logo
**Specs**: Simple text logo, transparent background

---

### 6. Indiana Department of Education

**Filename**: `idoe.svg` or `idoe.png`
**Source**: https://www.in.gov/doe/
**Contact**: Request official logo
**Specs**: SVG preferred, transparent background

---

### 7. Goodwill Industries

**Filename**: `goodwill.svg` or `goodwill.png`
**Source**: https://www.goodwill.org/
**Download**: https://www.goodwill.org/press-room/media-resources/
**Specs**: Official Goodwill logo, transparent background

---

### 8. Ivy Tech Community College

**Filename**: `ivytech.svg` or `ivytech.png`
**Source**: https://www.ivytech.edu/
**Contact**: Request from Ivy Tech marketing
**Specs**: Official logo, transparent background

---

## Logo Specifications

**Format**: SVG (preferred) or PNG at 2x resolution
**Background**: Transparent
**Height**: 32-64px for display
**Color**: Full color or monochrome (depending on partner guidelines)
**Usage**: Must comply with partner brand guidelines

---

## How to Request Logos

### Email Template:

```
Subject: Logo Request for Partnership Recognition

Dear [Partner Name] Team,

Elevate for Humanity is a workforce development platform that partners
with [Partner Name] to provide training programs for WIOA-eligible
participants.

We would like to feature your logo on our website to recognize our
partnership. Could you please provide:

1. Official logo file (SVG or high-resolution PNG)
2. Brand guidelines for logo usage
3. Any specific requirements for display

Our website: https://www.elevateforhumanity.org

Thank you for your partnership!

Best regards,
Elevate for Humanity Team
elevateforhumanity@gmail.com
```

---

## Temporary Placeholders

Until official logos are received, you can:

1. **Create text-based logos** using partner names
2. **Use official colors** from partner websites
3. **Link to partner websites** without displaying logo

---

## Logo Usage Guidelines

**DO**:

- Use official logos only
- Maintain proper spacing
- Follow partner brand guidelines
- Link logos to partner websites
- Keep logos at appropriate size

**DON'T**:

- Modify partner logos
- Use low-resolution images
- Stretch or distort logos
- Use outdated logos
- Display without permission

---

## Implementation

Once logos are obtained, place them in `public/logos/` and update:

**File**: `components/TrustStrip.tsx` or similar component

```tsx
<img
  src="/logos/dwd.svg"
  alt="Department of Workforce Development"
  className="h-8 opacity-70 hover:opacity-100"
/>
```

---

## Current Status

❌ **All partner logos missing**

**Action Required**:

1. Contact each partner for official logo
2. Download logos with permission
3. Place in `public/logos/` directory
4. Update components to display logos

---

## Quick Links

- **DWD**: https://www.in.gov/dwd/
- **DOL**: https://www.dol.gov/general/aboutdol/logo
- **WorkOne**: https://www.in.gov/dwd/workone/
- **EmployIndy**: https://employindy.org/
- **Ivy Tech**: https://www.ivytech.edu/

---

**Estimated Time**: 1-2 weeks (waiting for partner responses)
