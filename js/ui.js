/* ============================================
   CODEQUEST - UI UTILITIES & GAMIFICATION
   ============================================ */

// === TOAST NOTIFICATIONS ===
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.getElementById('toast-container');
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        document.body.appendChild(this.container);
      }
    }
  },

  show(message, type = 'info', duration = 3000) {
    this.init();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toastIn 0.3s ease reverse forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success(msg) { this.show(msg, 'success'); },
  error(msg)   { this.show(msg, 'error'); },
  info(msg)    { this.show(msg, 'info'); },
  xp(amount)   { this.show(`+${amount} XP ⚡`, 'xp'); },
};

// === XP FLOAT ANIMATION ===
const XPAnimation = {
  show(amount, x, y) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = `+${amount} XP`;
    el.style.left = (x || window.innerWidth / 2) + 'px';
    el.style.top  = (y || window.innerHeight / 2) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },
};

// === CONFETTI ===
const Confetti = {
  canvas: null,
  ctx: null,
  particles: [],
  animating: false,

  init() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;';
      document.body.appendChild(this.canvas);
    }
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
  },

  burst(x, y) {
    this.init();
    const colors = ['#4f8aff','#00f5ff','#00ff88','#bd00ff','#ff6b00','#ffe600'];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 3,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.8) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 6,
        gravity: 0.3,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
      });
    }
    if (!this.animating) this.animate();
  },

  animate() {
    this.animating = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles = this.particles.filter(p => p.life > 0);

    for (const p of this.particles) {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.gravity;
      p.rot += p.rotV;
      p.life -= p.decay;

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle   = p.color;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rot * Math.PI / 180);
      this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },
};

// === ACHIEVEMENTS ===
const ACHIEVEMENTS_DEF = [
  { id: 'first_lesson',    emoji: '📖', name: 'First Steps',      desc: 'Complete your first lesson',           condition: p => (p.lessonsCompleted || 0) >= 1 },
  { id: 'first_challenge', emoji: '⚔️',  name: 'Challenger',       desc: 'Complete your first challenge',        condition: p => (p.challengesCompleted || 0) >= 1 },
  { id: 'streak_3',        emoji: '🔥', name: 'On Fire',           desc: 'Maintain a 3-day streak',              condition: p => p.streak >= 3 },
  { id: 'streak_7',        emoji: '🌟', name: 'Week Warrior',      desc: 'Maintain a 7-day streak',              condition: p => p.streak >= 7 },
  { id: 'xp_500',          emoji: '⚡', name: 'Power Surge',       desc: 'Earn 500 XP',                          condition: p => p.totalXp >= 500 },
  { id: 'xp_1000',         emoji: '💎', name: 'Diamond Coder',     desc: 'Earn 1000 XP',                         condition: p => p.totalXp >= 1000 },
  { id: 'level_5',         emoji: '🚀', name: 'Blast Off',         desc: 'Reach level 5',                        condition: p => p.level_num >= 5 },
  { id: 'level_10',        emoji: '🏆', name: 'Top Coder',         desc: 'Reach level 10',                       condition: p => p.level_num >= 10 },
  { id: 'perfect_score',   emoji: '✨', name: 'Perfectionist',     desc: 'Get 100% on any challenge',            condition: p => p.hasPerfectScore },
  { id: 'quick_finish',    emoji: '⚡', name: 'Speed Demon',       desc: 'Complete a challenge in under 60s',    condition: p => p.hasQuickFinish },
  { id: 'bug_hunter',      emoji: '🐛', name: 'Bug Hunter',        desc: 'Fix 5 debugging challenges',           condition: p => (p.debugsFixed || 0) >= 5 },
  { id: 'topic_mastered',  emoji: '🎓', name: 'Topic Master',      desc: 'Fully master any topic',               condition: p => (p.topicsMastered || 0) >= 1 },
];

const Achievements = {
  check(profile) {
    const earned = Storage.getAchievements();
    const newlyEarned = [];

    for (const ach of ACHIEVEMENTS_DEF) {
      if (!earned.includes(ach.id) && ach.condition(profile)) {
        const isNew = Storage.unlockAchievement(ach.id);
        if (isNew) {
          newlyEarned.push(ach);
          this.show(ach);
        }
      }
    }
    return newlyEarned;
  },

  show(ach) {
    const el = document.createElement('div');
    el.className = 'achievement-popup';
    el.innerHTML = `
      <div class="ach-icon">${ach.emoji}</div>
      <div>
        <div style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--neon-yellow);margin-bottom:2px;">Achievement Unlocked!</div>
        <div style="font-weight:700;font-size:1rem;">${ach.name}</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);">${ach.desc}</div>
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4100);
  },
};

// === PARTICLES BACKGROUND ===
const ParticlesBg = {
  canvas: null,
  ctx: null,
  particles: [],

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  createParticles() {
    const count = Math.floor(window.innerWidth / 18);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: ['#4f8aff','#00f5ff','#a855f7'][Math.floor(Math.random() * 3)],
      });
    }
  },

  animate() {
    if (!this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2,'0');
      this.ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(79,138,255,${0.08 * (1 - dist/120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  },
};

// === CODE SYNTAX HIGHLIGHTER ===
const SyntaxHighlighter = {
  highlight(code, lang) {
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const rules = {
      javascript: [
        [/\/\/.*$/gm,                               'comment'],
        [/"[^"]*"|'[^']*'|`[^`]*`/g,               'string'],
        [/\b(\d+\.?\d*)\b/g,                        'number'],
        [/\b(const|let|var|function|return|if|else|for|while|of|in|new|class|import|export|from|async|await|try|catch|throw|typeof|null|undefined|true|false)\b/g, 'keyword'],
        [/\b(console|Math|Array|Object|String|Number|JSON|Promise|fetch|document|window|localStorage)\b/g, 'builtin'],
        [/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, 'function'],
      ],
      python: [
        [/#.*$/gm,                                  'comment'],
        [/"[^"]*"|'[^']*'/g,                        'string'],
        [/\b(\d+\.?\d*)\b/g,                        'number'],
        [/\b(def|class|if|elif|else|for|while|in|import|from|return|True|False|None|and|or|not|with|as|try|except|raise|lambda|yield)\b/g, 'keyword'],
        [/\b(print|len|range|type|str|int|float|list|dict|set|tuple|input|open|map|filter|zip|enumerate|sorted)\b/g, 'builtin'],
        [/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,  'function'],
      ],
      sql: [
        [/--.*$/gm,                                 'comment'],
        [/'[^']*'/g,                                'string'],
        [/\b(\d+)\b/g,                              'number'],
        [/\b(SELECT|FROM|WHERE|AND|OR|NOT|INSERT|INTO|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|JOIN|INNER|LEFT|RIGHT|FULL|ON|GROUP|BY|ORDER|ASC|DESC|HAVING|LIMIT|OFFSET|AS|DISTINCT|COUNT|SUM|AVG|MAX|MIN|LIKE|IN|BETWEEN|IS|NULL|PRIMARY|KEY|FOREIGN|REFERENCES|INDEX)\b/gi, 'keyword'],
      ],
    };

    const langRules = rules[lang] || rules.javascript;
    for (const [regex, cls] of langRules) {
      escaped = escaped.replace(regex, m => `<span class="token-${cls}">${m}</span>`);
    }
    return escaped;
  },

  renderBlock(code, lang) {
    return `<pre class="code-block"><code>${this.highlight(code, lang)}</code></pre>`;
  },
};

// === PROGRESS HELPERS ===
const ProgressUI = {
  animateBar(el, pct) {
    if (!el) return;
    setTimeout(() => {
      el.style.width = Math.min(100, pct) + '%';
    }, 100);
  },

  countUp(el, target, duration = 800) {
    if (!el) return;
    const start = parseInt(el.textContent) || 0;
    const step  = (target - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += step;
      if ((step > 0 && current >= target) || (step < 0 && current <= target)) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  },
};

// === MASTERY LEVELS ===
const MASTERY = {
  0:  { label: 'Not Started', color: 'var(--text-muted)',     icon: '⬜' },
  25: { label: 'Learning',    color: 'var(--neon-orange)',    icon: '🟧' },
  50: { label: 'Comfortable', color: 'var(--neon-yellow)',    icon: '🟨' },
  75: { label: 'Proficient',  color: 'var(--primary)',        icon: '🟦' },
  100:{ label: 'Mastered',    color: 'var(--neon-green)',     icon: '🟩' },

  getLevel(pct) {
    if (pct >= 100) return this[100];
    if (pct >= 75)  return this[75];
    if (pct >= 50)  return this[50];
    if (pct >= 25)  return this[25];
    return this[0];
  },
};

// === NAV HELPERS ===
const Nav = {
  highlight(page) {
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.page === page);
    });
  },

  renderXP(xp, level) {
    return `
      <div class="xp-display">
        <span>⚡</span>
        <span>${xp.toLocaleString()} XP</span>
        <span style="color:var(--text-muted);font-weight:400">Lv.${level}</span>
      </div>
    `;
  },

  renderStreak(streak) {
    return `
      <div class="streak-display">
        <span class="streak-fire">🔥</span>
        <span>${streak}</span>
      </div>
    `;
  },
};

// === KEYBOARD SHORTCUTS ===
const Shortcuts = {
  init() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => {
          m.classList.remove('active');
        });
      }
    });
  },
};

// === MODAL ===
const Modal = {
  open(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('active');
  },

  close(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove('active');
  },

  closeOnOverlayClick() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    });
  },
};

// Init shortcuts on load
document.addEventListener('DOMContentLoaded', () => {
  Shortcuts.init();
  Modal.closeOnOverlayClick();
});
