<template>
  <section class="tech-notes-section">
    <div class="section-header">
      <h2 class="section-title">Tech Notes</h2>

      <div class="swipe-hint">
        <span>Swipe for more..</span>
      </div>
    </div>

    <!-- Desktop Carousel View -->
    <div v-if="!isMobile" class="notes-carousel-container">
      <div class="carousel-wrapper">
        <div
          class="notes-carousel"
          :style="{ transform: `translateX(${translateValue}%)` }"
        >
          <article
            v-for="(note, index) in notes"
            :key="note.id"
            class="note-card"
            :class="{
              active: currentIndex === index,
              left: getCardPosition(index) === 'left',
              right: getCardPosition(index) === 'right'
            }"
            @click="goToNote(index)"
          >
            <div class="note-top">
              <span class="note-category">{{ note.category }}</span>
              <span class="note-read-time">{{ note.readTime }}</span>
            </div>

            <div class="note-icon">
              <i :class="getIcon(note.category)"></i>
            </div>

            <h3 class="note-title">{{ note.title }}</h3>
            <p class="note-description">{{ note.description }}</p>

            <div class="note-actions">
              <a
                :href="note.url || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="note-button"
                :class="{
                  'active-button': currentIndex === index,
                  disabled: !note.url
                }"
                @click.stop
              >
                <span>{{ currentIndex === index ? 'Read Full Guide' : 'Read Guide' }}</span>
                <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>
        </div>
      </div>

      <div class="carousel-controls">
        <button
          @click="prevNote"
          class="slider-btn prev-btn"
          aria-label="Previous tech note"
        >
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="carousel-info">
          <span class="current-note">{{ currentIndex + 1 }}</span>
          <span class="note-separator">/</span>
          <span class="total-notes">{{ notes.length }}</span>
          <span class="note-name">{{ notes[currentIndex]?.title }}</span>
        </div>

        <button
          @click="nextNote"
          class="slider-btn next-btn"
          aria-label="Next tech note"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Single Card View -->
    <div v-else class="mobile-notes-container">
      <transition :name="mobileTransitionName" mode="out-in">
        <article
          v-if="notes.length"
          :key="notes[currentIndex].id"
          class="mobile-note-card"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <div class="note-top">
            <span class="note-category">{{ notes[currentIndex].category }}</span>
            <span class="note-read-time">{{ notes[currentIndex].readTime }}</span>
          </div>

          <div class="note-icon">
            <i :class="getIcon(notes[currentIndex].category)"></i>
          </div>

          <h3 class="note-title">{{ notes[currentIndex].title }}</h3>
          <p class="note-description">{{ notes[currentIndex].description }}</p>

          <div class="note-actions">
            <a
              :href="notes[currentIndex].url || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="note-button active-button"
              :class="{ disabled: !notes[currentIndex].url }"
              @click.stop
            >
              <span>Read Full Guide</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </article>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "TechNotesSection",

  props: {
    notes: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      currentIndex: 0,
      translateValue: 0,
      isTransitioning: false,
      autoRotateInterval: null,
      isMobile: false,
      touchStartX: 0,
      touchEndX: 0,
      swipeDirection: "next"
    };
  },

  computed: {
    mobileTransitionName() {
      return this.swipeDirection === "next"
        ? "mobile-card-next"
        : "mobile-card-prev";
    }
  },

  methods: {
    getIcon(category) {
      const key = String(category || "").toLowerCase();

      if (key.includes("github")) return "fab fa-github";
      if (key.includes("firebase")) return "fas fa-fire";
      if (key.includes("vue")) return "fab fa-vuejs";
      if (key.includes("network")) return "fas fa-wifi";
      if (key.includes("android")) return "fab fa-android";
      if (key.includes("tools")) return "fas fa-code";

      return "fas fa-file-code";
    },

    getCardPosition(index) {
      if (this.isMobile) return "";

      const diff = index - this.currentIndex;
      const total = this.notes.length;

      let normalizedDiff = diff;

      if (Math.abs(diff) > total / 2) {
        normalizedDiff = diff > 0 ? diff - total : diff + total;
      }

      if (normalizedDiff < 0) return "left";
      if (normalizedDiff > 0) return "right";

      return "center";
    },

    nextNote() {
      if (this.isTransitioning || !this.notes.length) return;

      this.swipeDirection = "next";
      this.isTransitioning = true;
      this.currentIndex = (this.currentIndex + 1) % this.notes.length;

      if (!this.isMobile) {
        this.animateTransition();
      } else {
        setTimeout(() => {
          this.isTransitioning = false;
        }, 300);
      }
    },

    prevNote() {
      if (this.isTransitioning || !this.notes.length) return;

      this.swipeDirection = "prev";
      this.isTransitioning = true;
      this.currentIndex =
        (this.currentIndex - 1 + this.notes.length) % this.notes.length;

      if (!this.isMobile) {
        this.animateTransition();
      } else {
        setTimeout(() => {
          this.isTransitioning = false;
        }, 300);
      }
    },

    animateTransition() {
      if (this.isMobile) return;

      const cardWidth = 33.333;
      this.translateValue = -this.currentIndex * cardWidth + cardWidth;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 400);
    },

    goToNote(index) {
      if (this.isMobile) return;
      if (this.isTransitioning || index === this.currentIndex) return;

      this.swipeDirection = index > this.currentIndex ? "next" : "prev";
      this.isTransitioning = true;
      this.currentIndex = index;
      this.animateTransition();
    },

    startAutoRotation() {
      if (this.isMobile) return;

      this.autoRotateInterval = setInterval(() => {
        if (!this.isTransitioning) {
          this.nextNote();
        }
      }, 5000);
    },

    stopAutoRotation() {
      if (this.autoRotateInterval) {
        clearInterval(this.autoRotateInterval);
        this.autoRotateInterval = null;
      }
    },

    checkIfMobile() {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;

      if (this.isMobile && !wasMobile) {
        this.stopAutoRotation();
      } else if (!this.isMobile && wasMobile) {
        this.animateTransition();
        this.startAutoRotation();
      }
    },

    handleTouchStart(event) {
      this.touchStartX = event.changedTouches[0].screenX;
    },

    handleTouchEnd(event) {
      this.touchEndX = event.changedTouches[0].screenX;
      this.handleSwipeGesture();
    },

    handleSwipeGesture() {
      const swipeDistance = this.touchStartX - this.touchEndX;

      if (Math.abs(swipeDistance) < 45) return;

      if (swipeDistance > 0) {
        this.nextNote();
      } else {
        this.prevNote();
      }
    }
  },

  mounted() {
    this.checkIfMobile();

    if (!this.isMobile) {
      this.animateTransition();
      this.startAutoRotation();
    }

    window.addEventListener("resize", this.checkIfMobile);
  },

  beforeUnmount() {
    this.stopAutoRotation();
    window.removeEventListener("resize", this.checkIfMobile);
  }
};
</script>

<style scoped>
.tech-notes-section {
  margin-top: 3rem;
}

.section-header {
  text-align: left;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: clamp(1.85rem, 4vw, 2.35rem);
  font-weight: 900;
  color: #2d3748;
  margin: 0;
  letter-spacing: -0.04em;
  text-align: left;
}

.swipe-hint {
  display: none;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.9rem;
  padding: 0 0.5rem;
  animation: pulseHint 2s infinite;
}

@keyframes pulseHint {
  0%,
  100% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }
}

/* Desktop carousel */
.carousel-wrapper {
  overflow: hidden;
  margin: 0 auto;
  max-width: 1400px;
  padding: 1rem 0 3rem;
  position: relative;
}

.notes-carousel {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 1.5rem;
  padding: 1rem;
  align-items: center;
}

.note-card {
  flex: 0 0 calc(33.333% - 1rem);
  background: white;
  border-radius: 20px;
  margin-top: -32px;
  padding: 1.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 280px;
  opacity: 0.6;
  transform: scale(0.85);
  filter: blur(3px) brightness(0.95);
  overflow: hidden;
}

.note-card.left {
  opacity: 0.7;
  transform: translateX(-10%) scale(0.9);
  filter: blur(2px) brightness(0.97);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
}

.note-card.right {
  opacity: 0.7;
  transform: translateX(10%) scale(0.9);
  filter: blur(2px) brightness(0.97);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
}

.note-card.active {
  opacity: 1;
  transform: scale(1);
  filter: blur(0) brightness(1);
  box-shadow: 0 20px 40px rgba(31, 174, 91, 0.15);
  z-index: 10;
  border: 1px solid rgba(31, 174, 91, 0.32);
  min-height: 320px;
}

.note-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.note-category {
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  background: rgba(31, 174, 91, 0.12);
  color: #15803d;
  font-size: 0.72rem;
  font-weight: 800;
  white-space: nowrap;
}

.note-read-time {
  color: #718096;
  font-size: 0.78rem;
  font-weight: 500;
  white-space: nowrap;
}

.note-icon {
  width: 42px;
  height: 42px;
  margin-bottom: 1rem;
  border-radius: 14px;
  background: rgba(31, 174, 91, 0.12);
  color: #15984e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
}

.note-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 0.85rem;
  text-align: left;
  line-height: 1.3;
}

.note-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  text-align: left;
  font-size: 0.93rem;
  min-height: 76px;
}

.note-actions {
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
}

.note-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #1fae5b, #0f6b3e);
  color: white;
  border-radius: 10px;
  border: 0;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 280px;
  font-size: 0.95rem;
  cursor: pointer;
}

.active-button {
  background: linear-gradient(135deg, #1fae5b, #0f6b3e);
  box-shadow: 0 8px 20px rgba(31, 174, 91, 0.28);
}

.note-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(31, 174, 91, 0.26);
}

.note-button.disabled {
  opacity: 0.55;
  pointer-events: none;
  cursor: not-allowed;
  box-shadow: none;
}

.note-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: #718096;
  font-size: 0.85rem;
  font-weight: 500;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;
  margin: 1.5rem auto 0;
  padding: 0 1rem;
}

.carousel-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  flex-wrap: wrap;
  justify-content: center;
}

.current-note {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #1fae5b, #0f6b3e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.note-separator {
  color: #cbd5e0;
  font-size: 1.2rem;
  line-height: 1;
}

.total-notes {
  color: #a0aec0;
  font-size: 1rem;
  line-height: 1;
}

.note-name {
  color: #4a5568;
  font-size: 1rem;
  margin-left: 1rem;
  font-weight: 500;
  line-height: 1;
}

.slider-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e2e8f0;
  color: #1fae5b;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 20;
}

.slider-btn:hover {
  background: #1fae5b;
  color: white;
  border-color: #1fae5b;
}

/* Mobile single card */
.mobile-notes-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0.15rem 0 0.8rem;
  overflow: hidden;
}

.mobile-note-card {
  width: 100%;
  min-height: 315px;
  background: white;
  border-radius: 20px;
  padding: 1.25rem;
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.07);
  display: flex;
  flex-direction: column;
  touch-action: pan-y;
  user-select: none;
}

.mobile-note-card .note-title {
  font-size: 1.1rem;
  font-weight: 900;
  margin: 0 0 0.7rem;
  color: #2d3748;
  text-align: left;
}

.mobile-note-card .note-description {
  font-size: 0.9rem;
  line-height: 1.62;
  min-height: auto;
  margin-bottom: 1rem;
  color: #4a5568;
  text-align: left;
}

.mobile-note-card .note-button {
  max-width: 100%;
}

.mobile-note-card .note-hint {
  font-size: 0.8rem;
}

/* Mobile transition */
.mobile-card-next-enter-active,
.mobile-card-next-leave-active,
.mobile-card-prev-enter-active,
.mobile-card-prev-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.mobile-card-next-enter-from {
  opacity: 0;
  transform: translateX(42px) scale(0.98);
}

.mobile-card-next-leave-to {
  opacity: 0;
  transform: translateX(-42px) scale(0.98);
}

.mobile-card-prev-enter-from {
  opacity: 0;
  transform: translateX(-42px) scale(0.98);
}

.mobile-card-prev-leave-to {
  opacity: 0;
  transform: translateX(42px) scale(0.98);
}

.mobile-card-next-enter-to,
.mobile-card-next-leave-from,
.mobile-card-prev-enter-to,
.mobile-card-prev-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Responsive */
@media (max-width: 768px) {
  .tech-notes-section {
    margin-top: 3rem;
    overflow: visible;
  }

  .section-header {
    margin-bottom: 1rem;
    padding: 0 0.15rem;
  }

  .section-title {
    font-size: 2rem;
    line-height: 1.15;
    font-weight: 900;
    margin-bottom: 0.85rem;
    letter-spacing: -0.04em;
  }

  .swipe-hint {
    display: flex;
  }

  .carousel-controls,
  .carousel-wrapper {
    display: none;
  }
}

@media (min-width: 769px) {
  .mobile-notes-container {
    display: none;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.9rem;
    line-height: 1.15;
    margin-bottom: 0.75rem;
  }

  .mobile-note-card {
    min-height: 305px;
    padding: 1.15rem;
  }

  .mobile-note-card .note-title {
    font-size: 1.05rem;
  }

  .mobile-note-card .note-description {
    font-size: 0.86rem;
  }

  .note-category {
    font-size: 0.68rem;
  }

  .note-read-time {
    font-size: 0.72rem;
  }
}

/* Dark Mode */
html[data-theme="dark"] .section-title,
html[data-theme="dark"] .note-title {
  color: #f8fafc;
}

html[data-theme="dark"] .note-description {
  color: #cbd5e0;
}

html[data-theme="dark"] .note-card,
html[data-theme="dark"] .mobile-note-card {
  background: rgba(17, 17, 17, 0.94);
  border-color: #242424;
}

html[data-theme="dark"] .mobile-note-card {
  box-shadow: none;
}

html[data-theme="dark"] .note-hint {
  color: #cbd5e0;
  border-top-color: #242424;
}

html[data-theme="dark"] .swipe-hint {
  color: #cbd5e0;
}

/* Dark Mode */
html[data-theme="dark"] .section-title,
html[data-theme="dark"] .note-title {
  color: #f8fafc;
}

html[data-theme="dark"] .note-description {
  color: #cbd5e0;
}

html[data-theme="dark"] .note-card,
html[data-theme="dark"] .mobile-note-card {
  background: rgba(17, 17, 17, 0.94);
  border-color: #242424;
}

html[data-theme="dark"] .mobile-note-card {
  box-shadow: none;
}

html[data-theme="dark"] .note-read-time,
html[data-theme="dark"] .swipe-hint {
  color: #cbd5e0;
}

/* Midnight Theme */
html[data-theme="midnight"] .section-title,
html[data-theme="midnight"] .note-title {
  color: #e5f0ff;
}

html[data-theme="midnight"] .note-description {
  color: #b8c7dc;
}

html[data-theme="midnight"] .note-card,
html[data-theme="midnight"] .mobile-note-card {
  background: rgba(10, 20, 38, 0.96);
  border-color: rgba(96, 165, 250, 0.22);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
}

html[data-theme="midnight"] .note-card.active {
  border-color: rgba(96, 165, 250, 0.42);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.18);
}

html[data-theme="midnight"] .note-category {
  background: rgba(96, 165, 250, 0.14);
  color: #93c5fd;
}

html[data-theme="midnight"] .note-icon {
  background: rgba(96, 165, 250, 0.14);
  color: #93c5fd;
}

html[data-theme="midnight"] .note-read-time,
html[data-theme="midnight"] .swipe-hint {
  color: #9fb3ca;
}

html[data-theme="midnight"] .note-button,
html[data-theme="midnight"] .active-button {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.26);
}

html[data-theme="midnight"] .slider-btn {
  background: rgba(10, 20, 38, 0.96);
  border-color: rgba(96, 165, 250, 0.22);
  color: #93c5fd;
}

html[data-theme="midnight"] .slider-btn:hover {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

html[data-theme="midnight"] .note-name {
  color: #b8c7dc;
}

/* Forest Theme */
html[data-theme="forest"] .section-title,
html[data-theme="forest"] .note-title {
  color: #ecfdf5;
}

html[data-theme="forest"] .note-description {
  color: #bbf7d0;
}

html[data-theme="forest"] .note-card,
html[data-theme="forest"] .mobile-note-card {
  background: rgba(8, 47, 32, 0.96);
  border-color: rgba(34, 197, 94, 0.22);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.24);
}

html[data-theme="forest"] .note-card.active {
  border-color: rgba(34, 197, 94, 0.42);
  box-shadow: 0 20px 40px rgba(34, 197, 94, 0.16);
}

html[data-theme="forest"] .note-category {
  background: rgba(34, 197, 94, 0.16);
  color: #86efac;
}

html[data-theme="forest"] .note-icon {
  background: rgba(34, 197, 94, 0.16);
  color: #86efac;
}

html[data-theme="forest"] .note-read-time,
html[data-theme="forest"] .swipe-hint {
  color: #a7f3d0;
}

html[data-theme="forest"] .note-button,
html[data-theme="forest"] .active-button {
  background: linear-gradient(135deg, #16a34a, #166534);
  box-shadow: 0 8px 20px rgba(22, 163, 74, 0.26);
}

html[data-theme="forest"] .slider-btn {
  background: rgba(8, 47, 32, 0.96);
  border-color: rgba(34, 197, 94, 0.22);
  color: #86efac;
}

html[data-theme="forest"] .slider-btn:hover {
  background: #16a34a;
  color: #ffffff;
  border-color: #16a34a;
}

html[data-theme="forest"] .note-name {
  color: #bbf7d0;
}
</style>