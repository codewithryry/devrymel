<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <transition name="slide-up">
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal" @click.stop>

        <!-- HEADER (same style as Dean's List) -->
        <div class="modal-header">
          <h3 class="modal-title">Project Links</h3>
          <button class="modal-close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- CONTENT -->
        <div class="modal-content">

          <!-- DESCRIPTION -->
          <div class="modal-description">
            <i class="fas fa-link"></i>
<p>Production-ready systems I’ve designed, built, and deployed.</p>

          </div>

          <!-- CARD LIST -->
          <div class="modal-right">
            <div class="modal-scroll">
              <div class="modal-grid">
                <div
                  class="modal-card"
                  v-for="site in links"
                  :key="site.id"
                  @click="openLink(site.link)"
                >
                  <div class="card-icon">
                    <i class="fas fa-globe"></i>
                  </div>

                  <div class="card-info">
                    <h4 class="card-title">{{ site.title }}</h4>
                    <p class="card-desc">{{ site.description }}</p>
                  </div>

                  <i class="fas fa-chevron-right card-arrow"></i>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinkWebsiteModal',
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    openLink(link) {
      if (!link) return
      window.open(link, '_blank')
    }
  }
}
</script>

<style scoped>
/* ===== Overlay ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
}

/* ===== Modal ===== */
.modal {
  background: white;
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  border-radius: 24px 24px 0 0;
  padding: 1.5rem;
  animation: modalSlideUp 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* ===== Header ===== */
/* ===== Modal Header (Unified Style) ===== */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

/* ===== Title ===== */
.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1;                 /* 🔥 vertical centering fix */
}

/* ===== Close Button ===== */
.modal-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
}

.modal-close:active {
  background: #667eea;
  color: white;
  transform: rotate(90deg);
}

/* ===== Content ===== */
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* ===== Description ===== */
.modal-description {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  text-align: left;
}

.modal-description i {
  color: #3b82f6;
  font-size: 1.4rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.modal-description p {
  color: #2d3748;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

/* ===== Cards Area ===== */
.modal-right {
  display: flex;
}

/* ===== Scroll Area (4 cards only) ===== */
.modal-scroll {
  flex: 1;
  max-height: calc(5* 74px);  /* 🔥 4 cards visible */
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* ===== Grid ===== */
.modal-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* ===== Card ===== */
.modal-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-card:active {
  transform: scale(0.98);
  background: white;
  border-color: #667eea;
}

/* ===== Icon ===== */
.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  flex-shrink: 0;
}

/* ===== Info ===== */
.card-info {
  flex: 1;
  text-align: left;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.3rem;
}

.card-desc {
  font-size: 0.85rem;
  color: #64748b;
}

/* ===== Arrow ===== */
.card-arrow {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* ===== Animations ===== */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@keyframes modalSlideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
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
