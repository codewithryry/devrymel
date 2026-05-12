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
        <div class="tt-icon-wrap">
          <i class="fab fa-youtube"></i>
        </div>
        <h1 class="tt-title">YouTube Thumbnail Downloader</h1>
        <p class="tt-subtitle">Paste any YouTube URL or video ID to download thumbnails in all quality sizes.</p>
      </div>

      <!-- Input -->
      <div class="tt-card">
      <div class="tt-input-row">
        <div class="tt-input-wrap" :class="{ focused: inputFocused, error: !!error }">
          <i class="fab fa-youtube tt-input-icon"></i>
          <input
            v-model="inputVal"
            type="text"
            placeholder="https://www.youtube.com/watch?v=... or video ID"
            class="tt-input"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            @input="onInput"
            spellcheck="false"
            autocomplete="off"
          />
          <button v-if="inputVal" class="tt-clear" @click="reset" title="Clear">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <button class="tt-btn" @click="extractThumbnails" :disabled="!inputVal.trim()">
          <i class="fas fa-search"></i> Get Thumbnails
        </button>
      </div>
      </div>

      <!-- Error -->
      <transition name="fade-slide">
        <div v-if="error" class="tt-error">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
      </transition>

      <!-- Thumbnails Grid -->
      <transition name="fade-slide">
        <div v-if="videoId && thumbnails.length" class="tt-results">
          <div class="tt-results-header">
            <p class="tt-video-id">Video ID: <code>{{ videoId }}</code></p>
          </div>
          <div class="tt-grid">
            <div v-for="thumb in thumbnails" :key="thumb.quality" class="tt-card">
              <div class="tt-card-img-wrap">
                <img
                  :src="thumb.url"
                  :alt="thumb.label"
                  class="tt-card-img"
                  @error="thumb.broken = true"
                  @load="thumb.broken = false"
                  :class="{ broken: thumb.broken }"
                />
                <div v-if="thumb.broken" class="tt-img-unavailable">
                  <i class="fas fa-image"></i>
                  <span>Not available</span>
                </div>
              </div>
              <div class="tt-card-info">
                <strong class="tt-card-label">{{ thumb.label }}</strong>
                <small class="tt-card-res">{{ thumb.resolution }}</small>
              </div>
              <a
                :href="thumb.url"
                :download="`youtube-${videoId}-${thumb.quality}.jpg`"
                target="_blank"
                rel="noopener noreferrer"
                class="tt-dl-btn"
                :class="{ disabled: thumb.broken }"
              >
                <i class="fas fa-download"></i> Download
              </a>
            </div>
          </div>

          <button class="tt-reset-btn" @click="reset">
            <i class="fas fa-redo"></i> Try another video
          </button>
        </div>
      </transition>

      <!-- How to -->
      <div v-if="!videoId" class="tt-howto">
        <h3>How to use</h3>
        <div class="tt-steps">
          <div class="tt-step">
            <span class="step-num">1</span>
            <span>Copy any YouTube video URL or just the video ID (e.g. <code>dQw4w9WgXcQ</code>)</span>
          </div>
          <div class="tt-step">
            <span class="step-num">2</span>
            <span>Paste it in the box above and click <strong>Get Thumbnails</strong></span>
          </div>
          <div class="tt-step">
            <span class="step-num">3</span>
            <span>Download any quality — from SD up to Max Resolution (1280×720)</span>
          </div>
        </div>
        <p class="tt-note">
          <i class="fas fa-shield-alt"></i>
          Thumbnails are loaded directly from YouTube's CDN. No data stored.
        </p>
      </div>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- Suggestions -->
      <tool-suggestions current="/tools/youtube-thumbnail" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "YouTubeThumbnail",
  components: { ToolSuggestions, AdSlot },

  data() {
    return {
      inputVal: "",
      videoId: "",
      error: "",
      inputFocused: false,
      thumbnails: []
    };
  },

  methods: {
    onInput() {
      this.error = "";
      if (!this.inputVal.trim()) {
        this.videoId = "";
        this.thumbnails = [];
      }
    },

    extractVideoId(input) {
      const trimmed = input.trim();
      // Try regex for full URLs first
      const match = trimmed.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match) return match[1];
      // Check if bare video ID (11 alphanumeric + _ -)
      if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
      return null;
    },

    extractThumbnails() {
      const id = this.extractVideoId(this.inputVal);
      if (!id) {
        this.error = "Could not find a valid YouTube video ID. Please check the URL or ID.";
        this.videoId = "";
        this.thumbnails = [];
        return;
      }
      this.error = "";
      this.videoId = id;
      this.thumbnails = [
        {
          quality: "maxresdefault",
          label: "Max Resolution",
          resolution: "1280 × 720",
          url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
          broken: false
        },
        {
          quality: "hqdefault",
          label: "High Quality",
          resolution: "480 × 360",
          url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          broken: false
        },
        {
          quality: "mqdefault",
          label: "Medium Quality",
          resolution: "320 × 180",
          url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
          broken: false
        },
        {
          quality: "sddefault",
          label: "Standard Definition",
          resolution: "640 × 480",
          url: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
          broken: false
        }
      ];
    },

    reset() {
      this.inputVal = "";
      this.videoId = "";
      this.error = "";
      this.thumbnails = [];
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

.tt-icon-wrap {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: #ffffff;
  font-size: 1.6rem;
  box-shadow: 0 12px 32px rgba(255, 0, 0, 0.28);
}

.tt-title {
  margin: 0;
  color: var(--text);
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.tt-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.5;
}

/* Input card */
.tt-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
}

/* Input row */
.tt-input-row {
  display: flex;
  gap: 10px;
}

.tt-input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  height: 52px;
  border-radius: 16px;
  background: var(--bg);
  border: 1.5px solid var(--border);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.tt-input-wrap.focused {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent);
}

.tt-input-wrap.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

.tt-input-icon {
  color: #ff0000;
  font-size: 0.9rem;
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

.tt-btn {
  height: 52px;
  padding: 0 22px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: opacity 0.18s ease, transform 0.18s ease;
  flex-shrink: 0;
}

.tt-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.tt-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Error */
.tt-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 16px;
}

/* Results */
.tt-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
}

.tt-results-header {
  display: flex;
  align-items: center;
}

.tt-video-id {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.86rem;
}

.tt-video-id code {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.83rem;
  color: var(--accent);
}

/* Grid */
.tt-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.tt-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.tt-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.tt-card-img-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--surface-hover);
  overflow: hidden;
}

.tt-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tt-card-img.broken {
  display: none;
}

.tt-img-unavailable {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 0.78rem;
}

.tt-img-unavailable i {
  font-size: 1.4rem;
  opacity: 0.4;
}

.tt-card-info {
  padding: 12px 14px 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}

.tt-card-label {
  color: var(--text);
  font-size: 0.86rem;
  font-weight: 800;
}

.tt-card-res {
  color: var(--text-muted);
  font-size: 0.76rem;
}

.tt-dl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin: 0 12px 12px;
  padding: 9px 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: #ffffff;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 800;
  transition: opacity 0.18s ease;
}

.tt-dl-btn:hover:not(.disabled) {
  opacity: 0.85;
}

.tt-dl-btn.disabled {
  background: var(--surface-hover);
  color: var(--text-muted);
  pointer-events: none;
}

/* Reset */
.tt-reset-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 700;
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  transition: color 0.18s ease, border-color 0.18s ease;
}

.tt-reset-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
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

.tt-step code {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  color: var(--accent);
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 0.82rem;
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

.tt-note {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 7px;
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
@media (max-width: 540px) {
  .tt-card {
    padding: 12px;
    border-radius: 16px;
  }
  .tt-input-row {
    flex-direction: column;
    gap: 8px;
  }
  .tt-input-wrap {
    height: 54px;
    border-radius: 14px;
  }
  .tt-input {
    font-size: 1rem;
  }
  .tt-btn {
    width: 100%;
    height: 54px;
    border-radius: 14px;
    justify-content: center;
    font-size: 1rem;
  }
  .tt-grid {
    grid-template-columns: 1fr;
  }
}
</style>
