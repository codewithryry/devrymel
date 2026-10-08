<template>
  <div class="ts-wrap">
    <p class="ts-label">Other Tools</p>
    <div class="ts-grid">
      <router-link
        v-for="tool in otherTools"
        :key="tool.path"
        :to="tool.path"
        class="ts-tile"
        :class="{ 'is-soon': tool.soon }"
      >
        <span v-if="tool.soon" class="ts-soon">Soon</span>
        <span class="ts-icon" :style="{ background: tool.color }">
          <i :class="tool.icon"></i>
        </span>
        <span class="ts-name">{{ tool.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
const ALL_TOOLS = [
  { path: "/tools/tiktok",             icon: "fab fa-tiktok",         color: "linear-gradient(135deg,#010101,#2d2d2d)", title: "TikTok DL"    },
  { path: "/tools/youtube-thumbnail",  icon: "fas fa-image",          color: "linear-gradient(135deg,#ff0000,#cc0000)", title: "YT Thumbnail" },
  { path: "/tools/youtube-downloader", icon: "fab fa-youtube",        color: "linear-gradient(135deg,#b91c1c,#7f1d1d)", title: "YT Download"  },
  { path: "/tools/qr-generator",       icon: "fas fa-qrcode",         color: "linear-gradient(135deg,#0f172a,#1e293b)", title: "QR Code"      },
  { path: "/tools/password",           icon: "fas fa-key",            color: "linear-gradient(135deg,#7c3aed,#6d28d9)", title: "Password"     },
  { path: "/tools/ip-lookup",          icon: "fas fa-map-marker-alt", color: "linear-gradient(135deg,#0ea5e9,#0284c7)", title: "IP Lookup"    },
  { path: "/tools/base64",             icon: "fas fa-code",           color: "linear-gradient(135deg,#059669,#047857)", title: "Base64"       },
  { path: "/tools/color-palette",      icon: "fas fa-palette",        color: "linear-gradient(135deg,#ec4899,#be185d)", title: "Colors"       },
  { path: "/tools/url-shortener",      icon: "fas fa-link",           color: "linear-gradient(135deg,#f59e0b,#d97706)", title: "Short URL"    },
  // Coming soon (open their "coming soon" page)
  { path: "/tools/json-formatter",     icon: "fas fa-file-code",      color: "linear-gradient(135deg,#64748b,#475569)", title: "JSON",        soon: true },
  { path: "/tools/text-counter",       icon: "fas fa-font",           color: "linear-gradient(135deg,#64748b,#475569)", title: "Text Count",  soon: true },
  { path: "/tools/case-converter",     icon: "fas fa-text-height",    color: "linear-gradient(135deg,#64748b,#475569)", title: "Case",        soon: true },
  { path: "/tools/meta-tag-generator", icon: "fas fa-tags",           color: "linear-gradient(135deg,#64748b,#475569)", title: "Meta Tags",   soon: true },
];

export default {
  name: "ToolSuggestions",
  props: {
    current: { type: String, required: true }
  },
  computed: {
    otherTools() {
      return ALL_TOOLS.filter(t => t.path !== this.current);
    }
  }
};
</script>

<style scoped>
.ts-wrap {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
}

.ts-label {
  margin: 0 0 12px;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.ts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
  gap: 8px;
}

.ts-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 6px 10px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.ts-tile:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--accent) 36%, var(--border));
  box-shadow: 0 6px 16px rgba(0,0,0,0.09);
}

.ts-tile:active {
  transform: scale(0.95);
}

.ts-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #fff;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

.ts-name {
  color: var(--text);
  font-size: 0.65rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.2;
}

@media (max-width: 480px) {
  .ts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Coming-soon tools: faded, with a small "Soon" tag */
.ts-tile.is-soon {
  opacity: 0.6;
}

.ts-soon {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 1px 5px;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--text-muted);
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>
