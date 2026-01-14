# DNS Setup for Netlify

**Domain:** www.elevateforhumanity.org (bought on Netlify)  
**Netlify Site:** thunderous-axolotl-89d28d.netlify.app  
**Status:** ✅ Domain added to Netlify, DNS configuration needed

**Note:** elevateforhumanity.org is separate (hosted on Durable) - no changes needed there

## 🌐 DNS Records to Add

Since you bought the domain on Netlify, you need to update DNS in Netlify's domain settings:

### Configure DNS in Netlify

**Step 1: Go to Netlify Domain Settings**
1. Log in to [Netlify Dashboard](https://netlify.com/dashboard)
2. Go to Domains
3. Find `www.elevateforhumanity.org`
4. Click on the domain to manage DNS

**Step 2: Update DNS Records**

Since Netlify manages your domain, you have two options:

**Option A: Point to Netlify (Recommended)**

Update the DNS records in Netlify:

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

### elevateforhumanity.org Domain

**No changes needed!** This domain is hosted on Durable and should remain separate.

The .org and .institute sites are independent - no redirects between them.

## 🔒 SSL Certificate

Netlify will automatically provision an SSL certificate once DNS is configured.

**Timeline:**
- DNS propagation: 24-48 hours
- SSL certificate: Automatic after DNS propagates

## ✅ Verify DNS Configuration

After adding DNS records, verify with:

```bash
# Check A record
dig www.elevateforhumanity.org A

# Check CNAME record
dig www.www.elevateforhumanity.org CNAME

# Check if pointing to Netlify
curl -I https://www.elevateforhumanity.org
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

1. ✅ www.www.elevateforhumanity.org → www.elevateforhumanity.org

**Note:** elevateforhumanity.org is separate and hosted on Durable - no redirects configured

## 🧪 Test After DNS Propagation

Once DNS propagates (24-48 hours), test:

```bash
# Should redirect to https://www.elevateforhumanity.org
curl -I http://www.www.elevateforhumanity.org
curl -I http://elevateforhumanity.org
curl -I http://www.elevateforhumanity.org

# Should load site
curl -I https://www.elevateforhumanity.org
```

## 📊 Check DNS Propagation Status

Use these tools to check DNS propagation:
- [https://www.whatsmydns.net](https://www.whatsmydns.net)
- [https://dnschecker.org](https://dnschecker.org)

Enter: `www.elevateforhumanity.org`

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
