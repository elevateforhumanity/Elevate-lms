# Visual Step-by-Step Guide - Google Search Console Sitemap Cleanup

**Time Required:** 15 minutes  
**Difficulty:** Easy - just clicking buttons

---

## STEP 1: Access Google Search Console

### What to Do:

1. Open your browser
2. Go to: **https://search.google.com/search-console**
3. Log in with your Google account
4. Select property: **www.elevateforhumanity.org**

### What You'll See:

```
┌─────────────────────────────────────────────┐
│ Google Search Console                       │
├─────────────────────────────────────────────┤
│ Select a property:                          │
│ ▼ www.elevateforhumanity.org               │
│                                             │
│ Overview                                    │
│ Performance                                 │
│ URL Inspection                              │
│ Coverage                                    │
│ Sitemaps                    ← CLICK HERE   │
│ Removals                                    │
└─────────────────────────────────────────────┘
```

---

## STEP 2: Navigate to Sitemaps

### What to Do:

1. Look at the left sidebar
2. Find **"Sitemaps"**
3. Click on it

### What You'll See:

```
┌─────────────────────────────────────────────────────────┐
│ Sitemaps                                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Add a new sitemap                                       │
│ ┌──────────────────────────────┐                       │
│ │ Enter sitemap URL            │ [Submit]              │
│ └──────────────────────────────┘                       │
│                                                         │
│ Submitted sitemaps                                      │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Sitemap                Status      Discovered    │   │
│ │ sitemap.xml            Success     782          ⋮│   │
│ │ sitemap-0.xml          Success     100          ⋮│   │
│ │ sitemap-1.xml          Success     100          ⋮│   │
│ │ sitemap-2.xml          Success     100          ⋮│   │
│ └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Note:** Your list may have different sitemaps. That's okay - you'll remove ALL of them.

---

## STEP 3: Remove OLD Sitemaps (One by One)

### What to Do:

For **EACH** sitemap in the "Submitted sitemaps" list:

1. Find the sitemap row
2. Look for the **⋮** (three dots) on the right side
3. Click the **⋮**
4. Click **"Remove sitemap"**
5. Confirm by clicking **"Remove"**
6. Wait for it to disappear
7. Repeat for the next sitemap

### Visual Example:

```
Step 1: Find the sitemap
┌─────────────────────────────────────────────────┐
│ Sitemap                Status      Discovered    │
│ sitemap-0.xml          Success     100          ⋮│ ← Click these dots
└─────────────────────────────────────────────────┘

Step 2: Click the three dots (⋮)
┌─────────────────────────────────────────────────┐
│ sitemap-0.xml          Success     100          │
│                                        ┌────────┤
│                                        │ Remove │ ← Click this
│                                        │ View   │
│                                        └────────┤
└─────────────────────────────────────────────────┘

Step 3: Confirm removal
┌─────────────────────────────────────────────────┐
│ Remove sitemap?                                 │
│                                                 │
│ This will remove sitemap-0.xml from your        │
│ submitted sitemaps list.                        │
│                                                 │
│              [Cancel]  [Remove]  ← Click Remove │
└─────────────────────────────────────────────────┘

Step 4: Sitemap disappears
┌─────────────────────────────────────────────────┐
│ Sitemap                Status      Discovered    │
│ sitemap-1.xml          Success     100          ⋮│ ← Next one
│ sitemap-2.xml          Success     100          ⋮│
└─────────────────────────────────────────────────┘
```

### Sitemaps to Remove:

Remove **ALL** sitemaps you see, including:

- ❌ sitemap.xml (old one)
- ❌ sitemap-0.xml
- ❌ sitemap-1.xml
- ❌ sitemap-2.xml
- ❌ sitemap-3.xml
- ❌ sitemap-4.xml
- ❌ sitemap-5.xml
- ❌ sitemap-6.xml
- ❌ sitemap-7.xml
- ❌ sitemap-8.xml
- ❌ sitemap-9.xml
- ❌ Any other sitemaps you see

**Keep removing until the list is EMPTY.**

### What Empty Looks Like:

```
┌─────────────────────────────────────────────────┐
│ Submitted sitemaps                              │
│                                                 │
│ No sitemaps submitted yet.                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## STEP 4: Add NEW Sitemap

### What to Do:

1. Look at the top of the page
2. Find **"Add a new sitemap"**
3. In the text box, type exactly: **sitemap.xml**
4. Click **"Submit"**

### Visual Example:

```
Step 1: Find the input box
┌─────────────────────────────────────────────────┐
│ Add a new sitemap                               │
│ ┌──────────────────────────────┐               │
│ │ sitemap.xml                  │ [Submit]       │ ← Type here, then click Submit
│ └──────────────────────────────┘               │
└─────────────────────────────────────────────────┘

Step 2: After clicking Submit
┌─────────────────────────────────────────────────┐
│ Sitemap submitted                               │
│ ✓ sitemap.xml has been submitted                │
└─────────────────────────────────────────────────┘

Step 3: Wait 5-10 minutes, then refresh
┌─────────────────────────────────────────────────┐
│ Submitted sitemaps                              │
│ ┌───────────────────────────────────────────┐  │
│ │ Sitemap        Status      Discovered     │  │
│ │ sitemap.xml    Success     52            ⋮│  │
│ └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Success!** You should see:
- Status: Success
- Discovered: ~50+ URLs

---

## STEP 5: Request Indexing for Key Pages

### What to Do:

1. Click **"URL Inspection"** at the very top of GSC
2. Enter the first URL: `https://www.elevateforhumanity.org/`
3. Press Enter
4. Wait for inspection to complete
5. Click **"Request Indexing"**
6. Wait for confirmation
7. Repeat for the other 4 URLs

### Visual Example:

```
Step 1: Click URL Inspection at top
┌─────────────────────────────────────────────────┐
│ [URL Inspection] ← Click here                   │
├─────────────────────────────────────────────────┤
│ Google Search Console                           │
└─────────────────────────────────────────────────┘

Step 2: Enter URL
┌─────────────────────────────────────────────────┐
│ Inspect any URL                                 │
│ ┌───────────────────────────────────────────┐  │
│ │ https://www.elevateforhumanity.org/       │  │ ← Type URL here
│ └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘

Step 3: Wait for inspection
┌─────────────────────────────────────────────────┐
│ Testing live URL...                             │
│ [Loading spinner]                               │
└─────────────────────────────────────────────────┘

Step 4: Click Request Indexing
┌─────────────────────────────────────────────────┐
│ URL is on Google                                │
│                                                 │
│ Coverage: Submitted and indexed                 │
│                                                 │
│ [Request Indexing] ← Click this button         │
└─────────────────────────────────────────────────┘

Step 5: Confirm
┌─────────────────────────────────────────────────┐
│ Request indexing?                               │
│                                                 │
│ This will request Google to crawl this URL.     │
│                                                 │
│              [Cancel]  [Request]  ← Click       │
└─────────────────────────────────────────────────┘

Step 6: Success
┌─────────────────────────────────────────────────┐
│ ✓ Indexing requested                            │
│                                                 │
│ Google will crawl this URL soon.                │
└─────────────────────────────────────────────────┘
```

### URLs to Request Indexing For:

Do this for each of these 5 URLs:

1. `https://www.elevateforhumanity.org/`
2. `https://www.elevateforhumanity.org/about`
3. `https://www.elevateforhumanity.org/programs`
4. `https://www.elevateforhumanity.org/apply`
5. `https://www.elevateforhumanity.org/employer`

---

## STEP 6: Verify Everything

### What to Check:

**Sitemaps Section:**
```
✓ Only ONE sitemap listed: sitemap.xml
✓ Status: Success
✓ Discovered: ~50+ URLs
```

**URL Inspection:**
```
✓ Requested indexing for 5 key pages
✓ Each shows "Indexing requested" confirmation
```

---

## Common Issues and Solutions

### Issue 1: "Couldn't fetch" Error

**What it looks like:**
```
┌─────────────────────────────────────────────────┐
│ Sitemap        Status              Discovered   │
│ sitemap.xml    Couldn't fetch      0           │
└─────────────────────────────────────────────────┘
```

**Solution:**
- Wait 10-15 minutes
- Refresh the page
- Google needs time to crawl the sitemap
- If still showing after 30 minutes, verify sitemap loads at: https://www.elevateforhumanity.org/sitemap.xml

### Issue 2: "Sitemap is HTML" Error

**What it looks like:**
```
┌─────────────────────────────────────────────────┐
│ Sitemap        Status              Discovered   │
│ sitemap.xml    Sitemap is HTML     0           │
└─────────────────────────────────────────────────┘
```

**Solution:**
- You entered the wrong URL
- Remove this sitemap
- Add again with just: `sitemap.xml` (not the full URL)

### Issue 3: Can't Find Three Dots (⋮)

**Solution:**
- Make your browser window wider
- The three dots appear on the right side of each row
- Try scrolling right if the table is too wide

### Issue 4: No Sitemaps Listed

**Solution:**
- Good! That means they were already removed
- Just add the new one: `sitemap.xml`

---

## Checklist

Use this to track your progress:

### Removal Phase:
- [ ] Logged into Google Search Console
- [ ] Selected www.elevateforhumanity.org property
- [ ] Clicked "Sitemaps" in left sidebar
- [ ] Removed sitemap.xml (old)
- [ ] Removed sitemap-0.xml
- [ ] Removed sitemap-1.xml
- [ ] Removed sitemap-2.xml
- [ ] Removed sitemap-3.xml
- [ ] Removed sitemap-4.xml
- [ ] Removed sitemap-5.xml
- [ ] Removed sitemap-6.xml
- [ ] Removed sitemap-7.xml
- [ ] Removed sitemap-8.xml
- [ ] Removed sitemap-9.xml
- [ ] Removed any other sitemaps
- [ ] Verified list is EMPTY

### Addition Phase:
- [ ] Clicked "Add a new sitemap"
- [ ] Typed: sitemap.xml
- [ ] Clicked "Submit"
- [ ] Waited 5-10 minutes
- [ ] Refreshed page
- [ ] Verified Status: Success
- [ ] Verified Discovered: ~50+ URLs

### Indexing Phase:
- [ ] Clicked "URL Inspection" at top
- [ ] Requested indexing for: /
- [ ] Requested indexing for: /about
- [ ] Requested indexing for: /programs
- [ ] Requested indexing for: /apply
- [ ] Requested indexing for: /employer

### Verification:
- [ ] Only ONE sitemap listed (sitemap.xml)
- [ ] Status shows "Success"
- [ ] Discovered shows ~50+ URLs
- [ ] All 5 URLs show "Indexing requested"

---

## What Happens Next

### 24 Hours:
- Google crawls your new sitemap
- Discovers ~50+ URLs
- Starts indexing pages

### 1 Week:
- Check GSC "Pages" section
- Look at "Duplicate without user-selected canonical"
- Should see count decreasing from 35

### 2 Weeks:
- Check GSC "Pages" section
- Look at "Not indexed" count
- Should see count decreasing from 614
- Key pages should be indexed

---

## Summary

**What You Did:**
1. ❌ Removed ALL old sitemaps (numbered, grouped, etc.)
2. ✅ Added ONE new sitemap (sitemap.xml)
3. ✅ Requested indexing for 5 key pages

**Time Spent:** 15 minutes

**Expected Result:**
- 70-85% reduction in duplicate canonical issues
- 20-25% improvement in indexed pages
- Timeline: 1-2 weeks for full impact

**You're done!** The rest happens automatically as Google recrawls your site.
