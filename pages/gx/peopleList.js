var app = getApp()
//引用OA接口文件
var gx = require('interface/gxInterface.js')
//定义相关全局变量
var unit_code = ''
var people = []
Page({
  data: {
    user_name: '',
    people: [],
    checked: '',
    btnStatus: 'disabled',
    hasNot: false
  },
  onLoad: function (options) {
    unit_code = wx.getStorageSync('unit_code')
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {
    people = []
  },
  getPeople: function () {
    var that = this
    people = []
    gx.getTransferEmployee(that.data.user_name, unit_code, function (data) {
      if (data.ERROR_FALG == 'Y') {
        var list = data.LINES
        if (list.length) {
          for (var i in list) {
            people.push(list[i])
          }
          that.setData({
            hasNot: false,
            people: people
          })
        } else {
          that.setData({
            hasNot: true
          })
        }
      } else {
        that.setData({
          hasNot: true
        })
      }
    })
  },
  radioChange: function (e) {
    this.setData({
      checked: e.detail.value,
      btnStatus: ''
    })
  },
  confirm: function () {
    wx.setStorageSync('people', this.data.checked);
    var prePage = getCurrentPages()[2]
    prePage.getCheckedPerson()
    wx.navigateBack({
      delta: 1
    })
  },
  getSearchValue: function (e) {
    var value = e.detail.value
    if (value == '') {
      this.setData({
        user_name: ''
      })
    } else {
      this.setData({
        user_name: value
      })
    }
  },
  clearSearchValue: function () {
    this.setData({
      user_name: ''
    })
  }
})