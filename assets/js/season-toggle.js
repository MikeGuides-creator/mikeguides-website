// --- CONFIG: MikeGuides Halloween path convention (flat file) ---
const PATH_MAPPER = {
  HALLOWEEN_BASE: "/assets/images/products/",
  SEASON_VER: "20251023a",      // <— update here if you bump the version
  SIZE_TOKEN: "960x960",        // <— update if you change exported size
  EXT: "jpg",                   // <— update if you switch to webp/png

  // Extract <slug> from common default paths:
  // e.g., /assets/images/products/visual-ai-studio/visual-ai-studio.v*.png
  // or    /assets/images/products/<slug>/<anything>
  // or    /assets/images/products/<slug>.*
  deriveSlug(defaultSrc) {
    // 1) /products/<slug>/<slug>.*   -> slug = group1
    let m = defaultSrc.match(/\/products\/([^/]+)\/\1\./i);
    if (m) return m[1];

    // 2) /products/<slug>/(anything)  -> slug = group1
    m = defaultSrc.match(/\/products\/([^/]+)\//i);
    if (m) return m[1];

    // 3) /products/<slug>.<ext>       -> slug = filename without ext
    m = defaultSrc.match(/\/products\/([^/]+)\.[a-z0-9]+(?:\?|$)/i);
    if (m) return m[1];

    return null;
  },

  // Build: /assets/images/products/card_hallow_<slug>.v<ver>.<size>.<ext>
  deriveFile(defaultSrc) {
    const slug = this.deriveSlug(defaultSrc);
    if (!slug) return null;
    return `card_hallow_${slug}.v${this.SEASON_VER}.${this.SIZE_TOKEN}.${this.EXT}`;
  },

  toHalloween(defaultSrc) {
    const file = this.deriveFile(defaultSrc);
    return file ? this.HALLOWEEN_BASE + file : null;
  }
};
// --- end CONFIG ---
