// pages/login/login.js
var requestUrl = getApp().globalUrl
Page({
  data:{
    username: '',
    password: ''
  },
  onLoad:function(options){
    var SDKVersion = wx.getSystemInfoSync().SDKVersion
    SDKVersion = SDKVersion.replace(/\./g,'')
    if (SDKVersion < 152){
      wx.showModal({
        title: '温馨提示',
        content: '您的微信版本过低，为确保您的正常使用，请您升级最新版本。',
        showCancel: false,
        confirmColor: '#C70019',
        success: function (res) {

        }
      })
      return
    }else{
      var userinfo = wx.getStorageSync('userinfo');
      if(userinfo != ''){
        wx.showLoading({title: '登录中',})
        var username = userinfo.username
        var password = userinfo.password
        this.login(username, password, function (data) {
          if (data == true) {
            // if (getApp().isDefine(wx.getStorageSync("needFingerPrint"))){
            //   var isNeedFingerPrint = wx.getStorageSync("needFingerPrint")
            //   if (isNeedFingerPrint){
            //     wx.startSoterAuthentication({
            //       requestAuthModes: ['fingerPrint'],
            //       challenge: 'CRRC',
            //       authContent: '指纹验证',
            //       success(res) {
            //         setTimeout(function () {
            //           wx.hideLoading()
            //           wx.switchTab({
            //             url: '../index/index'
            //           })
            //         }, 1000)
            //       },
            //       fail(res) {
            //         wx.hideLoading()
            //         return
            //       }
            //     })
            //   }else{
            //     setTimeout(function () {
            //       wx.hideLoading()
            //       wx.switchTab({
            //         url: '../index/index'
            //       })
            //     }, 1000)
            //   }
            // }else{
              setTimeout(function () {
                wx.hideLoading()
                wx.switchTab({
                  url: '../index/index'
                })
              }, 1000)
            //}
          }else{
            wx.showModal({
              title: '温馨提示',
              content: '您的密码已过期，请重新登录',
              showCancel: false,
              confirmColor: '#C70019',
              success: function (res) {

              }
            })
          }
        })
      }
    }
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
  getUsername: function(e){
      this.setData({
        username: e.detail.value
      })
  },
  getPassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },
  loginBtnClick:function(){
    var username = this.data.username
    var password = this.data.password
    if (username == '' || password == ''){
      wx.showToast({
        title: '请输入用户名或密码',
        image: '../../../images/error.png'
      })
      return
    }
    wx.showLoading({
      title: '登录中',
    })
    this.login(username, password, function(data){
      if (data == true) {
        wx.setStorageSync("userinfo", { "username": username, "password": password })
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index'
          })
        }, 1000)
      } else {
        wx.showToast({
          title: '用户名或密码错误',
          image: '../../../images/error.png'
        })
      }
    });
  },
  login: function(username, password, callback){
    wx.request({
      url: requestUrl + 'ldap/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var result = res.data.CorpAuthenticateResult;
        callback(result)
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  forgotPwd: function(){
    wx.navigateTo({
      url: '../password/help'
    })
  }
})