<template>
  <section class="timeline-section">
    <div class="section-header">
      <h2 class="section-title">Career & Education Journey</h2>
    </div>
    
    <div class="timeline-container">
      <div class="timeline-line"></div>
      
      <div v-for="(item, index) in timeline" :key="index" class="timeline-item">
        <div class="timeline-marker">
          <div class="marker-dot"></div>
          <div class="marker-date">{{ formatDate(item.date) }}</div>
        </div>
        
        <div class="timeline-card" :class="{ 'right': index % 2 === 0 }">
          <div class="timeline-card-header">
            <h3 class="timeline-title">{{ item.title }}</h3>
          </div>
          
          <p class="timeline-description">{{ item.description }}</p>
          
          <div class="timeline-features" v-if="item.features">
            <div v-for="(feature, fIndex) in item.features.slice(0, 3)" :key="fIndex" class="feature-item">
              <i class="fas fa-check-circle"></i>
              <span>{{ feature }}</span>
            </div>
          </div>
          
          <div class="timeline-tags" v-if="item.tags">
            <span v-for="tag in item.tags.slice(0, 4)" :key="tag" class="tag">
              {{ tag }}
            </span>
            <span v-if="item.tags.length > 4" class="tag more">
              +{{ item.tags.length - 4 }}
            </span>
          </div>
          
          <div class="timeline-actions" v-if="item.link">
            <a :href="item.link" target="_blank" class="action-link">
              View Details <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CareerTimeline",
  props: {
    timeline: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    formatDate(date) {
      if (date.toLowerCase() === 'present') return 'Present';
      return date;
    }
  }
}
</script>

<style scoped>
.timeline-section {
  padding: 2.5rem;
  margin: 3rem 0;
  position: relative;
  overflow: hidden;
}

.timeline-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;

}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
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
  color: #718096;
  font-size: 1.1rem;
  font-weight: 400;
}

.timeline-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    #667eea 10%, 
    #667eea 90%, 
    transparent 100%);
  z-index: 1;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 3;
}

.marker-dot {
  width: 16px;
  height: 16px;
  background: white;
  border: 3px solid #667eea;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.timeline-item:hover .marker-dot {
  transform: scale(1.2);
  box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.3);
}

.marker-date {
  font-size: 0.85rem;
  font-weight: 600;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  white-space: nowrap;
}

.timeline-card {
  width: calc(50% - 40px);
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
}

.timeline-card.right {
  margin-left: auto;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 20px;
  width: 0;
  height: 0;
  border-style: solid;
}

.timeline-card:not(.right)::before {
  right: -10px;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #f8fafc;
}

.timeline-card.right::before {
  left: -10px;
  border-width: 10px 10px 10px 0;
  border-color: transparent #f8fafc transparent transparent;
}

.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.timeline-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.timeline-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.3;
  flex: 1;
}

.timeline-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  white-space: nowrap;
}

.timeline-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.timeline-features {
  margin-bottom: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #2d3748;
}

.feature-item i {
  color: #38a169;
  font-size: 0.8rem;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: white;
  color: #4a5568;
  padding: 0.3rem 0.7rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

.tag.more {
  background: #f1f5f9;
  color: #718096;
  font-style: italic;
}

.timeline-actions {
  margin-top: 1rem;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.action-link:hover {
  gap: 0.7rem;
  color: #5a67d8;
}

/* Responsive Design */
@media (max-width: 992px) {
  .timeline-line {
    left: 30px;
  }
  
  .timeline-marker {
    left: 30px;
  }
  
  .timeline-card {
    width: calc(100% - 60px);
    margin-left: 60px !important;
  }
  
  .timeline-card::before {
    left: -10px !important;
    right: auto !important;
    border-width: 10px 10px 10px 0 !important;
    border-color: transparent #f8fafc transparent transparent !important;
  }
}

@media (max-width: 768px) {
  .timeline-section {
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .timeline-card {
    width: calc(100% - 50px);
    margin-left: 50px !important;
    padding: 1.25rem;
  }
  
  .timeline-card-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .timeline-section {
    padding: 1.25rem;
  }
  
  .section-title {
    font-size: 1.4rem;
  }
  
  .timeline-card {
    width: calc(100% - 40px);
    margin-left: 40px !important;
    padding: 1rem;
  }
}
</style>