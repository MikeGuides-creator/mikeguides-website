# MikeGuides Maintenance Cheatsheet

*Last updated: 2025‑10‑23*

A quick, practical reference for keeping **MikeGuides.co** healthy, fast, and festive. Save this in the repo root as `MAINTENANCE.md`.

---

## 1) Daily Quick Checks (90 seconds)

* Open the homepage and **Products** grid in an incognito tab.
* Spot‑check 2–3 cards load fast (no blurry/foggy thumbs, no 404s in DevTools → Network).
* If anything looks stale after an image batch: **Actions → MikeGuides Utilities → Purge Netlify cache and redeploy** (Confirm + type `CONFIRM`).

---

## 2) Seasonal Toggle – How To

**Files involved**

* JS: `/assets/js/season-toggle.js` (already installed)
* Optional theme: CSS variables in `/assets/css/site.css`

**Include the script** on any page with seasonal cards (near `</body>`):

```html
<script defer src="/assets/js/season-toggle.js?v=2025-10-23b"></script>
```

**Mark images that should swap**

```html
<img data-seasonal
     alt="AI Marketing Toolkit"
     width="960" height="960" loading="lazy"
     data-src-default="/assets/images/products/ai-marketing-toolkit/ai-marketing-toolkit.v20251014a.960.png">
```

> The script derives the Halloween path automatically: `/assets/images/products/card_hallow_<slug>.v20251023a.960x960.jpg`.

**Force a season via URL**

* `?season=halloween` or `?season=default`

**User memory**

* User choice is remembered in `localStorage` (`mg-season`). Clear it to reset.

**Optional orange theme** (flip brand tokens in CSS when `.theme-halloween` is on):

```css
.theme-halloween {
  --mg-blue: #f97316;  /* orange */
  --mg-green: #f59e0b; /* amber */
  --mg-ink: #0b1020;
  --mg-bg: #fff7ed;
}
```

**Derived filenames (common slugs)**

```
/assets/images/products/card_hallow_ai-marketing-toolkit.v20251023a.960x960.jpg
/assets/images/products/card_hallow_visual-ai-studio.v20251023a.960x960.jpg
/assets/images/products/card_hallow_chatgpt-mastery-simulator.v20251023a.960x960.jpg
/assets/images/products/card_hallow_ai-business-automation-roi.v20251023a.960x960.jpg
/assets/images/products/card_hallow_business-builder-bundle.v20251023a.960x960.jpg
/assets/images/products/card_hallow_pricing-for-profit-system.v20251023a.960x960.jpg
/assets/images/products/card_hallow_ai-writing-workshop.v20251023a.960x960.jpg
```

---

## 3) Versioning & Cache Busting

* **CSS**: bump querystring when you edit: `<link rel="stylesheet" href="/assets/css/site.css?v=13">`
* **JS**: same idea: `<script defer src="/assets/js/season-toggle.js?v=2025-10-23b"></script>`
* **Images**: export with a new **versioned filename** (e.g., `...v20251023b.960x960.jpg`).
* After big batches: run **Purge Netlify cache and redeploy** (see §4).

---

## 4) One‑Click Ops in GitHub → Actions

Use **Actions → MikeGuides Utilities → Run workflow**. Always **check Confirm**; for purge tasks, type `CONFIRM`.

**Tasks**

* **Just log success** – no‑op sanity test (should always be green).
* **Trigger Netlify build hook** – normal rebuild (no cache clear).
* **Purge Netlify cache and redeploy** – does a clean build (use after many image/CSS/JS changes).
* **Bust image cache (purge CDN)** – invalidates CDN edge cache immediately (use if an asset stays stale in some regions).

**Secrets required (one‑time in repo → Settings → Secrets → Actions)**

* `NETLIFY_BUILD_HOOK` – your site’s build hook URL.
* `NETLIFY_API_TOKEN` – personal access token for Netlify API.
* `NETLIFY_SITE_ID` – your site’s API (site) ID.

---

## 5) Pre‑Deploy Checklist (2 minutes)

* ✅ Updated image filenames include a fresh version (e.g., `v20251023a`).
* ✅ Any new seasonal cards have `data-seasonal` and a valid default path.
* ✅ `site.css`/`season-toggle.js` querystrings bumped if you edited them.
* ✅ No console errors on local preview.

Then run **Trigger Netlify build hook** (normal) or **Purge Netlify cache and redeploy** (after big asset changes).

---

## 6) Post‑Deploy Verification

* Open **incognito** and hard-refresh the products grid.
* DevTools → Network → filter `card_hallow_` → confirm **200 OK** (no 404s).
* If an asset is stubbornly stale: run **Bust image cache (purge CDN)**.

---

## 7) Troubleshooting Quick Fixes

**Image 404s**

* Confirm the derived path matches your file (see §2 list). If not, add `data-src-halloween="/exact/path.jpg"` on that one card.

**Links 404 across the site**

* Ensure `/404.html` exists and `_redirects` is present at repo root (or `/public` on Netlify) to handle clean URLs.

**ERR_SSL_PROTOCOL_ERROR**

* Usually a caching/CDN hiccup. In Netlify: toggle **Enable/Disable** HTTPS, or redeploy with cache clear. If domain settings changed, re‑issue the cert via **Domains**.

**CSP blocked scripts**

* `script-src` must allow `'self'`. External analytics require explicit host entries.

**Actions spam**

* Keep workflows **manual‑only**. Avoid `on: push` triggers unless you truly need CI.

---

## 8) Paths & Conventions (reference)

* Default card images: `/assets/images/products/<slug>/<slug>.vYYYYMMDDx.SIZE.png`
* Halloween images (flat): `/assets/images/products/card_hallow_<slug>.v20251023a.960x960.jpg`
* JS: `/assets/js/season-toggle.js`
* CSS: `/assets/css/site.css`

---

## 9) Emergency “Everything Looks Wrong” Procedure (2 steps)

1. **Actions → Purge Netlify cache and redeploy** (Confirm + `CONFIRM`).
2. If still broken, **Bust image cache (purge CDN)**, then incognito hard‑refresh.

---

## 10) Nice‑to‑Have Tools (later)

* A `/debug/season-verify.html` admin page listing **Default → Derived** seasonal paths with 200/404 badges.
* A small script to batch‑rename images to the current version token.

---

**That’s it.** Keep this doc in the repo root; update the date at top when you change processes.
