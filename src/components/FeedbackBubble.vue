<template>
  <div>
    <!-- Floating Button -->
    <button class="feedback-button" @click="open = true">
      <i class="fas fa-comment-dots"></i>
      <span class="feedback-count" v-if="feedbacks.length">{{ feedbacks.length }}</span>
    </button>

    <!-- Feedback Modal -->
    <transition name="fade">
      <div v-if="open" class="feedback-overlay" @click.self="open = false">
        <div class="feedback-box">
          
          <!-- Header -->
          <div class="fb-header">
            <h3><i class="fas fa-comments"></i> Feedback Wall</h3>
            <button class="fb-close" @click="open = false">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Messages List -->
          <div class="fb-messages" ref="messageList">
            <div v-if="loading" class="fb-loading">
              <i class="fas fa-spinner fa-spin"></i> Loading...
            </div>

            <div v-else-if="feedbacks.length === 0" class="fb-empty">
              <i class="fas fa-comment-slash"></i>
              <p>No feedback yet. Be the first!</p>
            </div>

            <div 
              v-else 
              v-for="fb in feedbacks" 
              :key="fb.id" 
              class="fb-bubble"
            >
              <div class="fb-bubble-content">
                <p class="fb-text">{{ fb.message }}</p>
                <span class="fb-time">{{ formatTime(fb.created) }}</span>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="fb-input-area">
            <textarea
              v-model="message"
              placeholder="Write your feedback..."
              rows="2"
              @keydown.enter.ctrl="submitFeedback"
            ></textarea>
            <button class="fb-send" @click="submitFeedback" :disabled="sending">
              <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
            </button>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { addDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "@/services/firebase"

export default {
  name: "FeedbackBubble",

  data() {
    return {
      open: false,
      message: "",
      feedbacks: [],
      loading: false,
      sending: false
    }
  },

  watch: {
    open(val) {
      if (val) this.loadFeedbacks()
    }
  },

  async mounted() {
    await this.loadFeedbacks()
  },

  methods: {
    async loadFeedbacks() {
      this.loading = true
      try {
        const q = query(
          collection(db, "feedback"),
          orderBy("created", "desc"),
          limit(50)
        )
        const snapshot = await getDocs(q)
        this.feedbacks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (e) {
        console.error("Error loading feedback:", e)
      }
      this.loading = false

      this.$nextTick(() => {
        if (this.$refs.messageList) {
          this.$refs.messageList.scrollTop = 0
        }
      })
    },

    async submitFeedback() {
      if (!this.message.trim() || this.sending) return

      this.sending = true
      try {
        await addDoc(collection(db, "feedback"), {
          message: this.message.trim(),
          created: new Date()
        })

        this.message = ""
        await this.loadFeedbacks()
      } catch (e) {
        console.error("Error submitting feedback:", e)
        alert("Failed to send. Please try again.")
      }
      this.sending = false
    },

    formatTime(timestamp) {
      if (!timestamp) return ""
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      const now = new Date()
      const diff = now - date
      const mins = Math.floor(diff / 60000)
      const hrs = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (mins < 1) return "Just now"
      if (mins < 60) return `${mins}m ago`
      if (hrs < 24) return `${hrs}h ago`
      if (days < 7) return `${days}d ago`
      return date.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
/* Floating Button */
.feedback-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  border: none;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  z-index: 9998;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
}

.feedback-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

/* Overlay */
.feedback-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 10000;
  padding: 20px;
}

/* Box */
.feedback-box {
  background: #ffffff;
  border-radius: 20px;
  width: 380px;
  max-height: 520px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Header */
.fb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.fb-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.fb-header h3 i {
  color: #3b82f6;
}

.fb-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.fb-close:hover {
  background: #e0e0e0;
}

/* Messages */
.fb-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
  max-height: 320px;
}

.fb-loading,
.fb-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  gap: 8px;
  font-size: 0.9rem;
}

.fb-empty i {
  font-size: 2rem;
  color: #ccc;
}

/* Bubble */
.fb-bubble {
  display: flex;
  justify-content: flex-start;
}

.fb-bubble-content {
  background: #f0f4ff;
  border-radius: 16px 16px 16px 4px;
  padding: 12px 16px;
  max-width: 90%;
  position: relative;
}

.fb-text {
  font-size: 0.9rem;
  color: #1a1a1a;
  line-height: 1.5;
  margin: 0 0 4px 0;
  word-break: break-word;
}

.fb-time {
  font-size: 0.7rem;
  color: #999;
}

/* Input Area */
.fb-input-area {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.fb-input-area textarea {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 0.9rem;
  font-family: inherit;
  resize: none;
  outline: none;
  background: #fff;
  transition: border-color 0.2s;
}

.fb-input-area textarea:focus {
  border-color: #3b82f6;
}

.fb-send {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.fb-send:hover:not(:disabled) {
  background: #2563eb;
  transform: scale(1.05);
}

.fb-send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Mobile */
@media (max-width: 480px) {
  .feedback-overlay {
    padding: 0;
    align-items: flex-end;
    justify-content: center;
  }

  .feedback-box {
    width: 100%;
    max-height: 80vh;
    border-radius: 20px 20px 0 0;
  }
}

/* Scrollbar */
.fb-messages::-webkit-scrollbar {
  width: 4px;
}

.fb-messages::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>