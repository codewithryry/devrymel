<template>
  <main class="sponsor-page">
    <section class="sponsor-shell">
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
  background: var(--bg);
}

.sponsor-shell {
  width: min(var(--container-width), 100%);
  margin: 0 auto;
  padding: 2.5rem 0 4rem;
}

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

.sponsor-hero {
  text-align: left;
  margin-bottom: 2rem;
}
.eyebrow {
  display: inline-block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.sponsor-hero h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
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

.sponsor-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.25rem;
}
.logo-badge {
  width: 38px;
  height: 38px;
  border-radius: var(--radius);
  background: var(--accent);
  display: grid;
  place-items: center;
  color: var(--bg);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
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

.sponsor-footer-links {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.footer-link {
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
@media (max-width: 912px) {
  .sponsor-shell {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 900px) {
  .sponsor-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .sponsor-shell {
    padding: 1.5rem 12px 3rem;
  }
  .sponsor-hero h1 {
    font-size: 1.6rem;
  }
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
