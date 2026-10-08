<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <transition name="fade">
    <div class="modal-overlay" :class="{ 'is-popover': anchor }" @click="$emit('close')">
      <div class="modal image-viewer-modal" :style="popoverStyle" @click.stop>
        <button class="modal-close" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <div class="viewer-layout">
          <div class="viewer-image-container">
            <img :src="currentItem.image"
                 :alt="currentItem.title"
                 class="viewer-image" />

            <div class="image-actions">
              <a :href="currentItem.image"
                 target="_blank"
                 class="image-action-btn"
                 title="View Full Size">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <a :href="currentItem.image"
                 download
                 class="image-action-btn"
                 title="Download Image">
                <i class="fas fa-download"></i>
              </a>
            </div>
          </div>

          <div class="viewer-side">
            <div class="viewer-header">
              <h3 class="viewer-title">
                {{ currentItem.title }}
              </h3>
              <p v-if="!anchor" class="viewer-description">{{ currentItem.description }}</p>
            </div>

            <div class="viewer-details">
              <div class="detail-col">
                <i class="fas fa-user-graduate"></i>
                <div>
                  <span class="detail-label">Year Level</span>
                  <span class="detail-value">{{ currentItem.details[2].split(':')[1].trim() }}</span>
                </div>
              </div>
              <div class="detail-col">
                <i class="fas fa-chart-bar"></i>
                <div>
                  <span class="detail-label">GWA</span>
                  <span class="detail-value">{{ currentItem.details[0].split(':')[1].trim() }}</span>
                </div>
              </div>
            </div>

            <!-- Popover: a 320×50 ad fits the free space under the details -->
            <AdSlot v-if="anchor" class="viewer-ad" type="mobile-banner" />

            <div class="viewer-navigation">
              <button @click="$emit('prev')" class="nav-btn" :disabled="currentIndex === 0">
                <i class="fas fa-chevron-left"></i>
                Previous
              </button>
              <span class="nav-counter">
                {{ currentIndex + 1 }} / {{ totalItems }}
              </span>
              <button @click="$emit('next')" class="nav-btn"
                      :disabled="currentIndex === totalItems - 1">
                Next
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AdSlot from '@/components/AdSlot.vue'

export default {
  name: 'DeansListModal',
  components: { AdSlot },
  props: {
    currentItem: {
      type: Object,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    // { top, left, width } of the area to sit over (desktop popover); null = centered modal
    anchor: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'prev', 'next'],
  computed: {
    popoverStyle() {
      if (!this.anchor) return null
      const top = Math.max(16, Math.min(this.anchor.top, window.innerHeight - 340))
      return {
        top: `${top}px`,
        // Reach left to the column divider, keep the right edge in place
        left: `${this.anchor.left - 24}px`,
        width: `${this.anchor.width + 24}px`,
        maxHeight: `calc(100vh - ${top + 16}px)`
      }
    }
  },
  mounted() {
    // A popover is pinned to where it opened, so close it when the page scrolls
    if (this.anchor) window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Soft dim, above the navbar */
  background: rgb(15 15 15 / 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  padding: 1rem;
}

.modal {
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius);
  text-align: center;
  max-width: 400px;
  width: 90%;
  border: 1px solid var(--border);
  position: relative;
}

.image-viewer-modal {
  /* Same width as the page content / navbar */
  max-width: var(--container-width);
  width: min(var(--container-width), calc(100vw - 32px));
  max-height: 85vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: var(--shadow-xl);
  text-align: left;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.viewer-layout {
  display: flex;
  gap: 1.75rem;
  align-items: stretch;
}

.viewer-side {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.viewer-header {
  margin-bottom: 1.25rem;
}


.viewer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 0.8rem 0;
  line-height: 1.3;
}

.viewer-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0;
}

.viewer-image-container {
  position: relative;
  flex: 0 0 300px;
  background: var(--surface-soft);
  border-radius: var(--radius);
  padding: 1rem;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewer-image {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: var(--radius-sm);
  display: block;
}

.image-actions {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: flex;
  gap: 0.4rem;
}

.image-action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.image-action-btn:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.viewer-details {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.detail-col {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: var(--surface-soft);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.detail-col i {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.detail-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.detail-value {
  display: block;
  color: var(--text);
  font-weight: 600;
  font-size: 0.95rem;
}

.viewer-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.nav-btn:hover:not(:disabled) {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-counter {
  flex-shrink: 0;
  padding: 0 1rem;
  font-weight: 600;
  color: var(--text);
  font-size: 0.95rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  font-size: 1rem;
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease;
}

.modal-close:active {
  background: var(--accent);
  color: var(--bg);
}

/* Desktop popover: no dim, compact card over the Get in Touch area */
.modal-overlay.is-popover {
  background: transparent;
  padding: 0;
}

.is-popover .image-viewer-modal {
  position: fixed;
  max-width: none;
  padding: 1rem;
  border-radius: var(--radius);
}

.is-popover .viewer-layout {
  gap: 1rem;
}

.is-popover .viewer-image-container {
  flex: 0 0 190px;
  padding: 0.5rem;
}

.is-popover .image-action-btn {
  width: 28px;
  height: 28px;
  font-size: 0.72rem;
}

.is-popover .viewer-header {
  margin-bottom: 0.75rem;
  padding-right: 2.25rem;
}

.is-popover .viewer-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.05rem;
  margin-bottom: 0;
}

.is-popover .viewer-description {
  font-size: 0.82rem;
}

.is-popover .viewer-details {
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.is-popover .detail-col {
  gap: 0.6rem;
  padding: 0.55rem;
}

.is-popover .detail-col i {
  width: 28px;
  height: 28px;
  font-size: 0.8rem;
}

.is-popover .detail-label {
  font-size: 0.7rem;
}

.is-popover .detail-value {
  font-size: 0.85rem;
}

/* Sit right under the details (AdSlot has 32px margins by default) */
.viewer-ad {
  margin: 0 0 0.25rem;
}

.viewer-ad :deep(.ad-label-wrapper) {
  margin-bottom: 4px;
}

/* Keep the ad compact: no "Ad not showing?" strip inside the popover */
.viewer-ad :deep(.ad-fallback-strip) {
  display: none;
}

.is-popover .viewer-navigation {
  padding-top: 0.75rem;
}

.is-popover .nav-btn {
  padding: 0.45rem 0.8rem;
  font-size: 0.8rem;
}

.is-popover .nav-counter {
  padding: 0 0.6rem;
  font-size: 0.82rem;
}

.is-popover .modal-close {
  top: 0.75rem;
  right: 0.75rem;
  width: 30px;
  height: 30px;
  font-size: 0.85rem;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile: anchor to bottom, full width, stacked layout (unchanged from before) */
@media (max-width: 640px) {
  /* Bottom sheet, same as the Dean's List Awards list */
  .modal-overlay {
    align-items: flex-end;
    padding: 0;
    background: rgba(15, 23, 42, 0.6);
  }

  .image-viewer-modal {
    width: 100%;
    max-width: none;
    max-height: 90vh;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom, 0px));
    border-bottom: none;
    animation: modalSlideUp 0.3s ease;
  }

  /* Close button sits above the image, not on top of its buttons */
  .modal-close {
    top: 0.75rem;
    right: 0.75rem;
    z-index: 3;
    width: 32px;
    height: 32px;
    background: var(--surface);
    box-shadow: var(--shadow-sm);
  }

  .viewer-layout {
    flex-direction: column;
  }

  .viewer-image-container {
    flex: none;
    margin-top: 2.25rem;
    padding: 0.75rem;
  }

  .viewer-image {
    max-height: 220px;
    width: auto;
  }

  .viewer-header {
    margin-top: 1rem;
  }

  .viewer-title {
    font-size: 1.15rem;
  }

  .viewer-details {
    flex-direction: row;
  }

  /* Previous · 1/4 · Next on one row */
  .viewer-navigation {
    margin-top: 1rem;
    padding-top: 1rem;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }

  .nav-btn {
    flex: 1 1 0;
    justify-content: center;
    padding: 0.65rem 0.5rem;
  }

  .nav-counter {
    flex: none;
    min-width: 44px;
    text-align: center;
    font-size: 0.85rem;
  }
}

@keyframes modalSlideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
