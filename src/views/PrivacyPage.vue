<template>
  <main class="info-page">
    <section class="info-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="info-hero">
        <span class="eyebrow">Privacy</span>
        <h1>Privacy and visitor data notice</h1>
        <p>
          This portfolio uses basic analytics to understand site visits,
          improve user experience, and monitor technical performance.
        </p>
      </div>

      <section class="info-panel">
        <span class="eyebrow">Collected Data</span>
        <h2>What the site records</h2>

        <ul class="info-list">
          <li>Visited page path and page URL.</li>
          <li>Browser name, operating system, device type, screen size, and language.</li>
          <li>Approximate network information such as IP lookup result, ISP, country, city, and timezone when available.</li>
          <li>Ad blocker detection status.</li>
          <li>Feedback messages submitted through the public feedback form.</li>
        </ul>
      </section>

      <section class="info-panel">
        <span class="eyebrow">Purpose</span>
        <h2>Why this data is used</h2>

        <ul class="info-list">
          <li>To understand how visitors access the website.</li>
          <li>To improve mobile responsiveness and browser compatibility.</li>
          <li>To monitor feedback and portfolio performance.</li>
          <li>To protect the admin panel and keep private data owner-only.</li>
        </ul>
      </section>

      <section class="info-panel">
        <span class="eyebrow">Storage</span>
        <h2>Where data is stored</h2>
        <p>
          Visitor logs, feedback, and analytics records are stored in Firebase
          Firestore. Admin access is restricted to the site owner through
          Firebase Authentication and Firestore security rules.
        </p>
      </section>

      <section class="cta-card">
        <div>
          <span class="eyebrow">Contact</span>
          <h2>Privacy concern?</h2>
          <p>
            For questions about this portfolio’s data collection or feedback
            records, contact the site owner directly.
          </p>
        </div>

        <a href="mailto:reymelrey.mislang@gmail.com" class="cta-btn">
          Contact Me
        </a>
      </section>
    </section>
  </main>
</template>

<script>
import "@/assets/info-pages.css";

export default {
  name: "PrivacyPage"
};
</script>