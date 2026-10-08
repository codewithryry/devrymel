<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Benefits</span>
        <h1>Why work with me</h1>
        <p>
          What you can expect when we build something together: clear
          communication, fast delivery, and practical solutions.
        </p>
      </div>

      <HighlightsSection :highlights="highlights" :show-title="false" />

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import HighlightsSection from "@/components/profile/HighlightsSection.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import { subscribeToCollection } from "@/services/contentService";
import highlights from "@/data/highlights.json";
import "@/assets/info-pages.css";

export default {
  name: "WhyMePage",

  components: {
    HighlightsSection,
    ExploreLinks
  },

  data() {
    return {
      highlights,
      unsubscribe: null
    };
  },

  mounted() {
    this.unsubscribe = subscribeToCollection(
      "highlights",
      (items) => {
        if (items.length) this.highlights = items;
      },
      (error) => console.error("Load live highlights error:", error)
    );
  },

  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }
};
</script>

<style scoped>
/* Phones: list every benefit as a stacked card (no sideways swipe, no empty space) */
@media (max-width: 768px) {
  .info-page :deep(.highlights-section .section-header) {
    display: none;
  }

  .info-page :deep(.highlights-grid) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0;
    overflow: visible;
  }

  .info-page :deep(.highlight-card) {
    min-width: 0;
    max-width: none;
    min-height: 0;
  }
}
</style>
