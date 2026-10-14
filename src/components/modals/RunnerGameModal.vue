<template>
  <!-- "Deploy Dash": hidden endless runner (opened by triple-tapping the profile photo).
       Bottom sheet on phones, centered card on desktop (same shell as ContactInfoModal). -->
  <transition name="or-fade" appear>
    <div class="or-overlay" @click="$emit('close')">
      <div ref="dialog" class="or-modal" role="dialog" aria-modal="true" aria-label="Deploy Dash" tabindex="-1" @click.stop>
        <span class="or-grab" aria-hidden="true"></span>

        <div class="or-head">
          <span class="or-name">Deploy Dash</span>
          <button type="button" class="or-close" aria-label="Close" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div ref="stage" class="or-stage" @pointerdown.prevent="onPress">
          <canvas
            ref="canvas"
            class="or-canvas"
            role="img"
            :aria-label="state === 'over' ? `Game over. Score ${score}.` : `Score ${score}.`"
          ></canvas>
        </div>

        <div class="or-stats">
          <div class="or-stat">
            <small>This Run</small>
            <strong>{{ score }}</strong>
          </div>
          <div class="or-stat">
            <small>All-Time HI</small>
            <strong>{{ hi }}</strong>
          </div>
          <div class="or-stat" title="1 XP for every 100 points in a run">
            <small>XP Earned</small>
            <strong>+{{ xp }}</strong>
          </div>
        </div>

        <div class="or-foot">
          <div class="or-hint">
            <i :class="isTouch ? 'fas fa-mobile-alt' : 'fas fa-keyboard'"></i>
            <span>
              <strong>Control</strong>
              <small>{{ isTouch ? "Tap the game to jump" : "Space / ↑ to jump, ↓ to drop" }} · 1 XP per 100 pts</small>
            </span>
          </div>
          <button type="button" class="or-restart" @click="start">
            {{ state === "ready" ? "Start" : "Restart" }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// Logical game size; the canvas scales this to fit its container
const W = 600;
const H = 150;
const GROUND = 128;
const GRAVITY = 0.0022; // px per ms²
const JUMP_V = -0.6; // px per ms
const START_SPEED = 0.32; // px per ms
const MAX_SPEED = 0.7;
const HI_KEY = "runner.hi";

export default {
  name: "RunnerGameModal",
  emits: ["close"],

  data() {
    return {
      state: "ready", // ready | running | over
      score: 0,
      hi: readHi(),
      isTouch: typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
    };
  },

  computed: {
    // XP rule: 1 XP for every full 100 points of the current run
    xp() {
      return Math.floor(this.score / 100);
    }
  },

  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.reset();
    this.resize();
    this._ro = new ResizeObserver(this.resize);
    this._ro.observe(this.$refs.stage);
    window.addEventListener("keydown", this.onKey);
    document.addEventListener("visibilitychange", this.onHidden);
    this._prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    this.$refs.dialog.focus({ preventScroll: true });
    this.draw();
  },

  beforeUnmount() {
    cancelAnimationFrame(this.raf);
    if (this._ro) this._ro.disconnect();
    window.removeEventListener("keydown", this.onKey);
    document.removeEventListener("visibilitychange", this.onHidden);
    document.body.style.overflow = this._prevOverflow || "";
  },

  methods: {
    reset() {
      this.player = { y: GROUND, vy: 0, onGround: true };
      this.obstacles = [];
      this.speed = START_SPEED;
      this.distance = 0;
      this.nextGap = 300;
      this.legTime = 0;
      this.score = 0;
      const style = getComputedStyle(this.$refs.canvas);
      this.ink = style.color || "#111";
      this.font = style.fontFamily || "sans-serif";
    },

    resize() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const width = this.$refs.stage.clientWidth || W;
      // Cap the pixel ratio so low-end phones don't push huge canvases
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scale = width / W;
      canvas.width = Math.round(W * scale * dpr);
      canvas.height = Math.round(H * scale * dpr);
      canvas.style.height = `${H * scale}px`;
      this.ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
      this.draw();
    },

    start() {
      this.reset();
      this.state = "running";
      this.last = performance.now();
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(this.loop);
    },

    jump() {
      if (this.state !== "running" || !this.player.onGround) return;
      this.player.vy = JUMP_V;
      this.player.onGround = false;
    },

    onPress() {
      if (this.state === "running") this.jump();
      // Short delay after a crash so a mistap doesn't restart instantly
      else if (this.state === "ready" || performance.now() - this.overAt > 400) this.start();
    },

    onKey(e) {
      if (e.key === "Escape") return this.$emit("close");
      if (e.code === "Space" || e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        if (!e.repeat) this.onPress();
      } else if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        // Drop faster back to the ground
        if (this.state === "running" && !this.player.onGround) this.player.vy = Math.max(this.player.vy, 0.6);
      }
    },

    // Tabbing away pauses into game over instead of letting time jump
    onHidden() {
      if (document.hidden && this.state === "running") this.gameOver();
    },

    loop(now) {
      const dt = Math.min(now - this.last, 32); // cap so a slow frame can't skip past obstacles
      this.last = now;
      this.update(dt);
      this.draw();
      if (this.state === "running") this.raf = requestAnimationFrame(this.loop);
    },

    update(dt) {
      const p = this.player;
      this.speed = Math.min(MAX_SPEED, START_SPEED + this.distance * 0.000012);
      const dx = this.speed * dt;
      this.distance += dx;
      this.score = Math.floor(this.distance / 10);
      this.legTime += dt;

      // Player physics
      if (!p.onGround) {
        p.vy += GRAVITY * dt;
        p.y += p.vy * dt;
        if (p.y >= GROUND) {
          p.y = GROUND;
          p.vy = 0;
          p.onGround = true;
        }
      }

      // Obstacles: move, drop off-screen ones, spawn new ones
      this.obstacles.forEach((o) => (o.x -= dx));
      this.obstacles = this.obstacles.filter((o) => o.x + o.w > -10);
      this.nextGap -= dx;
      if (this.nextGap <= 0) this.spawn();

      // Collision (hitboxes slightly smaller than the drawing so it feels fair)
      const box = { x: 30, y: p.y - 22, w: 14, h: 20 };
      if (this.obstacles.some((o) => hit(box, { x: o.x + 2, y: GROUND - o.h + 2, w: o.w - 4, h: o.h - 2 }))) {
        this.gameOver();
      }
    },

    spawn() {
      const count = this.distance > 1500 && Math.random() < 0.3 ? 2 : 1;
      let x = W + 10;
      for (let i = 0; i < count; i++) {
        const w = 10 + Math.floor(Math.random() * 3) * 4;
        const h = 18 + Math.floor(Math.random() * 3) * 6;
        this.obstacles.push({ x, w, h });
        x += w + 2;
      }
      // Gap grows with speed so every gap stays jumpable
      const airtime = (2 * -JUMP_V) / GRAVITY;
      const minGap = this.speed * airtime + 40;
      this.nextGap = minGap + Math.random() * 220;
    },

    gameOver() {
      this.state = "over";
      this.overAt = performance.now();
      cancelAnimationFrame(this.raf);
      if (this.score > this.hi) {
        this.hi = this.score;
        try {
          localStorage.setItem(HI_KEY, String(this.hi));
        } catch (e) {
          // storage blocked: keep the HI for this session only
        }
      }
      this.draw();
    },

    draw() {
      const ctx = this.ctx;
      if (!ctx) return;
      const ink = this.ink;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = ink;
      ctx.strokeStyle = ink;

      // Score, top right
      ctx.font = `600 12px ${this.font}`;
      ctx.textAlign = "right";
      ctx.fillText(String(this.score), W - 14, 22);
      ctx.globalAlpha = 0.5;
      ctx.fillText(`HI ${this.hi}`, W - 64, 22);
      ctx.globalAlpha = 1;

      // Ground line
      ctx.globalAlpha = 0.35;
      ctx.fillRect(0, GROUND, W, 1);
      ctx.globalAlpha = 1;

      // Obstacles: plain rounded blocks
      this.obstacles.forEach((o) => {
        roundRect(ctx, o.x, GROUND - o.h, o.w, o.h, 3);
        ctx.fill();
      });

      this.drawRunner(ctx);

      if (this.state === "ready") this.banner(this.isTouch ? "Tap to start" : "Press Space to start");
      if (this.state === "over") this.banner("Game over", true);
    },

    // Simple figure: round head, rounded body, two legs that alternate while running
    drawRunner(ctx) {
      const p = this.player;
      const x = 28;
      const top = p.y - 26;
      ctx.beginPath();
      ctx.arc(x + 10, top + 4, 4.5, 0, Math.PI * 2);
      ctx.fill();
      roundRect(ctx, x + 4, top + 10, 12, 11, 4);
      ctx.fill();
      const step = p.onGround && this.state === "running" ? Math.floor(this.legTime / 100) % 2 : 0;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x + 7, top + 20);
      ctx.lineTo(x + (step ? 4 : 7), top + 25);
      ctx.moveTo(x + 13, top + 20);
      ctx.lineTo(x + (step ? 13 : 16), top + 25);
      ctx.stroke();
    },

    banner(text, withIcon) {
      const ctx = this.ctx;
      ctx.textAlign = "center";
      ctx.font = `600 14px ${this.font}`;
      ctx.fillText(text, W / 2, withIcon ? 60 : 72);
      if (!withIcon) return;
      // Restart arrow
      const cx = W / 2;
      const cy = 84;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(cx, cy, 7, -Math.PI * 0.35, Math.PI * 1.45);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 2, cy - 11);
      ctx.lineTo(cx + 8, cy - 7);
      ctx.lineTo(cx + 2, cy - 3);
      ctx.fill();
    }
  }
};

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function hit(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function readHi() {
  try {
    return parseInt(localStorage.getItem(HI_KEY), 10) || 0;
  } catch (e) {
    return 0;
  }
}
</script>

<style scoped>
.or-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(15, 23, 42, 0.75);
}

.or-modal {
  width: 100%;
  max-height: 100dvh;
  overflow-y: auto;
  padding: 0.75rem 1.25rem calc(1.25rem + env(safe-area-inset-bottom));
  border-radius: 22px 22px 0 0;
  background: var(--surface);
  color: var(--text);
}

.or-grab {
  display: block;
  width: 40px;
  height: 4px;
  margin: 0 auto 0.9rem;
  border-radius: 4px;
  background: var(--border);
}

.or-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

.or-name {
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.or-modal:focus {
  outline: none;
}

.or-close {
  display: flex;
  flex-shrink: 0;
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

/* Game panel: the canvas reads its ink color from `color` */
.or-stage {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--bg);
  color: var(--text);
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.or-canvas {
  display: block;
  width: 100%;
}

.or-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.45rem;
  margin-top: 0.75rem;
}

.or-stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.65rem 0.75rem;
  border-radius: 14px;
  background: var(--surface-soft);
}

.or-stat small {
  color: var(--text-secondary);
  font-size: 0.72rem;
}

.or-stat strong {
  font-size: 1.15rem;
  font-variant-numeric: tabular-nums;
}

.or-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.9rem;
}

.or-hint {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
}

.or-hint > i {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.or-hint span {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.or-hint strong {
  font-size: 0.85rem;
  font-weight: 600;
}

.or-hint small {
  color: var(--text-secondary);
  font-size: 0.74rem;
}

.or-restart {
  flex-shrink: 0;
  padding: 0.75rem 1.4rem;
  border: none;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.or-restart:focus-visible,
.or-close:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 2px;
}

.or-fade-enter-active,
.or-fade-leave-active {
  transition: opacity 0.2s ease;
}

.or-fade-enter-active .or-modal,
.or-fade-leave-active .or-modal {
  transition: transform 0.25s ease;
}

.or-fade-enter-from,
.or-fade-leave-to {
  opacity: 0;
}

.or-fade-enter-from .or-modal,
.or-fade-leave-to .or-modal {
  transform: translateY(40px);
}

/* Phones in landscape: tighter spacing so the whole sheet fits */
@media (orientation: landscape) and (max-height: 500px) {
  .or-modal {
    max-width: 640px;
    padding-top: 0.5rem;
    border-radius: 18px 18px 0 0;
  }

  .or-grab {
    display: none;
  }

  .or-head,
  .or-stats,
  .or-foot {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .or-stat {
    padding: 0.4rem 0.6rem;
  }
}

/* Desktop: centered card instead of a bottom sheet */
@media (min-width: 769px) and (min-height: 501px) {
  .or-overlay {
    align-items: center;
    padding: 1rem;
  }

  .or-modal {
    max-width: 640px;
    max-height: calc(100dvh - 2rem);
    padding-top: 1.25rem;
    border: 1px solid var(--border);
    border-radius: 22px;
  }

  .or-grab {
    display: none;
  }
}
</style>
