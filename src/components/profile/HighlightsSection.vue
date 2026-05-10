<template>
  <section class="highlights-section">
    <div class="section-header reveal-up">
      <h2 class="section-title">Why Hire Me</h2>

      <!-- Mobile swipe hint - same placement as Quick Links -->
      <div class="swipe-hint">
        <span>Swipe for more..</span>
      </div>
    </div>

    <div class="highlights-grid">
      <article
        v-for="(item, index) in highlights"
        :key="index"
        class="highlight-card reveal-card"
        :class="index % 2 === 0 ? 'from-left' : 'from-right'"
      >
        <div class="highlight-top">
          <div class="highlight-icon">
            <i :class="getIcon(index)"></i>
          </div>

          <span class="highlight-number">
            {{ String(index + 1).padStart(2, "0") }}
          </span>
        </div>

        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: "HighlightsSection",

  props: {
    highlights: {
      type: Array,
      default: () => []
    }
  },

  mounted() {
    this.initRevealAnimation()
  },

  methods: {
    getIcon(index) {
      const icons = [
        "fas fa-laptop-code",
        "fas fa-server",
        "fas fa-search",
        "fas fa-pencil-ruler",
        "fas fa-bolt",
        "fas fa-check-circle"
      ]

      return icons[index] || "fas fa-star"
    },

    initRevealAnimation() {
      const elements = this.$el.querySelectorAll(".reveal-card, .reveal-up")

      if (!elements.length) return

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show")
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.12
        }
      )

      elements.forEach(el => observer.observe(el))
    }
  }
}
</script>

<style scoped>
.highlights-section {
  margin: 4rem 0;
  overflow: hidden;
}

.section-header {
  text-align: left;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: clamp(1.85rem, 4vw, 2.35rem);
  font-weight: 900;
  color: #2d3748;
  margin: 0;
  letter-spacing: -0.04em;
}

.swipe-hint {
  display: none;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.9rem;
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

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
}

.highlight-card {
  position: relative;
  min-height: 230px;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.95);
  overflow: hidden;
  transition:
    opacity 0.75s ease,
    transform 0.75s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease,
    background 0.35s ease;
}

.highlight-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.highlight-card:hover {
  transform: translateY(-7px);
  border-color: rgba(56, 161, 105, 0.55);
}

.highlight-card:hover::before {
  opacity: 1;
}

.highlight-top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.15rem;
}

.highlight-icon {
  width: 48px;
  height: 48px;
  border-radius: 15px;
  background: rgba(56, 161, 105, 0.12);
  color: #38a169;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.highlight-icon i {
  font-size: 1.15rem;
}

.highlight-number {
  color: rgba(45, 55, 72, 0.12);
  font-size: 1.65rem;
  font-weight: 900;
  line-height: 1;
}

.highlight-card h3 {
  position: relative;
  z-index: 1;
  font-size: 1.1rem;
  font-weight: 900;
  margin: 0 0 0.6rem;
  letter-spacing: -0.02em;
}

.highlight-card p {
  position: relative;
  z-index: 1;
  font-size: 0.93rem;
  line-height: 1.7;
  margin: 0;
}

/* Reveal animation */
.reveal-card,
.reveal-up {
  opacity: 0;
  transition:
    opacity 0.75s ease,
    transform 0.75s ease;
  will-change: transform, opacity;
}

.reveal-up {
  transform: translateY(26px);
}

.from-left {
  transform: translateX(-60px);
}

.from-right {
  transform: translateX(60px);
}

.reveal-card.show,
.reveal-up.show {
  opacity: 1;
  transform: translate(0, 0);
}

/* Tablet */
@media (max-width: 1024px) {
  .highlights-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .highlight-card {
    min-height: 215px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .highlights-section {
    margin: 3rem 0;
    overflow: visible;
  }

  .section-header {
    margin-bottom: 1rem;
    padding: 0 0.15rem;
  }

  .section-title {
    font-size: 1.65rem;
  }

  .swipe-hint {
    display: flex;
  }

  .highlights-grid {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding-left: 0.15rem;
    padding: 0.15rem 0.15rem 0.8rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .highlights-grid::-webkit-scrollbar {
    display: none;
  }

  .highlight-card {
    min-width: 82%;
    max-width: 82%;
    min-height: 210px;
    scroll-snap-align: start;
    border-radius: 20px;
    padding: 1.25rem;
  }

  .highlight-card:hover {
    transform: none;
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.07);
  }

  .highlight-card:hover::before {
    opacity: 0;
  }

  .highlight-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
  }

  .highlight-number {
    font-size: 1.45rem;
  }

  .highlight-card h3 {
    font-size: 1.05rem;
  }

  .highlight-card p {
    font-size: 0.9rem;
    line-height: 1.62;
  }

  .from-left,
  .from-right {
    transform: translateY(28px);
  }

  .reveal-card.show {
    transform: translateY(0);
  }
}

/* Small Mobile */
@media (max-width: 420px) {
  .section-title {
    font-size: 1.5rem;
  }

  .highlight-card {
    min-width: 86%;
    max-width: 86%;
    min-height: 205px;
    padding: 1.15rem;
  }

  .highlight-icon {
    width: 42px;
    height: 42px;
  }

  .highlight-icon i {
    font-size: 1rem;
  }

  .highlight-card p {
    font-size: 0.86rem;
  }
}

/* Dark Mode */
html[data-theme="dark"] .section-title,
html[data-theme="dark"] .highlight-card h3 {
  color: #f8fafc;
}

html[data-theme="dark"] .highlight-card p {
  color: #cbd5e0;
}

html[data-theme="dark"] .highlight-card {
  background: rgba(17, 17, 17, 0.94);
  border-color: #242424;
  box-shadow: none;
}

html[data-theme="dark"] .highlight-card:hover {
  border-color: rgba(104, 211, 145, 0.45);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

html[data-theme="dark"] .highlight-number {
  color: rgba(248, 250, 252, 0.1);
}

html[data-theme="dark"] .highlight-icon {
  background: rgba(56, 161, 105, 0.16);
  color: #68d391;
}

html[data-theme="dark"] .swipe-hint {
  color: #cbd5e0;
}
</style>