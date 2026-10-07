<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <HeroArt name="skills" />
        <span class="eyebrow">Skills</span>
        <h1>Tools and technologies I work with</h1>
        <p>
          The stack I use to build modern web apps, PWAs, and automation
          workflows.
        </p>
      </div>

      <LiveDevStats :stats="devStats" />

      <section class="info-panel stack-panel">
        <span class="eyebrow">Core Technologies</span>
        <h2>My stack</h2>
        <div v-for="group in stackGroups" :key="group.title" class="stack-group">
          <h3>{{ group.title }}</h3>
          <div class="stack-icons">
            <img
              v-for="icon in group.icons"
              :key="icon"
              :src="`https://skillicons.dev/icons?i=${icon}`"
              :alt="icon"
              :title="icon"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section class="info-panel stack-panel">
        <span class="eyebrow">Soft Skills</span>
        <h2>How I work</h2>
        <div class="pill-grid">
          <span v-for="skill in softSkills" :key="skill">{{ skill }}</span>
        </div>
      </section>

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import HeroArt from "@/components/HeroArt.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import LiveDevStats from "@/components/profile/LiveDevStats.vue";
import { subscribeToCollection } from "@/services/contentService";
import devStats from "@/data/devStats.json";
import "@/assets/info-pages.css";

export default {
  name: "SkillsPage",

  components: {
    ExploreLinks,
    HeroArt,
    LiveDevStats
  },

  data() {
    return {
      devStats,
      softSkills: [
        "Hardworking",
        "Fast learner",
        "Problem solver",
        "Team player",
        "Clear communicator",
        "Detail-oriented",
        "Adaptable",
        "Self-motivated",
        "Time management",
        "Creative thinker"
      ],
      stackGroups: [
        {
          title: "Frontend",
          icons: ["react", "nextjs", "vue", "ts", "js", "html", "css", "tailwind", "bootstrap", "sass"]
        },
        {
          title: "Backend & Database",
          icons: ["nodejs", "express", "python", "php", "django", "mysql", "postgres", "mongodb", "firebase", "supabase"]
        },
        {
          title: "Tools & Platforms",
          icons: ["git", "github", "vscode", "figma", "postman", "vite", "vercel", "netlify", "npm", "docker"]
        }
      ],
      contentUnsubscribes: []
    };
  },

  mounted() {
    ["devStats"].forEach((key) => {
      this.contentUnsubscribes.push(
        subscribeToCollection(
          key,
          (items) => {
            if (items.length) this[key] = items;
          },
          (error) => console.error(`Load live ${key} error:`, error)
        )
      );
    });
  },

  beforeUnmount() {
    this.contentUnsubscribes.forEach((unsubscribe) => unsubscribe());
  }
};
</script>

<style scoped>
.stack-panel {
  margin-top: 2rem;
}

.stack-group {
  margin-top: 1.25rem;
}

.stack-group h3 {
  margin: 0 0 0.6rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 700;
}

.stack-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.stack-icons img {
  width: 44px;
  height: 44px;
  filter: grayscale(1) contrast(1.1);
}

/* Froth Modern: show the real logo colors */
html[data-theme="froth"] .stack-icons img {
  filter: none;
}
</style>
