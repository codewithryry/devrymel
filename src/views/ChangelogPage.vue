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
          title: "Improved Tool Pages Layout & Mobile Input",
          description:
            "Fixed mobile input stacking on TikTok, YouTube Thumbnail, and YouTube Downloader tools. Unified input card style across all tools. Added ad banner above How to Use, and Other Tools suggestions section at the bottom of every tool page."
        },
        {
          date: "May 2026",
          title: "Added Pages & Tools Navigation Section",
          description:
            "Added a compact app-icon style navigation section on the profile page — all pages and tools accessible as icon tiles without needing the FAB."
        },
        {
          date: "May 2026",
          title: "Redesigned FAB Multi-Tap System",
          description:
            "FAB now has a two-stage tap system: first tap reveals the pages/tools stack, second tap shows side buttons (AI, Feedback, Contact). Auto-hides on scroll down and stays open on desktop between page navigations."
        },
        {
          date: "May 2026",
          title: "Feedback Preview Popup",
          description:
            "Feedback bubble now shows a cycling preview of recent feedback messages from the database — one at a time, auto-rotating every 4 seconds with a pulse indicator."
        },
        {
          date: "May 2026",
          title: "Added AI Chat FAB Button",
          description:
            "Added a dedicated AI Chat button to the floating action bar with three model options — Chat Mode, Code Helper, and Creative — all coming soon."
        },
        {
          date: "May 2026",
          title: "Added Mini Tools Panel",
          description:
            "Added a Tools panel to the FAB with 8 live tools: TikTok Downloader, YouTube Thumbnail, YouTube Downloader, QR Generator, Password Generator, IP Lookup, Base64 Encoder/Decoder, plus URL Shortener and Color Palette coming soon."
        },
        {
          date: "May 2026",
          title: "Polished Feedback Modal",
          description:
            "Reworked the feedback modal to match the FAB glassmorphic panel style — matching blur, border radius, header/footer treatment, and animations."
        },
        {
          date: "May 2026",
          title: "Theme-Based Profile Image",
          description:
            "Profile image now switches automatically based on the selected theme — Light, Midnight, and Emerald Focus each show a different photo."
        },
        {
          date: "May 2026",
          title: "Fixed Production Visitor Logs",
          description:
            "Resolved Firestore visitor logging only working on localhost by creating a production environment config with the correct Firebase keys."
        },
        {
          date: "May 2026",
          title: "Added Deployment Gallery Page",
          description:
            "Added a new Deployment Journey page showcasing project deployment screenshots and milestones."
        },
        {
          date: "May 2026",
          title: "FAB Responsive Fixes",
          description:
            "Fixed FAB panels overflowing on 14-inch laptops, corrected page icon colors to match the accent theme, and added viewport-aware panel heights."
        },
        {
          date: "May 2026",
          title: "Updated Tech Stack",
          description:
            "Added React and n8n to the tech stack. Updated subtitle to Frontend Developer & IT Support."
        },
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