// 文件路径: prototype/parts/part-03.js v4.4.9 — 由 scripts/split-prototype.mjs 生成
document.write(`        <!-- Summary Panel -->
        <div class="summary-panel">
          <div class="summary-header">
            <div class="summary-label">当前配置</div>
            <div class="summary-name">Veloform Pro Build</div>
            <div class="summary-type">
              <span class="summary-type-dot"></span>
              Road Bike
            </div>
          </div>

          <div class="summary-stats">
            <div class="summary-stat">
              <div class="summary-stat-label">
                <svg class="summary-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                总价
              </div>
              <div class="summary-stat-value mono" id="total-price">¥60,180</div>
            </div>
            <div class="summary-stat">
              <div class="summary-stat-label">
                <svg class="summary-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                总重
              </div>
              <div class="summary-stat-value mono" id="total-weight">4,791g</div>
            </div>
          </div>

          <div class="summary-breakdown">
            <div class="summary-breakdown-title">成本分布</div>
            <div class="cost-chart">
              <div class="cost-row">
                <span class="cost-label">车架</span>
                <div class="cost-bar">
                  <div class="cost-bar-fill frame" style="width: 21%"></div>
                </div>
                <span class="cost-value mono">21%</span>
              </div>
              <div class="cost-row">
                <span class="cost-label">传动</span>
                <div class="cost-bar">
                  <div class="cost-bar-fill drivetrain" style="width: 31%"></div>
                </div>
                <span class="cost-value mono">31%</span>
              </div>
              <div class="cost-row">
                <span class="cost-label">轮组</span>
                <div class="cost-bar">
                  <div class="cost-bar-fill wheels" style="width: 37%"></div>
                </div>
                <span class="cost-value mono">37%</span>
              </div>
              <div class="cost-row">
                <span class="cost-label">其他</span>
                <div class="cost-bar">
                  <div class="cost-bar-fill components" style="width: 11%"></div>
                </div>
                <span class="cost-value mono">11%</span>
              </div>
            </div>
          </div>

          <div class="summary-actions">
            <button class="btn-primary" style="justify-content: center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              保存配置
            </button>
            <div class="summary-secondary">
              <button class="btn-ghost" style="justify-content: center;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                分享
              </button>
              <button class="btn-ghost" style="justify-content: center;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
                重置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features-section" id="features">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-title-block">
          <span class="eyebrow">Features</span>
          <h2 class="section-title display-lg">工程级特性</h2>
          <p class="section-desc">
            每一个细节都经过精密调校，为你带来极致的配置体验。
          </p>
        </div>
      </div>

      <div class="features-grid reveal">
        <div class="feature-card">
          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <h3 class="feature-title">兼容性校验</h3>
          <p class="feature-desc">
            实时检查组件间的兼容性，自动提示不匹配的零件组合，
            让你的配置从一开始就是正确的。
          </p>
        </div>

        <div class="feature-card">
          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <h3 class="feature-title">实时计算</h3>
          <p class="feature-desc">
            价格、重量、几何参数全部实时更新。
            每一次选择都能立即看到对整车的影响。
          </p>
        </div>

        <div class="feature-card">
          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <h3 class="feature-title">3D 预览</h3>
          <p class="feature-desc">
            交互式 3D 模型让你从每一个角度审视你的作品，
            配色方案实时预览。
          </p>
        </div>

        <div class="feature-card">
          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          <h3 class="feature-title">云端保存</h3>
          <p class="feature-desc">
            多设备同步，随时从上次离开的地方继续。
            支持无限版本历史，任意回退。
          </p>
        </div>

        <div class="feature-card">
          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <h3 class="feature-title">一键分享</h3>
          <p class="feature-desc">
            生成专属链接或精美海报，与朋友分享你的配置方案，
            或者寻求社群建议。
          </p>
        </div>

        <div class="feature-card">`);
