<template>
  <transition name="fade">
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal cert-viewer-modal profile-modal" @click.stop>
        <div class="viewer-header">
          <h3 class="viewer-title">My Certifications</h3>
          <button class="modal-close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <p class="viewer-description">Credentials from my learning journey.</p>

        <div class="cert-list">
          <div
            class="cert-item"
            v-for="cert in certificates"
            :key="cert.id"
            @click="openCertificate(cert.file)"
          >
            <div class="cert-icon">
              <i class="fas fa-file-pdf"></i>
            </div>
            <div class="cert-info">
              <h4>{{ cert.title }}</h4>
              <span v-if="cert.category" class="cert-category">{{ cert.category }}</span>
            </div>
            <i class="fas fa-chevron-right arrow-icon"></i>
          </div>
        </div>

        <!-- Sponsored footer (mobile only): pinned to the bottom of the popup -->
        <AdSlot v-if="isMobile" class="profile-modal-footer" type="banner" />
      </div>
    </div>
  </transition>
</template>

<script>
import AdSlot from '@/components/AdSlot.vue'

export default {
  name: 'CertificatesModal',
  components: {
    AdSlot
  },
  data() {
    return {
      // Sponsored footer is a mobile-only part of this popup
      isMobile: window.matchMedia("(max-width: 768px)").matches
    };
  },
  props: {
    certificates: {
      type: Array,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    getCertificatePath(filename) {
      if (filename && filename.startsWith('http')) return filename;
      return `/certificates/${filename}`;
    },
    openCertificate(filename) {
      window.open(this.getCertificatePath(filename), '_blank');
    }
  }
}
</script>

<style scoped>
/* Same shell as QRModal / DeansListModal (bank support viewer) */
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
  max-width: 400px;
  width: 90%;
  border: 1px solid var(--border);
  position: relative;
}

.cert-viewer-modal {
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
  flex-shrink: 0;
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

.cert-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem;
  background: var(--surface-soft);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.15s ease;
}

.cert-item:hover {
  border-color: var(--text-muted);
  transform: translateY(-1px);
}

.cert-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.cert-info {
  flex: 1;
  text-align: left;
  min-width: 0;
}

.cert-info h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  line-height: 1.35;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.cert-category {
  display: inline-block;
  margin-top: 0.3rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.15rem 0.55rem;
}

.arrow-icon {
  color: var(--text-muted);
  font-size: 0.85rem;
  flex-shrink: 0;
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
  z-index: 2;
}

.modal-close:active {
  background: var(--accent);
  color: var(--bg);
}

/* Animation — same as QRModal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile: same bottom-sheet behavior as QRModal / DeansListModal */
@media (max-width: 640px) {
  .modal-overlay {
    align-items: flex-end;
    background: rgba(15, 23, 42, 0.75);
    padding: 0;
  }

  .cert-viewer-modal {
    width: 100%;
    max-width: none;
    max-height: 90vh;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    padding: 1.5rem;
    border-bottom: none;
    animation: modalSlideUp 0.3s ease;
  }

  .viewer-title {
    font-size: 1.25rem;
  }

  .viewer-details {
    flex-direction: row;
  }

  .cert-list {
    grid-template-columns: 1fr;
    max-height: 50vh;
    overflow-y: auto;
    padding-right: 0.25rem;
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

/* Phones: same header as the Dean's List / Project Links popups
   (title row + divider, then one short line, then the list) */
@media (max-width: 768px) {
  .viewer-header {
    display: flex;
    align-items: center;
    min-height: 32px;
    margin: 0 0 0.75rem;
    padding: 0 2.5rem 0.6rem 0;
    border-bottom: 1px solid var(--border);
  }

  .viewer-title {
    margin: 0;
    font-size: 1.1rem;
  }

  .viewer-description {
    margin: 0 0 1rem;
    color: var(--text-secondary);
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .cert-viewer-modal {
    padding: 1rem 1rem 1.1rem;
  }

  .modal-close {
    top: 0.85rem;
    right: 0.85rem;
    width: 32px;
    height: 32px;
  }
}
</style>
