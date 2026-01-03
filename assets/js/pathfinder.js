/* pathfinder.js — lightweight learning-path selector for MikeGuides
   Usage:
   1) Include this file.
   2) Add a form with inputs using data-score values.
   3) Call MGPathfinder.init({...})
*/

(function () {
  const DEFAULTS = {
    storageKey: "mg_pathfinder_v1",
    thresholds: { foundationalMax: 49, acceleratedMax: 79 },
    paths: {
      foundational: {
        id: "foundational_core_modules",
        label: "Foundational",
        difficulty: "basic",
        summary:
          "We’ll start with the core basics and build confidence step-by-step. Nothing overwhelming.",
      },
      accelerated: {
        id: "accelerated_path",
        label: "Accelerated",
        difficulty: "intermediate",
        summary:
          "We’ll skip the obvious stuff and move faster, with optional refreshers if you want them.",
      },
      advanced: {
        id: "advanced_application_path",
        label: "Advanced",
        difficulty: "challenge_problems",
        summary:
          "We’ll focus on real-world application, edge cases, and tougher practice prompts.",
      },
    },
    selectors: {
      form: '[data-mg="path-quiz"]',
      result: '[data-mg="path-result"]',
      resultTitle: '[data-mg="path-title"]',
      resultSummary: '[data-mg="path-summary"]',
      resultMeta: '[data-mg="path-meta"]',
      applyButtons: '[data-mg="apply-path"]', // optional buttons with data-path="foundational|accelerated|advanced"
      gated: '[data-mg-path]', // any element with data-mg-path="foundational|accelerated|advanced"
    },
    onChange: null, // function(state) {}
  };

  function safeParse(json) {
    try { return JSON.parse(json); } catch { return null; }
  }

  function computeScore(form) {
    // supports:
    // - checked radios/checkboxes with data-score="10"
    // - selects with selected option having data-score
    let score = 0;

    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const type = (el.type || "").toLowerCase();

      if (tag === "input" && (type === "radio" || type === "checkbox")) {
        if (!el.checked) return;
        const val = Number(el.getAttribute("data-score") || 0);
        if (!Number.isNaN(val)) score += val;
      } else if (tag === "select") {
        const opt = el.options[el.selectedIndex];
        if (!opt) return;
        const val = Number(opt.getAttribute("data-score") || 0);
        if (!Number.isNaN(val)) score += val;
      } else {
        // ignore other fields for now (keeps it simple)
      }
    });

    return score;
  }

  function pickPath(score, thresholds) {
    if (score <= thresholds.foundationalMax) return "foundational";
    if (score <= thresholds.acceleratedMax) return "accelerated";
    return "advanced";
  }

  function save(storageKey, state) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function load(storageKey) {
    const raw = localStorage.getItem(storageKey);
    return raw ? safeParse(raw) : null;
  }

  function showGatedContent(root, selected) {
    const all = root.querySelectorAll(DEFAULTS.selectors.gated);
    all.forEach((el) => {
      const allowed = (el.getAttribute("data-mg-path") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // If no allowed paths specified, leave it alone.
      if (!allowed.length) return;

      const shouldShow = allowed.includes(selected);
      el.hidden = !shouldShow;
    });

    // Mark selection on <html> for CSS hooks if desired
    document.documentElement.setAttribute("data-mg-selected-path", selected);
  }

  function renderResult(root, cfg, state) {
    const result = root.querySelector(cfg.selectors.result);
    if (!result) return;

    const p = cfg.paths[state.pathKey];
    result.hidden = false;

    const title = result.querySelector(cfg.selectors.resultTitle);
    const summary = result.querySelector(cfg.selectors.resultSummary);
    const meta = result.querySelector(cfg.selectors.resultMeta);

    if (title) title.textContent = `${p.label} Path`;
    if (summary) summary.textContent = p.summary;
    if (meta) meta.textContent = `Score: ${state.score} • Practice: ${p.difficulty}`;

    showGatedContent(root, state.pathKey);
  }

  function init(userCfg) {
    const cfg = {
      ...DEFAULTS,
      ...(userCfg || {}),
      thresholds: { ...DEFAULTS.thresholds, ...(userCfg?.thresholds || {}) },
      paths: { ...DEFAULTS.paths, ...(userCfg?.paths || {}) },
      selectors: { ...DEFAULTS.selectors, ...(userCfg?.selectors || {}) },
    };

    const form = document.querySelector(cfg.selectors.form);
    const root = form ? form.closest("section, main, body") : document.body;

    // Restore
    const existing = load(cfg.storageKey);
    if (existing?.pathKey) {
      renderResult(root, cfg, existing);
      cfg.onChange && cfg.onChange(existing);
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const score = computeScore(form);
        const pathKey = pickPath(score, cfg.thresholds);

        const state = {
          score,
          pathKey,
          pathId: cfg.paths[pathKey].id,
          practiceDifficulty: cfg.paths[pathKey].difficulty,
          savedAt: new Date().toISOString(),
        };

        save(cfg.storageKey, state);
        renderResult(root, cfg, state);
        cfg.onChange && cfg.onChange(state);
      });
    }

    // Optional manual override buttons
    document.querySelectorAll(cfg.selectors.applyButtons).forEach((btn) => {
      btn.addEventListener("click", () => {
        const pathKey = btn.getAttribute("data-path");
        if (!cfg.paths[pathKey]) return;

        const state = {
          score: existing?.score ?? 0,
          pathKey,
          pathId: cfg.paths[pathKey].id,
          practiceDifficulty: cfg.paths[pathKey].difficulty,
          savedAt: new Date().toISOString(),
          manualOverride: true,
        };

        save(cfg.storageKey, state);
        renderResult(root, cfg, state);
        cfg.onChange && cfg.onChange(state);
      });
    });
  }
<button type="button" data-mg="reset-path"
  class="mt-3 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border border-slate-200 hover:bg-slate-50">
  Reset / Choose again
</button>

  window.MGPathfinder = { init };
})();

<script>
  MGPathfinder.init({ storageKey: "mg_bundle_path_v1" });

  // Reset button support
  (function () {
    const key = "mg_bundle_path_v1";
    const btn = document.querySelector('[data-mg="reset-path"]');
    if (!btn) return;

    btn.addEventListener("click", () => {
      localStorage.removeItem(key);
      // Optional: also clear the UI state immediately
      document.documentElement.removeAttribute("data-mg-selected-path");
      document.querySelectorAll('[data-mg-path]').forEach(el => el.hidden = false);
      const result = document.querySelector('[data-mg="path-result"]');
      if (result) result.hidden = true;
      const form = document.querySelector('[data-mg="path-quiz"]');
      if (form) form.reset();
      // Scroll back to the quiz so it feels intentional
      form?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  })();
</script>
