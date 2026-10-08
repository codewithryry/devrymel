<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <section class="social-section">
    <h2 class="section-title">Let's Connect</h2>

    <div class="social-grid">
      <a
        v-for="link in availableSocialLinks"
        :key="link.id"
        :href="link.url"
        target="_blank"
        :class="['social-card', link.label.toLowerCase()]"
      >
        <div class="social-icon">
          <i :class="link.icon"></i>
        </div>
        <span class="social-label">{{ link.label }}</span>
      </a>

      <div
        class="social-card more-card"
        :class="{ active: showMore }"
        v-if="unavailableSocialLinks.length > 0"
        @click="openMore"
      >
        <div class="social-icon">
          <i :class="showMore ? 'fas fa-times' : 'fas fa-ellipsis-h'"></i>
        </div>
        <span class="social-label">{{ showMore ? 'Close' : 'More' }}</span>
        <span class="social-status">{{ unavailableSocialLinks.length }} coming soon</span>
      </div>
    </div>

    <!-- Desktop: coming-soon platforms open inline here (phones use the modal) -->
    <transition name="more-panel">
      <div v-if="showMore" class="more-panel">
        <p class="more-panel-note">
          <i class="fas fa-clock"></i>
          These platforms are being set up and will be available soon.
        </p>
        <div class="more-list-wrap">
          <ul class="more-list">
            <li v-for="link in unavailableSocialLinks" :key="link.id || link.label">
              <i :class="link.icon || 'fas fa-share-alt'"></i>
              <span>{{ link.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'SocialSection',
  props: {
    socialLinks: {
      type: Array,
      required: true
    },
    availableSocialLinks: {
      type: Array,
      required: true
    },
    unavailableSocialLinks: {
      type: Array,
      required: true
    }
  },
  emits: ['openUnavailableSocialModal'],
  data() {
    return {
      showMore: false
    }
  },
  methods: {
    openMore() {
      if (window.innerWidth > 768) {
        this.showMore = !this.showMore
      } else {
        this.$emit('openUnavailableSocialModal', 'All Platforms')
      }
    }
  }
}
</script>

<style scoped>
.social-section {
  margin: 0;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
  text-align: left;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (min-width: 769px) {
  .social-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease;
  min-height: 100px;
  cursor: pointer;
}

.social-card:hover {
  border-color: var(--text-muted);
}

.social-icon {
  font-size: 1.3rem;
  color: var(--text);
}

.social-label {
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
  color: var(--text);
}

.social-status {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.social-card.more-card {
  border-style: dashed;
}

.social-card.more-card.active {
  border-style: solid;
  border-color: var(--text-muted);
}

/* Inline coming-soon list (desktop) */
.more-panel {
  margin-top: 0.75rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.more-panel-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.85rem;
  color: var(--text-secondary);
  font-size: 0.82rem;
}

.more-panel-note i {
  color: var(--text-muted);
}

/* Plain cells divided by grid lines */
.more-list-wrap {
  overflow: hidden;
}

.more-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  /* Hide the outer top/left lines so only inner grid lines show */
  margin: -1px 0 0 -1px;
  padding: 0;
  list-style: none;
}

.more-list li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
  padding: 0.8rem 0.9rem;
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.82rem;
}

.more-list li i {
  width: 22px;
  flex-shrink: 0;
  color: var(--text);
  font-size: 1.15rem;
  text-align: center;
}

.more-list li span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.more-panel-enter-active,
.more-panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.more-panel-enter-from,
.more-panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 768px) {
  .more-panel {
    display: none;
  }
}

@media (min-width: 769px) {
  .social-section {
    margin-top: 1rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border);
  }
}

@media (max-width: 768px) {
  /* Pull up into the 3rem page gap so the line sits ~2.4rem below Quick Links */
  .social-section {
    margin-top: -0.6rem;
    padding-top: 1.2rem;
    border-top: 1px solid var(--border);
  }
}

/* Desktop shows one row of 5 (4 links + More); GitHub only on mobile */
@media (min-width: 769px) {
  .social-card.github {
    display: none;
  }
}
</style>
