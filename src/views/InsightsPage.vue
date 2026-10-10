<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Insights</span>
        <h1><span class="title-full">What I've been building and learning</span><span class="title-short">Latest activity</span></h1>
        <p>
          Recent releases, roadmap progress, project status, and new credentials,
          all in one place.
        </p>
        <AdSlot class="hero-ad" type="banner" show-smartlink />
      </div>

      <!-- At a glance (same numbers as the homepage dev stats) -->
      <div v-mobile-slides class="info-grid insight-stats">
        <article v-for="stat in stats" :key="stat.id" class="info-card insight-stat">
          <div class="icon-box"><i :class="stat.icon"></i></div>
          <strong>{{ stat.value }}</strong>
          <p>{{ stat.label }}</p>
        </article>
      </div>

      <!-- Recent releases: latest changelog entries -->
      <section class="info-panel">
        <div class="insight-head">
          <div>
            <span class="eyebrow">Releases · {{ latestRelease.date }}</span>
            <h2>Recent updates</h2>
          </div>
          <router-link to="/changelog" class="insight-link">Changelog <i class="fas fa-arrow-right"></i></router-link>
        </div>

        <ul class="insight-list">
          <li v-for="item in latestRelease.items.slice(0, 5)" :key="item.text">
            <span class="insight-tag" :class="{ 'tag-new': item.type === 'New' }">{{ item.type }}</span>
            {{ item.text }}
          </li>
        </ul>
      </section>

      <!-- Roadmap progress -->
      <section class="info-panel">
        <div class="insight-head">
          <div>
            <span class="eyebrow">Milestones</span>
            <h2>{{ doneCount }} of {{ milestones.length }} done</h2>
          </div>
          <router-link to="/roadmap" class="insight-link">Roadmap <i class="fas fa-arrow-right"></i></router-link>
        </div>

        <div class="insight-bar" role="progressbar" :aria-valuenow="doneCount" aria-valuemin="0" :aria-valuemax="milestones.length">
          <span :style="{ width: `${(doneCount / milestones.length) * 100}%` }"></span>
        </div>

        <ul class="insight-list">
          <li v-for="stop in upcoming" :key="stop.title">
            <span class="insight-tag" :class="{ 'tag-new': stop.status === 'progress' }">{{ stop.status === "progress" ? "Now" : "Next" }}</span>
            <span><strong>{{ stop.title }}</strong> — {{ stop.text }}</span>
          </li>
        </ul>
      </section>

      <AdSlot type="wide-box" show-smartlink />

      <!-- Project status -->
      <section class="info-panel">
        <div class="insight-head">
          <div>
            <span class="eyebrow">Projects</span>
            <h2>Project status</h2>
          </div>
          <router-link to="/projects" class="insight-link">All projects <i class="fas fa-arrow-right"></i></router-link>
        </div>

        <div v-mobile-slides class="insight-projects">
          <article v-for="project in projects" :key="project.id" class="insight-project">
            <span class="insight-status">{{ project.status }}</span>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="insight-actions">
              <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener">Demo</a>
              <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener">Code</a>
            </div>
          </article>
        </div>
      </section>

      <!-- Learning: newest certificates -->
      <section class="info-panel">
        <div class="insight-head">
          <div>
            <span class="eyebrow">Learning</span>
            <h2>Recent credentials</h2>
          </div>
        </div>

        <ul class="insight-list">
          <li v-for="cert in certificates.slice(0, 3)" :key="cert.title">
            <span class="insight-tag">{{ cert.category }}</span>
            <a :href="certPath(cert.file)" target="_blank" rel="noopener">{{ cert.title }}</a>
          </li>
        </ul>

        <MobileMore v-if="certificates.length > 3" :label="`Show all ${certificates.length}`">
          <ul class="insight-list insight-list-more">
            <li v-for="cert in certificates.slice(3)" :key="cert.title">
              <span class="insight-tag">{{ cert.category }}</span>
              <a :href="certPath(cert.file)" target="_blank" rel="noopener">{{ cert.title }}</a>
            </li>
          </ul>
        </MobileMore>
      </section>

      <AdSlot type="banner" show-smartlink />

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import MobileMore from "@/components/MobileMore.vue";
import changelog from "@/data/changelog.json";
import milestones from "@/data/roadmap.json";
import projects from "@/data/projects.json";
import certificatesData from "@/data/certificates.json";
import devStats from "@/data/devStats.json";
import { PINNED_CERTIFICATE } from "@/data/pinnedCertificate";
import "@/assets/info-pages.css";

export default {
  name: "InsightsPage",

  components: {
    AdSlot,
    ExploreLinks,
    MobileMore
  },

  data() {
    return {
      // Everything here comes from the same data files the other pages use
      latestRelease: changelog[0],
      milestones,
      projects,
      certificates: [PINNED_CERTIFICATE, ...certificatesData],
      stats: devStats.slice(0, 3)
    };
  },

  computed: {
    doneCount() {
      return this.milestones.filter((m) => m.status === "done").length;
    },

    // What's being worked on now + the next planned stop
    upcoming() {
      const now = this.milestones.filter((m) => m.status === "progress");
      const next = this.milestones.filter((m) => m.status === "planned").slice(0, 1);
      return [...now, ...next];
    }
  },

  methods: {
    certPath(file) {
      if (file && file.startsWith("http")) return file;
      return `/certificates/${file}`;
    }
  }
};
</script>

<style scoped>
.insight-stat strong {
  display: block;
  color: var(--text);
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.insight-stat p {
  margin-top: 0.25rem;
  font-size: 0.82rem;
}

.insight-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.insight-head .eyebrow {
  margin-bottom: 0.3rem;
}

.info-panel h2 {
  font-size: 1.1rem;
}

.insight-link {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
}

.insight-link i {
  font-size: 0.65rem;
}

.insight-link:hover {
  border-color: var(--text-muted);
}

.insight-list {
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.insight-list-more {
  margin-top: 0.5rem;
}

.insight-list li {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
}

.insight-list strong {
  color: var(--text);
  font-weight: 600;
}

.insight-list a {
  color: var(--text);
  text-decoration: none;
}

.insight-list a:hover {
  text-decoration: underline;
}

/* Same pill as the Changelog tags */
.insight-tag {
  flex: 0 0 auto;
  min-width: 66px;
  padding: 1px 6px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
}

.insight-tag.tag-new {
  border-color: var(--text);
  color: var(--text);
}

.insight-bar {
  height: 6px;
  margin-top: 1rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--surface-soft);
}

.insight-bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--text);
}

.insight-projects {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.insight-project {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.insight-status {
  align-self: flex-start;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.insight-project h3 {
  margin: 0.35rem 0 0;
  color: var(--text);
  font-size: 0.96rem;
  font-weight: 700;
}

.insight-project p {
  display: -webkit-box;
  margin: 0.35rem 0 0;
  overflow: hidden;
  color: var(--text-secondary);
  font-size: 0.84rem;
  line-height: 1.55;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.insight-actions {
  display: flex;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 0.75rem;
}

.insight-actions a {
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text);
  font-size: 0.76rem;
  font-weight: 600;
  text-decoration: none;
}

.insight-actions a:hover {
  border-color: var(--text-muted);
}

@media (max-width: 900px) {
  .insight-projects {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
