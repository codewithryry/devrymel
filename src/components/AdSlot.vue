<template>
  <section class="ad-slot" :class="[`ad-${type}`, { 'ad-loaded': iframeSrcDoc }]">
    <div class="ad-label-wrapper">
      <span class="ad-label-icon">
      </span>
      <span class="ad-label">Sponsored</span>
    </div>

    <div class="ad-box" :class="{ 'ad-box-loaded': iframeSrcDoc }">
      <div v-if="iframeSrcDoc" class="ad-frame-container">
        <iframe
          class="ad-frame"
          :srcdoc="iframeSrcDoc"
          scrolling="no"
          frameborder="0"
          referrerpolicy="no-referrer-when-downgrade"
          title="Advertisement"
        ></iframe>
      </div>

      <div v-else class="ad-placeholder-wrapper">
        <div class="ad-placeholder-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
          </svg>
        </div>
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
      validator: (value) => ["banner", "box"].includes(value)
    }
  },

  data() {
    return {
      windowWidth: 0
    };
  },

  computed: {
    selectedAd() {
      if (this.type === "box") {
        return {
          key: "230e46b410693944c24dd656e2b39c5f",
          width: 300,
          height: 250
        };
      }

      // Mobile: 320x50, Tablet: 468x60, Desktop: 728x90
      if (this.windowWidth <= 480) {
        return {
          key: "3bd57246a0f9e39eb57a9a8159e3ad08",
          width: 320,
          height: 50
        };
      }

      if (this.windowWidth <= 768) {
        return {
          key: "3bd57246a0f9e39eb57a9a8159e3ad08",
          width: 468,
          height: 60
        };
      }

      return {
        key: "5c502931ec45e59cbcbc537a3cf68569",
        width: 728,
        height: 90
      };
    },

    adWidth() {
      return this.selectedAd.width;
    },

    adHeight() {
      return this.selectedAd.height;
    },

    iframeSrcDoc() {
      const ad = this.selectedAd;

      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <style>
              html,
              body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              iframe {
                border: 0 !important;
                max-width: 100%;
                height: auto;
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
            <script src="https://pl29410683.profitablecpmratenetwork.com/f0/85/36/f0853622241a05c7ad427819dc141d54.js"><\/script>
            <script src="https://pl29410682.profitablecpmratenetwork.com/8a/2a/28/8a2a28ad6dbab0fd8475744eb95c6142.js"><\/script>
          </body>
        </html>
      `;
    }
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    this.loadExternalScripts();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    loadExternalScripts() {
      if (typeof window === "undefined") return;

      const script1 = document.createElement("script");
      script1.src = "https://pl29410683.profitablecpmratenetwork.com/f0/85/36/f0853622241a05c7ad427819dc141d54.js";
      script1.async = true;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src = "https://pl29410682.profitablecpmratenetwork.com/8a/2a/28/8a2a28ad6dbab0fd8475744eb95c6142.js";
      script2.async = true;
      document.head.appendChild(script2);
    }
  }
};
</script>

<style scoped>
.ad-slot {
  width: 100%;
  margin: 32px 0;
  padding: 0;
  transition: all 0.3s ease;
}

.ad-label-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  padding: 0 4px;
}

.ad-label-icon {
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.3s ease;
}

.ad-slot:hover .ad-label-icon {
  opacity: 0.6;
  transform: translateX(0);
}

.ad-label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  transition: color 0.2s ease;
}

[data-theme="midnight"] .ad-label,
[data-theme="forest"] .ad-label {
  color: rgba(255, 255, 255, 0.4);
}

.ad-box {
  width: 100%;
  min-height: 80px;
  border-radius: 12px;
  border: 1.5px dashed rgba(148, 163, 184, 0.3);
  background: rgba(248, 250, 252, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

[data-theme="midnight"] .ad-box,
[data-theme="forest"] .ad-box {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(148, 163, 184, 0.2);
}

.ad-box:hover {
  border-color: rgba(148, 163, 184, 0.5);
  background: rgba(248, 250, 252, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
}

[data-theme="midnight"] .ad-box:hover,
[data-theme="forest"] .ad-box:hover {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(148, 163, 184, 0.3);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.ad-box-loaded {
  border-style: solid;
  border-color: transparent;
  background: transparent;
  min-height: auto;
}

.ad-box-loaded:hover {
  border-color: transparent;
  background: transparent;
  transform: none;
  box-shadow: none;
}

.ad-frame-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ad-frame {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border: 0;
  overflow: hidden;
  background: transparent;
}

.ad-placeholder-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  text-align: center;
  width: 100%;
}

.ad-placeholder-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.1);
  transition: all 0.3s ease;
}

[data-theme="midnight"] .ad-placeholder-icon,
[data-theme="forest"] .ad-placeholder-icon {
  background: rgba(148, 163, 184, 0.15);
}

.ad-box:hover .ad-placeholder-icon {
  background: rgba(148, 163, 184, 0.15);
  transform: scale(1.05);
}

.ad-placeholder {
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.75rem;
  font-weight: 500;
}

[data-theme="midnight"] .ad-placeholder,
[data-theme="forest"] .ad-placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.ad-dimensions {
  color: rgba(0, 0, 0, 0.25);
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.04em;
}

[data-theme="midnight"] .ad-dimensions,
[data-theme="forest"] .ad-dimensions {
  color: rgba(255, 255, 255, 0.25);
}

/* Loading animation for when ads load */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ad-loaded .ad-frame-container {
  animation: fadeInUp 0.3s ease-out;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .ad-slot {
    margin: 20px 0;
  }

  .ad-label {
    font-size: 0.6rem;
  }

  .ad-label-icon svg {
    width: 8px;
    height: 8px;
  }

  .ad-box {
    min-height: 65px;
    border-radius: 10px;
  }

  .ad-placeholder-wrapper {
    padding: 16px;
    gap: 6px;
  }

  .ad-placeholder-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  .ad-placeholder-icon svg {
    width: 24px;
    height: 24px;
  }

  .ad-placeholder {
    font-size: 0.7rem;
  }

  .ad-dimensions {
    font-size: 0.6rem;
  }
}

@media (max-width: 480px) {
  .ad-slot {
    margin: 16px 0;
  }

  .ad-label-wrapper {
    gap: 4px;
    margin-bottom: 6px;
    padding: 0 2px;
  }

  .ad-label {
    font-size: 0.55rem;
  }

  .ad-box {
    min-height: 55px;
    border-radius: 8px;
    border-width: 1px;
  }

  .ad-box:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  [data-theme="midnight"] .ad-box:hover,
  [data-theme="forest"] .ad-box:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  .ad-placeholder-wrapper {
    padding: 12px;
    gap: 4px;
  }

  .ad-placeholder-icon {
    width: 28px;
    height: 28px;
  }

  .ad-placeholder-icon svg {
    width: 20px;
    height: 20px;
  }

  .ad-placeholder {
    font-size: 0.65rem;
  }

  .ad-dimensions {
    font-size: 0.55rem;
  }
}

/* Landscape mobile */
@media (max-width: 768px) and (orientation: landscape) {
  .ad-box {
    min-height: 60px;
  }

  .ad-placeholder-wrapper {
    flex-direction: row;
    gap: 12px;
    padding: 12px 16px;
  }
}

/* High DPI screens */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .ad-box {
    border-width: 1px;
  }
}
</style>