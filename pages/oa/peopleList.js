//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var spry_list = []
var checked_list = []
Page({
  data: {
    spry_list: []
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    var fw_id = "58B34EE580F33ACD4825817E000926F5"
    var bu_code = "dq/dq_dormitory.nsf"
    var ryfw_id = "13762560000087"
    var ryfw_type = "D"
    var spfw_key = ''
    var person_list = ''
    this.getApprovePeoples(user_code, fw_id, bu_code, ryfw_id, ryfw_type, spfw_key)
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
    spry_list = []
    checked_list = []
  },
  getApprovePeoples: function (user_code, fw_id, bu_code, ryfw_id, ryfw_type, spfw_key){
    var that = this
    oa.getApprovePeoples(user_code, fw_id, bu_code, ryfw_id, ryfw_type, spfw_key, function(data){
      for (var i in data.spry_list){
        spry_list.push({ 'spry_name': data.spry_list[i].spry_name,'checked': false})
      }
      that.setData({
        spry_list: spry_list
      })
    })
  },
  checkboxChange: function(e){
    for (var i in spry_list) {
      spry_list[i].checked = false
    }
    checked_list = e.detail.value
    for (var i in spry_list){
      for (var j in checked_list){
        if (spry_list[i].spry_name == checked_list[j]){
          if (spry_list[i].checked == false){
            spry_list[i].checked = true
          }
        }
      }
    }
  },
  confirm: function(){
    console.log(checked_list)
  }
})