---

# ASSET_SIZES.md

A concise reference for image dimensions, naming, and paths used across **MikeGuides** and **Pricing for Profit**.

## 1) Standard Sizes

| Purpose                               |                   Dimensions | Notes                                       | Example filename                          |
| ------------------------------------- | ---------------------------: | ------------------------------------------- | ----------------------------------------- |
| **Card / Product thumbnail**          |                  **960×960** | Square tiles in product grids, small promos | `ai-marketing-toolkit.v20251022a.960.png` |
| **Hero (tablet/desktop)**             | **1280×720** *(or 1280×800)* | Hero `<source>` for ≥768px                  | `hero.v20251022a.1280.png`                |
| **Hero (full desktop / OG fallback)** |                **1920×1080** | Top banner for ≥1280px and safe as OG       | `hero.v20251022a.1920.png`                |
| **OG / Social**                       |           **1200×630 (JPG)** | Preferred for `og:image` / Twitter          | `mikeguides-og-1200x630.jpg`              |

**Secondary (sometimes used):** `400×400`, `840×840` for alternate thumbnails.

---

## 2) Folder Structure

```
/assets
  /css
    site.css
  /images
    /hero
      hero.vYYYYMMDD[a|b].960.png
      hero.vYYYYMMDDa.1280.png
      hero.vYYYYMMDDa.1920.png
    /products
      <product-slug>.vYYYYMMDDa.960.png
    /og-cover
      <site>-og-1200x630.jpg
```

* All lowercase paths.
* Keep **hero images** in `/assets/images/hero/`.
* Keep **product/card images** in `/assets/images/products/`.
* Keep **OG images** (1200×630 JPG) in `/assets/images/og-cover/`.

---

## 3) Naming Convention

```
<slug>.vYYYYMMDD[a|b].<width>.png
```

**Examples**

* `hero.v20251022a.1920.png`
* `ai-business-automation-roi.v20251022a.960.png`

Use `a`, `b`, `c` to bump versions same day without guessing cache.

---

## 4) `<picture>` Snippet (Hero)

```html
<picture>
  <!-- Desktop -->
  <source media="(min-width:1280px)" srcset="/assets/images/hero/hero.v20251022a.1920.png">
  <!-- Tablet -->
  <source media="(min-width:768px)"  srcset="/assets/images/hero/hero.v20251022a.1280.png">
  <!-- Mobile fallback -->
  <img class="hero-img" src="/assets/images/hero/hero.v20251022a.960.png" alt="Page hero">
</picture>
```

> Keep only the **active** version in the snippet (don’t mix old/new).

---

## 5) OG / Twitter Meta

```html
<meta property="og:image" content="https://<domain>/assets/images/og-cover/<site>-og-1200x630.jpg">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://<domain>/assets/images/og-cover/<site>-og-1200x630.jpg">
```

Use **JPG** for smaller payloads unless transparency is required.

---

## 6) CSS Helpers (card image height)

Add to `site.css` if not present:

```css
/* Card image sizing (responsive) */
.card img{
  width:100%;
  height: clamp(180px, 22vw, 240px);  /* tweak as needed */
  object-fit: cover;
  border-radius: 12px;
}
```

---

## 7) Cache Busting & Checks

* Cache-bust CSS:
  `<link rel="stylesheet" href="/assets/css/site.css?v=2025-10-22b">`
* Version file names for images (see convention above).
* Quick 200-OK checks after deploy:

  * `/assets/css/site.css?v=…` → **raw CSS** (not HTML)
  * `/assets/images/hero/hero.vYYYYMMDDa.1920.png`
  * `/assets/images/og-cover/<site>-og-1200x630.jpg`

---

## 8) Cleanup Rules

* Remove any **unreferenced** old hero versions from `/hero/` once switched.
* Keep folders with `.gitkeep` if you want them tracked empty.
* Avoid top-level `/images`; standardize on `/assets/images`.

---

If you want, I can also add a tiny PowerShell snippet to this doc that finds unused assets **inside the repo** only—handy before commits.
