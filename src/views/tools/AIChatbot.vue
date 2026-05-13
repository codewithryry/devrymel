<template>
  <div class="tool-page">
    <div class="tool-shell">
      <!-- Back -->
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        <span>Back to Portfolio</span>
      </router-link>

      <!-- Main Chat Card -->
      <section class="chat-card">
        <!-- Header -->
        <div class="chat-top">
          <div class="chat-title-block">
            <span class="chat-kicker">AI Assistant</span>
            <h1>{{ currentModel.label }}</h1>
            <p>{{ currentModel.desc }}</p>
          </div>

          <div class="current-model-mark" :style="{ background: currentModel.gradient }">
            <i :class="currentModel.icon"></i>
          </div>
        </div>

        <!-- Model selector -->
        <div class="model-selector-wrap">
          <div class="model-bar" role="tablist" aria-label="AI mode selector">
            <button
              v-for="(model, key) in models"
              :key="key"
              type="button"
              class="model-btn"
              :class="{ active: activeModel === key }"
              :style="activeModel === key ? { '--model-color': model.accentColor } : {}"
              :aria-selected="activeModel === key"
              role="tab"
              @click="selectModel(key)"
            >
              <span class="model-icon" :style="{ background: model.gradient }">
                <i :class="model.icon"></i>
              </span>

              <span class="model-info">
                <strong>{{ model.label }}</strong>
                <small>{{ model.desc }}</small>
              </span>
            </button>
          </div>
        </div>

        <!-- Chat window -->
        <div class="chat-window" ref="chatWindow">
          <!-- Empty state -->
          <div v-if="messages.length === 0" class="chat-empty">
            <div class="empty-orb" :style="{ background: currentModel.gradient }">
              <i :class="currentModel.icon"></i>
            </div>

            <h2>{{ currentModel.label }}</h2>
            <p>{{ currentModel.emptyText }}</p>
          </div>

          <!-- Messages -->
          <div v-else class="messages">
            <div
              v-for="(msg, i) in messages"
              :key="i"
              class="message"
              :class="msg.role"
            >
              <div
                v-if="msg.role === 'assistant'"
                class="msg-avatar"
                :style="{ background: currentModel.gradient }"
              >
                <i :class="currentModel.icon"></i>
              </div>

              <div
                class="msg-bubble"
                :class="{ error: msg.error }"
                :style="msg.role === 'user' ? { background: currentModel.gradient } : {}"
              >
                <div
                  v-if="msg.role === 'assistant'"
                  class="msg-text"
                  v-html="formatMessage(msg.content)"
                ></div>

                <div v-else class="msg-text user-text">
                  {{ msg.content }}
                </div>
              </div>
            </div>

            <!-- Typing indicator -->
            <div v-if="loading" class="message assistant">
              <div class="msg-avatar" :style="{ background: currentModel.gradient }">
                <i :class="currentModel.icon"></i>
              </div>

              <div class="msg-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div class="suggestion-tool">
          <div class="st-header">
            <span class="st-label">
              <i class="fas fa-lightbulb"></i>
              Suggestions
            </span>

            <button
              type="button"
              class="st-refresh"
              :disabled="loading"
              title="More suggestions"
              @click="rotateSuggestions"
            >
              <i class="fas fa-rotate-right"></i>
            </button>
          </div>

          <div class="st-chips">
            <button
              v-for="s in visibleSuggestions"
              :key="s"
              type="button"
              class="st-chip"
              :disabled="loading"
              @click="sendSuggestion(s)"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input-area">
          <div class="chat-input-wrap" :class="{ focused: inputFocused }">
            <textarea
              ref="inputRef"
              v-model="input"
              :placeholder="currentModel.placeholder"
              :disabled="loading"
              rows="1"
              @focus="inputFocused = true"
              @blur="inputFocused = false"
              @keydown.enter.exact.prevent="sendMessage"
              @input="autoResize"
            ></textarea>

            <button
              type="button"
              class="send-btn"
              :disabled="!input.trim() || loading"
              :style="{ background: input.trim() && !loading ? currentModel.gradient : '' }"
              aria-label="Send message"
              @click="sendMessage"
            >
              <i v-if="!loading" class="fas fa-paper-plane"></i>
              <span v-else class="send-spinner"></span>
            </button>
          </div>

          <p class="input-hint">
            Enter to send · Shift + Enter for new line · Powered by Cohere
          </p>
        </div>
      </section>

      <!-- Sponsored Ad -->
      <AdSlot type="banner" />

      <!-- How to Use -->
      <section class="how-to-use">
        <p class="htu-label">
          <i class="fas fa-circle-info"></i>
          How to use <strong>{{ currentModel.label }}</strong>
        </p>

        <div class="htu-tips">
          <div
            v-for="(tip, i) in currentModel.tips"
            :key="i"
            class="htu-tip"
          >
            <span class="htu-tip-icon" :style="{ background: currentModel.gradient }">
              <i :class="tip.icon"></i>
            </span>

            <span>{{ tip.text }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AdSlot from "@/components/AdSlot.vue";

const COHERE_API_KEY = process.env.VUE_APP_COHERE_API_KEY || "";
const COHERE_MODEL = "command-a-03-2025";

const MODELS = {
  chat: {
    label: "Chat Mode",
    desc: "General Q&A assistant",
    icon: "fas fa-comments",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    accentColor: "#6366f1",
    placeholder: "Ask me anything...",
    emptyText: "Your personal AI assistant. Ask questions, get clean answers, and continue the conversation naturally.",
    temperature: 0.7,
    preamble:
      "You are a helpful and friendly AI assistant embedded in Reymel Mislang's personal portfolio website. Answer questions clearly and concisely. If asked about Reymel, mention he is a web developer who built this site using Vue.js, Firebase, and Cohere AI.",
    tips: [
      {
        icon: "fas fa-question-circle",
        text: "Ask any question — general knowledge, explanations, or simple advice"
      },
      {
        icon: "fas fa-comments",
        text: "Ask follow-up questions to continue the same topic"
      },
      {
        icon: "fas fa-user-circle",
        text: "Ask about Reymel, his tech stack, or how this site was built"
      }
    ],
    allSuggestions: [
      "Who is Reymel Mislang?",
      "What technologies does he use?",
      "Tell me something interesting",
      "What is Vue.js?",
      "How do I become a web developer?",
      "What is Firebase used for?",
      "Explain REST APIs simply",
      "What's the difference between frontend and backend?"
    ]
  },

  code: {
    label: "Code Helper",
    desc: "Debug and explain code",
    icon: "fas fa-code",
    gradient: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
    accentColor: "#06b6d4",
    placeholder: "Paste code or describe a bug...",
    emptyText: "Paste your code, describe a bug, or ask anything programming-related.",
    temperature: 0.3,
    preamble:
      "You are an expert programming assistant. Help users debug code, explain technical concepts, review code quality, and suggest improvements. Always format code blocks using triple backticks with the language name. Be precise and thorough.",
    tips: [
      {
        icon: "fas fa-paste",
        text: "Paste code and ask what it does or why it breaks"
      },
      {
        icon: "fas fa-bug",
        text: "Describe the bug and include the error message"
      },
      {
        icon: "fas fa-graduation-cap",
        text: "Ask for explanations about JavaScript, Vue, CSS, APIs, and debugging"
      }
    ],
    allSuggestions: [
      "Explain how async/await works",
      "What is the difference between == and ===?",
      "How do I center a div in CSS?",
      "Explain Vue reactivity",
      "What is a closure in JavaScript?",
      "How does CSS Flexbox work?",
      "Explain the JavaScript event loop",
      "What is TypeScript and should I use it?",
      "How do I handle errors in async functions?",
      "What is the difference between var, let, and const?"
    ]
  },

  creative: {
    label: "Creative",
    desc: "Write and brainstorm ideas",
    icon: "fas fa-magic",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    accentColor: "#ec4899",
    placeholder: "Give me a topic or idea...",
    emptyText: "Brainstorm ideas, write content, create names, or explore creative concepts.",
    temperature: 0.9,
    preamble:
      "You are a creative writing and brainstorming assistant. Help with ideation, storytelling, writing copy, naming things, and creative projects. Be imaginative, inspiring, and original. Use formatting like bullet points and headers to organize creative output.",
    tips: [
      {
        icon: "fas fa-brain",
        text: "Start broad, then ask for shorter, cleaner, or more professional versions"
      },
      {
        icon: "fas fa-pen",
        text: "Ask for bios, captions, taglines, portfolio copy, or project ideas"
      },
      {
        icon: "fas fa-rotate-right",
        text: "Ask for another version with a different tone or structure"
      }
    ],
    allSuggestions: [
      "Help me name a tech startup",
      "Write a short poem about coding",
      "Give me 5 portfolio project ideas",
      "What makes great UI design?",
      "Help me write a developer bio",
      "Generate 3 app ideas for students",
      "Write a tagline for a portfolio site",
      "Brainstorm features for a task manager app"
    ]
  }
};

export default {
  name: "AIChatbot",

  components: {
    AdSlot
  },

  data() {
    return {
      activeModel: "chat",
      models: MODELS,
      modelMessages: {
        chat: [],
        code: [],
        creative: []
      },
      suggestionOffset: {
        chat: 0,
        code: 0,
        creative: 0
      },
      input: "",
      inputFocused: false,
      loading: false
    };
  },

  computed: {
    messages() {
      return this.modelMessages[this.activeModel] || [];
    },

    currentModel() {
      return MODELS[this.activeModel] || MODELS.chat;
    },

    visibleSuggestions() {
      const all = this.currentModel.allSuggestions;
      const offset = this.suggestionOffset[this.activeModel] || 0;

      return Array.from({ length: 4 }, (_, index) => {
        return all[(offset + index) % all.length];
      });
    }
  },

  watch: {
    $route(to) {
      const model = to.query?.model;

      if (model && MODELS[model] && model !== this.activeModel) {
        this.activeModel = model;
        this.input = "";
        this.$nextTick(() => this.scrollToBottom());
      }
    }
  },

  mounted() {
    const model = this.$route?.query?.model;

    if (model && MODELS[model]) {
      this.activeModel = model;
    }
  },

  methods: {
    selectModel(key) {
      if (this.loading || !MODELS[key]) return;

      this.activeModel = key;
      this.input = "";

      this.$router
        .replace({ query: { ...this.$route.query, model: key } })
        .catch(() => {});

      this.$nextTick(() => {
        this.scrollToBottom();

        if (this.$refs.inputRef) {
          this.$refs.inputRef.style.height = "auto";
        }
      });
    },

    rotateSuggestions() {
      const all = this.currentModel.allSuggestions;

      this.suggestionOffset[this.activeModel] =
        ((this.suggestionOffset[this.activeModel] || 0) + 4) % all.length;
    },

    async sendMessage() {
      const text = this.input.trim();

      if (!text || this.loading) return;

      if (!COHERE_API_KEY) {
        this.modelMessages[this.activeModel].push({
          role: "assistant",
          content:
            "Cohere API key is missing. Add VUE_APP_COHERE_API_KEY to your environment variables, then redeploy.",
          error: true
        });
        return;
      }

      this.modelMessages[this.activeModel].push({
        role: "user",
        content: text
      });

      this.input = "";
      this.loading = true;

      this.$nextTick(() => {
        this.scrollToBottom();

        if (this.$refs.inputRef) {
          this.$refs.inputRef.style.height = "auto";
        }
      });

      const msgs = this.modelMessages[this.activeModel];

      const chatHistory = msgs.slice(0, -1).map((message) => ({
        role: message.role === "user" ? "USER" : "CHATBOT",
        message: message.content
      }));

      try {
        const response = await fetch("https://api.cohere.ai/v1/chat", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${COHERE_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: COHERE_MODEL,
            message: text,
            preamble: this.currentModel.preamble,
            chat_history: chatHistory,
            temperature: this.currentModel.temperature
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Request failed (${response.status})`);
        }

        const data = await response.json();

        this.modelMessages[this.activeModel].push({
          role: "assistant",
          content: data.text || "No response received."
        });
      } catch (error) {
        this.modelMessages[this.activeModel].push({
          role: "assistant",
          content: `Something went wrong: ${error.message}`,
          error: true
        });
      } finally {
        this.loading = false;
        this.$nextTick(() => this.scrollToBottom());
      }
    },

    sendSuggestion(text) {
      if (this.loading) return;

      this.input = text;
      this.sendMessage();
    },

    scrollToBottom() {
      const el = this.$refs.chatWindow;

      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    },

    autoResize(event) {
      const el = event.target;

      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
    },

    escapeHtml(text) {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    },

    formatMessage(text) {
      let html = this.escapeHtml(text);

      html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
        const langTag = lang ? `<span class="code-lang">${lang}</span>` : "";

        return `
          <div class="code-block">
            ${langTag}
            <pre><code>${code.trim()}</code></pre>
          </div>
        `;
      });

      html = html.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');
      html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

      html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
      html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
      html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

      html = html.replace(/(?:^|\n)((?:[-•] .+(?:\n|$))+)/g, (match) => {
        const items = match
          .trim()
          .split("\n")
          .map((line) => line.replace(/^[-•] /, "").trim())
          .filter(Boolean)
          .map((item) => `<li>${item}</li>`)
          .join("");

        return `<ul>${items}</ul>`;
      });

      html = html.replace(/\n/g, "<br>");

      return html;
    }
  }
};
</script>

<style scoped>
/* Page */
.tool-page {
  min-height: 100vh;
  padding: 22px 16px;
  padding-bottom: calc(22px + env(safe-area-inset-bottom, 0px));
  color: var(--text);
  background:
    radial-gradient(
      circle at top left,
      color-mix(in srgb, #6366f1 18%, transparent),
      transparent 34rem
    ),
    radial-gradient(
      circle at top right,
      color-mix(in srgb, #06b6d4 12%, transparent),
      transparent 28rem
    ),
    var(--bg);
}

.tool-shell {
  width: min(880px, 100%);
  margin: 0 auto;
}

/* Back */
.back-link {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
  padding: 9px 14px;
  border-radius: 999px;
  color: var(--text-secondary);
  text-decoration: none;
  background: color-mix(in srgb, var(--surface) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  font-size: 0.82rem;
  font-weight: 800;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition:
    color 0.18s ease,
    background 0.18s ease,
    transform 0.18s ease;
}

.back-link:hover {
  color: var(--text);
  background: color-mix(in srgb, var(--surface-hover) 84%, transparent);
  transform: translateY(-1px);
}

/* Chat Card */
.chat-card {
  height: calc(100dvh - 118px);
  min-height: 580px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 26px;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--surface) 92%, transparent),
      color-mix(in srgb, var(--surface) 70%, transparent)
    );
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  box-shadow:
    0 24px 70px rgba(15, 23, 42, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
}

/* Top */
.chat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 48%, transparent);
}

.chat-title-block {
  min-width: 0;
}

.chat-kicker {
  display: inline-flex;
  margin-bottom: 4px;
  color: var(--text-secondary);
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.chat-title-block h1 {
  margin: 0;
  color: var(--text);
  font-size: clamp(1.15rem, 3vw, 1.55rem);
  font-weight: 950;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.chat-title-block p {
  margin: 5px 0 0;
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.45;
}

.current-model-mark {
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: #fff;
  font-size: 1rem;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Model Selector */
.model-selector-wrap {
  padding: 12px 14px 10px;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 44%, transparent);
}

.model-bar {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
}

.model-btn {
  position: relative;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border-radius: 17px;
  border: 1px solid color-mix(in srgb, var(--border) 74%, transparent);
  background: color-mix(in srgb, var(--surface) 68%, transparent);
  color: var(--text-secondary);
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease;
}

.model-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--model-color, #6366f1) 12%, transparent);
  opacity: 0;
  transition: opacity 0.18s ease;
}

.model-btn:hover {
  color: var(--text);
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--surface-hover) 78%, transparent);
}

.model-btn.active {
  color: var(--text);
  border-color: color-mix(in srgb, var(--model-color, #6366f1) 58%, var(--border));
  background: color-mix(in srgb, var(--model-color, #6366f1) 12%, var(--surface));
  box-shadow:
    0 12px 28px color-mix(in srgb, var(--model-color, #6366f1) 18%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.model-btn.active::before {
  opacity: 1;
}

.model-icon,
.model-info {
  position: relative;
  z-index: 1;
}

.model-icon {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 13px;
  color: #fff;
  font-size: 0.86rem;
  box-shadow: 0 9px 18px rgba(0, 0, 0, 0.2);
}

.model-info {
  min-width: 0;
}

.model-info strong {
  display: block;
  color: inherit;
  font-size: 0.84rem;
  font-weight: 950;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.model-info small {
  display: block;
  margin-top: 3px;
  color: currentColor;
  font-size: 0.68rem;
  line-height: 1.25;
  opacity: 0.68;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Chat Window */
.chat-window {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 18px;
  scroll-behavior: smooth;
}

.chat-window::-webkit-scrollbar {
  width: 7px;
}

.chat-window::-webkit-scrollbar-track {
  background: transparent;
}

.chat-window::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--border) 72%, transparent);
}

/* Empty State */
.chat-empty {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 11px;
  padding: 24px;
  text-align: center;
}

.empty-orb {
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  border-radius: 24px;
  color: #fff;
  font-size: 1.55rem;
  box-shadow:
    0 0 0 13px color-mix(in srgb, var(--accent) 9%, transparent),
    0 24px 54px color-mix(in srgb, var(--accent) 28%, transparent);
}

.chat-empty h2 {
  margin: 8px 0 0;
  color: var(--text);
  font-size: 1.35rem;
  font-weight: 950;
  letter-spacing: -0.04em;
}

.chat-empty p {
  max-width: 420px;
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Messages */
.messages {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.message.user {
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  font-size: 0.76rem;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
}

.msg-bubble {
  max-width: min(74%, 620px);
  padding: 12px 15px;
  border-radius: 19px;
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.65;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.message.user .msg-bubble {
  color: #fff;
  border-bottom-right-radius: 6px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
}

.user-text {
  color: #fff;
}

.message.assistant .msg-bubble {
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  border-bottom-left-radius: 6px;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.07);
}

.msg-bubble.error {
  color: #ef4444 !important;
  background: color-mix(in srgb, #ef4444 10%, var(--surface)) !important;
  border-color: color-mix(in srgb, #ef4444 30%, var(--border)) !important;
  box-shadow: none !important;
}

/* Typing */
.msg-bubble.typing {
  width: 68px;
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.msg-bubble.typing span {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--text-secondary);
  animation: dot-bounce 1.25s infinite;
}

.msg-bubble.typing span:nth-child(2) {
  animation-delay: 0.16s;
}

.msg-bubble.typing span:nth-child(3) {
  animation-delay: 0.32s;
}

@keyframes dot-bounce {
  0%,
  64%,
  100% {
    transform: translateY(0);
    opacity: 0.38;
  }

  32% {
    transform: translateY(-7px);
    opacity: 1;
  }
}

/* Message Formatting */
.msg-text :deep(strong) {
  font-weight: 950;
}

.msg-text :deep(em) {
  font-style: italic;
  opacity: 0.92;
}

.msg-text :deep(h1),
.msg-text :deep(h2),
.msg-text :deep(h3) {
  margin: 12px 0 6px;
  color: var(--text);
  font-weight: 950;
  line-height: 1.25;
  letter-spacing: -0.03em;
}

.msg-text :deep(h1) {
  font-size: 1.12rem;
}

.msg-text :deep(h2) {
  font-size: 1.04rem;
}

.msg-text :deep(h3) {
  font-size: 0.96rem;
}

.msg-text :deep(ul) {
  margin: 8px 0;
  padding-left: 20px;
  list-style: disc;
}

.msg-text :deep(li) {
  margin: 5px 0;
  line-height: 1.55;
}

.msg-text :deep(.inline-code) {
  padding: 2px 7px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--accent) 13%, var(--surface));
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--border));
  font-family: "SF Mono", "Fira Code", "Cascadia Code", monospace;
  font-size: 0.84em;
  font-weight: 800;
}

.msg-text :deep(.code-block) {
  margin: 11px 0;
  overflow: hidden;
  border-radius: 14px;
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
}

.msg-text :deep(.code-lang) {
  display: flex;
  align-items: center;
  padding: 7px 12px;
  background: rgba(255, 255, 255, 0.045);
  color: #7dd3fc;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.msg-text :deep(.code-block pre) {
  margin: 0;
  padding: 13px 14px;
  overflow-x: auto;
}

.msg-text :deep(.code-block code) {
  color: #e2e8f0;
  font-family: "SF Mono", "Fira Code", "Cascadia Code", monospace;
  font-size: 0.82rem;
  line-height: 1.65;
  white-space: pre;
}

/* Suggestions */
.suggestion-tool {
  flex: 0 0 auto;
  margin: 0 14px 12px;
  padding: 12px;
  border-radius: 18px;
  background: color-mix(in srgb, var(--surface) 72%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 58%, transparent);
}

.st-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 9px;
}

.st-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--text-secondary);
  font-size: 0.7rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.st-label i {
  color: #fbbf24;
  font-size: 0.72rem;
}

.st-refresh {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--border) 74%, transparent);
  background: color-mix(in srgb, var(--surface) 60%, transparent);
  color: var(--text-secondary);
  font-size: 0.7rem;
  cursor: pointer;
  transition:
    transform 0.28s ease,
    color 0.18s ease,
    background 0.18s ease;
}

.st-refresh:hover:not(:disabled) {
  color: var(--text);
  background: color-mix(in srgb, var(--surface-hover) 82%, transparent);
  transform: rotate(180deg);
}

.st-refresh:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.st-chips {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 7px;
}

.st-chip {
  min-height: 38px;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  background: color-mix(in srgb, var(--surface) 55%, transparent);
  color: var(--text-secondary);
  font-size: 0.74rem;
  font-weight: 750;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    color 0.16s ease,
    background 0.16s ease,
    border-color 0.16s ease,
    transform 0.16s ease;
}

.st-chip:hover:not(:disabled) {
  color: var(--text);
  background: color-mix(in srgb, var(--surface-hover) 84%, transparent);
  border-color: color-mix(in srgb, var(--accent) 32%, var(--border));
  transform: translateY(-1px);
}

.st-chip:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* Input */
.chat-input-area {
  flex: 0 0 auto;
  padding: 0 14px 14px;
}

.chat-input-wrap {
  display: flex;
  align-items: flex-end;
  gap: 9px;
  padding: 9px 9px 9px 14px;
  border-radius: 19px;
  background: color-mix(in srgb, var(--surface) 88%, transparent);
  border: 1.5px solid color-mix(in srgb, var(--border) 78%, transparent);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.chat-input-wrap.focused {
  background: color-mix(in srgb, var(--surface) 96%, transparent);
  border-color: color-mix(in srgb, var(--accent) 48%, var(--border));
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--accent) 11%, transparent),
    0 16px 36px rgba(15, 23, 42, 0.1);
}

.chat-input-wrap textarea {
  flex: 1;
  min-height: 38px;
  max-height: 150px;
  padding: 7px 0;
  resize: none;
  overflow-y: auto;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-family: inherit;
  font-size: 0.92rem;
  line-height: 1.55;
}

.chat-input-wrap textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.62;
}

.chat-input-wrap textarea:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.send-btn {
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 14px;
  background: color-mix(in srgb, var(--border) 70%, transparent);
  color: #fff;
  cursor: pointer;
  font-size: 0.84rem;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.14);
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease,
    filter 0.18s ease;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-1px) scale(1.03);
  filter: brightness(1.04);
}

.send-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  box-shadow: none;
}

.send-spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.input-hint {
  margin: 7px 0 0;
  color: var(--text-secondary);
  font-size: 0.68rem;
  line-height: 1.35;
  text-align: center;
  opacity: 0.58;
}

/* How To Use */
.how-to-use {
  margin: 16px 0 0;
  padding: 16px;
  border-radius: 20px;
  border: 1px solid color-mix(in srgb, var(--border) 66%, transparent);
  background: color-mix(in srgb, var(--surface) 68%, transparent);
  box-shadow: 0 16px 44px rgba(15, 23, 42, 0.08);
}

.htu-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.htu-label i {
  color: var(--accent);
  font-size: 0.78rem;
}

.htu-label strong {
  color: var(--text);
  font-weight: 950;
  text-transform: none;
  letter-spacing: 0;
}

.htu-tips {
  display: grid;
  gap: 8px;
}

.htu-tip {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  border-radius: 14px;
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--surface) 48%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 42%, transparent);
  font-size: 0.82rem;
  line-height: 1.5;
}

.htu-tip-icon {
  width: 26px;
  height: 26px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: #fff;
  font-size: 0.68rem;
  margin-top: 1px;
}

/* Tablet */
@media (max-width: 760px) {
  .tool-page {
    padding: 16px 12px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  }

  .chat-card {
    height: calc(100dvh - 98px);
    min-height: 540px;
    border-radius: 24px;
  }

  .chat-top {
    padding: 16px 15px 12px;
  }

  .current-model-mark {
    width: 42px;
    height: 42px;
    border-radius: 15px;
  }

  .model-selector-wrap {
    padding: 10px 12px;
    overflow: hidden;
  }

  .model-bar {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 2px;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
  }

  .model-bar::-webkit-scrollbar {
    display: none;
  }

  .model-btn {
    flex: 0 0 172px;
    scroll-snap-align: start;
    padding: 10px;
    border-radius: 16px;
  }

  .model-icon {
    width: 34px;
    height: 34px;
    border-radius: 12px;
  }

  .model-info strong {
    font-size: 0.8rem;
  }

  .model-info small {
    font-size: 0.65rem;
  }

  .chat-window {
    padding: 15px;
  }

  .st-chips {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .msg-bubble {
    max-width: 84%;
  }
}

/* Mobile */
@media (max-width: 520px) {
  .tool-page {
    padding: 12px 10px;
    padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  }

  .back-link {
    margin-bottom: 10px;
    padding: 8px 12px;
    font-size: 0.78rem;
  }

  .chat-card {
    height: calc(100dvh - 82px);
    min-height: 500px;
    border-radius: 22px;
  }

  .chat-top {
    padding: 14px 13px 11px;
  }

  .chat-title-block h1 {
    font-size: 1.15rem;
  }

  .chat-title-block p {
    max-width: 250px;
    font-size: 0.76rem;
  }

  .chat-kicker {
    font-size: 0.62rem;
  }

  .current-model-mark {
    width: 39px;
    height: 39px;
    border-radius: 14px;
    font-size: 0.88rem;
  }

  .model-selector-wrap {
    padding: 9px 10px;
  }

  .model-bar {
    gap: 7px;
  }

  .model-btn {
    flex: 0 0 auto;
    min-width: 118px;
    max-width: 145px;
    justify-content: center;
    gap: 7px;
    padding: 9px 10px;
    border-radius: 999px;
  }

  .model-btn.active {
    box-shadow:
      0 9px 22px color-mix(in srgb, var(--model-color, #6366f1) 20%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .model-icon {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    font-size: 0.68rem;
    box-shadow: none;
  }

  .model-info strong {
    font-size: 0.74rem;
  }

  .model-info small {
    display: none;
  }

  .chat-window {
    padding: 13px 11px;
  }

  .chat-empty {
    padding: 18px 12px;
  }

  .empty-orb {
    width: 62px;
    height: 62px;
    border-radius: 21px;
    font-size: 1.28rem;
  }

  .chat-empty h2 {
    font-size: 1.16rem;
  }

  .chat-empty p {
    font-size: 0.8rem;
    max-width: 290px;
  }

  .messages {
    gap: 14px;
  }

  .message {
    gap: 8px;
  }

  .msg-avatar {
    width: 29px;
    height: 29px;
    font-size: 0.66rem;
  }

  .msg-bubble {
    max-width: 88%;
    padding: 10px 12px;
    border-radius: 17px;
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .message.user .msg-bubble {
    border-bottom-right-radius: 5px;
  }

  .message.assistant .msg-bubble {
    border-bottom-left-radius: 5px;
  }

  .suggestion-tool {
    margin: 0 10px 10px;
    padding: 10px;
    border-radius: 16px;
  }

  .st-header {
    margin-bottom: 8px;
  }

  .st-label {
    font-size: 0.64rem;
  }

  .st-refresh {
    width: 26px;
    height: 26px;
  }

  .st-chips {
    display: flex;
    gap: 7px;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  }

  .st-chips::-webkit-scrollbar {
    display: none;
  }

  .st-chip {
    flex: 0 0 185px;
    min-height: 36px;
    padding: 8px 10px;
    border-radius: 999px;
    font-size: 0.72rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chat-input-area {
    padding: 0 10px 11px;
  }

  .chat-input-wrap {
    gap: 8px;
    padding: 8px 8px 8px 12px;
    border-radius: 17px;
  }

  .chat-input-wrap textarea {
    min-height: 36px;
    font-size: 0.86rem;
  }

  .send-btn {
    width: 37px;
    height: 37px;
    border-radius: 13px;
    font-size: 0.78rem;
  }

  .input-hint {
    font-size: 0.62rem;
  }

  .how-to-use {
    margin-top: 13px;
    padding: 13px;
    border-radius: 18px;
  }

  .htu-label {
    align-items: flex-start;
    font-size: 0.68rem;
    line-height: 1.35;
  }

  .htu-tip {
    padding: 9px;
    font-size: 0.78rem;
  }
}

/* Small Mobile */
@media (max-width: 370px) {
  .model-btn {
    min-width: 105px;
    padding: 8px 9px;
  }

  .model-icon {
    width: 25px;
    height: 25px;
  }

  .model-info strong {
    font-size: 0.7rem;
  }

  .st-chip {
    flex-basis: 165px;
  }

  .msg-bubble {
    max-width: 90%;
  }
}
</style>