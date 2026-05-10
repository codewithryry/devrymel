<template>
  <section class="ad-slot" :class="[`ad-${type}`, { 'ad-loaded': iframeSrcDoc }]">
    <div class="ad-label-wrapper">
      <span class="ad-label">Sponsored</span>
    </div>

    <div class="ad-box" :class="{ 'ad-box-loaded': iframeSrcDoc }">
      <div v-if="iframeSrcDoc" class="ad-frame-container">
        <iframe
          class="ad-frame"
          :srcdoc="iframeSrcDoc"
          :width="adWidth"
          :height="adHeight"
          scrolling="no"
          frameborder="0"
          referrerpolicy="no-referrer-when-downgrade"
          title="Advertisement"
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

      if (this.windowWidth <= 768) {
        return {
          key: "3bd57246a0f9e39eb57a9a8159e3ad08",
          width: 320,
          height: 50
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
                max-width: 100%;
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
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
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
  display: flex;
  align-items: center;
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

[data-theme="midnight"] .ad-label,
[data-theme="forest"] .ad-label {
  color: rgba(255, 255, 255, 0.4);
}

.ad-box {
  width: 100%;
  min-height: 90px;
  border-radius: 12px;
  border: 1.5px dashed rgba(148, 163, 184, 0.3);
  background: rgba(248, 250, 252, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

[data-theme="midnight"] .ad-box,
[data-theme="forest"] .ad-box {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(148, 163, 184, 0.2);
}

.ad-box-loaded {
  border-color: transparent;
  background: transparent;
}

.ad-frame-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 18px;
  text-align: center;
  width: 100%;
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

[data-theme="midnight"] .ad-placeholder,
[data-theme="forest"] .ad-placeholder {
  color: rgba(255, 255, 255, 0.4);
}

[data-theme="midnight"] .ad-dimensions,
[data-theme="forest"] .ad-dimensions {
  color: rgba(255, 255, 255, 0.25);
}

.ad-box:has(.ad-frame[height="250"]) {
  min-height: 270px;
}

@media (max-width: 768px) {
  .ad-slot {
    margin: 20px 0;
  }

  .ad-box {
    min-height: 70px;
    border-radius: 10px;
  }

  .ad-box:has(.ad-frame[height="250"]) {
    min-height: 270px;
  }

  .ad-label {
    font-size: 0.6rem;
  }
}
</style>