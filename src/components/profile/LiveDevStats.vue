<template>
  <section class="dev-stats-section">
    <div class="section-header">
    <h3 class="section-title">Stats</h3>
    </div>

    <div class="stats-container">
      <div class="stat-card">
        <transition name="fade-slide" mode="out-in">
          <div :key="currentStat.id" class="stat-content">
            <!-- Stat Indicator -->
            <div class="stat-indicator">
              <span class="current-index">{{ index + 1 }}</span>
              <span class="total-stats">/{{ stats.length }}</span>
            </div>
            
            <!-- Main Content -->
            <div class="stat-main">
              <!-- Icon and Value -->
              <div class="value-display">
                <div class="stat-icon" :style="{ color: currentStat.color }">
                  <i :class="currentStat.icon"></i>
                </div>
                <div class="value-container">
                  <div class="value">
                    <span class="value-number">{{ currentStat.value }}</span>
                    <span class="value-unit" v-if="currentStat.unit">{{ currentStat.unit }}</span>
                  </div>
                  <div class="trend" :class="currentStat.trendClass">
                    <i :class="currentStat.trendIcon"></i>
                    <span>{{ currentStat.trend }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Label and Description -->
              <div class="stat-info">
                <h4 class="stat-label">{{ currentStat.label }}</h4>
                <p class="stat-description" v-if="currentStat.description">
                  {{ currentStat.description }}
                </p>
              </div>
            </div>
            
            <!-- Navigation -->
            <div class="stat-navigation">
              <div class="nav-dots">
                <button
                  v-for="(stat, i) in stats"
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
export default {
  name: "DevStats",
  props: {
    stats: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      index: 0,
      touchStartY: 0,
      scrollThrottle: false
    }
  },
  computed: {
    currentStat() {
      return this.stats[this.index]
    },
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  mounted() {
    this.setupEventListeners()
  },
  beforeUnmount() {
    this.removeEventListeners()
  },
  methods: {
    nextStat() {
      this.index = (this.index + 1) % this.stats.length
    },
    prevStat() {
      this.index = (this.index - 1 + this.stats.length) % this.stats.length
    },
    handleWheel(e) {
      if (this.scrollThrottle) return
      
      this.scrollThrottle = true
      setTimeout(() => {
        this.scrollThrottle = false
      }, 300)
      
      if (e.deltaY > 0) this.nextStat()
      else this.prevStat()
    },
    handleTouchStart(e) {
      this.touchStartY = e.touches[0].clientY
    },
    handleTouchEnd(e) {
      const endY = e.changedTouches[0].clientY
      const diff = this.touchStartY - endY
      
      if (Math.abs(diff) > 30) {
        if (diff > 0) this.nextStat()
        else this.prevStat()
      }
    },
    setupEventListeners() {
      const card = this.$el.querySelector('.stat-card')
      if (card) {
        card.addEventListener('wheel', this.handleWheel)
        card.addEventListener('touchstart', this.handleTouchStart)
        card.addEventListener('touchend', this.handleTouchEnd)
      }
    },
    removeEventListeners() {
      const card = this.$el.querySelector('.stat-card')
      if (card) {
        card.removeEventListener('wheel', this.handleWheel)
        card.removeEventListener('touchstart', this.handleTouchStart)
        card.removeEventListener('touchend', this.handleTouchEnd)
      }
    }
  }
}
</script>

<style scoped>
.dev-stats-section {
  margin: 3rem 0;

}

.section-header {
  margin-bottom: 2rem;

}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 0.5rem;
  background: black;
  text-align: left;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}


.section-subtitle {
  font-size: 1rem;
  color: #6B7280;
  font-weight: 400;
}

/* Stats Container */
.stats-container {
  max-width: 90rem;
  margin: 0 auto;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: box-shadow 0.2s ease;
  cursor: pointer;
}

.stat-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stat-indicator {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: 'SF Mono', monospace;
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 1.5rem;
  padding: 0.25rem 0.75rem;
  background: #F9FAFB;
  border-radius: 1rem;
  border: 1px solid #E5E7EB;
}

.current-index {
  font-weight: 600;
  color: #111827;
}

/* Main Content */
.stat-main {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.value-display {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.stat-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.value-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.value-number {
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  line-height: 1;
}

.value-unit {
  font-size: 1.5rem;
  font-weight: 600;
  color: #6B7280;
}

.trend {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: #F9FAFB;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  width: fit-content;
  border: 1px solid #E5E7EB;
}

.trend.up {
  color: #059669;
}

.trend i {
  font-size: 0.75rem;
}

/* Stat Info */
.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.stat-description {
  font-size: 1rem;
  color: #6B7280;
  line-height: 1.5;
  margin: 0;
}

/* Navigation */
.stat-navigation {
  border-top: 1px solid #E5E7EB;
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-dots {
  display: flex;
  gap: 0.5rem;
}

.nav-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #D1D5DB;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.nav-dot:hover {
  background: #9CA3AF;
}

.nav-dot.active {
  background: #4F46E5;
  transform: scale(1.2);
}

.nav-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hint-text {
  font-size: 0.875rem;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hint-text i {
  font-size: 0.875rem;
  color: #9CA3AF;
}

/* Animations */
.fade-slide-enter-active {
  animation: fadeIn 0.3s ease;
}

.fade-slide-leave-active {
  animation: fadeOut 0.3s ease;
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

/* Responsive Design */
@media (max-width: 768px) {
  .dev-stats-section {
    margin: 2rem 0;
  }
  

  
  .stat-card {
    padding: 1.5rem;
  }
  
  .stat-main {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .value-display {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .value-number {
    font-size: 2.5rem;
    align-items: center;
  }
  
  .stat-icon {
    font-size: 2rem;
  }
  
  .stat-navigation {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .nav-dots {
    order: 2;
  }
  
  .nav-hint {
    order: 1;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 1.25rem;
  }
  
  .value-number {
    font-size: 2rem;
  }
  
  .value-unit {
    font-size: 1.25rem;
  }
  
  .stat-label {
    font-size: 1.125rem;
  }
  
  .stat-description {
    font-size: 0.9375rem;
  }
}

/* Accessibility */
.stat-card:focus-visible {
  outline: 2px solid #4F46E5;
  outline-offset: 2px;
}

.nav-dot:focus-visible {
  outline: 2px solid #4F46E5;
  outline-offset: 2px;
}


@media (max-width: 768px) {
  .stat-main,
  .value-display,
  .stat-info {
    text-align: left;
    align-items: flex-start;
  }
}



</style>