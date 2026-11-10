// 文件路径: prototype/parts/part-02.js v4.4.9 — 由 scripts/split-prototype.mjs 生成
document.write(`        <div class="bike-type-card" data-type="fold" onclick="selectBikeType('fold')">
          <svg class="bike-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="6.5" cy="17.5" r="3.5"></circle>
            <circle cx="17.5" cy="17.5" r="3.5"></circle>
            <path d="M14 10h-3.5L9 17.5"></path>
            <path d="m11 10 2-5 3 1"></path>
            <path d="M10 10H7.5L6 17.5"></path>
          </svg>
          <div class="bike-type-name">折叠车 Fold</div>
          <div class="bike-type-desc">城市通勤的灵活伙伴</div>
          <div class="bike-type-specs">
            <div class="bike-type-spec">
              <span class="bike-type-spec-value mono">9.2kg</span>
              <span class="bike-type-spec-label">起重量</span>
            </div>
            <div class="bike-type-spec">
              <span class="bike-type-spec-value mono">¥18k</span>
              <span class="bike-type-spec-label">起售价</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Configurator Grid -->
      <div class="configurator-grid reveal">
        <!-- Build List -->
        <div>
          <div class="build-list">
            <div class="build-list-header">
              <div class="build-list-title">
                组件清单
                <span class="build-list-count mono" id="component-count">5 / 7</span>
              </div>
              <div class="build-progress">
                <div class="build-progress-bar">
                  <div class="build-progress-fill" id="progress-fill" style="width: 71%"></div>
                </div>
                <span class="build-progress-text mono" id="progress-text">71%</span>
              </div>
            </div>

            <div class="component-card" onclick="openComponentSelector('frame')">
              <div class="component-category">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <div class="component-info">
                <div class="component-cat-label">Frame / 车架</div>
                <div class="component-name">Veloform Pro Carbon T800</div>
                <div class="component-brand">Veloform · 碳纤维</div>
              </div>
              <div class="component-price">
                <div class="component-price-value mono">¥12,800</div>
                <div class="component-price-weight mono">890g</div>
              </div>
              <button class="component-edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            </div>

            <div class="component-card" onclick="openComponentSelector('drivetrain')">
              <div class="component-category">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <div class="component-info">
                <div class="component-cat-label">Drivetrain / 传动</div>
                <div class="component-name">Dura-Ace Di2 R9200</div>
                <div class="component-brand">Shimano · 12速</div>
              </div>
              <div class="component-price">
                <div class="component-price-value mono">¥18,500</div>
                <div class="component-price-weight mono">2,140g</div>
              </div>
              <button class="component-edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            </div>

            <div class="component-card" onclick="openComponentSelector('wheels')">
              <div class="component-category">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="1"></circle>
                  <line x1="12" y1="2" x2="12" y2="5"></line>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.05" y2="7.05"></line>
                  <line x1="16.95" y1="16.95" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="5" y2="12"></line>
                  <line x1="19" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.05" y2="16.95"></line>
                  <line x1="16.95" y1="7.05" x2="19.07" y2="4.93"></line>
                </svg>
              </div>
              <div class="component-info">
                <div class="component-cat-label">Wheels / 轮组</div>
                <div class="component-name">ZIPP 454 NSW Carbon</div>
                <div class="component-brand">ZIPP · 碟刹 700C</div>
              </div>
              <div class="component-price">
                <div class="component-price-value mono">¥22,000</div>
                <div class="component-price-weight mono">1,355g</div>
              </div>
              <button class="component-edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            </div>

            <div class="component-card" onclick="openComponentSelector('handlebar')">
              <div class="component-category">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 14h-5V6h-2v8H6l6 6 6-6z"></path>
                </svg>
              </div>
              <div class="component-info">
                <div class="component-cat-label">Handlebar / 操控</div>
                <div class="component-name">ENVE SES Aero Road</div>
                <div class="component-brand">ENVE · 全内走线</div>
              </div>
              <div class="component-price">
                <div class="component-price-value mono">¥5,200</div>
                <div class="component-price-weight mono">238g</div>
              </div>
              <button class="component-edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            </div>

            <div class="component-card" onclick="openComponentSelector('saddle')">
              <div class="component-category">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <ellipse cx="12" cy="7" rx="8" ry="3"></ellipse>
                  <path d="M4 7v5c0 4 4 6 8 6s8-2 8-6V7"></path>
                  <line x1="12" y1="13" x2="12" y2="22"></line>
                </svg>
              </div>
              <div class="component-info">
                <div class="component-cat-label">Saddle / 座垫</div>
                <div class="component-name">S-Works Romin EVO</div>
                <div class="component-brand">Specialized · 碳纤维导轨</div>
              </div>
              <div class="component-price">
                <div class="component-price-value mono">¥1,680</div>
                <div class="component-price-weight mono">168g</div>
              </div>
              <button class="component-edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            </div>

            <button class="add-component" onclick="openComponentSelector('tires')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              添加轮胎组件
            </button>
          </div>
        </div>
`);
