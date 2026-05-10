<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <div class="profile-container">
    <!-- Header Section -->
    <header class="header">
      <div class="header-content">
        <!-- Header content will be in ProfileContent component -->
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- 1. Profile / About -->
      <ProfileContent 
        :profile="profile"
        :techStack="techStack"
        :achievements="achievements"
        @openDeansList="openDeansListModal"
        @openMobileDeansList="openMobileDeansListModal"
        @open-certificates="openCertificatesListModal"   
        @openLinks="showLinksModal = true" 
      />

      <!-- 2. Featured Projects -->
      <ProjectsSection 
        :projects="projects"
        @openProjectModal="openProjectModal"
        @openDeepDive="openDeepDive"
      />

      <!-- 3. Highlights / Quick Stats -->
      <LiveDevStats :stats="devStats" />

      <!-- 4. Career & Education Timeline -->
      <CareerTimeline :timeline="timeline" />

      <!-- Advertisement: responsive banner -->
      <AdSlot type="banner" />

      <!-- 5. Experience / Internship -->
      <ExperienceSection :experiences="experiences" />

      <!-- 6. Services -->
      <ServicesSection :services="services" />

      <!-- Advertisement: native ad -->
      <AdSlot type="native" />

      <!-- 7. Why Hire Me -->
      <HighlightsSection :highlights="highlights" />

      <!-- 8. Quick Links -->
      <LinksSection 
        :certificates="certificates"
        @openQRModal="openQRModal"
        @openCertificatesListModal="openCertificatesListModal"
      />

      <!-- Advertisement: responsive banner -->
      <AdSlot type="banner" />

      <!-- 9. Let's Connect -->
      <SocialSection 
        :socialLinks="socialLinks"
        :availableSocialLinks="availableSocialLinks"
        :unavailableSocialLinks="unavailableSocialLinks"
        @openUnavailableSocialModal="openUnavailableSocialModal"
      />

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
import FooterSection from './FooterSection.vue'
import DeansListModal from '../modals/DeansListModal.vue'
import MobileDeansListModal from '../modals/MobileDeansListModal.vue'
import QRModal from '../modals/QRModal.vue'
import CertificatesModal from '../modals/CertificatesModal.vue'
import ProjectModal from '../modals/ProjectModal.vue'
import SocialModal from '../modals/SocialModal.vue'
import CareerTimeline from './CareerTimeline.vue'
import LiveDevStats from './LiveDevStats.vue'
import ServicesSection from './ServicesSection.vue'
import ProjectDeepDiveModal from '../modals/ProjectDeepDiveModal.vue'
import Linkwebsite from '../modals/Linkwebsite.vue'
import ExperienceSection from './ExperienceSection.vue'
import HighlightsSection from './HighlightsSection.vue'
import TechNotesSection from './TechNotesSection.vue'
import AdSlot from '../AdSlot.vue'

/* ===== JSON DATA IMPORTS ===== */
import profile from '@/data/profile.json'
import techStack from '@/data/techStack.json'
import devStats from '@/data/devStats.json'
import services from '@/data/services.json'
import certificates from '@/data/certificates.json'
import socialLinks from '@/data/socialLinks.json'
import projectLinks from '@/data/projectLinks.json'
import experiences from '@/data/experiences.json'
import highlights from '@/data/highlights.json'
import timeline from '@/data/timeline.json'
import techNotes from '@/data/techNotes.json'

export default {
  name: "PersonalProfile",

  components: {
    ProfileContent,
    ProjectsSection,
    LinksSection,
    SocialSection,
    FooterSection,
    DeansListModal,
    MobileDeansListModal,
    QRModal,
    CertificatesModal,
    ProjectModal,
    SocialModal,
    CareerTimeline,
    LiveDevStats,
    ServicesSection,
    ExperienceSection,
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

      /* ===== PROJECTS (INLINE - STAY HERE) ===== */
      projects: [
        {
          id: 5,
          title: "Trabahanap",
          description: "A Python-based job portal that connects job seekers and employers through profile management, job posting, and application tracking.",
          detailedDescription: "Trabahanap is a comprehensive job portal built with Django that helps improve the job search experience. The platform features job matching, employer dashboards for job posting and candidate management, and a seamless application process for job seekers. The system includes notifications, resume parsing, and analytics for both employers and job seekers.",
          image: require("@/assets/trabahanap.png"),
          demoUrl: "https://trabahanap-job-matching-analyzer.onrender.com",
          githubUrl: "https://github.com/codewithryry/Trabahanap-job-matching-analyzer",
          technologies: [
            "Python",
            "Django",
            "SQLite",
            "HTML",
            "CSS",
            "JavaScript",
            "Django REST Framework"
          ],
          features: [
            "User registration and authentication",
            "Job posting and search system",
            "Job seeker profile creation",
            "Employer application management",
            "Responsive and user-friendly UI"
          ],
          startDate: "2024",
          status: "Live & Active",
          role: "Full-Stack Developer"
        },
        {
          id: 2,
          title: "SafePath",
          description: "Bullying reporting system with AI support and sentiment analysis",
          detailedDescription: "SafePath is an AI-powered platform designed to support bullying reporting through anonymous reports and sentiment analysis. The system uses natural language processing to detect harmful content and provides real-time support through an AI chatbot. It features secure reporting, data analytics for schools, and a dashboard for administrators.",
          image: require("@/assets/safepath.png"),
          demoUrl: "https://safepath-4pzk.onrender.com",
          githubUrl: "https://github.com/codewithryry/SafePath",
          technologies: ["Node.js", "MySQL", "Wit.ai", "TensorFlow", "VADER"],
          features: [
            "Anonymous reporting system",
            "AI-powered sentiment analysis",
            "Real-time chatbot support",
            "Administrator dashboard",
            "Data analytics and reporting"
          ],
          startDate: "2024",
          status: "Live",
          role: "Backend Developer & AI Integration"
        },
        {
          id: 3,
          title: "LiftUp",
          description: "Mental health platform with AI assistance and community support",
          detailedDescription: "LiftUp is a mental wellness platform that combines AI technology with community support. The platform offers personalized mental health resources, AI-guided meditation sessions, anonymous community forums, and mood tracking. It provides a safe space for users to share experiences and access mental health resources.",
          image: require("@/assets/liftup.png"),
          demoUrl: "https://liftupconnect.vercel.app/",
          githubUrl: "https://github.com/codewithryry/LiftUp",
          technologies: ["Vue.js", "AI Chatbot", "Firebase", "Community Forums"],
          features: [
            "AI mental health assistant",
            "Anonymous community forums",
            "Mood tracking and analytics",
            "Guided meditation sessions",
            "Resource library"
          ],
          startDate: "2023",
          status: "Active Development",
          role: "Full-Stack Developer"
        }
      ],

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

  computed: {
    currentDeansListItem() {
      return this.achievements.deansList[this.currentDeansListIndex] || {}
    },

    currentQR() {
      return this.achievements.qr[this.currentQRIndex] || {}
    },

    availableSocialLinks() {
      return this.socialLinks.filter(link => link.url !== '#')
    },

    unavailableSocialLinks() {
      return this.socialLinks.filter(link => link.url === '#')
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



















<style>
/* DARK MODE - GRADIENT KILLERS (non-scoped para ma-override lahat) */
html[data-theme="dark"],
html[data-theme="dark"] body {
  background: #000000 !important;
  background-image: none !important;
}

html[data-theme="dark"] .header,
html[data-theme="dark"] .header-footer,
html[data-theme="dark"] .header::before,
html[data-theme="dark"] .header-footer::before,
html[data-theme="dark"] .brand-visual,
html[data-theme="dark"] .profile-container,
html[data-theme="dark"] .profile-brand-card,
html[data-theme="dark"] .mobile-profile-content,
html[data-theme="dark"] .cta-section,
html[data-theme="dark"] .cta-section::before,
html[data-theme="dark"] .social-card.more-card,
html[data-theme="dark"] .footer-contact-btn::before,
html[data-theme="dark"] .profile-glow,
html[data-theme="dark"] .overlay-gradient,
html[data-theme="dark"] .image-overlay {
  background: #000000 !important;
  background-color: #000000 !important;
  background-image: none !important;
}

html[data-theme="dark"] .brand-visual {
  background: #111111 !important;
}
</style>



























<style scoped>
/* Global Styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profile-container {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  color: #1a202c;
}

/* Header */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 1rem 2.5rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.name {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  line-height: 1.1;
}

.title {
  font-size: 1.3rem;
  font-weight: 400;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.3;
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: -1.5rem auto 0;
  padding: 0 1rem 3rem;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.2;
}

/* Responsive */
@media (min-width: 769px) {
  .header {
    padding: 4rem 0 3rem;
  }
  
  .name {
    font-size: 3.5rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .main-content {
    margin: -2rem auto 0;
    padding: 0 2rem 4rem;
  }
}
</style>
<style scoped>
/* ===== GLOBAL STYLES ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profile-container {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  color: #1a202c;
}

/* ===== HEADER ===== */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 1rem 2.5rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.name {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  line-height: 1.1;
}

.title {
  font-size: 1.3rem;
  font-weight: 400;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.3;
}

/* ===== MAIN CONTENT ===== */
.main-content {
  max-width: 1200px;
  margin: -1.5rem auto 0;
  padding: 0 1rem 3rem;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.2;
}

/* ===== MOBILE LAYOUT ===== */
.mobile-profile-content {
  display: none;
}

@media (max-width: 768px) {
  /* Hide desktop layout on mobile */
  .desktop-profile-content {
    display: none;
  }
  
  /* Show mobile layout */
  .mobile-profile-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: white;
    border-radius: 20px;
    padding: 2rem 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
  }
  
  /* Profile Image */
  .mobile-profile-frame {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto;
  }
  
  .profile-glow {
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
    border-radius: 20px;
    opacity: 0.25;
    z-index: 1;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    object-fit: cover;
    border: 6px solid white;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
  
  /* Mobile Identity */
  .mobile-identity {
    text-align: center;
  }
  
  .mobile-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }
  
  .mobile-title-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 12px;
    color: #667eea;
    font-weight: 500;
    font-size: 0.95rem;
  }
  
  /* Mobile About Section - FIRST */
  .mobile-about {
    padding: 0 0.5rem;
  }
  
  .mobile-subtitle {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .mobile-statement-text {
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
    text-align: justify;
    margin-bottom: 1rem;
    text-justify: inter-word;
  }
  
  .mobile-statement-text:last-child {
    margin-bottom: 0;
  }
  
  .mobile-statement-text .highlight {
    color: #667eea;
    font-weight: 600;
  }
  
  /* Mobile Honors - SECOND */
  .mobile-honors-section {
    width: 100%;
  }
  
  .mobile-honors-compact {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(246, 224, 94, 0.1), rgba(214, 158, 46, 0.1));
    border-radius: 12px;
    border: 1px solid rgba(246, 224, 94, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .mobile-honors-compact:active {
    transform: scale(0.98);
    background: linear-gradient(135deg, rgba(246, 224, 94, 0.2), rgba(214, 158, 46, 0.2));
  }
  
  .honors-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.8rem;
    background: white;
    border-radius: 8px;
    color: #d69e2e;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .honors-badge i {
    color: #f6e05e;
  }
  
  .honors-count {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .honors-count span {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2d3748;
  }
  
  .honors-count small {
    font-size: 0.75rem;
    color: #d69e2e;
  }
  
  .honors-arrow {
    color: #a0aec0;
    font-size: 0.9rem;
  }
  
  /* Mobile Tech Stack - LAST */
  .mobile-tech-section {
    width: 100%;
  }
  
  .mobile-tech-scroll {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  .tech-scroll-container {
    display: flex;
    gap: 0.8rem;
    overflow-x: auto;
    padding: 0.5rem 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .tech-scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .tech-chip-scroll {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.2rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    flex-shrink: 0;
    min-width: 120px;
    transition: all 0.2s ease;
  }
  
  .tech-chip-scroll:active {
    transform: scale(0.95);
    border-color: #667eea;
  }
  
  .tech-chip-scroll i {
    font-size: 1.2rem;
    color: #4a5568;
  }
  
  .tech-chip-scroll span {
    font-size: 0.85rem;
    font-weight: 500;
    color: #2d3748;
    white-space: nowrap;
  }
  
  .scroll-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    color: #a0aec0;
    font-size: 0.8rem;
  }
  
  .scroll-indicator i {
    font-size: 0.7rem;
  }
  
  /* Mobile Contact */
  .mobile-contact-section {
    width: 100%;
  }
  
  .mobile-contact-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .mobile-contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  
  .mobile-contact-item:active {
    transform: scale(0.98);
    border-color: #667eea;
    background: white;
  }
  
  .mobile-contact-item .contact-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-size: 1.3rem;
    border: 1px solid #e2e8f0;
  }
  
  .contact-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .contact-label {
    font-size: 0.85rem;
    color: #718096;
    font-weight: 500;
  }
  
  .contact-value {
    font-size: 0.95rem;
    color: #2d3748;
    font-weight: 500;
    line-height: 1.2;
    word-break: break-all;
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
  
  /* Header */
  .header {
    padding: 4rem 0 3rem;
  }
  
  .name {
    font-size: 3.5rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  /* Main Content */
  .main-content {
    margin: -2rem auto 0;
    padding: 0 2rem 4rem;
  }
  
  /* Profile Section */
  .profile-section {
    margin-bottom: 4rem;
  }
  
  .profile-brand-card {
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 0;
    min-height: 600px;
  }
  
  .brand-visual {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  
  .profile-frame {
    position: relative;
    width: 280px;
    height: 280px;
    margin-bottom: 2rem;
  }
  
  .profile-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
    border-radius: 24px;
    opacity: 0.3;
    z-index: 1;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    border: 8px solid white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    overflow: hidden;
    z-index: 3;
  }
  
  .overlay-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 20px;
  }
  
  /* Identity Badge */
  .identity-badge {
    background: white;
    border-radius: 16px;
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
    border: 1px solid rgba(102, 126, 234, 0.1);
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 320px;
  }
  
  .badge-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 2;
  }
  
  .identity-badge i {
    font-size: 2rem;
    color: #667eea;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .badge-info {
    flex: 1;
  }
  
  .badge-title {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
    line-height: 1.2;
    margin-bottom: 0.2rem;
  }
  
  /* Tech Stack */
  .tech-stack {
    width: 100%;
    max-width: 320px;
    margin-bottom: 2rem;
  }
  
  .stack-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .stack-chips {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .tech-chip {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    cursor: default;
  }
  
  .tech-chip:hover {
    transform: translateY(-2px);
    border-color: #667eea;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
  }
  
  .tech-chip i {
    font-size: 1.2rem;
    color: #4a5568;
    width: 24px;
    text-align: center;
  }
  
  .tech-chip span {
    font-size: 0.85rem;
    font-weight: 500;
    color: #2d3748;
    line-height: 1.2;
  }
  
  /* Academic Honors */
  .achievement-badges {
    width: 100%;
    max-width: 320px;
  }
  
  .achievement-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .badge-grid {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .achievement-chip {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(246, 224, 94, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .achievement-chip:hover {
    transform: translateX(5px);
    border-color: #f6e05e;
    box-shadow: 0 5px 15px rgba(246, 224, 94, 0.2);
  }
  
  .achievement-chip::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #f6e05e, #d69e2e);
    border-radius: 4px 0 0 4px;
  }
  
  .chip-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, #f6e05e, #d69e2e);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
    flex-shrink: 0;
  }
  
  .chip-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .chip-semester {
    font-size: 0.85rem;
    font-weight: 600;
    color: #2d3748;
    line-height: 1.2;
  }
  
  .chip-gwa {
    font-size: 0.75rem;
    color: #d69e2e;
    font-weight: 500;
  }
  
  /* Right Column: Brand Narrative */
  .brand-narrative {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .narrative-header {
    text-align: left;
  }
  
  .section-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #2d3748;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    letter-spacing: -0.5px;
  }
  
  .brand-statement {
    line-height: 1.8;
    text-align: justify;
    hyphens: auto;
  }
  
  .statement-text {
    font-size: 1.1rem;
    color: #4a5568;
    margin-bottom: 1.5rem;
    line-height: 1.7;
    text-align: justify;
    text-justify: inter-word;
    letter-spacing: 0.01em;
  }
  
  .statement-text:last-child {
    margin-bottom: 0;
  }
  
  .statement-text .highlight {
    color: #667eea;
    font-weight: 600;
    position: relative;
    display: inline-block;
  }
  
  .statement-text .highlight::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
    border-radius: 2px;
    z-index: -1;
  }
  
  /* Brand Contact */
  .brand-contact {
    margin-top: 1rem;
  }
  
  .contact-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .contact-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  
  .contact-item:hover {
    background: white;
    border-color: #667eea;
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-size: 1.2rem;
    border: 1px solid #e2e8f0;
  }
  
  .contact-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .contact-label {
    font-size: 0.85rem;
    color: #718096;
    font-weight: 500;
  }
  
  .contact-value {
    font-size: 0.95rem;
    color: #2d3748;
    font-weight: 500;
    line-height: 1.2;
  }
  
  .contact-arrow {
    color: #a0aec0;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
  }
  
  .contact-item:hover .contact-arrow {
    transform: translateX(3px);
    color: #667eea;
  }
}

/* ===== PROJECTS SECTION ===== */
.projects-showcase {
  margin: 3rem 0;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 769px) {
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
}

.project-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e2e8f0;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.project-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

@media (min-width: 769px) {
  .project-image-container {
    height: 200px;
  }
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.project-status.available {
  background: rgba(56, 161, 105, 0.95);
  color: white;
}

.project-status.unavailable {
  background: rgba(160, 174, 192, 0.95);
  color: white;
}

.project-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.3;
}

.project-description {
  color: #718096;
  line-height: 1.5;
  font-size: 0.95rem;
  flex: 1;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

.tech-tag.more {
  background: #edf2f7;
  color: #718096;
  font-style: italic;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.project-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-height: 52px;
}

.project-action-btn:active {
  transform: scale(0.98);
}

.project-action-btn:hover {
  transform: translateY(-2px);
}

.demo-btn {
  background: #f8fafc;
  color: #2d3748;
  border-color: #e2e8f0;
}

.demo-btn:hover {
  background: #edf2f7;
  border-color: #667eea;
  color: #667eea;
}

.github-btn {
  background: #24292e;
  color: white;
  border-color: #24292e;
}

.github-btn:hover {
  background: #1a1e22;
}

/* ===== LINKS SECTION ===== */
.links-section {
  margin: 3rem 0;
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 769px) {
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
}

.link-category {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

@media (min-width: 769px) {
  .link-category {
    padding: 2rem;
    border-radius: 20px;
  }
}

.category-title {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-title i {
  color: #667eea;
}

.category-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-height: 64px;
}

.link-card:active {
  transform: scale(0.98);
}

.link-card:hover {
  transform: translateY(-3px);
  background: white;
  border-color: #667eea;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
}

.link-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.portfolio .link-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }
.certificates .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.github .link-icon { background: rgba(36, 41, 46, 0.1); color: #24292e; }
.dev .link-icon { background: rgba(10, 10, 10, 0.1); color: #0a0a0a; }
.stats .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.coffee .link-icon { background: rgba(214, 158, 46, 0.1); color: #d69e2e; }
.telegram .link-icon { background: rgba(0, 136, 204, 0.1); color: #0088cc; }
.qr-support .link-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }

.link-info {
  flex: 1;
}

.link-label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.2rem;
  font-size: 1rem;
}

.link-desc {
  color: #718096;
  font-size: 0.85rem;
}

.link-arrow {
  color: #a0aec0;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(5px);
  color: #667eea;
}

/* ===== SOCIAL MEDIA SECTION ===== */
.social-section {
  margin: 3rem 0;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 769px) {
  .social-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-height: 140px;
}

.social-card:active:not(.more-card) {
  transform: scale(0.98);
}

.social-card:hover:not(.more-card) {
  transform: translateY(-5px);
  border-color: currentColor;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.social-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

/* Social media colors */
.facebook .social-icon { color: #1877f2; }
.twitter .social-icon { color: #1da1f2; }
.instagram .social-icon { color: #e4405f; }
.youtube .social-icon { color: #ff0000; }
.spotify .social-icon { color: #1db954; }
.linkedin .social-icon { color: #0077b5; }
.pinterest .social-icon { color: #bd081c; }
.tiktok .social-icon { color: #000000; }
.reddit .social-icon { color: #ff4500; }
.discord .social-icon { color: #7289da; }

.social-label {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.social-status {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
}

.social-status.available {
  background: rgba(56, 161, 105, 0.1);
  color: #38a169;
}

.social-status.unavailable {
  background: rgba(160, 174, 192, 0.1);
  color: #a0aec0;
}

/* More card */
.social-card.more-card {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border: 2px dashed #cbd5e0;
}

@media (max-width: 768px) {
  .social-card.more-card {
    grid-column: span 2;
  }
}

.social-card.more-card .social-icon {
  color: #718096;
}

.social-card.more-card .social-label {
  color: #4a5568;
}

.social-card.more-card:active {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
}

.social-card.more-card:hover {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
  border-color: #a0aec0;
  transform: translateY(-3px);
}

/* ===== FOOTER ===== */
.header-footer {
  width: 100vw;
  margin: 100px 0 0 0;
  padding: 4rem 0 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 0;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

@media (min-width: 992px) {
  .header-footer {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.header-footer::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.header-footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.footer-name {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.footer-subtitle {
  font-size: 1.8rem;
  font-weight: 400;
  opacity: 0.95;
  margin-bottom: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
}

.footer-cta {
  margin-top: 2rem;
}

.footer-contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  background: white;
  color: #000000;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.footer-contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
  transition: left 0.5s ease;
}

.footer-contact-btn:hover::before {
  left: 100%;
}

.footer-contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  color: #764ba2;
}

.footer-contact-btn i {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.footer-contact-btn:hover i {
  transform: translateX(5px);
}

@media (max-width: 992px) {
  .footer-name {
    font-size: 3rem;
  }
  
  .footer-subtitle {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .header-footer {
    padding: 3rem 0 2rem;
    border-radius: 20px 20px 0 0;
  }
  
  .footer-name {
    font-size: 2.5rem;
  }
  
  .footer-subtitle {
    font-size: 1.3rem;
    padding: 0 1rem;
  }
  
  .footer-contact-btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .header-footer {
    padding: 2.5rem 0 1.5rem;
    border-radius: 16px 16px 0 0;
  }
  
  .footer-name {
    font-size: 2rem;
  }
  
  .footer-subtitle {
    font-size: 1.1rem;
    line-height: 1.3;
  }
  
  .footer-contact-btn {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
  }
}

/* ===== MODALS ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  position: relative;
}

/* Dean's List Viewer Modal Updates */
.image-viewer-modal {
  max-width: 500px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

.viewer-header {
  margin-bottom: 1.5rem;
}

.viewer-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(246, 224, 94, 0.1);
  color: #d69e2e;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.viewer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.8rem 0;
  line-height: 1.3;
}

.viewer-description {
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0;
}

.viewer-image-container {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
}

.viewer-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.viewer-details {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
}

.detail-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-col {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.detail-col i {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.detail-label {
  display: block;
  color: #718096;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.detail-value {
  display: block;
  color: #2d3748;
  font-weight: 600;
  font-size: 0.95rem;
}

.viewer-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-counter {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
}

.viewer-actions {
  display: flex;
  gap: 1rem;
}

.viewer-actions .action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.viewer-actions .action-btn.view-full {
  background: #f8fafc;
  color: #2d3748;
  border: 1px solid #e2e8f0;
}

.viewer-actions .action-btn.view-full:hover {
  background: #edf2f7;
}

.viewer-actions .action-btn.download {
  background: #667eea;
  color: white;
}

.viewer-actions .action-btn.download:hover {
  background: #5a67d8;
}

.modal-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.modal-text {
  color: #718096;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.modal-close-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.9rem 1.8rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.modal-close-button:active {
  transform: scale(0.98);
  background: #5a67d8;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  color: #2d3748;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:active {
  transform: rotate(90deg);
  background: #667eea;
  color: white;
}

/* ===== MOBILE DEAN'S LIST MODAL ===== */
.mobile-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
}

.mobile-modal {
  background: white;
  width: 100%;
  max-height: 85vh;
  border-radius: 24px 24px 0 0;
  padding: 1.5rem;
  animation: modalSlideUp 0.3s ease;
}

.mobile-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
}

.mobile-modal-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
}

.mobile-modal-close:active {
  background: #667eea;
  color: white;
  transform: rotate(90deg);
}

.mobile-deans-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-deans-description {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(246, 224, 94, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(246, 224, 94, 0.3);
}

.mobile-deans-description i {
  color: #d69e2e;
  font-size: 1.5rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.mobile-deans-description p {
  color: #2d3748;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.mobile-deans-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.mobile-deans-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-deans-item:active {
  transform: scale(0.98);
  background: white;
  border-color: #f6e05e;
}

.mobile-deans-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f6e05e, #d69e2e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.mobile-deans-info {
  flex: 1;
  text-align: left;
}

.mobile-deans-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.deans-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.gwa-badge, .year-level {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

.gwa-badge {
  background: rgba(56, 161, 105, 0.1);
  color: #38a169;
}

.gwa-badge i {
  color: #38a169;
  font-size: 0.7rem;
}

.year-level {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.year-level i {
  color: #667eea;
  font-size: 0.7rem;
}

.arrow-icon {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* ===== ANIMATIONS ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@keyframes modalSlideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
<style scoped>
/* Global Styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profile-container {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  color: #1a202c;
}

/* Header */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 0 3rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.name {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 1.8rem;
  font-weight: 400;
  opacity: 0.95;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 0 2rem 4rem;
  position: relative;
  z-index: 1;
}

/* Profile Brand Card */
.profile-section {
  margin-bottom: 4rem;
}

.profile-brand-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  min-height: 600px;
}

/* Left Column: Visual Identity */
.brand-visual {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.profile-frame {
  position: relative;
  width: 280px;
  height: 280px;
  margin-bottom: 2rem;
}

.profile-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
  border-radius: 24px;

  opacity: 0.3;
  z-index: 1;
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  border: 8px solid white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  overflow: hidden;
  z-index: 3;
}

.overlay-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.2), transparent);
  border-radius: 20px;
}

/* Identity Badge */
.identity-badge {
  background: white;
  border-radius: 16px;
  padding: 1.2rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.1);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 320px;
}

.badge-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.identity-badge i {
  font-size: 2rem;
  color: #667eea;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge-info {
  flex: 1;
}

.badge-title {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.2;
  margin-bottom: 0.2rem;
}

/* Tech Stack */
.tech-stack {
  width: 100%;
  max-width: 320px;
  margin-bottom: 2rem;
}

.stack-title {
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stack-chips {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.tech-chip {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: default;
}

.tech-chip:hover {
  transform: translateY(-2px);
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.tech-chip i {
  font-size: 1.2rem;
  color: #4a5568;
  width: 24px;
  text-align: center;
}

.tech-chip span {
  font-size: 0.85rem;
  font-weight: 500;
  color: #2d3748;
  line-height: 1.2;
}

/* Academic Honors */
.achievement-badges {
  width: 100%;
  max-width: 320px;
}

.achievement-title {
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-grid {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.achievement-chip {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(246, 224, 94, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.achievement-chip:hover {
  transform: translateX(5px);
  border-color: #f6e05e;
  box-shadow: 0 5px 15px rgba(246, 224, 94, 0.2);
}

.achievement-chip::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #f6e05e, #d69e2e);
  border-radius: 4px 0 0 4px;
}

.chip-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f6e05e, #d69e2e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  flex-shrink: 0;
}

.chip-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.chip-semester {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.2;
}

.chip-gwa {
  font-size: 0.75rem;
  color: #d69e2e;
  font-weight: 500;
}

/* Right Column: Brand Narrative */
.brand-narrative {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.narrative-header {
  text-align: left;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.brand-tagline {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 20px;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.tagline-text {
  font-size: 0.95rem;
  font-weight: 500;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tagline-text::before,
.tagline-text::after {
  content: '•';
  color: #a0aec0;
}

/* Brand Statement - Justified Text */
.brand-statement {
  line-height: 1.8;
  text-align: justify;
  hyphens: auto;
}

.statement-text {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  text-align: justify;
  text-justify: inter-word;
  letter-spacing: 0.01em;
}

.statement-text:last-child {
  margin-bottom: 0;
}

.statement-text .highlight {
  color: #667eea;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.statement-text .highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-radius: 2px;
  z-index: -1;
}

/* Brand Contact */
.brand-contact {
  margin-top: 1rem;
}

.contact-title {
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.contact-item:hover {
  background: white;
  border-color: #667eea;
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.2rem;
  border: 1px solid #e2e8f0;
}

.contact-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.contact-label {
  font-size: 0.85rem;
  color: #718096;
  font-weight: 500;
}

.contact-value {
  font-size: 0.95rem;
  color: #2d3748;
  font-weight: 500;
  line-height: 1.2;
}

.contact-arrow {
  color: #a0aec0;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.contact-item:hover .contact-arrow {
  transform: translateX(3px);
  color: #667eea;
}

/* Projects Section */
.projects-showcase {
  margin: 4rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
}

.project-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.project-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.project-status.available {
  background: rgba(56, 161, 105, 0.95);
  color: white;
}

.project-status.unavailable {
  background: rgba(160, 174, 192, 0.95);
  color: white;
}

.project-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.project-description {
  color: #718096;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

.tech-tag.more {
  background: #edf2f7;
  color: #718096;
  font-style: italic;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.project-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-height: 52px;
}

.project-action-btn:active {
  transform: scale(0.98);
}

.demo-btn {
  background: #f8fafc;
  color: #2d3748;
  border-color: #e2e8f0;
}

.demo-btn:active {
  background: #edf2f7;
  border-color: #667eea;
  color: #667eea;
}

.github-btn {
  background: #24292e;
  color: white;
  border-color: #24292e;
}

.github-btn:active {
  background: #1a1e22;
}

/* Links Section */
.links-section {
  margin-bottom: 3rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.link-category {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.category-title {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-title i {
  color: #667eea;
}

.category-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: #f8fafc;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
}

.link-card:hover {
  background: white;
  border-color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
}

.link-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.portfolio .link-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }
.certificates .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.github .link-icon { background: rgba(36, 41, 46, 0.1); color: #24292e; }
.dev .link-icon { background: rgba(10, 10, 10, 0.1); color: #0a0a0a; }
.stats .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.coffee .link-icon { background: rgba(214, 158, 46, 0.1); color: #d69e2e; }
.telegram .link-icon { background: rgba(0, 136, 204, 0.1); color: #0088cc; }
.qr-support .link-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }

.link-info {
  flex: 1;
}

.link-label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.2rem;
}

.link-desc {
  color: #718096;
  font-size: 0.9rem;
}

.link-arrow {
  color: #a0aec0;
  transition: transform 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(5px);
  color: #667eea;
}

.link-card.certificates {
  background: linear-gradient(135deg, rgba(104, 211, 145, 0.1), rgba(56, 161, 105, 0.1));
  border: 1px solid rgba(56, 161, 105, 0.2);
}

.link-card.certificates .link-icon {
  background: rgba(56, 161, 105, 0.15);
  color: #38a169;
}

.link-card.certificates:hover {
  background: linear-gradient(135deg, rgba(104, 211, 145, 0.2), rgba(56, 161, 105, 0.2));
  border-color: #38a169;
}

.link-card.qr-support {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.link-card.qr-support .link-icon {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
}

.link-card.qr-support:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-color: #667eea;
}

/* Social Media Section */
.social-section {
  margin-bottom: 3rem;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  position: relative;
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  background: white;
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
}

.social-card:not(.more-card):hover {
  transform: translateY(-5px);
  border-color: currentColor;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.social-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.facebook .social-icon { color: #1877f2; }
.twitter .social-icon { color: #1da1f2; }
.instagram .social-icon { color: #e4405f; }
.youtube .social-icon { color: #ff0000; }
.spotify .social-icon { color: #1db954; }
.linkedin .social-icon { color: #0077b5; }
.pinterest .social-icon { color: #bd081c; }
.tiktok .social-icon { color: #000000; }
.reddit .social-icon { color: #ff4500; }
.discord .social-icon { color: #7289da; }

.social-label {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.social-status {
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-weight: 500;
}

.social-status.available {
  background: rgba(56, 161, 105, 0.1);
  color: #38a169;
}

.social-status.unavailable {
  background: rgba(160, 174, 192, 0.1);
  color: #a0aec0;
}

/* More Card for Unavailable Platforms */
.social-card.more-card {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border: 2px dashed #cbd5e0;
}

.social-card.more-card .social-icon {
  color: #718096;
}

.social-card.more-card .social-label {
  color: #4a5568;
}

.social-card.more-card:hover {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
  border-color: #a0aec0;
  transform: translateY(-3px);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 4rem;
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.cta-text {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button.primary {
  background: white;
  color: #667eea;
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 3rem;
  border-radius: 24px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-icon {
  font-size: 4rem;
  color: #667eea;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.modal-text {
  color: #718096;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.modal-close-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close-button:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

/* Social Modal List */
.social-modal-list {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 200px;
  overflow-y: auto;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
}

.social-modal-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.social-modal-item i {
  font-size: 1.5rem;
  width: 30px;
  text-align: center;
}

.social-modal-item span {
  font-weight: 500;
  color: #2d3748;
}

/* Image Viewer Modal */
.image-viewer-modal {
  max-width: 500px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  color: #2d3748;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #667eea;
  color: white;
  transform: rotate(90deg);
}

.viewer-header {
  margin-bottom: 1.5rem;
}

.viewer-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(246, 224, 94, 0.1);
  color: #d69e2e;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.viewer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  line-height: 1.3;
}

.viewer-image-container {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
}

.viewer-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.viewer-details {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
}

.detail-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-col {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.detail-col i {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.detail-label {
  display: block;
  color: #718096;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.detail-value {
  display: block;
  color: #2d3748;
  font-weight: 600;
  font-size: 0.95rem;
}

.viewer-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-counter {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
}

.viewer-actions {
  display: flex;
  gap: 1rem;
}

.viewer-actions .action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.viewer-actions .action-btn.view-full {
  background: #f8fafc;
  color: #2d3748;
  border: 1px solid #e2e8f0;
}

.viewer-actions .action-btn.view-full:hover {
  background: #edf2f7;
}

.viewer-actions .action-btn.download {
  background: #667eea;
  color: white;
}

.viewer-actions .action-btn.download:hover {
  background: #5a67d8;
}

/* QR Modal */
.qr-modal {
  max-width: 400px;
  width: 95%;
  padding: 2rem;
}

.modal-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.modal-header .modal-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 0.8rem;
}

.modal-subtitle {
  color: #718096;
  font-size: 0.95rem;
  margin-top: 0.3rem;
}

.qr-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.qr-navigation .nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-display {
  flex: 1;
  text-align: center;
}

.qr-bank-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.qr-image-container {
  width: 180px;
  height: 180px;
  margin: 0 auto 1rem;
  border-radius: 12px;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.qr-description {
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.4;
}

.qr-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.qr-indicators .indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.qr-indicators .indicator.active {
  background: #667eea;
  transform: scale(1.2);
}

.qr-actions {
  display: flex;
  gap: 1rem;
}

.qr-actions .action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
}

.qr-actions .action-btn.download {
  background: #667eea;
  color: white;
}

.qr-actions .action-btn.download:hover {
  background: #5a67d8;
}

.qr-actions .action-btn.close {
  background: #f8fafc;
  color: #2d3748;
  border: 1px solid #e2e8f0;
}

.qr-actions .action-btn.close:hover {
  background: #edf2f7;
}

/* Certificates Modal Styles */
.certificates-modal {
  max-width: 600px;
  width: 95%;
  max-height: 80vh;
  padding: 2rem;
}

.certificates-list {
  max-height: 400px;
  overflow-y: auto;
  margin: 1.5rem 0;
  border-radius: 12px;
  background: #f8fafc;
  padding: 1rem;
  border: 1px solid #e2e8f0;
}

.certificate-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.certificate-item:hover {
  transform: translateX(5px);
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.certificate-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.certificate-info {
  flex: 1;
  min-width: 0;
}

.certificate-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.certificate-desc {
  color: #718096;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.certificate-category {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.certificate-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: #667eea;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.certificate-action:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.modal-actions .action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: #667eea;
  color: white;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.modal-actions .action-btn.close {
  background: #f8fafc;
  color: #2d3748;
  border: 1px solid #e2e8f0;
}

.modal-actions .action-btn.close:hover {
  background: #edf2f7;
}

/* Scrollbar styling for certificates list */
.certificates-list::-webkit-scrollbar {
  width: 8px;
}

.certificates-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.certificates-list::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.certificates-list::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Utility Classes */
.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

/* Responsive Design */
@media (max-width: 1100px) {
  .profile-brand-card {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  .brand-visual {
    padding: 2rem;
    border-bottom: 1px solid #e2e8f0;
    order: 1;
  }
  
  .brand-narrative {
    padding: 2rem;
    order: 2;
  }
  
  .stack-chips {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .name {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 3rem 0 2rem;
  }
  
  .name {
    font-size: 2.5rem;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .main-content {
    padding: 0 1rem 3rem;
    margin-top: -1rem;
  }
  
  .profile-brand-card {
    grid-template-columns: 1fr;
  }
  
  .brand-visual {
    border-bottom: 1px solid #e2e8f0;
  }
  
  .stack-chips {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .profile-frame {
    width: 220px;
    height: 220px;
  }
  
  .link-category,
  .cta-section {
    padding: 2rem 1.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .project-image-container {
    height: 180px;
  }
  
  /* Social Media responsive */
  .social-separator.desktop-only,
  .social-card.desktop-only {
    display: none;
  }
  
  .social-card.more-card.mobile-only {
    display: flex;
  }
  
  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  /* Certificates modal responsive */
  .certificates-modal {
    padding: 1.5rem;
    max-height: 90vh;
  }
  
  .certificates-list {
    max-height: 300px;
  }
  
  .certificate-item {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .certificate-info {
    min-width: 100%;
    order: 3;
  }
  
  .certificate-action {
    margin-left: auto;
  }
  
  /* Utility classes for mobile */
  .desktop-only {
    display: none !important;
  }
  
  .mobile-only {
    display: block !important;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 2rem 0 1.5rem;
  }
  
  .name {
    font-size: 2rem;
  }
  
  .title {
    font-size: 1.3rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .profile-frame {
    width: 180px;
    height: 180px;
  }
  
  .profile-glow {
    display: none;
  }
  
  .stack-chips {
    grid-template-columns: 1fr;
  }
  
  .badge-title {
    font-size: 1.1rem;
  }
  
  .project-image-container {
    height: 160px;
  }
  
  .project-title {
    font-size: 1.2rem;
  }
  
  .project-description {
    font-size: 0.9rem;
  }
  
  .tech-tag {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-section {
    padding: 2rem 1rem;
  }
  
  .cta-title {
    font-size: 1.8rem;
  }
  
  .viewer-image-container {
    padding: 1rem;
  }
  
  .viewer-image {
    max-height: 200px;
  }
  
  .qr-image-container {
    width: 150px;
    height: 150px;
  }
  
  .image-viewer-modal,
  .qr-modal,
  .certificates-modal {
    padding: 1.5rem;
  }
  
  .certificate-title {
    font-size: 0.95rem;
  }
  
  .certificate-desc {
    font-size: 0.8rem;
  }
  
  .certificate-action {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<style scoped>
/* ===== GLOBAL STYLES ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profile-container {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  color: #1a202c;
}

/* ===== HEADER ===== */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 1rem 2.5rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.name {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  line-height: 1.1;
}

.title {
  font-size: 1.3rem;
  font-weight: 400;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.3;
}

/* ===== MAIN CONTENT ===== */
.main-content {
  max-width: 1200px;
  margin: -1.5rem auto 0;
  padding: 0 1rem 3rem;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.2;
}

/* ===== PROFILE SECTION - MOBILE FIRST ===== */
.mobile-profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.mobile-profile-frame {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.profile-glow {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
  border-radius: 20px;
  opacity: 0.25;
  z-index: 1;
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
  border: 6px solid white;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.mobile-identity {
  text-align: center;
  padding: 0 1rem;
}

.mobile-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.mobile-title-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 12px;
  color: #667eea;
  font-weight: 500;
  font-size: 0.95rem;
}

.mobile-about {
  padding: 0 0.5rem;
}

.mobile-statement-text {
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 0;
}

.mobile-statement-text .highlight {
  color: #667eea;
  font-weight: 600;
}

.mobile-tech-section,
.mobile-honors-section,
.mobile-contact-section {
  padding: 0 0.5rem;
}

.mobile-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mobile-stack-chips {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.mobile-tech-chip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.mobile-tech-chip i {
  font-size: 1.3rem;
  color: #4a5568;
  width: 28px;
  text-align: center;
}

.mobile-tech-chip span {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3748;
  line-height: 1.2;
}

.mobile-honors-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-honor-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(246, 224, 94, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.mobile-honor-card:active {
  transform: scale(0.98);
}

.mobile-honor-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #f6e05e, #d69e2e);
  border-radius: 4px 0 0 4px;
}

.honor-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f6e05e, #d69e2e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.honor-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.honor-semester {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.2;
}

.honor-year {
  font-size: 0.8rem;
  color: #d69e2e;
  font-weight: 500;
}

.honor-arrow {
  color: #a0aec0;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.mobile-contact-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.mobile-contact-item:active {
  transform: scale(0.98);
}

.mobile-contact-item .contact-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.3rem;
  border: 1px solid #e2e8f0;
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.contact-label {
  font-size: 0.85rem;
  color: #718096;
  font-weight: 500;
}

.contact-value {
  font-size: 0.95rem;
  color: #2d3748;
  font-weight: 500;
  line-height: 1.2;
  word-break: break-all;
}

/* ===== PROJECTS SECTION ===== */
.projects-showcase {
  margin: 3rem 0;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e2e8f0;
}

.project-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.project-status.available {
  background: rgba(56, 161, 105, 0.95);
  color: white;
}

.project-status.unavailable {
  background: rgba(160, 174, 192, 0.95);
  color: white;
}

.project-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.3;
}

.project-description {
  color: #718096;
  line-height: 1.5;
  font-size: 0.95rem;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

.tech-tag.more {
  background: #edf2f7;
  color: #718096;
  font-style: italic;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.project-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  min-height: 52px;
}

.project-action-btn:active {
  transform: scale(0.98);
}

.demo-btn {
  background: #f8fafc;
  color: #2d3748;
  border-color: #e2e8f0;
}

.demo-btn:active {
  background: #edf2f7;
  border-color: #667eea;
  color: #667eea;
}

.github-btn {
  background: #24292e;
  color: white;
  border-color: #24292e;
}

.github-btn:active {
  background: #1a1e22;
}

/* ===== LINKS SECTION ===== */
.links-section {
  margin: 3rem 0;
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.link-category {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.category-title {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-title i {
  color: #667eea;
}

.category-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  min-height: 64px;
}

.link-card:active {
  transform: scale(0.98);
}

.link-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

/* Link card colors */
.portfolio .link-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }
.certificates .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.github .link-icon { background: rgba(36, 41, 46, 0.1); color: #24292e; }
.dev .link-icon { background: rgba(10, 10, 10, 0.1); color: #0a0a0a; }
.stats .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.coffee .link-icon { background: rgba(214, 158, 46, 0.1); color: #d69e2e; }
.telegram .link-icon { background: rgba(0, 136, 204, 0.1); color: #0088cc; }
.qr-support .link-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }

.link-info {
  flex: 1;
}

.link-label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.2rem;
  font-size: 1rem;
}

.link-desc {
  color: #718096;
  font-size: 0.85rem;
}

.link-arrow {
  color: #a0aec0;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

/* ===== SOCIAL MEDIA SECTION ===== */
.social-section {
  margin: 3rem 0;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  min-height: 140px;
}

.social-card:active:not(.more-card) {
  transform: scale(0.98);
}

.social-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

/* Social media colors */
.facebook .social-icon { color: #1877f2; }
.twitter .social-icon { color: #1da1f2; }
.instagram .social-icon { color: #e4405f; }
.youtube .social-icon { color: #ff0000; }
.spotify .social-icon { color: #1db954; }
.linkedin .social-icon { color: #0077b5; }
.pinterest .social-icon { color: #bd081c; }
.tiktok .social-icon { color: #000000; }
.reddit .social-icon { color: #ff4500; }
.discord .social-icon { color: #7289da; }

.social-label {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.social-status {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
}

.social-status.available {
  background: rgba(56, 161, 105, 0.1);
  color: #38a169;
}

.social-status.unavailable {
  background: rgba(160, 174, 192, 0.1);
  color: #a0aec0;
}

/* More card */
.social-card.more-card {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border: 2px dashed #cbd5e0;
  grid-column: span 2;
}

.social-card.more-card .social-icon {
  color: #718096;
}

.social-card.more-card .social-label {
  color: #4a5568;
}

.social-card.more-card:active {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
}

/* ===== CTA SECTION ===== */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: white;
  margin: 3rem 0;
  position: relative;
  overflow: hidden;
}

.cta-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.cta-text {
  font-size: 1.1rem;
  opacity: 0.95;
  margin: 0 auto 2rem;
  line-height: 1.5;
  max-width: 500px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem 2rem;
  background: white;
  color: #667eea;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  min-width: 200px;
  min-height: 56px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.cta-button:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* ===== MODALS ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.modal-text {
  color: #718096;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.modal-close-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.9rem 1.8rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.modal-close-button:active {
  transform: scale(0.98);
  background: #5a67d8;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  color: #2d3748;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:active {
  transform: rotate(90deg);
  background: #667eea;
  color: white;
}

/* ===== DESKTOP LAYOUT (768px and up) ===== */
@media (min-width: 768px) {
  /* Hide mobile layout */
  .mobile-profile-content {
    display: none;
  }
  
  /* Show desktop layout */
  .desktop-profile-content {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 0;
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    min-height: 600px;
  }
  
  /* Desktop Header */
  .header {
    padding: 4rem 0 3rem;
  }
  
  .name {
    font-size: 3.5rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  /* Main Content */
  .main-content {
    margin: -2rem auto 0;
    padding: 0 2rem 4rem;
  }
  
  /* Desktop Profile Layout */
  .brand-visual {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  
  .profile-frame {
    position: relative;
    width: 280px;
    height: 280px;
    margin-bottom: 2rem;
  }
  
  .profile-glow {
    opacity: 0.3;
    border-radius: 24px;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }
  
  .profile-image {
    border-radius: 20px;
    border: 8px solid white;
  }
  
  /* Desktop Identity Badge */
  .identity-badge {
    background: white;
    border-radius: 16px;
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
    border: 1px solid rgba(102, 126, 234, 0.1);
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 320px;
  }
  
  .badge-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 2;
  }
  
  .identity-badge i {
    font-size: 2rem;
    color: #667eea;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .badge-title {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
    line-height: 1.2;
  }
  
  /* Desktop Tech Stack */
  .tech-stack {
    width: 100%;
    max-width: 320px;
    margin-bottom: 2rem;
  }
  
  .stack-chips {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Desktop Academic Honors */
  .achievement-badges {
    width: 100%;
    max-width: 320px;
  }
  
  .badge-grid {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  /* Desktop Right Column */
  .brand-narrative {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .section-title {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    text-align: left;
  }
  
  .brand-statement {
    line-height: 1.8;
    text-align: justify;
  }
  
  .statement-text {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    text-align: justify;
  }
  
  .brand-contact {
    margin-top: 1rem;
  }
  
  .contact-grid {
    gap: 1rem;
  }
  
  .contact-item {
    padding: 1rem;
    gap: 1rem;
  }
  
  .contact-item:hover {
    transform: translateX(5px);
  }
  
  /* Desktop Projects */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .project-card {
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }
  
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .project-image-container {
    height: 200px;
  }
  
  .project-actions {
    margin-top: 1rem;
  }
  
  .project-action-btn {
    padding: 0.9rem;
    min-height: auto;
  }
  
  .project-action-btn:hover {
    transform: translateY(-2px);
  }
  
  .project-action-btn:active {
    transform: scale(0.98);
  }
  
  /* Desktop Links */
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .link-category {
    padding: 2rem;
    border-radius: 20px;
  }
  
  .link-card {
    min-height: auto;
  }
  
  .link-card:hover {
    transform: translateY(-3px);
  }
  
  .link-card:active {
    transform: scale(0.98);
  }
  
  /* Desktop Social */
  .social-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
  
  .social-card {
    min-height: auto;
    padding: 2rem 1rem;
  }
  
  .social-card:hover:not(.more-card) {
    transform: translateY(-5px);
  }
  
  .social-card:active:not(.more-card) {
    transform: scale(0.98);
  }
  
  .social-card.more-card {
    grid-column: span 1;
  }

}

/* ===== TABLET STYLES (640px - 767px) ===== */
@media (min-width: 640px) and (max-width: 767px) {
  .mobile-stack-chips {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .social-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .social-card.more-card {
    grid-column: span 3;
  }
}

/* ===== LARGE MOBILE (480px - 639px) ===== */
@media (min-width: 480px) and (max-width: 639px) {
  .mobile-stack-chips {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .social-card.more-card {
    grid-column: span 2;
  }
}

/* ===== SMALL MOBILE (479px and below) ===== */
@media (max-width: 479px) {
  .mobile-stack-chips {
    grid-template-columns: 1fr;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
  
  .social-card.more-card {
    grid-column: span 1;
  }
  
  .project-actions {
    flex-direction: column;
  }
  
  .project-action-btn {
    min-height: 52px;
  }
}

/* ===== ANIMATIONS ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== UTILITY CLASSES ===== */
.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .desktop-only {
    display: block;
  }
  
  .mobile-only {
    display: none;
  }
}

/* ===== UNIVERSAL MODAL SYSTEM ===== */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55); /* darker + modern */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

/* Base modal */
.modal {
  background: white;
  width: 100%;
  max-width: 900px;              /* ✅ Desktop size */
  max-height: 90vh;              /* ✅ Prevent overflow */
  overflow-y: auto;              /* ✅ Scrollable */
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: modalScale 0.25s ease;
}

/* Large modals (images, certificates, QR, dean list) */
.image-viewer-modal,
.qr-modal,
.certificates-modal {
  max-width: 1000px;   /* ✅ Bigger desktop UI */
}

/* Small info modals (social, project, alerts) */
.modal.small {
  max-width: 420px;
}

/* Close button */
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  z-index: 10;
}

.modal-close:hover {
  background: #667eea;
  color: white;
  transform: rotate(90deg);
}

/* ===== DESKTOP EXPERIENCE ===== */
@media (min-width: 1024px) {
  .modal {
    padding: 3rem;
    border-radius: 24px;
  }

  .image-viewer-modal,
  .qr-modal,
  .certificates-modal {
    max-width: 1100px;  /* premium wide layout */
  }
}

/* ===== MOBILE EXPERIENCE ===== */
@media (max-width: 768px) {
  .modal-overlay {
    align-items: flex-end; /* bottom sheet feel */
    padding: 0;
  }

  .modal {
    width: 100%;
    max-width: 100%;
    max-height: 92vh;
    border-radius: 20px 20px 0 0; /* mobile sheet style */
    padding: 1.5rem;
    animation: modalSlideUp 0.3s ease;
  }

  .image-viewer-modal,
  .qr-modal,
  .certificates-modal {
    max-width: 100%;
  }
}

/* ===== EXTRA SMALL MOBILE ===== */
@media (max-width: 480px) {
  .modal {
    padding: 1.2rem;
  }
}

/* ===== ANIMATIONS ===== */
@keyframes modalScale {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes modalSlideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }



  
}
html, body {
  margin: 0;
  padding: 0;
}

.main-content {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.profile-container {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.header-footer {
  width: 100vw;
  margin: 0;
  padding: 4rem 0 3rem;
  border-radius: 0;
  left: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

@media (min-width: 992px) {
  .header-footer {
    min-height: 100vh;          /* FULL SCREEN HEIGHT */
    display: flex;
    align-items: center;        /* vertical center */
    justify-content: center;    /* horizontal center */
  }
}

/* Footer with Header Style */
.header-footer {
  width: 100vw;                 /* FULL WIDTH */
  margin: 0;         
    margin-top: 100px;           /* remove spacing */
  padding: 4rem 0 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* IMPORTANT */
  border-radius: 0;             /* REMOVE curve para sagad edge */
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}


.header-footer::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.header-footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.footer-name {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.footer-subtitle {
  font-size: 1.8rem;
  font-weight: 400;
  opacity: 0.95;
  margin-bottom: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
}

.footer-cta {
  margin-top: 2rem;
}

.footer-contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  background: white;
  color: #000000;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.footer-contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
  transition: left 0.5s ease;
}

.footer-contact-btn:hover::before {
  left: 100%;
}

.footer-contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  color: #764ba2;
}

.footer-contact-btn i {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.footer-contact-btn:hover i {
  transform: translateX(5px);
}

/* Responsive Design */
@media (max-width: 992px) {
  .footer-name {
    font-size: 3rem;
  }
  
  .footer-subtitle {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .header-footer {
    padding: 3rem 0 2rem;
    border-radius: 20px 20px 0 0;
  }
  
  .footer-name {
    font-size: 2.5rem;
  }
  
  .footer-subtitle {
    font-size: 1.3rem;
    padding: 0 1rem;
  }
  
  .footer-contact-btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .header-footer {
    padding: 2.5rem 0 1.5rem;
    border-radius: 16px 16px 0 0;
  }
  
  .footer-name {
    font-size: 2rem;
  }
  
  .footer-subtitle {
    font-size: 1.1rem;
    line-height: 1.3;
  }
  
  .footer-contact-btn {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
  }
}
</style>