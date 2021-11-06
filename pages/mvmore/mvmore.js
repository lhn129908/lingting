var app = getApp();
import { requestGet } from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        option1: [
            { text: '全部', value: 0 },
            { text: '内地', value: 1 },
            { text: '港台', value: 2 },
            { text: '欧美', value: 3 },
            { text: '日本', value: 4 },
            { text: '韩国', value: 5 },

          ],
          option2: [
            { text: '全部', value: 'a' },
            { text: '官方版', value: 'b' },
            { text: '原生', value: 'c' },
            { text: '现场版', value: 'd' },
            { text: '网易出品', value: 'e' },
          ],
          value1: 0,
          value2: 'a',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    async getMvData(){
        const result=requestGet("http://101.35.3.52/mv/all?area="+""+"&type="+"");
        
    }

})