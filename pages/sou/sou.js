var app = getApp();
// 导入封装的请求
import { requestGet } from "../../utils/request";
Page({
  data: {
    slides: [], // 存放接口拿来的热门搜索歌曲
    viewShowed: false, //用来表示view是否隐藏或显示
    list: [], //存放接口拿来的模糊搜索的歌曲
    inputVal:""
  },

  // 小程序发送网络请求，向接口拿数据，一般放在onload方法中
  onLoad() {
    this.getSlidesData();  
  },


  // 搜索框输入的内容
  inputTyping:function(e){
    this.setData({
      inputVal:e.detail.value
    })
    app.globalData.inputVal=e.detail.value
    // shu = e.detail.value
    // console.log(e.detail.value,app.globalData.inputVal)
    this.getSearchData();    //当输入值时向接口拿数据
    var that = this;
    if(app.globalData.inputVal == ''){
      that.setData({
        viewShowed: false,
      });
    }else{
      if(e.detail.cursor){
        that.setData({
          viewShowed:true,
        })
      }
    }
  },

  // 拿到模糊搜索后的歌曲，在wxml中渲染
  async getSearchData() {
    // console.log(app.globalData.inputVal)
    const result = await requestGet("http://101.35.3.52/search?keywords="+app.globalData.inputVal+"");
    // var shu = result;
    console.log(result)
    this.setData({
      list: result.result.songs
    });
    console.log(this.data.list);
  },

  clickOn(e){
    console.log(e);
    console.log(e.currentTarget.dataset.index);
    app.globalData.inputVal=e.currentTarget.dataset.index,
    app.globalData.i = 0
    wx.redirectTo({
      url: '/pages/search/search',
    })
  },

  clickSearch(){
    console.log(this.data.list);
    app.globalData.i = 0
    console.log(app.globalData.inputVal);
    wx.redirectTo({
      url: "/pages/search/search",
    })
  },


   // 拿到热门搜索的歌曲
   async getSlidesData() {
    const result = await requestGet("http://101.35.3.52/search/hot");
    this.setData({
      slides: result.result.hots
    });
  },

  click(e){
    console.log(e.currentTarget.dataset.index)
    app.globalData.reData=e.currentTarget.dataset.index
    app.globalData.i = 1
    wx.redirectTo({
      url: '/pages/search/search',
    })
  },
 
});
