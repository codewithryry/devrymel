<template>
  <section class="info-panel explore-panel">
    <span class="eyebrow">Explore</span>
    <h2>More about my work</h2>
    <div class="explore-links">
      <router-link
        v-for="link in visibleLinks"
        :key="link.path"
        :to="link.path"
        class="explore-link"
      >
        {{ link.title }}
      </router-link>
    </div>
  </section>
</template>

<script>
const EXPLORE_LINKS = [
  { path: "/why-me", title: "Why Me" },
  { path: "/tech-notes", title: "Tech Notes" },
  { path: "/uses", title: "Uses" },
  { path: "/deployment", title: "Deployment" },
  { path: "/case-studies", title: "Case Studies" },
  { path: "/roadmap", title: "Roadmap" },
  { path: "/changelog", title: "Changelog" },
  { path: "/contact", title: "Contact" },
  { path: "/privacy", title: "Privacy" }
];

export default {
  name: "ExploreLinks",

  computed: {
    // Hide the link to the page you're already on
    visibleLinks() {
      return EXPLORE_LINKS.filter((link) => link.path !== this.$route.path);
    }
  }
};
</script>

<style scoped>
.explore-panel {
  margin-top: 1rem;
}

/* Single row on desktop; scrolls sideways instead of wrapping if it ever overflows */
.explore-links {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.4rem;
  margin-top: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.explore-links::-webkit-scrollbar {
  display: none;
}

.explore-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
  padding: 0.5rem 0.6rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface-soft);
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.8rem;
  white-space: nowrap;
  transition: border-color 0.2s ease;
}

.explore-link:hover {
  border-color: var(--text-muted);
}

@media (max-width: 560px) {
  .explore-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
  }

  .explore-link {
    padding: 0.7rem 0.6rem;
    font-size: 0.85rem;
  }
}

/* Phones: Explore is hidden — these links live in the bottom-nav Menu */
@media (max-width: 768px) {
  .explore-panel {
    display: none;
  }
}
</style>
