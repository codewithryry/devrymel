<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Process</span>
        <h1><span class="title-full">How I work on a project</span><span class="title-short">How I work</span></h1>
        <p>
          From the first message to launch day — a simple, clear process so you
          always know what's happening and what comes next.
        </p>
        <AdSlot class="hero-ad" type="wide-box" />
      </div>

      <!-- Steps -->
      <ol v-mobile-slides class="process-steps">
        <li v-for="(step, index) in steps" :key="step.title" class="info-card process-step">
          <span class="process-num">{{ String(index + 1).padStart(2, "0") }}</span>
          <div>
            <h2><i :class="step.icon"></i> {{ step.title }}</h2>
            <p>{{ step.description }}</p>
          </div>
        </li>
      </ol>

      <AdSlot type="banner" show-smartlink />

      <section class="info-panel">
        <span class="eyebrow">What you get</span>
        <h2>Included in every project</h2>

        <div class="pill-grid">
          <span v-for="item in included" :key="item">{{ item }}</span>
        </div>
      </section>

      <section class="info-panel">
        <span class="eyebrow">Before we start</span>
        <h2>What helps me move faster</h2>

        <MobileMore>
        <ul class="process-list">
          <li v-for="item in prep" :key="item">
            <i class="fas fa-check"></i>
            <span>{{ item }}</span>
          </li>
        </ul>
        </MobileMore>
      </section>
      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import MobileMore from "@/components/MobileMore.vue";
import "@/assets/info-pages.css";

export default {
  name: "ProcessPage",

  components: {
    ExploreLinks,
    MobileMore,
    AdSlot
  },

  data() {
    return {
      steps: [
        {
          icon: "fas fa-comments",
          title: "Discovery",
          description:
            "We talk about your goal, your users, and what the project needs to do. I ask questions so nothing important is missed."
        },
        {
          icon: "fas fa-clipboard-list",
          title: "Plan & scope",
          description:
            "I turn the idea into a short plan: pages or features, tech stack, timeline, and what's needed from you."
        },
        {
          icon: "fas fa-code",
          title: "Design & build",
          description:
            "I build in small steps and share progress early, so you can give feedback while changes are still easy."
        },
        {
          icon: "fas fa-rocket",
          title: "Review & launch",
          description:
            "We test on desktop and mobile, fix what's left, then I deploy it and help set up the domain if needed."
        },
        {
          icon: "fas fa-life-ring",
          title: "Support",
          description:
            "After launch I'm still reachable for fixes, small updates, and questions about how things work."
        }
      ],

      included: [
        "Regular progress updates",
        "Mobile-friendly layout",
        "Source code access",
        "Deployment help",
        "Basic SEO setup",
        "Short handover notes"
      ],

      prep: [
        "A short description of the project and who it's for",
        "Examples or links of sites you like",
        "Your logo, colors, photos, and text (if you have them)",
        "Your target date or deadline",
        "Any existing accounts: domain, hosting, or Firebase"
      ]
    };
  }
};
</script>

<style scoped>
.process-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.process-num {
  flex-shrink: 0;
  min-width: 2rem;
  color: var(--text-muted);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
}

.process-step h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.process-step h2 i {
  color: var(--text-muted);
  font-size: 0.85em;
}

.process-step p {
  margin-bottom: 0;
}

.process-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.process-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.process-list i {
  margin-top: 0.3rem;
  color: var(--text-muted);
  font-size: 0.75rem;
}
</style>
