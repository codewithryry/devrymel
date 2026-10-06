<template>
  <div>
    <!-- ===== TOP NAVIGATION (shown on all pages except admin) ===== -->
    <header v-if="!isAdminRoute" class="site-nav" :class="{ scrolled: navScrolled }">
      <div class="site-nav-inner">
        <a href="/" class="nav-brand" @click.prevent="goHomeTop">
          <span class="brand-full">Reymel Mislang</span>
          <span class="brand-short">RM</span>
        </a>

        <nav class="nav-links" :class="{ open: mobileNavOpen }">
          <router-link to="/about" @click="handleQuickPageClick" :class="{ active: $route.path === '/about' }">About</router-link>
          <router-link to="/projects" @click="handleQuickPageClick" :class="{ active: $route.path === '/projects' }">Projects</router-link>
          <router-link to="/skills" @click="handleQuickPageClick" :class="{ active: $route.path === '/skills' }">Skills</router-link>
          <router-link to="/experience" @click="handleQuickPageClick" :class="{ active: $route.path === '/experience' }">Experience</router-link>
          <router-link to="/services" @click="handleQuickPageClick" :class="{ active: $route.path === '/services' }">Services</router-link>

          <div class="nav-mobile-extra">
            <button class="nav-text-btn" @click.stop="togglePanel('more')">More</button>
          </div>
        </nav>

        <div class="nav-actions">
          <div class="nav-menu-wrap">
            <button class="nav-icon-btn" @click="cycleTheme" :title="'Theme: ' + currentThemeName" :aria-label="'Switch theme, current: ' + currentThemeName">
              <svg v-if="currentTheme === 'midnight'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <svg v-else-if="currentTheme === 'forest'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </button>
          </div>

          <div class="nav-menu-wrap">
            <button class="nav-icon-btn more-btn" @click.stop="togglePanel('more')" title="More" aria-label="More">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <circle cx="5" cy="12" r="1.8"/>
                <circle cx="12" cy="12" r="1.8"/>
                <circle cx="19" cy="12" r="1.8"/>
              </svg>
            </button>

            <div v-if="showMorePanel" class="nav-dropdown more-dropdown" @click.stop>
              <div class="dropdown-group">
                <span class="dropdown-label">Live Stats</span>
                <div class="stat-line"><span>Views</span><strong>{{ statsLoading ? '…' : visitorCount.toLocaleString() }}</strong></div>
                <div class="stat-line"><span>Projects</span><strong>{{ statsLoading ? '…' : projectsCount }}</strong></div>
                <div class="stat-line"><span>Hours coding</span><strong>{{ statsLoading ? '…' : codingHoursText }}</strong></div>
                <div class="stat-line"><span>Repositories</span><strong>{{ statsLoading ? '…' : reposCount }}</strong></div>
              </div>

              <div class="dropdown-group">
                <span class="dropdown-label">Documents</span>
                <a href="/Reymel_Mislang_Resume.docx" download class="dropdown-row">
                  <span>Resume</span>
                  <i class="fas fa-download dropdown-arrow"></i>
                </a>

                <a href="/Reymel_Mislang_CV.docx" download class="dropdown-row">
                  <span>CV</span>
                  <i class="fas fa-download dropdown-arrow"></i>
                </a>
              </div>

              <div class="dropdown-group">
                <span class="dropdown-label">Other</span>

                <router-link to="/tools/ai-chat" class="dropdown-row" @click="handleQuickPageClick">
                  <span class="dropdown-row-label">
                  Assistant
                  <span class="beta-badge">Beta</span>
                </span>
                  <i class="fas fa-chevron-right dropdown-arrow"></i>
                </router-link>

                <router-link to="/changelog" class="dropdown-row" @click="handleQuickPageClick">
                  <span>Changelog</span>
                  <i class="fas fa-chevron-right dropdown-arrow"></i>
                </router-link>

                <!-- Phones only: the Feedback side tab is hidden there -->
              <button type="button" class="dropdown-row mobile-only" @click="openFeedback">
                <span>Feedback</span>
                <small v-if="feedbackCount">{{ feedbackCount }}</small>
                <i class="fas fa-chevron-right dropdown-arrow"></i>
              </button>

              <router-link to="/privacy" class="dropdown-row" @click="handleQuickPageClick">
                  <span>Privacy</span>
                  <i class="fas fa-chevron-right dropdown-arrow"></i>
                </router-link>
              </div>
            </div>
          </div>

          <router-link class="nav-contact-btn" to="/contact" @click="handleQuickPageClick" :class="{ active: $route.path === '/contact' }">Contact Me</router-link>

          <button class="nav-hamburger" @click.stop="mobileNavOpen = !mobileNavOpen; showMorePanel = false" :aria-expanded="mobileNavOpen" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- ===== SPOTIFY SIDEBAR BUBBLE ===== -->
    <transition name="spotify-float-fade">
      <div
        v-if="spotifyTrack.isPlaying && !isAiToolsRoute && !isAdminRoute"
        class="spotify-sidebar"
        :class="{ 'spotify-sidebar--open': spotifySidebarOpen }"
        @mouseenter="!isMobile && (spotifySidebarOpen = true)"
        @mouseleave="!isMobile && (spotifySidebarOpen = false)"
        @click="isMobile && (spotifySidebarOpen = !spotifySidebarOpen)"
      >
        <div class="spotify-sidebar-inner">
          <div class="spotify-sidebar-info">
            <span class="spotify-float-now-label">Now Playing</span>
            <span class="spotify-sidebar-title">{{ spotifyTrack.title }}</span>
            <span class="spotify-sidebar-artist">{{ spotifyTrack.artist }}</span>
          </div>
          <div class="spotify-sidebar-art">
            <img v-if="spotifyTrack.image" :src="spotifyTrack.image" :alt="spotifyTrack.title" />
            <i v-else class="fab fa-spotify"></i>
          </div>
        </div>
      </div>
    </transition>

    <!-- Soft glow that follows the mouse across cards (desktop only) -->
    <CursorTrail v-if="!isAdminRoute" />

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toastVisible" class="toast">
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <FeedbackBubble
      v-if="!isAdminRoute && !isAiToolsRoute"
      ref="feedbackBubble"
      :show-button="true"
      lang="en"
      @count-change="feedbackCount = $event"
    />

    <!-- Quick fade between pages -->
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in" @after-enter="observeReveal">
        <component :is="Component" lang="en" :translations="t" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { trackVisit, getViews } from "./services/analyticsService";
import { getGitHubReposCount, getWakaTimeStats } from "./services/devStatsService";
import FeedbackBubble from "@/components/FeedbackBubble.vue";
import CursorTrail from "@/components/CursorTrail.vue";
import { getSpotifyNowPlaying } from "./services/spotifyService";

import {
  getVisitorInfo,
  saveVisitorInfo,
  hasTrackedVisitor,
  getOrCreateVisitorId
} from "@/utils/visitorInfo";
import { detectAdBlocker } from "@/utils/adBlockDetector";
import { subscribeToCollection } from "@/services/contentService";
import fallbackQuickPages from "@/data/quickPages.json";

const UI_TRANSLATIONS = {
  en: {
    getInTouch: "Get in Touch",
    emailMe: "Email",
    location: "Location",
    downloadCV: "Download Resume",
    latestResume: "PDF • Latest Resume"
  }
};

export default {
  name: "App",

  components: {
    FeedbackBubble,
    CursorTrail
  },

  data() {
    return {
      navScrolled: false,
      mobileNavOpen: false,

      showMorePanel: false,
      openSubmenu: null,

      isMobile: window.innerWidth <= 640,

      toastVisible: false,
      toastMessage: "",
      toastTimer: null,

      spotifyInterval: null,
      spotifySidebarOpen: false,
      spotifyAutoTimer: null,
      spotifyTrack: {
        isPlaying: false,
        title: "Not playing",
        artist: "Spotify",
        album: "",
        image: "",
        url: "",
        progressMs: 0,
        durationMs: 0
      },


      currentTheme: "light",
      themes: [
        { id: "light", name: "Classic Light", preview: "#f8fafc" },
        { id: "midnight", name: "Midnight Pro", preview: "#1e3a5f" },
        { id: "forest", name: "Emerald Focus", preview: "#065f46" }
      ],

      quickPages: fallbackQuickPages,
      quickPagesUnsubscribe: null,


      visitorCount: 0,
      feedbackCount: 0,

      projectsCount: 0,
      codingHoursText: "Open stats",
      reposCount: 0,

      statsLoaded: false,
      statsLoading: false,

      isAdBlockEnabled: false,
      visitorInfo: null
    };
  },

  computed: {
    t() {
      return UI_TRANSLATIONS.en;
    },

    currentThemeName() {
      const found = this.themes.find(t => t.id === this.currentTheme);
      return found ? found.name : this.currentTheme;
    },

    isAdminRoute() {
      return this.$route.path.startsWith("/admin");
    },

    isHomeRoute() {
      return this.$route.path === "/";
    },

    showFloatingTools() {
      return this.isHomeRoute && !this.isAdminRoute;
    },

    isAiToolsRoute() {
      return this.$route.path.startsWith("/tools/ai-chat");
    }
  },

  watch: {
    $route() {
      this.closeAllPanels();
      this.mobileNavOpen = false;
    }
  },

  mounted() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.setTheme(savedTheme, false);

    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("data-lang", "en");

    this.checkMobile();

    window.addEventListener("resize", this.checkMobile);
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleOutsideClick);

    if (!this.isAdminRoute) {
      trackVisit().catch((e) => {
        console.error("Track visit error:", e);
      });

      setTimeout(() => {
        this.trackVisitor();
      }, 600);
    }

    this.loadLiveStats();
    this.$nextTick(this.observeReveal);

    getSpotifyNowPlaying().then((result) => {
      this.spotifyTrack = result;
      // Peek out for 5s on first load, then tuck back in
      if (result.isPlaying) {
        this.spotifySidebarOpen = true;
        this.spotifyAutoTimer = setTimeout(() => {
          this.spotifySidebarOpen = false;
        }, 5000);
      }
    });

    this.spotifyInterval = setInterval(async () => {
      this.spotifyTrack = await getSpotifyNowPlaying();
    }, 30000);


    this.quickPagesUnsubscribe = subscribeToCollection(
      "quickPages",
      (items) => {
        if (items.length) {
          this.quickPages = items;
        }
      },
      (error) => {
        console.error("Load live quick pages error:", error);
      }
    );
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.checkMobile);
    document.removeEventListener("click", this.handleOutsideClick);

    document.body.style.overflow = "";

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    if (this.quickPagesUnsubscribe) this.quickPagesUnsubscribe();
    if (this.revealObserver) this.revealObserver.disconnect();
    if (this.spotifyInterval) clearInterval(this.spotifyInterval);
    if (this.spotifyAutoTimer) clearTimeout(this.spotifyAutoTimer);
  },

  methods: {
    async trackVisitor() {
      try {
        const isBlocked = await detectAdBlocker();

        this.isAdBlockEnabled =
          isBlocked &&
          sessionStorage.getItem("adblock_warning_closed") !== "true";

        const visitorId = getOrCreateVisitorId();

        if (hasTrackedVisitor()) {
          return;
        }

        const visitorInfo = {
          ...(await getVisitorInfo()),
          visitorId,
          adBlocker: isBlocked ? "Detected" : "Not detected"
        };

        this.visitorInfo = visitorInfo;

        await saveVisitorInfo(visitorInfo);
      } catch (error) {
        console.error("Visitor tracking error:", error);
      }
    },

    checkMobile() {
      this.isMobile = window.innerWidth <= 640;
      if (!this.isMobile) {
        this.mobileNavOpen = false;
      }
    },

    togglePanel(name) {
      if (name === "theme") {
        this.showMorePanel = false;
        this.cycleTheme();
      } else if (name === "more") {
        this.mobileNavOpen = false;
        this.showMorePanel = !this.showMorePanel;
        this.openSubmenu = null;
        if (this.showMorePanel) this.loadLiveStats();
      }
    },

    /* ===== Reveal on scroll =====
       Sections/cards fade up gently the first time they scroll into view. */
    observeReveal() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!("IntersectionObserver" in window)) return;

      if (!this.revealObserver) {
        this.revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("revealed");
              this.revealObserver.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );
      }

      const targets = document.querySelectorAll(
        ".main-content > section, .info-panel, .info-grid, .cta-card, .explore-panel, .header-footer"
      );

      targets.forEach((el) => {
        if (el.dataset.reveal) return;
        el.dataset.reveal = "1";

        // Already on screen: show right away, no animation
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) return;

        el.classList.add("reveal");
        this.revealObserver.observe(el);
      });
    },

    toggleSubmenu(name) {
      this.openSubmenu = this.openSubmenu === name ? null : name;
    },

    closeAllPanels() {
      this.showMorePanel = false;
      this.openSubmenu = null;
    },

    goHomeTop() {
      this.mobileNavOpen = false;
      this.closeAllPanels();

      if (this.$route.path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      this.$router.push("/");
    },

    handleQuickPageClick() {
      this.closeAllPanels();
      this.mobileNavOpen = false;
    },

    async loadLiveStats(forceRefresh = false) {
      if (this.statsLoading) return;
      if (this.statsLoaded && !forceRefresh) return;

      this.statsLoading = true;
      this.codingHoursText = "Loading...";

      try {
        const results = await Promise.allSettled([
          getViews(),
          getWakaTimeStats(),
          getGitHubReposCount(),
          import("@/data/projects.json")
        ]);

        const [viewsResult, wakaResult, githubResult, projectsResult] = results;

        if (viewsResult.status === "fulfilled") {
          this.visitorCount = Number(viewsResult.value) || 0;
        }

        if (wakaResult.status === "fulfilled") {
          this.codingHoursText = wakaResult.value?.hoursText || "Unavailable";
        } else {
          this.codingHoursText = "Unavailable";
        }

        if (githubResult.status === "fulfilled") {
          this.reposCount = Number(githubResult.value) || 0;
        } else {
          this.reposCount = 0;
        }

        if (projectsResult.status === "fulfilled") {
          this.projectsCount = Array.isArray(projectsResult.value.default)
            ? projectsResult.value.default.length
            : 0;
        } else {
          this.projectsCount = 0;
        }

        this.statsLoaded = true;
      } catch (e) {
        console.error("Live stats load error:", e);
        this.codingHoursText = "Unavailable";
      } finally {
        this.statsLoading = false;
      }
    },

    handleOutsideClick(e) {
      const clickedInsideNav = e.target.closest(".site-nav");
      const clickedInsideModal = e.target.closest(".modal-overlay, .feedback-overlay");

      if (clickedInsideNav || clickedInsideModal) return;

      this.closeAllPanels();
    },

    handleScroll() {
      this.navScrolled = window.scrollY > 12;
    },

    scrollToSection(id) {
      this.mobileNavOpen = false;
      this.closeAllPanels();

      if (id === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const section = document.querySelector(id);

      if (!section) {
        this.showToast("Section not found");
        return;
      }

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    },

    setTheme(themeId, save = true) {
      this.currentTheme = themeId;
      document.documentElement.setAttribute("data-theme", themeId);

      if (save) {
        localStorage.setItem("theme", themeId);
      }
    },

    cycleTheme() {
      const order = this.themes.map(t => t.id);
      const idx = order.indexOf(this.currentTheme);
      const next = order[(idx + 1) % order.length];
      this.setTheme(next);
      this.showToast(this.currentThemeName);
    },

    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;

      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }

      this.toastTimer = setTimeout(() => {
        this.toastVisible = false;
      }, 3000);
    },

    openFeedback() {
      this.closeAllPanels();

      if (this.$refs.feedbackBubble) {
        this.$refs.feedbackBubble.openFeedback();
      }
    },

    formatTime(ts) {
      if (!ts) return "";

      const date = ts.toDate ? ts.toDate() : new Date(ts);
      const diff = Date.now() - date;

      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) {
        return "Just now";
      }

      if (minutes < 60) return `${minutes}m`;
      if (hours < 24) return `${hours}h`;
      if (days < 7) return `${days}d`;

      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;600;700;800;900&display=swap");

/* ===== ROOT THEME VARIABLES ===== */
/* Classic Light: soft off-white (easier on the eyes than pure white) */
:root {
  --bg: #f3f2ee;
  --surface: #fbfaf7;
  --surface-soft: #efeee9;
  --surface-hover: #e9e8e2;
  --text: #24272c;
  --text-secondary: #5c616a;
  --text-muted: #878c94;
  --border: #e0ded7;
  --accent: #26292e;
  --accent-hover: #15171a;

  --success: #22c55e;
  --danger: #ef4444;
  --warning: #f59e0b;
  --info: #3b82f6;

  --shadow-sm: 0 1px 2px rgb(15 23 42 / 0.05);
  --shadow: 0 2px 8px rgb(15 23 42 / 0.06);
  --shadow-lg: 0 4px 16px rgb(15 23 42 / 0.08);
  --shadow-xl: 0 8px 28px rgb(15 23 42 / 0.12);

  --radius-sm: 4px;
  --radius: 6px;
  --radius-lg: 10px;
  --radius-xl: 14px;

  --container-width: 880px;
  --container-padding: 1.5rem;

  --font-heading: "Manrope", "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-body: "Plus Jakarta Sans", "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

html[data-theme="dark"],
html[data-theme="dark"] body {
  --bg: #0b0c0e;
  --surface: #121315;
  --surface-soft: #16171a;
  --surface-hover: #1c1d20;
  --text: #f1f2f3;
  --text-secondary: #9a9fa6;
  --text-muted: #6a6f76;
  --border: #26272a;
  --accent: #f1f2f3;
  --accent-hover: #ffffff;
}

html[data-theme="midnight"],
html[data-theme="midnight"] body {
  --bg: #0f172a;
  --surface: #1a2234;
  --surface-soft: #141b2c;
  --surface-hover: #212a3d;
  --text: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: #2a3448;
  --accent: #e2e8f0;
  --accent-hover: #ffffff;
}

html[data-theme="forest"],
html[data-theme="forest"] body {
  --bg: #0e1a16;
  --surface: #14241e;
  --surface-soft: #101d18;
  --surface-hover: #1a2b23;
  --text: #ecfdf5;
  --text-secondary: #9fcbb8;
  --text-muted: #6fa88e;
  --border: #22362c;
  --accent: #6ee7b7;
  --accent-hover: #34d399;
}

/* ===== GLOBAL RESET ===== */
* {
  box-sizing: border-box;
}

/* ===== SMOOTH UX ===== */
html {
  scroll-behavior: smooth;
}

/* Page change: quick fade + tiny lift */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-leave-to {
  opacity: 0;
}

/* Reveal on scroll (classes added by App.observeReveal) */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .page-enter-active,
  .page-leave-active,
  .reveal {
    transition: none;
  }
}

/* ===== LIQUID GLASS BUTTONS =====
   One place for the glass look on buttons across the site (not the admin CMS).
   "#app" outranks each component's own scoped button styles. */

/* Solid buttons (Contact Me, Start a Project, Email Me, send): keep their color, add a glass shine */
#app :is(.nav-contact-btn, .cta-btn, .footer-contact-btn, .fb-send, .send-btn.ready):not(.admin-page *) {
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.24) 0%,
    rgba(255, 255, 255, 0.06) 48%,
    rgba(255, 255, 255, 0) 52%,
    rgba(0, 0, 0, 0.06) 100%
  );
  border-color: color-mix(in srgb, #ffffff 18%, var(--accent));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1px 0 rgba(0, 0, 0, 0.18),
    0 4px 14px color-mix(in srgb, var(--accent) 22%, transparent);
}

/* Light buttons (theme, ⋯, View Services, Download CV, Explore links): frosted glass */
#app :is(.nav-icon-btn, .ghost-btn, .explore-link):not(.admin-page *) {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.08) 55%,
      rgba(255, 255, 255, 0) 100%
    ),
    color-mix(in srgb, var(--text) 5%, color-mix(in srgb, var(--surface) 70%, transparent));
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 1px color-mix(in srgb, var(--text) 6%, transparent),
    0 2px 8px color-mix(in srgb, var(--text) 8%, transparent);
  -webkit-backdrop-filter: blur(10px) saturate(160%);
  backdrop-filter: blur(10px) saturate(160%);
}

#app :is(.nav-icon-btn, .ghost-btn, .explore-link):not(.admin-page *):hover {
  border-color: color-mix(in srgb, var(--text) 22%, transparent);
}

/* Dark themes: softer shine so the glass doesn't glow */
html:is([data-theme="midnight"], [data-theme="forest"], [data-theme="dark"])
  #app :is(.nav-icon-btn, .ghost-btn, .explore-link):not(.admin-page *) {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.02) 60%,
      rgba(255, 255, 255, 0) 100%
    ),
    color-mix(in srgb, var(--surface) 70%, transparent);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 2px 10px rgba(0, 0, 0, 0.25);
}

html:is([data-theme="midnight"], [data-theme="forest"], [data-theme="dark"])
  #app :is(.nav-contact-btn, .cta-btn, .footer-contact-btn, .fb-send, .send-btn.ready):not(.admin-page *) {
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.08) 48%,
    rgba(255, 255, 255, 0) 52%,
    rgba(0, 0, 0, 0.08) 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2),
    0 4px 16px color-mix(in srgb, var(--accent) 18%, transparent);
}

/* "clip" (not "hidden") so the sticky navbar keeps working */
html,
body {
  max-width: 100%;
  overflow-x: clip;
}

body {
  margin: 0;
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

/* ===== TOP NAV — floating bar ===== */
.site-nav {
  position: sticky;
  top: 14px;
  z-index: 200;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  pointer-events: none;
}

.site-nav-inner {
  position: relative;
  pointer-events: auto;
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 18px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  background: color-mix(in srgb, var(--surface) 92%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s ease, background 0.2s ease;
}

.site-nav.scrolled .site-nav-inner {
  background: var(--surface);
  box-shadow: var(--shadow-lg);
}

.nav-brand {
  font-family: var(--font-heading);
  font-size: 1.08rem;
  font-weight: 800;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.brand-short {
  display: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  justify-content: center;
}

.nav-links a {
  position: relative;
  z-index: 0;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 500;
  padding: 7px 13px;
  border-radius: 999px;
  transition: color 0.18s ease;
}

/* Liquid-glass pill behind the link (hover + current page) */
.nav-links a::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  /* Light: faint tint + visible edge so it reads on the off-white navbar */
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, #ffffff 55%, transparent) 0%,
      color-mix(in srgb, #ffffff 0%, transparent) 60%
    ),
    color-mix(in srgb, var(--text) 9%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 14%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #ffffff 80%, transparent),
    inset 0 -1px 2px color-mix(in srgb, var(--text) 8%, transparent),
    0 2px 8px color-mix(in srgb, var(--text) 12%, transparent);
  -webkit-backdrop-filter: blur(8px) saturate(160%);
  backdrop-filter: blur(8px) saturate(160%);
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--text);
}

.nav-links a:hover::after,
.nav-links a.active::after,
.nav-links a:focus-visible::after {
  opacity: 1;
  transform: scale(1);
}

/* Dark themes: dimmer highlight so the glass doesn't glow */
html[data-theme="midnight"] .nav-links a::after,
html[data-theme="forest"] .nav-links a::after,
html[data-theme="dark"] .nav-links a::after {
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, #ffffff 14%, transparent) 0%,
      color-mix(in srgb, #ffffff 3%, transparent) 60%,
      transparent 100%
    ),
    color-mix(in srgb, var(--surface) 60%, transparent);
  border-color: color-mix(in srgb, #ffffff 16%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #ffffff 22%, transparent),
    0 2px 10px rgba(0, 0, 0, 0.25);
}

.nav-mobile-extra {
  display: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-icon-btn,
.nav-contact-btn {
  font-family: inherit;
  cursor: pointer;
}

.nav-icon-btn {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  color: var(--text-secondary);
  transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
}

.nav-icon-btn:hover {
  color: var(--text);
  border-color: var(--text-muted);
  background: var(--surface);
  transform: translateY(-1px);
}

.nav-icon-btn:focus-visible,
.nav-contact-btn:focus-visible,
.nav-links a:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 2px;
}

.nav-icon-btn svg {
  width: 16px;
  height: 16px;
}

.nav-contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0 18px;
  height: 34px;
  border: 1px solid var(--accent);
  border-radius: var(--radius);
  background: var(--accent);
  color: var(--bg);
  font-size: 0.84rem;
  font-weight: 600;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.nav-contact-btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.nav-menu-wrap {
  position: relative;
}

.nav-dropdown {
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  min-width: 220px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 210;
}

/* Anchored to the navbar card (not the button) so it lines up with the page cards below */
.nav-actions .nav-menu-wrap {
  position: static;
}

.more-dropdown {
  top: calc(100% + 8px);
  right: 0;
  min-width: 260px;
  max-height: min(70vh, 520px);
  overflow-y: auto;
  scrollbar-width: none;
}

.more-dropdown::-webkit-scrollbar {
  display: none;
}

.dropdown-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 6px;
  margin-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

.dropdown-group:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.dropdown-row.mobile-only {
  display: none;
}

@media (max-width: 860px) {
  .dropdown-row.mobile-only {
    display: flex;
  }
}

.dropdown-row-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.beta-badge {
  padding: 1px 6px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.dropdown-arrow {
  margin-left: auto;
  font-size: 0.65rem;
  color: var(--text-muted);
}

.dropdown-label {
  display: block;
  padding: 6px 10px 4px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.dropdown-sublabel {
  display: block;
  padding: 6px 10px 2px;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.75;
}

.stat-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  font-size: 0.84rem;
  color: var(--text-secondary);
}

.stat-line strong {
  color: var(--text);
  font-weight: 600;
}

.dropdown-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--text);
  font-family: inherit;
  font-size: 0.86rem;
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  width: 100%;
}

.dropdown-row:hover {
  background: var(--surface-hover);
}

.dropdown-row.active {
  background: var(--surface-hover);
  font-weight: 600;
}

.dropdown-row small {
  color: var(--text-muted);
  font-size: 0.72rem;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.dropdown-toggle:hover {
  background: var(--surface-hover);
}

.dropdown-toggle small {
  margin-left: auto;
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 600;
}

.dropdown-toggle .chev {
  width: 14px;
  height: 14px;
  color: var(--text-muted);
  transition: transform 0.18s ease;
  flex-shrink: 0;
}

.dropdown-toggle .chev.open {
  transform: rotate(180deg);
}

.submenu {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  padding-left: 6px;
  border-left: 2px solid var(--border);
  margin-left: 10px;
}

.theme-swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.theme-dropdown .dropdown-row {
  gap: 10px;
}

.nav-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 34px;
  height: 34px;
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease;
}

.nav-hamburger:hover {
  border-color: var(--text-muted);
  background: var(--surface);
}

.nav-hamburger span {
  width: 16px;
  height: 2px;
  margin: 0 auto;
  background: var(--text);
  display: block;
}

.nav-text-btn {
  width: 100%;
  text-align: left;
  padding: 10px 0;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

@media (max-width: 860px) {
  .site-nav {
    top: 12px;
    padding: 0 12px;
  }

  .site-nav-inner {
    height: 56px;
    padding: 0 10px 0 18px;
    justify-content: space-between;
  }

  .brand-full {
    display: none;
  }

  .brand-short {
    display: inline;
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 2px;
    padding: 10px;
    background: color-mix(in srgb, var(--surface) 92%, transparent);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
    border-radius: 20px;
    box-shadow: 0 10px 36px rgba(15, 23, 42, 0.14);
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
    z-index: 199;
  }

  .nav-links.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .nav-links a {
    width: 100%;
    padding: 12px 10px;
    border-radius: var(--radius);
    font-size: 0.95rem;
  }

  .nav-links a::after {
    display: none;
  }

  .nav-links a:hover {
    background: var(--surface-hover);
  }

  .nav-mobile-extra {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 4px;
    padding-top: 6px;
    border-top: 1px solid var(--border);
  }

  .nav-text-btn {
    padding: 12px 10px;
    border-radius: var(--radius);
  }

  .nav-text-btn:hover {
    background: var(--surface-hover);
  }

  /* Theme icon stays visible; "More" opens the same dropdown from the mobile menu */
  .more-btn {
    display: none;
  }

  .more-dropdown {
    left: 0;
    right: 0;
    min-width: 0;
  }

  /* Mobile order: theme, menu, then Contact Me */
  .nav-contact-btn {
    order: 2;
    padding: 0 12px;
    font-size: 0.8rem;
  }

  .nav-hamburger {
    order: 1;
  }

  .nav-hamburger {
    display: flex;
  }
}

/* ===== TOOL PAGES: a little side breathing room on phones =====
   (#app beats each tool's scoped .tool-page padding) */
@media (max-width: 640px) {
  #app .tool-page {
    padding-left: 26px;
    padding-right: 26px;
  }
}

/* ===== SPOTIFY SIDEBAR BUBBLE =====
   Level with the navbar, tucked into the left edge showing only the album art;
   slides out on hover (tap on mobile). */
.spotify-sidebar {
  position: fixed;
  top: 14px;
  left: 0;
  height: 56px;
  transform: translateX(calc(-100% + 52px));
  z-index: 150;
  width: 200px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: none;
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.spotify-sidebar--open {
  transform: translateX(0);
}

.spotify-sidebar-inner {
  display: flex;
  align-items: center;
  width: 100%;
}

.spotify-sidebar-art {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  margin: 6px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: var(--radius);
  background: #1db954;
  color: #fff;
  font-size: 1.2rem;
}

.spotify-sidebar-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.spotify-sidebar-info {
  flex: 1;
  min-width: 0;
  padding: 8px 6px 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow: hidden;
}

.spotify-float-now-label {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1db954;
}

.spotify-sidebar-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.spotify-sidebar-artist {
  font-size: 0.7rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-float-fade-enter-active,
.spotify-float-fade-leave-active {
  transition: opacity 0.3s ease;
}

.spotify-float-fade-enter-from,
.spotify-float-fade-leave-to {
  opacity: 0;
}

/* On phones: tucked into the bottom-left corner so it never covers page content */
@media (max-width: 860px) {
  .spotify-sidebar {
    top: auto;
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));
    height: auto;
    width: 200px;
    transform: translateX(calc(-100% + 46px));
  }

  .spotify-sidebar--open {
    transform: translateX(0);
  }

  .spotify-sidebar-art {
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
  }

  .spotify-sidebar-title {
    font-size: 0.78rem;
  }

  .spotify-sidebar-artist {
    font-size: 0.65rem;
  }
}

/* ===== TOAST ===== */
.toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  z-index: 220;
  transform: translateX(-50%);
  min-width: 200px;
  max-width: calc(100vw - 32px);
  padding: 10px 16px;
  border-radius: var(--radius);
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  font-size: 0.86rem;
  text-align: center;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}
</style>
