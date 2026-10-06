<template>
  <section id="tech-notes" class="tech-notes-section">
    <div class="section-header">
      <div>
        <span class="section-kicker">Insights</span>
        <h2 class="section-title">Tech Notes</h2>
      </div>

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
              <span class="note-meta">
                <span class="note-read-time">{{ note.readTime }}</span>
                <a
                  v-if="note.url"
                  :href="note.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="note-link"
                  title="Read guide"
                  aria-label="Read guide"
                  @click.stop
                >
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </span>
            </div>


            <h3 class="note-title">{{ note.title }}</h3>
            <p class="note-description">{{ note.description }}</p>

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
            <span class="note-meta">
              <span class="note-read-time">{{ notes[currentIndex].readTime }}</span>
              <a
                v-if="notes[currentIndex].url"
                :href="notes[currentIndex].url"
                target="_blank"
                rel="noopener noreferrer"
                class="note-link"
                title="Read guide"
                aria-label="Read guide"
                @click.stop
              >
                <i class="fas fa-external-link-alt"></i>
              </a>
            </span>
          </div>


          <h3 class="note-title">{{ notes[currentIndex].title }}</h3>
          <p class="note-description">{{ notes[currentIndex].description }}</p>

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
  margin: 0;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
  margin-bottom: 1rem;
}

.section-header > div:first-child {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.section-kicker {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  text-align: left;
}

.swipe-hint {
  display: none;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.9rem;
  padding: 0 0.5rem;
}

/* Desktop carousel */
.carousel-wrapper {
  overflow: hidden;
  margin: 0 auto;
  max-width: 1400px;
  padding: 0;
  position: relative;
}

.notes-carousel {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 1.5rem;
  padding: 0.25rem 1rem;
  align-items: center;
}

.note-card {
  flex: 0 0 calc(33.333% - 1rem);
  background: var(--surface);
  border-radius: var(--radius-lg);
  margin-top: 0;
  padding: 1.75rem;
  border: 1px solid var(--border);
  transition: border-color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 230px;
  opacity: 0.55;
  transform: scale(0.94);
  overflow: hidden;
}

.note-card.left,
.note-card.right {
  opacity: 0.7;
  transform: scale(0.97);
}

.note-card.active {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
  border-color: var(--text);
  min-height: 245px;
}

.note-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

/* Keep the top row on one line: long categories shrink with "…" */
.note-top .note-category {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note-meta {
  flex-shrink: 0;
  white-space: nowrap;
}

.note-category {
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
}

.note-read-time {
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 500;
  white-space: nowrap;
}


.note-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.note-link {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: var(--radius);
  color: var(--text-muted);
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;
}

.note-link:hover {
  color: var(--text);
  background: var(--surface-soft);
}


.note-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 0.85rem;
  text-align: left;
  line-height: 1.3;
  /* Max 2 lines so every card is the same height */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  text-align: left;
  font-size: 0.92rem;
  min-height: 76px;
  /* Max 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}



.active-button {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}



.note-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 500;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;
  margin: 0.75rem auto 0;
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
  font-size: 1.3rem;
  color: var(--text);
  font-weight: 700;
  line-height: 1;
}

.note-separator {
  color: var(--border);
  font-size: 1.1rem;
  line-height: 1;
}

.total-notes {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1;
}

.note-name {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-left: 1rem;
  font-weight: 500;
  line-height: 1;
}

.slider-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
  flex-shrink: 0;
  z-index: 20;
}

.slider-btn:hover {
  border-color: var(--text);
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
  min-height: 200px;
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  touch-action: pan-y;
  user-select: none;
}

.mobile-note-card .note-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.7rem;
  color: var(--text);
  text-align: left;
}

.mobile-note-card .note-description {
  font-size: 0.9rem;
  line-height: 1.62;
  min-height: auto;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  text-align: left;
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
    margin: 0;
    overflow: visible;
  }

  .section-header {
    margin-bottom: 1rem;
    padding: 0 0.15rem;
  }

  .section-title {
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 0.85rem;
    letter-spacing: -0.02em;
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
    font-size: 1.35rem;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  .mobile-note-card {
    min-height: 195px;
    padding: 1.1rem;
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

</style>