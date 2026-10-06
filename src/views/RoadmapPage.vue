<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <HeroArt name="roadmap" />
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

          <h2>{{ column.title }}</h2>

          <ul class="info-list">
            <li v-for="item in column.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import HeroArt from "@/components/HeroArt.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import "@/assets/info-pages.css";

export default {
  name: "RoadmapPage",

  components: {
    ExploreLinks,
    HeroArt
  },

  data() {
    return {
      roadmap: [
        {
          title: "Done",
          icon: "fas fa-check-circle",
          items: [
            "Responsive portfolio layout",
            "3 themes: Classic Light, Midnight Pro, Emerald Focus",
            "Unified theme colors across all pages",
            "Dedicated Projects, Skills & Experience pages",
            "Homepage as a summary with \"View all\" links",
            "About page at /about",
            "Explore links on every info page",
            "Hero illustrations on info pages",
            "Live GitHub & WakaTime stats",
            "Private admin CMS with Firestore",
            "Admin CMS mobile layout",
            "Visitor analytics & ad blocker detection",
            "AI Chat with Chat, Code Helper & Creative modes",
            "14 free tools in Quick Links",
            "Deployment Gallery page",
            "Monthly changelog",
            "Downloadable resume & CV"
          ]
        },
        {
          title: "In Progress",
          icon: "fas fa-spinner",
          items: [
            "More case studies",
            "Mobile polish across all pages",
            "Better analytics visualization"
          ]
        },
        {
          title: "Planned",
          icon: "fas fa-map",
          items: [
            "JSON Formatter tool",
            "Text Counter tool",
            "Case Converter tool",
            "Meta Tag Generator tool",
            "Tech notes / blog pages",
            "Project filters by tech stack",
            "Feedback status management",
            "Export admin data"
          ]
        }
      ]
    };
  }
};
</script>