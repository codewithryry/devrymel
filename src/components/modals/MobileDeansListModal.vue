<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <transition name="slide-up">
    <div class="mobile-modal-overlay" @click="$emit('close')">
      <div class="mobile-modal profile-modal deans-modal" @click.stop>
        <div class="mobile-modal-header">
          <h3 class="mobile-modal-title">Dean's List Awards</h3>
          <button class="mobile-modal-close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mobile-deans-content">
          <p class="mobile-modal-desc">Academic excellence across semesters.</p>
          
          <div class="mobile-deans-list">
            <div class="mobile-deans-item" 
                 v-for="(item, index) in deansList" 
                 :key="'mobile-' + index"
                 @click="$emit('openItem', index)">
              <div class="mobile-deans-icon">
                <ListThumb shape="portrait" />
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

        <!-- Sponsored footer: pinned to the bottom of the popup -->
        <AdSlot class="profile-modal-footer" type="banner" />
      </div>
    </div>
  </transition>
</template>

<script>
import AdSlot from '@/components/AdSlot.vue'
import ListThumb from '@/components/modals/ListThumb.vue'

export default {
  name: 'MobileDeansListModal',
  components: {
    AdSlot,
    ListThumb
  },
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
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
}

.mobile-modal {
  background: var(--surface);
  width: 100%;
  max-height: 85vh;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-bottom: none;
  animation: modalSlideUp 0.3s ease;
}

.mobile-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.mobile-modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
}

.mobile-modal-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: background 0.2s ease, color 0.2s ease;
}

.mobile-modal-close:active {
  background: var(--accent);
  color: var(--bg);
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
  background: var(--surface-soft);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.mobile-deans-description i {
  color: var(--text);
  font-size: 1.5rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.mobile-deans-description p {
  color: var(--text);
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
  background: var(--surface-soft);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.mobile-deans-item:active {
  border-color: var(--text);
}

.mobile-deans-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
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
  color: var(--text);
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
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
}

.gwa-badge {
  background: var(--surface-hover);
  color: var(--success);
}

.gwa-badge i {
  color: var(--success);
  font-size: 0.7rem;
}

.year-level {
  background: var(--surface-hover);
  color: var(--accent);
}

.year-level i {
  color: var(--accent);
  font-size: 0.7rem;
}

.arrow-icon {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@media (min-width: 768px) {
  .mobile-modal-overlay {
    align-items: center;
    background: rgba(15, 23, 42, 0.75);
  }

  .mobile-modal {
    width: 95%;
    max-width: 1000px;
    max-height: 85vh;
    border-radius: var(--radius-lg);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-xl);
    animation: none;
  }
}

@keyframes modalSlideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Short plain description under the title (like the Certifications popup) */
.mobile-modal-desc {
  margin: 0 0 1rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.5;
}


</style>