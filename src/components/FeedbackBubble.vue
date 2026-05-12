<template>
  <div class="feedback-root">
    <button
      v-if="showButton"
      type="button"
      class="feedback-button"
      :class="{ 'is-open': open }"
      :aria-expanded="open"
      aria-label="Open feedback wall"
      title="Feedback"
      @click="open = true"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:22px;height:22px">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>

      <span v-if="feedbacks.length" class="feedback-count">
        {{ feedbacks.length > 99 ? "99+" : feedbacks.length }}
      </span>
    </button>

    <!-- Cycling preview card -->
    <transition name="fb-preview-fade">
      <div
        v-if="showPreviewCard && previewFeedbacks.length && !open"
        class="fb-preview-card"
        @click="open = true"
        role="button"
        tabindex="0"
      >
        <div class="fb-preview-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;flex-shrink:0">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{{ previewIndex + 1 }} of {{ previewFeedbacks.length }}</span>
          <span class="fb-preview-dot"></span>
        </div>
        <p class="fb-preview-text">{{ previewFeedbacks[previewIndex].message }}</p>
        <span class="fb-preview-time">{{ formatTime(previewFeedbacks[previewIndex].created) }}</span>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="open"
        ref="overlay"
        class="feedback-overlay"
        tabindex="-1"
        @click.self="closeFeedback"
        @keydown.esc="closeFeedback"
      >
        <section
          class="feedback-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-title"
        >
          <header class="fb-header">
            <span id="feedback-title" class="fb-title">Feedback</span>

            <button
              type="button"
              class="fb-close"
              aria-label="Close feedback wall"
              @click="closeFeedback"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </header>

          <main class="fb-messages" ref="messageList" aria-live="polite">
            <p v-if="!loading && feedbacks.length" class="fb-count-label">
              {{ feedbackLabel }}
            </p>

            <div v-if="loading" class="fb-state">
              <span class="fb-spinner"></span>
              <p>Loading feedback...</p>
            </div>

            <div v-else-if="feedbacks.length === 0" class="fb-state fb-empty">
              <span class="fb-empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:24px;height:24px">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              <h4>No feedback yet</h4>
              <p>Be the first to leave a quick thought.</p>
            </div>

            <article
              v-else
              v-for="fb in visibleFeedbacks"
              :key="fb.id"
              class="fb-bubble"
            >
              <div class="fb-bubble-content">
                <time class="fb-time" :datetime="toIsoDate(fb.created)">
                  {{ formatTime(fb.created) }}
                </time>

                <p class="fb-text">{{ fb.message }}</p>
              </div>
            </article>
          </main>

          <form class="fb-input-area" @submit.prevent="submitFeedback">
            <label class="sr-only" for="feedback-message">Write your feedback</label>

            <div class="fb-input-stack">
              <div class="fb-input-shell">
                <textarea
                  id="feedback-message"
                  ref="feedbackInput"
                  v-model="message"
                  placeholder="Write your feedback..."
                  rows="1"
                  maxlength="280"
                  :disabled="sending || isCoolingDown"
                  @input="autoResize"
                  @keydown.enter.exact.prevent="submitFeedback"
                ></textarea>
              </div>

              <p v-if="isCoolingDown" class="fb-cooldown">
                Send again in {{ cooldownRemaining }}s
              </p>
            </div>

            <button
              type="submit"
              class="fb-send"
              :disabled="sending || isCoolingDown || !message.trim()"
              aria-label="Send feedback"
              :title="isCoolingDown ? `Send again in ${cooldownRemaining}s` : 'Send feedback'"
            >
              <svg
                v-if="!sending"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                style="width:16px;height:16px"
              >
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>

              <span
                v-else
                class="fb-spinner"
                style="width:18px;height:18px;border-width:2px"
              ></span>
            </button>
          </form>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore"
import { db } from "@/services/firebase"

export default {
  name: "FeedbackBubble",

  props: {
    showButton: {
      type: Boolean,
      default: true
    }
  },

  emits: ["count-change"],

  data() {
    return {
      open: false,
      message: "",
      feedbacks: [],
      loading: false,
      sending: false,
      visibleLimit: 8,
      cooldownRemaining: 0,
      cooldownTimer: null,
      hasLoadedFeedbacks: false,
      previewFeedbacks: [],
      previewIndex: 0,
      showPreviewCard: false,
      previewTimer: null,
      previewCycleTimer: null
    }
  },

  computed: {
    visibleFeedbacks() {
      return this.feedbacks.slice(0, this.visibleLimit)
    },

    isCoolingDown() {
      return this.cooldownRemaining > 0
    },

    feedbackLabel() {
      if (this.loading) return "Loading visitor messages"
      if (this.feedbacks.length === 0) return "Share a quick thought"
      if (this.feedbacks.length === 1) return "1 visitor message"

      return `${this.feedbacks.length} visitor messages`
    }
  },

  watch: {
    open(val) {
      document.body.style.overflow = val ? "hidden" : ""

      if (!val) return

      if (!this.hasLoadedFeedbacks) {
        this.loadFeedbacks()
      }

      this.$nextTick(() => {
        if (this.$refs.feedbackInput) {
          this.$refs.feedbackInput.focus()
        }
      })
    }
  },

  beforeUnmount() {
    document.body.style.overflow = ""

    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer)
    }
  },

  methods: {
    openFeedback() {
      this.open = true
    },

    closeFeedback() {
      this.open = false
    },

    async loadFeedbacks(forceRefresh = false) {
      if (this.loading) return
      if (this.hasLoadedFeedbacks && !forceRefresh) return

      this.loading = true

      try {
        const feedbackQuery = query(
          collection(db, "feedback"),
          orderBy("created", "desc"),
          limit(50)
        )

        const snapshot = await getDocs(feedbackQuery)

        this.feedbacks = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }))

        this.hasLoadedFeedbacks = true
        this.$emit("count-change", this.feedbacks.length)
      } catch (error) {
        console.error("Error loading feedback:", error)
      } finally {
        this.loading = false

        this.$nextTick(() => {
          if (this.$refs.messageList) {
            this.$refs.messageList.scrollTop = 0
          }
        })
      }
    },

    async submitFeedback() {
      const text = this.message.trim()

      if (!text || this.sending || this.isCoolingDown) return

      this.sending = true

      try {
        await addDoc(collection(db, "feedback"), {
          message: text,
          created: serverTimestamp()
        })

        this.message = ""
        this.resetTextarea()
        this.startCooldown()

        this.hasLoadedFeedbacks = false
        await this.loadFeedbacks(true)
      } catch (error) {
        console.error("Error submitting feedback:", error)

        if (error?.code === "permission-denied") {
          alert("Hindi allowed ang write sa Firestore rules. Check Firebase rules.")
        } else if (error?.code === "invalid-argument") {
          alert("May invalid data sa feedback. Check created/message fields.")
        } else {
          alert("Failed to send. Please try again.")
        }
      } finally {
        this.sending = false
      }
    },

    startCooldown() {
      if (this.cooldownTimer) {
        clearInterval(this.cooldownTimer)
      }

      this.cooldownRemaining = 10

      this.cooldownTimer = setInterval(() => {
        this.cooldownRemaining -= 1

        if (this.cooldownRemaining <= 0) {
          this.cooldownRemaining = 0
          clearInterval(this.cooldownTimer)
          this.cooldownTimer = null
        }
      }, 1000)
    },

    autoResize(event) {
      const field = event?.target || this.$refs.feedbackInput

      if (!field) return

      field.style.height = "auto"
      field.style.height = `${Math.min(field.scrollHeight, 126)}px`
    },

    resetTextarea() {
      this.$nextTick(() => {
        const field = this.$refs.feedbackInput

        if (field) {
          field.style.height = ""
        }
      })
    },

    toDate(timestamp) {
      if (!timestamp) return null

      if (timestamp.toDate) {
        return timestamp.toDate()
      }

      const date = new Date(timestamp)

      return Number.isNaN(date.getTime()) ? null : date
    },

    toIsoDate(timestamp) {
      const date = this.toDate(timestamp)

      return date ? date.toISOString() : ""
    },

    formatTime(timestamp) {
      const date = this.toDate(timestamp)

      if (!date) return "Now"

      const diff = Date.now() - date.getTime()
      const mins = Math.floor(diff / 60000)
      const hrs = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (mins < 1) return "Now"
      if (mins < 60) return `${mins}m`
      if (hrs < 24) return `${hrs}h`
      if (days < 7) return `${days}d`

      return date.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.feedback-root {
  --fb-bg: var(--t-bg, var(--bg, #f8fafc));
  --fb-surface: var(--t-bg-card, var(--surface, #ffffff));
  --fb-surface-soft: var(--t-bg-elevated, var(--surface-hover, #f1f5f9));
  --fb-text: var(--t-text, var(--text, #0f172a));
  --fb-muted: var(--t-text-muted, var(--text-secondary, #64748b));
  --fb-faint: var(--text-muted, #94a3b8);
  --fb-border: var(--t-border, var(--border, #e2e8f0));
  --fb-accent: var(--t-accent, var(--accent, #6366f1));
  --fb-accent-hover: var(--t-accent-hover, var(--accent-hover, #4f46e5));
  --fb-danger: #ef4444;
  --fb-shadow: 0 24px 60px rgba(15, 23, 42, 0.2);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.feedback-button {
  position: fixed;
  right: max(22px, env(safe-area-inset-right));
  bottom: max(22px, env(safe-area-inset-bottom));
  z-index: 9998;
  width: 58px;
  height: 58px;
  border: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow:
    0 8px 24px -4px rgba(99, 102, 241, 0.4),
    0 4px 12px -2px rgba(99, 102, 241, 0.2);
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.22s ease;
}


.feedback-button:hover,
.feedback-button.is-open {
  transform: scale(1.08);
  box-shadow: 0 12px 32px -4px rgba(99, 102, 241, 0.5);
}

.feedback-button:focus-visible,
.fb-close:focus-visible,
.fb-send:focus-visible,
.fb-input-shell:focus-within {
  outline: 3px solid color-mix(in srgb, var(--fb-accent) 24%, transparent);
  outline-offset: 3px;
}

.feedback-count {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 23px;
  height: 23px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--fb-danger);
  color: #ffffff;
  border: 2px solid var(--fb-surface);
  display: grid;
  place-items: center;
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1;
}


.feedback-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
  background: rgba(15, 23, 42, 0.38);
}

.feedback-box {
  width: min(424px, calc(100vw - 32px));
  max-height: min(620px, calc(100vh - 48px));
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--fb-border) 88%, transparent);
  border-radius: 22px;
  background: color-mix(in srgb, var(--fb-surface) 96%, transparent);
  box-shadow:
    0 24px 60px rgba(15, 23, 42, 0.18),
    0 8px 22px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(16px);
  color: var(--fb-text);
  animation: feedback-slide-in 0.22s ease;
}

@keyframes feedback-slide-in {
  from {
    opacity: 0;
    transform: translateX(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.fb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 56px;
  padding: 15px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--fb-border) 76%, transparent);
  background: color-mix(in srgb, var(--fb-surface-soft) 42%, transparent);
}

.fb-title {
  color: var(--fb-muted);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  line-height: 1;
  text-transform: uppercase;
}

.fb-count-label {
  margin: -4px 0 2px;
  min-width: 0;
  color: var(--fb-muted);
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  text-transform: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fb-state h4,
.fb-text {
  color: var(--fb-text);
}

.fb-title,
.fb-count-label,
.fb-state p,
.fb-empty p,
.fb-cooldown,
.fb-time {
  color: var(--fb-muted);
}

.fb-close {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: var(--fb-surface-soft);
  color: var(--fb-muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.18s ease, background 0.18s ease;
}

.fb-close:hover {
  color: var(--fb-text);
  background: var(--fb-border);
}

.fb-messages {
  height: min(360px, calc(100vh - 230px));
  min-height: 240px;
  max-height: 360px;
  overflow-y: auto;
  scrollbar-gutter: stable;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 13px;
}

.fb-state {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  color: var(--fb-muted);
}

.fb-state p,
.fb-state h4 {
  margin: 0;
}

.fb-state h4 {
  color: var(--fb-text);
  font-size: 0.95rem;
  font-weight: 800;
}

.fb-empty p,
.fb-state p {
  max-width: 230px;
  font-size: 0.86rem;
  line-height: 1.5;
}

.fb-empty-icon {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: var(--fb-accent);
  background: color-mix(in srgb, var(--fb-accent) 10%, var(--fb-surface));
  font-size: 1.25rem;
}

.fb-spinner {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid var(--fb-border);
  border-top-color: var(--fb-accent);
  animation: fb-spin 0.75s linear infinite;
}

@keyframes fb-spin {
  to {
    transform: rotate(360deg);
  }
}

.fb-bubble {
  width: 100%;
  display: block;
}

.fb-bubble-content {
  width: 100%;
  max-width: 100%;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, var(--fb-border) 72%, transparent);
  border-radius: 16px;
  background: color-mix(in srgb, var(--fb-surface) 88%, var(--fb-surface-soft) 12%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.55) inset;
  overflow: hidden;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.fb-bubble-content:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--fb-accent) 34%, var(--fb-border));
  background: color-mix(in srgb, var(--fb-surface-soft) 72%, var(--fb-surface) 28%);
  box-shadow:
    0 10px 22px rgba(15, 23, 42, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.5) inset;
}

.fb-time {
  float: right;
  margin-left: 10px;
  margin-top: 3px;
  color: var(--fb-muted);
  font-size: 0.68rem;
  font-weight: 650;
  line-height: 1.2;
  white-space: nowrap;
  text-align: right;
}

.fb-text {
  margin: 0;
  color: var(--fb-text);
  font-size: 0.9rem;
  line-height: 1.55;
  word-break: break-word;
  white-space: pre-line;
}

.fb-input-area {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 14px 16px 16px;
  border-top: 1px solid color-mix(in srgb, var(--fb-border) 76%, transparent);
  background: color-mix(in srgb, var(--fb-surface-soft) 42%, transparent);
}

.fb-input-stack {
  flex: 1;
  min-width: 0;
}

.fb-input-shell {
  width: 100%;
  min-width: 0;
  border: 1px solid color-mix(in srgb, var(--fb-border) 88%, transparent);
  border-radius: 18px;
  background: color-mix(in srgb, var(--fb-surface) 88%, var(--fb-surface-soft) 12%);
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.fb-input-shell:focus-within {
  border-color: color-mix(in srgb, var(--fb-accent) 70%, var(--fb-border));
  background: color-mix(in srgb, var(--fb-surface) 96%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--fb-accent) 12%, transparent);
}

.fb-input-shell textarea {
  width: 100%;
  max-height: 126px;
  min-height: 42px;
  padding: 11px 14px;
  border: 0;
  outline: 0;
  resize: none;
  background: transparent;
  color: var(--fb-text);
  font: inherit;
  font-size: 0.9rem;
  line-height: 1.45;
  display: block;
}

.fb-input-shell textarea {
  background: transparent !important;
  color: var(--fb-text) !important;
}

.fb-input-shell textarea::placeholder {
  color: var(--fb-muted);
}

.fb-input-shell textarea:disabled {
  cursor: not-allowed;
  opacity: 0.72;
}

.fb-input-stack {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.fb-cooldown {
  align-self: stretch;
  margin: 6px 8px 0 0;
  color: var(--fb-muted);
  font-size: 0.7rem;
  font-weight: 650;
  line-height: 1.2;
  text-align: right;
  width: auto;
}
.fb-send {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  background: var(--fb-accent);
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 12px 24px color-mix(in srgb, var(--fb-accent) 25%, transparent);
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    opacity 0.18s ease;
}

.fb-send:hover:not(:disabled) {
  background: var(--fb-accent-hover);
  transform: translateY(-1px);
}

.fb-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.fb-messages::-webkit-scrollbar {
  width: 5px;
}

.fb-messages::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--fb-muted) 32%, transparent);
  border-radius: 999px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 520px) {
  .feedback-button {
    right: 18px;
    bottom: 18px;
    width: 54px;
    height: 54px;
  }

  .feedback-overlay {
    align-items: flex-end;
    justify-content: center;
    padding: 0;
  }

  .feedback-box {
    width: 100%;
    max-height: 86vh;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    border-radius: 20px 20px 0 0;
    animation: feedback-slide-up-mobile 0.22s ease;
  }

  @keyframes feedback-slide-up-mobile {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .fb-header {
    padding: 16px;
  }

  .fb-heading-icon {
    width: 38px;
    height: 38px;
    border-radius: 13px;
  }

  .fb-messages {
    height: min(340px, calc(86vh - 170px));
    min-height: 220px;
    max-height: 340px;
    padding: 16px;
  }

  .fb-input-area {
    padding: 12px 12px max(14px, env(safe-area-inset-bottom));
  }

  .fb-input-shell textarea {
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feedback-button,
  .fb-close,
  .fb-send,
  .feedback-box,
  .fade-enter-active,
  .fade-leave-active {
    animation: none;
    transition: none;
  }
}
</style>