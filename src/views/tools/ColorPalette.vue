<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
-->

<template>
  <div class="tool-page">
    <div class="tool-shell">
      <!-- Header -->
      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fas fa-palette"></i>
        </div>
        <div class="tt-hero-text">
          <h1 class="tt-title">Color Palette Generator</h1>
          <p class="tt-subtitle">
            Generate clean tints, shades, and matching colors from one base color.
          </p>
        </div>
      </div>

      <!-- Generator Card -->
      <div class="palette-card">
        <div class="picker-row">
          <div class="color-preview" :style="{ background: safeColor }">
            <i class="fas fa-eye-dropper"></i>
          </div>

          <div class="color-controls">
            <label for="seedColor" class="input-label">Base color</label>

            <div class="color-input-wrap" :class="{ focused: isFocused, error: errorMessage }">
              <input
                id="seedColor"
                v-model="seedColor"
                type="color"
                class="native-color"
                aria-label="Pick base color"
                @input="handleColorPick"
              />

              <input
                v-model.trim="hexInput"
                type="text"
                maxlength="7"
                placeholder="#ec4899"
                class="hex-input"
                @focus="isFocused = true"
                @blur="isFocused = false"
                @input="handleHexInput"
              />

              <button
                type="button"
                class="copy-seed-btn"
                title="Copy base color"
                @click="copyColor(safeColor)"
              >
                <i :class="copiedColor === safeColor ? 'fas fa-check' : 'far fa-copy'"></i>
              </button>
            </div>

            <p v-if="errorMessage" class="error-message">
              <i class="fas fa-circle-exclamation"></i>
              {{ errorMessage }}
            </p>
          </div>
        </div>

        <div class="action-row">
          <button type="button" class="main-btn" @click="generatePalette">
            <i class="fas fa-wand-magic-sparkles"></i>
            Generate Palette
          </button>

          <button type="button" class="secondary-btn" @click="randomizeColor">
            <i class="fas fa-shuffle"></i>
            Random
          </button>

          <button type="button" class="secondary-btn" @click="resetPalette">
            <i class="fas fa-redo"></i>
            Reset
          </button>
        </div>

        <transition name="fade-slide">
          <div v-if="copiedColor" class="copied-toast">
            <i class="fas fa-check-circle"></i>
            Copied {{ copiedColor }}
          </div>
        </transition>
      </div>

      <!-- Palette Result -->
      <transition name="fade-slide">
        <div v-if="palette.length" class="result-card">
          <div class="result-header">
            <div>
              <h3>Generated Palette</h3>
              <p>Tap any color card to copy its HEX value.</p>
            </div>

            <button type="button" class="copy-all-btn" @click="copyAllColors">
              <i :class="copiedAll ? 'fas fa-check' : 'far fa-copy'"></i>
              {{ copiedAll ? "Copied" : "Copy all" }}
            </button>
          </div>

          <div class="palette-grid">
            <button
              v-for="color in palette"
              :key="color.name"
              type="button"
              class="color-card"
              :style="{ background: color.hex, color: getTextColor(color.hex) }"
              @click="copyColor(color.hex)"
            >
              <span>{{ color.name }}</span>
              <strong>{{ color.hex }}</strong>
              <small>{{ color.role }}</small>
            </button>
          </div>
        </div>
      </transition>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- How to use -->
      <div class="howto-card">
        <h3>How to use</h3>

        <div class="howto-steps">
          <div class="howto-step">
            <span class="step-num">1</span>
            <span>Pick a base color or type a HEX value like <strong>#1FAE5B</strong>.</span>
          </div>

          <div class="howto-step">
            <span class="step-num">2</span>
            <span>Click <strong>Generate Palette</strong> to create tints, shades, and matching colors.</span>
          </div>

          <div class="howto-step">
            <span class="step-num">3</span>
            <span>Tap a color card to copy the HEX code for your CSS or design system.</span>
          </div>
        </div>

        <p class="tool-note">
          <i class="fas fa-shield-alt"></i>
          The palette is generated inside your browser. No color data is stored.
        </p>
      </div>

      <!-- Tips -->
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">
            <i class="fas fa-brush"></i>
          </div>
          <div>
            <strong>UI design</strong>
            <p>Use lighter colors for backgrounds and darker colors for text or buttons.</p>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">
            <i class="fas fa-circle-half-stroke"></i>
          </div>
          <div>
            <strong>Contrast</strong>
            <p>Check contrast before using bright colors behind small text.</p>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <tool-suggestions current="/tools/color-palette" />
    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "ColorPalette",

  components: {
    ToolSuggestions,
    AdSlot
  },

  data() {
    return {
      seedColor: "#ec4899",
      hexInput: "#ec4899",
      palette: [],
      copiedColor: "",
      copiedAll: false,
      errorMessage: "",
      isFocused: false
    };
  },

  computed: {
    safeColor() {
      return this.isValidHex(this.hexInput) ? this.hexInput.toUpperCase() : this.seedColor;
    }
  },

  mounted() {
    this.generatePalette();
  },

  methods: {
    handleColorPick() {
      this.hexInput = this.seedColor.toUpperCase();
      this.errorMessage = "";
      this.generatePalette();
    },

    handleHexInput() {
      let value = this.hexInput.trim();

      if (value && !value.startsWith("#")) {
        value = `#${value}`;
      }

      this.hexInput = value.toUpperCase();

      if (!this.hexInput) {
        this.errorMessage = "Please enter a HEX color.";
        return;
      }

      if (!this.isValidHex(this.hexInput)) {
        this.errorMessage = "Use a valid HEX color, like #EC4899.";
        return;
      }

      this.errorMessage = "";
      this.seedColor = this.hexInput;
      this.generatePalette();
    },

    isValidHex(hex) {
      return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex);
    },

    expandHex(hex) {
      const clean = hex.replace("#", "");

      if (clean.length === 3) {
        return `#${clean
          .split("")
          .map((char) => char + char)
          .join("")}`.toUpperCase();
      }

      return hex.toUpperCase();
    },

    hexToRgb(hex) {
      const fullHex = this.expandHex(hex).replace("#", "");

      return {
        r: parseInt(fullHex.substring(0, 2), 16),
        g: parseInt(fullHex.substring(2, 4), 16),
        b: parseInt(fullHex.substring(4, 6), 16)
      };
    },

    rgbToHex(r, g, b) {
      const toHex = (value) => {
        const safeValue = Math.max(0, Math.min(255, Math.round(value)));
        return safeValue.toString(16).padStart(2, "0");
      };

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    },

    mixColor(hex, targetHex, amount) {
      const base = this.hexToRgb(hex);
      const target = this.hexToRgb(targetHex);

      return this.rgbToHex(
        base.r + (target.r - base.r) * amount,
        base.g + (target.g - base.g) * amount,
        base.b + (target.b - base.b) * amount
      );
    },

    shiftHue(hex, degrees) {
      const rgb = this.hexToRgb(hex);
      const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

      hsl.h = (hsl.h + degrees + 360) % 360;

      const shiftedRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
      return this.rgbToHex(shiftedRgb.r, shiftedRgb.g, shiftedRgb.b);
    },

    rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;

        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
          default:
            h = 0;
        }

        h *= 60;
      }

      return { h, s, l };
    },

    hslToRgb(h, s, l) {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;

      let r = 0;
      let g = 0;
      let b = 0;

      if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else {
        r = c;
        g = 0;
        b = x;
      }

      return {
        r: (r + m) * 255,
        g: (g + m) * 255,
        b: (b + m) * 255
      };
    },

    generatePalette() {
      if (!this.isValidHex(this.hexInput)) {
        this.errorMessage = "Use a valid HEX color, like #EC4899.";
        return;
      }

      const base = this.expandHex(this.hexInput);

      this.seedColor = base;
      this.hexInput = base;
      this.errorMessage = "";
      this.copiedAll = false;

      this.palette = [
        {
          name: "Tint 90",
          role: "Soft background",
          hex: this.mixColor(base, "#FFFFFF", 0.86)
        },
        {
          name: "Tint 60",
          role: "Light surface",
          hex: this.mixColor(base, "#FFFFFF", 0.62)
        },
        {
          name: "Base",
          role: "Primary color",
          hex: base
        },
        {
          name: "Shade 35",
          role: "Hover state",
          hex: this.mixColor(base, "#000000", 0.28)
        },
        {
          name: "Shade 60",
          role: "Text accent",
          hex: this.mixColor(base, "#000000", 0.52)
        },
        {
          name: "Analogous",
          role: "Secondary",
          hex: this.shiftHue(base, 28)
        },
        {
          name: "Complement",
          role: "Contrast",
          hex: this.shiftHue(base, 180)
        },
        {
          name: "Muted",
          role: "Neutral accent",
          hex: this.mixColor(this.shiftHue(base, 180), "#808080", 0.42)
        }
      ];
    },

    randomizeColor() {
      const randomHex = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`.toUpperCase();

      this.seedColor = randomHex;
      this.hexInput = randomHex;
      this.generatePalette();
    },

    resetPalette() {
      this.seedColor = "#EC4899";
      this.hexInput = "#EC4899";
      this.errorMessage = "";
      this.copiedColor = "";
      this.copiedAll = false;
      this.generatePalette();
    },

    getTextColor(hex) {
      const rgb = this.hexToRgb(hex);
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

      return brightness > 150 ? "#111827" : "#FFFFFF";
    },

    async copyColor(hex) {
      try {
        await navigator.clipboard.writeText(hex);
        this.copiedColor = hex;
        this.copiedAll = false;

        window.setTimeout(() => {
          this.copiedColor = "";
        }, 1400);
      } catch (error) {
        console.error("Copy failed:", error);
        this.errorMessage = "Copy failed. Please copy the color manually.";
      }
    },

    async copyAllColors() {
      const colorList = this.palette.map((color) => `${color.name}: ${color.hex}`).join("\n");

      try {
        await navigator.clipboard.writeText(colorList);
        this.copiedAll = true;

        window.setTimeout(() => {
          this.copiedAll = false;
        }, 1600);
      } catch (error) {
        console.error("Copy all failed:", error);
        this.errorMessage = "Copy failed. Please copy the colors manually.";
      }
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





.palette-card,
.result-card,
.howto-card,
.tip-card {
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
}

.palette-card {
  padding: 22px;
  border-radius: 22px;
  margin-bottom: 16px;
}

.picker-row {
  display: flex;
  align-items: stretch;
  gap: 16px;
}

.color-preview {
  width: 116px;
  min-height: 116px;
  border-radius: 22px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 1.5rem;
  border: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.14);
}

.color-controls {
  flex: 1;
  min-width: 0;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  color: var(--text);
  font-size: 0.86rem;
  font-weight: 900;
}

.color-input-wrap {
  min-height: 58px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  border-radius: 18px;
  background: color-mix(in srgb, var(--bg) 72%, var(--surface));
  border: 1.5px solid color-mix(in srgb, var(--border) 88%, transparent);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.color-input-wrap.focused {
  border-color: color-mix(in srgb, #ec4899 72%, var(--border));
  box-shadow: 0 0 0 4px color-mix(in srgb, #ec4899 14%, transparent);
}

.color-input-wrap.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
}

.native-color {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
}

.native-color::-webkit-color-swatch-wrapper {
  padding: 0;
}

.native-color::-webkit-color-swatch {
  border: 0;
  border-radius: 12px;
}

.hex-input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.hex-input::placeholder {
  color: color-mix(in srgb, var(--text-secondary) 72%, transparent);
  font-weight: 700;
}

.copy-seed-btn {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 13px;
  color: var(--text);
  background: color-mix(in srgb, var(--text) 9%, transparent);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    color 0.18s ease;
}

.copy-seed-btn:hover {
  transform: translateY(-1px);
  color: #ec4899;
  background: color-mix(in srgb, #ec4899 13%, transparent);
}

.error-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 10px 0 0;
  color: #ef4444;
  font-size: 0.84rem;
  font-weight: 800;
  line-height: 1.5;
}

.error-message i {
  margin-top: 2px;
}

.action-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  margin-top: 16px;
}

.main-btn,
.secondary-btn,
.copy-all-btn {
  min-height: 48px;
  padding: 0 16px;
  border-radius: 15px;
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}

.main-btn {
  border: 0;
  color: #ffffff;
  background: linear-gradient(135deg, #ec4899, #db2777);
  box-shadow: 0 16px 32px rgba(236, 72, 153, 0.24);
}

.main-btn:hover {
  transform: translateY(-1px);
  opacity: 0.94;
}

.secondary-btn,
.copy-all-btn {
  border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--surface) 80%, transparent);
}

.secondary-btn:hover,
.copy-all-btn:hover {
  transform: translateY(-1px);
  color: #ec4899;
  border-color: color-mix(in srgb, #ec4899 48%, var(--border));
  background: color-mix(in srgb, #ec4899 8%, transparent);
}

.copied-toast {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 10px 13px;
  border-radius: 14px;
  color: #059669;
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.22);
  font-size: 0.83rem;
  font-weight: 850;
}

.result-card {
  padding: 20px;
  border-radius: 22px;
  margin-bottom: 16px;
}

.result-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
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

.copy-all-btn {
  min-height: 40px;
  flex-shrink: 0;
}

.palette-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
}

.color-card {
  min-height: 126px;
  padding: 14px;
  border: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.22);
  border-bottom: 1px solid rgba(255, 255, 255, 0.22);
  text-align: left;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  transition:
    transform 0.18s ease,
    filter 0.18s ease;
}

.color-card:hover {
  transform: scale(1.025);
  filter: saturate(1.08);
  z-index: 1;
}

.color-card span {
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.88;
}

.color-card strong {
  font-size: 1rem;
  font-weight: 950;
  letter-spacing: -0.02em;
}

.color-card small {
  font-size: 0.72rem;
  font-weight: 800;
  opacity: 0.78;
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
  background: color-mix(in srgb, #ec4899 14%, transparent);
  color: #db2777;
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
  background: color-mix(in srgb, #ec4899 13%, transparent);
  color: #db2777;
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

@media (max-width: 720px) {
  .palette-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .action-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .tool-page {
    padding: 24px 14px;
  }

  .back-link {
    margin-bottom: 16px;
  }



  .palette-card,
  .result-card,
  .howto-card {
    padding: 16px;
    border-radius: 18px;
  }

  .picker-row {
    flex-direction: column;
  }

  .color-preview {
    width: 100%;
    min-height: 96px;
  }

  .color-input-wrap {
    min-height: 54px;
    border-radius: 16px;
  }

  .result-header {
    flex-direction: column;
  }

  .copy-all-btn {
    width: 100%;
  }

  .palette-grid {
    grid-template-columns: 1fr;
  }

  .color-card {
    min-height: 104px;
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
  background: linear-gradient(135deg, #ec4899, #db2777);
  color: #ffffff;
  font-size: clamp(1.2rem, 3.5vw, 1.5rem);
  box-shadow: 0 12px 32px rgba(236, 72, 153, 0.35);
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