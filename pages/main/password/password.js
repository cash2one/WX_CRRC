var requestUrl = getApp().globalUrl
var user_code = ''
var vcode = ''
var isClicked = false
var countdown = 60
var phone = ''
Page({
  data: {
    vcText: '获取验证码',
    user_code: '',
    phone: ''
  },
  onLoad: function (options) {
    var domains = options.domains
    user_code = wx.getStorageSync('userinfo').username
    if (user_code != ''){
      this.setData({
        user_code: user_code
      })
    }
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  onUnload: function () {
    
  },
  getVerificationCode: function(){
    if (isClicked == true){
      return
    }
    //获取验证码方法
    this.sendMSG(this.data.phone)
    //倒计时
    this.settime()
  },
  settime: function(){
    var that = this
    if (countdown == 0){
      isClicked = false
      that.setData({
        vcText: '获取验证码'
      })
      countdown = 60
      return
    }else{
      isClicked = true
      that.setData({
        vcText: countdown + '秒'
      })
      countdown--
      setTimeout(function(){
        that.settime()
      }, 1000)
    }
  },
  getCode: function(e){
    vcode = e.detail.value
  },
  sendMSG: function(phone){
    phone = '18173380603'
    wx.request({
      url: requestUrl + 'index/sendMSG',
      method: 'GET',
      data: {
        phone: phone
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (e) {
        wx.showToast({
          title: '获取验证码失败',
          image: '../../../images/error.png'
        })
      }
    })
  },
  checkMSG: function(){
    wx.request({
      url: requestUrl + 'index/checkMSG',
      method: 'GET',
      data: {
        phone: phone,
        sixnum: vcode
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (e) {
        wx.showToast({
          title: '获取验证码失败',
          image: '../../../images/error.png'
        })
      }
    })
  }
})