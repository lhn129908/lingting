var app = getApp();
import { requestGet } from "../../utils/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        danfen:[],
        dan:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMoreData();
    },
    async getMoreData() {
        // 获取歌单分类
        const result = await requestGet("http://101.35.3.52/playlist/catlist");
        // 获取默认数据
        const result1 = await requestGet("http://101.35.3.52/top/playlist?cat=综艺");
        this.setData({
            danfen:result.sub,
            dan:result1.playlists,
        })
    },
    onChange(e){
        console.log(e.detail.title);
        app.globalData.cat=e.detail.title;
        console.log(app.globalData.cat+"******");
        this.getDanData();
    },
    async getDanData(){
        // 获取歌单分类
        const result =await requestGet("http://101.35.3.52/top/playlist?cat="+app.globalData.cat);
        this.setData({
           dan:result.playlists,
        })
        console.log(result.playlists)
    },
    gedan(e){
        app.globalData.gedanId=e.currentTarget.dataset.id;
        console.log(app.globalData.gedanId)
    }
})