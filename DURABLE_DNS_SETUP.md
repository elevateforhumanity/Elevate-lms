# Durable DNS Setup for Redirect

**Domain:** elevateforhumanity.org  
**Purpose:** Redirect to elevateforhumanity.institute  
**Method:** Point DNS to Netlify, let Netlify handle redirect

## 🎯 What This Does

When someone visits elevateforhumanity.org, they'll be automatically redirected to elevateforhumanity.institute.

## 📋 DNS Records to Add in Durable

Log in to your Durable dashboard and add these DNS records for **elevateforhumanity.org**:

### Record 1: Root Domain (A Record)
```
Type: A
Name: @ (or leave blank for root)
Value: 75.2.60.5
TTL: 3600 (or Auto)
```

### Record 2: WWW Subdomain (CNAME Record)
```
Type: CNAME
Name: www
Value: thunderous-axolotl-89d28d.netlify.app
TTL: 3600 (or Auto)
```

## 🔧 How to Add in Durable

1. **Log in to Durable**
   - Go to [durable.co](https://durable.co)
   - Log in to your account

2. **Find DNS Settings**
   - Go to your site settings
   - Look for "Domain" or "DNS" settings
   - Find "Custom DNS" or "Advanced DNS"

3. **Add A Record**
   - Click "Add Record" or "Add DNS Record"
   - Type: A
   - Name: @ (or leave blank)
   - Value: 75.2.60.5
   - Save

4. **Add CNAME Record**
   - Click "Add Record" again
   - Type: CNAME
   - Name: www
   - Value: thunderous-axolotl-89d28d.netlify.app
   - Save

## ⚠️ Important Notes

1. **Remove Existing Records**
   - If there are existing A or CNAME records for @ and www, remove them first
   - Otherwise you'll have conflicts

2. **Durable Site Will Stop Working**
   - Once you point DNS to Netlify, the Durable site won't be accessible
   - All traffic will redirect to elevateforhumanity.institute
   - This is intentional for the redirect

3. **DNS Propagation**
   - Changes take 1-24 hours to propagate globally
   - Some users may see old site during this time

## ✅ Verify Configuration

After adding DNS records, verify with these tools:

**Check DNS Propagation:**
- [https://www.whatsmydns.net](https://www.whatsmydns.net)
- Enter: elevateforhumanity.org
- Look for: 75.2.60.5

**Test Redirect:**
```bash
# After DNS propagates, this should redirect
curl -I http://elevateforhumanity.org
# Should show: Location: https://elevateforhumanity.institute

curl -I http://www.elevateforhumanity.org
# Should show: Location: https://elevateforhumanity.institute
```

## 🔄 What Happens After Setup

1. **User visits:** elevateforhumanity.org
2. **DNS resolves to:** Netlify (75.2.60.5)
3. **Netlify sees:** Request for .org domain
4. **Netlify redirects to:** elevateforhumanity.institute
5. **User sees:** elevateforhumanity.institute in browser

## 📊 Timeline

| Step | Time |
|------|------|
| Add DNS in Durable | 5 minutes |
| DNS propagation | 1-24 hours |
| SSL certificate (Netlify) | Automatic |
| Redirects active | After DNS propagates |

## 🆘 Troubleshooting

**Can't find DNS settings in Durable:**
- Look for "Domain Settings"
- Try "Advanced Settings"
- Contact Durable support if needed

**DNS not updating:**
- Wait 24 hours for full propagation
- Clear your DNS cache
- Try different DNS checker tools

**Redirect not working:**
- Verify DNS is pointing to 75.2.60.5
- Check Netlify deploy logs
- Ensure netlify.toml has redirect rules (already configured)

## ✅ Netlify Configuration (Already Done)

I've already configured Netlify to:
- ✅ Accept elevateforhumanity.org as domain alias
- ✅ Redirect .org → .institute
- ✅ Redirect www.org → .institute
- ✅ Handle both HTTP and HTTPS

## 📝 Summary

**What you need to do:**
1. Add A record in Durable: @ → 75.2.60.5
2. Add CNAME in Durable: www → thunderous-axolotl-89d28d.netlify.app
3. Wait for DNS to propagate (1-24 hours)

**What happens automatically:**
- Netlify provisions SSL for .org domain
- All .org traffic redirects to .institute
- Both domains work seamlessly

---

**Status:** Netlify configured ✅  
**Next Step:** Add DNS records in Durable  
**ETA:** Redirects active in 1-24 hours after DNS setup
