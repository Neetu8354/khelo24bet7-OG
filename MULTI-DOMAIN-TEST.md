# Multi-Domain Testing Guide

## How the Dynamic System Works

### Client-Side (domain-dynamic.js)
When a page loads, the script:
1. Detects current domain: `window.location.host`
2. Updates all meta tags and links to use current domain
3. Updates JSON-LD schema URLs

### Server-Side (Vercel API Routes)
- `/sitemap.xml` → `api/sitemap.xml.js` generates sitemap with current domain
- `/robots.txt` → `api/robots.txt.js` generates robots.txt with current domain

## Testing Steps

### Test 1: Verify Client-Side Dynamic Updates
Open each domain in browser and check View Source:

**For khelo24info.live:**
```html
<link rel="canonical" href="https://www.khelo24info.live/">
<meta property="og:url" content="https://www.khelo24info.live/">
<meta property="og:image" content="https://www.khelo24info.live/assets/d2/og/og_4.jpg">
```

**For kheloo24.live:**
```html
<link rel="canonical" href="https://www.kheloo24.live/">
<meta property="og:url" content="https://www.kheloo24.live/">
<meta property="og:image" content="https://www.kheloo24.live/assets/d2/og/og_4.jpg">
```

### Test 2: Verify Sitemap
Visit `/sitemap.xml` on each domain:

**khelo24info.live/sitemap.xml should show:**
```xml
<loc>https://www.khelo24info.live/</loc>
<loc>https://www.khelo24info.live/exchange</loc>
```

**kheloo24.live/sitemap.xml should show:**
```xml
<loc>https://www.kheloo24.live/</loc>
<loc>https://www.kheloo24.live/exchange</loc>
```

### Test 3: Verify Robots.txt
Visit `/robots.txt` on each domain:

**khelo24info.live/robots.txt should show:**
```
Sitemap: https://www.khelo24info.live/sitemap.xml
```

**kheloo24.live/robots.txt should show:**
```
Sitemap: https://www.kheloo24.live/sitemap.xml
```

## Troubleshooting

### If sitemap/robots show same domain:
1. Check Vercel deployment logs
2. Verify API routes are deployed (check Vercel Functions tab)
3. Clear CDN cache in Vercel dashboard
4. Wait 5 minutes for propagation

### If meta tags show wrong domain:
1. Hard refresh browser (Ctrl+Shift+R)
2. Check browser console for JavaScript errors
3. Verify `domain-dynamic.js` is loading (Network tab)

### If nothing works:
1. Redeploy from Vercel dashboard
2. Check build logs for errors
3. Verify `vercel.json` is in root directory
4. Ensure API folder is committed to git

## Expected Behavior

✅ **Same HTML files** work for all domains
✅ **Each domain** shows its own URLs in:
   - Canonical tags
   - Open Graph tags
   - JSON-LD schema
   - Sitemap
   - Robots.txt

❌ **Should NOT** have hardcoded `khelo24info.live` or `kheloo24.live` anywhere in final rendered HTML
