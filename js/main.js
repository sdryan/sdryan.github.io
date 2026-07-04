/* =============================================================
   Ryan Research Group — interactions
   1. Collective-motion hero canvas (agent-based swarm)
   2. Scroll reveals
   3. Mobile nav
   4. Publication filter
   ============================================================= */

/* ---------- 1. Hero: agent-based collective motion ---------- */
(function heroSwarm() {
  const canvas = document.getElementById("swarm");
  if (!canvas) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  let W, H, DPR, agents, raf;

  const INK = "#15151A";
  const ACCENT = "#2E5BFF";
  const HOT = "#FF5B37";

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function seed() {
    const n = Math.min(120, Math.floor((W * H) / 9000));
    agents = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      a: Math.random() * Math.PI * 2,
      s: 0.35 + Math.random() * 0.5,
      hot: Math.random() < 0.16
    }));
  }

  // Vicsek-style alignment: each agent steers toward the average
  // heading of neighbours — the emergence of collective motion.
  function step() {
    const R = 62, R2 = R * R;
    for (const p of agents) {
      let sx = Math.cos(p.a), sy = Math.sin(p.a), c = 1;
      for (const q of agents) {
        if (q === p) continue;
        const dx = q.x - p.x, dy = q.y - p.y;
        if (dx * dx + dy * dy < R2) { sx += Math.cos(q.a); sy += Math.sin(q.a); c++; }
      }
      p.a = Math.atan2(sy, sx) + (Math.random() - 0.5) * 0.35;
      p.x += Math.cos(p.a) * p.s;
      p.y += Math.sin(p.a) * p.s;
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const R = 62, R2 = R * R;
    // links
    ctx.lineWidth = 1;
    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        const a = agents[i], b = agents[j];
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const o = (1 - d2 / R2) * 0.16;
          ctx.strokeStyle = `rgba(46,91,255,${o})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    // agents as little directional darts
    for (const p of agents) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.fillStyle = p.hot ? HOT : ACCENT;
      ctx.globalAlpha = p.hot ? 0.95 : 0.75;
      ctx.beginPath();
      ctx.moveTo(5, 0); ctx.lineTo(-3, 2.4); ctx.lineTo(-3, -2.4);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function loop() { step(); draw(); raf = requestAnimationFrame(loop); }

  resize(); seed();
  if (reduce) { draw(); }
  else { loop(); }

  let t;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(() => { cancelAnimationFrame(raf); resize(); seed(); if (!reduce) loop(); }, 150);
  });
})();

/* ---------- 2. Scroll reveals ---------- */
(function reveals() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(e => e.classList.add("in")); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el); });
})();

/* ---------- 3. Mobile nav ---------- */
(function nav() {
  const t = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (!t || !links) return;
  t.addEventListener("click", () => {
    links.classList.toggle("open");
    t.setAttribute("aria-expanded", links.classList.contains("open"));
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
})();

/* ---------- 4b. Image fallback (local asset -> live source) ---------- */
(function imgFallback() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", function onErr() {
      img.removeEventListener("error", onErr);
      img.src = img.dataset.fallback;
    });
  });
})();

/* ---------- 4. Publication filter ---------- */
(function pubFilter() {
  const bar = document.querySelector(".pubfilter");
  if (!bar) return;
  const scope = document.getElementById("published-list") || document;
  const pubs = [...scope.querySelectorAll(".pub")];
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    bar.querySelectorAll("button").forEach(x => x.classList.remove("is-on"));
    b.classList.add("is-on");
    const f = b.dataset.filter;
    pubs.forEach(p => {
      p.hidden = !(f === "all" || (p.dataset.tags || "").includes(f));
    });
  });
})();
