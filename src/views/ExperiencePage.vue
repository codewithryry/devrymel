<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <HeroArt name="experience" />
        <span class="eyebrow">Experience</span>
        <h1>Where I've worked and studied</h1>
        <p>
          Internships, freelance work, and the education behind the systems I
          build.
        </p>
      </div>

      <ExperienceSection :experiences="experiences" :show-title="false" />

      <AdSlot type="wide-box" show-smartlink />
      <CareerTimeline :timeline="timeline" />
    </section>
  </main>
</template>

<script>
import HeroArt from "@/components/HeroArt.vue";
import AdSlot from "@/components/AdSlot.vue";
import ExperienceSection from "@/components/profile/ExperienceSection.vue";
import CareerTimeline from "@/components/profile/CareerTimeline.vue";
import { subscribeToCollection } from "@/services/contentService";
import { PINNED_EXPERIENCE } from "@/data/pinnedExperience";
import experiencesFromJson from "@/data/experiences.json";
import timeline from "@/data/timeline.json";
import "@/assets/info-pages.css";

export default {
  name: "ExperiencePage",

  components: {
    HeroArt,
    AdSlot,
    ExperienceSection,
    CareerTimeline
  },

  data() {
    return {
      experiences: [PINNED_EXPERIENCE, ...experiencesFromJson],
      timeline,
      contentUnsubscribes: []
    };
  },

  mounted() {
    this.contentUnsubscribes.push(
      subscribeToCollection(
        "experiences",
        (items) => {
          this.experiences = [PINNED_EXPERIENCE, ...items];
        },
        (error) => console.error("Load live experiences error:", error)
      ),
      subscribeToCollection(
        "timeline",
        (items) => {
          if (items.length) this.timeline = items;
        },
        (error) => console.error("Load live timeline error:", error)
      )
    );
  },

  beforeUnmount() {
    this.contentUnsubscribes.forEach((unsubscribe) => unsubscribe());
  }
};
</script>

<style scoped>
/* Hero: text on the left, briefcase art vertically centered on the right */
@media (min-width: 861px) {
  .info-hero {
    min-height: 150px;
    padding-right: 220px;
  }

  .info-hero .hero-art {
    top: 50%;
    width: 190px;
    transform: translateY(-50%);
  }

  .info-hero p {
    max-width: 520px;
  }
}
</style>
