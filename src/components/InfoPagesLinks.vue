<template>
  <section class="info-links-section">
    <div class="section-header">
      <span class="section-eyebrow">Explore More</span>
      <h2 class="section-title">More About My Work</h2>
      <p class="section-description">
        Quick links to my current focus, services, case studies, roadmap, changelog, and privacy notice.
      </p>
    </div>

    <div class="info-links-grid">
      <router-link
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
        class="info-link-card"
      >
        <div class="info-link-icon">
          <i :class="page.icon"></i>
        </div>

        <div class="info-link-content">
          <h3>{{ page.title }}</h3>
          <p>{{ page.description }}</p>
        </div>

        <span class="info-link-arrow">
          <i class="fas fa-arrow-right"></i>
        </span>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "InfoPagesLinks",

  data() {
    return {
      pages: [
        {
          path: "/now",
          icon: "fas fa-bolt",
          title: "Now",
          description: "See what I’m currently focused on."
        },
        {
          path: "/uses",
          icon: "fas fa-tools",
          title: "Uses",
          description: "Tools, stack, and setup I use."
        },
        {
          path: "/services",
          icon: "fas fa-briefcase",
          title: "Services",
          description: "Web services and development work I offer."
        },
        {
          path: "/case-studies",
          icon: "fas fa-layer-group",
          title: "Case Studies",
          description: "Detailed breakdowns of selected projects."
        },
        {
          path: "/roadmap",
          icon: "fas fa-map-signs",
          title: "Roadmap",
          description: "Planned improvements for this portfolio."
        },
        {
          path: "/changelog",
          icon: "fas fa-clock-rotate-left",
          title: "Changelog",
          description: "Latest updates and feature changes."
        },
        {
          path: "/privacy",
          icon: "fas fa-shield-alt",
          title: "Privacy",
          description: "Visitor data and privacy notice."
        },
        {
          path: "/contact",
          icon: "fas fa-envelope",
          title: "Contact",
          description: "Reach out for work or collaboration."
        },
        {
          path: "/sponsor",
          icon: "fas fa-heart",
          title: "Sponsor",
          description: "Support the platform and keep it free."
        }
      ]
    };
  }
};
</script>

<style scoped>
.info-links-section {
  width: min(1180px, calc(100% - 32px));
  margin: 42px auto;
  padding: 28px;
  border-radius: 28px;
  background: var(--card-bg, rgba(255, 255, 255, 0.86));
  border: 1px solid var(--border-color, rgba(15, 23, 42, 0.08));
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08);
}

.section-header {
  max-width: 720px;
  margin-bottom: 22px;
}

.section-eyebrow {
  display: inline-block;
  margin-bottom: 8px;
  color: var(--accent-color, #16a34a);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  color: var(--text-primary, #020617);
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  line-height: 1;
  letter-spacing: -0.055em;
}

.section-description {
  margin: 12px 0 0;
  color: var(--text-secondary, #64748b);
  font-size: 0.96rem;
  line-height: 1.65;
}

.info-links-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.info-link-card {
  min-width: 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 16px;
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  background: var(--section-bg, rgba(248, 250, 252, 0.78));
  border: 1px solid var(--border-color, rgba(15, 23, 42, 0.08));
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.info-link-card:hover {
  transform: translateY(-3px);
  border-color: rgba(34, 197, 94, 0.28);
  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.1);
}

.info-link-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 15px;
  color: #052e16;
  background: #86efac;
}

.info-link-content {
  min-width: 0;
  padding-right: 22px;
}

.info-link-content h3 {
  margin: 0;
  color: var(--text-primary, #020617);
  font-size: 0.96rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.info-link-content p {
  margin: 6px 0 0;
  color: var(--text-secondary, #64748b);
  font-size: 0.78rem;
  line-height: 1.45;
}

.info-link-arrow {
  position: absolute;
  top: 16px;
  right: 16px;
  color: var(--accent-color, #16a34a);
  font-size: 0.78rem;
  opacity: 0.75;
}

@media (max-width: 1024px) {
  .info-links-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .info-links-section {
    width: calc(100% - 24px);
    margin: 30px auto;
    padding: 20px;
    border-radius: 24px;
  }

  .info-links-grid {
    grid-template-columns: 1fr;
  }

  .info-link-card {
    padding: 14px;
    border-radius: 18px;
  }

  .info-link-content h3 {
    font-size: 0.92rem;
  }

  .info-link-content p {
    font-size: 0.74rem;
  }
}
</style>