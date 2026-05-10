<template>
  <section class="ad-slot" :class="[`ad-${type}`, { loaded: adLoaded }]">
    <span class="ad-label">Advertisement</span>

    <div class="ad-box">
      <div
        ref="adContainer"
        class="ad-content"
        :style="adStyle"
      >
        <span v-if="!adLoaded" class="ad-placeholder">
          Loading ad...
        </span>
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
      validator: (value) => ["banner", "box", "native"].includes(value)
    }
  },

  data() {
    return {
      adLoaded: false,
      currentScript: null,
      nativeScript: null
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

      if (window.innerWidth <= 768) {
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

    adStyle() {
      if (this.type === "native") {
        return {
          width: "100%",
          minHeight: "120px"
        };
      }

      return {
        width: `${this.selectedAd.width}px`,
        minHeight: `${this.selectedAd.height}px`
      };
    }
  },

  mounted() {
    this.loadAd();
  },

  beforeUnmount() {
    this.cleanupAd();
  },

  methods: {
    cleanupAd() {
      if (this.currentScript && this.currentScript.parentNode) {
        this.currentScript.parentNode.removeChild(this.currentScript);
      }

      if (this.nativeScript && this.nativeScript.parentNode) {
        this.nativeScript.parentNode.removeChild(this.nativeScript);
      }

      if (this.$refs.adContainer) {
        this.$refs.adContainer.innerHTML = "";
      }

      this.currentScript = null;
      this.nativeScript = null;
      this.adLoaded = false;
    },

    loadAd() {
      const container = this.$refs.adContainer;

      if (!container) return;

      container.innerHTML = "";
      this.adLoaded = false;

      if (this.type === "native") {
        this.loadNativeAd(container);
        return;
      }

      this.loadBannerAd(container);
    },

    loadBannerAd(container) {
      const ad = this.selectedAd;

      window.atOptions = {
        key: ad.key,
        format: "iframe",
        height: ad.height,
        width: ad.width,
        params: {}
      };

      const script = document.createElement("script");
      script.src = `https://www.highperformanceformat.com/${ad.key}/invoke.js`;
      script.async = true;

      script.onload = () => {
        this.adLoaded = true;
      };

      script.onerror = () => {
        this.adLoaded = false;
        container.innerHTML = '<span class="ad-placeholder">Ad unavailable</span>';
      };

      this.currentScript = script;
      container.appendChild(script);
    },

    loadNativeAd(container) {
      const nativeContainerId = "container-8dde5196cd07affc517127e8af958a04";

      const nativeDiv = document.createElement("div");
      nativeDiv.id = nativeContainerId;
      nativeDiv.className = "native-ad-container";

      container.appendChild(nativeDiv);

      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src =
        "https://pl29410515.profitablecpmratenetwork.com/8dde5196cd07affc517127e8af958a04/invoke.js";

      script.onload = () => {
        this.adLoaded = true;
      };

      script.onerror = () => {
        this.adLoaded = false;
        container.innerHTML = '<span class="ad-placeholder">Ad unavailable</span>';
      };

      this.nativeScript = script;
      container.appendChild(script);
    }
  }
};
</script>

<style scoped>
.ad-slot {
  width: 100%;
  max-width: 1100px;
  margin: 28px auto;
  padding: 0 16px;
}

.ad-label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.45);
}

.ad-box {
  width: 100%;
  min-height: 96px;
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ad-content {
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-placeholder {
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.82rem;
}

.ad-box iframe {
  max-width: 100%;
  border: 0;
}

.ad-box :deep(iframe) {
  max-width: 100%;
  border: 0;
}

.native-ad-container {
  width: 100%;
}

.ad-box :deep(.native-ad-container) {
  width: 100%;
}

.ad-box :deep(a) {
  text-decoration: none;
}

.ad-box :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}

.ad-native .ad-box {
  min-height: 130px;
  padding: 10px;
}

.ad-box .ad-iframe {
  border: 0;
}

@media (max-width: 768px) {
  .ad-slot {
    margin: 22px auto;
    padding: 0 14px;
  }

  .ad-box {
    min-height: 70px;
    border-radius: 14px;
  }

  .ad-box :deep(iframe) {
    max-width: 100%;
  }

  .ad-box {
    transform: translateZ(0);
  }

  .ad-box .ad-content {
    overflow: hidden;
  }
}
</style>