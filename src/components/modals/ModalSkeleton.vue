<template>
  <!-- Placeholder rows shown while a popup list loads; same size as the real rows -->
  <div class="skeleton-list" aria-busy="true" aria-label="Loading">
    <div v-for="n in count" :key="n" class="skeleton-row">
      <span class="skeleton-block skeleton-icon"></span>
      <span class="skeleton-text">
        <span class="skeleton-block skeleton-line" :style="{ width: titleWidths[(n - 1) % titleWidths.length] }"></span>
        <span v-if="meta" class="skeleton-block skeleton-line skeleton-meta"></span>
      </span>
      <i class="fas fa-chevron-right skeleton-chevron"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalSkeleton',
  props: {
    count: {
      type: Number,
      default: 5
    },
    // Second, shorter line (e.g. certificate category, GWA)
    meta: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      titleWidths: ['70%', '55%', '80%', '60%', '75%']
    };
  }
}
</script>

<style scoped>
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.skeleton-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 54px;
  padding: 0.75rem 0.9rem;
  border-radius: 14px;
}

.skeleton-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.skeleton-block {
  display: block;
  background: color-mix(in srgb, var(--text) 9%, transparent);
  animation: skeleton-pulse 1.4s ease-in-out infinite;
}

.skeleton-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 9px;
}

.skeleton-line {
  height: 10px;
  border-radius: 999px;
}

.skeleton-meta {
  width: 35%;
  height: 8px;
}

.skeleton-chevron {
  color: var(--text-muted);
  font-size: 0.7rem;
  opacity: 0.4;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-block {
    animation: none;
  }
}
</style>
