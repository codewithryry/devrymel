<template>
  <main class="info-page">
    <section class="info-shell">

      <div class="info-hero">

        <span class="eyebrow">Contact</span>
        <h1><span class="title-full">Let’s build something useful</span><span class="title-short">Let’s work together</span></h1>
        <p>
          Reach out for portfolio websites, frontend work, Firebase integration,
          responsive UI fixes, or small automation projects.
        </p>
        <AdSlot class="hero-ad" type="wide-box" show-smartlink />
      </div>

      <div class="info-grid">
        <article class="info-card">

          <h2>Email</h2>
          <p>Send project details, timeline, and examples of your target design.</p>

          <div class="pill-grid">
            <span>reymelrey.mislang@gmail.com</span>
          </div>
        </article>

        <article class="info-card">
          <div class="card-head">
            <h2>LinkedIn</h2>
            <a href="https://www.linkedin.com/in/reymelreymislang/" target="_blank" rel="noopener noreferrer" class="card-link" aria-label="Open LinkedIn profile">
            <i class="fas fa-external-link-alt"></i>
          </a>
          </div>
          <p>Connect with me for professional updates and work opportunities.</p>

          <div class="pill-grid">
            <span>Reymel Mislang</span>
          </div>
        </article>

        <article class="info-card">

          <div class="card-head">
            <h2>GitHub</h2>
            <a href="https://github.com/codewithryry" target="_blank" rel="noopener noreferrer" class="card-link" aria-label="Open GitHub profile">
            <i class="fas fa-external-link-alt"></i>
          </a>
          </div>
          <p>View my code, experiments, and public development work.</p>

          <div class="pill-grid">
            <span>codewithryry</span>
          </div>
        </article>
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
  name: "ContactPage",

  components: {
    ExploreLinks,
    AdSlot
  }
};
</script>

<style scoped>
.card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.card-link {
  color: var(--text-muted);
  font-size: 0.85rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.card-link:hover {
  color: var(--text);
}
</style>
