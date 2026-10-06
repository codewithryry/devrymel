<template>
  <section id="more-pages" class="page-nav-section">
    <h2 class="section-title">More Pages</h2>

    <div class="page-nav-grid">
      <router-link
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
        class="page-nav-card"
      >
        <span class="page-nav-icon">
          <i :class="page.icon"></i>
        </span>
        <span class="page-nav-info">
          <strong>{{ page.title }}</strong>
          <small>{{ page.description }}</small>
        </span>
        <i class="fas fa-arrow-right page-nav-arrow"></i>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "PageNavSection",

  data() {
    return {
      pages: [
        { path: "/about", icon: "fas fa-bolt", title: "Now", description: "What I'm currently focused on" },
        { path: "/uses", icon: "fas fa-laptop-code", title: "Uses", description: "Tools, gear, and setup" },
        { path: "/services", icon: "fas fa-briefcase", title: "Services", description: "What I can help you build" },
        { path: "/case-studies", icon: "fas fa-flask", title: "Case Studies", description: "In-depth project breakdowns" },
        { path: "/deployment", icon: "fas fa-rocket", title: "Deployment", description: "How I ship and host projects" },
        { path: "/roadmap", icon: "fas fa-map", title: "Roadmap", description: "What's coming next" },
        { path: "/changelog", icon: "fas fa-history", title: "Changelog", description: "Recent site updates" },
        { path: "/contact", icon: "fas fa-paper-plane", title: "Contact", description: "Get in touch directly" }
      ]
    };
  }
};
</script>

<style scoped>
.page-nav-section {
  margin: 0;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
  text-align: left;
}

.page-nav-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .page-nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.page-nav-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease;
}

.page-nav-card:hover {
  border-color: var(--text-muted);
}

.page-nav-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: var(--surface-soft);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 0.95rem;
}

.page-nav-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.page-nav-info strong {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
}

.page-nav-info small {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.page-nav-arrow {
  color: var(--text-muted);
  font-size: 0.8rem;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.page-nav-card:hover .page-nav-arrow {
  transform: translateX(3px);
  color: var(--text);
}
</style>
