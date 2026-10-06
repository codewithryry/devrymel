<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <section class="links-section">
    <div class="section-header">
      <span class="section-kicker">Resources</span>
      <h2 class="section-title">Quick Links</h2>
    </div>

    <!-- Mobile View - Compact Horizontal Scroll -->
    <div class="mobile-links-container">
      <div class="swipe-hint">
        <span>Swipe for more..</span>
      </div>

      <div class="mobile-links-scroll">
        <a href="mailto:reymelrey.mislang@gmail.com" class="mobile-link-card">
          <div class="mobile-icon"><i class="fas fa-envelope"></i></div>
          <span class="mobile-label">Email</span>
          <small class="mobile-desc">Contact me</small>
        </a>

        <a href="https://buymeacoffee.com/reymelreym7" target="_blank" class="mobile-link-card">
          <div class="mobile-icon"><i class="fas fa-coffee"></i></div>
          <span class="mobile-label">Coffee</span>
          <small class="mobile-desc">Support my work</small>
        </a>

        <div class="mobile-link-card" @click="$emit('openQRModal')">
          <div class="mobile-icon"><i class="fas fa-qrcode"></i></div>
          <span class="mobile-label">Support QR</span>
          <small class="mobile-desc">Multiple banks available</small>
        </div>

        <a href="https://t.me/+XpsVdhvIlVM4ZTA1" target="_blank" class="mobile-link-card">
          <div class="mobile-icon"><i class="fab fa-telegram"></i></div>
          <span class="mobile-label">Telegram</span>
          <small class="mobile-desc">Join community</small>
        </a>

        <a href="https://github.com/codewithryry?tab=repositories" target="_blank" class="mobile-link-card">
          <div class="mobile-icon"><i class="fab fa-github"></i></div>
          <span class="mobile-label">GitHub</span>
          <small class="mobile-desc">All my projects</small>
        </a>

        <a href="https://dev.to/codewithryry" target="_blank" class="mobile-link-card">
          <div class="mobile-icon"><i class="fab fa-dev"></i></div>
          <span class="mobile-label">Dev.to</span>
          <small class="mobile-desc">Technical writing</small>
        </a>

        <a href="https://reymelreymislang.vercel.app/" target="_blank" class="mobile-link-card">
          <div class="mobile-icon"><i class="fas fa-briefcase"></i></div>
          <span class="mobile-label">Portfolio</span>
          <small class="mobile-desc">View my work</small>
        </a>

        <a
          href="https://docs.google.com/document/d/1QzKrdfaPNfefuENiuya64RzHRCDPMTtvkVF1y8vzuA4/edit?usp=sharing"
          target="_blank"
          class="mobile-link-card"
        >
          <div class="mobile-icon"><i class="fas fa-book-open"></i></div>
          <span class="mobile-label">Book</span>
          <small class="mobile-desc">Crossed Eyes</small>
        </a>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="links-grid">
      <div class="link-category">
        <h3 class="category-title">Portfolio & Certificates</h3>
        <div class="category-links">
          <a href="https://reymelreymislang.vercel.app/" target="_blank" class="link-card">
            <span class="link-label">Portfolio Website</span>
            <small class="link-desc">View my work</small>
          </a>
          <a href="#" class="link-card" @click.prevent="$emit('openCertificatesListModal')">
            <span class="link-label">Certificates</span>
            <small class="link-desc">{{ certificates.length }} certifications</small>
          </a>
        </div>
      </div>

      <div class="link-category">
        <h3 class="category-title">Development Work</h3>
        <div class="category-links">
          <a href="https://github.com/codewithryry?tab=repositories" target="_blank" class="link-card">
            <span class="link-label">GitHub Repositories</span>
            <small class="link-desc">All my projects</small>
          </a>
          <a href="https://dev.to/codewithryry" target="_blank" class="link-card">
            <span class="link-label">Dev.to Articles</span>
            <small class="link-desc">Technical writing</small>
          </a>
          <a href="https://wakatime.com/@codewithryry" target="_blank" class="link-card">
            <span class="link-label">WakaTime Stats</span>
            <small class="link-desc">Coding analytics</small>
          </a>
        </div>
      </div>

      <div class="link-category">
        <h3 class="category-title">Support & Connect</h3>
        <div class="category-links">
          <div class="link-card" @click="$emit('openQRModal')">
            <span class="link-label">Support via QR</span>
            <small class="link-desc">Multiple banks available</small>
          </div>
          <a href="https://buymeacoffee.com/reymelreym7" target="_blank" class="link-card">
            <span class="link-label">Buy Me a Coffee</span>
            <small class="link-desc">Support my work</small>
          </a>
          <a href="https://t.me/+XpsVdhvIlVM4ZTA1" target="_blank" class="link-card">
            <span class="link-label">Telegram Channel</span>
            <small class="link-desc">Join community</small>
          </a>
        </div>
      </div>

      <div class="link-category">
        <h3 class="category-title category-title-row">
          Free Tools
          <button type="button" class="more-toggle" @click="showAllTools = !showAllTools">
            {{ showAllTools ? 'Less' : 'More' }}
          </button>
        </h3>
        <div class="category-links">
          <router-link
            v-for="tool in visibleTools"
            :key="tool.path"
            :to="tool.path"
            class="link-card tool-card"
          >
            <span class="tool-text">
              <span class="link-label">{{ tool.title }}</span>
              <small class="link-desc">{{ tool.desc }}</small>
            </span>
            <span class="live-badge">{{ tool.status === 'soon' ? 'Soon' : 'Live' }}</span>
          </router-link>
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
  emits: ['openQRModal', 'openCertificatesListModal'],
  data() {
    return {
      tools: [
        { path: '/tools/tiktok', title: 'TikTok Downloader', desc: 'Save videos watermark-free' },
        { path: '/tools/youtube-downloader', title: 'YT Downloader', desc: 'Save YouTube videos' },
        { path: '/tools/youtube-thumbnail', title: 'YT Thumbnail', desc: 'Grab video thumbnails' },
        { path: '/tools/qr-generator', title: 'QR Generator', desc: 'Text or URL to QR' },
        { path: '/tools/password', title: 'Password Generator', desc: 'Secure random passwords' },
        { path: '/tools/color-palette', title: 'Color Palette', desc: 'Curated color schemes' },
        { path: '/tools/ip-lookup', title: 'IP Lookup', desc: 'Your IP & location' },
        { path: '/tools/speedtest', title: 'Speed Test', desc: 'Check your connection' },
        { path: '/tools/url-shortener', title: 'URL Shortener', desc: 'Shorten long links' },
        { path: '/tools/base64', title: 'Base64 Tool', desc: 'Encode & decode text' },
        { path: '/tools/json-formatter', title: 'JSON Formatter', desc: 'Format & validate JSON', status: 'soon' },
        { path: '/tools/text-counter', title: 'Text Counter', desc: 'Count words & characters', status: 'soon' },
        { path: '/tools/case-converter', title: 'Case Converter', desc: 'Change text case', status: 'soon' },
        { path: '/tools/meta-tag-generator', title: 'Meta Tag Generator', desc: 'Generate SEO meta tags', status: 'soon' }
      ],
      showAllTools: false
    }
  },
  computed: {
    visibleTools() {
      return this.showAllTools ? this.tools : this.tools.slice(0, 3)
    }
  }
}
</script>

<style scoped>
.links-section {
  margin: 0;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-kicker {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  text-align: left;
}

/* ===== MOBILE VIEW ===== */
.mobile-links-container {
  display: block;
  position: relative;
}

.swipe-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.mobile-links-scroll {
  display: flex;
  gap: 0.85rem;
  overflow-x: auto;
  padding: 0.25rem 0 1rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.mobile-links-scroll::-webkit-scrollbar {
  display: none;
}

.mobile-link-card {
  flex: 0 0 auto;
  width: 130px;
  height: 130px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.7rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease;
  cursor: pointer;
}

.mobile-link-card:hover {
  border-color: var(--text-muted);
}

.mobile-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--surface-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  color: var(--text);
  margin-bottom: 0.55rem;
}

.mobile-label {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text);
  text-align: center;
  line-height: 1.2;
  margin-bottom: 0.15rem;
}

.mobile-desc {
  color: var(--text-muted);
  font-size: 0.72rem;
  text-align: center;
  line-height: 1.2;
}

@media (min-width: 769px) {
  .mobile-links-container {
    display: none;
  }
}

/* ===== DESKTOP VIEW ===== */
.links-grid {
  display: none;
}

@media (min-width: 769px) {
  .links-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

.link-category {
  border-top: 1px solid var(--border);
  padding-top: 1.25rem;
}

.category-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 1rem;
}

.category-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.more-toggle {
  padding: 0;
  border: none;
  background: none;
  color: var(--text-muted);
  font: inherit;
  cursor: pointer;
}

.more-toggle:hover {
  color: var(--text);
}

.category-links {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.link-card {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.7rem 0;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
}

.link-category .category-links .link-card:last-child {
  border-bottom: none;
}

.link-label {
  font-weight: 600;
  color: var(--text);
  font-size: 0.95rem;
}

.link-desc {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.link-card:hover .link-label {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Tools column — matches screenshot dropdown style */
.tool-card {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.tool-card:hover .link-label {
  text-decoration: none;
}

.tool-card:hover {
  background: var(--surface-soft);
  margin: 0 -0.6rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  border-radius: var(--radius-sm);
}

.tool-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.live-badge {
  flex-shrink: 0;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}
</style>
