<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
-->

<template>
  <div class="tool-page">
    <div class="tool-shell">

      <!-- Back -->
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <!-- Header -->
      <div class="tool-hero">
        <div class="st-icon-wrap">
          <i class="fas fa-gauge-high"></i>
        </div>
        <h1 class="st-title">Speed Test</h1>
        <p class="st-subtitle">
          Check your estimated internet speed, latency, and connection quality.
        </p>
      </div>

      <!-- Test Card -->
      <div class="st-card">
        <div class="st-meter">
          <div class="st-meter-ring" :class="{ testing }">
            <div class="st-meter-inner">
              <strong>{{ displaySpeed }}</strong>
              <span>{{ speedLabel }}</span>
            </div>
          </div>
        </div>

        <div class="st-status">
          <h3>{{ statusTitle }}</h3>
          <p>{{ statusText }}</p>
        </div>

        <button
          class="st-btn"
          :class="{ loading: testing }"
          :disabled="testing"
          @click="startSpeedTest"
        >
          <span v-if="!testing">
            <i class="fas fa-play"></i>
            Start Speed Test
          </span>
          <span v-else>
            <span class="st-spinner"></span>
            Testing...
          </span>
        </button>
      </div>

      <!-- Error -->
      <transition name="fade-slide">
        <div v-if="error" class="st-error">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
      </transition>

      <!-- Result -->
      <transition name="fade-slide">
        <div v-if="result" class="st-result">
          <div class="st-result-header">
            <div>
              <h3>Speed Test Result</h3>
              <p>{{ result.quality }}</p>
            </div>

            <button class="st-reset-btn" @click="resetTest">
              <i class="fas fa-redo"></i>
              Test again
            </button>
          </div>

          <div class="st-grid">
            <div class="st-stat">
              <span class="st-stat-icon download">
                <i class="fas fa-download"></i>
              </span>
              <div>
                <small>Download</small>
                <strong>{{ result.download }} Mbps</strong>
              </div>
            </div>

            <div class="st-stat">
              <span class="st-stat-icon upload">
                <i class="fas fa-upload"></i>
              </span>
              <div>
                <small>Upload</small>
                <strong>{{ result.upload }} Mbps</strong>
              </div>
            </div>

            <div class="st-stat">
              <span class="st-stat-icon ping">
                <i class="fas fa-wifi"></i>
              </span>
              <div>
                <small>Latency</small>
                <strong>{{ result.ping }} ms</strong>
              </div>
            </div>

            <div class="st-stat">
              <span class="st-stat-icon type">
                <i class="fas fa-signal"></i>
              </span>
              <div>
                <small>Connection</small>
                <strong>{{ connectionType }}</strong>
              </div>
            </div>
          </div>

          <p class="st-note">
            <i class="fas fa-info-circle"></i>
            Result is estimated only. Browser-based speed tests may vary depending on device,
            Wi-Fi signal, server response, and active downloads.
          </p>
        </div>
      </transition>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- How to use -->
      <div v-if="!result" class="st-howto">
        <h3>How to use</h3>
        <div class="st-steps">
          <div class="st-step">
            <span class="step-num">1</span>
            <span>Close other downloads or streaming apps first for a cleaner result</span>
          </div>
          <div class="st-step">
            <span class="step-num">2</span>
            <span>Tap <strong>Start Speed Test</strong> and wait until the test finishes</span>
          </div>
          <div class="st-step">
            <span class="step-num">3</span>
            <span>Review your estimated download, upload, and latency results</span>
          </div>
        </div>
        <p class="st-note">
          <i class="fas fa-shield-alt"></i>
          No personal data is stored. The test runs only inside your browser.
        </p>
      </div>

      <!-- Suggestions -->
      <tool-suggestions current="/tools/speedtest" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "SpeedTest",
  components: { ToolSuggestions, AdSlot },

  data() {
    return {
      testing: false,
      error: "",
      progressSpeed: 0,
      result: null,
      testFileUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg"
    };
  },

  computed: {
    displaySpeed() {
      if (this.result) return this.result.download;
      if (this.testing) return this.progressSpeed.toFixed(1);
      return "0.0";
    },

    speedLabel() {
      return this.testing || this.result ? "Mbps" : "Ready";
    },

    statusTitle() {
      if (this.testing) return "Testing your connection...";
      if (this.result) return "Test complete";
      return "Ready to test";
    },

    statusText() {
      if (this.testing) {
        return "Please keep this tab open while your connection is being measured.";
      }

      if (this.result) {
        return "Your estimated internet speed result is shown below.";
      }

      return "Start the test to estimate your current internet speed.";
    },

    connectionType() {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      if (!connection || !connection.effectiveType) return "Unknown";

      return connection.effectiveType.toUpperCase();
    }
  },

  methods: {
    async startSpeedTest() {
      this.testing = true;
      this.error = "";
      this.result = null;
      this.progressSpeed = 0;

      try {
        const ping = await this.measurePing();
        const download = await this.measureDownloadSpeed();
        const upload = this.estimateUploadSpeed(download);

        this.result = {
          download: download.toFixed(2),
          upload: upload.toFixed(2),
          ping,
          quality: this.getQualityLabel(download, ping)
        };

        this.progressSpeed = Number(this.result.download);
      } catch (err) {
        this.error = err.message || "Speed test failed. Please try again.";
      } finally {
        this.testing = false;
      }
    },

    async measurePing() {
      const start = performance.now();

      await fetch(this.testFileUrl + "?ping=" + Date.now(), {
        method: "HEAD",
        cache: "no-store"
      });

      const end = performance.now();
      return Math.max(1, Math.round(end - start));
    },

    async measureDownloadSpeed() {
      const startTime = performance.now();

      const response = await fetch(this.testFileUrl + "?speedtest=" + Date.now(), {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("Unable to connect to the test server.");
      }

      const blob = await response.blob();
      const endTime = performance.now();

      const fileSizeBits = blob.size * 8;
      const durationSeconds = (endTime - startTime) / 1000;
      const speedMbps = fileSizeBits / durationSeconds / 1024 / 1024;

      this.progressSpeed = speedMbps;

      return speedMbps;
    },

    estimateUploadSpeed(downloadSpeed) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      if (connection && connection.downlink) {
        return Math.max(0.5, connection.downlink * 0.45);
      }

      return Math.max(0.5, downloadSpeed * 0.35);
    },

    getQualityLabel(download, ping) {
      if (download >= 50 && ping <= 60) return "Excellent connection";
      if (download >= 25 && ping <= 100) return "Good connection";
      if (download >= 10 && ping <= 150) return "Fair connection";
      return "Slow connection";
    },

    resetTest() {
      this.testing = false;
      this.error = "";
      this.progressSpeed = 0;
      this.result = null;
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
  width: min(760px, 100%);
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
.tool-hero {
  margin-bottom: 22px;
  padding: clamp(20px, 4vw, 36px);
  border-radius: 26px;
  background: color-mix(in srgb, var(--surface) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.st-icon-wrap {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #ffffff;
  font-size: 1.55rem;
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.28);
}

.st-title {
  margin: 0;
  color: var(--text);
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.st-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.5;
}

/* Main card */
.st-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 22px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.st-meter {
  display: grid;
  place-items: center;
}

.st-meter-ring {
  width: 170px;
  height: 170px;
  padding: 12px;
  border-radius: 50%;
  background:
    conic-gradient(
      from 140deg,
      color-mix(in srgb, var(--accent) 90%, #2563eb),
      color-mix(in srgb, var(--accent) 55%, #22c55e),
      color-mix(in srgb, var(--accent) 20%, transparent),
      color-mix(in srgb, var(--border) 90%, transparent)
    );
  display: grid;
  place-items: center;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}

.st-meter-ring.testing {
  animation: pulseMeter 1.2s ease-in-out infinite;
}

.st-meter-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  align-content: center;
  gap: 2px;
  text-align: center;
}

.st-meter-inner strong {
  color: var(--text);
  font-size: 2rem;
  font-weight: 950;
  letter-spacing: -0.04em;
}

.st-meter-inner span {
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@keyframes pulseMeter {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.025);
    filter: brightness(1.08);
  }
}

.st-status {
  text-align: center;
}

.st-status h3 {
  margin: 0 0 6px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 900;
}

.st-status p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.5;
}

.st-btn {
  width: 100%;
  height: 52px;
  padding: 0 22px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #2563eb));
  color: #ffffff;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 850;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.st-btn:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-1px);
}

.st-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.st-spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error */
.st-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-size: 0.88rem;
  font-weight: 650;
  margin-bottom: 16px;
}

/* Result */
.st-result {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  margin-bottom: 16px;
}

.st-result-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.st-result-header h3 {
  margin: 0 0 4px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 900;
}

.st-result-header p {
  margin: 0;
  color: var(--accent);
  font-size: 0.84rem;
  font-weight: 850;
}

.st-reset-btn {
  flex-shrink: 0;
  background: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 9px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.st-reset-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.st-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.st-stat {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  background: var(--bg);
  border: 1px solid var(--border);
}

.st-stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: #ffffff;
  flex-shrink: 0;
}

.st-stat-icon.download {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}

.st-stat-icon.upload {
  background: linear-gradient(135deg, #059669, #047857);
}

.st-stat-icon.ping {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.st-stat-icon.type {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
}

.st-stat small {
  display: block;
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 800;
  margin-bottom: 3px;
}

.st-stat strong {
  display: block;
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 950;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.st-note {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-size: 0.78rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 7px;
}

.st-note i {
  margin-top: 2px;
}

/* How to */
.st-howto {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
}

.st-howto h3 {
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.st-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.st-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.5;
}

.step-num {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 900;
  display: grid;
  place-items: center;
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
@media (max-width: 640px) {
  .tool-page {
    padding: 24px 14px;
  }

  .st-card,
  .st-result,
  .st-howto {
    padding: 16px;
    border-radius: 18px;
  }

  .st-meter-ring {
    width: 150px;
    height: 150px;
  }

  .st-meter-inner strong {
    font-size: 1.7rem;
  }

  .st-result-header {
    flex-direction: column;
  }

  .st-reset-btn {
    width: 100%;
    justify-content: center;
  }

  .st-grid {
    grid-template-columns: 1fr;
  }
}
</style>