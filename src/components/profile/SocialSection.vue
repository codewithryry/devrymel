<template>
  <section class="social-section">
    <h2 class="section-title">Connect Online</h2>
    <br>
    <div class="social-grid">
      <!-- Available Social Media -->
      <a v-for="link in availableSocialLinks" 
         :key="link.id"
         :href="link.url" 
         target="_blank"
         :class="['social-card', link.label.toLowerCase()]">
        <div class="social-icon">
          <i :class="link.icon"></i>
        </div>
        <span class="social-label">{{ link.label }}</span>
        <span class="social-status available">Available</span>
      </a>
      
      <!-- More Card for Unavailable Platforms -->
      <div class="social-card more-card" 
           v-if="unavailableSocialLinks.length > 0"
           @click="$emit('openUnavailableSocialModal', 'All Platforms')">
        <div class="social-icon">
          <i class="fas fa-ellipsis-h"></i>
        </div>
        <span class="social-label">More Platforms</span>
        <span class="social-status unavailable">{{ unavailableSocialLinks.length }} coming soon</span>
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
  margin-top: 3rem;
  margin-bottom: 0;   /* IMPORTANT: alisin gap sa baba */
}
@media (max-width: 768px) {
  .social-section {
    margin-top: 2rem;
    margin-bottom: 0;  /* walang extra gap */
  }
}

@media (max-width: 480px) {
  .social-section {
    margin-top: 1.5rem;
    margin-bottom: 0;  /* dikit pero clean */
  }
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


.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 769px) {
  .social-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-height: 140px;
  cursor: pointer;
}

.social-card:active:not(.more-card) {
  transform: scale(0.98);
}

.social-card:hover:not(.more-card) {
  transform: translateY(-5px);
  border-color: currentColor;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.social-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

/* Social media colors */
.facebook .social-icon { color: #1877f2; }
.twitter .social-icon { color: #1da1f2; }
.instagram .social-icon { color: #e4405f; }
.youtube .social-icon { color: #ff0000; }
.spotify .social-icon { color: #1db954; }
.linkedin .social-icon { color: #0077b5; }
.pinterest .social-icon { color: #bd081c; }
.tiktok .social-icon { color: #000000; }
.reddit .social-icon { color: #ff4500; }
.discord .social-icon { color: #7289da; }

.social-label {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.social-status {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
}

.social-status.available {
  background: rgba(56, 161, 105, 0.1);
  color: #38a169;
}

.social-status.unavailable {
  background: rgba(160, 174, 192, 0.1);
  color: #a0aec0;
}

/* More card */
.social-card.more-card {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border: 2px dashed #cbd5e0;
}

@media (max-width: 768px) {
  .social-card.more-card {
    grid-column: span 2;
  }
}

.social-card.more-card .social-icon {
  color: #718096;
}

.social-card.more-card .social-label {
  color: #4a5568;
}

.social-card.more-card:active {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
}

.social-card.more-card:hover {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
  border-color: #a0aec0;
  transform: translateY(-3px);
}


@media (max-width: 768px) {
  .social-section {
    margin-bottom: 1rem;   /* bawas gap sa ilalim */
  }
}

@media (max-width: 480px) {
  .social-section {
    margin-bottom: 0.5rem; /* mas dikit sa footer */
  }
}

</style>





