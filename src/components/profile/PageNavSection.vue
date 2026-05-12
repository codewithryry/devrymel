<template>
  <section class="pn-section">

    <div class="pn-group">
      <p class="pn-label">Pages</p>
      <div class="pn-grid">
        <router-link
          v-for="page in pages"
          :key="page.path"
          :to="page.path"
          class="pn-tile"
        >
          <span class="pn-icon" :style="{ background: page.color }">
            <i :class="page.icon"></i>
          </span>
          <span class="pn-name">{{ page.title }}</span>
        </router-link>
      </div>
    </div>

    <div class="pn-group">
      <p class="pn-label">Tools</p>
      <div class="pn-grid">
        <router-link
          v-for="tool in tools"
          :key="tool.path"
          :to="tool.path"
          class="pn-tile"
          :class="{ 'pn-tile--soon': tool.soon }"
        >
          <span class="pn-icon-wrap">
            <span class="pn-icon" :style="{ background: tool.color }">
              <i :class="tool.icon"></i>
            </span>
            <span v-if="tool.soon" class="pn-soon-badge">Soon</span>
          </span>
          <span class="pn-name">{{ tool.title }}</span>
        </router-link>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "PageNavSection",

  data() {
    return {
      pages: [
        { path: "/now",          icon: "fas fa-bolt",        color: "linear-gradient(135deg,#6366f1,#8b5cf6)", title: "Now"          },
        { path: "/uses",         icon: "fas fa-laptop-code", color: "linear-gradient(135deg,#0ea5e9,#0284c7)", title: "Uses"         },
        { path: "/services",     icon: "fas fa-briefcase",   color: "linear-gradient(135deg,#10b981,#059669)", title: "Services"     },
        { path: "/case-studies", icon: "fas fa-flask",       color: "linear-gradient(135deg,#f59e0b,#d97706)", title: "Case Studies" },
        { path: "/deployment",   icon: "fas fa-rocket",      color: "linear-gradient(135deg,#ec4899,#db2777)", title: "Deployment"   },
        { path: "/roadmap",      icon: "fas fa-map",         color: "linear-gradient(135deg,#8b5cf6,#7c3aed)", title: "Roadmap"      },
        { path: "/changelog",    icon: "fas fa-history",     color: "linear-gradient(135deg,#64748b,#475569)", title: "Changelog"    },
        { path: "/contact",      icon: "fas fa-paper-plane", color: "linear-gradient(135deg,#ef4444,#dc2626)", title: "Contact"      },
      ],
      tools: [
        { path: "/tools/tiktok",             icon: "fab fa-tiktok",         color: "linear-gradient(135deg,#010101,#2d2d2d)", title: "TikTok DL"    },
        { path: "/tools/youtube-thumbnail",  icon: "fas fa-image",          color: "linear-gradient(135deg,#ff0000,#cc0000)", title: "YT Thumbnail" },
        { path: "/tools/youtube-downloader", icon: "fab fa-youtube",        color: "linear-gradient(135deg,#b91c1c,#7f1d1d)", title: "YT Download"  },
        { path: "/tools/qr-generator",       icon: "fas fa-qrcode",         color: "linear-gradient(135deg,#0f172a,#1e293b)", title: "QR Code"      },
        { path: "/tools/password",           icon: "fas fa-key",            color: "linear-gradient(135deg,#7c3aed,#6d28d9)", title: "Password"     },
        { path: "/tools/ip-lookup",          icon: "fas fa-map-marker-alt", color: "linear-gradient(135deg,#0ea5e9,#0284c7)", title: "IP Lookup"    },
        { path: "/tools/base64",             icon: "fas fa-code",           color: "linear-gradient(135deg,#059669,#047857)", title: "Base64"       },
        { path: "/tools/url-shortener",      icon: "fas fa-compress-alt",   color: "linear-gradient(135deg,#f59e0b,#d97706)", title: "URL Short",   soon: true },
        { path: "/tools/color-palette",      icon: "fas fa-palette",        color: "linear-gradient(135deg,#ec4899,#db2777)", title: "Colors",      soon: true },
        { path: "/tools/ai-chat",            icon: "fas fa-robot",          color: "linear-gradient(135deg,#6366f1,#8b5cf6)", title: "AI Chat",     soon: true },
      ]
    }
  }
}
</script>

<style scoped>
.pn-section {
  padding: 40px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Group ── */
.pn-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pn-label {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

/* ── Grid ── */
.pn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 8px;
}

/* ── Tile ── */
.pn-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 6px 10px;
  border-radius: 18px;
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.pn-tile:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
  background: color-mix(in srgb, var(--surface-hover) 80%, var(--surface) 20%);
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
}

.pn-tile--soon {
  opacity: 0.72;
}

/* ── Icon ── */
.pn-icon-wrap {
  position: relative;
  display: flex;
}

.pn-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  color: #fff;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  flex-shrink: 0;
}

/* ── Soon badge ── */
.pn-soon-badge {
  position: absolute;
  top: -5px;
  right: -6px;
  padding: 1px 5px;
  border-radius: 999px;
  background: var(--accent, #6366f1);
  color: #fff;
  font-size: 0.52rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.6;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

/* ── Name ── */
.pn-name {
  display: block;
  color: var(--text);
  font-size: 0.68rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.2;
  word-break: break-word;
  max-width: 100%;
}

/* ── Active press ── */
.pn-tile:active {
  transform: scale(0.95);
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .pn-section {
    padding: 28px 0 8px;
    gap: 20px;
  }

  .pn-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .pn-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    font-size: 0.9rem;
  }

  .pn-tile {
    padding: 10px 4px 8px;
    border-radius: 16px;
    gap: 5px;
  }

  .pn-name {
    font-size: 0.64rem;
  }
}

/* ── Very small ── */
@media (max-width: 340px) {
  .pn-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
