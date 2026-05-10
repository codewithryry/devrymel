<template>
  <section class="experience-section">
    <div class="section-header">
      <h2 class="section-title">Experience & Internship</h2>
    </div>

    <div v-if="experiences.length" class="experience-shell">
      <!-- Mobile swipe hint - same placement style as Quick Links -->
      <div class="swipe-hint">
        <span>Swipe for more..</span>
      </div>

      <!-- Company selector -->
      <div class="timeline-strip">
        <button
          v-for="company in companies"
          :key="company"
          type="button"
          class="timeline-item"
          :class="{ active: activeCompany === company }"
          @click="setActiveCompany(company)"
        >
          <span class="timeline-dot"></span>

          <span class="timeline-info">
            <strong>{{ company }}</strong>
          </span>
        </button>
      </div>

      <!-- Role selector under selected company -->
      <div
        v-if="companyExperiences.length > 1"
        class="company-role-tabs"
      >
        <button
          v-for="(item, index) in companyExperiences"
          :key="`${item.role}-${index}`"
          type="button"
          class="role-tab"
          :class="{ active: activeRoleIndex === index }"
          @click="setActiveRole(index)"
        >
          {{ item.role }}
        </button>
      </div>

      <!-- Active experience card -->
      <article class="experience-feature-card">
        <div class="experience-card-top">
          <div class="experience-badge">
            <i class="fas fa-briefcase"></i>
          </div>

          <div class="experience-heading">
            <span class="experience-count">
              {{ activeRoleIndex + 1 }} / {{ companyExperiences.length }}
            </span>
            <h3>{{ activeExperience.role }}</h3>
            <p>{{ activeExperience.company }}</p>
          </div>

          <span class="experience-date">{{ activeExperience.date }}</span>
        </div>

        <p class="experience-description">
          {{ activeExperience.description }}
        </p>

        <div class="experience-task-grid">
          <div
            v-for="(task, index) in displayedTasks"
            :key="index"
            class="task-pill"
          >
            <i class="fas fa-check"></i>
            <span>{{ task }}</span>
          </div>
        </div>

        <!-- Mobile only show more -->
        <button
          v-if="
            isMobile &&
            activeExperience.tasks &&
            activeExperience.tasks.length > mobileTaskLimit
          "
          type="button"
          class="mobile-show-more-btn"
          @click="showAllMobileTasks = !showAllMobileTasks"
        >
          <span>
            {{
              showAllMobileTasks
                ? "Show less"
                : `Show ${activeExperience.tasks.length - mobileTaskLimit} more`
            }}
          </span>
          <i
            class="fas"
            :class="showAllMobileTasks ? 'fa-chevron-up' : 'fa-chevron-down'"
          ></i>
        </button>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: "ExperienceSection",

  props: {
    experiences: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeCompany: "",
      activeRoleIndex: 0,
      isMobile: false,
      showAllMobileTasks: false,
      mobileTaskLimit: 3
    }
  },

  computed: {
    companies() {
      return [...new Set(this.experiences.map((item) => item.company))]
    },

    companyExperiences() {
      return this.experiences.filter(
        (item) => item.company === this.activeCompany
      )
    },

    activeExperience() {
      return (
        this.companyExperiences[this.activeRoleIndex] ||
        this.experiences[0] ||
        {}
      )
    },

    displayedTasks() {
      const tasks = this.activeExperience.tasks || []

      if (!this.isMobile) {
        return tasks
      }

      if (this.showAllMobileTasks) {
        return tasks
      }

      return tasks.slice(0, this.mobileTaskLimit)
    }
  },

  watch: {
    experiences: {
      immediate: true,
      handler(newExperiences) {
        if (newExperiences.length && !this.activeCompany) {
          this.activeCompany = this.companies[0] || ""
        }
      }
    }
  },

  methods: {
    setActiveCompany(company) {
      this.activeCompany = company
      this.activeRoleIndex = 0
      this.showAllMobileTasks = false
    },

    setActiveRole(index) {
      this.activeRoleIndex = index
      this.showAllMobileTasks = false
    },

    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768
    }
  },

  mounted() {
    this.activeCompany = this.companies[0] || ""
    this.checkIfMobile()
    window.addEventListener("resize", this.checkIfMobile)
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.checkIfMobile)
  }
}
</script>

<style scoped>
.experience-section {
  margin: 3rem 0;
}

.section-header {
  text-align: left;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 0.5rem;
  background: black;
  text-align: left;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.experience-shell {
  border-radius: 22px;
  padding: 0;
}

/* Same style and placement as Quick Links */
.swipe-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  padding: 0 0.5rem;
  animation: pulseHint 2s infinite;
}

@keyframes pulseHint {
  0%,
  100% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }
}

/* Company selector */
.timeline-strip {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.75rem 0.5rem 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.timeline-strip::-webkit-scrollbar {
  display: none;
}

.timeline-item {
  min-width: 190px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 0.8rem;
  cursor: pointer;
  text-align: left;
  background: transparent;
  transition: all 0.25s ease;
}

.timeline-item:hover,
.timeline-item.active {
  border-color: rgba(102, 126, 234, 0.55);
  box-shadow: 0 10px 22px rgba(102, 126, 234, 0.12);
  transform: translateY(-2px);
}

.timeline-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #cbd5e0;
  flex-shrink: 0;
  position: relative;
}

.timeline-item.active .timeline-dot {
  background: #667eea;
  box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.12);
}

.timeline-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.timeline-info strong {
  color: #2d3748;
  font-size: 0.85rem;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timeline-info small {
  color: #718096;
  font-size: 0.74rem;
  font-weight: 700;
}

/* Role tabs */
.company-role-tabs {
  display: flex;
  gap: 0.65rem;
  overflow-x: auto;
  padding: 0.25rem 0.5rem 1rem;
  margin-bottom: 0.2rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.company-role-tabs::-webkit-scrollbar {
  display: none;
}

.role-tab {
  flex: 0 0 auto;
  border: 1px solid rgba(102, 126, 234, 0.18);
  border-radius: 999px;
  padding: 0.55rem 0.85rem;
  background: #ffffff;
  color: #4a5568;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.22s ease;
}

.role-tab:hover,
.role-tab.active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.08);
  border-color: rgba(102, 126, 234, 0.45);
  box-shadow: 0 8px 18px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

/* Main active card */
.experience-feature-card {
  border: 1px solid rgba(102, 126, 234, 0.18);
  border-radius: 20px;
  padding: 1.35rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.experience-card-top {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.experience-badge {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.14),
    rgba(118, 75, 162, 0.14)
  );
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.experience-badge i {
  font-size: 1.2rem;
}

.experience-heading {
  flex: 1;
  min-width: 0;
}

.experience-count {
  display: inline-flex;
  margin-bottom: 0.35rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.12);
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 800;
}

.experience-heading h3 {
  color: #2d3748;
  font-size: 1.18rem;
  font-weight: 850;
  line-height: 1.25;
  margin-bottom: 0.25rem;
}

.experience-heading p {
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 800;
}

.experience-date {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  font-size: 0.76rem;
  font-weight: 800;
  white-space: nowrap;
}

.experience-description {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.65;
  margin-bottom: 1rem;
}

.experience-task-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.task-pill {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.72rem 0.78rem;
  border-radius: 13px;
  background: #f8fafc;
  border: 1px solid #edf2f7;
}

.task-pill i {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(56, 161, 105, 0.12);
  color: #38a169;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.62rem;
  flex-shrink: 0;
  margin-top: 0.02rem;
}

.task-pill span {
  color: #4a5568;
  font-size: 0.83rem;
  line-height: 1.35;
}

.mobile-show-more-btn {
  display: none;
}

/* Desktop */
@media (min-width: 769px) {
  .experience-section {
    margin: 4rem 0;
  }

  .experience-shell {
    padding: 0;
  }

  .swipe-hint {
    display: none;
  }

  .timeline-strip {
    padding: 0.75rem 0 1rem;
  }

  .company-role-tabs {
    padding: 0.25rem 0 1rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .experience-section {
    margin: 2.5rem 0;
  }

  .section-header {
    margin-bottom: 0.5rem;
  }

  .section-title {
    font-size: 1.45rem;
  }

  .experience-shell {
    padding: 0;
    border-radius: 18px;
  }

  .timeline-strip {
    gap: 0.55rem;
    padding: 0.75rem 0.5rem 0.8rem;
  }

  .timeline-item {
    min-width: 145px;
    padding: 0.65rem;
    border-radius: 13px;
  }

  .timeline-info strong {
    font-size: 0.76rem;
  }

  .timeline-info small {
    font-size: 0.68rem;
  }

  .company-role-tabs {
    gap: 0.5rem;
    padding: 0.1rem 0.5rem 0.85rem;
  }

  .role-tab {
    padding: 0.48rem 0.75rem;
    font-size: 0.72rem;
  }

  .experience-feature-card {
    padding: 1rem;
    border-radius: 17px;
  }

  .experience-card-top {
    gap: 0.75rem;
    margin-bottom: 0.85rem;
  }

  .experience-badge {
    width: 42px;
    height: 42px;
    border-radius: 13px;
  }

  .experience-heading h3 {
    font-size: 0.96rem;
  }

  .experience-heading p {
    font-size: 0.82rem;
  }

  .experience-count {
    font-size: 0.66rem;
    padding: 0.22rem 0.52rem;
  }

  .experience-date {
    padding: 0.28rem 0.55rem;
    font-size: 0.68rem;
  }

  .experience-description {
    font-size: 0.82rem;
    line-height: 1.55;
    margin-bottom: 0.85rem;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .experience-task-grid {
    grid-template-columns: 1fr;
    gap: 0.52rem;
  }

  .task-pill {
    padding: 0.62rem 0.68rem;
  }

  .task-pill span {
    font-size: 0.79rem;
  }

  .mobile-show-more-btn {
    width: 100%;
    margin-top: 0.75rem;
    padding: 0.68rem 0.85rem;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: #ffffff;
    color: #667eea;
    font-size: 0.8rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
  }

  .mobile-show-more-btn i {
    font-size: 0.68rem;
  }
}

@media (max-width: 430px) {
  .experience-card-top {
    display: grid;
    grid-template-columns: 42px 1fr auto;
    align-items: flex-start;
  }

  .experience-badge {
    grid-column: 1;
  }

  .experience-heading {
    grid-column: 2;
  }

  .experience-date {
    grid-column: 3;
  }
}

/* Dark Mode */
html[data-theme="dark"] .experience-feature-card,
html[data-theme="dark"] .timeline-item,
html[data-theme="dark"] .role-tab {
  background: #111111;
  border-color: #242424;
  box-shadow: none;
}

html[data-theme="dark"] .section-title,
html[data-theme="dark"] .experience-heading h3,
html[data-theme="dark"] .timeline-info strong {
  color: #f8fafc;
  -webkit-text-fill-color: #f8fafc;
}

html[data-theme="dark"] .swipe-hint {
  color: #94a3b8;
}

html[data-theme="dark"] .experience-description,
html[data-theme="dark"] .task-pill span,
html[data-theme="dark"] .timeline-info small {
  color: #cbd5e0;
}

html[data-theme="dark"] .experience-heading p {
  color: #8ea2ff;
}

html[data-theme="dark"] .experience-date,
html[data-theme="dark"] .task-pill,
html[data-theme="dark"] .mobile-show-more-btn {
  background: #171717;
  border-color: #292929;
  color: #e2e8f0;
}

html[data-theme="dark"] .mobile-show-more-btn {
  color: #8ea2ff;
}

html[data-theme="dark"] .timeline-item.active {
  border-color: rgba(142, 162, 255, 0.55);
}

html[data-theme="dark"] .role-tab.active,
html[data-theme="dark"] .role-tab:hover {
  background: rgba(142, 162, 255, 0.12);
  border-color: rgba(142, 162, 255, 0.55);
  color: #8ea2ff;
}
</style>