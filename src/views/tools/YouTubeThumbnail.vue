<template>
  <div class="tool-page">
    <div class="tool-shell">
      <!-- Header -->
      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fab fa-youtube"></i>
        </div>
        <div class="tt-hero-text">
          <h1 class="tt-title">YouTube Thumbnail Downloader</h1>

          <p class="tt-subtitle">
            Paste any YouTube URL or video ID to view and download thumbnails in multiple quality sizes.
          </p>
        </div>
      </div>

      <!-- Input -->
      <div class="tt-input-card">
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
            @keydown.enter="extractThumbnails"
            spellcheck="false"
            autocomplete="off"
          />

          <button
            v-if="inputVal"
            class="tt-clear"
            type="button"
            @click="reset"
            title="Clear"
            aria-label="Clear input"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <button
          class="tt-btn"
          type="button"
          @click="extractThumbnails"
          :disabled="!inputVal.trim()"
        >
          <i class="fas fa-search"></i>
          Get Thumbnails
        </button>
      </div>

      <!-- Error -->
      <transition name="fade-slide">
        <div v-if="error" class="tt-error">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
      </transition>

      <!-- Results -->
      <transition name="fade-slide">
        <div v-if="videoId && thumbnails.length" class="tt-results">
          <div class="tt-results-header">
            <div>
              <p class="tt-video-id">
                Video ID:
                <code>{{ videoId }}</code>
              </p>

              <a
                :href="youtubeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="tt-open-video"
              >
                <i class="fas fa-external-link-alt"></i>
                Open YouTube Video
              </a>
            </div>

            <button class="tt-copy-btn" type="button" @click="copyVideoId">
              <i class="fas fa-copy"></i>
              Copy ID
            </button>
          </div>

          <div class="tt-grid">
            <div
              v-for="thumb in thumbnails"
              :key="thumb.quality"
              class="tt-card"
            >
              <div class="tt-card-img-wrap">
                <img
                  v-if="!thumb.broken"
                  :src="thumb.url"
                  :alt="thumb.label"
                  class="tt-card-img"
                  @error="markBroken(thumb.quality)"
                  @load="markAvailable(thumb.quality)"
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

              <div class="tt-card-actions">
                <a
                  :href="thumb.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tt-action-btn"
                  :class="{ disabled: thumb.broken }"
                >
                  <i class="fas fa-eye"></i>
                  View
                </a>

                <button
                  type="button"
                  class="tt-action-btn"
                  :class="{ disabled: thumb.broken }"
                  :disabled="thumb.broken"
                  @click="copyThumbnailUrl(thumb.url)"
                >
                  <i class="fas fa-link"></i>
                  Copy
                </button>

                <button
                  type="button"
                  class="tt-action-btn primary"
                  :class="{ disabled: thumb.broken }"
                  :disabled="thumb.broken"
                  @click="downloadThumbnail(thumb)"
                >
                  <i class="fas fa-download"></i>
                  Download
                </button>
              </div>
            </div>
          </div>

          <button class="tt-reset-btn" type="button" @click="reset">
            <i class="fas fa-redo"></i>
            Try another video
          </button>
        </div>
      </transition>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- How to -->
      <div v-if="!videoId" class="tt-howto">
        <h3>How to use</h3>

        <div class="tt-steps">
          <div class="tt-step">
            <span class="step-num">1</span>
            <span>
              Copy any YouTube video URL or video ID.
              Example: <code>dQw4w9WgXcQ</code>
            </span>
          </div>

          <div class="tt-step">
            <span class="step-num">2</span>
            <span>
              Paste it in the box above and click <strong>Get Thumbnails</strong>.
            </span>
          </div>

          <div class="tt-step">
            <span class="step-num">3</span>
            <span>
              View, copy, or download any thumbnail quality.
            </span>
          </div>
        </div>

        <p class="tt-note">
          <i class="fas fa-shield-alt"></i>
          Thumbnails are loaded directly from YouTube's CDN. No data stored.
        </p>
      </div>

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
      inputFocused: false,
      error: "",
      thumbnails: [],
      copiedTimer: null
    };
  },

  computed: {
    youtubeUrl() {
      return this.videoId
        ? `https://www.youtube.com/watch?v=${this.videoId}`
        : "";
    }
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

      const patterns = [
        /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /(?:v=)([a-zA-Z0-9_-]{11})/
      ];

      for (const pattern of patterns) {
        const match = trimmed.match(pattern);
        if (match) return match[1];
      }

      if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
        return trimmed;
      }

      return null;
    },

    buildThumbnails(id) {
      return [
        {
          quality: "maxresdefault",
          label: "Max Resolution",
          resolution: "1280 × 720",
          url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
          broken: false
        },
        {
          quality: "sddefault",
          label: "Standard Definition",
          resolution: "640 × 480",
          url: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
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
          quality: "default",
          label: "Default",
          resolution: "120 × 90",
          url: `https://img.youtube.com/vi/${id}/default.jpg`,
          broken: false
        }
      ];
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
      this.thumbnails = this.buildThumbnails(id);
    },

    markBroken(quality) {
      this.thumbnails = this.thumbnails.map((thumb) =>
        thumb.quality === quality ? { ...thumb, broken: true } : thumb
      );
    },

    markAvailable(quality) {
      this.thumbnails = this.thumbnails.map((thumb) =>
        thumb.quality === quality ? { ...thumb, broken: false } : thumb
      );
    },

    async downloadThumbnail(thumb) {
      if (!thumb?.url || thumb.broken) {
        this.error = "Thumbnail is not available.";
        return;
      }

      try {
        const response = await fetch(thumb.url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `youtube-${this.videoId}-${thumb.quality}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        const link = document.createElement("a");
        link.href = thumb.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.download = `youtube-${this.videoId}-${thumb.quality}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },

    async copyThumbnailUrl(url) {
      if (!url) {
        this.error = "Thumbnail URL is missing.";
        return;
      }

      try {
        await navigator.clipboard.writeText(url);
        this.error = "";
      } catch (error) {
        this.error = "Could not copy thumbnail URL.";
      }
    },

    async copyVideoId() {
      if (!this.videoId) {
        this.error = "No video ID to copy.";
        return;
      }

      try {
        await navigator.clipboard.writeText(this.videoId);
        this.error = "";
      } catch (error) {
        this.error = "Could not copy video ID.";
      }
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
.tool-page {
  min-height: 100vh;
  padding: 34px 18px;
  color: var(--text);
  background:
    radial-gradient(circle at top left, color-mix(in srgb, #ff0000 12%, transparent), transparent 34%),
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
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.back-link:hover {
  transform: translateY(-1px);
  color: var(--accent);
  background: color-mix(in srgb, var(--surface-hover) 82%, transparent);
  border-color: color-mix(in srgb, var(--accent) 32%, var(--border));
}





.tt-input-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  border-color: #ff0000;
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
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
  width: 100%;
  justify-content: center;
}

.tt-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.tt-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

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

.tt-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
}

.tt-results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
}

.tt-video-id {
  margin: 0 0 7px;
  color: var(--text-secondary);
  font-size: 0.86rem;
}

.tt-video-id code {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.83rem;
  color: #ff0000;
}

.tt-open-video {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 800;
}

.tt-open-video:hover {
  color: #ff0000;
}

.tt-copy-btn {
  flex-shrink: 0;
  height: 38px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.tt-copy-btn:hover {
  color: #ff0000;
  border-color: rgba(255, 0, 0, 0.35);
}

.tt-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
  background: var(--surface-hover);
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

.tt-card-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  padding: 0 12px 12px;
}

.tt-action-btn {
  min-height: 38px;
  padding: 8px 8px;
  border-radius: 11px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-secondary);
  text-decoration: none;
  font-family: inherit;
  font-size: 0.76rem;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: opacity 0.18s ease, transform 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.tt-action-btn:hover:not(.disabled) {
  transform: translateY(-1px);
  color: #ff0000;
  border-color: rgba(255, 0, 0, 0.35);
}

.tt-action-btn.primary {
  border-color: transparent;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: #ffffff;
}

.tt-action-btn.primary:hover:not(.disabled) {
  color: #ffffff;
  opacity: 0.88;
}

.tt-action-btn.disabled,
.tt-action-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

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
  color: #ff0000;
  border-color: #ff0000;
}

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
  background: rgba(255, 0, 0, 0.1);
  color: #ff0000;
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 0.82rem;
}

.step-num {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: rgba(255, 0, 0, 0.12);
  color: #ff0000;
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
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



  .tt-grid {
    grid-template-columns: 1fr;
  }

  .tt-results-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .tt-copy-btn {
    width: 100%;
    justify-content: center;
  }

  .tt-card-actions {
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
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: #ffffff;
  font-size: clamp(1.2rem, 3.5vw, 1.5rem);
  box-shadow: 0 12px 32px rgba(255, 0, 0, 0.28);
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