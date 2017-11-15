// pages/me/me.js
var requestUrl = getApp().globalUrl
var user_code = ''
Page({
  data:{
    myInfo: {},
    isCanFingerPrint: false,
    needFingerPrint: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      needFingerPrint: wx.getStorageSync("needFingerPrint")
    })
    //this.checkFingerPrint()
    this.getMyInfo()
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  getMyInfo: function(){
    user_code = wx.getStorageSync('userinfo').username
    var that = this
    wx.request({
      url: requestUrl + 'hr/service',
      method: 'GET',
      data: {
        methodName: 'GetUserInfo',
        parameter: '',
        UserId: user_code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var obj = JSON.parse(res.data.GetDataInfoByJsonStrResult)
        that.setData({
          myInfo: obj
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  logout: function(){
    wx.removeStorageSync('userinfo')
    wx.reLaunch({
      url: '../login/login'
    })
  },
  /*
  checkFingerPrint: function(){
    var that = this
    if (wx.checkIsSupportSoterAuthentication) {
      wx.checkIsSupportSoterAuthentication({
        success(res) {
          var supportMode = res.supportMode
          if (supportMode[0] = 'fingerPrint'){
            that.setData({
              isCanFingerPrint: true
            })
          }else{
            that.setData({
              isCanFingerPrint: false
            })
          }
        },
        fail(res) {
          that.setData({
            isCanFingerPrint: false
          })
        }
      })
    }else{
      that.setData({
        isCanFingerPrint: false
      })
    }
  },
  openFinger: function(e){
    var value = e.detail.value
    if (value){
      this.setData({
        needFingerPrint: true
      })
    }else{
      this.setData({
        needFingerPrint: false
      })
    }
    wx.setStorageSync("needFingerPrint", this.data.needFingerPrint)
  }
  */
})