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

        <div class="viewer-layout">
          <div class="viewer-image-container">
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
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QRModal',
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
