<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <section class="services-section">
    <h2 class="section-title">Services</h2>
    
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
              'active': currentIndex === index,
              'left': getCardPosition(index) === 'left',
              'right': getCardPosition(index) === 'right'
            }"
            @click="goToService(index)"
          >
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            
            <!-- Features with limited display for side cards -->
            <div class="service-features">
              <div v-for="(feature, featureIndex) in service.features" 
                   :key="feature"
                   class="feature-item"
                   :class="{ 'hidden-feature': !isCardActive(index) && featureIndex >= 2 }">
                <i class="fas fa-check"></i>
                <span>{{ feature }}</span>
              </div>
            </div>      
            <!-- Action Button - More prominent on active card -->
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
            
            <!-- Pricing hint for active card -->
            <div v-if="currentIndex === index" class="pricing-hint">
              <i class="fas fa-tag"></i>
              <span>Custom pricing available</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Enhanced Carousel Controls -->
      <div class="carousel-controls">
        <button @click="prevService" class="slider-btn prev-btn" aria-label="Previous service">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="carousel-info">
          <span class="current-service">{{ currentIndex + 1 }}</span>
          <span class="service-separator">/</span>
          <span class="total-services">{{ services.length }}</span>
          <span class="service-name">{{ services[currentIndex].title }}</span>
        </div>
        
        <button @click="nextService" class="slider-btn next-btn" aria-label="Next service">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Simple View (No Carousel) -->
    <div v-else class="mobile-services-container">
      <div class="mobile-service-card">
        <h3 class="service-title">{{ services[currentIndex].title }}</h3>
        <p class="service-description">{{ services[currentIndex].description }}</p>
        
        <!-- All features visible on mobile -->
        <div class="service-features">
          <div v-for="feature in services[currentIndex].features" 
               :key="feature"
               class="feature-item">
            <i class="fas fa-check"></i>
            <span>{{ feature }}</span>
          </div>
        </div>
        
        <!-- Action Button -->
        <div class="service-actions">
          <a 
            :href="`mailto:reymelrey.mislang@gmail.com?subject=Inquiry%20About%20${encodeURIComponent(services[currentIndex].title)}`" 
            class="service-button active-button"
          >
            <i class="fas fa-envelope"></i>
            Get Started Now
          </a>
        </div>
        
        <!-- Pricing hint -->
        <div class="pricing-hint">
          <i class="fas fa-tag"></i>
          <span>Custom pricing available</span>
        </div>
      </div>

      <!-- Simple Mobile Controls -->
      <div class="mobile-carousel-controls">
        <button @click="prevService" class="mobile-slider-btn" aria-label="Previous service">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="mobile-carousel-info">
          <span class="current-service">{{ currentIndex + 1 }}</span>
          <span class="service-separator">/</span>
          <span class="total-services">{{ services.length }}</span>
          <span class="service-name">{{ services[currentIndex].title }}</span>
        </div>
        
        <button @click="nextService" class="mobile-slider-btn" aria-label="Next service">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
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
      currentIndex: 1,
      translateValue: 0,
      isTransitioning: false,
      autoRotateInterval: null,
      isMobile: false
    }
  },
  computed: {
    isCardActive() {
      return (index) => this.currentIndex === index;
    }
  },
  methods: {
    getCardPosition(index) {
      if (this.isMobile) return '';
      
      const diff = index - this.currentIndex;
      const total = this.services.length;
      
      let normalizedDiff = diff;
      if (Math.abs(diff) > total / 2) {
        normalizedDiff = diff > 0 ? diff - total : diff + total;
      }
      
      if (normalizedDiff < 0) return 'left';
      if (normalizedDiff > 0) return 'right';
      return 'center';
    },
    
    nextService() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex = (this.currentIndex + 1) % this.services.length;
      
      if (!this.isMobile) {
        this.animateTransition();
      } else {
        // Simple transition for mobile
        setTimeout(() => {
          this.isTransitioning = false;
        }, 300);
      }
    },
    
    prevService() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex = (this.currentIndex - 1 + this.services.length) % this.services.length;
      
      if (!this.isMobile) {
        this.animateTransition();
      } else {
        // Simple transition for mobile
        setTimeout(() => {
          this.isTransitioning = false;
        }, 300);
      }
    },
    
    animateTransition() {
      // Only for desktop
      if (this.isMobile) return;
      
      const cardWidth = 33.333;
      this.translateValue = -this.currentIndex * cardWidth + cardWidth;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 400);
    },
    
    goToService(index) {
      if (this.isMobile) return; // Disable click navigation on mobile
      if (this.isTransitioning || index === this.currentIndex) return;
      this.isTransitioning = true;
      this.currentIndex = index;
      this.animateTransition();
    },
    
    startAutoRotation() {
      // Only auto-rotate on desktop
      if (this.isMobile) return;
      
      this.autoRotateInterval = setInterval(() => {
        if (!this.isTransitioning) {
          this.nextService();
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
        // Switching to mobile - stop desktop animations
        this.stopAutoRotation();
      } else if (!this.isMobile && wasMobile) {
        // Switching to desktop - restart animations
        this.startAutoRotation();
      }
    }
  },
  mounted() {
    this.checkIfMobile();
    if (!this.isMobile) {
      this.animateTransition();
      this.startAutoRotation();
    }
    
    window.addEventListener('resize', this.checkIfMobile);
  },
  beforeUnmount() {
    this.stopAutoRotation();
    window.removeEventListener('resize', this.checkIfMobile);
  }
}
</script>

<style scoped>

/* Mobile Controls */
.mobile-carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center; /* Changed from space-between to center */
  gap: 1.5rem; /* Add gap between the buttons and info */
  margin-top: 1rem;
  padding: 0 0.5rem;
}

.mobile-slider-btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e2e8f0;
  color: #667eea;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* Prevent buttons from shrinking */
}

.mobile-slider-btn:active {
  background: #667eea;
  color: white;
  transform: scale(0.95);
}

.mobile-carousel-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  white-space: nowrap; /* Prevent text wrapping */
}

.mobile-carousel-info .service-name {
  display: none; /* Hidden on mobile to save space */
}


.services-section {
  margin-top: 3rem;
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


/* DESKTOP STYLES */
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
  
  /* Default state for side cards */
  opacity: 0.6;
  transform: scale(0.85);
  filter: blur(3px) brightness(0.95);
}

/* Left side card */
.service-card.left {
  opacity: 0.7;
  transform: translateX(-10%) scale(0.9);
  filter: blur(2px) brightness(0.97);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
}

/* Right side card */
.service-card.right {
  opacity: 0.7;
  transform: translateX(10%) scale(0.9);
  filter: blur(2px) brightness(0.97);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
}

/* Active center card */
.service-card.active {
  opacity: 1;
  transform: scale(1);
  filter: blur(0) brightness(1);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
  z-index: 10;
  border: 1px solid rgba(102, 126, 234, 0.3);
  min-height: 320px;
}

.service-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0.5rem 0 1rem 0;
  text-align: left;
  line-height: 1.3;
  padding-top: 0;
}

.service-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  text-align: left;
  font-size: 0.95rem;
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
  font-size: 0.9rem;
  color: #2d3748;
  transition: all 0.3s ease;
  line-height: 1.4;
}

.feature-item i {
  color: #48bb78;
  font-size: 0.8rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.hidden-feature {
  opacity: 0.5;
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
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 280px;
  font-size: 0.95rem;
}

.active-button {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.service-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.pricing-hint {
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

.current-service {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.service-separator {
  color: #cbd5e0;
  font-size: 1.2rem;
  line-height: 1;
}

.total-services {
  color: #a0aec0;
  font-size: 1rem;
  line-height: 1;
}

.service-name {
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
  color: #667eea;
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
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* MOBILE STYLES (SIMPLE SINGLE CARD) */
.mobile-services-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem 0;
}

.mobile-service-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
  margin: 0 auto 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 320px;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

/* FIXED: Mobile title and description now left-aligned */
.mobile-service-card .service-title {
  font-size: 1.3rem;
  text-align: left; /* Changed from center to left */
  margin: 0 0 1rem 0;
  font-weight: 700;
  color: #2d3748;
}

.mobile-service-card .service-description {
  text-align: left; /* Changed from center to left */
  margin-bottom: 1.5rem;
  min-height: 70px;
  color: #4a5568;
  line-height: 1.6;
  font-size: 0.95rem;
}

.mobile-service-card .feature-item {
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  text-align: left;
}

.mobile-service-card .service-actions {
  margin-top: 1.5rem;
}

.mobile-service-card .service-button {
  max-width: 100%;
}





/* Responsive Breakpoints */
@media (max-width: 768px) {

  
  /* Hide desktop controls on mobile */
  .carousel-controls,
  .carousel-wrapper {
    display: none;
  }
  
  /* Ensure mobile card text is left-aligned */
  .mobile-service-card .service-title,
  .mobile-service-card .service-description,
  .mobile-service-card .feature-item {
    text-align: left;
  }
}

@media (min-width: 769px) {
  /* Hide mobile view on desktop */
  .mobile-services-container {
    display: none;
  }
}

/* Extra Small Screens */
@media (max-width: 480px) {
  .mobile-service-card {
    padding: 1.25rem;
    min-height: 300px;
  }
  
  .mobile-service-card .service-title {
    font-size: 1.2rem;
  }
  
  .mobile-service-card .service-description {
    font-size: 0.9rem;
  }
  
  .mobile-slider-btn {
    width: 42px;
    height: 42px;
  }
}
</style>