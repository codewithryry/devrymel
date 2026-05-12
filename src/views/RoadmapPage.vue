<template>
  <main class="info-page">
    <section class="info-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="info-hero">
        <span class="eyebrow">Roadmap</span>
        <h1>Portfolio improvement roadmap</h1>
        <p>
          A simple roadmap of completed, ongoing, and planned improvements for
          the Devrymel portfolio.
        </p>
      </div>

      <div class="info-grid">
        <article
          v-for="column in roadmap"
          :key="column.title"
          class="info-card"
        >

          <h2>{{ column.title }}</h2>

          <ul class="info-list">
            <li v-for="item in column.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>
  </main>
</template>

<script>
import "@/assets/info-pages.css";

export default {
  name: "RoadmapPage",

  data() {
    return {
      roadmap: [
        {
          title: "Done",
          icon: "fas fa-check-circle",
          items: [
            "Responsive portfolio layout",
            "Theme selector with 4 themes",
            "Floating action button system",
            "Live GitHub & WakaTime stats panel",
            "Firestore visitor logs (production fixed)",
            "Private admin dashboard",
            "Ad blocker detection",
            "Mini tools panel in FAB",
            "TikTok Downloader",
            "YouTube Thumbnail Downloader",
            "YouTube Downloader",
            "QR Code Generator",
            "Password Generator",
            "IP Address Lookup",
            "Base64 Encoder / Decoder",
            "Theme-based profile image switching",
            "Deployment Gallery page",
            "Feedback modal glassmorphic polish",
            "FAB hint arrow",
            "FAB responsive fix for small laptops",
            "React & n8n added to tech stack"
          ]
        },
        {
          title: "In Progress",
          icon: "fas fa-spinner",
          items: [
            "AI Chat FAB panel (3 models)",
            "Admin dashboard UI polish",
            "Better analytics visualization",
            "More case studies"
          ]
        },
        {
          title: "Planned",
          icon: "fas fa-map",
          items: [
            "AI Chatbot — Chat Mode",
            "AI Chatbot — Code Helper",
            "AI Chatbot — Creative Mode",
            "URL Shortener tool",
            "Color Palette Generator",
            "Project CMS with Firestore",
            "Feedback status management",
            "Export admin data",
            "Tech notes / blog section"
          ]
        }
      ]
    };
  }
};
</script>