// utils/constants.js - 项目常量与配置

const APP_INFO = {
  name: 'Veloform',
  version: '3.8.0',
  tagline: 'Bike Configurator',
  description: '打造你的梦想自行车，从车型选择到组件配置，每一个细节由你掌控'
};

const BIKE_TYPES = [
  {
    type: 'Road',
    name: '公路车',
    desc: '速度与激情，专为竞速打造，轻量化设计让你风驰电掣',
    icon: '🚴',
    baseWeight: 900,
    gradientFrom: '#0071e3',
    gradientTo: '#af52de'
  },
  {
    type: 'MTB',
    name: '山地车',
    desc: '征服山野，强悍的悬挂系统应对各种复杂地形',
    icon: '🚵',
    baseWeight: 1800,
    gradientFrom: '#34c759',
    gradientTo: '#0071e3'
  },
  {
    type: 'Fold',
    name: '折叠车',
    desc: '灵活便携，轻松收纳，城市通勤的最佳伴侣',
    icon: '🚲',
    baseWeight: 2000,
    gradientFrom: '#ff9500',
    gradientTo: '#34c759'
  }
];

const COMPONENT_CATEGORIES = [
  { key: 'Frame', name: '车架', icon: '🏗️' },
  { key: 'Drivetrain', name: '传动系统', icon: '⚙️' },
  { key: 'Wheelset', name: '轮组', icon: '🔘' },
  { key: 'Suspension', name: '避震系统', icon: '🔧' },
  { key: 'Cockpit', name: '操控系统', icon: '🎯' },
  { key: 'Tires', name: '轮胎', icon: '⚪' }
];

const CURRENCY = '¥';

const STORAGE_KEYS = {
  CONFIGURATIONS: 'veloform_configurations',
  CURRENT_CONFIG: 'veloform_current_config',
  USER_INFO: 'veloform_user_info',
  SETTINGS: 'veloform_settings'
};

module.exports = {
  APP_INFO,
  BIKE_TYPES,
  COMPONENT_CATEGORIES,
  CURRENCY,
  STORAGE_KEYS
};
