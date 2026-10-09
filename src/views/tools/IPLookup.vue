<template>
  <div class="tool-page">
    <div class="tool-shell">

      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="tt-hero-text">
          <h1 class="tt-title">IP Address Lookup</h1>
          <p class="tt-subtitle">View your current IP address, location, ISP, and more — instantly.</p>
        </div>
        <ToolHowTo :steps="howToSteps" :note="howToNote" />
      </div>

      <!-- Ad -->
      <AdSlot type="banner" show-smartlink />

      <!-- Error -->
      <transition name="fade-slide">
        <div v-if="error" class="tt-error">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
          <button class="tt-retry" @click="fetchIP">Retry</button>
        </div>
      </transition>

      <!-- Loading skeletons -->
      <div v-if="loading" class="tt-grid">
        <div v-for="i in 8" :key="i" class="tt-card skeleton">
          <div class="sk-icon"></div>
          <div class="sk-content">
            <div class="sk-label"></div>
            <div class="sk-value"></div>
          </div>
        </div>
      </div>

      <!-- Info cards -->
      <transition name="fade-slide">
        <div v-if="!loading && info" class="tt-results">
          <div class="tt-grid">
            <div v-for="card in cards" :key="card.key" class="tt-card">
              <div class="tt-card-icon" :style="{ background: card.bg }">
                <i :class="card.icon"></i>
              </div>
              <div class="tt-card-content">
                <span class="tt-card-label">{{ card.label }}</span>
                <span class="tt-card-value">{{ card.value || '—' }}</span>
              </div>
            </div>
          </div>

          <div class="tt-actions">
            <button class="tt-refresh-btn" @click="fetchIP" :disabled="loading">
              <i class="fas fa-sync-alt"></i> Refresh
            </button>
            <p class="tt-timestamp">Last updated: {{ lastUpdated }}</p>
          </div>
        </div>
      </transition>

      <!-- Suggestions -->
      <tool-suggestions current="/tools/ip-lookup" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import ToolHowTo from "@/components/tools/ToolHowTo.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "IPLookup",

  components: { ToolSuggestions, ToolHowTo, AdSlot },

  data() {
    return {
      howToSteps: [
        "Open the tool — your public IP loads automatically.",
        "Check your approximate location and network provider.",
        "Copy any value you need."
      ],
      howToNote: "Location is approximate and based on your IP address.",
      loading: false,
      error: "",
      info: null,
      lastUpdated: ""
    };
  },

  computed: {
    cards() {
      if (!this.info) return [];
      return [
        {
          key: "ip",
          icon: "fas fa-network-wired",
          label: "IP Address",
          value: this.info.ip,
          bg: "linear-gradient(135deg, #0ea5e9, #0284c7)"
        },
        {
          key: "country",
          icon: "fas fa-flag",
          label: "Country",
          value: this.info.country_name
            ? `${this.info.country_name} ${this.info.country}`
            : this.info.country,
          bg: "linear-gradient(135deg, #f59e0b, #d97706)"
        },
        {
          key: "region",
          icon: "fas fa-map",
          label: "Region",
          value: this.info.region,
          bg: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
        },
        {
          key: "city",
          icon: "fas fa-city",
          label: "City",
          value: this.info.city,
          bg: "linear-gradient(135deg, #ec4899, #db2777)"
        },
        {
          key: "org",
          icon: "fas fa-building",
          label: "ISP / Org",
          value: this.info.org,
          bg: "linear-gradient(135deg, #10b981, #059669)"
        },
        {
          key: "timezone",
          icon: "fas fa-clock",
          label: "Timezone",
          value: this.info.timezone,
          bg: "linear-gradient(135deg, #6366f1, #4f46e5)"
        },
        {
          key: "coords",
          icon: "fas fa-crosshairs",
          label: "Coordinates",
          value: this.info.latitude && this.info.longitude
            ? `${this.info.latitude}, ${this.info.longitude}`
            : null,
          bg: "linear-gradient(135deg, #ef4444, #dc2626)"
        },
        {
          key: "asn",
          icon: "fas fa-server",
          label: "ASN",
          value: this.info.asn,
          bg: "linear-gradient(135deg, #0f172a, #1e293b)"
        }
      ];
    }
  },

  mounted() {
    this.fetchIP();
  },

  methods: {
    async fetchIP() {
      this.loading = true;
      this.error = "";
      this.info = null;

      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        if (data.error) throw new Error(data.reason || "Could not fetch IP info.");
        this.info = data;
        const now = new Date();
        this.lastUpdated = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      } catch (err) {
        this.error = err.message || "Could not fetch IP info. Please try again.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Page wrapper */
.tool-page {
  min-height: 100vh;
  padding: 34px 18px;
  color: var(--text);
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 18%, transparent), transparent 34%),
    var(--bg);
}

/* Shell container */
.tool-shell {
  width: min(var(--container-width), 100%);
  margin: 0 auto;
}

/* Back button */
.back-link {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--text);
  text-decoration: none;
  background: color-mix(in srgb, var(--surface) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  font-size: 0.86rem;
  font-weight: 800;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.back-link:hover {
  transform: translateY(-1px);
  color: var(--accent);
  background: color-mix(in srgb, var(--surface-hover) 82%, transparent);
  border-color: color-mix(in srgb, var(--accent) 32%, var(--border));
}

/* Header card */




/* Error */
.tt-error {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-size: 0.88rem;
  font-weight: 600;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.tt-retry {
  margin-left: auto;
  padding: 5px 14px;
  border-radius: 8px;
  border: 1px solid #ef4444;
  background: transparent;
  color: #ef4444;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
}

.tt-retry:hover {
  background: #ef4444;
  color: #ffffff;
}

/* Grid */
.tt-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

/* Card */
.tt-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.tt-card:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.tt-card-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: #ffffff;
  font-size: 1rem;
}

.tt-card-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.tt-card-label {
  color: var(--text-muted);
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tt-card-value {
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 800;
  word-break: break-all;
}

/* Skeleton */
.tt-card.skeleton {
  pointer-events: none;
}

.sk-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--surface-hover);
  flex-shrink: 0;
  animation: shimmer 1.4s ease infinite;
}

.sk-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.sk-label {
  height: 10px;
  width: 50%;
  border-radius: 6px;
  background: var(--surface-hover);
  animation: shimmer 1.4s ease infinite;
}

.sk-value {
  height: 14px;
  width: 75%;
  border-radius: 6px;
  background: var(--surface-hover);
  animation: shimmer 1.4s ease infinite 0.2s;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Results */
.tt-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tt-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.tt-refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
}

.tt-refresh-btn:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.tt-refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tt-timestamp {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.78rem;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* Mobile */
@media (max-width: 480px) {
  .tt-grid {
    grid-template-columns: 1fr;
  }
}

/* ===== Tool header (same layout as TikTok) ===== */
.tool-hero {
  display: flex;
  align-items: center;
  gap: clamp(12px, 3vw, 18px);
  margin-bottom: 18px;
  padding: clamp(16px, 4vw, 24px);
  border-radius: 22px;
  background: color-mix(in srgb, var(--surface) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  backdrop-filter: blur(14px);
}

.tt-icon-wrap {
  width: clamp(48px, 10vw, 60px);
  height: clamp(48px, 10vw, 60px);
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  color: #ffffff;
  font-size: clamp(1.2rem, 3.5vw, 1.5rem);
  box-shadow: 0 12px 32px rgba(14, 165, 233, 0.35);
}

.tt-hero-text { min-width: 0; }

.tt-title {
  margin: 0 0 4px;
  color: var(--text);
  font-size: clamp(1.2rem, 4vw, 1.65rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.tt-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  line-height: 1.45;
}

@media (max-width: 480px) {
  .tool-hero { gap: 12px; padding: 14px; border-radius: 18px; }
}
</style>
