<template>
  <main class="now-page">
    <section class="now-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="now-hero">
        <span class="eyebrow">Currently</span>

        <h1>What I’m focused on now</h1>

        <p>
          A quick snapshot of what I’m building, learning, and improving as a
          frontend-focused web developer.
        </p>
      </div>

      <div class="status-grid">
        <article class="status-card featured">
          <div class="card-icon">
            <i class="fas fa-code"></i>
          </div>

          <div>
            <span class="card-label">Current Focus</span>
            <h2>Building better web experiences</h2>
            <p>
              I’m improving my Vue, Firebase, UI design, and automation skills
              while refining my portfolio and real-world project workflows.
            </p>
          </div>
        </article>

        <article class="status-card">
          <div class="card-icon green">
            <i class="fas fa-briefcase"></i>
          </div>

          <div>
            <span class="card-label">Availability</span>
            <h2>Open for work</h2>
            <p>
              Available for frontend tasks, portfolio websites, responsive UI
              improvements, and small automation projects.
            </p>
          </div>
        </article>

        <article class="status-card">
          <div class="card-icon blue">
            <i class="fas fa-layer-group"></i>
          </div>

          <div>
            <span class="card-label">Learning</span>
            <h2>Vue, Firebase, and n8n</h2>
            <p>
              I’m focusing on modern frontend development, Firestore-based
              dashboards, and workflow automation using n8n.
            </p>
          </div>
        </article>
      </div>

      <section class="timeline-panel">
        <div class="section-heading">
          <span class="eyebrow">Updates</span>
          <h2>Recent progress</h2>
        </div>

        <div class="timeline-list">
          <div
            v-for="item in updates"
            :key="item.title"
            class="timeline-item"
          >
            <span class="timeline-dot"></span>

            <div>
              <small>{{ item.date }}</small>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="tools-panel">
        <div class="section-heading">
          <span class="eyebrow">Stack</span>
          <h2>Tools I’m using</h2>
        </div>

        <div class="tools-grid">
          <span v-for="tool in tools" :key="tool">
            {{ tool }}
          </span>
        </div>
      </section>

      <section class="cta-card">
        <div>
          <span class="eyebrow">Contact</span>
          <h2>Need a clean and responsive website?</h2>
          <p>
            I’m open to frontend work, portfolio improvements, Firebase
            integration, and small web automation projects.
          </p>
        </div>

        <a href="mailto:reymelrey.mislang@gmail.com" class="cta-btn">
          Email Me
        </a>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  name: "NowPage",

  data() {
    return {
      updates: [
        {
          date: "2026",
          title: "Portfolio admin dashboard",
          description:
            "Built a private Firestore admin panel for visitor logs, feedback, analytics, and dashboard graphs."
        },
        {
          date: "2026",
          title: "Visitor tracking and ad blocker detection",
          description:
            "Added basic visitor analytics, device information, ISP lookup, and ad blocker status tracking."
        },
        {
          date: "2026",
          title: "Portfolio polish",
          description:
            "Improved responsive sections, floating buttons, theme behavior, live stats, and overall UI consistency."
        }
      ],

      tools: [
        "Vue.js",
        "JavaScript",
        "Firebase",
        "Firestore",
        "Google Auth",
        "HTML",
        "CSS",
        "GitHub",
        "n8n",
        "VS Code"
      ]
    };
  }
};
</script>

<style scoped>
.now-page {
  min-height: 100vh;
  padding: 34px 18px;
  color: var(--text, #0f172a);
  background:
    radial-gradient(
      circle at top left,
      color-mix(in srgb, var(--accent, #22c55e) 18%, transparent),
      transparent 34%
    ),
    var(--bg, #f8fafc);
}

.now-shell {
  width: min(1080px, 100%);
  margin: 0 auto;
}

.back-link {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--text, #0f172a);
  text-decoration: none;
  background: color-mix(in srgb, var(--surface, #ffffff) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--border, #e2e8f0) 86%, transparent);
  font-size: 0.86rem;
  font-weight: 800;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.back-link:hover {
  transform: translateY(-1px);
  color: var(--accent, #22c55e);
  background: color-mix(in srgb, var(--surface-hover, #f1f5f9) 82%, transparent);
  border-color: color-mix(in srgb, var(--accent, #22c55e) 32%, var(--border, #e2e8f0));
}

.now-hero {
  margin-bottom: 22px;
  padding: clamp(24px, 5vw, 42px);
  border-radius: 30px;
  background: color-mix(in srgb, var(--surface, #ffffff) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--border, #e2e8f0) 86%, transparent);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(16px);
}

.eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  color: var(--accent, #16a34a);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.now-hero h1 {
  max-width: 720px;
  margin: 0;
  color: var(--text, #020617);
  font-size: clamp(2.2rem, 7vw, 4.6rem);
  line-height: 0.95;
  letter-spacing: -0.07em;
}

.now-hero p {
  max-width: 650px;
  margin: 18px 0 0;
  color: var(--text-secondary, #475569);
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.7;
}

.status-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 18px;
}

.status-card,
.timeline-panel,
.tools-panel,
.cta-card {
  border-radius: 26px;
  background: color-mix(in srgb, var(--surface, #ffffff) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--border, #e2e8f0) 84%, transparent);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
}

.status-card {
  display: flex;
  gap: 14px;
  padding: 20px;
}

.status-card.featured {
  background:
    radial-gradient(
      circle at top left,
      color-mix(in srgb, var(--accent, #22c55e) 16%, transparent),
      transparent 40%
    ),
    color-mix(in srgb, var(--surface, #ffffff) 86%, transparent);
}

.card-icon {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: grid;
  place-items: center;
  border-radius: 17px;
  color: #052e16;
  background: #86efac;
}

.card-icon.green {
  color: #065f46;
  background: #bbf7d0;
}

.card-icon.blue {
  color: #1e3a8a;
  background: #bfdbfe;
}

.card-label {
  display: block;
  margin-bottom: 7px;
  color: var(--text-muted, #94a3b8);
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.status-card h2,
.timeline-panel h2,
.tools-panel h2,
.cta-card h2 {
  margin: 0;
  color: var(--text, #020617);
  letter-spacing: -0.04em;
}

.status-card h2 {
  font-size: 1.15rem;
}

.status-card p,
.timeline-item p,
.cta-card p {
  margin: 8px 0 0;
  color: var(--text-secondary, #475569);
  font-size: 0.9rem;
  line-height: 1.6;
}

.timeline-panel,
.tools-panel,
.cta-card {
  padding: 22px;
  margin-bottom: 18px;
}

.section-heading {
  margin-bottom: 16px;
}

.timeline-list {
  display: grid;
  gap: 14px;
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 12px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  margin-top: 6px;
  border-radius: 999px;
  background: var(--accent, #22c55e);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent, #22c55e) 16%, transparent);
}

.timeline-item small {
  color: var(--accent, #16a34a);
  font-weight: 900;
}

.timeline-item h3 {
  margin: 3px 0 0;
  color: var(--text, #020617);
  font-size: 1rem;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tools-grid span {
  padding: 9px 12px;
  border-radius: 999px;
  color: color-mix(in srgb, var(--accent, #22c55e) 72%, var(--text, #0f172a));
  background: color-mix(in srgb, var(--accent, #22c55e) 13%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent, #22c55e) 18%, transparent);
  font-size: 0.84rem;
  font-weight: 800;
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.cta-card p {
  max-width: 650px;
}

.cta-btn {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 999px;
  color: #052e16;
  background: #86efac;
  text-decoration: none;
  font-weight: 900;
  box-shadow: 0 14px 28px color-mix(in srgb, var(--accent, #22c55e) 20%, transparent);
  transition:
    transform 0.2s ease,
    filter 0.2s ease;
}

.cta-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
}

/* Better dark theme card contrast */
html[data-theme="midnight"] .status-card,
html[data-theme="midnight"] .timeline-panel,
html[data-theme="midnight"] .tools-panel,
html[data-theme="midnight"] .cta-card,
html[data-theme="forest"] .status-card,
html[data-theme="forest"] .timeline-panel,
html[data-theme="forest"] .tools-panel,
html[data-theme="forest"] .cta-card,
html[data-theme="dark"] .status-card,
html[data-theme="dark"] .timeline-panel,
html[data-theme="dark"] .tools-panel,
html[data-theme="dark"] .cta-card {
  background: color-mix(in srgb, var(--surface, #0f172a) 78%, transparent);
  border-color: color-mix(in srgb, var(--border, #334155) 88%, transparent);
}

html[data-theme="midnight"] .now-hero,
html[data-theme="forest"] .now-hero,
html[data-theme="dark"] .now-hero {
  background: color-mix(in srgb, var(--surface-soft, #111827) 78%, transparent);
  border-color: color-mix(in srgb, var(--border, #334155) 88%, transparent);
}

@media (max-width: 900px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 560px) {
  .now-page {
    padding: 18px 12px;
  }

  .now-hero {
    padding: 24px;
    border-radius: 24px;
  }

  .now-hero h1 {
    font-size: 2.3rem;
  }

  .status-card,
  .timeline-panel,
  .tools-panel,
  .cta-card {
    border-radius: 22px;
  }

  .status-card {
    flex-direction: column;
  }

  .cta-btn {
    width: 100%;
  }
}
</style>