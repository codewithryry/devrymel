<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <transition name="slide-up">
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal" @click.stop>

        <!-- HEADER (same style as LinkWebsiteModal) -->
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="modal-close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- CONTENT -->
        <div class="modal-content">

          <!-- DESCRIPTION -->
          <div class="modal-description">
            <i class="fas fa-share-alt"></i>
            <p>{{ message }}</p>
          </div>

          <!-- PLATFORMS LIST -->
          <div class="modal-right">
            <div class="modal-scroll">
              <div class="modal-grid">
                <div
                  class="modal-card"
                  v-for="platform in platforms"
                  :key="platform"
                >
                  <div class="card-icon">
                    <i :class="getPlatformIcon(platform)"></i>
                  </div>

                  <div class="card-info">
                    <h4 class="card-title">{{ platform }}</h4>
                    <p class="card-desc">Coming Soon</p>
                  </div>

                  <i class="fas fa-clock card-clock"></i>
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
  name: 'SocialModal',
  props: {
    message: {
      type: String,
      required: true
    },
    platforms: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Platform Coming Soon'
    }
  },
  emits: ['close'],
  methods: {
    getPlatformIcon(platform) {
      const icons = {
        'Facebook': 'fab fa-facebook',
        'Twitter (X)': 'fab fa-twitter',
        'Instagram': 'fab fa-instagram',
        'YouTube': 'fab fa-youtube',
        'LinkedIn': 'fab fa-linkedin',
        'Spotify': 'fab fa-spotify',
        'Pinterest': 'fab fa-pinterest',
        'TikTok': 'fab fa-tiktok',
        'Reddit': 'fab fa-reddit',
        'Discord': 'fab fa-discord',
        'GitHub': 'fab fa-github',
        'GitLab': 'fab fa-gitlab',
        'Stack Overflow': 'fab fa-stack-overflow',
        'Medium': 'fab fa-medium',
        'Dev.to': 'fab fa-dev',
        'Behance': 'fab fa-behance',
        'Dribbble': 'fab fa-dribbble',
        'Telegram': 'fab fa-telegram',
        'WhatsApp': 'fab fa-whatsapp',
        'Messenger': 'fab fa-facebook-messenger',
        'Portfolio': 'fas fa-globe',
        'WeChat': 'fab fa-weixin',
        'Snapchat': 'fab fa-snapchat-ghost',
        'Threads': 'fab fa-threads',
        'Line': 'fab fa-line',
        'Viber': 'fab fa-viber',
        'Signal': 'fab fa-signal-messenger',
        'KakaoTalk': 'fas fa-comment',
        'Twitch': 'fab fa-twitch'
      };
      return icons[platform] || 'fas fa-share-alt';
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
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1;
}

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
  background: #8b5cf6;
  color: white;
  transform: rotate(90deg);
}

/* ===== Content ===== */
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ===== Description ===== */
.modal-description {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(139, 92, 246, 0.08); /* Purple theme */
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  text-align: left;
}

.modal-description i {
  color: #8b5cf6; /* Purple */
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

/* ===== Scroll Area ===== */
.modal-scroll {
  flex: 1;
  max-height: calc(4 * 74px);
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Scrollbar styling */
.modal-scroll::-webkit-scrollbar {
  width: 6px;
}

.modal-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.modal-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 10px;
}

.modal-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
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
  cursor: default;
  transition: all 0.2s ease;
}

/* ===== Icon ===== */
.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed); /* Purple gradient */
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
  color: #718096;
}

/* ===== Clock Icon (replaces arrow) ===== */
.card-clock {
  color: #cbd5e0;
  font-size: 0.9rem;
}

/* ===== Got it Button ===== */
.modal-gotit-button {
  background: #8b5cf6; /* Purple */
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  width: 100%;
  min-height: 48px;
}

.modal-gotit-button:active {
  transform: scale(0.98);
  background: #7c3aed; /* Darker purple */
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

/* ===== Responsive Adjustments ===== */
@media (min-width: 768px) {
  .modal {
    border-radius: 20px;
    max-width: 500px; /* Fixed desktop width */
    width: 90%;
  }
  
  .modal-overlay {
    align-items: center;
  }
}

@media (min-width: 1024px) {
  .modal {
    max-width: 480px; /* Slightly smaller for desktop */
  }
}

/* ===== Touch Device Optimizations ===== */
@media (hover: hover) and (pointer: fine) {
  /* Desktop hover effects */
  .modal-close:hover {
    background: #8b5cf6;
    color: white;
    transform: rotate(90deg);
  }
  
  .modal-gotit-button:hover {
    background: #7c3aed;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
  
  .modal-card:hover {
    background: #f1f5f9;
    border-color: #cbd5e0;
  }
}

/* ===== Adjust margin-top ===== */
.modal-overlay {
  margin-top: 0;
}

.modal {
  margin-top: 0;
}
</style>