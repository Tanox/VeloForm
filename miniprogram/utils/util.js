// utils/util.js - 通用工具函数

const ERROR_CODES = {
  UNKNOWN_ERROR: 'E000',
  STORAGE_ERROR: 'E001',
  VALIDATION_ERROR: 'E002',
  NETWORK_ERROR: 'E003',
  AUTH_ERROR: 'E004',
  NOT_FOUND: 'E005'
};

const ERROR_MESSAGES = {
  [ERROR_CODES.UNKNOWN_ERROR]: '发生未知错误，请重试',
  [ERROR_CODES.STORAGE_ERROR]: '存储操作失败，请检查存储空间',
  [ERROR_CODES.VALIDATION_ERROR]: '数据验证失败，请检查输入',
  [ERROR_CODES.NETWORK_ERROR]: '网络连接异常，请检查网络',
  [ERROR_CODES.AUTH_ERROR]: '登录状态异常，请重新登录',
  [ERROR_CODES.NOT_FOUND]: '未找到相关数据'
};

function formatPrice(price, currency = '¥') {
  if (!price && price !== 0) return '¥0';
  return `${currency}${Number(price).toLocaleString('zh-CN')}`;
}

function formatWeight(grams) {
  if (!grams && grams !== 0) return '0 g';
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
  return `${grams} g`;
}

function formatDate(date) {
  if (!date) return '-';
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

function showToast(options) {
  let title = '';
  let icon = 'none';
  let duration = 2000;
  let action = null;

  if (typeof options === 'string') {
    title = options;
  } else if (options && typeof options === 'object') {
    title = options.title || '';
    icon = options.icon || 'none';
    duration = options.duration || 2000;
    action = options.action;
  }

  wx.showToast({
    title,
    icon,
    duration
  });

  if (action && action.text && action.handler) {
    setTimeout(() => {
      wx.showModal({
        title: '',
        content: title,
        showCancel: false,
        confirmText: action.text,
        confirmColor: '#0071e3',
        success: (res) => {
          if (res.confirm && typeof action.handler === 'function') {
            action.handler();
          }
        }
      });
    }, duration - 500);
  }
}

function createError(code, message, details = null) {
  const err = new Error(message || ERROR_MESSAGES[code] || '未知错误');
  err.code = code;
  err.details = details;
  return err;
}

function handleError(error, showNotification = true) {
  const code = error.code || ERROR_CODES.UNKNOWN_ERROR;
  const message = error.message || ERROR_MESSAGES[code];

  console.error(`[${code}] ${message}`, error.details);

  if (showNotification) {
    showToast({
      title: message,
      icon: 'error',
      duration: 3000
    });
  }

  return { code, message, details: error.details };
}

function validateConfig(config) {
  const errors = [];

  if (!config) {
    errors.push('配置不能为空');
    return { valid: false, errors };
  }

  if (!config.id) {
    errors.push('配置ID不能为空');
  }

  if (!config.name || !config.name.trim()) {
    errors.push('配置名称不能为空');
  }

  if (!config.bikeType) {
    errors.push('车型不能为空');
  }

  if (!Array.isArray(config.components)) {
    errors.push('组件列表必须是数组');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function validateComponent(component) {
  const errors = [];

  if (!component) {
    errors.push('组件不能为空');
    return { valid: false, errors };
  }

  if (!component.name || !component.name.trim()) {
    errors.push('组件名称不能为空');
  }

  if (!component.category) {
    errors.push('组件类别不能为空');
  }

  if (component.price !== undefined && typeof component.price !== 'number') {
    errors.push('价格必须是数字');
  }

  if (component.weight !== undefined && typeof component.weight !== 'number') {
    errors.push('重量必须是数字');
  }

  return {
    valid: errors.length === 0,
    errors
  };
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
  calculateProgress,
  ERROR_CODES,
  ERROR_MESSAGES,
  createError,
  handleError,
  validateConfig,
  validateComponent
};
