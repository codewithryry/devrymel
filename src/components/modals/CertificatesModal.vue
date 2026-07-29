<template>
  <transition name="fade">
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal certificates-modal" @click.stop>

        <!-- CLOSE BUTTON -->
        <button class="modal-close" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>    

        <!-- HEADER -->
        <div class="modal-header">
          <h3 class="modal-title">Certifications</h3>
        </div> 

        <!-- DIVIDER LINE (SAME AS DEAN'S LIST) -->
        <div class="modal-divider"></div>

        <!-- DESCRIPTION (LEFT ALIGNED, NOT CENTERED) -->
        <div class="cert-description">
          <i class="fas fa-certificate"></i>
          <p>Credentials that represent my learning journey and technical progress.</p>

        </div>

        <!-- SCROLL CONTAINER -->
        <div class="certificates-scroll">
          <div class="certificates-grid">
            <div 
              class="certificate-card" 
              v-for="cert in certificates" 
              :key="cert.id"
              @click="openCertificate(cert.file)"
            >
              <div class="certificate-icon">
                <i class="fas fa-file-pdf"></i>
              </div>

              <div class="certificate-info">
                <h4 class="certificate-title">{{ cert.title }}</h4>
              </div>

              <i class="fas fa-chevron-right arrow-icon"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CertificatesModal',
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
/* ===== Arrow ===== */
.arrow-icon {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* ===== Overlay ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* ===== Modal ===== */
.modal {
  background: white;
  border-radius: 24px;
  text-align: left;
  max-width: 420px;
  width: 92%;
  max-height: 85vh;
  padding: 1.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  position: relative;
}

.certificates-modal {
  width: 100%;
}

/* ===== Header ===== */
.modal-header {
  margin-bottom: 0.5rem;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
  text-align: left;
}

/* ===== Divider ===== */
.modal-divider {
  width: 100%;
  height: 1px;
  background: #e2e8f0;
  margin: 0.8rem 0 1rem 0;
}

/* ===== Description ===== */
.cert-description {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.25);
  margin-bottom: 1rem;
  text-align: left;
}

.cert-description i {
  color: #667eea;
  font-size: 1.5rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.cert-description p {
  color: #2d3748;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  text-align: left;
}

/* ===== Scroll ===== */
.certificates-scroll {
  max-height: 43vh;
  overflow-y: auto;
  padding-right: 6px;
}

/* ===== Grid ===== */
.certificates-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

/* ===== Card ===== */
.certificate-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  cursor: pointer;
}

.certificate-card:hover {
  transform: translateX(3px);
  border-color: #667eea;
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.12);
}

/* ===== Icon ===== */
.certificate-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 1.1rem;
  flex-shrink: 0;
}

/* ===== Info ===== */
.certificate-info {
  flex: 1;
  min-width: 0;
}

.certificate-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2d3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== Close button ===== */
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  color: #2d3748;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:active {
  transform: rotate(90deg);
  background: #667eea;
  color: white;
}

/* ===== Scrollbar ===== */
.certificates-scroll::-webkit-scrollbar {
  width: 6px;
}

.certificates-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.certificates-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 10px;
}

.certificates-scroll::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* ===== Animation ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
/* ===== GLOBAL STYLES ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


</style>