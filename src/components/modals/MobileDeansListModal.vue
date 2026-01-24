<template>
  <transition name="slide-up">
    <div class="mobile-modal-overlay" @click="$emit('close')">
      <div class="mobile-modal" @click.stop>
        <div class="mobile-modal-header">
          <h3 class="mobile-modal-title">Dean's List Awards</h3>
          <button class="mobile-modal-close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mobile-deans-content">
          <div class="mobile-deans-description">
            <i class="fas fa-award"></i>
            <p>Academic achievements showcasing consistent excellence in academics across multiple semesters.</p>
          </div>
          
          <div class="mobile-deans-list">
            <div class="mobile-deans-item" 
                 v-for="(item, index) in deansList" 
                 :key="'mobile-' + index"
                 @click="$emit('openItem', index)">
              <div class="mobile-deans-icon">
                <i class="fas fa-medal"></i>
              </div>
              <div class="mobile-deans-info">
                <h4>{{ item.title.split('|')[0].trim() }}</h4>
                <div class="deans-details">
                  <span class="gwa-badge">
                    <i class="fas fa-chart-line"></i>
                    GWA {{ item.details[0].split(':')[1].trim() }}
                  </span>
                  <span class="year-level">
                    <i class="fas fa-user-graduate"></i>
                    {{ item.details[2].split(':')[1].trim() }}
                  </span>
                </div>
              </div>
              <i class="fas fa-chevron-right arrow-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MobileDeansListModal',
  props: {
    deansList: {
      type: Array,
      required: true
    }
  },
  emits: ['close', 'openItem']
}
</script>

<style scoped>
.mobile-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
}

.mobile-modal {
  background: white;
  width: 100%;
  max-height: 85vh;
  border-radius: 24px 24px 0 0;
  padding: 1.5rem;
  animation: modalSlideUp 0.3s ease;
}

.mobile-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
}

.mobile-modal-close {
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

.mobile-modal-close:active {
  background: #667eea;
  color: white;
  transform: rotate(90deg);
}

.mobile-deans-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-deans-description {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(246, 224, 94, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(246, 224, 94, 0.3);
}

.mobile-deans-description i {
  color: #d69e2e;
  font-size: 1.5rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.mobile-deans-description p {
  color: #2d3748;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.mobile-deans-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.mobile-deans-item {
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

.mobile-deans-item:active {
  transform: scale(0.98);
  background: white;
  border-color: #f6e05e;
}

.mobile-deans-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f6e05e, #d69e2e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.mobile-deans-info {
  flex: 1;
  text-align: left;
}

.mobile-deans-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.deans-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.gwa-badge, .year-level {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

.gwa-badge {
  background: rgba(56, 161, 105, 0.1);
  color: #38a169;
}

.gwa-badge i {
  color: #38a169;
  font-size: 0.7rem;
}

.year-level {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.year-level i {
  color: #667eea;
  font-size: 0.7rem;
}

.arrow-icon {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Animation */
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
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
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