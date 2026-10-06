<template>
  <div>
    <!-- MOBILE LAYOUT -->
    <div class="mobile-profile-content m-profile">
      <!-- Cover banner (phones): photo overlaps its bottom edge -->
      <div class="m-banner" aria-hidden="true">
        <!-- Background video: drop a free HD clip at public/banner.mp4.
             If it's missing or fails, the gradient + grid shows instead. -->
        <video
          v-if="bannerVideoOk"
          class="m-banner-video"
          src="/banner.mp4"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          @loadeddata="playBannerVideo"
          @error="bannerVideoOk = false"
        ></video>
      </div>

      <!-- Centered header: photo, name, role, location -->
      <div class="m-hero">
        <div class="m-photo">
          <img :src="profileImage" alt="Reymel Mislang" class="profile-image" />
        </div>

        <h2 class="m-name">Reymel Mislang</h2>
        <p class="m-role">{{ text.desktopSubtitle }}</p>

        <p class="m-meta">
          <span><i class="fas fa-map-marker-alt"></i> {{ text.locationValue }}</span>
          <span><i class="fas fa-birthday-cake"></i> {{ text.dobValue }}</span>
        </p>

        <div class="m-badges">
          <button type="button" class="inline-badge" @click="openMobileDeansList" :title="text.deanListerAward">
            <i class="fas fa-trophy"></i>
            <span class="badge-label">{{ text.awards }}</span>
          </button>
          <button type="button" class="inline-badge" @click="$emit('open-certificates')" :title="text.certificates">
            <i class="fas fa-award"></i>
            <span class="badge-label">{{ text.certs }}</span>
          </button>
          <button type="button" class="inline-badge" @click="$emit('openLinks')" :title="text.projectLinks">
            <i class="fas fa-link"></i>
            <span class="badge-label">{{ text.links }}</span>
          </button>
        </div>


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
          <!-- Anyone can rearrange tiles (no long-press needed) -->
          <button
            type="button"
            class="m-tiles-edit"
            :class="{ active: tileEditing }"
            :title="tileEditing ? 'Done' : 'Edit tiles'"
            :aria-label="tileEditing ? 'Done editing tiles' : 'Edit tiles'"
            @click="$root.tileEditMode = !tileEditing"
          >
            <i class="fas" :class="tileEditing ? 'fa-check' : 'fa-pen'"></i>
          </button>
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
            :is="tile.href && !tileEditing ? 'a' : 'button'"
            v-for="tile in orderedTiles"
            :key="tile.id"
            v-bind="tileLinkAttrs(tile)"
            class="m-tile"
            :class="[
              tileClass(tile.id, tile.size),
              tile.chip,
              { 'rt-selected': selectedTileId === tile.id, 'spotify-tile': tile.id === 'spotify', idle: tile.idle }
            ]"
            @click="onTileClick($event, tile)"
          >
            <span v-if="tile.image" class="m-tile-icon m-tile-art">
              <img :src="tile.image" :alt="tile.label" />
            </span>
            <i v-else :class="[tile.icon, 'm-tile-icon']"></i>

            <small v-if="tile.kicker" class="spotify-tile-label">{{ tile.kicker }}</small>
            <span class="m-tile-label">{{ tile.label }}</span>
            <small>{{ tile.desc }}</small>
            <i :class="[tile.corner, 'm-tile-corner']"></i>

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
import resizableTiles from "@/mixins/resizableTiles";

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

  mixins: [resizableTiles],

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
    "openQRModal",
    "openDeansList",
    "openMobileDeansList",
    "openCertificatesListModal",
    "openLinks",
    "open-certificates"
  ],

  data() {
    return {
      tileLayoutDocId: "home",
      tileOrder: [],
      selectedTileId: null,
      currentTheme: document.documentElement.getAttribute("data-theme") || "light",
      bannerVideoOk: true
    };
  },

  watch: {
    tileEditing(on) {
      if (!on) this.selectedTileId = null;
    }
  },

  computed: {
    // Every mobile homepage tile (profile links + quick links). Order/size are user-editable.
    homeTiles() {
      const track = this.$root.spotifyTrack || {};
      const playing = !!track.isPlaying;
      const theme = this.$root.currentTheme;
      const themeIcon =
        theme === "froth" ? "fas fa-tint" : theme === "midnight" ? "fas fa-moon" : theme === "forest" ? "fas fa-leaf" : "fas fa-sun";
      const open = "fas fa-external-link-alt";

      return [
        { id: "email", size: "wide", chip: "chip-1", icon: "fas fa-envelope", label: this.text.email, desc: "reymelrey.mislang@gmail.com", href: "mailto:reymelrey.mislang@gmail.com", corner: open },
        { id: "cv", size: "sm", chip: "chip-4", icon: "fas fa-id-card", label: "CV", desc: "Download", href: "/Reymel_Mislang_CV.docx", download: true, corner: "fas fa-download" },
        { id: "github", size: "sm", chip: "chip-3", icon: "fab fa-github", label: "GitHub", desc: "@codewithryry", href: "https://github.com/codewithryry", external: true, corner: open },
        { id: "linkedin", size: "sm", chip: "chip-2", icon: "fab fa-linkedin", label: "LinkedIn", desc: "Reymel Mislang", href: "https://www.linkedin.com/in/reymelreymislang/", external: true, corner: open },
        { id: "tiktok", size: "icon", chip: "chip-5", icon: "fab fa-tiktok", label: "TikTok", desc: "@devrymel", href: "https://www.tiktok.com/@devrymel", external: true, corner: open },
        { id: "instagram", size: "icon", chip: "chip-4", icon: "fab fa-instagram", label: "Instagram", desc: "Follow", href: "https://www.instagram.com/iamrymel/", external: true, corner: open },
        { id: "facebook", size: "sm", chip: "chip-5", icon: "fab fa-facebook", label: "Facebook", desc: "Follow", href: "https://www.facebook.com/100063507442180", external: true, corner: open },
        { id: "feedback", size: "sm", chip: "chip-1", icon: "fas fa-comment-dots", label: "Feedback", desc: "Leave a message", action: "feedback", corner: open },
        {
          id: "spotify", size: "tall", chip: "chip-3", idle: !playing,
          icon: "fab fa-spotify", image: playing ? track.image : "",
          kicker: playing ? "Now Playing" : "Offline",
          label: playing ? track.title : "Spotify",
          desc: playing ? track.artist : "Not playing right now",
          href: playing && track.url ? track.url : "https://open.spotify.com", external: true, corner: "fab fa-spotify"
        },
        { id: "coffee", size: "tall", chip: "chip-4", icon: "fas fa-coffee", label: "Coffee", desc: "Support my work", href: "https://buymeacoffee.com/reymelreym7", external: true, corner: open },
        { id: "theme", size: "sm", chip: "chip-2", icon: themeIcon, label: "Theme", desc: this.$root.currentThemeName, action: "theme", corner: "fas fa-exchange-alt" },
        { id: "devto", size: "sm", chip: "chip-5", icon: "fab fa-dev", label: "Dev.to", desc: "Technical writing", href: "https://dev.to/codewithryry", external: true, corner: open },
        { id: "portfolio", size: "sm", chip: "chip-3", icon: "fas fa-briefcase", label: "Portfolio", desc: "View my work", href: "https://reymelreymislang.vercel.app/", external: true, corner: open },
        { id: "support", size: "sm", chip: "chip-1", icon: "fas fa-qrcode", label: "Support Me", desc: "Multiple banks available", action: "qr", corner: open }
      ];
    },

    // Saved order first, then any tiles not in the saved order (e.g. newly added ones)
    orderedTiles() {
      const byId = Object.fromEntries(this.homeTiles.map((t) => [t.id, t]));
      const saved = this.tileOrder.filter((id) => byId[id]);
      const rest = this.homeTiles.map((t) => t.id).filter((id) => !saved.includes(id));
      return [...saved, ...rest].map((id) => byId[id]);
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
        froth:    "profilelight.jpg",
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
    // Attributes for a tile's <a> (links) or <button> (actions / edit mode)
    tileLinkAttrs(tile) {
      if (!tile.href || this.tileEditing) return { type: "button" };
      const attrs = { href: tile.href };
      if (tile.download) attrs.download = "";
      if (tile.external) {
        attrs.target = "_blank";
        attrs.rel = "noopener noreferrer";
      }
      return attrs;
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

    swapTiles(a, b) {
      const order = this.orderedTiles.map((t) => t.id);
      const i = order.indexOf(a);
      const j = order.indexOf(b);
      [order[i], order[j]] = [order[j], order[i]];
      this.tileOrder = order;
    },

    // Make sure the banner video is muted before playing so mobile browsers allow autoplay
    playBannerVideo(e) {
      const video = e.target;
      video.muted = true;
      const playing = video.play();
      if (playing && playing.catch) playing.catch(() => {});
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
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent) 92%, transparent) 0%,
        color-mix(in srgb, var(--accent) 60%, var(--text-muted)) 100%
      );
  }

  /* Faint grid over the gradient */
  .m-banner::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(color-mix(in srgb, var(--bg) 12%, transparent) 1px, transparent 1px),
      linear-gradient(90deg, color-mix(in srgb, var(--bg) 12%, transparent) 1px, transparent 1px);
    background-size: 22px 22px;
  }

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

/* Banner video sits under the grid/tint; slightly darkened so the photo stands out */
@media (max-width: 768px) {
  .m-banner-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7) saturate(0.9);
  }

  .m-banner::before,
  .m-banner-code {
    z-index: 1;
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

/* Banner: no grid pattern, just the video (or the plain gradient fallback) */
@media (max-width: 768px) {
  .m-banner::before {
    display: none;
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

/* Tile section header: label + admin "Edit" toggle */
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

  .m-tiles-edit {
    display: inline-grid;
    place-items: center;
    width: 26px;
    height: 26px;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    color: var(--text-secondary);
    font-family: inherit;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
  }

  .m-tiles-edit i {
    font-size: 0.62rem;
  }

  .m-tiles-edit.active {
    border-color: var(--accent);
    background: var(--accent);
    color: var(--bg);
  }
}
</style>
