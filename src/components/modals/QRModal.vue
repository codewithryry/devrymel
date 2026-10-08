<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <transition name="fade">
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal image-viewer-modal" @click.stop>
        <button class="modal-close" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>

        <!-- Phones: title row with the close button, then bank tabs -->
        <div class="qr-mobile-head">
          <div>
            <span class="qr-kicker">Support Me</span>
            <h3>{{ currentQR.bank }}</h3>
          </div>
          <!-- Switch banks here (or swipe the QR) -->
          <div class="qr-switch">
            <button type="button" aria-label="Previous bank" :disabled="currentIndex === 0" @click="$emit('prev')">
              <i class="fas fa-chevron-left"></i>
            </button>
            <span>{{ currentIndex + 1 }}/{{ qrList.length }}</span>
            <button type="button" aria-label="Next bank" :disabled="currentIndex === qrList.length - 1" @click="$emit('next')">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <button type="button" class="qr-mobile-close" aria-label="Close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="viewer-layout">
          <div class="viewer-image-container" @touchstart.passive="onTouchStart" @touchend="onTouchEnd">
            <img :src="currentQR.image" :alt="currentQR.bank" class="viewer-image" />

            <div class="image-actions">
              <a :href="currentQR.image" target="_blank" class="image-action-btn" title="View Full Size">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <a :href="currentQR.image" :download="currentQR.bank + '_QR.jpg'" class="image-action-btn" title="Download QR">
                <i class="fas fa-download"></i>
              </a>
            </div>
          </div>

          <div class="viewer-side">
            <div class="viewer-header">
              <h3 class="viewer-title">{{ currentQR.bank }}</h3>
              <p class="viewer-description">{{ currentQR.description }}</p>
            </div>

            <div class="viewer-details">
              <div class="detail-col">
                <i class="fas fa-university"></i>
                <div>
                  <span class="detail-label">Bank</span>
                  <span class="detail-value">{{ currentQR.bank }}</span>
                </div>
              </div>
              <div class="detail-col">
                <i class="fas fa-qrcode"></i>
                <div>
                  <span class="detail-label">Method</span>
                  <span class="detail-value">QR Code</span>
                </div>
              </div>
            </div>

            <div class="viewer-navigation">
              <button @click="$emit('prev')" class="nav-btn" :disabled="currentIndex === 0">
                <i class="fas fa-chevron-left"></i>
                Previous
              </button>
              <span class="nav-counter">{{ currentIndex + 1 }} / {{ qrList.length }}</span>
              <button @click="$emit('next')" class="nav-btn" :disabled="currentIndex === qrList.length - 1">
                Next
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Phones: ad under the QR -->
        <AdSlot class="qr-ad" type="mobile-banner" />
      </div>
    </div>
  </transition>
</template>

<script>
import AdSlot from '@/components/AdSlot.vue'

export default {
  name: 'QRModal',
  components: { AdSlot },
  props: {
    qrList: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    }
  },
  emits: ['close', 'prev', 'next', 'goTo'],
  data() {
    return {
      touchX: null
    }
  },
  methods: {
    onTouchStart(e) {
      this.touchX = e.changedTouches[0].clientX
    },

    // Swipe left = next bank, swipe right = previous bank
    onTouchEnd(e) {
      if (this.touchX === null) return
      const dx = e.changedTouches[0].clientX - this.touchX
      this.touchX = null
      if (Math.abs(dx) < 40) return
      if (dx < 0 && this.currentIndex < this.qrList.length - 1) this.$emit('next')
      if (dx > 0 && this.currentIndex > 0) this.$emit('prev')
    }
  },
  computed: {
    currentQR() {
      return this.qrList[this.currentIndex] || {};
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
  max-width: 1000px;
  width: min(95vw, 1000px);
  max-height: 85vh;
  overflow-y: auto;
  padding: 2rem;
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
  flex: 0 0 320px;
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
/* Phones-only header, bank tabs and ad */
.qr-mobile-head,
.qr-ad {
  display: none;
}

@media (max-width: 640px) {
  .qr-mobile-head {
    position: sticky;
    top: -1rem;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin: -1rem -1rem 0.75rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }

  .qr-kicker {
    display: block;
    margin-bottom: 0.15rem;
    color: var(--text-muted);
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .qr-mobile-head h3 {
    margin: 0;
    color: var(--text);
    font-size: 1.15rem;
    font-weight: 700;
  }

  .qr-mobile-close {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: var(--surface-soft);
    color: var(--text-secondary);
    cursor: pointer;
  }

  /* Bank switcher in the header: ‹ 1/6 › */
  .qr-mobile-head > div:first-child {
    flex: 1;
    min-width: 0;
  }

  .qr-switch {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border: 1px solid var(--border);
    border-radius: 999px;
  }

  .qr-switch button {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: none;
    color: var(--text);
    font-size: 0.75rem;
    cursor: pointer;
  }

  .qr-switch button:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .qr-switch span {
    min-width: 30px;
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 600;
    text-align: center;
  }

  /* Compact: no floating close, no side title / details / Previous-Next */
  .modal-close,
  .viewer-header,
  .viewer-details,
  .viewer-navigation {
    display: none !important;
  }

  #app .image-viewer-modal .viewer-image-container {
    margin-top: 0;
    padding: 0.5rem;
    background: #fff;
  }

  #app .image-viewer-modal .viewer-image {
    max-height: 300px;
  }

  /* Small ad right under the QR, no "Ad not showing?" strip */
  .qr-ad {
    display: block;
    margin: 0.6rem 0 0;
  }

  .qr-ad :deep(.ad-label-wrapper) {
    margin-bottom: 4px;
  }

  .qr-ad :deep(.ad-fallback-strip) {
    display: none;
  }
}

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
