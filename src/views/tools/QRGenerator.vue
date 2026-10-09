<template>
  <div class="tool-page">
    <div class="tool-shell">

      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fas fa-qrcode"></i>
        </div>
        <div class="tt-hero-text">
          <h1 class="tt-title">QR Code Generator</h1>
          <p class="tt-subtitle">Type any text or URL to generate a QR code instantly. Free and no sign-up needed.</p>
        </div>
        <ToolHowTo :steps="howToSteps" title="Tips" />
      </div>

      <!-- Input area -->
      <div class="tt-card">
        <div class="tt-input-wrap" :class="{ focused: inputFocused }">
          <i class="fas fa-keyboard tt-input-icon"></i>
          <input
            v-model="text"
            type="text"
            placeholder="Enter text or URL..."
            class="tt-input"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            spellcheck="false"
            autocomplete="off"
          />
          <button v-if="text" class="tt-clear" @click="text = ''" title="Clear">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Size selector -->
        <div class="tt-options">
          <label class="tt-opt-label">Size:</label>
          <div class="tt-size-group">
            <button
              v-for="s in sizes"
              :key="s"
              class="tt-size-btn"
              :class="{ active: size === s }"
              @click="size = s"
            >
              {{ s }}px
            </button>
          </div>
        </div>
      </div>

      <!-- Ad -->
      <AdSlot type="banner" show-smartlink />

      <!-- QR Display -->
      <div class="tt-qr-area">
        <transition name="fade-slide" mode="out-in">
          <div v-if="text.trim()" key="qr" class="tt-qr-card">
            <div class="tt-qr-wrap">
              <img
                :src="qrUrl"
                :alt="`QR code for: ${text}`"
                class="tt-qr-img"
                :style="{ width: size + 'px', height: size + 'px' }"
              />
            </div>
            <p class="tt-qr-caption">{{ text.length > 60 ? text.slice(0, 60) + '...' : text }}</p>
            <a
              :href="qrUrl"
              :download="`qr-code.png`"
              class="tt-dl-btn"
            >
              <i class="fas fa-download"></i> Download QR Code
            </a>
          </div>
          <div v-else key="placeholder" class="tt-qr-placeholder">
            <i class="fas fa-qrcode tt-placeholder-icon"></i>
            <p>Your QR code will appear here</p>
          </div>
        </transition>
      </div>

      <!-- Suggestions -->
      <tool-suggestions current="/tools/qr-generator" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import ToolHowTo from "@/components/tools/ToolHowTo.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "QRGenerator",

  components: { ToolSuggestions, ToolHowTo, AdSlot },

  data() {
    return {
      howToSteps: [
        "Type a URL, text, phone number, Wi-Fi details, or email.",
        "Choose a larger size for printing, smaller for screens.",
        "Download the QR as a PNG."
      ],
      text: "",
      size: 240,
      sizes: [160, 200, 240, 280],
      inputFocused: false
    };
  },

  computed: {
    qrUrl() {
      if (!this.text.trim()) return "";
      const encoded = encodeURIComponent(this.text.trim());
      return `https://api.qrserver.com/v1/create-qr-code/?size=${this.size}x${this.size}&data=${encoded}&bgcolor=ffffff&color=000000`;
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




/* Card */
.tt-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 16px;
}

.tt-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  height: 52px;
  border-radius: 14px;
  background: var(--bg);
  border: 1.5px solid var(--border);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.tt-input-wrap.focused {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent);
}

.tt-input-icon {
  color: var(--text-muted);
  font-size: 0.82rem;
  flex-shrink: 0;
}

.tt-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-family: inherit;
  font-size: 0.9rem;
}

.tt-input::placeholder {
  color: var(--text-muted);
}

.tt-clear {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  font-size: 0.78rem;
  flex-shrink: 0;
}

.tt-clear:hover {
  color: var(--text);
}

/* Options */
.tt-options {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tt-opt-label {
  color: var(--text-secondary);
  font-size: 0.84rem;
  font-weight: 700;
  flex-shrink: 0;
}

.tt-size-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tt-size-btn {
  padding: 5px 12px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
}

.tt-size-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.tt-size-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}

/* QR Area */
.tt-qr-area {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.tt-qr-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 28px 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.tt-qr-wrap {
  padding: 16px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: var(--shadow);
  display: inline-flex;
}

.tt-qr-img {
  display: block;
  border-radius: 4px;
}

.tt-qr-caption {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.78rem;
  text-align: center;
  max-width: 300px;
  word-break: break-all;
}

.tt-dl-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 28px;
  border-radius: 14px;
  background: var(--accent);
  color: var(--bg);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 800;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.tt-dl-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

/* Placeholder */
.tt-qr-placeholder {
  background: var(--surface);
  border: 2px dashed var(--border);
  border-radius: 22px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.tt-placeholder-icon {
  font-size: 3.5rem;
  color: var(--border);
}

.tt-qr-placeholder p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* How to */
.tt-howto {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
}

.tt-howto h3 {
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tt-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tt-step {
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
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(6px);
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
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #ffffff;
  font-size: clamp(1.2rem, 3.5vw, 1.5rem);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.35);
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
