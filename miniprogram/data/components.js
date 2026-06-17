// data/components.js - 自行车组件数据

const ROAD_DEFAULTS = [
  {
    id: 'road-drivetrain-1',
    category: 'Drivetrain',
    bikeType: 'Road',
    name: 'Shimano Dura-Ace Di2 R9200',
    brand: 'Shimano',
    model: 'Dura-Ace Di2 R9200',
    price: 4200,
    weight: 2430,
    specs: {
      speeds: 12,
      cassetteRange: '11-30T',
      chainrings: '52/36T',
      shiftSpeed: 'fast'
    }
  },
  {
    id: 'road-wheelset-1',
    category: 'Wheelset',
    bikeType: 'Road',
    name: 'Roval Rapide CLX II',
    brand: 'Roval',
    model: 'Rapide CLX II',
    price: 2800,
    weight: 1520,
    specs: {
      rimDepth: '51mm',
      rimWidth: '21mm internal',
      material: 'carbon'
    }
  },
  {
    id: 'road-cockpit-1',
    category: 'Cockpit',
    bikeType: 'Road',
    name: 'Roval Rapide Cockpit',
    brand: 'Roval',
    model: 'Rapide Cockpit',
    price: 600,
    weight: 310,
    specs: {
      handlebarWidth: '420mm',
      stemLength: '110mm',
      dropReach: '75mm'
    }
  },
  {
    id: 'road-tires-1',
    category: 'Tires',
    bikeType: 'Road',
    name: 'Specialized S-Works Turbo 2Bliss Ready 28c',
    brand: 'Specialized',
    model: 'S-Works Turbo',
    price: 180,
    weight: 480,
    specs: {
      size: '700x28c',
      compound: 'GRIPTON',
      tpi: 120,
      tubeless: true
    }
  }
];

const MTB_DEFAULTS = [
  {
    id: 'mtb-drivetrain-1',
    category: 'Drivetrain',
    bikeType: 'MTB',
    name: 'Shimano XTR Di2 M9100',
    brand: 'Shimano',
    model: 'XTR Di2 M9100',
    price: 3800,
    weight: 1920,
    specs: {
      speeds: 12,
      cassetteRange: '10-51T',
      shiftSpeed: 'instant'
    }
  },
  {
    id: 'mtb-suspension-1',
    category: 'Suspension',
    bikeType: 'MTB',
    name: 'Fox 34 Float Factory GRIP2',
    brand: 'Fox Racing Shox',
    model: '34 Float Factory',
    price: 1050,
    weight: 1738,
    specs: {
      travel: '140mm',
      damping: 'GRIP2',
      adjustability: '4-way adjustable'
    }
  },
  {
    id: 'mtb-wheelset-1',
    category: 'Wheelset',
    bikeType: 'MTB',
    name: 'Roval Traverse SL II 29',
    brand: 'Roval',
    model: 'Traverse SL II',
    price: 1500,
    weight: 1720,
    specs: {
      rimDepth: '25mm',
      rimWidth: '30mm internal',
      material: 'carbon'
    }
  },
  {
    id: 'mtb-tires-1',
    category: 'Tires',
    bikeType: 'MTB',
    name: 'Maxxis Minion DHR II 3C MaxxTerra',
    brand: 'Maxxis',
    model: 'Minion DHR II',
    price: 140,
    weight: 790,
    specs: {
      size: '29x2.4',
      compound: '3C MaxxTerra',
      tpi: 60,
      tubeless: true
    }
  }
];

const FOLD_DEFAULTS = [
  {
    id: 'fold-frame-1',
    category: 'Frame',
    bikeType: 'Fold',
    name: 'Brompton Superlight Main Frame',
    brand: 'Brompton',
    model: 'Superlight Frame',
    price: 1400,
    weight: 1800,
    specs: {
      material: 'steel',
      geometry: 'compact',
      wheelSize: '16inch'
    }
  },
  {
    id: 'fold-drivetrain-1',
    category: 'Drivetrain',
    bikeType: 'Fold',
    name: 'Shimano Alfine Di2 SG-S7051-11',
    brand: 'Shimano',
    model: 'Alfine Di2 SG-S7051',
    price: 1200,
    weight: 1765,
    specs: {
      speeds: 11,
      cassetteRange: 'internal gear hub',
      batteryLife: '1000km'
    }
  },
  {
    id: 'fold-wheelset-1',
    category: 'Wheelset',
    bikeType: 'Fold',
    name: 'Brompton Superlight Wheelset',
    brand: 'Brompton',
    model: 'Superlight Wheelset',
    price: 450,
    weight: 1240,
    specs: {
      rimDepth: 'standard',
      rimWidth: '19mm',
      material: 'aluminum'
    }
  },
  {
    id: 'fold-cockpit-1',
    category: 'Cockpit',
    bikeType: 'Fold',
    name: 'Brompton M-Type Handlebar',
    brand: 'Brompton',
    model: 'M-Type Handlebar',
    price: 120,
    weight: 310,
    specs: {
      handlebarWidth: '540mm',
      stemLength: 'integrated'
    }
  },
  {
    id: 'fold-tires-1',
    category: 'Tires',
    bikeType: 'Fold',
    name: 'Schwalbe Marathon Racer 16x1-1/3',
    brand: 'Schwalbe',
    model: 'Marathon Racer',
    price: 65,
    weight: 370,
    specs: {
      size: '16x1-1/3',
      compound: 'RaceGuard',
      tpi: 67,
      tubeless: false
    }
  }
];

const ALTERNATIVES = {
  Drivetrain: [
    {
      category: 'Drivetrain',
      name: 'Shimano Dura-Ace Di2 R9200',
      brand: 'Shimano',
      price: 4200,
      weight: 2430,
      description: '顶级电子变速，精准快速'
    },
    {
      category: 'Drivetrain',
      name: 'SRAM Red AXS',
      brand: 'SRAM',
      price: 4000,
      weight: 2380,
      description: '12速无线变速系统'
    },
    {
      category: 'Drivetrain',
      name: 'Campagnolo Super Record EPS',
      brand: 'Campagnolo',
      price: 4500,
      weight: 2450,
      description: '意大利工艺，极致体验'
    },
    {
      category: 'Drivetrain',
      name: 'Shimano Ultegra Di2 R8100',
      brand: 'Shimano',
      price: 2800,
      weight: 2600,
      description: '次顶级电子变速，高性价比'
    }
  ],
  Wheelset: [
    {
      category: 'Wheelset',
      name: 'Roval Rapide CLX II',
      brand: 'Roval',
      price: 2800,
      weight: 1520,
      description: '碳纤轮组，高性能气动轮'
    },
    {
      category: 'Wheelset',
      name: 'Zipp 454 NSW',
      brand: 'Zipp',
      price: 3200,
      weight: 1480,
      description: '创新设计，极致气动'
    },
    {
      category: 'Wheelset',
      name: 'Enve SES 4.5',
      brand: 'Enve',
      price: 2900,
      weight: 1550,
      description: '综合性能出色的碳轮'
    },
    {
      category: 'Wheelset',
      name: 'DT Swiss ERC 1400',
      brand: 'DT Swiss',
      price: 2200,
      weight: 1650,
      description: '瑞士品质，舒适耐用'
    }
  ],
  Cockpit: [
    {
      category: 'Cockpit',
      name: 'Roval Rapide Cockpit',
      brand: 'Roval',
      price: 600,
      weight: 310,
      description: '一体式气动座舱'
    },
    {
      category: 'Cockpit',
      name: 'Enve SES AR',
      brand: 'Enve',
      price: 550,
      weight: 320,
      description: '气动弯把，碳纤维材质'
    },
    {
      category: 'Cockpit',
      name: 'Deda SuperZero',
      brand: 'Deda',
      price: 380,
      weight: 280,
      description: '轻量化铝合金把组'
    }
  ],
  Tires: [
    {
      category: 'Tires',
      name: 'Turbo Cotton 28mm',
      brand: 'Specialized',
      price: 180,
      weight: 480,
      description: '棉质胎体，极致抓地力'
    },
    {
      category: 'Tires',
      name: 'GP5000 S TR',
      brand: 'Continental',
      price: 160,
      weight: 450,
      description: '顶级竞赛胎，低滚阻'
    },
    {
      category: 'Tires',
      name: 'Michelin Power Cup',
      brand: 'Michelin',
      price: 170,
      weight: 465,
      description: '法国制造，高性能'
    }
  ],
  Suspension: [
    {
      category: 'Suspension',
      name: 'Fox 34 Float Factory',
      brand: 'Fox',
      price: 1050,
      weight: 1738,
      description: '顶级山地车前叉'
    },
    {
      category: 'Suspension',
      name: 'RockShox SID Ultimate',
      brand: 'RockShox',
      price: 950,
      weight: 1650,
      description: '轻量竞赛级前叉'
    },
    {
      category: 'Suspension',
      name: 'Fox 32 Step-Cast Factory',
      brand: 'Fox',
      price: 1100,
      weight: 1580,
      description: '轻量级越野前叉'
    }
  ],
  Frame: [
    {
      category: 'Frame',
      name: 'Titanium Main Frame',
      brand: 'Custom',
      price: 2100,
      weight: 1800,
      description: '钛合金车架，轻量化'
    },
    {
      category: 'Frame',
      name: 'Carbon Front Triangle',
      brand: 'Custom',
      price: 1800,
      weight: 1450,
      description: '碳纤维主三角，极致轻量'
    },
    {
      category: 'Frame',
      name: 'Steel Classic Frame',
      brand: 'Classic',
      price: 1200,
      weight: 2100,
      description: '经典钢制车架，耐用舒适'
    }
  ]
};

const RECOMMENDED_CONFIGS = [
  {
    id: 'rec-1',
    name: '入门优选',
    bikeType: 'Road',
    description: '适合新手的平衡配置，性能与价格的完美结合',
    totalPrice: 15800,
    totalWeight: 8500,
    tags: ['热门', '高性价比'],
    componentCount: 6
  },
  {
    id: 'rec-2',
    name: '竞赛级别',
    bikeType: 'Road',
    description: '专业竞赛配置，极致轻量化，追求极致速度',
    totalPrice: 35000,
    totalWeight: 6800,
    tags: ['进阶'],
    componentCount: 6
  },
  {
    id: 'rec-3',
    name: '越野先锋',
    bikeType: 'MTB',
    description: '山地越野爱好者的选择，强悍悬挂系统',
    totalPrice: 22000,
    totalWeight: 11500,
    tags: ['越野'],
    componentCount: 6
  },
  {
    id: 'rec-4',
    name: '城市伴侣',
    bikeType: 'Fold',
    description: '城市通勤首选，便携折叠，灵活便捷',
    totalPrice: 8500,
    totalWeight: 9800,
    tags: ['通勤', '便携'],
    componentCount: 5
  }
];

function getDefaultsForType(bikeType) {
  switch (bikeType) {
    case 'Road':
      return ROAD_DEFAULTS.map(item => ({ ...item }));
    case 'MTB':
      return MTB_DEFAULTS.map(item => ({ ...item }));
    case 'Fold':
      return FOLD_DEFAULTS.map(item => ({ ...item }));
    default:
      return [];
  }
}

function getAlternativesForCategory(category) {
  return (ALTERNATIVES[category] || []).map(item => ({ ...item }));
}

function getCategoriesForBikeType(bikeType) {
  const categories = {
    Road: ['Drivetrain', 'Wheelset', 'Cockpit', 'Tires'],
    MTB: ['Drivetrain', 'Suspension', 'Wheelset', 'Tires'],
    Fold: ['Frame', 'Drivetrain', 'Wheelset', 'Cockpit', 'Tires']
  };
  return categories[bikeType] || [];
}

function getBaseWeight(bikeType) {
  const weights = {
    Road: 900,
    MTB: 1800,
    Fold: 2000
  };
  return weights[bikeType] || 0;
}

module.exports = {
  ROAD_DEFAULTS,
  MTB_DEFAULTS,
  FOLD_DEFAULTS,
  ALTERNATIVES,
  RECOMMENDED_CONFIGS,
  getDefaultsForType,
  getAlternativesForCategory,
  getCategoriesForBikeType,
  getBaseWeight
};
