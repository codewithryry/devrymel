<template>
  <main class="info-page about-page">
    <section class="info-shell">
      <!-- HERO: no photo, story-style -->
      <div class="about-hero">
      <div class="about-hero-text">
        <span class="eyebrow">About Me</span>
        <h1><span class="title-full">I turn ideas into systems people actually use.</span><span class="title-short">Ideas into real systems.</span></h1>
        <p class="about-lead">
          I'm Reymel Mislang, a frontend developer from the Philippines. I work with
          modern web tech, AI-assisted workflows, and n8n automation — building everything
          from portfolio sites and PWAs to small business systems and affiliate platforms.
        </p>
        <div class="about-actions">
          <router-link to="/services" class="ghost-btn">View Services</router-link>
          <a href="/Reymel_Mislang_CV.pdf" target="_blank" rel="noopener" class="ghost-btn">View CV</a>
        </div>
      </div>

      <!-- Illustration: idea -> system -> people -->
      <svg class="about-hero-art" viewBox="0 0 280 220" fill="none" aria-hidden="true">
        <!-- idea (lightbulb) -->
        <circle cx="50" cy="60" r="22" stroke="currentColor" stroke-width="2" />
        <path d="M42 86h16M44 93h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <path d="M44 60l6-8 6 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <!-- connectors -->
        <path d="M74 60h36" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" />
        <path d="M200 110v30" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" />
        <!-- system (app window) -->
        <rect x="110" y="20" width="150" height="90" rx="10" stroke="currentColor" stroke-width="2" />
        <path d="M110 40h150" stroke="currentColor" stroke-width="2" />
        <circle cx="122" cy="30" r="3" fill="currentColor" />
        <circle cx="132" cy="30" r="3" fill="currentColor" />
        <circle cx="142" cy="30" r="3" fill="currentColor" />
        <rect x="124" y="52" width="50" height="44" rx="6" stroke="currentColor" stroke-width="2" />
        <path d="M186 56h60M186 70h48M186 84h56" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <!-- people -->
        <circle cx="170" cy="162" r="10" stroke="currentColor" stroke-width="2" />
        <path d="M152 200c0-12 8-20 18-20s18 8 18 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <circle cx="230" cy="162" r="10" stroke="currentColor" stroke-width="2" />
        <path d="M212 200c0-12 8-20 18-20s18 8 18 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      </div>

      <!-- Sponsored Ad -->
      <AdSlot type="banner" show-smartlink />

      <!-- MY STORY -->
      <section class="info-panel">
        <span class="eyebrow">My Story</span>
        <h2>How I got here</h2>
        <div class="story-cols">
          <p>
            I started out curious about how websites work — and that curiosity turned into
            building real projects: freelance sites, affiliate systems, and automation
            workflows that save people time. Along the way I became a Dean's Lister at
            MINSU Calapan while shipping work for real clients.
          </p>
          <MobileMore label="Read more">
          <p>
            Today my edge is speed plus practicality: AI tools and vibe coding for fast
            builds, Vue / React / Firebase for solid frontends, and n8n to connect apps
            and kill repetitive tasks. No bloated systems — just useful, simple solutions
            that create real value.
          </p>
          </MobileMore>
        </div>
      </section>

      <!-- VALUES -->
      <div v-mobile-slides class="info-grid">
        <article class="info-card">
          <div class="icon-box"><i class="fas fa-bolt"></i></div>
          <span class="card-label">Value 01</span>
          <h2>Ship fast, keep it simple</h2>
          <p>
            I prefer working systems over perfect plans. Build, test with real users,
            then refine — instead of over-engineering from day one.
          </p>
        </article>

        <article class="info-card">
          <div class="icon-box"><i class="fas fa-robot"></i></div>
          <span class="card-label">Value 02</span>
          <h2>Automate the boring parts</h2>
          <p>
            If a task repeats, it should be automated. I use n8n and integrations so
            you spend less time on manual work and more on the business.
          </p>
        </article>

        <article class="info-card">
          <div class="icon-box"><i class="fas fa-seedling"></i></div>
          <span class="card-label">Value 03</span>
          <h2>Learn every day</h2>
          <p>
            New tools, better patterns, cleaner UI. I treat every project as a chance
            to level up — so your project benefits from what I just learned.
          </p>
        </article>
      </div>

      <!-- Sponsored Ad -->
      <AdSlot type="wide-box" show-smartlink />

      <!-- HOW I WORK -->
      <section class="info-panel">
        <span class="eyebrow">Process</span>
        <h2>How I work with you</h2>

        <div v-mobile-slides class="steps-grid">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="step-item"
          >
            <span class="step-num">{{ String(i + 1).padStart(2, "0") }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FUN FACTS (different from homepage details) -->
      <section class="info-panel">
        <span class="eyebrow">Beyond Code</span>
        <h2>A few things about me</h2>

        <div class="pill-grid">
          <span v-for="fact in facts" :key="fact">
            {{ fact }}
          </span>
        </div>
      </section>

      <!-- Sponsored Ad -->
      <AdSlot type="banner" show-smartlink />

      <ExploreLinks />
    </section>

  </main>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import MobileMore from "@/components/MobileMore.vue";
import "@/assets/info-pages.css";

export default {
  name: "AboutPage",

  components: {
    AdSlot,
    ExploreLinks,
    MobileMore,
  },

  data() {
    return {
      steps: [
        {
          title: "You tell me the goal",
          description:
            "No jargon needed — just describe what you want: a site, a system, or a task you want automated."
        },
        {
          title: "I propose the simplest build",
          description:
            "You get a clear plan: what I'll build, what tools I'll use, and how long it takes. No bloated scope."
        },
        {
          title: "I build and you review",
          description:
            "I ship a working version fast, you give feedback, and we refine until it's right."
        },
        {
          title: "Launch and support",
          description:
            "I deploy it, make sure it works on real devices, and stay reachable for fixes and improvements."
        }
      ],

      facts: [
        "Dean's Lister at MINSU Calapan",
        "Freelance web projects",
        "Affiliate platforms",
        "n8n workflow automation",
        "PWA builder",
        "Vibe coding enjoyer",
        "Learns something new daily",
        "Based in the Philippines"
      ]
    };
  }
};
</script>

<style scoped>
.about-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.about-hero-art {
  flex-shrink: 0;
  width: 260px;
  height: auto;
  color: var(--text-muted);
}

.about-hero-text h1 {
  max-width: 620px;
  margin: 0;
  color: var(--text);
  font-size: clamp(1.9rem, 4.5vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.12;
}

.about-lead {
  max-width: 600px;
  margin: 0.9rem 0 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;
}

.about-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
}

.story-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.story-cols p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.7;
}

.steps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-top: 1rem;
}

.step-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  padding: 0.9rem;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
}

.step-num {
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.step-item h3 {
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 700;
}

.step-item p {
  margin: 0.3rem 0 0;
  color: var(--text-secondary);
  font-size: 0.86rem;
  line-height: 1.6;
}

.ghost-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.4rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}


.ghost-btn:hover {
  border-color: var(--text-muted);
}

.card-label {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.info-panel h2 {
  font-size: 1.1rem;
}

.info-panel .eyebrow {
  margin-bottom: 0.3rem;
}

@media (max-width: 760px) {
  .about-hero-art {
    display: none;
  }

  .story-cols,
  .steps-grid {
    grid-template-columns: 1fr;
  }

  /* Phones: a little more room above "About Me", balanced headline + buttons */
  .about-hero {
    margin-bottom: 0.5rem;
    padding-top: 0.75rem;
  }

  .about-hero-text .eyebrow {
    margin-bottom: 0.6rem;
  }

  .about-hero-text h1 {
    font-size: clamp(1.7rem, 7.5vw, 2rem);
    line-height: 1.15;
    text-wrap: balance;
  }

  .about-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem;
    margin-top: 1.4rem;
  }

  .story-cols {
    gap: 0.85rem;
  }

  .story-cols p {
    font-size: 0.95rem;
    line-height: 1.75;
    text-wrap: pretty;
  }
}
</style>