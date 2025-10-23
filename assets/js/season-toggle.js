/* MikeGuides Season Toggle v1.1 (2025-10-23)
   - Toggles between "default" and "halloween"
   - Swaps src/srcset for [data-seasonal] and [data-seasonal-picture]
   - Applies .theme-halloween class (optional orange theme)
   - Remembers user choice (localStorage)
   - Honors ?season=halloween|default
   - Auto-defaults to Halloween in October
*/

(function () {
  const STORAGE_KEY = "mg-season";
  const SEASONS = { DEFAULT: "default", HALLOWEEN: "halloween" };

  // --- CONFIG: MikeGuides Halloween path convention (flat file) ---
  const PATH_MAPPER = {
    HALLOWEEN_BASE: "/assets/images/products/",
    SEASON_VER: "20251023a",   // update when you export a new batch
    SIZE_TOKEN: "960x960",
    EXT: "jpg",

    deriveSlug(defaultSrc) {
      // 1) /products/<slug>/<slug>.*   -> slug
      let m = defaultSrc.match(/\/products\/([^/]+)\/\1\./i);
      if (m) return m[1];
      // 2) /products/<slug>/(anything) -> slug
      m = defaultSrc.match(/\/products\/([^/]+)\//i);
      if (m) return m[1];
      // 3) /products/<slug>.<ext>      -> slug
      m = defaultSrc.match(/\/products\/([^/]+)\.[a-z0-9]+(?:\?|$)/i);
      if (m) return m[1];
      return null;
    },

    deriveFile(defaultSrc) {
      const slug = this.deriveSlug(defaultSrc);
      if (!slug) return null;
      // card_hallow_<slug>.v<ver>.<size>.<ext>
      return `card_hallow_${slug}.v${this.SEASON_VER}.${this.SIZE_TOKEN}.${this.EXT}`;
    },

    toHalloween(defaultSrc) {
      const file = this.deriveFile(defaultSrc);
      return file ? this.HALLOWEEN_BASE + file : null;
    }
  };
  // --- end CONFIG ---

  // Utilities
  const $ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const getParam = (name) => new URLSearchParams(window.location.search).get(name) || "";

  function applyThemeClass(season) {
    const root = document.documentElement;
    root.classList.toggle("theme-halloween", season === SEASONS.HALLOWEEN);
    root.setAttribute("data-season", season);
  }

  function computedHalloweenSrc(img) {
    const explicit = img.getAttribute("data-src-halloween");
    if (explicit) return explicit;
    const def = img.getAttribute("data-src-default") || img.getAttribute("src") || "";
    return PATH_MAPPER.toHalloween(def);
  }

  function swapImage(img, season) {
    const defSrc = img.getAttribute("data-src-default") || img.getAttribute("src");
    const hlwSrc = computedHalloweenSrc(img);
    const next = (season === SEASONS.HALLOWEEN && hlwSrc) ? hlwSrc : defSrc;
    if (next && img.src !== next) img.src = next;
  }

  function computedHalloweenSrcset(source) {
    const explicit = source.getAttribute("data-srcset-halloween");
    if (explicit) return explicit;
    const defSet = source.getAttribute("data-srcset-default") || source.getAttribute("srcset");
    if (!defSet) return null;
    // Map each URL in the srcset
    const parts = defSet.split(",").map(s => s.trim()).filter(Boolean);
    const mapped = parts.map(entry => {
      const [url, size] = entry.split(/\s+/);
      const derived = PATH_MAPPER.toHalloween(url);
      return derived ? `${derived}${size ? " " + size : ""}` : null;
    }).filter(Boolean);
    return mapped.length ? mapped.join(", ") : null;
  }

  function swapPicture(picture, season) {
    // Swap <source> elements
    $("source", picture).forEach((source) => {
      const defSet = source.getAttribute("data-srcset-default") || source.getAttribute("srcset");
      const hlwSet = computedHalloweenSrcset(source);
      const next = (season === SEASONS.HALLOWEEN && hlwSet) ? hlwSet : defSet;
      if (next) source.srcset = next;
    });
    // Ensure the <img> swaps too
    const img = picture.querySelector("img[data-seasonal]") || picture.querySelector("img");
    if (img) swapImage(img, season);
  }

  function applySeason(season) {
    applyThemeClass(season);
    $("[data-seasonal]").forEach((img) => swapImage(img, season));
    $("[data-seasonal-picture]").forEach((pic) => swapPicture(pic, season));
    const btn = document.getElementById("seasonToggle");
    if (btn) btn.setAttribute("aria-pressed", season === SEASONS.HALLOWEEN ? "true" : "false");
  }

  function setSeason(season, persist = true) {
    season = (season === SEASONS.HALLOWEEN) ? SEASONS.HALLOWEEN : SEASONS.DEFAULT;
    applySeason(season);
    if (persist) localStorage.setItem(STORAGE_KEY, season);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const p = getParam("season").toLowerCase();
    const saved = localStorage.getItem(STORAGE_KEY);
    const isOctober = (new Date().getMonth() === 9);

    const season =
      p === "halloween" ? SEASONS.HALLOWEEN :
      p === "default"   ? SEASONS.DEFAULT   :
      (saved === SEASONS.HALLOWEEN || saved === SEASONS.DEFAULT) ? saved :
      (isOctober ? SEASONS.HALLOWEEN : SEASONS.DEFAULT);

    setSeason(season, false);

    const btn = document.getElementById("seasonToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const next = (document.documentElement.getAttribute("data-season") === SEASONS.HALLOWEEN)
          ? SEASONS.DEFAULT : SEASONS.HALLOWEEN;
        setSeason(next, true);
      });
    }

    // Dev aid: warn if a seasonal path can't be derived and no explicit override is set
    const undecided = [];
    $("[data-seasonal]").forEach((img) => {
      if (!img.getAttribute("data-src-halloween")) {
        const derived = computedHalloweenSrc(img);
        if (!derived) undecided.push(img.getAttribute("src") || img.getAttribute("data-src-default") || "(unknown)"));
      }
    });
    if (undecided.length) console.warn("[SeasonToggle] Could not derive Halloween paths for:", undecided);
  });
})();
