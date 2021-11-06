var app = getApp();
import { requestGet } from "../../utils/request";

Page({
  data: {
    slides: [],
    dan: [],
    new: [],
    tuimv: [],
    bang: [],
    allmv:[]
  },

  // 点击搜索框跳转到搜索页面
  jump() {
    wx.navigateTo({
      url: '/pages/sou/sou',
    })
  },

  onLoad() {
    this.getSlideData();
  },

  async getSlideData() {
    // 获取轮播图数据
    const result = await requestGet("http://101.35.3.52/banner?type=2");
    // 获取推荐数据
    // 获取推荐歌单数据
    const result1 = await requestGet("http://101.35.3.52/personalized?limit=12");
    // 获取推荐新歌数据
    const result2 = await requestGet("http://101.35.3.52/personalized/newsong");
    // 获取推荐mv数据  
    const result3 = await requestGet("http://101.35.3.52/personalized/mv");
    // 获取排行榜
    const result4 = await requestGet("http://101.35.3.52/toplist/detail");
    // 获取mv
    const result5=await requestGet("http://101.35.3.52/mv/all");
    this.setData({
      slides: result.banners,
      dan: result1.result,
      new: result2.result,
      tuimv: result3.result,
      bang: result4.list,
      allmv:result5.data
    })
  },

  // 点击歌单跳转到歌单详情页
  gedan(e) {
    app.globalData.gedanId=e.currentTarget.dataset.gedanid;
    console.log(app.globalData.gedanId)
    wx.navigateTo({
      url: "/pages/gedan/gedan"
    })
  },
  danMore() {
    wx.navigateTo({
      url: "/pages/danmore/danmore"
    })
  },
  mvmore() {
    wx.navigateTo({
      url: "/pages/mvmore/mvmore"
    })
  }

})
