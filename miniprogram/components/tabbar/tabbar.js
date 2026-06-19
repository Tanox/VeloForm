// components/tabbar/tabbar.js
Component({
  data: {
    selected: 0,
    list: [
      {
        text: '首页',
        path: '/pages/index/index',
        icon: 'home'
      },
      {
        text: '配置器',
        path: '/pages/configurator/configurator',
        icon: 'config'
      },
      {
        text: '配置库',
        path: '/pages/library/library',
        icon: 'library'
      }
    ]
  },
  attached() {
    this.setData({ selected: this.getTabBarIndex() });
  },
  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      const path = this.data.list[index].path;
      
      wx.switchTab({ url: path });
    },
    getTabBarIndex() {
      const pages = getCurrentPages();
      if (!pages || pages.length < 2) return 0;
      
      const currentPage = pages[pages.length - 1];
      const route = `/${currentPage.route}`;
      
      const index = this.data.list.findIndex(item => item.path === route);
      return index >= 0 ? index : 0;
    }
  }
});
