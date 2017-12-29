//引用接口文件
var itsm = require('interface/itInterface.js')
//定义相关全局变量
var user_code = ''
var password = ''
var myApproveList = []
Page({
  data: {
    myApproveList: [],
    myApproveCount: 0
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    password = wx.getStorageSync('userinfo').password
    this.getCount()
  },
  onUnload: function () {
    myApproveList = []
    var indexPage = getCurrentPages()[0]
    indexPage.getBacklogCount()
  },
  getCount: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    itsm.count(user_code, password, user_code, 'HelpDesk_QueryList_Service_Requester', function (data) {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      if (data > 0){
        that.setData({
          myApproveCount: data
        })
        that.getMyApproveList()
      }else{
        that.setData({
          myApproveCount: 0
        })
      }
    })
  },
  getMyApproveList: function () {
    var that = this
    itsm.getList(user_code, password, user_code,'HelpDesk_QueryList_Service_Requester', function (data) {
      wx.stopPullDownRefresh()
      that.setData({
        myApproveCount: data.length == 0 ? 0 : data.length
      })
      wx.hideLoading()
      if (data.length) {
        for (var i = 0; i < data.length; i++) {
          data[i].SubmitDate = data[i].SubmitDate.substring(0,10)
          myApproveList.push(data[i])
        }
        that.setData({
          myApproveList: myApproveList,
        })
      }
    })
  },
  onPullDownRefresh: function () {
    myApproveList = []
    this.setData({
      myApproveCount: 0,
      myApproveList: []
    })
    this.getCount()
  },
  toApprove: function(){
    wx.navigateTo({
      url: './approve'
    })
  }
})