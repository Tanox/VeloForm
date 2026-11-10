// 文件路径: prototype/parts/part-01.js v4.4.9 — 由 scripts/split-prototype.mjs 生成
document.write(`  <div class="grid-bg"></div>

  <!-- Navigation -->
  <nav class="nav" id="site-navbar">
    <div class="container nav-inner">
      <div class="nav-logo" onclick="scrollToSection('hero')">
        <div class="nav-logo-mark"></div>
        <span class="nav-logo-text">Veloform</span>
      </div>
      <ul class="nav-links">
        <li><button class="nav-link active" onclick="scrollToSection('hero')">首页</button></li>
        <li><button class="nav-link" onclick="scrollToSection('configurator')">配置器</button></li>
        <li><button class="nav-link" onclick="scrollToSection('features')">特性</button></li>
        <li><button class="nav-link" onclick="scrollToSection('site-footer')">关于</button></li>
      </ul>
      <div class="nav-actions">
        <button id="theme-toggle" class="icon-btn" title="主题切换" onclick="toggleTheme()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>
        <button class="btn-primary" onclick="scrollToSection('configurator')">
          开始构建
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero" id="hero">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span class="hero-eyebrow-dot"></span>
            Precision Configurator v2.0
          </div>
          <h1 class="hero-title display-xl">
            <span class="hero-title-line">构建你的</span>
            <span class="hero-title-line hero-title-accent">完美坐骑</span>
          </h1>
          <p class="hero-desc">
            从车架到轮组，每一个零件都由你亲手挑选。
            工业级精度的配置系统，让每一辆 Veloform 都成为独一无二的艺术品。
          </p>
          <div class="hero-actions">
            <button class="btn-primary" onclick="scrollToSection('configurator')">
              启动配置器
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button class="btn-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              观看演示
            </button>
          </div>
          <div class="hero-meta">
            <div class="hero-meta-item">
              <span class="hero-meta-value mono">500+</span>
              <span class="hero-meta-label">组件选项</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-value mono">12kg</span>
              <span class="hero-meta-label">最轻配置</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-value mono">∞</span>
              <span class="hero-meta-label">组合可能</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-visual-frame">
            <img
              class="hero-visual-img"
              src="https://images.unsplash.com/photo-1571068316384-4e6e9a41b2b6?w=800&h=1000&fit=crop&q=80"
              data-src-fallback="https://images.unsplash.com/photo-1571068316384-4e6e9a41b2b6?w=800&h=1000&fit=crop&q=80"
              alt="Veloform 公路车"
            />
            <div class="hero-visual-overlay"></div>
            <div class="hero-visual-badge">
              <span class="mono">FRAME — T800 CARBON</span>
            </div>
            <div class="hero-visual-info">
              <div class="hero-visual-spec">
                <span class="hero-visual-spec-label">重量</span>
                <span class="hero-visual-spec-value mono">890g</span>
              </div>
              <div class="hero-visual-spec" style="text-align: right;">
                <span class="hero-visual-spec-label">刚性</span>
                <span class="hero-visual-spec-value mono">142 N/mm</span>
              </div>
            </div>
          </div>
          <div class="hero-spec-card">
            <div class="hero-spec-card-label">配置完成度</div>
            <div class="hero-spec-card-value mono">72%</div>
            <div class="hero-spec-card-unit">COMPLETION</div>
            <div class="hero-spec-card-bar">
              <div class="hero-spec-card-fill"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Configurator Section -->
  <section class="config-section" id="configurator">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-title-block">
          <span class="eyebrow">Configurator</span>
          <h2 class="section-title display-lg">精密配置系统</h2>
          <p class="section-desc">
            从车架到把带，每一个细节都在你的掌控之中。
            实时价格与重量计算，让你的决策有据可依。
          </p>
        </div>
      </div>

      <!-- Bike Type Selector -->
      <div class="bike-type-selector reveal" id="bike-type-selector">
        <div class="bike-type-card active" data-type="road" onclick="selectBikeType('road')">
          <svg class="bike-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="5.5" cy="17.5" r="3.5"></circle>
            <circle cx="18.5" cy="17.5" r="3.5"></circle>
            <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
            <path d="m12 17.5 2-8h4l-3-5-3 5-4-2-2 5 4 5z"></path>
          </svg>
          <div class="bike-type-name">公路车 Road</div>
          <div class="bike-type-desc">速度与效率的终极选择</div>
          <div class="bike-type-specs">
            <div class="bike-type-spec">
              <span class="bike-type-spec-value mono">6.8kg</span>
              <span class="bike-type-spec-label">起重量</span>
            </div>
            <div class="bike-type-spec">
              <span class="bike-type-spec-value mono">¥32k</span>
              <span class="bike-type-spec-label">起售价</span>
            </div>
          </div>
        </div>

        <div class="bike-type-card" data-type="mtb" onclick="selectBikeType('mtb')">
          <svg class="bike-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m19 10-2 7-3-1-2-3-2 2-2-1-2 3"></path>
            <circle cx="7" cy="19" r="3"></circle>
            <circle cx="17" cy="19" r="3"></circle>
            <path d="M8 10h5l2-4 3 1-2 4"></path>
          </svg>
          <div class="bike-type-name">山地车 MTB</div>
          <div class="bike-type-desc">征服一切地形的野性座驾</div>
          <div class="bike-type-specs">
            <div class="bike-type-spec">
              <span class="bike-type-spec-value mono">10.5kg</span>
              <span class="bike-type-spec-label">起重量</span>
            </div>
            <div class="bike-type-spec">
              <span class="bike-type-spec-value mono">¥28k</span>
              <span class="bike-type-spec-label">起售价</span>
            </div>
          </div>
        </div>
`);
