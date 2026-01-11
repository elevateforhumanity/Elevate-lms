# DNS Setup for Netlify

**Domain:** elevateforhumanity.institute  
**Netlify Site:** thunderous-axolotl-89d28d.netlify.app  
**Status:** ✅ Domain added to Netlify, DNS configuration needed

## 🌐 DNS Records to Add

Go to your domain registrar (where you bought elevateforhumanity.institute) and add these DNS records:

### Primary Domain (elevateforhumanity.institute)

**Option A: Using Netlify DNS (Recommended)**

Point your nameservers to Netlify:
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

**Option B: Using Your Current DNS Provider**

Add these records:

#### A Record (for root domain)
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600
```

#### CNAME Record (for www)
```
Type: CNAME
Name: www
Value: thunderous-axolotl-89d28d.netlify.app
TTL: 3600
```

### Old Domain Redirects (elevateforhumanity.org)

If you still own elevateforhumanity.org, add these records:

#### A Record
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600
```

#### CNAME Record
```
Type: CNAME
Name: www
Value: thunderous-axolotl-89d28d.netlify.app
TTL: 3600
```

**Note:** The redirects from .org to .institute are already configured in `netlify.toml`

## 🔒 SSL Certificate

Netlify will automatically provision an SSL certificate once DNS is configured.

**Timeline:**
- DNS propagation: 24-48 hours
- SSL certificate: Automatic after DNS propagates

## ✅ Verify DNS Configuration

After adding DNS records, verify with:

```bash
# Check A record
dig elevateforhumanity.institute A

# Check CNAME record
dig www.elevateforhumanity.institute CNAME

# Check if pointing to Netlify
curl -I https://elevateforhumanity.institute
```

## 📋 Domain Registrar Instructions

### Common Registrars:

**GoDaddy:**
1. Go to DNS Management
2. Add A record: @ → 75.2.60.5
3. Add CNAME: www → thunderous-axolotl-89d28d.netlify.app

**Namecheap:**
1. Go to Advanced DNS
2. Add A Record: @ → 75.2.60.5
3. Add CNAME: www → thunderous-axolotl-89d28d.netlify.app

**Cloudflare:**
1. Go to DNS settings
2. Add A record: @ → 75.2.60.5 (Proxy status: DNS only)
3. Add CNAME: www → thunderous-axolotl-89d28d.netlify.app (Proxy status: DNS only)

**Google Domains:**
1. Go to DNS settings
2. Add A record: @ → 75.2.60.5
3. Add CNAME: www → thunderous-axolotl-89d28d.netlify.app

## 🔄 Current Redirects Configured

These redirects are already set up in `netlify.toml`:

1. ✅ elevateforhumanity.org → elevateforhumanity.institute
2. ✅ www.elevateforhumanity.org → elevateforhumanity.institute
3. ✅ www.elevateforhumanity.institute → elevateforhumanity.institute
4. ✅ All Vercel URLs → elevateforhumanity.institute

## 🧪 Test After DNS Propagation

Once DNS propagates (24-48 hours), test:

```bash
# Should redirect to https://elevateforhumanity.institute
curl -I http://www.elevateforhumanity.institute
curl -I http://elevateforhumanity.org
curl -I http://www.elevateforhumanity.org

# Should load site
curl -I https://elevateforhumanity.institute
```

## 📊 Check DNS Propagation Status

Use these tools to check DNS propagation:
- [https://www.whatsmydns.net](https://www.whatsmydns.net)
- [https://dnschecker.org](https://dnschecker.org)

Enter: `elevateforhumanity.institute`

## ⚠️ Important Notes

1. **Don't delete old DNS records** until new ones are working
2. **TTL (Time To Live)** affects how quickly changes propagate
3. **SSL certificate** will be issued automatically by Netlify
4. **Test with temporary URL** while DNS propagates: [https://thunderous-axolotl-89d28d.netlify.app](https://thunderous-axolotl-89d28d.netlify.app)

## 🆘 Troubleshooting

**Domain not resolving after 48 hours:**
- Verify DNS records are correct
- Check nameservers are pointing correctly
- Clear your DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

**SSL certificate not issued:**
- Wait for DNS to fully propagate
- Check Netlify Dashboard > Domain Settings > HTTPS
- May take up to 24 hours after DNS propagates

**Redirects not working:**
- Verify `netlify.toml` is deployed
- Check Netlify deploy logs
- Test with curl to see actual redirect headers

---

**Status:** Domain configured in Netlify ✅  
**Next Step:** Add DNS records at your domain registrar  
**ETA:** Site live in 24-48 hours after DNS configuration
