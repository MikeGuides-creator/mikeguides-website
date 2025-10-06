window.MG_PRICES = {
  currency: "USD",
  products: {
    "visual-ai-studio": "19.95",
    "ai-marketing-toolkit": "19.95",
    "ai-writing-workshop": "19.95",
    "ai-business-automation-roi": "19.95",
    "business-builder-bundle": "79.95",
    "chatgpt-mastery-simulator": "19.95",
    "pricing-for-profit-system": "54.95"
  }
};
(function () {
  var p = (window.MG_PRICES && window.MG_PRICES.products) || {};
  document.querySelectorAll("[data-price]").forEach(function (el) {
    var slug = el.getAttribute("data-price");
    if (p[slug]) el.textContent = "$" + p[slug];
  });
})();
