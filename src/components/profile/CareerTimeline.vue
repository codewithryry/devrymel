<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <section id="experience-timeline" class="timeline-section">
    <div class="section-header">
      <div>
        <span class="section-kicker">Journey</span>
        <h2 class="section-title">Career &amp; Education</h2>
      </div>

      <router-link v-if="viewAllTo" :to="viewAllTo" class="view-all-link">
        {{ viewAllLabel }}
      </router-link>
    </div>

    <div class="timeline-container">
      <div class="timeline-line" aria-hidden="true"></div>

      <div
        v-for="(item, index) in visibleTimeline"
        :key="`${item.title}-${item.date}-${index}`"
        class="timeline-item"
        :class="{ right: index % 2 === 0 }"
      >
        <div class="timeline-marker" aria-hidden="true">
          <span class="marker-dot"></span>
        </div>

        <article class="timeline-card">
          <time class="timeline-date">{{ formatDate(item.date) }}</time>
          <h3 class="timeline-title">{{ item.title }}</h3>
          <p class="timeline-description">{{ item.description }}</p>

          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            rel="noopener"
            class="timeline-link"
          >
            View details <i class="fas fa-arrow-right"></i>
          </a>
        </article>
      </div>
    </div>

    <div v-if="timeline.length > initialLimit" class="timeline-toggle-wrapper">
      <button
        type="button"
        class="timeline-toggle"
        :class="{ expanded: showAll }"
        :aria-expanded="showAll"
        @click="showAll = !showAll"
      >
        <span>{{ showAll ? "See Less" : "See More" }}</span>
        <i :class="showAll ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "CareerTimeline",

  props: {
    viewAllTo: {
      type: String,
      default: ""
    },
    viewAllLabel: {
      type: String,
      default: "View all.."
    },
    timeline: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      showAll: false,
      isMobile: false,
      mobileLimit: 3,
      desktopLimit: 4
    }
  },

  computed: {
    visibleTimeline() {
      const limit = this.isMobile ? this.mobileLimit : this.desktopLimit
      return this.showAll ? this.timeline : this.timeline.slice(0, limit)
    },

    initialLimit() {
      return this.isMobile ? this.mobileLimit : this.desktopLimit
    }
  },

  mounted() {
    this.checkScreen()
    window.addEventListener("resize", this.checkScreen)
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen)
  },

  methods: {
    checkScreen() {
      this.isMobile = window.innerWidth <= 760
    },

    formatDate(date) {
      if (!date) return ""
      if (String(date).toLowerCase() === "present") return "Present"
      return date
    }
  }
}
</script>

<style scoped>
.timeline-section {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  text-align: left;
}

.view-all-link {
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: var(--text);
}

.section-header > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.section-kicker {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  color: var(--text);
  font-size: 1.65rem;
  line-height: 1.15;
  letter-spacing: -0.025em;
}

.timeline-container {
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  padding: 0.1rem 0;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: var(--border);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 0.7rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item.right {
  justify-content: flex-end;
}

.timeline-marker {
  position: absolute;
  top: 1.05rem;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
}

.marker-dot {
  display: block;
  width: 9px;
  height: 9px;
  border: 2px solid var(--bg);
  border-radius: 50%;
  background: var(--text);
  box-shadow: 0 0 0 1px var(--text);
}

.timeline-card {
  position: relative;
  width: calc(50% - 2rem);
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.timeline-card:hover {
  transform: translateY(-1px);
  border-color: var(--text-muted);
}

.timeline-card::before {
  content: "";
  position: absolute;
  top: 1.05rem;
  width: 9px;
  height: 9px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-right: 1px solid var(--border);
  transform: rotate(45deg);
}

.timeline-item:not(.right) .timeline-card::before {
  right: -5px;
}

.timeline-item.right .timeline-card::before {
  left: -5px;
  transform: rotate(225deg);
}

.timeline-date {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.4rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-soft);
  color: var(--text-secondary);
  font-size: 0.66rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.timeline-title {
  margin: 0 0 0.3rem;
  color: var(--text);
  font-size: 0.94rem;
  line-height: 1.25;
}

.timeline-description {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.78rem;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.timeline-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.55rem;
  color: var(--text);
  font-size: 0.72rem;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.timeline-toggle-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 0.85rem;
}

.timeline-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: fit-content;
  margin: 0;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
}

.timeline-toggle:hover {
  border-color: var(--text-muted);
}

.timeline-toggle.expanded {
  width: auto;
  min-width: 110px;
  margin-top: 0.55rem;
  padding: 0.35rem 0.55rem;
  border-color: transparent;
  background: transparent;
  color: var(--text-secondary);
}

.timeline-toggle.expanded:hover {
  color: var(--text);
  border-color: transparent;
  background: var(--surface-soft);
}

@media (max-width: 760px) {
  .timeline-section {
    margin: 0;
  }

  .section-header {
    margin-bottom: 0.85rem;
  }

  .section-title {
    font-size: 1.45rem;
  }

  .timeline-toggle {
    width: auto;
    max-width: 100%;
  }

  .timeline-container {
    max-width: 100%;
    padding-left: 1.6rem;
  }

  .timeline-line {
    left: 0.75rem;
  }

  .timeline-item,
  .timeline-item.right {
    justify-content: flex-start;
  }

  .timeline-marker {
    left: 0.75rem;
    top: 1.05rem;
    transform: translateX(-50%);
  }

  .timeline-card,
  .timeline-item.right .timeline-card,
  .timeline-item:not(.right) .timeline-card {
    width: 100%;
  }

  .timeline-card::before,
  .timeline-item.right .timeline-card::before,
  .timeline-item:not(.right) .timeline-card::before {
    left: -5px;
    right: auto;
    transform: rotate(225deg);
  }

  .timeline-item {
    margin-bottom: 0.6rem;
  }

  .timeline-card {
    padding: 0.75rem 0.8rem;
  }

  .timeline-description {
    -webkit-line-clamp: 2;
  }
}

@media (max-width: 420px) {
  .timeline-container {
    padding-left: 1.45rem;
  }

  .timeline-line {
    left: 0.7rem;
  }

  .timeline-marker {
    left: 0.7rem;
  }

  .timeline-card {
    padding: 0.7rem 0.75rem;
  }
}
</style>