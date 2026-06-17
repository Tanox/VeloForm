// utils/store.js - 配置状态管理与本地存储

const { STORAGE_KEYS } = require('./constants');
const { generateId, deepClone, showToast, formatDate } = require('./util');

let globalState = {
  configurations: [],
  currentConfig: null,
  selectedBikeType: 'Road',
  isLoaded: false
};

function init() {
  try {
    const configs = wx.getStorageSync(STORAGE_KEYS.CONFIGURATIONS) || [];
    const current = wx.getStorageSync(STORAGE_KEYS.CURRENT_CONFIG) || null;

    globalState.configurations = configs;
    globalState.currentConfig = current;
    globalState.isLoaded = true;

    // 如果没有保存的配置，创建默认配置
    if (!current && configs.length === 0) {
      createDefaultConfig();
    }
  } catch (e) {
    console.error('初始化存储失败', e);
    globalState.isLoaded = true;
  }
}

function refresh() {
  try {
    globalState.configurations = wx.getStorageSync(STORAGE_KEYS.CONFIGURATIONS) || [];
    globalState.currentConfig = wx.getStorageSync(STORAGE_KEYS.CURRENT_CONFIG) || null;
  } catch (e) {
    console.error('刷新存储失败', e);
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
  const newConfig = {
    id: generateId('config'),
    name: name || `我的${getBikeTypeName(bikeType)}配置`,
    bikeType: bikeType,
    components: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  globalState.configurations.unshift(newConfig);
  globalState.currentConfig = newConfig;

  try {
    wx.setStorageSync(STORAGE_KEYS.CONFIGURATIONS, globalState.configurations);
    wx.setStorageSync(STORAGE_KEYS.CURRENT_CONFIG, globalState.currentConfig);
  } catch (e) {
    console.error('创建配置失败', e);
  }

  return deepClone(newConfig);
}

function updateConfiguration(configId, updates) {
  const index = globalState.configurations.findIndex(c => c.id === configId);
  if (index === -1) return null;

  globalState.configurations[index] = {
    ...globalState.configurations[index],
    ...updates,
    updatedAt: Date.now()
  };

  if (globalState.currentConfig && globalState.currentConfig.id === configId) {
    globalState.currentConfig = globalState.configurations[index];
  }

  try {
    wx.setStorageSync(STORAGE_KEYS.CONFIGURATIONS, globalState.configurations);
    wx.setStorageSync(STORAGE_KEYS.CURRENT_CONFIG, globalState.currentConfig);
  } catch (e) {
    console.error('更新配置失败', e);
  }

  return deepClone(globalState.configurations[index]);
}

function deleteConfiguration(configId) {
  const index = globalState.configurations.findIndex(c => c.id === configId);
  if (index === -1) return false;

  globalState.configurations.splice(index, 1);

  if (globalState.currentConfig && globalState.currentConfig.id === configId) {
    globalState.currentConfig = globalState.configurations[0] || null;
  }

  try {
    wx.setStorageSync(STORAGE_KEYS.CONFIGURATIONS, globalState.configurations);
    wx.setStorageSync(STORAGE_KEYS.CURRENT_CONFIG, globalState.currentConfig);
  } catch (e) {
    console.error('删除配置失败', e);
  }

  return true;
}

function addComponent(configId, component) {
  const config = globalState.configurations.find(c => c.id === configId);
  if (!config) return null;

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

  try {
    wx.setStorageSync(STORAGE_KEYS.CONFIGURATIONS, globalState.configurations);
    wx.setStorageSync(STORAGE_KEYS.CURRENT_CONFIG, globalState.currentConfig);
  } catch (e) {
    console.error('添加组件失败', e);
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
  getSelectedBikeType
};
