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
    description: '适合新手的平衡配置，性能与价格的完美结合。采用主流品牌的入门级碳纤维组件，确保基本的骑行体验和可靠性。',
    totalPrice: 15800,
    totalWeight: 8500,
    tags: ['热门', '高性价比'],
    componentCount: 6,
    components: [
      {
        id: 'rec-1-1',
        category: 'Drivetrain',
        categoryName: '传动系统',
        categoryIcon: '⚙️',
        name: 'Shimano 105 Di2 R7100',
        brand: 'Shimano',
        model: '105 Di2',
        price: 4200,
        weight: 2890,
        description: '次顶级电子变速，兼顾性能与价格',
        priceFormatted: '¥4,200',
        weightFormatted: '2,890g'
      },
      {
        id: 'rec-1-2',
        category: 'Wheelset',
        categoryName: '轮组',
        categoryIcon: '⚫',
        name: 'Shimano RS100 轮组',
        brand: 'Shimano',
        model: 'RS100',
        price: 1800,
        weight: 1980,
        description: '铝合金训练轮组，经济实惠',
        priceFormatted: '¥1,800',
        weightFormatted: '1,980g'
      },
      {
        id: 'rec-1-3',
        category: 'Cockpit',
        categoryName: '操控组件',
        categoryIcon: '🎯',
        name: 'Shimano Pro Vibe 座舱',
        brand: 'Pro',
        model: 'Vibe',
        price: 800,
        weight: 380,
        description: '铝合金把组，性价比之选',
        priceFormatted: '¥800',
        weightFormatted: '380g'
      },
      {
        id: 'rec-1-4',
        category: 'Tires',
        categoryName: '轮胎',
        categoryIcon: '🔘',
        name: 'Continental Grand Prix 5000 28c',
        brand: 'Continental',
        model: 'GP5000',
        price: 320,
        weight: 540,
        description: '顶级训练胎，低滚阻高抓地',
        priceFormatted: '¥320',
        weightFormatted: '540g'
      },
      {
        id: 'rec-1-5',
        category: 'Frame',
        categoryName: '车架',
        categoryIcon: '🔲',
        name: '铝合金综合车架',
        brand: '国产品牌',
        model: '铝合金 Endurance',
        price: 2800,
        weight: 1350,
        description: '铝合金 Endurance 几何，适合长途骑行',
        priceFormatted: '¥2,800',
        weightFormatted: '1,350g'
      },
      {
        id: 'rec-1-6',
        category: 'Saddle',
        categoryName: '座垫',
        categoryIcon: '🪑',
        name: 'Selle Italia Model X',
        brand: 'Selle Italia',
        model: 'Model X',
        price: 480,
        weight: 280,
        description: '舒适型座垫，适合长时间骑行',
        priceFormatted: '¥480',
        weightFormatted: '280g'
      }
    ]
  },
  {
    id: 'rec-2',
    name: '竞赛级别',
    bikeType: 'Road',
    description: '专业竞赛配置，极致轻量化，追求极致速度。采用顶级碳纤维组件和专业赛事验证的配置。',
    totalPrice: 35000,
    totalWeight: 6800,
    tags: ['进阶'],
    componentCount: 6,
    components: [
      {
        id: 'rec-2-1',
        category: 'Drivetrain',
        categoryName: '传动系统',
        categoryIcon: '⚙️',
        name: 'Shimano Dura-Ace Di2 R9200',
        brand: 'Shimano',
        model: 'Dura-Ace Di2 R9200',
        price: 4200,
        weight: 2430,
        description: '顶级电子变速，精准快速',
        priceFormatted: '¥4,200',
        weightFormatted: '2,430g'
      },
      {
        id: 'rec-2-2',
        category: 'Wheelset',
        categoryName: '轮组',
        categoryIcon: '⚫',
        name: 'Roval Rapide CLX II',
        brand: 'Roval',
        model: 'Rapide CLX II',
        price: 2800,
        weight: 1520,
        description: '51mm框高碳纤轮组，气动优化',
        priceFormatted: '¥2,800',
        weightFormatted: '1,520g'
      },
      {
        id: 'rec-2-3',
        category: 'Cockpit',
        categoryName: '操控组件',
        categoryIcon: '🎯',
        name: 'Roval Rapide Cockpit',
        brand: 'Roval',
        model: 'Rapide Cockpit',
        price: 600,
        weight: 310,
        description: '一体式气动座舱，碳纤维材质',
        priceFormatted: '¥600',
        weightFormatted: '310g'
      },
      {
        id: 'rec-2-4',
        category: 'Tires',
        categoryName: '轮胎',
        categoryIcon: '🔘',
        name: 'Specialized Turbo Cotton 28c',
        brand: 'Specialized',
        model: 'S-Works Turbo',
        price: 180,
        weight: 480,
        description: '棉质胎体，极致抓地力',
        priceFormatted: '¥180',
        weightFormatted: '480g'
      },
      {
        id: 'rec-2-5',
        category: 'Frame',
        categoryName: '车架',
        categoryIcon: '🔲',
        name: '顶级碳纤维竞赛车架',
        brand: 'Specialized',
        model: 'Tarmac SL8',
        price: 22000,
        weight: 800,
        description: '全新 Tarmac SL8，极致轻量气动',
        priceFormatted: '¥22,000',
        weightFormatted: '800g'
      },
      {
        id: 'rec-2-6',
        category: 'Saddle',
        categoryName: '座垫',
        categoryIcon: '🪑',
        name: 'Specialized Power Expert',
        brand: 'Specialized',
        model: 'Power Expert',
        price: 220,
        weight: 195,
        description: '碳轨座垫，轻量舒适',
        priceFormatted: '¥220',
        weightFormatted: '195g'
      }
    ]
  },
  {
    id: 'rec-3',
    name: '越野先锋',
    bikeType: 'MTB',
    description: '山地越野爱好者的选择，强悍悬挂系统。专为林道和越野地形设计的配置组合。',
    totalPrice: 22000,
    totalWeight: 11500,
    tags: ['越野'],
    componentCount: 6,
    components: [
      {
        id: 'rec-3-1',
        category: 'Drivetrain',
        categoryName: '传动系统',
        categoryIcon: '⚙️',
        name: 'Shimano XTR Di2 M9100',
        brand: 'Shimano',
        model: 'XTR Di2 M9100',
        price: 3800,
        weight: 1920,
        description: '顶级山地电子变速，即时响应',
        priceFormatted: '¥3,800',
        weightFormatted: '1,920g'
      },
      {
        id: 'rec-3-2',
        category: 'Suspension',
        categoryName: '避震系统',
        categoryIcon: '⚡',
        name: 'Fox 34 Float Factory GRIP2',
        brand: 'Fox Racing Shox',
        model: '34 Float Factory',
        price: 1050,
        weight: 1738,
        description: '140mm行程，四向可调阻尼',
        priceFormatted: '¥1,050',
        weightFormatted: '1,738g'
      },
      {
        id: 'rec-3-3',
        category: 'Wheelset',
        categoryName: '轮组',
        categoryIcon: '⚫',
        name: 'Roval Traverse SL II 29',
        brand: 'Roval',
        model: 'Traverse SL II',
        price: 1500,
        weight: 1720,
        description: '29寸碳纤轮组，耐冲击设计',
        priceFormatted: '¥1,500',
        weightFormatted: '1,720g'
      },
      {
        id: 'rec-3-4',
        category: 'Tires',
        categoryName: '轮胎',
        categoryIcon: '🔘',
        name: 'Maxxis Minion DHR II 3C MaxxTerra',
        brand: 'Maxxis',
        model: 'Minion DHR II',
        price: 140,
        weight: 790,
        description: '29x2.4寸，山地越野专用',
        priceFormatted: '¥140',
        weightFormatted: '790g'
      },
      {
        id: 'rec-3-5',
        category: 'Frame',
        categoryName: '车架',
        categoryIcon: '🔲',
        name: '碳纤维林道车架',
        brand: 'Specialized',
        model: 'Stumpjumper EVO',
        price: 14510,
        weight: 2100,
        description: '150mm行程全地形越野车架',
        priceFormatted: '¥14,510',
        weightFormatted: '2,100g'
      },
      {
        id: 'rec-3-6',
        category: 'Saddle',
        categoryName: '座垫',
        categoryIcon: '🪑',
        name: 'Specialized Bridge Comp',
        brand: 'Specialized',
        model: 'Bridge Comp',
        price: 200,
        weight: 340,
        description: '山地专用座垫，耐磨耐用',
        priceFormatted: '¥200',
        weightFormatted: '340g'
      }
    ]
  },
  {
    id: 'rec-4',
    name: '城市伴侣',
    bikeType: 'Fold',
    description: '城市通勤首选，便携折叠，灵活便捷。轻巧的车身设计，适合多种出行场景。',
    totalPrice: 8500,
    totalWeight: 9800,
    tags: ['通勤', '便携'],
    componentCount: 6,
    components: [
      {
        id: 'rec-4-1',
        category: 'Frame',
        categoryName: '车架',
        categoryIcon: '🔲',
        name: 'Brompton Superlight Main Frame',
        brand: 'Brompton',
        model: 'Superlight Frame',
        price: 1400,
        weight: 1800,
        description: '轻量化钢架，三步折叠设计',
        priceFormatted: '¥1,400',
        weightFormatted: '1,800g'
      },
      {
        id: 'rec-4-2',
        category: 'Drivetrain',
        categoryName: '传动系统',
        categoryIcon: '⚙️',
        name: 'Shimano Alfine Di2 SG-S7051',
        brand: 'Shimano',
        model: 'Alfine Di2',
        price: 1200,
        weight: 1765,
        description: '11速内变速，低维护保养',
        priceFormatted: '¥1,200',
        weightFormatted: '1,765g'
      },
      {
        id: 'rec-4-3',
        category: 'Wheelset',
        categoryName: '轮组',
        categoryIcon: '⚫',
        name: 'Brompton Superlight Wheelset',
        brand: 'Brompton',
        model: 'Superlight Wheelset',
        price: 450,
        weight: 1240,
        description: '16寸轻量轮组，铝合金材质',
        priceFormatted: '¥450',
        weightFormatted: '1,240g'
      },
      {
        id: 'rec-4-4',
        category: 'Cockpit',
        categoryName: '操控组件',
        categoryIcon: '🎯',
        name: 'Brompton M-Type Handlebar',
        brand: 'Brompton',
        model: 'M-Type Handlebar',
        price: 120,
        weight: 310,
        description: '经典 M 把，人体工学设计',
        priceFormatted: '¥120',
        weightFormatted: '310g'
      },
      {
        id: 'rec-4-5',
        category: 'Tires',
        categoryName: '轮胎',
        categoryIcon: '🔘',
        name: 'Schwalbe Marathon Racer 16x1-1/3',
        brand: 'Schwalbe',
        model: 'Marathon Racer',
        price: 65,
        weight: 370,
        description: '轻量通勤胎，低滚阻设计',
        priceFormatted: '¥65',
        weightFormatted: '370g'
      },
      {
        id: 'rec-4-6',
        category: 'Saddle',
        categoryName: '座垫',
        categoryIcon: '🪑',
        name: 'Brompton Aerolite Saddle',
        brand: 'Brompton',
        model: 'Aerolite',
        price: 280,
        weight: 280,
        description: '轻量座垫，适合城市骑行',
        priceFormatted: '¥280',
        weightFormatted: '280g'
      }
    ]
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
