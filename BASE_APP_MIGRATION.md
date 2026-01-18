# Base App Mini App Migration Guide

This guide will help you migrate Degen Memory Game to Base App Mini Apps.

## Prerequisites
- ✅ Project files are ready
- ⚠️ You need a Base app account
- ⚠️ You need to deploy your app to a public URL (Vercel, Netlify, etc.)

## Steps Completed

### ✅ Step 1: MiniApp SDK Added
- Added MiniApp SDK via CDN in `index.html`
- SDK will call `ready()` when app loads

### ✅ Step 2: Manifest File Created
- Created `.well-known/farcaster.json` manifest file
- **IMPORTANT**: Update all `https://your-app-domain.com` URLs to your actual domain

### ✅ Step 3: Embed Metadata Added
- Added `fc:miniapp` meta tag in `index.html`
- **IMPORTANT**: Update `https://your-app-domain.com` to your actual domain

## Steps to Complete

### Step 4: Deploy Your App
Deploy your app to a hosting service (Vercel, Netlify, GitHub Pages, etc.)

**Example with Vercel:**
```bash
npm i -g vercel
cd /Users/airm1/Documents/degen-memory-game
vercel
```

After deployment, note your app URL (e.g., `https://degen-memory.vercel.app`)

### Step 5: Update Manifest URLs
1. Open `.well-known/farcaster.json`
2. Replace all `https://your-app-domain.com` with your actual deployed URL
3. Update image URLs (you may need to create screenshot and OG images)

### Step 6: Update Embed Metadata
1. Open `index.html`
2. Find the `fc:miniapp` meta tag
3. Replace `https://your-app-domain.com` with your actual deployed URL

### Step 7: Create Account Association
1. Ensure your app is deployed and manifest is accessible at `https://your-domain.com/.well-known/farcaster.json`
2. Go to [Base Build Account Association Tool](https://docs.base.org/mini-apps/quickstart/migrate-existing-apps#step-5-create-accountassociation-credentials)
3. Paste your app URL and click "Submit"
4. Click "Verify" and follow instructions
5. Copy the `accountAssociation` fields (header, payload, signature)
6. Paste them into `.well-known/farcaster.json` in the `accountAssociation` section

### Step 8: Push Updated Files
After updating the manifest and metadata, redeploy your app:
```bash
vercel --prod
```

### Step 9: Preview Your App
1. Go to [Base Build Preview Tool](https://docs.base.org/mini-apps/quickstart/migrate-existing-apps#step-8-preview-your-app)
2. Enter your app URL
3. Check embeds, account association, and metadata

### Step 10: Publish
1. Open Base app
2. Create a post with your app URL
3. The app should appear as a launchable mini app!

## Required Images

You'll need to create/update these images:
- **Icon**: `images/base.png` (or create a dedicated icon)
- **Splash Image**: Used when app loads
- **Screenshots**: 3 screenshots for the store listing
- **OG Image**: For social media sharing (`og-image.png`)

## Notes

- The manifest file must be accessible at `https://your-domain.com/.well-known/farcaster.json`
- All URLs in the manifest must be absolute (full URLs with https://)
- Account association must be completed after deployment
- Test your app using the Base Build Preview tool before publishing

## Resources

- [Base Mini Apps Documentation](https://docs.base.org/mini-apps/quickstart/migrate-existing-apps)
- [Base Build Preview Tool](https://build.base.org)
- [Account Association Tool](https://build.base.org)
