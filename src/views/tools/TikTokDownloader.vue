<template>
  <div class="tool-page">
    <div class="tool-shell">

      <!-- Hero -->
      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fab fa-tiktok"></i>
        </div>
        <div class="tt-hero-text">
          <h1 class="tt-title">TikTok Downloader</h1>
          <p class="tt-subtitle">Download any public TikTok video — no watermark, free.</p>
        </div>
        <ToolHowTo :steps="howToSteps" :note="howToNote" />
      </div>

      <!-- Input card -->
      <div class="tt-card">
        <div class="tt-input-wrap" :class="{ focused: inputFocused, error: !!error }">
          <i class="fas fa-link tt-input-icon"></i>
          <input
            v-model="url"
            type="url"
            placeholder="Paste TikTok link here..."
            class="tt-input"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            @keydown.enter="fetchVideo"
            @paste="onPaste"
            spellcheck="false"
            autocomplete="off"
          />
          <button v-if="url" class="tt-clear" @click="reset" title="Clear">
            <i class="fas fa-xmark"></i>
          </button>
        </div>
        <button
          class="tt-btn"
          :class="{ loading }"
          :disabled="loading || !url.trim()"
          @click="fetchVideo"
        >
          <template v-if="!loading">
            <i class="fas fa-download"></i>
            Get Video
          </template>
          <span v-else class="tt-spinner"></span>
        </button>
      </div>

      <!-- Error -->
      <transition name="fade-slide">
        <div v-if="error" class="tt-error">
          <i class="fas fa-circle-exclamation"></i>
          <span>{{ error }}</span>
        </div>
      </transition>

      <!-- Placeholder (phones): blank preview of what you'll get, until a video is fetched -->
      <div v-if="!result" class="tt-result tt-placeholder" aria-hidden="true">
        <div class="tt-cover-wrap tt-ph-cover">
          <i :class="loading ? 'fas fa-spinner fa-spin' : 'fab fa-tiktok'"></i>
          <span>{{ loading ? "Fetching video…" : "Your video preview shows here" }}</span>
        </div>

        <div class="tt-meta-row">
          <div class="tt-author">
            <span class="tt-ph-avatar"></span>
            <span class="tt-ph-line" style="width: 90px"></span>
          </div>
          <div class="tt-stats">
            <span><i class="fas fa-heart"></i> –</span>
            <span><i class="fas fa-comment"></i> –</span>
            <span><i class="fas fa-share"></i> –</span>
          </div>
        </div>

        <span class="tt-ph-line" style="width: 85%"></span>
        <span class="tt-ph-line" style="width: 60%"></span>

        <div class="tt-downloads">
          <div class="tt-dl-btn primary tt-ph-btn">
            <span class="tt-dl-icon"><i class="fas fa-video"></i></span>
            <span class="tt-dl-info">
              <strong>Download Video</strong>
              <small>No watermark · MP4</small>
            </span>
            <i class="fas fa-arrow-down tt-dl-arrow"></i>
          </div>
          <div class="tt-dl-btn secondary tt-ph-btn">
            <span class="tt-dl-icon"><i class="fas fa-music"></i></span>
            <span class="tt-dl-info">
              <strong>Download Audio</strong>
              <small>MP3</small>
            </span>
            <i class="fas fa-arrow-down tt-dl-arrow"></i>
          </div>
        </div>
      </div>

      <!-- Result -->
      <transition name="fade-slide">
        <div v-if="result" class="tt-result">

          <!-- Cover banner -->
          <div class="tt-cover-wrap">
            <img :src="result.cover" :alt="result.title" class="tt-cover" />
            <div v-if="result.duration" class="tt-duration">
              <i class="fas fa-clock"></i>
              {{ formatDuration(result.duration) }}
            </div>
          </div>

          <!-- Author + stats -->
          <div class="tt-meta-row">
            <div class="tt-author">
              <img
                v-if="result.authorAvatar"
                :src="result.authorAvatar"
                :alt="result.authorName"
                class="tt-avatar"
              />
              <span class="tt-author-name">@{{ result.authorName }}</span>
            </div>
            <div class="tt-stats">
              <span><i class="fas fa-heart"></i> {{ formatNum(result.likes) }}</span>
              <span><i class="fas fa-comment"></i> {{ formatNum(result.comments) }}</span>
              <span><i class="fas fa-share"></i> {{ formatNum(result.shares) }}</span>
            </div>
          </div>

          <!-- Caption -->
          <p v-if="result.title" class="tt-caption">{{ result.title }}</p>

          <!-- Downloads -->
          <div class="tt-downloads">
            <a
              :href="result.play"
              target="_blank"
              rel="noopener noreferrer"
              class="tt-dl-btn primary"
              :download="`tiktok_${result.id}.mp4`"
            >
              <span class="tt-dl-icon">
                <i class="fas fa-video"></i>
              </span>
              <span class="tt-dl-info">
                <strong>Download Video</strong>
                <small>No watermark · MP4</small>
              </span>
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
              <span class="tt-dl-icon">
                <i class="fas fa-music"></i>
              </span>
              <span class="tt-dl-info">
                <strong>Download Audio</strong>
                <small>MP3</small>
              </span>
              <i class="fas fa-arrow-down tt-dl-arrow"></i>
            </a>
          </div>

          <!-- Download another -->
          <button class="tt-reset-btn" @click="reset">
            <i class="fas fa-rotate-right"></i>
            Download another
          </button>

        </div>
      </transition>

      <!-- Ad -->
      <AdSlot type="banner" show-smartlink />

      <!-- Other tools -->
      <tool-suggestions current="/tools/tiktok" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import ToolHowTo from "@/components/tools/ToolHowTo.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "TikTokDownloader",

  components: { ToolSuggestions, ToolHowTo, AdSlot },

  data() {
    return {
      howToSteps: [
        "Open TikTok and tap Share → Copy link on any video.",
        "Paste the link in the field — it fetches instantly.",
        "Hit Download Video to save the file to your device."
      ],
      howToNote: "No data stored. Works on any public TikTok video.",
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

      const validHosts = ["tiktok.com", "vm.tiktok", "vt.tiktok"];
      if (!validHosts.some((h) => rawUrl.includes(h))) {
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
          title: d.title || "",
          cover: d.cover,
          play: d.play,
          music: d.music,
          duration: d.duration,
          likes: d.digg_count || 0,
          comments: d.comment_count || 0,
          shares: d.share_count || 0,
          authorName: d.author?.nickname || "unknown",
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
/* ── Page ──────────────────────────────────────── */
.tool-page {
  min-height: 100vh;
  padding: clamp(20px, 4vw, 34px) clamp(14px, 4vw, 18px);
  padding-bottom: calc(clamp(20px, 4vw, 34px) + env(safe-area-inset-bottom, 0px));
  color: var(--text);
  background:
    radial-gradient(ellipse at top left, color-mix(in srgb, #010101 22%, transparent), transparent 40%),
    var(--bg);
}

.tool-shell {
  width: min(var(--container-width), 100%);
  margin: 0 auto;
}

/* ── Back link ─────────────────────────────────── */
.back-link {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 10px 16px;
  border-radius: 999px;
  color: var(--text);
  text-decoration: none;
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  font-size: 0.84rem;
  font-weight: 800;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s ease, color 0.2s ease, background 0.2s ease;
}
.back-link:hover,
.back-link:active {
  transform: translateY(-1px);
  color: var(--accent);
  background: color-mix(in srgb, var(--surface-hover) 82%, transparent);
}

/* ── Hero ──────────────────────────────────────── */





/* ── Input card ────────────────────────────────── */
.tt-card {
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 90%, transparent);
  border-radius: 20px;
  padding: clamp(12px, 3vw, 16px);
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tt-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  min-height: 52px;
  border-radius: 14px;
  background: var(--bg);
  border: 1.5px solid color-mix(in srgb, var(--border) 90%, transparent);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.tt-input-wrap.focused {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent);
}

.tt-input-wrap.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.tt-input-icon {
  color: var(--text-secondary);
  font-size: 0.8rem;
  flex-shrink: 0;
  opacity: 0.7;
}

.tt-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-family: inherit;
  font-size: clamp(0.86rem, 2.5vw, 0.92rem);
  padding: 14px 0;
}

.tt-input::placeholder { color: var(--text-secondary); opacity: 0.7; }

.tt-clear {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface) 60%, transparent);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.78rem;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.16s ease, color 0.16s ease;
}
.tt-clear:hover { background: color-mix(in srgb, var(--border) 70%, transparent); color: var(--text); }

.tt-btn {
  min-height: 52px;
  padding: 0 22px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #010101, #3d3d3d);
  color: #ffffff;
  font-family: inherit;
  font-size: clamp(0.88rem, 2.5vw, 0.94rem);
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  letter-spacing: 0.01em;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.18s ease, transform 0.18s ease;
  touch-action: manipulation;
}

.tt-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
.tt-btn:active:not(:disabled) { transform: scale(0.98); }
.tt-btn:disabled { opacity: 0.45; cursor: not-allowed; }

.tt-spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.28);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Error ─────────────────────────────────────── */
.tt-error {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 13px 16px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.09);
  border: 1px solid rgba(239, 68, 68, 0.22);
  color: #f87171;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.45;
  margin-bottom: 14px;
}
.tt-error i { flex-shrink: 0; margin-top: 2px; }

/* ── Result card ───────────────────────────────── */
.tt-result {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(14px, 3.5vw, 20px);
  border-radius: 22px;
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  margin-bottom: 14px;
}

/* Cover image (full-width banner) */
.tt-cover-wrap {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.12);
}

.tt-cover {
  width: 100%;
  height: clamp(160px, 40vw, 260px);
  object-fit: cover;
  object-position: center top;
  display: block;
}

.tt-duration {
  position: absolute;
  bottom: 8px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 8px;
  backdrop-filter: blur(6px);
}

/* Author + stats row */
.tt-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.tt-author {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.tt-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid color-mix(in srgb, var(--border) 80%, transparent);
}

.tt-author-name {
  color: var(--accent);
  font-size: 0.84rem;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tt-stats {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 700;
}
.tt-stats i { margin-right: 3px; font-size: 0.72rem; }

.tt-caption {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.86rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Download buttons ──────────────────────────── */
.tt-downloads {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tt-dl-btn {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: clamp(13px, 3vw, 15px) clamp(13px, 3vw, 16px);
  border-radius: 16px;
  text-decoration: none;
  border: 1.5px solid transparent;
  min-height: 62px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
}

.tt-dl-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(15, 23, 42, 0.12); }
.tt-dl-btn:active { transform: scale(0.98); opacity: 0.88; }

.tt-dl-btn.primary {
  background: linear-gradient(135deg, #010101, #3d3d3d);
  color: #ffffff;
}

.tt-dl-btn.secondary {
  background: color-mix(in srgb, var(--surface-hover) 90%, transparent);
  border-color: color-mix(in srgb, var(--border) 90%, transparent);
  color: var(--text);
}

.tt-dl-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.14);
}

.tt-dl-btn.secondary .tt-dl-icon {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
}

.tt-dl-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.tt-dl-info strong {
  font-size: clamp(0.86rem, 2.5vw, 0.92rem);
  font-weight: 900;
  white-space: nowrap;
}

.tt-dl-info small {
  font-size: 0.72rem;
  opacity: 0.68;
  white-space: nowrap;
}

.tt-dl-arrow {
  flex-shrink: 0;
  font-size: 0.82rem;
  opacity: 0.65;
}

/* ── Reset button ──────────────────────────────── */
.tt-reset-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  background: transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}
.tt-reset-btn:hover {
  color: var(--text);
  border-color: color-mix(in srgb, var(--accent) 36%, var(--border));
  background: color-mix(in srgb, var(--surface-hover) 60%, transparent);
}

/* ── How to use ────────────────────────────────── */
.tt-howto {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: clamp(16px, 4vw, 22px);
  border-radius: 20px;
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
}

.tt-howto-label {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  color: var(--text);
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.09em;
}
.tt-howto-label i { color: var(--accent); font-size: 0.8rem; }

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
  font-size: clamp(0.84rem, 2.5vw, 0.9rem);
  line-height: 1.5;
}

.step-num {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 9px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 900;
  display: grid;
  place-items: center;
}

.tt-note {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 4px 0 0;
  padding: 10px 13px;
  border-radius: 11px;
  background: color-mix(in srgb, var(--surface) 50%, transparent);
  color: var(--text-secondary);
  font-size: 0.78rem;
  line-height: 1.45;
}
.tt-note i { color: var(--accent); flex-shrink: 0; font-size: 0.75rem; }

/* ── Transitions ───────────────────────────────── */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ── Mobile ────────────────────────────────────── */
@media (max-width: 480px) {
  .tool-page {
    padding: 16px 12px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  }

  .back-link { margin-bottom: 14px; padding: 10px 14px; }


  .tt-card {
    padding: 12px;
    border-radius: 18px;
    gap: 9px;
  }

  .tt-input-wrap { min-height: 50px; padding: 0 12px; }

  .tt-btn { min-height: 50px; border-radius: 13px; font-size: 0.9rem; }

  .tt-result { padding: 13px; border-radius: 18px; gap: 12px; }

  .tt-cover { height: 180px; border-radius: 12px; }

  .tt-meta-row { gap: 8px; }

  .tt-stats { gap: 8px; font-size: 0.74rem; }

  .tt-dl-btn {
    padding: 13px;
    border-radius: 14px;
    min-height: 60px;
    gap: 11px;
  }

  .tt-dl-icon {
    width: 40px;
    height: 40px;
    border-radius: 11px;
  }

  .tt-dl-info strong { font-size: 0.88rem; }

  .tt-howto { padding: 14px; border-radius: 18px; }

  .tt-step { font-size: 0.84rem; }
}

/* Very small screens */
@media (max-width: 360px) {
  .tt-stats { display: none; }
  .tt-cover { height: 150px; }
}

/* ===== Tool header (restored) ===== */
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
  background: linear-gradient(135deg, #010101, #2d2d2d);
  color: #ffffff;
  font-size: clamp(1.2rem, 3.5vw, 1.5rem);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
}

.tt-hero-text { min-width: 0; }

.tt-title {
  margin: 0 0 4px;
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

/* ── Placeholder preview (phones only) ── */
.tt-placeholder {
  pointer-events: none;
}

.tt-ph-cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  aspect-ratio: 16 / 10;
  background: var(--surface-soft);
  color: var(--text-muted);
  font-size: 0.78rem;
}

.tt-ph-cover i {
  font-size: 1.6rem;
  opacity: 0.6;
}

.tt-ph-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--surface-soft);
}

.tt-ph-line {
  display: block;
  height: 10px;
  margin: 6px 0;
  border-radius: 999px;
  background: var(--surface-soft);
}

.tt-placeholder .tt-stats {
  opacity: 0.5;
}

/* Download rows look disabled until there's a real video */
.tt-ph-btn {
  opacity: 0.45;
}

@media (min-width: 769px) {
  .tt-placeholder {
    display: none;
  }
}
</style>
