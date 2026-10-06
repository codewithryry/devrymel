<template>
  <div>
    <!-- ===== TOP NAVIGATION (shown on all pages except admin) ===== -->
    <header v-if="!isAdminRoute" class="site-nav" :class="{ scrolled: navScrolled }">
      <div class="site-nav-inner">
        <a href="/" class="nav-brand" @click.prevent="goHomeTop">
          <span class="brand-short" aria-hidden="true">RM</span>
          <span class="brand-full">Reymel Mislang</span>
          <span class="brand-mobile-label">Portfolio</span>
        </a>

        <nav class="nav-links" :class="{ open: mobileNavOpen }">
          <router-link to="/about" @click="handleQuickPageClick" :class="{ active: $route.path === '/about' }">About</router-link>
          <router-link to="/projects" @click="handleQuickPageClick" :class="{ active: $route.path === '/projects' }">Projects</router-link>
          <router-link to="/skills" @click="handleQuickPageClick" :class="{ active: $route.path === '/skills' }">Skills</router-link>
          <router-link to="/experience" @click="handleQuickPageClick" :class="{ active: $route.path === '/experience' }">Experience</router-link>
          <router-link to="/services" @click="handleQuickPageClick" :class="{ active: $route.path === '/services' }">Services</router-link>

          <!-- Phones: theme, More and Contact Me live inside the menu -->
          <div class="nav-mobile-extra">
            <button class="nav-text-btn nav-text-row" @click.stop="cycleTheme">
              <span>Theme</span>
              <small>{{ currentThemeName }}</small>
            </button>
            <button class="nav-text-btn nav-text-row" @click.stop="togglePanel('more')">
              <span>More</span>
              <i class="fas fa-chevron-right"></i>
            </button>
            <router-link to="/contact" class="mobile-contact-btn cta-btn" @click="handleQuickPageClick">
              Contact Me
            </router-link>
          </div>
        </nav>

        <div class="nav-actions">
          <div class="nav-menu-wrap theme-wrap">
            <button class="nav-icon-btn" @click="cycleTheme" :title="'Theme: ' + currentThemeName" :aria-label="'Switch theme, current: ' + currentThemeName">
              <svg v-if="currentTheme === 'froth'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2.7c3.6 4.1 6 7.4 6 10.3a6 6 0 0 1-12 0c0-2.9 2.4-6.2 6-10.3z" />
              </svg>
              <svg v-else-if="currentTheme === 'midnight'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

          <button class="nav-hamburger" :class="{ open: mobileNavOpen }" @click.stop="mobileNavOpen = !mobileNavOpen; showMorePanel = false" :aria-expanded="mobileNavOpen" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- ===== MOBILE BOTTOM NAVIGATION (phones only) ===== -->
    <nav v-if="!isAdminRoute" class="bottom-nav" aria-label="Main">
      <div class="bottom-pill">
      <router-link to="/" class="bottom-tab" :class="{ active: $route.path === '/' && !mobileSheetOpen }" @click="mobileSheetOpen = false">
        <span class="bottom-brand">RM</span>
        <span class="bottom-label">Home</span>
      </router-link>
      <router-link to="/about" class="bottom-tab" :class="{ active: $route.path === '/about' && !mobileSheetOpen }" @click="mobileSheetOpen = false">
        <i class="fas fa-user"></i>
        <span class="bottom-label">About</span>
      </router-link>
      <router-link to="/projects" class="bottom-tab" :class="{ active: $route.path === '/projects' && !mobileSheetOpen }" @click="mobileSheetOpen = false">
        <i class="fas fa-folder-open"></i>
        <span class="bottom-label">Projects</span>
      </router-link>
      <router-link to="/contact" class="bottom-tab" :class="{ active: $route.path === '/contact' && !mobileSheetOpen }" @click="mobileSheetOpen = false">
        <i class="fas fa-envelope"></i>
        <span class="bottom-label">Contact</span>
      </router-link>
      </div>

      <!-- Menu: its own round glass button (like the iOS 26 search button) -->
      <button
        type="button"
        class="bottom-circle"
        :class="{ active: mobileSheetOpen }"
        :aria-label="mobileSheetOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="mobileSheetOpen"
        @click="mobileSheetOpen = !mobileSheetOpen"
      >
        <i class="fas" :class="mobileSheetOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </nav>

    <!-- Tile edit mode bar (mobile homepage): resize tiles, then Done -->
    <transition name="sheet">
      <div v-if="tileEditMode" class="tile-edit-bar" role="toolbar" aria-label="Edit tiles">
        <span class="tile-edit-hint"><i class="fas fa-expand-alt"></i> Resize with the handle · tap two to swap</span>
        <button type="button" class="tile-edit-btn" @click="resetTiles">Reset</button>
        <button type="button" class="tile-edit-btn primary" @click="tileEditMode = false">Done</button>
      </div>
    </transition>

    <!-- Follow-to-save popup (visitors, first time they save a tile layout) -->
    <transition name="sheet">
      <div v-if="followGateOpen" class="follow-gate-overlay" @click.self="closeFollowGate(false)">
        <div class="follow-gate" role="dialog" aria-label="Follow to save your layout">
          <h3>Save your layout</h3>
          <p>Follow me on TikTok or Instagram to save your tile layout on this device.</p>

          <a
            href="https://www.tiktok.com/@devrymel"
            target="_blank"
            rel="noopener noreferrer"
            class="follow-btn"
            @click="closeFollowGate(true)"
          >
            <i class="fab fa-tiktok"></i> Follow @devrymel on TikTok
          </a>
          <a
            href="https://www.instagram.com/iamrymel/"
            target="_blank"
            rel="noopener noreferrer"
            class="follow-btn"
            @click="closeFollowGate(true)"
          >
            <i class="fab fa-instagram"></i> Follow on Instagram
          </a>

          <button type="button" class="follow-skip" @click="closeFollowGate(false)">Not now</button>
        </div>
      </div>
    </transition>

    <!-- Bottom sheet opened by "Menu" -->
    <transition name="sheet">
      <div v-if="mobileSheetOpen && !isAdminRoute" class="bottom-sheet-overlay" @click.self="mobileSheetOpen = false">
        <div class="bottom-sheet" role="dialog" aria-label="Menu">
          <span class="sheet-handle" aria-hidden="true"></span>

          <span class="sheet-label">Other Pages</span>
          <router-link
            v-for="page in (showAllSheetPages ? mobilePages : mobilePages.slice(0, 3))"
            :key="page.path"
            :to="page.path"
            class="sheet-row"
            @click="mobileSheetOpen = false"
          >
            <i :class="page.icon"></i><span>{{ page.title }}</span>
          </router-link>
          <button type="button" class="sheet-row sheet-more" @click="showAllSheetPages = !showAllSheetPages">
            <i class="fas" :class="showAllSheetPages ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            <span>{{ showAllSheetPages ? 'See less' : `See more (${mobilePages.length - 3})` }}</span>
          </button>

          <span class="sheet-label">Tools</span>
          <router-link
            v-for="tool in (showAllSheetTools ? mobileTools : mobileTools.slice(0, 2))"
            :key="tool.path"
            :to="tool.path"
            class="sheet-row"
            @click="mobileSheetOpen = false"
          >
            <i :class="tool.icon"></i><span>{{ tool.title }}</span>
          </router-link>
          <button type="button" class="sheet-row sheet-more" @click="showAllSheetTools = !showAllSheetTools">
            <i class="fas" :class="showAllSheetTools ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            <span>{{ showAllSheetTools ? 'See less' : `See more (${mobileTools.length - 2})` }}</span>
          </button>

          <span class="sheet-label">Documents</span>
          <a href="/Reymel_Mislang_Resume.docx" download class="sheet-row">
            <i class="fas fa-file-alt"></i><span>Resume</span><i class="fas fa-download sheet-end"></i>
          </a>
          <a href="/Reymel_Mislang_CV.docx" download class="sheet-row">
            <i class="fas fa-id-card"></i><span>CV</span><i class="fas fa-download sheet-end"></i>
          </a>

          <span class="sheet-label">Other</span>
          <router-link to="/tools/ai-chat" class="sheet-row" @click="mobileSheetOpen = false">
            <i class="fas fa-robot"></i><span>Assistant</span><span class="beta-badge">Beta</span>
          </router-link>
          <router-link to="/changelog" class="sheet-row" @click="mobileSheetOpen = false">
            <i class="fas fa-history"></i><span>Changelog</span>
          </router-link>
          <router-link to="/privacy" class="sheet-row" @click="mobileSheetOpen = false">
            <i class="fas fa-shield-alt"></i><span>Privacy</span>
          </router-link>
        </div>
      </div>
    </transition>

    <!-- ===== SPOTIFY SIDEBAR BUBBLE ===== -->
    <transition name="spotify-float-fade">
      <div
        v-if="spotifyTrack.isPlaying && !isAiToolsRoute && !isAdminRoute"
        class="spotify-sidebar"
        :class="{ 'spotify-sidebar--open': spotifySidebarOpen, 'on-home': $route.path === '/' }"
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

// Same admin account the admin panel and Firestore rules use
const ADMIN_UID = "pAwCyoApURZu9aVk4k8tKRHzk7K2";

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
      mobileSheetOpen: false,
      tileEditMode: false,
      followGateOpen: false,
      isSiteAdmin: false,
      showAllSheetTools: false,
      showAllSheetPages: false,

      // Mobile Menu "Other Pages", most important first (first 3 shown)
      mobilePages: [
        { path: "/skills", title: "Skills", icon: "fas fa-bolt" },
        { path: "/experience", title: "Experience", icon: "fas fa-briefcase" },
        { path: "/services", title: "Services", icon: "fas fa-layer-group" },
        { path: "/case-studies", title: "Case Studies", icon: "fas fa-search" },
        { path: "/why-me", title: "Why Work With Me", icon: "fas fa-thumbs-up" },
        { path: "/tech-notes", title: "Tech Notes", icon: "fas fa-book-open" },
        { path: "/deployment", title: "Deployment", icon: "fas fa-rocket" },
        { path: "/uses", title: "Uses", icon: "fas fa-laptop" },
        { path: "/roadmap", title: "Roadmap", icon: "fas fa-map" }
      ],

      // Finished tools listed in the mobile Menu sheet
      mobileTools: [
        { path: "/tools/tiktok", title: "TikTok Downloader", icon: "fab fa-tiktok" },
        { path: "/tools/youtube-downloader", title: "YT Downloader", icon: "fab fa-youtube" },
        { path: "/tools/youtube-thumbnail", title: "YT Thumbnail", icon: "fas fa-image" },
        { path: "/tools/qr-generator", title: "QR Generator", icon: "fas fa-qrcode" },
        { path: "/tools/password", title: "Password Generator", icon: "fas fa-key" },
        { path: "/tools/color-palette", title: "Color Palette", icon: "fas fa-palette" },
        { path: "/tools/ip-lookup", title: "IP Lookup", icon: "fas fa-map-marker-alt" },
        { path: "/tools/speedtest", title: "Speed Test", icon: "fas fa-tachometer-alt" },
        { path: "/tools/url-shortener", title: "URL Shortener", icon: "fas fa-link" },
        { path: "/tools/base64", title: "Base64 Tool", icon: "fas fa-code" }
      ],

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
        { id: "forest", name: "Emerald Focus", preview: "#065f46" },
        { id: "froth", name: "Froth Modern", preview: "#4f46e5" }
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
      this.tileEditMode = false;
      this.mobileSheetOpen = false;
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

    // Only the signed-in admin can rearrange the shared homepage tiles
    this.authUnsubscribe = onAuthStateChanged(auth, (user) => {
      this.isSiteAdmin = !!user && user.uid === ADMIN_UID;
      if (!this.isSiteAdmin) this.tileEditMode = false;
    });
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
    if (this.authUnsubscribe) this.authUnsubscribe();
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

    // Follow popup answered: tile grids save (followed) or discard their changes
    closeFollowGate(followed) {
      this.followGateOpen = false;
      window.dispatchEvent(new CustomEvent("tiles-follow-result", { detail: followed ? "followed" : "skipped" }));
    },

    // Reset every resizable tile grid to its default sizes
    resetTiles() {
      window.dispatchEvent(new Event("tiles-reset"));
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

/* Froth Modern: clean light theme — cool off-white, white cards, slate text, indigo accent.
   Solid colors only (no gradients). */
html[data-theme="froth"],
html[data-theme="froth"] body {
  --bg: #f5f6fa;
  --surface: #ffffff;
  --surface-soft: #f0f2f8;
  --surface-hover: #e9ecf5;
  --text: #1a2133;
  --text-secondary: #4a5468;
  --text-muted: #8590a6;
  --border: #e2e6ef;
  --accent: #4f46e5;
  --accent-hover: #4338ca;

  --shadow-sm: 0 1px 2px rgb(26 33 51 / 0.05);
  --shadow: 0 2px 8px rgb(26 33 51 / 0.06);
  --shadow-lg: 0 6px 18px rgb(26 33 51 / 0.08);
  --shadow-xl: 0 12px 32px rgb(26 33 51 / 0.12);
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

/* ===== MOBILE BOTTOM NAV + SHEET ===== */
.bottom-nav,
.bottom-sheet-overlay {
  display: none;
}

@media (max-width: 860px) {
  /* Top bar is replaced by the bottom nav on phones */
  .site-nav {
    display: none !important;
  }

  body {
    /* nav sits 36px up + 62px tall: keep ~24px clear space above it */
    padding-bottom: calc(122px + env(safe-area-inset-bottom, 0px));
  }

  .bottom-nav {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: calc(36px + env(safe-area-inset-bottom, 0px));
    z-index: 300;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 62px;
    padding: 0;
    border: none;
    background: none;
    box-shadow: none;
  }

  /* Tabs pill */
  .bottom-pill {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    height: 100%;
    padding: 0 6px;
    border-radius: 999px;
  }

  /* Menu circle */
  .bottom-circle {
    flex: 0 0 62px;
    display: grid;
    place-items: center;
    width: 62px;
    height: 62px;
    padding: 0;
    border-radius: 50%;
    color: var(--text);
    font-size: 1.1rem;
    cursor: pointer;
  }

  .bottom-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 50px;
    border: none;
    border-radius: 14px;
    background: transparent;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.64rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .bottom-tab i {
    font-size: 1rem;
  }

  .bottom-tab.active {
    color: var(--text);
    background: var(--surface-hover);
  }

  .bottom-brand {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: var(--text-muted);
    color: var(--bg);
    font-size: 0.55rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .bottom-tab.active .bottom-brand {
    background: var(--accent);
  }

  .bottom-sheet-overlay {
    position: fixed;
    inset: 0;
    z-index: 290;
    display: flex;
    align-items: flex-end;
    background: rgba(0, 0, 0, 0.35);
  }

  .bottom-sheet {
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    padding: 10px 16px calc(96px + env(safe-area-inset-bottom, 0px));
    border-radius: 22px 22px 0 0;
    background: var(--surface);
    border-top: 1px solid var(--border);
    box-shadow: var(--shadow-xl);
  }

  .sheet-handle {
    display: block;
    width: 38px;
    height: 4px;
    margin: 0 auto 10px;
    border-radius: 99px;
    background: var(--border);
  }

  .sheet-label {
    display: block;
    margin: 12px 4px 4px;
    color: var(--text-muted);
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .sheet-row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 11px 10px;
    border: none;
    border-radius: var(--radius-lg);
    background: transparent;
    color: var(--text);
    font-family: inherit;
    font-size: 0.92rem;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
  }

  .sheet-row:active,
  .sheet-row:hover {
    background: var(--surface-hover);
  }

  .sheet-row > i:first-child {
    width: 18px;
    color: var(--text-muted);
    text-align: center;
  }

  .sheet-more {
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .sheet-end {
    margin-left: auto;
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .sheet-contact {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 14px;
    padding: 13px;
    border-radius: var(--radius-lg);
    background-color: var(--accent);
    color: var(--bg);
    font-weight: 600;
    text-decoration: none;
  }

  .sheet-enter-active,
  .sheet-leave-active {
    transition: opacity 0.2s ease;
  }

  .sheet-enter-active .bottom-sheet,
  .sheet-leave-active .bottom-sheet {
    transition: transform 0.25s ease;
  }

  .sheet-enter-from,
  .sheet-leave-to {
    opacity: 0;
  }

  .sheet-enter-from .bottom-sheet,
  .sheet-leave-to .bottom-sheet {
    transform: translateY(40px);
  }
}

/* ===== MOBILE PANELS =====
   On phones every card across the site uses the same flat, rounded card. "#app" outranks scoped styles. */
@media (max-width: 768px) {
  #app :is(
    .project-card,
    .stat-card,
    .service-card,
    .mobile-service-card,
    .highlight-card,
    .mobile-note-card,
    .mobile-link-card,
    .social-card,
    .info-card,
    .info-panel,
    .cta-card,
    .timeline-card,
    .experience-card,
    .tt-card,
    .tt-input-card,
    .how-to-use
  ):not(.admin-page *) {
    /* White card on the grey page, like the mobile homepage sheet */
    border: 1px solid transparent;
    border-radius: 22px;
    background: var(--surface);
    box-shadow: 0 1px 2px rgb(15 23 42 / 0.04), 0 6px 18px rgb(15 23 42 / 0.05);
  }

  /* One plain page color everywhere (white in Light), so the end of every page
     — including the strip behind the bottom nav — is the same color */
  #app :is(.info-page, .tool-page):not(.admin-page *) {
    background: var(--surface);
  }

  body {
    background: var(--surface);
  }
}

/* Quick Links tiles match the profile tiles inside the one homepage card (faint tint, no border) */
@media (max-width: 768px) {
  html #app .mobile-links-scroll .mobile-link-card {
    border-color: transparent;
    background: var(--surface-soft);
    box-shadow: none;
  }
}

/* ===== MOBILE POPUPS: one fixed size for every modal =====
   Bottom-anchored, full width minus a 10px margin each side, all corners rounded.
   Never wider than the screen, never narrower than this. */
@media (max-width: 768px) {
  #app :is(.modal-overlay, .mobile-modal-overlay, .feedback-overlay):not(.admin-page *) {
    align-items: flex-end;
    justify-content: center;
    padding: 0 10px calc(10px + env(safe-area-inset-bottom, 0px));
  }

  #app :is(.modal, .modal-container, .mobile-modal, .feedback-box):not(.admin-page *) {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    max-width: none;
    /* One size for every popup (same as Certifications / Dean's List / Project Links) */
    height: var(--profile-modal-mobile-height, min(68vh, 520px));
    max-height: none;
    margin: 0;
    border: 1px solid var(--border);
    border-radius: 22px;
    overflow-y: auto;
  }

  #app .feedback-box:not(.admin-page *) {
    overflow: hidden;
  }

  /* Compact list rows in Project Links, Dean's List and Certifications */
  #app :is(.mobile-link-list, .mobile-deans-list, .cert-list) {
    gap: 0.45rem;
  }

  #app :is(.mobile-link-item, .mobile-deans-item, .cert-item) {
    gap: 0.7rem;
    padding: 0.6rem 0.75rem;
    border-radius: 14px;
    font-size: 0.85rem;
  }

  #app :is(.mobile-link-icon, .mobile-deans-icon, .cert-icon) {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 9px;
    font-size: 0.9rem;
  }

  #app :is(.mobile-link-item, .mobile-deans-item, .cert-item) .arrow-icon {
    font-size: 0.7rem;
  }

  /* ONE header layout for Certifications, Dean's List and Project Links popups:
     same padding, title row + divider, short description, close button */
  #app :is(.mobile-modal, .cert-viewer-modal) {
    padding: 1.25rem 1.1rem 1.1rem;
  }

  #app :is(.mobile-modal-header, .cert-viewer-modal .viewer-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 34px;
    margin: 0 0 0.85rem;
    padding: 0 0 0.75rem;
    border-bottom: 1px solid var(--border);
  }

  #app .cert-viewer-modal .viewer-header {
    padding-right: 2.75rem; /* room for the absolutely positioned close button */
  }

  #app :is(.mobile-modal-title, .cert-viewer-modal .viewer-title) {
    margin: 0;
    color: var(--text);
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.2;
  }

  #app :is(.mobile-modal-desc, .cert-viewer-modal .viewer-description) {
    margin: 0 0 1rem;
    color: var(--text-secondary);
    font-size: 0.85rem;
    line-height: 1.5;
  }

  #app :is(.mobile-modal-close, .cert-viewer-modal .modal-close) {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
  }

  #app .cert-viewer-modal .modal-close {
    top: 1.25rem;
    right: 1.1rem;
  }

  /* Certificate rows use the exact Project Links row size: icon + one line + chevron */
  #app :is(.mobile-link-item, .mobile-deans-item, .cert-item) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 54px;
    padding: 0.75rem 0.9rem;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface-soft);
  }

  #app :is(.mobile-link-list, .mobile-deans-list, .cert-list) {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    max-height: none; /* the popup scrolls, not the list (a capped list squeezed the rows) */
    overflow: visible;
  }

  /* Rows never shrink to fit; keep the full row size */
  #app :is(.mobile-link-item, .mobile-deans-item, .cert-item) {
    flex-shrink: 0;
  }

  #app .cert-item .cert-category {
    display: none;
  }

  #app .cert-item .cert-info h4 {
    margin: 0;
    overflow: hidden;
    color: var(--text);
    font-size: 0.95rem;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #app .cert-item .cert-info {
    min-width: 0;
    flex: 1;
  }

  /* Dean's List cards: one line (semester + GWA), same size as the other popups' cards */
  #app .mobile-deans-item .mobile-deans-info {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  #app .mobile-deans-item .mobile-deans-info h4 {
    margin: 0;
    overflow: hidden;
    color: var(--text);
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #app .mobile-deans-item .deans-details {
    display: flex;
    flex-shrink: 0;
    margin: 0;
  }

  #app .mobile-deans-item .year-level {
    display: none;
  }

  #app .mobile-deans-item .gwa-badge {
    padding: 0;
    border: none;
    background: none;
    color: var(--text-muted);
    font-size: 0.75rem;
    font-weight: 600;
  }

  #app .mobile-deans-item .gwa-badge i {
    display: none;
  }

  /* Project Links names: same as certificate names (no default heading margins,
     which made these cards taller than the other popups' cards) */
  #app .mobile-link-item .mobile-link-info h4 {
    margin: 0;
    overflow: hidden;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* No visible scrollbar inside popups (still scrolls by swiping) */
  #app :is(.modal, .modal-container, .mobile-modal, .cert-list, .mobile-link-list, .mobile-deans-list, .feedback-box .fb-messages) {
    scrollbar-width: none;
  }

  #app :is(.modal, .modal-container, .mobile-modal, .cert-list, .mobile-link-list, .mobile-deans-list, .fb-messages)::-webkit-scrollbar {
    display: none;
  }

  #app :is(.cert-list, .mobile-link-list, .mobile-deans-list) {
    padding-right: 0;
  }

  /* Let the list use the popup's height instead of a separate 50vh cap */
  #app :is(.mobile-link-list, .mobile-deans-list) {
    max-height: none;
  }
}

/* Classic Light: tiles on the white mobile homepage card are white with a
   thin outline (grey fills looked muddy on white) */
@media (max-width: 768px) {
  html:not([data-theme="midnight"]):not([data-theme="forest"]):not([data-theme="dark"])
    #app :is(.m-tile, .mobile-links-scroll .mobile-link-card) {
    border: 1px solid var(--border);
    background: var(--surface);
    box-shadow: 0 1px 2px rgb(15 23 42 / 0.03);
  }
}

/* Phones: small corner detail on every homepage tile — identical spot and size
   on all tiles so they line up (open / download / switch / Spotify) */
@media (max-width: 768px) {
  #app .m-tile-corner,
  #app .mobile-links-scroll .mobile-link-card::after {
    position: absolute;
    top: 12px;
    right: 12px;
    display: block;
    width: 14px;
    height: 14px;
    line-height: 14px;
    margin: 0;
    color: var(--text-muted);
    font-size: 0.68rem;
    text-align: center;
    opacity: 0.8;
  }

  /* Coffee (2nd tile when Spotify is shown): icon top-left, not centered */
  #app .mobile-links-scroll.with-spotify .mobile-link-card:nth-child(2) .mobile-icon {
    align-self: flex-start;
    margin: 0 0 auto;
  }
}

/* ===== FROTH MODERN: solid, modern accents (no gradients, no glass) ===== */

/* Solid buttons: flat indigo, white text, no glass shine */
html[data-theme="froth"] #app :is(.nav-contact-btn, .cta-btn, .footer-contact-btn, .fb-send, .send-btn.ready, .mobile-contact-btn, .primary-btn, .google-btn) {
  background-image: none;
  background-color: var(--accent);
  border-color: var(--accent);
  color: #ffffff;
  box-shadow: 0 2px 8px rgb(79 70 229 / 0.22);
}

html[data-theme="froth"] #app :is(.nav-contact-btn, .cta-btn, .footer-contact-btn, .primary-btn):hover {
  background-color: var(--accent-hover);
  opacity: 1;
}

/* Light buttons: solid white with a clean border, indigo on hover */
html[data-theme="froth"] #app :is(.nav-icon-btn, .ghost-btn, .explore-link) {
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}

html[data-theme="froth"] #app :is(.nav-icon-btn, .ghost-btn, .explore-link):hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Nav links: solid indigo-tint pill instead of glass */
html[data-theme="froth"] .nav-links a::after {
  background: rgb(79 70 229 / 0.1);
  border: none;
  box-shadow: none;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}

html[data-theme="froth"] .nav-links a:hover,
html[data-theme="froth"] .nav-links a.active {
  color: var(--accent);
}

/* Section labels and kickers pick up the accent */
html[data-theme="froth"] :is(.eyebrow, .section-kicker, .m-tiles-label, .sheet-label, .dropdown-label) {
  color: var(--accent);
}

/* Brand badge + footer CTA panel in indigo */
html[data-theme="froth"] :is(.brand-short, .bottom-tab.active .bottom-brand) {
  background: var(--accent);
  color: #ffffff;
}

/* Phones: the CTA card is indigo, so its title/subtitle are white and
   "Hire Me" flips to a white button with indigo text */
@media (max-width: 768px) {
  html[data-theme="froth"] .header-footer .footer-name {
    color: #ffffff;
  }

  html[data-theme="froth"] .header-footer .footer-subtitle {
    color: rgb(255 255 255 / 0.82);
  }

  html[data-theme="froth"] #app .header-footer .footer-contact-btn {
    background-color: #ffffff;
    border-color: #ffffff;
    color: var(--accent);
    box-shadow: none;
  }
}

/* Bottom nav: active tab in indigo */
html[data-theme="froth"] :is(.bottom-tab.active, .bottom-circle.active) {
  color: var(--accent);
  background: rgb(79 70 229 / 0.1);
}

/* Tool header icons: one solid accent instead of per-tool gradients */
html[data-theme="froth"] #app :is(.tt-icon-wrap, .st-icon-wrap) {
  background: var(--accent) !important;
  box-shadow: none;
}

/* Inputs: indigo focus ring */
html[data-theme="froth"] #app :is(input, textarea, select):focus {
  border-color: var(--accent);
  outline: none;
}

/* Links in body copy */
html[data-theme="froth"] #app :is(.info-panel, .info-card, .timeline-item) a:not([class]) {
  color: var(--accent);
}

/* ===== FROTH MODERN: colorful icon chips (solid tints, no gradients) ===== */
html[data-theme="froth"] {
  --chip-1-bg: #eef0ff; --chip-1: #4f46e5;  /* indigo  */
  --chip-2-bg: #e7f4fc; --chip-2: #0284c7;  /* sky     */
  --chip-3-bg: #e6f6ef; --chip-3: #059669;  /* emerald */
  --chip-4-bg: #fdf3e2; --chip-4: #d97706;  /* amber   */
  --chip-5-bg: #fdecef; --chip-5: #e11d48;  /* rose    */
}

/* Shared chip shape */
html[data-theme="froth"] #app :is(
  .m-tile .m-tile-icon,
  .mobile-links-scroll .mobile-link-card .mobile-icon,
  .spotify-tile.idle .spotify-tile-art,
  .contact-icon,
  .icon-box
) {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  font-size: 1.05rem;
  background: var(--chip-1-bg);
  color: var(--chip-1);
}

/* Homepage tiles: each tile carries its own chip color (chip-1 … chip-5) */
html[data-theme="froth"] #app .m-tile.chip-1 .m-tile-icon { background: var(--chip-1-bg); color: var(--chip-1); }
html[data-theme="froth"] #app .m-tile.chip-2 .m-tile-icon { background: var(--chip-2-bg); color: var(--chip-2); }
html[data-theme="froth"] #app .m-tile.chip-3 .m-tile-icon { background: var(--chip-3-bg); color: var(--chip-3); }
html[data-theme="froth"] #app .m-tile.chip-4 .m-tile-icon { background: var(--chip-4-bg); color: var(--chip-4); }
html[data-theme="froth"] #app .m-tile.chip-5 .m-tile-icon { background: var(--chip-5-bg); color: var(--chip-5); }

/* Small icons pick up the accent */
html[data-theme="froth"] #app :is(.m-meta i, .m-badges .inline-badge i, .sheet-row > i:first-child, .contact-arrow, .view-all-icon) {
  color: var(--accent);
}

html[data-theme="froth"] #app .m-badges .inline-badge {
  color: var(--text);
}

/* Bottom nav: inactive icons slate, active indigo */
html[data-theme="froth"] #app .bottom-tab {
  color: var(--text-muted);
}

/* Profile photo: soft indigo ring */
html[data-theme="froth"] #app :is(.m-photo .profile-image, .profile-frame .profile-image) {
  box-shadow: 0 0 0 4px #eef0ff, var(--shadow);
}

/* Phones: Awards / Certs / Links bar matches the tiles below it */
@media (max-width: 768px) {
  #app .m-badges {
    border-radius: 16px;
  }

  #app .m-badges .inline-badge {
    border-radius: 12px;
  }

  /* Light themes (Classic Light, Froth): white with a thin outline, like the tiles */
  html:not([data-theme="midnight"]):not([data-theme="forest"]):not([data-theme="dark"]) #app .m-badges {
    border: 1px solid var(--border);
    background: var(--surface);
    box-shadow: 0 1px 2px rgb(15 23 42 / 0.03);
  }

  /* Dark themes: faint tint, no border, like the tiles */
  html:is([data-theme="midnight"], [data-theme="forest"], [data-theme="dark"]) #app .m-badges {
    border-color: transparent;
    background: color-mix(in srgb, var(--text) 5%, transparent);
  }
}

/* ===== RESIZABLE TILES (mobile homepage, iOS / One UI style) =====
   2-column grid; each tile is sm (1x1), wide (2x1), tall (1x2) or lg (2x2).
   1-row tiles: icon on the left, text beside it.
   2-row tiles: icon at the top, text at the bottom. */
.tile-edit-bar {
  display: none;
}

@media (max-width: 768px) {
  /* Profile tiles: label on top, grid underneath */
  #app .m-tiles {
    display: block;
  }

  #app .m-tiles .m-tiles-label {
    margin-bottom: 0.6rem;
  }

  #app .rt-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: 72px;
    grid-auto-flow: row dense;
    gap: 0.6rem;
    padding: 0;
  }

  /* Reset every older placement rule; size comes only from the rt-* class */
  #app .rt-grid > .rt-tile.rt-tile {
    position: relative;
    grid-column: span 2;
    grid-row: span 1;
    width: auto;
    height: auto;
    min-height: 0;
    margin: 0;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  #app .rt-grid > .rt-tile.rt-icon { grid-column: span 1; }
  #app .rt-grid > .rt-tile.rt-wide { grid-column: span 4; }
  #app .rt-grid > .rt-tile.rt-tall { grid-column: span 2; grid-row: span 2; }
  #app .rt-grid > .rt-tile.rt-lg   { grid-column: span 4; grid-row: span 2; }

  /* Icon-only tile: a normal tile (same shape/style as the rest), icon centered */
  #app .rt-grid > .rt-tile.rt-icon {
    display: grid;
    place-items: center;
    place-content: center; /* override the tile's old justify-content: flex-end */
    justify-self: stretch;
    align-self: stretch;
    width: auto;
    max-width: none;
    height: auto;
    aspect-ratio: auto;
    padding: 0;
  }

  #app .rt-grid > .rt-tile.rt-icon > .m-tile-icon {
    grid-area: 1 / 1;
    width: auto;
    height: auto;
    margin: 0;
    line-height: 1;
    text-align: center;
  }

  #app .rt-grid > .rt-tile.rt-icon > :not(.m-tile-icon):not(.rt-handle) {
    display: none;
  }

  #app .rt-grid > .rt-tile.rt-icon > .m-tile-icon {
    margin: 0;
    font-size: 1.35rem;
  }


  #app .rt-grid > .rt-tile.rt-icon .rt-handle {
    right: 2px;
    bottom: 2px;
    width: 24px;
    height: 24px;
  }

  /* --- 1-row tiles (sm, wide): icon left, label + description stacked right --- */
  #app .rt-grid > .rt-tile:is(.rt-sm, .rt-wide) {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    grid-auto-rows: auto;
    align-content: center;
    align-items: center;
    column-gap: 0.7rem;
    row-gap: 1px;
    padding: 0.65rem 0.8rem;
  }

  #app .rt-grid > .rt-tile:is(.rt-sm, .rt-wide) > :is(.m-tile-icon, .m-tile-top, .mobile-icon, .spotify-tile-art) {
    grid-row: 1 / span 3;
    grid-column: 1;
    align-self: center;
    margin: 0;
    font-size: 1.15rem;
  }

  #app .rt-grid > .rt-tile:is(.rt-sm, .rt-wide) > :not(.m-tile-icon):not(.m-tile-top):not(.mobile-icon):not(.spotify-tile-art):not(.rt-handle):not(.m-tile-corner) {
    grid-column: 2;
    margin: 0;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Compact Spotify: hide the small "Now Playing" line to fit */
  #app .rt-grid > .spotify-tile:is(.rt-sm, .rt-wide) .spotify-tile-label {
    display: none;
  }

  #app .rt-grid > .rt-tile:is(.rt-sm, .rt-wide) .m-tile-top .m-tile-pill {
    display: none;
  }

  #app .rt-grid > .rt-tile:is(.rt-sm, .rt-wide) :is(.spotify-tile-art) {
    width: 40px;
    height: 40px;
  }

  /* --- 2-row tiles (tall, lg): icon top-left, text at the bottom --- */
  #app .rt-grid > .rt-tile:is(.rt-tall, .rt-lg) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.9rem;
  }

  #app .rt-grid > .rt-tile:is(.rt-tall, .rt-lg) > :is(.m-tile-icon, .m-tile-top, .mobile-icon, .spotify-tile-art) {
    align-self: flex-start;
    margin: 0 0 auto;
    font-size: 1.6rem;
  }

  #app .rt-grid > .rt-tile:is(.rt-tall, .rt-lg) :is(.m-tile-label, .mobile-label) {
    margin-top: 0.5rem;
    font-size: 0.92rem;
  }

  #app .rt-grid > .rt-tile.rt-lg :is(.m-tile-label, .mobile-label) {
    font-size: 1.05rem;
  }

  #app .rt-grid > .rt-tile:is(.rt-tall, .rt-lg) > :is(small, .m-tile-label, .mobile-label, .mobile-desc) {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Picked-up tile (tap another tile to swap with it) */
  #app .rt-grid > .rt-tile.rt-selected {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
    transform: scale(1);
  }

  /* Spotify tile: green "Now Playing" label, grey "Offline" when idle */
  #app .m-tile .spotify-tile-label {
    margin-top: 0.5rem;
    color: #1db954;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  #app .m-tile.idle .spotify-tile-label {
    color: var(--text-muted);
  }

  /* Spotify album art fills its icon box */
  #app .m-tile-art {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 12px;
  }

  #app .m-tile-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Tiles render as <button> in edit mode / for actions: reset button styling */
  #app button.m-tile {
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }

  /* --- Edit mode --- */
  #app .rt-grid > .rt-tile.rt-editing {
    outline: 2px dashed color-mix(in srgb, var(--text-muted) 55%, transparent);
    outline-offset: -2px;
    transform: scale(0.97);
    transition: transform 0.2s ease;
  }

  #app .rt-grid > .rt-tile.rt-editing :is(.m-tile-corner),
  #app .rt-grid > .rt-tile.rt-editing::after {
    display: none;
  }

  .rt-handle {
    position: absolute;
    right: 8px;
    bottom: 8px;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--accent);
    color: var(--bg);
    font-size: 0.7rem;
    box-shadow: var(--shadow);
    cursor: pointer;
  }

  /* Floating "Done" bar above the bottom nav */
  .tile-edit-bar {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: calc(110px + env(safe-area-inset-bottom, 0px));
    z-index: 310;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 8px 8px 14px;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: var(--surface);
    box-shadow: var(--shadow-xl);
  }

  .tile-edit-hint {
    flex: 1;
    min-width: 0;
    color: var(--text-secondary);
    font-size: 0.78rem;
  }

  .tile-edit-hint i {
    margin-right: 4px;
    font-size: 0.7rem;
  }

  .tile-edit-btn {
    padding: 8px 14px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    color: var(--text);
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
  }

  .tile-edit-btn.primary {
    border-color: var(--accent);
    background: var(--accent);
    color: var(--bg);
  }
}

@media (prefers-reduced-motion: reduce) {
  #app .rt-grid > .rt-tile.rt-editing {
    transform: none;
  }
}

/* ===== Follow-to-save popup ===== */
.follow-gate-overlay {
  position: fixed;
  inset: 0;
  z-index: 10050;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 10px calc(10px + env(safe-area-inset-bottom, 0px));
  background: rgba(0, 0, 0, 0.4);
}

.follow-gate {
  width: 100%;
  max-width: 420px;
  padding: 1.4rem 1.2rem 1rem;
  border: 1px solid var(--border);
  border-radius: 22px;
  background: var(--surface);
  box-shadow: var(--shadow-xl);
  text-align: center;
}

.follow-gate h3 {
  margin: 0 0 0.35rem;
  color: var(--text);
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
}

.follow-gate p {
  margin: 0 0 1rem;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.5;
}

.follow-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 0.5rem;
  padding: 12px;
  border-radius: 12px;
  background: var(--accent);
  color: var(--bg);
  font-weight: 600;
  text-decoration: none;
}

.follow-skip {
  width: 100%;
  margin-top: 0.15rem;
  padding: 10px;
  border: none;
  background: none;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}

/* ===== PROFILE POPUPS (Certifications + Dean's List + Project Links), phones =====
   Same fixed size for all three. Content flows top to bottom:
     header (stays visible) → description → list → Sponsored (right after the list).
   The ad is NOT pinned; it scrolls with the list. */
@media (max-width: 768px) {
  :root {
    --profile-modal-mobile-height: min(68vh, 520px);
  }

  #app .profile-modal.profile-modal {
    display: block;
    height: var(--profile-modal-mobile-height);
    max-height: var(--profile-modal-mobile-height);
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  /* Title row stays visible while scrolling */
  #app .profile-modal :is(.mobile-modal-header, .viewer-header) {
    position: sticky;
    top: -1.25rem; /* cancels the popup's top padding so it sits flush */
    z-index: 2;
    padding-top: 1.25rem;
    margin-top: -1.25rem;
    background: var(--surface);
  }

  /* Certifications: close button sits in the title row (like the other two) */
  #app .cert-viewer-modal .viewer-header {
    padding-right: 0;
  }

  #app .cert-viewer-modal .viewer-header .modal-close {
    position: static;
  }

  /* Lists keep their natural height (the popup scrolls, not the list) */
  #app .profile-modal :is(.cert-list, .mobile-deans-list, .mobile-link-list) {
    max-height: none;
    overflow: visible;
  }

  /* Sponsored: right after the last item */
  #app .profile-modal .profile-modal-footer {
    margin: 1rem 0 0;
    padding-top: 0.6rem;
    border-top: 1px solid var(--border);
  }
}

/* ===== Phones: iOS 26-style liquid glass nav (tabs pill + separate Menu circle) =====
   Clear glass (almost no tint). Readability comes from adjusting what shows
   THROUGH the glass: light themes brighten the backdrop, dark themes darken it. */
@media (max-width: 860px) {
  /* Light themes: clean white-tinted glass (matches the white cards) */
  .bottom-pill,
  .bottom-circle {
    /* thin outline so the glass shape is always visible */
    border: 1px solid rgb(15 23 42 / 0.12);
    background: rgb(255 255 255 / 0.55);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / 0.9),
      0 1px 2px rgb(15 23 42 / 0.06),
      0 8px 24px rgb(15 23 42 / 0.1);
  }

  .bottom-tab {
    height: 50px;
    border-radius: 999px;
    color: var(--text-secondary);
  }

  /* Active tab / open menu: a soft glass bubble */
  .bottom-tab.active,
  .bottom-circle.active {
    color: var(--text);
    background: rgb(255 255 255 / 0.85);
    box-shadow: 0 1px 3px rgb(15 23 42 / 0.1);
  }

  html:is([data-theme="midnight"], [data-theme="forest"], [data-theme="dark"]) :is(.bottom-pill, .bottom-circle) {
    border-color: rgb(255 255 255 / 0.14);
    background: rgb(0 0 0 / 0.06);
    -webkit-backdrop-filter: blur(18px) saturate(160%) brightness(0.5) contrast(0.85);
    backdrop-filter: blur(18px) saturate(160%) brightness(0.5) contrast(0.85);
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / 0.12),
      0 10px 28px rgb(0 0 0 / 0.35);
  }

  html:is([data-theme="midnight"], [data-theme="forest"], [data-theme="dark"]) :is(.bottom-tab.active, .bottom-circle.active) {
    background: rgb(255 255 255 / 0.12);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.14);
  }

  /* Icons only; the active tab expands into icon + label */
  .bottom-pill {
    display: flex;
    gap: 2px;
  }

  .bottom-tab {
    flex: 1 1 0;
    flex-direction: row;
    gap: 7px;
    min-width: 0;
    padding: 0 12px;
    font-size: 0.74rem;
    transition: flex-grow 0.25s ease, color 0.2s ease, background 0.2s ease;
  }

  .bottom-tab i {
    font-size: 1.05rem;
  }

  .bottom-tab .bottom-label {
    display: none;
    white-space: nowrap;
  }

  .bottom-tab.active {
    flex-grow: 2;
  }

  .bottom-tab.active .bottom-label {
    display: inline;
  }
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

.brand-short,
.brand-mobile-label {
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
  width: 14px;
  height: 1.5px;
  margin: 0 auto;
  border-radius: 2px;
  background: var(--text);
  display: block;
  transition: transform 0.22s ease, opacity 0.18s ease;
}

/* Menu open: the three lines turn into an X */
.nav-hamburger.open span:nth-child(1) {
  transform: translateY(5.5px) rotate(45deg);
}

.nav-hamburger.open span:nth-child(2) {
  opacity: 0;
}

.nav-hamburger.open span:nth-child(3) {
  transform: translateY(-5.5px) rotate(-45deg);
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

  /* Modern mobile bar: logo badge + name on the left, round menu button on the right */
  .site-nav-inner {
    height: 54px;
    padding: 0 8px 0 10px;
    border-radius: 18px;
    justify-content: space-between;
  }

  .nav-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
  }

  .brand-short {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--accent);
    color: var(--bg);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  /* Name already shows in the profile card below, so the bar says "Portfolio" */
  .brand-full {
    display: none;
  }

  .brand-mobile-label {
    display: inline;
    color: var(--text-secondary);
    font-weight: 600;
  }

  .nav-hamburger {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }

  #app .nav-hamburger {
    border-color: transparent;
    background: transparent;
    box-shadow: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }

  #app .nav-hamburger:hover,
  #app .nav-hamburger.open {
    background: var(--surface-hover);
  }

  .nav-hamburger span {
    width: 16px;
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

  /* Phones: just "RM" + the menu button; theme & Contact Me are inside the menu */
  .theme-wrap,
  .nav-contact-btn {
    display: none;
  }

  .nav-text-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-text-row small,
  .nav-text-row i {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .nav-links a.mobile-contact-btn,
  .nav-links a.mobile-contact-btn:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 8px;
    padding: 12px;
    border-radius: var(--radius);
    background-color: var(--accent);
    color: var(--bg);
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
  }

  .nav-hamburger {
    display: flex;
  }
}

/* ===== TOOL PAGES: a little side breathing room on phones =====
   (#app beats each tool's scoped .tool-page padding) */
@media (max-width: 640px) {
  #app .tool-page {
    padding-top: 18px;
    padding-left: 26px;
    padding-right: 26px;
  }

  /* Assistant (AI chat): use almost the full width */
  #app .tool-page.ai-tool-page {
    padding-left: 10px;
    padding-right: 10px;
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
    bottom: calc(88px + env(safe-area-inset-bottom, 0px));
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

/* Phones: no floating Now Playing anywhere — it only lives as the
   Spotify tile on the homepage (Quick Links) */
@media (max-width: 768px) {
  .spotify-sidebar {
    display: none;
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

/* Phones: show the toast just above the bottom nav (nav is 36px up + 62px tall) */
@media (max-width: 860px) {
  .toast {
    bottom: calc(110px + env(safe-area-inset-bottom, 0px));
    z-index: 320;
  }
}
</style>
