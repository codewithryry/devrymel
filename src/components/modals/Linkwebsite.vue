<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <transition name="slide-up">
    <div class="mobile-modal-overlay" @click="$emit('close')">
      <div class="mobile-modal profile-modal links-modal" @click.stop>
        <div class="mobile-modal-header">
          <h3 class="mobile-modal-title">Project Links</h3>
          <button class="mobile-modal-close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="mobile-link-content">
          <p class="mobile-modal-desc">Systems I've built and deployed.</p>

          <div class="mobile-link-list">
            <div
              class="mobile-link-item"
              :class="{ 'mobile-link-item-soon': !hasLink(site.link) }"
              v-for="site in links"
              :key="site.id"
              @click="openLink(site.link)"
            >
              <div class="mobile-link-icon">
                <i class="fas fa-globe"></i>
              </div>
              <div class="mobile-link-info">
                <h4>{{ site.title }}</h4>
                <span
                  v-if="!hasLink(site.link) && site.title.trim().toLowerCase() !== 'coming soon'"
                  class="mobile-link-status"
                >Coming Soon</span>
              </div>
              <i v-if="hasLink(site.link)" class="fas fa-chevron-right arrow-icon"></i>
              <span v-else class="mobile-link-status-icon" aria-hidden="true">...</span>
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

export default {
  name: 'LinkWebsiteModal',
  components: {
    AdSlot
  },
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    hasLink(link) {
      return typeof link === 'string' && link.trim().length > 0
    },
    openLink(link) {
      if (!this.hasLink(link)) return
      window.open(link.trim(), '_blank')
    }
  }
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

.mobile-link-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-link-description {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface-soft);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.mobile-link-description i {
  color: var(--text);
  font-size: 1.5rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.mobile-link-description p {
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.mobile-link-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.mobile-link-item {
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

.mobile-link-item:active {
  border-color: var(--text);
}

.mobile-link-icon {
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

.mobile-link-info {
  flex: 1;
  text-align: left;
  min-width: 0;
}

.mobile-link-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-link-status {
  display: block;
  margin-top: 0.2rem;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.mobile-link-item-soon {
  cursor: default;
}

.mobile-link-status-icon {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.arrow-icon {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
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

/* Desktop: centered dialog instead of a full-width bottom sheet */
@media (min-width: 768px) {
  .mobile-modal-overlay {
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  }

  .mobile-modal {
    width: 95%;
    max-width: 1000px;
    max-height: 80vh;
    border-radius: var(--radius-lg);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-xl);
    animation: none;
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
