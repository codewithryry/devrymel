<template>
  <main class="info-page">
    <section class="info-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="info-hero">
        <span class="eyebrow">Uses</span>
        <h1>Tools and setup I use for development</h1>
        <p>
          A simple list of the tools, stack, and workflow I use when building
          websites, Firebase apps, dashboards, and automation-focused projects.
        </p>
      </div>

      <div class="info-grid">
        <article class="info-card" v-for="item in setup" :key="item.title">
          <div class="icon-box">
            <i :class="item.icon"></i>
          </div>

          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </article>
      </div>

      <section class="info-panel">
        <span class="eyebrow">Main Stack</span>
        <h2>Technologies I work with</h2>

        <div class="pill-grid">
          <span v-for="tool in tools" :key="tool">{{ tool }}</span>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import "@/assets/info-pages.css";

export default {
  name: "UsesPage",

  data() {
    return {
      setup: [
        {
          icon: "fas fa-code",
          title: "Editor",
          description:
            "VS Code is my main editor for Vue, JavaScript, Firebase, CSS, and project maintenance."
        },
        {
          icon: "fas fa-database",
          title: "Backend and Database",
          description:
            "Firebase and Firestore are used for dashboards, visitor logs, feedback, and lightweight app data."
        },
        {
          icon: "fas fa-robot",
          title: "Automation",
          description:
            "I use n8n and workflow tools to connect apps, reduce repetitive tasks, and test automation ideas."
        }
      ],

      tools: [
        "Vue.js",
        "JavaScript",
        "Firebase",
        "Firestore",
        "Google Auth",
        "HTML",
        "CSS",
        "GitHub",
        "VS Code",
        "n8n",
        "Vercel",
        "WakaTime"
      ]
    };
  }
};
</script>