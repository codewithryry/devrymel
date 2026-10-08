<template>
  <!-- Small "i" in the tool header; tap to show the how-to steps -->
  <div class="howto-pop" @click.stop>
    <button
      type="button"
      class="howto-btn"
      :class="{ active: open }"
      :aria-expanded="open"
      :aria-label="open ? 'Hide how to use' : 'How to use'"
      title="How to use"
      @click="open = !open"
    >
      <i class="fas fa-info"></i>
    </button>

    <transition name="howto-fade">
      <div v-if="open" class="howto-panel" :class="`align-${align}`" role="dialog" aria-label="How to use">
        <span class="howto-title">{{ title }}</span>
        <ol class="howto-list">
          <li v-for="(step, index) in steps" :key="index">
            <span class="howto-num">{{ index + 1 }}</span>
            <span>{{ step }}</span>
          </li>
        </ol>
        <p v-if="note" class="howto-note">
          <i class="fas fa-shield-alt"></i>
          {{ note }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ToolHowTo",

  props: {
    steps: { type: Array, required: true },
    note: { type: String, default: "" },
    title: { type: String, default: "How to use" },
    // "right": panel opens under the button, right edges lined up; "center": centered under it
    align: { type: String, default: "right" }
  },

  data() {
    return {
      open: false
    };
  },

  mounted() {
    document.addEventListener("click", this.close);
    document.addEventListener("keydown", this.onKeydown);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.close);
    document.removeEventListener("keydown", this.onKeydown);
  },

  methods: {
    close() {
      this.open = false;
    },

    onKeydown(e) {
      if (e.key === "Escape") this.open = false;
    }
  }
};
</script>

<style scoped>
/* Sits at the right end of the .tool-hero row */
.howto-pop {
  position: relative;
  flex-shrink: 0;
  align-self: flex-start;
  margin-left: auto;
}

.howto-btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.7rem;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.howto-btn:hover,
.howto-btn.active {
  border-color: var(--text-muted);
  color: var(--text);
}

.howto-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 30;
  width: min(300px, calc(100vw - 40px));
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
  box-shadow: var(--shadow-xl, var(--shadow));
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: normal;
  text-align: left;
}

/* Notch pointing at the "i" */
.howto-panel::before {
  content: "";
  position: absolute;
  top: -6px;
  right: 9px;
  width: 10px;
  height: 10px;
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
  background: var(--surface);
  transform: rotate(45deg);
}

.howto-title {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.howto-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.howto-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.45;
}

.howto-num {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--text);
  font-size: 0.66rem;
  font-weight: 700;
}

.howto-note {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin: 0.7rem 0 0;
  padding-top: 0.6rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.72rem;
  line-height: 1.4;
}

.howto-note i {
  margin-top: 0.15rem;
  font-size: 0.65rem;
}

/* Centered variant (e.g. "i" next to a centered heading) */
.howto-panel.align-center {
  right: auto;
  left: 50%;
  width: min(280px, calc(100vw - 40px));
  transform: translateX(-50%);
}

/* Keep it centered while fading in/out */
.howto-panel.align-center.howto-fade-enter-from,
.howto-panel.align-center.howto-fade-leave-to {
  transform: translateX(-50%);
}

.howto-panel.align-center::before {
  right: auto;
  left: calc(50% - 5px);
}

.howto-fade-enter-active,
.howto-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.howto-fade-enter-from,
.howto-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
