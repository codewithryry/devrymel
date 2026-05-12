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
          <i class="fas fa-code"></i>
        </div>
        <h1 class="tt-title">Base64 Encoder / Decoder</h1>
        <p class="tt-subtitle">Encode or decode Base64 strings instantly — fully client-side, nothing leaves your browser.</p>
      </div>

      <!-- Action Buttons -->
      <div class="tt-action-row">
        <button class="tt-action-btn encode" @click="encode">
          <i class="fas fa-lock"></i> Encode
          <span class="tt-arrow">→</span>
        </button>
        <button class="tt-action-btn decode" @click="decode">
          <span class="tt-arrow">←</span>
          <i class="fas fa-unlock"></i> Decode
        </button>
      </div>

      <!-- Error -->
      <transition name="fade-slide">
        <div v-if="error" class="tt-error">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
      </transition>

      <!-- Textareas -->
      <div class="tt-panels">

        <!-- Input -->
        <div class="tt-panel">
          <div class="tt-panel-header">
            <span class="tt-panel-title">
              <i class="fas fa-pen"></i> Input
            </span>
            <button v-if="input" class="tt-panel-action" @click="clearAll">
              <i class="fas fa-trash-alt"></i> Clear
            </button>
          </div>
          <textarea
            v-model="input"
            class="tt-textarea"
            placeholder="Paste your text or Base64 string here..."
            spellcheck="false"
            @input="error = ''"
          ></textarea>
          <div class="tt-char-count">
            {{ input.length.toLocaleString() }} character{{ input.length !== 1 ? 's' : '' }}
          </div>
        </div>

        <!-- Output -->
        <div class="tt-panel">
          <div class="tt-panel-header">
            <span class="tt-panel-title">
              <i class="fas fa-terminal"></i> Output
            </span>
            <button
              v-if="output"
              class="tt-panel-action"
              @click="copyOutput"
              :class="{ copied: justCopied }"
            >
              <i :class="justCopied ? 'fas fa-check' : 'fas fa-copy'"></i>
              {{ justCopied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <textarea
            v-model="output"
            class="tt-textarea output-ta"
            placeholder="Result appears here..."
            readonly
            spellcheck="false"
          ></textarea>
          <div class="tt-char-count">
            {{ output.length.toLocaleString() }} character{{ output.length !== 1 ? 's' : '' }}
          </div>
        </div>

      </div>

      <!-- Note -->
      <p class="tt-note">
        <i class="fas fa-shield-alt"></i>
        Processing is done entirely in your browser. No data is sent to any server.
      </p>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- Suggestions -->
      <tool-suggestions current="/tools/base64" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "Base64Tool",
  components: { ToolSuggestions, AdSlot },

  data() {
    return {
      input: "",
      output: "",
      error: "",
      justCopied: false
    };
  },

  methods: {
    encode() {
      this.error = "";
      if (!this.input.trim() && this.input.length === 0) {
        this.output = "";
        return;
      }
      try {
        this.output = btoa(unescape(encodeURIComponent(this.input)));
      } catch {
        this.error = "Encoding failed. Make sure your input is valid text.";
        this.output = "";
      }
    },

    decode() {
      this.error = "";
      if (!this.input.trim() && this.input.length === 0) {
        this.output = "";
        return;
      }
      try {
        const clean = this.input.trim().replace(/\s+/g, "");
        this.output = decodeURIComponent(escape(atob(clean)));
      } catch {
        this.error = "Invalid Base64 string. Make sure the input is valid Base64 encoded text.";
        this.output = "";
      }
    },

    clearAll() {
      this.input = "";
      this.output = "";
      this.error = "";
    },

    async copyOutput() {
      if (!this.output) return;
      try {
        await navigator.clipboard.writeText(this.output);
        this.justCopied = true;
        setTimeout(() => { this.justCopied = false; }, 2000);
      } catch {
        const el = document.createElement("textarea");
        el.value = this.output;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        this.justCopied = true;
        setTimeout(() => { this.justCopied = false; }, 2000);
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
  background: linear-gradient(135deg, #059669, #047857);
  color: #ffffff;
  font-size: 1.6rem;
  box-shadow: 0 12px 32px rgba(5, 150, 105, 0.35);
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

/* Action row */
.tt-action-row {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.tt-action-btn {
  flex: 1;
  height: 52px;
  border-radius: 16px;
  border: none;
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.tt-action-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.tt-action-btn.encode {
  background: linear-gradient(135deg, #059669, #047857);
  color: #ffffff;
}

.tt-action-btn.decode {
  background: var(--surface);
  border: 1.5px solid var(--border);
  color: var(--text);
}

.tt-arrow {
  font-size: 1rem;
  font-weight: 900;
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

/* Panels */
.tt-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.tt-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
}

.tt-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--surface-hover);
}

.tt-panel-title {
  color: var(--text);
  font-size: 0.84rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 7px;
}

.tt-panel-title i {
  color: var(--accent);
  font-size: 0.78rem;
}

.tt-panel-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
}

.tt-panel-action:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.tt-panel-action.copied {
  border-color: #22c55e;
  color: #22c55e;
}

.tt-textarea {
  flex: 1;
  width: 100%;
  min-height: 240px;
  padding: 16px;
  border: none;
  outline: none;
  resize: vertical;
  background: transparent;
  color: var(--text);
  font-family: "Courier New", Courier, monospace;
  font-size: 0.86rem;
  line-height: 1.6;
  box-sizing: border-box;
}

.tt-textarea::placeholder {
  color: var(--text-muted);
  font-family: inherit;
}

.output-ta {
  color: var(--text-secondary);
  cursor: default;
}

.tt-char-count {
  padding: 8px 16px;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.74rem;
  font-weight: 700;
  background: var(--surface-hover);
}

/* Note */
.tt-note {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  text-align: center;
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
@media (max-width: 600px) {
  .tt-panels {
    grid-template-columns: 1fr;
  }

  .tt-action-row {
    flex-direction: column;
  }
}
</style>
