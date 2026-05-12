<template>
  <div class="ts-wrap">
    <p class="ts-label">Other Tools</p>
    <div class="ts-grid">
      <router-link
        v-for="tool in otherTools"
        :key="tool.path"
        :to="tool.path"
        class="ts-tile"
      >
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
</style>
