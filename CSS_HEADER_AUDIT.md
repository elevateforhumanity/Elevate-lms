# CSS Header Styles Audit
**Date:** January 11, 2026

---

## All Header CSS Found

### globals.css (Lines 1341-1369)

**Line 1342-1347: Logo Size Constraints**
```css
header img,
header svg {
  max-height: 48px !important;
  max-width: 200px !important;
  object-fit: contain !important;
}
```
**Status:** ⚠️ CONFLICTS with component logo sizing  
**Action:** REMOVE - Let component control logo size

---

**Line 1350-1354: Header Position**
```css
header {
  position: sticky !important;
  top: 0 !important;
  z-index: 9999 !important;
  pointer-events: auto !important;
}
```
**Status:** ❌ CRITICAL CONFLICT  
**Component says:** `className="fixed inset-x-0 top-0 z-[99999]"`  
**CSS forces:** `position: sticky` with lower z-index  
**Action:** REMOVE - Component uses `fixed`, not `sticky`

---

**Line 1358-1361: Disable Image Clicks**
```css
main img:not(header img),
main svg:not(header svg) {
  pointer-events: none !important;
}
```
**Status:** ❌ BREAKS FUNCTIONALITY  
**Impact:** ALL images in main content are not clickable  
**Action:** REMOVE - Breaks image galleries, lightboxes, clickable images

---

**Line 1364-1369: Header Clickability**
```css
header button,
header a,
header nav {
  pointer-events: auto !important;
  z-index: 10000 !important;
  position: relative !important;
}
```
**Status:** ⚠️ UNNECESSARY  
**Reason:** Already clickable by default  
**Action:** REMOVE - Redundant

---

### globals.css (Lines 1522-1547)

**Line 1522-1524: Link Hover**
```css
header a:hover, .navbar a:hover, .site-header a:hover {
  color: #80bfff !important;
}
```
**Status:** ❌ CONFLICTS  
**Component has:** Tailwind hover colors  
**Action:** REMOVE

---

**Line 1527-1529: Logo Filter**
```css
header img, .navbar img, .site-header img {
  filter: brightness(0) invert(1) !important;
}
```
**Status:** ❌ BREAKS LOGO  
**Impact:** Makes ALL header images white (inverted)  
**Action:** REMOVE - Breaks colored logos

---

**Line 1532-1536: Body Padding**
```css
body {
  padding-top: 80px !important;
  background-color: #ffffff !important;
  color: #111827 !important;
}
```
**Status:** ❌ CONFLICTS  
**Component uses:** `pt-[var(--header-h)]` on main, not body  
**Action:** REMOVE - Component handles spacing

---

**Line 1540-1547: Mobile Adjustments**
```css
@media screen and (max-width: 768px) {
  body {
    padding-top: 64px !important;
  }
  
  header, .navbar, .site-header {
    background-color: rgba(16, 24, 32, 0.98) !important;
  }
}
```
**Status:** ❌ CONFLICTS  
**Action:** REMOVE - Component handles mobile styles

---

### globals-modern-design.css (Lines 138-142)

**Line 138-142: Nav Styles**
```css
nav {
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  backdrop-filter: blur(10px);
}
```
**Status:** ⚠️ TOO BROAD  
**Impact:** Affects ALL `<nav>` elements, not just header  
**Action:** REMOVE or scope to `.site-header nav`

---

### globals-mobile-fixes.css (Line 194)

**Line 194-198: Mobile Menu Button**
```css
header button[aria-controls="mobile-menu"] {
  position: relative !important;
  z-index: 10001 !important;
  pointer-events: auto !important;
}
```
**Status:** ✅ OK  
**Reason:** Specific selector, ensures mobile menu works  
**Action:** KEEP

---

## Component Header Styles (ConditionalLayout.tsx)

```tsx
<header className="fixed inset-x-0 top-0 z-[99999] h-[var(--header-h)]">
  <SiteHeader />
</header>
```

**SiteHeader.tsx:**
```tsx
<div className="w-full h-full bg-white border-b border-gray-200 shadow-sm site-header">
```

**What component wants:**
- `position: fixed` (not sticky)
- `z-index: 99999` (not 9999)
- `bg-white` (not dark navy)
- `border-b border-gray-200` (not blue border)

---

## Conflicts Summary

| CSS Rule | Component Style | Winner | Issue |
|----------|----------------|--------|-------|
| `position: sticky !important` | `fixed` | CSS wins | ❌ Wrong position |
| `z-index: 9999 !important` | `z-[99999]` | CSS wins | ❌ Lower z-index |
| `background: #101820` | `bg-white` | CSS wins | ❌ Dark instead of white |
| `filter: invert(1)` | Normal logo | CSS wins | ❌ Logo inverted |
| `padding-top: 80px` | `pt-[var(--header-h)]` | CSS wins | ❌ Wrong spacing |
| `pointer-events: none` on images | Clickable images | CSS wins | ❌ Images not clickable |

**Result:** CSS `!important` rules override ALL component styles

---

## Action Plan

### DELETE from globals.css:

**Lines 1341-1369:**
```css
/* Emergency guard: prevent header logo from taking over mobile viewport */
header img,
header svg {
  max-height: 48px !important;
  max-width: 200px !important;
  object-fit: contain !important;
}

/* EMERGENCY: ensure header stays clickable above any overlay */
header {
  position: sticky !important;
  top: 0 !important;
  z-index: 9999 !important;
  pointer-events: auto !important;
}

/* EMERGENCY: prevent big decorative images from blocking taps */
main img:not(header img),
main svg:not(header svg) {
  pointer-events: none !important;
}

/* Ensure header buttons/links are always clickable */
header button,
header a,
header nav {
  pointer-events: auto !important;
  z-index: 10000 !important;
  position: relative !important;
}
```

**Lines 1522-1547:**
```css
header a:hover, .navbar a:hover, .site-header a:hover {
  color: #80bfff !important;
}

header img, .navbar img, .site-header img {
  filter: brightness(0) invert(1) !important;
}

body {
  padding-top: 80px !important;
  background-color: #ffffff !important;
  color: #111827 !important;
}

@media screen and (max-width: 768px) {
  body {
    padding-top: 64px !important;
  }
  
  header, .navbar, .site-header {
    background-color: rgba(16, 24, 32, 0.98) !important;
  }
}
```

### DELETE from globals-modern-design.css:

**Lines 138-142:**
```css
nav {
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  backdrop-filter: blur(10px);
}
```

---

## Expected Results After Cleanup

✅ Header will be `fixed` as designed  
✅ Header will be white with gray border  
✅ Logo will display in original colors  
✅ Images in main content will be clickable  
✅ Component Tailwind classes will work  
✅ No more CSS vs Component conflicts  

---

## Files to Modify

1. `app/globals.css` - Remove lines 1341-1369 and 1522-1547
2. `app/globals-modern-design.css` - Remove lines 138-142

**Total lines removed:** ~65 lines of conflicting CSS
