var app = getApp();
// 导入封装的请求
import { requestGet } from "../../utils/request";
import Notify from '../../components/vant/notify/notify';

Page({
  data: {
    key: "",
    oneself:1,
    isChecked:false,
    guanZhu:"+关注",
    index:null
  },

  // 搜索结果页面
  onLoad: function (options) {
    this.getKeyData();
  },

// 如果点击的是专辑
onClick(e){
  console.log(e.detail.title);
  switch(e.detail.title){
    case "单曲":
      this.setData({
        oneself: 1,
      });
      this.getKeyData();
    break;
    case "专辑":
      this.setData({
        oneself: 10,
      });
      this.getKeyData();
      break;
      case "歌手":
        this.setData({
          oneself: 100,
        });
        this.getKeyData();
      break;
      case "歌单":
        this.setData({
          oneself: 1000,
        });
        this.getKeyData();
      break;
      case "用户":
        this.setData({
          oneself: 1002,
        });
        this.getKeyData();
      break;
      case "MV":
        this.setData({
          oneself: 1004,
        });
        this.getKeyData();
      break;
      case "歌词":
        this.setData({
          oneself: 1006,
        });
        this.getKeyData();
      break;
      case "电台":
        this.setData({
          oneself: 1009,
        });
        this.getKeyData();
      break;
      case "视频":
        this.setData({
          oneself: 1014,
        });
        this.getKeyData();
      break;
  }
},

  // 拿到热门搜索的歌曲或者模糊搜索的歌曲给同一个数据库
  async getKeyData() {
    // console.log(app.globalData.inputVal);
    if (app.globalData.i == 0) {
      var result = await requestGet(
        "http://101.35.3.52/search?keywords=" + app.globalData.inputVal+"&type="+this.data.oneself
      );
    } else {
      var result = await requestGet(
        "http://101.35.3.52/search?keywords=" + app.globalData.reData +"&type="+this.data.oneself
      );
    }

    this.setData({
      key: result.result,
    });
    console.log(this.data.oneself)
  },
    

  serviceSelection(e){
    console.log(e.currentTarget.id);
    console.log(e);
    // var idx= e.currentTarget.id;
    if(this.data.isChecked==false){
      this.setData({
        guanZhu:'√已关注',
        isChecked:true,
      });
      Notify({ type: 'success', message: '您已关注成功！' });
    }else{
      this.setData({
        guanZhu:'+关注',
        isChecked:false,
      });
      Notify({ type: 'warning', message: '您已取消关注！' });
    }
  }

});
