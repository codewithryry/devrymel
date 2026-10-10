<template>
  <!-- Phones: secondary content folds behind a "Show more" button. Desktop: always shown. -->
  <div class="m-more">
    <div v-show="open || !isPhone" class="m-more-body">
      <slot />
    </div>
    <button
      v-if="isPhone"
      type="button"
      class="m-more-btn"
      :aria-expanded="open"
      @click="open = !open"
    >
      {{ open ? lessLabel : label }}
      <i class="fas fa-chevron-down" :class="{ flipped: open }"></i>
    </button>
  </div>
</template>

<script>
const PHONE = "(max-width: 560px)";

export default {
  name: "MobileMore",
  props: {
    label: {
      type: String,
      default: "Show more"
    },
    lessLabel: {
      type: String,
      default: "Show less"
    }
  },
  data() {
    return {
      open: false,
      isPhone: false
    };
  },
  mounted() {
    this.mq = window.matchMedia(PHONE);
    this.isPhone = this.mq.matches;
    this.onChange = (e) => (this.isPhone = e.matches);
    this.mq.addEventListener("change", this.onChange);
  },
  beforeUnmount() {
    this.mq.removeEventListener("change", this.onChange);
  }
};
</script>

<style scoped>
.m-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}

.m-more-btn i {
  font-size: 0.7rem;
  transition: transform 0.2s ease;
}

.m-more-btn i.flipped {
  transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .m-more-btn i {
    transition: none;
  }
}
</style>
