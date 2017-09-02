var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var fw_id = ''
var bu_code = ''
var unit_list = []
Page({
  data: {
    thhj_index: 0,
    thhj: [],
    reject_user: '',
    reject_opinion: '',
    btnStatus: 'disabled'
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    fw_id = options.fw_id
    bu_code = options.bu_code
    this.getRejectInfo()
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
    unit_list = []
  },
  getRejectInfo: function(){
    var that = this
    oa.getRejectInfo(user_code, fw_id, bu_code, function(data){
      var status = data.status
      if(status == 0){
        unit_list = data.unit_list
        var thhj = [];
        if (unit_list.length) {
          if (unit_list.length > 1){
            thhj.push({ "unitindex": "-1", "unitname": "请选择退回环节", "unituser": ""})
            for (var i in unit_list) {
              thhj.push({ "unitindex": unit_list[i].unitindex, "unitname": unit_list[i].unitname, "unituser": unit_list[i].unituser})
            }
            that.setData({
              thhj: thhj
            })
          }else{
            thhj.push({ "unitindex": unit_list[0].unitindex, "unitname": unit_list[0].unitname, "unituser": unit_list[0].unituser })
            that.setData({
              thhj: thhj
            })
          }
          that.thhjChange(0)
        }
      }else{
        wx.showModal({
          title: '温馨提示',
          content: '当前环节无法退回',
          showCancel: false,
          confirmColor: '#C70019',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    })
  },
  thhjChange: function(e){
    if (typeof e == 'object') {
      var index = e.detail.value
    } else {
      var index = e
    }
    this.setData({
      thhj_index: index,
      reject_user: this.data.thhj[index].unituser
    })
    if (this.data.thhj[index].unitindex != '-1' && app.isDefine(this.data.reject_opinion)){
      this.setData({
        btnStatus: ''
      })
    }else{
      this.setData({
        btnStatus: 'disabled'
      })
    }
  },
  getOpinion: function(e){
    if (app.isDefine(e.detail.value) && this.data.thhj[this.data.thhj_index].unitindex != '-1'){
      this.setData({
        btnStatus: ''
      })
    }else{
      this.setData({
        btnStatus: 'disabled'
      })
    }
    this.setData({
      reject_opinion: e.detail.value
    })
  },
  btnClick: function(){
    var that = this
    var thhj_id = that.data.thhj[that.data.thhj_index].unitindex
    var reject_user = that.data.thhj[that.data.thhj_index].unituser
    var thyj = that.data.reject_opinion
    wx.showLoading({
      title: '提交中',
    })
    oa.backlogReject(user_code, fw_id, bu_code, thhj_id, reject_user, thyj, function(data){
      if (data.status == 0) {
        wx.showToast({
          title: '退回成功',
        })
        setTimeout(function () {
          var prePage = getCurrentPages()[0]
          prePage.onPullDownRefresh()
          wx.navigateBack({
            delta: 2
          })
        }, 1000);
      }else{
        wx.showToast({
          title: data.msg,
          image: 'images/error.png'
        })
      }
    })
  }
})