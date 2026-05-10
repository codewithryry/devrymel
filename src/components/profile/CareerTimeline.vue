<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <section class="timeline-section">
    <div class="section-header">
      <h2 class="section-title">Career & Education Timeline</h2>
    </div>

    <div class="timeline-container">
      <div class="timeline-line"></div>

      <div
        v-for="(item, index) in visibleTimeline"
        :key="index"
        class="timeline-item"
        :class="{ right: index % 2 === 0 }"
      >
        <div class="timeline-marker">
          <span class="marker-dot"></span>
        </div>

        <article class="timeline-card">
          <div class="timeline-date">
            {{ formatDate(item.date) }}
          </div>

          <h3 class="timeline-title">{{ item.title }}</h3>

          <p class="timeline-description">
            {{ item.description }}
          </p>

          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            rel="noopener"
            class="timeline-link"
          >
            View Details
            <i class="fas fa-arrow-right"></i>
          </a>
        </article>
      </div>
    </div>

    <button
      v-if="isMobile && timeline.length > mobileLimit"
      type="button"
      class="timeline-toggle"
      @click="showAllMobile = !showAllMobile"
    >
      <span>{{ showAllMobile ? "Show Less" : "Show More" }}</span>
      <i :class="showAllMobile ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </button>
  </section>
</template>

<script>
export default {
  name: "CareerTimeline",

  props: {
    timeline: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      showAllMobile: false,
      isMobile: false,
      mobileLimit: 3
    }
  },

  computed: {
    visibleTimeline() {
      if (this.isMobile && !this.showAllMobile) {
        return this.timeline.slice(0, this.mobileLimit)
      }

      return this.timeline
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
      this.isMobile = window.innerWidth <= 768
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
  margin: 3rem 0;
  padding: 0;
}

.section-header {
  text-align: left;
  margin-bottom: 2rem;
}

.section-kicker {
  display: inline-flex;
  margin-bottom: 0.35rem;
  font-size: 0.78rem;
  font-weight: 800;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.section-title {
  margin: 0;
  text-align: left;
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  line-height: 1.15;
  letter-spacing: -0.04em;
}

/* ===== TIMELINE DESKTOP ===== */
.timeline-container {
  position: relative;
  max-width: 950px;
  margin: 0 auto;
  padding: 0.3rem 0;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    to bottom,
    transparent,
    #667eea 12%,
    #667eea 88%,
    transparent
  );
}

.timeline-item {
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item.right {
  justify-content: flex-end;
}

.timeline-marker {
  position: absolute;
  top: 1.35rem;
  left: 50%;
  z-index: 3;
  transform: translateX(-50%);
}

.marker-dot {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #ffffff;
  border: 3px solid #667eea;
  box-shadow: 0 0 0 5px rgba(102, 126, 234, 0.16);
}

.timeline-card {
  position: relative;
  width: calc(50% - 42px);
  padding: 1rem 1.1rem;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.timeline-card::before {
  content: "";
  position: absolute;
  top: 1.35rem;
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  transform: rotate(45deg);
}

.timeline-item:not(.right) .timeline-card::before {
  right: -7px;
}

.timeline-item.right .timeline-card::before {
  left: -7px;
  transform: rotate(225deg);
}

.timeline-card:hover {
  transform: translateY(-3px);
  border-color: rgba(102, 126, 234, 0.45);
  box-shadow: 0 16px 34px rgba(102, 126, 234, 0.13);
}

.timeline-date {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.55rem;
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
  font-size: 0.72rem;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.timeline-title {
  margin: 0 0 0.45rem;
  color: #2d3748;
  font-size: 1.03rem;
  font-weight: 800;
  line-height: 1.25;
}

.timeline-description {
  margin: 0;
  color: #4a5568;
  font-size: 0.88rem;
  line-height: 1.5;
}

.timeline-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.85rem;
  color: #667eea;
  font-size: 0.82rem;
  font-weight: 800;
  text-decoration: none;
}

.timeline-link:hover {
  color: #5a67d8;
}

.timeline-toggle {
  display: none;
}

/* ===== TABLET / MOBILE CLEAN LEFT TIMELINE ===== */
@media (max-width: 900px) {
  .timeline-container {
    max-width: 100%;
  }

  .timeline-line {
    left: 0.8rem;
  }

  .timeline-item,
  .timeline-item.right {
    justify-content: flex-start;
    padding-left: 2.4rem;
    margin-bottom: 1rem;
  }

  .timeline-marker {
    left: 0.8rem;
    top: 1.25rem;
    transform: translateX(-50%);
  }

  .timeline-card {
    width: 100%;
  }

  .timeline-card::before,
  .timeline-item.right .timeline-card::before,
  .timeline-item:not(.right) .timeline-card::before {
    left: -7px;
    right: auto;
    transform: rotate(225deg);
  }
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .timeline-section {
    margin: 2.5rem 0;
  }

  .section-header {
    margin-bottom: 1.35rem;
  }

  .section-title {
    font-size: 1.45rem;
  }

  .section-kicker {
    font-size: 0.72rem;
  }

  .timeline-line {
    left: 0.7rem;
  }

  .timeline-item,
  .timeline-item.right {
    padding-left: 2rem;
    margin-bottom: 0.95rem;
  }

  .timeline-marker {
    left: 0.7rem;
    top: 1.15rem;
  }

  .marker-dot {
    width: 12px;
    height: 12px;
    border-width: 2px;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.14);
  }

  .timeline-card {
    padding: 0.95rem;
    border-radius: 15px;
  }

  .timeline-date {
    margin-bottom: 0.55rem;
    padding: 0.23rem 0.6rem;
    font-size: 0.68rem;
  }

  .timeline-title {
    font-size: 0.98rem;
    line-height: 1.25;
  }

  .timeline-description {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .timeline-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    width: 100%;
    margin-top: 1.1rem;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(102, 126, 234, 0.25);
    border-radius: 14px;
    background: rgba(102, 126, 234, 0.08);
    color: #667eea;
    font-size: 0.88rem;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .timeline-toggle:hover {
    background: rgba(102, 126, 234, 0.12);
    border-color: rgba(102, 126, 234, 0.35);
  }

  .timeline-toggle:active {
    transform: scale(0.98);
  }

  .timeline-toggle i {
    font-size: 0.78rem;
  }
}

@media (max-width: 420px) {
  .section-title {
    font-size: 1.32rem;
  }

  .timeline-item,
  .timeline-item.right {
    padding-left: 1.8rem;
  }

  .timeline-card {
    padding: 0.9rem;
  }
}
</style>