export function detectAdBlocker() {
  return new Promise((resolve) => {
    try {
      const bait = document.createElement("div");

      bait.className = "adsbygoogle";
      bait.setAttribute("aria-hidden", "true");

      bait.style.cssText = `
        position: fixed;
        left: -10000px;
        top: -10000px;
        width: 300px;
        height: 250px;
        pointer-events: none;
        opacity: 1;
        visibility: visible;
        display: block;
      `;

      document.body.appendChild(bait);

      setTimeout(() => {
        const style = window.getComputedStyle(bait);

        const isBlocked =
          bait.offsetHeight === 0 ||
          bait.offsetWidth === 0 ||
          style.display === "none" ||
          style.visibility === "hidden";

        bait.remove();

        resolve(isBlocked ? "Detected" : "Not detected");
      }, 500);
    } catch (error) {
      console.warn("Ad blocker detection unavailable:", error);
      resolve("Unavailable");
    }
  });
}