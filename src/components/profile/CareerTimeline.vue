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

    <!-- Center line with milestones; cards alternate left / right on desktop,
         year sits on the other side of the line. Phones: one column, line on the left. -->
    <ol class="tl">
      <li
        v-for="(item, index) in visibleTimeline"
        :key="`${item.title}-${item.date}-${index}`"
        class="tl-item"
        :class="[index % 2 === 0 ? 'side-right' : 'side-left', { latest: index === visibleTimeline.length - 1 }]"
      >
        <span class="tl-dot" aria-hidden="true"></span>
        <time class="tl-year">{{ formatDate(item.date) }}</time>

        <article class="tl-card">
          <time class="tl-card-year">{{ formatDate(item.date) }}</time>
          <h3 class="tl-title">{{ item.title }}</h3>
          <p class="tl-desc">{{ item.description }}</p>

          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            rel="noopener"
            class="tl-link"
          >
            View details <i class="fas fa-arrow-right"></i>
          </a>
        </article>
      </li>
    </ol>

    <div v-if="timeline.length > initialLimit" class="tl-more">
      <button
        type="button"
        class="tl-toggle"
        :aria-expanded="showAll"
        @click="showAll = !showAll"
      >
        <span>{{ showAll ? "Show less" : `Show full journey (+${timeline.length - initialLimit})` }}</span>
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

/* ===== Timeline =====
   --gap: space between a card and the center line */
.tl {
  --gap: 2rem;
  --dot: 12px;
  --row: 1.1rem; /* vertical position of dot / notch / year, from the card top */

  position: relative;
  max-width: 820px;
  margin: 0 auto;
  padding: 0.25rem 0;
  list-style: none;
}

/* Center line */
.tl::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  border-radius: 2px;
  background: var(--border);
  transform: translateX(-50%);
}

.tl-item {
  position: relative;
  display: flex;
  margin-bottom: 0.9rem;
}

.tl-item:last-child {
  margin-bottom: 0;
}

.tl-item.side-right {
  justify-content: flex-end;
}

/* Milestone dot on the line (ring; the newest shown milestone is filled) */
.tl-dot {
  position: absolute;
  top: calc(var(--row) - var(--dot) / 2 + 4px);
  left: 50%;
  z-index: 2;
  width: var(--dot);
  height: var(--dot);
  border: 2px solid var(--text);
  border-radius: 50%;
  background: var(--surface);
  box-shadow: 0 0 0 4px var(--surface);
  transform: translateX(-50%);
}

/* The most recent milestone shown gets a filled dot ("you are here") */
.tl-item.latest .tl-dot {
  background: var(--text);
}

/* Year on the empty side of the line, level with the dot */
.tl-year {
  position: absolute;
  top: calc(var(--row) - 0.45rem + 4px);
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  white-space: nowrap;
}

.tl-item.side-right .tl-year {
  right: calc(50% + var(--gap));
}

.tl-item.side-left .tl-year {
  left: calc(50% + var(--gap));
}

/* Card + notch pointing at the dot, with a short connector line */
.tl-card {
  position: relative;
  width: calc(50% - var(--gap));
  padding: 0.9rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition: border-color 0.2s ease;
}

.tl-card:hover {
  border-color: var(--text-muted);
}

.tl-card::before {
  content: "";
  position: absolute;
  top: var(--row);
  width: 10px;
  height: 10px;
  border-top: 1px solid var(--border);
  border-right: 1px solid var(--border);
  background: var(--surface);
  transition: border-color 0.2s ease;
}

.tl-card:hover::before {
  border-color: var(--text-muted);
}

.tl-card::after {
  content: "";
  position: absolute;
  top: calc(var(--row) + 5px);
  width: calc(var(--gap) - var(--dot) / 2 - 6px);
  height: 1px;
  background: var(--border);
}

.tl-item.side-right .tl-card::before {
  left: -6px;
  transform: rotate(225deg);
}

.tl-item.side-right .tl-card::after {
  right: calc(100% + 6px);
}

.tl-item.side-left .tl-card::before {
  right: -6px;
  transform: rotate(45deg);
}

.tl-item.side-left .tl-card::after {
  left: calc(100% + 6px);
}

/* Year inside the card: phones only */
.tl-card-year {
  display: none;
}

.tl-title {
  margin: 0 0 0.3rem;
  color: var(--text);
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.3;
}

.tl-desc {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tl-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.55rem;
  color: var(--text);
  font-size: 0.74rem;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Show full journey: quiet text button centered on the line */
.tl-more {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.tl-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.tl-toggle:hover {
  border-color: var(--text-muted);
  color: var(--text);
}

.tl-toggle i {
  font-size: 0.65rem;
}

/* ===== Phones: one column, line close to the cards ===== */
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

  .tl {
    --gap: 1.6rem;
    --row: 1rem;
    padding-left: 0;
  }

  .tl::before {
    left: 6px;
    transform: none;
  }

  .tl-item,
  .tl-item.side-right {
    justify-content: flex-end;
    margin-bottom: 0.65rem;
  }

  .tl-dot {
    left: 7px;
  }

  /* Year moves into the card */
  .tl-year {
    display: none;
  }

  .tl-card-year {
    display: block;
    margin-bottom: 0.2rem;
    color: var(--text-muted);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .tl-card,
  .tl-item.side-left .tl-card,
  .tl-item.side-right .tl-card {
    width: calc(100% - var(--gap));
    padding: 0.8rem 0.9rem;
  }

  .tl-item.side-left .tl-card::before,
  .tl-item.side-right .tl-card::before {
    left: -6px;
    right: auto;
    transform: rotate(225deg);
  }

  .tl-item.side-left .tl-card::after,
  .tl-item.side-right .tl-card::after {
    left: auto;
    right: calc(100% + 6px);
    width: calc(var(--gap) - 7px - var(--dot) / 2 - 6px);
  }

  .tl-title {
    font-size: 0.94rem;
  }

  .tl-desc {
    font-size: 0.8rem;
  }
}
</style>