export function detectAdBlocker() {
  return new Promise((resolve) => {
    let resolved = false;

    const finish = (value) => {
      if (resolved) return;
      resolved = true;

      cleanup();
      resolve(value);
    };

    const bait = document.createElement("div");
    const script = document.createElement("script");

    const cleanup = () => {
      if (bait && bait.parentNode) {
        bait.parentNode.removeChild(bait);
      }

      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    const checkBait = () => {
      if (!bait) return false;

      const style = window.getComputedStyle(bait);

      return (
        bait.offsetHeight === 0 ||
        bait.offsetWidth === 0 ||
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.opacity === "0"
      );
    };

    bait.className =
      "adsbox ad-banner ad-placement ad-unit google-ad adsbygoogle ad ads ad-container sponsor-ad sponsored ad-wrapper advertisement";

    bait.setAttribute("aria-hidden", "true");
    bait.style.cssText = `
      position: absolute !important;
      left: -99999px !important;
      top: -99999px !important;
      width: 300px !important;
      height: 250px !important;
      pointer-events: none !important;
      opacity: 1 !important;
      visibility: visible !important;
      display: block !important;
    `;

    document.body.appendChild(bait);

    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

    script.onload = () => {
      setTimeout(() => {
        finish(checkBait());
      }, 300);
    };

    script.onerror = () => {
      finish(true);
    };

    document.head.appendChild(script);

    setTimeout(() => {
      finish(checkBait());
    }, 1200);
  });
}