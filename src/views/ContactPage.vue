<template>
  <main class="info-page">
    <section class="info-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="info-hero">
        <span class="eyebrow">Contact</span>
        <h1>Let’s build something useful</h1>
        <p>
          Reach out for portfolio websites, frontend work, Firebase integration,
          responsive UI fixes, or small automation projects.
        </p>
      </div>

      <div class="info-grid">
        <article class="info-card">

          <h2>Email</h2>
          <p>Send project details, timeline, and examples of your target design.</p>

          <div class="pill-grid">
            <span>reymelrey.mislang@gmail.com</span>
          </div>
        </article>

        <article class="info-card">
          <h2>LinkedIn</h2>
          <p>Connect with me for professional updates and work opportunities.</p>

          <div class="pill-grid">
            <span>Reymel Mislang</span>
          </div>
        </article>

        <article class="info-card">

          <h2>GitHub</h2>
          <p>View my code, experiments, and public development work.</p>

          <div class="pill-grid">
            <span>codewithryry</span>
          </div>
        </article>
      </div>

      <section class="cta-card">
        <div>
          <span class="eyebrow">Work Inquiry</span>
          <h2>Send a clear project brief</h2>
          <p>
            Include your project type, needed pages, preferred style, deadline,
            and any existing links or files.
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
import "@/assets/info-pages.css";

export default {
  name: "ContactPage"
};
</script>