<template>
  <div class="profile-container">
    <!-- Header Section -->
    <header class="header">
      <div class="header-content">
        <h1 class="name">Reymel Mislang</h1>
        <p class="title">Not Full Stack Developer</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Profile & Bio Section -->
      <section class="profile-section">
        <div class="profile-brand-card">
          <!-- Left Column: Visual Identity (Desktop) / First in flow (Mobile) -->
          <div class="brand-visual">
            <div class="profile-frame">
              <div class="profile-glow"></div>
              <img :src="profile.image" alt="Reymel Mislang" class="profile-image" />
              <div class="image-overlay">
                <div class="overlay-gradient"></div>
              </div>
            </div>
            
            <!-- Identity Badge -->
            <div class="identity-badge">
              <div class="badge-content">
                <i class="fas fa-terminal"></i>
                <div class="badge-info">
                  <span class="badge-title">Web Developer</span>
                </div>
              </div>
              <div class="badge-glow"></div>
            </div>
            
            <!-- Tech Stack Chips -->
            <div class="tech-stack">
              <h4 class="stack-title">Core Technologies</h4>
              <div class="stack-chips">
                <div class="tech-chip" v-for="tech in techStack" :key="tech">
                  <i :class="tech.icon"></i>
                  <span>{{ tech.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Academic Honors Section -->
            <div class="achievement-badges">
              <h4 class="achievement-title">Academic Honors</h4>
              <div class="badge-grid">
                <div class="achievement-chip" 
                     v-for="(item, index) in achievements.deansList" 
                     :key="'chip-' + index"
                     @click="openDeansListModal(index)">
                  <div class="chip-icon">
                    <i class="fas fa-award"></i>
                  </div>
                  <div class="chip-content">
                    <span class="chip-semester">{{ item.title.split('|')[0].trim() }}</span>
                    <span class="chip-gwa">GWA {{ item.details[0].split(':')[1].trim() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Column: Brand Narrative (Desktop) / After honors (Mobile) -->
          <div class="brand-narrative">
            <div class="narrative-header">
              <h2 class="section-title">About Me</h2>
            </div>
            
            <!-- Brand Statement -->
            <div class="brand-statement">
              <p class="statement-text">
                I specialize in building <span class="highlight">full-stack applications</span> that solve real-world problems 
                through clean architecture and thoughtful design. With expertise in both frontend and backend 
                development, I create digital experiences that are not just functional, but intuitive and scalable.
              </p>
              <p class="statement-text">
                My approach combines technical excellence with user-centered design principles. I believe in writing 
                clean, maintainable code and creating solutions that are both elegant and efficient. Continuous learning 
                and staying updated with the latest technologies are key aspects of my professional journey.
              </p>
              <p class="statement-text">
                Let's connect and build something amazing together.
              </p>
            </div>
            
            <!-- Contact Information -->
            <div class="brand-contact">
              <h4 class="contact-title">Get in Touch</h4>
              <div class="contact-grid">
                <a href="mailto:reymelrey.mislang@gmail.com" class="contact-item">
                  <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">Email</span>
                    <span class="contact-value">reymelrey.mislang@gmail.com</span>
                  </div>
                  <i class="fas fa-external-link-alt contact-arrow"></i>
                </a>
                
                <a href="https://github.com/codewithryry" target="_blank" class="contact-item">
                  <div class="contact-icon">
                    <i class="fab fa-github"></i>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">GitHub</span>
                    <span class="contact-value">github.com/codewithryry</span>
                  </div>
                  <i class="fas fa-external-link-alt contact-arrow"></i>
                </a>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fab fa-tiktok"></i>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">TikTok</span>
                    <span class="contact-value">{{ profile.username }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Projects Section -->
      <section class="projects-showcase">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid">
          <div class="project-card" v-for="project in projects" :key="project.id">
            <div class="project-image-container">
              <img :src="project.image" :alt="project.title" class="project-image" />
              <div class="project-status" :class="{ 'available': project.demoUrl !== '#', 'unavailable': project.demoUrl === '#' }">
                {{ project.demoUrl !== '#' ? 'Live Demo Available' : 'Demo Coming Soon' }}
              </div>
            </div>
            <div class="project-info">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span class="tech-tag" v-for="tech in project.technologies.slice(0, 4)" :key="tech">
                  {{ tech }}
                </span>
                <span class="tech-tag more" v-if="project.technologies.length > 4">
                  +{{ project.technologies.length - 4 }} more
                </span>
              </div>
              
              <!-- Project Actions - Mobile Optimized -->
              <div class="project-actions">
                <a :href="project.demoUrl" target="_blank" class="project-action-btn demo-btn" 
                   @click="handleProjectClick(project.demoUrl, project.title, $event)">
                  <i class="fas fa-external-link-alt"></i>
                  <span>Live Demo</span>
                </a>
                <a :href="project.githubUrl" target="_blank" class="project-action-btn github-btn">
                  <i class="fab fa-github"></i>
                  <span>View Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Links Section -->
      <section class="links-section">
        <h2 class="section-title">Quick Links</h2>
        <div class="links-grid">
          <!-- Portfolio & Resume -->
          <div class="link-category">
            <h3 class="category-title">
              <i class="fas fa-user"></i> Portfolio & Certificates
            </h3>
            <div class="category-links">
              <a href="https://reymelreymislang.vercel.app/" target="_blank" class="link-card portfolio">
                <div class="link-icon">
                  <i class="fas fa-briefcase"></i>
                </div>
                <div class="link-info">
                  <span class="link-label">Portfolio Website</span>
                  <small class="link-desc">View my work</small>
                </div>
                <i class="fas fa-arrow-right link-arrow"></i>
              </a>
              <!-- Certificates -->
              <a href="#" class="link-card certificates" @click.prevent="openCertificatesListModal">
                <div class="link-icon">
                  <i class="fas fa-certificate"></i>
                </div>
                <div class="link-info">
                  <span class="link-label">Certificates</span>
                  <small class="link-desc">{{ certificates.length }} certifications</small>
                </div>
                <i class="fas fa-arrow-right link-arrow"></i>
              </a>
            </div>
          </div>

          <!-- Development Work -->
          <div class="link-category">
            <h3 class="category-title">
              <i class="fas fa-code"></i> Development Work
            </h3>
            <div class="category-links">
              <a href="https://github.com/codewithryry?tab=repositories" target="_blank" class="link-card github">
                <div class="link-icon">
                  <i class="fab fa-github"></i>
                </div>
                <div class="link-info">
                  <span class="link-label">GitHub Repositories</span>
                  <small class="link-desc">All my projects</small>
                </div>
                <i class="fas fa-arrow-right link-arrow"></i>
              </a>
              
              <a href="https://dev.to/codewithryry" target="_blank" class="link-card dev">
                <div class="link-icon">
                  <i class="fab fa-dev"></i>
                </div>
                <div class="link-info">
                  <span class="link-label">Dev.to Articles</span>
                  <small class="link-desc">Technical writing</small>
                </div>
                <i class="fas fa-arrow-right link-arrow"></i>
              </a>
              
              <a href="https://wakatime.com/@codewithryry" target="_blank" class="link-card stats">
                <div class="link-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <div class="link-info">
                  <span class="link-label">WakaTime Stats</span>
                  <small class="link-desc">Coding analytics</small>
                </div>
                <i class="fas fa-arrow-right link-arrow"></i>
              </a>
            </div>
          </div>

          <!-- Support & Connect -->
          <div class="link-category">
            <h3 class="category-title">
              <i class="fas fa-handshake"></i> Support & Connect
            </h3>
            <div class="category-links">
              <!-- QR Support Card -->
              <div class="link-card qr-support" @click="openQRModal">
                <div class="link-icon">
                  <i class="fas fa-qrcode"></i>
                </div>
                <div class="link-info">
                  <span class="link-label">Support via QR</span>
                  <small class="link-desc">Multiple banks available</small>
                </div>
                <i class="fas fa-external-link-alt link-arrow"></i>
              </div>
              
              <a href="https://buymeacoffee.com/reymelreym7" target="_blank" class="link-card coffee">
                <div class="link-icon">
                  <i class="fas fa-coffee"></i>
                </div>
                <div class="link-info">
                  <span class="link-label">Buy Me a Coffee</span>
                  <small class="link-desc">Support my work</small>
                </div>
                <i class="fas fa-arrow-right link-arrow"></i>
              </a>
              
              <a href="https://t.me/+XpsVdhvIlVM4ZTA1" target="_blank" class="link-card telegram">
                <div class="link-icon">
                  <i class="fab fa-telegram"></i>
                </div>
                <div class="link-info">
                  <span class="link-label">Telegram Channel</span>
                  <small class="link-desc">Join community</small>
                </div>
                <i class="fas fa-arrow-right link-arrow"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Social Media Section -->
      <section class="social-section">
        <h2 class="section-title">Connect Online</h2>
        <div class="social-grid">
          <!-- Available Social Media -->
          <a v-for="link in availableSocialLinks" 
             :key="link.id"
             :href="link.url" 
             target="_blank"
             :class="['social-card', link.label.toLowerCase()]">
            <div class="social-icon">
              <i :class="link.icon"></i>
            </div>
            <span class="social-label">{{ link.label }}</span>
            <span class="social-status available">Available</span>
          </a>
          
          <!-- More Card for Unavailable Platforms -->
          <div class="social-card more-card" 
               v-if="unavailableSocialLinks.length > 0"
               @click="openUnavailableSocialModal('All Platforms')">
            <div class="social-icon">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            <span class="social-label">More Platforms</span>
            <span class="social-status unavailable">{{ unavailableSocialLinks.length }} coming soon</span>
          </div>
        </div>
      </section>

      <br>
      <br>
      <!-- Contact CTA -->
      <section class="cta-section">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Build Something Great?</h2>
          <p class="cta-text">
            Have a project in mind or want to collaborate on something innovative? 
            Let's connect and create something amazing together.
          </p>
          <div class="cta-buttons">
            <a href="mailto:reymelrey.mislang@gmail.com" class="cta-button primary">
              <i class="fas fa-envelope"></i>
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </main>

    <!-- Dean's List Image Viewer Modal -->
    <transition name="fade">
      <div v-if="showDeansListModal" class="modal-overlay" @click="closeDeansListModal">
        <div class="modal image-viewer-modal" @click.stop>
          <button class="modal-close" @click="closeDeansListModal">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="viewer-header">
            <div class="viewer-badge">
              <i class="fas fa-trophy"></i>
              Dean's List Award
            </div>
            <h3 class="viewer-title">{{ currentDeansListItem.title }}</h3>
          </div>
          
          <div class="viewer-image-container">
            <img :src="currentDeansListItem.image" 
                 :alt="currentDeansListItem.title" 
                 class="viewer-image" />
          </div>
          
          <div class="viewer-details">
            <div class="detail-row">
              <div class="detail-col">
                <i class="fas fa-user-graduate"></i>
                <div>
                  <span class="detail-label">Year Level</span>
                  <span class="detail-value">{{ currentDeansListItem.details[2].split(':')[1].trim() }}</span>
                </div>
              </div>
              <div class="detail-col">
                <i class="fas fa-chart-bar"></i>
                <div>
                  <span class="detail-label">GWA</span>
                  <span class="detail-value">{{ currentDeansListItem.details[0].split(':')[1].trim() }}</span>
                </div>
              </div>
            </div>
            
            <div class="detail-row">
              <div class="detail-col">
                <i class="fas fa-calendar-alt"></i>
                <div>
                  <span class="detail-label">Academic Year</span>
                  <span class="detail-value">{{ currentDeansListItem.details[1].split(':')[1].trim() }}</span>
                </div>
              </div>
              <div class="detail-col">
                <i class="fas fa-book"></i>
                <div>
                  <span class="detail-label">Semester</span>
                  <span class="detail-value">{{ currentDeansListItem.details[3].split(':')[1].trim() }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="viewer-navigation">
            <button @click="prevDeansList" class="nav-btn" :disabled="currentDeansListIndex === 0">
              <i class="fas fa-chevron-left"></i>
              Previous
            </button>
            <span class="nav-counter">
              {{ currentDeansListIndex + 1 }} / {{ achievements.deansList.length }}
            </span>
            <button @click="nextDeansList" class="nav-btn" 
                    :disabled="currentDeansListIndex === achievements.deansList.length - 1">
              Next
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div class="viewer-actions">
            <a :href="currentDeansListItem.image" 
               target="_blank" 
               class="action-btn view-full">
              <i class="fas fa-external-link-alt"></i>
              View Full Size
            </a>
            <a :href="currentDeansListItem.image" 
               download 
               class="action-btn download">
              <i class="fas fa-download"></i>
              Download Image
            </a>
          </div>
        </div>
      </div>
    </transition>

    <!-- QR Codes Modal -->
    <transition name="fade">
      <div v-if="showQRModal" class="modal-overlay" @click="closeQRModal">
        <div class="modal qr-modal" @click.stop>
          <button class="modal-close" @click="closeQRModal">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="modal-header">
            <div class="modal-icon">
              <i class="fas fa-qrcode"></i>
            </div>
            <h3 class="modal-title">Support via QR Codes</h3>
            <p class="modal-subtitle">Select a bank to view or download QR</p>
          </div>
          
          <div class="qr-navigation">
            <button @click="prevQR" class="nav-btn" :disabled="currentQRIndex === 0">
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <div class="qr-display">
              <div class="qr-bank-name">{{ currentQR.bank }}</div>
              <div class="qr-image-container">
                <img :src="currentQR.image" :alt="currentQR.bank" class="qr-image" />
              </div>
              <p class="qr-description">{{ currentQR.description }}</p>
            </div>
            
            <button @click="nextQR" class="nav-btn" :disabled="currentQRIndex === achievements.qr.length - 1">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div class="qr-indicators">
            <span v-for="(qr, index) in achievements.qr" 
                  :key="qr.id" 
                  :class="['indicator', { active: index === currentQRIndex }]"
                  @click="goToQR(index)">
            </span>
          </div>
          
          <div class="qr-actions">
            <a :href="currentQR.image" 
               :download="currentQR.bank + '_QR.jpg'" 
               class="action-btn download">
              <i class="fas fa-download"></i>
              Download QR
            </a>
            <button @click="closeQRModal" class="action-btn close">
              <i class="fas fa-check"></i>
              Done
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Certificates List Modal -->
    <transition name="fade">
      <div v-if="showCertificatesListModal" class="modal-overlay" @click="closeCertificatesListModal">
        <div class="modal certificates-modal" @click.stop>
          <button class="modal-close" @click="closeCertificatesListModal">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="modal-header">
            <div class="modal-icon">
              <i class="fas fa-certificate"></i>
            </div>
            <h3 class="modal-title">Certificates & Certifications</h3>
            <p class="modal-subtitle">{{ certificates.length }} professional certificates</p>
          </div>
          
          <div class="certificates-list">
            <div class="certificate-item" v-for="cert in certificates" :key="cert.id">
              <div class="certificate-icon">
                <i class="fas fa-file-pdf"></i>
              </div>
              <div class="certificate-info">
                <h4 class="certificate-title">{{ cert.title }}</h4>
                <p class="certificate-desc">{{ cert.description }}</p>
                <span class="certificate-category">{{ cert.category }}</span>
              </div>
              <a :href="getCertificatePath(cert.file)" 
                 target="_blank" 
                 class="certificate-action">
                <i class="fas fa-external-link-alt"></i>
                View
              </a>
            </div>
          </div>
          
          <div class="modal-actions">
            <button @click="closeCertificatesListModal" class="action-btn close">
              <i class="fas fa-check"></i>
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Project Demo Modal -->
    <transition name="fade">
      <div v-if="showProjectModal" class="modal-overlay" @click="closeProjectModal">
        <div class="modal" @click.stop>
          <div class="modal-icon">
            <i class="fas fa-code"></i>
          </div>
          <h3 class="modal-title">Project Demo Coming Soon</h3>
          <p class="modal-text">{{ projectModalMessage }}</p>
          <button @click="closeProjectModal" class="modal-close-button">Got it</button>
        </div>
      </div>
    </transition>

    <!-- Social Media Modal -->
    <transition name="fade">
      <div v-if="showSocialModal" class="modal-overlay" @click="closeSocialModal">
        <div class="modal" @click.stop>
          <div class="modal-icon">
            <i class="fas fa-share-alt"></i>
          </div>
          <p class="modal-text">{{ socialModalMessage }}</p>
          <div class="social-modal-list" v-if="socialModalPlatforms.length > 0">
            <div class="social-modal-item" v-for="platform in socialModalPlatforms" :key="platform">
              <i :class="getPlatformIcon(platform)"></i>
              <span>{{ platform }}</span>
            </div>
          </div>
          <button @click="closeSocialModal" class="modal-close-button">Got it</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PersonalProfile",
  data() {
    return {
      profile: {
        name: "Reymel Mislang",
        username: "@reymelrey.mislang528191",
        image: require("@/assets/profile3.jpg"),
      },
      techStack: [
        { name: "Vue.js", icon: "fab fa-vuejs" },
        { name: "Node.js", icon: "fab fa-node-js" },
        { name: "Django", icon: "fas fa-server" },
        { name: "JavaScript", icon: "fab fa-js" },
      ],
      projects: [
        {
          id: 5,
          title: "Trabahanap",
          description: "A Python-based job portal that connects job seekers and employers through profile management, job posting, and application tracking.",
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
          ]
        },
        {
          id: 2,
          title: "SafePath",
          description: "Bullying reporting system with AI support and sentiment analysis",
          image: require("@/assets/safepath.png"),
          demoUrl: "https://safepath-4pzk.onrender.com",
          githubUrl: "https://github.com/codewithryry/SafePath",
          technologies: ["Node.js", "MySQL", "Wit.ai", "TensorFlow", "VADER"],
          features: [
            "Anonymous reporting",
            "Sentiment analysis",
            "AI chatbot support"
          ]
        },
        {
          id: 3,
          title: "LiftUp",
          description: "Mental health platform with AI assistance and community support",
          image: require("@/assets/liftup.png"),
          demoUrl: "https://liftupconnect.vercel.app/",
          githubUrl: "https://github.com/codewithryry/LiftUp",
          technologies: ["Vue.js", "AI Chatbot", "Firebase", "Community Forums"],
          features: [
            "AI mental health support",
            "Anonymous community",
            "Wellness resources"
          ]
        }
      ],
      // Certificates Data
      certificates: [
        {
          id: 1,
          title: "FortiGate 7.6 Operator",
          file: "FortiGate 7.6 Operator.pdf",
          description: "Fortinet FortiGate firewall operator certification",
          category: "Cybersecurity"
        },
        {
          id: 2,
          title: "Certified Associate in Cybersecurity",
          file: "Fortinet Certified Associate in Cybersecurity.pdf",
          description: "Associate level cybersecurity certification",
          category: "Cybersecurity"
        },
        {
          id: 3,
          title: "Fundamentals in Cybersecurity",
          file: "Fortinet Certified Fundamentals in Cybersecurity.pdf",
          description: "Fundamental cybersecurity knowledge certification",
          category: "Cybersecurity"
        },
        {
          id: 4,
          title: "Networking Fundamentals",
          file: "Fortinet Networking Fundamentals Self-Paced.pdf",
          description: "Self-paced networking fundamentals course",
          category: "Networking"
        },
        {
          id: 5,
          title: "Getting Started In Cybersecurity 3.0",
          file: "Getting Started In Cybersecurity 3.0.pdf",
          description: "Cybersecurity beginner course",
          category: "Cybersecurity"
        },
        {
          id: 6,
          title: "Introduction to the Threat Landscape 3.0",
          file: "Introduction to the Threat Landscape 3.0.pdf",
          description: "Threat landscape analysis course",
          category: "Cybersecurity"
        },
        {
          id: 7,
          title: "Technical Introduction to Cybersecurity 3.0",
          file: "Technical Introduction to Cybersecurity 3.0.pdf",
          description: "Technical cybersecurity fundamentals",
          category: "Cybersecurity"
        }
      ],
      // Achievements Data
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
      socialLinks: [
        {
          id: 1,
          label: "Facebook",
          icon: "fab fa-facebook",
          url: "https://www.facebook.com/100063507442180",
        },
        {
          id: 2,
          label: "Twitter",
          icon: "fab fa-twitter",
          url: "#",
        },
        {
          id: 3,
          label: "Instagram",
          icon: "fab fa-instagram",
          url: "https://www.instagram.com/49221279381/",
        },
        {
          id: 4,
          label: "YouTube",
          icon: "fab fa-youtube",
          url: "#",
        },
        {
          id: 5,
          label: "Spotify",
          icon: "fab fa-spotify",
          url: "https://open.spotify.com/user/yzay8x8u0lqinlp7mbxuy24aj",
        },
        {
          id: 6,
          label: "LinkedIn",
          icon: "fab fa-linkedin",
          url: "#",
        },
        {
          id: 7,
          label: "Pinterest",
          icon: "fab fa-pinterest",
          url: "#",
        },
        {
          id: 8,
          label: "TikTok",
          icon: "fab fa-tiktok",
          url: "https://www.tiktok.com/@betsyoneontg",
        },
        {
          id: 10,
          label: "Reddit",
          icon: "fab fa-reddit",
          url: "#",
        },
        {
          id: 11,
          label: "Discord",
          icon: "fab fa-discord",
          url: "#",
        },
      ],
      // Modal states
      showDeansListModal: false,
      showQRModal: false,
      showProjectModal: false,
      showSocialModal: false,
      showCertificatesListModal: false,
      currentDeansListIndex: 0,
      currentQRIndex: 0,
      projectModalMessage: "",
      socialModalMessage: "",
      socialModalTitle: "",
      socialModalPlatforms: [],
    };
  },
  computed: {
    currentDeansListItem() {
      return this.achievements.deansList[this.currentDeansListIndex] || {};
    },
    currentQR() {
      return this.achievements.qr[this.currentQRIndex] || {};
    },
    availableSocialLinks() {
      return this.socialLinks.filter(link => link.url !== '#');
    },
    unavailableSocialLinks() {
      return this.socialLinks.filter(link => link.url === '#');
    }
  },
  methods: {
    getPlatformIcon(platform) {
      const social = this.socialLinks.find(link => link.label === platform);
      return social ? social.icon : 'fas fa-share-alt';
    },
    
    // Dean's List Methods
    openDeansListModal(index) {
      this.currentDeansListIndex = index;
      this.showDeansListModal = true;
    },
    
    closeDeansListModal() {
      this.showDeansListModal = false;
    },
    
    nextDeansList() {
      if (this.currentDeansListIndex < this.achievements.deansList.length - 1) {
        this.currentDeansListIndex++;
      }
    },
    
    prevDeansList() {
      if (this.currentDeansListIndex > 0) {
        this.currentDeansListIndex--;
      }
    },
    
    // QR Methods
    openQRModal() {
      this.showQRModal = true;
    },
    
    closeQRModal() {
      this.showQRModal = false;
    },
    
    nextQR() {
      if (this.currentQRIndex < this.achievements.qr.length - 1) {
        this.currentQRIndex++;
      }
    },
    
    prevQR() {
      if (this.currentQRIndex > 0) {
        this.currentQRIndex--;
      }
    },
    
    goToQR(index) {
      this.currentQRIndex = index;
    },
    
    // Certificates Methods
    openCertificatesListModal() {
      this.showCertificatesListModal = true;
    },
    
    closeCertificatesListModal() {
      this.showCertificatesListModal = false;
    },
    
    getCertificatePath(filename) {
      // Assuming certificates are in a "certificates" folder in public directory
      return `/certificates/${filename}`;
    },
    
    // Project Methods
    handleProjectClick(url, projectTitle, event) {
      if (url === "#") {
        event.preventDefault();
        this.projectModalMessage = `The live demo for "${projectTitle}" is not available yet. The project is still under development. Check back later or view the code on GitHub!`;
        this.showProjectModal = true;
      }
    },
    
    closeProjectModal() {
      this.showProjectModal = false;
      this.projectModalMessage = "";
    },
    
    // Social Media Methods
    openUnavailableSocialModal(platform) {
      if (platform === 'All Platforms') {
        this.socialModalTitle = "Platforms Coming Soon";
        this.socialModalMessage = "These platforms are currently being set up and will be available soon:";
        this.socialModalPlatforms = this.unavailableSocialLinks.map(link => link.label);
      } else {
        this.socialModalTitle = `${platform} Coming Soon`;
        this.socialModalMessage = `My ${platform} profile is not available yet. I'll be setting it up soon!`;
        this.socialModalPlatforms = [];
      }
      this.showSocialModal = true;
    },
    
    closeSocialModal() {
      this.showSocialModal = false;
      this.socialModalMessage = "";
      this.socialModalTitle = "";
      this.socialModalPlatforms = [];
    },
  },
};
</script>

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
  filter: blur(20px);
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
  backdrop-filter: blur(10px);
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
  backdrop-filter: blur(5px);
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
  filter: blur(20px);
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

/* Desktop hover overlay */
.project-links.desktop-only {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 1.5rem 1rem 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.project-card:hover .project-links.desktop-only {
  opacity: 1;
  transform: translateY(0);
}

.project-link {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.project-link.demo {
  background: rgba(255, 255, 255, 0.9);
  color: #2d3748;
  margin-right: 0.5rem;
}

.project-link.demo:hover {
  background: white;
  color: #667eea;
}

.project-link.github {
  background: rgba(36, 41, 46, 0.9);
  color: white;
  margin-left: 0.5rem;
}

.project-link.github:hover {
  background: #24292e;
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

.project-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #4a5568;
}

.feature i {
  color: #38a169;
  font-size: 0.9rem;
}

/* Mobile inline buttons */
.project-action-buttons.mobile-only {
  display: none;
  margin-top: 1rem;
  gap: 0.5rem;
}

.project-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.project-action-btn.demo {
  background: #f7fafc;
  color: #2d3748;
  border: 1px solid #e2e8f0;
}

.project-action-btn.demo:hover {
  background: white;
  color: #667eea;
  border-color: #667eea;
}

.project-action-btn.github {
  background: #24292e;
  color: white;
  border: 1px solid #24292e;
}

.project-action-btn.github:hover {
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
.resume .link-icon { background: rgba(245, 101, 101, 0.1); color: #f56565; }
.github .link-icon { background: rgba(36, 41, 46, 0.1); color: #24292e; }
.dev .link-icon { background: rgba(10, 10, 10, 0.1); color: #0a0a0a; }
.stats .link-icon { background: rgba(56, 161, 105, 0.1); color: #38a169; }
.coffee .link-icon { background: rgba(214, 158, 46, 0.1); color: #d69e2e; }
.telegram .link-icon { background: rgba(0, 136, 204, 0.1); color: #0088cc; }

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

/* Social Separator for Desktop */
.social-separator.desktop-only {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  margin: 1rem 0;
  position: relative;
}

.social-separator.desktop-only::before {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.separator-text {
  padding: 0 1rem;
  color: #a0aec0;
  font-size: 0.9rem;
  font-weight: 500;
  background: #f8fafc;
}

/* More Card for Mobile */
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
  backdrop-filter: blur(10px);
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
  backdrop-filter: blur(5px);
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
  
  /* Disable desktop hover effects on mobile */
  .project-links.desktop-only {
    display: none;
  }
  
  /* Show mobile inline buttons */
  .project-action-buttons.mobile-only {
    display: flex;
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
  .qr-modal {
    padding: 1.5rem;
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
/* Mobile-First Responsive Design */
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

/* Header - Mobile Optimized */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 1rem 2.5rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
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

/* Main Content - Mobile Padding */
.main-content {
  max-width: 1200px;
  margin: -1.5rem auto 0;
  padding: 0 1rem 3rem;
  position: relative;
  z-index: 1;
}

/* Profile Section - Mobile Layout */
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

.mobile-profile-frame .profile-glow {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
  border-radius: 20px;
  filter: blur(15px);
  opacity: 0.25;
  z-index: 1;
}

.mobile-profile-frame .profile-image {
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

/* Mobile About */
.mobile-about {
  padding: 0 0.5rem;
}

.mobile-section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;
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

/* Mobile Tech Section */
.mobile-tech-section {
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

/* Mobile Honors Section */
.mobile-honors-section {
  padding: 0 0.5rem;
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

.mobile-honor-card:hover .honor-arrow {
  transform: translateX(3px);
}

/* Mobile Contact Section */
.mobile-contact-section {
  padding: 0 0.5rem;
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

/* Desktop Layout - Hidden on Mobile */
.desktop-profile-content {
  display: none;
}

/* Projects Section - Mobile Optimized */
.projects-showcase {
  margin: 3rem 0;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.2;
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

/* Project Actions - Mobile Optimized */
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
  min-height: 52px; /* Touch-friendly height */
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

/* Links Section - Mobile Optimized */
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
  min-height: 64px; /* Touch-friendly */
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

.link-card:active .link-arrow {
  transform: translateX(3px);
}

/* Social Media Section - Mobile Optimized */
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
  min-height: 140px; /* Touch-friendly area */
}

.social-card:active:not(.more-card) {
  transform: scale(0.98);
}

.social-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

/* Social Media Colors */
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

/* More Card */
.social-card.more-card {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border: 2px dashed #cbd5e0;
  grid-column: span 2; /* Full width on mobile */
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

/* CTA Section - Mobile Optimized */
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
  min-height: 56px; /* Touch-friendly */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.cta-button:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Footer - Mobile Optimized */
.footer {
  background: #1a202c;
  color: white;
  padding: 2.5rem 1rem;
  position: relative;
  margin-top: 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-logo i {
  color: #667eea;
}

.footer-text {
  color: #a0aec0;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.footer-link {
  color: #667eea;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-link:active {
  text-decoration: underline;
}

.footer-copyright {
  color: #718096;
  font-size: 0.85rem;
  margin-top: 1rem;
}

/* Desktop Styles */
@media (min-width: 768px) {
  /* Hide mobile layout on desktop */
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
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f687b3);
    border-radius: 24px;
    filter: blur(20px);
    opacity: 0.3;
    z-index: 1;
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
  
  .narrative-header {
    text-align: left;
  }
  
  .section-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #2d3748;
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
  
  /* Desktop CTA */
  .cta-section {
    padding: 4rem;
    border-radius: 24px;
  }
  
  .cta-title {
    font-size: 2.5rem;
  }
  
  .cta-text {
    font-size: 1.2rem;
  }
  
  .cta-button {
    min-height: auto;
  }
  
  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
  
  .cta-button:active {
    transform: scale(0.98);
  }
  
  /* Desktop Footer */
  .footer {
    padding: 3rem 0;
  }
  
  .footer-logo {
    font-size: 1.5rem;
  }
}

/* Tablet Styles */
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
  
  .project-actions {
    flex-direction: row;
  }
}

/* Large Mobile */
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

/* Small Mobile */
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
</style>