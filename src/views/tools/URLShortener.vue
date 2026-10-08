<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
-->

<template>
  <div class="tool-page">
    <div class="tool-shell">
      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fas fa-link"></i>
        </div>
        <div class="tt-hero-text">
          <h1 class="tt-title">URL Shortener</h1>
          <p class="tt-subtitle">
            Shorten long links into clean, shareable URLs in seconds.
          </p>
        </div>
        <ToolHowTo :steps="howToSteps" :note="howToNote" />
      </div>

      <!-- Main Card -->
      <div class="shortener-card">
        <form class="shortener-form" @submit.prevent="shortenUrl">
          <label for="longUrl" class="input-label">Enter your long URL</label>

          <div class="url-input-wrap" :class="{ focused: isFocused, error: errorMessage }">
            <i class="fas fa-globe"></i>

            <input
              id="longUrl"
              v-model.trim="longUrl"
              type="url"
              inputmode="url"
              autocomplete="url"
              placeholder="https://example.com/your-long-link"
              @focus="isFocused = true"
              @blur="isFocused = false"
            />

            <button
              v-if="longUrl"
              type="button"
              class="clear-btn"
              aria-label="Clear URL"
              @click="resetInput"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <p v-if="errorMessage" class="error-message">
            <i class="fas fa-circle-exclamation"></i>
            {{ errorMessage }}
          </p>

          <button class="shorten-btn" type="submit" :disabled="isLoading">
            <span v-if="!isLoading">
              <i class="fas fa-wand-magic-sparkles"></i>
              Shorten URL
            </span>

            <span v-else>
              <span class="btn-spinner"></span>
              Shortening...
            </span>
          </button>
        </form>

        <!-- Result -->
        <transition name="fade-slide">
          <div v-if="shortUrl" class="result-card">
            <div class="result-header">
              <div>
                <h3>Shortened URL</h3>
                <p>Your link is ready to copy or open.</p>
              </div>

              <button class="reset-btn" type="button" @click="resetInput">
                <i class="fas fa-redo"></i>
                New link
              </button>
            </div>

            <div class="short-link-box">
              <a
                :href="shortUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="result-link"
              >
                {{ shortUrl }}
              </a>

              <button class="copy-btn" type="button" @click="copyShortUrl">
                <i :class="copied ? 'fas fa-check' : 'far fa-copy'"></i>
                {{ copied ? "Copied" : "Copy" }}
              </button>
            </div>

            <div class="original-url">
              <span>Original URL</span>
              <p>{{ normalizedUrl }}</p>
            </div>
          </div>
        </transition>
      </div>

      <!-- Error note after card -->
      <transition name="fade-slide">
        <div v-if="errorMessage && !shortUrl" class="support-note">
          <i class="fas fa-info-circle"></i>
          Make sure the URL starts with a valid domain, like google.com or https://example.com.
        </div>
      </transition>

      <!-- Ad -->
      <AdSlot type="banner" show-smartlink />

      <!-- Tips -->
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div>
            <strong>Quick result</strong>
            <p>Best for portfolio links, social links, forms, and shared resources.</p>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">
            <i class="fas fa-triangle-exclamation"></i>
          </div>
          <div>
            <strong>Link safety</strong>
            <p>Do not shorten private, sensitive, or suspicious links.</p>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <tool-suggestions current="/tools/url-shortener" />
    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import ToolHowTo from "@/components/tools/ToolHowTo.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "URLShortener",

  components: {
    ToolSuggestions,
    ToolHowTo,
    AdSlot
  },

  data() {
    return {
      howToSteps: [
        "Paste or type the long URL you want to shorten.",
        "Click Shorten URL and wait for the result.",
        "Copy the short link or open it in a new tab."
      ],
      howToNote: "No login needed. Links are made through a public shortening service.",
      longUrl: "",
      normalizedUrl: "",
      shortUrl: "",
      errorMessage: "",
      isLoading: false,
      copied: false,
      isFocused: false
    };
  },

  methods: {
    normalizeUrl(value) {
      const trimmed = value.trim();

      if (!trimmed) return "";

      if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
      }

      return `https://${trimmed}`;
    },

    isValidUrl(value) {
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    },

    async shortenUrl() {
      this.errorMessage = "";
      this.shortUrl = "";
      this.copied = false;

      const normalized = this.normalizeUrl(this.longUrl);
      this.normalizedUrl = normalized;

      if (!normalized) {
        this.errorMessage = "Please enter a URL first.";
        return;
      }

      if (!this.isValidUrl(normalized)) {
        this.errorMessage = "Please enter a valid URL.";
        return;
      }

      this.isLoading = true;

      try {
        const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(
          normalized
        )}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok || data.errorcode || data.errormessage) {
          throw new Error(data.errormessage || "Unable to shorten this URL.");
        }

        if (!data.shorturl) {
          throw new Error("No short URL returned. Please try again.");
        }

        this.shortUrl = data.shorturl;
      } catch (error) {
        console.error("URL shortener error:", error);
        this.errorMessage =
          error.message || "Something went wrong. Please try another link.";
      } finally {
        this.isLoading = false;
      }
    },

    async copyShortUrl() {
      if (!this.shortUrl) return;

      try {
        await navigator.clipboard.writeText(this.shortUrl);
        this.copied = true;

        window.setTimeout(() => {
          this.copied = false;
        }, 1600);
      } catch (error) {
        console.error("Copy failed:", error);
        this.errorMessage = "Copy failed. Please copy the link manually.";
      }
    },

    resetInput() {
      this.longUrl = "";
      this.normalizedUrl = "";
      this.shortUrl = "";
      this.errorMessage = "";
      this.copied = false;
    }
  }
};
</script>

<style scoped>
.tool-page {
  min-height: 100vh;
  padding: 34px 18px;
  color: var(--text);
  background:
    radial-gradient(
      circle at top left,
      color-mix(in srgb, var(--accent) 18%, transparent),
      transparent 34%
    ),
    var(--bg);
}

.tool-shell {
  width: min(var(--container-width), 100%);
  margin: 0 auto;
}

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
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.back-link:hover {
  transform: translateY(-1px);
  color: var(--accent);
  background: color-mix(in srgb, var(--surface-hover) 82%, transparent);
  border-color: color-mix(in srgb, var(--accent) 32%, var(--border));
}





.shortener-card,
.howto-card,
.tip-card {
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
}

.shortener-card {
  padding: 22px;
  border-radius: 22px;
  margin-bottom: 16px;
}

.shortener-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-label {
  color: var(--text);
  font-size: 0.86rem;
  font-weight: 900;
}

.url-input-wrap {
  min-height: 58px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  border-radius: 18px;
  background: color-mix(in srgb, var(--bg) 72%, var(--surface));
  border: 1.5px solid color-mix(in srgb, var(--border) 88%, transparent);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.url-input-wrap.focused {
  border-color: color-mix(in srgb, var(--accent) 72%, var(--border));
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 14%, transparent);
}

.url-input-wrap.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
}

.url-input-wrap i {
  color: var(--accent);
  font-size: 1rem;
  flex-shrink: 0;
}

.url-input-wrap input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 700;
}

.url-input-wrap input::placeholder {
  color: color-mix(in srgb, var(--text-secondary) 72%, transparent);
  font-weight: 600;
}

.clear-btn {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 999px;
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--text) 8%, transparent);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    color 0.18s ease;
}

.clear-btn:hover {
  transform: scale(1.04);
  color: var(--text);
  background: color-mix(in srgb, var(--text) 13%, transparent);
}

.clear-btn i {
  color: inherit;
  font-size: 0.78rem;
}

.error-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  color: #ef4444;
  font-size: 0.84rem;
  font-weight: 800;
  line-height: 1.5;
}

.error-message i {
  margin-top: 2px;
}

.shorten-btn {
  width: 100%;
  min-height: 54px;
  border: 0;
  border-radius: 18px;
  color: #ffffff;
  background: linear-gradient(135deg, var(--accent), #0f766e);
  font-family: inherit;
  font-size: 0.94rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 16px 32px color-mix(in srgb, var(--accent) 28%, transparent);
  transition:
    transform 0.18s ease,
    opacity 0.18s ease,
    box-shadow 0.18s ease;
}

.shorten-btn span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.shorten-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 20px 40px color-mix(in srgb, var(--accent) 34%, transparent);
}

.shorten-btn:disabled {
  opacity: 0.72;
  cursor: not-allowed;
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.result-card {
  margin-top: 18px;
  padding: 18px;
  border-radius: 20px;
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 12%, transparent),
      color-mix(in srgb, var(--surface) 88%, transparent)
    );
  border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--border));
}

.result-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
}

.result-header h3 {
  margin: 0 0 4px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 900;
}

.result-header p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.84rem;
  line-height: 1.5;
}

.reset-btn {
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
  transition:
    color 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}

.reset-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.short-link-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--bg) 76%, var(--surface));
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
}

.result-link {
  width: 100%;
  min-width: 0;
  color: var(--accent);
  font-size: 0.96rem;
  font-weight: 950;
  text-decoration: none;
  word-break: break-all;
}

.result-link:hover {
  text-decoration: underline;
}

.copy-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border: 0;
  border-radius: 13px;
  color: var(--bg);
  background: var(--text);
  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
}

.copy-btn:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.original-url {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
}

.original-url span {
  display: block;
  margin-bottom: 5px;
  color: var(--text-secondary);
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.original-url p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.84rem;
  line-height: 1.55;
  word-break: break-all;
}

.support-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 16px;
}

.support-note i {
  margin-top: 2px;
}

.howto-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  margin-top: 16px;
}

.howto-card h3 {
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.howto-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.howto-step {
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

.tool-note {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-size: 0.78rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 7px;
}

.tool-note i {
  margin-top: 2px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;
  margin-bottom: 16px;
}

.tip-card {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 18px;
  border-radius: 20px;
}

.tip-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: color-mix(in srgb, var(--accent) 13%, transparent);
  color: var(--accent);
  font-size: 1rem;
}

.tip-card strong {
  display: block;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 950;
  margin-bottom: 4px;
}

.tip-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.81rem;
  line-height: 1.5;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .tool-page {
    padding: 24px 14px;
  }

  .back-link {
    margin-bottom: 16px;
  }



  .shortener-card,
  .howto-card {
    padding: 16px;
    border-radius: 18px;
  }

  .url-input-wrap {
    min-height: 54px;
    border-radius: 16px;
  }

  .shorten-btn {
    min-height: 52px;
    border-radius: 16px;
  }

  .result-header {
    flex-direction: column;
  }

  .reset-btn {
    width: 100%;
    justify-content: center;
  }

  .short-link-box {
    flex-direction: column;
    align-items: stretch;
  }

  .copy-btn {
    width: 100%;
    justify-content: center;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .tip-card {
    padding: 16px;
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
  background: linear-gradient(135deg, var(--accent), #0f766e);
  color: #ffffff;
  font-size: clamp(1.2rem, 3.5vw, 1.5rem);
  box-shadow: 0 14px 34px color-mix(in srgb, var(--accent) 34%, transparent);
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