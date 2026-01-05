# Google Search Console - Complete Reset & Fresh Crawl

## Goal

1. Remove ALL sitemaps from Google Search Console
2. Remove ALL indexed URLs (old Vercel URLs, duplicates, etc.)
3. Submit fresh sitemap
4. Request fresh crawl
5. Clean slate for Google indexing

---

## PHASE 1: Remove All Sitemaps (5 minutes)

### Step 1: Access Google Search Console

1. Go to https://search.google.com/search-console
2. Select property: `www.elevateforhumanity.org`

### Step 2: Remove All Sitemaps

1. Click **Sitemaps** (left sidebar)
2. You'll see a list of submitted sitemaps
3. For EACH sitemap:
   - Click the **⋮** (three dots) next to it
   - Click **Remove sitemap**
   - Confirm removal

**Remove ALL sitemaps, including:**
- `sitemap.xml`
- `sitemap-0.xml`
- Any numbered sitemaps
- Any old URLs
- Everything

### Step 3: Verify All Removed

The sitemaps list should be completely empty.

✅ **All sitemaps removed**

---

## PHASE 2: Remove All Indexed URLs (10 minutes)

### Step 1: Remove Old Vercel Preview URLs

1. Go to **Removals** (left sidebar)
2. Click **New Request**
3. Select **Temporarily remove URL**
4. Enter each old Vercel URL:
   - `https://elevate-lms-git-main-selfish2.vercel.app`
   - `https://elevate-lms.vercel.app`
   - Any other `.vercel.app` URLs you see

5. For each URL:
   - Click **Next**
   - Select **Remove all URLs with this prefix**
   - Click **Submit Request**

### Step 2: Remove Outdated Content

1. Still in **Removals**
2. Click **Outdated Content**
3. Enter your main domain: `https://www.elevateforhumanity.org`
4. Click **Request Removal**

This tells Google to recrawl everything fresh.

### Step 3: Check Current Index

1. Go to **Pages** (left sidebar)
2. Look at "Indexed" count
3. Note the number (you'll see this decrease over time)

✅ **Removal requests submitted**

---

## PHASE 3: Clear Duplicate Canonicals (5 minutes)

### Step 1: Check Duplicate Issues

1. In **Pages**, scroll to "Why pages aren't indexed"
2. Find "Duplicate without user-selected canonical"
3. Click on it
4. You'll see list of affected URLs

### Step 2: Request Removal for Duplicates

For each duplicate URL:
1. Copy the URL
2. Go to **Removals**
3. Click **New Request**
4. Paste URL
5. Select **Temporarily remove URL**
6. Submit

**Or use bulk method:**
1. Export the list (click Export)
2. For each URL in the list, submit removal request

✅ **Duplicate URLs marked for removal**

---

## PHASE 4: Submit Fresh Sitemap (2 minutes)

### Step 1: Verify Your Sitemap Works

```bash
curl -s https://www.elevateforhumanity.org/sitemap.xml | head -20
```

Should show valid XML with URLs.

### Step 2: Submit to Google

1. Go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**

### Step 3: Verify Submission

You should see:
- Status: Success
- Type: Sitemap
- Discovered URLs: ~45-85 (depending on your sitemap)

✅ **Fresh sitemap submitted**

---

## PHASE 5: Request Fresh Crawl for Key Pages (10 minutes)

### Step 1: Crawl Homepage

1. Go to **URL Inspection** (top search bar)
2. Enter: `https://www.elevateforhumanity.org/`
3. Click **Test Live URL**
4. Wait for test to complete (30 seconds)
5. Click **Request Indexing**
6. Confirm

### Step 2: Crawl Key Pages

Repeat for each of these URLs:

**High Priority:**
- `https://www.elevateforhumanity.org/about`
- `https://www.elevateforhumanity.org/programs`
- `https://www.elevateforhumanity.org/apply`
- `https://www.elevateforhumanity.org/founder`
- `https://www.elevateforhumanity.org/training/certifications`

**Medium Priority:**
- `https://www.elevateforhumanity.org/federal-funding`
- `https://www.elevateforhumanity.org/workforce-board`
- `https://www.elevateforhumanity.org/career-services`
- `https://www.elevateforhumanity.org/downloads`
- `https://www.elevateforhumanity.org/student-handbook`

**For each URL:**
1. URL Inspection → Enter URL
2. Test Live URL
3. Request Indexing

✅ **Fresh crawl requested for key pages**

---

## PHASE 6: Verify Canonical Tags (5 minutes)

### Step 1: Test Homepage Canonical

1. In URL Inspection, enter: `https://www.elevateforhumanity.org/`
2. Click **View Crawled Page**
3. Click **HTML** tab
4. Search for "canonical"
5. Verify you see ONLY ONE canonical tag:
   ```html
   <link rel="canonical" href="https://www.elevateforhumanity.org"/>
   ```

### Step 2: Test Other Pages

Repeat for:
- `/about` - should have canonical to `/about`
- `/programs` - should have canonical to `/programs`
- `/apply` - should have canonical to `/apply`

**Each page should have:**
- ✅ Exactly ONE canonical tag
- ✅ Pointing to itself (not homepage)
- ✅ Using www subdomain

✅ **Canonical tags verified**

---

## PHASE 7: Monitor Progress (Ongoing)

### Daily Checks (Week 1)

**Check these metrics daily:**

1. **Removals Status:**
   - Go to Removals
   - Check status of removal requests
   - Should show "Approved" after 24-48 hours

2. **Indexed Pages:**
   - Go to Pages
   - Check "Indexed" count
   - Should decrease first (old URLs removed)
   - Then increase (new URLs indexed)

3. **Duplicate Canonicals:**
   - Go to Pages → "Why pages aren't indexed"
   - Check "Duplicate without user-selected canonical"
   - Should decrease from 35 to 0-5

4. **Sitemap Status:**
   - Go to Sitemaps
   - Check "Discovered URLs"
   - Should match your sitemap count

### Weekly Checks (Weeks 2-4)

**Check these weekly:**

1. **Coverage Report:**
   - Pages → Overview
   - Indexed pages should increase
   - Not indexed should decrease

2. **Search Performance:**
   - Performance → Overview
   - Impressions should stabilize
   - Clicks should improve

3. **Core Web Vitals:**
   - Experience → Core Web Vitals
   - Should show data after 2-3 weeks

---

## Expected Timeline

### Day 1 (Today):
- ✅ All sitemaps removed
- ✅ Removal requests submitted
- ✅ Fresh sitemap submitted
- ✅ Key pages reindexed

### Days 2-3:
- ⏳ Google processes removal requests
- ⏳ Old URLs start disappearing from index
- ⏳ New sitemap being crawled

### Days 4-7:
- ✅ Removal requests approved
- ✅ Old URLs removed from search
- ⏳ New URLs being indexed
- ⏳ Duplicate canonicals decreasing

### Week 2:
- ✅ Most old URLs removed
- ✅ New URLs indexed
- ✅ Duplicate canonicals: 0-5 (down from 35)
- ✅ "Not indexed" decreasing

### Week 3-4:
- ✅ Full recrawl complete
- ✅ All canonical issues resolved
- ✅ Indexing stabilized
- ✅ Search performance improving

---

## Metrics to Track

### Before Reset:
- Indexed pages: 255
- Not indexed: 614
- Duplicate canonicals: 35
- Old Vercel URLs: Multiple

### After Reset (Week 4):
- Indexed pages: 300-350 (target)
- Not indexed: <500 (target)
- Duplicate canonicals: 0-5 (target)
- Old Vercel URLs: 0 (target)

---

## Complete Checklist

### Phase 1 - Remove Sitemaps:
- [ ] Accessed Google Search Console
- [ ] Removed ALL sitemaps
- [ ] Verified sitemaps list is empty

### Phase 2 - Remove URLs:
- [ ] Removed old Vercel preview URLs
- [ ] Requested outdated content removal
- [ ] Noted current indexed count

### Phase 3 - Clear Duplicates:
- [ ] Checked duplicate canonical issues
- [ ] Submitted removal requests for duplicates

### Phase 4 - Fresh Sitemap:
- [ ] Verified sitemap works
- [ ] Submitted fresh sitemap
- [ ] Verified submission success

### Phase 5 - Fresh Crawl:
- [ ] Requested indexing for homepage
- [ ] Requested indexing for 5 high-priority pages
- [ ] Requested indexing for 5 medium-priority pages

### Phase 6 - Verify Canonicals:
- [ ] Tested homepage canonical (1 tag only)
- [ ] Tested /about canonical
- [ ] Tested /programs canonical
- [ ] Tested /apply canonical

### Phase 7 - Monitor:
- [ ] Set up daily checks for week 1
- [ ] Set up weekly checks for weeks 2-4
- [ ] Tracking metrics

---

## Verification Commands

### Check Sitemap is Valid:
```bash
curl -s https://www.elevateforhumanity.org/sitemap.xml | grep -c "<url>"
# Should show: 45-85 (your URL count)
```

### Check Canonical Tags:
```bash
curl -s https://www.elevateforhumanity.org/ | grep -o '<link[^>]*canonical[^>]*>' | wc -l
# Should show: 1 (only one canonical)
```

### Check No Duplicate Canonicals:
```bash
curl -s https://www.elevateforhumanity.org/about | grep -o '<link[^>]*canonical[^>]*>'
# Should show: canonical pointing to /about (not /)
```

---

## What This Achieves

✅ **Complete Google reset**
- All old sitemaps removed
- All old URLs removed
- All duplicates removed
- Fresh sitemap submitted
- Fresh crawl requested

✅ **Clean indexing**
- No old Vercel URLs
- No duplicate canonicals
- No outdated content
- Only current URLs indexed

✅ **Better SEO**
- Proper canonical structure
- Clean URL structure
- Better crawl efficiency
- Improved search visibility

---

## Important Notes

### About Removals:

**"Temporarily remove URL"** means:
- URL removed from search for ~6 months
- Google will recrawl after that
- If content is still there, it may reindex
- If content is gone (404), it stays removed

**This is perfect for:**
- Old Vercel URLs (will 404)
- Duplicate URLs (canonical will prevent reindex)
- Outdated content (fresh version will replace)

### About Reindexing:

**"Request Indexing"** means:
- Google prioritizes this URL for crawl
- Usually crawled within 24-48 hours
- Not guaranteed, but highly likely
- Can only request once per URL per day

### About Sitemaps:

**Removing and resubmitting** means:
- Google forgets old sitemap data
- Fresh crawl of all URLs
- Clean slate for indexing
- Better than updating existing sitemap

---

## Ready to Execute?

**Total time:** 40 minutes
- Phase 1: 5 minutes
- Phase 2: 10 minutes
- Phase 3: 5 minutes
- Phase 4: 2 minutes
- Phase 5: 10 minutes
- Phase 6: 5 minutes
- Phase 7: Ongoing

**No downtime** - Your site stays up throughout

**Start with Phase 1 and work through each phase.**

Let me know when you're ready to begin!
