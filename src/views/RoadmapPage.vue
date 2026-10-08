<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <HeroArt name="roadmap" />
        <span class="eyebrow">Roadmap</span>
        <h1>Portfolio improvement roadmap</h1>
        <p>
          A simple roadmap of completed, ongoing, and planned improvements for
          the Devrymel portfolio.
        </p>
      </div>

      <!-- Legend -->
      <div class="road-legend">
        <span class="is-done"><i></i> Done</span>
        <span class="is-progress"><i></i> In progress</span>
        <span class="is-planned"><i></i> Planned</span>
      </div>

      <!-- Desktop: winding road (left → right, U-turn, right → left, ...) -->
      <div class="serp" aria-label="Roadmap">
        <span class="serp-start">Start <i class="fas fa-arrow-right"></i></span>

        <div
          v-for="(row, r) in rows"
          :key="r"
          class="serp-row"
          :class="[r % 2 === 0 ? 'to-right' : 'to-left', { last: r === rows.length - 1 }]"
        >
          <div v-for="stop in row" :key="stop.title" class="serp-stop" :class="`is-${stop.status}`">
            <span class="serp-marker"><i :class="stop.icon"></i></span>
            <h3>{{ stop.title }}</h3>
            <p>{{ stop.text }}</p>
          </div>
        </div>

        <span
          class="serp-end"
          :class="rows.length % 2 === 0 ? 'at-left' : 'at-right'"
          :style="{ top: `calc(${rows.length - 1} * var(--row-h) + 2px)` }"
        >
          Next <i class="fas fa-arrow-right"></i>
        </span>
      </div>

      <!-- Phones: the same road, running straight down -->
      <ol class="road-mobile">
        <li v-for="stop in milestones" :key="stop.title" class="serp-stop" :class="`is-${stop.status}`">
          <span class="serp-marker"><i :class="stop.icon"></i></span>
          <div>
            <h3>{{ stop.title }}</h3>
            <p>{{ stop.text }}</p>
          </div>
        </li>
      </ol>

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import HeroArt from "@/components/HeroArt.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import "@/assets/info-pages.css";

export default {
  name: "RoadmapPage",

  components: {
    ExploreLinks,
    HeroArt
  },

  data() {
    return {
      // Stops along the road, in order (status: done / progress / planned)
      milestones: [
        {
          title: "Foundation",
          status: "done",
          icon: "fas fa-cube",
          text: "Responsive layout, About page, and dedicated Projects, Tech Stack & Experience pages."
        },
        {
          title: "Design system",
          status: "done",
          icon: "fas fa-palette",
          text: "Light, Midnight, Emerald & Froth themes with shared colors and hero illustrations."
        },
        {
          title: "Live data",
          status: "done",
          icon: "fas fa-chart-line",
          text: "GitHub & WakaTime stats, visitor analytics, and a private Firestore admin CMS."
        },
        {
          title: "Tools & AI",
          status: "done",
          icon: "fas fa-wand-magic-sparkles",
          text: "Ask Rymel AI chat, 14 free tools, and the Deployment Gallery."
        },
        {
          title: "Docs & updates",
          status: "done",
          icon: "fas fa-file-lines",
          text: "Monthly changelog plus downloadable resume and CV."
        },
        {
          title: "Content & polish",
          status: "progress",
          icon: "fas fa-person-digging",
          text: "More case studies, mobile polish, and better analytics charts."
        },
        {
          title: "More tools",
          status: "planned",
          icon: "fas fa-screwdriver-wrench",
          text: "JSON Formatter, Text Counter, Case Converter, and Meta Tag Generator."
        },
        {
          title: "Notes & filters",
          status: "planned",
          icon: "fas fa-filter",
          text: "Tech notes / blog pages and project filters by tech stack."
        },
        {
          title: "Admin upgrades",
          status: "planned",
          icon: "fas fa-sliders",
          text: "Feedback status management and admin data export."
        }
      ]
    };
  },

  computed: {
    // 3 stops per stretch of road
    rows() {
      const rows = [];
      for (let i = 0; i < this.milestones.length; i += 3) {
        rows.push(this.milestones.slice(i, i + 3));
      }
      return rows;
    }
  }
};
</script>

<style scoped>
/* Road colors follow the theme: a soft grey road with a light dashed lane */
.road-legend,
.serp,
.road-mobile {
  --road: color-mix(in srgb, var(--text) 16%, var(--bg));
  --lane: color-mix(in srgb, var(--bg) 85%, transparent);
  --road-w: 38px;
  --row-h: 230px;
  --turn-w: 120px;
  --done: #16a34a;
  --progress: #f59e0b;
  --planned: var(--text-muted);
}

/* ===== Legend ===== */
.road-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.road-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.road-legend i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.road-legend .is-done i { background: var(--done); }
.road-legend .is-progress i { background: var(--progress); }
.road-legend .is-planned i { border: 2px solid var(--planned); }

/* ===== Desktop serpentine ===== */
.serp {
  position: relative;
  padding: 0 0 1rem;
}

.serp-row {
  position: relative;
  display: flex;
  justify-content: space-around;
  height: var(--row-h);
  padding: 0 calc(var(--turn-w) * 0.6);
}

.serp-row.to-left {
  flex-direction: row-reverse;
}

/* Straight stretch of road */
.serp-row::before {
  content: "";
  position: absolute;
  top: 26px;
  left: 0;
  right: 0;
  height: var(--road-w);
  background:
    linear-gradient(90deg, var(--lane) 0 18px, transparent 18px) 0 50% / 32px 2px repeat-x,
    var(--road);
}

/* U-turn down to the next stretch (right side, then left side, ...) */
.serp-row:not(.last)::after {
  content: "";
  position: absolute;
  top: 26px;
  width: var(--turn-w);
  height: calc(var(--row-h) + var(--road-w));
  border: var(--road-w) solid var(--road);
  box-sizing: border-box;
}

.serp-row.to-right:not(.last)::after {
  right: 0;
  border-left: none;
  border-radius: 0 999px 999px 0;
}

.serp-row.to-left:not(.last)::after {
  left: 0;
  border-right: none;
  border-radius: 999px 0 0 999px;
}

/* Start / end labels */
.serp-start,
.serp-end {
  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.serp-start {
  top: 2px;
  left: 0;
}

/* Labels sit just above the road, at its open ends */

.serp-end.at-right { right: 0; }
.serp-end.at-left { left: 0; }

/* A stop: marker on the road, text under it */
.serp-stop {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  max-width: 220px;
  text-align: center;
}

.serp-marker {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  margin-top: 16px;
  border: 3px solid var(--road);
  border-radius: 50%;
  background: var(--surface);
  color: var(--planned);
  font-size: 1.15rem;
  box-shadow: var(--shadow);
}

.serp-stop.is-done .serp-marker {
  border-color: var(--done);
  color: var(--done);
}

.serp-stop.is-progress .serp-marker {
  border-color: var(--progress);
  color: var(--progress);
  animation: serp-pulse 1.8s ease-in-out infinite;
}

.serp-stop.is-planned .serp-marker {
  border-style: dashed;
  border-color: var(--planned);
}

.serp-stop h3 {
  margin: 0.75rem 0 0.3rem;
  color: var(--text);
  font-size: 0.98rem;
  font-weight: 700;
}

.serp-stop p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.5;
}

@keyframes serp-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgb(245 158 11 / 0.45); }
  50% { box-shadow: 0 0 0 8px rgb(245 158 11 / 0); }
}

/* ===== Phones: straight road down the left ===== */
.road-mobile {
  display: none;
}

@media (max-width: 760px) {
  .serp {
    display: none;
  }

  .road-mobile {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    margin: 0;
    padding: 0.5rem 0 0.5rem;
    list-style: none;
  }

  /* Vertical road with a dashed lane */
  .road-mobile::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    width: var(--road-w);
    border-radius: 999px;
    background:
      linear-gradient(var(--lane) 0 16px, transparent 16px) 50% 0 / 2px 28px repeat-y,
      var(--road);
  }

  .road-mobile .serp-stop {
    flex-direction: row;
    align-items: flex-start;
    gap: 0.9rem;
    width: auto;
    max-width: none;
    text-align: left;
  }

  .road-mobile .serp-marker {
    flex-shrink: 0;
    width: 58px;
    height: 58px;
    margin: 0;
  }

  .road-mobile .serp-stop h3 {
    margin: 0.35rem 0 0.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .serp-stop.is-progress .serp-marker {
    animation: none;
  }
}
</style>
