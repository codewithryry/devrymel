<template>
  <main class="info-page">
    <section class="info-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="info-hero">
        <span class="eyebrow">Case Studies</span>
        <h1>Selected project breakdowns</h1>
        <p>
          A deeper look at selected work, including the goal, core features,
          technologies used, and the result of each build.
        </p>
      </div>

      <section
        v-for="study in caseStudies"
        :key="study.title"
        class="info-panel"
      >
        <span class="eyebrow">{{ study.type }}</span>
        <h2>{{ study.title }}</h2>
        <p>{{ study.summary }}</p>

        <ul class="info-list">
          <li><strong>Goal:</strong> {{ study.goal }}</li>
          <li><strong>Features:</strong> {{ study.features }}</li>
          <li><strong>Tech:</strong> {{ study.tech }}</li>
          <li><strong>Result:</strong> {{ study.result }}</li>
        </ul>
      </section>
    </section>
  </main>
</template>

<script>
import "@/assets/info-pages.css";

export default {
  name: "CaseStudiesPage",

  data() {
    return {
      caseStudies: [
        {
          type: "Portfolio System",
          title: "Devrymel Portfolio Admin Dashboard",
          summary:
            "A private Firestore dashboard used to view visitor logs, feedback, analytics, and data visualizations.",
          goal:
            "Create a private admin page for monitoring portfolio activity without exposing data to public visitors.",
          features:
            "Google admin login, visitor logs, feedback view, analytics tab, graphs, sidebar layout, and mobile responsive UI.",
          tech: "Vue.js, Firebase Auth, Firestore, JavaScript, CSS",
          result:
            "The portfolio now includes a private owner-only dashboard with real-time-style management features."
        },
        {
          type: "Safety Platform",
          title: "SafePath",
          summary:
            "A campus-focused bullying reporting and support system created for MINSU Calapan Campus.",
          goal:
            "Provide a safe digital channel for users to share concerns and receive guided support.",
          features:
            "Chatbot support, severity-based responses, report redirection, feedback handling, and structured user flow.",
          tech: "JavaScript, Firebase, HTML, CSS",
          result:
            "The system supports comfort messaging, reporting flow, and a focused interface for student safety concerns."
        },
        {
          type: "Capstone",
          title: "Hareneth",
          summary:
            "A mobile-app based civil registration and analytics system for Calapan City's civil registry process.",
          goal:
            "Modernize civil registration workflows for birth, marriage, and death record-related services.",
          features:
            "Appointment scheduling, document verification, client support chatbot, and analytics-oriented features.",
          tech: "Node.js, JavaScript, Firebase/MySQL planning, app development workflow",
          result:
            "The project targets faster processing, better client experience, and improved registry office workflows."
        }
      ]
    };
  }
};
</script>