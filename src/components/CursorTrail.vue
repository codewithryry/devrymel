<template>
  <span v-if="false"></span>
</template>

<script>
// Card glow: a soft light follows the mouse across cards and buttons, like light on glass.
// No custom cursor shape. Desktop (mouse/trackpad) only.
const GLOW_TARGETS = [
  ".info-card",
  ".info-panel",
  ".cta-card",
  ".project-card",
  ".note-card",
  ".contact-item",
  ".service-card",
  ".link-card",
  ".social-card",
  ".stat-card",
  ".achievement-chip",
  ".timeline-card",
  ".nav-contact-btn",
  ".cta-btn",
  ".ghost-btn"
].join(", ");

export default {
  name: "CursorTrail",

  mounted() {
    if (!window.matchMedia("(any-pointer: fine)").matches) return;

    this.enabled = true;
    window.addEventListener("mousemove", this.onMove, { passive: true });
    document.addEventListener("mouseleave", this.clear);
  },

  beforeUnmount() {
    if (!this.enabled) return;
    window.removeEventListener("mousemove", this.onMove);
    document.removeEventListener("mouseleave", this.clear);
    this.clear();
  },

  methods: {
    onMove(e) {
      const el = e.target.closest ? e.target.closest(GLOW_TARGETS) : null;

      if (el !== this.current) {
        this.clear();
        this.current = el;
        if (el) el.classList.add("is-glowing");
      }

      if (!el) return;

      const rect = el.getBoundingClientRect();
      el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    },

    clear() {
      if (this.current) this.current.classList.remove("is-glowing");
      this.current = null;
    }
  }
};
</script>

<!-- Not scoped: the glow is applied to cards across the whole site -->
<style>
.is-glowing {
  position: relative;
}

.is-glowing::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(
    220px circle at var(--glow-x, 50%) var(--glow-y, 50%),
    color-mix(in srgb, var(--text) 7%, transparent),
    transparent 70%
  );
  animation: glow-in 0.25s ease forwards;
}

@keyframes glow-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
