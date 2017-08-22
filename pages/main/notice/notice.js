// pages/notice/notice.js
var requestUrl = getApp().globalUrl
var user_code = ''
var news = []
var notices = []
var pageNum = 1
Page({
  data: {
    switchTitle: [
      '新闻',
      '通知',
      '公告'
    ],
    switchCurrent: 0,
    news: [],
    notices: [],
    isEmpty: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    user_code = wx.getStorageSync('userinfo').username
    this.changeItem(0)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    news = []
    notices = []
    pageNum = 1
  },
  changeItem: function (e) {
    if (typeof e == 'object') {
      var index = e.target.dataset.index
    } else {
      var index = e
    }
    this.setData({
      switchCurrent: index
    })
    switch (index) {
      case 0:
        news = []
        this.getNews()
        break
      case 1:
        notices = []
        this.getNotice('03')
        break
      case 2:
        notices = []
        this.getNotice('04')
        break
    }
  },
  getNews: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: requestUrl + 'oa/oanewslist',
      method: 'GET',
      data: {
        user_id: user_code,
        pageNum: pageNum,
        pageSum: 50
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        var newsObj = JSON.parse(res.data)
        var status = newsObj.status
        var msg = newsObj.msg
        if (status == 0) {
          var list = newsObj.doc_list
          if (list.length) {
            for (var i = 0; i < list.length; i++) {
              list[i].time = list[i].time.substring(0, 10)
              news.push(list[i])
            }
            that.setData({
              news: news,
            })
          } else {
            that.setData({
              isEmpty: true
            })
          }
        } else {
          wx.showToast({
            title: msg,
            image: '../../../images/error.png'
          })
          return
        }
      },
      fail: function (e) {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  getNotice: function (ctype) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: requestUrl + 'oa/clist',
      method: 'GET',
      data: {
        uname: user_code,
        ctype: ctype,
        cnum: 24
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        var list = res.data
        if (list.length) {
          for (var i = 0; i < list.length; i++) {
            list[i].cdate = list[i].cdate.substring(0, 10)
            notices.push(list[i])
          }
          that.setData({
            notices: notices,
          })
        } else {
          that.setData({
            isEmpty: true
          })
        }
      },
      fail: function (e) {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  onPullDownRefresh: function () {
    pageNum = 1;
    news = [];
    notices = [];
    var index = this.data.switchCurrent
    if (index == 0) {
      this.getNews()
    } else if (index == 1) {
      this.getNotice('03')
    } else {
      this.getNotice('04')
    }
  },
  onReachBottom: function () {
    var index = this.data.switchCurrent
    if (index == 0) {
      pageNum++
      this.getNews()
    }
  },
})