<template>
  <main class="info-page">
    <section class="info-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="info-hero">
        <span class="eyebrow">Services</span>
        <h1>Web development services I offer</h1>
        <p>
          I focus on clean, responsive, and functional web interfaces for
          portfolios, landing pages, dashboards, Firebase-backed apps, and small
          automation workflows.
        </p>
      </div>

      <div class="info-grid">
        <article class="info-card" v-for="service in services" :key="service.title">
          <div class="icon-box">
            <i :class="service.icon"></i>
          </div>

          <h2>{{ service.title }}</h2>
          <p>{{ service.description }}</p>
        </article>
      </div>

      <section class="cta-card">
        <div>
          <span class="eyebrow">Available</span>
          <h2>Need help with a website or dashboard?</h2>
          <p>
            Send the details of your project, target design, and needed pages.
            I focus on frontend implementation, responsive layouts, and Firebase
            integration.
          </p>
        </div>

        <a href="mailto:reymelrey.mislang@gmail.com" class="cta-btn">
          Email Me
        </a>
      </section>
    </section>
  </main>
</template>

<script>
import "@/assets/info-pages.css";

export default {
  name: "ServicesPage",

  data() {
    return {
      services: [
        {
          icon: "fas fa-laptop-code",
          title: "Portfolio Websites",
          description:
            "Personal portfolio websites with clean sections, responsive layout, and polished UI presentation."
        },
        {
          icon: "fas fa-window-maximize",
          title: "Landing Pages",
          description:
            "Focused landing pages for products, services, school projects, small businesses, or personal branding."
        },
        {
          icon: "fas fa-database",
          title: "Firebase Integration",
          description:
            "Firestore setup, feedback forms, admin-only dashboards, visitor logs, and Firebase Auth flows."
        },
        {
          icon: "fas fa-chart-line",
          title: "Admin Dashboards",
          description:
            "Private dashboard pages for viewing stored data, analytics summaries, and basic visualizations."
        },
        {
          icon: "fas fa-mobile-alt",
          title: "Responsive UI Fixes",
          description:
            "Mobile layout fixes, overflow cleanup, spacing adjustments, and better cross-device presentation."
        },
        {
          icon: "fas fa-project-diagram",
          title: "Workflow Automation",
          description:
            "Simple n8n-based workflows to connect tools and automate repeated digital tasks."
        }
      ]
    };
  }
};
</script>