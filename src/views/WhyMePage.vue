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

      <HighlightsSection :highlights="highlights" />

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
