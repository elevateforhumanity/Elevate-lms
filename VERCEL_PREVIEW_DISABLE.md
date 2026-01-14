# Disable Netlify Preview Domains

**Goal:** Prevent preview deployments from being indexed or accessed  
**Why:** Avoid duplicate content, confusion, and SEO issues

---

## 🎯 What Are Preview Domains?

Netlify creates automatic preview URLs for:
- **Pull Requests:** `your-pr-name-project.netlify.app`
- **Branch Deployments:** `branch-name-project.netlify.app`
- **Deployment URLs:** `project-hash123.netlify.app`

**Problem:** These can get indexed by Google and cause duplicate content issues.

---

## ✅ Solution 1: Block Preview Domains from Indexing (Recommended)

### Already Configured! ✅

**In `app/robots.ts`:**
```typescript
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.elevateforhumanity.org';
  const isProduction = process.env.NETLIFY_ENV === 'production';

  // Block all crawling on preview/development environments
  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }
  // ... production rules
}
```

**This means:**
- ✅ Production domain: Crawlable
- ❌ Preview domains: Blocked from crawling
- ❌ Development: Blocked from crawling

### Verify It's Working

**Check preview deployment:**
```bash
# Get preview URL from Netlify dashboard
curl https://your-preview-url.netlify.app/robots.txt

# Should show:
User-agent: *
Disallow: /
```

**Check production:**
```bash
curl https://www.elevateforhumanity.org/robots.txt

# Should show:
User-agent: *
Allow: /
Disallow: /admin/
...
```

---

## 🔒 Solution 2: Password Protect Preview Deployments

### Enable in Netlify Dashboard

1. **Go to:** https://netlify.com/dashboard
2. **Select:** Your project
3. **Go to:** Settings → Deployment Protection
4. **Enable:** "Password Protection"
5. **Set:** Password for preview deployments
6. **Save**

**Result:**
- Production: No password required
- Preview deployments: Require password
- Prevents accidental access and indexing

### Configure via `netlify.json`

```json
{
  "github": {
    "silent": true,
    "autoJobCancelation": true
  },
  "deploymentProtection": {
    "password": true
  }
}
```

---

## 🚫 Solution 3: Disable Preview Deployments Completely

### Option A: Disable for All Branches

1. **Go to:** Netlify Dashboard → Project
2. **Go to:** Settings → Git
3. **Scroll to:** "Ignored Build Step"
4. **Add command:**
   ```bash
   if [ "$NETLIFY_ENV" != "production" ]; then exit 0; fi
   ```
5. **Save**

**Result:** Only production branch deploys

### Option B: Disable Specific Branches

1. **Go to:** Settings → Git
2. **Production Branch:** Set to `main` only
3. **Uncheck:** "Deploy Preview Branches"
4. **Save**

### Option C: Configure in `netlify.json`

```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "develop": false,
      "*": false
    }
  }
}
```

---

## 🎯 Solution 4: Remove Preview Domains from Netlify

### Disable Auto-Generated Domains

1. **Go to:** Netlify Dashboard → Project
2. **Go to:** Settings → Domains
3. **Find:** `*.netlify.app` domains
4. **Click:** Remove (if possible)

**Note:** You cannot completely remove `*.netlify.app` domains, but you can:
- Block them from indexing (robots.txt) ✅
- Password protect them ✅
- Redirect them to production ✅

---

## 🔄 Solution 5: Redirect All Preview Domains to Production

### Already Configured! ✅

**In `next.config.mjs`:**
```javascript
async redirects() {
  return [
    // Redirect any netlify.app host to canonical domain
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: '.*\\.netlify\\.app',
        },
      ],
      destination: 'https://www.elevateforhumanity.org/:path*',
      permanent: true,
    },
    // ...
  ];
}
```

**This means:**
- Any `*.netlify.app` URL → Redirects to production
- Prevents duplicate content
- Consolidates all traffic to main domain

---

## 🧹 Clean Up Existing Preview Deployments

### Delete Old Deployments

1. **Go to:** Netlify Dashboard → Deployments
2. **Filter:** Preview deployments
3. **Select:** Old deployments
4. **Click:** Delete

**Or via CLI:**
```bash
# List all deployments
netlify ls

# Delete specific deployment
netlify rm deployment-url

# Delete all preview deployments (careful!)
netlify ls --scope preview | xargs -I {} netlify rm {}
```

---

## 🔍 Remove Preview URLs from Google

### If Already Indexed

1. **Go to:** Google Search Console
2. **Go to:** Removals
3. **Click:** "New Request"
4. **Select:** "Remove all URLs with this prefix"
5. **Enter:** `https://your-project.netlify.app/`
6. **Submit**

**Check what's indexed:**
```
site:your-project.netlify.app
```

---

## ✅ Recommended Configuration

### Complete Setup (All Solutions Combined)

**1. Block from indexing (robots.txt)** ✅ Already done
**2. Redirect to production** ✅ Already done
**3. Password protect previews** ← Add this
**4. Disable unnecessary branches** ← Optional

### Add to `netlify.json`:

```json
{
  "github": {
    "silent": true,
    "autoJobCancelation": true
  },
  "deploymentProtection": {
    "password": true
  },
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  }
}
```

---

## 🎯 What You Should Do

### Immediate Actions:

1. **✅ Already Done:**
   - robots.txt blocks preview domains
   - Redirects configured for *.netlify.app

2. **Recommended:**
   - Enable password protection for previews
   - Disable preview deployments for non-main branches

3. **Optional:**
   - Delete old preview deployments
   - Remove indexed preview URLs from Google

### Steps to Take:

**Step 1: Enable Password Protection**
```
Netlify Dashboard → Settings → Deployment Protection → Enable
```

**Step 2: Disable Preview Branches (Optional)**
```
Netlify Dashboard → Settings → Git → Uncheck "Deploy Preview Branches"
```

**Step 3: Clean Up Old Deployments**
```bash
netlify ls
# Delete old ones manually
```

---

## 🔒 Security Benefits

**With these settings:**
- ✅ Only production domain is public
- ✅ Preview deployments require password
- ✅ Search engines can't index previews
- ✅ No duplicate content issues
- ✅ No confusion for users
- ✅ Better security

---

## 📊 Verification Checklist

After configuration:

- [ ] Check robots.txt on preview URL (should block all)
- [ ] Check robots.txt on production (should allow)
- [ ] Verify preview URL redirects to production
- [ ] Verify password protection works (if enabled)
- [ ] Check Google: `site:your-project.netlify.app` (should be empty)
- [ ] Test deployment still works

---

## 🆘 Troubleshooting

### Preview URLs Still Accessible?

**Check:**
1. Robots.txt is blocking (but doesn't prevent access)
2. Enable password protection for actual blocking
3. Redirects are working

### Redirects Not Working?

**Verify:**
```bash
curl -I https://your-project.netlify.app/
# Should show: HTTP/2 308
# Location: https://www.elevateforhumanity.org/
```

### Still Indexed by Google?

**Solutions:**
1. Request removal in Search Console
2. Wait for robots.txt to take effect (can take weeks)
3. Use password protection to force de-indexing

---

## 📞 Support

**Netlify Documentation:**
- https://netlify.com/docs/concepts/deployments/preview-deployments
- https://netlify.com/docs/security/deployment-protection

**Need Help?**
- Netlify Support: https://netlify.com/support
- Check Netlify status: https://netlify-status.com

---

**Last Updated:** January 6, 2026  
**Status:** Preview domains blocked from indexing ✅  
**Recommendation:** Add password protection for extra security
