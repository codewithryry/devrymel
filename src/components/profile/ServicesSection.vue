<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <section id="services" class="services-section">
    <div class="section-header">
      <div>
        <span class="section-kicker">What I Offer</span>
        <h2 class="section-title">Services</h2>
      </div>

      <!-- Mobile swipe hint -->
      <div class="swipe-hint">
        <span>Swipe for more..</span>
      </div>
    </div>
    
    <!-- Desktop Carousel View -->
    <div v-if="!isMobile" class="services-carousel-container">
      <div class="carousel-wrapper">
        <div 
          class="services-carousel"
          :style="{ transform: `translateX(${translateValue}%)` }"
        >
          <div 
            v-for="(service, index) in services" 
            :key="service.id"
            class="service-card"
            :class="{
              active: currentIndex === index,
              left: getCardPosition(index) === 'left',
              right: getCardPosition(index) === 'right'
            }"
            @click="goToService(index)"
          >
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            
            <div class="service-features">
              <div 
                v-for="(feature, featureIndex) in service.features" 
                :key="feature"
                class="feature-item"
                :class="{ 'hidden-feature': !isCardActive(index) && featureIndex >= 2 }"
              >
                <i class="fas fa-check"></i>
                <span>{{ feature }}</span>
              </div>
            </div>      

            <div class="service-actions">
              <a 
                :href="`mailto:reymelrey.mislang@gmail.com?subject=Inquiry%20About%20${encodeURIComponent(service.title)}`" 
                class="service-button"
                :class="{ 'active-button': currentIndex === index }"
              >
                <i class="fas fa-envelope"></i>
                {{ currentIndex === index ? 'Get Started Now' : 'Inquire Now' }}
              </a>
            </div>
            
            <div v-if="currentIndex === index" class="pricing-hint">
              <i class="fas fa-tag"></i>
              <span>Custom pricing available</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="carousel-controls">
        <button 
          @click="prevService" 
          class="slider-btn prev-btn" 
          aria-label="Previous service"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="carousel-info">
          <span class="current-service">{{ currentIndex + 1 }}</span>
          <span class="service-separator">/</span>
          <span class="total-services">{{ services.length }}</span>
          <span class="service-name">{{ services[currentIndex]?.title }}</span>
        </div>
        
        <button 
          @click="nextService" 
          class="slider-btn next-btn" 
          aria-label="Next service"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Single Card View -->
    <div v-else class="mobile-services-container">
      <transition :name="mobileTransitionName" mode="out-in">
        <article
          v-if="services.length"
          :key="services[currentIndex].id"
          class="mobile-service-card"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <h3 class="service-title">{{ services[currentIndex].title }}</h3>
          <p class="service-description">{{ services[currentIndex].description }}</p>
          
          <div class="service-features">
            <div 
              v-for="feature in services[currentIndex].features" 
              :key="feature"
              class="feature-item"
            >
              <i class="fas fa-check"></i>
              <span>{{ feature }}</span>
            </div>
          </div>
          
          <div class="service-actions">
            <a 
              :href="`mailto:reymelrey.mislang@gmail.com?subject=Inquiry%20About%20${encodeURIComponent(services[currentIndex].title)}`" 
              class="service-button active-button"
            >
              <i class="fas fa-envelope"></i>
              Get Started Now
            </a>
          </div>
          
          <div class="pricing-hint">
            <i class="fas fa-tag"></i>
            <span>Custom pricing available</span>
          </div>
        </article>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesSection",

  props: {
    services: {
      type: Array,
      required: true
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
    }
  },

  computed: {
    isCardActive() {
      return index => this.currentIndex === index
    },

    mobileTransitionName() {
      return this.swipeDirection === "next"
        ? "mobile-card-next"
        : "mobile-card-prev"
    }
  },

  methods: {
    getCardPosition(index) {
      if (this.isMobile) return ""
      
      const diff = index - this.currentIndex
      const total = this.services.length
      
      let normalizedDiff = diff

      if (Math.abs(diff) > total / 2) {
        normalizedDiff = diff > 0 ? diff - total : diff + total
      }
      
      if (normalizedDiff < 0) return "left"
      if (normalizedDiff > 0) return "right"

      return "center"
    },
    
    nextService() {
      if (this.isTransitioning || !this.services.length) return

      this.swipeDirection = "next"
      this.isTransitioning = true
      this.currentIndex = (this.currentIndex + 1) % this.services.length
      
      if (!this.isMobile) {
        this.animateTransition()
      } else {
        setTimeout(() => {
          this.isTransitioning = false
        }, 300)
      }
    },
    
    prevService() {
      if (this.isTransitioning || !this.services.length) return

      this.swipeDirection = "prev"
      this.isTransitioning = true
      this.currentIndex =
        (this.currentIndex - 1 + this.services.length) % this.services.length
      
      if (!this.isMobile) {
        this.animateTransition()
      } else {
        setTimeout(() => {
          this.isTransitioning = false
        }, 300)
      }
    },
    
    animateTransition() {
      if (this.isMobile) return
      
      const cardWidth = 33.333
      this.translateValue = -this.currentIndex * cardWidth + cardWidth

      setTimeout(() => {
        this.isTransitioning = false
      }, 400)
    },
    
    goToService(index) {
      if (this.isMobile) return
      if (this.isTransitioning || index === this.currentIndex) return

      this.swipeDirection = index > this.currentIndex ? "next" : "prev"
      this.isTransitioning = true
      this.currentIndex = index
      this.animateTransition()
    },
    
    startAutoRotation() {
      if (this.isMobile) return
      
      this.autoRotateInterval = setInterval(() => {
        if (!this.isTransitioning) {
          this.nextService()
        }
      }, 5000)
    },
    
    stopAutoRotation() {
      if (this.autoRotateInterval) {
        clearInterval(this.autoRotateInterval)
        this.autoRotateInterval = null
      }
    },
    
    checkIfMobile() {
      const wasMobile = this.isMobile
      this.isMobile = window.innerWidth <= 768
      
      if (this.isMobile && !wasMobile) {
        this.stopAutoRotation()
      } else if (!this.isMobile && wasMobile) {
        this.startAutoRotation()
      }
    },

    handleTouchStart(event) {
      this.touchStartX = event.changedTouches[0].screenX
    },

    handleTouchEnd(event) {
      this.touchEndX = event.changedTouches[0].screenX
      this.handleSwipeGesture()
    },

    handleSwipeGesture() {
      const swipeDistance = this.touchStartX - this.touchEndX

      if (Math.abs(swipeDistance) < 45) return

      if (swipeDistance > 0) {
        this.nextService()
      } else {
        this.prevService()
      }
    }
  },

  mounted() {
    this.checkIfMobile()

    if (!this.isMobile) {
      this.animateTransition()
      this.startAutoRotation()
    }
    
    window.addEventListener("resize", this.checkIfMobile)
  },

  beforeUnmount() {
    this.stopAutoRotation()
    window.removeEventListener("resize", this.checkIfMobile)
  }
}
</script>

<style scoped>
.services-section {
  margin: 0;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
  margin-bottom: 1.5rem;
}

.section-header > div {
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

/* Desktop styles */
.carousel-wrapper {
  overflow: hidden;
  margin: 0 auto;
  max-width: 1400px;
  padding: 1rem 0 3rem;
  position: relative;
}

.services-carousel {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 1.5rem;
  padding: 1rem;
  align-items: center;
}

.service-card {
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
  min-height: 280px;
  opacity: 0.55;
  transform: scale(0.94);
}

.service-card.left,
.service-card.right {
  opacity: 0.7;
  transform: scale(0.97);
}

.service-card.active {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
  border-color: var(--text);
  min-height: 300px;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin: 0.5rem 0 1rem 0;
  text-align: left;
  line-height: 1.3;
}

.service-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  text-align: left;
  font-size: 0.93rem;
  min-height: 60px;
}

.service-features {
  margin-bottom: 1.5rem;
  flex: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.88rem;
  color: var(--text);
  transition: opacity 0.3s ease;
  line-height: 1.4;
}

.feature-item i {
  color: var(--text-muted);
  font-size: 0.75rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.hidden-feature {
  opacity: 0.4;
}

.service-actions {
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
}

.service-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: var(--surface-soft);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease;
  width: 100%;
  max-width: 280px;
  font-size: 0.9rem;
}

.active-button {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

.service-button:hover {
  opacity: 0.85;
}

.pricing-hint {
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

.current-service {
  font-size: 1.3rem;
  color: var(--text);
  font-weight: 700;
  line-height: 1;
}

.service-separator {
  color: var(--border);
  font-size: 1.1rem;
  line-height: 1;
}

.total-services {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1;
}

.service-name {
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

/* Mobile single card style */
.mobile-services-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0.15rem 0 0.8rem;
  overflow: hidden;
}

.mobile-service-card {
  width: 100%;
  min-height: 320px;
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  touch-action: pan-y;
  user-select: none;
}

.mobile-service-card .service-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.7rem;
  color: var(--text);
  text-align: left;
}

.mobile-service-card .service-description {
  font-size: 0.9rem;
  line-height: 1.62;
  min-height: auto;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  text-align: left;
}

.mobile-service-card .service-features {
  margin-bottom: 1rem;
}

.mobile-service-card .feature-item {
  font-size: 0.86rem;
  margin-bottom: 0.55rem;
  text-align: left;
}

.mobile-service-card .service-button {
  max-width: 100%;
}

.mobile-service-card .pricing-hint {
  font-size: 0.8rem;
}

/* Mobile swipe direction effect */
.mobile-card-next-enter-active,
.mobile-card-next-leave-active,
.mobile-card-prev-enter-active,
.mobile-card-prev-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

/* Swipe left / next */
.mobile-card-next-enter-from {
  opacity: 0;
  transform: translateX(42px) scale(0.98);
}

.mobile-card-next-leave-to {
  opacity: 0;
  transform: translateX(-42px) scale(0.98);
}

/* Swipe right / previous */
.mobile-card-prev-enter-from {
  opacity: 0;
  transform: translateX(-42px) scale(0.98);
}

.mobile-card-prev-leave-to {
  opacity: 0;
  transform: translateX(42px) scale(0.98);
}

/* Normal state */
.mobile-card-next-enter-to,
.mobile-card-next-leave-from,
.mobile-card-prev-enter-to,
.mobile-card-prev-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Responsive */
@media (max-width: 768px) {
  .services-section {
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
  .mobile-services-container {
    display: none;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.35rem;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  .mobile-service-card {
    min-height: 305px;
    padding: 1.15rem;
  }
  
  .mobile-service-card .service-title {
    font-size: 1.05rem;
  }
  
  .mobile-service-card .service-description {
    font-size: 0.86rem;
  }

  .mobile-service-card .feature-item {
    font-size: 0.84rem;
  }
}

</style>