<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Services</span>
        <h1><span class="title-full">What I can help you build</span><span class="title-short">What I build</span></h1>
        <p>
          From a simple website to a complete web app — I plan, build, and
          launch projects that are fast, responsive, and easy to use.
        </p>
        <AdSlot class="hero-ad" type="banner" show-smartlink />
      </div>

      <!-- Concept: one product under construction. Each service is a part of
           the site/app being built, laid out like a wireframe in a browser. -->
      <div class="build" aria-label="Services">
        <!-- Browser bar -->
        <div class="build-bar" aria-hidden="true">
          <span class="build-dots"><i></i><i></i><i></i></span>
          <span class="build-url"><i class="fas fa-lock"></i> your-project.com</span>
          <span class="build-status">Building</span>
        </div>

        <!-- Wireframe -->
        <div class="build-canvas">
          <article
            v-for="(service, index) in services"
            :key="service.title"
            class="zone"
            :class="`zone-${service.area}`"
            tabindex="0"
          >
            <header class="zone-head">
              <span class="zone-num">{{ String(index + 1).padStart(2, "0") }}</span>
              <i :class="service.icon" aria-hidden="true"></i>
            </header>

            <!-- Small wireframe sketch of that part of the product -->
            <div class="sketch" :class="`sketch-${service.area}`" aria-hidden="true">
              <template v-if="service.area === 'site'">
                <span class="sk-logo"></span>
                <span class="sk-line"></span><span class="sk-line"></span><span class="sk-line"></span>
                <span class="sk-btn"></span>
              </template>

              <template v-else-if="service.area === 'app'">
                <span class="sk-field"></span>
                <span class="sk-field"></span>
                <span class="sk-field short"></span>
                <span class="sk-btn"></span>
              </template>

              <template v-else-if="service.area === 'dash'">
                <span class="sk-bar" style="height: 40%"></span>
                <span class="sk-bar" style="height: 70%"></span>
                <span class="sk-bar" style="height: 55%"></span>
                <span class="sk-bar" style="height: 90%"></span>
              </template>

              <template v-else-if="service.area === 'redo'">
                <span class="sk-box old"></span>
                <i class="fas fa-arrow-right"></i>
                <span class="sk-box new"></span>
              </template>

              <template v-else-if="service.area === 'auto'">
                <span class="sk-node"></span><span class="sk-wire"></span>
                <span class="sk-node"></span><span class="sk-wire"></span>
                <span class="sk-node"></span>
              </template>

              <template v-else>
                <span class="sk-dot"></span>
                <span class="sk-line"></span>
              </template>
            </div>

            <div class="zone-text">
              <h2>{{ service.title }}</h2>
              <p>{{ service.description }}</p>
            </div>
          </article>
        </div>
      </div>
      <ExploreLinks />
    </section>

  </main>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import "@/assets/info-pages.css";

export default {
  name: "ServicesPage",

  components: {
    ExploreLinks,
    AdSlot
  },

  data() {
    return {
      // "area" = which part of the product it is in the wireframe
      services: [
        {
          area: "site",
          icon: "fas fa-globe",
          title: "Websites",
          description: "Personal, business, and landing pages that look clean on every screen."
        },
        {
          area: "app",
          icon: "fas fa-layer-group",
          title: "Web Applications",
          description: "Interactive apps with accounts, data, and the features you need."
        },
        {
          area: "dash",
          icon: "fas fa-table-columns",
          title: "Dashboards & Systems",
          description: "Tools to manage records, track information, and run daily work."
        },
        {
          area: "redo",
          icon: "fas fa-wand-magic-sparkles",
          title: "Redesigns & Improvements",
          description: "Better layout, speed, and mobile experience for an existing site."
        },
        {
          area: "auto",
          icon: "fas fa-arrows-rotate",
          title: "Automation & Integrations",
          description: "Connect your tools and take repetitive tasks off your plate."
        },
        {
          area: "care",
          icon: "fas fa-life-ring",
          title: "Maintenance & Support",
          description: "Updates, fixes, and help after launch so everything keeps running."
        }
      ]
    };
  }
};
</script>

<style scoped>
/* ===== Browser frame ===== */
.build {
  margin-bottom: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.build-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.9rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.build-dots {
  display: flex;
  gap: 5px;
}

.build-dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border);
}

.build-url {
  display: inline-flex;
  flex: 1;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.74rem;
}

.build-url i {
  font-size: 0.6rem;
}

.build-status {
  color: var(--text-muted);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ===== Wireframe layout: the product's parts =====
   site = header, app = main area, dash = sidebar,
   redo / auto = content blocks, care = footer */
.build-canvas {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  grid-template-areas:
    "site site site"
    "app  app  dash"
    "redo auto dash"
    "care care care";
  gap: 0.6rem;
  padding: 0.75rem;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 22px 22px;
  background-position: -1px -1px;
  background-color: var(--surface);
}

.zone {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.9rem;
  border: 1px dashed color-mix(in srgb, var(--text) 22%, transparent);
  border-radius: var(--radius);
  background: var(--surface);
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.zone:hover,
.zone:focus-visible {
  border-style: solid;
  border-color: var(--text-muted);
  background: var(--surface-soft);
}

.zone-site { grid-area: site; flex-direction: row; align-items: center; }
.zone-app  { grid-area: app; }
.zone-dash { grid-area: dash; }
.zone-redo { grid-area: redo; }
.zone-auto { grid-area: auto; }
.zone-care { grid-area: care; flex-direction: row; align-items: center; }

.zone-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.zone-num {
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.zone-head i {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.zone-text h2 {
  margin: 0 0 0.2rem;
  color: var(--text);
  font-size: 0.98rem;
  font-weight: 700;
}

.zone-text p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.5;
}

/* Header and footer read as one row: tag, sketch, text */
.zone-site .zone-head,
.zone-care .zone-head {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
}

.zone-site .zone-text,
.zone-care .zone-text {
  flex: 1;
}

/* ===== Wireframe sketches (theme colors only) ===== */
.sketch {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
}

.sk-logo,
.sk-line,
.sk-btn,
.sk-field,
.sk-bar,
.sk-box,
.sk-node,
.sk-dot {
  display: block;
  border-radius: 4px;
  background: var(--surface-soft);
  border: 1px solid var(--border);
}

/* Header: logo, links, button */
.sketch-site { flex-shrink: 0; width: 34%; }
.sketch-site .sk-logo { width: 22px; height: 22px; border-radius: 6px; }
.sketch-site .sk-line { flex: 1; height: 8px; }
.sketch-site .sk-btn { width: 42px; height: 20px; border-radius: 999px; background: var(--text); border-color: var(--text); }

/* App: form fields + button */
.sketch-app { flex-direction: column; align-items: stretch; gap: 5px; }
.sketch-app .sk-field { height: 14px; }
.sketch-app .sk-field.short { width: 60%; }
.sketch-app .sk-btn { width: 70px; height: 18px; border-radius: 999px; background: var(--text); border-color: var(--text); }

/* Dashboard: bar chart */
.sketch-dash { align-items: flex-end; height: 70px; gap: 8px; padding: 0 4px; border-bottom: 1px solid var(--border); }
.sketch-dash .sk-bar { flex: 1; border-radius: 4px 4px 0 0; }
.sketch-dash .sk-bar:last-child { background: var(--text); border-color: var(--text); }

/* Redesign: old box -> new box */
.sketch-redo .sk-box { flex: 1; height: 30px; }
.sketch-redo .sk-box.old { border-style: dashed; background: none; }
.sketch-redo .sk-box.new { background: var(--text); border-color: var(--text); }
.sketch-redo i { font-size: 0.7rem; }

/* Automation: connected nodes */
.sketch-auto { height: 30px; }
.sketch-auto .sk-node { width: 16px; height: 16px; flex-shrink: 0; border-radius: 50%; }
.sketch-auto .sk-node:last-child { background: var(--text); border-color: var(--text); }
.sketch-auto .sk-wire { flex: 1; height: 0; border-top: 1px dashed var(--text-muted); }

/* Footer: status dot + line */
.sketch-care { flex-shrink: 0; width: 22%; }
.sketch-care .sk-dot { width: 10px; height: 10px; border-radius: 50%; background: #22c55e; border-color: #22c55e; }
.sketch-care .sk-line { flex: 1; height: 8px; }

/* ===== Phones: same browser + wireframe, rearranged for a narrow screen ===== */
@media (max-width: 640px) {
  .build-status {
    display: none;
  }

  .build-canvas {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "site site"
      "app  app"
      "dash redo"
      "dash auto"
      "care care";
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .zone {
    gap: 0.5rem;
    padding: 0.75rem;
  }

  /* Header / footer become stacked like the other zones */
  .zone-site,
  .zone-care {
    flex-direction: column;
    align-items: stretch;
  }

  .zone-site .zone-head,
  .zone-care .zone-head {
    flex-direction: row;
    align-items: center;
  }

  .sketch-site,
  .sketch-care {
    width: 100%;
  }

  .zone-text h2 {
    font-size: 0.9rem;
  }

  .zone-text p {
    font-size: 0.76rem;
    line-height: 1.45;
  }

  .sketch-dash {
    height: 54px;
  }
}
</style>
