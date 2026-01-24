<template>
  <section class="links-section">
    <h2 class="section-title">Quick Links</h2>
    <br>
    
    <!-- Mobile View - Compact Horizontal Scroll -->
    <div class="mobile-links-container">
      <!-- Swipe hint text -->
      <div class="swipe-hint">
        <span>Swipe for more..</span>
      </div>
      
      <div class="mobile-links-scroll">

        <!-- Coffee Card -->
        <a href="https://buymeacoffee.com/reymelreym7" target="_blank" class="mobile-link-card">
          <div class="mobile-icon coffee">
            <i class="fas fa-coffee"></i>
          </div>
          <span class="mobile-label">Coffee</span>
          <small class="mobile-desc">Support my work</small>
        </a>

                <!-- QR Support Card -->
        <div class="mobile-link-card" @click="$emit('openQRModal')">
          <div class="mobile-icon qr">
            <i class="fas fa-qrcode"></i>
          </div>
          <span class="mobile-label">Support QR</span>
          <small class="mobile-desc">Multiple banks available</small>
        </div>
        
        
        <!-- Telegram Card -->
        <a href="https://t.me/+XpsVdhvIlVM4ZTA1" target="_blank" class="mobile-link-card">
          <div class="mobile-icon telegram">
            <i class="fab fa-telegram"></i>
          </div>
          <span class="mobile-label">Telegram</span>
          <small class="mobile-desc">Join community</small>
        </a>
        
        <!-- WakaTime Card (mobile only) -->
        <a href="https://wakatime.com/@codewithryry" target="_blank" class="mobile-link-card">
          <div class="mobile-icon stats">
            <i class="fas fa-chart-line"></i>
          </div>
          <span class="mobile-label">Stats</span>
          <small class="mobile-desc">Coding analytics</small>
        </a>

        <!-- Certificates Card -->
        <div class="mobile-link-card" @click="$emit('openCertificatesListModal')">
          <div class="mobile-icon certificates">
            <i class="fas fa-certificate"></i>
          </div>
          <span class="mobile-label">Certificates</span>
          <small class="mobile-desc">{{ certificates.length }} certifications</small>
          <span class="mobile-badge">{{ certificates.length }}</span>
        </div>
        
        <!-- GitHub Card (mobile) -->
        <a href="https://github.com/codewithryry?tab=repositories" target="_blank" class="mobile-link-card">
          <div class="mobile-icon github">
            <i class="fab fa-github"></i>
          </div>
          <span class="mobile-label">GitHub</span>
          <small class="mobile-desc">All my projects</small>
        </a>
        
        <!-- Dev.to Card (mobile) -->
        <a href="https://dev.to/codewithryry" target="_blank" class="mobile-link-card">
          <div class="mobile-icon dev">
            <i class="fab fa-dev"></i>
          </div>
          <span class="mobile-label">Dev.to</span>
          <small class="mobile-desc">Technical writing</small>
        </a>
        
        <!-- Portfolio Card (mobile) -->
        <a href="https://reymelreymislang.vercel.app/" target="_blank" class="mobile-link-card">
          <div class="mobile-icon portfolio">
            <i class="fas fa-briefcase"></i>
          </div>
          <span class="mobile-label">Portfolio</span>
          <small class="mobile-desc">View my work</small>
        </a>
        
        <!-- Resume Card (mobile only) -->
        <a href="/Reymel Mislang Resume  (8.5 x 13 in).pdf" download class="mobile-link-card">
          <div class="mobile-icon resume">
            <i class="fas fa-file-download"></i>
          </div>
          <span class="mobile-label">Resume</span>
          <small class="mobile-desc">Download PDF</small>
        </a>
        <!-- Email Card (mobile only) -->
        <a href="mailto:your.email@example.com" class="mobile-link-card">
          <div class="mobile-icon email">
            <i class="fas fa-envelope"></i>
          </div>
          <span class="mobile-label">Email</span>
          <small class="mobile-desc">Contact me</small>
        </a>
      </div>
    </div>
    
    <!-- Desktop View - Original Grid (unchanged) -->
    <div class="links-grid">
      <!-- Portfolio & Resume -->
      <div class="link-category">
        <h3 class="category-title">
          <i class="fas fa-user"></i> Portfolio & Certificates
        </h3>
        <div class="category-links">
          <a href="https://reymelreymislang.vercel.app/" target="_blank" class="link-card portfolio">
            <div class="link-icon">
              <i class="fas fa-briefcase"></i>
            </div>
            <div class="link-info">
              <span class="link-label">Portfolio Website</span>
              <small class="link-desc">View my work</small>
            </div>
            <i class="fas fa-arrow-right link-arrow"></i>
          </a>
          <!-- Certificates -->
          <a href="#" class="link-card certificates" @click.prevent="$emit('openCertificatesListModal')">
            <div class="link-icon">
              <i class="fas fa-certificate"></i>
            </div>
            <div class="link-info">
              <span class="link-label">Certificates</span>
              <small class="link-desc">{{ certificates.length }} certifications</small>
            </div>
            <i class="fas fa-arrow-right link-arrow"></i>
          </a>
        </div>
      </div>

      <!-- Development Work -->
      <div class="link-category">
        <h3 class="category-title">
          <i class="fas fa-code"></i> Development Work
        </h3>
        <div class="category-links">
          <a href="https://github.com/codewithryry?tab=repositories" target="_blank" class="link-card github">
            <div class="link-icon">
              <i class="fab fa-github"></i>
            </div>
            <div class="link-info">
              <span class="link-label">GitHub Repositories</span>
              <small class="link-desc">All my projects</small>
            </div>
            <i class="fas fa-arrow-right link-arrow"></i>
          </a>
          
          <a href="https://dev.to/codewithryry" target="_blank" class="link-card dev">
            <div class="link-icon">
              <i class="fab fa-dev"></i>
            </div>
            <div class="link-info">
              <span class="link-label">Dev.to Articles</span>
              <small class="link-desc">Technical writing</small>
            </div>
            <i class="fas fa-arrow-right link-arrow"></i>
          </a>
          
          <a href="https://wakatime.com/@codewithryry" target="_blank" class="link-card stats">
            <div class="link-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="link-info">
              <span class="link-label">WakaTime Stats</span>
              <small class="link-desc">Coding analytics</small>
            </div>
            <i class="fas fa-arrow-right link-arrow"></i>
          </a>
        </div>
      </div>

      <!-- Support & Connect -->
      <div class="link-category">
        <h3 class="category-title">
          <i class="fas fa-handshake"></i> Support & Connect
        </h3>
        <div class="category-links">
          <!-- QR Support Card -->
          <div class="link-card qr-support" @click="$emit('openQRModal')">
            <div class="link-icon">
              <i class="fas fa-qrcode"></i>
            </div>
            <div class="link-info">
              <span class="link-label">Support via QR</span>
              <small class="link-desc">Multiple banks available</small>
            </div>
            <i class="fas fa-external-link-alt link-arrow"></i>
          </div>
          
          <a href="https://buymeacoffee.com/reymelreym7" target="_blank" class="link-card coffee">
            <div class="link-icon">
              <i class="fas fa-coffee"></i>
            </div>
            <div class="link-info">
              <span class="link-label">Buy Me a Coffee</span>
              <small class="link-desc">Support my work</small>
            </div>
            <i class="fas fa-arrow-right link-arrow"></i>
          </a>
          
          <a href="https://t.me/+XpsVdhvIlVM4ZTA1" target="_blank" class="link-card telegram">
            <div class="link-icon">
              <i class="fab fa-telegram"></i>
            </div>
            <div class="link-info">
              <span class="link-label">Telegram Channel</span>
              <small class="link-desc">Join community</small>
            </div>
            <i class="fas fa-arrow-right link-arrow"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LinksSection',
  props: {
    certificates: {
      type: Array,
      required: true
    }
  },
  emits: ['openQRModal', 'openCertificatesListModal']
}
</script>

<style scoped>
.links-section {
  margin: 3rem 0;
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

/* ===== MOBILE VIEW ===== */
.mobile-links-container {
  display: block;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
  position: relative;
}

/* Swipe hint text */
.swipe-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  padding: 0 0.5rem;
  animation: pulseHint 2s infinite;
}

@keyframes pulseHint {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

.mobile-links-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.75rem 0.5rem 1.25rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

/* Add gradient fade at the end to indicate more content */
.mobile-links-scroll::after {
  content: '';
  position: absolute;
  right: 0.5rem;
  top: 3rem;
  width: 40px;
  height: 140px;
  background: linear-gradient(90deg, transparent, white);
  pointer-events: none;
  border-radius: 0 16px 16px 0;
}

.mobile-links-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

/* Match social card size and style */
.mobile-link-card {
  flex: 0 0 auto;
  width: 140px; /* Match social card width */
  height: 150px; /* Increased height to accommodate description */
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 0.8rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
}

.mobile-link-card:active {
  transform: scale(0.98);
}

.mobile-link-card:hover {
  transform: translateY(-5px);
  border-color: currentColor;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.mobile-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
}

.mobile-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 0.2rem;
}

.mobile-desc {
  color: #718096;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.2;
  opacity: 0.9;
}

.mobile-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #667eea;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Mobile icon colors - keeping your original colors plus new ones */
.mobile-icon.portfolio { 
  background: rgba(102, 126, 234, 0.1); 
  color: #667eea; 
}
.mobile-icon.certificates { 
  background: rgba(56, 161, 105, 0.1); 
  color: #38a169; 
}
.mobile-icon.github { 
  background: rgba(36, 41, 46, 0.1); 
  color: #24292e; 
}
.mobile-icon.dev { 
  background: rgba(10, 10, 10, 0.1); 
  color: #0a0a0a; 
}
.mobile-icon.qr { 
  background: rgba(102, 126, 234, 0.1); 
  color: #667eea; 
}
.mobile-icon.coffee { 
  background: rgba(214, 158, 46, 0.1); 
  color: #d69e2e; 
}
.mobile-icon.telegram { 
  background: rgba(0, 136, 204, 0.1); 
  color: #0088cc; 
}
.mobile-icon.stats { 
  background: rgba(56, 161, 105, 0.1); 
  color: #38a169; 
}
.mobile-icon.resume { 
  background: rgba(245, 101, 101, 0.1); 
  color: #f56565; 
}
.mobile-icon.linkedin { 
  background: rgba(10, 102, 194, 0.1); 
  color: #0a66c2; 
}
.mobile-icon.email { 
  background: rgba(234, 67, 53, 0.1); 
  color: #ea4335; 
}

/* Adjust mobile card hover colors */
.mobile-link-card:hover .mobile-icon.portfolio { 
  background: rgba(102, 126, 234, 0.2); 
}
.mobile-link-card:hover .mobile-icon.certificates { 
  background: rgba(56, 161, 105, 0.2); 
}
.mobile-link-card:hover .mobile-icon.github { 
  background: rgba(36, 41, 46, 0.2); 
}
.mobile-link-card:hover .mobile-icon.dev { 
  background: rgba(10, 10, 10, 0.2); 
}
.mobile-link-card:hover .mobile-icon.qr { 
  background: rgba(102, 126, 234, 0.2); 
}
.mobile-link-card:hover .mobile-icon.coffee { 
  background: rgba(214, 158, 46, 0.2); 
}
.mobile-link-card:hover .mobile-icon.telegram { 
  background: rgba(0, 136, 204, 0.2); 
}
.mobile-link-card:hover .mobile-icon.stats { 
  background: rgba(56, 161, 105, 0.2); 
}
.mobile-link-card:hover .mobile-icon.resume { 
  background: rgba(245, 101, 101, 0.2); 
}
.mobile-link-card:hover .mobile-icon.linkedin { 
  background: rgba(10, 102, 194, 0.2); 
}
.mobile-link-card:hover .mobile-icon.email { 
  background: rgba(234, 67, 53, 0.2); 
}

/* Hide mobile view on desktop */
@media (min-width: 769px) {
  .mobile-links-container {
    display: none;
  }
  
  .swipe-hint {
    display: none;
  }
}

/* ===== DESKTOP VIEW ===== */
.links-grid {
  display: none; /* Hidden on mobile by default */
}

@media (min-width: 769px) {
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
}

/* Original desktop styles (unchanged) */
.link-category {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

@media (min-width: 769px) {
  .link-category {
    padding: 2rem;
    border-radius: 20px;
  }
}

.category-title {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-title i {
  color: #667eea;
}

.category-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-height: 64px;
  cursor: pointer;
}

.link-card:active {
  transform: scale(0.98);
}

.link-card:hover {
  transform: translateY(-3px);
  background: white;
  border-color: #667eea;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
}

.link-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.portfolio .link-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }
.certificates .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.github .link-icon { background: rgba(36, 41, 46, 0.1); color: #24292e; }
.dev .link-icon { background: rgba(10, 10, 10, 0.1); color: #0a0a0a; }
.stats .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.coffee .link-icon { background: rgba(214, 158, 46, 0.1); color: #d69e2e; }
.telegram .link-icon { background: rgba(0, 136, 204, 0.1); color: #0088cc; }
.qr-support .link-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }

.link-info {
  flex: 1;
}

.link-label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.2rem;
  font-size: 1rem;
}

.link-desc {
  color: #718096;
  font-size: 0.85rem;
}

.link-arrow {
  color: #a0aec0;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(5px);
  color: #667eea;
}
</style>