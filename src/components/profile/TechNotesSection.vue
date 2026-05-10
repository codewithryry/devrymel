<template>
  <section class="tech-notes-section">
    <div class="section-header">
      <div>
        <h2 class="section-title">Tech Notes</h2>
        <p class="section-subtitle">
          Short guides from my web development, GitHub, Firebase, and mobile UI fixes.
        </p>
      </div>
    </div>

    <div class="mobile-swipe-hint">
      <span>Swipe for more</span>
      <i class="fas fa-arrow-right"></i>
    </div>

    <div class="tech-notes-grid">
      <article
        v-for="note in notes"
        :key="note.id"
        class="tech-note-card"
      >
        <div class="note-top">
          <span class="note-category">{{ note.category }}</span>
          <span class="note-read-time">{{ note.readTime }}</span>
        </div>

        <h3>{{ note.title }}</h3>
        <p>{{ note.description }}</p>

        <button type="button" class="read-more-btn">
          Read guide
          <i class="fas fa-arrow-right"></i>
        </button>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: "TechNotesSection",

  props: {
    notes: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.tech-notes-section {
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 16px;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.section-title {
  margin: 0;
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-primary, #ffffff);
}

.section-subtitle {
  max-width: 620px;
  margin: 8px 0 0;
  color: var(--text-secondary, rgba(255, 255, 255, 0.68));
  font-size: 0.95rem;
  line-height: 1.6;
}

.mobile-swipe-hint {
  display: none;
}

.tech-notes-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.tech-note-card {
  min-height: 230px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.095);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
}

.note-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
}

.note-category {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(31, 174, 91, 0.16);
  color: #75e0a4;
  font-size: 0.72rem;
  font-weight: 700;
}

.note-read-time {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.72rem;
}

.tech-note-card h3 {
  margin: 0 0 10px;
  color: var(--text-primary, #ffffff);
  font-size: 1rem;
  line-height: 1.35;
}

.tech-note-card p {
  margin: 0;
  color: var(--text-secondary, rgba(255, 255, 255, 0.66));
  font-size: 0.86rem;
  line-height: 1.55;
}

.read-more-btn {
  margin-top: auto;
  padding: 10px 0 0;
  border: 0;
  background: transparent;
  color: #75e0a4;
  font-size: 0.82rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 1024px) {
  .tech-notes-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .tech-notes-section {
    margin: 32px auto;
    padding: 0 14px;
  }

  .section-header {
    margin-bottom: 10px;
  }

  .section-title {
    font-size: 1.65rem;
  }

  .section-subtitle {
    font-size: 0.86rem;
  }

  .mobile-swipe-hint {
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 12px 0 14px;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.78rem;
  }

  .tech-notes-grid {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 4px;
    scrollbar-width: none;
  }

  .tech-notes-grid::-webkit-scrollbar {
    display: none;
  }

  .tech-note-card {
    flex: 0 0 82%;
    min-height: 210px;
    scroll-snap-align: start;
    border-radius: 18px;
  }
}
</style>