//index.js
var app = getApp()
var requestUrl = getApp().globalUrl
var user_code = ''
var imgs = []
var titles = []
Page({
  data: {
    slider: [],
    swiperCurrent: 0,
    news_text: [],
    oaCount: ''
  },
  onLoad: function () {
    imgs = []
    titles = []
    user_code = wx.getStorageSync('userinfo').username
    this.getNews()
    this.getBacklogCount()
  },
  swiperChange: function(e){
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  onPullDownRefresh: function () {
    imgs = []
    titles = []
    this.getNews()
    this.getBacklogCount()
  },
  getNews: function(){
    var that = this
    wx.request({
      url: requestUrl + 'index/oaNews',
      method: 'GET',
      data: {
        user_id: user_code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var news = JSON.parse(res.data).doc_list
        if (news.length){
          for(var i = 0; i < news.length; i++){
            var imgUrl = requestUrl + 'index/oaImg?imgUrl=' + news[i].path
            imgs.push(imgUrl)
            titles.push(news[i].title)
          }
        }else{
          imgs.push('http://www.tec.crrczic.cc/portals/0/images/crrczic_app/banner.jpg')
          titles.push('欢迎使用中车株洲所小程序')
        }
        that.setData({
          slider: imgs,
          news_text: titles
        })
      }
    })
  },
  openWidget: function(e){
    var flag = e.currentTarget.dataset.flag
    if(flag == 0){
      wx.navigateTo({
        url: '../../oa/index'
      })
    }else if(flag == 3){
      wx.navigateTo({
        url: '../../tz/index'
      })
    }else{
      wx.showToast({
        title: '正在建设中...',
        icon: 'loading'
      })
    }
  },
  getBacklogCount: function(){
    this.getOaCount()
    wx.stopPullDownRefresh()
  },
  getOaCount: function(){
    var that = this
    wx.request({
      url: requestUrl + 'oaNew/oa_count',
      method: 'GET',
      data: {
        user_id: user_code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var count = JSON.parse(res.data).count
        if(count == 0){
          that.setData({
            oaCount: ''
          })
        }else{
          that.setData({
            oaCount: count
          })
        }
      }
    })
  }
})
