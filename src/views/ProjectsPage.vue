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

      <FeaturedCarousel class="featured-desktop" :projects="projects" @openProjectModal="openProjectModal" />
      <ProjectsSection class="featured-mobile" :projects="projects" :show-kicker="false" @openProjectModal="openProjectModal" />

      <section class="other-projects">
        <div class="other-header">
          <h2 class="other-title">Other Projects</h2>
          <div class="other-view-toggle">
            <button type="button" :class="{ active: otherView === 'list' }" aria-label="List view" @click="otherView = 'list'">
              <i class="fas fa-list"></i>
            </button>
            <button type="button" :class="{ active: otherView === 'grid' }" aria-label="Card view" @click="otherView = 'grid'">
              <i class="fas fa-th-large"></i>
            </button>
          </div>
        </div>
        <div class="other-grid" :class="{ 'is-list': otherView === 'list' }">
          <div v-for="item in otherProjects" :key="item.id" class="other-card">
            <div class="other-image">
              <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy" decoding="async" />
              <i v-else class="fas fa-globe"></i>
            </div>
            <div class="other-card-head">
              <h3>{{ item.title }}</h3>
              <div class="other-actions">
                <a
                  v-if="item.link"
                  :href="item.link"
                  target="_blank"
                  rel="noopener"
                  class="other-action-btn"
                  title="Live Demo"
                  aria-label="Open live demo"
                >
                  <i class="fas fa-external-link-alt"></i><span>Demo</span>
                </a>
                <a
                  v-if="item.githubUrl"
                  :href="item.githubUrl"
                  target="_blank"
                  rel="noopener"
                  class="other-action-btn"
                  title="View Code"
                  aria-label="View source code on GitHub"
                >
                  <i class="fab fa-github"></i><span>Code</span>
                </a>
              </div>
            </div>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </section>

      <ProjectModal
        v-if="showProjectModal"
        :message="projectModalMessage"
        @close="showProjectModal = false"
      />

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import HeroArt from "@/components/HeroArt.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import ProjectsSection from "@/components/projects/ProjectsSection.vue";
import FeaturedCarousel from "@/components/projects/FeaturedCarousel.vue";
import ProjectModal from "@/components/modals/ProjectModal.vue";
import rawProjects from "@/data/projects.json";
import projectLinks from "@/data/projectLinks.json";
import "@/assets/info-pages.css";

export default {
  name: "ProjectsPage",

  components: {
    ExploreLinks,
    FeaturedCarousel,
    HeroArt,
    ProjectsSection,
    ProjectModal
  },

  data() {
    return {
      projects: rawProjects.map((project) => ({
        ...project,
        image: project.image && !project.image.startsWith("http")
          ? require(`@/assets/${project.image}`)
          : project.image
      })),
      // Skip links already shown in Featured Projects
      otherProjects: projectLinks
        .filter((item) => !rawProjects.some((project) => project.demoUrl === item.link))
        .map((item) => ({
          ...item,
          image: item.image ? require(`@/assets/${item.image}`) : ""
        })),
      otherView: "list",
      showProjectModal: false,
      projectModalMessage: ""
    };
  },

  methods: {
    openProjectModal(message) {
      this.projectModalMessage = message;
      this.showProjectModal = true;
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
}

.other-projects {
  margin-top: 2.5rem;
}

.other-title {
  margin: 0 0 1.5rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

.other-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.25rem;
}

.other-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.2s ease;
}

.other-card:hover {
  border-color: var(--text-muted);
}

.other-image {
  aspect-ratio: 2.1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-soft);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.other-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.other-image i {
  font-size: 1.6rem;
  color: var(--text-muted);
}

.other-card-head {
  padding: 1rem 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.other-card h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text);
}

.other-actions {
  display: flex;
  flex-shrink: 0;
  gap: 0.35rem;
}

.other-action-btn {
  height: 22px;
  padding: 0 9px;
  gap: 5px;
  display: flex;
  align-items: center;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.7rem;
  line-height: 1;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.other-action-btn:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.other-card p {
  margin: 0 1rem 1rem;
  font-size: 0.84rem;
  line-height: 1.5;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.other-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.other-header .other-title {
  margin: 0;
}

/* List/card toggle: phones only */
.other-view-toggle {
  display: none;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
}

.other-view-toggle button {
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

.other-view-toggle button.active {
  background: var(--surface-soft);
  color: var(--text);
}

@media (max-width: 640px) {
  .other-header {
    margin-bottom: 1rem;
  }

  .other-view-toggle {
    display: flex;
  }

  .other-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  /* Compact list: small thumbnail + title/buttons + one-line description */
  .other-grid.is-list {
    gap: 0.5rem;
  }

  .is-list .other-card {
    display: grid;
    grid-template-columns: 64px 1fr;
    grid-template-rows: auto auto;
    column-gap: 0.7rem;
    align-items: center;
    padding: 0.55rem;
  }

  .is-list .other-image {
    grid-row: 1 / 3;
    aspect-ratio: 4 / 3;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
  }

  .is-list .other-image i {
    font-size: 1rem;
  }

  .is-list .other-card-head {
    padding: 0;
    margin-bottom: 0.2rem;
  }

  .is-list .other-card h3 {
    min-width: 0;
    font-size: 0.86rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .is-list .other-action-btn {
    width: 24px;
    height: 22px;
    padding: 0;
    justify-content: center;
  }

  .is-list .other-action-btn span {
    display: none;
  }

  .is-list .other-card p {
    margin: 0;
    font-size: 0.74rem;
    -webkit-line-clamp: 1;
  }
}
</style>
