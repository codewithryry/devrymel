<template>
  <transition name="adblock-slide">
    <div v-if="visible" class="adblock-warning" role="alert">
      <div class="adblock-accent"></div>

      <div class="adblock-icon">
        <i class="fas fa-shield-alt"></i>
      </div>

      <div class="adblock-content">
        <strong>Ad blocker detected</strong>
        <p>
          Sponsored sections may not appear. Please allow ads to support this portfolio.
        </p>
      </div>

      <button
        class="adblock-close"
        type="button"
        @click="closeWarning"
        aria-label="Close ad blocker warning"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AdBlockWarning",

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: false
    };
  },

  watch: {
    show: {
      immediate: true,
      handler(value) {
        const alreadyClosed =
          sessionStorage.getItem("adblock_warning_closed") === "true";

        this.visible = value === true && !alreadyClosed;
      }
    }
  },

  methods: {
    closeWarning() {
      this.visible = false;
      sessionStorage.setItem("adblock_warning_closed", "true");
    }
  }
};
</script>

<style scoped>
.adblock-warning {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 99999;
  width: min(430px, calc(100vw - 36px));
  display: grid;
  grid-template-columns: 40px 1fr 28px;
  align-items: center;
  gap: 11px;
  padding: 12px 13px 12px 15px;
  border-radius: 18px;
  overflow: hidden;
  color: #f8fafc;
  background:
    radial-gradient(circle at top left, rgba(251, 113, 133, 0.18), transparent 34%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.97), rgba(30, 41, 59, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 20px 45px rgba(15, 23, 42, 0.28),
    0 8px 18px rgba(15, 23, 42, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}

.adblock-accent {
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: linear-gradient(180deg, #fb7185, #f97316);
}

.adblock-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: #fb7185;
  font-size: 0.95rem;
  background:
    linear-gradient(135deg, rgba(251, 113, 133, 0.18), rgba(249, 115, 22, 0.12));
  box-shadow:
    inset 0 0 0 1px rgba(251, 113, 133, 0.22),
    0 8px 18px rgba(251, 113, 133, 0.08);
}

.adblock-content {
  min-width: 0;
}

.adblock-content strong {
  display: block;
  margin-bottom: 3px;
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: -0.015em;
  line-height: 1.15;
}

.adblock-content p {
  margin: 0;
  color: rgba(248, 250, 252, 0.74);
  font-size: 0.74rem;
  line-height: 1.4;
}

.adblock-close {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  align-self: start;
  border: 0;
  border-radius: 999px;
  color: rgba(248, 250, 252, 0.72);
  background: rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.adblock-close:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
  transform: scale(1.05);
}

.adblock-close i {
  font-size: 0.74rem;
}

.adblock-slide-enter-active,
.adblock-slide-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.adblock-slide-enter-from,
.adblock-slide-leave-to {
  opacity: 0;
  transform: translate(12px, -10px);
}

@media (max-width: 600px) {
  .adblock-warning {
    top: 12px;
    right: 12px;
    width: calc(100vw - 24px);
    grid-template-columns: 38px 1fr 28px;
    gap: 10px;
    padding: 12px 12px 12px 14px;
    border-radius: 17px;
  }

  .adblock-icon {
    width: 38px;
    height: 38px;
    border-radius: 13px;
    font-size: 0.9rem;
  }

  .adblock-content strong {
    margin-bottom: 3px;
    font-size: 0.84rem;
  }

  .adblock-content p {
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .adblock-close {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 390px) {
  .adblock-warning {
    align-items: flex-start;
  }

  .adblock-content p {
    max-width: 240px;
  }
}
</style>