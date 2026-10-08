<!--
  Copyright (c) 2026 Reymel Mislang
  Swipeable content for ONE homepage grid tile (projects, employer info).
  Tall / large tiles add a small preview (mini browser window or certificate paper).
-->
<template>
  <div class="tc" :class="['tc-' + size, { 'tc-locked': locked }]" @click.capture="locked && $event.preventDefault()">
    <div ref="track" class="tc-track" @scroll.passive="onScroll">
      <component
        :is="slide.to ? 'router-link' : 'a'"
        v-for="(slide, i) in slides"
        :key="slide.title + i"
        class="tc-slide"
        v-bind="slide.to ? { to: slide.to } : { href: slide.href, target: '_blank', rel: 'noopener noreferrer' }"
      >
        <span class="tc-kicker"><i :class="slide.icon"></i>{{ slide.kicker }}</span>

        <!-- Mini preview (tall / large tiles): tiny browser window or certificate paper -->
        <span v-if="slide.thumb && showThumb" class="tc-thumb" :class="'tc-thumb-' + slide.thumb.type" aria-hidden="true">
          <span v-if="slide.thumb.type === 'site'" class="tc-thumb-bar"><i></i><i></i><i></i></span>
          <img v-if="slide.thumb.src" :src="slide.thumb.src" alt="" loading="lazy" />
          <span v-else class="tc-thumb-skel"><i></i><i></i><i></i><i></i></span>
        </span>

        <strong class="tc-title">{{ slide.title }}</strong>
        <span class="tc-text">{{ slide.text }}</span>
        <span v-if="slide.chips && slide.chips.length" class="tc-chips">
          <span v-for="chip in slide.chips" :key="chip">{{ chip }}</span>
        </span>
        <i class="tc-go" :class="slide.to ? 'fas fa-arrow-right' : 'fas fa-arrow-up-right-from-square'"></i>
      </component>
    </div>

    <span v-if="slides.length > 1" class="tc-dots" aria-hidden="true">
      <i v-for="(slide, i) in slides" :key="'d' + i" :class="{ on: i === active }"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "TileCarousel",
  props: {
    slides: { type: Array, default: () => [] },
    // Tile size from the grid (sm, wide, tall, lg): decides how much text shows
    size: { type: String, default: "tall" },
    // Edit mode: links don't open (taps pick the tile up for swapping instead)
    locked: { type: Boolean, default: false }
  },
  data() {
    return { active: 0 };
  },
  computed: {
    showThumb() {
      return this.size === "tall" || this.size === "lg";
    }
  },
  methods: {
    onScroll() {
      const el = this.$refs.track;
      if (!el) return;
      const i = Math.round(el.scrollLeft / (el.clientWidth || 1));
      this.active = Math.min(this.slides.length - 1, Math.max(0, i));
    }
  }
};
</script>

<style scoped>
.tc {
  position: relative;
  width: 100%;
  height: 100%;
}

.tc-track {
  display: flex;
  height: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.tc-track::-webkit-scrollbar {
  display: none;
}

.tc-slide {
  position: relative;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  min-width: 0;
  padding: 0.85rem 0.9rem 1.5rem;
  box-sizing: border-box;
  scroll-snap-align: start;
  color: inherit;
  text-decoration: none;
}

.tc-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text-muted);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.tc-kicker i {
  font-size: 0.7rem;
}

.tc-title {
  margin-top: auto;
  overflow: hidden;
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tc-text {
  display: -webkit-box;
  margin-top: 0.2rem;
  overflow: hidden;
  color: var(--text-secondary);
  font-size: 0.72rem;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tc-chips {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.45rem;
  overflow: hidden;
}

.tc-chips span {
  flex: none;
  padding: 0.12rem 0.45rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-secondary);
  font-size: 0.6rem;
  font-weight: 600;
  white-space: nowrap;
}

.tc-go {
  position: absolute;
  top: 0.8rem;
  right: 0.85rem;
  color: var(--text-muted);
  font-size: 0.65rem;
}

.tc-dots {
  position: absolute;
  bottom: 0.6rem;
  left: 0.9rem;
  display: flex;
  gap: 4px;
  pointer-events: none;
}

.tc-dots i {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--border);
  transition: width 0.2s ease, background 0.2s ease;
}

.tc-dots i.on {
  width: 14px;
  background: var(--text);
}

/* --- Mini preview --- */
.tc-thumb {
  position: relative;
  display: block;
  height: 46px;
  margin-top: 0.45rem;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-alt, var(--bg));
}

.tc-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

/* Website: a tiny browser window (dots bar + screenshot top) */
.tc-thumb-site {
  padding-top: 9px;
}

.tc-thumb-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 2px;
  height: 9px;
  padding: 2px 4px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.tc-thumb-bar i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--border);
}

/* Certificate: a small landscape paper */
.tc-thumb-doc {
  width: 64px;
  border-radius: 4px;
  background: var(--surface);
}

/* Skeleton lines (PDF certificates / missing screenshot) */
.tc-thumb-skel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  height: 100%;
  padding: 0 8px;
}

.tc-thumb-skel i {
  height: 3px;
  border-radius: 2px;
  background: var(--border);
}

.tc-thumb-skel i:nth-child(1) { width: 60%; height: 4px; margin: 0 auto 2px; }
.tc-thumb-skel i:nth-child(2) { width: 85%; margin: 0 auto; }
.tc-thumb-skel i:nth-child(3) { width: 70%; margin: 0 auto; }
.tc-thumb-skel i:nth-child(4) { width: 30%; margin: 2px auto 0; }

/* Tall: preview takes the room of the chips and 2nd text line */
.tc-tall .tc-slide:has(.tc-thumb) .tc-chips {
  display: none;
}

.tc-tall .tc-slide:has(.tc-thumb) .tc-text {
  -webkit-line-clamp: 1;
}

.tc-tall .tc-slide:has(.tc-thumb) .tc-title {
  margin-top: auto;
}

/* Large (full width): text on the left, preview on the right */
.tc-lg .tc-slide:has(.tc-thumb) {
  padding-right: calc(42% + 1.2rem);
}

.tc-lg .tc-thumb {
  position: absolute;
  top: 0.85rem;
  right: 0.9rem;
  bottom: 0.85rem;
  width: 42%;
  height: auto;
  margin: 0;
}

.tc-lg .tc-thumb-doc {
  width: 34%;
}

.tc-lg .tc-go {
  display: none;
}

/* 1-row tiles: kicker + title + one line; no chips */
.tc-sm .tc-slide,
.tc-wide .tc-slide {
  justify-content: center;
  padding: 0.5rem 0.8rem;
}

.tc-sm .tc-title,
.tc-wide .tc-title {
  margin-top: 0.1rem;
  font-size: 0.85rem;
}

.tc-sm .tc-text,
.tc-wide .tc-text {
  margin-top: 0.05rem;
  -webkit-line-clamp: 1;
}

.tc-sm .tc-chips,
.tc-wide .tc-chips {
  display: none;
}

.tc-sm .tc-go,
.tc-wide .tc-go {
  top: 0.55rem;
}

.tc-sm .tc-dots,
.tc-wide .tc-dots {
  top: auto;
  right: 0.8rem;
  bottom: 0.5rem;
  left: auto;
}

.tc-lg .tc-title {
  font-size: 1.05rem;
}

/* Edit mode: taps go to the tile (pick up / swap), not the links */
.tc-locked .tc-slide {
  pointer-events: none;
}
</style>
