export const translations = {
  app: {
    name: 'Veloform',
    tagline: '高级自行车配置器',
  },
  nav: {
    home: '首页',
    library: '配置库',
    support: '支持',
    login: '登录',
    logout: '登出',
    language: '语言',
  },
  configurator: {
    buildList: '配置清单',
    selectComponent: '选择组件',
    saveBuild: '保存配置',
    saving: '保存中...',
    reset: '重置',
    currentBuild: '当前配置',
    totalCost: '总价格',
    estimatedWeight: '预估重量',
    emptyState: {
      title: '尚未选择任何组件',
      description:
        '从下方按钮开始选择组件，打造专属于你的完美座驾。每个组件都有实时价格和重量显示。',
      cta: '开始选择组件',
    },
    loginToSave: '登录以保存配置',
    loginToSaveHint:
      '保存的配置将自动同步到云端，方便你在任何设备上继续编辑。未登录时配置仅保存在本地浏览器。',
  },
  bikeTypes: {
    road: '公路车',
    mtb: '山地车',
    fold: '折叠车',
  },
  categories: {
    frame: '车架',
    drivetrain: '传动系统',
    wheelset: '轮组',
    suspension: '避震',
    cockpit: '车把组件',
    tires: '轮胎',
  },
  library: {
    title: '您的配置库',
    subtitle: 'Veloform 保存的配置',
    noConfigs: '暂无保存的配置',
    startBuilding: '开始配置',
    load: '加载',
    cost: '价格',
    weight: '重量',
    backToConfigurator: '返回配置器',
    bikeType: '车型',
  },
  recommended: {
    title: '推荐配置',
    subtitle: '专家精选配置方案',
    load: '加载配置',
  },
  compare: {
    title: '比较配置',
    configs: '个配置',
    component: '组件',
    load: '加载',
    close: '关闭',
    selectToCompare: '选择配置进行比较',
    maxThree: '最多可比较3个配置',
  },
  share: {
    title: '分享配置',
    link: '分享链接',
    copyLink: '复制链接',
    exportJSON: '导出为 JSON',
    copied: '链接已复制到剪贴板！',
    copyFailed: '复制链接失败',
    exported: '配置导出成功！',
    hint: '与朋友分享您的配置或保存供以后使用。',
  },
  onboarding: {
    step1: {
      title: '选择车型',
      description: '从公路车、山地车或折叠车中选择，开始打造您的梦想座驾。',
      tip: '每种车型都有优化的组件推荐，帮助您快速开始。',
    },
    step2: {
      title: '自定义组件',
      description: '点击任意组件探索替代方案，找到最适合您的配置。',
      tip: '我们会实时显示价格和重量变化，帮助您做出明智决策。',
    },
    step3: {
      title: '保存配置',
      description: '将配置保存到您的配置库，随时可以查看和修改。',
      tip: '配置会自动同步到云端，您可以在任何设备上访问。',
    },
    step4: {
      title: '比较与分享',
      description: '比较不同配置方案，并与他人分享您的配置。',
      tip: '最多可同时比较3个配置，轻松找出最佳方案。',
    },
    next: '下一步',
    back: '上一步',
    skip: '跳过引导',
    getStarted: '开始使用',
  },
  support: {
    title: '需要帮助？',
    contactForm: '发送消息',
    name: '您的姓名',
    email: '您的邮箱',
    message: '您的消息',
    send: '发送消息',
    submitted: '消息已发送！',
    thankYou: '感谢您的咨询，我们会尽快回复您。',
    faq: '常见问题',
    faq1: '如何保存我的配置？',
    faq1Answer: '点击摘要面板中的"保存配置"按钮。您的配置将保存到您的配置库中供以后访问。',
    faq2: '我可以分享我的配置吗？',
    faq2Answer: '可以！点击"分享配置"按钮生成分享链接或将您的配置导出为JSON文件。',
    faq3: '如何比较配置？',
    faq3Answer: '前往您的配置库页面，使用比较按钮选择配置，比较面板将出现在屏幕底部。',
    faqCategories: {
      configurator: '配置器相关',
      saveAndShare: '保存和分享',
      pricing: '定价和订阅',
      technical: '技术支持',
    },
    faqItems: {
      configurator: [
        {
          question: '如何开始配置自行车？',
          answer:
            '从主页选择您的车型（公路车、山地车或折叠车）开始。然后点击任何组件类别来浏览可用选项并自定义您的配置。',
        },
        {
          question: '我可以自定义所有组件吗？',
          answer:
            '当然可以！您可以自定义包括车架、传动系统、轮组、避震、车把组件和轮胎在内的所有组件。每个组件都有多种选项可供选择。',
        },
        {
          question: '如何重置我的配置？',
          answer: '点击摘要面板中的"重置"按钮清除所有选中的组件并重新开始。此操作无法撤销。',
        },
      ],
      saveAndShare: [
        {
          question: '如何保存我的配置？',
          answer:
            '点击摘要面板中的"保存配置"按钮。如果您已登录，配置将同步到云端。如果未登录，配置将保存在浏览器本地。',
        },
        {
          question: '我可以与他人分享我的配置吗？',
          answer:
            '当然可以！点击"分享配置"按钮生成分享链接。任何人都可以通过链接查看甚至编辑您的配置。',
        },
        {
          question: '如何导出我的配置？',
          answer:
            '在分享弹窗中，选择"导出为JSON"将您的配置下载为JSON文件。您可以稍后导入此文件或与他人分享。',
        },
      ],
      pricing: [
        {
          question: '免费版包含哪些内容？',
          answer: '免费的个人版包含无限项目、5GB存储空间、基础组件库、社区模板和标准支持。',
        },
        {
          question: '我可以升级或降级我的方案吗？',
          answer: '是的，您可以随时升级或降级方案。更改立即生效，您的账单将相应调整。',
        },
        {
          question: '你们提供年度折扣吗？',
          answer:
            '是的！当您选择年度订阅而不是月度订阅时，我们提供20%的折扣。此折扣适用于所有付费方案。',
        },
      ],
      technical: [
        {
          question: '支持哪些浏览器？',
          answer:
            '我们支持所有现代浏览器，包括Chrome、Firefox、Safari和Edge。为获得最佳体验，我们建议使用最新版本。',
        },
        {
          question: '我的数据安全吗？',
          answer:
            '是的！所有数据在传输和存储时都经过加密。我们采用行业标准的安全措施来保护您的配置和个人信息。',
        },
        {
          question: '如何报告问题？',
          answer:
            '如果您遇到任何问题，请使用我们支持页面上的联系表单或发送邮件至support@veloform.com，并详细描述问题。',
        },
      ],
    },
  },
  common: {
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    close: '关闭',
    components: '个组件',
    retry: '重试',
    backToHome: '返回首页',
    loading: '正在加载...',
  },
  error: {
    title: '页面出现了一些问题',
    unexpectedError: '发生了意外错误',
    stackTrace: '错误堆栈（仅开发环境可见）',
    homePageTitle: '页面出现了点小问题',
    homePageMessage: '别担心，这可能只是暂时的。你可以试试刷新页面，或者回到首页。',
    libraryTitle: '配置库加载失败',
    libraryMessage: '保存的配置可能暂时无法读取。请重试或返回配置器。',
    backToConfigurator: '返回配置器',
    contactSupport: '如果问题持续存在，请通过「帮助」按钮联系我们',
  },
  notFound: {
    title: '页面没有找到',
    description: '你找的页面可能已经被移走了，或者从未存在过。试试回到首页继续配置你的爱车吧。',
    backToHome: '返回首页',
    library: '配置库',
  },
  loading: {
    message: '正在加载...',
  },
  componentDetail: {
    technicalSpecs: '技术规格',
    keyFeatures: '关键特性',
    selectComponent: '选择此组件',
    price: '价格',
    weight: '重量',
    reviews: '条评价',
  },
  hero: {
    badge: '全新版本现已发布',
    title: '打造你的梦想自行车',
    titlePart1: '打造',
    titlePart2: '你的梦想自行车',
    description: '选择车型，自定义组件，创建专属于你的完美座驾。每一个细节都由你掌控。',
    descriptionLine1: '选择车型，自定义组件，创建专属于你的完美座驾。',
    descriptionLine2: '每一个细节都由你掌控。',
    cta: '开始配置',
    demo: '观看演示视频',
    trusted: '受到全球顶尖品牌信赖',
    scrollHint: '向下滚动',
  },
  features: {
    title: '为骑行而生',
    subtitle: '强大的功能，简洁的操作，让你的自行车配置变得轻松而愉悦',
    badge: '核心功能',
    items: {
      infinite: {
        title: '无限配置',
        description: '丰富的组件选择，从车架到配件，打造专属于你的完美座驾',
      },
      speed: { title: '极速响应', description: '毫秒级响应速度，流畅的操作体验，创作无延迟' },
      security: { title: '安全保障', description: '端到端加密，自动云端备份，配置安全无忧' },
      assets: { title: '丰富素材', description: '海量优质组件资源，一键使用，激发无限灵感' },
      export: { title: '数据导出', description: '一键导出配置清单，分享你的完美配置方案' },
      sync: { title: '云端同步', description: '多设备无缝同步，随时随地继续配置' },
    },
  },
  pricing: {
    title: '选择适合你的方案',
    subtitle: '灵活的定价策略，满足不同规模用户的需求',
    badge: '定价方案',
    monthly: '月付',
    yearly: '年付',
    yearlyDiscount: '省20%',
    guarantee: '所有方案均包含 14 天全额退款保障，如有任何不满意，无需任何理由即可申请退款',
    plans: {
      personal: {
        name: '个人版',
        description: '适合独立骑行爱好者',
        cta: '免费开始',
        features: ['无限项目', '5GB 存储空间', '基础组件库', '社区模板库', '标准支持'],
      },
      pro: {
        name: '专业版',
        description: '适合专业骑手和小团队',
        cta: '立即升级',
        popular: '最受欢迎',
        features: [
          '无限项目',
          '100GB 存储空间',
          '高级组件库',
          '专属模板库',
          '优先支持',
          '团队协作功能',
          '配置导出',
        ],
      },
      enterprise: {
        name: '企业版',
        description: '适合车队和企业',
        cta: '联系销售',
        features: [
          '无限项目',
          '无限存储空间',
          '全套组件库',
          '定制模板库',
          '24/7 专属支持',
          '高级团队协作',
          '私有化部署',
          'SLA 保障',
        ],
      },
    },
  },
  cta: {
    badge: '免费试用，无需信用卡',
    title: '准备好开始配置你的梦想之车了吗？',
    description: '加入超过 100,000 名骑行爱好者的行列',
    cta: '免费开始',
    learnMore: '了解更多',
    features: ['无需信用卡', '随时取消', '终身免费版'],
  },
  footer: {
    description: '为骑行爱好者打造的专业自行车配置平台，让每一辆车都独一无二。',
    categories: {
      product: '产品',
      company: '公司',
      resources: '资源',
      legal: '法律',
    },
    links: {
      product: ['功能', '定价', '更新日志', '路线图'],
      company: ['关于我们', '博客', '招聘', '联系我们'],
      resources: ['文档', 'API 参考', '社区', '帮助中心'],
      legal: ['隐私政策', '服务条款', '安全说明', 'Cookie 设置'],
    },
    copyright: '© 2024 Veloform. All rights reserved.',
  },
  about: {
    brand: {
      title: '关于 Veloform',
      description:
        'Veloform 是专为全球骑行爱好者设计的顶级自行车配置平台。我们的使命是让骑手能够自信、精准、富有创意地打造他们的梦想之车。',
    },
    stats: {
      activeUsers: { value: '10万+', label: '活跃用户' },
      components: { value: '500+', label: '组件选项' },
      satisfaction: { value: '98%', label: '满意度' },
      countries: { value: '120+', label: '支持国家' },
    },
    values: {
      title: '我们的核心价值观',
      loveRiding: {
        title: '热爱骑行',
        description: '我们相信骑行的乐趣，并致力于通过创新技术提升每位骑手的体验。',
      },
      excellence: {
        title: '追求卓越',
        description: '我们致力于提供最高质量的工具和服务，不断突破可能的边界。',
      },
      userFirst: {
        title: '用户至上',
        description: '用户是我们一切工作的核心。我们倾听、迭代，并根据用户的需求进行构建。',
      },
    },
    contact: {
      title: '联系我们',
      description: '有问题或反馈？我们很乐意听取您的意见。',
      email: 'hello@veloform.com',
      phone: '+1 (800) VELOFORM',
      address: '加利福尼亚州旧金山',
      sendMessage: '发送消息',
    },
  },
} as const;
