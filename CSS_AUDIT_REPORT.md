# Global CSS Audit Report
**Date:** January 11, 2026  
**Total CSS Lines:** 4,103 lines across 11 files

---

## CSS Files Overview

| File | Lines | Status | Purpose |
|------|-------|--------|---------|
| `app/globals.css` | 1,547 | ⚠️ PRIMARY | Main styles, loaded immediately |
| `app/print.css` | 694 | ✅ OK | Print-only styles |
| `styles/tiktok-animations.css` | 406 | ⚠️ DEFERRED | Animations, loaded after page |
| `styles/rich-design-system.css` | 293 | ⚠️ DEFERRED | Design system, loaded after page |
| `styles/design-system.css` | 265 | ❌ UNUSED | Not imported anywhere |
| `app/globals-mobile-fixes.css` | 227 | ❌ UNUSED | Not imported |
| `app/globals-mobile-complete.css` | 206 | ⚠️ DEFERRED | Mobile styles, loaded after page |
| `app/globals-modern-design.css` | 183 | ⚠️ DEFERRED | Modern design, loaded after page |
| `app/globals-mobile-pro.css` | 134 | ⚠️ DEFERRED | Mobile pro styles, loaded after page |
| `app/font-consistency.css` | 95 | ⚠️ DEFERRED | Font fixes, loaded after page |
| `styles/design-tokens.css` | 53 | ✅ OK | CSS variables, imported by globals.css |

---

## Critical Issues Found

### 1. ❌ Excessive `!important` Usage
**Count:** 53 instances in globals.css alone

**Examples:**
```css
/* Line 1351-1354 */
header {
  position: sticky !important;
  top: 0 !important;
  z-index: 9999 !important;
  pointer-events: auto !important;
}

/* Line 1359-1361 */
main img:not(header img),
main svg:not(header svg) {
  pointer-events: none !important;
}

/* Line 1365-1369 */
header button,
header a,
header nav {
  pointer-events: auto !important;
  z-index: 10000 !important;
  position: relative !important;
}
```

**Impact:**
- Overrides component styles
- Makes debugging difficult
- Creates specificity wars
- Prevents Tailwind utilities from working

---

### 2. ❌ Conflicting Header Styles

**globals.css line 1351:**
```css
header {
  position: sticky !important;
  z-index: 9999 !important;
}
```

**ConditionalLayout.tsx:**
```tsx
<header className="fixed inset-x-0 top-0 z-[99999]">
```

**Conflict:** CSS forces `sticky`, component wants `fixed`

---

### 3. ❌ Pointer Events Disabled on Images

**globals.css line 1359-1361:**
```css
main img:not(header img),
main svg:not(header svg) {
  pointer-events: none !important;
}
```

**Impact:**
- ALL images in main content are not clickable
- Breaks image galleries, lightboxes, clickable logos
- Too broad of a selector

---

### 4. ⚠️ Deferred Styles Loading Pattern

**Current:**
```tsx
// DeferredStyles component loads 7 CSS files AFTER page load
const stylesheets = [
  '/app/font-consistency.css',
  '/app/globals-mobile-complete.css',
  '/app/globals-mobile-pro.css',
  '/app/globals-modern-design.css',
  '/branding/brand.css',
  '/styles/tiktok-animations.css',
  '/styles/rich-design-system.css',
];
```

**Issues:**
- Flash of unstyled content (FOUC)
- Layout shifts as styles load
- 7 additional HTTP requests
- Styles load with `media="print"` then switch to `media="all"` (hack)

---

### 5. ❌ Unused CSS Files

**Not imported anywhere:**
- `styles/design-system.css` (265 lines)
- `app/globals-mobile-fixes.css` (227 lines)

**Total waste:** 492 lines of unused CSS

---

### 6. ⚠️ CSS Specificity Issues

**Too broad selectors:**
```css
/* Affects ALL headers globally */
header {
  position: sticky !important;
}

/* Affects ALL images in main */
main img {
  pointer-events: none !important;
}

/* Affects ALL links */
a:focus-visible {
  outline: 3px solid #2563eb;
}
```

---

## Recommendations

### Immediate Fixes (High Priority)

**1. Remove conflicting header styles**
```css
/* DELETE lines 1350-1369 in globals.css */
header {
  position: sticky !important; /* ← Conflicts with component */
  z-index: 9999 !important;
}
```

**2. Fix pointer-events on images**
```css
/* REPLACE line 1359-1361 */
/* OLD: */
main img:not(header img) {
  pointer-events: none !important;
}

/* NEW: Only disable on decorative images */
main img[aria-hidden="true"],
main img.decorative {
  pointer-events: none;
}
```

**3. Remove unused CSS files**
```bash
rm styles/design-system.css
rm app/globals-mobile-fixes.css
```

---

### Medium Priority

**4. Consolidate deferred styles**

Instead of loading 7 separate CSS files, merge them:
```bash
# Merge into single file
cat app/font-consistency.css \
    app/globals-mobile-complete.css \
    app/globals-mobile-pro.css \
    app/globals-modern-design.css \
    styles/tiktok-animations.css \
    styles/rich-design-system.css \
    > app/globals-extended.css
```

Then import directly in layout:
```tsx
import './globals.css';
import './globals-extended.css'; // Single import instead of 7 deferred
```

**5. Reduce !important usage**

Replace `!important` with proper specificity:
```css
/* BAD */
header {
  z-index: 9999 !important;
}

/* GOOD */
.site-header {
  z-index: 9999;
}
```

---

### Long-term (Low Priority)

**6. Move to CSS Modules or Tailwind-only**

Current approach mixes:
- Global CSS (1,547 lines)
- Tailwind utilities
- Inline styles
- Component styles

Consider:
- Use Tailwind for 90% of styling
- CSS Modules for complex components
- Minimal global CSS (resets, fonts, variables only)

**7. Audit and remove duplicate styles**

Many styles are defined multiple times across files:
- Font sizes defined in 4 different files
- Mobile breakpoints defined in 3 files
- Color values hardcoded instead of using design tokens

---

## Performance Impact

**Current CSS Load:**
1. `globals.css` (1,547 lines) - Immediate
2. `design-tokens.css` (53 lines) - Immediate
3. 7 deferred CSS files (1,517 lines) - After page load

**Total:** 3,117 lines of CSS

**Recommendations:**
- Merge deferred files → Save 6 HTTP requests
- Remove unused files → Save 492 lines
- Purge unused Tailwind → Save ~50% of final CSS

---

## Action Plan

### Phase 1: Critical Fixes (Do Now)
- [ ] Remove conflicting header styles (lines 1350-1369)
- [ ] Fix pointer-events on images (line 1359-1361)
- [ ] Delete unused CSS files

### Phase 2: Optimization (This Week)
- [ ] Merge deferred CSS files into one
- [ ] Remove duplicate style definitions
- [ ] Reduce !important usage by 50%

### Phase 3: Refactor (Next Sprint)
- [ ] Audit all global selectors
- [ ] Move component-specific styles to components
- [ ] Implement CSS Modules for complex components
- [ ] Document CSS architecture

---

## Summary

**Current State:** 🔴 **CRITICAL ISSUES**
- 53 `!important` declarations causing conflicts
- Header styles fighting with component styles
- All images in main content are not clickable
- 492 lines of unused CSS
- 7 deferred CSS files causing FOUC

**After Fixes:** 🟡 **ACCEPTABLE**
- Remove conflicting styles
- Fix image clickability
- Consolidate CSS files
- Reduce technical debt

**Target State:** 🟢 **OPTIMAL**
- Minimal global CSS (<500 lines)
- Tailwind-first approach
- CSS Modules for complex components
- No !important declarations
- Single CSS bundle

---

## Files to Modify

1. `app/globals.css` - Remove lines 1350-1369, fix pointer-events
2. `app/deferred-styles.tsx` - Consolidate into single file
3. Delete: `styles/design-system.css`, `app/globals-mobile-fixes.css`

**Estimated time:** 2-3 hours
**Risk level:** Low (mostly deletions and specificity fixes)
**Testing required:** Visual regression testing on all pages
