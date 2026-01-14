# Stripe Integration Verification Audit
**Date:** January 8, 2026

---

## Current Stripe Status

### From Health Check:
```json
"stripe": {
  "ok": false,
  "status": "warn",
  "statusCode": 401
}
```

**Status:** ⚠️ 401 Unauthorized - API key issue

---

## Environment Variables Check

### ✅ Variables SET in Vercel:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_***
STRIPE_SECRET_KEY=sk_live_***
STRIPE_WEBHOOK_SECRET=whsec_***
```

---

## Issues Found

### 1. **401 Unauthorized Error**

**Possible Causes:**
- API key is test mode but trying to access live mode
- API key has been rotated/revoked
- API key has restricted permissions
- Whitespace/newline in the key value

### 2. **Key Format Check**

**Live Keys Should Start With:**
- Publishable: `pk_live_`
- Secret: `sk_live_`
- Webhook: `whsec_`

**Your Keys:** ✅ Correct format

---

## Verification Steps

### Test 1: Verify Secret Key
```bash
curl https://api.stripe.com/v1/balance \
  -u YOUR_STRIPE_SECRET_KEY:
```

**Expected:** Balance data  
**If 401:** Key is invalid or revoked

### Test 2: Check Key Permissions
Go to: https://dashboard.stripe.com/apikeys

**Verify:**
- Key exists and is active
- Key has "Full access" or required permissions
- Key is not restricted

### Test 3: Check Account Status
Go to: https://dashboard.stripe.com/settings/account

**Verify:**
- Account is activated
- Not in restricted mode
- Payments enabled

---

## Common Fixes

### Fix 1: Rotate Keys
1. Go to: https://dashboard.stripe.com/apikeys
2. Click "Create secret key"
3. Copy new key
4. Update in Vercel:
   ```
   STRIPE_SECRET_KEY=<new-key>
   ```
5. Redeploy

### Fix 2: Check Restrictions
1. Go to: https://dashboard.stripe.com/apikeys
2. Click on your key
3. Check "Permissions"
4. Ensure "Full access" or enable:
   - Charges
   - Customers
   - Payment Intents
   - Subscriptions
   - Webhooks

### Fix 3: Remove Whitespace
Sometimes env vars have hidden whitespace:
```bash
# In Vercel, re-add the key ensuring no spaces/newlines
STRIPE_SECRET_KEY=sk_live_...
```

---

## Testing Checklist

### ✅ Test Payment Flow:
1. Go to: https://www.elevateforhumanity.org/store
2. Add item to cart
3. Proceed to checkout
4. Use test card: `4242 4242 4242 4242`
5. Complete payment

### ✅ Test Webhook:
1. Go to: https://dashboard.stripe.com/webhooks
2. Find webhook for your site
3. Send test event
4. Check if received

### ✅ Test API Health:
```bash
curl https://www.elevateforhumanity.org/api/health
```
Should show: `"stripe": { "ok": true }`

---

## Recommended Actions

### Immediate:
1. **Verify key in Stripe dashboard** - Check if active
2. **Test key with curl** - Confirm it works
3. **Check account status** - Ensure not restricted

### If Key is Invalid:
1. **Generate new keys** in Stripe dashboard
2. **Update Vercel env vars**
3. **Redeploy** application
4. **Test** payment flow

### If Account is Restricted:
1. **Complete Stripe onboarding**
2. **Verify business information**
3. **Add bank account**
4. **Wait for approval**

---

## Current Integration Features

### ✅ What Works (When Keys Are Valid):
- Payment processing
- Subscription management
- Customer creation
- Webhook handling
- Checkout sessions
- Payment intents

### Files Using Stripe:
- `app/api/create-checkout-session/route.ts`
- `app/api/stripe/webhook/route.ts`
- `app/api/payments/create-session/route.ts`
- `lib/stripe.ts`

---

## Next Steps

1. **Log into Stripe Dashboard**
2. **Check API Keys page**
3. **Verify keys are active**
4. **Test with curl command above**
5. **If invalid, rotate keys**
6. **Update Vercel**
7. **Redeploy**
8. **Test payment flow**

---

## Status Summary

**Current:** ⚠️ 401 Error - Keys need verification  
**Impact:** Payments may not process  
**Priority:** HIGH  
**Time to Fix:** 5-10 minutes  
**Action:** Verify/rotate Stripe API keys
