/* /assets/js/prices.js */
(function () {
  // Map your product slugs to prices
  const PRICES = {
    "visual-ai-studio": 19.95,
    "chatgpt-mastery-simulator": 19.95,
    "ai-marketing-toolkit": 19.95,
    "ai-writing-workshop": 19.95,
    "ai-business-automation-roi": 19.95,
    "business-builder-bundle": 79.95,
    "pricing-for-profit-system": 54.95,
  };

  const CURRENCY = "USD";
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: CURRENCY });

  function applyPrices() {
    document.querySelectorAll("[data-price]").forEach((el) => {
      const slug = el.getAttribute("data-price");
      if (slug in PRICES) el.textContent = fmt.format(PRICES[slug]);
    });
  }

  // Run after DOM is ready (works even if the script loads early)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyPrices);
  } else {
    applyPrices();
  }
})();
