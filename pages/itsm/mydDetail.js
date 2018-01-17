var itsm = require('interface/itInterface.js')
var InstanceId = ''
Page({
  data: {
    pingfenArray: [
      { 'name': '非常满意', 'value': '0', 'checked': true },
      { 'name': '满意', 'value': '1', 'checked': false },
      { 'name': '一般', 'value': '2', 'checked': false },
      { 'name': '不满意', 'value': '3', 'checked': false }
    ],
    isCloseArray: [
      { 'name': '是', 'value': 'YES', 'checked': true },
      { 'name': '否', 'value': 'NO', 'checked': false },
    ],
    pingfen: '0',
    isClose: 'YES',
    userComments: ''
  },
  onLoad: function (options) {
    InstanceId = options.InstanceId
  },
  onUnload: function () {
    InstanceId = ''
  },
  radioChange1: function (e) {
    this.setData({
      pingfen: e.detail.value
    })
  },
  radioChange2: function (e) {
    this.setData({
      isClose: e.detail.value
    })
  },
  getDetailDesc: function(e){
    this.setData({
      userComments: e.detail.value
    })
  },
  btnClick: function(){
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    var user_name = wx.getStorageSync('userinfo').username
    var password = wx.getStorageSync('userinfo').password
    itsm.mydApprove(user_name, password, InstanceId, this.data.userComments, this.data.pingfen, this.data.isClose, this.data.pingfen, function (data) {
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(function () {
        var prePage = getCurrentPages()[1]
        prePage.onPullDownRefresh()
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
    })
  }
})