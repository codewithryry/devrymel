<template>
  <main class="sponsor-page">
    <section class="sponsor-shell">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Portfolio
      </router-link>

      <div class="sponsor-hero">
        <span class="eyebrow">Support</span>
        <h1>Sponsor the Devrymel Platform</h1>
      </div>

      <div class="sponsor-layout">
        <!-- Left: About -->
        <div class="sponsor-about">
          <div class="sponsor-logo">
            <div class="logo-badge">
              <span>D</span>
            </div>
            <span class="logo-text">devrymel</span>
          </div>

          <h2>Become a Supporter of Devrymel</h2>
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
            Help keep Devrymel free, fast, and always improving.
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
              <span>Link this sponsorship to my Devrymel account to access supporter benefits.</span>
            </label>
            <label class="check-row">
              <input type="checkbox" v-model="marketingEmails" />
              <span>I agree to receive updates and project announcements.</span>
            </label>
          </div>

          <button class="sponsor-btn" @click="handleSponsor">
            <i class="fas fa-heart"></i>
            Sponsor and Support
          </button>

          <div class="sponsor-footer-links">
            <a href="#" class="footer-link">Problems sponsoring?</a>
            <a href="#" class="footer-link">Sponsorship FAQ</a>
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
export default {
  name: "SponsorPage",

  data() {
    return {
      selectedMethod: "gcash",
      selectedFreq: "one-time",
      selectedAmount: 250,
      customAmount: "",
      linkAccount: false,
      marketingEmails: false,

      paymentMethods: [
        { id: "gcash", label: "GCash", icon: "fas fa-mobile-alt" },
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
      const method = this.selectedMethod === "paypal"
        ? "https://www.paypal.com/paypalme/devrymel"
        : "https://gcash.com";
      window.open(method, "_blank");
    },
  },
};
</script>

<style scoped>
.sponsor-page {
  min-height: 100vh;
  background: var(--bg, #f8fafc);
  font-family: inherit;
}

.sponsor-shell {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 72px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  padding: 8px 14px;
  border-radius: 10px;
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #e2e8f0);
  color: var(--text-secondary, #64748b);
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.18s ease;
}
.back-link:hover {
  color: var(--accent, #6366f1);
  border-color: var(--accent, #6366f1);
  transform: translateX(-2px);
}

.sponsor-hero {
  text-align: center;
  margin-bottom: 48px;
}
.eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  color: var(--accent, #6366f1);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.sponsor-hero h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text, #0f172a);
}

/* ── Two-column layout ── */
.sponsor-layout {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 32px;
  align-items: start;
  margin-bottom: 48px;
}

/* ── About column ── */
.sponsor-about {
  padding: 36px;
  border-radius: 24px;
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.07);
}

.sponsor-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.logo-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.logo-text {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text, #0f172a);
}

.sponsor-about h2 {
  margin: 0 0 10px;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text, #0f172a);
}
.sponsor-tagline {
  margin: 0 0 18px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary, #64748b);
  line-height: 1.55;
}
.sponsor-desc {
  margin: 0 0 12px;
  font-size: 0.88rem;
  color: var(--text, #0f172a);
  font-weight: 600;
}

.sponsor-list {
  list-style: none;
  padding: 0;
  margin: 0 0 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sponsor-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--text-secondary, #64748b);
  line-height: 1.45;
}
.sponsor-list li i {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent, #6366f1);
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.sponsor-cta-text {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text, #0f172a);
  font-style: italic;
}

/* ── Form card ── */
.sponsor-form-card {
  padding: 32px;
  border-radius: 24px;
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.07);
}

.form-group {
  margin-bottom: 22px;
}
.form-label {
  display: block;
  margin-bottom: 10px;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--text, #0f172a);
}
.form-note {
  margin: 7px 0 0;
  font-size: 0.78rem;
  color: var(--text-secondary, #64748b);
}

.method-group {
  display: flex;
  gap: 10px;
}
.method-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1.5px solid var(--border, #e2e8f0);
  background: var(--card-bg, #fff);
  color: var(--text-secondary, #64748b);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}
.method-btn.active {
  background: var(--accent, #6366f1);
  border-color: var(--accent, #6366f1);
  color: #fff;
}
.method-btn:hover:not(.active) {
  border-color: var(--accent, #6366f1);
  color: var(--accent, #6366f1);
}

.freq-group {
  display: flex;
  gap: 8px;
}
.freq-btn {
  flex: 1;
  padding: 10px 8px;
  border-radius: 12px;
  border: 1.5px solid var(--border, #e2e8f0);
  background: var(--card-bg, #fff);
  color: var(--text-secondary, #64748b);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}
.freq-btn.active {
  background: var(--accent, #6366f1);
  border-color: var(--accent, #6366f1);
  color: #fff;
}
.freq-btn:hover:not(.active) {
  border-color: var(--accent, #6366f1);
  color: var(--accent, #6366f1);
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}
.amount-btn {
  padding: 12px 8px;
  border-radius: 12px;
  border: 1.5px solid var(--border, #e2e8f0);
  background: var(--card-bg, #fff);
  color: var(--text, #0f172a);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.16s ease;
  text-align: center;
}
.amount-btn.active {
  background: var(--accent, #6366f1);
  border-color: var(--accent, #6366f1);
  color: #fff;
}
.amount-btn:hover:not(.active) {
  border-color: var(--accent, #6366f1);
  color: var(--accent, #6366f1);
}

.custom-amount-wrap {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-bg, #fff);
  transition: border-color 0.16s;
}
.custom-amount-wrap:focus-within {
  border-color: var(--accent, #6366f1);
}
.currency-symbol {
  padding: 0 12px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-secondary, #64748b);
  background: var(--bg, #f8fafc);
  border-right: 1.5px solid var(--border, #e2e8f0);
  height: 44px;
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
  color: var(--text, #0f172a);
}
.custom-amount-input::placeholder {
  color: var(--text-muted, #94a3b8);
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
  color: var(--text-secondary, #64748b);
  line-height: 1.45;
}
.check-row input[type="checkbox"] {
  margin-top: 2px;
  accent-color: var(--accent, #6366f1);
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  cursor: pointer;
}

.sponsor-btn {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  border: none;
  background: var(--accent, #6366f1);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.18s ease;
  margin-bottom: 16px;
}
.sponsor-btn:hover {
  background: var(--accent-hover, #4f46e5);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.32);
}
.sponsor-btn:active {
  transform: translateY(0);
}

.sponsor-footer-links {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.footer-link {
  font-size: 0.8rem;
  color: var(--text-secondary, #64748b);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.16s;
}
.footer-link:hover {
  color: var(--accent, #6366f1);
}

/* ── Banner ── */
.sponsor-banner {
  border-radius: 24px;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%);
  padding: 48px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  overflow: hidden;
  position: relative;
}
.sponsor-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
  pointer-events: none;
}
.banner-content h2 {
  margin: 0 0 8px;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #fff;
}
.banner-content p {
  margin: 0;
  color: rgba(255,255,255,0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 480px;
}
.banner-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 24px;
  border-radius: 12px;
  background: #f59e0b;
  color: #fff;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.18s ease;
}
.banner-btn:hover {
  background: #d97706;
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(245, 158, 11, 0.4);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .sponsor-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .sponsor-shell {
    padding: 20px 0 48px;
    width: calc(100% - 24px);
  }
  .sponsor-hero h1 {
    font-size: 1.7rem;
  }
  .sponsor-about,
  .sponsor-form-card {
    padding: 22px;
  }
  .method-group {
    flex-direction: column;
  }
  .amount-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .sponsor-banner {
    flex-direction: column;
    padding: 32px 24px;
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
