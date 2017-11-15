//index.js
var app = getApp()
var requestUrl = getApp().globalUrl
var user_code = ''
var imgs = []
var titles = []
var gxCount = ''
Page({
  data: {
    slider: [],
    swiperCurrent: 0,
    news_text: [],
    oaCount: '',
    tzCount: '',
    fkCount: '',
    gxCount: '',
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
    }else if(flag == 1){
      wx.navigateTo({
        url: '../../gx/entrance'
      })
    }else if(flag == 2){
      wx.navigateTo({
        url: '../../fk/index'
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
    this.getTzCount()
    this.getFkCount()
    this.getGxCount()
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
  },
  getTzCount: function(){
    var that = this
    wx.request({
      url: requestUrl + 'tz/tz_backlog',
      method: 'GET',
      data: {
        user_code: user_code,
        page_num: 0,
        page_sum: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.list)
        var count = list.total_count
        if(count == 0){
          that.setData({
            tzCount: ''
          })
        }else{
          that.setData({
            tzCount: count
          })
        }
      }
    })
  },
  getFkCount: function(){
    var that = this
    wx.request({
      url: requestUrl + 'fk/fklist',
      method: 'GET',
      data: {
        user_code: user_code,
        page_num: 0,
        page_sum: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.list)
        var count = list.total_count
        if(count == 0){
          that.setData({
            fkCount: ''
          })
        }else{
          that.setData({
            fkCount: count
          })
        }
      }
    })
  },
  getGxCount: function(){
    var that = this
    wx.request({
      url: requestUrl + 'fsms/getTodoList',
      method: 'GET',
      data: {
        USER_CODE: user_code,
        CURRENT_PAGE: 1,
        PAGE_SIZE: 1,
        TYPE: 'A',
        UNIT_CODE: '01000000'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var header1 = res.data.MSG_HEADER
        var total_record1 = header1.TOTAL_RECORD
        if (total_record1 == 0){
          gxCount = ''
        }else{
          gxCount = total_record1
        }
        wx.request({
          url: requestUrl + 'fsms/getTodoList',
          method: 'GET',
          data: {
            USER_CODE: user_code,
            CURRENT_PAGE: 1,
            PAGE_SIZE: 1,
            TYPE: 'A',
            UNIT_CODE: '02000000'
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var header2 = res.data.MSG_HEADER
            var total_record2 = header2.TOTAL_RECORD
            if (total_record2 == 0) {
              that.setData({
                gxCount: gxCount
              })
            } else {
              that.setData({
                gxCount: gxCount + total_record2
              })
            }
          }
        })
      }
    })
  }
})
