// prototype/scripts/state.js v3.5.0
let currentBikeType = 'road';
let currentConfig = {
  road: {
    frame: componentData.road.frame[0],
    drivetrain: componentData.road.drivetrain[0],
    wheelset: componentData.road.wheelset[0],
    cockpit: componentData.road.cockpit[0],
    tires: componentData.road.tires[0],
  },
  mtb: {
    frame: componentData.mtb.frame[0],
    drivetrain: componentData.mtb.drivetrain[0],
    wheelset: componentData.mtb.wheelset[0],
    suspension: componentData.mtb.suspension[0],
    tires: componentData.mtb.tires[0],
  },
  fold: {
    frame: componentData.fold.frame[0],
    drivetrain: componentData.fold.drivetrain[0],
    wheelset: componentData.fold.wheelset[0],
    accessories: componentData.fold.accessories[0],
    tires: componentData.fold.tires[0],
  }
};

function calculateTotals() {
  const config = currentConfig[currentBikeType];
  let totalCost = 0;
  let totalWeight = 0;

  Object.values(config).forEach(comp => {
    totalCost += comp.price;
    totalWeight += comp.weight;
  });

  return { cost: totalCost, weight: totalWeight.toFixed(2) };
}

function updateUI() {
  const config = currentConfig[currentBikeType];
  const totals = calculateTotals();

  if (config.frame) {
    document.getElementById('frame-name').textContent = config.frame.name;
    document.getElementById('frame-desc').textContent = config.frame.desc;
    document.getElementById('frame-price').textContent = `¥${config.frame.price.toLocaleString()}`;
    document.getElementById('frame-weight').textContent = `${config.frame.weight} kg`;
    document.getElementById('summary-frame').textContent = `¥${config.frame.price.toLocaleString()}`;
  }

  if (config.drivetrain) {
    document.getElementById('drivetrain-name').textContent = config.drivetrain.name;
    document.getElementById('drivetrain-desc').textContent = config.drivetrain.desc;
    document.getElementById('drivetrain-price').textContent = `¥${config.drivetrain.price.toLocaleString()}`;
    document.getElementById('drivetrain-weight').textContent = `${config.drivetrain.weight} kg`;
    document.getElementById('summary-drivetrain').textContent = `¥${config.drivetrain.price.toLocaleString()}`;
  }

  if (config.wheelset) {
    document.getElementById('wheelset-name').textContent = config.wheelset.name;
    document.getElementById('wheelset-desc').textContent = config.wheelset.desc;
    document.getElementById('wheelset-price').textContent = `¥${config.wheelset.price.toLocaleString()}`;
    document.getElementById('wheelset-weight').textContent = `${config.wheelset.weight} kg`;
    document.getElementById('summary-wheelset').textContent = `¥${config.wheelset.price.toLocaleString()}`;
  }

  if (config.cockpit) {
    document.getElementById('cockpit-name').textContent = config.cockpit.name;
    document.getElementById('cockpit-desc').textContent = config.cockpit.desc;
    document.getElementById('cockpit-price').textContent = `¥${config.cockpit.price.toLocaleString()}`;
    document.getElementById('cockpit-weight').textContent = `${config.cockpit.weight} kg`;
    document.getElementById('summary-cockpit').textContent = `¥${config.cockpit.price.toLocaleString()}`;
  }

  if (config.suspension) {
    document.getElementById('cockpit-name').textContent = config.suspension.name;
    document.getElementById('cockpit-desc').textContent = config.suspension.desc;
    document.getElementById('cockpit-price').textContent = `¥${config.suspension.price.toLocaleString()}`;
    document.getElementById('cockpit-weight').textContent = `${config.suspension.weight} kg`;
    document.getElementById('summary-cockpit').textContent = `¥${config.suspension.price.toLocaleString()}`;
  }

  if (config.accessories) {
    document.getElementById('cockpit-name').textContent = config.accessories.name;
    document.getElementById('cockpit-desc').textContent = config.accessories.desc;
    document.getElementById('cockpit-price').textContent = `¥${config.accessories.price.toLocaleString()}`;
    document.getElementById('cockpit-weight').textContent = `${config.accessories.weight} kg`;
    document.getElementById('summary-cockpit').textContent = `¥${config.accessories.price.toLocaleString()}`;
  }

  if (config.tires) {
    document.getElementById('tires-name').textContent = config.tires.name;
    document.getElementById('tires-desc').textContent = config.tires.desc;
    document.getElementById('tires-price').textContent = `¥${config.tires.price.toLocaleString()}`;
    document.getElementById('tires-weight').textContent = `${config.tires.weight} kg`;
    document.getElementById('summary-tires').textContent = `¥${config.tires.price.toLocaleString()}`;
  }

  const costEl = document.getElementById('total-cost');
  const weightEl = document.getElementById('total-weight');
  
  costEl.textContent = `¥${totals.cost.toLocaleString()}`;
  weightEl.textContent = `${totals.weight} kg`;
  
  costEl.classList.remove('animate-counter');
  weightEl.classList.remove('animate-counter');
  void costEl.offsetWidth;
  void weightEl.offsetWidth;
  costEl.classList.add('animate-counter');
  weightEl.classList.add('animate-counter');

  const componentCount = Object.keys(config).length;
  document.getElementById('component-count').textContent = `${componentCount} Components`;
}

function switchBikeType(type) {
  document.querySelectorAll(`.bike-type-btn[data-type="${type}"]`).forEach(b => {
    b.classList.add('active');
  });
  document.querySelectorAll(`.bike-type-btn:not([data-type="${type}"])`).forEach(b => {
    b.classList.remove('active');
  });

  currentBikeType = type;
  updateUI();
  showToast(`${type.toUpperCase()} configuration loaded`, 'success');
}

function resetConfiguration() {
  if (confirm('Are you sure you want to reset to default configuration?')) {
    const categories = Object.keys(componentData[currentBikeType]);
    categories.forEach(cat => {
      currentConfig[currentBikeType][cat] = componentData[currentBikeType][cat][0];
    });
    updateUI();
    showToast('Configuration reset to default', 'success');
  }
}
