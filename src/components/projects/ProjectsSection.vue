<template>
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
          
          <!-- Project Actions -->
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
</template>

<script>
export default {
  name: 'ProjectsSection',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  emits: ['openProjectModal'],
  methods: {
    handleProjectClick(url, projectTitle, event) {
      if (url === "#") {
        event.preventDefault();
        this.$emit('openProjectModal', `The live demo for "${projectTitle}" is not available yet. The project is still under development. Check back later or view the code on GitHub!`);
      }
    }
  }
}
</script>

<style scoped>
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