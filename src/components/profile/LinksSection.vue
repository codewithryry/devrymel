<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <section class="links-section">
    <div class="section-header links-header">
      <span class="section-kicker">Resources</span>
      <h2 class="section-title">Quick Links</h2>
    </div>

    <!-- Mobile View - Compact Horizontal Scroll -->
    <div class="mobile-links-container">
      <div class="swipe-hint">
        <span>Tap to open</span>
      </div>

      <div
          class="mobile-links-scroll rt-grid"
          @pointerdown="startTileHold"
          @pointerup="cancelTileHold"
          @pointerleave="cancelTileHold"
          @pointercancel="cancelTileHold"
          @click.capture="guardTileClick"
          @contextmenu="tileEditing && $event.preventDefault()"
        >
        <!-- Spotify tile: always shown; "Now Playing" while a song plays, idle otherwise (data from App) -->
        <a
          :href="spotifyPlaying ? ($root.spotifyTrack.url || 'https://open.spotify.com') : 'https://open.spotify.com'"
          target="_blank"
          rel="noopener noreferrer"
          class="mobile-link-card spotify-tile"
          :class="[{ idle: !spotifyPlaying }, tileClass('spotify', 'tall')]"
        >
          <button v-if="tileEditing" type="button" class="rt-handle" aria-label="Resize tile" @click.stop.prevent="cycleTileSize('spotify', 'tall')"><i class="fas fa-expand-alt"></i></button>
          <div class="spotify-tile-art">
            <img v-if="spotifyPlaying && $root.spotifyTrack.image" :src="$root.spotifyTrack.image" :alt="$root.spotifyTrack.title" />
            <i v-else class="fab fa-spotify"></i>
          </div>
          <small class="spotify-tile-label">{{ spotifyPlaying ? 'Now Playing' : 'Offline' }}</small>
          <span class="mobile-label">{{ spotifyPlaying ? $root.spotifyTrack.title : 'Spotify' }}</span>
          <small class="mobile-desc">{{ spotifyPlaying ? $root.spotifyTrack.artist : 'Not playing right now' }}</small>
        </a>

        <a href="https://buymeacoffee.com/reymelreym7" target="_blank" class="mobile-link-card" :class="tileClass('coffee', 'tall')">
          <button v-if="tileEditing" type="button" class="rt-handle" aria-label="Resize tile" @click.stop.prevent="cycleTileSize('coffee', 'tall')"><i class="fas fa-expand-alt"></i></button>
          <div class="mobile-icon"><i class="fas fa-coffee"></i></div>
          <span class="mobile-label">Coffee</span>
          <small class="mobile-desc">Support my work</small>
        </a>

        <!-- Opens the feedback panel (App.openFeedback) -->
        <button type="button" class="mobile-link-card" :class="tileClass('feedback', 'sm')" @click="$root.openFeedback()">
          <button v-if="tileEditing" type="button" class="rt-handle" aria-label="Resize tile" @click.stop.prevent="cycleTileSize('feedback', 'sm')"><i class="fas fa-expand-alt"></i></button>
          <div class="mobile-icon"><i class="fas fa-comment-dots"></i></div>
          <span class="mobile-label">Feedback</span>
          <small class="mobile-desc">Leave a message</small>
        </button>


        <!-- Theme toggle (cycles Classic Light → Midnight → Emerald) -->
        <button type="button" class="mobile-link-card theme-tile" :class="tileClass('theme', 'sm')" @click="$root.cycleTheme()">
          <button v-if="tileEditing" type="button" class="rt-handle" aria-label="Resize tile" @click.stop.prevent="cycleTileSize('theme', 'sm')"><i class="fas fa-expand-alt"></i></button>
          <div class="mobile-icon">
            <i class="fas" :class="$root.currentTheme === 'froth' ? 'fa-tint' : $root.currentTheme === 'midnight' ? 'fa-moon' : $root.currentTheme === 'forest' ? 'fa-leaf' : 'fa-sun'"></i>
          </div>
          <span class="mobile-label">Theme</span>
          <small class="mobile-desc">{{ $root.currentThemeName }}</small>
        </button>

        <a href="https://dev.to/codewithryry" target="_blank" class="mobile-link-card" :class="tileClass('devto', 'sm')">
          <button v-if="tileEditing" type="button" class="rt-handle" aria-label="Resize tile" @click.stop.prevent="cycleTileSize('devto', 'sm')"><i class="fas fa-expand-alt"></i></button>
          <div class="mobile-icon"><i class="fab fa-dev"></i></div>
          <span class="mobile-label">Dev.to</span>
          <small class="mobile-desc">Technical writing</small>
        </a>

        <a href="https://reymelreymislang.vercel.app/" target="_blank" class="mobile-link-card" :class="tileClass('portfolio', 'sm')">
          <button v-if="tileEditing" type="button" class="rt-handle" aria-label="Resize tile" @click.stop.prevent="cycleTileSize('portfolio', 'sm')"><i class="fas fa-expand-alt"></i></button>
          <div class="mobile-icon"><i class="fas fa-briefcase"></i></div>
          <span class="mobile-label">Portfolio</span>
          <small class="mobile-desc">View my work</small>
        </a>

        <div class="mobile-link-card" :class="tileClass('support', 'wide')" @click="$emit('openQRModal')">
          <button v-if="tileEditing" type="button" class="rt-handle" aria-label="Resize tile" @click.stop.prevent="cycleTileSize('support', 'wide')"><i class="fas fa-expand-alt"></i></button>
          <div class="mobile-icon"><i class="fas fa-qrcode"></i></div>
          <span class="mobile-label">Support Me</span>
          <small class="mobile-desc">Multiple banks available</small>
        </div>
      </div>

      <!-- Free tools (mobile): hidden — tools are in the bottom-nav Menu -->
      <h3 v-if="false" class="mobile-tools-title">Free Tools</h3>
      <div v-if="false" class="mobile-links-scroll">
        <router-link
          v-for="tool in liveTools"
          :key="tool.path"
          :to="tool.path"
          class="mobile-link-card"
        >
          <div class="mobile-icon"><i :class="tool.icon"></i></div>
          <span class="mobile-label">{{ tool.title }}</span>
          <small class="mobile-desc">{{ tool.status === 'soon' ? 'Coming soon' : tool.desc }}</small>
        </router-link>
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
import resizableTiles from "@/mixins/resizableTiles";

export default {
  name: 'LinksSection',
  mixins: [resizableTiles],
  props: {
    certificates: {
      type: Array,
      required: true
    }
  },
  emits: ['openQRModal', 'openCertificatesListModal'],
  data() {
    return {
      tileStorageKey: 'tileSizes:links',
      tools: [
        { path: '/tools/tiktok', icon: 'fab fa-tiktok', title: 'TikTok Downloader', desc: 'Save videos watermark-free' },
        { path: '/tools/youtube-downloader', icon: 'fab fa-youtube', title: 'YT Downloader', desc: 'Save YouTube videos' },
        { path: '/tools/youtube-thumbnail', icon: 'fas fa-image', title: 'YT Thumbnail', desc: 'Grab video thumbnails' },
        { path: '/tools/qr-generator', icon: 'fas fa-qrcode', title: 'QR Generator', desc: 'Text or URL to QR' },
        { path: '/tools/password', icon: 'fas fa-key', title: 'Password Generator', desc: 'Secure random passwords' },
        { path: '/tools/color-palette', icon: 'fas fa-palette', title: 'Color Palette', desc: 'Curated color schemes' },
        { path: '/tools/ip-lookup', icon: 'fas fa-map-marker-alt', title: 'IP Lookup', desc: 'Your IP & location' },
        { path: '/tools/speedtest', icon: 'fas fa-tachometer-alt', title: 'Speed Test', desc: 'Check your connection' },
        { path: '/tools/url-shortener', icon: 'fas fa-link', title: 'URL Shortener', desc: 'Shorten long links' },
        { path: '/tools/base64', icon: 'fas fa-code', title: 'Base64 Tool', desc: 'Encode & decode text' },
        { path: '/tools/json-formatter', icon: 'fas fa-file-code', title: 'JSON Formatter', desc: 'Format & validate JSON', status: 'soon' },
        { path: '/tools/text-counter', icon: 'fas fa-font', title: 'Text Counter', desc: 'Count words & characters', status: 'soon' },
        { path: '/tools/case-converter', icon: 'fas fa-text-height', title: 'Case Converter', desc: 'Change text case', status: 'soon' },
        { path: '/tools/meta-tag-generator', icon: 'fas fa-tags', title: 'Meta Tag Generator', desc: 'Generate SEO meta tags', status: 'soon' }
      ],
      showAllTools: false
    }
  },
  computed: {
    spotifyPlaying() {
      return !!(this.$root.spotifyTrack && this.$root.spotifyTrack.isPlaying)
    },

    // Mobile shows only finished tools (no "Coming soon")
    liveTools() {
      return this.tools.filter((tool) => tool.status !== 'soon')
    },

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

.mobile-tools-title {
  margin: 1.25rem 0 0.6rem;
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ===== Mobile Quick Links: bento tiles (same style as the profile tiles) ===== */
@media (max-width: 768px) {
  .mobile-links-scroll {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.6rem;
    overflow: visible;
    padding: 0.25rem 0 0.5rem;
  }

  .mobile-link-card {
    position: relative;
    width: auto;
    height: auto;
    min-height: 104px;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.85rem;
    border-radius: 20px;
    text-align: left;
  }

  /* Repeating pattern of sizes: wide, narrow, full, narrow, wide */
  .mobile-link-card:nth-child(5n + 1),
  .mobile-link-card:nth-child(5n + 5) {
    grid-column: span 2;
  }

  .mobile-link-card:nth-child(5n + 3) {
    grid-column: 1 / -1;
  }

  /* Big icon top-left, no box */
  .mobile-icon {
    width: auto;
    height: auto;
    margin-bottom: auto;
    background: none;
    font-size: 1.5rem;
  }

  .mobile-label,
  .mobile-desc {
    max-width: 100%;
    text-align: left;
  }

  .mobile-label {
    margin-top: 0.6rem;
    font-size: 0.85rem;
  }

  .mobile-desc {
    overflow: hidden;
    font-size: 0.7rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Small "open" arrow in the corner */
  .mobile-link-card::after {
    content: "\f35d";
    position: absolute;
    top: 0.85rem;
    right: 0.85rem;
    color: var(--text-muted);
    font-family: "Font Awesome 6 Free";
    font-size: 0.7rem;
    font-weight: 900;
  }
}

/* Phones: no "Resources / Quick Links" heading; tiles follow the profile tiles */
@media (max-width: 768px) {
  .links-header,
  .swipe-hint {
    display: none;
  }

  .mobile-links-scroll {
    padding-top: 0;
  }
}

/* ===== Mobile Quick Links: mosaic (2 big tall tiles + 4 compact tiles) =====
   [ Coffee  ][ Support QR ]
   [  (big)  ][ Telegram   ]
   [ Dev.to  ][   Book     ]
   [Portfolio][   (big)    ] */
@media (max-width: 768px) {
  .mobile-links-scroll {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 68px;
    grid-auto-flow: dense;
  }

  /* Reset the old repeating wide/narrow pattern */
  .mobile-link-card:nth-child(n) {
    grid-column: auto;
    grid-row: auto;
  }

  /* Compact tile: small icon on the left, label + description beside it */
  .mobile-link-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: auto auto;
    align-content: center;
    column-gap: 0.65rem;
    min-height: 0;
    padding: 0.7rem 0.8rem;
  }

  .mobile-link-card .mobile-icon {
    grid-row: 1 / 3;
    align-self: center;
    margin: 0;
    font-size: 1.15rem;
  }

  .mobile-link-card .mobile-label {
    margin: 0;
    font-size: 0.82rem;
  }

  .mobile-link-card::after {
    top: 0.6rem;
    right: 0.6rem;
  }

  /* Big tall tiles: first (Coffee) and last (Book) */
  .mobile-link-card:first-child,
  .mobile-link-card:last-child {
    grid-row: span 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.9rem;
  }

  .mobile-link-card:first-child .mobile-icon,
  .mobile-link-card:last-child .mobile-icon {
    margin-bottom: auto;
    font-size: 1.7rem;
  }

  .mobile-link-card:first-child .mobile-label,
  .mobile-link-card:last-child .mobile-label {
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  /* Explicit spots for the bottom half: Dev.to + Portfolio left, Book tall on the right */
  .mobile-links-scroll .mobile-link-card:nth-child(4) {
    grid-column: 1;
    grid-row: 3;
  }

  .mobile-links-scroll .mobile-link-card:nth-child(5) {
    grid-column: 1;
    grid-row: 4;
  }

  .mobile-links-scroll .mobile-link-card:nth-child(6) {
    grid-column: 2;
    grid-row: 3 / span 2;
  }
}

/* ===== Phones: Quick Links finish the white sheet ===== */
@media (max-width: 768px) {
  .mobile-links-container {
    padding: 0 0.75rem 0.75rem;
    border-radius: 0 0 26px 26px;
    background: var(--surface);
  }
}

/* The Feedback tile is a <button>: match the link tiles */
button.mobile-link-card {
  font: inherit;
  text-align: left;
}

/* Phones: the two big tiles (Coffee, Support Me) are identical in size and layout */
@media (max-width: 768px) {
  .mobile-links-scroll .mobile-link-card:first-child,
  .mobile-links-scroll .mobile-link-card:last-child {
    height: 100%;
    min-height: 0;
  }

  .mobile-links-scroll .mobile-link-card:first-child .mobile-icon,
  .mobile-links-scroll .mobile-link-card:last-child .mobile-icon {
    width: auto;
    justify-content: flex-start;
    align-self: flex-start;
    font-size: 1.7rem;
  }
}

/* ===== Phones: Spotify big tile + layout while a song is playing =====
   [ Spotify ][ Coffee     ]
   [ Feedback][ Support Me ]
   [ Telegram][            ]
   [ Dev.to  ][ Portfolio  ] */
@media (max-width: 768px) {
  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(n) {
    grid-column: auto;
    grid-row: auto;
  }

  /* 1 Spotify, 2 Coffee: both big, side by side */
  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(1) {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(2) {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.9rem;
  }

  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(2) .mobile-icon {
    margin-bottom: auto;
    font-size: 1.7rem;
  }

  /* 3 Feedback, 4 Telegram: compact, left */
  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(3) {
    grid-column: 1;
    grid-row: 3;
  }

  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(4) {
    grid-column: 1;
    grid-row: 4;
  }

  /* 5 Dev.to, 6 Portfolio: compact, bottom row */
  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(5) {
    grid-column: 1;
    grid-row: 5;
  }

  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(6) {
    grid-column: 2;
    grid-row: 5;
  }

  /* 7 Support Me: big, right */
  .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(7) {
    grid-column: 2;
    grid-row: 3 / span 2;
  }

  /* Spotify tile look */
  .spotify-tile {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.9rem;
  }

  .spotify-tile-art {
    width: 44px;
    height: 44px;
    margin-bottom: auto;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 12px;
    background: #1db954;
    color: #fff;
    font-size: 1.3rem;
  }

  .spotify-tile-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spotify-tile-label {
    margin-top: 0.5rem;
    color: #1db954;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .spotify-tile .mobile-label {
    max-width: 100%;
    overflow: hidden;
    font-size: 0.9rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spotify-tile::after {
    content: "\f1bc";
    font-family: "Font Awesome 6 Brands";
    font-weight: 400;
    color: #1db954;
    font-size: 0.9rem;
  }
}

/* Phones: the sheet continues into the CTA below, so no rounded bottom here */
@media (max-width: 768px) {
  .mobile-links-container {
    border-radius: 0;
  }
}

/* Spotify tile when nothing is playing */
@media (max-width: 768px) {
  .spotify-tile.idle .spotify-tile-label {
    color: var(--text-muted);
  }

  .spotify-tile.idle::after {
    color: var(--text-muted);
  }

  /* Idle: plain black/white Spotify icon, like the other tiles' icons */
  .spotify-tile.idle .spotify-tile-art {
    width: auto;
    height: auto;
    border-radius: 0;
    background: none;
    color: var(--text);
    font-size: 1.7rem;
  }
}

/* Theme tile: a toggle, so show a switch arrow instead of the "open" icon */
@media (max-width: 768px) {
  .theme-tile::after {
    content: "\f0ec";
  }
}
</style>
