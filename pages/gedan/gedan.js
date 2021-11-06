// pages/gedan/gedan.js
const app = getApp();
import { tjURL } from "../../utils/reqeust";
import { requestGet } from "../../utils/reqeust";

Page({
    data: {
        id: null,
        albs: [],
        songs: [],
        liebiao: [],

        option1: [
            { text: '顺序播放', value: 0 },
            { text: '随机播放', value: 1 },
            { text: '列表循环', value: 2 },
            { text: '单曲循环', value: 3 },
        ],
        value1: 0,
    },
    onLoad: function (options) {
        //app.globalData.gedanId
        this.id = options.id;
        this.getListData();
    },
    qqq(e) {
        const value = app.globalData.value;
    },
    async getListData() {
        const result = await requestGet(tjURL, { id: this.id });
        const songs = result.playlist.tracks;
        const alb = result.playlist;
        // const arts = Array.from( alb,({ar})=>ar);

        this.setData({
            songs: result.playlist.tracks,
            albs: result.playlist,
        });
        this.songs = songs;
        console.log(alb);
        console.log(songs)
        var songss = [];
        var songss1 = {
            id: "",
            name: "",
            zuoze: ""
        }
        
        for (let i = 0; i < this.data.songs.length; i++) {
            songss1 = {
                id: this.data.songs[i].id,
                name: this.data.songs[i].name,
                zuoze: this.data.songs[i].ar[0].name
            }
            songss[i] = songss1
           
        }
        const liebiao = JSON.stringify(songss)
        this.setData({
            liebiao:liebiao
        })
        console.log(songss)
    },
    dianji(e){
        console.log(e)
        wx.reLaunch({
            url:"/pages/control/control?id="+e.currentTarget.dataset.id+"&liebiao="+this.data.liebiao+""
        })
    }

})

// "code": 200,85
// "relatedVideos": null,
// "playlist": {
//     "id": 24381616,
//     "name": "binaryify喜欢的音乐",
//     "coverImgId": 109951165453253970,
//     "coverImgUrl": "https://p1.music.126.net/5SuRTgiAlsm_IbgzqyKRLw==/109951165453253961.jpg",
//     "coverImgId_str": "109951165453253961",
//     "adType": 0,
//     "userId": 32953014,
//     "createTime": 1407747901072,
//     "status": 0,
//     "opRecommend": false,
//     "highQuality": false,
//     "newImported": false,
//     "updateTime": 1635730525666,
//     "trackCount": 952,
//     "specialType": 5,
//     "privacy": 0,
//     "trackUpdateTime": 1635865321743,
//     "commentThreadId": "A_PL_0_24381616",
//     "playCount": 15265,
//     "trackNumberUpdateTime": 1635689578118,
//     "subscribedCount": 4,
//     "cloudTrackCount": 1,
//     "ordered": true,
//     "description": "描述",
//     "tags": [
//         "学习"
//     ],
//     "updateFrequency": null,
//     "backgroundCoverId": 0,
//     "backgroundCoverUrl": null,
//     "titleImage": 0,
//     "titleImageUrl": null,
//     "englishTitle": null,
//     "officialPlaylistType": null,
//     "subscribers": [
//         {
//             "defaultAvatar": false,
//             "province": 440000,
//             "authStatus": 0,
//             "followed": false,
//             "avatarUrl": "http://p1.music.126.net/lQXlbuH7b5ov6jwFX74wDQ==/109951163905989777.jpg",
//             "accountStatus": 0,
//             "gender": 1,
//             "city": 440300,
//             "birthday": 0,
//             "userId": 355261255,
//             "userType": 0,
//             "nickname": "mudaoula",
//             "signature": "",
//             "description": "",
//             "detailDescription": "",
//             "avatarImgId": 109951163905989780,
//             "backgroundImgId": 109951164009344400,
//             "backgroundUrl": "http://p1.music.126.net/Ae1LkqxT_TU-XOKiRkA5kw==/109951164009344406.jpg",
//             "authority": 0,
//             "mutual": false,
//             "expertTags": null,
//             "experts": null,
//             "djStatus": 0,
//             "vipType": 0,
//             "remarkName": null,
//             "authenticationTypes": 0,
//             "avatarDetail": null,
//             "avatarImgIdStr": "109951163905989777",
//             "backgroundImgIdStr": "109951164009344406",
//             "anchor": false,
//             "avatarImgId_str": "109951163905989777"
//         },
//         {
//             "defaultAvatar": false,
//             "province": 110000,
//             "authStatus": 0,
//             "followed": false,
//             "avatarUrl": "http://p1.music.126.net/ECL2Sqv303tIuO59XYxp_A==/109951164215114670.jpg",
//             "accountStatus": 0,
//             "gender": 1,
//             "city": 110101,
//             "birthday": 0,
//             "userId": 277994058,
//             "userType": 0,
//             "nickname": "墨华_sunfox",
//             "signature": "待我代码编成，娶你为妻可好？",
//             "description": "",
//             "detailDescription": "",
//             "avatarImgId": 109951164215114670,
//             "backgroundImgId": 109951164276769760,
//             "backgroundUrl": "http://p1.music.126.net/95bw9a150eYDp1wLXt8K4g==/109951164276769759.jpg",
//             "authority": 0,
//             "mutual": false,
//             "expertTags": null,
//             "experts": null,
//             "djStatus": 0,
//             "vipType": 11,
//             "remarkName": null,
//             "authenticationTypes": 0,
//             "avatarDetail": null,
//             "avatarImgIdStr": "109951164215114670",
//             "backgroundImgIdStr": "109951164276769759",
//             "anchor": false,
//             "avatarImgId_str": "109951164215114670"
//         },
//         {
//             "defaultAvatar": false,
//             "province": 610000,
//             "authStatus": 0,
//             "followed": false,
//             "avatarUrl": "http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg",
//             "accountStatus": 0,
//             "gender": 0,
//             "city": 610100,
//             "birthday": 0,
//             "userId": 255623488,
//             "userType": 0,
//             "nickname": "gordonwu2",
//             "signature": "",
//             "description": "",
//             "detailDescription": "",
//             "avatarImgId": 109951165647004060,
//             "backgroundImgId": 2002210674180200,
//             "backgroundUrl": "http://p1.music.126.net/45Nu4EqvFqK_kQj6BkPwcw==/2002210674180200.jpg",
//             "authority": 0,
//             "mutual": false,
//             "expertTags": null,
//             "experts": null,
//             "djStatus": 0,
//             "vipType": 10,
//             "remarkName": null,
//             "authenticationTypes": 0,
//             "avatarDetail": null,
//             "avatarImgIdStr": "109951165647004069",
//             "backgroundImgIdStr": "2002210674180200",
//             "anchor": false,
//             "avatarImgId_str": "109951165647004069"
//         },
//         {
//             "defaultAvatar": false,
//             "province": 340000,
//             "authStatus": 0,
//             "followed": false,
//             "avatarUrl": "http://p1.music.126.net/tiHZPhne-SqU2ii1jDma4g==/109951164018637532.jpg",
//             "accountStatus": 0,
//             "gender": 1,
//             "city": 341000,
//             "birthday": 0,
//             "userId": 2884324,
//             "userType": 0,
//             "nickname": "阿至Azir",
//             "signature": "123456789",
//             "description": "",
//             "detailDescription": "",
//             "avatarImgId": 109951164018637540,
//             "backgroundImgId": 109951163940478780,
//             "backgroundUrl": "http://p1.music.126.net/7NRQ7KW3KEGylhIs8kArZg==/109951163940478780.jpg",
//             "authority": 0,
//             "mutual": false,
//             "expertTags": null,
//             "experts": null,
//             "djStatus": 0,
//             "vipType": 11,
//             "remarkName": null,
//             "authenticationTypes": 0,
//             "avatarDetail": null,
//             "avatarImgIdStr": "109951164018637532",
//             "backgroundImgIdStr": "109951163940478780",
//             "anchor": false,
//             "avatarImgId_str": "109951164018637532"
//         }
//     ],
//     "subscribed": false,
//     "creator": {
//         "defaultAvatar": false,
//         "province": 440000,
//         "authStatus": 0,
//         "followed": false,
//         "avatarUrl": "http://p1.music.126.net/axewGX7u9P9Iuqjep-3mmQ==/109951165601796681.jpg",
//         "accountStatus": 0,
//         "gender": 1,
//         "city": 440300,
//         "birthday": 0,
//         "userId": 32953014,
//         "userType": 0,
//         "nickname": "binaryify",
//         "signature": "深圳市爱猫人士",
//         "description": "",
//         "detailDescription": "",
//         "avatarImgId": 109951165601796690,
//         "backgroundImgId": 109951163792144620,
//         "backgroundUrl": "http://p1.music.126.net/WLTBvNL_l9ZKlslFwaCM9Q==/109951163792144631.jpg",
//         "authority": 0,
//         "mutual": false,
//         "expertTags": null,
//         "experts": null,
//         "djStatus": 0,
//         "vipType": 0,
//         "remarkName": null,
//         "authenticationTypes": 0,
//         "avatarDetail": null,
//         "avatarImgIdStr": "109951165601796681",
//         "backgroundImgIdStr": "109951163792144631",
//         "anchor": false,
//         "avatarImgId_str": "109951165601796681"
//     },
//     "tracks": [
//         {
//             "name": "1 to 2",
//             "id": 1317494331,
//             "pst": 0,
//             "t": 0,
//             "ar": [
//                 {
//                     "id": 1015123,
//                     "name": "Elaine",
//                     "tns": [],
//                     "alias": []
//                 }
//             ],
//             "alia": [],
//             "pop": 100,
//             "st": 0,
//             "rt": null,
//             "fee": 8,
//             "v": 9,
//             "crbt": null,
//             "cf": "",
//             "al": {
//                 "id": 73876801,
//                 "name": "1",
//                 "picUrl": "http://p3.music.126.net/6BTqdI2Oss5KQjww9aXwww==/109951163605012175.jpg",
//                 "tns": [],
//                 "pic_str": "109951163605012175",
//                 "pic": 109951163605012180
//             },
//             "dt": 218018,
//             "h": {
//                 "br": 320000,
//                 "fid": 0,
//                 "size": 8723897,
//                 "vd": -28978
//             },
//             "m": {
//                 "br": 192000,
//                 "fid": 0,
//                 "size": 5234355,
//                 "vd": -28978
//             },
//             "l": {
//                 "br": 128000,
//                 "fid": 0,
//                 "size": 3489585,
//                 "vd": -28978
//             },
//             "a": null,
//             "cd": "1",
//             "no": 1,
//             "rtUrl": null,
//             "ftype": 0,
//             "rtUrls": [],
//             "djId": 0,
//             "copyright": 0,
//             "s_id": 0,
//             "mark": 270336,
//             "originCoverType": 0,
//             "originSongSimpleData": null,
//             "single": 0,
//             "noCopyrightRcmd": null,
//             "mst": 9,
//             "cp": 1410822,
//             "mv": 0,
//             "rtype": 0,
//             "rurl": null,
//             "publishTime": 1539360000000
//         },