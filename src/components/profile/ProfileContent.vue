<template>
  <div>
    <!-- MOBILE LAYOUT -->
    <div class="mobile-profile-content">
      <!-- Profile Header -->
      <div class="mobile-header">
        <div class="mobile-profile-frame">
          <div class="profile-glow"></div>
          <img :src="profile.image" alt="Reymel Mislang" class="profile-image" />
        </div>
        
        <div class="mobile-identity">
          <h2 class="mobile-name">
            <span class="name-first">Reymel</span>
            <span class="name-last">Mislang</span>
          </h2>

          <div class="mobile-title">
            <i class="fas fa-terminal"></i>
            <span></span>
          </div>

        <!-- CENTERED BADGES SECTION -->
        <div class="mobile-badges-section">
          <div class="badge-instructions">
            <span>Tap to explore</span>
          </div>
          <div class="center-badges">
            <div class="inline-badge deans" 
                @click="openMobileDeansList" 
                title="Dean's List Awards">
              <i class="fas fa-trophy"></i>
              <span class="badge-label">Awards</span>
            </div>
            <div class="inline-badge certs" 
                @click="$emit('open-certificates')" 
                title="Certificates">
             <i class="fas fa-award"></i>
              <span class="badge-label">Certs</span>
            </div>
            <div class="inline-badge links" 
                @click="$emit('openLinks')" 
                title="Project Links">
              <i class="fas fa-link"></i>
              <span class="badge-label">Links</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- About Section (without title) -->
      <div class="mobile-card about-card">
        <div class="card-content">
        <p class="statement-text">
          I build modern web applications and progressive web apps (PWA) using AI tools, modern technologies, and vibe coding.
          My focus is on turning ideas into real, functional systems that people can actually use.
        </p>
        <p class="statement-text">
          I enjoy learning new technologies, improving my skills every day, and creating digital projects for freelance work,
          affiliate systems, and real-world applications. My goal is to build useful, simple, and practical solutions that
          help people and create real value.
        </p>
          <div class="mobile-contact-section">
            <div class="mobile-contact-grid"> 
              <!-- Improved Mobile Contact Section -->
              <a href="mailto:reymelrey.mislang@gmail.com" target="_blank" class="mobile-contact-item email">
                <div class="contact-left">
                  <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact-text">
                    <span class="contact-title">Email Me</span>
                    <span class="contact-sub">Let's collaborate</span>
                  </div>
                </div>
                <i class="fas fa-arrow-right contact-arrow"></i>
              </a>

              <a href="https://www.messenger.com/t/reymelrey.528191/" target="_blank" class="mobile-contact-item messenger">
                <div class="contact-left">
                  <div class="contact-icon">
                    <i class="fab fa-facebook-messenger"></i>
                  </div>
                  <div class="contact-text">
                    <span class="contact-title">Messenger</span>
                    <span class="contact-sub">Fastest response</span>
                  </div>
                </div>
                <i class="fas fa-arrow-right contact-arrow"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DESKTOP LAYOUT -->
    <section class="profile-section desktop-profile-content">
      <!-- Mobile Optimization Notice -->
      <div class="mobile-optimization-notice" v-if="showNotice">
        <div class="notice-content">
         
          <div class="notice-text">
            <strong>Mobile Optimized:</strong> This portfolio is best viewed on mobile for optimal experience
          </div>
          <a class="notice-close" @click.prevent="hideNotice">
            <i class="fas fa-times"></i>
          </a>
        </div>
      </div>
      
      <div class="profile-brand-card">
        <!-- Left Column: Visual Identity -->
        <div class="brand-visual">
          <!-- Desktop Name Display -->
          <div class="desktop-name-display">
            <h2 class="desktop-name">
              <span class="name-first">Reymel</span>
              <span class="name-last">Mislang</span>
            </h2>
            <div class="desktop-subtitle">Not Full Stack Web Developer</div>
          </div>
          
          <div class="profile-frame">
            <div class="profile-glow"></div>
            <img :src="profile.image" alt="Reymel Mislang" class="profile-image" />
            <div class="image-overlay">
              <div class="overlay-gradient"></div>
            </div>
          </div>
          
          <!-- Tech Stack Chips -->
          <div class="tech-stack">
            <h4 class="stack-title">Core Technologies</h4>
            <div class="stack-chips">
              <div class="tech-chip" v-for="tech in techStack" :key="tech.name">
                <i :class="tech.icon"></i>
                <span>{{ tech.name }}</span>
              </div>
            </div>
          </div>
          
          <!-- Academic Honors Section - Only show latest 2 on desktop -->
          <div class="achievement-badges">
            <h4 class="achievement-title">DEAN LISTER AWARD</h4>
            <div class="badge-grid">
              <!-- Show only the latest 2 awards on desktop -->
              <div class="achievement-chip" 
                   v-for="(item, index) in latestTwoAchievements" 
                   :key="'chip-' + index"
                   @click="$emit('openDeansList', achievements.deansList.indexOf(item))">
                <div class="chip-icon">
                  <i class="fas fa-award"></i>
                </div>
                <div class="chip-content">
                  <span class="chip-semester">{{ item.title.split('|')[0].trim() }}</span>
                  <span class="chip-gwa">GWA {{ item.details[0].split(':')[1].trim() }}</span>
                </div>
              </div>
            </div>
            <!-- View All Link (Desktop only) -->
            <div class="view-all-link" @click="$emit('openDeansList', 0)">
              <i class="fas fa-chevron-right"></i>
              <span>View all {{ achievements.deansList.length }} awards</span>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Brand Narrative -->
        <div class="brand-narrative">     
          <!-- Brand Statement -->
          <div class="brand-statement">
          <p class="statement-text">
            I build modern web applications and progressive web apps (PWA) using AI tools, modern technologies, and vibe coding.
            My focus is on turning ideas into real, functional systems that people can actually use.
          </p>
          <p class="statement-text">
            I enjoy learning new technologies, improving my skills every day, and creating digital projects for freelance work,
            affiliate systems, and real-world applications. My goal is to build useful, simple, and practical solutions that
            help people and create real value.
          </p>
          </div>
             
          <!-- Contact Information -->
          <div class="brand-contact">
            <h4 class="contact-title">Get in Touch</h4>
            <div class="contact-grid">
              <!-- Email -->
              <a href="mailto:reymelrey.mislang@gmail.com" target="_blank" class="contact-item">
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-details">
                  <span class="contact-label">Email</span>
                  <span class="contact-value">Send an Email</span>
                </div>
                <i class="fas fa-external-link-alt contact-arrow"></i>
              </a>
              <!-- Messenger -->
              <a href="https://www.messenger.com/t/reymelrey.528191/" target="_blank" class="contact-item">
                <div class="contact-icon">
                  <i class="fab fa-facebook-messenger"></i>
                </div>
                <div class="contact-details">
                  <span class="contact-label">Messenger</span>
                  <span class="contact-value">Chat on Facebook</span>
                </div>
                <i class="fas fa-external-link-alt contact-arrow"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProfileContent',
  props: {
    profile: {
      type: Object,
      required: true
    },
    techStack: {
      type: Array,
      required: true
    },
    achievements: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showNotice: true
    }
  },
  computed: {
    // Get the latest 2 achievements for desktop display
    latestTwoAchievements() {
      if (!this.achievements.deansList) return [];
      // Return last 2 items from the array (assuming array is sorted with latest first)
      return this.achievements.deansList.slice(0, 2);
    }
  },
  emits: [
    'openDeansList', 
    'openMobileDeansList', 
    'openCertificatesListModal',
    'openLinks'
  ],
  methods: {
    openMobileDeansList() {
      this.$emit('openMobileDeansList');
    },
    openCertificatesListModal() {
      this.$emit('openCertificatesListModal');
    },
    hideNotice() {
      this.showNotice = false;
    }
  }
}
</script>

<style scoped>



/* Mobile Optimization Notice Styles */
.mobile-optimization-notice {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  animation: slideDown 0.5s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notice-content {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.notice-content i {
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px;
  border-radius: 50%;
}

.notice-text {
  flex: 1;
  text-align: center;
  font-size: 1.0rem;
  line-height: 1.4;
}

.notice-text strong {
  font-weight: 600;
}

.notice-close {
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



/* Desktop Name Display */
.desktop-name-display {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.desktop-name {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  background: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.desktop-name .name-first {
  color: #2d3748;
}

.desktop-name .name-last {
  color: #764ba2;
}

.desktop-subtitle {
  font-size: 1rem;
  color: #718096;
  font-weight: 500;
  margin-top: 5px;
  letter-spacing: 0.5px;
}

/* Make tech stack chips smaller */
.tech-stack {
  margin: 15px 0;
}

.stack-title {
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #4a5568;
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.tech-chip {
  padding: 6px 10px;
  font-size: 0.8rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #f6f8ff 0%, #f1f5ff 100%);
  border: 1px solid #e2e8f0;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.tech-chip i {
  font-size: 0.8rem;
  color: #667eea;
}

/* Achievement badges - Desktop (2 items only) */
.achievement-badges {
  margin-top: 15px;
}

.achievement-title {
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #4a5568;
  text-align: center;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}

.achievement-chip {
  padding: 8px 10px;
  font-size: 0.8rem;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.achievement-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.chip-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 0.9rem;
}

.chip-content {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  flex: 1;
}

.chip-semester {
  font-size: 0.75rem;
  font-weight: 600;
  color: #2d3748;
}

.chip-gwa {
  font-size: 0.7rem;
  color: #718096;
}

/* View All Link (Desktop only) */
.view-all-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #667eea;
  cursor: pointer;
  padding: 6px 0;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.view-all-link:hover {
  background: rgba(102, 126, 234, 0.05);
  color: #5a67d8;
  transform: translateX(3px);
}

.view-all-link i {
  font-size: 0.7rem;
  transition: transform 0.2s ease;
}

.view-all-link:hover i {
  transform: translateX(3px);
}

/* Existing mobile contact grid styles */
.mobile-contact-grid {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 95%;
}

.mobile-contact-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  color: #2d3748;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  width: 100%;
}

.mobile-contact-item:active {
  transform: scale(0.97);
}

.mobile-contact-item:hover {
  border-color: #667eea;
  box-shadow: 0 6px 18px rgba(102, 126, 234, 0.12);
}

.contact-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  background: #edf2ff;
  color: #667eea;
}

.contact-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.contact-title {
  font-size: 0.85rem;
  font-weight: 600;
}

.contact-sub {
  gap: 0.65rem;
  font-size: 0.9rem;
  color: #718096;
}

.contact-arrow {
  font-size: 0.75rem;
  color: #a0aec0;
  transition: transform 0.2s ease;
}

.mobile-contact-item:hover .contact-arrow {
  transform: translateX(4px);
  color: #667eea;
}

/* Color accents */
.mobile-contact-item.email .contact-icon {
  background: rgba(102, 126, 234, 0.12);
  color: #667eea;
}

.mobile-contact-item.messenger .contact-icon {
  background: rgba(0, 106, 255, 0.12);
  color: #006aff;
}

.mobile-contact-item.github .contact-icon {
  background: rgba(36, 41, 46, 0.12);
  color: #24292e;
}

/* Brand statement note */
.brand-statement .note {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #4a5568;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .mobile-optimization-notice {
    display: none !important;
  }
  
  .desktop-name-display {
    display: none;
  }
  
  /* Mobile shows all achievements */
  .badge-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  /* Hide "View all" link on mobile */
  .view-all-link {
    display: none;
  }
}

/* Desktop-only styles */
@media (min-width: 769px) {
  .profile-brand-card {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 30px;
  }
  
  .brand-visual {
    padding: 20px;
    border-radius: 16px;
    background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  }
  
  .profile-frame {
    width: 160px;
    height: 160px;
    margin: 0 auto 15px;
  }
  
  .profile-image {
    width: 150px;
    height: 150px;
  }
  
  /* Make everything in left column more compact */
  .brand-visual > *:not(:first-child) {
    margin-top: 15px;
  }
  
  /* Desktop: Show only 2 achievement chips */
  .badge-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Desktop: Show view all link */
  .view-all-link {
    display: flex;
  }
}
</style>
<style scoped>
/* Fixed badge click handlers */
.center-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.4rem;
  width: 100%;
}

.inline-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.inline-badge:active {
  transform: scale(0.9);
}

.inline-badge::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease;
}

.inline-badge:active::after {
  transform: translate(-50%, -50%) scale(20);
  opacity: 0;
}

/* Badge colors */
.inline-badge.deans {
  background: linear-gradient(135deg, #f6e05e, #d69e2e);
}

.inline-badge.certs {
  background: linear-gradient(135deg, #38a169, #2f855a);
}


.inline-badge.links {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  opacity: 0.9;
  box-shadow: 0 0 12px rgba(0, 198, 255, 0.45);
}
/* Fixed contact card UX */
.simple-contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.simple-contact-item:hover {
  background: white;
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.simple-contact-item:active {
  transform: translateY(0);
  transition: transform 0.1s ease;
}

.simple-contact-item .contact-icon {

  border-radius: 10px;
  background: white;
  display: flex;
  align-items: left;
  justify-content: left;
  border: 1px solid #e2e8f0;
}

.simple-contact-item span {
  flex: 1;
  text-align: left;
}

.contact-arrow {
  color: #a0aec0;
  font-size: 0.75rem;
  transition: all 0.3s ease;
}

.simple-contact-item:hover .contact-arrow {
  color: #667eea;
  transform: translateX(3px);
}

/* Color-specific icons */
.email-item .contact-icon {
  color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-color: rgba(102, 126, 234, 0.2);
}

.messenger-item .contact-icon {
  color: #006aff;
  background: linear-gradient(135deg, rgba(0, 106, 255, 0.1), rgba(0, 82, 204, 0.1));
  border-color: rgba(0, 106, 255, 0.2);
}

/* Mobile Layout Styles */
.mobile-profile-content {
  display: none;
}

@media (max-width: 768px) {
  .desktop-profile-content {
    display: none;
  }
  
  .mobile-profile-content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.5rem;
  }
  
  /* Mobile Header */
  .mobile-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .mobile-profile-frame {
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  
  .profile-glow {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
    border-radius: 20px;
    opacity: 0.2;
    z-index: 1;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    object-fit: cover;
    border: 4px solid white;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
  
  .profile-badge {
    top: -8px;
    right: -8px;
    z-index: 3;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #f6e05e, #d69e2e);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(214, 158, 46, 0.4);
    border: 2px solid white;
    cursor: pointer;
  }
  
  .profile-badge i {
    font-size: 0.8rem;
    margin-bottom: -2px;
  }
  
  .mobile-identity {
    flex: 1;
  }

  .mobile-identity {
  display: flex;
  flex-direction: column;
  align-items: center;   /* 🔥 this centers children */
  width: 100%;
}

  
  .mobile-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 0.5rem 0;
    line-height: 1.2;
    display: flex;
    flex-direction: column;
  }
  
  .name-first {
    font-size: 1.8rem;
    font-weight: 700;
  }
  
  .name-last {
    font-size: 1.7rem;
    font-weight: 700;
    color: #4a5568;
    margin-top: -0.2rem;
  }
  
.mobile-title {
  display: flex;                 /* instead of inline-flex */
  align-items: left;
  justify-content: left;       /* center content */
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 10px;
  color: #667eea;
  font-weight: 700;
  margin: 0 auto;                /* 🔥 force horizontal centering */
  width: fit-content;            /* 🔥 content-based width */
}

.mobile-title span:empty::before {
  content: " ";          /* invisible space */
}
.mobile-title {
  min-width: 80px;       /* adjust size */
  justify-content: left;
  margin: 0 auto;
}

  
  .mobile-title i {
    font-size: 0.9rem;
  }
  
  /* Card Styles */
  .mobile-card {
    border-radius: 16px;
    padding: 1.25rem;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    color: #2d3748;
  }
  
  .card-header i {
    font-size: 1.2rem;
    color: #667eea;
  }
  
  .card-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    flex: 1;
  }
  
  /* About Card (no title) */
  .about-card .card-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .statement-text {
    font-size: 0.95rem;
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
    text-align: justify;
    text-justify: inter-word;
  }
  
  .statement-text .highlight {
    color: #667eea;
    font-weight: 600;
  }
  
  /* Tech Card */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .tech-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
  }
  
  .tech-item i {
    font-size: 1.2rem;
    color: #4a5568;
    width: 24px;
    text-align: center;
  }
  
  .tech-item span {
    font-size: 0.9rem;
    font-weight: 500;
    color: #2d3748;
  }
  
  /* Simple Contact Card */
  .simple-contact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

/* Desktop Layout Styles */
@media (min-width: 769px) {
  .mobile-profile-content {
    display: none !important;
  }
  
  .desktop-profile-content {
    display: block !important;
  }
  
  .profile-section {
    margin-bottom: 4rem;
  }
  
  .profile-brand-card {
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 0;
    min-height: 600px;
  }
  
  .brand-visual {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  
  .profile-frame {
    position: relative;
    width: 280px;
    height: 280px;
    margin-bottom: 2rem;
  }
  
  .profile-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
    border-radius: 24px;
    opacity: 0.3;
    z-index: 1;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    border: 8px solid white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    overflow: hidden;
    z-index: 3;
  }
  
  .overlay-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 20px;
  }
  
  .identity-badge {
    background: white;
    border-radius: 16px;
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
    border: 1px solid rgba(102, 126, 234, 0.1);
    position: relative;
    overflow: hidden;
    width: 63%;
    max-width: 320px;
  }
  
  .badge-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 2;
  }
  
  .identity-badge i {
    font-size: 2rem;
    color: #667eea;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .badge-info {
    flex: 1;
  }
  
  .badge-title {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
    line-height: 1.2;
    margin-bottom: 0.2rem;
  }
  
  .tech-stack {
    width: 100%;
    max-width: 320px;
    margin-bottom: 2rem;
  }
  
  .stack-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .stack-chips {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .tech-chip {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    cursor: default;
  }
  
  .tech-chip:hover {
    transform: translateY(-2px);
    border-color: #667eea;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
  }
  
  .tech-chip i {
    font-size: 1.2rem;
    color: #4a5568;
    width: 24px;
    text-align: center;
  }
  
  .tech-chip span {
    font-size: 0.85rem;
    font-weight: 500;
    color: #2d3748;
    line-height: 1.2;
  }
  
  .achievement-badges {
    width: 100%;
    max-width: 320px;
  }
  
  .achievement-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .badge-grid {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .achievement-chip {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(246, 224, 94, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .achievement-chip:hover {
    transform: translateX(5px);
    border-color: #f6e05e;
    box-shadow: 0 5px 15px rgba(246, 224, 94, 0.2);
  }
  
  .achievement-chip::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #f6e05e, #d69e2e);
    border-radius: 4px 0 0 4px;
  }
  
  .chip-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, #f6e05e, #d69e2e);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
    flex-shrink: 0;
  }
  
  .chip-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .chip-semester {
    font-size: 0.85rem;
    font-weight: 600;
    color: #2d3748;
    line-height: 1.2;
  }
  
  .chip-gwa {
    font-size: 0.75rem;
    color: #d69e2e;
    font-weight: 500;
  }
  
  .brand-narrative {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .brand-statement {
    line-height: 1.8;
    text-align: justify;
    hyphens: auto;
  }
  
  .statement-text {
    font-size: 1.1rem;
    color: #4a5568;
    margin-bottom: 1.5rem;
    line-height: 1.7;
    text-align: justify;
    text-justify: inter-word;
    letter-spacing: 0.01em;
  }
  
  .statement-text:last-child {
    margin-bottom: 0;
  }
  
  .statement-text .highlight {
    color: #667eea;
    font-weight: 600;
    position: relative;
    display: inline-block;
  }
  
  .statement-text .highlight::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
    border-radius: 2px;
    z-index: -1;
  }
  
  .brand-contact {
    margin-top: 1rem;
  }
  
  .contact-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .contact-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  
  .contact-item:hover {
    background: white;
    border-color: #667eea;
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-size: 1.2rem;
    border: 1px solid #e2e8f0;
  }
  
  .contact-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .contact-label {
    font-size: 0.85rem;
    color: #718096;
    font-weight: 500;
  }
  
  .contact-value {
    font-size: 0.95rem;
    color: #2d3748;
    font-weight: 500;
    line-height: 1.2;
  }
  
  .contact-arrow {
    color: #a0aec0;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
  }
  
  .contact-item:hover .contact-arrow {
    transform: translateX(3px);
    color: #667eea;
  }
}
</style>




<style scoped>
/* ============================= */
/* MOBILE BADGES VISIBILITY FIX */
/* ============================= */

.mobile-badges-section{
  margin-top: 0.6rem;
  padding: 0;
  background: transparent;
  border: none;
}

/* ---- Tap to explore (subtle hint) ---- */
.badge-instructions{
  text-align:center;
  font-size:0.6rem;
  color: rgba(0,0,0,0.35);   /* softer */
  margin-bottom:0.8rem;
  letter-spacing:0.4px;
  font-style: italic;
  opacity:0.6;              /* less visible */
  user-select:none;
}

/* ---- Badge row ---- */
.center-badges{
  display:flex;
  align-items:center;
  gap:0.55rem;
}

/* ---- Badge base ---- */
.inline-badge{
  width:32px;
  height:32px;
  min-width:28px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition:all .2s ease;
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);  /* visibility boost */
  border:1px solid rgba(255,255,255,0.6);
}

/* ---- Icon ---- */
.inline-badge i{
  font-size:0.8rem;
  color:white;
}

/* ---- Labels hidden (compact mode) ---- */
.inline-badge .badge-label{
  display:none;
}

/* ---- Colors (high contrast but clean) ---- */
.inline-badge.deans{
  background: linear-gradient(135deg,#f6c453,#f0b429);
}

.inline-badge.certs{
  background: linear-gradient(135deg,#38a169,#2f855a);
}

.inline-badge.links{
  background: linear-gradient(135deg,#3182ce,#2563eb);
}

/* ---- Tap feedback ---- */
.inline-badge:active{
  transform:scale(.88);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  opacity:0.9;
}

/* ---- Desktop hidden ---- */
@media(min-width:769px){
  .mobile-badges-section{
    display:none;
  }
}

</style>




















<style scoped>
/* Mobile Layout Styles */
.mobile-profile-content {
  display: none;
}

@media (max-width: 768px) {
  .desktop-profile-content {
    display: none;
  }
  
  .mobile-profile-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: white;
    border-radius: 20px;
    padding: 2rem 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
  }
  
  .mobile-profile-frame {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto;
  }
  
  
  .profile-glow {
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
    border-radius: 20px;
    opacity: 0.25;
    z-index: 1;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    object-fit: cover;
    border: 6px solid white;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
  
  /* Compact Dean's List Badge */
  .mobile-deans-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 3;
    background: linear-gradient(135deg, #f6e05e, #d69e2e);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 6px 15px rgba(214, 158, 46, 0.4);
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid white;
  }
  
  .mobile-deans-badge:active {
    transform: scale(0.95);
    box-shadow: 0 4px 10px rgba(214, 158, 46, 0.6);
  }
  
  .badge-icon {
    font-size: 0.9rem;
    line-height: 1;
  }
  
  .badge-count {
    font-size: 0.65rem;
    font-weight: 700;
    line-height: 1;
    margin-top: -2px;
  }
  
  .mobile-identity {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .mobile-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
  }
  

  /* Small honors indicator */
  .mobile-honors-indicator {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.8rem;
    background: rgba(246, 224, 94, 0.1);
    border-radius: 10px;
    color: #d69e2e;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0 auto;
    border: 1px solid rgba(246, 224, 94, 0.2);
  }
  
  .mobile-honors-indicator:active {
    background: rgba(246, 224, 94, 0.2);
    transform: scale(0.98);
  }
  
  .mobile-honors-indicator i:first-child {
    color: #f6e05e;
  }
  
  .mobile-honors-indicator i:last-child {
    font-size: 0.7rem;
    margin-left: auto;
  }
  
  .mobile-about {
    padding: 0 0.5rem;
  }
  
  .mobile-statement-text {
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
    text-align: justify;
    margin-bottom: 1rem;
    text-justify: inter-word;
  }
  
  .mobile-statement-text:last-child {
    margin-bottom: 0;
  }
  
  .mobile-statement-text .highlight {
    color: #667eea;
    font-weight: 600;
  }
  
  .mobile-contact-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .mobile-contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  
  .mobile-contact-item:active {
    transform: scale(0.98);
    border-color: #667eea;
    background: white;
  }
  
  .mobile-contact-item .contact-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-size: 1.3rem;
  }
  
  .contact-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .contact-label {
    font-size: 0.85rem;
    color: #718096;
    font-weight: 500;
  }
  
  .contact-value {
    font-size: 0.95rem;
    color: #2d3748;
    font-weight: 500;
    line-height: 1.2;
    word-break: break-all;
  }
}

/* Desktop Layout Styles */
@media (min-width: 769px) {
  .mobile-profile-content {
    display: none !important;
  }
  
  .desktop-profile-content {
    display: block !important;
  }
  
  .profile-section {
    margin-bottom: 4rem;
  }
  
  .profile-brand-card {
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 0;
    min-height: 600px;
  }
  
  .brand-visual {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  
  .profile-frame {
    position: relative;
    width: 280px;
    height: 280px;
    margin-bottom: 2rem;
  }
  
  .profile-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
    border-radius: 24px;
    opacity: 0.3;
    z-index: 1;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    border: 8px solid white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    overflow: hidden;
    z-index: 3;
  }
  
  .overlay-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 20px;
  }
  
  .identity-badge {
    background: white;
    border-radius: 16px;
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
    border: 1px solid rgba(102, 126, 234, 0.1);
    position: relative;
    overflow: hidden;
    width: 63%;
    max-width: 320px;
  }
  
  .badge-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 2;
  }
  
  .identity-badge i {
    font-size: 2rem;
    color: #667eea;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .badge-info {
    flex: 1;
  }
  
  .badge-title {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
    line-height: 1.2;
    margin-bottom: 0.2rem;
  }
  
  .tech-stack {
    width: 100%;
    max-width: 320px;
    margin-bottom: 2rem;
  }
  
  .stack-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .stack-chips {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .tech-chip {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    cursor: default;
  }
  
  .tech-chip:hover {
    transform: translateY(-2px);
    border-color: #667eea;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
  }
  
  .tech-chip i {
    font-size: 1.2rem;
    color: #4a5568;
    width: 24px;
    text-align: center;
  }
  
  .tech-chip span {
    font-size: 0.85rem;
    font-weight: 500;
    color: #2d3748;
    line-height: 1.2;
  }
  
  .achievement-badges {
    width: 100%;
    max-width: 320px;
  }
  
  .achievement-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .badge-grid {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .achievement-chip {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(246, 224, 94, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .achievement-chip:hover {
    transform: translateX(5px);
    border-color: #f6e05e;
    box-shadow: 0 5px 15px rgba(246, 224, 94, 0.2);
  }
  
  .achievement-chip::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #f6e05e, #d69e2e);
    border-radius: 4px 0 0 4px;
  }
  
  .chip-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, #f6e05e, #d69e2e);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
    flex-shrink: 0;
  }
  
  .chip-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .chip-semester {
    font-size: 0.85rem;
    font-weight: 600;
    color: #2d3748;
    line-height: 1.2;
  }
  
  .chip-gwa {
    font-size: 0.75rem;
    color: #d69e2e;
    font-weight: 500;
  }
  
  .brand-narrative {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .brand-statement {
    line-height: 1.8;
    text-align: justify;
    hyphens: auto;
  }
  
  .statement-text {
    font-size: 1.1rem;
    color: #4a5568;
    margin-bottom: 1.5rem;
    line-height: 1.7;
    text-align: justify;
    text-justify: inter-word;
    letter-spacing: 0.01em;
  }
  
  .statement-text:last-child {
    margin-bottom: 0;
  }
  
  .statement-text .highlight {
    color: #667eea;
    font-weight: 600;
    position: relative;
    display: inline-block;
  }
  
  .statement-text .highlight::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
    border-radius: 2px;
    z-index: -1;
  }
  
  .brand-contact {
    margin-top: 1rem;
  }
  
  .contact-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .contact-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  
  .contact-item:hover {
    background: white;
    border-color: #667eea;
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-size: 1.2rem;
    border: 1px solid #e2e8f0;
  }
  
  .contact-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .contact-label {
    font-size: 0.85rem;
    color: #718096;
    font-weight: 500;
  }
  
  .contact-value {
    font-size: 0.95rem;
    color: #2d3748;
    font-weight: 500;
    line-height: 1.2;
  }
  
  .contact-arrow {
    color: #a0aec0;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
  }
  
  .contact-item:hover .contact-arrow {
    transform: translateX(3px);
    color: #667eea;
  }
}
</style>