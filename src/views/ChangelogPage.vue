<template>
  <main class="info-page">
    <section class="info-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="info-hero">
        <span class="eyebrow">Changelog</span>
        <h1>Portfolio updates and improvements</h1>
        <p>
          A record of improvements, fixes, and new features added to the
          Devrymel portfolio.
        </p>
      </div>

      <section class="info-panel">
        <span class="eyebrow">Release Notes</span>
        <h2>Recent updates</h2>

        <div class="timeline-list">
          <div
            v-for="log in changelog"
            :key="log.title"
            class="timeline-item"
          >
            <span class="timeline-dot"></span>

            <div>
              <small>{{ log.date }}</small>
              <h3>{{ log.title }}</h3>
              <p>{{ log.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import "@/assets/info-pages.css";

export default {
  name: "ChangelogPage",

  data() {
    return {
      changelog: [
        {
          date: "May 2026",
          title: "Added Firestore Admin Dashboard",
          description:
            "Added private Google-authenticated admin page for visitor logs, feedback, analytics, and graphs."
        },
        {
          date: "May 2026",
          title: "Added Visitor Tracking",
          description:
            "Added one-time visitor logging per device/browser with device, browser, ISP, and ad blocker information."
        },
        {
          date: "May 2026",
          title: "Improved Floating UI",
          description:
            "Updated floating action buttons, ad blocker warning UI, theme behavior, and admin route hiding."
        },
        {
          date: "May 2026",
          title: "Added Informational Pages",
          description:
            "Added pages for Now, Uses, Services, Case Studies, Privacy, Roadmap, Changelog, and Contact."
        }
      ]
    };
  }
};
</script>