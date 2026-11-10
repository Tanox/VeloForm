// 文件路径: prototype/parts/part-04.js v4.4.9 — 由 scripts/split-prototype.mjs 生成
document.write(`          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h3 class="feature-title">BOM 导出</h3>
          <p class="feature-desc">
            一键导出详细的物料清单，包含规格参数、价格明细，
            方便采购与预算管理。
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer" id="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="nav-logo-mark" style="width: 24px; height: 24px;"></div>
          <span class="footer-text">© 2026 Veloform. Precision Engineering.</span>
        </div>
        <ul class="footer-links">
          <li class="footer-link">隐私政策</li>
          <li class="footer-link">使用条款</li>
          <li class="footer-link">联系我们</li>
        </ul>
      </div>
    </div>
  </footer>

  <!-- Component Selector Modal -->
  <div class="modal-overlay" id="component-modal">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title-block">
          <span class="modal-eyebrow" id="modal-eyebrow">Frame / 车架</span>
          <h3 class="modal-title" id="modal-title">选择车架</h3>
        </div>
        <button class="modal-close" onclick="closeComponentSelector()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-filter">
          <button class="filter-chip active">全部</button>
          <button class="filter-chip">碳纤维</button>
          <button class="filter-chip">铝合金</button>
          <button class="filter-chip">钛合金</button>
        </div>
        <div class="option-grid">
          <div class="option-card selected">
            <div class="option-brand">Veloform</div>
            <div class="option-name">Pro Carbon T800 车架组</div>
            <div class="option-specs">
              <div class="option-spec">
                <span class="option-spec-value mono">¥12,800</span>
                <span class="option-spec-label">价格</span>
              </div>
              <div class="option-spec">
                <span class="option-spec-value mono">890g</span>
                <span class="option-spec-label">重量</span>
              </div>
              <div class="option-spec">
                <span class="option-spec-value mono">T800</span>
                <span class="option-spec-label">材质</span>
              </div>
            </div>
          </div>
          <div class="option-card">
            <div class="option-brand">Veloform</div>
            <div class="option-name">Team Carbon T1000 车架组</div>
            <div class="option-specs">
              <div class="option-spec">
                <span class="option-spec-value mono">¥18,500</span>
                <span class="option-spec-label">价格</span>
              </div>
              <div class="option-spec">
                <span class="option-spec-value mono">780g</span>
                <span class="option-spec-label">重量</span>
              </div>
              <div class="option-spec">
                <span class="option-spec-value mono">T1000</span>
                <span class="option-spec-label">材质</span>
              </div>
            </div>
          </div>
          <div class="option-card">
            <div class="option-brand">Veloform</div>
            <div class="option-name">Alloy Pro 铝合金车架</div>
            <div class="option-specs">
              <div class="option-spec">
                <span class="option-spec-value mono">¥4,200</span>
                <span class="option-spec-label">价格</span>
              </div>
              <div class="option-spec">
                <span class="option-spec-value mono">1,320g</span>
                <span class="option-spec-label">重量</span>
              </div>
              <div class="option-spec">
                <span class="option-spec-value mono">AL7075</span>
                <span class="option-spec-label">材质</span>
              </div>
            </div>
          </div>
          <div class="option-card">
            <div class="option-brand">Veloform</div>
            <div class="option-name">Titanium 钛合金车架</div>
            <div class="option-specs">
              <div class="option-spec">
                <span class="option-spec-value mono">¥22,000</span>
                <span class="option-spec-label">价格</span>
              </div>
              <div class="option-spec">
                <span class="option-spec-value mono">1,150g</span>
                <span class="option-spec-label">重量</span>
              </div>
              <div class="option-spec">
                <span class="option-spec-value mono">Ti-3Al</span>
                <span class="option-spec-label">材质</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
`);
