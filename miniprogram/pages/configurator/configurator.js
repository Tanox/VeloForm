// pages/configurator/configurator.js - 配置器页面

const app = getApp();
const { BIKE_TYPES, COMPONENT_CATEGORIES } = require('../../utils/constants');
const {
  getDefaultsForType,
  getAlternativesForCategory,
  getCategoriesForBikeType,
  getBaseWeight
} = require('../../data/components');
const configStore = require('../../utils/store');
const {
  formatPrice,
  formatWeight,
  formatDate,
  showToast,
  showModal,
  showLoading,
  hideLoading,
  calculateProgress
} = require('../../utils/util');

Page({
  data: {
    config: null,
    components: [],
    categories: [],
    alternatives: [],
    showAlternativeModal: false,
    selectedCategory: '',
    bikeTypeName: '',
    bikeTypeIcon: '',
    totalPrice: '¥0',
    totalWeight: '0 kg',
    progress: 0,
    isEditingName: false,
    editedName: '',
    componentList: []
  },

  onLoad(options) {
    const configId = options.id;
    this.loadConfig(configId);
  },

  onShow() {
    if (this.data.config) {
      this.loadConfig(this.data.config.id);
    }
  },

  loadConfig(configId) {
    let config;
    if (configId) {
      config = configStore.getConfigurations().find(c => c.id === configId);
    }

    if (!config) {
      config = configStore.getCurrentConfig();
    }

    if (!config) {
      const bikeTypes = BIKE_TYPES.map(b => b.type);
      config = configStore.createConfiguration(bikeTypes[0]);
    }

    this.processConfig(config);
  },

  processConfig(config) {
    const bikeTypeInfo = BIKE_TYPES.find(b => b.type === config.bikeType);
    const bikeTypeName = bikeTypeInfo ? bikeTypeInfo.name : '自行车';
    const bikeTypeIcon = bikeTypeInfo ? bikeTypeInfo.icon : '🚲';

    const categories = getCategoriesForBikeType(config.bikeType).map(cat => {
      const catInfo = COMPONENT_CATEGORIES.find(c => c.key === cat);
      const componentsInCategory = config.components.filter(
        comp => comp.category === cat
      );
      return {
        key: cat,
        name: catInfo ? catInfo.name : cat,
        icon: catInfo ? catInfo.icon : '🔧',
        components: componentsInCategory,
        hasComponents: componentsInCategory.length > 0
      };
    });

    const componentList = config.components.map(comp => {
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

    const progress = calculateProgress(
      config.components,
      categories.length
    );

    this.setData({
      config: {
        ...config,
        updatedAtFormatted: formatDate(config.updatedAt)
      },
      components: config.components,
      categories,
      bikeTypeName,
      bikeTypeIcon,
      totalPrice: formatPrice(totalPrice),
      totalWeight: formatWeight(totalWeight),
      progress,
      editedName: config.name,
      componentList
    });
  },

  onEditName() {
    this.setData({ isEditingName: true });
  },

  onNameInput(e) {
    this.setData({ editedName: e.detail.value });
  },

  onSaveName() {
    const { editedName, config } = this.data;
    if (!editedName || !editedName.trim()) {
      showToast('配置名称不能为空');
      return;
    }

    const updatedConfig = configStore.updateConfiguration(config.id, {
      name: editedName.trim()
    });

    if (updatedConfig) {
      this.processConfig(updatedConfig);
      showToast('名称已更新', 'success');
    }

    this.setData({ isEditingName: false });
  },

  onCancelEditName() {
    this.setData({
      isEditingName: false,
      editedName: this.data.config.name
    });
  },

  onAddComponent(e) {
    const { category } = e.currentTarget.dataset;
    const alternatives = getAlternativesForCategory(category);

    if (alternatives.length === 0) {
      showToast('暂无可用组件');
      return;
    }

    const formattedAlternatives = alternatives.map((alt, index) => ({
      ...alt,
      index: index + 1,
      priceFormatted: formatPrice(alt.price),
      weightFormatted: formatWeight(alt.weight)
    }));

    this.setData({
      showAlternativeModal: true,
      selectedCategory: category,
      alternatives: formattedAlternatives
    });
  },

  onSelectAlternative(e) {
    const { index } = e.currentTarget.dataset;
    const alternatives = getAlternativesForCategory(this.data.selectedCategory);
    const selected = alternatives[index];

    if (selected) {
      const updatedConfig = configStore.addComponent(this.data.config.id, selected);
      if (updatedConfig) {
        this.processConfig(updatedConfig);
        showToast('组件已添加', 'success');
      }
    }

    this.setData({ showAlternativeModal: false });
  },

  onCloseModal() {
    this.setData({ showAlternativeModal: false });
  },

  onRemoveComponent(e) {
    const { componentId } = e.currentTarget.dataset;
    const component = this.data.components.find(c => c.id === componentId);

    showModal('删除组件', `确定要删除「${component.name}」吗？`, {
      confirmText: '删除',
      cancelText: '取消'
    }).then(confirmed => {
      if (confirmed) {
        const updatedConfig = configStore.removeComponent(
          this.data.config.id,
          componentId
        );
        if (updatedConfig) {
          this.processConfig(updatedConfig);
          showToast('组件已删除');
        }
      }
    });
  },

  onLoadDefaults() {
    const { config } = this.data;

    showModal('加载默认组件', '确定要为当前车型加载默认组件吗？这将替换现有组件。', {
      confirmText: '加载',
      cancelText: '取消'
    }).then(confirmed => {
      if (confirmed) {
        showLoading('加载中...');

        // 清空现有组件
        const updated = configStore.updateConfiguration(config.id, {
          components: []
        });

        // 添加默认组件
        const defaults = getDefaultsForType(config.bikeType);
        defaults.forEach(comp => {
          configStore.addComponent(config.id, comp);
        });

        setTimeout(() => {
          hideLoading();
          this.loadConfig(config.id);
          showToast('默认组件已加载', 'success');
        }, 500);
      }
    });
  },

  onShareConfig() {
    const { config, totalPrice, totalWeight } = this.data;

    wx.setClipboardData({
      data: `${config.name}\n车型: ${this.data.bikeTypeName}\n组件数: ${config.components.length}\n总价: ${totalPrice}\n总重: ${totalWeight}\n\n- Veloform`,
      success() {
        showToast('配置信息已复制', 'success');
      }
    });
  },

  onSaveConfig() {
    showToast('配置已保存', 'success');
  },

  onViewDetail() {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${this.data.config.id}`
    });
  },

  onBackToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onShareAppMessage() {
    const { config, totalPrice, totalWeight } = this.data;
    return {
      title: `${config.name} - ${totalPrice} / ${totalWeight}`,
      path: `/pages/index/index`
    };
  }
});
