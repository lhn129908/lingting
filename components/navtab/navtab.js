// components/navtab/navtab.js
var app =  getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: app.globalData.active,
    list: [
      {
        "url": "/pages/index/index",
        "text": "首页",
        "normal": '../../pages/public/icofont/home.png',
        "active": '../../pages/public/icofont/home.png',
      },
      {
        "url": "/pages/control/control",
        "text": "",
        "normal": '',
        "active": '',
      },
      {
        "url": "/pages/my/my",
        "text": "我的",
        "normal": '../../pages/public/icofont/my.png',
        "active": '../../pages/public/icofont/my.png',
      }
    ]

  },
  onShow: function () {
    console.log('个人中心')
    this.getTabBar().init();
  },

  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
      app.globalData.active=this.data.active;
      console.log(this.data.active)
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },
    // init() {
    //   const page = getCurrentPages().pop();
    //   this.setData({
    //     active: this.data.list.findIndex(item => item.url === `/${page.route}`)
    //   });
    // }

    /**
     * 组件的方法列表
     */
  },
  options: {
    styleIsolation: 'shared',
  }
})
