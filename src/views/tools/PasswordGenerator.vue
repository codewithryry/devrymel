<template>
  <div class="tool-page">
    <div class="tool-shell">

      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fas fa-key"></i>
        </div>
        <div class="tt-hero-text">
          <h1 class="tt-title">Password Generator</h1>
          <p class="tt-subtitle">Generate strong, secure passwords instantly. Fully client-side — nothing is sent to any server.</p>
        </div>
      </div>

      <!-- Password Display -->
      <div class="tt-password-card">
        <div class="tt-pass-display" :class="strengthClass">
          <span class="tt-pass-text">{{ password || 'Click Generate' }}</span>
          <button v-if="password" class="tt-copy-btn" @click="copyPassword" :class="{ copied: justCopied }">
            <i :class="justCopied ? 'fas fa-check' : 'fas fa-copy'"></i>
            {{ justCopied ? 'Copied!' : 'Copy' }}
          </button>
        </div>

        <!-- Strength bar -->
        <div v-if="password" class="tt-strength">
          <div class="tt-strength-bar">
            <div
              class="tt-strength-fill"
              :class="strengthClass"
              :style="{ width: strengthWidth }"
            ></div>
          </div>
          <span class="tt-strength-label" :class="strengthClass">{{ strengthLabel }}</span>
        </div>
      </div>

      <!-- Options -->
      <div class="tt-options-card">
        <!-- Length -->
        <div class="tt-option-row">
          <div class="tt-option-head">
            <label class="tt-option-label">
              <i class="fas fa-ruler-horizontal"></i> Length
            </label>
            <span class="tt-option-value">{{ length }}</span>
          </div>
          <input
            type="range"
            v-model.number="length"
            min="8"
            max="64"
            class="tt-slider"
            @input="generate"
          />
          <div class="tt-range-labels">
            <span>8</span>
            <span>64</span>
          </div>
        </div>

        <!-- Checkboxes -->
        <div class="tt-checkboxes">
          <label class="tt-checkbox" :class="{ active: opts.uppercase }">
            <input type="checkbox" v-model="opts.uppercase" @change="generate" />
            <span class="tt-check-mark"><i class="fas fa-check"></i></span>
            <span class="tt-check-info">
              <strong>Uppercase</strong>
              <small>A B C D ...</small>
            </span>
          </label>

          <label class="tt-checkbox" :class="{ active: opts.lowercase }">
            <input type="checkbox" v-model="opts.lowercase" @change="generate" />
            <span class="tt-check-mark"><i class="fas fa-check"></i></span>
            <span class="tt-check-info">
              <strong>Lowercase</strong>
              <small>a b c d ...</small>
            </span>
          </label>

          <label class="tt-checkbox" :class="{ active: opts.numbers }">
            <input type="checkbox" v-model="opts.numbers" @change="generate" />
            <span class="tt-check-mark"><i class="fas fa-check"></i></span>
            <span class="tt-check-info">
              <strong>Numbers</strong>
              <small>0 1 2 3 ...</small>
            </span>
          </label>

          <label class="tt-checkbox" :class="{ active: opts.symbols }">
            <input type="checkbox" v-model="opts.symbols" @change="generate" />
            <span class="tt-check-mark"><i class="fas fa-check"></i></span>
            <span class="tt-check-info">
              <strong>Symbols</strong>
              <small>! @ # $ ...</small>
            </span>
          </label>
        </div>
      </div>

      <!-- Generate button -->
      <button class="tt-gen-btn" @click="generate">
        <i class="fas fa-sync-alt"></i> Generate Password
      </button>

      <!-- Note -->
      <p class="tt-note">
        <i class="fas fa-lock"></i>
        Generated entirely in your browser. Zero data leaves your device.
      </p>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- Suggestions -->
      <tool-suggestions current="/tools/password" />

    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "PasswordGenerator",

  components: { ToolSuggestions, AdSlot },

  data() {
    return {
      password: "",
      length: 16,
      justCopied: false,
      opts: {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false
      }
    };
  },

  computed: {
    strengthScore() {
      if (!this.password) return 0;
      let score = 0;
      if (this.opts.uppercase) score++;
      if (this.opts.lowercase) score++;
      if (this.opts.numbers) score++;
      if (this.opts.symbols) score++;
      if (this.length >= 12) score++;
      if (this.length >= 20) score++;
      if (this.length >= 32) score++;
      return score;
    },

    strengthLabel() {
      const s = this.strengthScore;
      if (s <= 2) return "Weak";
      if (s <= 3) return "Fair";
      if (s <= 5) return "Strong";
      return "Very Strong";
    },

    strengthClass() {
      const s = this.strengthScore;
      if (s <= 2) return "weak";
      if (s <= 3) return "fair";
      if (s <= 5) return "strong";
      return "very-strong";
    },

    strengthWidth() {
      const s = this.strengthScore;
      if (s <= 2) return "25%";
      if (s <= 3) return "50%";
      if (s <= 5) return "75%";
      return "100%";
    }
  },

  mounted() {
    this.generate();
  },

  methods: {
    generate() {
      const chars = [
        this.opts.uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
        this.opts.lowercase ? "abcdefghijklmnopqrstuvwxyz" : "",
        this.opts.numbers  ? "0123456789" : "",
        this.opts.symbols  ? "!@#$%^&*()-_=+[]{}|;:,.<>?" : ""
      ].join("");

      if (!chars) {
        this.password = "";
        return;
      }

      let result = "";
      // Ensure at least one char from each selected set
      const sets = [];
      if (this.opts.uppercase) sets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      if (this.opts.lowercase) sets.push("abcdefghijklmnopqrstuvwxyz");
      if (this.opts.numbers)   sets.push("0123456789");
      if (this.opts.symbols)   sets.push("!@#$%^&*()-_=+[]{}|;:,.<>?");

      const arr = new Uint32Array(this.length);
      crypto.getRandomValues(arr);

      // Start with one guaranteed char per set
      for (const set of sets) {
        const idx = arr[result.length] % set.length;
        result += set[idx];
      }

      // Fill the rest
      for (let i = result.length; i < this.length; i++) {
        result += chars[arr[i] % chars.length];
      }

      // Shuffle
      const shuffleArr = result.split("");
      for (let i = shuffleArr.length - 1; i > 0; i--) {
        const j = arr[i] % (i + 1);
        [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
      }

      this.password = shuffleArr.join("");
    },

    async copyPassword() {
      if (!this.password) return;
      try {
        await navigator.clipboard.writeText(this.password);
        this.justCopied = true;
        setTimeout(() => { this.justCopied = false; }, 2000);
      } catch {
        // fallback
        const el = document.createElement("textarea");
        el.value = this.password;
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




/* Password card */
.tt-password-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 16px;
}

.tt-pass-display {
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 62px;
  transition: border-color 0.2s ease;
}

.tt-pass-display.strong,
.tt-pass-display.very-strong {
  border-color: color-mix(in srgb, #22c55e 50%, var(--border));
}

.tt-pass-display.fair {
  border-color: color-mix(in srgb, #f59e0b 50%, var(--border));
}

.tt-pass-display.weak {
  border-color: color-mix(in srgb, #ef4444 50%, var(--border));
}

.tt-pass-text {
  flex: 1;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  word-break: break-all;
  line-height: 1.4;
}

.tt-copy-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 10px;
  border: none;
  background: var(--accent);
  color: var(--bg);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
}

.tt-copy-btn.copied {
  background: #22c55e;
}

.tt-copy-btn:hover {
  opacity: 0.88;
}

/* Strength */
.tt-strength {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tt-strength-bar {
  flex: 1;
  height: 6px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
}

.tt-strength-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease, background 0.3s ease;
}

.tt-strength-fill.weak      { background: #ef4444; }
.tt-strength-fill.fair      { background: #f59e0b; }
.tt-strength-fill.strong    { background: #22c55e; }
.tt-strength-fill.very-strong { background: #10b981; }

.tt-strength-label {
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
}

.tt-strength-label.weak      { color: #ef4444; }
.tt-strength-label.fair      { color: #f59e0b; }
.tt-strength-label.strong    { color: #22c55e; }
.tt-strength-label.very-strong { color: #10b981; }

/* Options card */
.tt-options-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
}

.tt-option-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tt-option-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tt-option-label {
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 7px;
}

.tt-option-label i {
  color: var(--accent);
  font-size: 0.8rem;
}

.tt-option-value {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 900;
}

/* Slider */
.tt-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background: var(--border);
  border-radius: 999px;
  outline: none;
  cursor: pointer;
}

.tt-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.tt-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.tt-range-labels {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 0.74rem;
  font-weight: 700;
}

/* Checkboxes */
.tt-checkboxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.tt-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1.5px solid var(--border);
  cursor: pointer;
  background: var(--bg);
  transition: all 0.18s ease;
  user-select: none;
}

.tt-checkbox input[type="checkbox"] {
  display: none;
}

.tt-checkbox.active {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.tt-check-mark {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid var(--border);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 0.65rem;
  color: transparent;
  transition: all 0.18s ease;
  background: transparent;
}

.tt-checkbox.active .tt-check-mark {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}

.tt-check-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tt-check-info strong {
  color: var(--text);
  font-size: 0.84rem;
  font-weight: 800;
}

.tt-check-info small {
  color: var(--text-muted);
  font-size: 0.72rem;
  font-family: monospace;
}

/* Generate button */
.tt-gen-btn {
  width: 100%;
  height: 54px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.18s ease, transform 0.18s ease;
  letter-spacing: 0.01em;
  margin-bottom: 16px;
}

.tt-gen-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
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

/* Mobile */
@media (max-width: 420px) {
  .tt-checkboxes {
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
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: #ffffff;
  font-size: clamp(1.2rem, 3.5vw, 1.5rem);
  box-shadow: 0 12px 32px rgba(124, 58, 237, 0.35);
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
