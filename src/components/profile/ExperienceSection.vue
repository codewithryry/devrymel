<template>
  <section id="experience" class="experience-section">
    <div class="section-header" :class="{ 'has-link': viewAllTo }">
      <div>
        <span class="section-kicker">Professional Background</span>
        <h2 class="section-title">Experience</h2>
      </div>

      <router-link v-if="viewAllTo" :to="viewAllTo" class="view-all-link">
        {{ viewAllLabel }}
      </router-link>
    </div>

    <div v-if="experiences.length" class="experience-shell">
      <!-- Company selector -->
      <div class="company-tabs">
        <button
          v-for="company in companies"
          :key="company"
          type="button"
          class="company-tab"
          :class="{ active: activeCompany === company }"
          @click="setActiveCompany(company)"
        >
          {{ company }}
        </button>
      </div>

      <!-- Role selector -->
      <div v-if="companyExperiences.length > 1" class="role-tabs">
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

      <!-- Experience card -->
      <article class="experience-card">
        <div class="experience-top">
          <div class="experience-heading">
            <h3>{{ activeExperience.role }}</h3>
            <p>{{ activeExperience.company }}</p>
          </div>
          <span class="experience-date">{{ activeExperience.date }}</span>
        </div>

        <p class="experience-description" :class="{ clamped: !isExpanded }">
          {{ activeExperience.description }}
        </p>

        <div class="experience-highlights">
          <span class="highlights-label">Key Highlights</span>
          <ul>
            <li v-for="(task, index) in displayedTasks" :key="index">
              {{ task }}
            </li>
          </ul>
        </div>

        <button
          v-if="hasMoreContent"
          type="button"
          class="see-more-btn"
          @click="isExpanded = !isExpanded"
        >
          <span>{{ isExpanded ? "See less" : "See more" }}</span>
          <i class="fas" :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: "ExperienceSection",

  props: {
    viewAllTo: {
      type: String,
      default: ""
    },
    viewAllLabel: {
      type: String,
      default: "View all.."
    },
    experiences: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeCompany: "",
      activeRoleIndex: 0,
      isExpanded: false,
      collapsedTaskLimit: 3
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

    hasMoreContent() {
      const tasks = this.activeExperience.tasks || []
      const description = this.activeExperience.description || ""
      return tasks.length > this.collapsedTaskLimit || description.length > 160
    },

    displayedTasks() {
      const tasks = this.activeExperience.tasks || []

      if (this.isExpanded) {
        return tasks
      }

      return tasks.slice(0, this.collapsedTaskLimit)
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
      this.isExpanded = false
    },

    setActiveRole(index) {
      this.activeRoleIndex = index
      this.isExpanded = false
    }
  },

  mounted() {
    this.activeCompany = this.companies[0] || ""
  }
}
</script>

<style scoped>
.section-header.has-link {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.view-all-link {
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: var(--text);
}

.experience-section {
  margin: 0;
}

.section-header {
  margin-bottom: 1.25rem;
}

.section-kicker {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  text-align: left;
}

/* Company selector */
.company-tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 0.75rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.company-tabs::-webkit-scrollbar {
  display: none;
}

.company-tab {
  flex: 0 0 auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.6rem 1rem;
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.company-tab:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.company-tab.active {
  color: var(--text);
  border-color: var(--text);
  font-weight: 700;
}

/* Role selector */
.role-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.role-tab {
  flex: 0 0 auto;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.4rem 0.75rem;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.role-tab:hover,
.role-tab.active {
  color: var(--text-secondary);
  border-color: var(--text-muted);
}

/* Experience card */
.experience-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.experience-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.experience-heading h3 {
  color: var(--text);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 0.2rem;
}

.experience-heading p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
}

.experience-date {
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.experience-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 1.1rem;
  word-break: break-word;
}

.experience-description.clamped {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.experience-highlights {
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.highlights-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.6rem;
}

.experience-highlights ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.experience-highlights li {
  position: relative;
  padding-left: 1rem;
  color: var(--text-secondary);
  font-size: 0.87rem;
  line-height: 1.5;
}

.experience-highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-muted);
}

.see-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  margin-top: 1.1rem;
  padding: 0;
  border: none;
  background: none;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.see-more-btn:hover {
  color: var(--text-secondary);
}

.see-more-btn i {
  font-size: 0.65rem;
}

/* Desktop */
@media (min-width: 769px) {
  .experience-section {
    margin: 4rem 0;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .experience-section {
    margin: 2.5rem 0;
  }

  .section-title {
    font-size: 1.45rem;
    margin-bottom: 1rem;
  }

  .company-tab {
    padding: 0.55rem 0.85rem;
    font-size: 0.8rem;
  }

  .experience-card {
    padding: 1.1rem;
  }

  .experience-top {
    flex-direction: column;
    gap: 0.3rem;
  }

  .experience-heading h3 {
    font-size: 1.05rem;
  }

  .experience-description.clamped {
    -webkit-line-clamp: 2;
  }
}
</style>
