// prototype/scripts/utils.js v3.5.0
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  toastMessage.textContent = message;
  toast.className = `toast toast-${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function getIconForCategory(category) {
  const icons = {
    frame: '<path d="M12 2H2v20h20V10l-6-6Z"/><path d="M16 2 16 8 22 8"/>',
    drivetrain: '<path d="M16 6h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3"/><path d="m7.5 4.27 9 5.15"/><circle cx="17.5" cy="17.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/>',
    wheelset: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
    cockpit: '<path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0H4"/><path d="M17 13h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h2"/>',
    suspension: '<path d="M12 2v20"/><path d="M8 6h8"/><path d="M8 18h8"/><circle cx="12" cy="12" r="2"/>',
    tires: '<circle cx="12" cy="12" r="10"/><path d="M22 12a10 10 0 0 0-9.9-10"/><path d="M12 2a10 10 0 0 0-8.5 15"/><path d="M22 12a10 10 0 0 1-7 9.7"/>',
    accessories: '<path d="M20 7h-3a2 2 0 0 1-2-2V2"/><path d="M9 18v-1a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2Z"/><path d="M15 2H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/>'
  };
  return icons[category] || icons.frame;
}

function loadPreset(preset) {
  showToast(`${preset.replace('-', ' ')} configuration loaded`, 'success');
}

function handleScroll() {
  const bottomBar = document.getElementById('mobile-bottom-bar');
  if (window.scrollY > 100) {
    bottomBar.classList.add('visible');
  } else {
    bottomBar.classList.remove('visible');
  }
}
