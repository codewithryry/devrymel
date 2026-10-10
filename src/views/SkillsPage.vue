<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Tech Stack</span>
        <h1><span class="title-full">Tools and technologies I work with</span><span class="title-short">My tech stack</span></h1>
        <p>
          The stack I use to build modern web apps, PWAs, and automation
          workflows.
        </p>
        <AdSlot class="hero-ad" type="mobile-banner" show-smartlink />
      </div>

      <!-- Scrolling tech icons under the hero -->
      <section class="stack-marquee">
        <div v-for="group in stackGroups" :key="group.title" class="marquee-group">
          <h3 class="marquee-label">{{ group.title }}</h3>
          <div class="marquee">
            <div class="marquee-track">
              <div
                v-for="(icon, index) in [...group.icons, ...group.icons, ...group.icons, ...group.icons]"
                :key="index"
                class="marquee-item"
                :aria-hidden="index >= group.icons.length ? 'true' : null"
              >
                <img
                  :src="icon.src || `https://skillicons.dev/icons?i=${icon.id}`"
                  :alt="icon.name"
                  loading="lazy"
                />
                <span>{{ icon.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";
import "@/assets/info-pages.css";

export default {
  name: "SkillsPage",

  components: {
    AdSlot
  },

  data() {
    return {
      stackGroups: [
        {
          title: "Frontend",
          icons: [
            { id: "react", name: "React" },
            { id: "nextjs", name: "Next.js" },
            { id: "vue", name: "Vue.js" },
            { id: "ts", name: "TypeScript" },
            { id: "js", name: "JavaScript" },
            { id: "html", name: "HTML" },
            { id: "css", name: "CSS" },
            { id: "tailwind", name: "Tailwind CSS" },
            { id: "bootstrap", name: "Bootstrap" },
            { id: "sass", name: "Sass" },
            { id: "nuxtjs", name: "Nuxt" },
            { id: "redux", name: "Redux" },
            { id: "materialui", name: "Material UI" },
            { id: "jquery", name: "jQuery" }
          ]
        },
        {
          title: "Backend & Database",
          icons: [
            { id: "nodejs", name: "Node.js" },
            { id: "express", name: "Express" },
            { id: "python", name: "Python" },
            { id: "php", name: "PHP" },
            { id: "django", name: "Django" },
            { id: "mysql", name: "MySQL" },
            { id: "postgres", name: "PostgreSQL" },
            { id: "mongodb", name: "MongoDB" },
            { id: "firebase", name: "Firebase" },
            { id: "supabase", name: "Supabase" },
            { id: "fastapi", name: "FastAPI" },
            { id: "flask", name: "Flask" },
            { id: "laravel", name: "Laravel" },
            { id: "sqlite", name: "SQLite" },
            { id: "redis", name: "Redis" },
            { id: "graphql", name: "GraphQL" },
            { id: "prisma", name: "Prisma" }
          ]
        },
        {
          title: "Tools & Platforms",
          icons: [
            { id: "git", name: "Git" },
            { id: "github", name: "GitHub" },
            { id: "vscode", name: "VS Code" },
            { id: "figma", name: "Figma" },
            { id: "postman", name: "Postman" },
            { id: "vite", name: "Vite" },
            { id: "vercel", name: "Vercel" },
            { id: "netlify", name: "Netlify" },
            { id: "npm", name: "npm" },
            { id: "docker", name: "Docker" },
            { id: "linux", name: "Linux" },
            { id: "cloudflare", name: "Cloudflare" },
            { id: "aws", name: "AWS" },
            { id: "wordpress", name: "WordPress" },
            { id: "pnpm", name: "pnpm" },
            { id: "jest", name: "Jest" }
          ]
        },
        {
          title: "AI & Automation",
          icons: [
            { id: "claude-code", name: "Claude Code", src: "https://cdn.simpleicons.org/claude" },
            { id: "claude-api", name: "Claude API", src: "https://cdn.simpleicons.org/anthropic/a3a3a3" },
            { id: "n8n", name: "n8n", src: "https://cdn.simpleicons.org/n8n" },
            { id: "ollama", name: "Ollama", src: "https://cdn.simpleicons.org/ollama/a3a3a3" },
            { id: "huggingface", name: "Hugging Face", src: "https://cdn.simpleicons.org/huggingface" },
            { id: "colab", name: "Google Colab", src: "https://cdn.simpleicons.org/googlecolab" },
            { id: "opencv", name: "OpenCV" },
            { id: "tensorflow", name: "TensorFlow" },
            { id: "pytorch", name: "PyTorch" },
            { id: "sklearn", name: "scikit-learn" }
          ]
        },
        {
          title: "Languages & Mobile",
          icons: [
            { id: "java", name: "Java" },
            { id: "kotlin", name: "Kotlin" },
            { id: "dart", name: "Dart" },
            { id: "flutter", name: "Flutter" },
            { id: "c", name: "C" },
            { id: "cpp", name: "C++" },
            { id: "cs", name: "C#" },
            { id: "go", name: "Go" },
            { id: "androidstudio", name: "Android Studio" },
            { id: "bash", name: "Bash" }
          ]
        },
        {
          title: "Cloud & Design",
          icons: [
            { id: "gcp", name: "Google Cloud" },
            { id: "azure", name: "Azure" },
            { id: "nginx", name: "Nginx" },
            { id: "githubactions", name: "GitHub Actions" },
            { id: "notion", name: "Notion" },
            { id: "ps", name: "Photoshop" },
            { id: "ai", name: "Illustrator" },
            { id: "threejs", name: "Three.js" },
            { id: "md", name: "Markdown" },
            { id: "stackoverflow", name: "Stack Overflow" }
          ]
        },
        {
          title: "More Frameworks",
          icons: [
            { id: "angular", name: "Angular" },
            { id: "svelte", name: "Svelte" },
            { id: "astro", name: "Astro" },
            { id: "solidjs", name: "SolidJS" },
            { id: "remix", name: "Remix" },
            { id: "gatsby", name: "Gatsby" },
            { id: "electron", name: "Electron" },
            { id: "tauri", name: "Tauri" },
            { id: "nestjs", name: "NestJS" },
            { id: "spring", name: "Spring" }
          ]
        },
        {
          title: "Runtimes & Languages",
          icons: [
            { id: "deno", name: "Deno" },
            { id: "bun", name: "Bun" },
            { id: "dotnet", name: ".NET" },
            { id: "rust", name: "Rust" },
            { id: "ruby", name: "Ruby" },
            { id: "swift", name: "Swift" },
            { id: "lua", name: "Lua" },
            { id: "r", name: "R" },
            { id: "powershell", name: "PowerShell" },
            { id: "rails", name: "Rails" }
          ]
        },
        {
          title: "Testing & DevOps",
          icons: [
            { id: "cypress", name: "Cypress" },
            { id: "selenium", name: "Selenium" },
            { id: "vitest", name: "Vitest" },
            { id: "jenkins", name: "Jenkins" },
            { id: "kubernetes", name: "Kubernetes" },
            { id: "terraform", name: "Terraform" },
            { id: "ansible", name: "Ansible" },
            { id: "gitlab", name: "GitLab" },
            { id: "bitbucket", name: "Bitbucket" },
            { id: "heroku", name: "Heroku" }
          ]
        },
        {
          title: "Data & Backend Services",
          icons: [
            { id: "dynamodb", name: "DynamoDB" },
            { id: "appwrite", name: "Appwrite" },
            { id: "planetscale", name: "PlanetScale" },
            { id: "webflow", name: "Webflow" },
            { id: "discord", name: "Discord" },
            { id: "obsidian", name: "Obsidian" },
            { id: "raspberrypi", name: "Raspberry Pi" },
            { id: "arduino", name: "Arduino" },
            { id: "vim", name: "Vim" },
            { id: "idea", name: "IntelliJ" }
          ]
        },
        {
          title: "Creative & Community",
          icons: [
            { id: "xd", name: "Adobe XD" },
            { id: "pr", name: "Premiere Pro" },
            { id: "ae", name: "After Effects" },
            { id: "blender", name: "Blender" },
            { id: "unity", name: "Unity" },
            { id: "godot", name: "Godot" },
            { id: "matlab", name: "MATLAB" },
            { id: "latex", name: "LaTeX" },
            { id: "devto", name: "Dev.to" },
            { id: "linkedin", name: "LinkedIn" }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Scrolling tech icon rows */
.stack-marquee {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-top: 1rem;
}

/* Small category label above each row (Frontend, Backend & Database, ...) */
.marquee-label {
  margin: 0 0 0.45rem;
  color: var(--text-muted);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.marquee-group:nth-child(even) .marquee-track {
  animation-direction: reverse;
}

.marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 40s linear infinite;
}

.marquee-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  width: 92px;
  flex-shrink: 0;
}

.marquee-item img {
  width: 36px;
  height: 36px;
}

.marquee-item span {
  color: var(--text-secondary);
  font-size: 0.7rem;
  text-align: center;
  white-space: nowrap;
}

@keyframes marquee-scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 640px) {
  .stack-marquee {
    gap: 0.9rem;
  }

  /* Phones: only the rows that fit on one screen above the nav */
  .marquee-group:nth-child(n + 8) {
    display: none;
  }

  .marquee-item {
    width: 76px;
  }

  .marquee-item img {
    width: 30px;
    height: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
