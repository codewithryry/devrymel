<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <HeroArt name="changelog" />
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
            :key="log.date"
            class="timeline-item"
          >
            <span class="timeline-dot"></span>

            <div>
              <small>{{ log.date }}</small>
              <ul class="log-items">
                <li v-for="item in log.items" :key="item.title">
                  <strong>{{ item.title }}</strong> — {{ item.description }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import HeroArt from "@/components/HeroArt.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import "@/assets/info-pages.css";

export default {
  name: "ChangelogPage",

  components: {
    ExploreLinks,
    HeroArt
  },

  data() {
    return {
      changelog: [
        {
          date: "October 2026",
          items: [
            { title: "Liquid Glass Desktop Navbar & Rounded Buttons", description: "The desktop navbar now uses the same liquid glass pill as the mobile nav, and all buttons across the site are fully rounded." },
            { title: "Featured Projects Carousel", description: "The Projects page shows Featured Projects in a wide desktop carousel with the active project in front. Barangay Information System, Ugnay, and SK Solutions were added to Featured, with new screenshots for every project." },
            { title: "Other Projects Section", description: "All other projects are listed under Featured with screenshots, clearer descriptions, and Demo/Code buttons. On phones there's a compact list view with a list/card toggle. Added Storylens, Nexus, and Jama." },
            { title: "Demo & Code Labels on Project Cards", description: "Project cards now show labeled Demo and Code buttons aligned with the title." },
            { title: "Dedicated Projects, Skills & Experience Pages", description: "Projects, Skills, and Experience now have their own pages with the same layout as other info pages. The homepage is now a summary with \"View all\" links to each page." },
            { title: "New Skills Stack Icons", description: "Added grouped Frontend, Backend & Database, and Tools & Platforms icons to the Skills page in a clean black-and-white style." },
            { title: "About Page Moved to /about", description: "Renamed the Now page to the About page at /about (old /now links redirect). Added an illustration to the hero and an Explore section linking to other pages." },
            { title: "Theme Fixes for Midnight & Emerald", description: "Removed the legacy dark mode stylesheet that overrode colors, so every page now uses the shared theme colors. Fixed buttons with invisible text on dark themes, and the theme toggle icon now changes per theme." },
            { title: "Simplified Navigation Dropdown", description: "Removed the Tools and Pages submenus. AI Chat is now a single link, Changelog and Privacy were added, and links are grouped under Quick Links with a clear divider." },
            { title: "Cleaner AI Chat UI", description: "Removed decorative icons and gradients from the AI chat so it matches the rest of the site's simple style." },
            { title: "All Tools in Quick Links", description: "All 14 tools now live in the homepage Quick Links, showing 3 by default with a More/Less toggle." },
            { title: "Bigger Homepage CTA & Footer Cleanup", description: "Made the \"Let's build something great\" CTA larger and desktop-only, and removed the footer link columns and copyright line." },
            { title: "Contact Links & Scroll Fix", description: "Added clickable LinkedIn and GitHub links on the Contact page. Navigating to a new page now always starts at the top." },
            { title: "Aligned Page Content with Navbar", description: "Info pages now share padding that lines content up with the navbar edges." }
          ]
        },
        {
          date: "May 2026",
          items: [
            { title: "Improved Tool Pages Layout & Mobile Input", description: "Fixed mobile input stacking on TikTok, YouTube Thumbnail, and YouTube Downloader tools. Unified input card style across all tools. Added ad banner above How to Use, and Other Tools suggestions section at the bottom of every tool page." },
            { title: "Added Pages & Tools Navigation Section", description: "Added a compact app-icon style navigation section on the profile page — all pages and tools accessible as icon tiles without needing the FAB." },
            { title: "Redesigned FAB Multi-Tap System", description: "FAB now has a two-stage tap system: first tap reveals the pages/tools stack, second tap shows side buttons (AI, Feedback, Contact). Auto-hides on scroll down and stays open on desktop between page navigations." },
            { title: "Feedback Preview Popup", description: "Feedback bubble now shows a cycling preview of recent feedback messages from the database — one at a time, auto-rotating every 4 seconds with a pulse indicator." },
            { title: "Added AI Chat FAB Button", description: "Added a dedicated AI Chat button to the floating action bar with three model options — Chat Mode, Code Helper, and Creative — all coming soon." },
            { title: "Added Mini Tools Panel", description: "Added a Tools panel to the FAB with 8 live tools: TikTok Downloader, YouTube Thumbnail, YouTube Downloader, QR Generator, Password Generator, IP Lookup, Base64 Encoder/Decoder, plus URL Shortener and Color Palette coming soon." },
            { title: "Polished Feedback Modal", description: "Reworked the feedback modal to match the FAB glassmorphic panel style — matching blur, border radius, header/footer treatment, and animations." },
            { title: "Theme-Based Profile Image", description: "Profile image now switches automatically based on the selected theme — Light, Midnight, and Emerald Focus each show a different photo." },
            { title: "Fixed Production Visitor Logs", description: "Resolved Firestore visitor logging only working on localhost by creating a production environment config with the correct Firebase keys." },
            { title: "Added Deployment Gallery Page", description: "Added a new Deployment Journey page showcasing project deployment screenshots and milestones." },
            { title: "FAB Responsive Fixes", description: "Fixed FAB panels overflowing on 14-inch laptops, corrected page icon colors to match the accent theme, and added viewport-aware panel heights." },
            { title: "Updated Tech Stack", description: "Added React and n8n to the tech stack. Updated subtitle to Frontend Developer & IT Support." },
            { title: "Added Firestore Admin Dashboard", description: "Added private Google-authenticated admin page for visitor logs, feedback, analytics, and graphs." },
            { title: "Added Visitor Tracking", description: "Added one-time visitor logging per device/browser with device, browser, ISP, and ad blocker information." },
            { title: "Improved Floating UI", description: "Updated floating action buttons, ad blocker warning UI, theme behavior, and admin route hiding." },
            { title: "Added Informational Pages", description: "Added pages for Now, Uses, Services, Case Studies, Privacy, Roadmap, Changelog, and Contact." }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.log-items {
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.45rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.log-items strong {
  color: var(--text);
  font-weight: 600;
}
</style>
