# Custom SMTP Setup Guide

## Current Status
Using Supabase built-in email service with rate limits.

## When to Set Up Custom SMTP

**Set up before:**
- Launching to production users
- Expecting 50+ signups per day
- Needing branded email addresses
- Requiring high deliverability

**Can wait if:**
- Still in development/testing
- Low user volume (< 20 signups/day)
- Soft launch phase

## Recommended SMTP Providers

### 1. Resend (Recommended)
**Best for:** Modern apps, developer-friendly
- **Free tier:** 3,000 emails/month, 100/day
- **Pricing:** $20/month for 50,000 emails
- **Setup time:** 5 minutes
- **Website:** https://resend.com

**Pros:**
- Simple API
- Great deliverability
- Easy domain verification
- Built for transactional emails

### 2. SendGrid
**Best for:** High volume, established service
- **Free tier:** 100 emails/day
- **Pricing:** $19.95/month for 50,000 emails
- **Setup time:** 10 minutes
- **Website:** https://sendgrid.com

**Pros:**
- Reliable infrastructure
- Good analytics
- Template management

### 3. Amazon SES
**Best for:** AWS users, cost-effective at scale
- **Free tier:** 62,000 emails/month (if on EC2)
- **Pricing:** $0.10 per 1,000 emails
- **Setup time:** 15-20 minutes
- **Website:** https://aws.amazon.com/ses

**Pros:**
- Very cheap at scale
- Integrates with AWS ecosystem

**Cons:**
- More complex setup
- Requires AWS account

### 4. Postmark
**Best for:** Transactional emails, high deliverability
- **Free tier:** 100 emails/month
- **Pricing:** $15/month for 10,000 emails
- **Setup time:** 10 minutes
- **Website:** https://postmarkapp.com

**Pros:**
- Excellent deliverability
- Fast delivery
- Great support

## Setup Instructions (Resend - Recommended)

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Sign up with your email
3. Verify your email address

### Step 2: Add Domain
1. Go to Domains → Add Domain
2. Enter: `www.elevateforhumanity.org`
3. Add DNS records to your domain provider:
   ```
   Type: TXT
   Name: _resend
   Value: [provided by Resend]
   
   Type: MX
   Name: @
   Value: [provided by Resend]
   Priority: 10
   ```

### Step 3: Get API Key
1. Go to API Keys → Create API Key
2. Name it: "Supabase Production"
3. Copy the API key (starts with `re_`)

### Step 4: Configure Supabase
1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/auth
2. Scroll to "SMTP Settings"
3. Enable "Enable Custom SMTP"
4. Fill in:
   ```
   Host: smtp.resend.com
   Port: 587
   Username: resend
   Password: [Your Resend API Key]
   Sender email: noreply@www.elevateforhumanity.org
   Sender name: Elevate for Humanity
   ```
5. Click "Save"

### Step 5: Test
1. Go to Authentication → Users
2. Click "Invite User"
3. Enter a test email
4. Check if email is received
5. Verify sender shows as `noreply@www.elevateforhumanity.org`

## Alternative: SendGrid Setup

### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com
2. Sign up (free tier available)
3. Verify your email

### Step 2: Verify Domain
1. Go to Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Enter: `www.elevateforhumanity.org`
4. Add DNS records provided by SendGrid

### Step 3: Create API Key
1. Go to Settings → API Keys
2. Create API Key with "Mail Send" permissions
3. Copy the API key (starts with `SG.`)

### Step 4: Configure Supabase
```
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: [Your SendGrid API Key]
Sender email: noreply@www.elevateforhumanity.org
Sender name: Elevate for Humanity
```

## DNS Records Required

For any SMTP provider, you'll need to add DNS records to `www.elevateforhumanity.org`:

### SPF Record
```
Type: TXT
Name: @
Value: v=spf1 include:[provider-spf] ~all
```

### DKIM Record
```
Type: TXT
Name: [provided by SMTP provider]
Value: [provided by SMTP provider]
```

### DMARC Record (Optional but recommended)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@www.elevateforhumanity.org
```

## Environment Variables (If Using Direct Integration)

If you want to send emails directly from your app (not through Supabase):

```bash
# Add to .env.local and Netlify
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@www.elevateforhumanity.org
```

## Testing Checklist

After setup:
- [ ] Send test email from Supabase
- [ ] Check email arrives in inbox (not spam)
- [ ] Verify sender shows correct name and email
- [ ] Test signup confirmation email
- [ ] Test password reset email
- [ ] Test magic link email
- [ ] Check email deliverability score

## Monitoring

### Check Email Deliverability
- Use: https://www.mail-tester.com
- Send test email to provided address
- Aim for score of 8/10 or higher

### Monitor Bounce Rates
- Check SMTP provider dashboard
- Keep bounce rate below 5%
- Remove invalid emails from database

## Cost Estimates

### Low Volume (< 1,000 emails/month)
- **Resend Free:** $0
- **SendGrid Free:** $0
- **Postmark Free:** $0

### Medium Volume (10,000 emails/month)
- **Resend:** $20/month
- **SendGrid:** $19.95/month
- **Amazon SES:** $1/month
- **Postmark:** $15/month

### High Volume (100,000 emails/month)
- **Resend:** $80/month
- **SendGrid:** $89.95/month
- **Amazon SES:** $10/month
- **Postmark:** $150/month

## Troubleshooting

### Emails Going to Spam
1. Verify SPF, DKIM, DMARC records
2. Warm up your domain (send gradually increasing volume)
3. Use consistent "From" address
4. Avoid spam trigger words

### Emails Not Sending
1. Check SMTP credentials in Supabase
2. Verify domain is verified with provider
3. Check API key permissions
4. Review provider logs for errors

### High Bounce Rate
1. Validate email addresses before sending
2. Remove hard bounces from database
3. Implement double opt-in for signups

## Quick Start (5 Minutes)

**Fastest setup with Resend:**

1. Sign up: https://resend.com
2. Get API key
3. Add to Supabase SMTP settings:
   - Host: `smtp.resend.com`
   - Port: `587`
   - User: `resend`
   - Pass: `[API key]`
   - From: `noreply@www.elevateforhumanity.org`
4. Test with invite user

**Note:** You can use Resend's shared domain initially, then add custom domain later for better branding.

## Next Steps

1. Choose SMTP provider based on volume needs
2. Set up account and verify domain
3. Configure in Supabase dashboard
4. Test all email types
5. Monitor deliverability
6. Set up alerts for bounces/failures

## Support Resources

- **Resend Docs:** https://resend.com/docs
- **SendGrid Docs:** https://docs.sendgrid.com
- **Supabase SMTP Guide:** https://supabase.com/docs/guides/auth/auth-smtp
- **Email Deliverability Guide:** https://www.validity.com/resource-center/email-deliverability-guide/
