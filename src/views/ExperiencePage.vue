<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Experience</span>
        <h1><span class="title-full">Where I've worked and studied</span><span class="title-short">My experience</span></h1>
        <p>
          Internships, freelance work, and the education behind the systems I
          build.
        </p>
        <AdSlot class="hero-ad" type="wide-box" />
      </div>

      <ExperienceSection :experiences="experiences" :show-title="false" />

      <AdSlot type="wide-box" show-smartlink />
      <CareerTimeline :timeline="timeline" />
    </section>
  </main>
</template>

<script>
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

