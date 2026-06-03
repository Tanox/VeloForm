// prototype/scripts/main.js v3.5.0
document.addEventListener('DOMContentLoaded', () => {
  initBikeTypeButtons();
  initModalButtons();
  initActionButtons();
  initScrollHandler();
  initOverlayClickHandler();
  initKeyboardShortcuts();
  updateUI();
});

function initBikeTypeButtons() {
  document.querySelectorAll('.bike-type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const type = this.dataset.type;
      switchBikeType(type);
    });
  });
}

function initModalButtons() {
  document.querySelectorAll('[onclick^="openComponentModal"]').forEach(el => {
    const category = el.dataset.category;
    if (category) {
      el.addEventListener('click', () => openComponentModal(category));
    }
  });
}

function initActionButtons() {
  document.getElementById('save-btn')?.addEventListener('click', openSaveModal);
  document.getElementById('mobile-save-btn')?.addEventListener('click', openSaveModal);
  document.getElementById('share-btn')?.addEventListener('click', openShareModal);
  document.getElementById('mobile-share-btn')?.addEventListener('click', openShareModal);
  document.getElementById('copy-link-btn')?.addEventListener('click', copyShareLink);
  document.getElementById('reset-btn')?.addEventListener('click', resetConfiguration);
}

function initScrollHandler() {
  window.addEventListener('scroll', handleScroll);
}

function initOverlayClickHandler() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
}
