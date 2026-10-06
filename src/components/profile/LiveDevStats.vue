<template>
  <section id="skills" class="dev-stats-section">
    <div class="section-header" :class="{ 'has-link': viewAllTo }">
      <div>
        <span class="section-kicker">Key Takeaways</span>
        <h2 class="section-title">Highlights</h2>
      </div>

      <router-link v-if="viewAllTo" :to="viewAllTo" class="view-all-link">
        {{ viewAllLabel }}
      </router-link>
    </div>

    <div class="stats-container">
      <div class="stat-card">
        <transition name="fade-slide" mode="out-in">
          <div :key="currentStat.id" class="stat-content">
            <div class="stat-top">
              <div class="stat-indicator">
                <span class="current-index">{{ index + 1 }}</span>
                <span class="total-stats">/{{ localStats.length }}</span>
              </div>

              <div class="stat-label-wrap">
                <h4 class="stat-label">{{ currentStat.label }}</h4>
                <p class="stat-description" v-if="currentStat.description">
                  {{ currentStat.description }}
                </p>
              </div>
            </div>

            <div class="stat-main">
              <div class="value-display">
                <div class="stat-icon" :style="{ color: currentStat.color }">
                  <i :class="currentStat.icon"></i>
                </div>

                <div class="value-container">
                  <div class="value">
                    <span class="value-number">{{ currentStat.value }}</span>
                    <span class="value-unit" v-if="currentStat.unit">
                      {{ currentStat.unit }}
                    </span>
                  </div>

                  <div class="trend" :class="currentStat.trendClass">
                    <i :class="currentStat.trendIcon"></i>
                    <span>{{ currentStat.trend }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="stat-navigation">
              <div class="nav-dots">
                <button
                  v-for="(stat, i) in localStats"
                  :key="i"
                  class="nav-dot"
                  :class="{ active: i === index }"
                  @click="index = i"
                  :aria-label="`View ${stat.label}`"
                ></button>
              </div>

              <div class="nav-hint">
                <span class="hint-text">
                  <i class="fas fa-arrows-alt-v"></i>
                  {{ isMobile ? 'Swipe' : 'Scroll' }} to navigate
                </span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import { getViews } from "@/services/analyticsService";

export default {
  name: "DevStats",

  props: {
    viewAllTo: {
      type: String,
      default: ""
    },
    viewAllLabel: {
      type: String,
      default: "View all.."
    },
    stats: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      index: 0,
      touchStartY: 0,
      scrollThrottle: false,
      isMobile: false,
      localStats: this.stats ? [...this.stats] : [],
    };
  },

  computed: {
    currentStat() {
      return this.localStats[this.index] || {};
    },
  },

  async mounted() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);

    try {
      const views = await getViews();

      this.localStats.push({
        id: "views",
        icon: "fas fa-eye",
        value: views.toLocaleString(),
        label: "Portfolio Views",
        description: "Live visitor count from Firestore analytics.",
        trend: "Live from Firestore",
        trendIcon: "fas fa-chart-line",
        trendClass: "up",
        color: "#3b82f6",
      });
    } catch (error) {
      console.error("Failed to load portfolio views:", error);
    }

    this.setupEventListeners();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
    this.removeEventListeners();
  },

  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },

    nextStat() {
      if (!this.localStats.length) return;
      this.index = (this.index + 1) % this.localStats.length;
    },

    prevStat() {
      if (!this.localStats.length) return;
      this.index = (this.index - 1 + this.localStats.length) % this.localStats.length;
    },

    handleWheel(e) {
      if (this.scrollThrottle) return;

      this.scrollThrottle = true;

      setTimeout(() => {
        this.scrollThrottle = false;
      }, 300);

      if (e.deltaY > 0) {
        this.nextStat();
      } else {
        this.prevStat();
      }
    },

    handleTouchStart(e) {
      this.touchStartY = e.touches[0].clientY;
    },

    handleTouchEnd(e) {
      const endY = e.changedTouches[0].clientY;
      const diff = this.touchStartY - endY;

      if (Math.abs(diff) > 30) {
        if (diff > 0) {
          this.nextStat();
        } else {
          this.prevStat();
        }
      }
    },

    setupEventListeners() {
      const card = this.$el.querySelector(".stat-card");

      if (card) {
        card.addEventListener("wheel", this.handleWheel, { passive: true });
        card.addEventListener("touchstart", this.handleTouchStart, { passive: true });
        card.addEventListener("touchend", this.handleTouchEnd, { passive: true });
      }
    },

    removeEventListeners() {
      const card = this.$el.querySelector(".stat-card");

      if (card) {
        card.removeEventListener("wheel", this.handleWheel);
        card.removeEventListener("touchstart", this.handleTouchStart);
        card.removeEventListener("touchend", this.handleTouchEnd);
      }
    },
  },
};
</script>

<style scoped>
.section-header.has-link {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.view-all-link {
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: var(--text);
}

.dev-stats-section {
  margin: 0;
}

.section-header {
  margin-bottom: 1.5rem;
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
  text-align: left;
}

.stats-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.stat-card {
  width: 100%;
  min-height: 220px;
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  padding: 1.75rem;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.stat-card:hover {
  border-color: var(--text-muted);
}

.stat-content {
  width: 100%;
}

.stat-top {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.35rem;
}

.stat-indicator {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: "SF Mono", monospace;
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding: 0.2rem 0.65rem;
  background: var(--surface-soft);
  border-radius: 999px;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.current-index {
  font-weight: 700;
  color: var(--text);
}

.stat-label-wrap {
  min-width: 0;
  flex: 1;
  padding-top: 0.1rem;
}

.stat-label {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  line-height: 1.3;
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
  word-break: normal;
}

.stat-description {
  margin: 0.35rem 0 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.stat-main {
  display: flex;
  align-items: center;
  margin-bottom: 1.55rem;
}

.value-display {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  min-width: 0;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  border-radius: 999px;
  background: var(--surface-soft);
  border: 1px solid var(--border);
}

.value-container {
  min-width: 0;
}

.value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.value-number {
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1;
  letter-spacing: -0.03em;
}

.value-unit {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
}

.trend {
  margin-top: 0.6rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.7rem;
  background: var(--surface-soft);
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  width: fit-content;
  border: 1px solid var(--border);
  white-space: nowrap;
  color: var(--text-secondary);
}

.trend i {
  font-size: 0.72rem;
}

.stat-navigation {
  border-top: 1px solid var(--border);
  padding-top: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.nav-dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.nav-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--border);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background 0.2s ease;
}

.nav-dot:hover {
  background: var(--text-muted);
}

.nav-dot.active {
  background: var(--text);
}

.nav-hint {
  flex-shrink: 0;
  margin-left: auto;
}

.hint-text {
  font-size: 0.78rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  white-space: nowrap;
}

.hint-text i {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.fade-slide-enter-active {
  animation: fadeIn 0.25s ease;
}

.fade-slide-leave-active {
  animation: fadeOut 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

.stat-card:focus-visible,
.nav-dot:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .dev-stats-section {
    margin: 0;
  }

  .section-header {
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .stat-card {
    min-height: auto;
    padding: 1.35rem;
    border-radius: var(--radius);
  }

  .stat-top {
    flex-direction: column;
    gap: 0.85rem;
    margin-bottom: 1.25rem;
  }

  .stat-label {
    font-size: 1rem;
  }

  .stat-main {
    margin-bottom: 1.35rem;
  }

  .value-display {
    gap: 1rem;
  }

  .stat-icon {
    width: 2.75rem;
    height: 2.75rem;
    font-size: 1.45rem;
  }

  .value-number {
    font-size: 2.25rem;
  }

  .value-unit {
    font-size: 1.05rem;
  }

  .stat-navigation {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9rem;
  }

  .nav-hint {
    margin-left: 0;
    order: 1;
  }

  .nav-dots {
    order: 2;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 1.15rem;
  }

  .value-display {
    align-items: flex-start;
  }

  .value-number {
    font-size: 2rem;
  }

  .trend {
    font-size: 0.78rem;
    white-space: normal;
  }

  .hint-text {
    white-space: normal;
  }
}
</style>