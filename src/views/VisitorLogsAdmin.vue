<template>
  <main class="admin-page">
    <section class="admin-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="admin-header">
        <div>
          <span class="eyebrow">Private Admin Panel</span>
          <h1>Dashboard</h1>
          <p v-if="user">Signed in as {{ user.email }}</p>
        </div>

        <button v-if="user" class="logout-btn" @click="logout">
          Logout
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
                <small>Total Visitors</small>
                <strong>{{ visitorStats.total }}</strong>
              </div>

              <div>
                <small>Unique Devices</small>
                <strong>{{ visitorStats.unique }}</strong>
              </div>

              <div>
                <small>Ad Blockers</small>
                <strong>{{ visitorStats.adBlockers }}</strong>
              </div>

              <div>
                <small>Feedback</small>
                <strong>{{ feedbackStats.total }}</strong>
              </div>

              <div>
                <small>Analytics Docs</small>
                <strong>{{ analyticsStats.total }}</strong>
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
              <span>{{ visitorStats.total }}</span>
              <small>Visitors</small>
            </div>

            <div class="stat-box">
              <span>{{ visitorStats.unique }}</span>
              <small>Unique Devices</small>
            </div>

            <div class="stat-box">
              <span>{{ feedbackStats.total }}</span>
              <small>Feedback</small>
            </div>

            <div class="stat-box">
              <span>{{ analyticsStats.total }}</span>
              <small>Analytics Docs</small>
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
            <input
              v-model="search"
              type="text"
              :placeholder="searchPlaceholder"
            />

            <button class="refresh-btn" @click="fetchAllData">
              Refresh
            </button>
          </div>

          <div v-if="!loading && currentFilteredItems.length" class="result-info">
            Showing {{ currentVisibleItems.length }} of {{ currentFilteredItems.length }}
            {{ activeTabLabel }}
          </div>

          <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

          <div v-if="loading" class="loading-state">
            Loading Firestore data...
          </div>

          <div v-else-if="currentFilteredItems.length === 0" class="empty-state">
            No {{ activeTabLabel }} found.
          </div>

          <div v-else-if="activeTab === 'visitors'" class="data-list">
            <article
              v-for="visitor in currentVisibleItems"
              :key="visitor.id"
              class="data-card"
            >
              <div class="card-top">
                <div class="card-title">
                  <h3>{{ visitor.deviceType }} • {{ visitor.browserName }}</h3>
                  <p>
                    {{ visitor.operatingSystem }} •
                    {{ visitor.network?.isp || "Unknown ISP" }}
                  </p>
                </div>

                <span
                  class="status-pill"
                  :class="{ danger: visitor.adBlocker === 'Detected' }"
                >
                  {{ visitor.adBlocker || "Unknown" }}
                </span>
              </div>

              <div class="info-grid">
                <div>
                  <small>Location</small>
                  <strong>
                    {{ visitor.network?.city || "Unknown" }},
                    {{ visitor.network?.country || "Unknown" }}
                  </strong>
                </div>

                <div>
                  <small>IP Address</small>
                  <strong>{{ visitor.network?.ipAddress || "Unavailable" }}</strong>
                </div>

                <div>
                  <small>ISP / ASN</small>
                  <strong>
                    {{ visitor.network?.isp || "Unknown" }}
                    <span v-if="visitor.network?.asn">• {{ visitor.network.asn }}</span>
                  </strong>
                </div>

                <div>
                  <small>Page</small>
                  <strong>{{ visitor.path || "/" }}</strong>
                </div>

                <div>
                  <small>Screen</small>
                  <strong>
                    {{ visitor.screen?.width || 0 }} × {{ visitor.screen?.height || 0 }}
                  </strong>
                </div>

                <div>
                  <small>Visited</small>
                  <strong>{{ formatDate(visitor.createdAt) }}</strong>
                </div>
              </div>

              <details class="technical-details">
                <summary>View technical details</summary>
                <pre>{{ visitor }}</pre>
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
                  <h3>{{ item.name || item.displayName || "Anonymous" }}</h3>
                  <p>{{ item.email || "No email" }}</p>
                </div>

                <span class="status-pill">
                  Feedback
                </span>
              </div>

              <div class="message-box">
                {{ item.message || "No message content." }}
              </div>

              <div class="info-grid feedback-grid">
                <div>
                  <small>Created</small>
                  <strong>{{ formatDate(item.created || item.createdAt) }}</strong>
                </div>

                <div>
                  <small>Document ID</small>
                  <strong>{{ item.id }}</strong>
                </div>
              </div>

              <details class="technical-details">
                <summary>View raw data</summary>
                <pre>{{ item }}</pre>
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
                  <h3>{{ item.id }}</h3>
                  <p>Analytics document</p>
                </div>

                <span class="status-pill">
                  Analytics
                </span>
              </div>

              <div class="info-grid">
                <div>
                  <small>Views</small>
                  <strong>{{ item.views ?? item.count ?? item.total ?? "N/A" }}</strong>
                </div>

                <div>
                  <small>Created</small>
                  <strong>{{ formatDate(item.createdAt || item.created) }}</strong>
                </div>

                <div>
                  <small>Updated</small>
                  <strong>{{ formatDate(item.updatedAt || item.updated) }}</strong>
                </div>
              </div>

              <details class="technical-details" open>
                <summary>View analytics data</summary>
                <pre>{{ item }}</pre>
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
              Show More
            </button>

            <button
              v-else
              class="show-more-btn secondary"
              @click="showLess"
            >
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
.admin-page {
  min-height: 100vh;
  padding: 18px;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.16), transparent 34%),
    linear-gradient(135deg, #0f172a, #111827);
  color: #f8fafc;
}

.admin-shell {
  width: 100%;
  min-height: calc(100vh - 36px);
  padding: 22px;
  border-radius: 26px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(18px);
}

.back-link {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  padding: 10px 14px;
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

.back-link i {
  font-size: 0.78rem;
}

.admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 8px;
  color: #86efac;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.admin-header h1 {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.35rem);
  letter-spacing: -0.04em;
}

.admin-header p {
  margin: 6px 0 0;
  color: rgba(248, 250, 252, 0.56);
  font-size: 0.82rem;
}

.login-box,
.blocked-box {
  max-width: 460px;
  padding: 24px;
  border-radius: 22px;
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
}

.login-box p,
.blocked-box p {
  margin: 0 0 16px;
  color: rgba(248, 250, 252, 0.68);
}

.primary-btn,
.logout-btn,
.refresh-btn,
.show-more-btn {
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  color: #052e16;
  background: #86efac;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
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
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.26);
}

.admin-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
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
}

.sidebar-link span {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  font-size: 0.82rem;
  font-weight: 800;
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
  padding: 12px;
  border-radius: 15px;
  background: rgba(15, 23, 42, 0.5);
}

.sidebar-summary small {
  display: block;
  margin-bottom: 4px;
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
  gap: 12px;
  margin-bottom: 16px;
}

.stat-box {
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
}

.stat-box span {
  display: block;
  font-size: 1.5rem;
  font-weight: 900;
}

.stat-box small {
  color: rgba(248, 250, 252, 0.62);
  font-size: 0.76rem;
}

.graphs-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.graph-card {
  min-width: 0;
  padding: 16px;
  border-radius: 20px;
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
  font-size: 0.98rem;
  letter-spacing: -0.02em;
}

.graph-head p {
  margin: 5px 0 0;
  color: rgba(248, 250, 252, 0.54);
  font-size: 0.74rem;
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
  font-weight: 700;
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
  width: 94px;
  height: 94px;
  flex: 0 0 94px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  position: relative;
}

.donut::before {
  content: "";
  position: absolute;
  inset: 12px;
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

.toolbar input {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.06);
  outline: none;
}

.toolbar input::placeholder {
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
  padding: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 13px;
}

.card-title {
  min-width: 0;
}

.card-title h3 {
  margin: 0;
  font-size: 0.98rem;
  word-break: break-word;
}

.card-title p {
  margin: 5px 0 0;
  color: rgba(248, 250, 252, 0.62);
  font-size: 0.82rem;
  word-break: break-word;
}

.status-pill {
  height: fit-content;
  flex: 0 0 auto;
  padding: 6px 10px;
  border-radius: 999px;
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.14);
  font-size: 0.7rem;
  font-weight: 800;
  white-space: nowrap;
}

.status-pill.danger {
  color: #fecdd3;
  background: rgba(244, 63, 94, 0.16);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.info-grid div {
  min-width: 0;
  padding: 11px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.55);
}

.info-grid small {
  display: block;
  margin-bottom: 5px;
  color: rgba(248, 250, 252, 0.52);
  font-size: 0.68rem;
}

.info-grid strong {
  display: block;
  font-size: 0.8rem;
  line-height: 1.35;
  word-break: break-word;
}

.feedback-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.message-box {
  margin-bottom: 12px;
  padding: 13px;
  border-radius: 15px;
  color: rgba(248, 250, 252, 0.82);
  background: rgba(15, 23, 42, 0.55);
  font-size: 0.86rem;
  line-height: 1.5;
  word-break: break-word;
}

.technical-details {
  margin-top: 12px;
}

.technical-details summary {
  cursor: pointer;
  color: #86efac;
  font-size: 0.8rem;
  font-weight: 800;
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
}

.list-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 14px 0 2px;
}

.show-more-btn.secondary {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.08);
}

.loading-state,
.empty-state,
.error-text {
  color: rgba(248, 250, 252, 0.72);
}

.error-text {
  color: #fecdd3;
}

@media (max-width: 1250px) {
  .graphs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .graph-card.wide {
    grid-column: span 1;
  }
}

@media (max-width: 1024px) {
  .admin-layout {
    grid-template-columns: 240px minmax(0, 1fr);
  }

  .stats-row {
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
  }

  .tab-btn span {
    flex: 1;
    min-width: 0;
    text-align: left;
    font-size: 0.84rem;
    font-weight: 800;
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
}

@media (max-width: 820px) {
  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .feedback-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .admin-page {
    padding: 12px;
  }

  .admin-shell {
    min-height: calc(100vh - 24px);
    padding: 16px;
    border-radius: 20px;
  }

  .back-link {
    margin-bottom: 14px;
    padding: 9px 12px;
    font-size: 0.76rem;
  }

  .admin-header {
    align-items: center;
    margin-bottom: 16px;
  }

  .admin-header h1 {
    font-size: 1.45rem;
  }

  .admin-header p {
    display: none;
  }

  .eyebrow {
    font-size: 0.66rem;
  }

  .logout-btn {
    padding: 8px 12px;
    font-size: 0.78rem;
  }

  .tabs-wrap {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .tab-btn {
    padding: 10px 11px;
  }

  .stats-row,
  .graphs-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .stat-box {
    padding: 12px 10px;
    border-radius: 15px;
  }

  .stat-box span {
    font-size: 1.2rem;
  }

  .stat-box small {
    font-size: 0.66rem;
  }

  .graph-card {
    padding: 13px;
    border-radius: 18px;
  }

  .graph-head h2 {
    font-size: 0.9rem;
  }

  .graph-head p {
    font-size: 0.7rem;
  }

  .donut-row {
    align-items: stretch;
  }

  .donut {
    width: 82px;
    height: 82px;
    flex-basis: 82px;
  }

  .donut::before {
    inset: 10px;
  }

  .toolbar {
    flex-direction: column;
    gap: 9px;
  }

  .toolbar input,
  .refresh-btn {
    width: 100%;
  }

  .data-card {
    padding: 13px;
    border-radius: 18px;
  }

  .card-top {
    gap: 10px;
    margin-bottom: 12px;
  }

  .card-title h3 {
    font-size: 0.9rem;
  }

  .card-title p {
    font-size: 0.75rem;
  }

  .status-pill {
    padding: 5px 8px;
    font-size: 0.64rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .info-grid div {
    padding: 10px;
  }

  .info-grid strong {
    font-size: 0.76rem;
  }

  .login-box,
  .blocked-box {
    max-width: 100%;
    padding: 20px;
    border-radius: 18px;
  }
}

@media (max-width: 420px) {
  .admin-page {
    padding: 10px;
  }

  .admin-shell {
    padding: 14px;
  }

  .stat-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stat-box span {
    font-size: 1.15rem;
  }

  .donut-row {
    flex-direction: column;
  }

  .donut {
    margin: 0 auto;
  }

  .card-top {
    flex-direction: column;
  }

  .status-pill {
    width: fit-content;
  }

  .list-actions {
    flex-direction: column;
  }

  .show-more-btn {
    width: 100%;
  }
}
</style>