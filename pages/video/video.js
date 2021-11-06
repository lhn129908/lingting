// pages/video/video.js
const app = getApp();
import{mvURL,simiURL} from "../../utils/reqeust";
import{requestGet} from "../../utils/reqeust";

Page({
    data: {
        mvid: null,
        mvs:[],
        mds:[],
        simimvs:[]
    },

    onLoad: function (options) {

        this.mvid = options.mvid;
        this.getListData();
    },
    async getListData() {
        const result = await requestGet(mvURL,{mvid:this.mvid});
        const simi = await requestGet(simiURL,{mvid:this.mvid});
        const mv = result.data;
        const md = mv.brs;
        const simimv=simi.mvs;
        console.log(simimv)
        console.log(mv);
        console.log(md);
        this.setData({
           mvs:mv,
           mds:md,
           simimvs:simimv,
          }); 
          console.log(this.data.mvs);
          console.log(this.data.mds[240]);
    }
})