// pages/index/index.js - 首页（车型选择页）

const app = getApp();
const { BIKE_TYPES, APP_INFO, COMPONENT_CATEGORIES } = require('../../utils/constants');
const { getDefaultsForType, RECOMMENDED_CONFIGS } = require('../../data/components');
const configStore = require('../../utils/store');
const { formatPrice, formatWeight, showToast, showModal } = require('../../utils/util');

Page({
  data: {
    appInfo: APP_INFO,
    bikeTypes: BIKE_TYPES,
    selectedBikeType: 'Road',
    activeBikeIndex: 0,
    recommendedConfigs: [],
    categories: COMPONENT_CATEGORIES,
    version: APP_INFO.version
  },

  onLoad() {
    this.loadRecommendedConfigs();
  },

  onShow() {
    const selectedType = configStore.getSelectedBikeType();
    const index = BIKE_TYPES.findIndex(b => b.type === selectedType);
    this.setData({
      selectedBikeType: selectedType,
      activeBikeIndex: index >= 0 ? index : 0
    });
  },

  loadRecommendedConfigs() {
    const configs = RECOMMENDED_CONFIGS.map(config => ({
      ...config,
      totalPriceFormatted: formatPrice(config.totalPrice),
      totalWeightFormatted: formatWeight(config.totalWeight),
      bikeTypeName: this.getBikeTypeName(config.bikeType),
      bikeTypeIcon: this.getBikeTypeIcon(config.bikeType)
    }));
    this.setData({ recommendedConfigs: configs });
  },

  getBikeTypeName(bikeType) {
    const names = { Road: '公路车', MTB: '山地车', Fold: '折叠车' };
    return names[bikeType] || '自行车';
  },

  getBikeTypeIcon(bikeType) {
    const icons = { Road: '🚴', MTB: '🚵', Fold: '🚲' };
    return icons[bikeType] || '🚲';
  },

  onSelectBike(e) {
    const { type, index } = e.currentTarget.dataset;
    this.setData({
      selectedBikeType: type,
      activeBikeIndex: index
    });
    configStore.setSelectedBikeType(type);
  },

  onStartConfig() {
    const { selectedBikeType } = this.data;
    const bikeTypeName = this.getBikeTypeName(selectedBikeType);

    showModal('创建新配置', `开始创建你的${bikeTypeName}配置？`, {
      confirmText: '开始配置',
      cancelText: '取消'
    }).then(confirmed => {
      if (confirmed) {
        const config = configStore.createConfiguration(selectedBikeType);
        wx.navigateTo({
          url: `/pages/configurator/configurator?id=${config.id}`
        });
      }
    });
  },

  onViewRecommended(e) {
    const { id } = e.currentTarget.dataset;
    const rec = RECOMMENDED_CONFIGS.find(r => r.id === id);

    if (rec) {
      showModal(rec.name, `加载推荐配置「${rec.name}」？\n${rec.description}`, {
        confirmText: '使用此配置',
        cancelText: '查看详情'
      }).then(confirmed => {
        if (confirmed) {
          // 使用推荐配置的组件
          const config = configStore.createConfiguration(rec.bikeType, rec.name);
          if (rec.components && rec.components.length > 0) {
            rec.components.forEach(comp => {
              configStore.addComponent(config.id, {
                id: comp.id,
                category: comp.category,
                categoryName: comp.categoryName,
                categoryIcon: comp.categoryIcon,
                name: comp.name,
                brand: comp.brand,
                model: comp.model,
                price: comp.price,
                weight: comp.weight,
                description: comp.description
              });
            });
          }
          showToast('配置已创建');
          wx.navigateTo({
            url: `/pages/configurator/configurator?id=${config.id}`
          });
        } else {
          // 导航到详情页，传递完整推荐配置信息
          const recData = {
            ...rec,
            bikeTypeName: this.getBikeTypeName(rec.bikeType),
            bikeTypeIcon: this.getBikeTypeIcon(rec.bikeType),
            totalPriceFormatted: formatPrice(rec.totalPrice),
            totalWeightFormatted: formatWeight(rec.totalWeight)
          };
          wx.navigateTo({
            url: `/pages/detail/detail?id=${id}&type=recommended&data=${encodeURIComponent(JSON.stringify(recData))}`
          });
        }
      });
    }
  },

  onViewLibrary() {
    wx.switchTab({
      url: '/pages/library/library'
    });
  },

  onShareAppMessage() {
    return {
      title: `${APP_INFO.name} - 打造你的梦想自行车`,
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return {
      title: `${APP_INFO.name} - 自行车配置器`
    };
  }
});
