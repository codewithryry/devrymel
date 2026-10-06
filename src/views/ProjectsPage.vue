<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <HeroArt name="projects" />
        <span class="eyebrow">Projects</span>
        <h1>Things I've built and shipped</h1>
        <p>
          Web apps, PWAs, automation workflows, and client builds — from idea to
          working product.
        </p>
      </div>

      <ProjectsSection :projects="projects" @openProjectModal="openProjectModal" />

      <ProjectModal
        v-if="showProjectModal"
        :message="projectModalMessage"
        @close="showProjectModal = false"
      />

      <ExploreLinks />
    </section>
  </main>
</template>

<script>
import HeroArt from "@/components/HeroArt.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import ProjectsSection from "@/components/projects/ProjectsSection.vue";
import ProjectModal from "@/components/modals/ProjectModal.vue";
import rawProjects from "@/data/projects.json";
import "@/assets/info-pages.css";

export default {
  name: "ProjectsPage",

  components: {
    ExploreLinks,
    HeroArt,
    ProjectsSection,
    ProjectModal
  },

  data() {
    return {
      projects: rawProjects.map((project) => ({
        ...project,
        image: project.image && !project.image.startsWith("http")
          ? require(`@/assets/${project.image}`)
          : project.image
      })),
      showProjectModal: false,
      projectModalMessage: ""
    };
  },

  methods: {
    openProjectModal(message) {
      this.projectModalMessage = message;
      this.showProjectModal = true;
    }
  }
};
</script>
