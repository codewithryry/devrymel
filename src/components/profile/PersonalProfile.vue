<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <div id="top" class="profile-container">
    <!-- Main Content -->
    <main class="main-content">
      <!-- 1. Profile / About -->
      <section id="about">
        <ProfileContent
          :profile="profile"
          :techStack="techStack"
          :achievements="achievements"
          @openDeansList="openDeansListModal"
          @openMobileDeansList="openMobileDeansListModal"
          @open-certificates="openCertificatesListModal"
          @openLinks="showLinksModal = true"
          @openQRModal="openQRModal"
        />
      </section>

      <!-- 2. Featured Projects -->
      <ProjectsSection
        class="home-projects"
        :projects="projects.slice(0, 3)"
        view-all-to="/projects"
        view-all-label="View all projects.."
        @openProjectModal="openProjectModal"
        @openDeepDive="openDeepDive"
      />

      <!-- 3. Highlights / Quick Stats (+ ad on the same screen) -->
      <section class="section-group home-mobile-hide">
        <LiveDevStats class="home-mobile-hide" :stats="devStats" view-all-to="/skills" view-all-label="View all skills.." />
        <AdSlot type="banner" />
      </section>

      <!-- Career & Education and Experience live on the /experience page -->

      <!-- 6. Services -->
      <ServicesSection class="home-mobile-hide" :services="services" />

      <!-- 7. Why Hire Me -->
      <HighlightsSection class="home-mobile-hide" :highlights="highlights" />

      <!-- 8. Tech Notes / Guides (+ ad on the same screen) -->
      <section class="section-group home-mobile-hide">
        <TechNotesSection class="home-mobile-hide" :notes="techNotes" />
        <!-- Hidden on phones: it would sit right under the Highlights ad -->
        <AdSlot class="home-mobile-hide" type="banner" />
      </section>

      <!-- 8. Quick Links (just before Let's Connect) -->
      <LinksSection
        class="home-links home-mobile-hide"
        :certificates="certificates"
        @openQRModal="openQRModal"
        @openCertificatesListModal="openCertificatesListModal"
      />


      <!-- 9. Let's Connect (+ ad on the same screen) -->
      <section class="section-group home-mobile-hide">
        <SocialSection
          class="home-mobile-hide"
          :socialLinks="mergedSocialLinks"
          :availableSocialLinks="availableSocialLinks"
          :unavailableSocialLinks="unavailableSocialLinks"
          @openUnavailableSocialModal="openUnavailableSocialModal"
        />
        <AdSlot class="home-mobile-hide" type="banner" />
      </section>

      <Linkwebsite
        v-if="showLinksModal"
        :links="projectLinks"
        @close="showLinksModal = false"
      />

      <!-- 10. Footer CTA -->
      <FooterSection />
    </main>

    <!-- Modals -->
    <DeansListModal 
      v-if="showDeansListModal"
      :currentItem="currentDeansListItem"
      :currentIndex="currentDeansListIndex"
      :totalItems="achievements.deansList.length"
      @close="closeDeansListModal"
      @prev="prevDeansList"
      @next="nextDeansList"
    />

    <MobileDeansListModal 
      v-if="showMobileDeansListModal"
      :deansList="achievements.deansList"
      @close="closeMobileDeansListModal"
      @openItem="openDeansListModal"
    />

    <QRModal 
      v-if="showQRModal"
      :qrList="achievements.qr"
      :currentIndex="currentQRIndex"
      @close="closeQRModal"
      @prev="prevQR"
      @next="nextQR"
      @goTo="goToQR"
    />

    <CertificatesModal 
      v-if="showCertificatesListModal"
      :certificates="certificates"
      @close="closeCertificatesListModal"
    />

    <ProjectModal 
      v-if="showProjectModal"
      :message="projectModalMessage"
      @close="closeProjectModal"
    />

    <SocialModal 
      v-if="showSocialModal"
      :message="socialModalMessage"
      :platforms="socialModalPlatforms"
      :title="socialModalTitle"
      @close="closeSocialModal"
    />

    <!-- Project Deep Dive Modal -->
    <ProjectDeepDiveModal 
      v-if="showDeepDive"
      :show="showDeepDive"
      :project="selectedProject"
      @close="closeDeepDive"
    />
  </div>
</template>

<script>
import ProfileContent from './ProfileContent.vue'
import ProjectsSection from '../projects/ProjectsSection.vue'
import LinksSection from './LinksSection.vue'
import SocialSection from './SocialSection.vue'
import DeansListModal from '../modals/DeansListModal.vue'
import MobileDeansListModal from '../modals/MobileDeansListModal.vue'
import QRModal from '../modals/QRModal.vue'
import CertificatesModal from '../modals/CertificatesModal.vue'
import ProjectModal from '../modals/ProjectModal.vue'
import SocialModal from '../modals/SocialModal.vue'
import LiveDevStats from './LiveDevStats.vue'
import ServicesSection from './ServicesSection.vue'
import ProjectDeepDiveModal from '../modals/ProjectDeepDiveModal.vue'
import Linkwebsite from '../modals/Linkwebsite.vue'
import HighlightsSection from './HighlightsSection.vue'
import TechNotesSection from './TechNotesSection.vue'
import FooterSection from './FooterSection.vue'
import AdSlot from '../AdSlot.vue'
import { subscribeToCollection, subscribeToDoc } from '@/services/contentService'
import rawFallbackProjects from '@/data/projects.json'

const fallbackProjects = rawFallbackProjects.map((project) => ({
  ...project,
  image: project.image && !project.image.startsWith('http')
    ? require(`@/assets/${project.image}`)
    : project.image
}))

/* ===== JSON FALLBACKS (used until Firestore live data arrives) ===== */
import profile from '@/data/profile.json'
import techStack from '@/data/techStack.json'
import devStats from '@/data/devStats.json'
import services from '@/data/services.json'
import certificates from '@/data/certificates.json'
import socialLinks from '@/data/socialLinks.json'
import projectLinks from '@/data/projectLinks.json'
import experiencesFromJson from '@/data/experiences.json'
import highlights from '@/data/highlights.json'
import timeline from '@/data/timeline.json'
import techNotes from '@/data/techNotes.json'

import { PINNED_EXPERIENCE } from '@/data/pinnedExperience'

const experiences = [PINNED_EXPERIENCE, ...experiencesFromJson]
const FALLBACK_PROJECT_LINK_ADDITIONS = projectLinks.filter((item) => Number(item.id) >= 12)

const GITHUB_SOCIAL_LINK = {
  id: 'github',
  label: 'GitHub',
  icon: 'fab fa-github',
  url: 'https://github.com/codewithryry'
}

/* Live Firestore collections mirroring the JSON fallbacks above. */
const LIVE_COLLECTIONS = [
  'techStack',
  'devStats',
  'services',
  'certificates',
  'socialLinks',
  'projectLinks',
  'highlights',
  'timeline',
  'techNotes'
]

export default {
  name: "PersonalProfile",

  components: {
    FooterSection,
    ProfileContent,
    ProjectsSection,
    LinksSection,
    SocialSection,
    DeansListModal,
    MobileDeansListModal,
    QRModal,
    CertificatesModal,
    ProjectModal,
    SocialModal,
    LiveDevStats,
    ServicesSection,
    HighlightsSection,
    TechNotesSection,
    AdSlot,
    Linkwebsite,
    ProjectDeepDiveModal
  },

  data() {
    return {
      /* ===== JSON DATA ===== */
      profile,
      techStack,
      devStats,
      services,
      certificates,
      socialLinks,
      projectLinks,
      experiences,
      highlights,
      timeline,
      techNotes,

      /* ===== DEANS LIST DATA (Now inline) ===== */
      achievements: {
        deansList: [
          {
            title: "1st Semester | 2025-2026",
            description: "4th Year Dean's Lister",
            date: "4th Year Level",
            image: require("@/assets/deanslist1.jpg"),
            details: [
              "General Weighted Average (GWA): 1.70",
              "Academic Year: 2025-2026",
              "Year Level: 4th Year",
              "Semester: 1st Semester"
            ]
          },
          {
            title: "2nd Semester | 2024-2025",
            description: "3rd Year Dean's Lister",
            date: "3rd Year Level",
            image: require("@/assets/deanslist2.jpg"),
            details: [
              "General Weighted Average (GWA): 1.64",
              "Academic Year: 2024-2025",
              "Year Level: 3rd Year",
              "Semester: 2nd Semester"
            ]
          },
          {
            title: "1st Semester | 2024-2025",
            description: "3rd Year Dean's Lister",
            date: "3rd Year Level",
            image: require("@/assets/deanslist3.jpg"),
            details: [
              "General Weighted Average (GWA): 1.75",
              "Academic Year: 2024-2025",
              "Year Level: 3rd Year",
              "Semester: 1st Semester"
            ]
          },
          {
            title: "2nd Semester | 2023-2024",
            description: "2nd Year Dean's Lister",
            date: "2nd Year Level",
            image: require("@/assets/deanslist4.jpg"),
            details: [
              "General Weighted Average (GWA): 1.73",
              "Academic Year: 2023-2024",
              "Year Level: 2nd Year",
              "Semester: 2nd Semester"
            ]
          }
        ],
        qr: [
          {
            id: 1,
            bank: "GoTyme Bank",
            image: require("@/assets/Gotyme.jpg"),
            description: "Support my work via GoTyme Bank"
          },
          {
            id: 2,
            bank: "BDO",
            image: require("@/assets/Bdo.jpg"),
            description: "Scan to support via BDO"
          },
          {
            id: 3,
            bank: "CIMB Bank",
            image: require("@/assets/Cimb.jpg"),
            description: "Scan to support via CIMB Bank"
          },
          {
            id: 4,
            bank: "Maya",
            image: require("@/assets/maya.jpg"),
            description: "Support my projects via Maya"
          },
          {
            id: 5,
            bank: "UNO Digital Bank",
            image: require("@/assets/Unodigibank.jpg"),
            description: "Support via UNO Digital Bank"
          },
          {
            id: 6,
            bank: "MariBank",
            image: require("@/assets/Maribank.jpg"),
            description: "Support via MariBank"
          }
        ]
      },

      /* ===== PROJECTS (static, managed directly in src/data/projects.json) ===== */
      projects: fallbackProjects,
      contentUnsubscribes: [],

      /* ===== MODAL STATES ===== */
      showDeansListModal: false,
      showQRModal: false,
      showLinksModal: false,
      showProjectModal: false,
      showSocialModal: false,
      showCertificatesListModal: false,
      showMobileDeansListModal: false,
      showDeepDive: false,

      currentDeansListIndex: 0,
      currentQRIndex: 0,

      projectModalMessage: "",
      socialModalMessage: "",
      socialModalTitle: "",
      socialModalPlatforms: [],
      selectedProject: null
    }
  },

  mounted() {
    LIVE_COLLECTIONS.forEach((key) => {
      const unsubscribe = subscribeToCollection(
        key,
        (items) => {
          if (items.length) {
            if (key === 'projectLinks') {
              const liveTitles = new Set(
                items.map((item) => item.title?.trim().toLowerCase()).filter(Boolean)
              )
              this.projectLinks = [
                ...FALLBACK_PROJECT_LINK_ADDITIONS.filter(
                  (item) => !liveTitles.has(item.title.trim().toLowerCase())
                ),
                ...items
              ]
            } else {
              this[key] = items
            }
          }
        },
        (error) => {
          console.error(`Load live ${key} error:`, error)
        }
      )
      this.contentUnsubscribes.push(unsubscribe)
    })

    const unsubscribeExperiences = subscribeToCollection(
      'experiences',
      (items) => {
        this.experiences = [PINNED_EXPERIENCE, ...items]
      },
      (error) => {
        console.error('Load live experiences error:', error)
      }
    )
    this.contentUnsubscribes.push(unsubscribeExperiences)

    const unsubscribeProfile = subscribeToDoc(
      'profile',
      'main',
      (data) => {
        if (data) {
          this.profile = { ...this.profile, ...data }
        }
      },
      (error) => {
        console.error('Load live profile error:', error)
      }
    )
    this.contentUnsubscribes.push(unsubscribeProfile)
  },

  beforeUnmount() {
    this.contentUnsubscribes.forEach((unsubscribe) => unsubscribe())
    this.contentUnsubscribes = []
  },

  computed: {
    currentDeansListItem() {
      return this.achievements.deansList[this.currentDeansListIndex] || {}
    },

    currentQR() {
      return this.achievements.qr[this.currentQRIndex] || {}
    },

    /* GitHub is hardcoded so it always shows, even if live CMS data lacks it */
    mergedSocialLinks() {
      const others = this.socialLinks.filter(link => link.label !== 'GitHub')
      return [...others, GITHUB_SOCIAL_LINK]
    },

    availableSocialLinks() {
      return this.mergedSocialLinks.filter(link => link.url !== '#')
    },

    unavailableSocialLinks() {
      return this.mergedSocialLinks.filter(link => link.url === '#')
    }
  },

  methods: {
    /* ===== IMAGE LOADER (FIXED) ===== */
    getImage(img) {
      return new URL(`../assets/${img}`, import.meta.url).href
    },

    /* ===== DEANS LIST ===== */
    openDeansListModal(index) {
      this.currentDeansListIndex = index
      this.showDeansListModal = true
      this.showMobileDeansListModal = false
    },

    closeDeansListModal() {
      this.showDeansListModal = false
    },

    nextDeansList() {
      if (this.currentDeansListIndex < this.achievements.deansList.length - 1) {
        this.currentDeansListIndex++
      }
    },

    prevDeansList() {
      if (this.currentDeansListIndex > 0) {
        this.currentDeansListIndex--
      }
    },

    openMobileDeansListModal() {
      this.showMobileDeansListModal = true
    },

    closeMobileDeansListModal() {
      this.showMobileDeansListModal = false
    },

    /* ===== QR ===== */
    openQRModal() {
      this.showQRModal = true
    },

    closeQRModal() {
      this.showQRModal = false
    },

    nextQR() {
      if (this.currentQRIndex < this.achievements.qr.length - 1) {
        this.currentQRIndex++
      }
    },

    prevQR() {
      if (this.currentQRIndex > 0) {
        this.currentQRIndex--
      }
    },

    goToQR(index) {
      this.currentQRIndex = index
    },

    /* ===== CERTIFICATES ===== */
    openCertificatesListModal() {
      this.showCertificatesListModal = true
    },

    closeCertificatesListModal() {
      this.showCertificatesListModal = false
    },

    getCertificatePath(filename) {
      if (filename && filename.startsWith('http')) return filename
      return `/certificates/${filename}`
    },

    /* ===== PROJECT MODAL ===== */
    openProjectModal(message) {
      this.projectModalMessage = message
      this.showProjectModal = true
    },

    closeProjectModal() {
      this.showProjectModal = false
      this.projectModalMessage = ""
    },

    /* ===== DEEP DIVE ===== */
    openDeepDive(project) {
      this.selectedProject = {
        ...project,
        detailedDescription: project.detailedDescription || project.description,
        gallery: project.gallery || [],
        startDate: project.startDate || '2024',
        status: project.status || 'Active',
        role: project.role || 'Full-Stack Developer'
      }
      this.showDeepDive = true
    },

    closeDeepDive() {
      this.showDeepDive = false
      this.selectedProject = null
    },

    handleProjectClick(url, projectTitle, event) {
      if (url === "#") {
        event.preventDefault()
        this.openProjectModal(
          `The live demo for "${projectTitle}" is not available yet. The project is still under development. Check back later or view the code on GitHub!`
        )
      }
    },

    /* ===== SOCIAL ===== */
    openUnavailableSocialModal(platform) {
      if (platform === 'All Platforms') {
        this.socialModalTitle = "Coming Soon"
        this.socialModalMessage = "These platforms are currently being set up and will be available soon:"
        this.socialModalPlatforms = this.unavailableSocialLinks.map(link => link.label)
      } else {
        this.socialModalTitle = `${platform} Coming Soon`
        this.socialModalMessage = `My ${platform} profile is not available yet. I'll be setting it up soon!`
        this.socialModalPlatforms = []
      }

      this.showSocialModal = true
    },

    closeSocialModal() {
      this.showSocialModal = false
      this.socialModalMessage = ""
      this.socialModalTitle = ""
      this.socialModalPlatforms = []
    }
  }
}
</script>



















<style scoped>

* {
  box-sizing: border-box;
}

.profile-container {
  font-family: var(--font-body);
  background: var(--bg);
  min-height: 100vh;
  color: var(--text);
}

/* ===== MAIN CONTENT ===== */
.main-content {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 2.5rem 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

@media (min-width: 769px) {
  .main-content {
    padding: 3rem 0 4rem;
    gap: 3.5rem;
  }
}

/* Desktop: every section fills at least one screen below the sticky navbar,
   so when you scroll to a section the next section's title isn't peeking in. */
/* Phones: sections that have their own page are hidden on the homepage
   (Featured Projects -> Projects tab, Highlights -> Skills, Services -> Services) */
@media (max-width: 768px) {
  /* ".main-content" prefix so this beats .section-group's display:flex */
  .main-content .home-projects,
  .main-content .home-mobile-hide {
    display: none;
  }

  /* Quick Links continue right under the profile tiles (same 0.6rem gap) */
  .home-links {
    margin-top: calc(-3rem + 0.6rem);
  }
}

.section-group {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 769px) {
  .main-content > section {
    min-height: calc(100vh - 84px);
    scroll-margin-top: 84px;
  }
}

@media (max-width: 912px) {
  .main-content {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 860px) {
  .main-content {
    padding-left: 12px;
    padding-right: 12px;
  }
}

@media (max-width: 768px) {
  .main-content {
    gap: 2.5rem;
  }
}

/* Phones (all themes): the whole homepage (profile, tiles, Quick Links, CTA)
   sits inside one big container card */
@media (max-width: 768px) {
  :root .main-content {
    gap: 0.6rem;
    margin: 0.75rem 12px 1rem;
    padding: 0.75rem;
    border-radius: 30px;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--text) 10%, var(--bg)) 0%,
      color-mix(in srgb, var(--text) 4%, var(--bg)) 100%
    );
  }

  /* Gap is now 0.6rem, so Quick Links no longer need the pull-up */
  :root .main-content .home-links {
    margin-top: 0;
  }
}

/* ===== Phones: reference layout — grey page, white cards, no big container ===== */
@media (max-width: 768px) {
  .profile-container {
    background: var(--surface);
  }

  :root .main-content {
    margin: 0;
    padding: 1rem 12px 1.5rem;
    border-radius: 0;
    background: none;
  }
}

@media (max-width: 768px) {
  /* Quick Links join the sheet directly under the profile tiles */
  :root .main-content .home-links {
    margin-top: -0.6rem; /* cancels the 0.6rem section gap */
  }
}

/* Phones: homepage content spans the full screen width (no side gaps) */
@media (max-width: 768px) {
  :root .main-content {
    padding: 0 0 1.5rem;
  }
}
</style>
