// v-mobile-slides: on phones, turns a grid/list into a horizontal swipe slider
// (CSS scroll-snap in info-pages.css) and adds progress dots under it.
// Desktop keeps the original layout; the dots are hidden there by CSS.
function update(el) {
  const state = el._mobileSlides;
  const items = el.children;
  const count = items.length;
  if (state.count !== count) {
    state.count = count;
    state.dots.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Slide ${i + 1} of ${count}`);
      dot.addEventListener("click", () => {
        const item = el.children[i];
        if (item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: "smooth" });
      });
      state.dots.appendChild(dot);
    }
  }
  const step = items[1] ? items[1].offsetLeft - items[0].offsetLeft : el.clientWidth;
  const index = step > 0 ? Math.round(el.scrollLeft / step) : 0;
  [...state.dots.children].forEach((dot, i) => dot.classList.toggle("on", i === index));
}

export default {
  mounted(el) {
    el.classList.add("m-slides");
    const dots = document.createElement("div");
    dots.className = "m-slide-dots";
    el.after(dots);

    const state = { dots, count: -1, frame: 0 };
    state.onScroll = () => {
      cancelAnimationFrame(state.frame);
      state.frame = requestAnimationFrame(() => update(el));
    };
    el._mobileSlides = state;
    el.addEventListener("scroll", state.onScroll, { passive: true });
    update(el);
  },
  updated(el) {
    if (el._mobileSlides) update(el);
  },
  unmounted(el) {
    const state = el._mobileSlides;
    if (!state) return;
    el.removeEventListener("scroll", state.onScroll);
    cancelAnimationFrame(state.frame);
    state.dots.remove();
  }
};
