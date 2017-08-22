// pages/me/me.js
var requestUrl = getApp().globalUrl
var user_code = ''
Page({
  data:{
    myInfo: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
      url: requestUrl + 'fsms/getUserInfo',
      method: 'GET',
      data: {
        USER_CODE: user_code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var infoObj = res.data.LINES
        that.setData({
          myInfo: infoObj[0]
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
  //指纹识别
  test: function(){
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '指纹验证',
      success(res) {
        console.log(res)
      },
      fail(res){
        console.log(res)
        if(res.errCode == 90009){
          console.log('请输入密码')
        }
      }
    })
  }
})