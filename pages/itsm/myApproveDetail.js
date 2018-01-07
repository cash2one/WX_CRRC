//引用接口文件
var app = getApp()
var itsm = require('interface/itInterface.js')
var user_code = ''
var password = ''
var IncidentNumber = ''
Page({
  data: {
    content: {}
  },
  onLoad: function (options) {
    var that = this
    user_code = wx.getStorageSync('userinfo').username
    password = wx.getStorageSync('userinfo').password
    IncidentNumber = options.IncidentNumber
    itsm.getDetail(user_code, password, 'INC000000142644', function (data) {
      data.SubmitDate = data.SubmitDate.substring(0, 10)
      that.setData({
        content: data
      })
    })
  },
  onUnload: function () {
    IncidentNumber = ''
  }
})