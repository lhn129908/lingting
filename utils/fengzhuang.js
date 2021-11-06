export function requestGet(url, data) {
  return new Promise((reslove, reject) => {
    wx.request({
      //请求地址
      url: url,
      //请求方式
      method: "get",
      //请求参数
      data: data,
      //设置请求头  如果发送的是post请求，一定要添加请求的content-type
      header: {
        "content-type": "application/json",
      },
      //请求返回结果的数据类型
      dataType: "json",
      //请求回调
      success: ({ statusCode, data }) => {
        if (statusCode === 200) {
          reslove(data);
        } else {
          reject("服务器响应出错");
        }
      },
      // 请求失败执行的回调函数
      fail: function (err) {
        reject(err)
      },
      // 接口调用结束的回调函数（调用成功、失败都会执行）
      complete: function (res) { },
    });
  });
}
export function formatMs2Obj(total) {
  var h = repairZero(Math.floor(total / 3600))
  var m = repairZero(Math.floor((total - h * 3600) / 60))
  var s = repairZero(Math.floor(total - h * 3600 - m * 60))
  var f = repairZero(Math.floor((total - h * 3600 - m * 60-s)*1000))
  //ES6 结构  h:h
  return {
    h,
    m,
    s,
    f
  }
}
/**
 * 补零
 */
function repairZero(num) {
  return num < 10 ? ("0" + num) : num
}


export var lyricURL = "http://101.35.3.52/lyric";
export var songURL = "http://101.35.3.52/song/url";
export var albumURL = "http://101.35.3.52/album";
export var detailURL = "http://101.35.3.52/song/detail";










