# DNS Optimization Guide for elevateforhumanity.institute

## Current Status
✅ Domain is working correctly
⚠️ Using older Vercel IPs (performance can be improved)

---

## What Needs to be Fixed

### 1. Update Primary Domain A Records

**Current Configuration:**
```
elevateforhumanity.institute
  Type: A
  Values: 216.150.16.129, 216.150.1.65
```

**Recommended Configuration:**
```
elevateforhumanity.institute
  Type: A
  Value: 76.76.21.21
```

**Why:** Vercel's newer IP provides better routing and performance.

---

### 2. Update WWW Subdomain to CNAME

**Current Configuration:**
```
www.elevateforhumanity.institute
  Type: A
  Values: 216.150.16.193, 216.150.1.65
```

**Recommended Configuration:**
```
www.elevateforhumanity.institute
  Type: CNAME
  Value: cname.vercel-dns.com
```

**Why:** CNAME automatically updates when Vercel changes infrastructure.

---

## How to Fix (Step-by-Step)

### Option 1: Via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/selfish2/elevate-lms/settings/domains

2. **Click on "elevateforhumanity.institute"**
   - You'll see DNS configuration

3. **Update A Record**
   - Find the A record for `@` (root domain)
   - Change IP from `216.150.16.129` to `76.76.21.21`
   - Remove the second A record `216.150.1.65`
   - Save changes

4. **Update WWW Record**
   - Find the A records for `www`
   - Delete both A records
   - Add new CNAME record:
     - Name: `www`
     - Value: `cname.vercel-dns.com`
   - Save changes

5. **Wait for Propagation**
   - DNS changes take 5-30 minutes
   - Check status: https://dnschecker.org

---

### Option 2: Via Vercel CLI (Advanced)

```bash
# Login to Vercel
vercel login

# List current DNS records
vercel dns ls elevateforhumanity.institute

# Remove old A records
vercel dns rm elevateforhumanity.institute @ A
vercel dns rm elevateforhumanity.institute www A

# Add new A record for root domain
vercel dns add elevateforhumanity.institute @ A 76.76.21.21

# Add CNAME for www
vercel dns add elevateforhumanity.institute www CNAME cname.vercel-dns.com
```

---

### Option 3: Via DNS Provider (If not using Vercel DNS)

If you're using an external DNS provider (GoDaddy, Cloudflare, etc.):

1. **Login to your DNS provider**

2. **Update A Record for root domain:**
   - Type: A
   - Name: @ (or leave blank)
   - Value: 76.76.21.21
   - TTL: 3600 (or Auto)

3. **Update WWW to CNAME:**
   - Delete existing A records for www
   - Add new record:
     - Type: CNAME
     - Name: www
     - Value: cname.vercel-dns.com
     - TTL: 3600 (or Auto)

4. **Save changes**

---

## Verification Commands

After making changes, verify with these commands:

```bash
# Check root domain A record
curl -s "https://dns.google/resolve?name=elevateforhumanity.institute&type=A" | python3 -m json.tool

# Expected output:
# "data": "76.76.21.21"

# Check www CNAME record
curl -s "https://dns.google/resolve?name=www.elevateforhumanity.institute&type=CNAME" | python3 -m json.tool

# Expected output:
# "data": "cname.vercel-dns.com."

# Test website still works
curl -I https://elevateforhumanity.institute/
# Should return: HTTP/2 200

curl -I https://www.elevateforhumanity.institute/
# Should return: HTTP/2 308 (redirect to non-www)
```

---

## Expected Results

### Before Changes:
```
elevateforhumanity.institute → 216.150.16.129 (old IP)
www.elevateforhumanity.institute → 216.150.16.193 (old IP)
```

### After Changes:
```
elevateforhumanity.institute → 76.76.21.21 (new IP)
www.elevateforhumanity.institute → cname.vercel-dns.com → 76.76.21.21
```

### Performance Impact:
- ✅ Faster DNS resolution
- ✅ Better global routing
- ✅ Automatic IP updates (for www via CNAME)
- ✅ Improved reliability

---

## Troubleshooting

### If site goes down after changes:

1. **Check DNS propagation:**
   ```bash
   curl -s "https://dns.google/resolve?name=elevateforhumanity.institute&type=A" | python3 -m json.tool
   ```

2. **Revert to old IPs if needed:**
   ```bash
   vercel dns add elevateforhumanity.institute @ A 216.150.16.129
   vercel dns add elevateforhumanity.institute @ A 216.150.1.65
   ```

3. **Wait 30 minutes for TTL to expire**

### If www redirect stops working:

1. **Verify CNAME is correct:**
   ```bash
   curl -s "https://dns.google/resolve?name=www.elevateforhumanity.institute&type=CNAME" | python3 -m json.tool
   ```

2. **Check next.config.mjs redirect is still active:**
   ```javascript
   {
     source: '/:path*',
     has: [{ type: 'host', value: 'www.elevateforhumanity.institute' }],
     destination: 'https://elevateforhumanity.institute/:path*',
     permanent: true,
   }
   ```

---

## Timeline

- **DNS Update:** 1-2 minutes
- **Propagation:** 5-30 minutes (TTL is 1800 seconds = 30 minutes)
- **Full Global Propagation:** Up to 48 hours (rare)

---

## Notes

- ✅ Your domain is currently working fine
- ⚠️ This is an optimization, not a critical fix
- 📊 Expected performance improvement: 5-10% faster DNS resolution
- 🔒 No downtime expected if done correctly
- 🌍 Changes propagate globally within 30 minutes

---

## Current DNS Configuration (Before Changes)

```
Domain: elevateforhumanity.institute
Nameservers: ns1.vercel-dns.com, ns2.vercel-dns.com
Managed By: Vercel

Records:
  @ (root)
    Type: A
    Values: 216.150.16.129, 216.150.1.65
    TTL: 1800 seconds

  www
    Type: A
    Values: 216.150.16.193, 216.150.1.65
    TTL: 1800 seconds
```

---

## Recommended DNS Configuration (After Changes)

```
Domain: elevateforhumanity.institute
Nameservers: ns1.vercel-dns.com, ns2.vercel-dns.com
Managed By: Vercel

Records:
  @ (root)
    Type: A
    Value: 76.76.21.21
    TTL: 3600 seconds

  www
    Type: CNAME
    Value: cname.vercel-dns.com
    TTL: 3600 seconds
```

---

## Support

If you need help:
1. Vercel Support: https://vercel.com/support
2. Vercel DNS Docs: https://vercel.com/docs/concepts/projects/domains/dns
3. Check deployment logs: https://vercel.com/selfish2/elevate-lms

---

**Last Updated:** 2026-01-07
**Status:** Ready to implement
**Risk Level:** Low (optimization, not critical)
