//app.js
App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  isDefine: function(value){
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == null || value == "NULL" || typeof (value) == 'undefined'){
      return false
    }else{
      value = value + ""
      value = value.replace(/\s/g,"")
      if(value == ""){
        return false
      }
      return true
    }
  },
  globalUrl: 'https://appagent2.csrzic.com/10000000/public/',
  oaUrl: 'https://appagent2.csrzic.com/10000000/public/oaNew/',
  slptUrl: 'https://appagent2.csrzic.com/10000000/public/slpt/',
  tzUrl: 'https://appagent2.csrzic.com/10000000/public/tz/',
})
