# Netlify Auto-Deploy Webhook Fix

## Problem
Netlify stopped auto-deploying when code is pushed to GitHub.

## Root Cause
The GitHub webhook that notifies Netlify of new commits is either:
- Not configured
- Disconnected
- Failing to deliver

## Solution

### Option 1: Reconnect via Netlify Dashboard (RECOMMENDED)

1. Go to **Netlify Dashboard** → Your Project
2. Click **Settings** → **Git**
3. If you see "Disconnected" or no repository:
   - Click **Connect Git Repository**
   - Select **GitHub**
   - Authorize Netlify
   - Select `elevateforhumanity/Elevate-lms`
4. Ensure **Production Branch** is set to `main`
5. Ensure **Auto-deploy** is enabled

### Option 2: Fix GitHub Webhook Manually

1. Go to **GitHub**: https://github.com/elevateforhumanity/Elevate-lms/settings/hooks
2. Look for a webhook with URL: `hooks.netlify.com`
3. If it exists:
   - Click **Edit**
   - Scroll to **Recent Deliveries**
   - Check if deliveries are failing (red X)
   - If failing, click **Redeliver** to test
4. If webhook doesn't exist:
   - Go back to Netlify Dashboard
   - Settings → Git → Disconnect and Reconnect
   - This will recreate the webhook

### Option 3: Create Webhook Manually (Advanced)

If Options 1 & 2 don't work:

1. Go to **Netlify Dashboard** → Your Project → **Settings** → **Git**
2. Copy the **Deploy Hook URL** (create one if needed)
3. Go to **GitHub** → Repository → **Settings** → **Webhooks** → **Add webhook**
4. Configure:
   - **Payload URL**: Your Netlify deploy hook URL
   - **Content type**: `application/json`
   - **Events**: Select "Just the push event"
   - **Active**: Checked
5. Click **Add webhook**

## Verification

After fixing, test with a commit:

```bash
git commit --allow-empty -m "test: Verify auto-deploy works"
git push origin main
```

Then check:
1. Netlify Dashboard → Deployments
2. Should see new deployment within 30 seconds
3. If not, webhook is still broken

## Current Configuration

- ✅ `netlify.json` configured correctly
- ✅ `deploymentEnabled` set to `true` for `main` branch
- ✅ `ignoreCommand` set to always deploy
- ❌ GitHub webhook needs manual reconnection

## Files Modified

- `netlify.json` - Changed `ignoreCommand` to `exit 0` to force all deployments
- This ensures no commits are accidentally skipped

## Next Steps

1. Follow Option 1 above (reconnect in Netlify)
2. Test with the verification commit
3. Once working, you can optionally restore the smart deploy filter:
   ```json
   "ignoreCommand": "bash scripts/should-deploy.sh"
   ```

## Support

If still not working after all options:
- Contact Netlify Support
- Check Netlify status page: https://www.netlify-status.com/
- Verify GitHub permissions for Netlify app
