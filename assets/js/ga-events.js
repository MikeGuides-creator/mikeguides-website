(function () {
  function canTrack() {
    return typeof window.gtag === "function";
  }

  function track(el, eventName, params) {
    if (!el) return;

    el.addEventListener("click", function () {

      // 🔍 ADD THIS LINE (temporary debug)
      console.log("GA click detected:", params);

      if (!canTrack()) return;
      try {
        window.gtag("event", eventName, params);
      } catch (e) {}
    });
  }

  track(
    document.getElementById("cta-toolkit-hero"),
    "gumroad_click",
    {
      product: "AI Marketing Toolkit",
      placement: "hero_primary",
      destination: "gumroad"
    }
  );

  track(
    document.getElementById("cta-bundle-hero"),
    "gumroad_click",
    {
      product: "Business Builder Bundle",
      placement: "hero_secondary",
      destination: "gumroad"
    }
  );
})();
