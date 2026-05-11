<template>
  <main class="admin-page">
    <section class="admin-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        <span>Back to Portfolio</span>
      </router-link>

      <div class="admin-header">
        <div>
          <span class="eyebrow">Private Admin Panel</span>
          <h1>Dashboard</h1>
          <p v-if="user">Signed in as {{ user.email }}</p>
        </div>

        <button v-if="user" class="logout-btn" @click="logout" aria-label="Logout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>

      <div v-if="blockedAccess" class="blocked-box">
        <div class="blocked-icon">
          <i class="fas fa-lock"></i>
        </div>

        <h2>Oh no, this is not for you.</h2>
        <p>This dashboard is restricted to the site owner only.</p>

        <button class="primary-btn" @click="resetLogin">
          Back to Login
        </button>
      </div>

      <div v-else-if="!user" class="login-box">
        <h2>Admin Login</h2>
        <p>Sign in with your admin Google account to view Firestore data.</p>

        <button class="primary-btn" @click="loginWithGoogle">
          <i class="fab fa-google"></i>
          Sign in with Google
        </button>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
      </div>

      <div v-else class="admin-layout">
        <aside class="admin-sidebar">
          <div class="sidebar-card">
            <nav class="sidebar-nav">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                type="button"
                class="sidebar-link"
                :class="{ active: activeTab === tab.id }"
                @click="setActiveTab(tab.id)"
              >
                <span>
                  <i :class="tab.icon"></i>
                  {{ tab.label }}
                </span>

                <small>{{ tab.count }}</small>
              </button>
            </nav>

            <div class="sidebar-summary">
              <div>
                <i class="fas fa-users"></i>
                <span>
                  <strong>{{ visitorStats.total }}</strong>
                  <small>Total Visitors</small>
                </span>
              </div>

              <div>
                <i class="fas fa-fingerprint"></i>
                <span>
                  <strong>{{ visitorStats.unique }}</strong>
                  <small>Unique Devices</small>
                </span>
              </div>

              <div>
                <i class="fas fa-shield-alt"></i>
                <span>
                  <strong>{{ visitorStats.adBlockers }}</strong>
                  <small>Ad Blockers</small>
                </span>
              </div>

              <div>
                <i class="fas fa-comment-dots"></i>
                <span>
                  <strong>{{ feedbackStats.total }}</strong>
                  <small>Feedback</small>
                </span>
              </div>

              <div>
                <i class="fas fa-chart-line"></i>
                <span>
                  <strong>{{ analyticsStats.total }}</strong>
                  <small>Analytics Docs</small>
                </span>
              </div>
            </div>
          </div>
        </aside>

        <section class="admin-content">
          <div class="tabs-wrap">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              class="tab-btn"
              :class="{ active: activeTab === tab.id }"
              @click="setActiveTab(tab.id)"
            >
              <i :class="tab.icon"></i>
              <span>{{ tab.label }}</span>
              <small>{{ tab.count }}</small>
            </button>
          </div>

          <div class="stats-row">
            <div class="stat-box">
              <i class="fas fa-users"></i>
              <div>
                <span>{{ visitorStats.total }}</span>
                <small>Total Visitors</small>
              </div>
            </div>

            <div class="stat-box">
              <i class="fas fa-fingerprint"></i>
              <div>
                <span>{{ visitorStats.unique }}</span>
                <small>Unique Devices</small>
              </div>
            </div>

            <div class="stat-box">
              <i class="fas fa-comment-dots"></i>
              <div>
                <span>{{ feedbackStats.total }}</span>
                <small>Feedback</small>
              </div>
            </div>

            <div class="stat-box">
              <i class="fas fa-chart-line"></i>
              <div>
                <span>{{ analyticsStats.total }}</span>
                <small>Analytics Docs</small>
              </div>
            </div>
          </div>

          <div class="graphs-grid">
            <section class="graph-card">
              <div class="graph-head">
                <div>
                  <h2>Visitor Devices</h2>
                  <p>Breakdown by device type</p>
                </div>
              </div>

              <div v-if="deviceGraph.length" class="bar-list">
                <div
                  v-for="item in deviceGraph"
                  :key="item.label"
                  class="bar-item"
                >
                  <div class="bar-meta">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.count }}</strong>
                  </div>

                  <div class="bar-track">
                    <div
                      class="bar-fill"
                      :style="{ width: item.percent + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <div v-else class="graph-empty">
                No device data yet.
              </div>
            </section>

            <section class="graph-card">
              <div class="graph-head">
                <div>
                  <h2>Browser Usage</h2>
                  <p>Top browsers from visitor logs</p>
                </div>
              </div>

              <div v-if="browserGraph.length" class="bar-list">
                <div
                  v-for="item in browserGraph"
                  :key="item.label"
                  class="bar-item"
                >
                  <div class="bar-meta">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.count }}</strong>
                  </div>

                  <div class="bar-track">
                    <div
                      class="bar-fill"
                      :style="{ width: item.percent + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <div v-else class="graph-empty">
                No browser data yet.
              </div>
            </section>

            <section class="graph-card">
              <div class="graph-head">
                <div>
                  <h2>Visitor Countries</h2>
                  <p>Top countries from IP lookup</p>
                </div>
              </div>

              <div v-if="countryGraph.length" class="bar-list">
                <div
                  v-for="item in countryGraph"
                  :key="item.label"
                  class="bar-item"
                >
                  <div class="bar-meta">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.count }}</strong>
                  </div>

                  <div class="bar-track">
                    <div
                      class="bar-fill"
                      :style="{ width: item.percent + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <div v-else class="graph-empty">
                No country data yet.
              </div>
            </section>

            <section class="graph-card wide">
              <div class="graph-head">
                <div>
                  <h2>Ad Blocker Rate</h2>
                  <p>Detected vs not detected</p>
                </div>

                <strong class="rate-number">{{ adBlockRate }}%</strong>
              </div>

              <div class="donut-row">
                <div
                  class="donut"
                  :style="{
                    background: `conic-gradient(#fb7185 0 ${adBlockRate}%, rgba(255,255,255,0.08) ${adBlockRate}% 100%)`
                  }"
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

          <div class="toolbar">
            <div class="search-wrap">
              <i class="fas fa-search"></i>
              <input
                v-model="search"
                type="text"
                :placeholder="searchPlaceholder"
              />
            </div>

            <button class="refresh-btn" @click="fetchAllData">
              <i class="fas fa-sync-alt"></i>
              <span>Refresh</span>
            </button>
          </div>

          <div v-if="!loading && currentFilteredItems.length" class="result-info">
            Showing {{ currentVisibleItems.length }} of {{ currentFilteredItems.length }}
            {{ activeTabLabel }}
          </div>

          <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

          <div v-if="loading" class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            Loading Firestore data...
          </div>

          <div v-else-if="currentFilteredItems.length === 0 && !loading" class="empty-state">
            <i class="fas fa-inbox"></i>
            <p>No {{ activeTabLabel }} found.</p>
          </div>

          <div v-else-if="activeTab === 'visitors'" class="data-list">
            <article
              v-for="visitor in currentVisibleItems"
              :key="visitor.id"
              class="data-card"
            >
              <div class="card-top">
                <div class="card-title">
                  <h3>
                    <i :class="getDeviceIcon(visitor.deviceType)"></i>
                    {{ visitor.deviceType }} • {{ visitor.browserName }}
                  </h3>
                  <p>
                    {{ visitor.operatingSystem }} •
                    {{ visitor.network?.isp || "Unknown ISP" }}
                  </p>
                </div>

                <span
                  class="status-pill"
                  :class="{ 
                    danger: visitor.adBlocker === 'Detected',
                    success: visitor.adBlocker !== 'Detected'
                  }"
                >
                  <i :class="visitor.adBlocker === 'Detected' ? 'fas fa-shield-alt' : 'fas fa-check-circle'"></i>
                  {{ visitor.adBlocker || "Unknown" }}
                </span>
              </div>

              <div class="info-grid">
                <div class="info-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <div>
                    <small>Location</small>
                    <strong>
                      {{ visitor.network?.city || "Unknown" }},
                      {{ visitor.network?.country || "Unknown" }}
                    </strong>
                  </div>
                </div>

                <div class="info-item">
                  <i class="fas fa-globe"></i>
                  <div>
                    <small>IP Address</small>
                    <strong class="mono">{{ visitor.network?.ipAddress || "Unavailable" }}</strong>
                  </div>
                </div>

                <div class="info-item">
                  <i class="fas fa-network-wired"></i>
                  <div>
                    <small>ISP / ASN</small>
                    <strong>
                      {{ visitor.network?.isp || "Unknown" }}
                      <span v-if="visitor.network?.asn" class="asn-tag">• {{ visitor.network.asn }}</span>
                    </strong>
                  </div>
                </div>

                <div class="info-item">
                  <i class="fas fa-file-alt"></i>
                  <div>
                    <small>Page</small>
                    <strong>{{ formatPagePath(visitor.path) }}</strong>
                  </div>
                </div>

                <div class="info-item">
                  <i class="fas fa-desktop"></i>
                  <div>
                    <small>Screen</small>
                    <strong>
                      {{ visitor.screen?.width || 0 }} × {{ visitor.screen?.height || 0 }}
                    </strong>
                  </div>
                </div>

                <div class="info-item">
                  <i class="fas fa-clock"></i>
                  <div>
                    <small>Visited</small>
                    <strong>{{ formatDate(visitor.createdAt) }}</strong>
                  </div>
                </div>
              </div>

              <details class="technical-details">
                <summary>
                  <i class="fas fa-code"></i>
                  View technical details
                </summary>
                <pre>{{ JSON.stringify(visitor, null, 2) }}</pre>
              </details>
            </article>
          </div>

          <div v-else-if="activeTab === 'feedback'" class="data-list">
            <article
              v-for="item in currentVisibleItems"
              :key="item.id"
              class="data-card"
            >
              <div class="card-top">
                <div class="card-title">
                  <h3>
                    <i class="fas fa-user-circle"></i>
                    {{ item.name || item.displayName || "Anonymous" }}
                  </h3>
                  <p>{{ item.email || "No email provided" }}</p>
                </div>

                <span class="status-pill feedback-pill">
                  <i class="fas fa-comment"></i>
                  Feedback
                </span>
              </div>

              <div class="message-box">
                <i class="fas fa-quote-left"></i>
                {{ item.message || "No message content." }}
              </div>

              <div class="info-grid feedback-grid">
                <div class="info-item">
                  <i class="fas fa-calendar-alt"></i>
                  <div>
                    <small>Created</small>
                    <strong>{{ formatDate(item.created || item.createdAt) }}</strong>
                  </div>
                </div>

                <div class="info-item">
                  <i class="fas fa-id-card"></i>
                  <div>
                    <small>Document ID</small>
                    <strong class="mono">{{ item.id }}</strong>
                  </div>
                </div>
              </div>

              <details class="technical-details">
                <summary>
                  <i class="fas fa-code"></i>
                  View raw data
                </summary>
                <pre>{{ JSON.stringify(item, null, 2) }}</pre>
              </details>
            </article>
          </div>

          <div v-else class="data-list">
            <article
              v-for="item in currentVisibleItems"
              :key="item.id"
              class="data-card"
            >
              <div class="card-top">
                <div class="card-title">
                  <h3>
                    <i class="fas fa-chart-bar"></i>
                    {{ item.id }}
                  </h3>
                  <p>Analytics document</p>
                </div>

                <span class="status-pill analytics-pill">
                  <i class="fas fa-chart-line"></i>
                  Analytics
                </span>
              </div>

              <div class="info-grid">
                <div class="info-item">
                  <i class="fas fa-eye"></i>
                  <div>
                    <small>Views</small>
                    <strong>{{ item.views ?? item.count ?? item.total ?? "N/A" }}</strong>
                  </div>
                </div>
              </div>

              <details class="technical-details" open>
                <summary>
                  <i class="fas fa-code"></i>
                  View analytics data
                </summary>
                <pre>{{ JSON.stringify(item, null, 2) }}</pre>
              </details>
            </article>
          </div>

          <div
            v-if="currentFilteredItems.length > defaultVisibleLimit"
            class="list-actions"
          >
            <button
              v-if="currentVisibleLimit < currentFilteredItems.length"
              class="show-more-btn"
              @click="showMore"
            >
              <i class="fas fa-chevron-down"></i>
              Show More ({{ currentFilteredItems.length - currentVisibleLimit }} remaining)
            </button>

            <button
              v-else
              class="show-more-btn secondary"
              @click="showLess"
            >
              <i class="fas fa-chevron-up"></i>
              Show Less
            </button>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  collection,
  getDocs,
  orderBy,
  query,
  limit
} from "firebase/firestore";

import { auth, db } from "@/services/firebase";

const ADMIN_UID = "pAwCyoApURZu9aVk4k8tKRHzk7K2";

export default {
  name: "VisitorLogsAdmin",

  data() {
    return {
      user: null,
      blockedAccess: false,

      activeTab: "visitors",
      search: "",
      loading: false,
      errorMessage: "",

      visitors: [],
      feedback: [],
      analytics: [],

      visibleLimits: {
        visitors: 8,
        feedback: 8,
        analytics: 8
      },

      defaultVisibleLimit: 8
    };
  },

  computed: {
    tabs() {
      return [
        {
          id: "visitors",
          label: "Visitors",
          icon: "fas fa-users",
          count: this.visitors.length
        },
        {
          id: "feedback",
          label: "Feedback",
          icon: "fas fa-comment-dots",
          count: this.feedback.length
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: "fas fa-chart-line",
          count: this.analytics.length
        }
      ];
    },

    activeTabLabel() {
      const tab = this.tabs.find((item) => item.id === this.activeTab);
      return tab ? tab.label.toLowerCase() : "items";
    },

    searchPlaceholder() {
      if (this.activeTab === "visitors") {
        return "Search browser, city, ISP, device...";
      }

      if (this.activeTab === "feedback") {
        return "Search feedback message, name, email...";
      }

      return "Search analytics document...";
    },

    currentItems() {
      if (this.activeTab === "visitors") return this.visitors;
      if (this.activeTab === "feedback") return this.feedback;

      return this.analytics;
    },

    currentFilteredItems() {
      const keyword = this.search.toLowerCase().trim();

      if (!keyword) return this.currentItems;

      return this.currentItems.filter((item) => {
        const text = JSON.stringify(item).toLowerCase();
        return text.includes(keyword);
      });
    },

    currentVisibleLimit() {
      return this.visibleLimits[this.activeTab] || this.defaultVisibleLimit;
    },

    currentVisibleItems() {
      return this.currentFilteredItems.slice(0, this.currentVisibleLimit);
    },

    visitorStats() {
      const unique = new Set(this.visitors.map((visitor) => visitor.visitorId));
      const adBlockers = this.visitors.filter(
        (visitor) => visitor.adBlocker === "Detected"
      );

      return {
        total: this.visitors.length,
        unique: unique.size,
        adBlockers: adBlockers.length
      };
    },

    feedbackStats() {
      return {
        total: this.feedback.length
      };
    },

    analyticsStats() {
      return {
        total: this.analytics.length
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

      return Math.round(
        (this.visitorStats.adBlockers / this.visitorStats.total) * 100
      );
    }
  },

  watch: {
    search() {
      this.visibleLimits[this.activeTab] = this.defaultVisibleLimit;
    }
  },

  mounted() {
    this.setResponsiveLimit();
    window.addEventListener("resize", this.setResponsiveLimit);

    onAuthStateChanged(auth, async (currentUser) => {
      this.errorMessage = "";

      if (!currentUser) {
        this.user = null;
        this.clearData();
        return;
      }

      if (currentUser.uid !== ADMIN_UID) {
        this.user = null;
        this.clearData();
        this.blockedAccess = true;

        await signOut(auth);
        return;
      }

      this.blockedAccess = false;
      this.user = currentUser;

      await this.fetchAllData();
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.setResponsiveLimit);
  },

  methods: {
    getDeviceIcon(deviceType) {
      const icons = {
        Desktop: "fas fa-desktop",
        Mobile: "fas fa-mobile-alt",
        Tablet: "fas fa-tablet-alt"
      };

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
        .map(([label, count]) => ({
          label,
          count,
          percent: Math.max(Math.round((count / max) * 100), 6)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    },

    setResponsiveLimit() {
      const isMobile = window.innerWidth <= 720;
      this.defaultVisibleLimit = isMobile ? 4 : 8;

      Object.keys(this.visibleLimits).forEach((key) => {
        if (this.visibleLimits[key] < this.defaultVisibleLimit) {
          this.visibleLimits[key] = this.defaultVisibleLimit;
        }
      });
    },

    setActiveTab(tabId) {
      this.activeTab = tabId;
      this.search = "";
      this.visibleLimits[tabId] = this.defaultVisibleLimit;
    },

    showMore() {
      this.visibleLimits[this.activeTab] += this.defaultVisibleLimit;
    },

    showLess() {
      this.visibleLimits[this.activeTab] = this.defaultVisibleLimit;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },

    clearData() {
      this.visitors = [];
      this.feedback = [];
      this.analytics = [];
    },

    async loginWithGoogle() {
      try {
        this.errorMessage = "";
        this.blockedAccess = false;

        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        if (result.user.uid !== ADMIN_UID) {
          this.user = null;
          this.clearData();
          this.blockedAccess = true;

          await signOut(auth);
          return;
        }

        this.user = result.user;
      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage = "Login failed. Check Firebase Auth settings.";
      }
    },

    async logout() {
      await signOut(auth);

      this.user = null;
      this.clearData();
      this.errorMessage = "";
      this.blockedAccess = false;
    },

    resetLogin() {
      this.blockedAccess = false;
      this.errorMessage = "";
    },

    async fetchAllData() {
      try {
        this.loading = true;
        this.errorMessage = "";
        this.resetVisibleLimits();

        const [visitors, feedback, analytics] = await Promise.all([
          this.fetchCollection("visitor_logs", "createdAt", 50),
          this.fetchCollection("feedback", "created", 50),
          this.fetchCollection("analytics", null, 50)
        ]);

        this.visitors = visitors;
        this.feedback = feedback;
        this.analytics = analytics;
      } catch (error) {
        console.error("Fetch Firestore data error:", error);
        this.errorMessage =
          "Unable to load Firestore data. Check admin UID and Firestore rules.";
      } finally {
        this.loading = false;
      }
    },

    async fetchCollection(collectionName, orderField = null, maxLimit = 50) {
      const ref = collection(db, collectionName);

      let collectionQuery;

      if (orderField) {
        collectionQuery = query(
          ref,
          orderBy(orderField, "desc"),
          limit(maxLimit)
        );
      } else {
        collectionQuery = query(ref, limit(maxLimit));
      }

      const snapshot = await getDocs(collectionQuery);

      return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
      }));
    },

    resetVisibleLimits() {
      this.visibleLimits = {
        visitors: this.defaultVisibleLimit,
        feedback: this.defaultVisibleLimit,
        analytics: this.defaultVisibleLimit
      };
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

.admin-page {
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  padding: clamp(8px, 2vw, 18px);
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.16), transparent 34%),
    linear-gradient(135deg, #0f172a, #111827);
  color: #f8fafc;
}

.admin-shell {
  container-type: inline-size;
  width: 100%;
  max-width: 1480px;
  min-height: calc(100vh - 36px);
  margin: 0 auto;
  padding: clamp(14px, 3vw, 22px);
  border-radius: clamp(18px, 3vw, 26px);
  background: rgba(15, 23, 42, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(18px);
  overflow: hidden;
}

.back-link {
  width: fit-content;
  max-width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: clamp(14px, 2vw, 18px);
  padding: 9px 14px;
  border-radius: 999px;
  color: #bbf7d0;
  text-decoration: none;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(134, 239, 172, 0.18);
  font-size: 0.82rem;
  font-weight: 800;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.back-link:hover {
  transform: translateY(-1px);
  color: #dcfce7;
  background: rgba(34, 197, 94, 0.16);
  border-color: rgba(134, 239, 172, 0.28);
}

.admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: clamp(16px, 3vw, 20px);
}

.eyebrow {
  display: inline-block;
  margin-bottom: 8px;
  color: #86efac;
  font-size: clamp(0.66rem, 1.2vw, 0.72rem);
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.admin-header h1 {
  margin: 0;
  font-size: clamp(1.55rem, 4vw, 2.35rem);
  letter-spacing: -0.05em;
  line-height: 1;
}

.admin-header p {
  margin: 8px 0 0;
  color: rgba(248, 250, 252, 0.56);
  font-size: 0.82rem;
  word-break: break-word;
}

.login-box,
.blocked-box {
  max-width: 460px;
  padding: clamp(20px, 3vw, 24px);
  border-radius: clamp(18px, 3vw, 22px);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.blocked-box {
  text-align: center;
  margin: 24px auto 0;
  background:
    radial-gradient(circle at top, rgba(248, 113, 113, 0.16), transparent 42%),
    rgba(255, 255, 255, 0.06);
}

.blocked-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border-radius: 20px;
  color: #fecdd3;
  background: rgba(244, 63, 94, 0.16);
  border: 1px solid rgba(244, 63, 94, 0.22);
  font-size: 1.25rem;
}

.login-box h2,
.blocked-box h2 {
  margin: 0 0 8px;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
}

.login-box p,
.blocked-box p {
  margin: 0 0 16px;
  color: rgba(248, 250, 252, 0.68);
  line-height: 1.55;
}

.primary-btn,
.logout-btn,
.refresh-btn,
.show-more-btn {
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 900;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.85rem;
}

.primary-btn {
  color: #052e16;
  background: #86efac;
}

.primary-btn:hover,
.refresh-btn:hover,
.show-more-btn:hover {
  transform: translateY(-1px);
  background: #bbf7d0;
}

.logout-btn {
  color: #fee2e2;
  background: rgba(239, 68, 68, 0.18);
  white-space: nowrap;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.26);
}

.refresh-btn,
.show-more-btn {
  color: #052e16;
  background: #86efac;
  white-space: nowrap;
}

.show-more-btn {
  width: 100%;
}

.show-more-btn.secondary {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.08);
}

.admin-layout {
  display: grid;
  grid-template-columns: clamp(230px, 24vw, 290px) minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.admin-sidebar {
  display: block;
  position: sticky;
  top: 18px;
}

.sidebar-card {
  min-height: calc(100vh - 150px);
  padding: 16px;
  border-radius: 22px;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.12), transparent 42%),
    rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-nav {
  display: grid;
  gap: 8px;
}

.sidebar-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 16px;
  color: rgba(248, 250, 252, 0.74);
  background: transparent;
  cursor: pointer;
  transition: 0.2s ease;
  font-size: 0.82rem;
  font-weight: 900;
}

.sidebar-link span {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.sidebar-link i {
  width: 17px;
  color: #86efac;
}

.sidebar-link small {
  min-width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.12);
  font-size: 0.68rem;
  font-weight: 900;
}

.sidebar-link:hover,
.sidebar-link.active {
  color: #f8fafc;
  background: rgba(34, 197, 94, 0.13);
  border-color: rgba(134, 239, 172, 0.18);
}

.sidebar-summary {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}

.sidebar-summary div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 15px;
  background: rgba(15, 23, 42, 0.5);
}

.sidebar-summary i {
  color: #86efac;
  font-size: 1.05rem;
}

.sidebar-summary span {
  text-align: right;
}

.sidebar-summary small {
  display: block;
  margin-top: 3px;
  color: rgba(248, 250, 252, 0.52);
  font-size: 0.68rem;
}

.sidebar-summary strong {
  font-size: 1.08rem;
}

.admin-content {
  min-width: 0;
}

.tabs-wrap {
  display: none;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 2vw, 12px);
  margin-bottom: 16px;
}

.stat-box {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: clamp(12px, 2vw, 16px);
  border-radius: clamp(15px, 2vw, 18px);
  background: rgba(255, 255, 255, 0.06);
  transition: transform 0.2s ease;
}

.stat-box:hover {
  transform: translateY(-2px);
}

.stat-box i {
  flex: 0 0 auto;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: #86efac;
  opacity: 0.86;
}

.stat-box div {
  min-width: 0;
  text-align: right;
}

.stat-box span {
  display: block;
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-weight: 900;
  line-height: 1.1;
}

.stat-box small {
  color: rgba(248, 250, 252, 0.62);
  font-size: clamp(0.66rem, 1.2vw, 0.76rem);
  line-height: 1.25;
}

.graphs-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 2vw, 12px);
  margin-bottom: 16px;
}

.graph-card {
  min-width: 0;
  padding: clamp(13px, 2vw, 16px);
  border-radius: clamp(18px, 2vw, 20px);
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.graph-card.wide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.graph-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.graph-head h2 {
  margin: 0;
  font-size: clamp(0.9rem, 1.5vw, 0.98rem);
  letter-spacing: -0.02em;
}

.graph-head p {
  margin: 5px 0 0;
  color: rgba(248, 250, 252, 0.54);
  font-size: clamp(0.7rem, 1.2vw, 0.74rem);
}

.graph-empty {
  padding: 13px;
  border-radius: 14px;
  color: rgba(248, 250, 252, 0.56);
  background: rgba(15, 23, 42, 0.55);
  font-size: 0.78rem;
}

.bar-list {
  display: grid;
  gap: 12px;
}

.bar-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.bar-meta span {
  min-width: 0;
  color: rgba(248, 250, 252, 0.78);
  font-size: 0.78rem;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bar-meta strong {
  color: #bbf7d0;
  font-size: 0.78rem;
}

.bar-track {
  height: 9px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.7);
}

.bar-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #86efac, #22c55e);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.28);
  transition: width 0.25s ease;
}

.rate-number {
  color: #fecdd3;
  font-size: 1.4rem;
  font-weight: 900;
}

.donut-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.donut {
  width: clamp(82px, 10vw, 94px);
  height: clamp(82px, 10vw, 94px);
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  position: relative;
}

.donut::before {
  content: "";
  position: absolute;
  inset: 11px;
  border-radius: 50%;
  background: #111827;
}

.donut span {
  position: relative;
  z-index: 1;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 900;
}

.donut-info {
  flex: 1;
  display: grid;
  gap: 9px;
}

.donut-info div {
  padding: 10px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.55);
}

.donut-info small {
  display: block;
  margin-bottom: 4px;
  color: rgba(248, 250, 252, 0.52);
  font-size: 0.68rem;
}

.donut-info strong {
  font-size: 0.95rem;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}

.search-wrap {
  flex: 1;
  min-width: 0;
  position: relative;
  display: flex;
  align-items: center;
}

.search-wrap i {
  position: absolute;
  left: 14px;
  color: rgba(248, 250, 252, 0.42);
  font-size: 0.85rem;
  pointer-events: none;
}

.search-wrap input {
  width: 100%;
  min-width: 0;
  padding: 12px 14px 12px 40px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.06);
  outline: none;
  font-size: 0.85rem;
}

.search-wrap input::placeholder {
  color: rgba(248, 250, 252, 0.42);
}

.result-info {
  margin: 0 0 14px;
  color: rgba(248, 250, 252, 0.54);
  font-size: 0.78rem;
}

.data-list {
  display: grid;
  gap: 12px;
}

.data-card {
  min-width: 0;
  padding: clamp(13px, 2vw, 15px);
  border-radius: clamp(18px, 2vw, 20px);
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: border-color 0.2s ease;
}

.data-card:hover {
  border-color: rgba(134, 239, 172, 0.2);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: clamp(10px, 2vw, 14px);
  margin-bottom: 13px;
}

.card-title {
  min-width: 0;
}

.card-title h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: clamp(0.9rem, 1.5vw, 0.98rem);
  line-height: 1.35;
  word-break: break-word;
}

.card-title h3 i {
  color: #86efac;
  font-size: 0.85rem;
}

.card-title p {
  margin: 5px 0 0;
  color: rgba(248, 250, 252, 0.62);
  font-size: clamp(0.75rem, 1.3vw, 0.82rem);
  line-height: 1.45;
  word-break: break-word;
}

.status-pill {
  height: fit-content;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 900;
  white-space: nowrap;
}

.status-pill.success,
.status-pill.feedback-pill,
.status-pill.analytics-pill {
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.14);
}

.status-pill.danger {
  color: #fecdd3;
  background: rgba(244, 63, 94, 0.16);
}

.status-pill i {
  font-size: 0.65rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
  padding: 11px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.55);
}

.info-item i {
  flex: 0 0 auto;
  color: #86efac;
  font-size: 0.75rem;
  margin-top: 2px;
  opacity: 0.7;
}

.info-item div {
  min-width: 0;
}

.info-item small {
  display: block;
  margin-bottom: 5px;
  color: rgba(248, 250, 252, 0.52);
  font-size: 0.68rem;
}

.info-item strong {
  display: block;
  font-size: clamp(0.76rem, 1.3vw, 0.8rem);
  line-height: 1.35;
  word-break: break-word;
}

.info-item strong.mono {
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 0.75rem;
}

.asn-tag {
  color: #86efac;
  font-weight: 800;
}

.feedback-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.message-box {
  position: relative;
  margin-bottom: 12px;
  padding: 13px 13px 13px 30px;
  border-radius: 15px;
  color: rgba(248, 250, 252, 0.82);
  background: rgba(15, 23, 42, 0.55);
  font-size: 0.86rem;
  line-height: 1.5;
  word-break: break-word;
}

.message-box i {
  position: absolute;
  left: 12px;
  top: 14px;
  color: #86efac;
  opacity: 0.5;
  font-size: 0.8rem;
}

.technical-details {
  margin-top: 12px;
}

.technical-details summary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #86efac;
  font-size: 0.8rem;
  font-weight: 900;
  padding: 4px 0;
}

.technical-details summary i {
  font-size: 0.7rem;
}

.technical-details pre {
  overflow: auto;
  max-height: 260px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(2, 6, 23, 0.7);
  color: #d1fae5;
  font-size: 0.7rem;
  white-space: pre-wrap;
  word-break: break-word;
  margin-top: 8px;
}

.list-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 14px 0 2px;
}

.loading-state,
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 180px;
  padding: 40px 20px;
  color: rgba(248, 250, 252, 0.72);
  font-size: 0.9rem;
  text-align: center;
}

.empty-state {
  flex-direction: column;
}

.empty-state i {
  font-size: 2rem;
  opacity: 0.5;
}

.error-text {
  color: #fecdd3;
  margin-top: 12px;
  line-height: 1.5;
}

/* Normal responsive */
@media (max-width: 1250px) {
  .graphs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1024px) {
  .admin-layout {
    grid-template-columns: 240px minmax(0, 1fr);
  }

  .stats-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    display: none;
  }

  .tabs-wrap {
    display: grid;
  }
}

/* Container responsive: ito ang fix kapag narrow yung admin panel kahit desktop viewport */
@container (max-width: 900px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    display: none;
  }

  .tabs-wrap {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 14px;
  }

  .tab-btn {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 11px 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    color: rgba(248, 250, 252, 0.72);
    background: rgba(255, 255, 255, 0.055);
    cursor: pointer;
    transition: 0.2s ease;
  }

  .tab-btn i {
    color: #86efac;
    flex-shrink: 0;
  }

  .tab-btn span {
    flex: 1;
    min-width: 0;
    text-align: left;
    font-size: 0.84rem;
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tab-btn small {
    min-width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    color: #bbf7d0;
    background: rgba(34, 197, 94, 0.12);
    font-size: 0.68rem;
    font-weight: 900;
  }

  .tab-btn.active {
    color: #f8fafc;
    background: rgba(34, 197, 94, 0.14);
    border-color: rgba(134, 239, 172, 0.22);
  }

  .stats-row,
  .graphs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@container (max-width: 620px) {
  .admin-page {
    padding: 8px;
  }

  .admin-shell {
    min-height: calc(100vh - 16px);
    padding: 14px;
    border-radius: 18px;
  }

  .admin-header {
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  .admin-header h1 {
    font-size: 1.55rem;
  }

  .admin-header p {
    display: none;
  }

  .back-link {
    max-width: 100%;
    margin-bottom: 12px;
    padding: 8px 12px;
    font-size: 0.74rem;
  }

  .logout-btn {
    width: 38px;
    height: 38px;
    padding: 0;
    border-radius: 50%;
  }

  .logout-btn span {
    display: none;
  }

  .tabs-wrap {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .tab-btn {
    min-height: 44px;
  }

  .stats-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .stat-box {
    min-height: 82px;
    align-items: flex-start;
    flex-direction: column;
    padding: 12px;
  }

  .stat-box div {
    width: 100%;
    text-align: left;
  }

  .stat-box i {
    font-size: 1.05rem;
  }

  .stat-box span {
    font-size: 1.25rem;
  }

  .stat-box small {
    display: block;
    font-size: 0.67rem;
  }

  .graphs-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .donut-row {
    flex-direction: row;
    align-items: center;
  }

  .toolbar {
    flex-direction: column;
    gap: 8px;
  }

  .refresh-btn {
    width: 100%;
  }

  .info-grid,
  .feedback-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .card-top {
    flex-direction: column;
    gap: 10px;
  }

  .status-pill {
    width: fit-content;
  }

  .list-actions {
    flex-direction: column;
  }
}

@container (max-width: 430px) {
  .admin-page {
    padding: 6px;
  }

  .admin-shell {
    padding: 12px;
    border-radius: 16px;
  }

  .eyebrow {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
  }

  .admin-header h1 {
    font-size: 1.35rem;
  }

  .tabs-wrap {
    gap: 7px;
  }

  .tab-btn {
    padding: 10px;
    border-radius: 14px;
  }

  .tab-btn span {
    font-size: 0.8rem;
  }

  .stats-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat-box {
    min-height: 78px;
    padding: 10px;
    border-radius: 15px;
  }

  .stat-box span {
    font-size: 1.1rem;
  }

  .graph-card,
  .data-card {
    border-radius: 16px;
  }

  .donut-row {
    flex-direction: column;
    align-items: stretch;
  }

  .donut {
    margin: 0 auto;
  }

  .card-title h3 {
    font-size: 0.86rem;
  }

  .card-title p {
    font-size: 0.74rem;
  }

  .info-item {
    padding: 9px;
  }

  .login-box,
  .blocked-box {
    padding: 18px;
    border-radius: 16px;
    margin: 16px auto 0;
  }
}
</style>