[README.md](https://github.com/user-attachments/files/22141469/README.md)
# MikeGuides —  Lean Package  (v2)

**Build date:** 2025-09-04

This bundle  keeps it tiny to avoid timeouts:
- `index.html` —  homepage (Etsy removed, Gumroad wired, comfy max‑width & gutters)
- `toolkit/index.html` — Toolkit UI
- `toolkit/toolkit.js` — Toolkit logic (offline keyword + draft generator)

## Configure Gumroad
Open `index.html` and replace the placeholder URLs in the `GUMROAD` object.

## Deploy
Drag  this folder to Netlify or upload to GitHub Pages. Toolkit lives at `/toolkit/`.
<!-- deploy bump: 2025-09-05 --></>

Awesome — here’s a **ready-to-paste README section** you can drop into your repo’s `README.md`. It captures the SSL/cache fix, daily checks, DNS reference, and a couple of quick guardrails for prices/images/redirects.

---

# Operations Runbook — Netlify + Cloudflare (SSL, Cache, DNS)

**Sites:**

* `mikeguides.co` (`www.mikeguides.co`) → Netlify: `mikeguides-website.netlify.app`
* `pricingforprofit.co` (`www.pricingforprofit.co`) → Netlify: `<your P4P netlify subdomain>.netlify.app`

## 1) Cache/SSL Fire Drill (when things look broken)

**Symptom:** custom domain shows `ERR_SSL_PROTOCOL_ERROR`, old images, or 404s — but the `*.netlify.app` site works.

**Fix (90 seconds):**

1. **Cloudflare → Caching**

   * **Purge Everything**
   * Turn **Development Mode ON** while editing
2. **Netlify → Site → Domain management → HTTPS/TLS**

   * Click **Renew certificate** (or **Provision**) once if available
3. **Browser**

   * Hard refresh (**Cmd+Shift+R** / **Ctrl+Shift+R**) or use **Incognito**
4. **Sanity**

   * If `https://<yoursite>.netlify.app/` works, it’s cache/SSL/DNS — not your code

> Turn **Development Mode OFF** when done so Cloudflare resumes caching.

---

## 2) Correct DNS (Cloudflare) — keep this state

**Apex (root) `@`:**

```
A  @  75.2.60.5        DNS only (gray)
A  @  99.83.190.102    DNS only (gray)
```

**WWW:**

```
CNAME  www  <your-site>.netlify.app   DNS only (gray)
```

**Remove/Avoid:**

* Any old GitHub Pages IPs: `185.199.*`
* Any `A/AAAA` for `www` (www must be **CNAME** only)
* Any stray **AAAA** (IPv6) records at `@` or `www`
* Extra **NS** records inside the zone pointing to your registrar

---

## 3) Netlify Domains & HTTPS (each site)

1. **Add both hostnames:** `example.com` and `www.example.com` (Production domains)
2. **Set Primary domain:** apex (no `www`); enable “redirect other domains to primary”
3. **HTTPS/TLS:** Let’s Encrypt should be **Active** (Provision/Renew if not)

---

## 4) Daily Quick-Check (30–60 sec)

* Open:

  * `https://mikeguides.co/` and `https://www.mikeguides.co/`
  * `https://pricingforprofit.co/` and `https://www.pricingforprofit.co/`
* If anything errors → run the **Fire Drill** (Section 1)
* Optional asset spot-check (should load):
  `/assets/images/products/visual-ai-studio/visual-ai-studio.jpg`

---

## 5) Product Pages & Images — conventions

**URLs (no filename shown):**

```
/products/<slug>/              ← serves products/<slug>/index.html
```

**Images per product:**

```
/assets/images/products/<slug>/<slug>.jpg                ← cover
/assets/images/products/<slug>/<slug>-og-1200x630.png    ← OG (PNG OK)
```

**Inside each product page (`products/<slug>/index.html`):**

```html
<img src="/assets/images/products/<slug>/<slug>.jpg" alt="">
<meta property="og:image" content="/assets/images/products/<slug>/<slug>-og-1200x630.png?v=2">
<script src="/assets/js/prices.js"></script>
<div class="price"><span data-price="<slug>"></span></div>
```

---

## 6) Prices — single source of truth

`assets/js/prices.js`:

```html
<script>
  const PRICES = {
    "visual-ai-studio": "19.95",
    "ai-marketing-toolkit": "19.95",
    "ai-writing-workshop": "19.95",
    "ai-business-automation-roi": "19.95",
    "business-builder-bundle": "79.95",
    "pricing-for-profit-system": "54.95",
  };
  const CURRENCY = "USD";
  document.querySelectorAll("[data-price]").forEach(el => {
    const slug = el.getAttribute("data-price");
    if (PRICES[slug]) el.textContent = `$${PRICES[slug]} ${CURRENCY}`;
  });
</script>
```

**Do not** hard-code “$100 off”, “was $”, `% off`, etc., in pages.
If you find old prices in HTML, replace with `<span data-price="slug"></span>`.

---

## 7) Redirects cheat-sheet (`_redirects` at repo root)

**Old folders → new product slugs:**

```
/Visual%20AI%20Studio/*               /products/visual-ai-studio/:splat            301!
/visual%20ai%20studio/*               /products/visual-ai-studio/:splat            301!
/EnhancedChatGPT_Simulator/*          /products/chatgpt-mastery-simulator/:splat   301!
/enhancedChatGPT%20simulator/*        /products/chatgpt-mastery-simulator/:splat   301!
/Enhanced_ai_business_automation/*    /products/ai-business-automation-roi/:splat  301!
/program/ai-business-automation-roi/* /products/ai-business-automation-roi/:splat  301!
/program/ai-business-automation/*     /products/ai-business-automation-roi/:splat  301!
/ai-writing-workshop.html             /products/ai-writing-workshop/               301!
/5HTML_v52_ai-writing-workshop-finished_product_jmk.html /products/ai-writing-workshop/ 301!
/bundle/*                             /products/business-builder-bundle/:splat     301!
/toolkit/*                            /products/ai-marketing-toolkit/:splat        301!
/products.html                        /products/                                    301!
/store/*                              /products/:splat                              301!
/store                                /products/                                    301!
```

**Short “buy” links (Gumroad):**

```
/buy/business-builder-bundle  https://mikeguides8.gumroad.com/l/business_bundle_builder?utm_source=site  301!
/buy/ai-writing               https://mikeguides8.gumroad.com/l/AI_Writing_Workshop?utm_source=site      301!
/buy/writing-workshop         https://mikeguides8.gumroad.com/l/AI_Writing_Workshop?utm_source=site      301!
/buy/pricing-for-profit       https://mikeguides8.gumroad.com/l/PRICING_FOR_PROFIT?utm_source=site       301!
```

> Keep specific rules **above** generic ones. One rule per line, no quotes.

---

## 8) Troubleshooting map

| Symptom                                                         | Likely Cause                       | Action                                                                                       |
| --------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `ERR_SSL_PROTOCOL_ERROR` on custom domain; Netlify subdomain OK | Cached/invalid cert or wrong proxy | Cloudflare **Purge Everything**, Dev Mode ON; Netlify **Renew certificate**; ensure DNS-only |
| Custom domain says “Check DNS config” in Netlify                | DNS not pointing to Netlify        | Use A `@` → `75.2.60.5`, `99.83.190.102`; CNAME `www` → `*.netlify.app`; DNS-only            |
| `www` works but apex doesn’t (or vice-versa)                    | Missing host or wrong primary      | Add both hostnames in Netlify; set apex as Primary                                           |
| Random 404s on assets                                           | Cache or wrong path                | Purge; verify file exists at exact path; hard refresh                                        |
| Redirect loops                                                  | Apex CNAME or multiple redirects   | Keep apex as A records only; one Primary in Netlify                                          |

---

**Rule of thumb:**
If `*.netlify.app` works but your domain doesn’t, it’s almost always **cache or SSL**. Run the Fire Drill (Section 1).
