# Domain Redirect Implementation Summary

**Date:** 2026-01-08 00:13 UTC  
**Status:** ✅ CONFIGURED IN VERCEL  
**Next Step:** ADD DNS RECORDS

---

## ✅ WHAT'S BEEN DONE

### Vercel Configuration: COMPLETE

**Domains Added:**
1. ✅ `elevateforhumanity.org`
   - Redirect: `www.elevateforhumanity.org`
   - Status Code: 308 (Permanent)
   - Verified: Yes

2. ✅ `www.elevateforhumanity.org`
   - Redirect: `www.elevateforhumanity.org`
   - Status Code: 308 (Permanent)
   - Verified: Yes

**Configuration:**
```json
{
  "name": "elevateforhumanity.org",
  "redirect": "www.elevateforhumanity.org",
  "redirectStatusCode": 308,
  "verified": true
}
```

---

## 🔴 ACTION REQUIRED: ADD DNS RECORDS

### Your DNS Provider: systemdns.com

**Nameservers detected:**
- ns1.systemdns.com
- ns2.systemdns.com
- ns3.systemdns.com

### DNS Records to Add:

#### Option A: A Records (Recommended)

**For Root Domain (@):**
```
Type: A
Name: @ (or leave blank for root)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

**For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

#### Option B: Use Vercel Nameservers (Alternative)

Change your nameservers to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Benefit:** Vercel manages everything automatically  
**Downside:** Lose control of DNS at systemdns.com

---

## 📋 DNS SETUP INSTRUCTIONS

### Step 1: Login to DNS Provider

1. Go to: https://systemdns.com (or your DNS control panel)
2. Login with your credentials
3. Find domain: `elevateforhumanity.org`

### Step 2: Add A Record

```
Record Type: A
Host/Name: @ (or blank, or elevateforhumanity.org)
Points to/Value: 76.76.21.21
TTL: 3600
```

**Save the record**

### Step 3: Add CNAME Record

```
Record Type: CNAME
Host/Name: www
Points to/Value: cname.vercel-dns.com
TTL: 3600
```

**Save the record**

### Step 4: Wait for Propagation

**Time:** 5-30 minutes (usually ~10 minutes)

**Check propagation:**
```bash
# Check A record
curl -s "https://dns.google/resolve?name=elevateforhumanity.org&type=A" | python3 -m json.tool

# Should show: "data": "76.76.21.21"

# Check CNAME record
curl -s "https://dns.google/resolve?name=www.elevateforhumanity.org&type=CNAME" | python3 -m json.tool

# Should show: "data": "cname.vercel-dns.com."
```

---

## 🧪 TESTING THE REDIRECT

### Once DNS Propagates (10-30 minutes):

**Test 1: Root Domain**
```bash
curl -I https://elevateforhumanity.org/
```
**Expected:**
```
HTTP/2 308 Permanent Redirect
location: https://www.elevateforhumanity.org/
```

**Test 2: WWW Subdomain**
```bash
curl -I https://www.elevateforhumanity.org/
```
**Expected:**
```
HTTP/2 308 Permanent Redirect
location: https://www.elevateforhumanity.org/
```

**Test 3: Deep Link with Path**
```bash
curl -I https://elevateforhumanity.org/programs/cna
```
**Expected:**
```
HTTP/2 308 Permanent Redirect
location: https://www.elevateforhumanity.org/programs/cna
```

**Test 4: Path with Query String**
```bash
curl -I https://elevateforhumanity.org/apply?ref=google&utm_source=test
```
**Expected:**
```
HTTP/2 308 Permanent Redirect
location: https://www.elevateforhumanity.org/apply?ref=google&utm_source=test
```

---

## 🔐 SUPABASE CONFIGURATION

### ⚠️ CRITICAL: Update Before Users Try to Login

**Where:** Supabase Dashboard → Authentication → URL Configuration

### Step 1: Update Site URL

**Current:** (check your Supabase settings)  
**New:** `https://www.elevateforhumanity.org`

### Step 2: Add Redirect URLs

**Add these to the whitelist:**
```
https://www.elevateforhumanity.org/**
https://www.elevateforhumanity.org/auth/callback
https://www.elevateforhumanity.org/auth/confirm
https://www.elevateforhumanity.org/login
```

**Keep temporarily (for transition):**
```
https://elevateforhumanity.org/**
https://elevateforhumanity.org/auth/callback
```

### Step 3: Update Environment Variables

**Check these files for hardcoded URLs:**
```bash
# Search for .org references
grep -r "elevateforhumanity.org" .env* app/ components/ lib/

# Update any found to .institute
```

**Common locations:**
- `.env.local`
- `.env.production`
- `lib/supabase/client.ts`
- `app/layout.tsx`

---

## 📊 SEO MIGRATION

### Google Search Console

**Step 1: Add New Property**
1. Go to: https://search.google.com/search-console
2. Click "Add Property"
3. Enter: `https://www.elevateforhumanity.org`
4. Verify ownership (DNS TXT record or HTML file)

**Step 2: Change of Address**
1. In old property (`.org`), go to Settings
2. Click "Change of Address"
3. Select new property (`.institute`)
4. Submit

**Requirements:**
- ✅ 308 redirects in place
- ✅ New property verified
- ✅ Redirects preserve paths

**Timeline:** Google processes in 2-4 weeks

---

## 📱 UPDATE EXTERNAL LINKS

**Update these platforms:**
- [ ] Facebook Page
- [ ] LinkedIn Company Page
- [ ] Instagram Bio
- [ ] Twitter/X Profile
- [ ] YouTube Channel
- [ ] Google Business Profile
- [ ] Email signatures
- [ ] Marketing materials
- [ ] Partner websites
- [ ] Directory listings

---

## ✅ VERIFICATION CHECKLIST

### After DNS Propagates:

- [ ] `https://elevateforhumanity.org/` → 308 → `.institute/`
- [ ] `https://www.elevateforhumanity.org/` → 308 → `.institute/`
- [ ] `https://elevateforhumanity.org/programs` → 308 → `.institute/programs`
- [ ] `https://elevateforhumanity.org/apply?ref=test` → 308 → `.institute/apply?ref=test`
- [ ] SSL certificate valid on `.org`
- [ ] No redirect loops
- [ ] Supabase login works
- [ ] OAuth callbacks work
- [ ] No console errors

### After 24 Hours:

- [ ] Google Search Console shows new property
- [ ] No 404 errors in Search Console
- [ ] Analytics tracking both domains
- [ ] No user login complaints

### After 1 Week:

- [ ] Submit Change of Address in Search Console
- [ ] Monitor organic traffic
- [ ] Check for any broken links

### After 30 Days:

- [ ] Remove `.org` from Supabase Redirect URLs
- [ ] Archive old Search Console property
- [ ] Update remaining external links

---

## 🚨 TROUBLESHOOTING

### Issue: DNS Not Propagating

**Check:**
```bash
# Check if DNS updated
curl -s "https://dns.google/resolve?name=elevateforhumanity.org&type=A" | python3 -m json.tool
```

**If still showing old/no records:**
- Wait longer (can take up to 48 hours)
- Verify records added correctly in DNS panel
- Check TTL wasn't set too high

### Issue: Redirect Loop

**Symptom:** Browser shows "Too many redirects"

**Fix:**
- Verify only ONE redirect configured (in Vercel)
- Check no conflicting redirects in `next.config.js`
- Clear browser cache

### Issue: SSL Certificate Error

**Symptom:** "Your connection is not private"

**Fix:**
- Wait for Vercel to provision SSL (5-10 minutes after DNS)
- Verify DNS points to Vercel
- Check domain is verified in Vercel

### Issue: Supabase Auth Fails

**Symptom:** "Invalid redirect URL" or login doesn't work

**Fix:**
- Add `.institute` to Supabase Redirect URLs
- Update Site URL to `.institute`
- Clear cookies and try incognito

---

## 📞 SUPPORT

### If You Need Help:

**Vercel Support:**
- Dashboard: https://vercel.com/support
- Docs: https://vercel.com/docs/concepts/projects/domains

**DNS Provider:**
- systemdns.com support
- Check their documentation for adding records

**Supabase:**
- Dashboard: https://app.supabase.com
- Docs: https://supabase.com/docs/guides/auth

---

## 📈 MONITORING

### Week 1: Daily Checks

**Monitor:**
- Redirect response time (<100ms)
- SSL certificate status
- User login success rate
- Any 404 errors

**Tools:**
- Google Search Console
- Vercel Analytics
- Supabase Auth Logs

### Week 2-4: SEO Transition

**Watch for:**
- Organic traffic patterns
- Indexed pages migrating
- Search rankings stability
- No increase in bounce rate

---

## 🎯 CURRENT STATUS

```
✅ Vercel Configuration: COMPLETE
⏳ DNS Records: PENDING (you need to add)
⏳ DNS Propagation: WAITING (5-30 min after DNS added)
⏳ Redirect Testing: PENDING (after DNS propagates)
⏳ Supabase Update: PENDING (do before users login)
⏳ SEO Migration: PENDING (after redirect works)
```

---

## 🚀 NEXT IMMEDIATE STEPS

### RIGHT NOW:

1. **Add DNS Records** (10 minutes)
   - Login to systemdns.com
   - Add A record: @ → 76.76.21.21
   - Add CNAME: www → cname.vercel-dns.com

2. **Wait for DNS** (10-30 minutes)
   - Check propagation with commands above
   - Have coffee ☕

3. **Test Redirects** (5 minutes)
   - Run all 4 test commands
   - Verify 308 redirects work
   - Check paths and query strings preserved

4. **Update Supabase** (15 minutes)
   - Change Site URL
   - Add Redirect URLs
   - Test login flow

5. **Setup Google Search Console** (30 minutes)
   - Add new property
   - Verify ownership
   - Submit Change of Address

---

## 📄 SUMMARY

**What's Done:**
- ✅ `.org` domain added to Vercel
- ✅ Redirect configured (308 permanent)
- ✅ WWW subdomain configured
- ✅ All verified in Vercel

**What You Need to Do:**
1. Add DNS records (A and CNAME)
2. Wait for propagation
3. Test redirects
4. Update Supabase
5. Setup Search Console

**Estimated Time:**
- DNS setup: 10 minutes
- Propagation: 10-30 minutes
- Testing: 5 minutes
- Supabase: 15 minutes
- Total: ~1 hour

**Risk:** Low (fully reversible)  
**Downtime:** 0 (seamless)

---

**Implementation Date:** 2026-01-08 00:13 UTC  
**Status:** ✅ VERCEL CONFIGURED - DNS PENDING  
**Next Action:** ADD DNS RECORDS
