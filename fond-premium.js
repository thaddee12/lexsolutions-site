// <fond-premium variant="lignes|points|faisceaux" tone="dark|light" color="#hex">
(function () {
  if (customElements.get('fond-premium')) return;
  const rgb = h => { const n = parseInt((h || '#5DE0E6').replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  class FondPremium extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      Object.assign(this.style, { position: 'absolute', inset: '0', pointerEvents: 'none', display: 'block', overflow: 'hidden', contain: 'paint' });
      this.v = this.getAttribute('variant') || 'lignes';
      this.dark = this.getAttribute('tone') !== 'light';
      this.c = rgb(this.getAttribute('color') || (this.dark ? '#5DE0E6' : '#004AAD'));
      const r = this.attachShadow({ mode: 'open' });
      r.innerHTML = '<canvas style="display:block;width:100%;height:100%"></canvas>';
      this.cv = r.querySelector('canvas'); this.ctx = this.cv.getContext('2d');
      this.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this); this.resize();
      this.io = new IntersectionObserver(([e]) => { this.vis = e.isIntersecting; }, { rootMargin: '100px' }); this.io.observe(this);
      this.t0 = performance.now();
      this.last = 0;
      const loop = now => { this.raf = requestAnimationFrame(loop); if (this.vis === false || document.hidden) return; if (now - this.last < 40) return; this.last = now; this.draw((now - this.t0) / 1000); };
      this.raf = requestAnimationFrame(loop);
      this.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1800, fill: 'forwards' });
    }
    disconnectedCallback() { cancelAnimationFrame(this.raf); this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); this._on = false; }
    resize() { const w = this.clientWidth, h = this.clientHeight; if (!w || !h) return; const d = 1; this.w = w; this.h = h; this.cv.width = w * d; this.cv.height = h * d; this.ctx.setTransform(d, 0, 0, d, 0, 0); }
    draw(t) {
      const { ctx, w, h } = this; if (!w) return; if (this.reduce) t = 8;
      const [R, G, B] = this.c, col = a => `rgba(${R},${G},${B},${a})`, k = this.dark ? 1 : .75;
      ctx.clearRect(0, 0, w, h);
      if (this.v === 'lignes') {
        // fines lignes de niveau qui ondulent lentement
        const n = 14; ctx.lineWidth = 1;
        for (let i = 0; i < n; i++) {
          const base = h * (0.15 + 0.75 * i / (n - 1)), amp = 18 + i * 1.6, ph = i * 0.45;
          ctx.strokeStyle = col((0.05 + 0.1 * Math.sin(i / n * Math.PI)) * k * 1.6);
          ctx.beginPath();
          for (let x = 0; x <= w + 16; x += 16) {
            const y = base + Math.sin(x * 0.0035 + t * 0.12 + ph) * amp + Math.sin(x * 0.0011 - t * 0.07 + ph * 2) * amp * 1.4;
            x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
          }
          ctx.stroke();
        }
      } else if (this.v === 'points') {
        // grille de points, un halo diagonal la balaie lentement
        const gap = 26, sweep = ((t * 0.06) % 1.6 - 0.3) * (w + h);
        for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) {
          const d = Math.abs(x + y - sweep), glow = Math.max(0, 1 - d / 260);
          const s = 1.6 + glow * 1.4; ctx.fillStyle = col((0.1 + 0.55 * glow * glow) * k); ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      } else {
        // faisceaux : 3 rais de lumière fins et diagonaux qui glissent
        ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(-0.42); const L = Math.hypot(w, h);
        [0, 0.36, 0.7].forEach((o, i) => {
          const p = ((t * (0.022 + i * 0.006) + o) % 1) * 1.6 - 0.8, x = p * L, bw = 70 + i * 40;
          const g = ctx.createLinearGradient(x - bw, 0, x + bw, 0);
          g.addColorStop(0, col(0)); g.addColorStop(0.5, col((0.13 - i * 0.025) * k)); g.addColorStop(1, col(0));
          ctx.fillStyle = g; ctx.fillRect(x - bw, -L, bw * 2, L * 2);
          ctx.fillStyle = col(0.22 * k); ctx.fillRect(x - 0.5, -L, 1, L * 2);
        });
        ctx.restore();
      }
    }
  }
  customElements.define('fond-premium', FondPremium);
})();
