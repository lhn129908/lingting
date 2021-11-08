//最近播放
var  appShoucang =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action: {
      method: ''
     },
    job: [],
    jobList: [],
    id: '',
    isPlayingMusic: false,
    isClick: false,
    jobStorage: [],
    jobId: '',
      list: [
          { id: "0001", title: "晴天" , geshou:"周杰伦"},
          { id: "0002", title: "单车", geshou:"陈奕迅" },
          { id: "0003", title: "江南" , geshou:"林俊杰" },
          { id: "0004", title: "有何不可" , geshou:"许嵩"},
          { id: "0005", title: "不要平凡" , geshou:"张杰"},
      ],
      scrollHeight: 0,  // scroll-view高度
      startX: 0,        // 开始X坐标
      startY: 0,        // 开始Y坐标
  },
  //
  
//
onMusicTap: function(event) {
  var isPlayingMusic = this.data.isPlayingMusic;
  console.log(isPlayingMusic);
  if (isPlayingMusic) {
    wx.pauseBackgroundAudio();
    // 设置setData值，前端界面才能读取到isPlayingMusic是值，以下同理
    this.setData({
      isPlayingMusic: false
    }) 
    console.log("pauseBackgroundAudio");
  } else {
    wx.playBackgroundAudio({
      dataUrl: 'http://music.163.com/song/media/outer/url?id=574919767.mp3',
      title: '不要平凡',
      coverImgUrl: '',
    })
    this.setData({
      isPlayingMusic:true
    })
    console.log(isPlayingMusic);
  }
},

  haveSave(e) {
    if (!this.data.isClick == true) {
      let jobData = this.data.jobStorage;
      jobData.push({
        jobid: jobData.length,
        id: this.data.job.id
      })
      wx.setStorageSync('jobData', jobData);//设置缓存
      wx.showToast({
        title: '已收藏',
        // duration: 1000,
        // mask:true,
      });
    } else {
      wx.showToast({
        title: '已取消收藏',
        // duration: 1000,
        // mask: true,   
      });
    }
    this.setData({
      isClick: !this.data.isClick
    })
  },

  // 手指触摸动作开始
  touchStart: function(e){
      let that = this;
      //开始触摸时 重置所有删除
      that.data.list.forEach(function (v, i) {
          if (v.isTouchMove) v.isTouchMove = false; // 只操作为true的
      })
      // 记录手指触摸开始坐标
      that.setData({
          startX: e.changedTouches[0].clientX,  // 开始X坐标
          startY: e.changedTouches[0].clientY,  // 开始Y坐标
          list: that.data.list
      })
  },

  // 手指触摸后移动
  touchMove: function(e){
      let that = this,
          index = e.currentTarget.dataset.index,    // 当前下标
          startX = that.data.startX,                // 开始X坐标
          startY = that.data.startY,                // 开始Y坐标
          touchMoveX = e.changedTouches[0].clientX, // 滑动变化坐标
          touchMoveY = e.changedTouches[0].clientY, // 滑动变化坐标
          // 获取滑动角度
          angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
　　　　　// 判断滑动角度
      that.data.list.forEach(function (v, i) {
          v.isTouchMove = false
          // 滑动超过30度角 return
          if (Math.abs(angle) > 30) return;
          if (i == index) {
              // 右滑
              if (touchMoveX > startX) 
                  v.isTouchMove = false
              // 左滑
              else 
                  v.isTouchMove = true
          }
    })
    // 更新数据
    that.setData({
        list: that.data.list
    })
  },

  // 计算滑动角度
  angle: function (start, end) {
      let that = this,
          _X = end.X - start.X,
          _Y = end.Y - start.Y;
      // 返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  // 删除
  delList: function(e){
      let that = this,
          index = e.currentTarget.dataset.index;  // 当前下标
　　　　　// 切割当前下标元素，更新数据
      that.data.list.splice(index, 1); 
      that.setData({
          list: that.data.list  
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(appShoucan.globaData.list.id)
    this.data.jobData = wx.getStorageSync('jobData');//获得你存储在缓存里的值
      let that = this;
      // 动态获取屏幕高度
      that.setData({
          scrollHeight: wx.getSystemInfoSync().screenHeight
      })
  },
})