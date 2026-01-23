<template>
  <section class="services-section">
    <h2 class="section-title">Services</h2>
    
    <div class="services-carousel-container">
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
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            
            <div class="service-features">
              <div v-for="feature in service.features" :key="feature" class="feature-item">
                <i class="fas fa-check"></i>
                <span>{{ feature }}</span>
              </div>
            </div>
            
            <div class="service-tech">
              <span v-for="tech in service.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
            
            <div class="service-actions">
              <a 
                href="mailto:reymelrey.mislang@gmail.com?subject=Inquiry%20About%20{{ encodeURIComponent(service.title) }}" 
                class="service-button"
              >
                <i class="fas fa-envelope"></i>
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="carousel-controls">
        <button @click="prevService" class="slider-btn prev-btn" aria-label="Previous service">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="slider-dots">
          <span 
            v-for="(service, index) in visibleServices" 
            :key="service.id"
            @click="goToService(index)"
            :class="{ active: currentIndex === index }"
            class="dot"
            :aria-label="`Go to service ${index + 1}`"
          ></span>
        </div>
        
        <button @click="nextService" class="slider-btn next-btn" aria-label="Next service">
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
      currentIndex: 1, // Start with middle card as active
      translateValue: 0,
      isTransitioning: false
    }
  },
  computed: {
    visibleServices() {
      // Show 3 cards at a time
      const total = this.services.length;
      let visible = [];
      
      for (let i = -1; i <= 1; i++) {
        let index = (this.currentIndex + i + total) % total;
        visible.push(this.services[index]);
      }
      
      return visible;
    }
  },
  methods: {
    getCardPosition(index) {
      const diff = index - this.currentIndex;
      const total = this.services.length;
      
      // Normalize difference to handle circular array
      let normalizedDiff = diff;
      if (Math.abs(diff) > total / 2) {
        normalizedDiff = diff > 0 ? diff - total : diff + total;
      }
      
      if (normalizedDiff === -1) return 'left';
      if (normalizedDiff === 1) return 'right';
      return 'center';
    },
    
    nextService() {
      if (this.isTransitioning) return;
      
      this.isTransitioning = true;
      this.currentIndex = (this.currentIndex + 1) % this.services.length;
      this.animateTransition();
    },
    
    prevService() {
      if (this.isTransitioning) return;
      
      this.isTransitioning = true;
      this.currentIndex = (this.currentIndex - 1 + this.services.length) % this.services.length;
      this.animateTransition();
    },
    
    animateTransition() {
      // Calculate translate value for smooth sliding
      const cardWidth = 33.333; // Each card takes 1/3 of container
      this.translateValue = -this.currentIndex * cardWidth;
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    },
    
    goToService(index) {
      if (this.isTransitioning || index === this.currentIndex) return;
      
      this.isTransitioning = true;
      this.currentIndex = index;
      this.animateTransition();
    }
  },
  mounted() {
    // Initialize with correct position
    this.animateTransition();
  }
}
</script>

<style scoped>
.services-section {
  margin: 3rem 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  background: black;
  text-align: left;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.carousel-wrapper {
  overflow: hidden;
  margin: 0 auto;
  max-width: 1200px;
  padding: 2rem 0;
}

.services-carousel {
  display: flex;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 1rem;
  padding: 1rem;
}

.service-card {
  flex: 0 0 calc(33.333% - 0.67rem);
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0.7;
  transform: scale(0.9);
  filter: blur(2px);
}

.service-card.active {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
  z-index: 2;
}

.service-card.left {
  transform: translateX(-10%) scale(0.9);
  opacity: 0.8;
  filter: blur(1px);
}

.service-card.right {
  transform: translateX(10%) scale(0.9);
  opacity: 0.8;
  filter: blur(1px);
}

.service-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.5rem;
}

.service-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.service-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
  font-size: 0.95rem;
}

.service-features {
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #2d3748;
}

.feature-item i {
  color: #48bb78;
  font-size: 0.8rem;
}

.service-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.service-actions {
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}

.service-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  width: auto;
  min-width: 160px;
}

.service-button:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.slider-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #667eea;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.slider-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.slider-dots {
  display: flex;
  gap: 0.75rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #667eea;
  transform: scale(1.2);
}

.dot:hover {
  background: #cbd5e0;
}

/* Mobile and Tablet Responsive */
@media (max-width: 1024px) {
  .services-carousel {
    gap: 0.5rem;
  }
  
  .service-card {
    flex: 0 0 calc(33.333% - 0.33rem);
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  .carousel-wrapper {
    padding: 1rem 0;
  }
  
  .services-carousel {
    gap: 1rem;
  }
  
  .service-card {
    flex: 0 0 calc(50% - 0.5rem);
    opacity: 1;
    filter: none;
    transform: none !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .service-card.active {
    transform: none;
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.15);
  }
  
  .service-actions {
    padding: 0;
  }
  
  .service-button {
    width: 100%;
    max-width: 200px;
    padding: 0.75rem 1.5rem;
  }
  
  .carousel-controls {
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .slider-btn {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .services-carousel {
    gap: 0.75rem;
  }
  
  .service-card {
    flex: 0 0 100%;
    margin: 0 auto;
    max-width: 400px;
  }
  
  .carousel-controls {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .slider-dots {
    order: -1;
    width: 100%;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .service-button {
    max-width: 180px;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 0 0.5rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .service-card {
    padding: 1.25rem;
    margin: 0 0.5rem;
  }
  
  .service-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .service-title {
    font-size: 1.2rem;
  }
  
  .service-description {
    font-size: 0.9rem;
  }
  
  .slider-btn {
    width: 40px;
    height: 40px;
  }
  
  .service-button {
    padding: 0.7rem 1.25rem;
    font-size: 0.9rem;
    min-width: 140px;
  }
}

/* Animation for card transitions */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.service-card {
  animation: slideIn 0.3s ease-out;
}
</style>