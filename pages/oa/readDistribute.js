var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var fw_id = ''
var bu_code = ''
Page({
  data: {
    text_type: '',
    sphj_isdistributionopinion: '1',
    opinions: [
      { 'name': '同意', 'value': '同意', 'checked': true },
      { 'name': '不同意', 'value': '不同意', 'checked': false },
      { 'name': '请办理', 'value': '请办理', 'checked': false },
      { 'name': '自定义', 'value': '自定义', 'checked': false }
    ],
    person_list: [],
    opinion_text: '同意',
    opinion_default: true
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    fw_id = options.fw_id
    bu_code = options.bu_code
    wx.setNavigationBarTitle({
      title: options.text_type
    })
    this.setData({
      text_type: options.text_type,
      sphj_isdistributionopinion: options.sphj_isdistributionopinion
    })
  },
  onUnload: function () {
    fw_id = ''
    bu_code = ''
    wx.removeStorageSync('person_list')
  },
  radioChange: function (e) {
    if (e.detail.value == '自定义') {
      this.setData({
        opinion_default: false,
        opinion_text: ''
      })
    } else {
      this.setData({
        opinion_default: true,
        opinion_text: e.detail.value
      })
    }
  },
  getOpinionText: function (e) {
    this.setData({
      opinion_text: e.detail.value
    })
  },
  addPerson: function () {
    var person_content = ''
    var name = ''
    var plist = JSON.parse(wx.getStorageSync("person_list"))
    if (plist.length) {
      var people = []
      for (var i in plist) {
        if (plist[i].indexOf("(") != -1) {
          name = plist[i].substring(0, plist[i].indexOf("("));
        } else {
          name = plist[i]
        }
        people.push({ "name": name, "fullname": plist[i] })
      }
      this.setData({
        person_list: people,
      })
    } else {
      this.setData({
        person_list: []
      })
    }
  },
  removePeople: function (e) {
    var fullname = e.target.dataset.fullname
    var plist = JSON.parse(wx.getStorageSync("person_list"))
    if (this.isExist(fullname, plist)) {
      plist.splice(plist.indexOf(fullname), 1);
      wx.setStorageSync('person_list', JSON.stringify(plist));
      this.addPerson()
    }
  },
  addNewPerson: function () {
    wx.navigateTo({
      url: './distributePropleList'
    })
  },
  btnClick: function(){
    var that = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    if (this.data.sphj_isdistributionopinion == '1') {
      oa.saveDispenseOpinion(user_code, fw_id, bu_code, this.data.opinion_text, function (data) {
        if (data.status == 0) {
          that.toDistribution()
        } else {
          wx.showToast({
            title: '意见提交失败',
            image: 'images/error.png'
          })
        }
      })
    } else {
      that.toDistribution()
    }
  },
  toDistribution: function(){
    var that = this
    var spry = JSON.parse(wx.getStorageSync("person_list"))
    var spry_name = spry.join(";")
    oa.dispenseApprove(user_code, fw_id, bu_code, spry_name, function (data) {
      if (data.status == 0) {
        wx.showToast({
          title: that.data.text_type + '成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000);
      } else {
        wx.showToast({
          title: data.msg,
          image: 'images/error.png'
        })
      }
    })
  },
  getValueByKey: function (key, value, rekey, arr) {
    if (arr.length) {
      for (var i in arr) {
        if (arr[i][key] == value) {
          return arr[i][rekey];
        } else {
          continue;
        }
      }
    } else {
      return '-1';
    }
  },
  isExist: function (value, arr) {
    if (!app.isDefine(arr)) {
      return false;
    }
    if (arr.length) {
      for (var i in arr) {
        if (arr[i] == value) {
          return true;
        } else {
          continue;
        }
        return false;
      }
    }
    else {
      return false;
    }
    return false;
  }
})