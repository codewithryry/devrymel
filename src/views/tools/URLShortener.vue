<template>
  <div class="tool-page">
    <div class="tool-shell">

      <!-- Back -->
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <!-- Header -->
      <div class="tool-hero">
        <div class="tt-icon-wrap">
          <i class="fas fa-compress-alt"></i>
        </div>
        <h1 class="tt-title">URL Shortener</h1>
        <p class="tt-subtitle">Shorten any link instantly — no signup required.</p>
        <span class="coming-soon-badge">
          <i class="fas fa-clock"></i>
          Coming Soon
        </span>
      </div>

      <!-- Description card -->
      <div class="cs-desc-card">
        <div class="cs-desc-icon">
          <i class="fas fa-wrench"></i>
        </div>
        <div class="cs-desc-body">
          <h2>Under Construction</h2>
          <p>We're working on this tool. It will let you shorten any URL to a clean, shareable link. Check back soon.</p>
        </div>
      </div>

      <!-- GitHub card -->
      <div class="cs-notify-card">
        <div class="cs-notify-left">
          <div class="cs-notify-icon">
            <i class="fab fa-github"></i>
          </div>
          <div>
            <strong>Follow updates on GitHub</strong>
            <p>Star the repo to get notified when new tools go live.</p>
          </div>
        </div>
        <a
          href="https://github.com/codewithryry"
          target="_blank"
          rel="noopener noreferrer"
          class="cs-github-btn"
        >
          <i class="fab fa-github"></i>
          View on GitHub
        </a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "URLShortener"
};
</script>

<style scoped>
/* Page wrapper */
.tool-page {
  min-height: 100vh;
  padding: 34px 18px;
  color: var(--text);
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 18%, transparent), transparent 34%),
    var(--bg);
}

/* Shell container */
.tool-shell {
  width: min(760px, 100%);
  margin: 0 auto;
}

/* Back button */
.back-link {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--text);
  text-decoration: none;
  background: color-mix(in srgb, var(--surface) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  font-size: 0.86rem;
  font-weight: 800;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.back-link:hover {
  transform: translateY(-1px);
  color: var(--accent);
  background: color-mix(in srgb, var(--surface-hover) 82%, transparent);
  border-color: color-mix(in srgb, var(--accent) 32%, var(--border));
}

/* Header card */
.tool-hero {
  margin-bottom: 22px;
  padding: clamp(20px, 4vw, 36px);
  border-radius: 26px;
  background: color-mix(in srgb, var(--surface) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.tt-icon-wrap {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  font-size: 1.6rem;
  box-shadow: 0 12px 32px rgba(245, 158, 11, 0.35);
}

.tt-title {
  margin: 0;
  color: var(--text);
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.tt-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.5;
}

/* Coming soon badge */
.coming-soon-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 999px;
  background: color-mix(in srgb, #f59e0b 14%, transparent);
  border: 1.5px solid color-mix(in srgb, #f59e0b 30%, transparent);
  color: #d97706;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 4px;
}

/* Description card */
.cs-desc-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: 22px;
  background: color-mix(in srgb, var(--surface) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.07);
  margin-bottom: 16px;
}

.cs-desc-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: color-mix(in srgb, #f59e0b 14%, transparent);
  color: #d97706;
  font-size: 1.1rem;
}

.cs-desc-body h2 {
  margin: 0 0 8px;
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.cs-desc-body p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
}

/* GitHub notify card */
.cs-notify-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 22px;
  background: color-mix(in srgb, var(--surface) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.07);
  flex-wrap: wrap;
}

.cs-notify-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.cs-notify-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: color-mix(in srgb, var(--text) 10%, transparent);
  color: var(--text);
  font-size: 1.2rem;
}

.cs-notify-left strong {
  display: block;
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 900;
  margin-bottom: 3px;
}

.cs-notify-left p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.5;
}

.cs-github-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 14px;
  background: var(--text);
  color: var(--bg);
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 800;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.cs-github-btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

@media (max-width: 480px) {
  .cs-desc-card {
    flex-direction: column;
  }
  .cs-notify-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .cs-github-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
