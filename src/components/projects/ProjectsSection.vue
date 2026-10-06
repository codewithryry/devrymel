<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->
<template>
  <section id="projects" class="projects-showcase">
    <div class="section-header" :class="{ 'has-link': viewAllTo }">
      <div>
        <span class="section-kicker">Projects</span>
        <h2 class="section-title">Featured Projects</h2>
      </div>

      <router-link v-if="viewAllTo" :to="viewAllTo" class="view-all-link">
        {{ viewAllLabel }}
      </router-link>
    </div>

    <div class="projects-grid">
      <div class="project-card" v-for="project in projects" :key="project.id">
        <div class="project-image-container">
          <img :src="resolveImage(project.image)" :alt="project.title" class="project-image" />
          <div class="project-status" :class="{ 'available': project.demoUrl !== '#', 'unavailable': project.demoUrl === '#' }">
            {{ project.demoUrl !== '#' ? 'Live Demo Available' : 'Demo Coming Soon' }}
          </div>
        </div>
        <div class="project-info">
          <div class="project-title-row">
            <h3 class="project-title">{{ project.title }}</h3>

            <div class="project-actions">
              <a
                :href="project.demoUrl"
                target="_blank"
                class="project-action-btn"
                title="Live Demo"
                aria-label="Open live demo"
                @click="handleProjectClick(project.demoUrl, project.title, $event)"
              >
                <i class="fas fa-external-link-alt"></i>
              </a>
              <a
                :href="project.githubUrl"
                target="_blank"
                class="project-action-btn"
                title="View Code"
                aria-label="View source code on GitHub"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>

          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            <span class="tech-tag" v-for="tech in project.technologies.slice(0, 4)" :key="tech">
              {{ tech }}
            </span>
            <span class="tech-tag more" v-if="project.technologies.length > 4">
              +{{ project.technologies.length - 4 }} more
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProjectsSection',
  props: {
    viewAllTo: {
      type: String,
      default: ""
    },
    viewAllLabel: {
      type: String,
      default: "View all.."
    },
    projects: {
      type: Array,
      required: true
    }
  },
  emits: ['openProjectModal'],
  methods: {
    resolveImage(image) {
      if (!image) return '';
      if (image.startsWith('http') || image.startsWith('data:') || image.startsWith('/')) {
        return image;
      }

      try {
        return require(`@/assets/${image}`);
      } catch (error) {
        return image;
      }
    },

    handleProjectClick(url, projectTitle, event) {
      if (url === "#") {
        event.preventDefault();
        this.$emit('openProjectModal', `The live demo for "${projectTitle}" is not available yet. The project is still under development. Check back later or view the code on GitHub!`);
      }
    }
  }
}
</script>

<style scoped>
.section-header.has-link {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
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

.projects-showcase {
  margin: 0;
}

.section-header {
  margin-bottom: 1.5rem;
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
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 1.25rem;
  }
}

.project-card {
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--border);
}

.project-card:hover {
  border-color: var(--text-muted);
}

.project-image-container {
  position: relative;
  height: 140px;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-status {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  padding: 0.22rem 0.55rem;
  border-radius: var(--radius-sm);
  font-size: 0.64rem;
  font-weight: 600;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
}

.project-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.project-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  margin: 0;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 0.84rem;
  margin: 0 0 0.85rem;
  min-height: calc(1.5 * 0.84rem * 3);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.35rem;
  min-height: 3.5rem;
  margin-bottom: 0.85rem;
}

.tech-tag {
  background: var(--surface-soft);
  color: var(--text-secondary);
  padding: 0.22rem 0.55rem;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid var(--border);
}

.tech-tag.more {
  color: var(--text-muted);
  font-style: italic;
}

.project-actions {
  display: flex;
  flex-shrink: 0;
  gap: 0.35rem;
}

.project-action-btn {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.74rem;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.project-action-btn:hover {
  color: var(--text);
  border-color: var(--text-muted);
}
</style>
