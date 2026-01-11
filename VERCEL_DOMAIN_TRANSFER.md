# Transfer Domain from Vercel to Netlify

**Domain:** elevateforhumanity.institute  
**Current:** Vercel (domain registrar)  
**Target:** Netlify (hosting)  
**Other Domain:** elevateforhumanity.org (stays on Durable - no changes)

## 🎯 Goal

Keep the domain registered with Vercel, but point it to Netlify for hosting.

## 📋 Step-by-Step Instructions

### Option 1: Update DNS in Vercel (Easiest - 5 minutes)

**Step 1: Access Vercel Domain Settings**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on "Domains" in the sidebar
3. Find `elevateforhumanity.institute`
4. Click on the domain

**Step 2: Update DNS Records**

Remove or update existing records and add:

```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600 (or Auto)

Type: CNAME
Name: www
Value: thunderous-axolotl-89d28d.netlify.app
TTL: 3600 (or Auto)
```

**Step 3: Remove Vercel Project Assignment**
1. In Vercel domain settings
2. If the domain is assigned to a project, click "Remove"
3. This prevents Vercel from overriding DNS

### Option 2: Transfer Domain to Another Registrar (Optional)

If you want to move the domain away from Vercel entirely:

**Step 1: Unlock Domain in Vercel**
1. Go to Vercel domain settings
2. Look for "Transfer Domain" or "Domain Lock"
3. Unlock the domain

**Step 2: Get Transfer Code**
1. Request EPP/Auth code from Vercel
2. This code is needed to transfer

**Step 3: Transfer to New Registrar**
- Namecheap
- Google Domains
- Cloudflare
- Or keep with Vercel and just update DNS (Option 1)

**Recommendation:** Keep domain with Vercel, just update DNS (Option 1 is easier)

## ✅ Verify Configuration

After updating DNS in Vercel:

```bash
# Check A record (should show 75.2.60.5)
dig elevateforhumanity.institute A

# Check CNAME (should show Netlify)
dig www.elevateforhumanity.institute CNAME

# Test site (after DNS propagates)
curl -I https://elevateforhumanity.institute
```

## ⏱️ Timeline

| Step | Time |
|------|------|
| Update DNS in Vercel | 5 minutes |
| DNS propagation | 1-24 hours |
| SSL certificate (Netlify) | Automatic after DNS |
| Site fully live | 1-24 hours |

## 🔒 SSL Certificate

Netlify will automatically provision an SSL certificate once:
1. DNS is pointing to Netlify
2. DNS has propagated globally
3. Usually takes 1-2 hours after DNS propagation

## 🧪 Test Before Full Cutover

**Current working URL:**
[https://thunderous-axolotl-89d28d.netlify.app](https://thunderous-axolotl-89d28d.netlify.app)

Test everything works on this URL before updating DNS:
- [ ] Homepage loads
- [ ] Login/signup works
- [ ] Course pages display
- [ ] Payment processing works
- [ ] API endpoints respond
- [ ] All features functional

## 📊 DNS Propagation Check

Use these tools to monitor DNS propagation:
- [https://www.whatsmydns.net](https://www.whatsmydns.net)
- [https://dnschecker.org](https://dnschecker.org)

Enter: `elevateforhumanity.institute`

Look for:
- A record: 75.2.60.5
- CNAME (www): thunderous-axolotl-89d28d.netlify.app

## ⚠️ Important Notes

1. **Don't cancel Vercel domain** - You still need it as your registrar
2. **Keep domain registered with Vercel** - Just update DNS
3. **elevateforhumanity.org stays on Durable** - No changes needed
4. **Test on Netlify URL first** - Before updating DNS
5. **Update webhooks after DNS** - Stripe, Supabase, etc.

## 🔄 Rollback Plan

If something goes wrong:

**Immediate Rollback:**
1. Go back to Vercel domain settings
2. Change A record back to Vercel's IP
3. Change CNAME back to Vercel
4. DNS will revert in 1-24 hours

**Keep Vercel project running** until you confirm Netlify is working perfectly.

## 📝 Checklist

- [ ] Test site on thunderous-axolotl-89d28d.netlify.app
- [ ] Verify all features work
- [ ] Update DNS in Vercel domain settings
- [ ] Wait for DNS propagation (1-24 hours)
- [ ] Verify SSL certificate issued
- [ ] Update Stripe webhook URL
- [ ] Update Supabase auth URLs
- [ ] Test production site
- [ ] Monitor for 24 hours
- [ ] Archive Vercel project (after 1 week)

## 🆘 Troubleshooting

**DNS not updating:**
- Check if domain is locked in Vercel
- Verify you have permission to edit DNS
- Try removing project assignment in Vercel

**SSL certificate not issued:**
- Wait 24 hours for DNS to fully propagate
- Check Netlify Dashboard > Domain Settings > HTTPS
- Verify DNS is pointing correctly

**Site not loading:**
- Check DNS propagation status
- Clear browser cache
- Try incognito/private browsing
- Check Netlify deploy logs

## 📞 Support

- **Vercel Domain Support:** [vercel.com/support](https://vercel.com/support)
- **Netlify Support:** [support.netlify.com](https://support.netlify.com)

---

**Next Step:** Update DNS in Vercel domain settings (Option 1 above)  
**ETA:** Site live in 1-24 hours after DNS update
