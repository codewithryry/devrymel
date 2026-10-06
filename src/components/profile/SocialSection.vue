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
        v-if="unavailableSocialLinks.length > 0"
        @click="$emit('openUnavailableSocialModal', 'All Platforms')"
      >
        <div class="social-icon">
          <i class="fas fa-ellipsis-h"></i>
        </div>
        <span class="social-label">More</span>
        <span class="social-status">{{ unavailableSocialLinks.length }} coming soon</span>
      </div>
    </div>
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
  emits: ['openUnavailableSocialModal']
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
