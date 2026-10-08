<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Insights</span>
        <h1>Tech notes and guides</h1>
        <p>
          Short, practical write-ups on fixes, setups, and tools I use while
          building web apps.
        </p>
      </div>

      <TechNotesSection :notes="techNotes" :show-title="false" stacked />

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import TechNotesSection from "@/components/profile/TechNotesSection.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import { subscribeToCollection } from "@/services/contentService";
import techNotes from "@/data/techNotes.json";
import "@/assets/info-pages.css";

export default {
  name: "TechNotesPage",

  components: {
    TechNotesSection,
    ExploreLinks
  },

  data() {
    return {
      techNotes,
      unsubscribe: null
    };
  },

  mounted() {
    this.unsubscribe = subscribeToCollection(
      "techNotes",
      (items) => {
        if (items.length) this.techNotes = items;
      },
      (error) => console.error("Load live techNotes error:", error)
    );
  },

  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }
};
</script>
