<template>
  <section class="links-section">
    <h2 class="section-title">Quick Links</h2>
    <br>
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


.links-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 769px) {
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
}

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



