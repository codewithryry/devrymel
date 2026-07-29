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
    path: "/sponsor",
    name: "sponsor",
    component: () => import("@/views/SponsorPage.vue"),
    meta: {
      title: "Sponsor | Devrymel"
    }
  },
  {
    path: "/admin-cms-x7f2q",
    name: "ProjectsAdminPanel",
    component: () => import("@/views/ProjectsAdminPanel.vue"),
    meta: {
      title: "Projects Admin | Devrymel"
    }
  },

  {
    path: "/tools/tiktok",
    name: "tiktok-downloader",
    component: () => import("@/views/tools/TikTokDownloader.vue"),
    meta: {
      title: "TikTok Downloader | Devrymel Tools"
    }
  },

  {
    path: "/tools/youtube-downloader",
    name: "youtube-downloader",
    component: () => import("@/views/tools/YouTubeDownloader.vue"),
    meta: { title: "YouTube Downloader | Devrymel Tools" }
  },
  {
    path: "/tools/youtube-thumbnail",
    name: "youtube-thumbnail",
    component: () => import("@/views/tools/YouTubeThumbnail.vue"),
    meta: { title: "YouTube Thumbnail Downloader | Devrymel Tools" }
  },
  {
    path: "/tools/qr-generator",
    name: "qr-generator",
    component: () => import("@/views/tools/QRGenerator.vue"),
    meta: { title: "QR Code Generator | Devrymel Tools" }
  },
  {
    path: "/tools/password",
    name: "password-generator",
    component: () => import("@/views/tools/PasswordGenerator.vue"),
    meta: { title: "Password Generator | Devrymel Tools" }
  },
  {
    path: "/tools/ip-lookup",
    name: "ip-lookup",
    component: () => import("@/views/tools/IPLookup.vue"),
    meta: { title: "IP Address Lookup | Devrymel Tools" }
  },
  {
    path: "/tools/base64",
    name: "base64",
    component: () => import("@/views/tools/Base64Tool.vue"),
    meta: { title: "Base64 Encoder/Decoder | Devrymel Tools" }
  },

  {
    path: "/tools/url-shortener",
    name: "url-shortener",
    component: () => import("@/views/tools/URLShortener.vue"),
    meta: { title: "URL Shortener | Devrymel Tools" }
  },
  {
    path: "/tools/color-palette",
    name: "color-palette",
    component: () => import("@/views/tools/ColorPalette.vue"),
    meta: { title: "Color Palette Generator | Coming Soon · Devrymel Tools" }
  },
  {
    path: "/tools/ai-chat",
    name: "ai-chat",
    component: () => import("@/views/tools/AIChatbot.vue"),
    meta: { title: "AI Chatbot | Coming Soon · Devrymel Tools" }
  },

  {
  path: "/tools/speedtest",
  name: "speedtest",
  component: () => import("@/views/tools/SpeedTest.vue"),
  meta: { title: "Speed Test | Devrymel Tools" }
},

{
  path: "/tools/json-formatter",
  name: "json-formatter",
  component: () => import("@/views/tools/ToolComingSoon.vue"),
  meta: {
    title: "JSON Formatter | Devrymel"
  }
},
{
  path: "/tools/text-counter",
  name: "text-counter",
  component: () => import("@/views/tools/ToolComingSoon.vue"),
  meta: {
    title: "Text Counter | Devrymel"
  }
},
{
  path: "/tools/case-converter",
  name: "case-converter",
  component: () => import("@/views/tools/ToolComingSoon.vue"),
  meta: {
    title: "Case Converter | Devrymel"
  }
},
{
  path: "/tools/meta-tag-generator",
  name: "meta-tag-generator",
  component: () => import("@/views/tools/ToolComingSoon.vue"),
  meta: {
    title: "Meta Tag Generator | Devrymel"
  }
},
  {
    path: "/callback",
    name: "spotify-callback",
    component: {
      template: `<div style="font-family:monospace;padding:40px;word-break:break-all;background:#111;color:#1db954;min-height:100vh"><h2 style="color:#fff">Spotify Code</h2><p style="font-size:0.85rem;color:#aaa">Copy everything below and paste it to Claude:</p><p style="background:#1a1a1a;padding:16px;border-radius:8px;border:1px solid #1db954">{{ code }}</p></div>`,
      computed: { code() { return new URLSearchParams(window.location.search).get("code") || "No code found" } }
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