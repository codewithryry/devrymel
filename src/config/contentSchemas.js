/*
 * Field types: text | textarea | url | list | select
 * "list" fields are edited as comma-separated text and stored as arrays.
 * "url" fields are plain links pasted by the admin (no Firebase Storage upload).
 */

export const CONTENT_SECTIONS = [
  {
    key: "profile",
    label: "Profile",
    icon: "fas fa-id-badge",
    singleton: true,
    docId: "main",
    legacyImport: () => import("@/data/profile.json"),
    fields: [
      { key: "name", label: "Full Name", type: "text", required: true },
      { key: "username", label: "Username / Handle", type: "text" },
      { key: "image", label: "Profile Photo URL", type: "url", placeholder: "https://..." }
    ]
  },
  {
    key: "services",
    label: "Services",
    icon: "fas fa-briefcase",
    legacyImport: () => import("@/data/services.json"),
    fields: [
      { key: "icon", label: "Icon (Font Awesome class)", type: "text", placeholder: "fas fa-laptop-code" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "features", label: "Features (comma separated)", type: "list" },
      { key: "technologies", label: "Technologies (comma separated)", type: "list" }
    ]
  },
  {
    key: "experiences",
    label: "Experience",
    icon: "fas fa-suitcase",
    legacyImport: () => import("@/data/experiences.json"),
    fields: [
      { key: "role", label: "Role", type: "text", required: true },
      { key: "company", label: "Company", type: "text" },
      { key: "date", label: "Date", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tasks", label: "Tasks (comma separated)", type: "list" }
    ]
  },
  {
    key: "timeline",
    label: "Timeline",
    icon: "fas fa-timeline",
    legacyImport: () => import("@/data/timeline.json"),
    fields: [
      { key: "date", label: "Date", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" }
    ]
  },
  {
    key: "highlights",
    label: "Highlights",
    icon: "fas fa-star",
    legacyImport: () => import("@/data/highlights.json"),
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" }
    ]
  },
  {
    key: "techStack",
    label: "Tech Stack",
    icon: "fas fa-code",
    legacyImport: () => import("@/data/techStack.json"),
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "icon", label: "Icon (Font Awesome class)", type: "text", placeholder: "fab fa-vuejs" }
    ]
  },
  {
    key: "devStats",
    label: "Dev Stats",
    icon: "fas fa-chart-line",
    legacyImport: () => import("@/data/devStats.json"),
    fields: [
      { key: "icon", label: "Icon (Font Awesome class)", type: "text", placeholder: "fas fa-code" },
      { key: "value", label: "Value", type: "text", required: true, placeholder: "737+ hrs" },
      { key: "label", label: "Label", type: "textarea" },
      { key: "trend", label: "Trend Text", type: "text" },
      { key: "trendIcon", label: "Trend Icon", type: "text", placeholder: "fas fa-chart-line" },
      { key: "trendClass", label: "Trend Class", type: "select", options: ["up", "down"] },
      { key: "chartHeight", label: "Chart Height (%)", type: "text", placeholder: "88%" }
    ]
  },
  {
    key: "socialLinks",
    label: "Social Links",
    icon: "fas fa-share-alt",
    legacyImport: () => import("@/data/socialLinks.json"),
    fields: [
      { key: "label", label: "Platform Name", type: "text", required: true },
      { key: "icon", label: "Icon (Font Awesome class)", type: "text", placeholder: "fab fa-facebook" },
      { key: "url", label: "Profile URL", type: "url" }
    ]
  },
  {
    key: "projectLinks",
    label: "Project Links",
    icon: "fas fa-link",
    legacyImport: () => import("@/data/projectLinks.json"),
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" }
    ]
  },
  {
    key: "techNotes",
    label: "Tech Notes",
    icon: "fas fa-book",
    legacyImport: () => import("@/data/techNotes.json"),
    fields: [
      { key: "category", label: "Category", type: "text" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "readTime", label: "Read Time", type: "text", placeholder: "4 min read" },
      { key: "url", label: "Article URL", type: "url" }
    ]
  },
  {
    key: "quickPages",
    label: "Quick Pages",
    icon: "fas fa-layer-group",
    legacyImport: () => import("@/data/quickPages.json"),
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "text" },
      { key: "icon", label: "Icon (Font Awesome class)", type: "text", placeholder: "fas fa-bolt" },
      { key: "path", label: "Page Path", type: "text", required: true, placeholder: "/now" }
    ]
  },
  {
    key: "certificates",
    label: "Certificates",
    icon: "fas fa-certificate",
    legacyImport: () => import("@/data/certificates.json"),
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "category", label: "Category", type: "text" },
      { key: "file", label: "Certificate File URL (image or PDF link)", type: "url", placeholder: "https://..." }
    ]
  }
];

export function getSectionSchema(key) {
  return CONTENT_SECTIONS.find((section) => section.key === key) || null;
}
