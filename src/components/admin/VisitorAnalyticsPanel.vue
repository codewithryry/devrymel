<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->
<template>
  <div class="analytics-panel">
    <header class="topbar">
      <div>
        <h1>{{ pageTitle }}</h1>
        <p>{{ pageDescription }}</p>
      </div>

      <button class="ghost-btn" @click="fetchData">
        <i class="fas fa-sync-alt"></i>
        <span>Refresh</span>
      </button>
    </header>

    <div v-if="mode === 'visitors'" class="stats-row">
      <div class="stat-card">
        <span class="stat-icon total"><i class="fas fa-users"></i></span>
        <div>
          <strong>{{ visitorStats.total }}</strong>
          <small>Total Visitors</small>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-icon published"><i class="fas fa-fingerprint"></i></span>
        <div>
          <strong>{{ visitorStats.unique }}</strong>
          <small>Unique Devices</small>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-icon draft"><i class="fas fa-robot"></i></span>
        <div>
          <strong>{{ visitorStats.bots }}</strong>
          <small>Bot Traffic</small>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-icon featured"><i class="fas fa-shield-alt"></i></span>
        <div>
          <strong>{{ visitorStats.adBlockers }}</strong>
          <small>Ad Blockers</small>
        </div>
      </div>
    </div>

    <div v-if="mode === 'visitors'" class="graphs-grid">
      <section class="graph-card">
        <h2>Visitor Devices</h2>

        <div v-if="deviceGraph.length" class="bar-list">
          <div v-for="item in deviceGraph" :key="item.label" class="bar-item">
            <div class="bar-meta">
              <span>{{ item.label }}</span>
              <strong>{{ item.count }}</strong>
            </div>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: item.percent + '%' }"></div>
            </div>
          </div>
        </div>
        <p v-else class="graph-empty">No device data yet.</p>
      </section>

      <section class="graph-card">
        <h2>Browser Usage</h2>

        <div v-if="browserGraph.length" class="bar-list">
          <div v-for="item in browserGraph" :key="item.label" class="bar-item">
            <div class="bar-meta">
              <span>{{ item.label }}</span>
              <strong>{{ item.count }}</strong>
            </div>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: item.percent + '%' }"></div>
            </div>
          </div>
        </div>
        <p v-else class="graph-empty">No browser data yet.</p>
      </section>

      <section class="graph-card">
        <h2>Visitor Countries</h2>

        <div v-if="countryGraph.length" class="bar-list">
          <div v-for="item in countryGraph" :key="item.label" class="bar-item">
            <div class="bar-meta">
              <span>{{ item.label }}</span>
              <strong>{{ item.count }}</strong>
            </div>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: item.percent + '%' }"></div>
            </div>
          </div>
        </div>
        <p v-else class="graph-empty">No country data yet.</p>
      </section>

      <section class="graph-card">
        <div class="graph-head">
          <h2>Ad Blocker Rate</h2>
          <strong class="rate-number">{{ adBlockRate }}%</strong>
        </div>

        <div class="donut-row">
          <div
            class="donut"
            :style="{ background: `conic-gradient(#ef4444 0 ${adBlockRate}%, var(--surface-hover, #f1f5f9) ${adBlockRate}% 100%)` }"
          >
            <span>{{ adBlockRate }}%</span>
          </div>

          <div class="donut-info">
            <div>
              <small>Detected</small>
              <strong>{{ visitorStats.adBlockers }}</strong>
            </div>
            <div>
              <small>Not Detected</small>
              <strong>{{ visitorStats.total - visitorStats.adBlockers }}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="search-row">
      <div class="search-wrap">
        <i class="fas fa-search"></i>
        <input v-model="search" type="text" :placeholder="searchPlaceholder" />
      </div>
    </div>

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      Loading Firestore data...
    </div>

    <div v-else-if="currentFilteredItems.length === 0" class="empty-state">
      <i class="fas fa-inbox"></i>
      <p>No {{ activeTabLabel }} found.</p>
    </div>

    <div v-else-if="mode === 'visitors'" class="entry-list">
      <article v-for="visitor in currentVisibleItems" :key="visitor.id" class="data-card">
        <div class="card-top">
          <div class="card-title">
            <h3>
              <i :class="getDeviceIcon(visitor.deviceType)"></i>
              {{ visitor.deviceType }} • {{ visitor.browserName }}
            </h3>
            <p>{{ visitor.operatingSystem }} • {{ visitor.network?.isp || "Unknown ISP" }}</p>
          </div>

          <div class="pill-group">
            <span v-if="visitor.trafficType === 'bot'" class="badge draft"><i class="fas fa-robot"></i> Bot</span>
            <span class="badge" :class="visitor.adBlocker === 'Detected' ? 'danger' : 'published'">
              {{ visitor.adBlocker || "Unknown" }}
            </span>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <small>Location</small>
            <strong>{{ visitor.network?.city || "Unknown" }}, {{ visitor.network?.country || "Unknown" }}</strong>
          </div>
          <div class="info-item">
            <small>IP Address</small>
            <strong class="mono">{{ visitor.network?.ipAddress || "Unavailable" }}</strong>
          </div>
          <div class="info-item">
            <small>Page</small>
            <strong>{{ formatPagePath(visitor.path) }}</strong>
          </div>
          <div class="info-item">
            <small>Visited</small>
            <strong>{{ formatDate(visitor.createdAt) }}</strong>
          </div>
        </div>
      </article>
    </div>

    <div v-else-if="mode === 'feedback'" class="entry-list">
      <article v-for="item in currentVisibleItems" :key="item.id" class="data-card">
        <div class="card-top">
          <div class="card-title">
            <h3><i class="fas fa-user-circle"></i> {{ item.name || item.displayName || "Anonymous" }}</h3>
            <p>{{ item.email || "No email provided" }}</p>
          </div>
        </div>

        <div class="message-box">{{ item.message || "No message content." }}</div>

        <div class="info-grid">
          <div class="info-item">
            <small>Created</small>
            <strong>{{ formatDate(item.created || item.createdAt) }}</strong>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="entry-list">
      <article v-for="item in currentVisibleItems" :key="item.id" class="data-card">
        <div class="card-top">
          <div class="card-title">
            <h3><i class="fas fa-chart-bar"></i> {{ item.id }}</h3>
            <p>Analytics document</p>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <small>Views</small>
            <strong>{{ item.views ?? item.count ?? item.total ?? "N/A" }}</strong>
          </div>
        </div>
      </article>
    </div>

    <div v-if="currentFilteredItems.length > defaultVisibleLimit" class="list-actions">
      <button
        v-if="currentVisibleLimit < currentFilteredItems.length"
        class="ghost-btn"
        @click="showMore"
      >
        Show More ({{ currentFilteredItems.length - currentVisibleLimit }} remaining)
      </button>
      <button v-else class="ghost-btn" @click="showLess">Show Less</button>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/services/firebase";

const MODE_META = {
  visitors: { title: "Visitors", description: "Every visit recorded from your portfolio, with device and network details.", placeholder: "Search browser, city, ISP, device..." },
  feedback: { title: "Feedback", description: "Messages submitted through the portfolio feedback form.", placeholder: "Search feedback message, name, email..." },
  analytics: { title: "Analytics", description: "Raw analytics documents stored in Firestore.", placeholder: "Search analytics document..." }
};

export default {
  name: "VisitorAnalyticsPanel",

  props: {
    mode: {
      type: String,
      default: "visitors",
      validator: (value) => ["visitors", "feedback", "analytics"].includes(value)
    }
  },

  data() {
    return {
      search: "",
      loading: false,
      errorMessage: "",

      visitors: [],
      feedback: [],
      analytics: [],

      visibleLimits: { visitors: 8, feedback: 8, analytics: 8 },
      defaultVisibleLimit: 8
    };
  },

  computed: {
    pageTitle() {
      return MODE_META[this.mode]?.title || "Insights";
    },

    pageDescription() {
      return MODE_META[this.mode]?.description || "";
    },

    activeTabLabel() {
      return this.mode;
    },

    searchPlaceholder() {
      return MODE_META[this.mode]?.placeholder || "Search...";
    },

    currentItems() {
      if (this.mode === "visitors") return this.visitors;
      if (this.mode === "feedback") return this.feedback;
      return this.analytics;
    },

    currentFilteredItems() {
      const keyword = this.search.toLowerCase().trim();
      if (!keyword) return this.currentItems;

      return this.currentItems.filter((item) => JSON.stringify(item).toLowerCase().includes(keyword));
    },

    currentVisibleLimit() {
      return this.visibleLimits[this.mode] || this.defaultVisibleLimit;
    },

    currentVisibleItems() {
      return this.currentFilteredItems.slice(0, this.currentVisibleLimit);
    },

    visitorStats() {
      const unique = new Set(this.visitors.map((visitor) => visitor.visitorId));
      const adBlockers = this.visitors.filter((visitor) => visitor.adBlocker === "Detected");
      const bots = this.visitors.filter((visitor) => visitor.trafficType === "bot");

      return {
        total: this.visitors.length,
        unique: unique.size,
        adBlockers: adBlockers.length,
        bots: bots.length
      };
    },

    deviceGraph() {
      return this.buildGraphData(this.visitors, "deviceType");
    },

    browserGraph() {
      return this.buildGraphData(this.visitors, "browserName");
    },

    countryGraph() {
      return this.buildNestedGraphData(this.visitors, ["network", "country"]);
    },

    adBlockRate() {
      if (!this.visitorStats.total) return 0;
      return Math.round((this.visitorStats.adBlockers / this.visitorStats.total) * 100);
    }
  },

  watch: {
    search() {
      this.visibleLimits[this.mode] = this.defaultVisibleLimit;
    },

    mode() {
      this.search = "";
      this.fetchData();
    }
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    getDeviceIcon(deviceType) {
      const icons = { Desktop: "fas fa-desktop", Mobile: "fas fa-mobile-alt", Tablet: "fas fa-tablet-alt" };
      return icons[deviceType] || "fas fa-question-circle";
    },

    formatPagePath(path) {
      if (!path || path === "/") return "Homepage";
      return path.replace(/\/$/, "") || "Homepage";
    },

    buildGraphData(items, field) {
      const counts = {};
      items.forEach((item) => {
        const label = item[field] || "Unknown";
        counts[label] = (counts[label] || 0) + 1;
      });
      return this.formatGraphCounts(counts);
    },

    buildNestedGraphData(items, path) {
      const counts = {};
      items.forEach((item) => {
        let value = item;
        path.forEach((key) => {
          value = value?.[key];
        });
        const label = value || "Unknown";
        counts[label] = (counts[label] || 0) + 1;
      });
      return this.formatGraphCounts(counts);
    },

    formatGraphCounts(counts) {
      const values = Object.values(counts);
      const max = Math.max(...values, 1);

      return Object.entries(counts)
        .map(([label, count]) => ({ label, count, percent: Math.max(Math.round((count / max) * 100), 6) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    },

    showMore() {
      this.visibleLimits[this.mode] += this.defaultVisibleLimit;
    },

    showLess() {
      this.visibleLimits[this.mode] = this.defaultVisibleLimit;
    },

    async fetchData() {
      try {
        this.loading = true;
        this.errorMessage = "";

        if (this.mode === "visitors") {
          this.visitors = await this.fetchCollection("visitor_logs", "createdAt", 50);
        } else if (this.mode === "feedback") {
          this.feedback = await this.fetchCollection("feedback", "created", 50);
        } else {
          this.analytics = await this.fetchCollection("analytics", null, 50);
        }
      } catch (error) {
        console.error("Fetch Firestore data error:", error);
        this.errorMessage = "Unable to load Firestore data. Check Firestore rules.";
      } finally {
        this.loading = false;
      }
    },

    async fetchCollection(collectionName, orderField = null, maxLimit = 50) {
      const ref = collection(db, collectionName);
      const collectionQuery = orderField
        ? query(ref, orderBy(orderField, "desc"), limit(maxLimit))
        : query(ref, limit(maxLimit));

      const snapshot = await getDocs(collectionQuery);
      return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
    },

    formatDate(value) {
      if (!value) return "Unknown";
      const date = value.toDate ? value.toDate() : new Date(value);
      return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.topbar h1 {
  margin: 0;
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  letter-spacing: -0.02em;
}

.topbar p {
  margin: 6px 0 0;
  color: var(--text-secondary, #64748b);
  font-size: 0.85rem;
}

.ghost-btn {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  cursor: pointer;
  padding: 11px 16px;
  color: var(--text, #0f172a);
  background: var(--surface, #ffffff);
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
}

.ghost-btn:hover {
  background: var(--surface-hover, #f1f5f9);
}

.tabs-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 999px;
  background: var(--surface, #ffffff);
  color: var(--text-secondary, #64748b);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  font-family: inherit;
}

.tab-btn small {
  padding: 1px 7px;
  border-radius: 999px;
  background: var(--surface-hover, #f1f5f9);
  font-size: 0.68rem;
}

.tab-btn.active {
  color: var(--accent, #6366f1);
  background: color-mix(in srgb, var(--accent, #6366f1) 10%, transparent);
  border-color: color-mix(in srgb, var(--accent, #6366f1) 30%, var(--border));
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.06));
}

.stat-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-size: 1.05rem;
}

.stat-icon.total {
  color: var(--accent, #6366f1);
  background: color-mix(in srgb, var(--accent, #6366f1) 12%, transparent);
}

.stat-icon.published {
  color: #16a34a;
  background: rgba(34, 197, 94, 0.12);
}

.stat-icon.draft {
  color: #d97706;
  background: rgba(245, 158, 11, 0.14);
}

.stat-icon.featured {
  color: #ca8a04;
  background: rgba(234, 179, 8, 0.14);
}

.stat-card strong {
  display: block;
  font-size: 1.25rem;
  line-height: 1.1;
}

.stat-card small {
  color: var(--text-secondary, #64748b);
  font-size: 0.76rem;
}

.graphs-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.graph-card {
  padding: 16px;
  border-radius: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
}

.graph-card h2 {
  margin: 0 0 14px;
  font-size: 0.9rem;
}

.graph-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.graph-head h2 {
  margin: 0;
}

.graph-empty {
  margin: 0;
  padding: 12px;
  border-radius: 12px;
  color: var(--text-secondary, #64748b);
  background: var(--surface-hover, #f1f5f9);
  font-size: 0.78rem;
}

.bar-list {
  display: grid;
  gap: 10px;
}

.bar-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 0.78rem;
}

.bar-meta strong {
  color: var(--accent, #6366f1);
}

.bar-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--surface-hover, #f1f5f9);
}

.bar-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent, #6366f1), #8b5cf6);
}

.rate-number {
  color: #ef4444;
  font-size: 1.3rem;
}

.donut-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}

.donut {
  width: 78px;
  height: 78px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  position: relative;
}

.donut::before {
  content: "";
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: var(--surface, #ffffff);
}

.donut span {
  position: relative;
  z-index: 1;
  font-weight: 900;
}

.donut-info {
  flex: 1;
  display: grid;
  gap: 8px;
}

.donut-info div {
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--surface-hover, #f1f5f9);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.donut-info small {
  color: var(--text-secondary, #64748b);
  font-size: 0.72rem;
}

.search-row {
  margin-bottom: 16px;
}

.search-wrap {
  position: relative;
  max-width: 420px;
  display: flex;
  align-items: center;
}

.search-wrap i {
  position: absolute;
  left: 14px;
  color: var(--text-muted, #94a3b8);
  font-size: 0.85rem;
}

.search-wrap input {
  width: 100%;
  padding: 11px 14px 11px 38px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  color: var(--text, #0f172a);
  background: var(--surface, #ffffff);
  font-size: 0.85rem;
  outline: none;
  font-family: inherit;
}

.search-wrap input:focus {
  border-color: var(--accent, #6366f1);
}

.error-text {
  margin: 0 0 14px;
  color: #dc2626;
  font-size: 0.85rem;
}

.loading-state,
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  min-height: 200px;
  padding: 40px 20px;
  color: var(--text-secondary, #64748b);
  font-size: 0.9rem;
  text-align: center;
  border-radius: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
}

.empty-state i {
  font-size: 2rem;
  opacity: 0.4;
}

.entry-list {
  display: grid;
  gap: 10px;
}

.data-card {
  padding: 16px;
  border-radius: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.06));
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.card-title h3 {
  margin: 0 0 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title p {
  margin: 0;
  color: var(--text-secondary, #64748b);
  font-size: 0.78rem;
}

.pill-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
}

.badge.published {
  color: #16a34a;
  background: rgba(34, 197, 94, 0.12);
}

.badge.draft {
  color: #d97706;
  background: rgba(245, 158, 11, 0.14);
}

.badge.danger {
  color: #dc2626;
  background: rgba(239, 68, 68, 0.14);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.info-item {
  padding: 10px;
  border-radius: 12px;
  background: var(--surface-hover, #f1f5f9);
}

.info-item small {
  display: block;
  margin-bottom: 4px;
  color: var(--text-secondary, #64748b);
  font-size: 0.66rem;
}

.info-item strong {
  font-size: 0.78rem;
  word-break: break-word;
}

.info-item strong.mono {
  font-family: "SF Mono", "Fira Code", monospace;
}

.message-box {
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 12px;
  background: var(--surface-hover, #f1f5f9);
  font-size: 0.85rem;
  line-height: 1.5;
}

.list-actions {
  display: flex;
  justify-content: center;
  padding: 14px 0 2px;
}

@media (max-width: 1024px) {
  .graphs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stats-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .graphs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
