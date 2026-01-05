# Action Plan: Fix All Fixable Pages

## Summary of Audit

**Total pages:** 122  
**Can fix:** 54 pages (44%)  
**Cannot fix:** 68 pages (56% - client components)

---

## What CAN Be Fixed (54 pages)

### Category 1: Dynamic Metadata (2 pages) - EASY
- `/blog/category/[category]`
- `/blog/author/[author]`

**Fix:** Add canonical to generateMetadata return  
**Time:** 10 minutes  
**Risk:** Low

### Category 2: No Metadata (52 pages) - MEDIUM
All server components that need metadata created from scratch.

**Fix:** Add metadata export with title and canonical  
**Time:** 4-9 hours  
**Risk:** Medium

---

## What CANNOT Be Fixed (68 pages)

**Reason:** Client components with `'use client'` directive  
**Why:** Next.js framework limitation - client components cannot export metadata  
**Would require:** Converting to server components (136-272 hours of refactoring)  
**Recommendation:** Don't fix - not worth the effort

---

## Execution Plan

### Step 1: Fix Dynamic Metadata (2 pages) ✅
Already started - just need to complete

### Step 2: Fix No Metadata Pages (52 pages)
Create careful script that:
1. Checks for existing imports
2. Adds Metadata import if needed
3. Adds metadata export after imports
4. Doesn't break multi-line imports
5. Tests build after each batch

### Step 3: Test & Deploy
- Test build
- Commit in batches
- Deploy

---

## Expected Outcome

**After fixing 54 pages:**
- 183 pages with canonicals (129 + 54)
- 68 pages without canonicals (all client components)
- 73% of all public pages will have canonicals
- 100% of fixable pages will have canonicals

**GSC Impact:**
- "Duplicate without canonical": 0-2 pages
- "Not indexed": ~520 pages
- Significant SEO improvement

---

## Let's Do It

Ready to fix all 54 fixable pages?
