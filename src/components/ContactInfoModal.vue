<template>
  <!-- "Contact info" popup: email, LinkedIn, GitHub, CV and Resume.
       Opened from the homepage profile and the navbar "Contact Me" button. -->
  <transition name="ci-fade" appear>
    <div class="mobile-modal-overlay ci-overlay" @click="$emit('close')">
      <div class="mobile-modal profile-modal ci-modal" role="dialog" aria-label="Contact info" @click.stop>
        <div class="mobile-modal-header">
          <h3 class="mobile-modal-title">Contact info</h3>
          <button type="button" class="mobile-modal-close" aria-label="Close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <p class="mobile-modal-desc">Ways to reach me and find me online.</p>

        <div class="ci-list">
          <component
            :is="item.href ? 'a' : 'div'"
            v-for="item in contactInfo"
            :key="item.label"
            class="ci-item"
            :href="item.href || null"
            :target="item.external ? '_blank' : null"
            :rel="item.external ? 'noopener' : null"
          >
            <span class="ci-icon"><i :class="item.icon"></i></span>
            <span class="ci-info">
              <strong>{{ item.label }}</strong>
              <small>{{ item.value }}<template v-if="item.note"> · {{ item.note }}</template></small>
            </span>
            <i v-if="item.href" class="fas fa-chevron-right ci-arrow"></i>
          </component>
        </div>

        <div class="ci-docs">
          <a href="/Reymel_Mislang_CV.pdf" target="_blank" rel="noopener" class="ci-item ci-doc">
            <span class="ci-icon"><i class="fas fa-id-card"></i></span>
            <span class="ci-info"><strong>CV</strong><small>View PDF</small></span>
          </a>
          <a href="/Reymel_Mislang_Resume.pdf" target="_blank" rel="noopener" class="ci-item ci-doc">
            <span class="ci-icon"><i class="fas fa-file-lines"></i></span>
            <span class="ci-info"><strong>Resume</strong><small>View PDF</small></span>
          </a>
        </div>

        <AdSlot class="profile-modal-footer" type="banner" />
      </div>
    </div>
  </transition>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";

export default {
  name: "ContactInfoModal",
  components: {
    AdSlot
  },
  emits: ["close"],
  data() {
    return {
      contactInfo: [
        { icon: "fab fa-linkedin", label: "LinkedIn", value: "linkedin.com/in/reymelreymislang", href: "https://www.linkedin.com/in/reymelreymislang", external: true },
        { icon: "fab fa-github", label: "GitHub", value: "github.com/codewithryry", href: "https://github.com/codewithryry", external: true },
        { icon: "fas fa-envelope", label: "Email", value: "reymelrey.mislang@gmail.com", href: "mailto:reymelrey.mislang@gmail.com" }
      ]
    };
  }
};
</script>

<style scoped>
/* ===== "Contact info" popup (phones) — matches the Dean's List popup ===== */
.ci-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(15, 23, 42, 0.75);
}

.ci-modal {
  width: 100%;
  padding: 1.25rem;
  background: var(--surface);
}

.ci-modal .mobile-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.ci-modal .mobile-modal-title {
  margin: 0;
  color: var(--text);
  font-size: 1.4rem;
  font-weight: 700;
}

.ci-modal .mobile-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--text-secondary);
  cursor: pointer;
}

.ci-modal .mobile-modal-desc {
  margin: 0 0 1rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.5;
}

/* Rows look like the Dean's List rows */
.ci-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

/* CV + Resume side by side to save space */
.ci-docs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
  margin-top: 0.45rem;
}

.ci-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 14px;
  color: var(--text);
  text-decoration: none;
}

.ci-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--text);
  color: var(--bg);
  font-size: 0.9rem;
}

.ci-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.ci-info strong {
  font-size: 0.92rem;
  font-weight: 600;
}

.ci-info small {
  overflow: hidden;
  color: var(--text-secondary);
  font-size: 0.78rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ci-arrow {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.ci-fade-enter-active,
.ci-fade-leave-active {
  transition: opacity 0.2s ease;
}

.ci-fade-enter-active .ci-modal,
.ci-fade-leave-active .ci-modal {
  transition: transform 0.25s ease;
}

.ci-fade-enter-from,
.ci-fade-leave-to {
  opacity: 0;
}

.ci-fade-enter-from .ci-modal,
.ci-fade-leave-to .ci-modal {
  transform: translateY(40px);
}

/* Desktop: centered card instead of a bottom sheet */
@media (min-width: 769px) {
  .ci-overlay {
    align-items: center;
    padding: 1rem;
  }

  .ci-modal {
    max-width: 440px;
    border: 1px solid var(--border);
    border-radius: 22px;
  }
}
</style>
