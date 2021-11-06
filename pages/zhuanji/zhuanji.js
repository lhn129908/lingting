const app = getApp();
import{ListsURL} from "../../utils/reqeust";
import{requestGet} from "../../utils/reqeust";

Page({
    data: {
        Id: null,
        albs:[],
        songs: [],
        liebiao:[],
        option1: [
            { text: '顺序播放', value: 0 },
            { text: '随机播放', value: 1 },
            { text: '列表循环', value: 2 },
            { text: '单曲循环', value: 3 },
          ],
          value1: 0,
          
            
    },

   
    onLoad: function (options) {

        this.Id = options.Id;
        this.getListData();
    },
    //app.globalData.gedanId
    async getListData() {
    const result = await requestGet(ListsURL,{Id:this.Id});
    const songs = result.songs;
    const alb = result.album;
    // const arts = Array.from( alb,({ar})=>ar);
    console.log(alb);
    console.log(songs);
    this.setData({
        songs:result.songs,
        albs:result.album,
      });
    }

    
   
})