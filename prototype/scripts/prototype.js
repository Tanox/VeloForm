// 文件路径: prototype/scripts/prototype.js v4.4.9 — 由 scripts/split-prototype.mjs 生成
// ============================================================
// 主题切换功能
// ============================================================
const themes = ['dark', 'light'];
let currentThemeIndex = 0;

// 初始化：检查系统偏好或本地存储
function initTheme() {
  const stored = localStorage.getItem('veloform-theme');
  if (stored && themes.includes(stored)) {
    document.documentElement.setAttribute('data-theme', stored);
    currentThemeIndex = themes.indexOf(stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
    currentThemeIndex = 1;
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    currentThemeIndex = 0;
  }
  updateThemeIcon();
}

// 切换主题
function toggleTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const newTheme = themes[currentThemeIndex];
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('veloform-theme', newTheme);
  updateThemeIcon();
}

// 更新主题图标
function updateThemeIcon() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const isDark = currentThemeIndex === 0;
  themeBtn.innerHTML = isDark
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
  themeBtn.setAttribute('title', isDark ? '切换到浅色模式' : '切换到深色模式');
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('veloform-theme')) {
    currentThemeIndex = e.matches ? 0 : 1;
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    updateThemeIcon();
  }
});

// 初始化主题
initTheme();

// ============================================================
// 导航栏滚动效果
// ============================================================
const navbar = document.getElementById('site-navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll to section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 68;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// Scroll reveal animation
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
revealEls.forEach((el) => observer.observe(el));

// Bike type selector
let currentBikeType = 'road';
function selectBikeType(type) {
  currentBikeType = type;
  document.querySelectorAll('.bike-type-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.type === type);
  });
}

// Component selector modal
const categoryLabels = {
  frame: { eyebrow: 'Frame / 车架', title: '选择车架' },
  drivetrain: { eyebrow: 'Drivetrain / 传动', title: '选择传动系统' },
  wheels: { eyebrow: 'Wheels / 轮组', title: '选择轮组' },
  handlebar: { eyebrow: 'Handlebar / 操控', title: '选择操控组件' },
  saddle: { eyebrow: 'Saddle / 座垫', title: '选择座垫' },
  tires: { eyebrow: 'Tires / 轮胎', title: '选择轮胎' },
};

function openComponentSelector(category) {
  const modal = document.getElementById('component-modal');
  const labels = categoryLabels[category] || { eyebrow: category, title: '选择组件' };
  document.getElementById('modal-eyebrow').textContent = labels.eyebrow;
  document.getElementById('modal-title').textContent = labels.title;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeComponentSelector() {
  const modal = document.getElementById('component-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('component-modal').addEventListener('click', (e) => {
  if (e.target.id === 'component-modal') {
    closeComponentSelector();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeComponentSelector();
  }
});

// Option card selection
document.querySelectorAll('.option-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.option-card').forEach((c) => c.classList.remove('selected'));
    card.classList.add('selected');
    setTimeout(closeComponentSelector, 300);
  });
});

// Filter chips
document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
  });
});

// Animated counter for hero metrics
function animateCounter(el, target, suffix = '', duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
