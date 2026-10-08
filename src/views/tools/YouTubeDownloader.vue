<template>
  <div class="tool-page">
    <div class="tool-shell">

      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fab fa-youtube"></i>
        </div>
        <div class="tt-hero-text">
          <h1 class="tt-title">YouTube Downloader</h1>
          <p class="tt-subtitle">Download YouTube videos or extract audio — free, no signup.</p>
        </div>
        <ToolHowTo :steps="howToSteps" :note="howToNote" />
      </div>

      <!-- Input -->
      <div class="tt-card">
        <div class="tt-input-wrap" :class="{ focused: inputFocused, error: !!error }">
          <i class="fab fa-youtube tt-input-icon" style="color:#ff0000;"></i>
          <input
            v-model="url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
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
          <span v-if="!loading"><i class="fas fa-search"></i> Fetch</span>
          <span v-else class="tt-spinner"></span>
        </button>
      </div>

      <!-- Error -->
      <transition name="fade-slide">
        <div v-if="error" class="tt-error">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
      </transition>

      <!-- Video info + download options -->
      <transition name="fade-slide">
        <div v-if="videoInfo" class="tt-result">

          <!-- Video card -->
          <div class="yt-video-card">
            <img :src="videoInfo.thumbnail" :alt="videoInfo.title" class="yt-thumb" />
            <div class="yt-meta">
              <p class="yt-title">{{ videoInfo.title }}</p>
              <span class="yt-author">
                <i class="fas fa-user-circle"></i>
                {{ videoInfo.author }}
              </span>
            </div>
          </div>

          <!-- Quality / mode selector -->
          <div class="yt-options">
            <div class="yt-section-label">Format</div>
            <div class="yt-mode-row">
              <button
                v-for="m in modes"
                :key="m.value"
                class="yt-mode-btn"
                :class="{ active: mode === m.value }"
                @click="mode = m.value"
              >
                <i :class="m.icon"></i>
                {{ m.label }}
              </button>
            </div>

            <template v-if="mode !== 'audio'">
              <div class="yt-section-label" style="margin-top:12px;">Quality</div>
              <div class="yt-quality-row">
                <button
                  v-for="q in qualities"
                  :key="q"
                  class="yt-quality-btn"
                  :class="{ active: quality === q }"
                  @click="quality = q"
                >
                  {{ q }}
                </button>
              </div>
            </template>
          </div>

          <!-- Download button -->
          <button
            class="yt-dl-btn"
            :class="{ loading: downloading }"
            :disabled="downloading"
            @click="download"
          >
            <span v-if="!downloading">
              <i class="fas fa-download"></i>
              {{ mode === 'audio' ? 'Download Audio (MP3)' : `Download Video (${quality})` }}
            </span>
            <span v-else>
              <span class="tt-spinner"></span>
              Preparing download…
            </span>
          </button>

          <p class="yt-disclaimer">
            <i class="fas fa-info-circle"></i>
            For personal use only. Respect content creator rights.
          </p>

          <button class="tt-reset-btn" @click="reset">
            <i class="fas fa-redo"></i> Download another
          </button>
        </div>
      </transition>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- Suggestions -->
      <tool-suggestions current="/tools/youtube-downloader" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import ToolHowTo from "@/components/tools/ToolHowTo.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "YouTubeDownloader",

  components: { ToolSuggestions, ToolHowTo, AdSlot },

  data() {
    return {
      howToSteps: [
        "Copy any YouTube video URL from your browser or the Share button.",
        "Paste it and click Fetch.",
        "Choose format and quality, then click Download."
      ],
      howToNote: "Powered by cobalt.tools. No data is stored.",
      url: "",
      inputFocused: false,
      loading: false,
      downloading: false,
      error: "",
      videoInfo: null,
      mode: "auto",
      quality: "1080",
      modes: [
        { value: "auto", icon: "fas fa-film", label: "Video + Audio" },
        { value: "mute", icon: "fas fa-video-slash", label: "Video Only" },
        { value: "audio", icon: "fas fa-music", label: "Audio Only" }
      ],
      qualities: ["2160", "1440", "1080", "720", "480", "360"]
    };
  },

  methods: {
    onPaste() {
      this.$nextTick(() => {
        if (this.url.trim()) {
          this.fetchVideo();
        }
      });
    },

    extractVideoId(url) {
      const match = url.match(
        /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );

      return match ? match[1] : null;
    },

    isValidYouTubeUrl(url) {
      return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
    },

    async fetchVideo() {
      const raw = this.url.trim();

      if (!raw) {
        this.error = "Please paste a YouTube URL first.";
        return;
      }

      if (!this.isValidYouTubeUrl(raw)) {
        this.error = "Please enter a valid YouTube URL.";
        return;
      }

      const videoId = this.extractVideoId(raw);

      if (!videoId) {
        this.error = "Could not extract video ID. Make sure the URL is correct.";
        return;
      }

      this.loading = true;
      this.error = "";
      this.videoInfo = null;

      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );

        if (!response.ok) {
          throw new Error("Video not found or is private.");
        }

        const data = await response.json();

        this.videoInfo = {
          id: videoId,
          title: data.title || "YouTube Video",
          author: data.author_name || "Unknown creator",
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        };
      } catch (error) {
        this.error =
          error.message ||
          "Could not fetch video info. The video may be private or unavailable.";
      } finally {
        this.loading = false;
      }
    },

    getDownloadBody() {
      const body = {
        url: this.url.trim(),
        downloadMode: this.mode,
        filenameStyle: "pretty"
      };

      if (this.mode === "audio") {
        body.audioFormat = "mp3";
        body.audioBitrate = "128";
      } else {
        body.videoQuality = this.quality;
      }

      return body;
    },

    openDownloadUrl(downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    getReadableError(errorCode) {
      const errors = {
        "error.api.auth.jwt.missing":
          "Downloader API authentication is missing. Check the backend proxy.",
        "error.api.auth.api-key.missing":
          "Downloader API key is missing. Check your backend environment variables.",
        "error.api.auth.api-key.invalid":
          "Downloader API key is invalid.",
        "error.api.link.unsupported":
          "This YouTube link is not supported.",
        "error.api.link.invalid":
          "Invalid YouTube link. Please check the URL.",
        "error.api.fetch.fail":
          "Failed to fetch download data. Try another video or lower quality.",
        "error.api.content.too-long":
          "This video is too long to process.",
        "error.api.content.blocked":
          "This video is restricted and cannot be downloaded.",
        "error.api.content.region":
          "This video is region-restricted.",
        "error.api.content.private":
          "This video is private or unavailable."
      };

      return errors[errorCode] || errorCode || "Download failed. Please try again.";
    },

    async download() {
      const raw = this.url.trim();

      if (!raw) {
        this.error = "Please paste a YouTube URL first.";
        return;
      }

      if (!this.isValidYouTubeUrl(raw)) {
        this.error = "Please enter a valid YouTube URL.";
        return;
      }

      this.downloading = true;
      this.error = "";

      try {
        const response = await fetch("/api/cobalt-download", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.getDownloadBody())
        });

        const data = await response.json().catch(() => null);

        if (!data) {
          throw new Error("Invalid response from downloader server.");
        }

        if (!response.ok || data.status === "error") {
          const code =
            data.error?.code ||
            data.code ||
            data.message ||
            "Download failed. Try another quality.";

          throw new Error(this.getReadableError(code));
        }

        if ((data.status === "redirect" || data.status === "tunnel") && data.url) {
          this.openDownloadUrl(data.url);
          return;
        }

        if (
          data.status === "picker" &&
          Array.isArray(data.picker) &&
          data.picker.length
        ) {
          const firstItem = data.picker.find((item) => item.url) || data.picker[0];

          if (firstItem?.url) {
            this.openDownloadUrl(firstItem.url);
            return;
          }
        }

        throw new Error("Unexpected downloader response. Please try again.");
      } catch (error) {
        this.error =
          error.message ||
          "Download failed. The video may be restricted or unavailable.";
      } finally {
        this.downloading = false;
      }
    },

    reset() {
      this.url = "";
      this.videoInfo = null;
      this.error = "";
      this.mode = "auto";
      this.quality = "1080";
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





/* Input card */
.tt-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 16px;
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

.tt-input-icon { font-size: 0.82rem; flex-shrink: 0; }

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
.tt-input::placeholder { color: var(--text-muted); }

.tt-clear {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  font-size: 0.78rem;
  flex-shrink: 0;
}
.tt-clear:hover { color: var(--text); }

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
  width: 100%;
  justify-content: center;
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tt-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.tt-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.tt-spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

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
  margin-bottom: 14px;
}

/* Result */
.tt-result {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  margin-bottom: 18px;
}

.yt-video-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.yt-thumb {
  width: 120px;
  height: 68px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}
.yt-meta { flex: 1; min-width: 0; }
.yt-title {
  margin: 0 0 6px;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.yt-author {
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Options */
.yt-options {
  padding: 14px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--surface-hover) 50%, transparent);
  border: 1px solid var(--border);
}
.yt-section-label {
  color: var(--text-muted);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.yt-mode-row, .yt-quality-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.yt-mode-btn, .yt-quality-btn {
  padding: 7px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.18s ease;
}
.yt-mode-btn.active, .yt-quality-btn.active {
  color: #ffffff;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  border-color: transparent;
}
.yt-mode-btn:hover:not(.active), .yt-quality-btn:hover:not(.active) {
  border-color: #ff0000;
  color: var(--text);
}

/* Download button */
.yt-dl-btn {
  width: 100%;
  height: 52px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.96rem;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.18s ease, transform 0.18s ease;
  box-shadow: 0 8px 24px rgba(255, 0, 0, 0.28);
}
.yt-dl-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.yt-dl-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.yt-disclaimer {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.74rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
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
  transition: color 0.18s, border-color 0.18s;
  width: 100%;
}
.tt-reset-btn:hover { color: #ff0000; border-color: #ff0000; }

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
.tt-steps { display: flex; flex-direction: column; gap: 10px; }
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

/* Transitions */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .yt-video-card { flex-direction: column; }
  .yt-thumb { width: 100%; height: 180px; }
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
