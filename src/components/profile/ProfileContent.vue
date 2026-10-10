<template>
  <div>
    <!-- MOBILE LAYOUT -->
    <div class="mobile-profile-content m-profile">
      <!-- "Contact info" popup: same look as the Dean's List / Certifications popups -->
      <transition name="ci-fade">
        <div v-if="showContactInfo" class="mobile-modal-overlay ci-overlay" @click="showContactInfo = false">
          <div class="mobile-modal profile-modal ci-modal" role="dialog" aria-label="Contact info" @click.stop>
            <div class="mobile-modal-header">
              <h3 class="mobile-modal-title">Contact info</h3>
              <button type="button" class="mobile-modal-close" aria-label="Close" @click="showContactInfo = false">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <p class="mobile-modal-desc">Ways to reach me and find me online.</p>

            <div class="ci-list">
              <component
                :is="item.href ? 'a' : 'div'"
                v-for="item in contactInfo"
                :key="item.label"
                class="ci-item"
                :href="item.href || null"
                :target="item.external ? '_blank' : null"
                :rel="item.external ? 'noopener' : null"
              >
                <span class="ci-icon"><i :class="item.icon"></i></span>
                <span class="ci-info">
                  <strong>{{ item.label }}</strong>
                  <small>{{ item.value }}<template v-if="item.note"> · {{ item.note }}</template></small>
                </span>
                <i v-if="item.href" class="fas fa-chevron-right ci-arrow"></i>
              </component>
            </div>

            <div class="ci-docs">
              <a href="/Reymel_Mislang_CV.pdf" target="_blank" rel="noopener" class="ci-item ci-doc">
                <span class="ci-icon"><i class="fas fa-id-card"></i></span>
                <span class="ci-info"><strong>CV</strong><small>View PDF</small></span>
              </a>
              <a href="/Reymel_Mislang_Resume.pdf" target="_blank" rel="noopener" class="ci-item ci-doc">
                <span class="ci-icon"><i class="fas fa-file-lines"></i></span>
                <span class="ci-info"><strong>Resume</strong><small>View PDF</small></span>
              </a>
            </div>

            <AdSlot class="profile-modal-footer" type="banner" />
          </div>
        </div>
      </transition>

      <!-- Banner corner: pencil turns tile edit mode on / off -->
      <!-- Banner corner: pencil (edit tiles) + "⋯" (live stats tooltip) -->
      <div class="m-stats-wrap" @click.stop>
        <button
          v-if="canEditTiles"
          type="button"
          class="m-stats-btn"
          :class="{ active: tileEditing }"
          :aria-pressed="tileEditing"
          :aria-label="tileEditing ? 'Stop editing layout' : 'Edit layout'"
          @click="$root.tileEditMode = !$root.tileEditMode"
        >
          <i class="fas fa-pen"></i>
        </button>

        <button
          type="button"
          class="m-stats-btn"
          :class="{ active: showStats }"
          :aria-expanded="showStats"
          aria-label="Show live stats"
          @click="showStats = !showStats"
        >
          <i class="fas fa-ellipsis"></i>
        </button>

        <transition name="m-stats-pop">
          <div v-if="showStats" class="m-stats-tip" role="tooltip">
            <span class="m-stats-title">Live stats</span>
            <div class="m-stats-row"><span><i class="fas fa-eye"></i>Views</span><strong>{{ $root.statsLoading ? "…" : $root.visitorCount.toLocaleString() }}</strong></div>
            <div class="m-stats-row"><span><i class="fas fa-folder"></i>Projects</span><strong>{{ $root.statsLoading ? "…" : $root.projectsCount }}</strong></div>
            <div class="m-stats-row"><span><i class="fab fa-github"></i>Repositories</span><strong>{{ $root.statsLoading ? "…" : $root.reposCount }}</strong></div>
            <div class="m-stats-row"><span><i class="fas fa-clock"></i>Coding this week</span><strong>{{ $root.statsLoading ? "…" : shortCodingTime }}</strong></div>
          </div>
        </transition>
      </div>

      <!-- Cover banner (phones): grid of boxes, colors follow the theme -->
      <div class="m-banner" aria-hidden="true">
        <span class="m-deco-code m-deco-1">&lt;/&gt;</span>
        <span class="m-deco-code m-deco-2">{ build: true }</span>
        <span class="m-deco-code m-deco-3">const idea = () =&gt; ship();</span>
        <span class="m-deco-code m-deco-4">npm run deploy</span>
        <span class="m-deco-box m-deco-5"></span>
        <span class="m-deco-box m-deco-6"></span>
      </div>

      <!-- Profile header (LinkedIn style): round photo over the banner, left-aligned text -->
      <div class="m-hero">
        <div class="m-photo">
          <img :src="profileImage" alt="Reymel Mislang" class="profile-image" />
        </div>

        <h2 class="m-name">Reymel Mislang</h2>
        <p class="m-role">{{ text.desktopSubtitle }}</p>

        <p class="m-meta">
          <span>Naujan, Oriental Mindoro, Philippines</span>
          <button type="button" class="m-contact-link" @click="showContactInfo = true">Contact info</button>
        </p>

        <div class="m-badges">
          <button type="button" class="inline-badge" @click="openMobileDeansList" :title="text.deanListerAward">
            <span class="badge-label">{{ text.awards }}</span>
          </button>
          <button type="button" class="inline-badge" @click="$emit('open-certificates')" :title="text.certificates">
            <span class="badge-label">{{ text.certs }}</span>
          </button>
          <button type="button" class="inline-badge" @click="$emit('openLinks')" :title="text.projectLinks">
            <span class="badge-label">{{ text.links }}</span>
          </button>
        </div>

        <!-- "Open to work" box -->
        <router-link to="/services" class="m-open-card">
          <span class="m-open-title">Open to work</span>
          <span class="m-open-roles">Freelance, part-time & full-time · Remote or on-site</span>
          <span class="m-open-more">Show details</span>
        </router-link>

        <!-- Bio (inside the same card) — hidden for now; remove v-if to show again -->
        <div v-if="false" class="m-bio">
          <p class="statement-text">{{ text.aboutMobile1 }}</p>
          <router-link to="/about" class="m-more">
            More about me <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>

      <!-- All mobile tiles in ONE grid (profile links + quick links).
           Hold to edit: tap a handle to resize, tap two tiles to swap them. -->
      <div class="m-tiles">
        <div class="m-tiles-head">
          <p class="m-tiles-label">{{ text.getInTouch }}</p>
        </div>
        <div
          class="m-tiles-grid rt-grid"
          @pointerdown="startTileHold"
          @pointerup="cancelTileHold"
          @pointerleave="cancelTileHold"
          @pointercancel="cancelTileHold"
          @contextmenu="tileEditing && $event.preventDefault()"
        >
          <component
            :is="tile.slides ? 'div' : tile.href && !tileEditing ? 'a' : tile.id === 'spotify' && !tileEditing ? 'div' : 'button'"
            v-for="tile in orderedTiles"
            :key="tile.id"
            v-bind="tileLinkAttrs(tile)"
            class="m-tile"
            :class="[
              tileClass(tile.id, tile.size),
              tile.chip,
              'tile-' + tile.id,
              { 'rt-selected': selectedTileId === tile.id || dragOverId === tile.id, 'spotify-tile': tile.id === 'spotify', 'm-carousel-tile': tile.slides && tileSize(tile.id, tile.size) !== 'icon', idle: tile.idle }
            ]"
            :data-tile-id="tile.id"
            @pointerdown="startTileDrag($event, tile)"
            @click="onTileClick($event, tile)"
          >
            <!-- Swipeable tiles (projects, employer info); icon size shows just the icon -->
            <TileCarousel
              v-if="tile.slides && tileSize(tile.id, tile.size) !== 'icon'"
              :slides="tile.slides"
              :size="tileSize(tile.id, tile.size)"
              :locked="tileEditing"
            />
            <template v-else>
              <span v-if="tile.image" class="m-tile-icon m-tile-art">
                <img :src="tile.image" :alt="tile.label" />
              </span>
              <i v-else :class="[tile.icon, 'm-tile-icon']"></i>

              <small v-if="tile.kicker" class="spotify-tile-label">{{ tile.kicker }}</small>
              <span class="m-tile-label">{{ tile.label }}</span>
              <small>{{ tile.desc }}</small>
              <i :class="[tile.corner, 'm-tile-corner']"></i>
            </template>

            <span
              v-if="tileEditing"
              class="rt-handle"
              role="button"
              aria-label="Resize tile"
              @click.stop.prevent="cycleTileSize(tile.id, tile.size)"
            ><i class="fas fa-expand-alt"></i></span>
          </component>
        </div>
      </div>
    </div>

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
                @click="openDeansPopover"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>

            <div
              v-if="latestAchievement"
              class="achievement-chip"
              @click="openDeansPopover"
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

          <!-- Spotify Now Playing (data from App): only shown while a song plays -->
          <div v-if="spotifyPlaying" class="cv-block">
            <h4 class="cv-title">Now Playing</h4>
            <div class="spotify-card" :class="{ idle: !spotifyPlaying }">
              <div class="spotify-card-art">
                <img v-if="spotifyPlaying && $root.spotifyTrack.image" :src="$root.spotifyTrack.image" :alt="$root.spotifyTrack.title" />
                <i v-else class="fab fa-spotify"></i>
              </div>
              <div class="spotify-card-info">
                <span v-if="spotifyPlaying" class="spotify-card-label">Now Playing</span>
                <span class="spotify-card-title">
                  <span class="spotify-card-name">{{ spotifyPlaying ? $root.spotifyTrack.title : "Not playing" }}</span>
                </span>
                <i v-if="spotifyPlaying" class="fab fa-spotify spotify-card-logo" aria-hidden="true"></i>
                <span class="spotify-card-artist">{{ spotifyPlaying ? $root.spotifyTrack.artist : "Offline right now" }}</span>
                <span v-if="spotifyPlaying && $root.spotifyTrack.album" class="spotify-card-album">{{ $root.spotifyTrack.album }}</span>
              </div>
            </div>
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
              <div class="tech-chip" v-for="tech in techChips" :key="tech.name">
                <i :class="tech.icon"></i>
                <span>{{ tech.name }}</span>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div id="contact" ref="brandContact" class="brand-contact">
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

              <a href="/Reymel_Mislang_CV.pdf" target="_blank" rel="noopener" class="contact-item contact-cv">
                <div class="contact-icon">
                  <i class="fas fa-id-card fa-fw"></i>
                </div>

                <div class="contact-details">
                  <span class="contact-label">{{ text.cv }}</span>
                  <span class="contact-value">{{ text.downloadCV }}</span>
                </div>

                <i class="fas fa-external-link-alt contact-arrow"></i>
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
import TileCarousel from "@/components/profile/TileCarousel.vue";
import resizableTiles from "@/mixins/resizableTiles";
import projectsData from "@/data/projects.json";
import experiencesData from "@/data/experiences.json";
import servicesData from "@/data/services.json";
import certificatesData from "@/data/certificates.json";
import highlightsData from "@/data/highlights.json";
import { PINNED_CERTIFICATE } from "@/data/pinnedCertificate";

// Project screenshots live in src/assets (missing file -> no picture, skeleton only)
function projectImage(image) {
  if (!image) return "";
  if (/^https?:/.test(image)) return image;
  try {
    return require(`@/assets/${image}`);
  } catch (e) {
    return "";
  }
}

const PROFILE_TRANSLATIONS = {
  en: {
    contactMe: "Contact me",
    tapIcon: "Tap an icon to view details",
    awards: "Awards",
    certs: "Certs",
    links: "Links",
    certificates: "Certificates",
    projectLinks: "Project Links",

    desktopSubtitle: "Web Developer & IT Support",
    coreTechnologies: "Core Technologies",
    deanListerAward: "DEAN LISTER AWARD",
    viewAllAwards: "View all",
    awardsText: "awards",

    getInTouch: "Get in Touch",
    email: "Email",
    sendEmail: "Send an Email",
    cv: "Curriculum Vitae",
    downloadCV: "View CV",

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

    desktopSubtitle: "Web Developer & IT Support",
    coreTechnologies: "Core Technologies",
    deanListerAward: "DEAN LISTER AWARD",
    viewAllAwards: "Tingnan lahat",
    awardsText: "awards",

    getInTouch: "Makipag-ugnayan",
    email: "Email",
    sendEmail: "Mag-send ng Email",
    cv: "Curriculum Vitae",
    downloadCV: "Tingnan ang CV",

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

    desktopSubtitle: "網頁開發者與 IT 支援",
    coreTechnologies: "核心技術",
    deanListerAward: "院長名單獎項",
    viewAllAwards: "查看全部",
    awardsText: "個獎項",

    getInTouch: "聯絡方式",
    email: "電子郵件",
    sendEmail: "發送電子郵件",
    cv: "Curriculum Vitae",
    downloadCV: "查看 CV",

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

  mixins: [resizableTiles],

  components: {
    AdSlot,
    TileCarousel
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
    "openQRModal",
    "openDeansList",
    "openMobileDeansList",
    "openCertificatesListModal",
    "openLinks",
    "open-certificates"
  ],

  data() {
    return {
      // v2: new tile set; older saved layouts (with GitHub/LinkedIn) are ignored
      tileLayoutDocId: "home-v2",
      tileOrder: [],
      selectedTileId: null,
      dragOverId: null,
      currentTheme: document.documentElement.getAttribute("data-theme") || "light",
      showContactInfo: false,
      showStats: false,
      contactInfo: [
        { icon: "fab fa-linkedin", label: "LinkedIn", value: "linkedin.com/in/reymelreymislang", href: "https://www.linkedin.com/in/reymelreymislang", external: true },
        { icon: "fab fa-github", label: "GitHub", value: "github.com/codewithryry", href: "https://github.com/codewithryry", external: true },
        { icon: "fas fa-envelope", label: "Email", value: "reymelrey.mislang@gmail.com", href: "mailto:reymelrey.mislang@gmail.com" }
      ]
    };
  },

  watch: {
    tileEditing(on) {
      if (!on) this.selectedTileId = null;
    }
  },

  computed: {
    // WakaTime (last 7 days): "32 hrs 15 mins" -> "32h 15m" so it fits the tooltip
    shortCodingTime() {
      const text = this.$root.codingHoursText || "";
      if (!/\d/.test(text)) return "—";
      return text.replace(/\s*hrs?/g, "h").replace(/\s*mins?/g, "m");
    },

    // Claude Code is always listed (hardcoded, even when the stack comes from admin)
    techChips() {
      const hasClaude = this.techStack.some((tech) => tech.name === "Claude Code");
      return hasClaude ? this.techStack : [...this.techStack, { name: "Claude Code", icon: "fas fa-asterisk" }];
    },

    spotifyPlaying() {
      return !!(this.$root.spotifyTrack && this.$root.spotifyTrack.isPlaying);
    },

    // Every mobile homepage tile (profile links + quick links). Order/size are user-editable.
    homeTiles() {
      const track = this.$root.spotifyTrack || {};
      const playing = !!track.isPlaying;
      const theme = this.$root.currentTheme;
      const themeIcon =
        theme === "midnight" ? "fas fa-moon" : theme === "forest" ? "fas fa-leaf" : "fas fa-sun";
      const open = "fas fa-external-link-alt";

      return [
        // Default order + sizes (also what Reset returns to). Packs the 4-column grid with no gaps:
        // What I build (large) · Glance (tall) | TikTok (vertical) | Facebook/IG · Projects (full)
        // · LinkedIn | Dev.to · GitHub | Certs (tall) · Spotify (tall) | Support/Feedback (vertical) · Theme · Why (full)
        { id: "services", size: "lg", chip: "chip-1", icon: "fas fa-screwdriver-wrench", label: "What I build", slides: this.serviceSlides },
        { id: "glance", size: "tall", chip: "chip-2", icon: "fas fa-user-tie", label: "At a glance", slides: this.glanceSlides },
        { id: "tiktok", size: "vert", chip: "chip-5", icon: "fab fa-tiktok", label: "TikTok", desc: "@iamrymel", href: "https://www.tiktok.com/@iamrymel", external: true, corner: open },
        { id: "facebook", size: "icon", chip: "chip-5", icon: "fab fa-facebook", label: "Facebook", desc: "Follow", href: "https://www.facebook.com/100063507442180", external: true, corner: open },
        { id: "instagram", size: "icon", chip: "chip-4", icon: "fab fa-instagram", label: "Instagram", desc: "Follow", href: "https://www.instagram.com/iamrymel/", external: true, corner: open },
        { id: "work", size: "lg", chip: "chip-3", icon: "fas fa-folder-open", label: "Projects", slides: this.workSlides },
        { id: "linkedin", size: "sm", chip: "chip-2", icon: "fab fa-linkedin", label: "LinkedIn", desc: "Connect", href: "https://www.linkedin.com/in/reymelreymislang", external: true, corner: open },
        { id: "devto", size: "sm", chip: "chip-5", icon: "fab fa-dev", label: "Dev.to", desc: "Technical writing", href: "https://dev.to/codewithryry", external: true, corner: open },
        { id: "github", size: "sm", chip: "chip-3", icon: "fab fa-github", label: "GitHub", desc: "codewithryry", href: "https://github.com/codewithryry", external: true, corner: open },
        { id: "certs", size: "tall", chip: "chip-4", icon: "fas fa-award", label: "Certifications", slides: this.certSlides },
        {
          id: "spotify", size: "tall", chip: "chip-3", idle: !playing,
          icon: "fab fa-spotify", image: playing ? track.image : "",
          kicker: playing ? "Now Playing" : "Offline",
          label: playing ? track.title : "Spotify",
          desc: playing ? track.artist : "Not playing right now",
          corner: "fab fa-spotify"
        },
        { id: "support", size: "vert", chip: "chip-1", icon: "fas fa-qrcode", label: "Support", desc: "Multiple banks available", action: "qr", corner: open },
        { id: "feedback", size: "vert", chip: "chip-1", icon: "fas fa-comment-dots", label: "Message", desc: "Leave a message", action: "feedback", corner: open },
        { id: "theme", size: "sm", chip: "chip-2", icon: themeIcon, label: "Theme", desc: this.$root.currentThemeName, action: "theme", corner: "fas fa-exchange-alt" },
        { id: "why", size: "lg", chip: "chip-5", icon: "fas fa-star", label: "Why hire me", slides: this.whySlides },
      ];
    },

    // Saved order first, then any tiles not in the saved order (e.g. newly added ones)
    orderedTiles() {
      const byId = Object.fromEntries(this.homeTiles.map((t) => [t.id, t]));
      const saved = this.tileOrder.filter((id) => byId[id]);
      const rest = this.homeTiles.map((t) => t.id).filter((id) => !saved.includes(id));
      return [...saved, ...rest].map((id) => byId[id]);
    },

    // "Projects" tile: top 3 projects (text only, opens the live demo), then "View all"
    workSlides() {
      const projects = projectsData || [];
      const slides = projects.map((p) => ({
        icon: "fas fa-folder-open",
        kicker: p.status || "Featured project",
        title: p.title,
        text: p.description,
        chips: (p.technologies || []).slice(0, 3),
        thumb: { type: "site", src: projectImage(p.image) },
        ...(p.demoUrl ? { href: p.demoUrl } : { to: "/projects" })
      }));
      slides.push({
        icon: "fas fa-layer-group",
        kicker: "Portfolio",
        title: `View all ${projects.length} projects`,
        text: "Web apps, PWAs, automation and client builds.",
        to: "/projects"
      });
      return slides;
    },

    // "At a glance" tile: the 3 things employers check first
    glanceSlides() {
      const roles = experiencesData || [];
      const dev = roles.find((r) => /develop/i.test(r.role)) || roles[0] || {};
      const stack = this.techChips.map((t) => t.name);
      const deans = (this.achievements && this.achievements.deansList) || [];
      return [
        {
          icon: "fas fa-briefcase",
          kicker: "Experience",
          title: dev.role,
          text: `${dev.company} · ${dev.date}${roles.length > 1 ? ` · +${roles.length - 1} more roles` : ""}`,
          to: "/experience"
        },
        {
          icon: "fas fa-code",
          kicker: "Core stack",
          title: stack.slice(0, 3).join(" · "),
          text: stack.slice(3).join(", ") || "Full-stack web development",
          chips: stack.slice(3, 6),
          to: "/skills"
        },
        {
          icon: "fas fa-graduation-cap",
          kicker: "Education",
          title: "BS Information Technology",
          text: `Mindoro State University${deans.length ? ` · Dean's Lister ×${deans.length}` : ""}`,
          to: "/about"
        }
      ];
    },

    // "What I build" tile: services, each opens /services
    serviceSlides() {
      return (servicesData || []).map((sv) => ({
        icon: sv.icon || "fas fa-screwdriver-wrench",
        kicker: "What I build",
        title: sv.title,
        text: sv.description,
        chips: (sv.features || []).slice(0, 2),
        to: "/services"
      }));
    },

    // "Certifications" tile: each slide opens the certificate file
    certSlides() {
      return [PINNED_CERTIFICATE, ...(certificatesData || [])].map((c) => ({
        icon: "fas fa-award",
        kicker: c.category || "Certificate",
        title: c.title,
        text: c.description,
        // Paper skeleton only, no picture
        thumb: { type: "doc", src: "" },
        href: /^https?:/.test(c.file) ? c.file : `/certificates/${c.file}`
      }));
    },

    // "Why hire me" tile: highlights, each opens /about
    whySlides() {
      return (highlightsData || []).map((h) => ({
        icon: "fas fa-star",
        kicker: "Why hire me",
        title: h.title,
        text: h.description,
        to: "/about"
      }));
    },

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
    document.addEventListener("click", this.closeStats);
    this._themeObserver = new MutationObserver(() => {
      this.currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    });
    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
  },

  beforeUnmount() {
    document.removeEventListener("click", this.closeStats);
    if (this._themeObserver) this._themeObserver.disconnect();
  },

  methods: {
    closeStats() {
      this.showStats = false;
    },

    // Attributes for a tile's <a> (links) or <button> (actions / edit mode)
    tileLinkAttrs(tile) {
      if (tile.slides) return {};
      if (!tile.href || this.tileEditing) return { type: "button" };
      const attrs = { href: tile.href };
      if (tile.download) attrs.download = "";
      if (tile.external) {
        attrs.target = "_blank";
        attrs.rel = "noopener noreferrer";
      }
      return attrs;
    },

    // Desktop: show the Dean's List viewer as a compact popover over the Get in Touch area
    openDeansPopover() {
      const el = this.$refs.brandContact;
      const rect = el ? el.getBoundingClientRect() : null;
      this.$emit("openDeansList", 0, rect ? { top: rect.top, left: rect.left, width: rect.width } : null);
    },

    onTileClick(e, tile) {
      // Ignore the click that ends the long press that opened edit mode
      if (this.justEnteredEdit) {
        this.justEnteredEdit = false;
        e.preventDefault();
        return;
      }

      // Edit mode: tap one tile, then another, to swap their places
      if (this.tileEditing) {
        e.preventDefault();
        if (!this.selectedTileId || this.selectedTileId === tile.id) {
          this.selectedTileId = this.selectedTileId === tile.id ? null : tile.id;
          return;
        }
        this.swapTiles(this.selectedTileId, tile.id);
        this.selectedTileId = null;
        return;
      }

      if (tile.action === "feedback") this.$root.openFeedback();
      else if (tile.action === "theme") this.$root.cycleTheme();
      else if (tile.action === "qr") this.$emit("openQRModal");
    },

    // Edit mode: drag a tile onto another to swap them (tap-to-swap still works)
    startTileDrag(e, tile) {
      if (!this.tileEditing || (e.target.closest && e.target.closest(".rt-handle"))) return;
      const from = tile.id;
      let moved = false;

      const move = (ev) => {
        const el = document.elementFromPoint(ev.clientX, ev.clientY);
        const over = el && el.closest && el.closest("[data-tile-id]");
        const id = over ? over.dataset.tileId : null;
        if (id && id !== from) moved = true;
        this.selectedTileId = from;
        this.dragOverId = id && id !== from ? id : null;
      };

      const end = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", end);
        window.removeEventListener("pointercancel", end);
        if (moved) {
          if (this.dragOverId) this.swapTiles(from, this.dragOverId);
          this.selectedTileId = null;
          // Swallow the click that follows the drop
          this.justEnteredEdit = true;
          setTimeout(() => { this.justEnteredEdit = false; }, 0);
        }
        this.dragOverId = null;
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", end);
      window.addEventListener("pointercancel", end);
    },

    swapTiles(a, b) {
      const order = this.orderedTiles.map((t) => t.id);
      const i = order.indexOf(a);
      const j = order.indexOf(b);
      [order[i], order[j]] = [order[j], order[i]];
      this.tileOrder = order;
    },

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
/* ===== "Contact info" popup (phones) — matches the Dean's List popup ===== */
.ci-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(15, 23, 42, 0.75);
}

.ci-modal {
  width: 100%;
  padding: 1.25rem;
  background: var(--surface);
}

.ci-modal .mobile-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.ci-modal .mobile-modal-title {
  margin: 0;
  color: var(--text);
  font-size: 1.4rem;
  font-weight: 700;
}

.ci-modal .mobile-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--text-secondary);
  cursor: pointer;
}

.ci-modal .mobile-modal-desc {
  margin: 0 0 1rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.5;
}

/* Rows look like the Dean's List rows */
.ci-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

/* CV + Resume side by side to save space */
.ci-docs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
  margin-top: 0.45rem;
}

.ci-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 14px;
  color: var(--text);
  text-decoration: none;
}

.ci-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--text);
  color: var(--bg);
  font-size: 0.9rem;
}

.ci-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.ci-info strong {
  font-size: 0.92rem;
  font-weight: 600;
}

.ci-info small {
  overflow: hidden;
  color: var(--text-secondary);
  font-size: 0.78rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ci-arrow {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.ci-fade-enter-active,
.ci-fade-leave-active {
  transition: opacity 0.2s ease;
}

.ci-fade-enter-active .ci-modal,
.ci-fade-leave-active .ci-modal {
  transition: transform 0.25s ease;
}

.ci-fade-enter-from,
.ci-fade-leave-to {
  opacity: 0;
}

.ci-fade-enter-from .ci-modal,
.ci-fade-leave-to .ci-modal {
  transform: translateY(40px);
}

/* Spotify tile only shows what's playing, it doesn't link out */
.m-tile.tile-spotify {
  cursor: default;
}

/* Keep tile focus and the non-actionable Spotify display out of normal interaction. */
.m-tile:focus-visible {
  outline: none;
  box-shadow: none;
}

.m-tile.tile-spotify:not(.rt-editing) {
  pointer-events: none;
}

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

/* Desktop bio: justified so both edges line up */
.brand-statement .statement-text {
  text-align: justify;
  hyphens: none;
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

  /* One combined card: header (photo, name, buttons) + divider + bio */
  .mobile-profile-content {
    gap: 1rem;
    padding: 1.1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface);
  }

  /* Compact header so it fits narrow phones */
  /* Photo + gap stays 110px wide so the name/buttons column doesn't move;
     the photo stretches to the full height of that column */
  .mobile-profile-content .mobile-header {
    align-items: stretch;
    gap: 0.4rem;
  }

  .mobile-profile-content .mobile-profile-frame {
    width: 104px;
    height: auto;
    min-height: 104px;
  }

  .mobile-profile-content .mobile-profile-frame .profile-image {
    height: 100%;
    object-position: center top;
  }

  .mobile-profile-content .mobile-identity {
    min-width: 0;
  }

  .mobile-profile-content .center-badges {
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .mobile-profile-content .inline-badge {
    gap: 4px;
    padding: 5px 8px;
    font-size: 0.68rem;
  }

  .mobile-profile-content .about-card {
    padding: 1rem 0 0;
    border: none;
    border-top: 1px solid var(--border);
    border-radius: 0;
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
    gap: 0.4rem;
  }

  /* Chips stretch to fill the row so there's no empty gap at the end */
  .tech-chip {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.6rem;
    white-space: nowrap;
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

  /* Spotify Now Playing card (left column): compact, cover on the left */
  .spotify-card {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.55rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--surface);
  }

  .spotify-card-art {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background: var(--surface-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 1.4rem;
  }

  .spotify-card-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spotify-card-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  .spotify-card-title,
  .spotify-card-artist,
  .spotify-card-album {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spotify-card-name {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .spotify-card-title {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text);
  }

  .spotify-card-artist {
    font-size: 0.74rem;
    color: var(--text-secondary);
  }

  .spotify-card-album {
    font-size: 0.68rem;
    color: var(--text-muted);
  }

  /* Fit the narrow sidebar: full title wraps, Spotify logo top-right */
  /* Same look as the mobile Spotify tile: cover on top, text stacked below */
  .spotify-card {
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.8rem;
  }

  .spotify-card-art {
    width: 56px;
    height: 56px;
  }

  .spotify-card .spotify-card-album {
    display: none;
  }

  .spotify-card-label {
    color: #1db954;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .spotify-card-info {
    gap: 0.15rem;
  }

  /* Sidebar + contact cards: one plain, rounded style (border only, no fill) */
  .desktop-profile-content :is(.achievement-chip, .contact-item, .spotify-card) {
    border-radius: 16px;
  }

  .desktop-profile-content .spotify-card {
    background: transparent;
  }

  .desktop-profile-content :is(.chip-icon, .contact-icon, .spotify-card-art) {
    border-radius: 10px;
  }

  /* Small grey Spotify logo in the corner */
  .spotify-card-logo {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  .spotify-card-title {
    display: block;
    white-space: normal;
  }

  /* Full title and artist, wrapping on whole words (no cut) */
  .spotify-card-name {
    display: block;
    font-size: 0.8rem;
    line-height: 1.25;
    overflow: visible;
    overflow-wrap: normal;
  }

  .spotify-card-artist {
    white-space: normal;
  }


  /* Small equalizer while a song plays */
  .spotify-card-bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 12px;
    flex-shrink: 0;
  }

  .spotify-card-bars i {
    width: 2px;
    height: 100%;
    border-radius: 1px;
    background: #1db954;
    transform-origin: bottom;
    animation: spotify-bar 0.9s ease-in-out infinite;
  }

  .spotify-card-bars i:nth-child(2) {
    animation-delay: -0.3s;
  }

  .spotify-card-bars i:nth-child(3) {
    animation-delay: -0.6s;
  }

  @keyframes spotify-bar {
    0%, 100% { transform: scaleY(0.35); }
    50% { transform: scaleY(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .spotify-card-bars i {
      animation: none;
    }
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

  /* CV card: same rhythm as Email, centered icon, text stays on one line at any zoom */
  .contact-cv .contact-icon i {
    font-size: 0.95rem;
    line-height: 1;
  }

  .contact-cv .contact-details {
    min-width: 0;
  }

  .contact-cv :is(.contact-label, .contact-value) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .contact-cv .contact-arrow {
    flex-shrink: 0;
  }

  .desktop-contact-ad {
    margin-top: 1.5rem;
  }
}

/* Very small phones */
@media (max-width: 360px) {
  .mobile-profile-content .mobile-profile-frame {
    width: 86px;
    min-height: 86px;
  }

  .mobile-profile-content .inline-badge {
    padding: 4px 7px;
  }
}

/* ===== Mobile profile (centered, app-style) ===== */
@media (max-width: 768px) {
  .mobile-profile-content.m-profile {
    gap: 1rem;
    padding: 0;
    border: none;
    background: none;
  }

  .m-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem 1.25rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--surface);
    text-align: center;
  }

  .m-photo {
    width: 128px;
    height: 128px;
    margin-bottom: 0.9rem;
  }

  .m-photo .profile-image {
    border-radius: 24px;
    object-position: center top;
    box-shadow: var(--shadow);
  }

  .m-name {
    margin: 0;
    color: var(--text);
    font-family: var(--font-heading);
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .m-role {
    margin: 0.2rem 0 0;
    color: var(--text-secondary);
    font-size: 0.85rem;
  }

  .m-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem 1rem;
    margin: 0.75rem 0 0;
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .m-meta i {
    margin-right: 3px;
  }

  .m-badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 1rem;
  }

  .m-badges .inline-badge {
    padding: 6px 10px;
    font-size: 0.7rem;
  }

  .m-bio {
    padding: 1.1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--surface);
  }

  .m-tiles {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem;
  }

  .m-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    padding: 0.9rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--surface);
    color: var(--text);
    text-decoration: none;
    transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
    will-change: transform;
  }

  .m-tile > i:first-child {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }

  .m-tile-label {
    font-size: 0.85rem;
    font-weight: 700;
  }

  .m-tile small {
    overflow: hidden;
    color: var(--text-muted);
    font-size: 0.7rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .m-tile-corner {
    position: absolute;
    top: 0.85rem;
    right: 0.85rem;
    color: var(--text-muted);
    font-size: 0.7rem;
  }
}

/* ===== Mobile profile: grey panels like the reference ===== */
@media (max-width: 768px) {
  .m-profile {
    --m-panel: linear-gradient(
      180deg,
      color-mix(in srgb, var(--text) 9%, var(--surface)) 0%,
      color-mix(in srgb, var(--text) 4%, var(--surface)) 100%
    );
  }

  /* Photo overlaps the top of the grey header card */
  .m-hero {
    margin-top: 64px;
    padding-top: 0;
    border: none;
    background: var(--m-panel);
  }

  .m-photo {
    margin-top: -64px;
    padding: 6px;
    border-radius: 30px;
    background: var(--bg);
    width: 140px;
    height: 140px;
  }

  .m-photo .profile-image {
    border: none;
    box-shadow: none;
  }

  .m-bio,
  .m-tile {
    border: none;
    background: var(--m-panel);
  }

  /* Darker grey tiles for the links, like the reference */
  .m-tile {
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--text) 14%, var(--surface)) 0%,
      color-mix(in srgb, var(--text) 6%, var(--surface)) 100%
    );
  }

  .m-badges .inline-badge {
    border-color: transparent;
    background: color-mix(in srgb, var(--surface) 70%, transparent);
  }
}

/* ===== Mobile profile: bigger photo + "More about me" link ===== */
@media (max-width: 768px) {
  .m-hero {
    margin-top: 31vw;
  }

  .m-photo {
    width: 60vw;
    max-width: 240px;
    height: auto;
    aspect-ratio: 1 / 1;
    margin-top: calc(-31vw);
    padding: 7px;
    border-radius: 36px;
  }

  .m-photo .profile-image {
    border-radius: 30px;
  }

  .m-name {
    margin-top: 0.25rem;
    font-size: 1.55rem;
  }

  .m-bio .statement-text {
    margin: 0;
  }

  .m-more {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 0.75rem;
    color: var(--text);
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
  }

  .m-more i {
    font-size: 0.7rem;
  }
}

@media (min-width: 400px) and (max-width: 768px) {
  /* Cap the overlap once the photo hits its 240px max */
  .m-hero {
    margin-top: min(31vw, 124px);
  }

  .m-photo {
    margin-top: calc(-1 * min(31vw, 124px));
  }
}

/* ===== Mobile profile: one card, photo fully inside it ===== */
@media (max-width: 768px) {
  .m-hero,
  .m-hero {
    margin-top: 0;
    padding: 1.25rem 1.1rem 1.25rem;
  }

  .m-photo,
  .m-photo {
    margin-top: 0;
    padding: 0;
    background: none;
    border-radius: 28px;
  }

  .m-photo .profile-image {
    border-radius: 28px;
  }

  /* Bio now sits inside the card, under a divider */
  .m-hero .m-bio {
    width: 100%;
    margin-top: 1.1rem;
    padding: 1rem 0 0;
    border-radius: 0;
    border-top: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
    background: none;
    text-align: left;
  }
}

@media (min-width: 400px) and (max-width: 768px) {
  .m-hero {
    margin-top: 0;
  }

  .m-photo {
    margin-top: 0;
  }
}

/* ===== Mobile link tiles: bento grid ===== */
@media (max-width: 768px) {
  .m-tiles {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.6rem;
  }

  .m-tile {
    min-height: 104px;
    justify-content: flex-end;
    padding: 0.85rem;
  }

  .m-tile--wide {
    grid-column: span 2;
  }

  .m-tile--full {
    grid-column: 1 / -1;
  }

  .m-tile-icon {
    margin-bottom: auto;
    font-size: 1.6rem;
  }

  .m-tile > i.m-tile-icon:first-child {
    margin-bottom: auto;
    font-size: 1.6rem;
  }

  .m-tile-top {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: auto;
  }

  .m-tile-top .m-tile-icon {
    margin: 0;
  }

  .m-tile-pill {
    padding: 2px 10px;
    border-radius: 999px;
    background: var(--surface);
    color: var(--text-secondary);
    font-size: 0.65rem;
    font-weight: 600;
  }

  .m-tile-label {
    margin-top: 0.6rem;
  }
}

/* ===== Mobile profile: one main container holding the card + tiles ===== */
@media (max-width: 768px) {
  .mobile-profile-content.m-profile {
    gap: 0.6rem;
    padding: 0.65rem;
    border-radius: 30px;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--text) 13%, var(--bg)) 0%,
      color-mix(in srgb, var(--text) 6%, var(--bg)) 100%
    );
  }

  /* Inner cards: a lighter shade so they read as separate boxes inside */
  .m-hero,
  .m-tile {
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--text) 5%, var(--surface)) 0%,
      color-mix(in srgb, var(--text) 2%, var(--surface)) 100%
    );
  }

  .m-hero {
    border-radius: 24px;
  }

  .m-tile {
    border-radius: 20px;
  }
}

/* ===== Mobile profile: inner cards blend into the container (like the reference) ===== */
@media (max-width: 768px) {
  .mobile-profile-content.m-profile {
    padding: 0.75rem 0.75rem 0.9rem;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--text) 10%, var(--bg)) 0%,
      color-mix(in srgb, var(--text) 4%, var(--bg)) 100%
    );
  }

  /* Profile part is the container itself: no separate box */
  .m-hero {
    background: none;
    padding: 0.75rem 0.5rem 0.5rem;
  }

  /* Tiles: only a faint tint, no border, so they sit softly on the container */
  .m-tile {
    background: color-mix(in srgb, var(--text) 5%, transparent);
  }
}

@media (max-width: 768px) {
  .m-badges {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 300px;
    gap: 0;
    margin: 1.1rem auto 0;
    padding: 3px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface-soft);
  }

  .m-badges .inline-badge,
  :root:not([data-theme="midnight"]):not([data-theme="forest"]):not([data-theme="dark"]) .m-badges .inline-badge {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 4px;
    border: none;
    border-radius: 999px;
    background: none;
    box-shadow: none;
    color: var(--text-secondary);
    font-size: 0.74rem;
    font-weight: 600;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .m-badges .inline-badge i {
    font-size: 0.75rem;
  }

  /* Thin dividers between the three parts */
  .m-badges .inline-badge + .inline-badge::before {
    content: "";
    position: absolute;
    left: 0;
    top: 25%;
    bottom: 25%;
    width: 1px;
    background: var(--border);
  }

  .m-badges .inline-badge:active {
    background: var(--surface);
    color: var(--text);
  }
}

@media (max-width: 768px) {
  :root .mobile-profile-content.m-profile {
    padding: 0;
    background: none;
    border-radius: 0;
  }
}

/* ===== Phones: photo overlaps the top of a white profile card (reference style) ===== */
@media (max-width: 768px) {
  :root .m-hero {
    margin-top: min(30vw, 120px);
    padding: 0 1.1rem 1.25rem;
    border-radius: 26px;
    background: var(--surface);
    box-shadow: 0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px rgb(15 23 42 / 0.06);
  }

  :root .m-photo {
    margin-top: calc(-1 * min(30vw, 120px));
  }

  :root .m-tile {
    background: var(--surface);
    box-shadow: 0 1px 2px rgb(15 23 42 / 0.04);
  }
}

/* ===== Phones: one white sheet (profile + tiles), soft grey tiles inside ===== */
@media (max-width: 768px) {
  :root .mobile-profile-content.m-profile {
    gap: 0;
  }

  :root .m-hero {
    border-radius: 26px 26px 0 0;
    box-shadow: none;
  }

  :root .m-tiles {
    padding: 0.25rem 0.75rem 0.75rem;
    background: var(--surface);
  }

  :root .m-tile {
    background: var(--surface-soft);
    box-shadow: none;
  }
}

/* ===== Mobile profile: Spotify Now Playing row ===== */
@media (max-width: 768px) {
  .m-now-playing {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    margin-top: 0.9rem;
    padding: 0.6rem;
    border-radius: 18px;
    background: var(--surface-soft);
    color: var(--text);
    text-align: left;
    text-decoration: none;
  }

  .m-np-art {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 12px;
    background: #1db954;
    color: #fff;
    font-size: 1.2rem;
  }

  .m-np-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .m-np-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.3;
  }

  .m-np-text small {
    color: #1db954;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .m-np-text strong,
  .m-np-text span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .m-np-text strong {
    font-size: 0.85rem;
  }

  .m-np-text span {
    color: var(--text-muted);
    font-size: 0.72rem;
  }

  .m-np-logo {
    margin-left: auto;
    color: #1db954;
    font-size: 1.1rem;
  }
}

/* ===== Mobile homepage cover banner ===== */
.m-banner {
  display: none;
}

@media (max-width: 768px) {
  .m-banner {
    position: relative;
    display: block;
    height: 150px;
    overflow: hidden;
    border-radius: 26px;
    /* Solid theme color + box grid (lines and boxes use theme tokens) */
    background-color: var(--surface-soft);
  }

  /* Box grid lines */
  .m-banner::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 30px 30px;
    background-position: -1px -1px;
  }

  /* "⋯" stats button (top-right of the banner) + its tooltip */
  .m-profile {
    position: relative;
  }

  .m-stats-wrap {
    position: absolute;
    top: 14px;
    right: 10px;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  /* Plain icon buttons (no card), still a comfortable tap size */
  .m-stats-btn {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: none;
    background: none;
    color: var(--text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
  }

  .m-stats-btn .fa-pen {
    font-size: 0.8rem;
  }

  .m-stats-btn.active {
    color: var(--text);
  }

  /* Live stats tooltip under the "⋯" */
  .m-stats-tip {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    width: 210px;
    padding: 0.6rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface);
    box-shadow: var(--shadow-xl, var(--shadow));
  }

  .m-stats-tip::before {
    content: "";
    position: absolute;
    top: -6px;
    right: 12px;
    width: 10px;
    height: 10px;
    border-top: 1px solid var(--border);
    border-left: 1px solid var(--border);
    background: var(--surface);
    transform: rotate(45deg);
  }

  .m-stats-title {
    display: block;
    margin-bottom: 0.35rem;
    color: var(--text-muted);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .m-stats-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.3rem 0;
    font-size: 0.76rem;
  }

  .m-stats-row + .m-stats-row {
    border-top: 1px solid var(--border);
  }

  .m-stats-row span {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--text-secondary);
  }

  .m-stats-row i {
    width: 14px;
    color: var(--text-muted);
    font-size: 0.7rem;
    text-align: center;
  }

  .m-stats-row strong {
    color: var(--text);
    font-weight: 700;
    white-space: nowrap;
  }

  .m-stats-pop-enter-active,
  .m-stats-pop-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .m-stats-pop-enter-from,
  .m-stats-pop-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }

  /* Pencil while editing: accent color so you know edit mode is on */
  .m-stats-btn.active .fa-pen {
    color: #22c55e;
  }



  /* Desktop CTA decorations, scaled down: code badges + outlined boxes, kept clear of the photo and buttons */
  .m-deco-code {
    position: absolute;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    font-family: "SF Mono", "Fira Code", Consolas, monospace;
    font-size: 0.62rem;
    white-space: nowrap;
    box-shadow: var(--shadow-sm);
  }

  .m-deco-box {
    position: absolute;
    width: 24px;
    height: 24px;
    border: 1px solid var(--text-muted);
    border-radius: var(--radius-sm);
    opacity: 0.35;
  }

  .m-deco-1 { top: 16px; left: 16px; }
  .m-deco-2 { top: 20px; left: 34%; }
  .m-deco-3 { top: 58px; right: 16px; }
  .m-deco-4 { bottom: 14px; right: 16px; }
  .m-deco-5 { top: 60px; left: 22%; transform: rotate(12deg); }
  .m-deco-6 { bottom: 18px; left: 46%; transform: rotate(-8deg); }

  .m-banner-code {
    position: absolute;
    top: 14px;
    right: 16px;
    color: color-mix(in srgb, var(--bg) 70%, transparent);
    font-family: "SF Mono", "Fira Code", Consolas, monospace;
    font-size: 0.8rem;
  }

  /* Pull the card up so the photo starts 40px into the banner */
  :root .m-banner + .m-hero {
    margin-top: calc(min(30vw, 120px) - 110px);
  }

  /* Photo sits above the banner */
  .m-photo {
    position: relative;
    z-index: 1;
  }
}

/* Phones: edge-to-edge banner from the top of the screen */
@media (max-width: 768px) {
  .m-banner {
    border-radius: 0 0 26px 26px;
  }
}

/* Phones: banner runs underneath the card (no grey gap between them) */
@media (max-width: 768px) {
  .m-banner {
    height: 180px;
    border-radius: 0;
  }

  /* Card overlaps the bottom 30px of the banner and sits on top of it */
  :root .m-banner + .m-hero {
    position: relative;
    z-index: 1;
    margin-top: -30px;
  }
}

/* Phones: photo ~49% of the screen width (max 210px), still half over the banner */
@media (max-width: 768px) {
  :root .m-photo {
    width: 49vw;
    max-width: 210px;
    margin-top: calc(-1 * min(24.5vw, 105px));
  }
}

/* Small section label + divider so the tiles flow on from the profile part */
@media (max-width: 768px) {
  :root .m-tiles {
    padding-top: 0.5rem;
  }

  .m-tiles-label {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0.25rem 0.25rem 0.1rem;
    color: var(--text-muted);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .m-tiles-label::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border);
  }
}

/* Tile section header label */
@media (max-width: 768px) {
  .m-tiles-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.6rem;
  }

  .m-tiles-head .m-tiles-label {
    flex: 1;
    margin: 0 !important;
  }
}
</style>
