<template>
  <!-- Same page shell + hero as the other info pages -->
  <main class="info-page">
    <section class="info-shell">
      <div class="info-hero">
        <span class="eyebrow">Support</span>
        <h1>Sponsor Reymel</h1>
        <p>
          Help keep the free tools, projects, and resources on this site
          running and improving.
        </p>
      </div>

      <div class="sponsor-layout">
        <!-- Left: About -->
        <div class="sponsor-about">
          <h2>Become a Supporter</h2>
          <p class="sponsor-tagline">
            All tools, projects, and resources on this platform are free and open for everyone.
          </p>

          <p class="sponsor-desc">Your support directly funds:</p>
          <ul class="sponsor-list">
            <li>
              <i class="fas fa-server"></i>
              Hosting, domain, and infrastructure costs
            </li>
            <li>
              <i class="fas fa-code"></i>
              Continued development of free web tools
            </li>
            <li>
              <i class="fas fa-graduation-cap"></i>
              Open-source learning resources and projects
            </li>
            <li>
              <i class="fas fa-bolt"></i>
              Faster updates and new features
            </li>
          </ul>

          <p class="sponsor-cta-text">
            Help keep Reymel's work free, fast, and always improving.
          </p>
        </div>

        <!-- Right: Form -->
        <div class="sponsor-form-card">
          <!-- Payment Method -->
          <div class="form-group">
            <label class="form-label">How would you like to pay?</label>
            <div class="method-group">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                class="method-btn"
                :class="{ active: selectedMethod === method.id }"
                @click="selectedMethod = method.id"
              >
                <i :class="method.icon"></i>
                {{ method.label }}
              </button>
            </div>

            <!-- GoTyme: bank transfer details + QR -->
            <div v-if="selectedMethod === 'gotyme'" class="bank-details">
              <img :src="gotymeQr" alt="GoTyme QR code" class="bank-qr" />
              <div class="bank-info">
                <span class="bank-label">GoTyme Bank</span>
                <strong>{{ gotyme.name }}</strong>
                <button type="button" class="bank-number" @click="copyAccount">
                  {{ gotyme.number }}
                  <i class="fas" :class="copied ? 'fa-check' : 'fa-copy'"></i>
                </button>
                <small>Scan the QR or send via InstaPay to this account.</small>
              </div>
            </div>
          </div>

          <!-- Frequency -->
          <div class="form-group">
            <label class="form-label">How often would you like to sponsor?</label>
            <div class="freq-group">
              <button
                v-for="freq in frequencies"
                :key="freq.id"
                class="freq-btn"
                :class="{ active: selectedFreq === freq.id, disabled: freq.requiresPaypal && selectedMethod !== 'paypal' }"
                @click="setFreq(freq)"
              >
                {{ freq.label }}
              </button>
            </div>
            <p v-if="selectedFreq === 'monthly' && selectedMethod !== 'paypal'" class="form-note">
              Monthly sponsorship is only available with PayPal.
            </p>
          </div>

          <!-- Amount -->
          <div class="form-group">
            <label class="form-label">Select the amount you'd like to give:</label>
            <div class="amount-grid">
              <button
                v-for="amt in amounts"
                :key="amt"
                class="amount-btn"
                :class="{ active: selectedAmount === amt && !customAmount }"
                @click="selectPreset(amt)"
              >
                ₱{{ amt.toLocaleString() }}
              </button>
            </div>
            <div class="custom-amount-wrap">
              <span class="currency-symbol">₱</span>
              <input
                v-model="customAmount"
                type="number"
                class="custom-amount-input"
                placeholder="Other Amount"
                min="1"
                @input="selectedAmount = null"
              />
            </div>
          </div>

          <!-- Options -->
          <div class="form-group checkboxes">
            <label class="check-row">
              <input type="checkbox" v-model="linkAccount" />
              <span>List my name as a supporter.</span>
            </label>
            <label class="check-row">
              <input type="checkbox" v-model="marketingEmails" />
              <span>I agree to receive updates and project announcements.</span>
            </label>
          </div>

          <button class="sponsor-btn" @click="handleSponsor">
            Sponsor and Support
          </button>

          <div class="sponsor-footer-links">
            <!-- Opens an email with the subject filled in -->
            <a
              href="mailto:reymelrey.mislang@gmail.com?subject=Problem%20with%20sponsoring"
              class="footer-link"
            >
              Problems sponsoring?
            </a>
            <button type="button" class="footer-link" :aria-expanded="showFaq" @click="showFaq = !showFaq">
              Sponsorship FAQ
            </button>
          </div>

          <!-- FAQ: opens right under the links -->
          <div v-if="showFaq" class="sponsor-faq">
            <details v-for="item in faq" :key="item.q" class="faq-item">
              <summary>{{ item.q }}</summary>
              <p>{{ item.a }}</p>
            </details>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div class="sponsor-banner">
        <div class="banner-content">
          <h2>Support Open Source Work</h2>
          <p>
            Every contribution — big or small — helps keep free tools and resources available for everyone.
          </p>
        </div>
        <router-link to="/contact" class="banner-btn">
          <i class="fas fa-envelope"></i>
          Get in Touch
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import "@/assets/info-pages.css";

import gotymeQr from "@/assets/Gotyme.png";

const PAYPAL_URL = "https://paypal.me/reymelreymislang";

export default {
  name: "SponsorPage",

  data() {
    return {
      selectedMethod: "gotyme",
      gotymeQr,
      gotyme: { name: "Reymel Mislang", number: "019851727975" },
      copied: false,
      showFaq: false,
      faq: [
        {
          q: "Where does my sponsorship go?",
          a: "It covers hosting, the domain, and the time spent building and maintaining the free tools and resources on this site."
        },
        {
          q: "How do I pay with GoTyme?",
          a: "Scan the GoTyme QR code or send through InstaPay to the account number shown. Tap the number to copy it."
        },
        {
          q: "Can I sponsor monthly?",
          a: "Monthly sponsorship is available through PayPal only. GoTyme supports one-time transfers."
        },
        {
          q: "Is there a minimum amount?",
          a: "No — any amount helps, even ₱10. Use \"Other Amount\" to enter your own."
        },
        {
          q: "I already paid but something went wrong.",
          a: "Tap \"Problems sponsoring?\" to email me with your name, amount, and payment method, and I'll sort it out."
        }
      ],
      selectedFreq: "one-time",
      selectedAmount: 250,
      customAmount: "",
      linkAccount: false,
      marketingEmails: false,

      paymentMethods: [
        { id: "gotyme", label: "GoTyme", icon: "fas fa-building-columns" },
        { id: "paypal", label: "PayPal", icon: "fab fa-paypal" },
      ],

      frequencies: [
        { id: "one-time", label: "One Time", requiresPaypal: false },
        { id: "yearly", label: "Yearly", requiresPaypal: false },
        { id: "monthly", label: "Monthly", requiresPaypal: true },
      ],

      amounts: [500, 250, 100, 50, 25, 10],
    };
  },

  computed: {
    finalAmount() {
      return this.customAmount ? Number(this.customAmount) : this.selectedAmount;
    },
  },

  methods: {
    selectPreset(amt) {
      this.selectedAmount = amt;
      this.customAmount = "";
    },

    setFreq(freq) {
      if (freq.requiresPaypal && this.selectedMethod !== "paypal") {
        this.selectedMethod = "paypal";
      }
      this.selectedFreq = freq.id;
    },

    handleSponsor() {
      if (!this.finalAmount || this.finalAmount < 1) {
        alert("Please select or enter a valid amount.");
        return;
      }
      if (this.selectedMethod === "paypal") {
        // paypal.me accepts the amount + currency at the end of the link
        window.open(`${PAYPAL_URL}/${this.finalAmount}PHP`, "_blank");
        return;
      }
      // GoTyme: no checkout link, so copy the account number for the transfer
      this.copyAccount();
    },

    async copyAccount() {
      try {
        await navigator.clipboard.writeText(this.gotyme.number);
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      } catch (error) {
        this.copied = false;
      }
    },
  },
};
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.5rem;
  padding: 8px 12px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.2s ease;
}
.back-link:hover {
  border-color: var(--text-muted);
}

/* ── Two-column layout ── */
.sponsor-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 2rem;
}

/* ── About column ── */
.sponsor-about {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
}

.sponsor-about h2 {
  margin: 0 0 0.6rem;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
}
.sponsor-tagline {
  margin: 0 0 1.1rem;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.55;
}
.sponsor-desc {
  margin: 0 0 0.75rem;
  font-size: 0.86rem;
  color: var(--text);
  font-weight: 600;
}

.sponsor-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.sponsor-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.45;
}
.sponsor-list li i {
  width: 26px;
  height: 26px;
  border-radius: var(--radius-sm);
  background: var(--surface-soft);
  border: 1px solid var(--border);
  color: var(--text);
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  flex-shrink: 0;
}

.sponsor-cta-text {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}

/* ── Form card ── */
.sponsor-form-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
}

.form-group {
  margin-bottom: 1.4rem;
}
.form-label {
  display: block;
  margin-bottom: 0.6rem;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--text);
}
.form-note {
  margin: 0.45rem 0 0;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

/* GoTyme transfer details */
.bank-details {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-soft);
}

.bank-qr {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: #fff;
  object-fit: cover;
}

.bank-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.bank-label {
  color: var(--text-muted);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.bank-info strong {
  color: var(--text);
  font-size: 0.9rem;
}

.bank-number {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: fit-content;
  padding: 0;
  border: 0;
  background: none;
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
}

.bank-number i {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.bank-info small {
  color: var(--text-secondary);
  font-size: 0.72rem;
  line-height: 1.4;
}

.method-group {
  display: flex;
  gap: 8px;
}
.method-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px 12px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.16s ease, background 0.16s ease, color 0.16s ease;
}
.method-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
.method-btn:hover:not(.active) {
  border-color: var(--text-muted);
  color: var(--text);
}

.freq-group {
  display: flex;
  gap: 8px;
}
.freq-btn {
  flex: 1;
  padding: 9px 8px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.16s ease, background 0.16s ease, color 0.16s ease;
}
.freq-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
.freq-btn:hover:not(.active) {
  border-color: var(--text-muted);
  color: var(--text);
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}
.amount-btn {
  padding: 10px 8px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.16s ease, background 0.16s ease, color 0.16s ease;
  text-align: center;
}
.amount-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
.amount-btn:hover:not(.active) {
  border-color: var(--text-muted);
}

.custom-amount-wrap {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  transition: border-color 0.16s;
}
.custom-amount-wrap:focus-within {
  border-color: var(--text-muted);
}
.currency-symbol {
  padding: 0 12px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--surface-soft);
  border-right: 1px solid var(--border);
  height: 40px;
  display: flex;
  align-items: center;
}
.custom-amount-input {
  flex: 1;
  padding: 10px 14px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}
.custom-amount-input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

.checkboxes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.check-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.45;
}
.check-row input[type="checkbox"] {
  margin-top: 2px;
  accent-color: var(--accent);
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  cursor: pointer;
}

.sponsor-btn {
  width: 100%;
  padding: 0.85rem;
  border-radius: var(--radius);
  border: 1px solid var(--accent);
  background: var(--accent);
  color: var(--bg);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.18s ease;
  margin-bottom: 1rem;
}
.sponsor-btn:hover {
  opacity: 0.85;
}

/* FAQ */
.sponsor-faq {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border-top: 1px solid var(--border);
}

.faq-item {
  border-bottom: 1px solid var(--border);
}

.faq-item summary {
  padding: 0.75rem 0;
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.faq-item p {
  margin: 0 0 0.8rem;
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.55;
}

.sponsor-footer-links {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.footer-link {
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.16s;
}
.footer-link:hover {
  color: var(--text);
}

/* ── Banner ── */
.sponsor-banner {
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.banner-content h2 {
  margin: 0 0 0.4rem;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
}
.banner-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.5;
  max-width: 440px;
}
.banner-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius);
  background: var(--accent);
  color: var(--bg);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.18s ease;
}
.banner-btn:hover {
  opacity: 0.85;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .sponsor-layout {
    grid-template-columns: 1fr;
  }
}

/* Phones: no "Support Open Source Work" banner */
@media (max-width: 768px) {
  .sponsor-banner {
    display: none;
  }
}

@media (max-width: 640px) {
  .sponsor-about,
  .sponsor-form-card {
    padding: 1.25rem;
  }
  .method-group {
    flex-direction: column;
  }
  .amount-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .sponsor-banner {
    flex-direction: column;
    padding: 1.5rem;
    text-align: center;
  }
  .banner-content p {
    max-width: 100%;
  }
  .banner-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
