<template>
  <section class="featured-carousel">
    <h2 class="carousel-title">Featured Projects</h2>

    <div class="carousel-track">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        v-show="positionOf(index)"
        class="carousel-card"
        :class="positionOf(index)"
        :style="{ backgroundImage: `url(${project.image})` }"
        @click="activeIndex = index"
      >
        <div class="carousel-overlay"></div>

        <h3 v-if="index !== activeIndex" class="carousel-side-title">{{ project.title }}</h3>

        <div v-else class="carousel-content">
          <span v-if="project.demoUrl !== '#'" class="carousel-live"><i></i>Live</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="carousel-tags">
            <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
          </div>
          <div class="carousel-actions">
            <a
              :href="project.demoUrl"
              target="_blank"
              rel="noopener"
              class="carousel-live-btn"
              @click.stop="handleDemoClick(project, $event)"
            >
              View Live <i class="fas fa-arrow-right"></i>
            </a>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener"
              class="carousel-code-btn"
              @click.stop
            >
              <i class="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </article>
    </div>

    <div class="carousel-dots">
      <button
        v-for="(project, index) in projects"
        :key="project.id"
        type="button"
        :class="{ active: index === activeIndex }"
        :aria-label="`Show ${project.title}`"
        @click="activeIndex = index"
      ></button>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeaturedCarousel",
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  emits: ["openProjectModal"],
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    // Only the active card and its two neighbours are shown (wraps around)
    positionOf(index) {
      const total = this.projects.length;
      if (index === this.activeIndex) return "active";
      if (index === (this.activeIndex - 1 + total) % total) return "prev";
      if (index === (this.activeIndex + 1) % total) return "next";
      return "";
    },

    handleDemoClick(project, event) {
      if (project.demoUrl === "#") {
        event.preventDefault();
        this.$emit("openProjectModal", `The live demo for "${project.title}" is not available yet. The project is still under development. Check back later or view the code on GitHub!`);
      }
    }
  }
};
</script>

<style scoped>
.carousel-title {
  margin: 0 0 1.5rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

/* Wider than the page column so the picture shows almost fully */
.carousel-track {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: min(1160px, calc(100vw - 48px));
  display: flex;
  gap: 0.75rem;
  height: 440px;
}

.carousel-card {
  position: relative;
  flex: 0 0 140px;
  min-width: 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background-color: var(--surface-soft);
  background-size: cover;
  background-position: top center;
  cursor: pointer;
}

.carousel-card.prev {
  order: 0;
}

.carousel-card.active {
  order: 1;
  flex: 1 1 auto;
  cursor: default;
}

.carousel-card.next {
  order: 2;
}

.carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(0 0 0 / 0.15) 0%, rgb(0 0 0 / 0.35) 45%, rgb(0 0 0 / 0.85) 100%);
}

/* Active: keep the picture clear, darken only behind the text */
.carousel-card.active .carousel-overlay {
  background: linear-gradient(180deg, transparent 0%, transparent 40%, rgb(0 0 0 / 0.55) 65%, rgb(0 0 0 / 0.88) 100%);
}

.carousel-card:not(.active):hover .carousel-overlay {
  background: rgb(0 0 0 / 0.35);
}

.carousel-side-title {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1.25rem;
  margin: 0;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.3;
}

.carousel-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem;
  color: #fff;
  animation: carousel-in 0.4s ease;
}

.carousel-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.6rem;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #bbf7d0;
  background: rgb(34 197 94 / 0.2);
  border: 1px solid rgb(34 197 94 / 0.45);
}

.carousel-live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
}

.carousel-content h3 {
  margin: 0 0 0.4rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: #fff;
}

.carousel-content p {
  max-width: 640px;
  margin: 0 0 0.85rem;
  font-size: 0.86rem;
  line-height: 1.55;
  color: rgb(255 255 255 / 0.85);
}

.carousel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.carousel-tags span {
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  color: rgb(255 255 255 / 0.9);
  background: rgb(255 255 255 / 0.1);
  border: 1px solid rgb(255 255 255 / 0.22);
}

.carousel-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-live-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #111;
  background: #fff;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.carousel-live-btn i {
  font-size: 0.7rem;
}

.carousel-live-btn:hover {
  opacity: 0.9;
}

.carousel-code-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: rgb(255 255 255 / 0.85);
  text-decoration: none;
}

.carousel-code-btn:hover {
  color: #fff;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 1rem;
}

.carousel-dots button {
  width: 7px;
  height: 7px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--border);
  cursor: pointer;
  transition: width 0.25s ease, background 0.25s ease;
}

.carousel-dots button.active {
  width: 20px;
  background: var(--text);
}

@keyframes carousel-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-card,
  .carousel-content {
    transition: none;
    animation: none;
  }
}
</style>
