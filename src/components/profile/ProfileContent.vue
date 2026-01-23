<template>
  <div>
    <!-- MOBILE LAYOUT -->
    <div class="mobile-profile-content">
      <!-- Profile Image & Name -->
      <div class="mobile-profile-frame">
        <div class="profile-glow"></div>
        <img :src="profile.image" alt="Reymel Mislang" class="profile-image" />
      </div>
      
      <div class="mobile-identity">
        <h2 class="mobile-name">{{ profile.name }}</h2>
        <div class="mobile-title-badge">
          <i class="fas fa-terminal"></i>
          <span>Web Developer</span>
        </div>
        
        <!-- Small inline honors indicator -->
        <div class="mobile-honors-indicator" @click="$emit('openMobileDeansList')">
          <i class="fas fa-trophy"></i>
          <span>Dean's Lister ({{ achievements.deansList.length }} semesters)</span>
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>

      <!-- About Me -->
      <div class="mobile-about">
        <p class="mobile-statement-text">
          I specialize in building <span class="highlight">full-stack applications</span> that solve real-world problems 
          through clean architecture and thoughtful design.
        </p>
        <p class="mobile-statement-text">
          My approach combines technical excellence with user-centered design principles. I believe in writing 
          clean, maintainable code and creating solutions that are both elegant and efficient.
        </p>
        <p class="mobile-statement-text">
          Have a project in mind? Let's discuss how we can bring your ideas to life.
        </p>
      </div>

      <!-- Mobile Contact -->
      <div class="mobile-contact-section">
        <div class="mobile-contact-grid">
          <!-- Email -->
          <a href="mailto:reymelrey.mislang@gmail.com" target="_blank" class="mobile-contact-item">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="contact-info">
              <span class="contact-label">Email</span>
              <span class="contact-value">Send an Email</span>
            </div>
          </a>
          <!-- Messenger -->
          <a href="https://www.messenger.com/t/reymelrey.528191/" target="_blank" class="mobile-contact-item">
            <div class="contact-icon">
              <i class="fab fa-facebook-messenger"></i>
            </div>
            <div class="contact-info">
              <span class="contact-label">Messenger</span>
              <span class="contact-value">Chat on Facebook</span>
            </div>
          </a>
          <!-- GitHub -->
          <a href="https://github.com/codewithryry" target="_blank" class="mobile-contact-item">
            <div class="contact-icon">
              <i class="fab fa-github"></i>
            </div>
            <div class="contact-info">
              <span class="contact-label">GitHub</span>
              <span class="contact-value">View repositories</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- DESKTOP LAYOUT -->
    <section class="profile-section desktop-profile-content">
      <div class="profile-brand-card">
        <!-- Left Column: Visual Identity -->
        <div class="brand-visual">
          <div class="profile-frame">
            <div class="profile-glow"></div>
            <img :src="profile.image" alt="Reymel Mislang" class="profile-image" />
            <div class="image-overlay">
              <div class="overlay-gradient"></div>
            </div>
          </div>
          
          <!-- Identity Badge -->
          <div class="identity-badge">
            <div class="badge-content">
              <i class="fas fa-terminal"></i>
              <div class="badge-info">
                <span class="badge-title">Web Developer</span>
              </div>
            </div>
            <div class="badge-glow"></div>
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
          
          <!-- Academic Honors Section -->
          <div class="achievement-badges">
            <h4 class="achievement-title">DEAN LISTER AWARD</h4>
            <div class="badge-grid">
              <div class="achievement-chip" 
                   v-for="(item, index) in achievements.deansList" 
                   :key="'chip-' + index"
                   @click="$emit('openDeansList', index)">
                <div class="chip-icon">
                  <i class="fas fa-award"></i>
                </div>
                <div class="chip-content">
                  <span class="chip-semester">{{ item.title.split('|')[0].trim() }}</span>
                  <span class="chip-gwa">GWA {{ item.details[0].split(':')[1].trim() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Brand Narrative -->
        <div class="brand-narrative">     
          <!-- Brand Statement -->
          <div class="brand-statement">
            <p class="statement-text">
              I specialize in building <span class="highlight">full-stack applications</span> that solve real-world problems 
              through clean architecture and thoughtful design. With expertise in both frontend and backend 
              development, I create digital experiences that are not just functional, but intuitive and scalable.
            </p>
            <p class="statement-text">
              My approach combines technical excellence with user-centered design principles. I believe in writing 
              clean, maintainable code and creating solutions that are both elegant and efficient. Continuous learning 
              and staying updated with the latest technologies are key aspects of my professional journey.
            </p>
            <p class="statement-text">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
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
              <!-- GitHub -->
              <a href="https://github.com/codewithryry" target="_blank" class="contact-item">
                <div class="contact-icon">
                  <i class="fab fa-github"></i>
                </div>
                <div class="contact-details">
                  <span class="contact-label">GitHub</span>
                  <span class="contact-value">View my repositories</span>
                </div>
                <i class="fas fa-external-link-alt contact-arrow"></i>
              </a>
              <!-- Portfolio -->
              <a href="https://reymelreymislang.vercel.app" target="_blank" class="contact-item">
                <div class="contact-icon">
                  <i class="fas fa-globe"></i>
                </div>
                <div class="contact-details">
                  <span class="contact-label">Portfolio</span>
                  <span class="contact-value">View my other portfolio</span>
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
  emits: ['openDeansList', 'openMobileDeansList']
}
</script>

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
  
  .mobile-title-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 12px;
    color: #667eea;
    font-weight: 500;
    font-size: 0.95rem;
    margin: 0 auto;
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
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-size: 1.3rem;
    border: 1px solid #e2e8f0;
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