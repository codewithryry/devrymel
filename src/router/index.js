// Copyright (c) 2026 Reymel Mislang
// Mindoro State University (MINSU) - Calapan Campus, Philippines

import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Devrymel | Reymel Mislang"
    }
  },
  {
    path: "/now",
    name: "now",
    component: () => import("@/views/NowPage.vue"),
    meta: {
      title: "Now | Reymel Mislang"
    }
  },
  {
    path: "/uses",
    name: "uses",
    component: () => import("@/views/UsesPage.vue"),
    meta: {
      title: "Uses | Reymel Mislang"
    }
  },
  {
    path: "/services",
    name: "services",
    component: () => import("@/views/ServicesPage.vue"),
    meta: {
      title: "Services | Reymel Mislang"
    }
  },
  {
    path: "/case-studies",
    name: "case-studies",
    component: () => import("@/views/CaseStudiesPage.vue"),
    meta: {
      title: "Case Studies | Reymel Mislang"
    }
  },

{
  path: "/deployment",
  name: "deployment",
  component: () => import("@/views/DeploymentPage.vue"),
  meta: {
    title: "Deployment Journey | Reymel Mislang"
  }
},

  {
    path: "/privacy",
    name: "privacy",
    component: () => import("@/views/PrivacyPage.vue"),
    meta: {
      title: "Privacy | Devrymel"
    }
  },
  {
    path: "/roadmap",
    name: "roadmap",
    component: () => import("@/views/RoadmapPage.vue"),
    meta: {
      title: "Roadmap | Devrymel"
    }
  },
  {
    path: "/changelog",
    name: "changelog",
    component: () => import("@/views/ChangelogPage.vue"),
    meta: {
      title: "Changelog | Devrymel"
    }
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactPage.vue"),
    meta: {
      title: "Contact | Reymel Mislang"
    }
  },
  {
    path: "/admin",
    name: "VisitorLogsAdmin",
    component: () => import("@/views/VisitorLogsAdmin.vue"),
    meta: {
      title: "Admin Panel | Devrymel"
    }
  },

  // Keep this always at the bottom
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
    meta: {
      title: "404 - Page Not Found"
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Devrymel | Reymel Mislang";
  next();
});

export default router;