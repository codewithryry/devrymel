<template>
  <div>
    <!-- MOBILE LAYOUT -->
    <div class="mobile-profile-content">
      <!-- Profile Header -->
      <div class="mobile-header">
        <div class="mobile-profile-frame">
          <img :src="profileImage" alt="Reymel Mislang" class="profile-image" />
        </div>

        <div class="mobile-identity">
          <h2 class="mobile-name">
            <span class="name-first">Reymel</span>
            <span class="name-last">Mislang</span>
          </h2>

          <a href="mailto:reymelrey.mislang@gmail.com" class="mobile-contact-pill">
            <i class="fas fa-envelope"></i>
            {{ text.contactMe }}
          </a>

          <!-- CENTERED BADGES SECTION -->
          <div class="mobile-badges-section">
            <div class="badge-instructions">
              <span>{{ text.tapIcon }}</span>
            </div>

            <div class="center-badges">
              <button
                type="button"
                class="inline-badge"
                @click="openMobileDeansList"
                :title="text.deanListerAward"
              >
                <i class="fas fa-trophy"></i>
                <span class="badge-label">{{ text.awards }}</span>
              </button>

              <button
                type="button"
                class="inline-badge"
                @click="$emit('open-certificates')"
                :title="text.certificates"
              >
                <i class="fas fa-award"></i>
                <span class="badge-label">{{ text.certs }}</span>
              </button>

              <button
                type="button"
                class="inline-badge"
                @click="$emit('openLinks')"
                :title="text.projectLinks"
              >
                <i class="fas fa-link"></i>
                <span class="badge-label">{{ text.links }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div class="mobile-card about-card">
        <div class="card-content">
          <p class="statement-text">
            {{ text.aboutMobile1 }}
          </p>

          <p class="statement-text">
            {{ text.aboutMobile2 }}
          </p>
        </div>
      </div>
    </div>

    <!-- DESKTOP LAYOUT -->
    <section class="profile-section desktop-profile-content">
      <div class="profile-brand-card">
        <!-- Left Column: Visual Identity -->
        <div class="brand-visual">
          <div class="profile-frame">
            <img :src="profileImage" alt="Reymel Mislang" class="profile-image" />
          </div>

          <!-- Details -->
          <div class="cv-block">
            <h4 class="cv-title">{{ text.detailsTitle }}</h4>

            <dl class="cv-list">
              <div class="cv-row">
                <dt>{{ text.dob }}</dt>
                <dd>{{ text.dobValue }}</dd>
              </div>
              <div class="cv-row">
                <dt>{{ text.nationality }}</dt>
                <dd>{{ text.nationalityValue }}</dd>
              </div>
              <div class="cv-row">
                <dt>{{ text.location }}</dt>
                <dd>{{ text.locationValue }}</dd>
              </div>
            </dl>
          </div>

          <!-- Academic Honors Section -->
          <div class="achievement-badges">
            <div class="achievement-head">
              <h4 class="achievement-title">{{ text.deanListerAward }}</h4>
              <button
                type="button"
                class="view-all-icon"
                :title="`${text.viewAllAwards} (${achievements.deansList.length})`"
                :aria-label="`${text.viewAllAwards} (${achievements.deansList.length})`"
                @click="$emit('openDeansList', 0)"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>

            <div
              v-if="latestAchievement"
              class="achievement-chip"
              @click="$emit('openDeansList', 0)"
            >
              <div class="chip-icon">
                <i class="fas fa-award"></i>
              </div>

              <div class="chip-content">
                <span class="chip-semester">
                  {{ latestAchievement.title.split("|")[0].trim() }}
                </span>
                <span class="chip-gwa">
                  GWA {{ latestAchievement.details[0].split(":")[1].trim() }}
                </span>
              </div>
            </div>
          </div>

          <!-- References -->
          <div class="cv-block">
            <h4 class="cv-title">{{ text.referencesTitle }}</h4>
            <p class="cv-note">{{ text.referencesNote }}</p>
          </div>
        </div>

        <!-- Right Column: Brand Narrative -->
        <div class="brand-narrative">
          <!-- Brand Statement -->
          <div class="brand-statement">
            <p class="statement-text">
              {{ text.aboutDesktop1 }}
            </p>

            <p class="statement-text">
              {{ text.aboutDesktop2 }}
            </p>
          </div>

          <!-- Tech Stack Chips -->
          <div class="tech-stack">
            <h4 class="stack-title">{{ text.coreTechnologies }}</h4>

            <div class="stack-chips">
              <div class="tech-chip" v-for="tech in techStack" :key="tech.name">
                <i :class="tech.icon"></i>
                <span>{{ tech.name }}</span>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div id="contact" class="brand-contact">
            <h4 class="contact-title">{{ text.getInTouch }}</h4>

            <div class="contact-grid">
              <a
                href="mailto:reymelrey.mislang@gmail.com"
                target="_blank"
                class="contact-item"
              >
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>

                <div class="contact-details">
                  <span class="contact-label">{{ text.email }}</span>
                  <span class="contact-value">{{ text.sendEmail }}</span>
                </div>

                <i class="fas fa-external-link-alt contact-arrow"></i>
              </a>

              <a href="/Reymel_Mislang_CV.docx" download class="contact-item">
                <div class="contact-icon">
                  <i class="fas fa-id-card"></i>
                </div>

                <div class="contact-details">
                  <span class="contact-label">{{ text.cv }}</span>
                  <span class="contact-value">{{ text.downloadCV }}</span>
                </div>

                <i class="fas fa-download contact-arrow"></i>
              </a>
            </div>
          </div>

          <!-- Desktop Only Ad Slot -->
          <div class="desktop-contact-ad">
            <AdSlot type="wide-box" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";

const PROFILE_TRANSLATIONS = {
  en: {
    contactMe: "Contact me",
    tapIcon: "Tap an icon to view details",
    awards: "Awards",
    certs: "Certs",
    links: "Links",
    certificates: "Certificates",
    projectLinks: "Project Links",

    desktopSubtitle: "Frontend Developer & IT Support",
    coreTechnologies: "Core Technologies",
    deanListerAward: "DEAN LISTER AWARD",
    viewAllAwards: "View all",
    awardsText: "awards",

    getInTouch: "Get in Touch",
    email: "Email",
    sendEmail: "Send an Email",
    cv: "Curriculum Vitae",
    downloadCV: "Download CV",

    detailsTitle: "Details",
    dob: "Date of Birth",
    dobValue: "July 12, 2003",
    nationality: "Nationality",
    nationalityValue: "Filipino",
    location: "Location",
    locationValue: "Naujan, PH",

    referencesTitle: "References",
    referencesNote: "References available upon request.",

    aboutMobile1:
      "I specialize in developing modern web applications and Progressive Web Apps (PWAs) using current technologies and AI-assisted workflows. I also design and implement workflow automations with n8n to streamline processes, integrate systems, and reduce repetitive tasks. My work focuses on transforming ideas into functional, scalable solutions that deliver real-world value.",

    aboutMobile2:
      "I continuously expand my technical skill set and apply best practices in development to build efficient and user-focused systems. My experience includes freelance projects, affiliate platforms, and practical business applications. I am open to commission-based opportunities in web development and automation, with a strong focus on delivering reliable, simple, and impactful solutions.",

    aboutDesktop1:
      "I build modern web applications and progressive web apps (PWA) using AI tools, modern technologies, and vibe coding. I also build workflow automations using n8n to connect apps and automate repetitive tasks. My focus is on turning ideas into real, functional systems people use.",

    aboutDesktop2:
      "I enjoy learning new technologies, improving my skills each day, and creating digital projects for freelance work, affiliate systems, and real-world applications. I am also open for commission-based projects involving web development and automation. My goal is to build useful, simple, and practical solutions that create real value."
  },

  fil: {
    contactMe: "Kontakin ako",
    tapIcon: "I-tap ang icon para makita ang detalye",
    awards: "Awards",
    certs: "Certs",
    links: "Links",
    certificates: "Certificates",
    projectLinks: "Project Links",

    desktopSubtitle: "Frontend-Focused Web Developer",
    coreTechnologies: "Core Technologies",
    deanListerAward: "DEAN LISTER AWARD",
    viewAllAwards: "Tingnan lahat",
    awardsText: "awards",

    getInTouch: "Makipag-ugnayan",
    email: "Email",
    sendEmail: "Mag-send ng Email",
    cv: "Curriculum Vitae",
    downloadCV: "I-download ang CV",

    detailsTitle: "Detalye",
    dob: "Kaarawan",
    dobValue: "Hulyo 12, 2003",
    nationality: "Nasyonalidad",
    nationalityValue: "Pilipino",
    location: "Lokasyon",
    locationValue: "Naujan, PH",

    referencesTitle: "Mga Reperensya",
    referencesNote: "Available ang mga reperensya kapag hiniling.",

    aboutMobile1:
      "Nagfo-focus ako sa paggawa ng modern web applications at Progressive Web Apps (PWAs) gamit ang kasalukuyang technologies at AI-assisted workflows. Gumagawa rin ako ng workflow automations gamit ang n8n para mapabilis ang proseso, ma-connect ang systems, at mabawasan ang paulit-ulit na tasks. Ang focus ko ay gawing functional, scalable, at kapaki-pakinabang na solutions ang mga ideas.",

    aboutMobile2:
      "Patuloy kong pinapalawak ang technical skills ko at ginagamit ang best practices sa development para makagawa ng efficient at user-focused systems. May experience ako sa freelance projects, affiliate platforms, at practical business applications. Open ako sa commission-based opportunities sa web development at automation, na may focus sa reliable, simple, at impactful solutions.",

    aboutDesktop1:
      "Gumagawa ako ng modern web applications at progressive web apps (PWA) gamit ang AI tools, modern technologies, at vibe coding. Gumagawa rin ako ng workflow automations gamit ang n8n para mag-connect ng apps at mag-automate ng repetitive tasks. Ang focus ko ay gawing tunay at functional systems ang mga ideas.",

    aboutDesktop2:
      "Mahilig akong matuto ng bagong technologies, pagbutihin ang skills ko araw-araw, at gumawa ng digital projects para sa freelance work, affiliate systems, at real-world applications. Open din ako sa commission-based projects na may kinalaman sa web development at automation. Goal ko gumawa ng useful, simple, at practical solutions na may real value."
  },

  zh: {
    contactMe: "聯絡我",
    tapIcon: "點擊圖示查看詳細資訊",
    awards: "獎項",
    certs: "證書",
    links: "連結",
    certificates: "證書",
    projectLinks: "專案連結",

    desktopSubtitle: "前端導向網頁開發者",
    coreTechnologies: "核心技術",
    deanListerAward: "院長名單獎項",
    viewAllAwards: "查看全部",
    awardsText: "個獎項",

    getInTouch: "聯絡方式",
    email: "電子郵件",
    sendEmail: "發送電子郵件",
    cv: "Curriculum Vitae",
    downloadCV: "下載 CV",

    detailsTitle: "個人資料",
    dob: "出生日期",
    dobValue: "2003年7月12日",
    nationality: "國籍",
    nationalityValue: "菲律賓籍",
    location: "所在地",
    locationValue: "Naujan, PH",

    referencesTitle: "推薦人",
    referencesNote: "如有需要可提供推薦人資料。",

    aboutMobile1:
      "我專注於使用現代技術與 AI 輔助流程開發現代網頁應用程式和 Progressive Web Apps（PWA）。我也使用 n8n 設計並建置工作流程自動化，以簡化流程、整合系統並減少重複性任務。我的工作重點是把想法轉化為具有實際價值的功能性與可擴展解決方案。",

    aboutMobile2:
      "我持續提升技術能力，並在開發中套用良好實務，建立高效率且以使用者為中心的系統。我的經驗包含自由接案專案、聯盟平台與實際商業應用。我也接受與網頁開發和自動化相關的委託專案，重視可靠、簡潔且有影響力的解決方案。",

    aboutDesktop1:
      "我使用 AI 工具、現代技術與 vibe coding 建立現代網頁應用程式和 Progressive Web Apps（PWA）。我也使用 n8n 建立工作流程自動化，以連接應用程式並自動處理重複性任務。我的重點是把想法變成真正可用的功能系統。",

    aboutDesktop2:
      "我喜歡學習新技術、每天提升自己的技能，並為自由接案、聯盟系統和實際應用建立數位專案。我也接受與網頁開發和自動化相關的委託專案。我的目標是建立有用、簡單且實用的解決方案，並創造實際價值。"
  }
};

export default {
  name: "ProfileContent",

  components: {
    AdSlot
  },

  props: {
    profile: {
      type: Object,
      required: true
    },

    techStack: {
      type: Array,
      required: true
    },

    achievements: {
      type: Object,
      required: true
    },

    lang: {
      type: String,
      default: "en"
    }
  },

  emits: [
    "openDeansList",
    "openMobileDeansList",
    "openCertificatesListModal",
    "openLinks",
    "open-certificates"
  ],

  data() {
    return {
      currentTheme: document.documentElement.getAttribute("data-theme") || "light"
    };
  },

  computed: {
    text() {
      return PROFILE_TRANSLATIONS[this.lang] || PROFILE_TRANSLATIONS.en;
    },

    latestTwoAchievements() {
      if (!this.achievements || !this.achievements.deansList) return [];
      return this.achievements.deansList.slice(0, 2);
    },

    latestAchievement() {
      return this.latestTwoAchievements[0] || null;
    },

    profileImage() {
      const map = {
        light:    "profilelight.jpg",
        midnight: "prfo.lo.png",
        forest:   "profile3.jpg"
      };
      return map[this.currentTheme] || map.light;
    }
  },

  mounted() {
    this._themeObserver = new MutationObserver(() => {
      this.currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    });
    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
  },

  beforeUnmount() {
    if (this._themeObserver) this._themeObserver.disconnect();
  },

  methods: {

    openMobileDeansList() {
      this.$emit("openMobileDeansList");
    },

    openCertificatesListModal() {
      this.$emit("openCertificatesListModal");
    }
  }
};
</script>

<style scoped>
.contact-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* ===== SHARED ===== */
.profile-image {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-lg);
  object-fit: cover;
  border: 1px solid var(--border);
}

.statement-text {
  font-size: 0.96rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0 0 1rem;
}

.statement-text:last-child {
  margin-bottom: 0;
}

.name-first,
.name-last {
  color: var(--text);
}

/* ===== MOBILE LAYOUT ===== */
.mobile-profile-content {
  display: none;
}

@media (max-width: 768px) {
  .desktop-profile-content {
    display: none;
  }

  .mobile-profile-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .mobile-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .mobile-profile-frame {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }

  .mobile-identity {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .mobile-name {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    display: flex;
    flex-direction: row;
    gap: 0.35em;
    flex-wrap: wrap;
  }

  .mobile-contact-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    width: fit-content;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 500;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    text-decoration: none;
  }

  .mobile-badges-section {
    margin-top: 0.2rem;
  }

  .badge-instructions {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .center-badges {
    display: flex;
    gap: 0.5rem;
  }

  .inline-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-family: inherit;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
  }

  .inline-badge:hover {
    border-color: var(--text-muted);
  }

  .mobile-card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
  }

  .about-card .statement-text {
    font-size: 0.92rem;
  }
}

/* ===== DESKTOP LAYOUT ===== */
@media (min-width: 769px) {
  .mobile-profile-content {
    display: none !important;
  }

  .desktop-profile-content {
    display: block !important;
  }

  .profile-brand-card {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2.25rem;
  }

  .brand-visual {
    padding: 0;
    border-right: 1px solid var(--border);
    padding-right: 2.25rem;
  }

  /* Photo fills the column width, square, cropped from the top so the face stays in frame */
  .profile-frame {
    width: 100%;
    aspect-ratio: 1 / 1;
    height: auto;
    margin: 0 0 1.5rem;
  }

  .profile-frame .profile-image {
    object-position: center top;
  }

  /* Divider between the photo and Details */
  .profile-frame + .cv-block {
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }


  .profile-image {
    box-shadow: var(--shadow);
  }

  .tech-stack {
    margin-bottom: 1.5rem;
  }

  .cv-block {
    margin-bottom: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .brand-visual > .cv-block:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .cv-title {
    margin-top: 0;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.75rem;
  }

  .cv-list {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin: 0;
  }

  .cv-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.3rem 0.4rem;
  }

  .cv-row dt {
    flex-shrink: 0;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .cv-row dt::after {
    content: ":";
  }

  .cv-row dd {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.4;
  }

  .cv-note {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .stack-title,
  .achievement-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.75rem;
  }

  .stack-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-chip {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-secondary);
    font-size: 0.78rem;
  }

  .tech-chip i {
    font-size: 0.75rem;
  }

  .achievement-badges {
    margin-top: 0;
    margin-bottom: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .achievement-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .achievement-head .achievement-title {
    margin: 0;
    line-height: 1;
  }

  .view-all-icon {
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: none;
    color: var(--text-muted);
    font-size: 0.7rem;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .view-all-icon:hover {
    color: var(--text);
    transform: translateX(2px);
  }

  .achievement-chip {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.6rem 0.7rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    cursor: pointer;
  }

  .achievement-chip:hover {
    border-color: var(--text-muted);
  }

  .chip-icon {
    width: 28px;
    height: 28px;
    border-radius: var(--radius-sm);
    background: var(--surface-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    font-size: 0.78rem;
    flex-shrink: 0;
  }

  .chip-content {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .chip-semester {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text);
  }


  .chip-gwa {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .chip-semester {
    white-space: nowrap;
  }




  .brand-narrative {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .brand-statement {
    margin-bottom: 1.5rem;
  }

  .brand-narrative .tech-stack {
    margin-bottom: 1.5rem;
  }

  .brand-contact {
    margin-top: auto;
  }

  .contact-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.75rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s ease;
  }

  .contact-item:hover {
    border-color: var(--text-muted);
  }

  .contact-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-sm);
    background: var(--surface-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    flex-shrink: 0;
  }

  .contact-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .contact-label {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .contact-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
  }

  .contact-arrow {
    color: var(--text-muted);
    font-size: 0.8rem;
  }

  .desktop-contact-ad {
    margin-top: 1.5rem;
  }
}
</style>
