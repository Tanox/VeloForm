// pages/detail/detail.js - 配置详情页

const app = getApp();
const { BIKE_TYPES, COMPONENT_CATEGORIES, APP_INFO } = require('../../utils/constants');
const { getBaseWeight, RECOMMENDED_CONFIGS } = require('../../data/components');
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
    config: null,
    isRecommended: false,
    bikeTypeName: '',
    bikeTypeIcon: '',
    components: [],
    totalPrice: '¥0',
    totalWeight: '0 kg',
    createdTime: '',
    updatedTime: '',
    componentCount: 0
  },

  onLoad(options) {
    const configId = options.id;
    const type = options.type;
    const data = options.data;

    if (type === 'recommended') {
      this.loadRecommendedConfig(configId, data);
    } else {
      this.loadConfig(configId);
    }
  },

  loadConfig(configId) {
    let config;
    if (configId) {
      const configs = configStore.getConfigurations();
      config = configs.find(c => c.id === configId);
    }

    if (!config) {
      config = configStore.getCurrentConfig();
    }

    if (!config) {
      showToast('配置不存在');
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
      return;
    }

    this.processConfig(config);
  },

  loadRecommendedConfig(configId, data) {
    let recommended;

    // 如果有传递的完整数据，直接使用
    if (data) {
      try {
        recommended = JSON.parse(decodeURIComponent(data));
      } catch (e) {
        // 解析失败，从数据中查找
        recommended = RECOMMENDED_CONFIGS.find(r => r.id === configId);
      }
    } else {
      recommended = RECOMMENDED_CONFIGS.find(r => r.id === configId);
    }

    if (!recommended) {
      showToast('推荐配置不存在');
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
      return;
    }

    const bikeTypeInfo = BIKE_TYPES.find(b => b.type === recommended.bikeType);
    const bikeTypeName = bikeTypeInfo ? bikeTypeInfo.name : '自行车';
    const bikeTypeIcon = bikeTypeInfo ? bikeTypeInfo.icon : '🚲';

    // 处理组件数据
    let processedComponents = [];
    if (recommended.components && recommended.components.length > 0) {
      processedComponents = recommended.components.map(comp => ({
        ...comp,
        priceFormatted: formatPrice(comp.price),
        weightFormatted: formatWeight(comp.weight)
      }));
    }

    this.setData({
      config: {
        ...recommended,
        isRecommended: true,
        description: recommended.description
      },
      isRecommended: true,
      bikeTypeName,
      bikeTypeIcon,
      componentCount: recommended.componentCount || (recommended.components ? recommended.components.length : 0),
      totalPrice: formatPrice(recommended.totalPrice),
      totalWeight: formatWeight(recommended.totalWeight),
      components: processedComponents
    });
  },

  processConfig(config) {
    const bikeTypeInfo = BIKE_TYPES.find(b => b.type === config.bikeType);
    const bikeTypeName = bikeTypeInfo ? bikeTypeInfo.name : '自行车';
    const bikeTypeIcon = bikeTypeInfo ? bikeTypeInfo.icon : '🚲';

    const processedComponents = config.components.map(comp => {
      const catInfo = COMPONENT_CATEGORIES.find(c => c.key === comp.category);
      return {
        ...comp,
        categoryName: catInfo ? catInfo.name : comp.category,
        categoryIcon: catInfo ? catInfo.icon : '🔧',
        priceFormatted: formatPrice(comp.price),
        weightFormatted: formatWeight(comp.weight)
      };
    });

    const totalPrice = config.components.reduce(
      (sum, comp) => sum + (comp.price || 0),
      0
    );
    const totalWeight =
      config.components.reduce((sum, comp) => sum + (comp.weight || 0), 0) +
      getBaseWeight(config.bikeType);

    this.setData({
      config: {
        ...config,
        componentCount: config.components.length
      },
      bikeTypeName,
      bikeTypeIcon,
      components: processedComponents,
      componentCount: config.components.length,
      totalPrice: formatPrice(totalPrice),
      totalWeight: formatWeight(totalWeight),
      createdTime: formatDate(config.createdAt),
      updatedTime: formatDate(config.updatedAt)
    });
  },

  onEdit() {
    if (this.data.isRecommended) {
      showModal('使用此配置', '是否基于此推荐配置创建一个新的配置？', {
        confirmText: '创建配置',
        cancelText: '取消'
      }).then(confirmed => {
        if (confirmed) {
          const { config, components } = this.data;
          const newConfig = configStore.createConfiguration(
            config.bikeType,
            config.name
          );

          // 如果有组件数据，添加到配置中
          if (components && components.length > 0) {
            components.forEach(comp => {
              configStore.addComponent(newConfig.id, {
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

          showToast('配置已创建', 'success');
          setTimeout(() => {
            wx.redirectTo({
              url: `/pages/configurator/configurator?id=${newConfig.id}`
            });
          }, 800);
        }
      });
    } else {
      wx.redirectTo({
        url: `/pages/configurator/configurator?id=${this.data.config.id}`
      });
    }
  },

  onShare() {
    const { config, totalPrice, totalWeight, bikeTypeName } = this.data;
    const shareText = `${config.name}\n车型: ${bikeTypeName}\n组件数: ${config.componentCount}\n总价: ${totalPrice}\n总重: ${totalWeight}\n\n- ${APP_INFO.name}`;

    wx.setClipboardData({
      data: shareText,
      success() {
        showToast('配置信息已复制', 'success');
      }
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    const { config, totalPrice } = this.data;
    return {
      title: `${config.name} - ${totalPrice}`,
      path: '/pages/index/index'
    };
  }
});
