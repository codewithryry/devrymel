<template>
  <section class="highlights-section">
    <div class="section-header reveal-up">
      <div>
        <span class="section-kicker">Benefits</span>
        <h2 class="section-title">Why Work With Me</h2>
      </div>

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
  margin: 0;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
  margin-bottom: 1.5rem;
}

.section-header > div:first-child {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  letter-spacing: -0.02em;
}

.swipe-hint {
  display: none;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.9rem;
  padding: 0 0.5rem;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
}

.highlight-card {
  position: relative;
  min-height: 210px;
  background: var(--surface);
  border-radius: var(--radius);
  padding: 1.5rem;
  border: 1px solid var(--border);
  overflow: hidden;
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    border-color 0.2s ease;
}

.highlight-card:hover {
  border-color: var(--text-muted);
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
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  background: var(--surface-soft);
  border: 1px solid var(--border);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.highlight-icon i {
  font-size: 1.05rem;
}

.highlight-number {
  color: var(--border);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.highlight-card h3 {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.6rem;
  letter-spacing: -0.01em;
  color: var(--text);
}

.highlight-card p {
  position: relative;
  z-index: 1;
  font-size: 0.92rem;
  line-height: 1.6;
  margin: 0;
  color: var(--text-secondary);
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
    margin: 0;
    overflow: visible;
  }

  .section-header {
    margin-bottom: 1rem;
    padding: 0 0.15rem;
  }

  .section-title {
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 0.85rem;
    letter-spacing: -0.02em;
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
    min-height: 200px;
    scroll-snap-align: start;
    border-radius: var(--radius);
    padding: 1.25rem;
  }

  .highlight-card:hover {
    transform: none;
  }

  .highlight-icon {
    width: 40px;
    height: 40px;
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

@media (max-width: 420px) {
  .section-title {
    font-size: 1.35rem;
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

</style>