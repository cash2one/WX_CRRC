var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var spry_list = []
var checked_list = []
var fw_id = ''
var bu_code = ''
Page({
  data: {
    spry_list: [],
    search_value: '',
    btnStatus: 'disabled',
    hasNot: false
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    fw_id = options.fw_id
    bu_code = options.bu_code
    var person_list = ''
    //this.getDistributePeoples()
  },
  onUnload: function () {
    fw_id = ''
    bu_code = ''
    spry_list = []
    checked_list = []
  },
  getDistributePeoples: function () {
    var that = this
    spry_list = []
    oa.getDistributePeoples(user_code, this.data.search_value, function (data) {
      var status = data.status
      if (status == 0) {
        if (app.isDefine(data.spry_list)){
          for (var i in data.spry_list) {
            if (data.spry_list[i].spry_dep == "teg") {
              continue
            }
            spry_list.push({ 'spry_name': data.spry_list[i].spry_name, 'spry_dep': data.spry_list[i].spry_dep, 'checked': false })
          }
          that.setData({
            hasNot: false,
            spry_list: spry_list
          })
          if (app.isDefine(wx.getStorageSync('person_list'))) {
            var plist = JSON.parse(wx.getStorageSync('person_list'))
            that.checkboxChange({ "detail": { "value": plist } })
          }
        }else{
          that.setData({
            spry_list: [],
            hasNot: true
          })
        }
      } else {
        that.setData({
          spry_list: [],
          hasNot: true
        })
      }
    })
  },
  checkboxChange: function (e) {
    for (var i in spry_list) {
      spry_list[i].checked = false
    }
    checked_list = e.detail.value
    if (!checked_list.length) {
      this.setData({
        btnStatus: 'disabled'
      })
    } else {
      this.setData({
        btnStatus: ''
      })
    }
    for (var i in spry_list) {
      for (var j in checked_list) {
        if (spry_list[i].spry_name == checked_list[j]) {
          if (spry_list[i].checked == false) {
            spry_list[i].checked = true
          }
        }
      }
    }
    this.setData({
      spry_list: spry_list
    })
  },
  confirm: function () {
    wx.setStorageSync('person_list', JSON.stringify(checked_list));
    var prePage = getCurrentPages()[3]
    prePage.addPerson()
    wx.navigateBack({
      delta: 1
    })
  },
  getSearchValue: function (e) {
    var value = e.detail.value
    if (value == '') {
      this.setData({
        search_value: '',
        spry_list: [],
        hasNot: false
      })
    } else {
      this.setData({
        search_value: value
      })
    }
  },
  clearSearchValue: function () {
    this.setData({
      search_value: '',
      spry_list: [],
      hasNot: false
    })
  }
})