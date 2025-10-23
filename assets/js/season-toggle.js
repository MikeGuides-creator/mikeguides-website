/* MikeGuides Season Toggle v1.0 (2025-10-23)
   Features:
   - Toggles between "default" and "halloween"
   - Swaps src/srcset for [data-seasonal] and [data-seasonal-picture]
   - Applies .theme-halloween class (optional orange theme)
   - Remembers choice in localStorage
   - Auto-activates Halloween during Oct unless overridden by user or ?season=
*/

(function () {
  const STORAGE_KEY = "mg-season";
  const SEASONS = { DEFAULT: "default", HALLOWEEN: "halloween" };

  // --- Helpers ---
  const $ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const getParam = (name) => new URLSearchParams(window.location.search).get(name);

  function currentMonthIsOctober() {
    const now = new Date();
    return now.getMonth() === 9; // 0=Jan, 9=Oct
  }

  function applyThemeClass(season) {
    const root = document.documentElement;
    root.classList.toggle("theme-halloween", season === SEASONS.HALLOWEEN);
    root.setAttribute("data-season", season);
  }

  function swapImage(img, season) {
    const defSrc = img.getAttribute("data-src-default");
    const hlwSrc = img.getAttribute("data-src-halloween");
    if (!defSrc || !hlwSrc) return;

    const next = season === SEASONS.HALLOWEEN ? hlwSrc : defSrc;
    if (img.src !== next) img.src = next;
  }

  function swapPicture(picture, season) {
    // Handle <source> srcset swaps
    $("source", picture).forEach((source) => {
      const defSet = source.getAttribute("data-srcset-default");
      const hlwSet = source.getAttribute("data-srcset-halloween");
      if (!defSet && !hlwSet) return;
      const next = season === SEASONS.HALLOWEEN ? (hlwSet || defSet) : (defSet || hlwSet);
      if (next) source.srcset = next;
    });

    // Ensure <img> child is swapped too if it has data attributes
    const img = picture.querySelector("img[data-seasonal]");
    if (img) swapImage(img, season);
  }

  function applySeason(season) {
    applyThemeClass(season);
    $("[data-seasonal]").forEach((img) => swapImage(img, season));
    $("[data-seasonal-picture]").forEach((pic) => swapPicture(pic, season));
    // Accessibility: reflect state on toggle button if present
    const btn = document.getElementById("seasonToggle");
    if (btn) btn.setAttribute("aria-pressed", season === SEASONS.HALLOWEEN ? "true" : "false");
  }

  function setSeason(season, persist = true) {
    if (season !== SEASONS.HALLOWEEN && season !== SEASONS.DEFAULT) season = SEASONS.DEFAULT;
    applySeason(season);
    if (persist) localStorage.setItem(STORAGE_KEY, season);
  }

  // --- Initialization order: URL param > localStorage > October default ---
  document.addEventListener("DOMContentLoaded", () => {
    let season = null;

    const p = getParam("season"); // e.g., ?season=halloween or ?season=default
    if (p) {
      season = (p.toLowerCase() === "halloween") ? SEASONS.HALLOWEEN : SEASONS.DEFAULT;
    } else {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === SEASONS.HALLOWEEN || saved === SEASONS.DEFAULT) {
        season = saved;
      } else {
        season = currentMonthIsOctober() ? SEASONS.HALLOWEEN : SEASONS.DEFAULT;
      }
    }
    setSeason(season, /*persist*/ false);

    // Hook up toggle button if present
    const btn = document.getElementById("seasonToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const next = (document.documentElement.getAttribute("data-season") === SEASONS.HALLOWEEN)
          ? SEASONS.DEFAULT
          : SEASONS.HALLOWEEN;
        setSeason(next, true);
      });
    }

    // Optional: preflight check in console to spot missing files
    const missing = [];
    $("[data-seasonal]").forEach((img) => {
      ["data-src-default", "data-src-halloween"].forEach((a) => {
        if (!img.getAttribute(a)) missing.push({ el: img, attr: a });
      });
    });
    if (missing.length) {
      console.warn("[SeasonToggle] Missing data attributes:", missing);
    }
  });
})();
