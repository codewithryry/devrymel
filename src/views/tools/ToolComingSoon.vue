<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
-->

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
        <div class="tt-icon-wrap" :style="{ background: toolBg }">
          <i :class="toolIcon"></i>
        </div>

        <h1 class="tt-title">{{ toolTitle }}</h1>
        <p class="tt-subtitle">
          This mini tool is currently under construction and will be available soon.
        </p>

        <span class="soon-badge">
          <i class="fas fa-clock"></i>
          Coming Soon
        </span>
      </div>

      <!-- Main card -->
      <div class="soon-card">
        <div class="soon-card-icon">
          <i class="fas fa-screwdriver-wrench"></i>
        </div>

        <div class="soon-card-body">
          <h2>Under Construction</h2>
          <p>
            I'm still building this tool. Once finished, it will be added as a live mini tool
            in the portfolio.
          </p>
        </div>
      </div>

      <!-- What to expect -->
      <div class="expect-card">
        <h3>What to expect</h3>

        <div class="expect-list">
          <div class="expect-item">
            <span class="expect-num">1</span>
            <span>A clean and mobile-friendly interface.</span>
          </div>

          <div class="expect-item">
            <span class="expect-num">2</span>
            <span>Simple controls focused on quick use.</span>
          </div>

          <div class="expect-item">
            <span class="expect-num">3</span>
            <span>Fast browser-based functionality when possible.</span>
          </div>
        </div>

        <p class="tool-note">
          <i class="fas fa-info-circle"></i>
          You reached this page because this mini tool is marked as coming soon.
        </p>
      </div>

      <!-- Ad -->
      <AdSlot type="banner" />

      <!-- Suggestions -->
      <tool-suggestions current="/tools/coming-soon" />
    </div>
  </div>
</template>

<script>
import ToolSuggestions from "@/components/tools/ToolSuggestions.vue";
import AdSlot from "@/components/AdSlot.vue";

const comingSoonTools = {
  "/tools/json-formatter": {
    title: "JSON Formatter",
    icon: "fas fa-code",
    bg: "linear-gradient(135deg, #334155, #0f172a)"
  },
  "/tools/text-counter": {
    title: "Text Counter",
    icon: "fas fa-font",
    bg: "linear-gradient(135deg, #14b8a6, #0f766e)"
  },
  "/tools/case-converter": {
    title: "Case Converter",
    icon: "fas fa-text-height",
    bg: "linear-gradient(135deg, #8b5cf6, #6d28d9)"
  },
  "/tools/meta-tag-generator": {
    title: "Meta Tag Generator",
    icon: "fas fa-tags",
    bg: "linear-gradient(135deg, #0891b2, #155e75)"
  }
};

export default {
  name: "ToolComingSoon",

  components: {
    ToolSuggestions,
    AdSlot
  },

  computed: {
    currentTool() {
      return (
        comingSoonTools[this.$route.path] || {
          title: "Mini Tool",
          icon: "fas fa-wrench",
          bg: "linear-gradient(135deg, #64748b, #334155)"
        }
      );
    },

    toolTitle() {
      return this.currentTool.title;
    },

    toolIcon() {
      return this.currentTool.icon;
    },

    toolBg() {
      return this.currentTool.bg;
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
  width: min(760px, 100%);
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
}

.tt-icon-wrap {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  color: #ffffff;
  font-size: 1.55rem;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.18);
  margin-bottom: 14px;
}

.tt-title {
  margin: 0;
  color: var(--text);
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.tt-subtitle {
  max-width: 520px;
  margin: 8px auto 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.5;
}

.soon-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  padding: 8px 18px;
  border-radius: 999px;
  background: color-mix(in srgb, #f59e0b 14%, transparent);
  border: 1.5px solid color-mix(in srgb, #f59e0b 30%, transparent);
  color: #d97706;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.soon-card,
.expect-card {
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
}

.soon-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px;
  border-radius: 22px;
  margin-bottom: 16px;
}

.soon-card-icon {
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 15px;
  background: color-mix(in srgb, #f59e0b 14%, transparent);
  color: #d97706;
  font-size: 1.12rem;
}

.soon-card-body h2 {
  margin: 0 0 7px;
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.soon-card-body p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
}

.expect-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.expect-card h3 {
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.expect-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.expect-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.5;
}

.expect-num {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: color-mix(in srgb, #f59e0b 14%, transparent);
  color: #d97706;
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

@media (max-width: 640px) {
  .tool-page {
    padding: 24px 14px;
  }

  .back-link {
    margin-bottom: 16px;
  }

  .tool-hero {
    border-radius: 22px;
  }

  .tt-icon-wrap {
    width: 58px;
    height: 58px;
    border-radius: 18px;
    font-size: 1.35rem;
  }

  .soon-card {
    flex-direction: column;
    padding: 16px;
    border-radius: 18px;
  }

  .expect-card {
    padding: 16px;
    border-radius: 18px;
  }
}
</style>