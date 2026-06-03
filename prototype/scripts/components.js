// prototype/scripts/components.js v3.5.0
let currentModalCategory = null;

function openComponentModal(category) {
  currentModalCategory = category;
  const data = componentData[currentBikeType][category];
  
  if (!data) return;

  document.getElementById('modal-title').textContent = `Select ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  document.getElementById('modal-subtitle').textContent = `Choose from ${data.length} available options`;
  
  const content = document.getElementById('modal-content');
  content.innerHTML = data.map(item => `
    <div class="component-item" onclick="selectComponent('${category}', '${item.id}')">
      <div class="component-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${getIconForCategory(category)}
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-primary">${item.name}</h4>
        <p class="text-sm text-secondary">${item.desc}</p>
      </div>
      <div class="text-right">
        <p class="font-bold text-primary">¥${item.price.toLocaleString()}</p>
        <p class="text-xs text-muted">${item.weight} kg</p>
      </div>
    </div>
  `).join('');
  
  document.getElementById('component-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('component-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function selectComponent(category, itemId) {
  const items = componentData[currentBikeType][category];
  const selectedItem = items.find(item => item.id === itemId);
  
  if (selectedItem) {
    currentConfig[currentBikeType][category] = selectedItem;
    updateUI();
    closeModal();
    showToast(`${selectedItem.name} selected`, 'success');
  }
}

function openSaveModal() {
  document.getElementById('save-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSaveModal() {
  document.getElementById('save-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function saveConfiguration() {
  closeSaveModal();
  showToast('Configuration saved successfully!', 'success');
}

function openShareModal() {
  document.getElementById('share-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeShareModal() {
  document.getElementById('share-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function copyShareLink() {
  const input = document.querySelector('#share-modal input');
  input.select();
  document.execCommand('copy');
  showToast('Link copied to clipboard!', 'success');
}
