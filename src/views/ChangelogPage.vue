<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Changelog</span>
        <h1><span class="title-full">Portfolio updates and improvements</span><span class="title-short">What's new</span></h1>
        <p>
          A record of improvements, fixes, and new features added to the
          Devrymel portfolio.
        </p>
        <AdSlot class="hero-ad" type="wide-box" />
      </div>

      <section class="info-panel">
        <span class="eyebrow">Release Notes</span>
        <h2>Recent updates</h2>

        <div class="timeline-list">
          <div
            v-for="log in changelog.slice(0, 1)"
            :key="log.date"
            class="timeline-item"
          >
            <span class="timeline-dot"></span>

            <div>
              <small>{{ log.date }}</small>
              <ul class="log-items">
                <li v-for="item in log.items.slice(0, 4)" :key="item.text">
                  <span class="log-tag" :class="`tag-${item.type.toLowerCase()}`">{{ item.type }}</span>
                  {{ item.text }}
                </li>
              </ul>
              <!-- Phones: rest of the latest release folds away too -->
              <MobileMore v-if="log.items.length > 4" :label="`Show all ${log.items.length} updates`">
                <ul class="log-items">
                  <li v-for="item in log.items.slice(4)" :key="item.text">
                  <span class="log-tag" :class="`tag-${item.type.toLowerCase()}`">{{ item.type }}</span>
                  {{ item.text }}
                </li>
                </ul>
              </MobileMore>
            </div>
          </div>

          <!-- Phones: older releases fold behind "Show older updates" -->
          <MobileMore v-if="changelog.length > 1" label="Show older updates">
            <div class="timeline-list older-logs">
            <div
              v-for="log in changelog.slice(1)"
              :key="log.date"
              class="timeline-item"
            >
              <span class="timeline-dot"></span>

              <div>
                <small>{{ log.date }}</small>
                <ul class="log-items">
                  <li v-for="item in log.items" :key="item.text">
                  <span class="log-tag" :class="`tag-${item.type.toLowerCase()}`">{{ item.type }}</span>
                  {{ item.text }}
                </li>
                </ul>
              </div>
            </div>
            </div>
          </MobileMore>
        </div>
      </section>

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import MobileMore from "@/components/MobileMore.vue";
import changelog from "@/data/changelog.json";
import "@/assets/info-pages.css";

export default {
  name: "ChangelogPage",

  components: {
    AdSlot,
    ExploreLinks,
    MobileMore
  },

  data() {
    return {
      changelog
    };
  }
};
</script>

<style scoped>
.older-logs {
  margin-top: 0;
}

.log-items {
  margin: 0.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.4rem;
  list-style: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.log-items li {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
}

/* Change type: fixed-width pill so the text lines up */
.log-tag {
  flex: 0 0 66px;
  padding: 1px 0;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
}

.log-tag.tag-new {
  border-color: var(--text);
  color: var(--text);
}
</style>
