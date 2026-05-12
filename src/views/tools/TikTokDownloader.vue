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
          <i class="fab fa-tiktok"></i>
        </div>
        <h1 class="tt-title">TikTok Downloader</h1>
        <p class="tt-subtitle">Paste a TikTok link — download video without watermark, free.</p>
      </div>

      <!-- Input -->
      <div class="tt-card">
      <div class="tt-input-row">
        <div class="tt-input-wrap" :class="{ focused: inputFocused, error: !!error }">
          <i class="fas fa-link tt-input-icon"></i>
          <input
            v-model="url"
            type="url"
            placeholder="https://www.tiktok.com/@user/video/..."
            class="tt-input"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            @keydown.enter="fetchVideo"
            @paste="onPaste"
            spellcheck="false"
            autocomplete="off"
          />
          <button v-if="url" class="tt-clear" @click="reset" title="Clear">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <button
          class="tt-btn"
          :class="{ loading }"
          :disabled="loading || !url.trim()"
          @click="fetchVideo"
        >
          <span v-if="!loading">
            <i class="fas fa-download"></i> Download
          </span>
          <span v-else class="tt-spinner"></span>
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

      <!-- Result -->
      <transition name="fade-slide">
        <div v-if="result" class="tt-result">

          <!-- Thumbnail + meta -->
          <div class="tt-media">
            <div class="tt-thumb-wrap">
              <img :src="result.cover" :alt="result.title" class="tt-thumb" />
              <div class="tt-duration" v-if="result.duration">{{ formatDuration(result.duration) }}</div>
            </div>

            <div class="tt-meta">
              <div class="tt-author">
                <img :src="result.authorAvatar" class="tt-avatar" :alt="result.authorName" />
                <span class="tt-author-name">{{ result.authorName }}</span>
              </div>
              <p class="tt-caption">{{ result.title }}</p>
              <div class="tt-stats">
                <span><i class="fas fa-heart"></i> {{ formatNum(result.likes) }}</span>
                <span><i class="fas fa-comment"></i> {{ formatNum(result.comments) }}</span>
                <span><i class="fas fa-share"></i> {{ formatNum(result.shares) }}</span>
              </div>
            </div>
          </div>

          <!-- Download buttons -->
          <div class="tt-downloads">
            <a
              :href="result.play"
              target="_blank"
              rel="noopener noreferrer"
              class="tt-dl-btn primary"
              :download="`tiktok_${result.id}.mp4`"
            >
              <i class="fas fa-video"></i>
              <div class="tt-dl-info">
                <strong>Download Video</strong>
                <small>No watermark · MP4</small>
              </div>
              <i class="fas fa-arrow-down tt-dl-arrow"></i>
            </a>

            <a
              v-if="result.music"
              :href="result.music"
              target="_blank"
              rel="noopener noreferrer"
              class="tt-dl-btn secondary"
              :download="`tiktok_audio_${result.id}.mp3`"
            >
              <i class="fas fa-music"></i>
              <div class="tt-dl-info">
                <strong>Download Audio</strong>
                <small>MP3</small>
              </div>
              <i class="fas fa-arrow-down tt-dl-arrow"></i>
            </a>
          </div>

          <!-- New download -->
          <button class="tt-reset-btn" @click="reset">
            <i class="fas fa-redo"></i> Download another
          </button>
        </div>
      </transition>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- How to use -->
      <div v-if="!result" class="tt-howto">
        <h3>How to use</h3>
        <div class="tt-steps">
          <div class="tt-step">
            <span class="step-num">1</span>
            <span>Open TikTok and tap <strong>Share → Copy link</strong> on any video</span>
          </div>
          <div class="tt-step">
            <span class="step-num">2</span>
            <span>Paste the link in the box above</span>
          </div>
          <div class="tt-step">
            <span class="step-num">3</span>
            <span>Hit <strong>Download</strong> and save your video</span>
          </div>
        </div>
        <p class="tt-note">
          <i class="fas fa-shield-alt"></i>
          No data is stored. Works on any public TikTok video.
        </p>
      </div>

      <!-- Suggestions -->
      <tool-suggestions current="/tools/tiktok" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "TikTokDownloader",
  components: { ToolSuggestions, AdSlot },

  data() {
    return {
      url: "",
      loading: false,
      error: "",
      result: null,
      inputFocused: false
    };
  },

  methods: {
    onPaste() {
      this.$nextTick(() => {
        if (this.url.trim()) this.fetchVideo();
      });
    },

    async fetchVideo() {
      const rawUrl = this.url.trim();
      if (!rawUrl) return;

      if (!rawUrl.includes("tiktok.com") && !rawUrl.includes("vm.tiktok") && !rawUrl.includes("vt.tiktok")) {
        this.error = "Please enter a valid TikTok URL.";
        return;
      }

      this.loading = true;
      this.error = "";
      this.result = null;

      try {
        const form = new FormData();
        form.append("url", rawUrl);
        form.append("hd", "1");

        const res = await fetch("https://www.tikwm.com/api/", {
          method: "POST",
          body: form
        });

        const json = await res.json();

        if (json.code !== 0 || !json.data) {
          throw new Error(json.msg || "Could not fetch video. Make sure the video is public.");
        }

        const d = json.data;

        this.result = {
          id: d.id,
          title: d.title || "TikTok Video",
          cover: d.cover,
          play: d.play,
          music: d.music,
          duration: d.duration,
          likes: d.digg_count || 0,
          comments: d.comment_count || 0,
          shares: d.share_count || 0,
          authorName: d.author?.nickname || "Unknown",
          authorAvatar: d.author?.avatar || ""
        };
      } catch (err) {
        this.error = err.message || "Something went wrong. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    reset() {
      this.url = "";
      this.result = null;
      this.error = "";
    },

    formatDuration(s) {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${m}:${String(sec).padStart(2, "0")}`;
    },

    formatNum(n) {
      if (!n) return "0";
      if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
      if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
      return String(n);
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
  background: linear-gradient(135deg, #010101, #2d2d2d);
  color: #ffffff;
  font-size: 1.6rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
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

.tt-btn {
  height: 52px;
  padding: 0 22px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #8b5cf6));
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

.tt-spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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

/* Result */
.tt-result {
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

.tt-media {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.tt-thumb-wrap {
  position: relative;
  flex-shrink: 0;
  width: 90px;
}

.tt-thumb {
  width: 90px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.tt-duration {
  position: absolute;
  bottom: 6px;
  right: 4px;
  background: rgba(0,0,0,0.72);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 6px;
}

.tt-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tt-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tt-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.tt-author-name {
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 800;
}

.tt-caption {
  margin: 0;
  color: var(--text);
  font-size: 0.86rem;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tt-stats {
  display: flex;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 0.76rem;
  font-weight: 700;
}

.tt-stats i {
  margin-right: 4px;
  font-size: 0.7rem;
}

/* Download buttons */
.tt-downloads {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tt-dl-btn {
  display: grid;
  grid-template-columns: 42px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 16px;
  text-decoration: none;
  border: 1.5px solid transparent;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.tt-dl-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
}

.tt-dl-btn.primary {
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #8b5cf6));
  color: #ffffff;
}

.tt-dl-btn.secondary {
  background: var(--surface-hover);
  border-color: var(--border);
  color: var(--text);
}

.tt-dl-btn i:first-child {
  width: 42px;
  height: 42px;
  background: rgba(255,255,255,0.18);
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 1rem;
}

.tt-dl-btn.secondary i:first-child {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
}

.tt-dl-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tt-dl-info strong {
  font-size: 0.88rem;
  font-weight: 900;
}

.tt-dl-info small {
  font-size: 0.72rem;
  opacity: 0.75;
}

.tt-dl-arrow {
  font-size: 0.8rem;
  opacity: 0.7;
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
@media (max-width: 640px) {
  .tt-card {
    padding: 12px;
    border-radius: 16px;
  }
  .tt-input-row {
    flex-direction: column !important;
    gap: 8px;
  }
  .tt-input-wrap {
    height: 54px;
    border-radius: 14px;
    width: 100%;
  }
  .tt-input {
    font-size: 1rem;
  }
  .tt-btn {
    width: 100% !important;
    height: 54px;
    border-radius: 14px;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: unset;
  }
  .tt-media {
    flex-direction: column;
  }
  .tt-thumb-wrap,
  .tt-thumb {
    width: 100%;
    height: 200px;
  }
}
</style>
