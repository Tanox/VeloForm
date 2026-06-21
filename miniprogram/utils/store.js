// utils/store.js - 配置状态管理与本地存储

const { STORAGE_KEYS } = require('./constants');
const {
  generateId,
  deepClone,
  showToast,
  formatDate,
  validateConfig,
  validateComponent,
  ERROR_CODES,
  createError
} = require('./util');

let globalState = {
  configurations: [],
  currentConfig: null,
  selectedBikeType: 'Road',
  isLoaded: false,
  compareList: []
};

function init() {
  try {
    const configs = wx.getStorageSync(STORAGE_KEYS.CONFIGURATIONS) || [];
    const current = wx.getStorageSync(STORAGE_KEYS.CURRENT_CONFIG) || null;
    const compareList = wx.getStorageSync(STORAGE_KEYS.COMPARE_LIST) || [];

    globalState.configurations = validateConfigurations(configs);
    globalState.currentConfig = current ? validateAndFixConfig(current) : null;
    globalState.compareList = compareList;
    globalState.isLoaded = true;

    if (!globalState.currentConfig && globalState.configurations.length === 0) {
      createDefaultConfig();
    }
  } catch (e) {
    console.error('初始化存储失败', e);
    globalState.isLoaded = true;
  }
}

function validateConfigurations(configs) {
  if (!Array.isArray(configs)) return [];
  
  return configs.filter(config => {
    const validation = validateConfig(config);
    if (!validation.valid) {
      console.warn('过滤无效配置:', validation.errors);
      return false;
    }
    return true;
  });
}

function validateAndFixConfig(config) {
  const validation = validateConfig(config);
  if (!validation.valid) {
    console.warn('配置验证失败，尝试修复:', validation.errors);
    if (!config.id) config.id = generateId('config');
    if (!config.name) config.name = '未命名配置';
    if (!config.bikeType) config.bikeType = 'Road';
    if (!config.components) config.components = [];
    if (!config.createdAt) config.createdAt = Date.now();
    if (!config.updatedAt) config.updatedAt = Date.now();
  }
  return config;
}

function refresh() {
  try {
    globalState.configurations = validateConfigurations(
      wx.getStorageSync(STORAGE_KEYS.CONFIGURATIONS) || []
    );
    globalState.currentConfig = validateAndFixConfig(
      wx.getStorageSync(STORAGE_KEYS.CURRENT_CONFIG) || null
    );
    globalState.compareList = wx.getStorageSync(STORAGE_KEYS.COMPARE_LIST) || [];
  } catch (e) {
    console.error('刷新存储失败', e);
  }
}

function saveToStorage() {
  try {
    wx.setStorageSync(STORAGE_KEYS.CONFIGURATIONS, globalState.configurations);
    wx.setStorageSync(STORAGE_KEYS.CURRENT_CONFIG, globalState.currentConfig);
    wx.setStorageSync(STORAGE_KEYS.COMPARE_LIST, globalState.compareList);
    return true;
  } catch (e) {
    console.error('保存到存储失败', e);
    return false;
  }
}

function createDefaultConfig() {
  const defaultConfig = {
    id: generateId('config'),
    name: '我的公路车配置',
    bikeType: 'Road',
    components: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  globalState.configurations = [defaultConfig];
  globalState.currentConfig = defaultConfig;

  try {
    wx.setStorageSync(STORAGE_KEYS.CONFIGURATIONS, globalState.configurations);
    wx.setStorageSync(STORAGE_KEYS.CURRENT_CONFIG, globalState.currentConfig);
  } catch (e) {
    console.error('保存默认配置失败', e);
  }
}

function getConfigurations() {
  return deepClone(globalState.configurations);
}

function getCurrentConfig() {
  return deepClone(globalState.currentConfig);
}

function setCurrentConfig(configId) {
  const config = globalState.configurations.find(c => c.id === configId);
  if (config) {
    globalState.currentConfig = config;
    try {
      wx.setStorageSync(STORAGE_KEYS.CURRENT_CONFIG, config);
    } catch (e) {
      console.error('设置当前配置失败', e);
    }
    return true;
  }
  return false;
}

function createConfiguration(bikeType, name) {
  if (!bikeType) {
    console.error('创建配置失败：车型不能为空');
    return null;
  }

  const newConfig = {
    id: generateId('config'),
    name: name || `我的${getBikeTypeName(bikeType)}配置`,
    bikeType: bikeType,
    components: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  const validation = validateConfig(newConfig);
  if (!validation.valid) {
    console.error('配置验证失败:', validation.errors);
    return null;
  }

  globalState.configurations.unshift(newConfig);
  globalState.currentConfig = newConfig;

  if (!saveToStorage()) {
    showToast({ title: '保存失败，请检查存储空间', icon: 'error' });
  }

  return deepClone(newConfig);
}

function updateConfiguration(configId, updates) {
  const index = globalState.configurations.findIndex(c => c.id === configId);
  if (index === -1) {
    console.error('更新配置失败：未找到配置');
    return null;
  }

  const updatedConfig = {
    ...globalState.configurations[index],
    ...updates,
    updatedAt: Date.now()
  };

  const validation = validateConfig(updatedConfig);
  if (!validation.valid) {
    console.error('配置更新验证失败:', validation.errors);
    return null;
  }

  globalState.configurations[index] = updatedConfig;

  if (globalState.currentConfig && globalState.currentConfig.id === configId) {
    globalState.currentConfig = updatedConfig;
  }

  if (!saveToStorage()) {
    showToast({ title: '保存失败，请检查存储空间', icon: 'error' });
  }

  return deepClone(updatedConfig);
}

function deleteConfiguration(configId) {
  const index = globalState.configurations.findIndex(c => c.id === configId);
  if (index === -1) {
    console.error('删除配置失败：未找到配置');
    return false;
  }

  globalState.configurations.splice(index, 1);

  if (globalState.currentConfig && globalState.currentConfig.id === configId) {
    globalState.currentConfig = globalState.configurations[0] || null;
  }

  globalState.compareList = globalState.compareList.filter(id => id !== configId);

  if (!saveToStorage()) {
    showToast({ title: '删除失败，请重试', icon: 'error' });
    return false;
  }

  return true;
}

function addComponent(configId, component) {
  const config = globalState.configurations.find(c => c.id === configId);
  if (!config) {
    console.error('添加组件失败：未找到配置');
    return null;
  }

  const validation = validateComponent(component);
  if (!validation.valid) {
    console.error('组件验证失败:', validation.errors);
    return null;
  }

  const existingComponent = config.components.find(
    c => c.category === component.category && c.name === component.name
  );
  if (existingComponent) {
    showToast({ title: '该组件已存在', icon: 'none' });
    return deepClone(config);
  }

  const newComponent = {
    ...component,
    id: generateId('comp'),
    addedAt: Date.now()
  };

  config.components.push(newComponent);
  config.updatedAt = Date.now();

  if (globalState.currentConfig && globalState.currentConfig.id === configId) {
    globalState.currentConfig = config;
  }

  if (!saveToStorage()) {
    showToast({ title: '保存失败，请检查存储空间', icon: 'error' });
  }

  return deepClone(config);
}

function removeComponent(configId, componentId) {
  const config = globalState.configurations.find(c => c.id === configId);
  if (!config) return null;

  const compIndex = config.components.findIndex(c => c.id === componentId);
  if (compIndex !== -1) {
    config.components.splice(compIndex, 1);
    config.updatedAt = Date.now();
  }

  if (globalState.currentConfig && globalState.currentConfig.id === configId) {
    globalState.currentConfig = config;
  }

  try {
    wx.setStorageSync(STORAGE_KEYS.CONFIGURATIONS, globalState.configurations);
    wx.setStorageSync(STORAGE_KEYS.CURRENT_CONFIG, globalState.currentConfig);
  } catch (e) {
    console.error('删除组件失败', e);
  }

  return deepClone(config);
}

function getBikeTypeName(bikeType) {
  const names = {
    Road: '公路车',
    MTB: '山地车',
    Fold: '折叠车'
  };
  return names[bikeType] || '自行车';
}

function setSelectedBikeType(bikeType) {
  globalState.selectedBikeType = bikeType;
}

function getSelectedBikeType() {
  return globalState.selectedBikeType;
}

function addToCompare(configId) {
  if (!configId) {
    console.error('添加对比失败：配置ID为空');
    return false;
  }

  if (globalState.compareList.includes(configId)) {
    showToast({ title: '该配置已在对比列表中', icon: 'none' });
    return false;
  }

  if (globalState.compareList.length >= 3) {
    showToast({ title: '最多只能对比3个配置', icon: 'none' });
    return false;
  }

  globalState.compareList.push(configId);
  
  if (!saveToStorage()) {
    showToast({ title: '保存失败', icon: 'error' });
    return false;
  }

  showToast({ title: '已添加到对比', icon: 'success' });
  return true;
}

function removeFromCompare(configId) {
  const index = globalState.compareList.indexOf(configId);
  if (index === -1) {
    console.error('移除对比失败：未找到配置');
    return false;
  }

  globalState.compareList.splice(index, 1);
  
  if (!saveToStorage()) {
    showToast({ title: '保存失败', icon: 'error' });
    return false;
  }

  return true;
}

function getCompareList() {
  return deepClone(globalState.compareList);
}

function getCompareConfigurations() {
  return globalState.compareList
    .map(id => globalState.configurations.find(c => c.id === id))
    .filter(Boolean);
}

function clearCompareList() {
  globalState.compareList = [];
  
  if (!saveToStorage()) {
    showToast({ title: '保存失败', icon: 'error' });
    return false;
  }

  return true;
}

function exportData() {
  try {
    const data = {
      configurations: globalState.configurations,
      currentConfig: globalState.currentConfig,
      compareList: globalState.compareList,
      selectedBikeType: globalState.selectedBikeType,
      exportTime: Date.now(),
      version: '3.8.0'
    };
    return JSON.stringify(data, null, 2);
  } catch (e) {
    console.error('导出数据失败', e);
    return null;
  }
}

function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    
    if (!data.configurations || !Array.isArray(data.configurations)) {
      throw createError(ERROR_CODES.VALIDATION_ERROR, '导入数据格式不正确');
    }

    globalState.configurations = validateConfigurations(data.configurations);
    globalState.currentConfig = data.currentConfig ? validateAndFixConfig(data.currentConfig) : null;
    globalState.compareList = data.compareList || [];
    globalState.selectedBikeType = data.selectedBikeType || 'Road';

    if (!saveToStorage()) {
      throw createError(ERROR_CODES.STORAGE_ERROR, '保存失败');
    }

    showToast({ title: '导入成功', icon: 'success' });
    return true;
  } catch (e) {
    console.error('导入数据失败', e);
    showToast({ title: e.message || '导入失败', icon: 'error' });
    return false;
  }
}

module.exports = {
  init,
  refresh,
  getConfigurations,
  getCurrentConfig,
  setCurrentConfig,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
  addComponent,
  removeComponent,
  setSelectedBikeType,
  getSelectedBikeType,
  addToCompare,
  removeFromCompare,
  getCompareList,
  getCompareConfigurations,
  clearCompareList,
  exportData,
  importData
};
