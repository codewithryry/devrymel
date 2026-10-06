<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <transition name="fade">
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal" @click.stop>
        <div class="modal-icon">
          <i class="fas fa-code"></i>
        </div>
        <h3 class="modal-title">Coming Soon</h3>
        <p class="modal-text">{{ message }}</p>
        <button @click="$emit('close')" class="modal-close-button">Got it</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ProjectModal',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  emits: ['close']
}
</script>

<style scoped>

@media (max-width: 768px) {
  .modal-overlay {
    z-index: 99999 !important;
  }

  .modal,
  .links-modal,
  .project-links-modal {
    position: relative;
    z-index: 100000 !important;
  }

  .fab-container,
  .floating-button,
  .floating-actions,
  .quick-fab,
  .fab {
    z-index: 1000 !important;
  }
}

@media (max-width: 768px) {
  body:has(.modal-overlay) .fab-container,
  body:has(.modal-overlay) .floating-button,
  body:has(.modal-overlay) .floating-actions,
  body:has(.modal-overlay) .quick-fab,
  body:has(.mobile-modal-overlay) .fab-container,
  body:has(.mobile-modal-overlay) .floating-button,
  body:has(.mobile-modal-overlay) .floating-actions,
  body:has(.mobile-modal-overlay) .quick-fab {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}
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
}

.modal {
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius);
  text-align: center;
  max-width: 1000px;
  width: 95%;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  position: relative;
}

.modal-icon {
  font-size: 3rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}

.modal-text {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.modal-close-button {
  background: var(--accent);
  color: var(--bg);
  border: none;
  padding: 0.9rem 1.8rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
  min-height: 44px;
  width: 100%;
}

.modal-close-button:active {
  transform: scale(0.98);
  background: var(--accent-hover);
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
</style>
