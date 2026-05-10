<template>
  <section
    class="ad-slot"
    :class="[`ad-${type}`, { 'ad-loaded': iframeSrcDoc }]"
  >
    <div class="ad-label-wrapper">
      <span class="ad-label">Sponsored</span>

      <button
        type="button"
        class="ad-info-button"
        aria-label="About sponsored content"
        @click.stop="toggleInfo"
      >
        <i class="fas fa-info"></i>
      </button>

      <transition name="ad-info-fade">
        <div v-if="showInfo" class="ad-info-popover" @click.stop>
          <strong>What is this?</strong>
          <p>
            This is a sponsored advertisement space. Ads help support this portfolio
            and keep the site available online.
          </p>
        </div>
      </transition>
    </div>

    <div
      class="ad-box"
      :class="{ 'ad-box-loaded': iframeSrcDoc }"
      :style="adBoxStyle"
    >
      <div
        v-if="iframeSrcDoc"
        class="ad-frame-container"
        :style="adFrameContainerStyle"
      >
        <iframe
          class="ad-frame"
          :srcdoc="iframeSrcDoc"
          :width="adWidth"
          :height="adHeight"
          scrolling="no"
          frameborder="0"
          referrerpolicy="no-referrer-when-downgrade"
          title="Advertisement"
          :style="adFrameStyle"
        ></iframe>
      </div>

      <div v-else class="ad-placeholder-wrapper">
        <span class="ad-placeholder">Advertisement space</span>
        <span class="ad-dimensions">{{ adWidth }} × {{ adHeight }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AdSlot",

  props: {
    type: {
      type: String,
      default: "banner",
      validator: (value) =>
        [
          "banner",
          "mobile-banner",
          "box",
          "wide-box",
          "vertical-box",
          "skyscraper"
        ].includes(value)
    }
  },

  data() {
    return {
      windowWidth: 0,
      showInfo: false
    };
  },

  computed: {
    selectedAd() {
      const adUnits = {
        banner: {
          key: "5c502931ec45e59cbcbc537a3cf68569",
          width: 728,
          height: 90
        },

        "mobile-banner": {
          key: "3bd57246a0f9e39eb57a9a8159e3ad08",
          width: 320,
          height: 50
        },

        box: {
          key: "230e46b410693944c24dd656e2b39c5f",
          width: 300,
          height: 250
        },

        "wide-box": {
          key: "d766049dfd0212d8bc0151032b0834e3",
          width: 468,
          height: 60
        },

        "vertical-box": {
          key: "5082d095915fa7dbd76fe0fbd8b1bc3e",
          width: 160,
          height: 300
        },

        skyscraper: {
          key: "222e0c47de284a438f05d6fd65076b90",
          width: 160,
          height: 600
        }
      };

      if (this.type === "banner" && this.windowWidth <= 768) {
        return adUnits["mobile-banner"];
      }

      return adUnits[this.type] || adUnits.banner;
    },

    adWidth() {
      return this.selectedAd.width;
    },

    adHeight() {
      return this.selectedAd.height;
    },

    adBoxStyle() {
      return {
        minHeight: `${this.adHeight}px`
      };
    },

    adFrameContainerStyle() {
      return {
        minHeight: `${this.adHeight}px`
      };
    },

    adFrameStyle() {
      return {
        width: `${this.adWidth}px`,
        height: `${this.adHeight}px`
      };
    },

    iframeSrcDoc() {
      const ad = this.selectedAd;

      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              html,
              body {
                margin: 0;
                padding: 0;
                width: ${ad.width}px;
                height: ${ad.height}px;
                overflow: hidden;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              iframe {
                border: 0 !important;
                width: ${ad.width}px !important;
                height: ${ad.height}px !important;
                max-width: 100%;
                overflow: hidden;
              }
            </style>
          </head>

          <body>
            <script>
              var atOptions = {
                key: "${ad.key}",
                format: "iframe",
                height: ${ad.height},
                width: ${ad.width},
                params: {}
              };
            <\/script>

            <script src="https://www.highperformanceformat.com/${ad.key}/invoke.js"><\/script>
          </body>
        </html>
      `;
    }
  },

  mounted() {
    this.windowWidth = window.innerWidth;

    window.addEventListener("resize", this.handleResize);
    document.addEventListener("click", this.closeInfo);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener("click", this.closeInfo);
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    toggleInfo() {
      this.showInfo = !this.showInfo;
    },

    closeInfo() {
      this.showInfo = false;
    }
  }
};
</script>

<style scoped>
.ad-slot {
  width: 100%;
  margin: 32px 0;
  padding: 0;
}

.ad-label-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-bottom: 8px;
  padding: 0 4px;
}

.ad-label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
}

.ad-info-button {
  width: 16px;
  height: 16px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: rgba(15, 23, 42, 0.48);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  font-size: 0.55rem;
  line-height: 1;
  transition:
    transform 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.ad-info-button:hover {
  transform: translateY(-1px);
  color: rgba(15, 23, 42, 0.75);
  border-color: rgba(15, 23, 42, 0.28);
  background: rgba(255, 255, 255, 0.95);
}

.ad-info-popover {
  position: absolute;
  top: 24px;
  left: 0;
  z-index: 50;
  width: min(260px, calc(100vw - 32px));
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.16);
  backdrop-filter: blur(14px);
}

.ad-info-popover strong {
  display: block;
  margin-bottom: 4px;
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(15, 23, 42, 0.86);
}

.ad-info-popover p {
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.45;
  color: rgba(15, 23, 42, 0.62);
}

.ad-box {
  width: 100%;
  border-radius: 12px;
  border: 1.5px dashed rgba(148, 163, 184, 0.3);
  background: rgba(248, 250, 252, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ad-box-loaded {
  border-color: transparent;
  background: transparent;
}

.ad-frame-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ad-frame {
  display: block;
  max-width: 100%;
  border: 0;
  overflow: hidden;
  background: transparent;
}

.ad-placeholder-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 18px;
  text-align: center;
}

.ad-placeholder {
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.75rem;
  font-weight: 500;
}

.ad-dimensions {
  color: rgba(0, 0, 0, 0.25);
  font-size: 0.65rem;
  letter-spacing: 0.04em;
}

/* Size-specific spacing */
.ad-mobile-banner .ad-box {
  min-height: 50px;
}

.ad-wide-box .ad-box {
  min-height: 60px;
}

.ad-banner .ad-box {
  min-height: 90px;
}

.ad-box .ad-frame[height="250"] {
  height: 250px;
}

.ad-box .ad-frame[height="300"] {
  height: 300px;
}

.ad-box .ad-frame[height="600"] {
  height: 600px;
}

/* Dark themes */
[data-theme="midnight"] .ad-label,
[data-theme="forest"] .ad-label {
  color: rgba(255, 255, 255, 0.4);
}

[data-theme="midnight"] .ad-info-button,
[data-theme="forest"] .ad-info-button {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(15, 23, 42, 0.55);
  color: rgba(255, 255, 255, 0.55);
}

[data-theme="midnight"] .ad-info-button:hover,
[data-theme="forest"] .ad-info-button:hover {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(15, 23, 42, 0.82);
  color: rgba(255, 255, 255, 0.82);
}

[data-theme="midnight"] .ad-info-popover {
  background: rgba(15, 23, 42, 0.96);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.36);
}

[data-theme="forest"] .ad-info-popover {
  background: rgba(6, 78, 59, 0.96);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.3);
}

[data-theme="midnight"] .ad-info-popover strong,
[data-theme="forest"] .ad-info-popover strong {
  color: rgba(255, 255, 255, 0.9);
}

[data-theme="midnight"] .ad-info-popover p,
[data-theme="forest"] .ad-info-popover p {
  color: rgba(255, 255, 255, 0.65);
}

[data-theme="midnight"] .ad-box,
[data-theme="forest"] .ad-box {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(148, 163, 184, 0.2);
}

[data-theme="midnight"] .ad-box-loaded,
[data-theme="forest"] .ad-box-loaded {
  background: transparent;
  border-color: transparent;
}

[data-theme="midnight"] .ad-placeholder,
[data-theme="forest"] .ad-placeholder {
  color: rgba(255, 255, 255, 0.4);
}

[data-theme="midnight"] .ad-dimensions,
[data-theme="forest"] .ad-dimensions {
  color: rgba(255, 255, 255, 0.25);
}

/* Animation */
.ad-info-fade-enter-active,
.ad-info-fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.ad-info-fade-enter-from,
.ad-info-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Mobile */
@media (max-width: 768px) {
  .ad-slot {
    margin: 20px 0;
  }

  .ad-box {
    border-radius: 10px;
  }

  .ad-label {
    font-size: 0.6rem;
  }

  .ad-info-button {
    width: 15px;
    height: 15px;
    font-size: 0.5rem;
  }

  .ad-info-popover {
    top: 22px;
    width: min(245px, calc(100vw - 28px));
    padding: 11px 12px;
  }

  .ad-info-popover strong {
    font-size: 0.74rem;
  }

  .ad-info-popover p {
    font-size: 0.68rem;
  }
}
</style>