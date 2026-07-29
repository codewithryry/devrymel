<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->
<template>
  <main class="admin-page">
    <div v-if="blockedAccess" class="auth-screen">
      <div class="auth-card">
        <div class="auth-icon danger">
          <i class="fas fa-lock"></i>
        </div>

        <h2>Oh no, this is not for you.</h2>
        <p>This dashboard is restricted to the site owner only.</p>

        <button class="primary-btn" @click="resetLogin">Back to Login</button>
      </div>
    </div>

    <div v-else-if="!user" class="auth-screen">
      <div class="auth-glow auth-glow-a"></div>
      <div class="auth-glow auth-glow-b"></div>

      <div class="auth-card">
        <div class="auth-icon">
          <i class="fas fa-layer-group"></i>
        </div>

        <span class="eyebrow">Private Admin Panel</span>
        <h2>Devrymel CMS</h2>
        <p>Sign in with your admin Google account to manage your portfolio content.</p>

        <button class="google-btn" @click="loginWithGoogle">
          <i class="fab fa-google"></i>
          Sign in with Google
        </button>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <ul class="auth-feature-list">
          <li><i class="fas fa-folder"></i> Manage Projects</li>
          <li><i class="fas fa-layer-group"></i> Edit Site Content</li>
          <li><i class="fas fa-chart-pie"></i> View Visitor Insights</li>
        </ul>
      </div>

      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>
    </div>

    <div v-else class="admin-shell">
      <aside class="sidebar" :class="{ 'mobile-open': mobileNavOpen }">
        <div class="brand">
          <span class="brand-icon">
            <i class="fas fa-layer-group"></i>
          </span>
          <div>
            <strong>Devrymel</strong>
            <small>Admin CMS</small>
          </div>

          <button
            type="button"
            class="mobile-nav-toggle"
            :aria-expanded="mobileNavOpen"
            @click="mobileNavOpen = !mobileNavOpen"
          >
            <i class="fas" :class="mobileNavOpen ? 'fa-times' : 'fa-bars'"></i>
          </button>
        </div>

        <nav class="side-nav" v-show="!isMobileView || mobileNavOpen">
          <small class="nav-group-label">Portfolio</small>

          <button
            v-for="item in navItems"
            :key="item.id"
            type="button"
            class="side-link"
            :class="{ active: activeSection === 'projects' && activeFilter === item.id }"
            @click="selectProjectsFilter(item.id)"
          >
            <span>
              <i :class="item.icon"></i>
              {{ item.label }}
            </span>
            <small>{{ item.count }}</small>
          </button>

          <small class="nav-group-label">Site Content</small>

          <button
            v-for="section in contentSections"
            :key="section.key"
            type="button"
            class="side-link"
            :class="{ active: activeSection === section.key }"
            @click="selectSection(section.key)"
          >
            <span>
              <i :class="section.icon"></i>
              {{ section.label }}
            </span>
          </button>

          <small class="nav-group-label">Insights</small>

          <button
            v-for="insight in insightSections"
            :key="insight.key"
            type="button"
            class="side-link"
            :class="{ active: activeSection === insight.key }"
            @click="selectSection(insight.key)"
          >
            <span>
              <i :class="insight.icon"></i>
              {{ insight.label }}
            </span>
          </button>
        </nav>

        <div class="side-footer" v-show="!isMobileView || mobileNavOpen">
          <router-link to="/" class="side-back">
            <i class="fas fa-arrow-left"></i>
            Back to Portfolio
          </router-link>

          <div class="user-card">
            <div class="user-card-top">
              <div class="user-avatar">
                <img v-if="user.photoURL" :src="user.photoURL" :alt="user.email" />
                <i v-else class="fas fa-user"></i>
              </div>
              <div class="user-info">
                <strong>{{ user.displayName || "Admin" }}</strong>
                <small>{{ user.email }}</small>
              </div>
            </div>

            <button class="logout-btn" @click="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <section class="content">
        <VisitorAnalyticsPanel
          v-if="insightKeys.includes(activeSection)"
          :mode="activeSection"
        />

        <ContentSectionEditor
          v-else-if="activeSection !== 'projects'"
          :section-key="activeSection"
        />

        <template v-else>
        <header class="topbar">
          <div>
            <h1>{{ activeFilterLabel }}</h1>
            <p>Manage the projects shown on your public portfolio.</p>
          </div>

          <div class="topbar-actions">
            <button
              v-if="!projects.length && !loading"
              class="ghost-btn"
              :disabled="importing"
              @click="importLegacyProjects"
            >
              <i class="fas" :class="importing ? 'fa-spinner fa-spin' : 'fa-file-import'"></i>
              <span>{{ importing ? "Importing..." : "Import Existing Projects" }}</span>
            </button>

            <button class="primary-btn" @click="openCreateForm">
              <i class="fas fa-plus"></i>
              New Project
            </button>
          </div>
        </header>

        <div class="stats-row">
          <div class="stat-card">
            <span class="stat-icon total"><i class="fas fa-folder"></i></span>
            <div>
              <strong>{{ projects.length }}</strong>
              <small>Total Projects</small>
            </div>
          </div>

          <div class="stat-card">
            <span class="stat-icon published"><i class="fas fa-check-circle"></i></span>
            <div>
              <strong>{{ publishedCount }}</strong>
              <small>Published</small>
            </div>
          </div>

          <div class="stat-card">
            <span class="stat-icon draft"><i class="fas fa-pen"></i></span>
            <div>
              <strong>{{ draftCount }}</strong>
              <small>Drafts</small>
            </div>
          </div>

          <div class="stat-card">
            <span class="stat-icon featured"><i class="fas fa-star"></i></span>
            <div>
              <strong>{{ featuredCount }}</strong>
              <small>Featured</small>
            </div>
          </div>
        </div>

        <div class="search-row">
          <div class="search-wrap">
            <i class="fas fa-search"></i>
            <input v-model="search" type="text" placeholder="Search projects by title, category, tech..." />
          </div>
        </div>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        <p v-if="statusMessage" class="status-text">{{ statusMessage }}</p>

        <div v-if="loading" class="loading-state">
          <i class="fas fa-spinner fa-spin"></i>
          Loading projects...
        </div>

        <div v-else-if="!projects.length" class="empty-state">
          <i class="fas fa-folder-open"></i>
          <p>No projects yet. Create your first one.</p>
        </div>

        <div v-else-if="!filteredProjects.length" class="empty-state">
          <i class="fas fa-search"></i>
          <p>No projects match this view.</p>
        </div>

        <div v-else class="project-list">
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="project-row"
            :draggable="!search"
            :class="{ dragging: dragIndex === index }"
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver(index)"
            @drop.prevent="onDrop(index)"
            @dragend="onDragEnd"
          >
            <div class="drag-handle" :class="{ disabled: !!search }">
              <i class="fas fa-grip-vertical"></i>
            </div>

            <div class="project-thumb">
              <img v-if="project.image" :src="project.image" :alt="project.title" />
              <i v-else class="fas fa-image"></i>
            </div>

            <div class="project-meta">
              <h3>
                {{ project.title }}
                <span v-if="project.featured" class="badge featured">
                  <i class="fas fa-star"></i> Featured
                </span>
                <span
                  class="badge"
                  :class="project.status === 'published' ? 'published' : 'draft'"
                >
                  {{ project.status === "published" ? "Published" : "Draft" }}
                </span>
              </h3>
              <p>{{ project.category || "Uncategorized" }} • {{ project.description }}</p>
            </div>

            <div class="project-actions">
              <button
                class="icon-btn"
                :title="project.status === 'published' ? 'Set as draft' : 'Publish'"
                @click="toggleStatus(project)"
              >
                <i class="fas" :class="project.status === 'published' ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>

              <button
                class="icon-btn"
                :title="project.featured ? 'Unfeature' : 'Mark as featured'"
                @click="toggleFeatured(project)"
              >
                <i class="fas fa-star" :class="{ active: project.featured }"></i>
              </button>

              <button class="icon-btn" title="Edit" @click="openEditForm(project)">
                <i class="fas fa-pen"></i>
              </button>

              <button class="icon-btn danger" title="Delete" @click="confirmDelete(project)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </article>
        </div>
        </template>
      </section>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal-box">
        <div class="modal-head">
          <h2>{{ editingId ? "Edit Project" : "New Project" }}</h2>
          <button class="icon-btn" @click="closeForm">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form class="project-form" @submit.prevent="saveProject">
          <label>
            Title
            <input v-model="form.title" type="text" required placeholder="Project name" />
          </label>

          <label>
            Category
            <input v-model="form.category" type="text" placeholder="e.g. Web App, Mobile" />
          </label>

          <label>
            Short Description
            <textarea v-model="form.description" rows="2" required placeholder="One-line summary"></textarea>
          </label>

          <label>
            Detailed Description
            <textarea v-model="form.detailedDescription" rows="4" placeholder="Full project description"></textarea>
          </label>

          <label>
            Technologies (comma separated)
            <input v-model="technologiesInput" type="text" placeholder="Vue.js, Firebase, Node.js" />
          </label>

          <label>
            Features (comma separated)
            <input v-model="featuresInput" type="text" placeholder="Realtime sync, Auth, Analytics" />
          </label>

          <div class="form-row">
            <label>
              GitHub Link
              <input v-model="form.githubUrl" type="url" placeholder="https://github.com/..." />
            </label>

            <label>
              Live Demo Link
              <input v-model="form.demoUrl" type="url" placeholder="https://..." />
            </label>
          </div>

          <label>
            Featured Image URL
            <input v-model="form.image" type="url" placeholder="https://..." />
          </label>

          <div v-if="form.image" class="image-preview">
            <img :src="form.image" alt="Preview" />
          </div>

          <div class="form-row">
            <label class="checkbox-label">
              <input v-model="form.featured" type="checkbox" />
              Mark as Featured
            </label>

            <label>
              Save as
              <select v-model="form.status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>

          <p v-if="formError" class="error-text">{{ formError }}</p>

          <div class="modal-actions">
            <button type="button" class="ghost-btn" @click="closeForm">Cancel</button>
            <button type="submit" class="primary-btn" :disabled="saving">
              <i v-if="saving" class="fas fa-spinner fa-spin"></i>
              <span>{{ saving ? "Saving..." : "Save Project" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { auth } from "@/services/firebase";
import {
  subscribeToAllProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects
} from "@/services/projectsService";
import legacyProjects from "@/data/projects.json";
import ContentSectionEditor from "@/components/admin/ContentSectionEditor.vue";
import VisitorAnalyticsPanel from "@/components/admin/VisitorAnalyticsPanel.vue";
import { CONTENT_SECTIONS } from "@/config/contentSchemas";

const ADMIN_UID = "pAwCyoApURZu9aVk4k8tKRHzk7K2";

const EMPTY_FORM = {
  title: "",
  category: "",
  description: "",
  detailedDescription: "",
  githubUrl: "",
  demoUrl: "",
  image: "",
  featured: false,
  status: "draft"
};

export default {
  name: "ProjectsAdminPanel",

  components: { ContentSectionEditor, VisitorAnalyticsPanel },

  data() {
    return {
      user: null,
      blockedAccess: false,
      errorMessage: "",
      statusMessage: "",

      loading: false,
      projects: [],
      unsubscribe: null,

      activeSection: "projects",
      contentSections: CONTENT_SECTIONS,
      insightSections: [
        { key: "visitors", label: "Visitors", icon: "fas fa-users" },
        { key: "feedback", label: "Feedback", icon: "fas fa-comment-dots" },
        { key: "analytics", label: "Analytics", icon: "fas fa-chart-pie" }
      ],
      mobileNavOpen: false,
      isMobileView: false,

      activeFilter: "all",
      search: "",

      dragIndex: null,
      importing: false,

      showForm: false,
      editingId: null,
      form: { ...EMPTY_FORM },
      technologiesInput: "",
      featuresInput: "",
      formError: "",
      saving: false
    };
  },

  computed: {
    insightKeys() {
      return this.insightSections.map((section) => section.key);
    },

    publishedCount() {
      return this.projects.filter((project) => project.status === "published").length;
    },

    draftCount() {
      return this.projects.filter((project) => project.status !== "published").length;
    },

    featuredCount() {
      return this.projects.filter((project) => project.featured).length;
    },

    navItems() {
      return [
        { id: "all", label: "All Projects", icon: "fas fa-th-large", count: this.projects.length },
        { id: "published", label: "Published", icon: "fas fa-check-circle", count: this.publishedCount },
        { id: "draft", label: "Drafts", icon: "fas fa-pen", count: this.draftCount },
        { id: "featured", label: "Featured", icon: "fas fa-star", count: this.featuredCount }
      ];
    },

    activeFilterLabel() {
      const item = this.navItems.find((entry) => entry.id === this.activeFilter);
      return item ? item.label : "Projects";
    },

    filteredProjects() {
      let list = this.projects;

      if (this.activeFilter === "published") {
        list = list.filter((project) => project.status === "published");
      } else if (this.activeFilter === "draft") {
        list = list.filter((project) => project.status !== "published");
      } else if (this.activeFilter === "featured") {
        list = list.filter((project) => project.featured);
      }

      const keyword = this.search.trim().toLowerCase();
      if (!keyword) return list;

      return list.filter((project) => {
        const haystack = [
          project.title,
          project.category,
          project.description,
          ...(project.technologies || [])
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(keyword);
      });
    }
  },

  mounted() {
    this.checkMobileView();
    window.addEventListener("resize", this.checkMobileView);

    onAuthStateChanged(auth, async (currentUser) => {
      this.errorMessage = "";

      if (!currentUser) {
        this.user = null;
        this.stopWatchingProjects();
        return;
      }

      if (currentUser.uid !== ADMIN_UID) {
        this.user = null;
        this.stopWatchingProjects();
        this.blockedAccess = true;

        await signOut(auth);
        return;
      }

      this.blockedAccess = false;
      this.user = currentUser;
      this.watchProjects();
    });
  },

  beforeUnmount() {
    this.stopWatchingProjects();
    window.removeEventListener("resize", this.checkMobileView);
  },

  methods: {
    checkMobileView() {
      this.isMobileView = window.innerWidth <= 900;
    },

    selectSection(sectionKey) {
      this.activeSection = sectionKey;
      this.mobileNavOpen = false;
    },

    selectProjectsFilter(filterId) {
      this.activeSection = "projects";
      this.activeFilter = filterId;
      this.mobileNavOpen = false;
    },

    watchProjects() {
      this.loading = true;

      this.unsubscribe = subscribeToAllProjects(
        (projects) => {
          this.projects = projects;
          this.loading = false;
        },
        () => {
          this.errorMessage = "Unable to load projects. Check Firestore rules.";
          this.loading = false;
        }
      );
    },

    stopWatchingProjects() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }

      this.projects = [];
    },

    async loginWithGoogle() {
      try {
        this.errorMessage = "";
        this.blockedAccess = false;

        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        if (result.user.uid !== ADMIN_UID) {
          this.user = null;
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
      this.errorMessage = "";
      this.blockedAccess = false;
    },

    resetLogin() {
      this.blockedAccess = false;
      this.errorMessage = "";
    },

    flashStatus(message) {
      this.statusMessage = message;
      setTimeout(() => {
        this.statusMessage = "";
      }, 2500);
    },

    openCreateForm() {
      this.editingId = null;
      this.form = { ...EMPTY_FORM };
      this.technologiesInput = "";
      this.featuresInput = "";
      this.formError = "";
      this.showForm = true;
    },

    openEditForm(project) {
      this.editingId = project.id;
      this.form = {
        title: project.title || "",
        category: project.category || "",
        description: project.description || "",
        detailedDescription: project.detailedDescription || "",
        githubUrl: project.githubUrl || "",
        demoUrl: project.demoUrl || "",
        image: project.image || "",
        featured: !!project.featured,
        status: project.status || "draft"
      };
      this.technologiesInput = (project.technologies || []).join(", ");
      this.featuresInput = (project.features || []).join(", ");
      this.formError = "";
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
    },

    parseListInput(value) {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    },

    async saveProject() {
      this.formError = "";
      this.saving = true;

      try {
        const payload = {
          ...this.form,
          technologies: this.parseListInput(this.technologiesInput),
          features: this.parseListInput(this.featuresInput)
        };

        if (this.editingId) {
          await updateProject(this.editingId, payload);
        } else {
          const docRef = await createProject(payload, 0);
          await reorderProjects([{ id: docRef.id }, ...this.projects]);
        }

        this.showForm = false;
        this.flashStatus("Project saved.");
      } catch (error) {
        console.error("Save project error:", error);
        this.formError = "Unable to save project. Check Firestore rules.";
      } finally {
        this.saving = false;
      }
    },

    async toggleStatus(project) {
      const nextStatus = project.status === "published" ? "draft" : "published";

      try {
        await updateProject(project.id, { status: nextStatus });
        this.flashStatus(nextStatus === "published" ? "Project published." : "Project set to draft.");
      } catch (error) {
        console.error("Toggle status error:", error);
        this.errorMessage = "Unable to update project status.";
      }
    },

    async toggleFeatured(project) {
      try {
        await updateProject(project.id, { featured: !project.featured });
      } catch (error) {
        console.error("Toggle featured error:", error);
        this.errorMessage = "Unable to update featured flag.";
      }
    },

    async confirmDelete(project) {
      const confirmed = window.confirm(`Delete "${project.title}"? This cannot be undone.`);
      if (!confirmed) return;

      try {
        await deleteProject(project);
        this.flashStatus("Project deleted.");
      } catch (error) {
        console.error("Delete project error:", error);
        this.errorMessage = "Unable to delete project.";
      }
    },

    async importLegacyProjects() {
      const confirmed = window.confirm(
        `Import ${legacyProjects.length} project(s) from src/data/projects.json into Firestore as published projects?`
      );
      if (!confirmed) return;

      this.importing = true;
      this.errorMessage = "";

      try {
        for (let index = 0; index < legacyProjects.length; index += 1) {
          const legacy = legacyProjects[index];

          await createProject(
            {
              title: legacy.title,
              description: legacy.description,
              detailedDescription: legacy.detailedDescription,
              technologies: legacy.technologies || [],
              features: legacy.features || [],
              category: legacy.role || "",
              githubUrl: legacy.githubUrl || "",
              demoUrl: legacy.demoUrl || "",
              image: legacy.image ? new URL(`../assets/${legacy.image}`, import.meta.url).href : "",
              featured: index === 0,
              status: "published"
            },
            index
          );
        }

        this.flashStatus("Existing projects imported.");
      } catch (error) {
        console.error("Import legacy projects error:", error);
        this.errorMessage = "Unable to import existing projects. Check Firestore rules.";
      } finally {
        this.importing = false;
      }
    },

    onDragStart(index) {
      if (this.search) return;
      this.dragIndex = index;
    },

    onDragOver(index) {
      if (this.dragIndex === null || this.dragIndex === index) return;

      const reordered = [...this.projects];
      const [moved] = reordered.splice(this.dragIndex, 1);
      reordered.splice(index, 0, moved);

      this.projects = reordered;
      this.dragIndex = index;
    },

    async onDrop() {
      try {
        await reorderProjects(this.projects);
      } catch (error) {
        console.error("Reorder projects error:", error);
        this.errorMessage = "Unable to save new order.";
      }
    },

    onDragEnd() {
      this.dragIndex = null;
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
  background: var(--bg, #f8fafc);
  color: var(--text, #0f172a);
  font-family: "Inter", sans-serif;
}

/* ===== Auth screens ===== */
.auth-screen {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
  background: var(--bg, #f8fafc);
}

.auth-glow {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}

.auth-glow-a {
  top: -120px;
  left: -100px;
  background: radial-gradient(circle, var(--accent, #6366f1), transparent 70%);
}

.auth-glow-b {
  bottom: -140px;
  right: -100px;
  background: radial-gradient(circle, #8b5cf6, transparent 70%);
}

.auth-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 36px 30px;
  border-radius: 22px;
  text-align: center;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: var(--shadow-xl, 0 26px 70px rgb(15 23 42 / 0.16));
}

.auth-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  font-size: 1.3rem;
  color: var(--accent, #6366f1);
  background: color-mix(in srgb, var(--accent, #6366f1) 12%, transparent);
}

.auth-icon.danger {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}

.eyebrow {
  display: inline-block;
  margin-bottom: 6px;
  color: var(--accent, #6366f1);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.auth-card h2 {
  margin: 0 0 8px;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
}

.auth-card p {
  margin: 0 0 20px;
  color: var(--text-secondary, #64748b);
  font-size: 0.9rem;
  line-height: 1.5;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px 18px;
  margin-top: 8px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  background: var(--surface, #ffffff);
  color: var(--text, #0f172a);
  font-size: 0.9rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.06));
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.google-btn i {
  color: #ea4335;
}

.google-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow, 0 6px 18px rgb(15 23 42 / 0.1));
}

.auth-feature-list {
  display: grid;
  gap: 8px;
  margin: 22px 0 0;
  padding: 16px;
  border-radius: 14px;
  background: var(--surface-hover, #f1f5f9);
  list-style: none;
  text-align: left;
}

.auth-feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary, #64748b);
  font-size: 0.8rem;
  font-weight: 600;
}

.auth-feature-list i {
  width: 22px;
  color: var(--accent, #6366f1);
  text-align: center;
}

.back-link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary, #64748b);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
}

.back-link:hover {
  color: var(--accent, #6366f1);
}

/* ===== Layout ===== */
.admin-shell {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 20px 16px;
  background: var(--surface, #ffffff);
  border-right: 1px solid var(--border, #e2e8f0);
  position: sticky;
  top: 0;
  height: 100vh;
}

.brand {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px 22px;
}

.brand-icon {
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(135deg, var(--accent, #6366f1), #8b5cf6);
}

.brand strong {
  display: block;
  font-size: 0.92rem;
  letter-spacing: -0.01em;
}

.brand small {
  color: var(--text-muted, #94a3b8);
  font-size: 0.72rem;
}

.side-nav {
  display: grid;
  gap: 4px;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding-right: 2px;
}

.side-nav::-webkit-scrollbar {
  width: 5px;
}

.side-nav::-webkit-scrollbar-thumb {
  background: var(--border, #e2e8f0);
  border-radius: 999px;
}

.nav-group-label {
  margin: 14px 12px 4px;
  color: var(--text-muted, #94a3b8);
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.nav-group-label:first-child {
  margin-top: 0;
}

.side-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 12px;
  border: 0;
  border-radius: 12px;
  color: var(--text-secondary, #64748b);
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  transition: 0.15s ease;
}

.side-link span {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.side-link i {
  width: 16px;
  text-align: center;
  color: var(--text-muted, #94a3b8);
}

.side-link small {
  min-width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: var(--surface-hover, #f1f5f9);
  font-size: 0.68rem;
  font-weight: 800;
}

.side-link:hover {
  color: var(--text, #0f172a);
  background: var(--surface-hover, #f1f5f9);
}

.side-link.active {
  color: var(--accent, #6366f1);
  background: color-mix(in srgb, var(--accent, #6366f1) 10%, transparent);
}

.side-link.active i {
  color: var(--accent, #6366f1);
}

.side-link.active small {
  color: #fff;
  background: var(--accent, #6366f1);
}

.side-footer {
  flex: 0 0 auto;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border, #e2e8f0);
  display: grid;
  gap: 12px;
}

.side-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  color: var(--text-secondary, #64748b);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
}

.side-back:hover {
  background: var(--surface-hover, #f1f5f9);
  color: var(--text, #0f172a);
}

.user-card {
  display: grid;
  gap: 10px;
  padding: 10px;
  border-radius: 14px;
  background: var(--surface-hover, #f1f5f9);
}

.user-card-top {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 9px 10px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 10px;
  background: var(--surface, #ffffff);
  color: #dc2626;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s ease;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

.user-avatar {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--border, #e2e8f0);
  color: var(--text-muted, #94a3b8);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-info strong {
  display: block;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info small {
  display: block;
  color: var(--text-muted, #94a3b8);
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  min-width: 0;
  padding: clamp(18px, 3vw, 32px);
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

.topbar-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* ===== Buttons ===== */
.primary-btn,
.ghost-btn,
.icon-btn {
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  font-family: inherit;
}

.primary-btn {
  padding: 11px 18px;
  color: #fff;
  background: linear-gradient(135deg, var(--accent, #6366f1), #4f46e5);
  font-size: 0.85rem;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--accent, #6366f1) 35%, transparent);
}

.primary-btn:hover {
  transform: translateY(-1px);
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.ghost-btn {
  padding: 11px 16px;
  color: var(--text, #0f172a);
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  font-size: 0.85rem;
}

.ghost-btn:hover {
  background: var(--surface-hover, #f1f5f9);
}

.ghost-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Stats ===== */
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

/* ===== Search ===== */
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

/* ===== States ===== */
.status-text {
  margin: 0 0 14px;
  padding: 10px 14px;
  border-radius: 12px;
  color: #15803d;
  background: rgba(34, 197, 94, 0.12);
  font-size: 0.85rem;
}

.error-text {
  margin: 0 0 14px;
  color: #dc2626;
  line-height: 1.5;
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

/* ===== Project list ===== */
.project-list {
  display: grid;
  gap: 10px;
}

.project-row {
  display: grid;
  grid-template-columns: 24px 64px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.06));
  cursor: grab;
}

.project-row.dragging {
  opacity: 0.5;
}

.drag-handle {
  color: var(--text-muted, #94a3b8);
  text-align: center;
}

.drag-handle.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.project-thumb {
  width: 64px;
  height: 48px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--surface-hover, #f1f5f9);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-thumb i {
  color: var(--text-muted, #94a3b8);
}

.project-meta {
  min-width: 0;
}

.project-meta h3 {
  margin: 0 0 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 0.95rem;
}

.project-meta p {
  margin: 0;
  color: var(--text-secondary, #64748b);
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge {
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.badge.featured {
  color: #ca8a04;
  background: rgba(234, 179, 8, 0.14);
}

.badge.published {
  color: #16a34a;
  background: rgba(34, 197, 94, 0.12);
}

.badge.draft {
  color: var(--text-secondary, #64748b);
  background: var(--surface-hover, #f1f5f9);
}

.project-actions {
  display: flex;
  gap: 6px;
}

.icon-btn {
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--text-secondary, #64748b);
  background: var(--surface-hover, #f1f5f9);
  flex: 0 0 auto;
}

.icon-btn:hover {
  background: var(--border, #e2e8f0);
}

.icon-btn .fa-star.active {
  color: #ca8a04;
}

.icon-btn.danger:hover {
  color: #dc2626;
  background: rgba(239, 68, 68, 0.14);
}

/* ===== Modal ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
}

.modal-box {
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border-radius: 20px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: var(--shadow-xl, 0 26px 70px rgb(15 23 42 / 0.22));
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.modal-head h2 {
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: -0.02em;
}

.project-form {
  display: grid;
  gap: 14px;
}

.project-form label {
  display: grid;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-secondary, #64748b);
}

.project-form input[type="text"],
.project-form input[type="url"],
.project-form input[type="file"],
.project-form textarea,
.project-form select {
  padding: 10px 12px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  color: var(--text, #0f172a);
  background: var(--surface, #ffffff);
  font-size: 0.85rem;
  font-family: inherit;
  outline: none;
}

.project-form input:focus,
.project-form textarea:focus,
.project-form select:focus {
  border-color: var(--accent, #6366f1);
}

.project-form textarea {
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.checkbox-label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.checkbox-label input {
  width: 16px;
  height: 16px;
}

.image-preview {
  width: 100%;
  max-height: 160px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border, #e2e8f0);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.mobile-nav-toggle {
  display: none;
}

@media (max-width: 900px) {
  .admin-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: relative;
    height: auto;
    max-height: none;
    padding: 12px 16px;
  }

  .brand {
    padding: 0;
    justify-content: space-between;
  }

  .mobile-nav-toggle {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    margin-left: auto;
    border: 1px solid var(--border, #e2e8f0);
    border-radius: 10px;
    background: var(--surface-hover, #f1f5f9);
    color: var(--text, #0f172a);
    cursor: pointer;
    font-size: 0.95rem;
  }

  .side-nav {
    max-height: 60vh;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border, #e2e8f0);
  }

  .side-footer {
    margin-top: 0;
  }

  .user-card {
    padding: 8px;
  }
}

@media (max-width: 560px) {
  .content {
    padding: 14px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .project-row {
    grid-template-columns: 20px 48px minmax(0, 1fr);
  }

  .project-actions {
    grid-column: 1 / -1;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .stats-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .topbar-actions {
    width: 100%;
  }

  .topbar-actions button {
    flex: 1;
  }
}
</style>
