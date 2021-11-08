
Page({
  data: {
    id:'',
    job:[],
    savejob:[],
   //
   jobList: [],
   isClick: true,
   jobStorage: [],
   jobId: '',
   //
   option1: [
    { text: '全部播放', value: 0 },

  ],
  option2: [
    { text: '顺序播放', value: 'a' },
    { text: '随机播放', value: 'b' },
    { text: '循环播放', value: 'c' },
  ],
  value1: 0,
  value2: 'a',
    },

    onClose(event) {
      const { position, instance } = event.detail;
      switch (position) {
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
//收藏
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }
})