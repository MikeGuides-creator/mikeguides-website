<!-- assets/js/prices.js -->
<script>
  const PRICES = {
    "visual-ai-studio": "19.95",
  "chatgpt-mastery-simulator": "19.95",
    "ai-marketing-toolkit": "19.95",
    "ai-writing-workshop": "19.95",
    "ai-business-automation-roi": "19.95",
    "business-builder-bundle": "79.95",
    "pricing-for-profit-system": "54.95",
  };
  const CURRENCY = "USD";

  document.querySelectorAll("[data-price]").forEach(el => {
    const slug = el.getAttribute("data-price");
    if (PRICES[slug]) {
      el.textContent = `$${PRICES[slug]} ${CURRENCY}`;
    }
  });
</script>

