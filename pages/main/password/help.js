Page({
  data: {
    items: [
      { title: '内网Corp域', desc: '中车株洲所小程序，APP，内网邮箱，费控，财务共享，人力资源等系统登录密码', value: 'Corp', checked: 'true', disabled: 'true'},
      { title: '内网Zelri域', desc: '内网办公电脑开机登录密码(即账号为"0114+工号"的账户密码)', value: 'Zelri'},
      { title: '外网Zic域', desc: '外网邮箱、无线上网登录密码', value: 'Zic'}
    ],
    domains: ['Corp']
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  onUnload: function () {
    
  },
  checkboxChange: function(e){
    this.setData({
      domains: e.detail.value
    })
  },
  toReset: function(){
    var domains = this.data.domains
    wx.navigateTo({
      url: './password?domains=' + domains
    })
  }
})