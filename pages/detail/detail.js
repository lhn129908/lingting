// pages/detail/detail.js
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      id: "546734",
      title: "中国成功发射高分十号卫星 主要用于国土普查、防灾减灾等领域",
      poster: "http://i2.chinanews.com/simg/cmshd/2019/10/05/998e12aa71f248d4a797761b18e48418.jpg",
      add_date: "2019-10-05",
      content: "中新网北京10月5日电(郭超凯 赵金龙)北京时间10月5日2时51分，中国在太原卫星发射中心用长征四号丙运载火箭，成功将高分十号卫星发射升空，卫星顺利进入预定轨道，任务获得圆满成功。\n高分十号卫星是高分辨率对地观测系统国家科技重大专项安排的微波遥感卫星，地面像元分辨率最高可达亚米级，主要用于国土普查、城市规划、土地确权、路网设计、农作物估产和防灾减灾等领域，可为“一带一路”等国家重大战略实施和国防现代化建设提供信息保障。\n长征四号丙运载火箭和高分十号卫星，均由中国航天科技集团有限公司所属上海航天技术研究院研制。此次任务是长征系列运载火箭的第314次航天飞行。(完)"
    },
    isAdd: false
  },
  //添加收藏
  addFavorites: function () {
    let article = this.data.article
    wx.setStorageSync(article.id, article)
    this.setData({
      isAdd: true
    })
  },
  //取消收藏
  cancelFavorites: function () {
    let article = this.data.article
    wx.removeStorageSync(article.id)
    this.setData({
      isAdd: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    let id = options.id

    //检查当前新闻是否在收藏夹中
    var newarticle = wx.getStorageSync(id)
    //已存在
    if (newarticle != "") {
      this.setData({
        isAdd: true,
        article: newarticle
      })
    }
    //不存在
    else {
      let result = common.getNewsDetail(id)
      //获取新闻内容
      if (result.code == "200") {
        this.setData({
          article: result.news,
          isAdd:false
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})