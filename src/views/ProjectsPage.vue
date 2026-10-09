<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <HeroArt name="projects" />
        <span class="eyebrow">Projects</span>
        <h1>Things I've built and shipped</h1>
        <p>
          Web apps, PWAs, automation workflows, and client builds — from idea to
          working product.
        </p>
      </div>

      <FeaturedCarousel class="featured-desktop" :projects="featuredProjects" @openProjectModal="openProjectModal" />
      <ProjectsSection class="featured-mobile" :projects="featuredProjects" :show-kicker="false" actions-bottom @openProjectModal="openProjectModal" />

      <AdSlot type="wide-box" show-smartlink />

      <div class="more-header">
        <h2 class="more-title">More Projects</h2>
        <!-- List/card toggle: phones only -->
        <div class="view-toggle">
          <button type="button" :class="{ active: view === 'list' }" aria-label="List view" @click="view = 'list'">
            <i class="fas fa-list"></i>
          </button>
          <button type="button" :class="{ active: view === 'grid' }" aria-label="Card view" @click="view = 'grid'">
            <i class="fas fa-th-large"></i>
          </button>
        </div>
      </div>

      <!-- Category filter -->
      <nav class="project-filter" aria-label="Filter projects by category">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          :class="{ active: activeCategory === tab.key }"
          :aria-pressed="activeCategory === tab.key"
          @click="activeCategory = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>

      <section v-for="section in sections" :key="section.key" class="project-section">
        <h2 class="section-title">{{ section.title }}</h2>

        <div class="project-grid" :class="{ 'is-list': view === 'list' }">
          <article v-for="item in section.items" :key="item.id" class="project-card">
            <a
              class="project-image"
              :href="item.demoUrl || item.githubUrl || null"
              target="_blank"
              rel="noopener"
              :aria-label="'Open ' + item.title"
            >
              <img :src="item.image" :alt="item.title + ' screenshot'" loading="lazy" decoding="async" />
            </a>

            <div class="project-body">
              <span class="project-category">{{ categoryLabels[item.categories[0]] }}</span>
              <h3>{{ item.title }}</h3>
              <p class="project-desc">{{ item.description }}</p>

              <div v-if="item.skills.length" class="tag-group">
                <span class="tag-label">Skills</span>
                <ul class="tags">
                  <li v-for="skill in item.skills" :key="skill">{{ skill }}</li>
                </ul>
              </div>

              <div v-if="item.tools.length" class="tag-group">
                <span class="tag-label">Tools</span>
                <ul class="tags tools">
                  <li v-for="tool in item.tools" :key="tool">{{ tool }}</li>
                </ul>
              </div>

              <div v-if="item.demoUrl || item.githubUrl" class="project-actions">
                <a v-if="item.demoUrl" :href="item.demoUrl" target="_blank" rel="noopener" class="project-btn primary">
                  <i class="fas fa-external-link-alt"></i><span>Demo</span>
                </a>
                <a v-if="item.githubUrl" :href="item.githubUrl" target="_blank" rel="noopener" class="project-btn">
                  <i class="fab fa-github"></i><span>Code</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <ProjectModal
        v-if="showProjectModal"
        :message="projectModalMessage"
        @close="showProjectModal = false"
      />

      <!-- More on GitHub -->
      <section class="info-panel github-panel">
        <div>
          <span class="eyebrow">GitHub</span>
          <h2>Want to see more?</h2>
          <p>These are just some of my projects. Visit my GitHub for more repositories, experiments, and source code.</p>
        </div>
        <a href="https://github.com/codewithryry" target="_blank" rel="noopener" class="project-btn primary github-btn">
          <i class="fab fa-github"></i><span>Visit my GitHub</span>
        </a>
      </section>
    </section>
  </main>
</template>

<script>
import HeroArt from "@/components/HeroArt.vue";
import AdSlot from "@/components/AdSlot.vue";
import ProjectsSection from "@/components/projects/ProjectsSection.vue";
import FeaturedCarousel from "@/components/projects/FeaturedCarousel.vue";
import ProjectModal from "@/components/modals/ProjectModal.vue";
import rawProjects from "@/data/projects.json";
import curatedProjects from "@/data/curatedProjects.json";
import "@/assets/info-pages.css";

// Display order of the categories. A project's first category is its main one.
const CATEGORIES = [
  { key: "websites", label: "Websites", single: "Website" },
  { key: "apps", label: "Web Apps", single: "Web App" },
  { key: "systems", label: "Information Systems", single: "Information System" },
  { key: "ai", label: "AI-Powered", single: "AI-Powered" },
  { key: "mobile", label: "Mobile & PWA", single: "Mobile & PWA" },
  { key: "business", label: "Business & Finance", single: "Business & Finance" },
  { key: "education", label: "Education & Students", single: "Education" },
  { key: "community", label: "Community & Public Service", single: "Community" }
];

export default {
  name: "ProjectsPage",

  components: {
    FeaturedCarousel,
    HeroArt,
    ProjectsSection,
    ProjectModal
  },

  data() {
    return {
      featuredProjects: rawProjects.map((project) => ({
        ...project,
        image: project.image && !project.image.startsWith("http")
          ? require(`@/assets/${project.image}`)
          : project.image
      })),
      projects: curatedProjects.map((project) => ({
        ...project,
        image: require(`@/assets/${project.image}`)
      })),
      // Opens on the first category (no "All" tab)
      activeCategory: CATEGORIES.find((c) => curatedProjects.some((p) => p.categories.includes(c.key))).key,
      view: "list",
      categoryLabels: Object.fromEntries(CATEGORIES.map((c) => [c.key, c.single])),
      showProjectModal: false,
      projectModalMessage: ""
    };
  },

  methods: {
    openProjectModal(message) {
      this.projectModalMessage = message;
      this.showProjectModal = true;
    }
  },

  computed: {
    // Only categories that have projects
    usedCategories() {
      return CATEGORIES.filter((c) => this.projects.some((p) => p.categories.includes(c.key)));
    },

    tabs() {
      return this.usedCategories;
    },

    // Every project tagged with the selected category
    sections() {
      const category = CATEGORIES.find((c) => c.key === this.activeCategory);
      return [{
        key: category.key,
        title: category.label,
        items: this.projects.filter((p) => p.categories.includes(category.key))
      }];
    }
  }
};
</script>

<style scoped>
/* Desktop: carousel. Phones/tablets: the regular card grid */
.featured-mobile {
  display: none;
}

@media (max-width: 860px) {
  .featured-desktop {
    display: none;
  }

  .featured-mobile {
    display: block;
  }

  /* Featured on phones: swipe sideways, one card at a time with the next one peeking */
  .featured-mobile :deep(.projects-grid) {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding-bottom: 2px;
  }

  .featured-mobile :deep(.projects-grid)::-webkit-scrollbar {
    display: none;
  }

  .featured-mobile :deep(.project-card) {
    flex: 0 0 85%;
    height: auto;
    scroll-snap-align: start;
  }

  .featured-mobile :deep(.section-header) {
    margin-bottom: 1rem;
  }
}

.more-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 2.5rem 0 1rem;
}

.more-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

/* List/card toggle: phones only */
.view-toggle {
  display: none;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
}

.view-toggle button {
  width: 30px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.78rem;
  cursor: pointer;
}

.view-toggle button.active {
  background: var(--surface-soft);
  color: var(--text);
}

/* ===== FILTER ===== */
.project-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 2rem;
}

.project-filter button {
  height: 34px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.project-filter button:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.project-filter button.active {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}

/* ===== SECTIONS ===== */
.project-section + .project-section {
  margin-top: 2.5rem;
}

.section-title {
  margin: 0 0 1.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

/* ===== CARD ===== */
.project-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.2s ease;
}

.project-card:hover {
  border-color: var(--text-muted);
}

.project-image {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--surface-soft);
  border-bottom: 1px solid var(--border);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.02);
}

.project-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem 1.1rem 1.1rem;
}

.project-category {
  margin-bottom: 0.25rem;
  color: var(--text-muted);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.project-card h3 {
  margin: 0 0 0.4rem;
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}

.project-desc {
  margin: 0 0 0.85rem;
  color: var(--text-secondary);
  font-size: 0.84rem;
  line-height: 1.5;
}

/* Skills / Tools */
.tag-group {
  margin-bottom: 0.6rem;
}

.tag-label {
  display: block;
  margin-bottom: 0.3rem;
  color: var(--text-muted);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tags li {
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--text-secondary);
  font-size: 0.7rem;
  line-height: 1.4;
}

.tags.tools li {
  border: 1px solid var(--border);
  background: transparent;
}

/* Buttons */
.project-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.project-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.project-btn:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.project-btn.primary {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}

.project-btn.primary:hover {
  opacity: 0.88;
  color: var(--bg);
}

/* ===== MORE ON GITHUB ===== */
.github-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: 2.5rem;
}

.github-panel p {
  margin: 0.35rem 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.github-btn {
  flex-shrink: 0;
  height: 40px;
  padding: 0 18px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .more-title {
    font-size: 1.4rem;
  }

  /* Filter scrolls sideways instead of wrapping */
  .project-filter {
    flex-wrap: nowrap;
    margin-bottom: 1.5rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .project-filter::-webkit-scrollbar {
    display: none;
  }

  .project-filter button {
    flex-shrink: 0;
  }

  /* The active filter tab already names the category */
  .section-title {
    display: none;
  }

  .project-grid {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }

  .project-body {
    padding: 0.85rem 0.95rem 0.95rem;
  }

  .github-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .project-actions .project-btn {
    flex: 1;
    height: 38px;
  }

  .view-toggle {
    display: flex;
  }

  /* Compact list: thumbnail + category/title/description, then one-line
     scrollable Skills and Tools rows, then small buttons */
  .project-grid.is-list {
    gap: 0.6rem;
  }

  .is-list .project-card {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    column-gap: 0.75rem;
    align-items: start;
    padding: 0.7rem;
  }

  .is-list .project-image {
    aspect-ratio: 1 / 1;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
  }

  .is-list .project-card:hover .project-image img {
    transform: none;
  }

  .is-list .project-body {
    min-width: 0;
    padding: 0;
  }

  .is-list .project-category {
    margin-bottom: 0.1rem;
    font-size: 0.62rem;
  }

  .is-list .project-card h3 {
    margin-bottom: 0.15rem;
    overflow: hidden;
    font-size: 0.92rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .is-list .project-desc {
    display: -webkit-box;
    margin-bottom: 0.45rem;
    overflow: hidden;
    font-size: 0.76rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .is-list .tag-group {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.3rem;
  }

  .is-list .tag-label {
    flex-shrink: 0;
    width: 34px;
    margin: 0;
    font-size: 0.58rem;
  }

  .is-list .tags {
    flex-wrap: nowrap;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .is-list .tags::-webkit-scrollbar {
    display: none;
  }

  .is-list .tags li {
    flex-shrink: 0;
    padding: 0.1rem 0.45rem;
    font-size: 0.66rem;
    white-space: nowrap;
  }

  .is-list .project-actions {
    padding-top: 0.25rem;
  }

  .is-list .project-actions .project-btn {
    flex: 0 0 auto;
    height: 28px;
    padding: 0 12px;
    font-size: 0.72rem;
  }
}
</style>
