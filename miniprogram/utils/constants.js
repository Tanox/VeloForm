// utils/constants.js - 项目常量与配置

const APP_INFO = {
  name: 'Veloform',
  version: '3.8.0',
  tagline: 'Bike Configurator',
  description: '打造你的梦想自行车，从车型选择到组件配置，每一个细节由你掌控',
  author: 'Veloform Team',
  supportEmail: 'support@veloform.com'
};

const BIKE_TYPES = [
  {
    type: 'Road',
    name: '公路车',
    desc: '速度与激情，专为竞速打造，轻量化设计让你风驰电掣',
    icon: '🚴',
    baseWeight: 900,
    gradientFrom: '#0071e3',
    gradientTo: '#af52de',
    recommendedBudget: { min: 8000, max: 50000 },
    suitableFor: ['竞速', '长途骑行', '健身训练']
  },
  {
    type: 'MTB',
    name: '山地车',
    desc: '征服山野，强悍的悬挂系统应对各种复杂地形',
    icon: '🚵',
    baseWeight: 1800,
    gradientFrom: '#34c759',
    gradientTo: '#0071e3',
    recommendedBudget: { min: 10000, max: 40000 },
    suitableFor: ['山地越野', '林道骑行', '户外探险']
  },
  {
    type: 'Fold',
    name: '折叠车',
    desc: '灵活便携，轻松收纳，城市通勤的最佳伴侣',
    icon: '🚲',
    baseWeight: 2000,
    gradientFrom: '#ff9500',
    gradientTo: '#34c759',
    recommendedBudget: { min: 3000, max: 20000 },
    suitableFor: ['城市通勤', '地铁出行', '便携旅行']
  }
];

const COMPONENT_CATEGORIES = [
  { key: 'Frame', name: '车架', icon: '🏗️', required: true },
  { key: 'Drivetrain', name: '传动系统', icon: '⚙️', required: true },
  { key: 'Wheelset', name: '轮组', icon: '🔘', required: true },
  { key: 'Suspension', name: '避震系统', icon: '🔧', required: false },
  { key: 'Cockpit', name: '操控系统', icon: '🎯', required: true },
  { key: 'Tires', name: '轮胎', icon: '⚪', required: true },
  { key: 'Saddle', name: '座垫', icon: '🪑', required: false },
  { key: 'Handlebar', name: '车把', icon: '🔧', required: false },
  { key: 'Stem', name: '把立', icon: '🔩', required: false }
];

const CURRENCY = '¥';
const CURRENCY_CODE = 'CNY';
const WEIGHT_UNIT = 'g';
const WEIGHT_UNIT_FULL = '克';

const STORAGE_KEYS = {
  CONFIGURATIONS: 'veloform_configurations',
  CURRENT_CONFIG: 'veloform_current_config',
  USER_INFO: 'veloform_user_info',
  SETTINGS: 'veloform_settings',
  COMPARE_LIST: 'veloform_compare_list',
  LAST_VISITED: 'veloform_last_visited'
};

const COLORS = {
  primary: '#0071e3',
  primaryDark: '#0077ed',
  primaryLight: '#338aff',
  secondary: '#14b8a6',
  success: '#34c759',
  warning: '#ff9500',
  error: '#ff3b30',
  info: '#5856d6',
  background: '#ffffff',
  backgroundSecondary: '#f5f5f7',
  foreground: '#1d1d1f',
  foregroundSecondary: '#86868b',
  border: '#e5e5ea',
  text: '#1d1d1f',
  textSecondary: '#86868b',
  textTertiary: '#c7c7cc',
  card: '#ffffff',
  cardHover: '#f5f5f7'
};

const SPACING = {
  xs: '8rpx',
  sm: '16rpx',
  md: '24rpx',
  lg: '32rpx',
  xl: '48rpx',
  '2xl': '64rpx',
  '3xl': '96rpx'
};

const FONT_SIZES = {
  xs: '22rpx',
  sm: '24rpx',
  base: '28rpx',
  md: '32rpx',
  lg: '36rpx',
  xl: '40rpx',
  '2xl': '48rpx',
  '3xl': '56rpx',
  '4xl': '64rpx'
};

const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700'
};

const BORDERS = {
  radius: {
    sm: '8rpx',
    md: '12rpx',
    lg: '16rpx',
    xl: '24rpx',
    full: '9999rpx'
  },
  width: {
    none: '0',
    thin: '1rpx',
    normal: '2rpx',
    thick: '4rpx'
  }
};

const SHADOWS = {
  none: 'none',
  sm: '0 2rpx 4rpx rgba(0, 0, 0, 0.05)',
  md: '0 4rpx 12rpx rgba(0, 0, 0, 0.08)',
  lg: '0 8rpx 24rpx rgba(0, 0, 0, 0.12)',
  xl: '0 16rpx 48rpx rgba(0, 0, 0, 0.16)'
};

const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slowest: '500ms'
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  }
};

const COMPARE_LIMIT = 3;

const PRICE_RANGES = [
  { label: '入门', min: 0, max: 10000, color: '#34c759' },
  { label: '进阶', min: 10000, max: 25000, color: '#0071e3' },
  { label: '高端', min: 25000, max: 40000, color: '#af52de' },
  { label: '顶级', min: 40000, max: Infinity, color: '#ff9500' }
];

const TAGS = {
  hot: { label: '热门', color: '#ff3b30', bgColor: '#fff0f0' },
  recommended: { label: '推荐', color: '#0071e3', bgColor: '#e8f4ff' },
  premium: { label: '高端', color: '#af52de', bgColor: '#f3e8ff' },
  budget: { label: '高性价比', color: '#34c759', bgColor: '#f0fff4' }
};

module.exports = {
  APP_INFO,
  BIKE_TYPES,
  COMPONENT_CATEGORIES,
  CURRENCY,
  CURRENCY_CODE,
  WEIGHT_UNIT,
  WEIGHT_UNIT_FULL,
  STORAGE_KEYS,
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDERS,
  SHADOWS,
  ANIMATIONS,
  COMPARE_LIMIT,
  PRICE_RANGES,
  TAGS
};
