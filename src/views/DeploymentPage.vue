<template>
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Deployment Journey</span>
        <h1><span class="title-full">Behind the build and deployment</span><span class="title-short">Build & deploy</span></h1>
        <p>
          A visual gallery of my development, testing, Firebase setup, and live
          deployment process.
        </p>
        <AdSlot class="hero-ad" type="wide-box" />
      </div>

      <section class="info-panel gallery-panel">
        <div class="deployment-grid">
          <button
            v-for="item in deploymentPhotos"
            :key="item.image"
            type="button"
            class="deployment-card"
            @click="openPreview(item)"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="deployment-image"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </section>

      <ExploreLinks />
    </section>

    <transition name="preview-fade">
      <div v-if="selectedPhoto" class="preview-overlay" @click="closePreview">
        <div class="preview-modal" @click.stop>
          <button class="preview-close" type="button" @click="closePreview">
            <i class="fas fa-times"></i>
          </button>

          <img
            :src="selectedPhoto.image"
            :alt="selectedPhoto.title"
            class="preview-image"
          />
        </div>
      </div>
    </transition>
  </main>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";
import ExploreLinks from "@/components/ExploreLinks.vue";
import "@/assets/info-pages.css";

export default {
  name: "DeploymentPage",

  components: {
    AdSlot,
    ExploreLinks,
  },

  data() {
    return {
      selectedPhoto: null,

deploymentPhotos: [
  {
    title: "Deployment Photo 1",
    image: "/deployment/1.jpg"
  },
  {
    title: "Deployment Photo 2",
    image: "/deployment/2.jpg"
  },
  {
    title: "Deployment Photo 3",
    image: "/deployment/3.jpg"
  }
]
    };
  },

  methods: {
    openPreview(photo) {
      this.selectedPhoto = photo;
      document.body.style.overflow = "hidden";
    },

    closePreview() {
      this.selectedPhoto = null;
      document.body.style.overflow = "";
    }
  },

  beforeUnmount() {
    document.body.style.overflow = "";
  }
};
</script>

<style scoped>
.gallery-panel {
  padding: 16px;
}

.deployment-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.deployment-card {
  width: 100%;
  height: 230px;
  display: block;
  padding: 0;
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  border-radius: var(--radius);
  background: var(--surface);
}

.deployment-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.deployment-card:hover .deployment-image {
  transform: scale(1.04);
}

.preview-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgba(0, 0, 0, 0.7);
}

.preview-modal {
  position: relative;
  width: min(980px, 100%);
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: #020617;
}

.preview-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: var(--radius);
  color: #0f172a;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  z-index: 2;
}

.preview-image {
  width: 100%;
  max-height: 86vh;
  display: block;
  object-fit: contain;
  background: #020617;
}

.preview-fade-enter-active,
.preview-fade-leave-active {
  transition: opacity 0.22s ease;
}

.preview-fade-enter-from,
.preview-fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .deployment-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .deployment-card {
    height: 220px;
  }
}

@media (max-width: 560px) {
  .gallery-panel {
    padding: 12px;
  }

  .deployment-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .deployment-card {
    height: 230px;
  }

  .preview-overlay {
    padding: 12px;
  }

  .preview-image {
    max-height: 82vh;
  }
}
</style>