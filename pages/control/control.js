// pages/control/control.js
const backgroundAudioManager = wx.getBackgroundAudioManager()

import { formatMs2Obj } from "../../utils/fengzhuang"
const app = getApp();
import { lyricURL } from "../../utils/fengzhuang"
import { songURL } from "../../utils/fengzhuang"
import { requestGet } from "../../utils/fengzhuang"
import { detailURL } from "../../utils/fengzhuang"
import { parseLyric } from "../../utils/fengzhuang"
import { sliceNull } from "../../utils/fengzhuang"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    hang: 0,
    height: "",//屏幕高度
    index: 1,//播放歌曲下标
    id: "",//歌曲id
    src: {},//歌曲网址
    geci: [],//歌词
    storyContent: [],
    songs: {},//歌曲信息
    leng: "",//进度条
    value: 0,//播放循序
    liebiao: [],//传入歌曲数据
    liebiaoId: [],
    bofang: "suijibofang",//播放状态
    liebiao_shuju: [],
    activeIndex: 1,//行数
    scrolltop: 0,  //和顶部的距离
    duration: "00:00",   //总时间

    currentTime: "00:00",  //目前时间
    autoplay: false,// 播放状态
  },
  ddd(e) {
    console.log(e, this.data.index, this.data.activeIndex)
  },
  onLoad: async function (options) {




    //获取进页面参数
    const liebiao = JSON.parse(options.liebiao)
    const liebiaoId = []
    for (let i = 0; i < liebiao.length; i++) {

      liebiaoId[i] = liebiao[i].id

    }
    this.setData({
      value: app.globalData.value,
      id: options.id,
      liebiao: liebiao,
      liebiaoId: liebiaoId,
    });
    //屏幕的信息
    const res = await wx.getSystemInfo()
    console.log(res)
    this.setData({
      height: res.windowHeight
    })



    //获取歌曲
    const songData = await requestGet(songURL, { id: this.data.id })
    //获取歌词
    const lyricData = await requestGet(lyricURL, { id: this.data.id });
    //获取歌曲详细
    const detailData = await requestGet(detailURL, { ids: this.data.id });
    this.setData({
      src: songData.data[0],
      geci: lyricData.lrc.lyric,
      songs: detailData.songs[0]
    })
    //背景播放
    backgroundAudioManager.title = this.data.songs.name
    backgroundAudioManager.epname = this.data.songs.name
    backgroundAudioManager.src = this.data.src.url;
    // 随歌曲播放运行函数
    
    backgroundAudioManager.onTimeUpdate(() => {
      const duration = formatMs2Obj(backgroundAudioManager.duration)
      const currentTime = formatMs2Obj(backgroundAudioManager.currentTime)
      const leng = backgroundAudioManager.currentTime / backgroundAudioManager.duration
      this.setData({
        duration: duration.m + ":" + duration.s,
        currentTime: currentTime.m + ":" + currentTime.s,
        leng: leng * 300 + "px",
      })
      const currentTimes = currentTime.m + ":" + currentTime.s+"."+currentTime.f
      var scrolltop =this.data.scrolltop
      
      if(currentTimes >= this.data.geci[this.data.activeIndex].time){
        if(this.data.activeIndex > 6){
          
          scrolltop = this.data.scrolltop+25
          this.setData({
            scrolltop:scrolltop
          })
        }
        
        this.setData({
          activeIndex:this.data.activeIndex+1,
          // scrolltop:scrolltop
        })
        
      }
     

    })
    backgroundAudioManager.onCanplay(() => {
      const geci = this.data.geci.split('\n')
      const arr = geci.map(r => {
        var arr1 = r.trim().substr(1).split("]")

        return {
          time: arr1[0],
          text: arr1[1]
        }
      })
      this.setData({
        geci: arr
      })
    })

    // })

    // var liebiao_shuju = [];
    // for (let i = 0; i < this.data.liebiao.length; i++) {
    //   let index = this.data.liebiao[i]
    //   async function a() {
    //       const Data = await requestGet(detailURL, { id: index })
    //       let datas = {
    //         name: Data.songs[0].name,
    //         zuoze: Data.songs[0].ar[0].name
    //       }

    //       liebiao_shuju[i] = datas

    //       console.log(index,datas)
    //     }
    //     a();

    // }
    backgroundAudioManager.onEnded(async () => {

      switch (app.globalData.value) {
        //随机播放
        case 1:
          //   33894
          // 301-906

          var i = Math.floor(Math.random() * this.data.liebiaoId.length);


          //背景播放
          break;
        //顺序播放
        case 0:
          var i = this.data.liebiaoId.indexOf(this.data.id)
          if (i == this.data.liebiaoId.length - 1) {
            backgroundAudioManager.stop()
          }


          break;
        //单曲循环
        case 3:
          var i = this.data.liebiaoId.indexOf(this.data.id)

          break;
        //列表循环
        case 2:
          var i = this.data.liebiaoId.indexOf(this.data.id)
          if (i == this.data.liebiaoId.length - 1) {
            i = -1;
          }


          break;




      }

      this.setData({
        index: i,
        id: this.data.liebiaoId[i]
      })
      //获取歌曲
      const songData = await requestGet(songURL, { id: this.data.id })
      //获取歌词
      const lyricData = await requestGet(lyricURL, { id: this.data.id });
      //获取歌曲详细
      const detailData = await requestGet(detailURL, { ids: this.data.id });
      var LyricDatas = "";
      var songDatas = "";

      if (lyricData.sgc) {
        LyricDatas = "[00:00.000]没有歌词"
      } else {
        LyricDatas = lyricData.lrc.lyric;
      }
      if (songData.data[0].url == null) {

      } else {
        songDatas = songData.data[0];
      }
      this.setData({
        src: songData.data[0],
        geci: LyricDatas,
        songs: detailData.songs[0],
        activeIndex: 1,//行数
    scrolltop: 0, 
      })

      backgroundAudioManager.title = this.data.songs.name
      backgroundAudioManager.epname = this.data.songs.name
      backgroundAudioManager.src = this.data.src.url;
      backgroundAudioManager.play()

    })




  },

  //播放
  audioPlay() {

    backgroundAudioManager.play();
    this.setData({
      autoplay: false,
    })
  },
  //  暂停
  audioPause() {
    backgroundAudioManager.pause();
    this.setData({
      autoplay: true,
    })
  },
  //播放循序
  bofang() {
    const bf = ["shunxubofang", "suijibofang", "liebiaoxunhuan", "danquxunhuan"]
    var i = app.globalData.value
    if (app.globalData.value == bf.length - 1) {
      i = 0;
    } else { i = i + 1 }
    this.setData({
      value: i,
      bofang: bf[i]
    })
    app.globalData.value = i;

  },
  //上一首
  async shangyishou() {
    backgroundAudioManager.stop()
    switch (app.globalData.value) {
      //随机播放
      case 1:
        //   33894
        // 301-906
        var i = Math.floor(Math.random() * this.data.liebiaoId.length);


        break;
      //顺序播放
      case 0:
        var i = this.data.liebiaoId.indexOf(this.data.id)

        if (i == 0 || i == this.data.liebiaoId.length) {
          backgroundAudioManager.stop()
        } else {
          i = i - 1
        }

        break;
      //单曲循环
      case 3:
        var i = this.data.liebiaoId.indexOf(this.data.id)
        console.log(i)

        break;
      //列表循环
      case 2:
        var i = this.data.liebiaoId.indexOf(this.data.id)

        if (i == 0) {
          i = this.data.liebiaoId.length - 1
        } else {
          i = i - 1
        }

        break;

    }

    this.setData({
      index: i,
      id: this.data.liebiaoId[i]
    })
    //获取歌曲
    const songData = await requestGet(songURL, { id: this.data.id })
    //获取歌词
    const lyricData = await requestGet(lyricURL, { id: this.data.id });
    //获取歌曲详细
    const detailData = await requestGet(detailURL, { ids: this.data.id });
    var LyricDatas = "";
    var songDatas = "";

    if (lyricData.sgc) {
      LyricDatas = "[00:00.000]没有歌词"
    } else {
      LyricDatas = lyricData.lrc.lyric;
    }
    if (songData.data[0].url == null) {

    } else {
      songDatas = songData.data[0];
    }
    this.setData({
      src: songData.data[0],
      geci: LyricDatas,
      songs: detailData.songs[0],
      activeIndex: 1,//行数
    scrolltop: 0, 
    })

    backgroundAudioManager.title = this.data.songs.name
    backgroundAudioManager.epname = this.data.songs.name
    backgroundAudioManager.src = this.data.src.url;
    backgroundAudioManager.play()
  },
  //下一首
  async xiayisou() {
    backgroundAudioManager.stop()
    switch (app.globalData.value) {
      //随机播放
      case 1:
        //   33894
        // 301-906
        var i = Math.floor(Math.random() * this.data.liebiaoId.length);
        if (i == this.data.index) {
          i=i+1
        }

        break;
      //顺序播放
      case 0:
        var i = this.data.liebiaoId.indexOf(this.data.id)
        if (i == this.data.liebiaoId.length - 1) {
          backgroundAudioManager.stop()
        } else {
          i = i + 1
        }

        break;
      //单曲循环
      case 3:
        var i = this.data.liebiaoId.indexOf(this.data.id)


        break;
      //列表循环
      case 2:
        var i = this.data.liebiaoId.indexOf(this.data.id)
        if (i == this.data.liebiaoId.length - 1) {
          i = 0
        } else {
          i = i + 1
        }

        break;

    }

    this.setData({
      index: i,
      id: this.data.liebiaoId[i]
    })
    console.log(this.data.index, this.data.id, this.data.liebiaoId[this.data.index])
    //获取歌曲
    const songData = await requestGet(songURL, { id: this.data.id })
    //获取歌词
    const lyricData = await requestGet(lyricURL, { id: this.data.id });
    //获取歌曲详细
    const detailData = await requestGet(detailURL, { ids: this.data.id });
    var LyricDatas = "";
    var songDatas = "";

    if (lyricData.sgc) {
      LyricDatas = "[00:00.000]没有歌词"
    } else {
      LyricDatas = lyricData.lrc.lyric;
    }
    if (songData.data[0].url == null) {

    } else {
      songDatas = songData.data[0];
    }
    this.setData({
      src: songData.data[0],
      geci: LyricDatas,
      songs: detailData.songs[0],
      activeIndex: 1,//行数
       scrolltop: 0,   
    })

    backgroundAudioManager.title = this.data.songs.name
    backgroundAudioManager.epname = this.data.songs.name
    backgroundAudioManager.src = this.data.src.url;
    backgroundAudioManager.play()

  },
  //列表
  liebiao() {

    this.setData({
      select: true
    })
    console.log(this.data.select)
  },
  mySelect() {

  },
  xialafanhui() {
    this.setData({
      select: false
    })
  },
  shanchu(e) {
    const Id = e.currentTarget.dataset.id
    const liebiao = this.data.liebiao
    const liebiaoId = this.data.liebiaoId
    const i = this.data.liebiaoId.indexOf(Id)
    liebiaoId.splice(i, 1)
    liebiao.splice(i, 1)
    this.setData({
      liebiaoId: liebiaoId,
      liebiao: liebiao
    })
  },


})
