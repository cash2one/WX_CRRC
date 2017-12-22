//引用接口文件
//var itsm = require('interface/itsmInterface.js')
//定义相关全局变量
var user_code = ''
var backlogPageNum = 1
var backlogList = []
var flag = -1
Page({
  data: {
    swiperCurrent: 0,
    backlogList: [],
    backlogCount: -1,
    backlogMoreText: '加载更多'
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    //this.getBacklogList()
  },
  onUnload: function () {
    backlogPageNum = 1
    backlogList = []
    flag = -1
    var indexPage = getCurrentPages()[0]
    indexPage.getBacklogCount()
  },
  getBacklogList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    itsm.getList(user_code, 'A', unit_code, backlogPageNum, 10, function (data) {
      wx.stopPullDownRefresh()
      that.setData({
        backlogCount: data.length == 0 ? 0 : data.length
      })
      wx.hideLoading()
      if (data.length) {
        for (var i = 0; i < data.length; i++) {
          backlogList.push(data[i])
        }
        that.setData({
          backlogList: backlogList,
          backlogMoreText: '加载更多'
        })
      } else {
        if (that.data.backlogCount > 0) {
          that.setData({
            backlogMoreText: '已加载至最后一页'
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
    backlogPageNum = 1
    backlogList = []
    this.setData({
      backlogList: []
    })
    this.getBacklogList()
  },
  getNextBacklogList: function () {
    if (this.data.backlogMoreText == '已加载至最后一页') {
      return
    } else {
      backlogPageNum++
      this.getBacklogList()
    }
  },
  toApprove: function(){
    wx.navigateTo({
      url: './approve'
    })
  }
})