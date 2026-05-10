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

        <!-- Quick Navigation -->
        <!-- <div v-if="fabOpen" key="nav" class="fab-group" :style="{ '--delay': 1 }">
          <button class="fab-action" @click.stop="togglePanel('nav')" :title="t.quickNav">
            <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18"/>
              <path d="M3 6h18"/>
              <path d="M3 18h18"/>
            </svg>
            <span class="fab-tooltip">{{ t.quickNav }}</span>
          </button>

          <transition name="panel-appear">
            <div v-if="showNavPanel" class="panel nav-panel" :class="{ 'panel-mobile': isMobile }">
              <div class="panel-head">
                <span>{{ t.quickNav }}</span>
                <button v-if="isMobile" class="panel-close" @click="showNavPanel = false">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <div class="panel-body">
                <button class="nav-row" @click="scrollToSection('#about')">
                  <div class="nav-icon indigo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 22c1.8-4 5-6 8-6s6.2 2 8 6"/>
                    </svg>
                  </div>
                  <div class="nav-info">
                    <span class="nav-title">{{ t.about }}</span>
                    <span class="nav-sub">Profile overview</span>
                  </div>
                </button>

                <button class="nav-row" @click="scrollToSection('#skills')">
                  <div class="nav-icon emerald">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.8 5.5 21l2-7.5L2 9h7z"/>
                    </svg>
                  </div>
                  <div class="nav-info">
                    <span class="nav-title">{{ t.skills }}</span>
                    <span class="nav-sub">Tools and technologies</span>
                  </div>
                </button>

                <button class="nav-row" @click="scrollToSection('#projects')">
                  <div class="nav-icon violet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="4" width="18" height="14" rx="2"/>
                      <path d="M8 22h8"/>
                      <path d="M12 18v4"/>
                    </svg>
                  </div>
                  <div class="nav-info">
                    <span class="nav-title">{{ t.projectsNav }}</span>
                    <span class="nav-sub">Featured work</span>
                  </div>
                </button>

                <button class="nav-row" @click="scrollToSection('#experience')">
                  <div class="nav-icon amber">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="7" width="20" height="14" rx="2"/>
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                    </svg>
                  </div>
                  <div class="nav-info">
                    <span class="nav-title">{{ t.experience }}</span>
                    <span class="nav-sub">Internship and work</span>
                  </div>
                </button>

                <button class="nav-row" @click="scrollToSection('#contact')">
                  <div class="nav-icon rose">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16v16H4z"/>
                      <path d="M22 6l-10 7L2 6"/>
                    </svg>
                  </div>
                  <div class="nav-info">
                    <span class="nav-title">{{ t.contact }}</span>
                    <span class="nav-sub">Send a message</span>
                  </div>
                </button>
              </div>
            </div>
          </transition>
        </div> -->

<!-- Tech Stack -->
<div v-if="fabOpen" key="tech" class="fab-group" :style="{ '--delay': 2 }">
  <button class="fab-action" @click.stop="togglePanel('tech')" :title="t.techStack">
    <svg class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 18l6-6-6-6"/>
      <path d="M8 6l-6 6 6 6"/>
      <path d="M14.5 4l-5 16"/>
    </svg>
    <span class="fab-tooltip">{{ t.techStack }}</span>
  </button>

  <transition name="panel-appear">
    <div v-if="showTechPanel" class="panel tech-panel" :class="{ 'panel-mobile': isMobile }">
      <div class="panel-head">
        <span>{{ t.techStack }}</span>
        <button v-if="isMobile" class="panel-close" @click="showTechPanel = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
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

              <div class="panel-body stats-body">
                <!-- Active Live Views -->
                <div class="stat-card stat-active">
                  <div class="stat-left">
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

                  <span class="stat-badge live">Live</span>
                </div>

                <!-- Coming Soon Projects -->
                <div class="stat-card stat-coming">
                  <div class="stat-left">
                    <div class="stat-icon-wrap muted">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                      </svg>
                    </div>

                    <div class="stat-info">
                      <span class="stat-value muted-text">{{ t.projects }}</span>
                      <span class="stat-label">Project counter</span>
                    </div>
                  </div>

                  <span class="stat-badge soon">Soon</span>
                </div>

                <!-- Coming Soon Coding Hours -->
                <div class="stat-card stat-coming">
                  <div class="stat-left">
                    <div class="stat-icon-wrap muted">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                      </svg>
                    </div>

                    <div class="stat-info">
                      <span class="stat-value muted-text">{{ t.hrsCoding }}</span>
                      <span class="stat-label">Coding activity</span>
                    </div>
                  </div>

                  <span class="stat-badge soon">Soon</span>
                </div>

                <!-- Coming Soon Repositories -->
                <div class="stat-card stat-coming">
                  <div class="stat-left">
                    <div class="stat-icon-wrap muted">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                    </div>

                    <div class="stat-info">
                      <span class="stat-value muted-text">{{ t.repos }}</span>
                      <span class="stat-label">GitHub repositories</span>
                    </div>
                  </div>

                  <span class="stat-badge soon">Soon</span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Feedback -->
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

            <!-- <a href="https://www.messenger.com/t/reymelrey.528191/" target="_blank" rel="noopener noreferrer" class="contact-row">
              <div class="contact-icon blue">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.03 2 10.89c0 2.31 1.11 4.38 2.85 5.76V22l5.36-2.94c.72.2 1.48.31 2.27.31 5.52 0 10-4.03 10-8.89S17.52 2 12 2zm1.09 11.77l-2.56-2.73-4.99 2.73 5.49-5.82 2.62 2.73 4.93-2.73-5.49 5.82z"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-title">Messenger</span>
                <span class="contact-sub">Facebook</span>
              </div>
            </a> -->

            <!-- <a href="https://github.com/codewithryry" target="_blank" rel="noopener noreferrer" class="contact-row">
              <div class="contact-icon dark">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-title">GitHub</span>
                <span class="contact-sub">@codewithryry</span>
              </div>
            </a> -->

            <!-- <a href="https://devrymel.vercel.app" target="_blank" rel="noopener noreferrer" class="contact-row">
              <div class="contact-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 0 20"/>
                  <path d="M12 2a15.3 15.3 0 0 0 0 20"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-title">Portfolio</span>
                <span class="contact-sub">devrymel.vercel.app</span>
              </div>
            </a> -->

            <a href="https://www.linkedin.com/in/reymel-mislang/" target="_blank" rel="noopener noreferrer" class="contact-row">
              <div class="contact-icon linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-title">LinkedIn</span>
                <span class="contact-sub">Reymel Mislang</span>
              </div>
            </a>

            <!-- <a href="https://facebook.com/imrymel/" target="_blank" rel="noopener noreferrer" class="contact-row">
              <div class="contact-icon facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06z"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-title">Facebook</span>
                <span class="contact-sub">facebook.com/imrymel</span>
              </div>
            </a> -->

            <!-- <a href="tel:+639761025310" class="contact-row">
              <div class="contact-icon phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.13.96.35 1.89.66 2.78a2 2 0 0 1-.45 2.11L9.05 10.88a16 16 0 0 0 4.07 4.07l1.27-1.27a2 2 0 0 1 2.11-.45c.89.31 1.82.53 2.78.66A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-title">Phone / GCash</span>
                <span class="contact-sub">0976 102 5310</span>
              </div>
            </a> -->

            <div class="contact-row">
              <div class="contact-icon location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-title">Location</span>
                <span class="contact-sub">Calapan City, Oriental Mindoro</span>
              </div>
            </div>

            <a href="/Resume.pdf" download class="contact-row resume">
              <div class="contact-icon accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <div class="contact-info">
                <span class="contact-title">{{ t.downloadCV }}</span>
                <span class="contact-sub">PDF • Latest Resume</span>
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

    <FeedbackBubble
      ref="feedbackBubble"
      :show-button="false"
      @count-change="feedbackCount = $event"
    />

    <router-view :lang="currentLang" />
  </div>
</template>

<script>
import { trackVisit, getViews } from "./services/analyticsService";
import FeedbackBubble from "@/components/FeedbackBubble.vue";

const UI_TRANSLATIONS = {
  en: {
    theme: "Theme",
    stats: "Stats",
    comments: "Feedback",
    contact: "Contact",
    top: "Back to top",
    menu: "Menu",
    close: "Close",

    chooseTheme: "Appearance",
    liveStats: "Live Stats",
    views: "Views",
    projects: "Projects",
    hrsCoding: "Hours Coding",
    repos: "Repositories",
    liveFirestore: "Live from Firestore",

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
    downloadCV: "Download Resume",

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

    chooseTheme: "Itsura",
    liveStats: "Live Stats",
    views: "Views",
    projects: "Proyekto",
    hrsCoding: "Oras ng Coding",
    repos: "Repositories",
    liveFirestore: "Live mula sa Firestore",

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
    downloadCV: "I-download ang CV",

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

    chooseTheme: "外觀",
    liveStats: "即時數據",
    views: "瀏覽次數",
    projects: "專案",
    hrsCoding: "編碼時數",
    repos: "儲存庫",
    liveFirestore: "Firestore 即時數據",

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
    downloadCV: "下載履歷",

    commentsWall: "留言板",
    loading: "載入中",
    noFeedback: "尚無留言，開始對話吧！",
    writeFeedback: "寫下留言..."
  }
};

export default {
  name: "App",

  components: {
    FeedbackBubble
  },

  data() {
    return {
      // Desktop: open by default
      // Mobile: closed by default
      fabOpen: window.innerWidth > 640,
      showScrollTop: false,

      showThemePanel: false,
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
        { id: "light", name: "Light", preview: "linear-gradient(135deg, #f8fafc, #e2e8f0)" },
        { id: "midnight", name: "Midnight", preview: "linear-gradient(135deg, #0f172a, #1e3a5f)" },
        { id: "forest", name: "Forest", preview: "linear-gradient(135deg, #064e3b, #065f46)" },
      ],

      currentLang: "en",
      visitorCount: 0,
      feedbackCount: 0
    };
  },

  computed: {
    t() {
      return UI_TRANSLATIONS[this.currentLang] || UI_TRANSLATIONS.en;
    },

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
    } catch (e) {
      console.error("Views error:", e);
    }

    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleOutsideClick);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.checkMobile);
    document.removeEventListener("click", this.handleOutsideClick);

    document.body.style.overflow = "";

    if (this.toastTimer) clearTimeout(this.toastTimer);
  },

  methods: {
    checkMobile() {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 640;

      // Kapag lumipat to mobile, isara para hindi takpan screen
      if (this.isMobile) {
        this.fabOpen = false;
        this.closeAllPanels();
        document.body.style.overflow = "";
        return;
      }

      // Kapag galing mobile then balik desktop, buksan ulit buttons
      if (wasMobile && !this.isMobile) {
        this.fabOpen = true;
        document.body.style.overflow = "";
      }
    },

    toggleFab() {
      this.fabOpen = !this.fabOpen;

      if (!this.fabOpen) this.closeAllPanels();

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
      const panels = ["theme", "nav", "tech", "stats", "contact"];

      panels.forEach((panel) => {
        const key = `show${panel.charAt(0).toUpperCase() + panel.slice(1)}Panel`;
        this[key] = panel === name ? !this[key] : false;
      });
    },

    closeAllPanels() {
      this.showThemePanel = false;
      this.showNavPanel = false;
      this.showTechPanel = false;
      this.showStatsPanel = false;
      this.showContactPanel = false;
    },

    handleOutsideClick(e) {
      const clickedInsideFab = e.target.closest(".fab-container");
      const clickedInsideModal = e.target.closest(".modal-overlay, .feedback-overlay");
      const clickedScrollTop = e.target.closest(".scroll-top");

      if (clickedInsideFab || clickedInsideModal || clickedScrollTop) return;

      this.closeAllPanels();

      // Sa mobile lang isara buong FAB kapag outside click
      // Sa desktop, iwan siyang nakalabas by default
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

    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;

      if (this.toastTimer) clearTimeout(this.toastTimer);

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

.contact-icon.green {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
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
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
}
.stats-panel {
  width: 285px;
  overflow: hidden;
}

.stats-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
}

.stat-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 62px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(255, 255, 255, 0.78);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-1px);
  border-color: rgba(99, 102, 241, 0.25);
}

.stat-active {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(59, 130, 246, 0.08));
  border-color: rgba(99, 102, 241, 0.22);
}

.stat-coming {
  background: rgba(248, 250, 252, 0.9);
}

.stat-left {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

.stat-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.stat-icon-wrap svg {
  width: 18px;
  height: 18px;
}

.stat-icon-wrap.blue {
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.14);
}

.stat-icon-wrap.muted {
  color: #64748b;
  background: rgba(100, 116, 139, 0.11);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.stat-value {
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.1;
  color: #0f172a;
  white-space: nowrap;
}

.stat-value.muted-text {
  color: #334155;
  font-size: 0.82rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.74rem;
  line-height: 1.1;
  color: #64748b;
  white-space: nowrap;
}

.stat-badge {
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.stat-badge.live {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.1);
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

@media (max-width: 640px) {
  .stats-panel {
    width: calc(100vw - 32px);
  }

  .stat-card {
    min-height: 58px;
  }
}


/* ===== UNIFIED PANEL UI OVERRIDE ===== */

/* Same width and shape for all floating panels */
.theme-panel,
.stats-panel,
.contact-panel {
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

/* Same panel title header */
.panel-head {
  min-height: 52px;
  padding: 14px 16px;
  background: color-mix(in srgb, var(--surface-hover) 42%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
}

.panel-head span {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--text-muted);
}

/* Same spacing inside all panels */
.panel-body,
.stats-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 360px;
  overflow-y: auto;
}

/* Make Theme, Contact, and Stats rows look like same card system */
.theme-btn,
.contact-row,
.stat-card {
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
.stat-card:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--surface-hover) 72%, var(--surface) 28%);
  border-color: color-mix(in srgb, var(--accent) 34%, var(--border));
  box-shadow:
    0 10px 22px rgba(15, 23, 42, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.5) inset;
}

/* Active theme card */
.theme-btn.active {
  background: color-mix(in srgb, var(--accent) 12%, var(--surface));
  border-color: color-mix(in srgb, var(--accent) 34%, var(--border));
  color: var(--accent);
}

/* Same icon size for all panel icons */
.theme-swatch,
.contact-icon,
.stat-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  flex-shrink: 0;
}

.contact-icon,
.stat-icon-wrap {
  display: grid;
  place-items: center;
}

.contact-icon svg,
.stat-icon-wrap svg {
  width: 18px;
  height: 18px;
}

/* Fix old stat CSS forcing icon color */
.stat-card .stat-icon-wrap svg {
  color: currentColor;
}

/* Contact text same as stats text */
.contact-info,
.stat-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contact-title,
.stat-value,
.stat-value.muted-text,
.theme-name {
  font-size: 0.86rem;
  font-weight: 750;
  line-height: 1.15;
  color: var(--text);
}

.contact-sub,
.stat-label {
  font-size: 0.72rem;
  line-height: 1.2;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Stats active card */
.stat-active {
  background:
    linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(59, 130, 246, 0.08)),
    var(--surface);
  border-color: rgba(99, 102, 241, 0.26);
}

/* Stats coming soon cards */
.stat-coming {
  background: color-mix(in srgb, var(--surface-hover) 46%, var(--surface) 54%);
}

.stat-icon-wrap.blue {
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.14);
}

.stat-icon-wrap.muted {
  color: #64748b;
  background: rgba(100, 116, 139, 0.12);
}

.stat-badge {
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

/* Contact icon colors refined */
.contact-icon.red {
  background: rgba(239, 68, 68, 0.11);
  color: #ef4444;
}

.contact-icon.blue {
  background: rgba(59, 130, 246, 0.11);
  color: #3b82f6;
}

.contact-icon.linkedin {
  background: rgba(10, 102, 194, 0.12);
  color: #0a66c2;
}

.contact-icon.location {
  background: rgba(245, 158, 11, 0.13);
  color: #f59e0b;
}

.contact-icon.accent {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}

/* Resume row highlight but still same style */
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

/* Theme swatch cleaner */
.theme-swatch {
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.45),
    0 2px 8px rgba(15, 23, 42, 0.08);
}

.check-icon {
  width: 17px;
  height: 17px;
  color: var(--accent);
}

/* Better mobile panel consistency */
@media (max-width: 640px) {
  .theme-panel,
  .stats-panel,
  .contact-panel {
    width: 100% !important;
    min-width: 100% !important;
    border-radius: 22px 22px 0 0 !important;
  }

  .panel-body,
  .stats-body {
    padding: 14px;
    gap: 10px;
  }

  .theme-btn,
  .contact-row,
  .stat-card {
    min-height: 64px;
    padding: 12px 14px;
  }
}

/* Dark mode polish */
html[data-theme="dark"] .theme-panel,
html[data-theme="dark"] .stats-panel,
html[data-theme="dark"] .contact-panel,
html[data-theme="midnight"] .theme-panel,
html[data-theme="midnight"] .stats-panel,
html[data-theme="midnight"] .contact-panel,
html[data-theme="forest"] .theme-panel,
html[data-theme="forest"] .stats-panel,
html[data-theme="forest"] .contact-panel,
html[data-theme="purple"] .theme-panel,
html[data-theme="purple"] .stats-panel,
html[data-theme="purple"] .contact-panel {
  background: color-mix(in srgb, var(--surface) 92%, black 8%);
  box-shadow:
    0 20px 45px rgba(0, 0, 0, 0.35),
    0 8px 18px rgba(0, 0, 0, 0.22);
}

html[data-theme="dark"] .theme-btn,
html[data-theme="dark"] .contact-row,
html[data-theme="dark"] .stat-card,
html[data-theme="midnight"] .theme-btn,
html[data-theme="midnight"] .contact-row,
html[data-theme="midnight"] .stat-card,
html[data-theme="forest"] .theme-btn,
html[data-theme="forest"] .contact-row,
html[data-theme="forest"] .stat-card,
html[data-theme="purple"] .theme-btn,
html[data-theme="purple"] .contact-row,
html[data-theme="purple"] .stat-card {
  background: color-mix(in srgb, var(--surface-hover) 38%, var(--surface) 62%);
  box-shadow: none;
}

.nav-panel,
.tech-panel {
  width: 292px;
  min-width: 292px;
}

.nav-row {
  width: 100%;
  min-height: 62px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  background: color-mix(in srgb, var(--surface) 88%, var(--surface-hover) 12%);
  color: inherit;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.nav-row:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--surface-hover) 72%, var(--surface) 28%);
  border-color: color-mix(in srgb, var(--accent) 34%, var(--border));
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
}

.nav-icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.nav-icon svg {
  width: 18px;
  height: 18px;
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

.nav-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.nav-title {
  font-size: 0.86rem;
  font-weight: 750;
  line-height: 1.15;
  color: var(--text);
}

.nav-sub {
  font-size: 0.72rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

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
  color: white;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(99, 102, 241, 0.24);
}

.hire-btn:hover {
  background: var(--accent-hover);
}

@media (max-width: 640px) {
  .nav-panel,
  .tech-panel {
    width: 100% !important;
    min-width: 100% !important;
  }

  .nav-row {
    min-height: 64px;
    padding: 12px 14px;
  }
}
</style>
