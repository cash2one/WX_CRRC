var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var spry_list = []
var checked_list = []
var fw_id = ''
var bu_code = ''
var ryfw_id = ''
var ryfw_type = ''
Page({
  data: {
    spry_list: [],
    spfw_key: '',
    btnStatus: 'disabled',
    hasNot: false
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    fw_id = options.fw_id
    bu_code = options.bu_code
    ryfw_id = options.ryfw_id
    ryfw_type = options.ryfw_type
    var person_list = ''
    this.getApprovePeoples()
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
    fw_id = ''
    bu_code = ''
    ryfw_id = ''
    ryfw_type = ''
    spry_list = []
    checked_list = []
  },
  getApprovePeoples: function (){
    var that = this
    spry_list = []
    oa.getApprovePeoples(user_code, fw_id, bu_code, ryfw_id, ryfw_type, this.data.spfw_key, function(data){
      var status = data.status
      if (status  == 0){
        if (data.spry_list.length > 100){
          for (var i = 0; i <= 100; i++) {
            spry_list.push({ 'spry_name': data.spry_list[i].spry_name, 'checked': false })
          }
          that.setData({
            hasNot: false,
            spry_list: spry_list
          })
        }else{
          for (var i in data.spry_list){
            spry_list.push({ 'spry_name': data.spry_list[i].spry_name,'checked': false})
          }
          that.setData({
            hasNot: false,
            spry_list: spry_list
          })
          if (app.isDefine(wx.getStorageSync('person_list'))){
            var plist = JSON.parse(wx.getStorageSync('person_list'))
            that.checkboxChange({ "detail": { "value": plist}})
          }
        }
      }else{
        that.setData({
          hasNot: true
        })
      }
    })
  },
  checkboxChange: function(e){
    for (var i in spry_list) {
      spry_list[i].checked = false
    }
    checked_list = e.detail.value
    if (!checked_list.length) {
      this.setData({
        btnStatus: 'disabled'
      })
    }else{
      this.setData({
        btnStatus: ''
      })
    }
    for (var i in spry_list){
      for (var j in checked_list){
        if (spry_list[i].spry_name == checked_list[j]){
          if (spry_list[i].checked == false){
            spry_list[i].checked = true
          }
        }
      }
    }
    this.setData({
      spry_list: spry_list
    })
  },
  confirm: function(){
    wx.setStorageSync('person_list', JSON.stringify(checked_list));
    var prePage = getCurrentPages()[2]
    prePage.addPerson()
    wx.navigateBack({
      delta: 1
    })
  },
  getSearchValue: function (e) {
    var value = e.detail.value
    if (value == '') {
      this.setData({
        spfw_key: ''
      })
      this.getApprovePeoples()
    } else {
      this.setData({
        spfw_key: value
      })
    }
  },
  clearSearchValue: function () {
    this.setData({
      spfw_key: ''
    })
    this.getApprovePeoples()
  }
})