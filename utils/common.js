
// 新闻数据，可删
const news = [
  {
    id: "356412",
    title: "江南",
    poster: "http://image1.chinanews.com.cn/cnsupload/big/2019/10-01/4-426/a7e426b0dd6c43d2bc710fafe810a0d5.jpg",
    add_date: "林俊杰",
    content:"江南江南江南江南江南江南江南江南江南江南江南江南江南江南江南。"
  },
  {
    id: "546734",
    title: "晴天",
    poster: "http://i2.chinanews.com/simg/cmshd/2019/10/05/998e12aa71f248d4a797761b18e48418.jpg",
    add_date: "周杰伦",
    content:"晴天晴天晴天晴天晴天晴天晴天晴天晴天晴天晴天晴天"
  },
  {
    id: "546738",
    title: "单车",
    poster: "http://i2.chinanews.com/simg/cmshd/2019/10/05/998e12aa71f248d4a797761b18e48418.jpg",
    add_date: "陈奕迅",
    content:"单车单车单车单车单车单车单车单车"
  },
  {
    id: "546739",
    title: "有何不可",
    poster: "http://i2.chinanews.com/simg/cmshd/2019/10/05/998e12aa71f248d4a797761b18e48418.jpg",
    add_date: "许嵩",
    content:"有何不可有何不可有何不可有何不可有何不可有何不可有何不可有何不可有何不可有何不可有何不可有何不可"
  },
  {
    id: "239875",
    title: "不要平凡",
    poster: "http://i2.chinanews.com/simg/cmshd/2019/10/01/c5391220f28d49bdbd14c58a4300bde0.jpg",
    add_date: "张杰",
    content:"不要平凡不要平凡不要平凡不要平凡不要平凡不要平凡不要平凡不要平凡不要平凡不要平凡不要平凡不要平凡不要平凡"
  },
  
]

//获取新闻列表
function getNewList(){
  let list = [];
  for(var i = 0;i<news.length;i++){
    let obj = {};
    obj.id = news[i].id;
    obj.poster = news[i].poster;
    obj.content = news[i].content;
    obj.add_date = news[i].add_date;
    obj.title = news[i].title;
    list.push(obj);
  }
  return list;
}

//获取新闻内容
function getNewsDetail(newsID){
  let message = {
    code:"404",
    news:{}
  };
  for(var i = 0 ;i<news.length;i++){
    if(newsID == news[i].id){
      message.code = "200";
      message.news = news[i];
      break;
    }
  }
  return message;
}
module.exports = {
  getNewList:getNewList,
  getNewsDetail:getNewsDetail
}