const configStore = require('./utils/store');

App({
  onLaunch() {
    // 初始化存储数据
    configStore.init();

    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;

    // 检查登录状态
    this.checkLoginStatus();
  },

  onShow() {
    // 页面显示时刷新配置数据
    configStore.refresh();
  },

  globalData: {
    systemInfo: null,
    isLoggedIn: false,
    userInfo: null,
    appName: 'Veloform',
    version: '3.8.0'
  },

  checkLoginStatus() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.globalData.isLoggedIn = true;
        this.globalData.userInfo = userInfo;
      }
    } catch (e) {
      console.error('检查登录状态失败', e);
    }
  }
});
