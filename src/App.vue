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
.pages-panel {
  width: 330px;
}

.pages-body {
  display: grid;
  gap: 9px;
  max-height: 420px;
  overflow-y: auto;
  padding-right: 2px;
}

.page-link {
  display: grid;
  grid-template-columns: 38px 1fr 16px;
  align-items: center;
  gap: 11px;
  padding: 11px;
  border-radius: 15px;
  color: var(--text-primary, #0f172a);
  text-decoration: none;
  background: rgba(15, 23, 42, 0.045);
  border: 1px solid rgba(15, 23, 42, 0.07);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}

.page-link:hover {
  transform: translateX(-2px);
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.page-link.admin {
  background: rgba(15, 23, 42, 0.08);
  border-color: rgba(34, 197, 94, 0.22);
}

.page-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: #052e16;
  background: #86efac;
  font-size: 0.9rem;
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
  color: var(--text-primary, #0f172a);
  font-size: 0.82rem;
  font-weight: 900;
  line-height: 1.15;
}

.page-info small {
  display: block;
  margin-top: 3px;
  color: var(--text-secondary, #64748b);
  font-size: 0.68rem;
  line-height: 1.2;
}

.page-arrow {
  color: var(--accent-color, #16a34a);
  font-size: 0.72rem;
}

[data-theme="midnight"] .page-link,
[data-theme="forest"] .page-link {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.09);
}

[data-theme="midnight"] .page-info strong,
[data-theme="forest"] .page-info strong {
  color: #f8fafc;
}

[data-theme="midnight"] .page-info small,
[data-theme="forest"] .page-info small {
  color: rgba(248, 250, 252, 0.62);
}

@media (max-width: 640px) {
  .pages-panel {
    width: min(360px, calc(100vw - 28px));
  }

  .pages-body {
    max-height: 58vh;
  }

  .page-link {
    grid-template-columns: 36px 1fr 14px;
    gap: 10px;
    padding: 10px;
  }

  .page-icon {
    width: 36px;
    height: 36px;
    border-radius: 13px;
  }

  .page-info strong {
    font-size: 0.78rem;
  }

  .page-info small {
    font-size: 0.66rem;
  }
}
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;600;700&display=swap");

/* ===== ROOT THEME VARIABLES ===== */
:root {
  --bg: #f8fafc;
  --surface: #ffffff;
  --surface-hover: #f1f5f9;
  --text: #0f172a;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  --radius: 16px;
  --radius-sm: 12px;
  --radius-lg: 24px;
}

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
    sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ===== THEMES ===== */
html[data-theme="dark"],
html[data-theme="dark"] body {
  --bg: #020617;
  --surface: #0f172a;
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
  --surface-hover: #065f46;
  --text: #ecfdf5;
  --text-secondary: #6ee7b7;
  --text-muted: #34d399;
  --border: #065f46;
}

html[data-theme="sunset"],
html[data-theme="sunset"] body {
  --bg: #1c0a00;
  --surface: #431407;
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
  --surface-hover: #4c1d95;
  --text: #faf5ff;
  --text-secondary: #c4b5fd;
  --text-muted: #a78bfa;
  --border: #4c1d95;
}

/* ===== FAB CONTAINER ===== */
.fab-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;
}

.fab-container.is-open {
  z-index: 120;
}

.fab-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: -1;
  overflow: hidden;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab-trigger {
  position: relative;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  cursor: pointer;
  box-shadow:
    0 8px 24px -4px rgba(99, 102, 241, 0.4),
    0 4px 12px -2px rgba(99, 102, 241, 0.2);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fab-trigger::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.3;
  z-index: -1;
  transition: opacity 0.3s;
}

.fab-trigger:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px -4px rgba(99, 102, 241, 0.5);
}

.fab-trigger:hover::after {
  opacity: 0.5;
}

.fab-trigger.active {
  background: linear-gradient(135deg, #ef4444, #f97316);
  transform: rotate(45deg);
  box-shadow: 0 8px 24px -4px rgba(239, 68, 68, 0.4);
}

.fab-trigger.active::after {
  background: linear-gradient(135deg, #ef4444, #f97316);
}

.fab-action,
.scroll-top {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-action {
  position: relative;
}

.fab-action:hover,
.scroll-top:hover {
  transform: scale(1.08);
  background: var(--surface-hover);
  color: var(--accent);
  border-color: var(--accent);
  box-shadow: var(--shadow-lg);
}

.scroll-top {
  margin-top: 12px;
  box-shadow: var(--shadow-lg);
}

.scroll-top:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -4px rgba(99, 102, 241, 0.3);
}

.trigger-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.trigger-icon svg {
  width: 100%;
  height: 100%;
}

.fab-icon {
  width: 22px;
  height: 22px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.scroll-top svg {
  width: 20px;
  height: 20px;
}

.trigger-pulse {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid #ffffff;
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.fab-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  background: #ef4444;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  border: 2px solid var(--surface);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab-tooltip {
  position: absolute;
  right: 64px;
  background: var(--text);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateX(6px);
  transition: all 0.2s ease;
  box-shadow: var(--shadow);
}

.fab-action:hover .fab-tooltip {
  opacity: 1;
  transform: translateX(0);
}

/* ===== PANELS ===== */
.panel {
  position: absolute;
  right: 64px;
  bottom: -6px;
  z-index: 10;
  min-width: 220px;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-xl);
}

.theme-panel,
.stats-panel,
.contact-panel,
.tech-panel,
.language-panel,
.intro-panel,
.nav-panel {
  width: 292px;
  min-width: 292px;
  overflow: hidden;
  border-radius: 20px;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
  box-shadow:
    0 20px 45px rgba(15, 23, 42, 0.14),
    0 8px 18px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
}

.panel-head {
  min-height: 52px;
  padding: 14px 16px;
  background: color-mix(in srgb, var(--surface-hover) 42%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-head span {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.panel-close {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--surface-hover);
  color: var(--text-secondary);
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.panel-close:hover {
  background: var(--border);
  color: var(--text);
}

.panel-close svg {
  width: 14px;
  height: 14px;
}

.panel-body,
.stats-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 360px;
  overflow-y: auto;
}

/* ===== LANGUAGE PANEL ===== */
.language-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text);
  padding: 12px;
  border-radius: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  text-align: left;
}

.language-btn:hover {
  background: var(--surface-hover);
}

.language-btn.active {
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent);
  font-weight: 800;
}

.language-flag {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-hover);
  color: var(--text);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.language-name {
  flex: 1;
  font-size: 0.88rem;
  font-weight: 700;
}

/* ===== QUICK INTRO PANEL ===== */
.intro-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.intro-avatar {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
}

.intro-avatar span {
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.04em;
}

.intro-content h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 900;
  color: var(--text);
}

.intro-content p {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

.intro-btn {
  width: 100%;
  border: none;
  border-radius: 14px;
  background: var(--accent);
  color: #ffffff;
  padding: 11px 14px;
  font-size: 0.85rem;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all 0.2s ease;
}

.intro-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

/* ===== CARD ROW SYSTEM ===== */
.theme-btn,
.contact-row,
.stat-card,
.nav-row {
  min-height: 62px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  background: color-mix(in srgb, var(--surface) 88%, var(--surface-hover) 12%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.45) inset;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.theme-btn:hover,
.contact-row:hover,
.stat-card:hover,
.nav-row:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--surface-hover) 72%, var(--surface) 28%);
  border-color: color-mix(in srgb, var(--accent) 34%, var(--border));
  box-shadow:
    0 10px 22px rgba(15, 23, 42, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.5) inset;
}

/* ===== THEME BUTTONS ===== */
.theme-btn {
  width: 100%;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text);
  font-family: inherit;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-btn.active {
  background: color-mix(in srgb, var(--accent) 12%, var(--surface));
  border-color: color-mix(in srgb, var(--accent) 34%, var(--border));
  color: var(--accent);
}

.theme-swatch {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  flex-shrink: 0;
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.45),
    0 2px 8px rgba(15, 23, 42, 0.08);
}

.theme-name {
  flex: 1;
  font-size: 0.86rem;
  font-weight: 750;
  line-height: 1.15;
  color: var(--text);
}

.check-icon {
  width: 17px;
  height: 17px;
  color: var(--accent);
}

/* ===== STATS PANEL ===== */
.stats-panel {
  width: 292px;
  overflow: hidden;
}

.stats-body {
  gap: 10px;
}

.stats-top-note {
  display: block;
  margin: 0 0 7px;
  max-width: 100%;
  color: #64748b;
  font-size: 9.3px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
    var(--surface);
  border-color: rgba(99, 102, 241, 0.26);
}

.stat-coming {
  background: color-mix(in srgb, var(--surface-hover) 46%, var(--surface) 54%);
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
  gap: 3px;
}

.stat-value,
.stat-value.muted-text,
.contact-title,
.nav-title {
  font-size: 0.86rem;
  font-weight: 750;
  line-height: 1.15;
  color: var(--text);
}

.stat-label,
.contact-sub,
.nav-sub {
  font-size: 0.72rem;
  line-height: 1.2;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-icon-wrap,
.contact-icon,
.nav-icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.stat-icon-wrap svg,
.contact-icon svg,
.nav-icon svg {
  width: 18px;
  height: 18px;
  color: currentColor;
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

.stat-icon-wrap.orange {
  color: #f97316;
  background: rgba(249, 115, 22, 0.14);
}

.stat-icon-wrap.dark {
  color: #0f172a;
  background: rgba(15, 23, 42, 0.1);
}

.stat-icon-wrap.muted {
  color: #64748b;
  background: rgba(100, 116, 139, 0.12);
}

.stat-badge {
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stat-badge.live {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.11);
}

.stat-badge.soon {
  color: #64748b;
  background: rgba(100, 116, 139, 0.12);
}

.stat-live {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 2px;
  padding: 9px 10px;
  border-radius: 999px;
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(248, 250, 252, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
}

/* ===== CONTACT PANEL ===== */
.contact-row {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-row.resume {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent),
    color-mix(in srgb, var(--surface) 90%, var(--surface-hover) 10%);
}

.contact-row.resume:hover {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent),
    color-mix(in srgb, var(--surface-hover) 65%, var(--surface) 35%);
}

.contact-icon.red {
  background: rgba(239, 68, 68, 0.11);
  color: #ef4444;
}

.contact-icon.blue {
  background: rgba(59, 130, 246, 0.11);
  color: #3b82f6;
}

.contact-icon.green {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
}

.contact-icon.dark {
  background: #f8fafc;
  color: #0f172a;
}

.contact-icon.linkedin {
  background: rgba(10, 102, 194, 0.12);
  color: #0a66c2;
}

.contact-icon.facebook {
  background: rgba(24, 119, 242, 0.12);
  color: #1877f2;
}

.contact-icon.phone {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.contact-icon.location {
  background: rgba(245, 158, 11, 0.13);
  color: #f59e0b;
}

.contact-icon.accent {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}

/* ===== NAV PANEL ===== */
.nav-row {
  width: 100%;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
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
  padding: 7px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface-hover) 72%, var(--surface) 28%);
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 700;
}

.hire-card {
  padding: 14px;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(59, 130, 246, 0.08)),
    var(--surface);
  border: 1px solid rgba(99, 102, 241, 0.22);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.hire-title,
.hire-sub {
  display: block;
}

.hire-title {
  color: var(--text);
  font-size: 0.82rem;
  font-weight: 800;
}

.hire-sub {
  margin-top: 2px;
  color: var(--text-secondary);
  font-size: 0.72rem;
}

.hire-btn {
  flex-shrink: 0;
  padding: 8px 10px;
  border-radius: 999px;
  background: var(--accent);
  color: #ffffff;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(99, 102, 241, 0.24);
}

.hire-btn:hover {
  background: var(--accent-hover);
}

/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 150;
  padding: 24px;
}

.modal-box {
  background: var(--surface);
  border-radius: var(--radius);
  width: 420px;
  max-height: 560px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: modal-up 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.modal-head h3 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}

.modal-head h3 svg {
  width: 20px;
  height: 20px;
  color: var(--accent);
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--surface-hover);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: var(--border);
  color: var(--text);
}

.modal-close svg {
  width: 16px;
  height: 16px;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
}

.modal-foot {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  background: var(--bg);
}

.state-loading,
.state-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
  gap: 12px;
  font-size: 0.875rem;
}

.state-empty svg {
  width: 48px;
  height: 48px;
  color: var(--border);
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2.5px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner.small {
  width: 18px;
  height: 18px;
  border-width: 2px;
}

.msg-bubble {
  display: flex;
}

.msg-content {
  background: rgba(99, 102, 241, 0.06);
  border-radius: 16px 16px 16px 4px;
  padding: 12px 16px;
  max-width: 90%;
  border: 1px solid rgba(99, 102, 241, 0.1);
}

html[data-theme="dark"] .msg-content,
html[data-theme="midnight"] .msg-content,
html[data-theme="forest"] .msg-content,
html[data-theme="sunset"] .msg-content,
html[data-theme="purple"] .msg-content {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.2);
}

.msg-content p {
  font-size: 0.875rem;
  color: var(--text);
  line-height: 1.6;
  margin: 0 0 4px;
  word-break: break-word;
  white-space: pre-line;
}

.msg-content time {
  font-size: 0.6875rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* ===== INPUT ===== */
.input-wrap {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 8px 8px 8px 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrap:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input-wrap textarea {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-family: inherit;
  resize: none;
  outline: none;
  color: var(--text);
  line-height: 1.5;
  max-height: 120px;
  padding: 6px 0;
}

.input-wrap textarea::placeholder {
  color: var(--text-muted);
}

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
  box-shadow: var(--shadow);
}

.send-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn svg {
  width: 16px;
  height: 16px;
}

/* ===== TOAST ===== */
.toast {
  position: fixed;
  bottom: 96px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text);
  color: #ffffff;
  padding: 12px 20px;
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-xl);
  z-index: 200;
  max-width: 90vw;
  white-space: nowrap;
}

.toast-icon {
  width: 20px;
  height: 20px;
  color: #fbbf24;
  flex-shrink: 0;
}

/* ===== DARK PANEL POLISH ===== */
html[data-theme="dark"] .theme-panel,
html[data-theme="dark"] .stats-panel,
html[data-theme="dark"] .contact-panel,
html[data-theme="dark"] .tech-panel,
html[data-theme="dark"] .language-panel,
html[data-theme="dark"] .intro-panel,
html[data-theme="dark"] .nav-panel,
html[data-theme="midnight"] .theme-panel,
html[data-theme="midnight"] .stats-panel,
html[data-theme="midnight"] .contact-panel,
html[data-theme="midnight"] .tech-panel,
html[data-theme="midnight"] .language-panel,
html[data-theme="midnight"] .intro-panel,
html[data-theme="midnight"] .nav-panel,
html[data-theme="forest"] .theme-panel,
html[data-theme="forest"] .stats-panel,
html[data-theme="forest"] .contact-panel,
html[data-theme="forest"] .tech-panel,
html[data-theme="forest"] .language-panel,
html[data-theme="forest"] .intro-panel,
html[data-theme="forest"] .nav-panel,
html[data-theme="purple"] .theme-panel,
html[data-theme="purple"] .stats-panel,
html[data-theme="purple"] .contact-panel,
html[data-theme="purple"] .tech-panel,
html[data-theme="purple"] .language-panel,
html[data-theme="purple"] .intro-panel,
html[data-theme="purple"] .nav-panel {
  background: color-mix(in srgb, var(--surface) 92%, black 8%);
  box-shadow:
    0 20px 45px rgba(0, 0, 0, 0.35),
    0 8px 18px rgba(0, 0, 0, 0.22);
}

html[data-theme="dark"] .theme-btn,
html[data-theme="dark"] .contact-row,
html[data-theme="dark"] .stat-card,
html[data-theme="dark"] .nav-row,
html[data-theme="midnight"] .theme-btn,
html[data-theme="midnight"] .contact-row,
html[data-theme="midnight"] .stat-card,
html[data-theme="midnight"] .nav-row,
html[data-theme="forest"] .theme-btn,
html[data-theme="forest"] .contact-row,
html[data-theme="forest"] .stat-card,
html[data-theme="forest"] .nav-row,
html[data-theme="purple"] .theme-btn,
html[data-theme="purple"] .contact-row,
html[data-theme="purple"] .stat-card,
html[data-theme="purple"] .nav-row {
  background: color-mix(in srgb, var(--surface-hover) 38%, var(--surface) 62%);
  box-shadow: none;
}

/* ===== SCROLLBAR ===== */
.modal-body::-webkit-scrollbar,
.panel-body::-webkit-scrollbar {
  width: 4px;
}

.modal-body::-webkit-scrollbar-thumb,
.panel-body::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

/* ===== ANIMATIONS ===== */
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}

.fab-reveal-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: calc(var(--delay, 0) * 0.05s);
}

.fab-reveal-leave-active {
  transition: all 0.2s ease;
}

.fab-reveal-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.6);
}

.fab-reveal-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.8);
}

.panel-appear-enter-active {
  animation: panel-in 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-appear-leave-active {
  animation: panel-in 0.2s ease reverse;
}

.fade-up-enter-active,
.fade-up-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.9);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 16px) scale(0.92);
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateX(-8px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes modal-up {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes live-blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

@keyframes pulse-ring {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
  }

  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
  }
}

/* ===== MOBILE ===== */
@media (max-width: 640px) {
  .fab-container {
    right: max(16px, env(safe-area-inset-right));
    bottom: max(16px, env(safe-area-inset-bottom));
    z-index: 90;
  }

  .fab-container.is-open {
    z-index: 120;
  }

  .fab-trigger,
  .fab-action,
  .scroll-top {
    width: 52px;
    height: 52px;
  }

  .fab-icon {
    width: 20px;
    height: 20px;
  }

  .fab-tooltip {
    display: none !important;
  }

  .scroll-top {
    margin-top: 10px;
  }

  .scroll-top svg {
    width: 18px;
    height: 18px;
  }

  .fab-actions {
    max-height: calc(100dvh - 120px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 4px 2px;
    scrollbar-width: none;
  }

  .fab-actions::-webkit-scrollbar {
    display: none;
  }

  .panel-mobile {
    position: fixed !important;
    left: 10px !important;
    right: 10px !important;
    bottom: 0 !important;
    width: auto !important;
    max-width: calc(100vw - 20px) !important;
    max-height: 72dvh !important;
    overflow: hidden !important;
    border-radius: 22px 22px 0 0 !important;
    animation: sheet-up 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  .panel-mobile .panel-body {
    max-height: calc(72dvh - 64px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .panel-mobile .panel-head {
    padding: 18px 20px;
    font-size: 0.8125rem;
  }

  .panel-close {
    display: flex !important;
  }

  .theme-panel,
  .stats-panel,
  .contact-panel,
  .tech-panel,
  .language-panel,
  .intro-panel,
  .nav-panel {
    width: 100% !important;
    min-width: 100% !important;
  }

  .panel-body,
  .stats-body {
    padding: 14px;
    gap: 10px;
  }

  .theme-btn,
  .contact-row,
  .stat-card,
  .nav-row {
    min-height: 64px;
    padding: 12px 14px;
  }

  .intro-body {
    padding: 20px;
  }

  .intro-avatar {
    width: 56px;
    height: 56px;
  }

  .intro-content h3 {
    font-size: 1.05rem;
  }

  .intro-content p {
    font-size: 0.92rem;
  }

  .intro-btn {
    padding: 13px 16px;
    font-size: 0.9rem;
  }

  .language-btn {
    padding: 14px 16px;
  }

  .stats-top-note {
    margin-bottom: 6px;
    font-size: 8.8px;
  }

  .modal-overlay,
  .feedback-overlay {
    z-index: 9999 !important;
    overflow: hidden;
    padding: 0;
    align-items: flex-end;
    justify-content: center;
  }

  .modal-box,
  .modal-mobile,
  .feedback-modal {
    width: calc(100vw - 24px) !important;
    max-width: calc(100vw - 24px) !important;
    max-height: 86dvh !important;
    overflow: hidden !important;
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .modal-body,
  .feedback-body {
    max-height: 58dvh !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }

  .modal-mobile .modal-head {
    padding: 18px 20px;
  }

  .modal-mobile .modal-body {
    padding: 16px 20px;
    max-height: 55vh;
  }

  .modal-mobile .modal-foot {
    padding: 12px 16px;
  }

  .input-wrap textarea {
    font-size: 16px;
  }

  .toast-mobile {
    bottom: 84px;
    font-size: 0.8125rem;
    padding: 10px 16px;
  }

  body:has(.modal-overlay) .fab-container,
  body:has(.feedback-overlay) .fab-container,
  body:has(.mobile-modal-overlay) .fab-container {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  @keyframes sheet-up {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0);
    }
  }
}

/* ===== TABLET ===== */
@media (min-width: 641px) and (max-width: 768px) {
  .modal-box {
    width: 90%;
    max-width: 440px;
  }

  .panel {
    max-width: 280px;
  }
}

/* ===== TOUCH ===== */
@media (hover: none) and (pointer: coarse) {
  .fab-action,
  .fab-trigger,
  .scroll-top {
    min-width: 44px;
    min-height: 44px;
  }

  .theme-btn,
  .contact-row,
  .stat-item,
  .stat-card,
  .nav-row {
    min-height: 48px;
  }

  .fab-action:hover:not(.disabled) {
    transform: none;
    background: var(--surface);
    color: var(--text-secondary);
  }

  .fab-trigger:hover {
    transform: none;
  }

  .fab-trigger:active {
    transform: scale(0.95);
  }
}

/* ===== FINAL OVERRIDE: MIDNIGHT + FOREST FAB VISIBILITY FIX ===== */
html[data-theme="midnight"] .fab-action,
html[data-theme="midnight"] .scroll-top {
  background: #e0f2fe !important;
  color: #0f172a !important;
  border: 1px solid rgba(56, 189, 248, 0.65) !important;
  box-shadow:
    0 14px 30px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.18) !important;
}

html[data-theme="forest"] .fab-action,
html[data-theme="forest"] .scroll-top {
  background: #ecfdf5 !important;
  color: #064e3b !important;
  border: 1px solid rgba(110, 231, 183, 0.75) !important;
  box-shadow:
    0 14px 30px rgba(0, 0, 0, 0.42),
    0 0 0 1px rgba(255, 255, 255, 0.18) !important;
}

html[data-theme="midnight"] .fab-action:hover,
html[data-theme="midnight"] .scroll-top:hover {
  background: #38bdf8 !important;
  color: #ffffff !important;
  border-color: #7dd3fc !important;
}

html[data-theme="forest"] .fab-action:hover,
html[data-theme="forest"] .scroll-top:hover {
  background: #10b981 !important;
  color: #ffffff !important;
  border-color: #a7f3d0 !important;
}

html[data-theme="midnight"] .fab-action svg,
html[data-theme="midnight"] .scroll-top svg,
html[data-theme="midnight"] .fab-icon {
  color: #0f172a !important;
  stroke: currentColor !important;
}

html[data-theme="forest"] .fab-action svg,
html[data-theme="forest"] .scroll-top svg,
html[data-theme="forest"] .fab-icon {
  color: #064e3b !important;
  stroke: currentColor !important;
}

html[data-theme="midnight"] .fab-action:hover svg,
html[data-theme="midnight"] .scroll-top:hover svg,
html[data-theme="midnight"] .fab-action:hover .fab-icon,
html[data-theme="forest"] .fab-action:hover svg,
html[data-theme="forest"] .scroll-top:hover svg,
html[data-theme="forest"] .fab-action:hover .fab-icon {
  color: #ffffff !important;
  stroke: currentColor !important;
}

html[data-theme="midnight"] .fab-trigger {
  background: linear-gradient(135deg, #38bdf8, #6366f1) !important;
  color: #ffffff !important;
  border: 1px solid rgba(224, 242, 254, 0.4) !important;
  box-shadow:
    0 16px 34px rgba(56, 189, 248, 0.28),
    0 8px 22px rgba(0, 0, 0, 0.45) !important;
}

html[data-theme="forest"] .fab-trigger {
  background: linear-gradient(135deg, #10b981, #047857) !important;
  color: #ffffff !important;
  border: 1px solid rgba(209, 250, 229, 0.45) !important;
  box-shadow:
    0 16px 34px rgba(16, 185, 129, 0.28),
    0 8px 22px rgba(0, 0, 0, 0.45) !important;
}

html[data-theme="midnight"] .fab-trigger.active,
html[data-theme="forest"] .fab-trigger.active {
  background: linear-gradient(135deg, #ef4444, #f97316) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.35) !important;
}

html[data-theme="midnight"] .panel,
html[data-theme="midnight"] .theme-panel,
html[data-theme="midnight"] .stats-panel,
html[data-theme="midnight"] .contact-panel,
html[data-theme="midnight"] .tech-panel,
html[data-theme="midnight"] .language-panel,
html[data-theme="midnight"] .intro-panel,
html[data-theme="midnight"] .nav-panel {
  background: #0f172a !important;
  border: 1px solid rgba(125, 211, 252, 0.35) !important;
  color: #f8fafc !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55) !important;
}

html[data-theme="forest"] .panel,
html[data-theme="forest"] .theme-panel,
html[data-theme="forest"] .stats-panel,
html[data-theme="forest"] .contact-panel,
html[data-theme="forest"] .tech-panel,
html[data-theme="forest"] .language-panel,
html[data-theme="forest"] .intro-panel,
html[data-theme="forest"] .nav-panel {
  background: #022c22 !important;
  border: 1px solid rgba(110, 231, 183, 0.38) !important;
  color: #ecfdf5 !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5) !important;
}

html[data-theme="midnight"] .panel-head,
html[data-theme="forest"] .panel-head {
  color: #ffffff !important;
  border-bottom-color: rgba(255, 255, 255, 0.14) !important;
}

html[data-theme="midnight"] .panel-head span,
html[data-theme="forest"] .panel-head span {
  color: #ffffff !important;
}

html[data-theme="midnight"] .theme-btn,
html[data-theme="midnight"] .contact-row,
html[data-theme="midnight"] .stat-card,
html[data-theme="midnight"] .nav-row,
html[data-theme="forest"] .theme-btn,
html[data-theme="forest"] .contact-row,
html[data-theme="forest"] .stat-card,
html[data-theme="forest"] .nav-row {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: none !important;
}

html[data-theme="midnight"] .theme-btn:hover,
html[data-theme="midnight"] .contact-row:hover,
html[data-theme="midnight"] .stat-card:hover,
html[data-theme="midnight"] .nav-row:hover,
html[data-theme="forest"] .theme-btn:hover,
html[data-theme="forest"] .contact-row:hover,
html[data-theme="forest"] .stat-card:hover,
html[data-theme="forest"] .nav-row:hover {
  background: rgba(255, 255, 255, 0.14) !important;
}

html[data-theme="midnight"] .theme-btn.active {
  background: rgba(56, 189, 248, 0.24) !important;
  border-color: rgba(56, 189, 248, 0.65) !important;
  color: #ffffff !important;
}

html[data-theme="forest"] .theme-btn.active {
  background: rgba(16, 185, 129, 0.26) !important;
  border-color: rgba(110, 231, 183, 0.72) !important;
  color: #ffffff !important;
}

html[data-theme="midnight"] .theme-name,
html[data-theme="midnight"] .contact-title,
html[data-theme="midnight"] .contact-sub,
html[data-theme="midnight"] .stat-value,
html[data-theme="midnight"] .stat-label,
html[data-theme="midnight"] .nav-title,
html[data-theme="midnight"] .nav-sub,
html[data-theme="midnight"] .tech-pill,
html[data-theme="midnight"] .hire-title,
html[data-theme="midnight"] .hire-sub,
html[data-theme="forest"] .theme-name,
html[data-theme="forest"] .contact-title,
html[data-theme="forest"] .contact-sub,
html[data-theme="forest"] .stat-value,
html[data-theme="forest"] .stat-label,
html[data-theme="forest"] .nav-title,
html[data-theme="forest"] .nav-sub,
html[data-theme="forest"] .tech-pill,
html[data-theme="forest"] .hire-title,
html[data-theme="forest"] .hire-sub {
  color: #ffffff !important;
}

html[data-theme="midnight"] .stats-top-note,
html[data-theme="forest"] .stats-top-note {
  color: rgba(255, 255, 255, 0.72) !important;
}

html[data-theme="midnight"] .check-icon {
  color: #7dd3fc !important;
}

html[data-theme="forest"] .check-icon {
  color: #a7f3d0 !important;
}

html[data-theme="midnight"] .fab-tooltip,
html[data-theme="forest"] .fab-tooltip {
  background: #ffffff !important;
  color: #0f172a !important;
}

@media (max-width: 640px) {
  html[data-theme="midnight"] .fab-action,
  html[data-theme="midnight"] .scroll-top {
    background: #e0f2fe !important;
    color: #0f172a !important;
  }

  html[data-theme="forest"] .fab-action,
  html[data-theme="forest"] .scroll-top {
    background: #ecfdf5 !important;
    color: #064e3b !important;
  }

  html[data-theme="midnight"] .fab-icon,
  html[data-theme="midnight"] .scroll-top svg {
    color: #0f172a !important;
    stroke: currentColor !important;
  }

  html[data-theme="forest"] .fab-icon,
  html[data-theme="forest"] .scroll-top svg {
    color: #064e3b !important;
    stroke: currentColor !important;
  }
}

/* ===== FINAL FIX: FAB PANEL TEXT VISIBILITY ON ALL THEMES ===== */

/* Panel header names */
html[data-theme="midnight"] .panel-head span,
html[data-theme="forest"] .panel-head span,
html[data-theme="dark"] .panel-head span,
html[data-theme="purple"] .panel-head span,
html[data-theme="sunset"] .panel-head span {
  color: #ffffff !important;
}

/* Theme names */
html[data-theme="midnight"] .theme-name,
html[data-theme="forest"] .theme-name,
html[data-theme="dark"] .theme-name,
html[data-theme="purple"] .theme-name,
html[data-theme="sunset"] .theme-name {
  color: #ffffff !important;
}

/* Stats names and values */
html[data-theme="midnight"] .stat-value,
html[data-theme="midnight"] .stat-label,
html[data-theme="forest"] .stat-value,
html[data-theme="forest"] .stat-label,
html[data-theme="dark"] .stat-value,
html[data-theme="dark"] .stat-label,
html[data-theme="purple"] .stat-value,
html[data-theme="purple"] .stat-label,
html[data-theme="sunset"] .stat-value,
html[data-theme="sunset"] .stat-label {
  color: #ffffff !important;
}

/* Contact names */
html[data-theme="midnight"] .contact-title,
html[data-theme="midnight"] .contact-sub,
html[data-theme="forest"] .contact-title,
html[data-theme="forest"] .contact-sub,
html[data-theme="dark"] .contact-title,
html[data-theme="dark"] .contact-sub,
html[data-theme="purple"] .contact-title,
html[data-theme="purple"] .contact-sub,
html[data-theme="sunset"] .contact-title,
html[data-theme="sunset"] .contact-sub {
  color: #ffffff !important;
}

/* Tech stack names */
html[data-theme="midnight"] .tech-pill,
html[data-theme="forest"] .tech-pill,
html[data-theme="dark"] .tech-pill,
html[data-theme="purple"] .tech-pill,
html[data-theme="sunset"] .tech-pill {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.18) !important;
}

/* Hire card text */
html[data-theme="midnight"] .hire-title,
html[data-theme="midnight"] .hire-sub,
html[data-theme="forest"] .hire-title,
html[data-theme="forest"] .hire-sub,
html[data-theme="dark"] .hire-title,
html[data-theme="dark"] .hire-sub,
html[data-theme="purple"] .hire-title,
html[data-theme="purple"] .hire-sub,
html[data-theme="sunset"] .hire-title,
html[data-theme="sunset"] .hire-sub {
  color: #ffffff !important;
}

/* Stats small note */
html[data-theme="midnight"] .stats-top-note,
html[data-theme="forest"] .stats-top-note,
html[data-theme="dark"] .stats-top-note,
html[data-theme="purple"] .stats-top-note,
html[data-theme="sunset"] .stats-top-note {
  color: rgba(255, 255, 255, 0.72) !important;
}

/* Active theme check icon */
html[data-theme="midnight"] .check-icon,
html[data-theme="dark"] .check-icon {
  color: #7dd3fc !important;
}

html[data-theme="forest"] .check-icon {
  color: #a7f3d0 !important;
}

html[data-theme="purple"] .check-icon {
  color: #c4b5fd !important;
}

html[data-theme="sunset"] .check-icon {
  color: #fdba74 !important;
}

/* Tooltip label beside FAB icons */
html[data-theme="midnight"] .fab-tooltip,
html[data-theme="forest"] .fab-tooltip,
html[data-theme="dark"] .fab-tooltip,
html[data-theme="purple"] .fab-tooltip,
html[data-theme="sunset"] .fab-tooltip {
  background: #ffffff !important;
  color: #0f172a !important;
  border: 1px solid rgba(15, 23, 42, 0.12) !important;
}

/* Panel cards text inside dark themes */
html[data-theme="midnight"] .theme-btn,
html[data-theme="midnight"] .contact-row,
html[data-theme="midnight"] .stat-card,
html[data-theme="forest"] .theme-btn,
html[data-theme="forest"] .contact-row,
html[data-theme="forest"] .stat-card,
html[data-theme="dark"] .theme-btn,
html[data-theme="dark"] .contact-row,
html[data-theme="dark"] .stat-card,
html[data-theme="purple"] .theme-btn,
html[data-theme="purple"] .contact-row,
html[data-theme="purple"] .stat-card,
html[data-theme="sunset"] .theme-btn,
html[data-theme="sunset"] .contact-row,
html[data-theme="sunset"] .stat-card {
  color: #ffffff !important;
}

/* Active theme button readable */
html[data-theme="midnight"] .theme-btn.active,
html[data-theme="forest"] .theme-btn.active,
html[data-theme="dark"] .theme-btn.active,
html[data-theme="purple"] .theme-btn.active,
html[data-theme="sunset"] .theme-btn.active {
  color: #ffffff !important;
}

/* Email / long text visibility */
html[data-theme="midnight"] .contact-sub,
html[data-theme="forest"] .contact-sub,
html[data-theme="dark"] .contact-sub,
html[data-theme="purple"] .contact-sub,
html[data-theme="sunset"] .contact-sub {
  opacity: 0.82 !important;
}

/* ===== FAB TOOLTIP THEME COLORS ===== */

/* Default / Light */
html[data-theme="light"] .fab-tooltip,
:root .fab-tooltip {
  background: #ffffff !important;
  color: #0f172a !important;
  border: 1px solid rgba(15, 23, 42, 0.12) !important;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14) !important;
}

/* Midnight */
html[data-theme="midnight"] .fab-tooltip {
  background: #0f172a !important;
  color: #e0f2fe !important;
  border: 1px solid rgba(125, 211, 252, 0.42) !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45) !important;
}

/* Forest */
html[data-theme="forest"] .fab-tooltip {
  background: #022c22 !important;
  color: #d1fae5 !important;
  border: 1px solid rgba(110, 231, 183, 0.45) !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.42) !important;
}

/* Dark */
html[data-theme="dark"] .fab-tooltip {
  background: #020617 !important;
  color: #f8fafc !important;
  border: 1px solid rgba(148, 163, 184, 0.35) !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45) !important;
}

/* Purple */
html[data-theme="purple"] .fab-tooltip {
  background: #2e1065 !important;
  color: #faf5ff !important;
  border: 1px solid rgba(196, 181, 253, 0.45) !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45) !important;
}

/* Sunset */
html[data-theme="sunset"] .fab-tooltip {
  background: #431407 !important;
  color: #fff7ed !important;
  border: 1px solid rgba(253, 186, 116, 0.45) !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45) !important;
}

/* Better tooltip spacing */
.fab-tooltip {
  right: 68px !important;
  z-index: 999 !important;
}

/* Optional: hide tooltip sa mobile only */
@media (max-width: 640px) {
  .fab-tooltip {
    display: none !important;
  }
}
</style>