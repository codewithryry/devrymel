<template>
  <div>
    <!-- ===== MODERN FLOATING ACTION BUTTON ===== -->
    <div
      v-if="!isAdminRoute"
      class="fab-container"
      :class="{ 'is-open': fabOpen, 'is-mobile': isMobile }"
    >
      <!-- Backdrop -->
      <transition name="backdrop-fade">
        <div v-if="fabOpen && isMobile" class="fab-backdrop" @click="closeFab"></div>
      </transition>

      <!-- Action Items -->
      <transition-group name="fab-reveal" tag="div" class="fab-actions">
        <!-- Tech Stack -->
        <div v-if="fabOpen" key="tech" class="fab-group" :style="{ '--delay': 2 }">
          <button class="fab-action" @click.stop="togglePanel('tech')" :title="t.techStack">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 18l6-6-6-6" />
              <path d="M8 6l-6 6 6 6" />
              <path d="M14.5 4l-5 16" />
            </svg>
            <span class="fab-tooltip">{{ t.techStack }}</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showTechPanel" class="panel tech-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>{{ t.techStack }}</span>
                <button v-if="isMobile" class="panel-close" @click="showTechPanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="panel-body tech-body">
                <div class="tech-grid">
                  <span class="tech-pill">Vue.js</span>
                  <span class="tech-pill">JavaScript</span>
                  <span class="tech-pill">Firebase</span>
                  <span class="tech-pill">HTML</span>
                  <span class="tech-pill">CSS</span>
                  <span class="tech-pill">Node.js</span>
                  <span class="tech-pill">MySQL</span>
                  <span class="tech-pill">GitHub</span>
                </div>

                <div class="hire-card">
                  <div>
                    <span class="hire-title">{{ t.availableWork }}</span>
                    <span class="hire-sub">{{ t.frontendDev }}</span>
                  </div>

                  <a href="mailto:reymelrey.mislang@gmail.com" class="hire-btn">
                    {{ t.hireMe }}
                  </a>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Theme -->
        <div v-if="fabOpen" key="theme" class="fab-group" :style="{ '--delay': 3 }">
          <button class="fab-action" @click.stop="togglePanel('theme')" :title="t.theme">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <span class="fab-tooltip">{{ t.theme }}</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showThemePanel" class="panel theme-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>{{ t.chooseTheme }}</span>
                <button v-if="isMobile" class="panel-close" @click="showThemePanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="panel-body">
                <button
                  v-for="theme in themes"
                  :key="theme.id"
                  class="theme-btn"
                  :class="{ active: currentTheme === theme.id }"
                  @click="setTheme(theme.id)"
                >
                  <span class="theme-swatch" :style="{ background: theme.preview }"></span>
                  <span class="theme-name">{{ theme.name }}</span>

                  <svg
                    v-if="currentTheme === theme.id"
                    class="check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Stats -->
        <div v-if="fabOpen" key="stats" class="fab-group" :style="{ '--delay': 5 }">
          <button class="fab-action" @click.stop="togglePanel('stats')" :title="t.stats">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
            <span class="fab-tooltip">{{ t.stats }}</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showStatsPanel" class="panel stats-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>{{ t.liveStats }}</span>

                <button v-if="isMobile" class="panel-close" @click="showStatsPanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="panel-body stats-body">
                <span class="stats-top-note">
                  Private repos and projects are not included.
                </span>

                <div class="stat-card stat-active">
                  <div class="stat-left">
                    <div class="stat-icon-wrap blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>

                    <div class="stat-info">
                      <span class="stat-value">
                        {{ statsLoading ? "..." : visitorCount.toLocaleString() }}
                      </span>
                      <span class="stat-label">{{ t.views }}</span>
                    </div>
                  </div>

                  <span class="stat-badge live">
                    {{ statsLoading ? "Loading" : "Live" }}
                  </span>
                </div>

                <div class="stat-card stat-active">
                  <div class="stat-left">
                    <div class="stat-icon-wrap purple">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>

                    <div class="stat-info">
                      <span class="stat-value">
                        {{ statsLoading ? "..." : projectsCount }}
                      </span>
                      <span class="stat-label">{{ t.projects }}</span>
                    </div>
                  </div>

                  <span class="stat-badge live">
                    {{ statsLoading ? "Loading" : "Live" }}
                  </span>
                </div>

                <div class="stat-card stat-active">
                  <div class="stat-left">
                    <div class="stat-icon-wrap green">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>

                    <div class="stat-info">
                      <span class="stat-value">
                        {{ statsLoading ? "Loading..." : codingHoursText }}
                      </span>
                      <span class="stat-label">{{ t.hrsCoding }}</span>
                    </div>
                  </div>

                  <span class="stat-badge live">WakaTime</span>
                </div>

                <div class="stat-card stat-active">
                  <div class="stat-left">
                    <div class="stat-icon-wrap dark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </div>

                    <div class="stat-info">
                      <span class="stat-value">
                        {{ statsLoading ? "..." : reposCount }}
                      </span>
                      <span class="stat-label">{{ t.repos }}</span>
                    </div>
                  </div>

                  <span class="stat-badge live">GitHub</span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Feedback -->
        <button
          v-if="fabOpen"
          key="fb"
          class="fab-action"
          :style="{ '--delay': 6 }"
          @click="openFeedback"
          :title="t.comments"
        >
          <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span class="fab-tooltip">{{ t.comments }}</span>
          <span v-if="feedbackCount" class="fab-badge">{{ feedbackCount }}</span>
        </button>

        <!-- Contact -->
        <div v-if="fabOpen" key="contact" class="fab-group" :style="{ '--delay': 7 }">
          <button class="fab-action" @click.stop="togglePanel('contact')" :title="t.contact">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span class="fab-tooltip">{{ t.contact }}</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showContactPanel" class="panel contact-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>{{ t.getInTouch }}</span>
                <button v-if="isMobile" class="panel-close" @click="showContactPanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="panel-body">
                <a href="mailto:reymelrey.mislang@gmail.com" class="contact-row">
                  <div class="contact-icon red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div class="contact-info">
                    <span class="contact-title">{{ t.emailMe }}</span>
                    <span class="contact-sub">reymelrey.mislang@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/reymel-mislang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact-row"
                >
                  <div class="contact-icon linkedin">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  </div>
                  <div class="contact-info">
                    <span class="contact-title">LinkedIn</span>
                    <span class="contact-sub">Reymel Mislang</span>
                  </div>
                </a>

                <div class="contact-row">
                  <div class="contact-icon location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div class="contact-info">
                    <span class="contact-title">{{ t.location }}</span>
                    <span class="contact-sub">Calapan City, Oriental Mindoro</span>
                  </div>
                </div>

                <a href="/Resume.pdf" download class="contact-row resume">
                  <div class="contact-icon accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                  <div class="contact-info">
                    <span class="contact-title">{{ t.downloadCV }}</span>
                    <span class="contact-sub">{{ t.latestResume }}</span>
                  </div>
                </a>
              </div>
            </div>
          </transition>
        </div>

                <!-- Pages -->
        <div v-if="fabOpen" key="pages" class="fab-group" :style="{ '--delay': 4 }">
          <button class="fab-action" @click.stop="togglePanel('pages')" title="Pages">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span class="fab-tooltip">Pages</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showPagesPanel" class="panel pages-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>Quick Pages</span>

                <button v-if="isMobile" class="panel-close" @click="showPagesPanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="panel-body pages-body">
                <router-link
                  v-for="page in quickPages"
                  :key="page.path"
                  :to="page.path"
                  class="page-link"
                  :class="{ admin: page.admin }"
                  @click="handleQuickPageClick"
                >
                  <span class="page-icon">
                    <i :class="page.icon"></i>
                  </span>

                  <span class="page-info">
                    <strong>{{ page.title }}</strong>
                    <small>{{ page.description }}</small>
                  </span>

                  <i class="fas fa-arrow-right page-arrow"></i>
                </router-link>
              </div>
            </div>
          </transition>
        </div>
      </transition-group>

      <!-- Main Toggle -->
      <button
        class="fab-trigger"
        :class="{ active: fabOpen }"
        @click.stop="toggleFab"
        :aria-label="fabOpen ? t.close : t.menu"
      >
        <span class="trigger-icon">
          <svg v-if="!fabOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>

          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>

        <span v-if="!fabOpen && totalNotifications" class="trigger-pulse"></span>
      </button>

      <!-- Scroll to Top -->
      <transition name="fade-up">
        <button v-if="showScrollTop" class="scroll-top" @click="scrollToTop" :title="t.top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </transition>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toastVisible" class="toast" :class="{ 'toast-mobile': isMobile }">
        <div class="toast-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <FeedbackBubble
      v-if="!isAdminRoute"
      ref="feedbackBubble"
      :show-button="false"
      :lang="currentLang"
      @count-change="feedbackCount = $event"
    />

    <AdBlockWarning
      v-if="!isAdminRoute"
      :show="isAdBlockEnabled"
    />

    <router-view
      :key="currentLang"
      :lang="currentLang"
      :translations="t"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { trackVisit, getViews } from "./services/analyticsService";
import { getGitHubReposCount, getWakaTimeStats } from "./services/devStatsService";
import FeedbackBubble from "@/components/FeedbackBubble.vue";
import TechNotesSection from "./components/profile/TechNotesSection.vue";
import AdSlot from "./components/AdSlot.vue";
import AdBlockWarning from "@/components/AdBlockWarning.vue";
import {
  getVisitorInfo,
  saveVisitorInfo,
  hasTrackedVisitor,
  getOrCreateVisitorId
} from "@/utils/visitorInfo";
import { detectAdBlocker } from "@/utils/adBlockDetector";
import techNotes from "./data/techNotes.json";

const UI_TRANSLATIONS = {
  en: {
    theme: "Theme",
    stats: "Stats",
    comments: "Feedback",
    contact: "Contact",
    top: "Back to top",
    menu: "Menu",
    close: "Close",

    language: "Language",
    chooseLanguage: "Choose Language",

    quickIntro: "Quick Intro",
    introTitle: "Hi, I’m Reymel",
    introPitch:
      "A frontend-focused IT graduate building clean, responsive, and user-friendly web applications.",
    viewWork: "View Work",

    chooseTheme: "Appearance",
    liveStats: "Live Stats",
    views: "Views",
    projects: "Projects",
    hrsCoding: "Hours Coding",
    repos: "Repositories",
    projectCounter: "Project counter",
    codingActivity: "Coding activity",
    githubRepos: "GitHub repositories",

    quickNav: "Quick Nav",
    about: "About",
    skills: "Skills",
    projectsNav: "Projects",
    experience: "Experience",
    certificates: "Certificates",

    techStack: "Tech Stack",
    availableWork: "Available for work",
    frontendDev: "Frontend Developer",
    hireMe: "Hire Me",

    getInTouch: "Get in Touch",
    emailMe: "Email",
    location: "Location",
    downloadCV: "Download Resume",
    latestResume: "PDF • Latest Resume",

    commentsWall: "Feedback",
    loading: "Loading",
    noFeedback: "No feedback yet. Start the conversation!",
    writeFeedback: "Write feedback..."
  },

  fil: {
    theme: "Tema",
    stats: "Stats",
    comments: "Puna",
    contact: "Kontak",
    top: "Itaas",
    menu: "Menu",
    close: "Isara",

    language: "Wika",
    chooseLanguage: "Pumili ng Wika",

    quickIntro: "Quick Intro",
    introTitle: "Hi, I’m Reymel",
    introPitch:
      "Frontend-focused IT graduate na gumagawa ng malinis, responsive, at user-friendly web applications.",
    viewWork: "Tingnan Work",

    chooseTheme: "Itsura",
    liveStats: "Live Stats",
    views: "Views",
    projects: "Proyekto",
    hrsCoding: "Oras ng Coding",
    repos: "Repositories",
    projectCounter: "Project counter",
    codingActivity: "Coding activity",
    githubRepos: "GitHub repositories",

    quickNav: "Quick Nav",
    about: "Tungkol",
    skills: "Skills",
    projectsNav: "Mga Proyekto",
    experience: "Karanasan",
    certificates: "Certificates",

    techStack: "Tech Stack",
    availableWork: "Available sa work",
    frontendDev: "Frontend Developer",
    hireMe: "Hire Me",

    getInTouch: "Makipag-ugnayan",
    emailMe: "Email",
    location: "Lokasyon",
    downloadCV: "I-download ang CV",
    latestResume: "PDF • Latest Resume",

    commentsWall: "Puna",
    loading: "Naglo-load",
    noFeedback: "Wala pang puna. Magsimula ng usapan!",
    writeFeedback: "Magsulat ng puna..."
  },

  zh: {
    theme: "主題",
    stats: "統計",
    comments: "留言",
    contact: "聯絡",
    top: "回到頂部",
    menu: "選單",
    close: "關閉",

    language: "語言",
    chooseLanguage: "選擇語言",

    quickIntro: "快速介紹",
    introTitle: "Hi, I’m Reymel",
    introPitch:
      "以前端為主的資訊科技畢業生，專注建立乾淨、響應式且易用的網頁應用程式。",
    viewWork: "查看作品",

    chooseTheme: "外觀",
    liveStats: "即時數據",
    views: "瀏覽次數",
    projects: "專案",
    hrsCoding: "編碼時數",
    repos: "儲存庫",
    projectCounter: "專案計數器",
    codingActivity: "編碼活動",
    githubRepos: "GitHub 儲存庫",

    quickNav: "快速導覽",
    about: "關於",
    skills: "技能",
    projectsNav: "專案",
    experience: "經驗",
    certificates: "證書",

    techStack: "技術棧",
    availableWork: "可接受工作",
    frontendDev: "前端開發者",
    hireMe: "雇用我",

    getInTouch: "聯絡方式",
    emailMe: "電子郵件",
    location: "位置",
    downloadCV: "下載履歷",
    latestResume: "PDF • 最新履歷",

    commentsWall: "留言板",
    loading: "載入中",
    noFeedback: "尚無留言，開始對話吧！",
    writeFeedback: "寫下留言..."
  }
};

export default {
  name: "App",

  components: {
    FeedbackBubble,
    TechNotesSection,
    AdSlot,
    AdBlockWarning
  },

  provide() {
    return {
      appLang: computed(() => this.currentLang),
      appText: computed(() => this.t),
      setAppLang: this.setLang
    };
  },

  data() {
    return {
      techNotes,

      fabOpen: window.innerWidth > 640,
      showScrollTop: false,

      showLanguagePanel: false,
      showIntroPanel: false,
      showThemePanel: false,
      showPagesPanel: false,
      showNavPanel: false,
      showTechPanel: false,
      showStatsPanel: false,
      showContactPanel: false,

      isMobile: window.innerWidth <= 640,

      toastVisible: false,
      toastMessage: "",
      toastTimer: null,

      currentTheme: "light",
      themes: [
        {
          id: "light",
          name: "Classic Light",
          preview: "linear-gradient(135deg, #f8fafc, #e2e8f0)"
        },
        {
          id: "midnight",
          name: "Midnight Pro",
          preview: "linear-gradient(135deg, #0f172a, #1e3a5f)"
        },
        {
          id: "forest",
          name: "Emerald Focus",
          preview: "linear-gradient(135deg, #064e3b, #065f46)"
        }
      ],

      quickPages: [
        {
          path: "/now",
          icon: "fas fa-bolt",
          title: "Now",
          description: "Current focus"
        },
        {
          path: "/uses",
          icon: "fas fa-tools",
          title: "Uses",
          description: "Tools and setup"
        },
        {
          path: "/services",
          icon: "fas fa-briefcase",
          title: "Services",
          description: "Work I offer"
        },
        {
          path: "/case-studies",
          icon: "fas fa-layer-group",
          title: "Case Studies",
          description: "Project breakdowns"
        },
        {
          path: "/roadmap",
          icon: "fas fa-map-signs",
          title: "Roadmap",
          description: "Planned updates"
        },
        {
          path: "/changelog",
          icon: "fas fa-clock-rotate-left",
          title: "Changelog",
          description: "Recent changes"
        },
        {
          path: "/privacy",
          icon: "fas fa-shield-alt",
          title: "Privacy",
          description: "Data notice"
        },
        {
          path: "/contact",
          icon: "fas fa-envelope",
          title: "Contact",
          description: "Reach out"
        },
        {
          path: "/admin",
          icon: "fas fa-user-shield",
          title: "Admin",
          description: "Owner panel",
          admin: true
        }
      ],

      languages: [
        { id: "en", name: "English", flag: "EN" },
        { id: "fil", name: "Filipino", flag: "PH" },
        { id: "zh", name: "Chinese", flag: "ZH" }
      ],

      currentLang: "en",
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
      return UI_TRANSLATIONS[this.currentLang] || UI_TRANSLATIONS.en;
    },

    totalNotifications() {
      return this.feedbackCount > 0 ? 1 : 0;
    },

    isAdminRoute() {
      return this.$route.path.startsWith("/admin");
    }
  },

  mounted() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.setTheme(savedTheme, false);

    const savedLang = localStorage.getItem("lang") || "en";
    this.setLang(savedLang, false);

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
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.checkMobile);
    document.removeEventListener("click", this.handleOutsideClick);

    document.body.style.overflow = "";

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
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
          console.log("Visitor already tracked:", visitorId);
          return;
        }

        const visitorInfo = {
          ...(await getVisitorInfo()),
          visitorId,
          adBlocker: isBlocked ? "Detected" : "Not detected"
        };

        this.visitorInfo = visitorInfo;

        await saveVisitorInfo(visitorInfo);

        console.log("New visitor saved:", visitorInfo);
      } catch (error) {
        console.error("Visitor tracking error:", error);
      }
    },

    checkMobile() {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 640;

      if (this.isMobile) {
        this.fabOpen = false;
        this.closeAllPanels();
        document.body.style.overflow = "";
        return;
      }

      if (wasMobile && !this.isMobile) {
        this.fabOpen = true;
        document.body.style.overflow = "";
      }
    },

    toggleFab() {
      this.fabOpen = !this.fabOpen;

      if (!this.fabOpen) {
        this.closeAllPanels();
      }

      if (this.isMobile) {
        document.body.style.overflow = this.fabOpen ? "hidden" : "";
      }
    },

    closeFab() {
      this.fabOpen = false;
      this.closeAllPanels();

      if (this.isMobile) {
        document.body.style.overflow = "";
      }
    },

    togglePanel(name) {
      const panels = [
        "language",
        "intro",
        "theme",
        "pages",
        "nav",
        "tech",
        "stats",
        "contact"
      ];

      panels.forEach((panel) => {
        const key = `show${panel.charAt(0).toUpperCase() + panel.slice(1)}Panel`;
        this[key] = panel === name ? !this[key] : false;
      });

      if (name === "stats" && this.showStatsPanel) {
        this.loadLiveStats();
      }
    },

    closeAllPanels() {
      this.showLanguagePanel = false;
      this.showIntroPanel = false;
      this.showThemePanel = false;
      this.showPagesPanel = false;
      this.showNavPanel = false;
      this.showTechPanel = false;
      this.showStatsPanel = false;
      this.showContactPanel = false;
    },

    handleQuickPageClick() {
      this.closeAllPanels();

      if (this.isMobile) {
        this.closeFab();
      }
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
        } else {
          console.error("Views error:", viewsResult.reason);
        }

        if (wakaResult.status === "fulfilled") {
          this.codingHoursText = wakaResult.value?.hoursText || "Unavailable";
        } else {
          console.error("WakaTime load error:", wakaResult.reason);
          this.codingHoursText = "Unavailable";
        }

        if (githubResult.status === "fulfilled") {
          this.reposCount = Number(githubResult.value) || 0;
        } else {
          console.error("GitHub repos load error:", githubResult.reason);
          this.reposCount = 0;
        }

        if (projectsResult.status === "fulfilled") {
          this.projectsCount = Array.isArray(projectsResult.value.default)
            ? projectsResult.value.default.length
            : 0;
        } else {
          console.error("Projects count error:", projectsResult.reason);
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
      const clickedInsideFab = e.target.closest(".fab-container");
      const clickedInsideModal = e.target.closest(
        ".modal-overlay, .feedback-overlay"
      );
      const clickedScrollTop = e.target.closest(".scroll-top");

      if (clickedInsideFab || clickedInsideModal || clickedScrollTop) return;

      this.closeAllPanels();

      if (this.isMobile) {
        this.closeFab();
      }
    },

    handleScroll() {
      this.showScrollTop = window.scrollY > 400;
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },

    scrollToSection(id) {
      const section = document.querySelector(id);

      if (!section) {
        this.showToast("Section not found");
        return;
      }

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      this.closeAllPanels();

      if (this.isMobile) {
        this.closeFab();
      }
    },

    setTheme(themeId, save = true) {
      this.currentTheme = themeId;
      document.documentElement.setAttribute("data-theme", themeId);

      if (save) {
        localStorage.setItem("theme", themeId);
        this.showThemePanel = false;
      }
    },

    setLang(langId, save = true) {
      this.currentLang = langId;
      document.documentElement.setAttribute("lang", langId);
      document.documentElement.setAttribute("data-lang", langId);

      if (save) {
        localStorage.setItem("lang", langId);
        this.showLanguagePanel = false;
      }

      window.dispatchEvent(
        new CustomEvent("language-change", {
          detail: {
            lang: langId,
            text: UI_TRANSLATIONS[langId] || UI_TRANSLATIONS.en
          }
        })
      );
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

      if (this.isMobile) {
        this.closeFab();
      }

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
        if (this.currentLang === "zh") return "剛剛";
        if (this.currentLang === "fil") return "Ngayon lang";

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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+TC:wght@400;500;600;700;800;900&display=swap");

/* ===== ROOT THEME VARIABLES ===== */
:root {
  --bg: #f8fafc;
  --surface: #ffffff;
  --surface-soft: #f8fafc;
  --surface-hover: #f1f5f9;
  --text: #0f172a;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --accent: #6366f1;
  --accent-hover: #4f46e5;

  --success: #22c55e;
  --danger: #ef4444;
  --warning: #f59e0b;
  --info: #3b82f6;

  --shadow-sm: 0 1px 2px rgb(15 23 42 / 0.06);
  --shadow: 0 6px 18px rgb(15 23 42 / 0.1);
  --shadow-lg: 0 14px 34px rgb(15 23 42 / 0.14);
  --shadow-xl: 0 26px 70px rgb(15 23 42 / 0.22);

  --radius-sm: 12px;
  --radius: 16px;
  --radius-lg: 22px;
  --radius-xl: 28px;
}

html[data-theme="dark"],
html[data-theme="dark"] body {
  --bg: #020617;
  --surface: #0f172a;
  --surface-soft: #111827;
  --surface-hover: #1e293b;
  --text: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: #1e293b;
}

html[data-theme="midnight"],
html[data-theme="midnight"] body {
  --bg: #0f172a;
  --surface: #1e293b;
  --surface-soft: #111827;
  --surface-hover: #334155;
  --text: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: #334155;
}

html[data-theme="forest"],
html[data-theme="forest"] body {
  --bg: #022c22;
  --surface: #064e3b;
  --surface-soft: #052e2b;
  --surface-hover: #065f46;
  --text: #ecfdf5;
  --text-secondary: #6ee7b7;
  --text-muted: #34d399;
  --border: #065f46;
  --accent: #34d399;
  --accent-hover: #10b981;
}

html[data-theme="sunset"],
html[data-theme="sunset"] body {
  --bg: #1c0a00;
  --surface: #431407;
  --surface-soft: #2a0c04;
  --surface-hover: #7c2d12;
  --text: #fff7ed;
  --text-secondary: #fdba74;
  --text-muted: #fb923c;
  --border: #7c2d12;
}

html[data-theme="purple"],
html[data-theme="purple"] body {
  --bg: #0f0320;
  --surface: #2e1065;
  --surface-soft: #1e0b43;
  --surface-hover: #4c1d95;
  --text: #faf5ff;
  --text-secondary: #c4b5fd;
  --text-muted: #a78bfa;
  --border: #4c1d95;
}

/* ===== GLOBAL RESET ===== */
* {
  box-sizing: border-box;
}

html,
body {
  max-width: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  font-family: "Inter", "Noto Sans TC", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ===== FAB LAYOUT ===== */
.fab-container {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.fab-container.is-open {
  z-index: 160;
}

.fab-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(2px);
}

html[data-theme="dark"] .fab-backdrop,
html[data-theme="midnight"] .fab-backdrop,
html[data-theme="forest"] .fab-backdrop,
html[data-theme="sunset"] .fab-backdrop,
html[data-theme="purple"] .fab-backdrop {
  background: rgba(2, 6, 23, 0.7);
}

.fab-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 12px;
}

.fab-group {
  position: relative;
  display: flex;
  align-items: center;
}

/* ===== FAB BUTTONS ===== */
.fab-trigger,
.fab-action,
.scroll-top {
  display: grid;
  place-items: center;
  border: 0;
  cursor: pointer;
}

.fab-trigger {
  position: relative;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow:
    0 12px 32px rgba(99, 102, 241, 0.34),
    0 5px 14px rgba(99, 102, 241, 0.2);
  transition:
    transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.fab-trigger::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: inherit;
  background: inherit;
  opacity: 0.22;
  z-index: -1;
}

.fab-trigger:hover {
  transform: scale(1.05);
  box-shadow: 0 16px 42px rgba(99, 102, 241, 0.44);
}

.fab-trigger.active {
  transform: rotate(45deg);
  background: linear-gradient(135deg, #ef4444, #f97316);
  box-shadow: 0 12px 32px rgba(239, 68, 68, 0.34);
}

.trigger-icon {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
}

.trigger-icon svg,
.fab-icon,
.scroll-top svg {
  width: 100%;
  height: 100%;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.fab-icon {
  width: 22px;
  height: 22px;
}

.fab-action,
.scroll-top {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--surface) 96%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
  transition:
    transform 0.22s ease,
    color 0.22s ease,
    background 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.fab-action:hover,
.scroll-top:hover {
  transform: scale(1.08);
  color: var(--accent);
  background: var(--surface-hover);
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
  box-shadow: var(--shadow-lg);
}

.scroll-top {
  margin-top: 12px;
}

.trigger-pulse {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 11px;
  height: 11px;
  border-radius: 999px;
  background: #ef4444;
  border: 2px solid #ffffff;
  animation: pulse-ring 1.8s ease infinite;
}

.fab-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: #ffffff;
  background: #ef4444;
  border: 2px solid var(--surface);
  font-size: 0.68rem;
  font-weight: 900;
}

.fab-tooltip {
  position: absolute;
  right: 66px;
  padding: 7px 11px;
  border-radius: 10px;
  color: #ffffff;
  background: #0f172a;
  box-shadow: var(--shadow);
  font-size: 0.74rem;
  font-weight: 800;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateX(6px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.fab-action:hover .fab-tooltip {
  opacity: 1;
  transform: translateX(0);
}

/* ===== PANEL BASE ===== */
.panel {
  position: absolute;
  right: 66px;
  bottom: -6px;
  z-index: 20;
  width: 306px;
  min-width: 306px;
  overflow: hidden;
  border-radius: 22px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface) 96%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
  box-shadow:
    0 24px 60px rgba(15, 23, 42, 0.18),
    0 8px 22px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(16px);
}

.theme-panel,
.stats-panel,
.contact-panel,
.tech-panel,
.language-panel,
.intro-panel,
.nav-panel,
.pages-panel {
  width: 306px;
  min-width: 306px;
}

.panel-head {
  min-height: 56px;
  padding: 15px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: color-mix(in srgb, var(--surface-hover) 42%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 76%, transparent);
}

.panel-head span {
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.panel-close {
  width: 30px;
  height: 30px;
  display: none;
  place-items: center;
  border: 0;
  border-radius: 999px;
  color: var(--text-secondary);
  background: var(--surface-hover);
  cursor: pointer;
  transition:
    color 0.18s ease,
    background 0.18s ease;
}

.panel-close:hover {
  color: var(--text);
  background: var(--border);
}

.panel-close svg {
  width: 14px;
  height: 14px;
}

.panel-body,
.stats-body,
.pages-body,
.tech-body,
.intro-body {
  max-height: 380px;
  overflow-y: auto;
  padding: 13px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel-body::-webkit-scrollbar,
.stats-body::-webkit-scrollbar,
.pages-body::-webkit-scrollbar,
.tech-body::-webkit-scrollbar {
  width: 6px;
}

.panel-body::-webkit-scrollbar-thumb,
.stats-body::-webkit-scrollbar-thumb,
.pages-body::-webkit-scrollbar-thumb,
.tech-body::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--text-muted) 35%, transparent);
}

/* ===== UNIFIED PANEL CARD ROWS ===== */
.theme-btn,
.contact-row,
.stat-card,
.nav-row,
.page-link,
.hire-card,
.language-btn {
  width: 100%;
  min-height: 64px;
  padding: 11px 12px;
  border-radius: 17px;
  border: 1px solid color-mix(in srgb, var(--border) 78%, transparent);
  color: var(--text);
  background: color-mix(in srgb, var(--surface) 88%, var(--surface-hover) 12%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.38) inset;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.theme-btn:hover,
.contact-row:hover,
.stat-card:hover,
.nav-row:hover,
.page-link:hover,
.language-btn:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--surface-hover) 72%, var(--surface) 28%);
  border-color: color-mix(in srgb, var(--accent) 34%, var(--border));
  box-shadow:
    0 10px 22px rgba(15, 23, 42, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.5) inset;
}

/* ===== THEME PANEL ===== */
.theme-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  border-style: solid;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
}

.theme-btn.active {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, var(--surface));
  border-color: color-mix(in srgb, var(--accent) 38%, var(--border));
}

.theme-swatch {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  border-radius: 15px;
  border: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.44),
    0 3px 10px rgba(15, 23, 42, 0.08);
}

.theme-name {
  flex: 1;
  min-width: 0;
  color: var(--text);
  font-size: 0.86rem;
  font-weight: 900;
  line-height: 1.15;
}

.check-icon {
  width: 17px;
  height: 17px;
  color: var(--accent);
}

/* ===== QUICK PAGES PANEL ===== */
.pages-body {
  display: grid;
  gap: 10px;
  max-height: 430px;
}

.page-link {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 16px;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.page-link.admin {
  background:
    linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent),
    color-mix(in srgb, var(--surface) 88%, var(--surface-hover) 12%);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
}

.page-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 15px;
  color: #052e16;
  background: #86efac;
  font-size: 0.92rem;
}

.page-link.admin .page-icon {
  color: #ecfdf5;
  background: #0f172a;
}

.page-info {
  min-width: 0;
}

.page-info strong {
  display: block;
  color: var(--text);
  font-size: 0.86rem;
  font-weight: 900;
  line-height: 1.15;
}

.page-info small {
  display: block;
  margin-top: 4px;
  color: var(--text-secondary);
  font-size: 0.72rem;
  line-height: 1.25;
}

.page-arrow {
  color: var(--accent);
  font-size: 0.72rem;
}

/* ===== STATS PANEL ===== */
.stats-body {
  gap: 10px;
}

.stats-top-note {
  display: block;
  margin: 0 0 2px;
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.35;
}

.stat-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.stat-active {
  background:
    linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(59, 130, 246, 0.08)),
    color-mix(in srgb, var(--surface) 90%, var(--surface-hover) 10%);
  border-color: rgba(99, 102, 241, 0.26);
}

.stat-left {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

.stat-info,
.contact-info,
.nav-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value,
.contact-title,
.nav-title,
.hire-title {
  color: var(--text);
  font-size: 0.86rem;
  font-weight: 900;
  line-height: 1.15;
}

.stat-label,
.contact-sub,
.nav-sub,
.hire-sub {
  color: var(--text-secondary);
  font-size: 0.72rem;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-icon-wrap,
.contact-icon,
.nav-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 15px;
}

.stat-icon-wrap svg,
.contact-icon svg,
.nav-icon svg {
  width: 18px;
  height: 18px;
}

.stat-icon-wrap.blue {
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.14);
}

.stat-icon-wrap.purple {
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.14);
}

.stat-icon-wrap.green {
  color: #10b981;
  background: rgba(16, 185, 129, 0.14);
}

.stat-icon-wrap.dark {
  color: #0f172a;
  background: rgba(15, 23, 42, 0.1);
}

.stat-badge {
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stat-badge.live {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.12);
}

.stat-badge.soon {
  color: #64748b;
  background: rgba(100, 116, 139, 0.12);
}

/* ===== CONTACT PANEL ===== */
.contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
  color: inherit;
  text-decoration: none;
}

.contact-row.resume {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent),
    color-mix(in srgb, var(--surface) 90%, var(--surface-hover) 10%);
}

.contact-icon.red {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.11);
}

.contact-icon.linkedin {
  color: #0a66c2;
  background: rgba(10, 102, 194, 0.12);
}

.contact-icon.location {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.13);
}

.contact-icon.accent {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
}

/* ===== TECH PANEL ===== */
.tech-body {
  gap: 12px;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-pill {
  padding: 8px 11px;
  border-radius: 999px;
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--surface-hover) 72%, var(--surface) 28%);
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  font-size: 0.74rem;
  font-weight: 800;
}

.hire-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background:
    linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(59, 130, 246, 0.08)),
    color-mix(in srgb, var(--surface) 92%, var(--surface-hover) 8%);
  border-color: rgba(99, 102, 241, 0.22);
}

.hire-title,
.hire-sub {
  display: block;
}

.hire-btn {
  flex: 0 0 auto;
  padding: 8px 11px;
  border-radius: 999px;
  color: #ffffff;
  background: var(--accent);
  text-decoration: none;
  font-size: 0.72rem;
  font-weight: 900;
  box-shadow: 0 8px 18px rgba(99, 102, 241, 0.24);
}

.hire-btn:hover {
  background: var(--accent-hover);
}

/* ===== LANGUAGE / INTRO / NAV SUPPORT ===== */
.language-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  border-style: solid;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
}

.language-btn.active {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, var(--surface));
  border-color: color-mix(in srgb, var(--accent) 34%, var(--border));
}

.language-flag {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: var(--text);
  background: var(--surface-hover);
  font-size: 0.7rem;
  font-weight: 900;
}

.language-name {
  flex: 1;
  min-width: 0;
  color: var(--text);
  font-size: 0.86rem;
  font-weight: 900;
}

.intro-body {
  padding: 18px;
}

.intro-avatar {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 17px;
  color: #ffffff;
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
}

.intro-avatar span {
  font-size: 0.95rem;
  font-weight: 900;
}

.intro-content h3 {
  margin: 0 0 8px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 900;
}

.intro-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.86rem;
  line-height: 1.6;
}

.intro-btn {
  width: 100%;
  border: 0;
  border-radius: 15px;
  padding: 11px 14px;
  color: #ffffff;
  background: var(--accent);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 900;
  cursor: pointer;
}

.nav-row {
  display: flex;
  align-items: center;
  gap: 12px;
  border-style: solid;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
}

.nav-icon.indigo {
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.12);
}

.nav-icon.emerald {
  color: #059669;
  background: rgba(5, 150, 105, 0.12);
}

.nav-icon.violet {
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.12);
}

.nav-icon.amber {
  color: #d97706;
  background: rgba(217, 119, 6, 0.12);
}

.nav-icon.rose {
  color: #e11d48;
  background: rgba(225, 29, 72, 0.12);
}

/* ===== TOAST ===== */
.toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  z-index: 220;
  transform: translateX(-50%);
  min-width: 260px;
  max-width: calc(100vw - 32px);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 16px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface) 96%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(16px);
}

.toast-icon {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.toast-icon svg {
  width: 17px;
  height: 17px;
}

.toast span {
  color: var(--text);
  font-size: 0.84rem;
  font-weight: 800;
}

/* ===== TRANSITIONS ===== */
.fab-reveal-enter-active,
.fab-reveal-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
  transition-delay: calc(var(--delay, 1) * 28ms);
}

.fab-reveal-enter-from,
.fab-reveal-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.92);
}

.panel-appear-enter-active,
.panel-appear-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.panel-appear-enter-from,
.panel-appear-leave-to {
  opacity: 0;
  transform: translateX(10px) scale(0.98);
}

.backdrop-fade-enter-active,
.backdrop-fade-leave-active,
.fade-up-enter-active,
.fade-up-leave-active,
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 14px);
}

@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

/* ===== DARK PANEL POLISH ===== */
html[data-theme="midnight"] .page-link.admin .page-icon,
html[data-theme="forest"] .page-link.admin .page-icon,
html[data-theme="dark"] .page-link.admin .page-icon {
  color: #0f172a;
  background: #86efac;
}

html[data-theme="midnight"] .stat-icon-wrap.dark,
html[data-theme="forest"] .stat-icon-wrap.dark,
html[data-theme="dark"] .stat-icon-wrap.dark {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.1);
}

/* ===== MOBILE: ALL FAB PANELS SAME AS FEEDBACK BOTTOM SHEET ===== */
@media (max-width: 640px) {
  .fab-container.is-mobile {
    right: 18px;
    bottom: 18px;
    z-index: 180;
  }

  .fab-container.is-mobile .fab-actions {
    gap: 10px;
    margin-bottom: 12px;
  }

  .fab-container.is-mobile .fab-action {
    width: 52px;
    height: 52px;
  }

  .fab-container.is-mobile .fab-trigger {
    width: 58px;
    height: 58px;
  }

  .fab-container.is-mobile .fab-tooltip {
    display: none;
  }

  .fab-container.is-mobile .panel,
  .fab-container.is-mobile .theme-panel,
  .fab-container.is-mobile .stats-panel,
  .fab-container.is-mobile .contact-panel,
  .fab-container.is-mobile .tech-panel,
  .fab-container.is-mobile .language-panel,
  .fab-container.is-mobile .intro-panel,
  .fab-container.is-mobile .nav-panel,
  .fab-container.is-mobile .pages-panel {
    position: fixed;
    left: 50%;
    right: auto;
    top: auto;
    bottom: 16px;
    width: min(370px, calc(100vw - 28px));
    min-width: 0;
    max-width: calc(100vw - 28px);
    max-height: min(560px, calc(100vh - 92px));
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.985);
    border: 1px solid rgba(226, 232, 240, 0.95);
    box-shadow:
      0 24px 70px rgba(15, 23, 42, 0.28),
      0 8px 20px rgba(15, 23, 42, 0.12);
    backdrop-filter: blur(18px);
    transform: translateX(-50%);
    z-index: 320;
  }

  html[data-theme="dark"] .fab-container.is-mobile .panel,
  html[data-theme="dark"] .fab-container.is-mobile .theme-panel,
  html[data-theme="dark"] .fab-container.is-mobile .stats-panel,
  html[data-theme="dark"] .fab-container.is-mobile .contact-panel,
  html[data-theme="dark"] .fab-container.is-mobile .tech-panel,
  html[data-theme="dark"] .fab-container.is-mobile .language-panel,
  html[data-theme="dark"] .fab-container.is-mobile .intro-panel,
  html[data-theme="dark"] .fab-container.is-mobile .nav-panel,
  html[data-theme="dark"] .fab-container.is-mobile .pages-panel,
  html[data-theme="midnight"] .fab-container.is-mobile .panel,
  html[data-theme="midnight"] .fab-container.is-mobile .theme-panel,
  html[data-theme="midnight"] .fab-container.is-mobile .stats-panel,
  html[data-theme="midnight"] .fab-container.is-mobile .contact-panel,
  html[data-theme="midnight"] .fab-container.is-mobile .tech-panel,
  html[data-theme="midnight"] .fab-container.is-mobile .language-panel,
  html[data-theme="midnight"] .fab-container.is-mobile .intro-panel,
  html[data-theme="midnight"] .fab-container.is-mobile .nav-panel,
  html[data-theme="midnight"] .fab-container.is-mobile .pages-panel,
  html[data-theme="forest"] .fab-container.is-mobile .panel,
  html[data-theme="forest"] .fab-container.is-mobile .theme-panel,
  html[data-theme="forest"] .fab-container.is-mobile .stats-panel,
  html[data-theme="forest"] .fab-container.is-mobile .contact-panel,
  html[data-theme="forest"] .fab-container.is-mobile .tech-panel,
  html[data-theme="forest"] .fab-container.is-mobile .language-panel,
  html[data-theme="forest"] .fab-container.is-mobile .intro-panel,
  html[data-theme="forest"] .fab-container.is-mobile .nav-panel,
  html[data-theme="forest"] .fab-container.is-mobile .pages-panel {
    background: rgba(15, 23, 42, 0.985);
    border-color: rgba(255, 255, 255, 0.12);
  }

  .fab-container.is-mobile .panel-head {
    flex: 0 0 auto;
    min-height: 62px;
    padding: 16px 18px;
    background: transparent;
    border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  }

  html[data-theme="dark"] .fab-container.is-mobile .panel-head,
  html[data-theme="midnight"] .fab-container.is-mobile .panel-head,
  html[data-theme="forest"] .fab-container.is-mobile .panel-head {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .fab-container.is-mobile .panel-head span {
    color: #64748b;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.16em;
  }

  html[data-theme="dark"] .fab-container.is-mobile .panel-head span,
  html[data-theme="midnight"] .fab-container.is-mobile .panel-head span,
  html[data-theme="forest"] .fab-container.is-mobile .panel-head span {
    color: rgba(248, 250, 252, 0.62);
  }

  .fab-container.is-mobile .panel-close {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    color: #64748b;
    background: rgba(241, 245, 249, 0.95);
  }

  html[data-theme="dark"] .fab-container.is-mobile .panel-close,
  html[data-theme="midnight"] .fab-container.is-mobile .panel-close,
  html[data-theme="forest"] .fab-container.is-mobile .panel-close {
    color: rgba(248, 250, 252, 0.78);
    background: rgba(255, 255, 255, 0.08);
  }

  .fab-container.is-mobile .panel-body,
  .fab-container.is-mobile .stats-body,
  .fab-container.is-mobile .pages-body,
  .fab-container.is-mobile .tech-body,
  .fab-container.is-mobile .intro-body {
    flex: 1 1 auto;
    max-height: none;
    overflow-y: auto;
    padding: 16px;
    gap: 12px;
  }

  .fab-container.is-mobile .theme-btn,
  .fab-container.is-mobile .contact-row,
  .fab-container.is-mobile .stat-card,
  .fab-container.is-mobile .nav-row,
  .fab-container.is-mobile .page-link,
  .fab-container.is-mobile .hire-card,
  .fab-container.is-mobile .language-btn {
    min-height: 64px;
    padding: 12px 13px;
    border-radius: 16px;
    background: rgba(248, 250, 252, 0.94);
    border: 1px solid rgba(226, 232, 240, 0.95);
    box-shadow: none;
  }

  html[data-theme="dark"] .fab-container.is-mobile .theme-btn,
  html[data-theme="dark"] .fab-container.is-mobile .contact-row,
  html[data-theme="dark"] .fab-container.is-mobile .stat-card,
  html[data-theme="dark"] .fab-container.is-mobile .nav-row,
  html[data-theme="dark"] .fab-container.is-mobile .page-link,
  html[data-theme="dark"] .fab-container.is-mobile .hire-card,
  html[data-theme="dark"] .fab-container.is-mobile .language-btn,
  html[data-theme="midnight"] .fab-container.is-mobile .theme-btn,
  html[data-theme="midnight"] .fab-container.is-mobile .contact-row,
  html[data-theme="midnight"] .fab-container.is-mobile .stat-card,
  html[data-theme="midnight"] .fab-container.is-mobile .nav-row,
  html[data-theme="midnight"] .fab-container.is-mobile .page-link,
  html[data-theme="midnight"] .fab-container.is-mobile .hire-card,
  html[data-theme="midnight"] .fab-container.is-mobile .language-btn,
  html[data-theme="forest"] .fab-container.is-mobile .theme-btn,
  html[data-theme="forest"] .fab-container.is-mobile .contact-row,
  html[data-theme="forest"] .fab-container.is-mobile .stat-card,
  html[data-theme="forest"] .fab-container.is-mobile .nav-row,
  html[data-theme="forest"] .fab-container.is-mobile .page-link,
  html[data-theme="forest"] .fab-container.is-mobile .hire-card,
  html[data-theme="forest"] .fab-container.is-mobile .language-btn {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .fab-container.is-mobile .theme-btn:hover,
  .fab-container.is-mobile .contact-row:hover,
  .fab-container.is-mobile .stat-card:hover,
  .fab-container.is-mobile .nav-row:hover,
  .fab-container.is-mobile .page-link:hover,
  .fab-container.is-mobile .language-btn:hover {
    transform: none;
  }

  .fab-container.is-mobile .page-link {
    grid-template-columns: 42px minmax(0, 1fr) 16px;
  }

  .fab-container.is-mobile .page-icon,
  .fab-container.is-mobile .contact-icon,
  .fab-container.is-mobile .stat-icon-wrap,
  .fab-container.is-mobile .theme-swatch,
  .fab-container.is-mobile .nav-icon {
    width: 42px;
    height: 42px;
    border-radius: 15px;
  }

  .fab-container.is-mobile .page-info strong,
  .fab-container.is-mobile .contact-title,
  .fab-container.is-mobile .stat-value,
  .fab-container.is-mobile .theme-name,
  .fab-container.is-mobile .nav-title,
  .fab-container.is-mobile .hire-title,
  .fab-container.is-mobile .language-name {
    color: #0f172a;
    font-size: 0.86rem;
    font-weight: 900;
  }

  .fab-container.is-mobile .page-info small,
  .fab-container.is-mobile .contact-sub,
  .fab-container.is-mobile .stat-label,
  .fab-container.is-mobile .nav-sub,
  .fab-container.is-mobile .hire-sub {
    color: #64748b;
    font-size: 0.72rem;
    line-height: 1.25;
  }

  html[data-theme="dark"] .fab-container.is-mobile .page-info strong,
  html[data-theme="dark"] .fab-container.is-mobile .contact-title,
  html[data-theme="dark"] .fab-container.is-mobile .stat-value,
  html[data-theme="dark"] .fab-container.is-mobile .theme-name,
  html[data-theme="dark"] .fab-container.is-mobile .nav-title,
  html[data-theme="dark"] .fab-container.is-mobile .hire-title,
  html[data-theme="dark"] .fab-container.is-mobile .language-name,
  html[data-theme="midnight"] .fab-container.is-mobile .page-info strong,
  html[data-theme="midnight"] .fab-container.is-mobile .contact-title,
  html[data-theme="midnight"] .fab-container.is-mobile .stat-value,
  html[data-theme="midnight"] .fab-container.is-mobile .theme-name,
  html[data-theme="midnight"] .fab-container.is-mobile .nav-title,
  html[data-theme="midnight"] .fab-container.is-mobile .hire-title,
  html[data-theme="midnight"] .fab-container.is-mobile .language-name,
  html[data-theme="forest"] .fab-container.is-mobile .page-info strong,
  html[data-theme="forest"] .fab-container.is-mobile .contact-title,
  html[data-theme="forest"] .fab-container.is-mobile .stat-value,
  html[data-theme="forest"] .fab-container.is-mobile .theme-name,
  html[data-theme="forest"] .fab-container.is-mobile .nav-title,
  html[data-theme="forest"] .fab-container.is-mobile .hire-title,
  html[data-theme="forest"] .fab-container.is-mobile .language-name {
    color: #f8fafc;
  }

  html[data-theme="dark"] .fab-container.is-mobile .page-info small,
  html[data-theme="dark"] .fab-container.is-mobile .contact-sub,
  html[data-theme="dark"] .fab-container.is-mobile .stat-label,
  html[data-theme="dark"] .fab-container.is-mobile .nav-sub,
  html[data-theme="dark"] .fab-container.is-mobile .hire-sub,
  html[data-theme="midnight"] .fab-container.is-mobile .page-info small,
  html[data-theme="midnight"] .fab-container.is-mobile .contact-sub,
  html[data-theme="midnight"] .fab-container.is-mobile .stat-label,
  html[data-theme="midnight"] .fab-container.is-mobile .nav-sub,
  html[data-theme="midnight"] .fab-container.is-mobile .hire-sub,
  html[data-theme="forest"] .fab-container.is-mobile .page-info small,
  html[data-theme="forest"] .fab-container.is-mobile .contact-sub,
  html[data-theme="forest"] .fab-container.is-mobile .stat-label,
  html[data-theme="forest"] .fab-container.is-mobile .nav-sub,
  html[data-theme="forest"] .fab-container.is-mobile .hire-sub {
    color: rgba(248, 250, 252, 0.62);
  }

  .fab-container.is-mobile .tech-grid {
    gap: 8px;
  }

  .fab-container.is-mobile .tech-pill {
    padding: 8px 11px;
    color: #334155;
    background: rgba(248, 250, 252, 0.94);
    border: 1px solid rgba(226, 232, 240, 0.95);
    font-size: 0.74rem;
    font-weight: 900;
  }

  html[data-theme="dark"] .fab-container.is-mobile .tech-pill,
  html[data-theme="midnight"] .fab-container.is-mobile .tech-pill,
  html[data-theme="forest"] .fab-container.is-mobile .tech-pill {
    color: rgba(248, 250, 252, 0.78);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .fab-container.is-mobile .stats-top-note {
    margin: 0 0 2px;
    font-size: 0.72rem;
    line-height: 1.35;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
  }

  .fab-container.is-mobile .stat-badge {
    padding: 4px 7px;
    font-size: 0.58rem;
  }

  .fab-container.is-mobile .panel-appear-enter-active,
  .fab-container.is-mobile .panel-appear-leave-active {
    transition:
      opacity 0.22s ease,
      transform 0.22s ease;
  }

  .fab-container.is-mobile .panel-appear-enter-from,
  .fab-container.is-mobile .panel-appear-leave-to {
    opacity: 0;
    transform: translate(-50%, 18px) !important;
  }

  .fab-container.is-mobile .panel-appear-enter-to,
  .fab-container.is-mobile .panel-appear-leave-from {
    opacity: 1;
    transform: translate(-50%, 0) !important;
  }
}

@media (max-width: 390px) {
  .fab-container.is-mobile .panel,
  .fab-container.is-mobile .theme-panel,
  .fab-container.is-mobile .stats-panel,
  .fab-container.is-mobile .contact-panel,
  .fab-container.is-mobile .tech-panel,
  .fab-container.is-mobile .language-panel,
  .fab-container.is-mobile .intro-panel,
  .fab-container.is-mobile .nav-panel,
  .fab-container.is-mobile .pages-panel {
    bottom: 12px;
    width: calc(100vw - 20px);
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 82px);
    border-radius: 20px;
  }

  .fab-container.is-mobile .panel-body,
  .fab-container.is-mobile .stats-body,
  .fab-container.is-mobile .pages-body,
  .fab-container.is-mobile .tech-body,
  .fab-container.is-mobile .intro-body {
    padding: 14px;
  }

  .fab-container.is-mobile .page-link,
  .fab-container.is-mobile .contact-row,
  .fab-container.is-mobile .stat-card,
  .fab-container.is-mobile .theme-btn,
  .fab-container.is-mobile .language-btn {
    min-height: 62px;
    padding: 11px;
  }
}
</style>