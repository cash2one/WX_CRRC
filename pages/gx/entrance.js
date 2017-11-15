var gx = require('interface/gxInterface.js')
var user_code = ''
Page({
  data: {
    unitList: []
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    this.getUnitByUserCode()
  },
  onUnload: function () {
  
  },
  getUnitByUserCode: function(){
    var that = this
    gx.getUnitByUserCode(user_code, function(data){
      that.setData({
        unitList: data
      })
      if(data.length == 1){
        var unit_code = data[0].UNIT_CODE
        wx.setStorageSync('unit_code', unit_code)
        wx.redirectTo({
          url: './index'
        })
      }
    })
  },
  toIndex: function(e){
    var unit_code = e.target.dataset.code
    wx.setStorageSync('unit_code', unit_code)
    wx.redirectTo({
      url: './index'
    })
  }
})