/*! season-toggle.js — minimal, dashless Halloween filename helper */
(function (root, factory) {
  root.SeasonToggle = factory();
})(window, function () {
  'use strict';

  // Adjust if your paths or naming change later
  var HALLOWEEN_BASE = '/assets/images/products/';
  var SEASON_VER     = '20251023a';
  var SIZE_TOKEN     = '960x960';
  var EXT            = 'jpg';

  // Extracts slug from a default card path
  // e.g. "/assets/images/products/card_ai-marketing-toolkit.v20251026a.960x960.jpg"
  //   -> "ai-marketing-toolkit"
  function deriveSlug(defaultSrc) {
    if (!defaultSrc) return null;
    try {
      var filename = defaultSrc.split('/').pop();             // "card_ai-marketing-toolkit.v2025....jpg"
      var base = filename.split('.')[0];                      // "card_ai-marketing-toolkit"
      var slug = base.replace(/^card_/, '');                  // "ai-marketing-toolkit"
      return slug || null;
    } catch (e) { return null; }
  }

  // "ai-marketing-toolkit" -> "aimarketingtoolkit"
  function toCompact(s) { return s ? s.toLowerCase().replace(/-/g, '') : s; }

  // Build the seasonal filename you’re using:
  // "card_hallow_<slugNoDashes>.v<SEASON_VER>.<SIZE_TOKEN>.<EXT>"
  function deriveFile(defaultSrc) {
    var slug = deriveSlug(defaultSrc);
    if (!slug) return null;
    var compact = toCompact(slug);
    return 'card_hallow_' + compact + '.v' + SEASON_VER + '.' + SIZE_TOKEN + '.' + EXT;
  }

  // Full URL to seasonal card or null
  function toHalloween(defaultSrc) {
    var file = deriveFile(defaultSrc);
    return file ? HALLOWEEN_BASE + file : null;
  }

  return {
    HALLOWEEN_BASE: HALLOWEEN_BASE,
    SEASON_VER:     SEASON_VER,
    SIZE_TOKEN:     SIZE_TOKEN,
    EXT:            EXT,
    deriveSlug:     deriveSlug,
    deriveFile:     deriveFile,
    toHalloween:    toHalloween
  };
});
