# Mobile CSS Files Audit
**Date:** January 11, 2026  
**Focus:** app/globals-mobile-*.css files

---

## Files Overview

| File | Lines | Size | !important Count | Status |
|------|-------|------|------------------|--------|
| globals-mobile-complete.css | 206 | 4.0KB | 42 | ⚠️ LOADED DEFERRED |
| globals-mobile-fixes.css | 227 | 4.6KB | 40 | ❌ NOT LOADED |
| globals-mobile-pro.css | 134 | 2.6KB | 40 | ⚠️ LOADED DEFERRED |
| **TOTAL** | **567** | **11.2KB** | **122** | |

---

## globals-mobile-complete.css Analysis

### Purpose
"Comprehensive mobile fixes" - Forces mobile-friendly layouts

### Key Issues

**1. Overly Broad Selectors (Lines 11-17)**
```css
section[class*="hero"],
section[class*="Hero"],
.hero-section {
  min-height: auto !important;
  padding-top: 3rem !important;
  padding-bottom: 1.5rem !important;
}
```
**Problem:** Affects ALL sections with "hero" in class name  
**Impact:** Overrides component-specific hero styles  
**Specificity:** 0,1,1 + !important = Nuclear

---

**2. Forces All Sections (Lines 20-23)**
```css
@media (max-width: 640px) {
  section {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
}
```
**Problem:** ALL `<section>` elements get same padding  
**Impact:** No flexibility for different section types  
**Conflicts:** Tailwind `py-*` utilities don't work

---

**3. Forces All Grids (Lines 25-27)**
```css
.grid {
  gap: 1rem !important;
}
```
**Problem:** ALL grids get 1rem gap  
**Impact:** Tailwind `gap-*` utilities overridden  
**Better:** Let components control their own gaps

---

**4. Forces All Rounded Elements (Lines 30-32)**
```css
[class*="rounded"] {
  padding: 1rem !important;
}
```
**Problem:** ANY element with "rounded" in class gets padding  
**Impact:** Breaks buttons, badges, avatars  
**Example:** `rounded-full` button gets unwanted padding

---

**5. Forces All Headings (Lines 46-49)**
```css
h1, h2, h3, h4, h5, h6 {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}
```
**Status:** ✅ OK - This is actually helpful  
**No !important:** Good practice

---

### Recommendations

**DELETE these rules:**
- Section padding overrides (too broad)
- Grid gap overrides (breaks Tailwind)
- Rounded element padding (breaks components)

**KEEP these rules:**
- Heading word-wrap (helpful)
- Horizontal scroll prevention (necessary)

---

## globals-mobile-fixes.css Analysis

### Purpose
Mobile-specific fixes for touch, scrolling, and layout

### Key Issues

**1. Forces White Backgrounds (Lines 66-68)**
```css
[class*='bg-white/'] {
  background-color: #ffffff !important;
}
```
**Problem:** Removes ALL opacity from white backgrounds  
**Impact:** `bg-white/50` becomes `bg-white/100`  
**Breaks:** Overlays, modals, semi-transparent elements

---

**2. Forces Black Overlays (Lines 70-72)**
```css
/* REMOVED - was forcing all black overlays to 80% */
/* [class*='bg-black/'] {
  background-color: rgba(0, 0, 0, 0.8) !important;
} */
```
**Status:** ✅ ALREADY FIXED - Commented out

---

**3. Forces Body Lock (Lines 223-227)**
```css
body.mobile-menu-open {
  overflow: hidden !important;
  position: fixed !important;
  width: 100% !important;
}
```
**Status:** ✅ OK - Necessary for mobile menu  
**Purpose:** Prevents scroll when menu open

---

**4. Mobile Menu Z-index (Lines 194-210)**
```css
@media (max-width: 1024px) {
  header button[aria-controls="mobile-menu"] {
    z-index: 10001 !important;
  }
  
  #mobile-menu {
    z-index: 10000 !important;
  }
}
```
**Status:** ✅ OK - Specific selectors, necessary  
**Purpose:** Ensures mobile menu works

---

### Recommendations

**DELETE:**
- White background opacity removal (line 66-68)

**KEEP:**
- Mobile menu z-index rules (specific, necessary)
- Body lock for mobile menu (necessary)

---

## globals-mobile-pro.css Analysis

### Purpose
"Professional" mobile enhancements

### Key Issues

**1. Forces All Images (Lines 5-9)**
```css
img {
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
}
```
**Problem:** ALL images affected  
**Impact:**
- Inline images become block (breaks text flow)
- Icons become too large
- SVGs lose aspect ratio

**Better:**
```css
img {
  max-width: 100%;
  height: auto;
}
/* Remove display: block and !important */
```

---

**2. Forces All Videos (Lines 11-14)**
```css
video {
  max-width: 100% !important;
  height: auto !important;
}
```
**Status:** ⚠️ ACCEPTABLE  
**Reason:** Videos should be responsive  
**Fix:** Remove !important

---

**3. Forces All Buttons (Lines 16-20)**
```css
button, a[role="button"] {
  min-height: 44px !important;
  min-width: 44px !important;
  touch-action: manipulation !important;
}
```
**Problem:** ALL buttons get 44px minimum  
**Impact:**
- Small icon buttons become too large
- Inline buttons break layout
- Tailwind `h-*` and `w-*` don't work

**Better:**
```css
/* Only for interactive elements */
.btn, button:not(.icon-btn) {
  min-height: 44px;
  min-width: 44px;
}
```

---

**4. Forces All Links (Lines 22-25)**
```css
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1) !important;
  touch-action: manipulation !important;
}
```
**Status:** ✅ OK - Improves mobile UX  
**Purpose:** Better touch feedback

---

### Recommendations

**FIX:**
- Remove `display: block` from images
- Remove !important from image/video rules
- Make button sizing more specific (not ALL buttons)

**KEEP:**
- Link tap highlight (good UX)
- Touch action manipulation (prevents double-tap zoom)

---

## Summary of Issues

### Critical (Fix Now):
1. ❌ **globals-mobile-complete.css** - 42 !important rules override Tailwind
2. ❌ **globals-mobile-fixes.css** - Forces white backgrounds to 100% opacity
3. ❌ **globals-mobile-pro.css** - Forces ALL images to display:block

### Medium (Fix Soon):
4. ⚠️ All three files loaded deferred (causes FOUC)
5. ⚠️ Overly broad selectors (section, .grid, [class*="rounded"])
6. ⚠️ 122 total !important declarations

### Low (Nice to Have):
7. 🟢 Consolidate into single mobile.css file
8. 🟢 Remove duplicate rules across files
9. 🟢 Use more specific selectors

---

## Recommended Actions

### Phase 1: Remove Harmful Rules (30 min)
```bash
# 1. Delete white background opacity override
# globals-mobile-fixes.css line 66-68

# 2. Fix image display block
# globals-mobile-pro.css line 5-9
# Remove: display: block !important;

# 3. Remove section padding overrides
# globals-mobile-complete.css line 20-23
```

### Phase 2: Reduce !important (2 hours)
```bash
# Replace !important with proper specificity
# Target: Reduce from 122 to <30 instances
```

### Phase 3: Consolidate Files (1 hour)
```bash
# Merge into single app/globals-mobile.css
cat app/globals-mobile-complete.css \
    app/globals-mobile-fixes.css \
    app/globals-mobile-pro.css \
    > app/globals-mobile.css

# Remove duplicates and conflicts
# Import directly in layout.tsx
```

---

## Expected Results

**Before:**
- 122 !important declarations
- Tailwind utilities don't work on mobile
- Images forced to display:block
- All sections have same padding
- 3 separate files loaded deferred

**After:**
- <30 !important declarations (75% reduction)
- Tailwind utilities work properly
- Images respect their context
- Sections can have custom padding
- 1 file loaded immediately

---

## Files to Modify

1. `app/globals-mobile-complete.css` - Remove broad overrides
2. `app/globals-mobile-fixes.css` - Remove white bg opacity rule
3. `app/globals-mobile-pro.css` - Fix image display rule
4. `app/layout.tsx` - Import consolidated mobile.css
5. `app/deferred-styles.tsx` - Remove mobile CSS from deferred list

**Risk:** LOW - Mostly removing harmful rules  
**Testing:** Visual regression on mobile devices  
**Time:** 3-4 hours total
