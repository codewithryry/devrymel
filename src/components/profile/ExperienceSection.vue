<template>
  <section id="experience" class="experience-section">
    <div v-if="showTitle" class="section-header" :class="{ 'has-link': viewAllTo }">
      <div>
        <span class="section-kicker">Professional Background</span>
        <h2 class="section-title">Experience</h2>
      </div>

      <router-link v-if="viewAllTo" :to="viewAllTo" class="view-all-link">
        {{ viewAllLabel }}
      </router-link>
    </div>

    <!-- One panel: the company strip on top controls the role shown below -->
    <div v-if="experiences.length" class="experience-shell">
      <div class="exp-tabs" role="tablist" aria-label="Choose an experience">
        <button
          v-for="company in companies"
          :key="company"
          type="button"
          role="tab"
          class="exp-tab"
          :class="{ active: activeCompany === company }"
          :aria-selected="activeCompany === company"
          @click="setActiveCompany(company)"
        >
          {{ company }}
        </button>
      </div>

      <article class="exp-card" role="tabpanel">
        <!-- Several roles at the same company -->
        <div v-if="companyExperiences.length > 1" class="exp-roles">
          <button
            v-for="(item, index) in companyExperiences"
            :key="`${item.role}-${index}`"
            type="button"
            class="exp-role"
            :class="{ active: activeRoleIndex === index }"
            @click="setActiveRole(index)"
          >
            {{ item.role }}
          </button>
        </div>

        <header class="experience-heading">
          <h3>{{ activeExperience.role }}</h3>
          <p class="experience-meta">
            <span>{{ activeExperience.company }}</span>
            <span v-if="activeExperience.date" class="experience-date">{{ activeExperience.date }}</span>
          </p>
        </header>

        <p class="experience-description" :class="{ clamped: !isExpanded }">
          {{ activeExperience.description }}
        </p>

        <div v-if="displayedTasks.length" class="experience-highlights">
          <span class="highlights-label">Key Highlights</span>
          <ul>
            <li v-for="(task, index) in displayedTasks" :key="index">
              <i class="fas fa-check" aria-hidden="true"></i>
              <span>{{ task }}</span>
            </li>
          </ul>
        </div>

        <!-- Footer row of the card, not a separate button -->
        <button
          v-if="hasMoreContent"
          type="button"
          class="exp-more"
          :aria-expanded="isExpanded"
          @click="isExpanded = !isExpanded"
        >
          <span>{{ isExpanded ? "Show less" : moreLabel }}</span>
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
    showTitle: {
      type: Boolean,
      default: true
    },
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

    moreLabel() {
      const hidden = (this.activeExperience.tasks || []).length - this.collapsedTaskLimit
      return hidden > 0 ? `Show all highlights (+${hidden})` : "Read more"
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

/* ===== Panel: company strip + card share one frame ===== */
.experience-shell {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

/* Company strip: tabs with an underline on the active one */
.exp-tabs {
  display: flex;
  gap: 0.25rem;
  padding: 0 0.75rem;
  overflow-x: auto;
  border-bottom: 1px solid var(--border);
  background: var(--surface-soft);
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.exp-tabs::-webkit-scrollbar {
  display: none;
}

.exp-tab {
  position: relative;
  flex: 0 0 auto;
  padding: 0.85rem 0.85rem;
  border: none;
  background: none;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;
}

.exp-tab::after {
  content: "";
  position: absolute;
  left: 0.85rem;
  right: 0.85rem;
  bottom: -1px;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: transparent;
  transition: background 0.2s ease;
}

.exp-tab:hover {
  color: var(--text-secondary);
}

.exp-tab.active {
  color: var(--text);
  font-weight: 700;
}

.exp-tab.active::after {
  background: var(--text);
}

/* Role chips (only when a company has more than one role) */
.exp-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.exp-role {
  flex: 0 0 auto;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.74rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.exp-role:hover {
  color: var(--text-secondary);
}

.exp-role.active {
  border-color: var(--text);
  background: var(--text);
  color: var(--bg);
}

/* ===== Card ===== */
.exp-card {
  padding: 1.6rem 1.75rem 0;
}

/* Role is the strongest element; company + year are secondary */
.experience-heading h3 {
  margin: 0 0 0.35rem;
  color: var(--text);
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.experience-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.6rem;
  margin: 0 0 1.1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.experience-date {
  padding: 0.12rem 0.55rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
  font-size: 0.74rem;
  font-weight: 600;
  white-space: nowrap;
}

.experience-description {
  max-width: 68ch;
  margin: 0 0 1.35rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  word-break: break-word;
}

.experience-description.clamped {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Highlights: check list, two columns on wide screens */
.experience-highlights {
  padding-bottom: 1.25rem;
}

.highlights-label {
  display: block;
  margin-bottom: 0.75rem;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.experience-highlights ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.experience-highlights li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  color: var(--text-secondary);
  font-size: 0.87rem;
  line-height: 1.5;
}

.experience-highlights li i {
  flex-shrink: 0;
  margin-top: 0.3rem;
  color: var(--text-muted);
  font-size: 0.62rem;
}

/* "Show all" is the card's footer row */
.exp-more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% + 3.5rem);
  margin: 0 -1.75rem;
  padding: 0.85rem 1.75rem;
  border: none;
  border-top: 1px solid var(--border);
  background: none;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.exp-more:hover {
  background: var(--surface-soft);
  color: var(--text);
}

.exp-more i {
  font-size: 0.7rem;
}

/* Last bit of padding when there's no footer row */
.exp-card > :last-child:not(.exp-more) {
  margin-bottom: 1.6rem;
}

/* Desktop */
@media (min-width: 769px) {
  .experience-section {
    margin: 2.5rem 0 3.5rem;
  }
}

/* ===== Mobile ===== */
@media (max-width: 768px) {
  .experience-section {
    margin: 1.75rem 0 2.5rem;
  }

  .section-title {
    font-size: 1.45rem;
    margin-bottom: 1rem;
  }

  /* Strip scrolls sideways; edges fade so it's clear there's more */
  .exp-tabs {
    padding: 0 0.35rem;
    -webkit-mask-image: linear-gradient(90deg, #000 90%, transparent);
    mask-image: linear-gradient(90deg, #000 90%, transparent);
  }

  .exp-tab {
    padding: 0.75rem 0.7rem;
    font-size: 0.8rem;
  }

  .exp-tab::after {
    left: 0.7rem;
    right: 0.7rem;
  }

  .exp-card {
    padding: 1.15rem 1.1rem 0;
  }

  .experience-heading h3 {
    font-size: 1.15rem;
  }

  .experience-meta {
    margin-bottom: 0.85rem;
    font-size: 0.84rem;
  }

  .experience-description {
    margin-bottom: 1.1rem;
    font-size: 0.9rem;
    line-height: 1.65;
  }

  .experience-description.clamped {
    -webkit-line-clamp: 3;
  }

  .experience-highlights ul {
    grid-template-columns: 1fr;
    gap: 0.55rem;
  }

  .experience-highlights li {
    font-size: 0.85rem;
  }

  .exp-more {
    width: calc(100% + 2.2rem);
    margin: 0 -1.1rem;
    padding: 0.8rem 1.1rem;
  }

  .exp-card > :last-child:not(.exp-more) {
    margin-bottom: 1.15rem;
  }
}
</style>
