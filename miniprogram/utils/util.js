// utils/util.js - 通用工具函数

function formatPrice(price, currency = '¥') {
  return `${currency}${Number(price).toLocaleString('zh-CN')}`;
}

function formatWeight(grams) {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
  return `${grams} g`;
}

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

function generateId(prefix = 'cfg') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

function showToast(title, icon = 'none', duration = 2000) {
  wx.showToast({
    title,
    icon,
    duration
  });
}

function showLoading(title = '加载中...') {
  wx.showLoading({ title, mask: true });
}

function hideLoading() {
  wx.hideLoading();
}

function showModal(title, content, options = {}) {
  return new Promise(resolve => {
    wx.showModal({
      title,
      content,
      confirmColor: '#0071e3',
      cancelText: options.cancelText || '取消',
      confirmText: options.confirmText || '确定',
      success: res => {
        resolve(res.confirm);
      }
    });
  });
}

function calculateTotalPrice(components) {
  if (!components || !components.length) return 0;
  return components.reduce((sum, comp) => sum + (comp.price || 0), 0);
}

function calculateTotalWeight(components, baseWeight = 0) {
  if (!components || !components.length) return baseWeight;
  return components.reduce((sum, comp) => sum + (comp.weight || 0), baseWeight);
}

function calculateProgress(components, expectedCount = 6) {
  if (!components || !components.length) return 0;
  return Math.round((components.length / expectedCount) * 100);
}

module.exports = {
  formatPrice,
  formatWeight,
  formatDate,
  generateId,
  debounce,
  throttle,
  deepClone,
  showToast,
  showLoading,
  hideLoading,
  showModal,
  calculateTotalPrice,
  calculateTotalWeight,
  calculateProgress
};
