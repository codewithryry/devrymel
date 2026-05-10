<template>
  <div>
    <!-- ===== MODERN FLOATING ACTION BUTTON ===== -->
    <div class="fab-container" :class="{ 'is-open': fabOpen, 'is-mobile': isMobile }">
      <!-- Backdrop -->
      <transition name="backdrop-fade">
        <div v-if="fabOpen && isMobile" class="fab-backdrop" @click="closeFab"></div>
      </transition>

      <!-- Action Items -->
      <transition-group name="fab-reveal" tag="div" class="fab-actions">
        <!-- Theme -->
        <div v-if="fabOpen" key="theme" class="fab-group" :style="{ '--delay': 0 }">
          <button class="fab-action" @click.stop="togglePanel('theme')" :title="t.theme">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <span class="fab-tooltip">{{ t.theme }}</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showThemePanel" class="panel theme-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>{{ t.chooseTheme }}</span>
                <button v-if="isMobile" class="panel-close" @click="showThemePanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
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
                  <svg v-if="currentTheme === theme.id" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Stats -->
        <div v-if="fabOpen" key="stats" class="fab-group" :style="{ '--delay': 1 }">
          <button class="fab-action" @click.stop="togglePanel('stats')" :title="t.stats">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 20V10M12 20V4M6 20v-6"/>
            </svg>
            <span class="fab-tooltip">{{ t.stats }}</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showStatsPanel" class="panel stats-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>{{ t.liveStats }}</span>
                <button v-if="isMobile" class="panel-close" @click="showStatsPanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div class="panel-body">
                <div class="stat-item">
                  <div class="stat-icon-wrap blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">{{ visitorCount.toLocaleString() }}</span>
                    <span class="stat-label">{{ t.views }}</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon-wrap purple">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                      <polyline points="2 17 12 22 22 17"/>
                      <polyline points="2 12 12 17 22 12"/>
                    </svg>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">10+</span>
                    <span class="stat-label">{{ t.projects }}</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon-wrap green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">737+</span>
                    <span class="stat-label">{{ t.hrsCoding }}</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon-wrap orange">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">52+</span>
                    <span class="stat-label">{{ t.repos }}</span>
                  </div>
                </div>
                <div class="stat-live">
                  <span class="live-dot"></span>
                  <span>{{ t.liveFirestore }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Comments -->
        <button v-if="fabOpen" key="fb" class="fab-action" :style="{ '--delay': 2 }" @click="openFeedback" :title="t.comments">
          <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span class="fab-tooltip">{{ t.comments }}</span>
          <span v-if="feedbackCount" class="fab-badge">{{ feedbackCount }}</span>
        </button>

        <!-- Contact -->
        <div v-if="fabOpen" key="contact" class="fab-group" :style="{ '--delay': 3 }">
          <button class="fab-action" @click.stop="togglePanel('contact')" :title="t.contact">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span class="fab-tooltip">{{ t.contact }}</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showContactPanel" class="panel contact-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>{{ t.getInTouch }}</span>
                <button v-if="isMobile" class="panel-close" @click="showContactPanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div class="panel-body">
                <a href="mailto:reymelrey.mislang@gmail.com" class="contact-row">
                  <div class="contact-icon red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div class="contact-info">
                    <span class="contact-title">{{ t.emailMe }}</span>
                    <span class="contact-sub">reymelrey.mislang@gmail.com</span>
                  </div>
                </a>
                <a href="https://www.messenger.com/t/reymelrey.528191/" target="_blank" class="contact-row">
                  <div class="contact-icon blue">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.03 2 10.89c0 2.31 1.11 4.38 2.85 5.76V22l5.36-2.94c.72.2 1.48.31 2.27.31 5.52 0 10-4.03 10-8.89S17.52 2 12 2zm1.09 11.77l-2.56-2.73-4.99 2.73 5.49-5.82 2.62 2.73 4.93-2.73-5.49 5.82z"/>
                    </svg>
                  </div>
                  <div class="contact-info">
                    <span class="contact-title">Messenger</span>
                    <span class="contact-sub">Facebook</span>
                  </div>
                </a>
                <a href="https://github.com/codewithryry" target="_blank" class="contact-row">
                  <div class="contact-icon dark">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div class="contact-info">
                    <span class="contact-title">GitHub</span>
                    <span class="contact-sub">@codewithryry</span>
                  </div>
                </a>
                <a href="/Reymel Mislang Resume  (8.5 x 13 in).pdf" download class="contact-row resume">
                  <div class="contact-icon accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                  <div class="contact-info">
                    <span class="contact-title">{{ t.downloadCV }}</span>
                    <span class="contact-sub">PDF • 8.5 x 13 in</span>
                  </div>
                </a>
              </div>
            </div>
          </transition>
        </div>
      </transition-group>

      <!-- Main Toggle — Compass/Navigation Icon -->
      <button 
        class="fab-trigger" 
        :class="{ active: fabOpen }" 
        @click.stop="toggleFab"
        :aria-label="fabOpen ? t.close : t.menu"
      >
        <span class="trigger-icon">
          <!-- Closed: Compass/Navigation icon -->
          <svg v-if="!fabOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
          </svg>
          <!-- Open: X close icon -->
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </span>
        <span v-if="!fabOpen && totalNotifications" class="trigger-pulse"></span>
      </button>

      <!-- Scroll to Top (positioned directly below the trigger) -->
      <transition name="fade-up">
        <button v-if="showScrollTop" class="scroll-top" @click="scrollToTop" :title="t.top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </transition>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toastVisible" class="toast" :class="{ 'toast-mobile': isMobile }">
        <div class="toast-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- Comments Modal -->
    <transition name="fade">
      <div v-if="feedbackOpen" class="modal-overlay" @click.self="feedbackOpen = false">
        <div class="modal-box" :class="{ 'modal-mobile': isMobile }">
          <div class="modal-head">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {{ t.commentsWall }}
            </h3>
            <button class="modal-close" @click="feedbackOpen = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="modal-body" ref="messageList">
            <div v-if="fbLoading" class="state-loading">
              <div class="spinner"></div>
              <span>{{ t.loading }}</span>
            </div>
            <div v-else-if="feedbacks.length === 0" class="state-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p>{{ t.noFeedback }}</p>
            </div>
            <div v-else v-for="fb in feedbacks" :key="fb.id" class="msg-bubble">
              <div class="msg-content">
                <p>{{ fb.message }}</p>
                <time>{{ formatTime(fb.created) }}</time>
              </div>
            </div>
          </div>

          <div class="modal-foot">
            <div class="input-wrap">
              <textarea
                v-model="fbMessage"
                :placeholder="t.writeFeedback"
                rows="1"
                @input="autoResize"
                @keydown.enter.ctrl="submitFeedback"
              ></textarea>
              <button class="send-btn" @click="submitFeedback" :disabled="fbSending || !fbMessage.trim()">
                <svg v-if="!fbSending" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                <div v-else class="spinner small"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <router-view :lang="currentLang" />
  </div>
</template>

<script>
import { trackVisit, getViews } from "./services/analyticsService";
import { addDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/services/firebase";

const UI_TRANSLATIONS = {
  en: {
    theme: "Theme", stats: "Stats", comments: "Comments", contact: "Contact",
    top: "Back to top", menu: "Menu", close: "Close",
    chooseTheme: "Appearance", liveStats: "Live Stats",
    views: "Views", projects: "Projects", hrsCoding: "Hours Coding", repos: "Repositories",
    liveFirestore: "Live from Firestore",
    getInTouch: "Get in Touch", emailMe: "Email", downloadCV: "Download Resume",
    commentsWall: "Comments", loading: "Loading",
    noFeedback: "No comments yet. Start the conversation!",
    writeFeedback: "Write a comment..."
  },
  fil: {
    theme: "Tema", stats: "Stats", comments: "Puna", contact: "Kontak",
    top: "Itaas", menu: "Menu", close: "Isara",
    chooseTheme: "Itsura", liveStats: "Live Stats",
    views: "Views", projects: "Proyekto", hrsCoding: "Oras ng Coding", repos: "Repositories",
    liveFirestore: "Live mula sa Firestore",
    getInTouch: "Makipag-ugnayan", emailMe: "Email", downloadCV: "I-download ang CV",
    commentsWall: "Puna", loading: "Naglo-load",
    noFeedback: "Wala pang puna. Magsimula ng usapan!",
    writeFeedback: "Magsulat ng puna..."
  },
  zh: {
    theme: "主題", stats: "統計", comments: "留言", contact: "聯絡",
    top: "回到頂部", menu: "選單", close: "關閉",
    chooseTheme: "外觀", liveStats: "即時數據",
    views: "瀏覽次數", projects: "專案", hrsCoding: "編碼時數", repos: "儲存庫",
    liveFirestore: "Firestore 即時數據",
    getInTouch: "聯絡方式", emailMe: "電子郵件", downloadCV: "下載履歷",
    commentsWall: "留言板", loading: "載入中",
    noFeedback: "尚無留言，開始對話吧！",
    writeFeedback: "寫下留言..."
  }
};

export default {
  name: "App",
  data() {
    return {
      fabOpen: false,
      showScrollTop: false,
      showThemePanel: false,
      showContactPanel: false,
      showStatsPanel: false,
      isMobile: false,
      toastVisible: false,
      toastMessage: "",
      toastTimer: null,
      currentTheme: "light",
      themes: [
        { id: "light", name: "Light", preview: "linear-gradient(135deg, #f8fafc, #e2e8f0)" },
        { id: "dark", name: "Dark", preview: "#0f172a" },
        { id: "midnight", name: "Midnight", preview: "linear-gradient(135deg, #0f172a, #1e3a5f)" },
        { id: "forest", name: "Forest", preview: "linear-gradient(135deg, #064e3b, #065f46)" },
        // { id: "sunset", name: "Sunset", preview: "linear-gradient(135deg, #7c2d12, #c2410c)" },
        { id: "purple", name: "Purple", preview: "linear-gradient(135deg, #2e1065, #6b21a8)" },
        // { id: "material", name: "Material U", preview: "linear-gradient(135deg, #d0bcff, #e8def8)" },
        // { id: "glass", name: "Liquid Glass", preview: "linear-gradient(135deg, #e8ecf1, #f0f4f8)" },
      ],
      currentLang: "en",
      visitorCount: 0,
      feedbackOpen: false,
      feedbacks: [],
      feedbackCount: 0,
      fbMessage: "",
      fbLoading: false,
      fbSending: false
    };
  },

  computed: {
    t() { return UI_TRANSLATIONS[this.currentLang] || UI_TRANSLATIONS.en; },
    totalNotifications() {
      return this.feedbackCount > 0 ? 1 : 0;
    }
  },

  async mounted() {
    await trackVisit();
    const saved = localStorage.getItem("theme") || "light";
    this.setTheme(saved, false);
    this.currentLang = localStorage.getItem("lang") || "en";

    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);

    try {
      this.visitorCount = await getViews();
    } catch (e) { console.error("Views error:", e); }

    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleOutsideClick);
    await this.loadFeedbacks();
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.checkMobile);
    document.removeEventListener("click", this.handleOutsideClick);
    if (this.toastTimer) clearTimeout(this.toastTimer);
  },

  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 640;
    },
    toggleFab() {
      this.fabOpen = !this.fabOpen;
      if (!this.fabOpen) this.closeAllPanels();
      if (this.isMobile) {
        document.body.style.overflow = this.fabOpen ? 'hidden' : '';
      }
    },
    closeFab() {
      this.fabOpen = false;
      this.closeAllPanels();
      if (this.isMobile) document.body.style.overflow = '';
    },
    togglePanel(name) {
      const panels = ['theme', 'contact', 'stats'];
      panels.forEach(p => {
        const key = `show${p.charAt(0).toUpperCase() + p.slice(1)}Panel`;
        this[key] = (p === name) ? !this[key] : false;
      });
    },
    closeAllPanels() {
      this.showThemePanel = false;
      this.showContactPanel = false;
      this.showStatsPanel = false;
    },
    handleOutsideClick(e) {
      if (!e.target.closest(".fab-container") && !e.target.closest(".modal-overlay") && !e.target.closest(".scroll-top")) {
        this.closeAllPanels();
        this.closeFab();
      }
    },
    handleScroll() { 
      this.showScrollTop = window.scrollY > 400; 
    },
    scrollToTop() { 
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    },
    setTheme(themeId, save = true) {
      this.currentTheme = themeId;
      document.documentElement.setAttribute("data-theme", themeId);
      if (save) {
        localStorage.setItem("theme", themeId);
        this.showThemePanel = false;
      }
    },
    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => this.toastVisible = false, 3000);
    },
    openFeedback() {
      this.feedbackOpen = true;
      this.closeFab();
      this.loadFeedbacks();
    },
    async loadFeedbacks() {
      this.fbLoading = true;
      try {
        const q = query(collection(db, "feedback"), orderBy("created", "desc"), limit(50));
        const snap = await getDocs(q);
        this.feedbacks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        this.feedbackCount = this.feedbacks.length;
      } catch (e) { console.error("Feedback load error:", e); }
      this.fbLoading = false;
    },
    async submitFeedback() {
      if (!this.fbMessage.trim() || this.fbSending) return;
      this.fbSending = true;
      try {
        await addDoc(collection(db, "feedback"), {
          message: this.fbMessage.trim(),
          created: new Date()
        });
        this.fbMessage = "";
        this.resetTextarea();
        await this.loadFeedbacks();
      } catch (e) {
        console.error("Submit error:", e);
        alert("Failed to send.");
      }
      this.fbSending = false;
    },
    autoResize(e) {
      const el = e.target;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    },
    resetTextarea() {
      this.$nextTick(() => {
        const ta = this.$el.querySelector('.input-wrap textarea');
        if (ta) {
          ta.style.height = 'auto';
        }
      });
    },
    formatTime(ts) {
      if (!ts) return "";
      const d = ts.toDate ? ts.toDate() : new Date(ts);
      const diff = Date.now() - d;
      const m = Math.floor(diff / 60000);
      const h = Math.floor(diff / 3600000);
      const dy = Math.floor(diff / 86400000);
      if (m < 1) return this.currentLang === 'zh' ? '\u525b\u525b' : (this.currentLang === 'fil' ? 'Ngayon lang' : 'Just now');
      if (m < 60) return `${m}m`;
      if (h < 24) return `${h}h`;
      if (dy < 7) return `${dy}d`;
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;600;700&display=swap");

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
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --radius: 16px;
  --radius-sm: 12px;
  --radius-lg: 24px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: "Inter", "Noto Sans TC", -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ===== SCROLL TO TOP ===== */
.scroll-top {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 12px;
}

.scroll-top:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -4px rgba(99, 102, 241, 0.3);
}

.scroll-top svg { width: 20px; height: 20px; }

.fade-up-enter-active, .fade-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-up-enter-from, .fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.9);
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

/* Backdrop */
.fab-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: -1;
}

.backdrop-fade-enter-active, .backdrop-fade-leave-active {
  transition: opacity 0.3s ease;
}
.backdrop-fade-enter-from, .backdrop-fade-leave-to {
  opacity: 0;
}

/* Actions */
.fab-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 12px;
}

/* Main Trigger */
.fab-trigger {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 24px -4px rgba(99, 102, 241, 0.4), 0 4px 12px -2px rgba(99, 102, 241, 0.2);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fab-trigger::after {
  content: '';
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

.fab-trigger:hover::after { opacity: 0.5; }

.fab-trigger.active {
  background: linear-gradient(135deg, #ef4444, #f97316);
  transform: rotate(45deg);
  box-shadow: 0 8px 24px -4px rgba(239, 68, 68, 0.4);
}

.fab-trigger.active::after {
  background: linear-gradient(135deg, #ef4444, #f97316);
}

.trigger-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.trigger-icon svg { width: 100%; height: 100%; }

.trigger-pulse {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
  50% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
}

/* Action Buttons — SAME SIZE as main trigger & scroll-top */
.fab-group { position: relative; display: flex; align-items: center; }

.fab-action {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fab-action:hover {
  transform: scale(1.08);
  background: var(--surface-hover);
  color: var(--accent);
  border-color: var(--accent);
  box-shadow: var(--shadow-lg);
}

.fab-icon {
  width: 22px;
  height: 22px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.fab-tooltip {
  position: absolute;
  right: 64px;
  background: var(--text);
  color: white;
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

.fab-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--surface);
  box-shadow: var(--shadow-sm);
}

/* Reveal Animation */
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

/* ===== PANELS ===== */
.panel {
  position: absolute;
  right: 64px;
  bottom: -6px;
  background: var(--surface);
  border-radius: var(--radius);
  min-width: 220px;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border);
  overflow: hidden;
  z-index: 10;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
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

.panel-close svg { width: 14px; height: 14px; }

.panel-body { padding: 6px; max-height: 320px; overflow-y: auto; }

/* Theme Panel */
.theme-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text);
  transition: all 0.15s;
  font-family: inherit;
  text-align: left;
}

.theme-btn:hover { background: var(--surface-hover); }

.theme-btn.active {
  background: rgba(99, 102, 241, 0.08);
  color: var(--accent);
  font-weight: 600;
}

.theme-swatch {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--border);
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.5);
}

.theme-name { flex: 1; }

.check-icon {
  width: 16px;
  height: 16px;
  color: var(--accent);
}

/* Stats Panel */
.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  transition: background 0.15s;
}

.stat-item:hover { background: var(--surface-hover); }

.stat-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrap svg { width: 18px; height: 18px; color: white; }

.stat-icon-wrap.blue { background: linear-gradient(135deg, #3b82f6, #6366f1); }
.stat-icon-wrap.purple { background: linear-gradient(135deg, #8b5cf6, #a855f7); }
.stat-icon-wrap.green { background: linear-gradient(135deg, #10b981, #22c55e); }
.stat-icon-wrap.orange { background: linear-gradient(135deg, #f97316, #fb923c); }

.stat-info { display: flex; flex-direction: column; gap: 2px; }

.stat-value {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.stat-live {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  padding: 8px 12px;
  font-size: 0.75rem;
  color: #22c55e;
  font-weight: 500;
  border-top: 1px solid var(--border);
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: live-blink 2s infinite;
}

@keyframes live-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Contact Panel */
.contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: inherit;
  transition: all 0.15s;
}

.contact-row:hover { background: var(--surface-hover); }

.contact-row.resume:hover { background: rgba(239, 68, 68, 0.06); }

.contact-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon svg { width: 18px; height: 18px; }

.contact-icon.red { background: #fef2f2; color: #ef4444; }
.contact-icon.blue { background: #eff6ff; color: #3b82f6; }
.contact-icon.dark { background: #f8fafc; color: #0f172a; }
.contact-icon.accent { background: rgba(99, 102, 241, 0.1); color: var(--accent); }

.contact-info { display: flex; flex-direction: column; gap: 2px; }

.contact-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}

.contact-sub {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Panel Animation */
.panel-appear-enter-active { animation: panel-in 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.panel-appear-leave-active { animation: panel-in 0.2s ease reverse; }

@keyframes panel-in {
  from { opacity: 0; transform: translateX(-8px) scale(0.96); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

/* ===== TOAST ===== */
.toast {
  position: fixed;
  bottom: 96px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text);
  color: white;
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

.toast-enter-active, .toast-leave-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 16px) scale(0.92);
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

@keyframes modal-up {
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
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

.modal-close svg { width: 16px; height: 16px; }

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
}

.state-loading, .state-empty {
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

.spinner.small { width: 18px; height: 18px; border-width: 2px; }

@keyframes spin { to { transform: rotate(360deg); } }

.msg-bubble { display: flex; }

.msg-content {
  background: rgba(99, 102, 241, 0.06);
  border-radius: 16px 16px 16px 4px;
  padding: 12px 16px;
  max-width: 90%;
  border: 1px solid rgba(99, 102, 241, 0.1);
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

.modal-foot {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  background: var(--bg);
}

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

.input-wrap textarea::placeholder { color: var(--text-muted); }

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: white;
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

.send-btn svg { width: 16px; height: 16px; }

/* ===== MOBILE ===== */
@media (max-width: 640px) {
  .fab-container { bottom: 16px; right: 16px; }

  .fab-trigger {
    width: 52px;
    height: 52px;
  }

  .fab-action {
    width: 52px;
    height: 52px;
  }

  .fab-icon {
    width: 20px;
    height: 20px;
  }

  .fab-tooltip { display: none !important; }

  .scroll-top {
    width: 52px;
    height: 52px;
    margin-top: 10px;
  }

  .scroll-top svg { width: 18px; height: 18px; }

  .panel-mobile {
    position: fixed !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    border-radius: var(--radius) var(--radius) 0 0 !important;
    max-height: 70vh !important;
    animation: sheet-up 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  @keyframes sheet-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .panel-mobile .panel-head {
    padding: 18px 20px;
    font-size: 0.8125rem;
  }

  .panel-close { display: flex !important; }

  .panel-mobile .theme-btn,
  .panel-mobile .stat-item,
  .panel-mobile .contact-row {
    padding: 14px 16px;
  }

  .toast-mobile {
    bottom: 84px;
    font-size: 0.8125rem;
    padding: 10px 16px;
  }

  .modal-overlay { padding: 0; align-items: flex-end; justify-content: center; }

  .modal-mobile {
    width: 100%;
    max-height: 85vh;
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .modal-mobile .modal-head { padding: 18px 20px; }
  .modal-mobile .modal-body { padding: 16px 20px; max-height: 55vh; }
  .modal-mobile .modal-foot { padding: 12px 16px; }

  .input-wrap textarea { font-size: 16px; }
}

/* ===== TABLET ===== */
@media (min-width: 641px) and (max-width: 768px) {
  .modal-box { width: 90%; max-width: 440px; }
  .panel { max-width: 280px; }
}

/* ===== TOUCH ===== */
@media (hover: none) and (pointer: coarse) {
  .fab-action, .fab-trigger, .scroll-top {
    min-width: 44px;
    min-height: 44px;
  }

  .theme-btn, .contact-row, .stat-item { min-height: 48px; }

  .fab-action:hover:not(.disabled) {
    transform: none;
    background: var(--surface);
    color: var(--text-secondary);
  }

  .fab-trigger:hover { transform: none; }
  .fab-trigger:active { transform: scale(0.95); }
}

/* ===== SCROLLBAR ===== */
.modal-body::-webkit-scrollbar,
.panel-body::-webkit-scrollbar { width: 4px; }

.modal-body::-webkit-scrollbar-thumb,
.panel-body::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

/* ===== FADE ===== */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ===== DARK THEMES ===== */
html[data-theme="dark"], html[data-theme="dark"] body {
  --bg: #020617;
  --surface: #0f172a;
  --surface-hover: #1e293b;
  --text: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: #1e293b;
}

html[data-theme="midnight"], html[data-theme="midnight"] body {
  --bg: #0f172a;
  --surface: #1e293b;
  --surface-hover: #334155;
  --text: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: #334155;
}

html[data-theme="forest"], html[data-theme="forest"] body {
  --bg: #022c22;
  --surface: #064e3b;
  --surface-hover: #065f46;
  --text: #ecfdf5;
  --text-secondary: #6ee7b7;
  --text-muted: #34d399;
  --border: #065f46;
}

html[data-theme="sunset"], html[data-theme="sunset"] body {
  --bg: #1c0a00;
  --surface: #431407;
  --surface-hover: #7c2d12;
  --text: #fff7ed;
  --text-secondary: #fdba74;
  --text-muted: #fb923c;
  --border: #7c2d12;
}

html[data-theme="purple"], html[data-theme="purple"] body {
  --bg: #0f0320;
  --surface: #2e1065;
  --surface-hover: #4c1d95;
  --text: #faf5ff;
  --text-secondary: #c4b5fd;
  --text-muted: #a78bfa;
  --border: #4c1d95;
}

/* Dark theme overrides */
html[data-theme="dark"] .fab-backdrop,
html[data-theme="midnight"] .fab-backdrop,
html[data-theme="forest"] .fab-backdrop,
html[data-theme="sunset"] .fab-backdrop,
html[data-theme="purple"] .fab-backdrop {
  background: rgba(2, 6, 23, 0.7);
}

html[data-theme="dark"] .msg-content,
html[data-theme="midnight"] .msg-content,
html[data-theme="forest"] .msg-content,
html[data-theme="sunset"] .msg-content,
html[data-theme="purple"] .msg-content {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.2);
}
</style>