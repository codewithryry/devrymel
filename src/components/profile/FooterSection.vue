<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->

<template>
  <footer class="header-footer">
    <!-- Desktop-only decoration: grid boxes + code snippets -->
    <div class="footer-deco" aria-hidden="true">
      <span class="deco-code deco-1">&lt;/&gt;</span>
      <span class="deco-code deco-2">{ build: true }</span>
      <span class="deco-code deco-3">const idea = () =&gt; ship();</span>
      <span class="deco-code deco-4">npm run deploy</span>
      <span class="deco-box deco-5"></span>
      <span class="deco-box deco-6"></span>
    </div>

    <div class="header-footer-content">
      <h2 class="footer-name">Let's build something great.</h2>
      <p class="footer-subtitle">
        Whether you're building a product, launching a startup, or improving a system,
        I'd love to collaborate and help bring your vision to life.
      </p>
      <div class="footer-cta">
        <a
          href="mailto:reymelrey.mislang@gmail.com?subject=Project%20Collaboration%20Inquiry"
          class="footer-contact-btn"
        >
          Hire Me
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.header-footer {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-top: 0;
  padding: 8.5rem 1.5rem;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-deco {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: center;
  -webkit-mask-image: radial-gradient(ellipse at center, transparent 30%, #000 75%);
  mask-image: radial-gradient(ellipse at center, transparent 30%, #000 75%);
}

.deco-code {
  position: absolute;
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text-muted);
  font-family: "SF Mono", "Fira Code", Consolas, monospace;
  font-size: 0.78rem;
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
}

.deco-box {
  position: absolute;
  width: 48px;
  height: 48px;
  border: 1px solid var(--text-muted);
  border-radius: var(--radius-sm);
  opacity: 0.35;
}

/* Kept in the empty space above the heading / below the button so nothing covers the text */
.deco-1 { top: 4rem; left: 4%; }
.deco-2 { top: 2.5rem; right: 6%; }
.deco-3 { bottom: 2.5rem; left: 8%; }
.deco-4 { bottom: 4rem; right: 4%; }
.deco-5 { top: 45%; left: 0.5rem; width: 36px; height: 36px; transform: rotate(12deg); }
.deco-6 { top: 52%; right: 0.5rem; width: 36px; height: 36px; transform: rotate(-8deg); }

.header-footer-content {
  position: relative;
  max-width: 980px;
  margin: 0 auto;
}

.footer-name {
  font-size: 3.6rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.footer-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  margin: 0 auto 3rem;
  line-height: 1.6;
  max-width: 600px;
}

.footer-contact-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.95rem 2.2rem;
  background: var(--accent);
  color: var(--bg);
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  transition: opacity 0.2s ease;
}

.footer-contact-btn:hover {
  opacity: 0.85;
}

.footer-cta {
  margin-bottom: 0;
}

.footer-meta {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  text-align: left;
}

.footer-meta-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 120px;
}

.footer-meta-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.footer-meta-link {
  font-size: 0.88rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-meta-link:hover {
  color: var(--text);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.footer-copy {
  margin: 2rem 0 0;
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* Desktop: the CTA fills the screen below the sticky navbar and is the very end
   of the page, so the final scroll position always shows it whole and centered.
   (-4rem cancels .main-content's desktop bottom padding.) */
@media (min-width: 769px) {
  .header-footer {
    min-height: calc(100vh - 84px);
    margin-bottom: -4rem;
    padding: 3rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer-deco {
    display: none;
  }

  /* Flush to the screen edges and bottom (cancels .main-content padding) */
  .header-footer {
    width: auto;
    /* Runs to the very bottom of the screen, under the floating bottom nav
       (cancels .main-content's 3rem + body's ~86px bottom padding) */
    margin: 0 -12px calc(-3rem - 86px - env(safe-area-inset-bottom, 0px));
    padding: 3rem 1.5rem calc(3rem + 96px + env(safe-area-inset-bottom, 0px));
    border-top: none;
    border-radius: 20px 20px 0 0;
    background: var(--accent);
  }

  .footer-name {
    color: var(--bg);
    font-size: clamp(2rem, 9vw, 2.6rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  .footer-subtitle {
    color: color-mix(in srgb, var(--bg) 75%, transparent);
    font-size: 0.98rem;
    margin-bottom: 1.75rem;
  }

  .footer-cta {
    display: flex;
    justify-content: center;
  }

  .footer-contact-btn {
    padding: 0.9rem 1.8rem;
    border-radius: var(--radius-lg);
    background: var(--bg);
    color: var(--text);
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  :root .header-footer {
    margin: 0;
    padding: 2.25rem 1.25rem;
    border-radius: 20px;
  }
}

/* Phones: CTA is the last item inside the main white card.
   The spread shadow (sheet color) fills the card around the dark box,
   and its rounded outer edge closes the card at the bottom. */
@media (max-width: 768px) {
  :root .header-footer {
    margin: -0.6rem 0.75rem 0.75rem;
    /* 1st: card padding around the CTA. 2nd: same color shifted down so the
       white card continues to the bottom of the screen (behind the bottom nav) */
    box-shadow:
      0 0 0 0.75rem var(--surface),
      0 180px 0 0.75rem var(--surface);
  }
}
</style>
