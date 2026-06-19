// pages/library/library.js - 配置库页面

const app = getApp();
const { BIKE_TYPES, APP_INFO, COMPONENT_CATEGORIES } = require('../../utils/constants');
const { getBaseWeight } = require('../../data/components');
const configStore = require('../../utils/store');
const {
  formatPrice,
  formatWeight,
  formatDate,
  showToast,
  showModal
} = require('../../utils/util');

Page({
  data: {
    appInfo: APP_INFO,
    bikeTypes: BIKE_TYPES,
    configurations: [],
    filteredConfigurations: [],
    totalConfigs: 0,
    totalPrice: '¥0',
    isEmpty: true,
    filter: 'all',
    selectedFilter: 'all'
  },

  onLoad() {
    this.loadConfigurations();
  },

  onShow() {
    this.loadConfigurations();
  },

  loadConfigurations() {
    const configs = configStore.getConfigurations();

    if (!configs || configs.length === 0) {
      this.setData({
        configurations: [],
        filteredConfigurations: [],
        totalConfigs: 0,
        totalPrice: '¥0',
        isEmpty: true
      });
      return;
    }

    const processedConfigs = configs.map(config => {
      const bikeTypeInfo = BIKE_TYPES.find(b => b.type === config.bikeType);
      const bikeTypeName = bikeTypeInfo ? bikeTypeInfo.name : '自行车';
      const bikeTypeIcon = bikeTypeInfo ? bikeTypeInfo.icon : '🚲';

      const totalPrice = config.components.reduce(
        (sum, comp) => sum + (comp.price || 0),
        0
      );
      const totalWeight =
        config.components.reduce(
          (sum, comp) => sum + (comp.weight || 0),
          0
        ) + getBaseWeight(config.bikeType);

      const categoryStats = {};
      config.components.forEach(comp => {
        const category = comp.category;
        if (!categoryStats[category]) {
          const catInfo = COMPONENT_CATEGORIES.find(c => c.key === category);
          categoryStats[category] = {
            count: 0,
            name: catInfo ? catInfo.name : category,
            icon: catInfo ? catInfo.icon : '🔧'
          };
        }
        categoryStats[category].count += 1;
      });

      return {
        ...config,
        bikeTypeName,
        bikeTypeIcon,
        componentCount: config.components.length,
        totalPriceFormatted: formatPrice(totalPrice),
        totalWeightFormatted: formatWeight(totalWeight),
        updatedAtFormatted: formatDate(config.updatedAt),
        categories: Object.values(categoryStats)
      };
    });

    const totalConfigPrice = processedConfigs.reduce(
      (sum, config) => {
        const price = config.components.reduce(
          (s, c) => s + (c.price || 0),
          0
        );
        return sum + price;
      },
      0
    );

    // 应用筛选
    const { selectedFilter } = this.data;
    const filtered = selectedFilter === 'all'
      ? processedConfigs
      : processedConfigs.filter(c => c.bikeType === selectedFilter);

    this.setData({
      configurations: processedConfigs,
      filteredConfigurations: filtered,
      totalConfigs: filtered.length,
      totalPrice: formatPrice(filtered.reduce((sum, c) => {
        const price = c.components.reduce((s, comp) => s + (comp.price || 0), 0);
        return sum + price;
      }, 0)),
      isEmpty: filtered.length === 0
    });
  },

  onFilterChange(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ selectedFilter: filter });
    this.loadConfigurations();
  },

  onViewConfig(e) {
    const { id } = e.currentTarget.dataset;
    configStore.setCurrentConfig(id);
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  onEditConfig(e) {
    const { id } = e.currentTarget.dataset;
    configStore.setCurrentConfig(id);
    wx.navigateTo({
      url: `/pages/configurator/configurator?id=${id}`
    });
  },

  onDeleteConfig(e) {
    const { id, name } = e.currentTarget.dataset;

    showModal('删除配置', `确定要删除「${name}」吗？此操作不可撤销。`, {
      confirmText: '删除',
      cancelText: '取消'
    }).then(confirmed => {
      if (confirmed) {
        const success = configStore.deleteConfiguration(id);
        if (success) {
          showToast('已删除');
          this.loadConfigurations();
        } else {
          showToast('删除失败');
        }
      }
    });
  },

  onCreateNew() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onShareConfig(e) {
    const { id } = e.currentTarget.dataset;
    const config = this.data.configurations.find(c => c.id === id);

    if (config) {
      wx.setClipboardData({
        data: `${config.name}\n车型: ${config.bikeTypeName}\n组件数: ${config.componentCount}\n总价: ${config.totalPriceFormatted}\n总重: ${config.totalWeightFormatted}\n\n- ${this.data.appInfo.name}`,
        success() {
          showToast('配置信息已复制', 'success');
        }
      });
    }
  },

  onShareAppMessage() {
    return {
      title: `${this.data.appInfo.name} - 我的自行车配置`,
      path: '/pages/index/index'
    };
  }
});
