var requestUrl = getApp().globalUrl
var slptUrl = getApp().slptUrl
var user_code = ''
var vcode = ''
var isClicked = false
var countdown = 60
var phone = ''
var password = ''
var confirmPassword = ''
Page({
  data: {
    domains: '',
    hasCode: true,
    vcText: '获取验证码',
    user_code: '',
    phone: '',
    sendCode: ''
  },
  onLoad: function (options) {
    var domains = options.domains
    this.setData({
      domains: domains
    })
    user_code = wx.getStorageSync('userinfo').username
    if (getApp().isDefine(user_code)){
      this.setData({
        user_code: user_code,
        hasCode: true
      })
      this.getMobileNum(user_code)
    }else{
      this.setData({
        hasCode: false
      })
    }
  },
  onUnload: function () {
    vcode = ''
    isClicked = false
    countdown = 60
    phone = ''
    password = ''
    confirmPassword = ''
  },
  getUserCode: function(e){
    user_code = e.detail.value
    this.getMobileNum(user_code)
  },
  getMobileNum: function (user_code){
    var that = this
    wx.request({
      method: 'GET',
      url: slptUrl + 'getEmployee',
      data: {
        user_code: user_code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var reportList = JSON.parse(res.data).reportList
        if (reportList.length){
          var mobileNum = reportList[0].mobil
          that.setData({
            phone: mobileNum
          })
        }else{
          wx.showToast({
            title: '无法获取手机号',
            image: '../../../images/error.png'
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常',
          image: '../../../images/error.png'
        })
      }
    })
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
  getPassword: function (e) {
    password = e.detail.value
  },
  getConfirmPassword: function (e) {
    confirmPassword = e.detail.value
  },
  sendMSG: function(phone){
    var that = this
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
        that.setData({
          sendCode: res.data.number.toString()
        })
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
    if (!getApp().isDefine(user_code)){
      console.log(user_code)
      wx.showToast({
        title: '请输入员工编号',
        image: '../../../images/error.png'
      })
      return
    }
    if (!getApp().isDefine(vcode)) {
      wx.showToast({
        title: '请输入验证码',
        image: '../../../images/error.png'
      })
      return
    }
    if (!getApp().isDefine(password)) {
      wx.showToast({
        title: '请输入密码',
        image: '../../../images/error.png'
      })
      return
    }
    if (!getApp().isDefine(confirmPassword)) {
      wx.showToast({
        title: '请输入确认密码',
        image: '../../../images/error.png'
      })
      return
    }
    if (password != confirmPassword){
      wx.showToast({
        title: '密码输入不一致',
        image: '../../../images/error.png'
      })
      return
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      wx.showToast({
        title: '密码长度不能少于8位',
        image: '../../../images/error.png'
      })
      return
    }else{
      var hasLetters = /^[a-zA-Z]/.test(password);
      if (!hasLetters){
        wx.showToast({
          title: '密码强度不够',
          image: '../../../images/error.png'
        })
      }
    }
    if (this.data.sendCode != vcode){
      wx.showToast({
        title: '验证码错误',
        image: '../../../images/error.png'
      })
      return
    }
    this.resetPasswrod()
  },
  resetPasswrod: function(){
    wx.showLoading({
      title: '请稍后',
      mask: true
    })
    var that = this
    wx.request({
      url: requestUrl + 'index/resetPwd',
      method: 'GET',
      data: {
        strUserId: user_code,
        strNewPwd: confirmPassword,
        strDomain: that.data.domains
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (getApp().isDefine(res.data.ResetUserPasswordResult)){
          wx.showToast({
            title: '修改密码失败',
            image: '../../../images/error.png'
          })
        }else{
          wx.showToast({
            title: '修改成功'
          })
          setTimeout(function () {
            wx.removeStorageSync('userinfo')
            wx.reLaunch({
              url: '../login/login'
            })
          }, 1000);
          
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '修改密码失败',
          image: '../../../images/error.png'
        })
      }
    })
  }
})