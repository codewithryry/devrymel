<template>
  <main class="info-page">
    <section class="info-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="info-hero">
        <span class="eyebrow">Roadmap</span>
        <h1>Portfolio improvement roadmap</h1>
        <p>
          A simple roadmap of completed, ongoing, and planned improvements for
          the Devrymel portfolio.
        </p>
      </div>

      <div class="info-grid">
        <article
          v-for="column in roadmap"
          :key="column.title"
          class="info-card"
        >
          <div class="icon-box">
            <i :class="column.icon"></i>
          </div>

          <h2>{{ column.title }}</h2>

          <ul class="info-list">
            <li v-for="item in column.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>
  </main>
</template>

<script>
import "@/assets/info-pages.css";

export default {
  name: "RoadmapPage",

  data() {
    return {
      roadmap: [
        {
          title: "Done",
          icon: "fas fa-check-circle",
          items: [
            "Responsive portfolio layout",
            "Theme selector",
            "Floating action buttons",
            "Live stats panel",
            "Firestore visitor logs",
            "Private admin dashboard",
            "Ad blocker warning"
          ]
        },
        {
          title: "In Progress",
          icon: "fas fa-spinner",
          items: [
            "More content pages",
            "Admin dashboard UI polish",
            "Better analytics visualization",
            "Portfolio copy improvements"
          ]
        },
        {
          title: "Planned",
          icon: "fas fa-map",
          items: [
            "Project CMS with Firestore",
            "Tech notes CMS",
            "Feedback status management",
            "More case studies",
            "Export admin data"
          ]
        }
      ]
    };
  }
};
</script>