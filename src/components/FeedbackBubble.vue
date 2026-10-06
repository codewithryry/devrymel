<template>
  <div class="feedback-root">
    <button
      v-if="showButton && !open"
      type="button"
      class="feedback-button"
      :class="{ 'is-open': open }"
      :aria-expanded="open"
      aria-label="Open feedback wall"
      title="Feedback"
      @click="open = true"
    >
      <span class="feedback-tab-text">Feedback</span>
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

  mounted() {
    // Prefetch in the background (once the page is idle) so the panel opens ready
    const prefetch = () => this.loadFeedbacks()
    if ("requestIdleCallback" in window) {
      this.prefetchHandle = window.requestIdleCallback(prefetch, { timeout: 3000 })
    } else {
      this.prefetchHandle = setTimeout(prefetch, 1500)
    }
  },

  beforeUnmount() {
    document.body.style.overflow = ""

    if (this.prefetchHandle) {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(this.prefetchHandle)
      else clearTimeout(this.prefetchHandle)
    }

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

/* Slim vertical tab stuck to the right edge */
.feedback-button {
  position: fixed;
  top: 140px;
  right: 0;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 7px;
  border: 1px solid var(--border);
  border-right: none;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  background: var(--surface);
  color: var(--text-secondary);
  font-family: inherit;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: padding 0.2s ease, color 0.2s ease;
}

.feedback-button:hover,
.feedback-button.is-open {
  padding-right: 10px;
  color: var(--text);
}

.feedback-tab-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.feedback-count {
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  display: grid;
  place-items: center;
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1;
}

/* ===== Feedback panel ===== */
.feedback-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
  background: rgba(0, 0, 0, 0.35);
}

.feedback-box {
  width: min(400px, calc(100vw - 32px));
  height: min(560px, calc(100vh - 48px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-xl);
  animation: fb-in 0.2s ease;
}

@keyframes fb-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.fb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
}

.fb-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
}

.fb-close {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: var(--radius);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.fb-close:hover {
  background: var(--surface-hover);
  color: var(--text);
}

.fb-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
}

.fb-count-label {
  margin: 0 0 2px;
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.fb-bubble {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-soft);
}

.fb-bubble-content {
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;
}

.fb-text {
  margin: 0;
  color: var(--text);
  font-size: 0.88rem;
  line-height: 1.5;
  word-break: break-word;
}

.fb-time {
  color: var(--text-muted);
  font-size: 0.7rem;
}

.fb-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-align: center;
}

.fb-state h4,
.fb-state p {
  margin: 0;
}

.fb-state h4 {
  color: var(--text);
  font-size: 0.95rem;
}

.fb-empty-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-lg);
  background: var(--surface-soft);
  color: var(--text-muted);
}

.fb-spinner {
  width: 22px;
  height: 22px;
  border: 2px solid var(--border);
  border-top-color: var(--text);
  border-radius: 50%;
  animation: fb-spin 0.8s linear infinite;
}

@keyframes fb-spin {
  to { transform: rotate(360deg); }
}

/* Input row: textarea and send button on one line */
.fb-input-area {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px 16px 14px;
  border-top: 1px solid var(--border);
}

.fb-input-stack {
  flex: 1;
  min-width: 0;
}

.fb-input-shell {
  display: flex;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg);
  transition: border-color 0.2s ease;
}

.fb-input-shell:focus-within {
  border-color: var(--text-muted);
}

.fb-input-shell textarea {
  flex: 1;
  min-height: 42px;
  max-height: 120px;
  padding: 11px 12px;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  color: var(--text);
  font-family: inherit;
  font-size: 0.88rem;
  line-height: 1.4;
}

.fb-input-shell textarea::placeholder {
  color: var(--text-muted);
}

.fb-cooldown {
  margin: 6px 2px 0;
  color: var(--text-muted);
  font-size: 0.72rem;
}

.fb-send {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: none;
  border-radius: var(--radius-lg);
  background: var(--accent);
  color: var(--bg);
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.fb-send:hover:not(:disabled) {
  opacity: 0.85;
}

.fb-send:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Phones: no side tab — Feedback lives in the navbar "More" menu instead */
@media (max-width: 860px) {
  .feedback-button {
    display: none;
  }
}

@media (max-width: 520px) {
  /* Bottom sheet on phones */
  .feedback-overlay {
    align-items: flex-end;
    justify-content: center;
    padding: 0;
  }

  .feedback-box {
    width: 100%;
    height: var(--profile-modal-mobile-height, min(68vh, 520px));
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    border-bottom: none;
  }

  .fb-input-area {
    padding-bottom: calc(14px + env(safe-area-inset-bottom, 0px));
  }

  /* 16px stops iOS zooming into the textarea */
  .fb-input-shell textarea {
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feedback-box,
  .fb-spinner {
    animation: none;
  }
}
</style>