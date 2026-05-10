<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <button class="modal-close" @click="close">
          <i class="fas fa-times"></i>
        </button>
        
        <div v-if="project" class="modal-content">
          <!-- Project Header -->
          <div class="project-header">
            <div class="project-meta">
              <span class="project-badge" :class="{ 'live': project.status === 'Live', 'dev': project.status === 'Development' }">
                {{ project.status || 'In Development' }}
              </span>
              <span class="project-date">{{ project.startDate || '2024' }}</span>
            </div>
            <h2 class="project-title">{{ project.title }}</h2>
            <p class="project-subtitle">{{ project.tagline || project.description }}</p>
          </div>
          
          <!-- Project Gallery -->
          <div class="project-gallery" v-if="project.gallery && project.gallery.length > 0">
            <div class="main-image">
              <img :src="currentImage || project.image" :alt="project.title" @load="onImageLoad" />
              <div class="image-loader" v-if="loading">
                <i class="fas fa-spinner fa-spin"></i>
              </div>
            </div>
            <div class="gallery-thumbnails">
              <button v-for="(img, index) in [project.image, ...project.gallery]" 
                      :key="index" 
                      class="thumbnail"
                      @click="selectImage(img)"
                      :class="{ active: currentImage === img }">
                <img :src="img" :alt="`${project.title} ${index + 1}`" />
              </button>
            </div>
          </div>
          
          <!-- Project Details Grid -->
          <div class="details-grid">
            <!-- Technologies -->
            <div class="detail-section">
              <h3><i class="fas fa-code"></i> Tech Stack</h3>
              <div class="tech-stack">
                <div v-for="tech in project.technologies" :key="tech" class="tech-item">
                  <i class="fas fa-cube"></i>
                  <span>{{ tech }}</span>
                </div>
              </div>
            </div>
            
            <!-- Key Features -->
            <div class="detail-section">
              <h3><i class="fas fa-star"></i> Key Features</h3>
              <ul class="features-list">
                <li v-for="feature in project.features" :key="feature">
                  <i class="fas fa-check"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Project Stats -->
            <div class="detail-section">
              <h3><i class="fas fa-chart-bar"></i> Project Stats</h3>
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-calendar"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">{{ project.duration || '3 months' }}</span>
                    <span class="stat-label">Duration</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-layer-group"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">{{ project.complexity || 'Intermediate' }}</span>
                    <span class="stat-label">Complexity</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">{{ project.teamSize || 'Solo' }}</span>
                    <span class="stat-label">Team Size</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-tasks"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">{{ project.completion || '95%' }}</span>
                    <span class="stat-label">Completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Detailed Description -->
          <div class="description-section">
            <h3><i class="fas fa-file-alt"></i> Project Overview</h3>
            <div class="description-content">
              <p>{{ project.detailedDescription || project.description }}</p>
              
              <div class="challenges" v-if="project.challenges">
                <h4>Challenges & Solutions</h4>
                <div v-for="challenge in project.challenges" :key="challenge.title" class="challenge-item">
                  <strong>{{ challenge.title }}:</strong>
                  <span>{{ challenge.solution }}</span>
                </div>
              </div>
              
              <div class="learnings" v-if="project.learnings">
                <h4>Key Learnings</h4>
                <ul>
                  <li v-for="learning in project.learnings" :key="learning">
                    {{ learning }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons">
            <a v-if="project.demoUrl && project.demoUrl !== '#'" 
               :href="project.demoUrl" 
               target="_blank" 
               class="action-button primary">
              <i class="fas fa-external-link-alt"></i>
              Live Demo
            </a>
            <a v-if="project.githubUrl" 
               :href="project.githubUrl" 
               target="_blank" 
               class="action-button secondary">
              <i class="fab fa-github"></i>
              View Code
            </a>
            <a v-if="project.documentation" 
               :href="project.documentation" 
               target="_blank" 
               class="action-button outline">
              <i class="fas fa-book"></i>
              Documentation
            </a>
            <button @click="close" class="action-button close">
              <i class="fas fa-times"></i>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ProjectDeepDiveModal",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    project: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      currentImage: null,
      loading: false
    }
  },
  watch: {
    project(newProject) {
      if (newProject) {
        this.currentImage = newProject.image
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    selectImage(img) {
      this.loading = true
      this.currentImage = img
    },
    onImageLoad() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-20px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 24px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
  animation: modalSlideUp 0.3s ease;
}

@keyframes modalSlideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
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
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: #667eea;
  color: white;
  transform: rotate(90deg);
}

.modal-content {
  padding: 3rem;
}

.project-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.project-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.project-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.project-badge.live {
  background: rgba(56, 161, 105, 0.1);
  color: #38a169;
}

.project-badge.dev {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.project-date {
  color: #718096;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-date::before {
  content: '📅';
  font-size: 0.8rem;
}

.project-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.project-subtitle {
  color: #718096;
  font-size: 1.2rem;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
}

.project-gallery {
  margin-bottom: 2.5rem;
}

.main-image {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.main-image:hover img {
  transform: scale(1.02);
}

.image-loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(248, 250, 252, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #667eea;
}

.gallery-thumbnails {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  background: #f8fafc;
  padding: 0;
}

.thumbnail:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.thumbnail.active {
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.detail-section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.detail-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-section h3 i {
  color: #667eea;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 0.9rem;
  color: #4a5568;
}

.tech-item i {
  color: #667eea;
  font-size: 0.8rem;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #4a5568;
  font-size: 0.95rem;
}

.features-list li i {
  color: #38a169;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.stat-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-value {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #718096;
}

.description-section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  border: 1px solid #e2e8f0;
}

.description-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.description-section h3 i {
  color: #667eea;
}

.description-content {
  color: #4a5568;
  line-height: 1.6;
}

.description-content p {
  margin-bottom: 1.5rem;
}

.challenges,
.learnings {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.challenges h4,
.learnings h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.challenge-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.challenge-item strong {
  color: #2d3748;
  display: block;
  margin-bottom: 0.5rem;
}

.learnings ul {
  list-style: none;
  padding-left: 1rem;
}

.learnings li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: #4a5568;
}

.learnings li::before {
  content: '•';
  color: #667eea;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 160px;
  border: 2px solid transparent;
}

.action-button.primary {
  background: #667eea;
  color: white;
}

.action-button.primary:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.action-button.secondary {
  background: #24292e;
  color: white;
}

.action-button.secondary:hover {
  background: #1a1e22;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(36, 41, 46, 0.3);
}

.action-button.outline {
  background: white;
  color: #4a5568;
  border-color: #e2e8f0;
}

.action-button.outline:hover {
  border-color: #667eea;
  color: #667eea;
}

.action-button.close {
  background: #f1f5f9;
  color: #4a5568;
  border-color: #e2e8f0;
}

.action-button.close:hover {
  background: #e2e8f0;
  color: #f56565;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
    border-radius: 16px;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .project-title {
    font-size: 1.8rem;
  }
  
  .project-subtitle {
    font-size: 1.1rem;
  }
  
  .main-image {
    height: 250px;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.25rem;
  }
  
  .project-title {
    font-size: 1.5rem;
  }
  
  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
