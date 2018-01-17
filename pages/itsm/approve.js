// pages/itsm/approve.js
var itsm = require('interface/itInterface.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnStatus: true,
    desc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  getDesc: function(e){
    this.setData({
      desc: e.detail.value
    })
  },
  getDetailDesc: function(e){
    this.setData({
      detailDesc: e.detail.value
    })
  },
  btnClick: function(){
    if (this.data.desc == '' || this.data.detailDesc == ''){
      wx.showToast({
        title: '请填写描述信息',
        image: '../../images/error.png'
      })
    }else{
      wx.showLoading({
        title: '提交中',
        mask: true
      })
      var user_code = wx.getStorageSync('userinfo').username
      var password = wx.getStorageSync('userinfo').password
      itsm.approve(user_code, password, user_code, this.data.desc, this.data.detailDesc, function(data){
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
  }
})